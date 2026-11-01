#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
echo '===== v240 SITE METRICS + 3 MODEL UI + REFERENCE TEXTBOOK FLOW ====='
./CHECK_V240_SITE_METRICS_3MODEL_UI.sh
if [[ "${VQ_PREFLIGHT_ONLY:-0}" == "1" ]]; then
  echo '[OK] VQ_PREFLIGHT_ONLY=1: deployment intentionally not started.'
  exit 0
fi
VQ_SKIP_PREFLIGHT=1 ./INSTALL_V239_6_ALIAS_NORMALIZATION_FIXED.sh
mkdir -p analytics
printf '\n===== v240 RUNTIME CHECKS =====\n'
curl -sS http://127.0.0.1:8179/api/reference/models || true; echo
curl -sS http://127.0.0.1:8179/api/reference/site-metrics || true; echo
printf '\n===== v240 DEPLOYMENT COMPLETE =====\n'
echo '[MODELS] Student UI: Gemma 4 12B + Ministral 3 8B + GPT-5.6 Luna. Granite and Gemini 3.8 Flash are removed from student selection.'
echo '[DEFAULT] Gemma 4 12B is the initial local model and server pre-warm target.'
echo '[METRICS] Small English badge: Online now / Total visitors.'
echo '[BENCHMARK] Run: ./research/three_model_10q/RUN_3MODEL_10Q_BENCHMARK.sh'
