#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
echo '===== v239.5 FULL PRE-DEPLOYMENT PREFLIGHT ====='
bash -n INSTALL_FINAL.sh INSTALL_V239_5_SCOPE_SHORT_QUERY_FIXED.sh CHECK_V239_5_SCOPE_SHORT_QUERY.sh CHECK_V239_5_FULL_PREFLIGHT.sh
./CHECK_V239_4_FULL_PREFLIGHT.sh
./CHECK_V239_5_SCOPE_SHORT_QUERY.sh
# The shipped student pages must still contain v239.4 dynamic feedback.
grep -q 'v239.4-dynamic-batch-feedback' web/reference/js/53_local_answer_feedback.js
grep -q 'All questions' web/reference/js/53_local_answer_feedback.js
grep -q 'Multiple questions' web/reference/js/53_local_answer_feedback.js
# Guard implementation must use ASCII-only token boundaries, not Python Unicode \b.
grep -q '(?<!\[A-Za-z0-9_\])' scope_guard.py
grep -q 'normalize_scientific_text' scope_guard.py
echo '[OK] v239.4 dynamic batch feedback preserved unchanged'
echo '[OK] v239.5 short-query physiology scope fix present'
echo '===== ALL v239.5 FULL PREFLIGHT CHECKS PASSED ====='
