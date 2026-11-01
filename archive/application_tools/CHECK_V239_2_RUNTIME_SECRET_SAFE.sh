#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
echo '===== v239.2 RUNTIME SECRET-SAFE ACCEPTANCE ====='
./CHECK_V239_RESEARCH_FEEDBACK.sh
./CHECK_V239_1_RESEND_FEEDBACK.sh
python3 - <<'PY'
from pathlib import Path
R=Path('.')
for rel in [Path('research/five_model_benchmark/benchmark.env'),Path('feedback/feedback.env')]:
    if rel.exists():
        mode=rel.stat().st_mode & 0o777
        assert mode==0o600, (rel, oct(mode))
        print('[OK] runtime credential file preserved with mode 0600:', rel)
    else:
        print('[OK] runtime credential file not configured yet:', rel)
print('[OK] v239.2 no longer mistakes server-private runtime credentials for packaged secrets')
PY
echo '===== ALL v239.2 RUNTIME SECRET-SAFE CHECKS PASSED ====='
