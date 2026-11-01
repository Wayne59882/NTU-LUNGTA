#!/usr/bin/env python3
from __future__ import print_function
import argparse,csv,datetime,json,math,os,re,statistics,time,urllib.error,urllib.request
from pathlib import Path
try:
    import fcntl
except Exception:
    fcntl=None

HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
REF=os.environ.get('VQ_BENCH_REFERENCE_URL','http://127.0.0.1:8182').rstrip('/')
OLLAMA=os.environ.get('VQ_BENCH_OLLAMA_URL','http://127.0.0.1:11435').rstrip('/')
LOCK=os.environ.get('VQ_SHARED_MODEL_LOCK','/tmp/vq_ollama_answer.lock')
MODELS={
 'gemma':{'kind':'local','label':'Gemma 4 12B · Google','model':'gemma4:12b'},
 'mistral':{'kind':'local','label':'Ministral 3 8B · Mistral AI','model':'ministral-3:8b-instruct-2512-q4_K_M'},
 'openai':{'kind':'cloud','label':'GPT-5.6 Luna · OpenAI','model':'gpt-5.6-luna'},
}
SYSTEM=('You are an expert human-physiology professor. Answer the multiple-choice question using the supplied textbook grounding as the primary factual authority. '
        'Compare all options before selecting one. Do not mention sources. Return JSON only with exactly two keys: option and explanation. option must be one capital letter A-D.')

def prompt(q,c):return 'QUESTION:\n%s\n\nPRIVATE TEXTBOOK GROUNDING:\n%s\n\nReturn JSON only: {"option":"A","explanation":"brief reason"}'%(q,c)
def http_json(url,payload=None,headers=None,timeout=180):
    data=None; h={'Content-Type':'application/json'}
    if headers:h.update(headers)
    if payload is not None:data=json.dumps(payload,ensure_ascii=False).encode('utf-8')
    req=urllib.request.Request(url,data=data,headers=h,method='POST' if payload is not None else 'GET');t=time.perf_counter()
    try:
        with urllib.request.urlopen(req,timeout=timeout) as r: raw=r.read().decode('utf-8','replace')
    except urllib.error.HTTPError as e:
        raw=e.read().decode('utf-8','replace')
        try:d=json.loads(raw)
        except Exception:d={'raw':raw}
        msg=(d.get('error') or {}).get('message') if isinstance(d.get('error'),dict) else d.get('error')
        raise RuntimeError('HTTP %s: %s'%(e.code,msg or d.get('message') or raw[:600]))
    elapsed=time.perf_counter()-t
    try:return json.loads(raw),elapsed
    except Exception:raise RuntimeError('Non-JSON response: '+raw[:500])
def load_rows(path):
    rows=[]
    with open(path,'r',encoding='utf-8-sig') as f:
        for line in f:
            if not line.strip():continue
            x=json.loads(line); exp=str(x.get('expected_option') or '').upper()[:1]
            if exp not in 'ABCD':raise ValueError('Invalid expected_option')
            rows.append({'id':str(x['id']),'question':str(x['question']),'expected_option':exp,'source':str(x.get('source') or '')})
    if len(rows)!=10:raise ValueError('This fixed pilot must contain exactly 10 questions, got %d'%len(rows))
    return rows
def obj_text(s):
    s=str(s or '').strip();s=re.sub(r'^```(?:json)?\s*','',s,flags=re.I);s=re.sub(r'\s*```$','',s)
    try:return json.loads(s)
    except Exception:
        m=re.search(r'\{.*\}',s,re.S)
        if m:
            try:return json.loads(m.group(0))
            except Exception:pass
    return {}
def option(text,obj):
    x=str((obj or {}).get('option') or '').upper()[:1]
    if x in 'ABCD':return x
    m=re.search(r'(?:"option"\s*:\s*"?|正確答案\s*[:：]?\s*|^\s*)([A-D])\b',str(text or ''),re.I|re.M);return m.group(1).upper() if m else ''
class Lock:
    def __enter__(self):
        self.fp=open(LOCK,'a+')
        if fcntl is not None:fcntl.flock(self.fp.fileno(),fcntl.LOCK_EX)
        return self
    def __exit__(self,*_):
        try:
            if fcntl is not None:fcntl.flock(self.fp.fileno(),fcntl.LOCK_UN)
        finally:self.fp.close()
