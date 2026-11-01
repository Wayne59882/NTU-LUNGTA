#!/usr/bin/env python3
from __future__ import print_function
import argparse,json,re,sys,time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT))
from reference_search import ReferenceSearch,_mcq_stem
from reference_server import MODEL_CATALOG,key_of,model_base,url_json,ensure_single_active_model

def loadj(p):return json.loads(Path(p).read_text(encoding='utf-8'))
def options(q):
    out={};matches=list(re.finditer(r'(?im)^\s*([A-D])\s*[\.．、\):：]\s*(.+?)(?=\n\s*[A-D]\s*[\.．、\):：]|\Z)',q or '',re.S))
    for m in matches:out[m.group(1).upper()]=' '.join(m.group(2).split())
    return out

def compact(s,n=1800):return ' '.join(str(s or '').split())[:n]
def parse_obj(text):
    text=str(text or '').strip()
    try:return json.loads(text)
    except Exception:pass
    a=text.find('{');b=text.rfind('}')
    if a>=0 and b>a:
        try:return json.loads(text[a:b+1])
        except Exception:return {}
    return {}

def batch_prompt(items):
    parts=[]
    for x in items:
        parts.append('''ITEM {id}
Question:\n{q}\nOfficial answer used ONLY for post-hoc diagnosis: {expected}. {correct_text}\nAgent final answer:\n{agent}\nProduction evidence actually given to the agent:\n{prod}\nAnswer-aware oracle retrieval from the SAME current corpus (diagnostic only; never used by production):\n{oracle}
'''.format(**x))
    return '''This is OFFLINE ERROR DIAGNOSIS, not answer generation and not a runtime validator. Official answers were withheld until after the agent responded.
For every item, classify the main failure using exactly one category:
- corpus_coverage_gap: even the answer-aware oracle retrieval from the current corpus lacks enough factual support for the official answer.
- retrieval_failure: the oracle retrieval contains adequate support, but the production evidence omitted or buried the decisive support.
- question_interpretation_failure: production evidence is adequate, but the response misread negation, temporal wording, comparison, scope, or what was being asked.
- option_mapping_failure: the response reasoning/explanation substantially supports the official concept but maps it to the wrong option letter or conclusion.
- reasoning_failure: production evidence is adequate and wording is understood, but physiological inference/option discrimination is wrong.
- self_verification_failure: the primary and blind/self-review process failed to correct an otherwise detectable model error; use only when this is more diagnostic than reasoning_failure.
- diagnostic_unresolved: evidence is insufficient to classify confidently.
Return JSON ONLY as {"items":[{"id":1,"category":"retrieval_failure","production_supports_correct":false,"oracle_supports_correct":true,"confidence":0.9,"note":"brief technical reason"}]}.
Do not propose per-question rules and do not rewrite answers.

'''+'\n===== NEXT =====\n'.join(parts)

def call_diag(model_key,items):
    key=key_of(model_key);tag=MODEL_CATALOG[key]['tag'];base=model_base(key)
    payload={'model':tag,'messages':[{'role':'system','content':'You are a rigorous post-hoc RAG error analyst. Output JSON only. Do not alter production answers.'},{'role':'user','content':batch_prompt(items)}],
      'think':False,'stream':False,'keep_alive':'5m','format':'json','options':{'temperature':0.0,'top_p':0.5,'num_ctx':8192,'num_predict':max(500,min(1800,210*len(items)))}}
    d=url_json(base+'/api/chat',payload=payload,timeout=900);return parse_obj(((d.get('message') or {}).get('content') or ''))

def groups(xs,n):
    for i in range(0,len(xs),n):yield xs[i:i+n]

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--trace',required=True);ap.add_argument('--model',default='granite',choices=['granite','gemma','mistral']);ap.add_argument('--output',default='');args=ap.parse_args()
    data=loadj(args.trace);wrong=[x for x in data.get('rows',[]) if not x.get('correct')];search=ReferenceSearch();prepared=[]
    for idx,row in enumerate(wrong,1):
        q=row.get('question','');exp=str(row.get('expected','')).upper();opt=options(q);correct_text=opt.get(exp,'')
        oracle_query=_mcq_stem(q)+'\nCandidate concept for diagnostic coverage search: '+correct_text
        oracle=search.search(oracle_query,profile='optimized',diagnostic=True)
        prepared.append({'id':idx,'row':row,'q':q,'expected':exp,'correct_text':correct_text,'agent':compact(row.get('answer',''),1200),
          'prod':compact(row.get('context',''),2200),'oracle':compact(oracle.get('context',''),2200),'oracle_retrieval':oracle.get('retrieval') or {}})
    diagmap={}
    for g in groups(prepared,4):
        payload=[{k:v for k,v in x.items() if k not in ('row','oracle_retrieval')} for x in g]
        try:obj=call_diag(args.model,payload);arr=obj.get('items') if isinstance(obj,dict) else []
        except Exception as e:
            print('[WARN] diagnostic LLM batch failed:',e);arr=[]
        got={}
        for z in arr if isinstance(arr,list) else []:
            try:got[int(z.get('id'))]=z
            except Exception:pass
        for x in g:
            z=got.get(x['id']) or {'id':x['id'],'category':'diagnostic_unresolved','production_supports_correct':False,'oracle_supports_correct':False,'confidence':0.0,'note':'diagnostic model returned no usable object'}
            diagmap[x['id']]=z
        print('[DIAG] %d/%d errors classified'%(len(diagmap),len(prepared)),flush=True)
    items=[];counts={}
    for x in prepared:
        z=diagmap[x['id']];cat=str(z.get('category') or 'diagnostic_unresolved');counts[cat]=counts.get(cat,0)+1
        row=x['row'];items.append({'year':(row.get('meta') or {}).get('year'),'qno':(row.get('meta') or {}).get('qno'),'expected':row.get('expected'),'predicted':row.get('predicted'),
          'category':cat,'confidence':z.get('confidence',0),'production_supports_correct':bool(z.get('production_supports_correct')),'oracle_supports_correct':bool(z.get('oracle_supports_correct')),
          'note':z.get('note',''),'retrieval_query':row.get('retrieval_query',''),'verification':row.get('verification') or {},'oracle_retrieval':x['oracle_retrieval']})
    high_gap=[x for x in items if x['category']=='corpus_coverage_gap' and float(x.get('confidence') or 0)>=0.65]
    unresolved=[x for x in items if x['category']=='diagnostic_unresolved']
    out={'source_trace':str(args.trace),'wrong_total':len(items),'category_counts':counts,'high_confidence_corpus_gaps':len(high_gap),'diagnostic_unresolved':len(unresolved),
      'supplemental_ab_test_needed':bool(high_gap or unresolved),'items':items,
      'policy':'MOEX official answers are used only after production responses. Diagnostic answer-aware retrieval is isolated from runtime and cannot modify student answers.'}
    op=Path(args.output) if args.output else ROOT/'benchmark/output'/'v231_error_diagnosis.json';op.parent.mkdir(parents=True,exist_ok=True);op.write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
    print('===== DIAGNOSTIC SUMMARY =====');print(json.dumps({'wrong_total':len(items),'counts':counts,'high_confidence_corpus_gaps':len(high_gap),'supplemental_ab_test_needed':out['supplemental_ab_test_needed']},ensure_ascii=False,indent=2));print('[OK]',op)
if __name__=='__main__':main()
