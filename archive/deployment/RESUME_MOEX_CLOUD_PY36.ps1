& {
    $ErrorActionPreference = "Stop"
    $retryId = "moex5_cloud_resume_" + (Get-Date -Format "yyyyMMdd_HHmmss")
    $localScript = Join-Path $env:TEMP ($retryId + ".py")
    $python = @'
import csv, json, sys, importlib.util
from pathlib import Path
original = Path('/path/to/workdir/moex5_server_20261004_205141.py')
previous = original.with_suffix('')
fixed = original.with_name(original.stem + '_py36.py')
source = original.read_text(encoding='utf-8').replace('text=True', "universal_newlines=True, encoding='utf-8'")
fixed.write_text(source, encoding='utf-8')
spec = importlib.util.spec_from_file_location('moex_resume', str(fixed))
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)
with (previous / 'per_item_results.csv').open(encoding='utf-8-sig', newline='') as f:
    rows = [r for r in csv.DictReader(f) if r['model_key'] in ('gemma', 'mistral')]
items = m.load_questions()
expected = {(key, item['id']) for key, label in m.LOCAL_MODELS for item in items}
if len(rows) != 10 or {(r['model_key'], r['question_id']) for r in rows} != expected or any(r['status'] != 'ok' for r in rows):
    sys.exit('STOP: the saved ten local results are incomplete; no cloud test started.')
for r in rows:
    r['run_index'] = int(r['run_index'])
    r['correct'] = int(r['correct'])
    r['end_to_end_seconds'] = float(r['end_to_end_seconds'])
folder = Path(sys.argv[1])
if folder.exists() and any(folder.iterdir()):
    sys.exit('STOP: output folder must be new.')
endpoint = 'http://127.0.0.1:8182/api/reference/answer'
m.save_progress(folder, rows, endpoint)
def show_grade(r):
    verdict = ('CORRECT' if int(r['correct']) else 'WRONG') if r['status'] == 'ok' else 'UNSCORED'
    print('{} {} choice={} official={} {}'.format(r['model_key'], r['question_id'],
        r['predicted_option'] or '?', r['official_option'], verdict), flush=True)
for r in rows:
    show_grade(r)
save_before = m.save_progress
def save_and_grade(folder, saved_rows, endpoint):
    save_before(folder, saved_rows, endpoint)
    show_grade(saved_rows[-1])
m.save_progress = save_and_grade
print('Retained all 10 local results. Resuming ONLY the 5 cloud items.', flush=True)
key = m.ask_cloud_key()
if not key:
    sys.exit(2)
try:
    m.run_model(items, 'openai', 'OpenAI cloud', endpoint, 300, folder, rows, key)
finally:
    key = ''
meta_path = folder / 'run_metadata.json'
meta = json.loads(meta_path.read_text(encoding='utf-8'))
meta.update({'resumed_from': str(previous), 'retained_local_rows': 10,
             'cloud_resume_reason': 'Python 3.6 text keyword failure before the API request'})
meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding='utf-8')
print('Saved merged local + cloud results:', folder, flush=True)
sys.exit(0 if all(r['status'] == 'ok' for r in rows) else 2)
'@
    [IO.File]::WriteAllText($localScript, $python, (New-Object System.Text.UTF8Encoding($false)))
    scp $localScript "USER@YOUR_SERVER:/path/to/workdir/"
    if ($LASTEXITCODE -ne 0) { throw "Upload failed; cloud test was not started." }
    ssh -t -o ServerAliveInterval=30 USER@YOUR_SERVER "python3 /path/to/workdir/$retryId.py /path/to/workdir/$retryId"
    $sshExit = $LASTEXITCODE
    if ($sshExit -ne 0 -and $sshExit -ne 2) { throw "Server test failed; deployment is paused." }
    if ($sshExit -eq 0 -or $sshExit -eq 2) {
        $resultDir = Join-Path $env:USERPROFILE ("Downloads\" + $retryId)
        New-Item -ItemType Directory -Path $resultDir -Force | Out-Null
        scp "USER@YOUR_SERVER:/path/to/workdir/$retryId/*.csv" $resultDir
        if ($LASTEXITCODE -ne 0) { throw "Results download failed; deployment is paused." }
        Invoke-Item $resultDir
    }
    if ($sshExit -ne 0) { throw "Cloud test was skipped or incomplete. Saved CSV was downloaded; deployment is paused." }
}
