#!/usr/bin/env python3
from __future__ import print_function
import argparse,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
CORPUS=ROOT/'reference_corpus'/'chunks.jsonl';SUP=ROOT/'benchmark'/'supplemental_sources'

def rows(p):
    return [json.loads(x) for x in Path(p).read_text(encoding='utf-8').splitlines() if x.strip()]
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--base',required=True);args=ap.parse_args();base=Path(args.base)
    originals=rows(base);extras=[]
    for p in (SUP/'beachey_respiratory_core.jsonl',SUP/'vander_respiratory_ch13.jsonl'):extras.extend(rows(p))
    ids=set();out=[]
    for x in originals+extras:
        k=str(x.get('id'))
        if k in ids:continue
        ids.add(k);out.append(x)
    CORPUS.write_text('\n'.join(json.dumps(x,ensure_ascii=False) for x in out)+'\n',encoding='utf-8')
    print('[OK] expanded corpus: %d -> %d passages (+%d supplemental)'%(len(originals),len(out),len(out)-len(originals)))
if __name__=='__main__':main()
