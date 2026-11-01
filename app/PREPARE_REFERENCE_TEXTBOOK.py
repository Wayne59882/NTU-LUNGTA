#!/usr/bin/env python3
from __future__ import print_function
# Optional re-ingestion utility for a replacement reference PDF.
# Requires PyMuPDF (fitz). The shipped v206.7 build already contains a prepared reference-textbook corpus.
import argparse, json, re, sys
from pathlib import Path
try:
    import fitz
except Exception:
    raise SystemExit('PyMuPDF is required for re-ingestion: python -m pip install pymupdf')

def clean(t):
    t=t.replace('\u200b','').replace('\xad','').replace('\x08',''); t=re.sub(r'-\n(?=[a-z])','',t); t=re.sub(r'\s+',' ',t); return t.strip()
def chunks(words,max_words=420,overlap=70):
    step=max_words-overlap
    for i in range(0,len(words),step):
        part=words[i:i+max_words]
        if len(part)>=60: yield ' '.join(part)
        if i+max_words>=len(words): break
ap=argparse.ArgumentParser(); ap.add_argument('pdf'); ap.add_argument('--title',default='Reference material'); args=ap.parse_args()
doc=fitz.open(args.pdf); out=Path(__file__).resolve().parent/'reference_corpus/chunks.jsonl'; n=0
with out.open('w',encoding='utf-8') as f:
    for p in range(doc.page_count):
        text=clean(doc[p].get_text('text') or '')
        for j,c in enumerate(chunks(text.split()),1):
            n+=1; f.write(json.dumps({'id':'ref_p%04d_c%02d'%(p+1,j),'source':args.title,'pdf_page':p+1,'chapter':None,'chapter_title':'','text':c},ensure_ascii=False)+'\n')
print('[OK] wrote',n,'chunks to',out)
