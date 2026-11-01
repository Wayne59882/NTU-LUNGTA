#!/usr/bin/env bash
set -euo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/../lib/paths.sh"
BASE="${VQ_BASE:-/path/to/workdir}"
PREFIX="${VQ_TTS_PREFIX:-$BASE/miniforge-tts}"
INSTALLER="$BASE/Miniforge3-Linux-x86_64.sh"
EDGE_TTS="$PREFIX/bin/edge-tts"

echo "== VQ TA v189 Server-side TTS setup =="
echo "Install location: $PREFIX"
echo "No sudo/root permission is required."

if [[ ! -x "$PREFIX/bin/python" ]]; then
  echo "[1/3] Downloading Miniforge (local Python runtime)..."
  curl -fL "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-Linux-x86_64.sh" -o "$INSTALLER"
  echo "[2/3] Installing local Python runtime..."
  bash "$INSTALLER" -b -p "$PREFIX"
else
  echo "[1/3] Local Python runtime already exists."
  echo "[2/3] Skipping runtime installation."
fi

echo "[3/3] Installing/updating edge-tts..."
"$PREFIX/bin/python" -m pip install --upgrade edge-tts

echo
echo "== Installed TTS =="
"$PREFIX/bin/python" --version
"$PREFIX/bin/python" - <<'PY'
import edge_tts
print('edge-tts version:', getattr(edge_tts, '__version__', 'installed'))
PY

echo
echo "Taiwan server voices configured by v186:"
echo "  Female / Yating role: zh-TW-HsiaoChenNeural"
echo "  Male   / Zhiwei role: zh-TW-YunJheNeural"
echo
echo "[OK] Server-side TTS environment is ready."
