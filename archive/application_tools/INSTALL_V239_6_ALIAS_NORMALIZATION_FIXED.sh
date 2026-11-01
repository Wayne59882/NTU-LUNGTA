#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
export PATH="$BASE/node-v22/bin:$BASE/ollama/bin:$PATH"
echo '===== v239.6 PHYSIOLOGY ALIAS NORMALIZATION + DYNAMIC FEEDBACK ====='
if [[ "${VQ_SKIP_PREFLIGHT:-0}" != "1" ]]; then
  ./CHECK_V239_6_FULL_PREFLIGHT.sh
else
  echo '[INFO] VQ_SKIP_PREFLIGHT=1: using a preflight already completed.'
fi
if [[ "${VQ_PREFLIGHT_ONLY:-0}" == "1" ]]; then
  echo '[OK] VQ_PREFLIGHT_ONLY=1: deployment intentionally not started.'
  exit 0
fi
VQ_SKIP_PREFLIGHT=1 ./INSTALL_V239_5_SCOPE_SHORT_QUERY_FIXED.sh
echo '===== v239.6 FEATURE DEPLOYMENT COMPLETE ====='
echo '[SCOPE] VQ ratio / VQratio / V Q ratio -> V/Q; VO2max / VO₂max -> VO2 max.'
echo '[RAG] Retrieval receives canonical physiology aliases; existing vector indexes are reused, no re-embedding required.'
echo '[FEEDBACK] v239.4 dynamic All / One / Multiple question reporting remains active.'
