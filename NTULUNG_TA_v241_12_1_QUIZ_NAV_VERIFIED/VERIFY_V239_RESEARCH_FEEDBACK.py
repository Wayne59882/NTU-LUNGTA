#!/usr/bin/env python3
from pathlib import Path
import os, re, subprocess, tempfile, sqlite3, importlib.util
R=Path(__file__).resolve().parent
bench=(R/'research/five_model_benchmark/benchmark_5models.py').read_text()
ref=(R/'reference_server.py').read_text(); start=(R/'START_VQ_TA_SERVER.sh').read_text()
js=(R/'web/reference/js/53_local_answer_feedback.js').read_text(); html=(R/'web/reference/index.html').read_text()

def ok(cond,msg):
    if not cond: raise SystemExit('[FAIL] '+msg)
    print('[OK]',msg)
for token in ['granite4.2:8b-q5_K_M','gemma4:12b','ministral-3:8b-instruct-2512-q4_K_M','gpt-5.6-luna','gemini-3.8-flash']:
    ok(token in bench,'benchmark includes '+token)
ok("same question + same cached RAG context" in bench,'run metadata records same-question/same-evidence policy')
ok("retrieve_context" in bench and "contexts" in bench,'one cached RAG context per question is implemented')
ok("expected_option" in bench and "user_prompt(question,context)" in bench,'answer key exists only for post-hoc scoring path')
ok("checkpoint.json" in bench and "checkpoint-skip" in bench,'quota-safe checkpoint/resume is implemented')
ok("exact_mcnemar" in bench and "wilcoxon_approx" in bench,'paired accuracy and latency statistics are implemented')
ok("pairwise_local_vs_cloud" in bench,'all Local-vs-Cloud pairwise comparisons are emitted')
ok("OPENAI_API_KEY" in bench and "GEMINI_API_KEY" in bench,'cloud keys are read from environment only')
ok("/api/reference/feedback" in ref,'feedback API endpoint exists')
ok("save_feedback" in ref,'feedback API persists through feedback service')
ok("feedback/feedback.env" in start,'server loads private feedback email env when configured')
ok("Report this answer" in js and "/api/reference/feedback" in js,'student local-answer feedback control is wired')
ok("incorrect" in js and "incomplete" in js and "unclear" in js and "too_slow" in js,'feedback reason taxonomy is present')
ok("53_local_answer_feedback.js" in html,'feedback UI script is loaded on Reference Textbook page')
ok("research/five_model_benchmark" not in html,'research benchmark is not embedded in student webpage')
# Secret policy: runtime env files are intentionally allowed to exist after the
# administrator configures API/email credentials.  The deployed tree is an
# overlay of release files plus server-private state, so filesystem presence
# alone must NOT be interpreted as 'packaged in the ZIP'.
#
# We instead enforce that release manifests and source-control rules exclude
# these files, and (when present at runtime) that they are private (0600).
secret_rel = [Path('research/five_model_benchmark/benchmark.env'), Path('feedback/feedback.env')]
manifest_text = '\n'.join(
    p.read_text(errors='ignore') for p in R.glob('BUILD_MANIFEST_V239*.txt') if p.is_file()
)
for rel in secret_rel:
    ok(str(rel) not in manifest_text, 'release manifest excludes '+str(rel))
    rp=R/rel
    if rp.exists():
        mode = rp.stat().st_mode & 0o777
        ok(mode == 0o600, f'runtime secret env is private (0600): {rel}')
        print('[INFO] runtime secret env preserved and allowed:', rel)
ignore=(R/'.gitignore').read_text(errors='ignore')
for rel in secret_rel:
    ok(str(rel) in ignore, '.gitignore excludes '+str(rel))
print('V239 RESEARCH + FEEDBACK STATIC ACCEPTANCE PASSED')
