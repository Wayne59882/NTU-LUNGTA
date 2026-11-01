#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
export PATH="$BASE/node-v22/bin:$BASE/ollama/bin:$PATH"
export OLLAMA_MODELS="${OLLAMA_MODELS:-$BASE/ollama-models}"

echo '===== 1/7 STATIC ACCEPTANCE ====='
./CHECK_V231_STABLE_SERVING.sh

echo '===== 2/7 STOP ONLY WAYNE6 PROJECT SERVING PROCESSES ====='
pkill -u "$USER" -f '[g]ateway.py.*8179' 2>/dev/null || true
pkill -u "$USER" -f '[k]b_server.py.*8181' 2>/dev/null || true
pkill -u "$USER" -f '[r]eference_server.py.*8182' 2>/dev/null || true
pkill -u "$USER" -f "$BASE/ollama/lib/ollama/[l]lama-server" 2>/dev/null || true
pkill -u "$USER" -f "$BASE/ollama/bin/[o]llama serve" 2>/dev/null || true
sleep 3

echo '===== 3/7 RESTART PRIVATE ANSWER OLLAMA ====='
export OLLAMA_HOST=127.0.0.1:11435
export OLLAMA_MAX_LOADED_MODELS=1
export OLLAMA_NUM_PARALLEL=1
./START_PRIVATE_OLLAMA.sh

echo '===== 4/7 START v231 STABLE SERVER ====='
nohup ./START_VQ_TA_SERVER.sh > "$BASE/v231_stable_server.log" 2>&1 &
echo $! > "$BASE/v231_stable_server.pid"
for i in $(seq 1 60); do
  if curl -fsS http://127.0.0.1:8179/api/health >/dev/null 2>&1; then break; fi
  sleep 3
  if [[ "$i" == 60 ]]; then tail -120 "$BASE/v231_stable_server.log"; exit 31; fi
done
curl -sS http://127.0.0.1:8179/api/health; echo
curl -sS http://127.0.0.1:8179/api/reference/health; echo

echo '===== 5/7 DEFAULT GRANITE PREWARM STATUS ====='
for _ in $(seq 1 60); do
  if curl -sS http://127.0.0.1:11435/api/ps 2>/dev/null | grep -q 'granite4.2:8b-q5_K_M'; then
    echo '[OK] Granite is resident on answer Ollama.'; break
  fi
  sleep 2
done
curl -sS http://127.0.0.1:11435/api/ps || true; echo

echo '===== 6/7 CLOUDFLARE ORIGIN ====='
ORIGIN="$(cat "$BASE/current_cloudflare_origin.txt" 2>/dev/null || true)"
if [[ -z "$ORIGIN" ]] || ! curl -fsS --max-time 10 "$ORIGIN/api/health" >/dev/null 2>&1; then
  pkill -u "$USER" -f '[c]loudflared' 2>/dev/null || true
  ./START_CLOUDFLARE_TUNNEL.sh
  sleep 8
  ORIGIN="$(cat logs/cloudflare_origin_url.txt)"
  printf '%s\n' "$ORIGIN" > "$BASE/current_cloudflare_origin.txt"
fi
echo "ORIGIN=$ORIGIN"
curl -sS --max-time 15 "$ORIGIN/api/health"; echo

echo '===== 7/7 DEPLOY WORKER + PUBLIC HEALTH ====='
VQ_ORIGIN_URL="$ORIGIN" ./DEPLOY_CLOUDFLARE_WORKERS_DEV.sh
curl -sS https://lungta.twchu.workers.dev/api/health; echo
curl -sS https://lungta.twchu.workers.dev/api/reference/health; echo
echo '===== v231 STABLE SERVING DEPLOYMENT COMPLETE ====='
