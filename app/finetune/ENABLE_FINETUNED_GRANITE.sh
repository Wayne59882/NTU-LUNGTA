#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
exec ./finetune/ENABLE_FINETUNED_LOCAL_MODELS.sh
