#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
./finetune/TRAIN_ONE_LOCAL_MODEL_QLORA.sh granite "$@"
./finetune/ENABLE_FINETUNED_LOCAL_MODELS.sh
./finetune/START_FINETUNED_LOCAL_ROUTER.sh
echo '[OK] Granite adapter trained/enabled. Gemma and Ministral remain usable; train them separately if you want fine-tuned variants too.'
