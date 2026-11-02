#!/usr/bin/env python3
"""Compare any MC-VHTA base local model vs its QLoRA-adapted variant on the held-out behavior test set.

This evaluator intentionally measures response-contract compliance and deterministic
MCQ/calculation correctness where an answer key is available. It does not claim to
replace expert review of free-text physiology explanations.
"""
import argparse, json, re, time, urllib.request, urllib.error
from pathlib import Path
from collections import defaultdict
from model_profiles import profile

ROOT = Path(__file__).resolve().parent

def post_json(url, payload, timeout=180):
    data=json.dumps(payload,ensure_ascii=False).encode('utf-8')
    req=urllib.request.Request(url,data=data,headers={'Content-Type':'application/json'},method='POST')
    with urllib.request.urlopen(req,timeout=timeout) as r:
        return json.loads(r.read().decode('utf-8'))

def normalize(s):
    return re.sub(r'\s+',' ',str(s or '')).strip()

def answer_letter_from_expected(row):
    m=(row.get('meta') or {}).get('answer_letter')
    if m: return str(m).upper()
    expected=row['messages'][-1]['content']
    x=re.search(r'(?:正確答案|Correct answer)\s*[:：]\s*([A-E])\b',expected,re.I)
    return x.group(1).upper() if x else None

def expected_numeric(row):
    expected=row['messages'][-1]['content']
    # Prefer first line after Answer/答案; avoid equation operands.
    x=re.search(r'(?:^|\n)(?:答案|Answer)\s*[:：]\s*\n?\s*([-+]?\d+(?:\.\d+)?)',expected,re.I)
    if x: return float(x.group(1))
    # For calculation MCQ, extract number from selected option first line.
    x=re.search(r'(?:正確答案|Correct answer)\s*[:：]\s*[A-E][\.、:]?\s*([-+]?\d+(?:\.\d+)?)',expected,re.I)
    return float(x.group(1)) if x else None

def contains_numeric(text, target):
    if target is None: return True
    vals=[]
    for x in re.findall(r'(?<![A-Za-z])[-+]?\d+(?:\.\d+)?',text):
        try: vals.append(float(x))
        except Exception: pass
    tol=max(1e-6,abs(target)*1e-6)
    return any(abs(v-target)<=tol for v in vals)

def score_row(row, text):
    typ=row.get('type',''); lang=row.get('language','')
    t=text.strip(); checks={}
    zh=lang.lower().startswith('zh')
    if typ.startswith('multiple_choice'):
        key=answer_letter_from_expected(row)
        got=re.search(r'(?:正確答案|Correct answer)\s*[:：]\s*([A-E])\b',t,re.I)
        checks['explicit_option']=bool(got)
        checks['correct_option']=bool(got and key and got.group(1).upper()==key)
        checks['explanation_section']=('解釋' in t) if zh else bool(re.search(r'\bExplanation\b',t,re.I))
        if typ=='multiple_choice_calculation':
            checks['calculation_section']=('計算' in t) if zh else bool(re.search(r'\bCalculation\b',t,re.I))
            checks['expected_numeric_present']=contains_numeric(t,expected_numeric(row))
    elif typ=='numerical_calculation':
        checks['answer_section']=('答案' in t) if zh else bool(re.search(r'\bAnswer\b',t,re.I))
        checks['calculation_section']=('計算' in t) if zh else bool(re.search(r'\bCalculation\b',t,re.I))
        checks['expected_numeric_present']=contains_numeric(t,expected_numeric(row))
    elif typ=='knowledge_conceptual':
        checks['question_restatement']=('問題' in t) if zh else bool(re.search(r'\bQuestion\b',t,re.I))
        checks['direct_answer']=('回答' in t) if zh else bool(re.search(r'\bAnswer\b',t,re.I))
    elif typ=='mechanism_explanation':
        checks['question_restatement']=('問題' in t) if zh else bool(re.search(r'\bQuestion\b',t,re.I))
        checks['direct_answer']=('回答' in t) if zh else bool(re.search(r'\bAnswer\b',t,re.I))
        checks['mechanism_section']=('機轉' in t or '機制' in t) if zh else bool(re.search(r'\bMechanism\b',t,re.I))
    checks['nonempty']=len(t)>=8
    # Basic language guard: catches gross wrong-language drift, not bilingual terminology.
    if zh:
        checks['language_consistent']=bool(re.search(r'[\u4e00-\u9fff]',t))
    else:
        ascii_letters=len(re.findall(r'[A-Za-z]',t)); han=len(re.findall(r'[\u4e00-\u9fff]',t))
        checks['language_consistent']=ascii_letters>=max(8,han*2)
    passed=sum(bool(v) for v in checks.values()); total=len(checks)
    return checks, passed, total

