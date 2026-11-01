#!/usr/bin/env python3
"""Five-model physiology benchmark: 3 local + 2 cloud, same question + same cached RAG evidence.
Expected answers are used only after each model response for scoring; they are never sent to models.
Stdlib only. Designed for resumable/quota-safe server-side runs.
"""
from __future__ import print_function
import argparse, csv, datetime as dt, json, math, os, re, statistics, sys, time, urllib.error, urllib.request, urllib.parse
from pathlib import Path
try:
    import fcntl
except Exception:
    fcntl=None

HERE=Path(__file__).resolve().parent
ROOT=HERE.parent.parent
DEFAULT_REF=os.environ.get('VQ_BENCH_REFERENCE_URL','http://127.0.0.1:8182')
OLLAMA=os.environ.get('VQ_BENCH_OLLAMA_URL','http://127.0.0.1:11435')
LOCK_PATH=os.environ.get('VQ_SHARED_MODEL_LOCK','/tmp/vq_ollama_answer.lock')
MODELS={
 'granite':{'kind':'local','label':'Granite 4.2 8B Q5_K_M · IBM','model':'granite4.2:8b-q5_K_M'},
 'gemma':{'kind':'local','label':'Gemma 4 12B · Google','model':'gemma4:12b'},
 'mistral':{'kind':'local','label':'Ministral 3 8B · Mistral AI','model':'ministral-3:8b-instruct-2512-q4_K_M'},
 'openai':{'kind':'cloud','label':'GPT-5.6 Luna · OpenAI','model':'gpt-5.6-luna'},
 'gemini':{'kind':'cloud','label':'Gemini 3.8 Flash · Google','model':'gemini-3.8-flash'},
}

SYSTEM_PROMPT=(
 'You are an expert human-physiology professor. Answer the multiple-choice question using the supplied textbook grounding as the primary factual authority. '
 'Read state, timing, compartment, sign, threshold, units, negation, and comparison words exactly. Compare all options before selecting one. '
 'Do not mention the grounding or sources. Return JSON only with exactly two keys: option and explanation. option must be one capital letter A-D.'
)

def user_prompt(question,context):
    return 'QUESTION:\n%s\n\nPRIVATE TEXTBOOK GROUNDING:\n%s\n\nReturn JSON only: {"option":"A","explanation":"brief reason"}'%(question,context)

def http_json(url,payload=None,headers=None,timeout=90):
    data=None
    h={'Content-Type':'application/json'}
    if headers:h.update(headers)
    if payload is not None:data=json.dumps(payload,ensure_ascii=False).encode('utf-8')
    req=urllib.request.Request(url,data=data,headers=h,method='POST' if payload is not None else 'GET')
    t=time.perf_counter()
    try:
        with urllib.request.urlopen(req,timeout=timeout) as r:
            raw=r.read().decode('utf-8','replace'); status=getattr(r,'status',200)
    except urllib.error.HTTPError as e:
        raw=e.read().decode('utf-8','replace');
        try:d=json.loads(raw)
        except Exception:d={'raw':raw}
        msg=(d.get('error') or {}).get('message') if isinstance(d.get('error'),dict) else d.get('error')
        raise RuntimeError('HTTP %s: %s'%(e.code,msg or d.get('message') or raw[:500]))
    elapsed=time.perf_counter()-t
    try:d=json.loads(raw)
    except Exception:raise RuntimeError('Non-JSON response: '+raw[:500])
    return d,elapsed

def load_dataset(path,max_questions=0):
    rows=[]
    with open(path,'r',encoding='utf-8-sig') as f:
        for line in f:
            line=line.strip()
            if not line:continue
            x=json.loads(line)
            q=str(x.get('question') or '').strip(); exp=str(x.get('expected_option') or '').strip().upper()[:1]
            if not q or exp not in 'ABCD':raise ValueError('Each dataset row needs question and expected_option A-D: '+line[:160])
            rows.append({'id':str(x.get('id') or 'Q%03d'%(len(rows)+1)),'question':q,'expected_option':exp,'source':str(x.get('source') or '')})
            if max_questions and len(rows)>=max_questions:break
    if not rows:raise ValueError('Dataset is empty')
    ids=[r['id'] for r in rows]
    if len(ids)!=len(set(ids)):raise ValueError('Dataset IDs must be unique')
    return rows

