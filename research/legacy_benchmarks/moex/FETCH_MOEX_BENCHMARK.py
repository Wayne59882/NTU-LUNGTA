#!/usr/bin/env python3
"""Download official Taiwan MOEX respiratory-therapist exam PDFs and build a read-only benchmark corpus.

Source: Ministry of Examination (考選部) 考畢試題查詢平台.
The script keeps the original question text, options, official answer letter, source URL,
and year metadata. It does NOT invent explanations.

All downloaded questions are benchmark-only. Official answers are used only after the agent responds for scoring/diagnosis; they are never sent to the production RAG or answer model.

The historical 心肺基礎醫學 paper is 80 questions. The physiology block is configurable;
default 25-56. The script writes a boundary-review file so this assumption is explicit.
"""
from __future__ import print_function
import argparse, io, json, os, re, sys, time
from pathlib import Path
try:
    from urllib.request import Request, urlopen
    from urllib.parse import urljoin, urlparse, parse_qs
    from html import unescape
except ImportError:
    from urllib2 import Request, urlopen
    from urlparse import urljoin, urlparse, parse_qs
    from HTMLParser import HTMLParser
    def unescape(x): return HTMLParser().unescape(x)

BASE='https://wwwq.moex.gov.tw'
SEARCH=BASE+'/exam/wFrmExamQandASearch.aspx?y={year}'
UA='Mozilla/5.0 (compatible; NTULUNG-TA research corpus builder/1.0)'
SYSTEM='你是呼吸生理學選擇題作答模型。先正確理解題幹與否定、比較、因果或計算關係，再從選項中選出唯一最佳答案。'

FULLMAP=str.maketrans('ＡＢＣＤ０１２３４５６７８９．：％－＋／（），', 'ABCD0123456789.:%-+/(),')

def fetch(url, timeout=60, binary=False):
    req=Request(url,headers={'User-Agent':UA,'Accept':'*/*'})
    with urlopen(req,timeout=timeout) as r:
        b=r.read()
        if binary:return b
        enc='utf-8'
        ctype=r.headers.get('Content-Type','')
        m=re.search(r'charset=([^;]+)',ctype,re.I)
        if m:enc=m.group(1).strip()
        for e in (enc,'utf-8','cp950','big5'):
            try:return b.decode(e)
            except Exception:pass
        return b.decode('utf-8','replace')

def strip_tags(s):
    s=re.sub(r'(?is)<script.*?</script>|<style.*?</style>',' ',s)
    s=re.sub(r'(?s)<[^>]+>',' ',s)
    return re.sub(r'\s+',' ',unescape(s)).strip()

def anchors(html):
    out=[]
    pat=re.compile(r'(?is)<a\b[^>]*?href\s*=\s*["\']([^"\']+)["\'][^>]*>(.*?)</a>')
    for m in pat.finditer(html):
        out.append((m.start(),urljoin(BASE,unescape(m.group(1))),strip_tags(m.group(2))))
    return out

def qparams(url):
    return {k:(v[-1] if isinstance(v,list) else v) for k,v in parse_qs(urlparse(url).query).items()}

def discover_year(year, html):
    aa=anchors(html); candidates=[]
    for pos,url,label in aa:
        p=qparams(url)
        if p.get('c')!='313' or p.get('s')!='0901' or p.get('t')!='Q':continue
        nearby=strip_tags(html[max(0,pos-5000):pos+7000])
        score=(10 if '心肺基礎醫學' in nearby else 0)+(5 if '呼吸治療師' in nearby else 0)
        try:code_num=int(p.get('code','0'))
        except Exception:code_num=0
        candidates.append((score,code_num,pos,url,p,nearby))
    if not candidates:
        raise RuntimeError('No respiratory-therapist 心肺基礎醫學 question link found for %s'%year)
    candidates.sort(key=lambda x:(x[0],x[1]),reverse=True)
    score,_,pos,qurl,p,nearby=candidates[0]
    if score<5:
        raise RuntimeError('Found s=0901/c=313 but page context did not verify 呼吸治療師 for %s'%year)
    # Prefer a corrected-answer link in the same local block, otherwise standard answer.
    local=html[max(0,pos-6000):pos+9000]; same=[]
    for _,u,lbl in anchors(local):
        pp=qparams(u)
        if pp.get('c')==p.get('c') and pp.get('code')==p.get('code') and pp.get('s')==p.get('s') and pp.get('t')!='Q':
            rank=2 if '更正答案' in lbl else (1 if '答案' in lbl else 0)
            same.append((rank,u,lbl,pp.get('t')))
    if same:
        same.sort(key=lambda x:x[0],reverse=True); aurl=same[0][1]; atype=same[0][2]
    else:
        aurl=re.sub(r'([?&])t=Q(?:&|$)',lambda m:m.group(1)+'t=S'+('&' if m.group(0).endswith('&') else ''),qurl)
        atype='答案'
    return {'year':year,'roc_year':year-1911,'question_url':qurl,'answer_url':aurl,'answer_type':atype,'exam_code':p.get('code',''),'subject_code':p.get('s','0901')}

