#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TARGET="${1:?Pass the existing live application directory}"
[[ -f "$TARGET/reference_server.py" ]] || { echo 'Existing teaching application not found; nothing changed.'; exit 2; }
for d in "$(dirname "$TARGET")/node-v22/bin" "$HOME/node-v22/bin"; do
  [[ ! -x "$d/node" ]] || export PATH="$d:$PATH"
done
command -v crontab >/dev/null || { echo 'crontab is required for automatic sync.'; exit 2; }
PY="${PYTHON_BIN:-python3}"
"$PY" "$ROOT/scripts/deploy/auto_sync.py" --target "$TARGET" --apply --publish
"$PY" - "$ROOT" "$TARGET" "$PY" "$PATH" <<'PY'
import os,shlex,subprocess,sys
root,target,python,path=sys.argv[1:]
old=subprocess.run(['crontab','-l'],stdout=subprocess.PIPE,stderr=subprocess.DEVNULL,universal_newlines=True).stdout
lines=[line for line in old.splitlines() if '# mc-vhta-auto-sync' not in line]
command='PATH='+shlex.quote(path)+' '+shlex.quote(python)+' '+shlex.quote(root+'/scripts/deploy/auto_sync.py')+' --target '+shlex.quote(target)+' --apply --publish >> '+shlex.quote(target+'/logs/auto_sync.log')+' 2>&1'
lines.append('*/2 * * * * '+command+' # mc-vhta-auto-sync')
process=subprocess.Popen(['crontab','-'],stdin=subprocess.PIPE,universal_newlines=True);process.communicate('\n'.join(lines)+'\n')
if process.returncode:raise SystemExit(process.returncode)
print('Automatic sync installed: checks CI-approved main every two minutes. Existing cron entries retained.')
PY
