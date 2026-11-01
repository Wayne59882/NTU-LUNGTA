#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
echo '===== v239.5 SHORT PHYSIOLOGY QUERY SCOPE REGRESSION ====='
python3 -m py_compile scope_guard.py reference_server.py
python3 - <<'PY'
from scope_guard import decision, TERM_RE, normalize_scientific_text
positives=[
    '什麼是V/Q','V/Q是什麼','什麼是 V/Q','什麼是V／Q','什麼是V∕Q',
    'PaO₂是什麼','什麼是PaCO₂','SpO₂正常值是多少','HCO₃⁻是什麼','什麼是FRC',
    '解釋SaO₂','什麼是CaO₂','pH與PaCO₂的關係'
]
for q in positives:
    nq=normalize_scientific_text(q)
    d=decision(q,{})
    assert TERM_RE.search(nq), (q,nq)
    assert d.get('in_scope') is True and d.get('topic_term_hit') is True, (q,d)
negatives=['什麼是GPU','什麼是HTML','幫我推薦餐廳','今天天氣如何']
for q in negatives:
    d=decision(q,{})
    assert d.get('in_scope') is False, (q,d)
print('[OK] Chinese-adjacent V/Q is accepted without requiring whitespace')
print('[OK] Unicode-subscript physiology abbreviations are normalized and accepted')
print('[OK] ordinary non-physiology short queries remain rejected')
PY
echo '===== ALL v239.5 SHORT-QUERY SCOPE REGRESSION CHECKS PASSED ====='
