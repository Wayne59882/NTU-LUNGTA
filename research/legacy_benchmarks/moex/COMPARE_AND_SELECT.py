#!/usr/bin/env python3
from __future__ import print_function
import argparse,json
from pathlib import Path

def j(p):return json.loads(Path(p).read_text(encoding='utf-8'))
def score(x):return int((x or {}).get('correct',0))
def info(x):
    if not x:return None
    return {'correct':x.get('correct'),'total':x.get('total'),'accuracy':x.get('accuracy'),'elapsed_sec':x.get('elapsed_sec')}
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--baseline',required=True);ap.add_argument('--guyton',required=True);ap.add_argument('--expanded',default='');ap.add_argument('--diagnosis',required=True);ap.add_argument('--output',required=True);args=ap.parse_args()
    b=j(args.baseline);g=j(args.guyton);d=j(args.diagnosis);e=j(args.expanded) if args.expanded and Path(args.expanded).exists() else None
    candidates=[('guyton','baseline',b),('guyton','optimized',g)]
    if e:candidates.append(('expanded','optimized',e))
    # Accuracy first. On ties prefer the smallest/least modified runtime: Guyton baseline, then Guyton optimized, then expanded.
    priority={('guyton','baseline'):0,('guyton','optimized'):1,('expanded','optimized'):2}
    best=sorted(candidates,key=lambda x:(-score(x[2]),priority[(x[0],x[1])]))[0]
    corpus,profile,data=best
    if corpus=='expanded':reason='Beachey + Vander were retained because the expanded optimized pipeline achieved the highest official-MOEX correct count.'
    elif profile=='optimized':reason='v231 retrieval/reasoning/self-verification optimization improved the official-MOEX correct count without requiring supplemental books.'
    else:reason='No tested change exceeded the v229-compatible Guyton baseline, so the simpler Guyton baseline behavior is retained rather than deploying an unproven modification.'
    out={'choice':corpus,'profile':profile,'reason':reason,'baseline':info(b),'guyton_optimized':info(g),'expanded':info(e),
      'diagnosis':{'wrong_total':d.get('wrong_total'),'category_counts':d.get('category_counts'),'high_confidence_corpus_gaps':d.get('high_confidence_corpus_gaps'),'supplemental_ab_test_needed':d.get('supplemental_ab_test_needed')},
      'selection_rule':'Highest official-MOEX correct count wins. Ties prefer Guyton v229-compatible baseline, then Guyton optimized, then expanded corpus. Official answers never enter production inference.'}
    Path(args.output).write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps(out,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
