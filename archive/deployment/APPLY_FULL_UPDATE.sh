#!/usr/bin/env bash
set -euo pipefail
STAGE="$(cd "$(dirname "$0")" && pwd)"
BASE="${VQ_BASE:-/path/to/workdir}"
APP_NAME='NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED'
RELEASE="$STAGE/$APP_NAME"
DEST="$BASE/$APP_NAME"
[[ -f "$RELEASE/FULL_RELEASE_FILES.txt" ]] || { echo '[ERROR] Full release manifest missing.' >&2; exit 2; }
[[ "$(cat "$RELEASE/VERSION.txt")" == 'v241.12.5-full-answer-voice' ]] || { echo '[ERROR] Wrong full release version.' >&2; exit 2; }
if ! command -v node >/dev/null 2>&1; then
  for d in "$BASE/node-v22/bin" "$HOME/node-v22/bin"; do
    if [[ -x "$d/node" ]]; then export PATH="$d:$PATH"; break; fi
  done
fi
command -v node >/dev/null 2>&1 || { echo '[ERROR] Node.js not found. Existing app was not changed.' >&2; exit 127; }
PY_BIN="${PYTHON_BIN:-python3}"
(
  cd "$RELEASE"
  bash -n INSTALL_FINAL.sh INSTALL_V241_2_ONE_CLICK_STABLE.sh CHECK_V241_2_ONE_CLICK_STABLE.sh
  node VERIFY_V241_12_4_BATCH.cjs
  node VERIFY_V241_12_5_VOICE.cjs
  "$PY_BIN" VERIFY_V241_12_4_BATCH.py
)
"$PY_BIN" - "$RELEASE" "$DEST" "$BASE" <<'PY'
from __future__ import print_function
import sys, os, shutil, tarfile, tempfile, time
from pathlib import Path
release, dest, base = map(Path, sys.argv[1:4])
if release.resolve() == dest.resolve():
    raise SystemExit('STOP: extract the full ZIP into a new staging folder first.')
files = (release/'FULL_RELEASE_FILES.txt').read_text(encoding='utf-8').splitlines()
for name in files:
    p=Path(name)
    if p.is_absolute() or '..' in p.parts or not (release/p).is_file():
        raise SystemExit('STOP: invalid or missing release file: '+name)
    if name.startswith(('course_workspaces/','benchmark/state/')) or (name.startswith('analytics/') and name!='analytics/README.md') or name.endswith(('.env','.sqlite','.sqlite3','.db','.csv')):
        raise SystemExit('STOP: persistent user data must not be in the release manifest.')
base.mkdir(parents=True,exist_ok=True)
backup=base/('lungta_before_full_'+time.strftime('%Y%m%d_%H%M%S')+'_'+str(os.getpid())+'.tar.gz')
if dest.exists():
    with tarfile.open(str(backup),'w:gz') as tar:
        for name in files:
            old=dest/name
            if old.is_file():tar.add(str(old),arcname=dest.name+'/'+name,recursive=False)
    print('[BACKUP]',backup,flush=True)
for name in files:
    src, target = release/name, dest/name
    target.parent.mkdir(parents=True,exist_ok=True)
    fd, tmp = tempfile.mkstemp(prefix='.full_update_',dir=str(target.parent));os.close(fd)
    try:
        shutil.copy2(str(src),tmp)
        os.replace(tmp,str(target))
    finally:
        if os.path.exists(tmp):os.unlink(tmp)
print('[OK] Full program installed. Existing courses, saved results and provider settings preserved.',flush=True)
PY
cd "$DEST"
chmod +x ./*.sh feedback/*.sh
exec bash INSTALL_FINAL.sh
