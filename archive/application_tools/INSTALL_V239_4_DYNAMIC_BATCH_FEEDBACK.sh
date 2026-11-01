#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
export PATH="$BASE/node-v22/bin:$BASE/ollama/bin:$PATH"
echo '===== v239.4 DYNAMIC BATCH FEEDBACK + FIVE-MODEL BENCHMARK ====='
if [[ "${VQ_SKIP_PREFLIGHT:-0}" != "1" ]]; then
  ./CHECK_V239_4_FULL_PREFLIGHT.sh
else
  echo '[INFO] VQ_SKIP_PREFLIGHT=1: using a preflight already completed by the hotfix applier.'
fi
if [[ "${VQ_PREFLIGHT_ONLY:-0}" == "1" ]]; then
  echo '[OK] VQ_PREFLIGHT_ONLY=1: deployment intentionally not started.'
  exit 0
fi
echo '===== DEPLOY PRESERVING v238.1 INFERENCE/RAG BEHAVIOR ====='
./INSTALL_V238_ACCURACY_ROBUST_BATCH_STABLE.sh
echo '===== FEEDBACK STATUS ====='
curl -sS http://127.0.0.1:8179/api/reference/feedback-status || true; echo
echo '===== v239.4 FEATURE DEPLOYMENT COMPLETE ====='
echo '[FEEDBACK] Batch size is detected dynamically from the submitted questions (up to the existing 40-item batch limit).'
echo '[FEEDBACK] Report scope = All questions / One question / Multiple questions.'
echo '[FEEDBACK] One/Multiple use typed question numbers (for example 6 or 2,5,8-10); no long dropdown.'
echo '[STUDENT] Existing feedback/feedback.env is preserved; Resend remains configured.'
echo '[RESEARCH] Existing benchmark.env is preserved; no need to re-enter cloud keys.'
echo '[NOTE] A server-to-workers.dev curl timeout is now a warning after successful Worker deployment, not a false installer failure.'
