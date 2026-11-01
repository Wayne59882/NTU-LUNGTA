#!/usr/bin/env python3
"""Run the already-seen development regression set without leaking answer keys.

The expected option is read only AFTER the production answer job has completed.
It is never included in retrieval, model prompts, HTTP request bodies, or scope decisions.
This suite measures regression only; it is not an unbiased held-out benchmark.
"""
import argparse,json,re,time,urllib.request,urllib.parse
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
DATA=ROOT/'benchmark'/'regression'/'v237_extended_seen_regression.jsonl'

def request_json(url,payload=None,timeout=60):
    data=None;headers={}
    if payload is not None:
        data=json.dumps(payload,ensure_ascii=False).encode('utf-8');headers['Content-Type']='application/json'
    req=urllib.request.Request(url,data=data,headers=headers,method='POST' if data is not None else 'GET')
    with urllib.request.urlopen(req,timeout=timeout) as r:
        return json.loads(r.read().decode('utf-8'))

def answer_letter(text):
    s=str(text or '')
    m=re.search(r'(?i)(?:正確答案|正确答案|correct\s+answer)\s*[:：]\s*([A-E])\b',s)
    if m:return m.group(1).upper()
    m=re.match(r'\s*([A-E])\s*[\.\):、]',s,re.I)
    return m.group(1).upper() if m else ''

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--base',default='http://127.0.0.1:8182')
    ap.add_argument('--model',default='granite')
    ap.add_argument('--poll-sec',type=float,default=2.0)
    ap.add_argument('--job-timeout-sec',type=float,default=900.0)
    ap.add_argument('--out',default=str(ROOT/'benchmark'/'regression'/'v237_extended_seen_regression_report.json'))
    args=ap.parse_args();base=args.base.rstrip('/')
    rows=[json.loads(x) for x in DATA.read_text(encoding='utf-8').splitlines() if x.strip()]
    results=[]
    print('V237 EXTENDED SEEN DEVELOPMENT REGRESSION')
    print('IMPORTANT: expected answers are post-hoc scoring only; this is NOT a held-out benchmark.\n')
    for i,row in enumerate(rows,1):
        started=time.time()
        # Intentionally send only the question and model. Never send expected_option.
        launch=request_json(base+'/api/reference/answer-job-start',{'question':row['question'],'model_key':args.model,'profile':'optimized'},timeout=30)
        jid=launch['job_id'];deadline=time.time()+args.job_timeout_sec;job=None
        while time.time()<deadline:
            job=request_json(base+'/api/reference/job-status?id='+urllib.parse.quote(jid),timeout=30)
            if job.get('status') in ('done','error'):break
            time.sleep(args.poll_sec)
        if not job or job.get('status')!='done':
            answer='';engine='error';err=(job or {}).get('error','job timeout')
        else:
            result=job.get('result') or {};answer=str(result.get('answer',''));engine=result.get('engine','');err=''
        got=answer_letter(answer);expected=str(row.get('expected_option','')).upper();correct=(got==expected)
        rec={'id':row['id'],'question':row['question'],'expected_option':expected,'agent_option':got,'correct':correct,'answer':answer,'engine':engine,'elapsed_sec':round(time.time()-started,2),'error':err}
        results.append(rec)
        print('[%02d/%02d] %-22s got=%-2s expected=%s  %s  %.1fs'%(i,len(rows),row['id'],got or '-',expected,'PASS' if correct else 'FAIL',rec['elapsed_sec']),flush=True)
    correct=sum(1 for r in results if r['correct']);total=len(results)
    report={'suite':'v237_seen_development_regression','classification':'development-regression-not-heldout','model':args.model,'correct':correct,'total':total,'accuracy':round(correct/total,4) if total else 0,'results':results,
            'method_note':'Expected options were used only after each production answer completed. They were not sent to retrieval, scope, model, or answer endpoints.'}
    Path(args.out).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print('\nRESULT: %d/%d = %.1f%%'%(correct,total,100*correct/total if total else 0))
    print('Report:',args.out)
    raise SystemExit(0 if correct==total else 2)
if __name__=='__main__':main()
