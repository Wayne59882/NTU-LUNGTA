#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
export PATH="$BASE/node-v22/bin:$BASE/ollama/bin:$PATH"
echo '===== v239.5 SHORT PHYSIOLOGY QUERY SCOPE FIX + v239.4 DYNAMIC FEEDBACK ====='
if [[ "${VQ_SKIP_PREFLIGHT:-0}" != "1" ]]; then
  ./CHECK_V239_5_FULL_PREFLIGHT.sh
else
  echo '[INFO] VQ_SKIP_PREFLIGHT=1: using a preflight already completed.'
fi
if [[ "${VQ_PREFLIGHT_ONLY:-0}" == "1" ]]; then
  echo '[OK] VQ_PREFLIGHT_ONLY=1: deployment intentionally not started.'
  exit 0
fi
# Reuse the v239.4 deployment path after the new preflight. This preserves v238.1 inference/RAG,
# dynamic feedback, server-private credentials, and the verified vector indexes.
VQ_SKIP_PREFLIGHT=1 ./INSTALL_V239_4_DYNAMIC_BATCH_FEEDBACK.sh
echo '===== v239.5 FEATURE DEPLOYMENT COMPLETE ====='
echo '[SCOPE] Short physiology questions such as 什麼是V/Q and PaO₂是什麼 are accepted without requiring spaces.'
echo '[FEEDBACK] v239.4 dynamic All / One / Multiple question reporting remains active.'
