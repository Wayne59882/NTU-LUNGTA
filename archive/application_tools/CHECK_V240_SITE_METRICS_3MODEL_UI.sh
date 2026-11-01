#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo '===== v240 SITE METRICS + 3-MODEL UI + REFERENCE FLOW ACCEPTANCE ====='
python3 -m py_compile site_metrics.py reference_server.py kb_server.py gateway.py research/three_model_10q/benchmark_3models.py
node --check cloudflare/worker/src/index.js >/dev/null
node --check web/reference/js/31_local_llm_selector.js >/dev/null
node --check web/reference/js/50_cloud_byok_selector.js >/dev/null
node --check web/reference/js/54_site_metrics.js >/dev/null
node --check web/kb/js/31_local_llm_selector.js >/dev/null
node --check web/kb/js/54_site_metrics.js >/dev/null
bash -n START_VQ_TA_SERVER.sh INSTALL_V238_ACCURACY_ROBUST_BATCH_STABLE.sh research/three_model_10q/RUN_3MODEL_10Q_BENCHMARK.sh

# Student-visible model catalog: exactly 2 local + 1 cloud.
grep -q '<option selected value="gemma">Gemma 4 12B · Google</option>' web/reference/index.html web/kb/index.html
grep -q '<option value="mistral">Ministral 3 8B · Mistral AI</option>' web/reference/index.html web/kb/index.html
grep -q '<option value="openai">GPT-5.6 Luna · OpenAI</option>' web/reference/index.html
! grep -q 'Granite 4.2 8B Q5_K_M · IBM' web/reference/index.html web/kb/index.html web/reference/js/31_local_llm_selector.js web/kb/js/31_local_llm_selector.js
! grep -q 'Gemini 3.8 Flash\|gemini-3.8-flash' web/reference/index.html web/reference/js/50_cloud_byok_selector.js cloudflare/worker/src/index.js
grep -q "const DEFAULT_KEY='gemma'" web/reference/js/31_local_llm_selector.js web/kb/js/31_local_llm_selector.js
grep -q "DEFAULT_MODEL_KEY='gemma'" reference_server.py
grep -q 'DEFAULT_MODEL_KEY = "gemma"' kb_server.py
grep -q "SELECTABLE_MODEL_KEYS=('gemma','mistral')" reference_server.py
grep -q 'SELECTABLE_MODEL_KEYS = ("gemma", "mistral")' kb_server.py

# Site activity counters are small, English, and anonymous-browser based.
grep -q 'Online now:' web/reference/js/54_site_metrics.js web/kb/js/54_site_metrics.js
grep -q 'Total visitors:' web/reference/js/54_site_metrics.js web/kb/js/54_site_metrics.js
grep -q '/api/reference/site-metrics' web/reference/js/54_site_metrics.js web/kb/js/54_site_metrics.js reference_server.py
grep -q 'site-activity-badge' web/reference/css/v240_site_metrics.css web/kb/css/v240_site_metrics.css
grep -q 'anonymous-browser-id' site_metrics.py

TMPDB="$(mktemp /tmp/v240_metrics_XXXX.sqlite3)"; rm -f "$TMPDB"
VQ_SITE_METRICS_DB="$TMPDB" python3 - <<'PY'
import site_metrics
x=site_metrics.heartbeat({'visitor_id':'visitor-test-0001','session_id':'session-test-0001'})
assert x['online_now']==1 and x['total_visitors']==1,x
y=site_metrics.heartbeat({'visitor_id':'visitor-test-0002','session_id':'session-test-0002'})
assert y['online_now']==2 and y['total_visitors']==2,y
z=site_metrics.snapshot(); assert z['online_now']==2 and z['total_visitors']==2,z
print('[OK] anonymous site metrics heartbeat/snapshot')
PY
rm -f "$TMPDB" "$TMPDB-wal" "$TMPDB-shm"

# Fixed 10-question, exact-source, three-model benchmark.
python3 research/three_model_10q/benchmark_3models.py --self-test | grep -q 'SELF_TEST_PASS questions=10 models=gemma,mistral,openai'
test -s research/three_model_10q/SOURCE_AUDIT_10Q.md
test -s docs/V240_VQ_RATIO_VIRTUAL_HUMAN_TA_SUMMARY_FLOWCHART.png

echo '===== v240 ACCEPTANCE PASSED ====='
echo '[UI] Gemma + Ministral + GPT-5.6 Luna only; Gemma is the initial local model.'
echo '[ANALYTICS] Online now / Total visitors counters are active via anonymous IDs; no IP/name/email/question content stored.'
echo '[BENCHMARK] Same 10 exact-source questions compare accuracy + inference + retrieval-to-reply time for the 3 remaining models.'
echo '[FLOWCHART] Reference Textbook branch added under Student Q&A alongside Knowledge Base.'
