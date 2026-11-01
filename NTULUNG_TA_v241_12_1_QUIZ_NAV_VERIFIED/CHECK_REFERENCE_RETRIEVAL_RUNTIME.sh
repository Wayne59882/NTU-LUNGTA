#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${1:-http://127.0.0.1:8179}"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT
curl -fsS -X POST "$BASE_URL/api/reference/context" \
  -H 'Content-Type: application/json' \
  -d '{"question":"為什麼肺上面的血比較少，可是V/Q反而比較高？","model_key":"granite"}' > "$TMP"
python3 - "$TMP" <<'PY'
import json,sys

d=json.load(open(sys.argv[1],encoding='utf-8'))
r=d.get('retrieval') or {}
mode=str(r.get('rerank_mode') or '')
print('ok =',d.get('ok'))
print('search_ms =',d.get('search_ms'))
print('retrieval_ms =',r.get('retrieval_ms'))
print('rerank_mode =',mode)
print('source_balanced =',r.get('source_balanced'))
print('top_matches =')
for x in (r.get('top_matches') or [])[:8]:
    print(' ',x)
assert d.get('ok') is True,d
# v237 intentionally appends a precision-profile suffix to the base rerank mode.
# Accept the verified base mode plus its v237 suffix rather than requiring the old v235 exact string.
assert mode.startswith('precomputed exact semantic window vectors'),r
assert 'stem-anchor precision' in mode,r
assert r.get('source_balanced') is True,r
assert int(r.get('stage1_candidate_count') or 0)>=16,r
assert 1<=int(r.get('selected_count') or 0)<=6,r
assert {'guyton','vander','beachey'}.issubset(set(r.get('corpus_sources') or [])),r
assert abs(float(r.get('stem_blend_weight') or 0)-0.92)<1e-9,r
print('[OK] v237 selective-evidence retrieval is active: stem-dominant multi-book candidates -> exact semantic rerank -> Top6.')
PY
