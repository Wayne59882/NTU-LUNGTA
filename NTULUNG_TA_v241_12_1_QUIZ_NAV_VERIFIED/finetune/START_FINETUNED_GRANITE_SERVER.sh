#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
exec ./finetune/START_FINETUNED_LOCAL_ROUTER.sh
