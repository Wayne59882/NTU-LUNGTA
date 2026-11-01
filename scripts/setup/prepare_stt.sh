#!/usr/bin/env bash
set -euo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/../lib/paths.sh"
BASE="${VQ_BASE:-/path/to/workdir}"
PREFIX="${VQ_TEACHER_TTS_PREFIX:-$BASE/miniforge-teacher-tts}"
if [[ ! -x "$PREFIX/bin/python" ]]; then
  "${PYTHON_BIN:-python3}" -m venv "$PREFIX"
fi
"$PREFIX/bin/python" -m pip install "faster-whisper>=1.1,<2"
if [[ ! -x "$PREFIX/bin/ffmpeg" ]] && ! command -v ffmpeg >/dev/null 2>&1; then
  echo '[INFO] Install FFmpeg separately before starting the speech service.'
fi
echo "[OK] Multilingual automatic speech recognition prepared."