def pdf_text(data):
    try:
        from PyPDF2 import PdfReader
    except Exception:
        raise RuntimeError('PyPDF2 missing. Run finetune/moex/PREPARE_MOEX_ENV.sh first.')
    r=PdfReader(io.BytesIO(data)); parts=[]
    for page in r.pages:
        try:parts.append(page.extract_text() or '')
        except Exception:parts.append('')
    return '\n'.join(parts)

def norm(s):
    s=(s or '').translate(FULLMAP)
    s=s.replace('\u3000',' ').replace('\xa0',' ')
    s=re.sub(r'[ \t]+',' ',s)
    return s

def parse_questions(text):
    t=norm(text)
    # Question number: allow merged PDF text such as "D.肺炎29.肺氣腫..." but reject decimals 0.592.
    starts=[]
    for m in re.finditer(r'(?<![0-9.])([1-9]|[1-7][0-9]|80)[.](?=\s*[^0-9])',t):
        n=int(m.group(1))
        # Prefer monotonic sequence; headers can contain isolated numbers.
        starts.append((m.start(),m.end(),n))
    # Find the longest mostly-consecutive run starting at 1.
    best=[]
    for i,x in enumerate(starts):
        if x[2]!=1:continue
        run=[x];expected=2
        for y in starts[i+1:]:
            if y[2]==expected:
                run.append(y);expected+=1
                if expected>80:break
            elif y[2]<expected:continue
            elif y[2]>expected+2:break
        if len(run)>len(best):best=run
    if len(best)<60:
        raise RuntimeError('Could parse only %d sequential question starts'%len(best))
    out=[]
    for i,(st,en,n) in enumerate(best):
        ed=best[i+1][0] if i+1<len(best) else len(t)
        chunk=t[en:ed].strip()
        # Insert separators before option markers; match merged "...12.5B.25" as well.
        marks=list(re.finditer(r'([ABCD])[.](?=\s*[^\n]{0,3})',chunk))
        # Keep first monotonic A,B,C,D sequence.
        seq=[];want='A'
        for mm in marks:
            if mm.group(1)==want:
                seq.append(mm); want=chr(ord(want)+1)
                if want>'D':break
        if len(seq)!=4:
            continue
        q=chunk[:seq[0].start()].strip()
        opts={}
        for j,mm in enumerate(seq):
            end=seq[j+1].start() if j+1<len(seq) else len(chunk)
            opts[mm.group(1)]=chunk[mm.end():end].strip()
        q=re.sub(r'\s+',' ',q)
        opts={k:re.sub(r'\s+',' ',v) for k,v in opts.items()}
        out.append({'qno':n,'question':q,'options':opts})
    return out

def parse_answers(text, expected=80):
    t=norm(text)
    # Restrict to content after the answer-key heading when possible.
    idx=t.find('標準答案')
    if idx>=0:t=t[idx:]
    letters=re.findall(r'(?<![A-Za-z])([ABCD])(?![A-Za-z])',t)
    if len(letters)<expected:
        # Answer PDFs often have full-width letters packed with spaces; normalized above.
        letters=re.findall(r'[ABCD]',t)
    if len(letters)<expected:
        raise RuntimeError('Could parse only %d answer letters'%len(letters))
    return {i+1:letters[i] for i in range(expected)}

