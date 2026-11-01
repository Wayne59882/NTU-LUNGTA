#!/usr/bin/env bash
set -euo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/../lib/paths.sh"
BASE="${VQ_BASE:-/path/to/workdir}"
OLLAMA_BIN="$BASE/ollama/bin/ollama"
export PATH="$BASE/ollama/bin:$PATH"
export OLLAMA_MODELS="${OLLAMA_MODELS:-$BASE/ollama-models}"
export OLLAMA_HOST="${OLLAMA_HOST:-127.0.0.1:11435}"
export OLLAMA_CONTEXT_LENGTH="${OLLAMA_CONTEXT_LENGTH:-4096}"
export OLLAMA_MAX_LOADED_MODELS="${OLLAMA_MAX_LOADED_MODELS:-1}"
export OLLAMA_NUM_PARALLEL="${OLLAMA_NUM_PARALLEL:-1}"
LOG="$BASE/ollama.log"
if [[ ! -x "$OLLAMA_BIN" ]]; then
  echo "ERROR: private Ollama not found at $OLLAMA_BIN" >&2
  exit 1
fi
if curl -fsS "http://$OLLAMA_HOST/api/version" >/dev/null 2>&1; then
  echo "Private Ollama already running at $OLLAMA_HOST"
  exit 0
fi
nohup env   OLLAMA_HOST="$OLLAMA_HOST"   OLLAMA_MODELS="$OLLAMA_MODELS"   OLLAMA_CONTEXT_LENGTH="$OLLAMA_CONTEXT_LENGTH"   OLLAMA_MAX_LOADED_MODELS="$OLLAMA_MAX_LOADED_MODELS"   OLLAMA_NUM_PARALLEL="$OLLAMA_NUM_PARALLEL"   "$OLLAMA_BIN" serve > "$LOG" 2>&1 &
sleep 3
curl -fsS "http://$OLLAMA_HOST/api/version"
echo
echo "Private Ollama started at $OLLAMA_HOST; context=$OLLAMA_CONTEXT_LENGTH"
