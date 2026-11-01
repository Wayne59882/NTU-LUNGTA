#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
echo '===== v239.4 DYNAMIC BATCH FEEDBACK ACCEPTANCE ====='

python3 -m py_compile feedback/feedback_service.py feedback/EXPORT_FEEDBACK_CSV.py reference_server.py

NODE_BIN="${NODE_BIN:-}"
if [[ -z "$NODE_BIN" ]]; then
  if command -v node >/dev/null 2>&1; then NODE_BIN="$(command -v node)";
  elif [[ -x /path/to/workdir/node-v22/bin/node ]]; then NODE_BIN=/path/to/workdir/node-v22/bin/node;
  fi
fi
if [[ -z "$NODE_BIN" ]]; then
  echo '[FAIL] node is required for v239.4 dynamic feedback acceptance'
  exit 1
fi
"$NODE_BIN" --check web/reference/js/53_local_answer_feedback.js
"$NODE_BIN" --check web/kb/js/53_local_answer_feedback.js

"$NODE_BIN" <<'NODE'
const fs=require('fs'), vm=require('vm');
global.window={};
global.document={readyState:'loading',addEventListener:()=>{},getElementById:()=>null,head:{appendChild:()=>{}},createElement:()=>({})};
vm.runInThisContext(fs.readFileSync('web/reference/js/51_v228_multi_question_batch.js','utf8'));
vm.runInThisContext(fs.readFileSync('web/reference/js/53_local_answer_feedback.js','utf8'));
const A=window.VQ_FEEDBACK2394_TEST_API;
if(!A) throw new Error('v239.4 feedback test API missing');
function batch(n){const q=[];for(let i=1;i<=n;i++)q.push(`${i}. Physiology item ${i}?\nA. option A\nB. option B\nC. option C\nD. option D`);return q.join('\n\n');}
for(const n of [2,10,15,20,40]){
  const got=A.splitQuestions(batch(n));
  if(got.length!==n) throw new Error(`batch parser expected ${n}, got ${got.length}`);
}
const qs=A.splitQuestions(batch(15));
const zh=Array.from({length:15},(_,i)=>`第 ${i+1} 題\n正確答案：${'ABCD'[i%4]}. x\n解釋：answer ${i+1}`).join('\n\n');
const asZh=A.splitAnswers(zh,15,{});
if(asZh.filter(Boolean).length!==15 || !asZh[14].includes('answer 15')) throw new Error('Chinese batch answer splitter failed');
const en=Array.from({length:15},(_,i)=>`Question ${i+1}\nCorrect answer: ${'ABCD'[i%4]}\nExplanation: answer ${i+1}`).join('\n\n');
const asEn=A.splitAnswers(en,15,{});
if(asEn.filter(Boolean).length!==15 || !asEn[9].includes('answer 10')) throw new Error('English batch answer splitter failed');
const kb=Array.from({length:15},(_,i)=>`${i+1}. answer ${i+1}`).join('\n\n');
const asKb=A.splitAnswers(kb,15,{});
if(asKb.filter(Boolean).length!==15 || asKb[14]!=='answer 15') throw new Error('numbered KB answer splitter failed');
const structured={answers:Array.from({length:15},(_,i)=>({id:i+1,answer:`structured ${i+1}`}))};
const asStructured=A.splitAnswers('unparseable text',15,structured);
if(asStructured[0]!=='structured 1'||asStructured[14]!=='structured 15') throw new Error('structured batch answer path failed');
const sel=A.parseQuestionSelection('2, 5, 8-10',15);
if(JSON.stringify(sel)!==JSON.stringify([2,5,8,9,10])) throw new Error('multiple selection parser failed');
for(const bad of ['','0','16','2,x','1-16']){
  let failed=false;try{A.parseQuestionSelection(bad,15);}catch(_){failed=true;}if(!failed)throw new Error('invalid question selector accepted: '+bad);
}
const base={model_key:'granite',model_label:'Granite',engine:'local'};
const pall=A.buildReportPayload(base,qs,asZh,'all',A.allIndices(15));
if(pall.batch_size!==15||pall.report_scope!=='all'||pall.reported_items.length!==15||!pall.question.includes('Question 15')||!pall.answer.includes('AI Answer 15')) throw new Error('all-questions payload failed');
const pone=A.buildReportPayload(base,qs,asZh,'one',[6]);
if(JSON.stringify(pone.reported_items)!=='[6]'||pone.question.includes('Question 5\n')||!pone.question.includes('Question 6\n')) throw new Error('one-question payload failed');
const pm=A.buildReportPayload(base,qs,asZh,'multiple',[2,5,8,9,10]);
if(JSON.stringify(pm.reported_items)!=='[2,5,8,9,10]'||!pm.question.includes('Question 10\n')||pm.question.includes('Question 11\n')) throw new Error('multiple-question payload failed');
const source=fs.readFileSync('web/reference/js/53_local_answer_feedback.js','utf8');
if(source.includes('<select id="vq239FbQ"')||source.includes('<option value=')) throw new Error('old per-question dropdown is still present');
for(const token of ['All questions','One question','Multiple questions','Detected batch size']) if(!source.includes(token)) throw new Error('missing UI token: '+token);
console.log('[OK] dynamic batch detection: 2/10/15/20/40 questions');
console.log('[OK] all / one / multiple feedback scopes with typed question numbers');
console.log('[OK] no 15-item dropdown; question-number/range input is used');
NODE

