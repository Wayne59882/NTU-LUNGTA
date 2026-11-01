#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ENV_DIR="${VQ_MOEX_ENV:-$BASE/lungta-moex-venv}"
PY="${PYTHON:-python3}"
if [[ ! -x "$ENV_DIR/bin/python" ]]; then
  "$PY" -m venv "$ENV_DIR"
fi
"$ENV_DIR/bin/python" -m pip install --upgrade 'pip<24.1' >/dev/null
"$ENV_DIR/bin/python" -m pip install 'PyPDF2==2.12.1' >/dev/null
printf '[OK] MOEX benchmark environment ready: %s\n' "$ENV_DIR"