def warm(model):
    p={'model':model,'messages':[{'role':'user','content':'Reply OK only.'}],'think':False,'stream':False,'keep_alive':'30m','options':{'num_ctx':4096,'num_predict':2,'temperature':0}}
    with Lock():return http_json(OLLAMA+'/api/chat',p,timeout=300)[1]
def unload(model):
    try:http_json(OLLAMA+'/api/generate',{'model':model,'prompt':'','stream':False,'keep_alive':0},timeout=30)
    except Exception:pass
def local_call(model,q,c):
    p={'model':model,'messages':[{'role':'system','content':SYSTEM},{'role':'user','content':prompt(q,c)}],'format':'json','think':False,'stream':False,'keep_alive':'30m','options':{'num_ctx':4096,'num_predict':320,'temperature':0}}
    with Lock():d,wall=http_json(OLLAMA+'/api/chat',p,timeout=300)
    text=str((d.get('message') or {}).get('content') or '').strip();return text,obj_text(text),wall
def openai_call(model,q,c):
    key=os.environ.get('OPENAI_API_KEY','').strip()
    if not key:raise RuntimeError('OPENAI_API_KEY is not set; existing research/five_model_benchmark/benchmark.env can be reused')
    p={'model':model,'instructions':SYSTEM,'input':prompt(q,c),'max_output_tokens':700,'reasoning':{'effort':'none'},'store':False}
    d,wall=http_json('https://api.openai.com/v1/responses',p,{'Authorization':'Bearer '+key},timeout=180)
    text=str(d.get('output_text') or '').strip()
    if not text:
        bits=[]
        for item in d.get('output') or []:
            for c0 in item.get('content') or []:
                if isinstance(c0,dict) and c0.get('text'):bits.append(str(c0['text']))
        text=''.join(bits).strip()
    return text,obj_text(text),wall
def get_context(row,dirp):
    p=dirp/(row['id']+'.json')
    if p.exists():return json.loads(p.read_text(encoding='utf-8'))
    d,wall=http_json(REF+'/api/reference/context',{'question':row['question'],'model_key':'gemma','profile':'optimized'},timeout=90)
    o={'id':row['id'],'ok':bool(d.get('ok')),'in_scope':bool(d.get('in_scope',True)),'context':str(d.get('context') or ''),'sources':d.get('sources') or [],'retrieval_sec':wall,'search_ms':d.get('search_ms')}
    p.write_text(json.dumps(o,ensure_ascii=False,indent=2),encoding='utf-8');return o
def p95(xs):
    if not xs:return None
    x=sorted(xs);return x[max(0,min(len(x)-1,int(math.ceil(.95*len(x)))-1))]