TMPDB="$(mktemp /tmp/vqfb2394-oldschema.XXXXXX.sqlite3)"; rm -f "$TMPDB"
python3 - "$TMPDB" <<'PY'
import sqlite3,sys
p=sys.argv[1]
c=sqlite3.connect(p)
c.execute('''CREATE TABLE feedback (
 id TEXT PRIMARY KEY, created_at TEXT NOT NULL, question TEXT NOT NULL, answer TEXT NOT NULL,
 reason TEXT NOT NULL, comment TEXT, model_key TEXT, model_label TEXT, engine TEXT, cloud_provider TEXT,
 latency_ms REAL, source_ids TEXT, page_version TEXT, email_status TEXT NOT NULL DEFAULT 'pending', email_error TEXT)''')
c.commit();c.close()
PY
VQ_FEEDBACK_DB="$TMPDB" VQ_EMAIL_PROVIDER='' VQ_RESEND_API_KEY='' VQ_SMTP_HOST='' python3 - <<'PY'
import json,sqlite3,os
from feedback import feedback_service as f
q='\n\n'.join('Question %d\nQ%d A/B/C/D'%(i,i) for i in range(1,16))
a='\n\n'.join('AI Answer %d\nAnswer %d'%(i,i) for i in range(1,16))
x=f.save_feedback({'question':q,'answer':a,'reason':'unclear','report_scope':'multiple','batch_size':15,'reported_items':[2,5,8,9,10],'model_key':'granite','engine':'local'})
assert x['saved'] and x['batch_size']==15 and x['reported_items']==[2,5,8,9,10],x
c=sqlite3.connect(os.environ['VQ_FEEDBACK_DB']); cols={r[1] for r in c.execute('PRAGMA table_info(feedback)')}; row=c.execute('SELECT report_scope,batch_size,reported_items FROM feedback WHERE id=?',(x['id'],)).fetchone();c.close()
assert {'report_scope','batch_size','reported_items'}<=cols,cols
assert row[0]=='multiple' and row[1]==15 and json.loads(row[2])==[2,5,8,9,10],row
body=f._body_text({'id':'x','created_at':'now','reason':'unclear','report_scope':'multiple','batch_size':15,'reported_items':'[2,5,8,9,10]','model_label':'Granite','engine':'local','cloud_provider':'off','latency_ms':100,'source_ids':'[]','question':'Q','answer':'A','comment':''})
assert 'Detected batch size: 15' in body and 'Reported questions: 2, 5, 8-10' in body and 'Multiple questions' in body,body
print('[OK] old v239.x SQLite database migrates in place and preserves dynamic scope metadata')
PY
rm -f "$TMPDB"
VQ_EMAIL_PROVIDER=resend VQ_RESEND_API_KEY=re_test_batch VQ_FEEDBACK_TO_EMAIL=owner@example.net python3 - <<'PY2'
import json, urllib.request
from feedback import feedback_service as f
class Resp:
    def __enter__(self): return self
    def __exit__(self,*a): return False
    def read(self): return b'{"id":"mock-batch-email"}'
captured={}
def fake(req,timeout=None):
    assert isinstance(req,urllib.request.Request)
    captured['body']=json.loads(req.data.decode('utf-8'))
    return Resp()
orig=f.urllib.request.urlopen
f.urllib.request.urlopen=fake
try:
    q='\n\n'.join('Question %d\nQuestion text %d'%(i,i) for i in range(1,16))
    a='\n\n'.join('AI Answer %d\nAnswer text %d'%(i,i) for i in range(1,16))
    row={'id':'batch15','created_at':'now','question':q,'answer':a,'reason':'unclear','comment':'all confused','model_key':'granite','model_label':'Granite','engine':'local','cloud_provider':'off','latency_ms':10075,'source_ids':'[]','page_version':'v239.4','report_scope':'all','batch_size':15,'reported_items':json.dumps(list(range(1,16)))}
    eid=f._send_resend(row)
finally:
    f.urllib.request.urlopen=orig
assert eid=='mock-batch-email'
body=captured['body']['text']
assert 'Report scope: All questions' in body
assert 'Detected batch size: 15' in body
assert 'Reported questions: 1-15' in body
assert 'Question 15' in body and 'AI Answer 15' in body and 'Answer text 15' in body
print('[OK] 15-question All-questions Resend email contains the complete Q1-Q15 report')
PY2
grep -q '53_local_answer_feedback.js?v=2394feedback1' web/reference/index.html
grep -q '53_local_answer_feedback.js?v=2394feedback1' web/kb/index.html
grep -q 'v239.4-dynamic-batch-feedback' V239_FEATURE_VERSION.txt

echo '===== ALL v239.4 DYNAMIC BATCH FEEDBACK CHECKS PASSED ====='
