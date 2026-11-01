#!/usr/bin/env bash
set -u
BASE="${VQ_BASE:-/path/to/workdir}"
if [[ -x "$BASE/ollama/bin/ollama" ]]; then
  export PATH="$BASE/ollama/bin:$PATH"
fi
export OLLAMA_MODELS="${OLLAMA_MODELS:-$BASE/ollama-models}"
export OLLAMA_HOST="${OLLAMA_HOST:-127.0.0.1:11435}"
echo "== Python =="
python3 --version 2>&1 || true
echo
echo "== Private Ollama endpoint =="
echo "$OLLAMA_HOST"
curl -fsS "http://$OLLAMA_HOST/api/version" 2>&1 || true
echo
echo "== Server-side TTS =="
TTS_PY="$BASE/miniforge-tts/bin/python"
TTS_BIN="$BASE/miniforge-tts/bin/edge-tts"
if [[ -x "$TTS_PY" && -x "$TTS_BIN" ]]; then
  "$TTS_PY" --version 2>&1 || true
  "$TTS_PY" - <<'PY' 2>&1 || true
import edge_tts
print('edge-tts:', getattr(edge_tts, '__version__', 'installed'))
print('female: zh-TW-HsiaoChenNeural')
print('male:   zh-TW-YunJheNeural')
PY
else
  echo "NOT INSTALLED - run ./PREPARE_SERVER_TTS.sh"
fi
echo
echo "== GPU =="
nvidia-smi 2>&1 || true
echo
echo "== Ollama models =="
ollama list 2>&1 || true
echo
echo "== Ollama loaded model =="
ollama ps 2>&1 || true
echo
echo "== Disk =="
df -h /workdir 2>&1 || true