def parse_option(answer_text, parsed=None):
    if isinstance(parsed,dict):
        x=str(parsed.get('option') or '').strip().upper()[:1]
        if x in 'ABCD':return x
    s=str(answer_text or '')
    for pat in [r'"option"\s*:\s*"?([A-D])',r'(?:正確答案|答案|answer)\s*[:：]?\s*([A-D])\b',r'^\s*([A-D])\b']:
        m=re.search(pat,s,re.I|re.M)
        if m:return m.group(1).upper()
    return ''

def extract_json_text(s):
    s=str(s or '').strip(); s=re.sub(r'^```(?:json)?\s*','',s,flags=re.I);s=re.sub(r'\s*```$','',s)
    try:return json.loads(s)
    except Exception:
        m=re.search(r'\{.*\}',s,re.S)
        if m:
            try:return json.loads(m.group(0))
            except Exception:pass
    return {}

def retrieve_context(ref_url,row,cache_dir):
    cache_dir.mkdir(parents=True,exist_ok=True); p=cache_dir/(re.sub(r'[^A-Za-z0-9_.-]+','_',row['id'])+'.json')
    if p.exists():return json.loads(p.read_text(encoding='utf-8'))
    d,elapsed=http_json(ref_url.rstrip('/')+'/api/reference/context',{'question':row['question'],'model_key':'granite','profile':'optimized'},timeout=60)
    obj={'id':row['id'],'ok':bool(d.get('ok')),'in_scope':bool(d.get('in_scope',True)),'context':str(d.get('context') or ''),'sources':d.get('sources') or [],'retrieval':d.get('retrieval') or {},'retrieval_wall_sec':elapsed,'search_ms':d.get('search_ms')}
    p.write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
    return obj

class FileLock:
    def __enter__(self):
        self.fp=open(LOCK_PATH,'a+')
        if fcntl is not None:fcntl.flock(self.fp.fileno(),fcntl.LOCK_EX)
        return self
    def __exit__(self,*_):
        try:
            if fcntl is not None:fcntl.flock(self.fp.fileno(),fcntl.LOCK_UN)
        finally:self.fp.close()

def ollama_chat(model,question,context,timeout=300):
    payload={'model':model,'messages':[{'role':'system','content':SYSTEM_PROMPT},{'role':'user','content':user_prompt(question,context)}],
             'format':'json','think':False,'stream':False,'keep_alive':'30m','options':{'num_ctx':4096,'num_predict':320,'temperature':0}}
    with FileLock():d,wall=http_json(OLLAMA.rstrip('/')+'/api/chat',payload,timeout=timeout)
    text=((d.get('message') or {}).get('content') or '').strip(); obj=extract_json_text(text)
    return text,obj,wall,{'ollama_total_sec':float(d.get('total_duration') or 0)/1e9,'ollama_load_sec':float(d.get('load_duration') or 0)/1e9,'prompt_eval_sec':float(d.get('prompt_eval_duration') or 0)/1e9,'eval_sec':float(d.get('eval_duration') or 0)/1e9,'eval_count':d.get('eval_count')}

def unload_local(model):
    try:
        http_json(OLLAMA.rstrip('/')+'/api/generate',{'model':model,'prompt':'','stream':False,'keep_alive':0},timeout=30)
    except Exception:pass

def warm_local(model):
    payload={'model':model,'messages':[{'role':'user','content':'Reply OK only.'}],'think':False,'stream':False,'keep_alive':'30m','options':{'num_ctx':4096,'num_predict':2,'temperature':0}}
    with FileLock():return http_json(OLLAMA.rstrip('/')+'/api/chat',payload,timeout=300)[1]

def call_openai(model,question,context,timeout=120):
    key=os.environ.get('OPENAI_API_KEY','').strip()
    if not key:raise RuntimeError('OPENAI_API_KEY is not set')
    payload={'model':model,'instructions':SYSTEM_PROMPT,'input':user_prompt(question,context),'max_output_tokens':700,'reasoning':{'effort':'none'},'store':False}
    d,wall=http_json('https://api.openai.com/v1/responses',payload,{'Authorization':'Bearer '+key},timeout)
    text=str(d.get('output_text') or '').strip()
    if not text:
        bits=[]
        for item in d.get('output') or []:
            for c in item.get('content') or []:
                if isinstance(c,dict) and c.get('text'):bits.append(str(c['text']))
        text=''.join(bits).strip()
    obj=extract_json_text(text); u=d.get('usage') or {}
    return text,obj,wall,{'input_tokens':u.get('input_tokens'),'output_tokens':u.get('output_tokens'),'total_tokens':u.get('total_tokens')}

