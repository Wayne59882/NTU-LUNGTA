#!/usr/bin/env bash
set -euo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/../lib/paths.sh"
cd "$LUNGTA_APP_DIR"
BASE="${VQ_BASE:-/path/to/workdir}"
export PATH="$BASE/ollama/bin:$PATH"
export OLLAMA_MODELS="${OLLAMA_MODELS:-$BASE/ollama-models}"
export VQ_REFERENCE_EMBED_HOST="${VQ_REFERENCE_EMBED_HOST:-127.0.0.1:11438}"
export VQ_REFERENCE_EMBED_MODEL="${VQ_REFERENCE_EMBED_MODEL:-bge-m3:latest}"

bash "$LUNGTA_SCRIPTS_DIR/runtime/start_embeddings.sh"

if ! OLLAMA_HOST="$VQ_REFERENCE_EMBED_HOST" ollama list 2>/dev/null | awk 'NR>1{print $1}' | grep -Fxq "$VQ_REFERENCE_EMBED_MODEL"; then
  echo "[VECTOR] Pulling multilingual embedding model: $VQ_REFERENCE_EMBED_MODEL"
  OLLAMA_HOST="$VQ_REFERENCE_EMBED_HOST" ollama pull "$VQ_REFERENCE_EMBED_MODEL"
else
  echo "[OK] Embedding model already installed: $VQ_REFERENCE_EMBED_MODEL"
fi

# Warm the small embedding model. This is independent of the selected 12B/14B
# answer model on port 11435, so retrieval does not evict the answer model.
if ! curl -fsS --max-time 120 -X POST "http://$VQ_REFERENCE_EMBED_HOST/api/embed" \
  -H 'Content-Type: application/json' \
  -d "{\"model\":\"$VQ_REFERENCE_EMBED_MODEL\",\"input\":\"respiratory physiology\",\"keep_alive\":\"12h\"}" >/dev/null; then
  echo "[ERROR] Embedding smoke test failed on $VQ_REFERENCE_EMBED_HOST with $VQ_REFERENCE_EMBED_MODEL" >&2
  echo "[INFO] Last embedding Ollama log lines:" >&2
  tail -n 120 "$BASE/reference_embedding_ollama.log" 2>/dev/null || true
  exit 22
fi

echo "[OK] Embedding smoke test passed: $VQ_REFERENCE_EMBED_MODEL on $VQ_REFERENCE_EMBED_HOST"
echo "[VECTOR] Preparing chunk index + precomputed exact semantic rerank-window index."
"${PYTHON_BIN:-python3}" reference_search.py --build-index
"${PYTHON_BIN:-python3}" reference_search.py --status

echo '[OK] Reference Book semantic vector index is ready.'
