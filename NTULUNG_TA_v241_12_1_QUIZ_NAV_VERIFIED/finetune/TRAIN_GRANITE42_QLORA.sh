#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
exec ./finetune/TRAIN_ONE_LOCAL_MODEL_QLORA.sh granite "$@"
