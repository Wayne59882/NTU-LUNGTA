#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
echo '===== v239.3 FULL PRE-DEPLOYMENT PREFLIGHT ====='
# Syntax/compile checks for all files changed by v239.x.
bash -n INSTALL_FINAL.sh INSTALL_V239_3_CHECKED.sh CHECK_V239_RESEARCH_FEEDBACK.sh CHECK_V239_1_RESEND_FEEDBACK.sh CHECK_V239_2_RUNTIME_SECRET_SAFE.sh feedback/CONFIGURE_FEEDBACK_RESEND.sh research/five_model_benchmark/RUN_5MODEL_BENCHMARK.sh research/five_model_benchmark/CONFIGURE_CLOUD_KEYS.sh
python3 -m py_compile reference_server.py feedback/feedback_service.py feedback/TEST_RESEND_EMAIL.py feedback/EXPORT_FEEDBACK_CSV.py research/five_model_benchmark/benchmark_5models.py VERIFY_V239_RESEARCH_FEEDBACK.py
NODE_BIN="${NODE_BIN:-}"
if [[ -z "$NODE_BIN" ]]; then
  if command -v node >/dev/null 2>&1; then NODE_BIN="$(command -v node)";
  elif [[ -x /path/to/workdir/node-v22/bin/node ]]; then NODE_BIN=/path/to/workdir/node-v22/bin/node;
  fi
fi
if [[ -n "$NODE_BIN" ]]; then
  "$NODE_BIN" --check web/reference/js/53_local_answer_feedback.js
  "$NODE_BIN" --check web/kb/js/53_local_answer_feedback.js
  echo "[OK] feedback JavaScript syntax: $($NODE_BIN --version)"
else
  echo '[WARN] node unavailable in preflight environment; server installer will bootstrap it.'
fi

./CHECK_V239_2_RUNTIME_SECRET_SAFE.sh

# Dataset parser + 5-model statistics on a real 10-row temporary JSONL file.
TMPD="$(mktemp -d /tmp/v2393preflight.XXXXXX)"
trap 'rm -rf "$TMPD"' EXIT
python3 - "$TMPD/questions.jsonl" <<'PY'
import json,sys
p=sys.argv[1]
with open(p,'w',encoding='utf-8') as f:
    for i in range(1,11):
        f.write(json.dumps({'id':f'Q{i:02d}','source':'preflight','expected_option':'ABCD'[(i-1)%4],'question':f'Physiology preflight item {i}\nA. a\nB. b\nC. c\nD. d'},ensure_ascii=False)+'\n')
PY
python3 - "$TMPD/questions.jsonl" "$TMPD/out" <<'PY'
import importlib.util,sys
from pathlib import Path
qpath=Path(sys.argv[1]); out=Path(sys.argv[2]); out.mkdir()
p=Path('research/five_model_benchmark/benchmark_5models.py')
spec=importlib.util.spec_from_file_location('b2393',p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
d=m.load_dataset(qpath,10)
assert len(d)==10 and len({x['id'] for x in d})==10
r=[]
for mk in m.MODELS:
    for i,q in enumerate(d):
        r.append({'question_id':q['id'],'source':q['source'],'model_key':mk,'model_label':m.MODELS[mk]['label'],'kind':m.MODELS[mk]['kind'],'expected_option':q['expected_option'],'predicted_option':q['expected_option'],'correct':True,'status':'ok','latency_sec':1.0+i/100,'retrieval_sec':0.2,'end_to_end_sec':1.2+i/100,'answer':'{"option":"%s"}'%q['expected_option']})
s=m.analyze(r,d,list(m.MODELS),out)
assert len(s['models'])==5
assert len(s['pairwise_local_vs_cloud'])==6
assert all(x['completed']==10 for x in s['models'].values())
for fn in ('raw_results.csv','summary.csv','summary.json'):
    assert (out/fn).exists(), fn
print('[OK] 10-question / 5-model benchmark parser and statistics dry-run passed')
PY

echo '===== ALL v239.3 FULL PREFLIGHT CHECKS PASSED ====='
