#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
python3 -m py_compile reference_server.py feedback/feedback_service.py feedback/EXPORT_FEEDBACK_CSV.py research/five_model_benchmark/benchmark_5models.py
python3 VERIFY_V239_RESEARCH_FEEDBACK.py
NODE_BIN="${NODE_BIN:-}"
if [[ -z "$NODE_BIN" ]]; then
  if command -v node >/dev/null 2>&1; then NODE_BIN="$(command -v node)";
  elif [[ -x /path/to/workdir/node-v22/bin/node ]]; then NODE_BIN=/path/to/workdir/node-v22/bin/node;
  fi
fi
if [[ -n "$NODE_BIN" ]]; then
  "$NODE_BIN" --check web/reference/js/53_local_answer_feedback.js
  "$NODE_BIN" --check web/kb/js/53_local_answer_feedback.js
else
  echo '[WARN] node not available here; JS syntax check skipped (installer/server has Node bootstrap).'
fi
TMPDB="$(mktemp /tmp/vqfb239.XXXXXX.sqlite3)"; rm -f "$TMPDB"
VQ_FEEDBACK_DB="$TMPDB" python3 - <<'PY'
from feedback.feedback_service import save_feedback,status
x=save_feedback({'question':'test physiology question','answer':'test local answer','reason':'incorrect','model_key':'granite','model_label':'Granite','engine':'local','latency_ms':123})
assert x['saved'] and not x['email_queued']; assert status()['enabled']
print('[OK] feedback SQLite persistence smoke test')
PY
rm -f "$TMPDB"
python3 - <<'PY'
import importlib.util,tempfile
from pathlib import Path
p=Path('research/five_model_benchmark/benchmark_5models.py')
spec=importlib.util.spec_from_file_location('b239',p);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
d=[{'id':'Q1','question':'x','expected_option':'A','source':''},{'id':'Q2','question':'x','expected_option':'B','source':''}]
r=[]
for mk in m.MODELS:
 for i,q in enumerate(d):r.append({'question_id':q['id'],'source':'','model_key':mk,'model_label':m.MODELS[mk]['label'],'kind':m.MODELS[mk]['kind'],'expected_option':q['expected_option'],'predicted_option':q['expected_option'],'correct':True,'status':'ok','latency_sec':1+i/10,'retrieval_sec':.2,'end_to_end_sec':1.2+i/10,'answer':'{}'})
out=Path(tempfile.mkdtemp());s=m.analyze(r,d,list(m.MODELS),out)
assert len(s['models'])==5 and len(s['pairwise_local_vs_cloud'])==6
assert (out/'raw_results.csv').exists() and (out/'summary.csv').exists() and (out/'summary.json').exists()
print('[OK] five-model statistics smoke test: 5 models / 6 Local-vs-Cloud pairs')
PY
echo '===== ALL v239 FIVE-MODEL BENCHMARK + FEEDBACK CHECKS PASSED ====='
