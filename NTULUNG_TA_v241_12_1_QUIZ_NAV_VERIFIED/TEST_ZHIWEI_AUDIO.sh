#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:-/tmp/zhiwei_test.wav}"
echo "===== 11436 HEALTH ====="
curl -fsS http://127.0.0.1:11436/health | python3 -m json.tool

echo "===== DIRECT XTTS SYNTHESIS ====="
curl -fsS --max-time 180 -H 'Content-Type: application/json' \
  -d '{"text":"Pulmonary ventilation affects PaCO2 and PaO2. This is Zhiwei.","language":"en-US","rate":1.0}' \
  http://127.0.0.1:11436/tts -o "$OUT"
ls -lh "$OUT"
file "$OUT"

echo "===== MAIN APP TTS ROUTE ====="
curl -fsS --max-time 180 -D /tmp/vq_tts_headers.txt -H 'Content-Type: application/json' \
  -d '{"text":"Pulmonary ventilation affects PaCO2 and PaO2. This is Zhiwei.","role":"zhiwei","language":"en-US","rate":1.0,"pitch":1.0}' \
  http://127.0.0.1:8179/api/tts -o /tmp/zhiwei_via_8179.wav
cat /tmp/vq_tts_headers.txt
ls -lh /tmp/zhiwei_via_8179.wav
printf '[OK] If both WAV files are non-empty, server-side Zhiwei audio is working.\n'
