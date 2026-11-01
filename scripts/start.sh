#!/usr/bin/env bash
set -euo pipefail
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT/app"
# Existing runtime helpers invoke one another directly.
chmod +x ./*.sh finetune/*.sh
exec bash START_VQ_TA_SERVER.sh