def split_name(year):
    return 'benchmark'

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--start-year',type=int,default=2012)
    ap.add_argument('--end-year',type=int,default=2026)
    ap.add_argument('--physiology-start',type=int,default=25)
    ap.add_argument('--physiology-end',type=int,default=56)
    ap.add_argument('--out',default=str(Path(__file__).resolve().parent/'dataset'))
    ap.add_argument('--sleep',type=float,default=0.35)
    ap.add_argument('--refresh',action='store_true')
    args=ap.parse_args();out=Path(args.out);raw=out/'raw';raw.mkdir(parents=True,exist_ok=True)
    splits={k:[] for k in ('benchmark',)};sources=[];boundary=[]
    for year in range(args.start_year,args.end_year+1):
        print('===== MOEX %s ====='%year)
        ydir=raw/str(year);ydir.mkdir(parents=True,exist_ok=True)
        meta_path=ydir/'source.json';qpdf=ydir/'questions.pdf';apdf=ydir/'answers.pdf'
        try:
            if meta_path.exists() and qpdf.exists() and apdf.exists() and not args.refresh:
                meta=json.loads(meta_path.read_text(encoding='utf-8'))
            else:
                html=fetch(SEARCH.format(year=year));meta=discover_year(year,html)
                qpdf.write_bytes(fetch(meta['question_url'],binary=True));time.sleep(args.sleep)
                apdf.write_bytes(fetch(meta['answer_url'],binary=True));time.sleep(args.sleep)
                meta_path.write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
            qs=parse_questions(pdf_text(qpdf.read_bytes()));ans=parse_answers(pdf_text(apdf.read_bytes()))
            byno={x['qno']:x for x in qs}
            missing=[n for n in range(args.physiology_start,args.physiology_end+1) if n not in byno or n not in ans]
            if missing:raise RuntimeError('Missing physiology questions/answers: %s'%missing)
            split=split_name(year);count=0
            for n in range(args.physiology_start,args.physiology_end+1):
                x=byno[n];letter=ans[n];opt=x['options'][letter]
                q=x['question']+'\n'+'\n'.join('%s. %s'%(k,x['options'][k]) for k in 'ABCD')
                a='正確答案：%s. %s'%(letter,opt)
                row={'question_text':q,'official_answer_letter':letter,'official_answer_text':opt,
                     'type':'multiple_choice_conceptual','language':'zh-TW',
                     'meta':{'source':'MOEX','source_name':'考選部考畢試題查詢平台','year':year,'roc_year':year-1911,'qno':n,
                             'exam_code':meta.get('exam_code'),'subject':'心肺基礎醫學','physiology_block':True,
                             'question_url':meta.get('question_url'),'answer_url':meta.get('answer_url'),'split':split}}
                splits[split].append(row);count+=1
            sources.append(dict(meta,split=split,physiology_items=count))
            # Explicitly surface the boundary assumption for human review.
            boundary.append({'year':year,'split':split,'q24':byno.get(24,{}).get('question',''),'q25':byno.get(25,{}).get('question',''),
                             'q56':byno.get(56,{}).get('question',''),'q57':byno.get(57,{}).get('question','')})
            print('[OK] %s: %d physiology MCQs -> %s'%(year,count,split))
        except Exception as e:
            print('[WARN] %s skipped: %s'%(year,e),file=sys.stderr)
            sources.append({'year':year,'error':str(e)})
    out.mkdir(parents=True,exist_ok=True)
    for name,rows in splits.items():
        (out/(name+'.jsonl')).write_text('\n'.join(json.dumps(x,ensure_ascii=False) for x in rows)+('\n' if rows else ''),encoding='utf-8')
    (out/'sources.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2),encoding='utf-8')
    (out/'boundary_review.json').write_text(json.dumps(boundary,ensure_ascii=False,indent=2),encoding='utf-8')
    manifest={'source':'Ministry of Examination (Taiwan) / 考選部','subject':'呼吸治療師－心肺基礎醫學','physiology_question_range':[args.physiology_start,args.physiology_end],
              'counts':{k:len(v) for k,v in splits.items()},'split_policy':{'benchmark':'2012-2026 (15 calendar years; latest matching respiratory-therapist exam discovered per year)'},
              'methodology_note':'Benchmark only. Official answer keys are withheld from production retrieval/answering and used only after responses for scoring and post-hoc diagnostic trace.'}
    (out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print('===== DONE =====');print(json.dumps(manifest,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
