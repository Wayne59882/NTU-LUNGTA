#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
BASE="${VQ_BASE:-/path/to/workdir}"
ENV_DIR="${VQ_FT_ENV:-$BASE/lungta-ft-venv}"
echo '===== THREE LOCAL MODEL QLORA READINESS ====='
python3 finetune/VALIDATE_SFT_DATASET.py
if command -v nvidia-smi >/dev/null 2>&1; then nvidia-smi --query-gpu=name,memory.total,memory.used,memory.free --format=csv,noheader; else echo '[WARN] nvidia-smi not available.'; fi
if [[ -x "$ENV_DIR/bin/python" ]]; then echo "[OK] fine-tune venv: $ENV_DIR"; else echo "[INFO] fine-tune venv will be created: $ENV_DIR"; fi
for KEY in granite gemma mistral; do
  case "$KEY" in
    granite) D=granite42_physiology_lora;;
    gemma) D=gemma4_12b_physiology_lora;;
    mistral) D=ministral3_8b_physiology_lora;;
  esac
  if [[ -f "finetune/output/$D/TRAINING_COMPLETE" ]]; then echo "[OK] $KEY adapter trained"; else echo "[INFO] $KEY adapter not trained yet"; fi
done
echo 'Train one: ./finetune/TRAIN_ONE_LOCAL_MODEL_QLORA.sh granite|gemma|mistral'
echo 'Train all: ./finetune/TRAIN_ALL_3_AND_ENABLE.sh'
