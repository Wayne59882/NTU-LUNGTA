#!/usr/bin/env bash
set -euo pipefail
PORT="${VQ_TEACHER_TTS_PORT:-11436}"
curl -fsS "http://127.0.0.1:$PORT/health" && echo
