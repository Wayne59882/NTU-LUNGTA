#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
rm -f finetune/active_models.env
pkill -u "$USER" -f '[f]inetuned_local_router.py' 2>/dev/null || true
echo '[OK] Fine-tuned local adapters disabled; Granite/Gemma/Ministral revert to original Ollama models after app restart.'
