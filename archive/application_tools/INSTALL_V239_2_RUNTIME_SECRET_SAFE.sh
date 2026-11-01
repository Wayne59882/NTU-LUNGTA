#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
export PATH="$BASE/node-v22/bin:$BASE/ollama/bin:$PATH"
echo '===== v239.2 FIVE-MODEL BENCHMARK + RESEND FEEDBACK ====='
./CHECK_V239_2_RUNTIME_SECRET_SAFE.sh
echo '===== DEPLOY PRESERVING v238.1 INFERENCE/RAG BEHAVIOR ====='
./INSTALL_V238_ACCURACY_ROBUST_BATCH_STABLE.sh
echo '===== FEEDBACK STATUS ====='
curl -sS http://127.0.0.1:8179/api/reference/feedback-status || true; echo
echo '===== v239.2 FEATURE DEPLOYMENT COMPLETE ====='
echo '[RESEARCH] Existing benchmark.env is preserved; no need to re-enter cloud keys.'
echo '[STUDENT] Existing feedback/feedback.env is preserved; no need to reconfigure Resend.'
echo '[RESEARCH] Prepare questions_unseen.jsonl, then run RUN_5MODEL_BENCHMARK.sh.'
echo '[NOTE] Runtime credentials are server-private state and are not packaged in this release.'
