#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
./finetune/PREPARE_FINETUNE_ENV.sh
python3 finetune/VALIDATE_SFT_DATASET.py
for KEY in granite gemma mistral; do
  echo "===== TRAIN $KEY ====="
  "${VQ_FT_ENV:-/path/to/workdir/lungta-ft-venv}/bin/python" finetune/train_local_model_qlora.py "$KEY" "$@"
done
./finetune/ENABLE_FINETUNED_LOCAL_MODELS.sh
