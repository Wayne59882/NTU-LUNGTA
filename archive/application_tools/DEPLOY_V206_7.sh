#!/usr/bin/env bash
set -euo pipefail
BASE="/path/to/workdir"; NEW="$BASE/NTULUNG_TA_v206_7"; LOG="$BASE/v207_server.log"; PUBLIC_URL="https://lungta.twchu.workers.dev"
cd "$NEW"; mkdir -p logs
export PATH="$BASE/node-v22/bin:$BASE/miniforge-teacher-tts/bin:$BASE/ollama/bin:$PATH"
export OLLAMA_HOST="${OLLAMA_HOST:-127.0.0.1:11435}"

echo '===== [1/8] STATIC ACCEPTANCE ====='
./CHECK_V206_7.sh

echo '===== [2/8] 3D AVATAR RUNTIME CHECK ====='
./ENSURE_3D_RUNTIME.sh

echo '===== [3/8] PREPARE SEMANTIC VECTOR RAG ====='
./PREPARE_REFERENCE_VECTOR_RAG.sh

echo '===== [4/8] SWITCH LOCAL SERVER ====='
pkill -f '[g]ateway.py.*8179' 2>/dev/null || true
pkill -f '[k]b_server.py.*8181' 2>/dev/null || true
pkill -f '[r]eference_server.py.*8182' 2>/dev/null || true
nohup ./START_VQ_TA_SERVER.sh > "$LOG" 2>&1 & echo $! > logs/server_launcher.pid
for _ in $(seq 1 180); do curl -fsS http://127.0.0.1:8179/api/health >/dev/null 2>&1 && break; sleep 1; done
curl -fsS http://127.0.0.1:8179/api/health | python3 -m json.tool
curl -fsS http://127.0.0.1:8179/api/reference/health > /tmp/v207_ref_health.json
python3 - <<'PY'
import json
r=json.load(open('/tmp/v207_ref_health.json'))
assert r.get('ok'),r
rt=r.get('reference_textbook',{})
assert rt.get('search_method')=='semantic vector RAG',r
assert rt.get('vector_index_ready') is True,r
assert rt.get('embedding_model')=='bge-m3:latest',r
print('[OK] Reference Vector RAG ready:',rt)
PY

echo '===== [5/8] RETRIEVAL REGRESSION QUESTIONS ====='
for q in '站著跟坐著VQ ratio變化' '站著跟坐著 V/Q ratio 變化 會變高還是變低' '為什麼肺上面的血比較少，可是VQ反而比較高？'; do
  Q="$q" python3 - <<'PY'
import json,os,urllib.request
q=os.environ['Q']
p={'question':q,'model_key':'granite'}
req=urllib.request.Request('http://127.0.0.1:8179/api/reference/context',data=json.dumps(p,ensure_ascii=False).encode(),headers={'Content-Type':'application/json'},method='POST')
with urllib.request.urlopen(req,timeout=60) as r:d=json.load(r)
assert d.get('ok'),(q,d)
ctx=str(d.get('context') or '').lower(); ch={s.get('chapter') for s in d.get('sources',[])}
assert ch & {39,40},(q,ch,d.get('sources'))
assert any(k in ctx for k in ('upright','upper part','top of the lung','apex','lower part','bottom of the lung')),(q,ctx[:1500])
print('[OK]',q,'pages=',[s.get('pdf_page') for s in d.get('sources',[])],'evidence=',d.get('evidence_count'))
PY
done

echo '===== [6/8] KB + LUNG REGRESSION ====='
curl -fsS http://127.0.0.1:8179/api/kb/health | python3 -c "import sys,json;d=json.load(sys.stdin);assert d.get('ok') and d.get('kb_gate')==68 and d.get('domain_gate_enabled') is False,d;print('[OK] Curated KB unchanged')"
node VERIFY_V206_7_LUNG.cjs

echo '===== [7/8] CLOUDFLARE DEPLOY ====='
./DEPLOY_CLOUDFLARE_WORKERS_DEV.sh
sleep 4
curl -fsS --max-time 30 "$PUBLIC_URL/api/health" | python3 -m json.tool
curl -fsS --max-time 30 "$PUBLIC_URL/api/reference/health" | python3 -c "import sys,json;d=json.load(sys.stdin);assert d.get('reference_textbook',{}).get('search_method')=='semantic vector RAG',d;print('[OK] public semantic Vector RAG health')"

echo '===== [8/8] PUBLIC ANSWER SMOKE TEST ====='
curl -fsS --max-time 120 -X POST "$PUBLIC_URL/api/reference/answer" -H 'Content-Type: application/json' \
  -d '{"question":"為什麼肺上面的血比較少，可是V/Q反而比較高？","model_key":"granite"}' > /tmp/v207_public_answer.json
python3 - <<'PY'
import json,re
x=json.load(open('/tmp/v207_public_answer.json')); a=str(x.get('answer') or '')
assert a and x.get('sources'),x
assert len(re.findall(r'[\u4e00-\u9fff]',a))>=20,(x,a)
# The exact previously bad question must now answer the apex/base mechanism, not drift to COPD/VQ=0.
assert ('肺尖' in a or '肺上' in a) and ('灌流' in a or '血流' in a) and ('通氣' in a or 'ventilation' in a.lower()),a
print('[OK] public grounded answer engine=',x.get('engine'))
print(a)
PY

echo '[PASS] v207 semantic Vector RAG release accepted.'
echo '[PASS] Original Curated Knowledge Base retained.'
echo '[PASS] Reference Book = semantic Vector RAG + compact reranking + grounded Local/Cloud answer.'
echo '[PASS] Speech rate/pitch playback-position fix retained.'
echo '[PASS] Yating/Zhiwei 3D Avatar no longer depends on old deleted server folders.'
