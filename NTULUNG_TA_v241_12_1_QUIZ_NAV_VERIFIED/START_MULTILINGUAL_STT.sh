#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
BASE="${VQ_BASE:-/path/to/workdir}"
PREFIX="${VQ_TEACHER_TTS_PREFIX:-$BASE/miniforge-teacher-tts}"
PY="${VQ_STT_PYTHON:-$PREFIX/bin/python}"
PORT="${VQ_STT_PORT:-11437}"
# faster-whisper audio decoding requires ffmpeg. Keep the conda prefix on PATH for the STT child process.
if [[ -d "$PREFIX/bin" ]]; then export PATH="$PREFIX/bin:$PATH"; fi
if ! command -v ffmpeg >/dev/null 2>&1; then echo "[ERROR] ffmpeg not found for multilingual STT (expected under $PREFIX/bin)."; exit 1; fi
mkdir -p logs
STT_BUILD="v210-stt-whisper-large-v3-turbo-shared-gpu-adaptive-1"
HEALTH="$(curl -fsS "http://127.0.0.1:$PORT/health" 2>/dev/null || true)"
if [[ -n "$HEALTH" ]] && grep -q "$STT_BUILD" <<<"$HEALTH"; then
  echo "Multilingual STT already running on $PORT ($STT_BUILD)"
  exit 0
fi
if [[ -n "$HEALTH" ]]; then
  echo "[INFO] Restarting older STT process so the current language-detection code is active."
  pkill -f '[s]peech_stt_server.py' 2>/dev/null || true
  sleep 2
fi
nohup "$PY" speech_stt_server.py > logs/multilingual_stt.log 2>&1 &
echo $! > logs/multilingual_stt.pid
for i in $(seq 1 180); do
  if curl -fsS "http://127.0.0.1:$PORT/health" >/dev/null 2>&1; then echo "[OK] Multilingual STT ready on $PORT"; exit 0; fi
  sleep 2
done
echo "[ERROR] Multilingual STT did not become healthy. Check logs/multilingual_stt.log"
exit 1
