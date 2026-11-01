#!/usr/bin/env python3
from __future__ import print_function
import argparse,json,re,time
from pathlib import Path
try:
    from urllib.request import Request,urlopen
except ImportError:
    from urllib2 import Request,urlopen
ROOT=Path(__file__).resolve().parents[2]
HERE=Path(__file__).resolve().parent

def load(p):return [json.loads(x) for x in Path(p).read_text(encoding='utf-8').splitlines() if x.strip()]
def post(url,payload,timeout=1800):
    b=json.dumps(payload,ensure_ascii=False).encode('utf-8');r=Request(url,data=b,headers={'Content-Type':'application/json'},method='POST')
    with urlopen(r,timeout=timeout) as x:return json.loads(x.read().decode('utf-8'))
def qtext(row):return str(row.get('question_text') or '')
def exp(row):return str(row.get('official_answer_letter') or '').upper()
def got(text):
    m=re.search(r'(?:正確答案|正确答案|correct\s+answer)\s*[:：]\s*([A-D])\b',text or '',re.I)
    if not m:m=re.search(r'^\s*([A-D])[\.、:：\s]',text or '',re.I)
    return m.group(1).upper() if m else ''
def groups(xs,n):
    for i in range(0,len(xs),n):yield xs[i:i+n]

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--profile',choices=['baseline','optimized'],required=True);ap.add_argument('--model',choices=['granite','gemma','mistral'],default='granite');ap.add_argument('--base-url',default='http://127.0.0.1:8182');ap.add_argument('--batch-size',type=int,default=8);ap.add_argument('--limit',type=int,default=0);ap.add_argument('--output',default='');args=ap.parse_args()
    ds=HERE/'dataset'/'benchmark.jsonl';rows=load(ds);rows=rows[:args.limit] if args.limit else rows;base=args.base_url.rstrip('/');results=[];tall=time.time()
    for gidx,group in enumerate(groups(rows,max(2,min(8,args.batch_size))),1):
        questions=[qtext(r) for r in group];t0=time.time()
        ctx=post(base+'/api/reference/context-batch',{'questions':questions,'model_key':args.model,'profile':args.profile,'diagnostic':True},timeout=1200)
        items=ctx.get('items') or []
        ans=post(base+'/api/reference/answer-batch-local',{'items':items,'model_key':args.model,'profile':args.profile},timeout=2400)
        elapsed=time.time()-t0; amap={int(x.get('id')):x for x in ans.get('answers') or [] if isinstance(x,dict)};cmap={int(x.get('id')):x for x in items if isinstance(x,dict)}
        for i,row in enumerate(group,1):
            ao=amap.get(i,{}) ; co=cmap.get(i,{}) ; answer=ao.get('answer','');pred=got(answer);expected=exp(row)
            results.append({'meta':row.get('meta',{}),'question':qtext(row),'expected':expected,'predicted':pred,'correct':pred==expected,'answer':answer,
              'profile':args.profile,'model':args.model,'batch_elapsed_sec':round(elapsed,3),'retrieval_query':(co.get('retrieval') or {}).get('retrieval_query',''),
              'context':co.get('context',''),'sources':co.get('sources') or [],'retrieval':co.get('retrieval') or {},'verification':ao.get('verification') or {}})
        print('[%s/%s] batch %d: %d/%d correct'%(args.model,args.profile,gidx,sum(1 for x in results if x['correct']),len(results)),flush=True)
    correct=sum(1 for x in results if x['correct']);total=len(results);wrong=[{'year':x['meta'].get('year'),'qno':x['meta'].get('qno'),'expected':x['expected'],'predicted':x['predicted']} for x in results if not x['correct']]
    out={'model':args.model,'profile':args.profile,'correct':correct,'total':total,'accuracy':round(correct/float(total),4) if total else 0,'elapsed_sec':round(time.time()-tall,2),'wrong':wrong,'rows':results,
      'methodology':'Official MOEX answer keys are used only after the agent response for scoring. They are never included in retrieval, prompts, self-verification, or runtime answer rules.'}
    op=Path(args.output) if args.output else ROOT/'benchmark/output'/('moex_%s_%s_trace.json'%(args.model,args.profile));op.parent.mkdir(parents=True,exist_ok=True);op.write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
    print('===== RESULT =====');print('%s %s: %d/%d = %.2f%%'%(args.model,args.profile,correct,total,100.0*correct/total if total else 0));print('[OK]',op)
if __name__=='__main__':main()
