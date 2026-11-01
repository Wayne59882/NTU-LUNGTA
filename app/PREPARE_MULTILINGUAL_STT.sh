#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
PREFIX="${VQ_TEACHER_TTS_PREFIX:-$BASE/miniforge-teacher-tts}"
if [[ ! -x "$PREFIX/bin/python" ]]; then
  echo "Teacher voice Python environment not found. Run ./PREPARE_TEACHER_VOICE_TTS.sh first." >&2
  exit 1
fi
"$PREFIX/bin/python" -m pip install "faster-whisper>=1.1,<2"
echo "[OK] Multilingual automatic speech recognition prepared."
