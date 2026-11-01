#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
export PATH="$BASE/node-v22/bin:$BASE/ollama/bin:$PATH"
export OLLAMA_MODELS="${OLLAMA_MODELS:-$BASE/ollama-models}"

echo '===== 1/9 v236 STATIC ACCEPTANCE ====='
./CHECK_V236_EVIDENCE_PRECISION_STABLE.sh

echo '===== 2/9 STOP ONLY WAYNE6 PROJECT SERVING PROCESSES ====='
pkill -u "$USER" -f '[g]ateway.py.*8179' 2>/dev/null || true
pkill -u "$USER" -f '[k]b_server.py.*8181' 2>/dev/null || true
pkill -u "$USER" -f '[r]eference_server.py.*8182' 2>/dev/null || true
pkill -u "$USER" -f "$BASE/ollama/lib/ollama/[l]lama-server" 2>/dev/null || true
pkill -u "$USER" -f "$BASE/ollama/bin/[o]llama serve" 2>/dev/null || true
sleep 3

echo '===== 3/9 RESTART PRIVATE ANSWER OLLAMA ====='
export OLLAMA_HOST=127.0.0.1:11435
export OLLAMA_MAX_LOADED_MODELS=1
export OLLAMA_NUM_PARALLEL=1
export OLLAMA_CONTEXT_LENGTH=4096
./START_PRIVATE_OLLAMA.sh

echo '===== 4/9 VERIFY EXISTING FULL-PHYSIOLOGY VECTOR INDEX ====='
echo '[INFO] v236 corpus is unchanged from v235 (4,792 passages); verified indexes should be reused without re-embedding.'
./PREPARE_REFERENCE_VECTOR_RAG.sh

echo '===== 5/9 START v236 EVIDENCE-PRECISION SERVER ====='
nohup ./START_VQ_TA_SERVER.sh > "$BASE/v236_evidence_precision_server.log" 2>&1 &
echo $! > "$BASE/v236_evidence_precision_server.pid"
for i in $(seq 1 160); do
  if curl -fsS http://127.0.0.1:8179/api/health >/dev/null 2>&1; then break; fi
  sleep 3
  if [[ "$i" == 160 ]]; then tail -200 "$BASE/v236_evidence_precision_server.log"; exit 31; fi
done
curl -sS http://127.0.0.1:8179/api/health; echo
curl -sS http://127.0.0.1:8179/api/reference/health; echo

echo '===== 6/9 VERIFY RUNTIME RETRIEVAL ====='
./CHECK_REFERENCE_RETRIEVAL_RUNTIME.sh http://127.0.0.1:8179

echo '===== 7/9 GRANITE PRODUCTION-CONTEXT PREWARM ====='
for i in $(seq 1 120); do
  PS="$(curl -sS http://127.0.0.1:11435/api/ps 2>/dev/null || true)"
  if printf '%s' "$PS" | grep -q 'granite4.2:8b-q5_K_M'; then
    echo '[OK] Granite resident with production-context prewarm.'
    printf '%s
' "$PS"
    break
  fi
  sleep 2
  if [[ "$i" == 120 ]]; then echo '[WARN] Granite prewarm has not completed; shared GPU may be highly contended.'; curl -sS http://127.0.0.1:11435/api/ps || true; fi
done

echo '===== 8/9 CLOUDFLARE ORIGIN ====='
ORIGIN="$(cat "$BASE/current_cloudflare_origin.txt" 2>/dev/null || true)"
if [[ -z "$ORIGIN" ]] || ! curl -fsS --max-time 10 "$ORIGIN/api/health" >/dev/null 2>&1; then
  pkill -u "$USER" -f '[c]loudflared' 2>/dev/null || true
  ./START_CLOUDFLARE_TUNNEL.sh
  sleep 8
  ORIGIN="$(cat logs/cloudflare_origin_url.txt)"
  printf '%s
' "$ORIGIN" > "$BASE/current_cloudflare_origin.txt"
fi
echo "ORIGIN=$ORIGIN"
curl -sS --max-time 15 "$ORIGIN/api/health"; echo

echo '===== 9/9 DEPLOY WORKER + PUBLIC HEALTH ====='
VQ_ORIGIN_URL="$ORIGIN" ./DEPLOY_CLOUDFLARE_WORKERS_DEV.sh
curl -sS https://lungta.twchu.workers.dev/api/health; echo
curl -sS https://lungta.twchu.workers.dev/api/reference/health; echo

echo '===== v236 EVIDENCE-PRECISION DECISION DEPLOYMENT COMPLETE ====='
echo '[NEXT] Run seen regression:'
echo '       ./benchmark/regression/RUN_V236_SEEN_REGRESSION.sh --model granite'
