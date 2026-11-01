#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
echo '===== v239.6 PHYSIOLOGY ALIAS NORMALIZATION REGRESSION ====='
python3 -m py_compile scope_guard.py reference_search.py reference_server.py
python3 - <<'PY'
from scope_guard import decision, TERM_RE, normalize_scientific_text
from reference_search import _retrieval_alias_query

cases={
    'VQ ratio':'V/Q ratio',
    'V/Q ratio':'V/Q ratio',
    'VQratio':'V/Q ratio',
    'V Q ratio':'V/Q ratio',
    'v q ratio':'V/Q ratio',
    '什麼是VQ ratio':'什麼是V/Q ratio',
    '什麼是V/Q':'什麼是V/Q',
    'VO2 max':'VO2 max',
    'VO2max':'VO2 max',
    'VO₂ max':'VO2 max',
    'VO₂max':'VO2 max',
    'vo2max':'VO2 max',
    '什麼是VO2max':'什麼是VO2 max',
}
for raw,want in cases.items():
    got=normalize_scientific_text(raw)
    assert got==want,(raw,got,want)
    d=decision(raw,{})
    assert d.get('in_scope') is True and d.get('topic_term_hit') is True,(raw,d)
    assert TERM_RE.search(got),(raw,got)

assert 'ventilation perfusion ratio' in _retrieval_alias_query('VQ ratio').lower()
assert 'ventilation perfusion ratio' in _retrieval_alias_query('什麼是V/Q').lower()
assert 'maximal oxygen uptake' in _retrieval_alias_query('VO2max').lower()
assert 'maximal oxygen uptake' in _retrieval_alias_query('VO₂ max').lower()

for q in ['GPU','HTML','VQGAN','VO2codec','weather','推薦餐廳']:
    d=decision(q,{})
    assert d.get('in_scope') is False,(q,d)

print('[OK] VQ / V-Q natural aliases canonicalize to V/Q')
print('[OK] VO2max / VO₂max natural aliases canonicalize to VO2 max')
print('[OK] retrieval query expands V/Q -> ventilation perfusion ratio')
print('[OK] retrieval query expands VO2 max -> maximal oxygen uptake')
print('[OK] non-physiology lookalikes remain out of scope')
PY

grep -q 'normalize_scientific_text' reference_search.py
grep -q '_retrieval_alias_query' reference_search.py

echo '===== ALL v239.6 ALIAS NORMALIZATION CHECKS PASSED ====='