def run_model(rows,base_url,model_tag,name,limit=0):
    out=[]; agg=defaultdict(lambda:[0,0]); start=time.time()
    use=rows[:limit] if limit else rows
    for idx,row in enumerate(use,1):
        messages=row['messages'][:-1]
        payload={'model':model_tag,'messages':messages,'stream':False,'think':False,
                 'options':{'temperature':0,'top_p':0.8,'num_predict':300,'repeat_penalty':1.02}}
        rec={'index':idx,'type':row.get('type'),'language':row.get('language'),'question':messages[-1]['content']}
        try:
            t0=time.time(); data=post_json(base_url.rstrip('/')+'/api/chat',payload); elapsed=time.time()-t0
            text=((data.get('message') or {}).get('content') or data.get('response') or '').strip()
            checks,p,t=score_row(row,text)
            rec.update(ok=True,answer=text,elapsed_sec=round(elapsed,3),checks=checks,passed=p,total=t)
            agg['all'][0]+=p; agg['all'][1]+=t; agg[row.get('type','unknown')][0]+=p; agg[row.get('type','unknown')][1]+=t
        except Exception as e:
            rec.update(ok=False,error=str(e),answer='',elapsed_sec=None,checks={},passed=0,total=1)
            agg['all'][1]+=1; agg[row.get('type','unknown')][1]+=1
        out.append(rec)
        print(f'[{name}] {idx}/{len(use)} {rec["type"]}: {rec.get("passed",0)}/{rec.get("total",1)}')
    summary={k:{'passed':v[0],'total':v[1],'rate':round(v[0]/v[1],4) if v[1] else 0} for k,v in agg.items()}
    summary['elapsed_sec']=round(time.time()-start,2)
    return {'name':name,'base_url':base_url,'model_tag':model_tag,'summary':summary,'rows':out}

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--model-key',choices=['granite','gemma','mistral'],default='granite')
    ap.add_argument('--test',default=str(ROOT/'dataset'/'test.jsonl'))
    ap.add_argument('--base-url',default='http://127.0.0.1:11435')
    ap.add_argument('--base-model',default='')
    ap.add_argument('--ft-url',default='http://127.0.0.1:11439')
    ap.add_argument('--ft-model',default='')
    ap.add_argument('--limit',type=int,default=0,help='0 = all held-out examples')
    ap.add_argument('--skip-base',action='store_true')
    ap.add_argument('--skip-ft',action='store_true')
    ap.add_argument('--output',default=str(ROOT/'output'/'evaluation_base_vs_finetuned.json'))
    args=ap.parse_args()
    prof=profile(args.model_key)
    if not args.base_model:
        args.base_model={'granite':'granite4.2:8b-q5_K_M','gemma':'gemma4:12b','mistral':'ministral-3:8b-instruct-2512-q4_K_M'}[args.model_key]
    if not args.ft_model: args.ft_model=prof['runtime_tag']
    rows=[json.loads(x) for x in Path(args.test).read_text(encoding='utf-8').splitlines() if x.strip()]
    results={'model_key':args.model_key,'test_examples':len(rows),'metric_note':'Automatic behavior-contract + deterministic MCQ/calculation checks; free-text physiology still requires expert review.','runs':[]}
    if not args.skip_base: results['runs'].append(run_model(rows,args.base_url,args.base_model,'base',args.limit))
    if not args.skip_ft: results['runs'].append(run_model(rows,args.ft_url,args.ft_model,'fine_tuned',args.limit))
    out=Path(args.output); out.parent.mkdir(parents=True,exist_ok=True); out.write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
    print('\n===== SUMMARY =====')
    for r in results['runs']:
        print(r['name'],json.dumps(r['summary'],ensure_ascii=False))
    print('[OK] evaluation saved:',out)

if __name__=='__main__': main()
