#!/usr/bin/env bash
set -euo pipefail
BASE_URL="${1:-http://127.0.0.1:8179}"
QUESTION='為什麼肺上面的血比較少，可是V/Q反而比較高？'
echo '===== REFERENCE ANSWER RUNTIME DIAGNOSTIC ====='
echo "Base: $BASE_URL"
echo '[1/3] Gateway health'
curl -fsS "$BASE_URL/api/health" | python3 -m json.tool
echo '[2/3] Reference health'
curl -fsS "$BASE_URL/api/reference/health" | python3 -m json.tool
echo '[3/3] Local-only Reference answer (no paid cloud API)'
START=$(python3 - <<'PY'
import time; print(time.time())
PY
)
OUT=$(mktemp)
HTTP=$(curl -sS --max-time 180 -o "$OUT" -w '%{http_code}' -X POST "$BASE_URL/api/reference/answer" \
  -H 'Content-Type: application/json' \
  -d "{\"question\":\"$QUESTION\",\"model_key\":\"granite\",\"cloud_provider\":\"off\"}") || true
END=$(python3 - <<'PY'
import time; print(time.time())
PY
)
python3 -m json.tool < "$OUT" || cat "$OUT"
python3 - <<PY
s=float('$START');e=float('$END');print('elapsed_sec = %.2f' % (e-s));print('http_status = $HTTP')
PY
rm -f "$OUT"
if [[ "$HTTP" != "200" ]]; then
  echo '[ERROR] Local-only Reference answer failed. Inspect logs/reference_backend.log and the gateway/origin health before testing cloud API keys.'
  exit 1
fi
echo '[OK] Local-only Reference answer path is responding.'