def call_gemini(model,question,context,timeout=120,thinking='medium'):
    key=os.environ.get('GEMINI_API_KEY','').strip()
    if not key:raise RuntimeError('GEMINI_API_KEY is not set')
    payload={'systemInstruction':{'parts':[{'text':SYSTEM_PROMPT}]},'contents':[{'role':'user','parts':[{'text':user_prompt(question,context)}]}],
             'generationConfig':{'maxOutputTokens':8192,'thinkingConfig':{'thinkingLevel':thinking}}}
    url='https://generativelanguage.googleapis.com/v1beta/models/'+urllib.parse.quote(model,safe='')+':generateContent'
    d,wall=http_json(url,payload,{'x-goog-api-key':key,'x-goog-api-client':'ntu-physiology-benchmark/239'},timeout)
    parts=((((d.get('candidates') or [{}])[0].get('content') or {}).get('parts')) or [])
    text=''.join(str(p.get('text') or '') for p in parts if isinstance(p,dict)).strip();obj=extract_json_text(text);u=d.get('usageMetadata') or {}
    return text,obj,wall,{'input_tokens':u.get('promptTokenCount'),'output_tokens':u.get('candidatesTokenCount'),'thinking_tokens':u.get('thoughtsTokenCount'),'total_tokens':u.get('totalTokenCount'),'finish_reason':((d.get('candidates') or [{}])[0].get('finishReason'))}

def load_checkpoint(path):
    if path.exists():
        try:return json.loads(path.read_text(encoding='utf-8'))
        except Exception:return {'results':[]}
    return {'results':[]}

def save_checkpoint(path,obj):
    tmp=path.with_suffix('.tmp');tmp.write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8');tmp.replace(path)

def p95(vals):
    if not vals:return None
    x=sorted(vals);return x[max(0,min(len(x)-1,math.ceil(.95*len(x))-1))]

def exact_mcnemar(b,c):
    n=b+c
    if n==0:return 1.0
    k=min(b,c);prob=sum(math.comb(n,i) for i in range(k+1))/(2.0**n)
    return min(1.0,2*prob)

def wilcoxon_approx(diffs):
    vals=[d for d in diffs if abs(d)>1e-12];n=len(vals)
    if n<2:return {'n':n,'z':None,'p':None}
    pairs=sorted((abs(d),1 if d>0 else -1) for d in vals);ranks=[0.0]*n;i=0
    while i<n:
        j=i+1
        while j<n and abs(pairs[j][0]-pairs[i][0])<1e-12:j+=1
        avg=(i+1+j)/2.0
        for k in range(i,j):ranks[k]=avg
        i=j
    wplus=sum(ranks[i] for i,p in enumerate(pairs) if p[1]>0);mean=n*(n+1)/4.0;var=n*(n+1)*(2*n+1)/24.0
    z=(wplus-mean-(0.5 if wplus>mean else -0.5 if wplus<mean else 0))/math.sqrt(var);p=math.erfc(abs(z)/math.sqrt(2.0))
    return {'n':n,'w_plus':round(wplus,4),'z':round(z,4),'p':p}

