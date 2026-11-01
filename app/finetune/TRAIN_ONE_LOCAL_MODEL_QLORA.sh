#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
KEY="${1:-}"
[[ "$KEY" =~ ^(granite|gemma|mistral)$ ]] || { echo 'Usage: ./finetune/TRAIN_ONE_LOCAL_MODEL_QLORA.sh granite|gemma|mistral'; exit 2; }
shift || true
./finetune/PREPARE_FINETUNE_ENV.sh
python3 finetune/VALIDATE_SFT_DATASET.py
"${VQ_FT_ENV:-/path/to/workdir/lungta-ft-venv}/bin/python" finetune/train_local_model_qlora.py "$KEY" "$@"
