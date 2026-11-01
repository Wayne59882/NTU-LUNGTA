#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
echo '===== v239.6 FULL PRE-DEPLOYMENT PREFLIGHT ====='
bash -n INSTALL_FINAL.sh INSTALL_V239_6_ALIAS_NORMALIZATION_FIXED.sh CHECK_V239_6_ALIAS_NORMALIZATION.sh CHECK_V239_6_FULL_PREFLIGHT.sh
./CHECK_V239_5_FULL_PREFLIGHT.sh
./CHECK_V239_6_ALIAS_NORMALIZATION.sh
# Dynamic feedback from v239.4 must remain present.
grep -q 'v239.4-dynamic-batch-feedback' web/reference/js/53_local_answer_feedback.js
grep -q 'All questions' web/reference/js/53_local_answer_feedback.js
grep -q 'Multiple questions' web/reference/js/53_local_answer_feedback.js
# Existing private runtime state must remain excluded from release packaging.
grep -q 'research/five_model_benchmark/benchmark.env' .gitignore
grep -q 'feedback/feedback.env' .gitignore
echo '[OK] v239.4 dynamic feedback preserved'
echo '[OK] v239.5 Unicode/scientific notation normalization preserved'
echo '[OK] v239.6 VQ + VO2max alias normalization active in scope and retrieval'
echo '===== ALL v239.6 FULL PREFLIGHT CHECKS PASSED ====='
