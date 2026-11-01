#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
echo '===== v239.4 FULL PRE-DEPLOYMENT PREFLIGHT ====='
bash -n INSTALL_FINAL.sh INSTALL_V239_4_DYNAMIC_BATCH_FEEDBACK.sh INSTALL_V238_ACCURACY_ROBUST_BATCH_STABLE.sh CHECK_V239_4_DYNAMIC_BATCH_FEEDBACK.sh CHECK_V239_4_FULL_PREFLIGHT.sh
./CHECK_V239_3_FULL_PREFLIGHT.sh
./CHECK_V239_4_DYNAMIC_BATCH_FEEDBACK.sh
./CHECK_V238_1_GEMINI_BYOK.sh
./CHECK_V238_ACCURACY_ROBUST_BATCH_STABLE.sh
grep -q 'Server-to-workers.dev public health check timed out/failed' INSTALL_V238_ACCURACY_ROBUST_BATCH_STABLE.sh
grep -q 'Server-to-workers.dev reference health check timed out/failed' INSTALL_V238_ACCURACY_ROBUST_BATCH_STABLE.sh
echo '[OK] post-deploy workers.dev curl timeout is non-fatal after successful Worker upload'
echo '===== ALL v239.4 FULL PREFLIGHT CHECKS PASSED ====='
