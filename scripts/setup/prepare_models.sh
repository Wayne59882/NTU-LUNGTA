#!/usr/bin/env bash
set -euo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/../lib/paths.sh"
BASE="${VQ_BASE:-/path/to/workdir}"
if [[ -x "$BASE/ollama/bin/ollama" ]]; then
  export PATH="$BASE/ollama/bin:$PATH"
fi
export OLLAMA_MODELS="${OLLAMA_MODELS:-$BASE/ollama-models}"
export OLLAMA_HOST="${OLLAMA_HOST:-127.0.0.1:11435}"
command -v ollama >/dev/null 2>&1 || { echo "ERROR: ollama is not installed or not in PATH"; exit 1; }
mkdir -p "$OLLAMA_MODELS"
if ! curl -fsS "http://$OLLAMA_HOST/api/version" >/dev/null 2>&1; then
  bash "$VHTA_SCRIPTS_DIR/runtime/start_ollama.sh"
fi
echo "Pulling Granite 4.2 8B Q5_K_M (quality-first shared-A5000 profile)..."
ollama pull granite4.2:8b-q5_K_M
echo "Pulling Gemma 4 12B Q4_K_M workstation model (shared-A5000 profile)..."
ollama pull gemma4:12b
echo "Pulling Ministral 3 8B Q4_K_M (shared-A5000 profile)..."
ollama pull ministral-3:8b-instruct-2512-q4_K_M
echo "All three models are ready."
ollama list
