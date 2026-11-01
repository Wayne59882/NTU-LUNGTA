#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
OLLAMA_BIN="$BASE/ollama/bin/ollama"
HOST="${VQ_REFERENCE_EMBED_HOST:-127.0.0.1:11438}"
MODEL_DIR="${OLLAMA_MODELS:-$BASE/ollama-models}"
LOG="${VQ_REFERENCE_EMBED_LOG:-$BASE/reference_embedding_ollama.log}"
[[ -x "$OLLAMA_BIN" ]] || { echo "[ERROR] Ollama not found at $OLLAMA_BIN"; exit 1; }
if curl -fsS "http://$HOST/api/version" >/dev/null 2>&1; then
  echo "[OK] Reference embedding Ollama already running at $HOST"
  exit 0
fi
nohup env \
  CUDA_VISIBLE_DEVICES="" \
  OLLAMA_HOST="$HOST" \
  OLLAMA_MODELS="$MODEL_DIR" \
  OLLAMA_CONTEXT_LENGTH="8192" \
  OLLAMA_MAX_LOADED_MODELS="1" \
  OLLAMA_NUM_PARALLEL="1" \
  OLLAMA_KEEP_ALIVE="12h" \
  "$OLLAMA_BIN" serve > "$LOG" 2>&1 &
for _ in $(seq 1 20); do
  if curl -fsS "http://$HOST/api/version" >/dev/null 2>&1; then echo "[OK] Reference embedding Ollama: $HOST"; exit 0; fi
  sleep 1
done
echo "[ERROR] Reference embedding Ollama did not start. Log: $LOG" >&2
exit 1
