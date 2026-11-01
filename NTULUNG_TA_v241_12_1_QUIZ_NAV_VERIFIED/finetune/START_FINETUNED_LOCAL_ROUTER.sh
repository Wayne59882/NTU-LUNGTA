#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
BASE="${VQ_BASE:-/path/to/workdir}"
ENV_DIR="${VQ_FT_ENV:-$BASE/lungta-ft-venv}"
PORT="${VQ_FT_PORT:-11439}"
[[ -x "$ENV_DIR/bin/python" ]] || { echo '[ERROR] Fine-tuning environment missing.'; exit 1; }
pkill -u "$USER" -f '[f]inetuned_local_router.py' 2>/dev/null || true
nohup "$ENV_DIR/bin/python" finetune/finetuned_local_router.py --host 127.0.0.1 --port "$PORT" > logs/local_ft_router.log 2>&1 &
echo $! > logs/local_ft_router.pid
for i in $(seq 1 30); do curl -fsS "http://127.0.0.1:$PORT/health" >/dev/null 2>&1 && { echo "[OK] Fine-tuned local-model router ready: 127.0.0.1:$PORT"; exit 0; }; sleep 2; done
echo '[ERROR] Fine-tuned local-model router did not become ready.'; tail -80 logs/local_ft_router.log || true; exit 1
