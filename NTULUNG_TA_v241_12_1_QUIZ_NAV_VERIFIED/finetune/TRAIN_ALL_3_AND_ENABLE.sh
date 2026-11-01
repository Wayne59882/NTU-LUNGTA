#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
./finetune/TRAIN_ALL_3_LOCAL_MODELS_QLORA.sh "$@"
./finetune/START_FINETUNED_LOCAL_ROUTER.sh
echo '[OK] All available trained adapters enabled. Restart START_VQ_TA_SERVER.sh.'