def median(xs):return statistics.median(xs) if xs else None
def mean(xs):return statistics.mean(xs) if xs else None
def write_outputs(outdir,results):
    fields=['question_id','model_key','model_label','kind','expected_option','predicted_option','correct','status','retrieval_sec','inference_sec','question_to_reply_sec','error','source','answer']
    with open(str(outdir/'raw_results.csv'),'w',newline='',encoding='utf-8-sig') as f:
        w=csv.DictWriter(f,fieldnames=fields);w.writeheader();
        for r in sorted(results,key=lambda x:(x['question_id'],x['model_key'])):w.writerow({k:r.get(k) for k in fields})
    summary=[]
    for key in ('gemma','mistral','openai'):
        rs=[r for r in results if r['model_key']==key]; done=[r for r in rs if r['status']=='ok']; inf=[r['inference_sec'] for r in done]; e2e=[r['question_to_reply_sec'] for r in done]
        row={'model_key':key,'model_label':MODELS[key]['label'],'n_total':len(rs),'n_completed':len(done),'availability':len(done)/float(len(rs) or 1),'correct_total':sum(1 for r in rs if r.get('correct')),'accuracy_all_requests':sum(1 for r in rs if r.get('correct'))/float(len(rs) or 1),'accuracy_completed':sum(1 for r in done if r.get('correct'))/float(len(done) or 1) if done else None,'mean_inference_sec':mean(inf),'median_inference_sec':median(inf),'p95_inference_sec':p95(inf),'mean_question_to_reply_sec':mean(e2e),'median_question_to_reply_sec':median(e2e),'p95_question_to_reply_sec':p95(e2e)};summary.append(row)
    with open(str(outdir/'summary.csv'),'w',newline='',encoding='utf-8-sig') as f:
        w=csv.DictWriter(f,fieldnames=list(summary[0].keys()));w.writeheader();w.writerows(summary)
    (outdir/'summary.json').write_text(json.dumps({'models':summary},ensure_ascii=False,indent=2),encoding='utf-8')
    return summary
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--dataset',default=str(HERE/'questions_10_exact_sources.jsonl'));ap.add_argument('--outdir',default='');ap.add_argument('--self-test',action='store_true');args=ap.parse_args()
    rows=load_rows(args.dataset)
    if args.self_test:
        print('SELF_TEST_PASS questions=%d models=%s'%(len(rows),','.join(MODELS)));return
    outdir=Path(args.outdir) if args.outdir else HERE/'runs'/('three_model_10q_'+datetime.datetime.now().strftime('%Y%m%d_%H%M%S'));outdir.mkdir(parents=True,exist_ok=True);ctxdir=outdir/'contexts';ctxdir.mkdir(exist_ok=True)
    print('===== 10 QUESTIONS × 3 MODELS =====');print('Models: Gemma 4 12B / Ministral 3 8B / GPT-5.6 Luna');print('Each question is sent separately. Same cached RAG evidence is reused across all three models.');print('Question-to-reply time = retrieval wall time + model inference wall time.');print('Run:',outdir)
    contexts={}
    for i,row in enumerate(rows,1):
        c=get_context(row,ctxdir);contexts[row['id']]=c;print('[context %d/10] %s evidence=%d retrieval=%.2fs'%(i,row['id'],len(c.get('sources') or []),float(c.get('retrieval_sec') or 0)))
    results=[]
    for key in ('gemma','mistral','openai'):
        cfg=MODELS[key];print('\n=== %s ==='%cfg['label'])
        if cfg['kind']=='local':
            t=warm(cfg['model']);print('warm-up %.2fs (not scored)'%t)
        for i,row in enumerate(rows,1):
            c=contexts[row['id']];base={'question_id':row['id'],'model_key':key,'model_label':cfg['label'],'kind':cfg['kind'],'expected_option':row['expected_option'],'retrieval_sec':c.get('retrieval_sec'),'source':row['source']}
            try:
                if not c.get('in_scope') or not c.get('context'):raise RuntimeError('RAG context unavailable/in-scope=false')
                if key=='openai':text,obj,sec=openai_call(cfg['model'],row['question'],c['context'])
                else:text,obj,sec=local_call(cfg['model'],row['question'],c['context'])
                pred=option(text,obj);ok=(pred==row['expected_option']);e2e=float(c.get('retrieval_sec') or 0)+sec
                r=dict(base,predicted_option=pred,correct=ok,status='ok',inference_sec=round(sec,4),question_to_reply_sec=round(e2e,4),error='',answer=text);results.append(r)
                print('[%d/10] %s got=%s expected=%s %s inference=%.2fs question-to-reply=%.2fs'%(i,row['id'],pred or '-',row['expected_option'],'PASS' if ok else 'FAIL',sec,e2e))
            except Exception as e:
                r=dict(base,predicted_option='',correct=False,status='error',inference_sec=None,question_to_reply_sec=None,error=str(e),answer='');results.append(r);print('[%d/10] %s ERROR %s'%(i,row['id'],e))
            if key=='openai':time.sleep(float(os.environ.get('VQ_OPENAI_BENCH_GAP_SEC','2.0')))
        if cfg['kind']=='local':unload(cfg['model'])
    summary=write_outputs(outdir,results)
    print('\n===== SUMMARY =====')
    for s in summary:
        print('%s accuracy=%s/%s completed=%s/%s median inference=%s s median question-to-reply=%s s'%(s['model_key'],s['correct_total'],s['n_total'],s['n_completed'],s['n_total'],('%.2f'%s['median_inference_sec']) if s['median_inference_sec'] is not None else '-',('%.2f'%s['median_question_to_reply_sec']) if s['median_question_to_reply_sec'] is not None else '-'))
    print('CSV:',outdir/'raw_results.csv');print('SUMMARY:',outdir/'summary.csv')
if __name__=='__main__':main()