def analyze(results,dataset,models,outdir):
    expected={r['id']:r['expected_option'] for r in dataset}; by_model={m:[] for m in models}
    for r in results:
        if r.get('model_key') in by_model:by_model[r['model_key']].append(r)
    summary={'dataset_n':len(dataset),'models':{},'pairwise_local_vs_cloud':[]}
    for m,rows in by_model.items():
        done=[r for r in rows if r.get('status')=='ok']; lat=[float(r['latency_sec']) for r in done if r.get('latency_sec') is not None]
        correct=sum(1 for r in done if r.get('correct'))
        e2e=[float(r['end_to_end_sec']) for r in done if r.get('end_to_end_sec') is not None]
        summary['models'][m]={'label':MODELS[m]['label'],'kind':MODELS[m]['kind'],'attempted':len(rows),'completed':len(done),'availability':len(done)/len(dataset),'correct':correct,'accuracy_completed':correct/len(done) if done else None,'end_to_end_accuracy':correct/len(dataset),'mean_latency_sec':statistics.mean(lat) if lat else None,'median_latency_sec':statistics.median(lat) if lat else None,'p95_latency_sec':p95(lat),'min_latency_sec':min(lat) if lat else None,'max_latency_sec':max(lat) if lat else None,'mean_end_to_end_sec':statistics.mean(e2e) if e2e else None,'median_end_to_end_sec':statistics.median(e2e) if e2e else None,'p95_end_to_end_sec':p95(e2e),'errors':len([r for r in rows if r.get('status')!='ok'])}
    local=[m for m in models if MODELS[m]['kind']=='local'];cloud=[m for m in models if MODELS[m]['kind']=='cloud']
    maps={m:{r['question_id']:r for r in by_model[m] if r.get('status')=='ok'} for m in models}
    for lm in local:
        for cm in cloud:
            ids=sorted(set(maps[lm])&set(maps[cm]));b=c=0;diffs=[]
            for qid in ids:
                l=maps[lm][qid];cc=maps[cm][qid];lc=bool(l.get('correct'));gc=bool(cc.get('correct'))
                if lc and not gc:b+=1
                if gc and not lc:c+=1
                diffs.append(float(cc['latency_sec'])-float(l['latency_sec']))
            summary['pairwise_local_vs_cloud'].append({'local':lm,'cloud':cm,'paired_n':len(ids),'accuracy_delta_cloud_minus_local':(sum(bool(maps[cm][i].get('correct')) for i in ids)-sum(bool(maps[lm][i].get('correct')) for i in ids))/len(ids) if ids else None,'median_latency_delta_sec_cloud_minus_local':statistics.median(diffs) if diffs else None,'mean_latency_delta_sec_cloud_minus_local':statistics.mean(diffs) if diffs else None,'cloud_faster_fraction':sum(1 for d in diffs if d<0)/len(diffs) if diffs else None,'mcnemar_local_only_correct_b':b,'mcnemar_cloud_only_correct_c':c,'mcnemar_exact_p':exact_mcnemar(b,c),'wilcoxon_cloud_minus_local':wilcoxon_approx(diffs)})
    (outdir/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
    with (outdir/'summary.csv').open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.writer(f);w.writerow(['model','kind','completed','availability','correct','accuracy_completed','end_to_end_accuracy','mean_latency_sec','median_latency_sec','p95_latency_sec','mean_end_to_end_sec','median_end_to_end_sec','p95_end_to_end_sec','errors'])
        for m in models:
            x=summary['models'][m];w.writerow([m,x['kind'],x['completed'],x['availability'],x['correct'],x['accuracy_completed'],x['end_to_end_accuracy'],x['mean_latency_sec'],x['median_latency_sec'],x['p95_latency_sec'],x['mean_end_to_end_sec'],x['median_end_to_end_sec'],x['p95_end_to_end_sec'],x['errors']])
    with (outdir/'raw_results.csv').open('w',newline='',encoding='utf-8-sig') as f:
        fields=['question_id','source','model_key','model_label','kind','expected_option','predicted_option','correct','status','latency_sec','retrieval_sec','end_to_end_sec','input_tokens','output_tokens','thinking_tokens','total_tokens','error','answer']
        w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();
        for r in sorted(results,key=lambda x:(x.get('question_id',''),x.get('model_key',''))):w.writerow(r)
    return summary

def main():
    ap=argparse.ArgumentParser(description='Same-question/same-evidence benchmark for Granite, Gemma, Ministral, GPT-5.6 Luna, Gemini 3.8 Flash.')
    ap.add_argument('--questions',required=True,help='JSONL dataset with id, question, expected_option, optional source')
    ap.add_argument('--models',default='all',help='all or comma list: granite,gemma,mistral,openai,gemini')
    ap.add_argument('--max-questions',type=int,default=0)
    ap.add_argument('--run-dir',default='')
    ap.add_argument('--reference-url',default=DEFAULT_REF)
    ap.add_argument('--cloud-delay-seconds',type=float,default=1.0,help='Delay after each cloud request to protect free-tier quota')
    ap.add_argument('--cloud-retries',type=int,default=2)
    ap.add_argument('--gemini-thinking',choices=['low','medium','high'],default='medium')
    ap.add_argument('--no-local-warmup',action='store_true')
    args=ap.parse_args()
    selected=list(MODELS) if args.models=='all' else [x.strip() for x in args.models.split(',') if x.strip()]
    bad=[x for x in selected if x not in MODELS]
    if bad:raise SystemExit('Unknown models: '+','.join(bad))
    dataset=load_dataset(args.questions,args.max_questions)
    stamp=dt.datetime.now().strftime('%Y%m%d_%H%M%S');outdir=Path(args.run_dir or (HERE/'runs'/stamp));outdir.mkdir(parents=True,exist_ok=True)
    ck=outdir/'checkpoint.json';state=load_checkpoint(ck);results=state.setdefault('results',[]);done={(r.get('question_id'),r.get('model_key')) for r in results}
    contexts={}
    print('[1/3] Caching one identical RAG context per question...')
    for i,row in enumerate(dataset,1):
        ctx=retrieve_context(args.reference_url,row,outdir/'contexts');contexts[row['id']]=ctx
        print('  context %d/%d %s in_scope=%s evidence=%d'%(i,len(dataset),row['id'],ctx.get('in_scope'),len(ctx.get('sources') or [])))
    (outdir/'run_config.json').write_text(json.dumps({'created_at':dt.datetime.now().isoformat(),'dataset':str(Path(args.questions).resolve()),'models':selected,'model_catalog':{m:MODELS[m] for m in selected},'policy':'same question + same cached RAG context; expected_option post-hoc only','gemini_thinking':args.gemini_thinking},ensure_ascii=False,indent=2),encoding='utf-8')
    print('[2/3] Running models sequentially. Existing checkpoint rows are skipped.')
    for m in selected:
        cfg=MODELS[m];print('\n===',m,cfg['label'],'===')
        if cfg['kind']=='local' and not args.no_local_warmup:
            try:ws=warm_local(cfg['model']);print('  warmup %.2fs (not scored, not included in latency)'%ws)
            except Exception as e:print('  [WARN] warmup failed:',e)
        for i,row in enumerate(dataset,1):
            key=(row['id'],m)
            if key in done:print('  [%d/%d] %s checkpoint-skip'%(i,len(dataset),row['id']));continue
            ctx=contexts[row['id']];base={'question_id':row['id'],'source':row['source'],'model_key':m,'model_label':cfg['label'],'kind':cfg['kind'],'expected_option':row['expected_option'],'retrieval_sec':ctx.get('retrieval_wall_sec')}
            if not ctx.get('in_scope') or not ctx.get('context'):
                rec=dict(base,status='error',error='retrieval_out_of_scope_or_empty',predicted_option='',correct=False,latency_sec=None,end_to_end_sec=None,answer='')
            else:
                attempts=1+(args.cloud_retries if cfg['kind']=='cloud' else 0);last=None
                for attempt in range(attempts):
                    try:
                        if m in ('granite','gemma','mistral'):text,obj,wall,meta=ollama_chat(cfg['model'],row['question'],ctx['context'])
                        elif m=='openai':text,obj,wall,meta=call_openai(cfg['model'],row['question'],ctx['context'])
                        else:text,obj,wall,meta=call_gemini(cfg['model'],row['question'],ctx['context'],thinking=args.gemini_thinking)
                        pred=parse_option(text,obj);rec=dict(base,status='ok',error='',predicted_option=pred,correct=(pred==row['expected_option']),latency_sec=wall,end_to_end_sec=wall+float(ctx.get('retrieval_wall_sec') or 0),answer=text,**meta);last=None;break
                    except Exception as e:
                        last=e
                        if cfg['kind']=='cloud' and attempt<attempts-1:time.sleep(max(1.5,args.cloud_delay_seconds*(attempt+1)))
                if last is not None:rec=dict(base,status='error',error=str(last),predicted_option='',correct=False,latency_sec=None,end_to_end_sec=None,answer='')
            results.append(rec);done.add(key);state['updated_at']=dt.datetime.now().isoformat();save_checkpoint(ck,state)
            print('  [%d/%d] %s got=%s expected=%s %s latency=%s'%(i,len(dataset),row['id'],rec.get('predicted_option') or '-',row['expected_option'],'PASS' if rec.get('correct') else ('ERROR' if rec.get('status')!='ok' else 'FAIL'),('%.2fs'%rec['latency_sec']) if rec.get('latency_sec') is not None else '-'))
            if cfg['kind']=='cloud':time.sleep(max(0,args.cloud_delay_seconds))
        if cfg['kind']=='local':unload_local(cfg['model'])
    print('\n[3/3] Computing accuracy and latency statistics...')
    summary=analyze(results,dataset,selected,outdir)
    for m in selected:
        x=summary['models'][m];print('%-8s completed=%d/%d accuracy=%s median=%s p95=%s'%(m,x['completed'],len(dataset),('%.1f%%'%(100*x['accuracy_completed'])) if x['accuracy_completed'] is not None else '-',('%.2fs'%x['median_latency_sec']) if x['median_latency_sec'] is not None else '-',('%.2fs'%x['p95_latency_sec']) if x['p95_latency_sec'] is not None else '-'))
    print('[OK] Results:',outdir)
    print('     raw_results.csv / summary.csv / summary.json / checkpoint.json')

if __name__=='__main__':main()
