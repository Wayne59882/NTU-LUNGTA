#!/usr/bin/env python3
"""Semantic Vector RAG retrieval over the user-provided human-physiology textbooks.

Pipeline (v237 selective evidence-precision profile):
  textbook chunks -> BGE-M3 embeddings -> persistent chunk vector index
  sentence windows -> the SAME BGE-M3 embeddings -> persistent rerank index
  student question -> BGE-M3 query embedding -> exact cosine similarity
  source-balanced Top candidates -> exact semantic window rerank -> Top 6 evidence -> LLM

The optimized path removes repeated per-question embedding of ~50-60 rerank
windows. Those window embeddings are precomputed once during PREPARE and kept
in RAM by the reference server. Retrieval remains exact semantic vector search;
BM25, approximate-nearest-neighbour search, and quality-reducing shortcuts are
not used.
"""
from __future__ import print_function
import argparse, hashlib, json, math, os, re, sqlite3, struct, time, urllib.request
from array import array
from collections import OrderedDict
from pathlib import Path
from scope_guard import normalize_scientific_text

ROOT=Path(__file__).resolve().parent
CHUNKS_FILE=ROOT/'reference_corpus'/'chunks.jsonl'
INDEX_FILE=ROOT/'reference_corpus'/'vector_index.sqlite3'
WINDOW_INDEX_FILE=ROOT/'reference_corpus'/'window_index.sqlite3'
EMBED_HOST=os.environ.get('VQ_REFERENCE_EMBED_HOST','127.0.0.1:11438').strip()
EMBED_BASE=EMBED_HOST.rstrip('/') if EMBED_HOST.startswith(('http://','https://')) else ('http://'+EMBED_HOST).rstrip('/')
EMBED_MODEL=os.environ.get('VQ_REFERENCE_EMBED_MODEL','bge-m3:latest').strip()
EMBED_KEEP_ALIVE=os.environ.get('VQ_REFERENCE_EMBED_KEEP_ALIVE','12h').strip()
INDEX_BATCH=max(1,int(os.environ.get('VQ_REFERENCE_EMBED_BATCH','8')))
WINDOW_INDEX_BATCH=max(1,int(os.environ.get('VQ_REFERENCE_WINDOW_EMBED_BATCH','32')))
TOP_CANDIDATES=max(8,int(os.environ.get('VQ_REFERENCE_TOP_CANDIDATES','16')))
FINAL_TOP_K=max(4,int(os.environ.get('VQ_REFERENCE_FINAL_TOP_K','6')))
SOURCE_BALANCED_PER_BOOK=max(2,min(8,int(os.environ.get('VQ_REFERENCE_SOURCE_CANDIDATES','5'))))
SOURCE_MAX_FINAL=max(2,min(5,int(os.environ.get('VQ_REFERENCE_SOURCE_MAX_FINAL','3'))))
STEM_BLEND_WEIGHT=float(os.environ.get('VQ_REFERENCE_STEM_BLEND_WEIGHT','0.92'))
CONTEXT_CHAR_BUDGET=max(4500,int(os.environ.get('VQ_REFERENCE_CONTEXT_CHARS','8500')))
OPTION_CONTRAST_PER_CHOICE=max(1,min(5,int(os.environ.get('VQ_REFERENCE_OPTION_CANDIDATES','3'))))
OPTION_CONTRAST_CHARS=max(900,min(2400,int(os.environ.get('VQ_REFERENCE_OPTION_CONTRAST_CHARS','1800'))))
MIN_SIM=float(os.environ.get('VQ_REFERENCE_MIN_SIM','0.22'))
RELATIVE_MARGIN=float(os.environ.get('VQ_REFERENCE_RELATIVE_MARGIN','0.14'))
QUERY_CACHE_SIZE=max(0,int(os.environ.get('VQ_REFERENCE_QUERY_CACHE','128')))
# R11: 20 s gives a busy shared GPU time to embed one query; on timeout the
# literal textbook search below still supplies real passages.
QUERY_TIMEOUT=max(2.0,min(60.0,float(os.environ.get('VQ_REFERENCE_QUERY_TIMEOUT_SEC','20'))))
QUERY_INSTRUCTION=''  # BGE-M3: embed the natural-language query directly
WINDOW_SCHEMA='sentence-windows-target900-max1350-overlap1-v1'
# v233 production index can be extended safely because v235 preserves the first
# 2,644 Guyton passages byte-for-content at the embedding input level and only
# appends Beachey + Vander. This avoids needlessly re-embedding the entire
# textbook on the shared CPU-only embedding service during first deployment.
LEGACY_GUYTON_COUNT=2644
LEGACY_GUYTON_CORPUS_SHA='85814a240ec797b7cd730f3fe1c19e1d14685d005b9b24f029f301279a797e65'
LEGACY_GUYTON_DOC_PREFIX_SHA='be4ece23e2e63cb23ca396627caf8ee56b849bc22acf6e17cbd64468475b8d52'
LEGACY_GUYTON_WINDOW_COUNT=8773

try:
    import numpy as _np
except Exception:
    _np=None

_CORPUS_SHA_CACHE=None
_CORPUS_SHA_STAMP=None


def _url_json(url,payload=None,timeout=180):
    data=None; headers={}
    if payload is not None:
        data=json.dumps(payload,ensure_ascii=False).encode('utf-8'); headers['Content-Type']='application/json'
    req=urllib.request.Request(url,data=data,headers=headers,method='POST' if data is not None else 'GET')
    with urllib.request.urlopen(req,timeout=float(timeout)) as r:
        return json.loads(r.read().decode('utf-8'))


def _file_stamp(path):
    try:
        st=path.stat(); return (int(st.st_mtime_ns),int(st.st_size))
    except Exception:
        return None


def _corpus_sha():
    global _CORPUS_SHA_CACHE,_CORPUS_SHA_STAMP
    stamp=_file_stamp(CHUNKS_FILE)
    if _CORPUS_SHA_CACHE is not None and stamp==_CORPUS_SHA_STAMP:
        return _CORPUS_SHA_CACHE
    h=hashlib.sha256()
    with CHUNKS_FILE.open('rb') as f:
        for block in iter(lambda:f.read(1024*1024),b''): h.update(block)
    _CORPUS_SHA_CACHE=h.hexdigest(); _CORPUS_SHA_STAMP=stamp
    return _CORPUS_SHA_CACHE


def _normalize(v):
    vals=[float(x) for x in v]
    n=math.sqrt(sum(x*x for x in vals)) or 1.0
    return [x/n for x in vals]


def _pack(v): return struct.pack('<%df'%len(v),*v)
def _pack64(v): return struct.pack('<%dd'%len(v),*v)

def _unpack(blob):
    a=array('f'); a.frombytes(blob)
    if os.sys.byteorder!='little': a.byteswap()
    return a

def _unpack64(blob):
    a=array('d'); a.frombytes(blob)
    if os.sys.byteorder!='little': a.byteswap()
    return a


def _embed(texts,timeout=180):
    single=isinstance(texts,str)
    items=[texts] if single else list(texts)
    payload={'model':EMBED_MODEL,'input':items if not single else items[0],'truncate':True,'keep_alive':EMBED_KEEP_ALIVE}
    d=_url_json(EMBED_BASE+'/api/embed',payload=payload,timeout=timeout)
    emb=d.get('embeddings') or []
    if single and emb and isinstance(emb[0],(int,float)): emb=[emb]
    if len(emb)!=len(items): raise RuntimeError('Embedding backend returned %s vectors for %s inputs'%(len(emb),len(items)))
    return [_normalize(v) for v in emb]


def _embed_resilient(items,timeout=300):
    """Embed one batch; split only if the backend rejects a large batch."""
    items=list(items)
    if not items: return []
    try:
        return _embed(items,timeout=timeout)
    except Exception:
        if len(items)<=1: raise
        mid=len(items)//2
        return _embed_resilient(items[:mid],timeout=timeout)+_embed_resilient(items[mid:],timeout=timeout)


def _load_chunks():
    out=[]
    with CHUNKS_FILE.open('r',encoding='utf-8') as f:
        for line in f:
            if line.strip(): out.append(json.loads(line))
    return out


def _doc_text(x):
    return ('Chapter %s: %s\n%s'%(x.get('chapter') or '',x.get('chapter_title') or '',x.get('text') or '')).strip()


def _source_family(x):
    s=str((x or {}).get('source') or '').lower()
    if 'guyton' in s:return 'guyton'
    if 'vander' in s:return 'vander'
    if 'beachey' in s:return 'beachey'
    return (s[:48] or 'unknown')


def _sentence_windows(text,target_chars=900,max_chars=1350):
    """Create the same compact answer-bearing windows used by v207 reranking."""
    import re
    raw=' '.join(str(text or '').split())
    if not raw: return []
    parts=[x.strip() for x in re.split(r'(?<=[.!?])\s+(?=[A-Z0-9(])',raw) if x.strip()]
    if len(parts)<=2: return [raw[:max_chars]]
    windows=[]; cur=[]; n=0
    for sent in parts:
        if cur and n+len(sent)+1>target_chars:
            w=' '.join(cur).strip()
            if w: windows.append(w[:max_chars])
            cur=cur[-1:]; n=sum(len(x)+1 for x in cur)
        cur.append(sent); n+=len(sent)+1
    if cur:
        w=' '.join(cur).strip()
        if w: windows.append(w[:max_chars])
    out=[]; seen=set()
    for w in windows:
        k=' '.join(w.lower().split())
        if k in seen: continue
        seen.add(k); out.append(w)
    return out


def _index_meta(conn):
    try: return dict(conn.execute('SELECT key,value FROM meta').fetchall())
    except Exception: return {}


def index_status():
    if not INDEX_FILE.exists(): return {'ready':False,'reason':'index-missing','path':str(INDEX_FILE),'model':EMBED_MODEL}
    try:
        conn=sqlite3.connect(str(INDEX_FILE)); meta=_index_meta(conn); count=conn.execute('SELECT COUNT(*) FROM vectors').fetchone()[0]; conn.close()
        current=_corpus_sha()
        ready=(meta.get('corpus_sha')==current and meta.get('model')==EMBED_MODEL and int(meta.get('count','0') or 0)==count and count>0)
        return {'ready':ready,'reason':'ok' if ready else 'index-stale','path':str(INDEX_FILE),'model':EMBED_MODEL,'count':count,'dimension':int(meta.get('dimension','0') or 0),'corpus_sha':meta.get('corpus_sha')}
    except Exception as e:
        return {'ready':False,'reason':'index-error','detail':str(e),'path':str(INDEX_FILE),'model':EMBED_MODEL}


def window_index_status():
    if not WINDOW_INDEX_FILE.exists(): return {'ready':False,'reason':'window-index-missing','path':str(WINDOW_INDEX_FILE),'model':EMBED_MODEL}
    try:
        conn=sqlite3.connect(str(WINDOW_INDEX_FILE)); meta=_index_meta(conn); count=conn.execute('SELECT COUNT(*) FROM windows').fetchone()[0]; conn.close()
        current=_corpus_sha()
        ready=(meta.get('corpus_sha')==current and meta.get('model')==EMBED_MODEL and meta.get('window_schema')==WINDOW_SCHEMA and int(meta.get('count','0') or 0)==count and count>0)
        return {'ready':ready,'reason':'ok' if ready else 'window-index-stale','path':str(WINDOW_INDEX_FILE),'model':EMBED_MODEL,'count':count,'dimension':int(meta.get('dimension','0') or 0),'corpus_sha':meta.get('corpus_sha'),'window_schema':meta.get('window_schema')}
    except Exception as e:
        return {'ready':False,'reason':'window-index-error','detail':str(e),'path':str(WINDOW_INDEX_FILE),'model':EMBED_MODEL}


def _doc_prefix_sha(chunks,count):
    h=hashlib.sha256()
    for x in chunks[:int(count)]:
        h.update(_doc_text(x).encode('utf-8')); h.update(b'\0')
    return h.hexdigest()


def _legacy_index_reusable(path,chunks,window=False):
    """Return legacy v233 rows/meta when the unchanged Guyton prefix is provable."""
    if not path.exists() or len(chunks)<LEGACY_GUYTON_COUNT:return None
    if _doc_prefix_sha(chunks,LEGACY_GUYTON_COUNT)!=LEGACY_GUYTON_DOC_PREFIX_SHA:return None
    try:
        conn=sqlite3.connect(str(path)); meta=_index_meta(conn)
        if meta.get('model')!=EMBED_MODEL or meta.get('corpus_sha')!=LEGACY_GUYTON_CORPUS_SHA:
            conn.close(); return None
        if window:
            if meta.get('window_schema')!=WINDOW_SCHEMA:
                conn.close(); return None
            n=conn.execute('SELECT COUNT(*) FROM windows').fetchone()[0]
            if int(n)!=LEGACY_GUYTON_WINDOW_COUNT:
                conn.close(); return None
            rows=conn.execute('SELECT window_idx,chunk_idx,text,dim,vec FROM windows ORDER BY window_idx').fetchall()
        else:
            n=conn.execute('SELECT COUNT(*) FROM vectors').fetchone()[0]
            if int(n)!=LEGACY_GUYTON_COUNT:
                conn.close(); return None
            rows=conn.execute('SELECT chunk_idx,dim,vec FROM vectors ORDER BY chunk_idx').fetchall()
        conn.close(); return {'meta':meta,'rows':rows}
    except Exception:
        try: conn.close()
        except Exception: pass
        return None


def _build_chunk_index(chunks,corpus_sha,force=False):
    INDEX_FILE.parent.mkdir(parents=True,exist_ok=True)
    if not force:
        st=index_status()
        if st.get('ready') and st.get('count')==len(chunks):
            print('[VECTOR] chunk index already ready:',st); return st
    legacy=None if force else _legacy_index_reusable(INDEX_FILE,chunks,window=False)
    tmp=INDEX_FILE.with_suffix('.sqlite3.tmp')
    if tmp.exists(): tmp.unlink()
    conn=sqlite3.connect(str(tmp)); conn.execute('PRAGMA journal_mode=WAL'); conn.execute('PRAGMA synchronous=NORMAL')
    conn.execute('CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)')
    conn.execute('CREATE TABLE vectors (chunk_idx INTEGER PRIMARY KEY, dim INTEGER NOT NULL, vec BLOB NOT NULL)'); conn.commit()
    total=len(chunks); dim=0; started=time.time(); start_at=0
    try:
        if legacy:
            conn.executemany('INSERT INTO vectors(chunk_idx,dim,vec) VALUES(?,?,?)',legacy['rows']); conn.commit()
            start_at=LEGACY_GUYTON_COUNT
            try: dim=int(legacy['meta'].get('dimension','0') or 0)
            except Exception: dim=0
            print('[VECTOR] safely reused %d unchanged Guyton passage vectors; embedding %d appended passages only.'%(start_at,total-start_at),flush=True)
        for start_i in range(start_at,total,INDEX_BATCH):
            batch=chunks[start_i:start_i+INDEX_BATCH]
            vectors=_embed([_doc_text(x) for x in batch],timeout=300)
            rows=[]
            for off,v in enumerate(vectors):
                dim=len(v); rows.append((start_i+off,dim,sqlite3.Binary(_pack(v))))
            conn.executemany('INSERT INTO vectors(chunk_idx,dim,vec) VALUES(?,?,?)',rows); conn.commit()
            done=min(total,start_i+len(batch)); elapsed=max(.001,time.time()-started); new_done=max(0,done-start_at); rate=new_done/elapsed if new_done else 0.0
            print('[VECTOR] indexed %d/%d passages (new %.1f passages/s)'%(done,total,rate),flush=True)
        meta={'model':EMBED_MODEL,'corpus_sha':corpus_sha,'count':str(total),'dimension':str(dim),'created_at':str(int(time.time())),'method':'semantic-vector-cosine'}
        conn.executemany('INSERT INTO meta(key,value) VALUES(?,?)',list(meta.items())); conn.commit(); conn.close(); os.replace(str(tmp),str(INDEX_FILE))
    except Exception:
        try: conn.close()
        except Exception: pass
        raise
    st=index_status(); print('[VECTOR] chunk index ready:',st); return st


def build_window_index(force=False,chunks=None,corpus_sha=None):
    chunks=chunks if chunks is not None else _load_chunks(); corpus_sha=corpus_sha or _corpus_sha(); WINDOW_INDEX_FILE.parent.mkdir(parents=True,exist_ok=True)
    if not force:
        st=window_index_status()
        if st.get('ready'):
            print('[VECTOR] rerank-window index already ready:',st); return st
    entries=[]
    for chunk_i,x in enumerate(chunks):
        for w in _sentence_windows(x.get('text') or ''):
            entries.append((chunk_i,w))
    legacy=None if force else _legacy_index_reusable(WINDOW_INDEX_FILE,chunks,window=True)
    # Reuse is valid only if the new deterministic window list begins with the
    # exact legacy rows, including text and chunk index.
    if legacy:
        probe=legacy['rows']
        if len(entries)<len(probe) or any(int(r[1])!=entries[i][0] or str(r[2])!=entries[i][1] for i,r in enumerate(probe)):
            legacy=None
    tmp=WINDOW_INDEX_FILE.with_suffix('.sqlite3.tmp')
    if tmp.exists(): tmp.unlink()
    conn=sqlite3.connect(str(tmp)); conn.execute('PRAGMA journal_mode=WAL'); conn.execute('PRAGMA synchronous=NORMAL')
    conn.execute('CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)')
    conn.execute('CREATE TABLE windows (window_idx INTEGER PRIMARY KEY, chunk_idx INTEGER NOT NULL, text TEXT NOT NULL, dim INTEGER NOT NULL, vec BLOB NOT NULL)')
    conn.execute('CREATE INDEX idx_windows_chunk ON windows(chunk_idx)'); conn.commit()
    total=len(entries); dim=0; started=time.time(); start_at=0
    try:
        if legacy:
            conn.executemany('INSERT INTO windows(window_idx,chunk_idx,text,dim,vec) VALUES(?,?,?,?,?)',legacy['rows']); conn.commit()
            start_at=LEGACY_GUYTON_WINDOW_COUNT
            try: dim=int(legacy['meta'].get('dimension','0') or 0)
            except Exception: dim=0
            print('[VECTOR] safely reused %d unchanged Guyton rerank-window vectors; embedding %d appended windows only.'%(start_at,total-start_at),flush=True)
        for start_i in range(start_at,total,WINDOW_INDEX_BATCH):
            batch=entries[start_i:start_i+WINDOW_INDEX_BATCH]
            vectors=_embed_resilient([w for _,w in batch],timeout=300)
            rows=[]
            for off,((chunk_i,w),v) in enumerate(zip(batch,vectors)):
                dim=len(v)
                rows.append((start_i+off,chunk_i,w,dim,sqlite3.Binary(_pack64(v))))
            conn.executemany('INSERT INTO windows(window_idx,chunk_idx,text,dim,vec) VALUES(?,?,?,?,?)',rows); conn.commit()
            done=min(total,start_i+len(batch)); elapsed=max(.001,time.time()-started); new_done=max(0,done-start_at); rate=new_done/elapsed if new_done else 0.0
            print('[VECTOR] precomputed rerank windows %d/%d (new %.1f windows/s)'%(done,total,rate),flush=True)
        meta={'model':EMBED_MODEL,'corpus_sha':corpus_sha,'count':str(total),'dimension':str(dim),'created_at':str(int(time.time())),
              'method':'exact-semantic-window-rerank','window_schema':WINDOW_SCHEMA}
        conn.executemany('INSERT INTO meta(key,value) VALUES(?,?)',list(meta.items())); conn.commit(); conn.close(); os.replace(str(tmp),str(WINDOW_INDEX_FILE))
    except Exception:
        try: conn.close()
        except Exception: pass
        raise
    st=window_index_status(); print('[VECTOR] rerank-window index ready:',st); return st


def build_index(force=False):
    chunks=_load_chunks(); corpus_sha=_corpus_sha()
    chunk_st=_build_chunk_index(chunks,corpus_sha,force=force)
    window_st=build_window_index(force=force,chunks=chunks,corpus_sha=corpus_sha)
    return {'ready':bool(chunk_st.get('ready') and window_st.get('ready')),'chunk_index':chunk_st,'window_index':window_st}



def _retrieval_alias_query(text):
    """Expand only retrieval-side aliases; never alter the displayed student question.

    This lets natural shorthand such as VQ ratio and VO2max retrieve textbook
    passages that spell the same concept as ventilation-perfusion ratio or
    maximal oxygen uptake, without changing the corpus or rebuilding embeddings.
    """
    q=normalize_scientific_text(text)
    extras=[]
    if re.search(r'(?i)(?<![A-Za-z0-9_])V/Q(?![A-Za-z0-9_])',q):
        extras.append('ventilation perfusion ratio')
    if re.search(r'(?i)(?<![A-Za-z0-9_])VO2\s+max(?![A-Za-z0-9_])',q):
        extras.append('maximal oxygen uptake')
    return (q+' '+' '.join(extras)).strip() if extras else q


def _mcq_stem(question):
    """Return the question stem without A-D distractor text for retrieval.

    This is deliberately answer-agnostic: it removes option noise but never infers
    or inserts a correct option. The full question is still used by the LLM solver.
    """
    q=str(question or '').strip()
    if not q:return q
    # Prefer a line-leading A option marker, which is how production/UI batches are formatted.
    m=re.search(r'(?im)^\s*A\s*[\.．、\):：]\s+',q)
    if m and m.start()>8:
        stem=q[:m.start()].strip()
        if stem:return stem
    # Conservative fallback for merged PDF text. Require B/C/D to appear later.
    ma=re.search(r'(?i)(?:^|\s)A\s*[\.．、\):：]\s*',q)
    if ma and all(re.search(r'(?i)(?:^|\s)%s\s*[\.．、\):：]\s*'%x,q[ma.end():]) for x in 'BCD'):
        stem=q[:ma.start()].strip()
        if stem:return stem
    return q


def _blend_vectors(a,b,wa=0.76):
    wb=1.0-float(wa)
    vals=[float(wa)*float(x)+wb*float(y) for x,y in zip(a,b)]
    return _normalize(vals)


def _mcq_options(question):
    q=str(question or '')
    matches=list(re.finditer(r'(?is)(?:^|[\n\r\t ]+)([A-E])\s*[\.．、\):：]\s*',q))
    out=[];seen=set()
    for i,m in enumerate(matches):
        a=m.group(1).upper(); end=matches[i+1].start() if i+1<len(matches) else len(q)
        text=' '.join(q[m.end():end].strip(' \t\r\n;；').split())
        if text and a not in seen: out.append((a,text));seen.add(a)
    return out

def _option_contrast_queries(question,stem):
    """Symmetric answer-agnostic queries used to retrieve evidence for each offered choice.

    Every option is treated identically.  No answer key, correctness label, or physiology
    fact is inserted; the purpose is to prevent a plausible distractor from monopolizing
    retrieval and to surface evidence that discriminates close choices.
    """
    opts=_mcq_options(question)
    if len(opts)<2:return []
    base=' '.join(str(stem or question or '').split())
    return [(a, base+'\nCandidate statement to test: '+text+'\nRetrieve physiology evidence that can support or contradict this candidate under the exact stem conditions.') for a,text in opts]


def _contrast_should_run(question,stem):
    """Answer-agnostic retrieval policy.

    Option-conditioned retrieval is useful for close conceptual statements, but it can
    contaminate simple numeric/range/sign/location items by injecting every distractor
    value into retrieval. Those items therefore stay stem-dominant and let the LLM map
    the retrieved physiology fact to the choices afterward.
    """
    opts=_mcq_options(question)
    if len(opts)<2:return False
    st=str(stem or '')
    # Any option set dominated by explicit numbers/signs/short ordinal thirds is better
    # served by stem-only retrieval. This is a generic query-shape rule, not physiology knowledge.
    numeric=sum(1 for _,t in opts if re.search(r'(?<![A-Za-z])[-+]?\d+(?:\.\d+)?|%|mm\s*Hg|cm\s*H\s*2\s*O|1\s*/\s*3',t,re.I))
    if numeric>=max(2,len(opts)-1):return False
    if re.search(r'(?i)(?:前\s*1/3|中\s*1/3|後\s*1/3|后\s*1/3|positive|negative|正壓|负压|負壓)',str(question or '')):
        return False
    return True


def _anchor_terms(stem):
    """Extract literal discriminators from the stem for generic lexical tie-breaking."""
    raw=' '.join(str(stem or '').split())
    terms=[]
    # Keep physiology abbreviations / English medical phrases already supplied by the user.
    for x in re.findall(r'(?i)\b[A-Za-z][A-Za-z0-9\-]*(?:\s+[A-Za-z][A-Za-z0-9\-]*){0,2}\b',raw):
        x=x.strip().lower()
        if len(x)>=3 and x not in ('which','what','when','where','normal','adult','the','and','with','from'):
            terms.append(x)
    # Exact numbers are useful only when they occur in the stem, never from answer choices.
    for x in re.findall(r'(?<!\w)[-+]?\d+(?:\.\d+)?(?:\s*%|\s*mm\s*Hg|\s*cm\s*H\s*2\s*O|\s*L/sec)?',raw,re.I):
        x=' '.join(x.lower().split())
        if x:terms.append(x)
    out=[]
    for x in terms:
        if x not in out:out.append(x)
    return out[:12]


def _anchor_bonus(text,terms):
    if not terms:return 0.0
    low=' '.join(str(text or '').lower().split())
    hit=sum(1 for t in terms if t in low)
    return min(1.0,hit/float(max(1,min(4,len(terms)))))

# A failed BGE-M3 request must not turn an elementary question into a claim that
# the reference books have no relevant material. These bilingual aliases are
# retrieval hints only; answers still come from the actual textbook passages.
_LEXICAL_ALIASES=(
    (r'肺部生理|肺的生理|呼吸生理|pulmonary physiology|respiratory physiology',('respirat','gas exchange')),
    (r'意義|意义|功能|作用|做什麼|做什么|function|role',('function','role','purpose')),
    (r'吸氣|吸气|吸入|inspir|inhal',('inspir','inhal')),
    (r'吐氣|吐气|呼氣|呼气|呼出|expir|exhal',('expir','exhal')),
    (r'呼吸|breath|respirat',('respirat','breath','ventilat')),
    (r'肺泡|alveol',('alveol',)),
    (r'肺|pulmon|\blung',('lung','pulmon')),
    (r'橫膈|横膈|diaphragm',('diaphragm',)),
    (r'胸腔|胸廓|胸膜|thorac|pleur',('thorac','pleur')),
    (r'通氣|通气|ventilat',('ventilat',)),
    (r'換氣|换气|氣體交換|气体交换|gas exchange',('gas exchange','oxygen','carbon dioxide')),
    (r'氧氣|氧气|氧合|缺氧|oxygen|hypox',('oxygen','hypox')),
    (r'二氧化碳|carbon dioxide|co2',('carbon dioxide','co2')),
    (r'灌流|血流|perfusion|blood flow',('perfusion','blood flow')),
    (r'死腔|無效腔|无效腔|dead space',('dead space',)),
    (r'分流|shunt',('shunt',)),
    (r'肺活量|肺容積|肺容积|lung volume|vital capacity',('lung volume','vital capacity')),
    (r'心臟|心脏|heart|cardiac',('heart','cardiac')),
    (r'腎|肾|kidney|renal',('kidney','renal')),
    (r'血壓|血压|blood pressure',('blood pressure',)),
    (r'血紅素|血红素|hemoglobin',('hemoglobin',)),
    (r'酸.?鹼|酸.?碱|acid.?base',('acid-base','acid base')),
    (r'神經|神经|neuron|nerve',('neuron','nerve')),
    (r'肌肉|muscle',('muscle',)),
    (r'內分泌|内分泌|荷爾蒙|荷尔蒙|hormone|endocrine',('hormone','endocrine')),
    (r'(?i)v\s*/\s*q|ventilation.?perfusion',('ventilation','perfusion')),
)
_LEXICAL_STOP=set('about above after again along also among answer are can does explain for from have how into its many more most normal person please relationship should some that their them then there these this those what when where which while with would your human body between compared question correct following patient adult simple simply'.split())

def _lexical_groups(question):
    stem=normalize_scientific_text(_mcq_stem(question))
    groups=[]; seen=set()
    for pattern,aliases in _LEXICAL_ALIASES:
        if re.search(pattern,stem,re.I):
            key=tuple(aliases)
            if key not in seen:groups.append(key);seen.add(key)
    for word in re.findall(r'[a-z][a-z0-9-]{3,}',stem.lower()):
        if word not in _LEXICAL_STOP and not any(word.startswith(a) or a.startswith(word) for g in groups for a in g):
            groups.append((word,))
    return groups[:12]

def _term_coverage_and_span(text,groups):
    events=[]
    for gi,group in enumerate(groups):
        for alias in group:
            pos=text.find(alias);count=0
            while pos>=0 and count<16:
                events.append((pos,gi));count+=1
                pos=text.find(alias,pos+len(alias))
    if not events:return 0,len(text)
    events.sort();hit=len(set(gi for _,gi in events))
    counts={};left=0;best=len(text)
    for right,(pos,gi) in enumerate(events):
        counts[gi]=counts.get(gi,0)+1
        while len(counts)==hit and left<=right:
            best=min(best,pos-events[left][0])
            li=events[left][1];counts[li]-=1
            if not counts[li]:del counts[li]
            left+=1
    return hit,best

class ReferenceSearch(object):
    def __init__(self):
        self.chunks=_load_chunks() if CHUNKS_FILE.exists() else []
        self.vectors=[]; self.matrix=None; self.dimension=0
        self.window_vectors=[]; self.window_matrix=None; self.window_dimension=0
        self.window_chunk_ids=[]; self.window_texts=[]; self.windows_by_chunk=[]
        self._loaded_stamp=None; self._status_cache={}
        self._query_cache=OrderedDict()
        self._fallback_windows=None
        self.reload_index(force=True)

    def reload_index(self,force=False):
        stamp=(_file_stamp(INDEX_FILE),_file_stamp(WINDOW_INDEX_FILE))
        if not force and stamp==self._loaded_stamp and self._status_cache:
            return self._status_cache
        st=index_status(); wst=window_index_status()
        status=dict(st); status['window_ready']=bool(wst.get('ready')); status['window_reason']=wst.get('reason'); status['window_count']=wst.get('count',0)
        self._loaded_stamp=stamp; self._status_cache=status
        self.vectors=[]; self.matrix=None; self.dimension=0
        self.window_vectors=[]; self.window_matrix=None; self.window_dimension=0; self.window_chunk_ids=[]; self.window_texts=[]
        self.windows_by_chunk=[[] for _ in self.chunks]
        if not st.get('ready'): return status
        conn=sqlite3.connect(str(INDEX_FILE)); rows=conn.execute('SELECT chunk_idx,dim,vec FROM vectors ORDER BY chunk_idx').fetchall(); conn.close()
        if len(rows)!=len(self.chunks):
            status.update({'ready':False,'reason':'vector-count-mismatch','count':len(rows),'passages':len(self.chunks),'model':EMBED_MODEL}); self._status_cache=status; return status
        self.dimension=int(rows[0][1]) if rows else 0
        if _np is not None and rows:
            self.matrix=_np.empty((len(rows),self.dimension),dtype=_np.float32)
            for idx,dim,blob in rows:
                if int(dim)!=self.dimension: raise RuntimeError('Embedding dimension mismatch in index')
                self.matrix[int(idx),:]=_np.frombuffer(blob,dtype='<f4',count=self.dimension)
        else:
            self.vectors=[None]*len(rows)
            for idx,dim,blob in rows: self.vectors[int(idx)]=_unpack(blob)

        if wst.get('ready'):
            conn=sqlite3.connect(str(WINDOW_INDEX_FILE)); wrows=conn.execute('SELECT window_idx,chunk_idx,text,dim,vec FROM windows ORDER BY window_idx').fetchall(); conn.close()
            self.window_dimension=int(wrows[0][3]) if wrows else 0
            self.window_chunk_ids=[0]*len(wrows); self.window_texts=['']*len(wrows)
            if _np is not None and wrows:
                self.window_matrix=_np.empty((len(wrows),self.window_dimension),dtype=_np.float64)
                for wi,chunk_i,text,dim,blob in wrows:
                    if int(dim)!=self.window_dimension: raise RuntimeError('Window embedding dimension mismatch')
                    wi=int(wi); chunk_i=int(chunk_i); self.window_chunk_ids[wi]=chunk_i; self.window_texts[wi]=text
                    self.window_matrix[wi,:]=_np.frombuffer(blob,dtype='<f8',count=self.window_dimension)
                    if 0<=chunk_i<len(self.windows_by_chunk): self.windows_by_chunk[chunk_i].append(wi)
            else:
                self.window_vectors=[None]*len(wrows)
                for wi,chunk_i,text,dim,blob in wrows:
                    wi=int(wi); chunk_i=int(chunk_i); self.window_chunk_ids[wi]=chunk_i; self.window_texts[wi]=text; self.window_vectors[wi]=_unpack64(blob)
                    if 0<=chunk_i<len(self.windows_by_chunk): self.windows_by_chunk[chunk_i].append(wi)
        return status

    def status(self):
        chapter_units=sorted({(_source_family(x),str(x.get('chapter') or '')) for x in self.chunks if str(x.get('chapter','')).strip()})
        source_counts={}
        for x in self.chunks:
            fam=_source_family(x);source_counts[fam]=source_counts.get(fam,0)+1
        st=self.reload_index()
        return {'passages':len(self.chunks),'search_method':'source-balanced semantic vector RAG','embedding_model':EMBED_MODEL,'embedding_backend':EMBED_BASE,
                'vector_index_ready':bool(st.get('ready')),'vector_index_dimension':st.get('dimension',0),
                'rerank_index_ready':bool(st.get('window_ready')),'rerank_index_windows':st.get('window_count',0),'rerank_mode':'precomputed exact semantic window vectors' if st.get('window_ready') else 'dynamic semantic window embeddings',
                'context_budget_chars':CONTEXT_CHAR_BUDGET,'top_candidates':TOP_CANDIDATES,'final_top_k':FINAL_TOP_K,'chapter_units':len(chapter_units),'source_counts':source_counts,'scope':'human physiology + directly related pathophysiology','index_reason':st.get('reason')}

    def _query_vector(self,q):
        key=QUERY_INSTRUCTION+q
        if QUERY_CACHE_SIZE>0 and key in self._query_cache:
            v=self._query_cache.pop(key); self._query_cache[key]=v; return v,True
        v=_embed(key,timeout=QUERY_TIMEOUT)[0]
        if QUERY_CACHE_SIZE>0:
            self._query_cache[key]=v
            while len(self._query_cache)>QUERY_CACHE_SIZE: self._query_cache.popitem(last=False)
        return v,False


    def _query_vectors_batch(self,queries):
        """Cache-aware one-call embedding for contrastive MCQ queries."""
        queries=[str(x or '') for x in queries]
        out=[None]*len(queries); misses=[]; miss_idx=[]; all_hit=True
        for i,q in enumerate(queries):
            key=QUERY_INSTRUCTION+q
            if QUERY_CACHE_SIZE>0 and key in self._query_cache:
                v=self._query_cache.pop(key);self._query_cache[key]=v;out[i]=v
            else:
                all_hit=False;misses.append(key);miss_idx.append(i)
        if misses:
            vecs=_embed(misses,timeout=max(QUERY_TIMEOUT,15))
            for i,key,v in zip(miss_idx,misses,vecs):
                out[i]=v
                if QUERY_CACHE_SIZE>0:
                    self._query_cache[key]=v
                    while len(self._query_cache)>QUERY_CACHE_SIZE:self._query_cache.popitem(last=False)
        return out,all_hit

    def _scores(self,qvec):
        if self.matrix is not None:
            q=_np.asarray(qvec,dtype=_np.float32); return self.matrix.dot(q).tolist()
        return [sum(float(a)*float(b) for a,b in zip(qvec,v)) for v in self.vectors]

    def _select(self,scores):
        order=sorted(range(len(scores)),key=lambda i:scores[i],reverse=True)[:TOP_CANDIDATES]
        if not order: return []
        top=float(scores[order[0]]); threshold=max(MIN_SIM,top-RELATIVE_MARGIN)
        filtered=[i for i in order if float(scores[i])>=threshold]
        if len(filtered)<3: filtered=order[:min(5,len(order))]
        selected=[]; pages=set(); texts=[]
        for i in filtered:
            x=self.chunks[i]; page=(x.get('chapter'),x.get('pdf_page'))
            if page in pages: continue
            text=' '.join(str(x.get('text') or '').lower().split()); duplicate=False; words=set(text.split())
            for prev in texts:
                if not words or not prev: continue
                overlap=len(words & prev)/float(max(1,min(len(words),len(prev))))
                if overlap>0.82: duplicate=True; break
            if duplicate: continue
            selected.append(i); pages.add(page); texts.append(words)
            if len(selected)>=FINAL_TOP_K: break
        if not selected: selected=order[:1]
        return selected

    def _lexical_fallback(self,question,error):
        groups=_lexical_groups(question)
        overview=bool(re.search(r'肺部生理|肺的生理|呼吸生理|肺的功能|肺部功能|pulmonary physiology|respiratory physiology',question,re.I))
        failure={'ok':False,'reason':'embedding-unavailable','context':'','sources':[],
                 'evidence_count':0,'retrieval':{'embedding_model':EMBED_MODEL,
                    'embedding_error':str(error)[:180],'fallback':'no-matching-textbook-passage'}}
        if not groups or not self.chunks:return failure
        if self._fallback_windows is None:
            windows=[]
            for ci,x in enumerate(self.chunks):
                raw=' '.join(str(x.get('text') or '').split())
                sentences=[p.strip() for p in re.split(r'(?<=[.!?])\s+(?=[A-Z0-9(])',raw) if p.strip()]
                for i in range(len(sentences)):
                    w=' '.join(sentences[i:i+3])[:1050]
                    if len(w)>=95:windows.append((ci,w,w.lower(),str(x.get('chapter_title') or '').lower()))
            self._fallback_windows=windows
        ranked=[]
        for ci,w,low,title in self._fallback_windows:
            hits,span=_term_coverage_and_span(low,groups)
            if hits < (2 if len(groups)>=2 else 1):continue
            title_hits=sum(any(alias in title for alias in group) for group in groups)
            proximity=max(0.0,4.0-min(4.0,span/150.0))
            prose=1.5 if re.search(r'\b(?:during|when|because|causes|leads to|results in)\b',low) else 0.0
            figure_penalty=12.0 if re.search(r'\b(?:fig(?:ure)?\.?\s*\d+|table\s*\d+|shown in fig|concept question)',low) else 0.0
            citation_penalty=15.0 if re.search(r'\b(?:et al\.|doi:|compr physio|references\s*$)',low) else 0.0
            number_penalty=5.0 if sum(c.isdigit() for c in w)>max(12,len(w)//20) else 0.0
            overview_bonus=0.0
            excerpt=w
            if overview:
                definition=re.search(r'\b(?:main|primary|basic|essential)\s+(?:function|role|purpose)\s+of\s+(?:the\s+)?(?:lungs?|respiratory system)',low)
                if definition:
                    overview_bonus+=30.0
                    start=definition.start()
                    if w[max(0,start-4):start]=='The ':start-=4
                    excerpt=w[start:][:850]
                if 'gas exchange' in low and 'oxygen' in low and 'carbon dioxide' in low:
                    overview_bonus+=5.0
                if 'respiratory system' in low and 'lungs' in low:
                    overview_bonus+=4.0
                if re.search(r'\b(?:pneumonia|disease|patholog|fev\s*1|cheyne-stokes|brain damage|respiratory failure)\b',excerpt.lower()):
                    overview_bonus-=13.0
                if re.search(r'\b(?:fetal|neonatal|infant|disease|pathophysiology)\b',title):
                    overview_bonus-=10.0
            ranked.append((hits*10+title_hits+proximity+prose+overview_bonus-figure_penalty-citation_penalty-number_penalty,ci,excerpt,hits))
        ranked.sort(key=lambda row:row[0],reverse=True)
        selected=[];used_pages={};source_counts={}
        for score,ci,w,hits in ranked:
            x=self.chunks[ci];page=(x.get('source'),x.get('pdf_page'))
            if used_pages.get(page,0)>=1:continue
            fam=_source_family(x)
            if source_counts.get(fam,0)>=SOURCE_MAX_FINAL and len(selected)>=3:continue
            if selected and sum(len(row[2]) for row in selected)+len(w)>CONTEXT_CHAR_BUDGET:continue
            selected.append((score,ci,w,hits));used_pages[page]=1
            source_counts[fam]=source_counts.get(fam,0)+1
            if len(selected)>=(4 if overview else FINAL_TOP_K):break
        if not selected:return failure
        context='\n\n'.join('[PDF page %s | Chapter %s %s]\n%s'%
            (self.chunks[ci].get('pdf_page',''),self.chunks[ci].get('chapter') or '',
             self.chunks[ci].get('chapter_title') or '',w) for _,ci,w,_ in selected)
        sources=[{'source':self.chunks[ci].get('source'),'pdf_page':self.chunks[ci].get('pdf_page'),
                  'chapter':self.chunks[ci].get('chapter'),'chapter_title':self.chunks[ci].get('chapter_title')}
                 for _,ci,_,_ in selected]
        return {'ok':True,'reason':'lexical-fallback-after-embedding-failure','context':context,
                'sources':sources,'evidence_count':len(selected),
                'retrieval':{'embedding_model':EMBED_MODEL,'embedding_error':str(error)[:180],
                    'fallback':'bilingual-literal-textbook-search','rerank_mode':'lexical corpus fallback',
                    'selected_count':len(selected),'top_matches':[],
                    'lexical_query_groups':len(groups),'final_top_k':FINAL_TOP_K}}

    def _precomputed_windows_for_ranked(self,ranked,qvec):
        candidate=[]
        for chunk_i in ranked:
            if 0<=chunk_i<len(self.windows_by_chunk): candidate.extend(self.windows_by_chunk[chunk_i])
        if not candidate: return [],[],[]
        if self.window_matrix is not None:
            q=_np.asarray(qvec,dtype=_np.float64); vals=self.window_matrix[_np.asarray(candidate,dtype=_np.int64),:].dot(q).tolist()
        else:
            vals=[sum(float(a)*float(b) for a,b in zip(qvec,self.window_vectors[wi])) for wi in candidate]
        windows=[(self.window_chunk_ids[wi],self.window_texts[wi]) for wi in candidate]
        return windows,vals,candidate

    def search(self,question,profile='optimized',diagnostic=False):
        st=self.reload_index()
        original_q=str(question or '').strip()
        q=normalize_scientific_text(original_q)
        if not q: return {'ok':False,'reason':'empty-question','context':'','sources':[],'evidence_count':0,'retrieval':{}}
        if not st.get('ready'):
            return self._lexical_fallback(q,'vector-index-not-ready: '+str(st.get('reason')))
        profile=str(profile or 'optimized').strip().lower()
        if profile not in ('baseline','optimized'):profile='optimized'
        t=time.time(); stem=_mcq_stem(q); retrieval_q=_retrieval_alias_query(q); contrast_queries=[]; option_qvecs=[]; option_scores=[]
        try:
            qvec_full,hit_full=self._query_vector(retrieval_q)
            if profile=='optimized' and stem and stem!=q:
                qvec_stem,hit_stem=self._query_vector(_retrieval_alias_query(stem))
                # The stem remains dominant.  v235 additionally retrieves symmetric evidence
                # for every offered option so close distractors can be compared against the
                # same textbook rather than against model memory.
                qvec=_blend_vectors(qvec_stem,qvec_full,STEM_BLEND_WEIGHT); query_cache_hit=bool(hit_full and hit_stem)
                scores_full=self._scores(qvec_full); scores_stem=self._scores(qvec_stem); scores=self._scores(qvec)
                contrast_queries=_option_contrast_queries(q,stem) if _contrast_should_run(q,stem) else []
                if contrast_queries:
                    option_qvecs,contrast_hit=self._query_vectors_batch([text for _,text in contrast_queries])
                    option_scores=[self._scores(v) for v in option_qvecs]
                    query_cache_hit=bool(query_cache_hit and contrast_hit)
            else:
                qvec=qvec_full;query_cache_hit=hit_full;scores=self._scores(qvec);scores_full=scores;scores_stem=scores
        except Exception as e:
            return self._lexical_fallback(q,e)

        # Base Top-N plus a small, symmetric candidate quota for every option. This is
        # answer-agnostic and prevents an attractive distractor from suppressing the
        # evidence needed to distinguish the remaining choices.
        base_ranked=sorted(range(len(scores)),key=lambda i:scores[i],reverse=True)[:TOP_CANDIDATES]
        candidate=set(base_ranked)
        # v235: source-balanced candidate pool. Full Guyton + full Vander + complete
        # Beachey are searched together, but every textbook receives a small equal
        # candidate quota so a wording-heavy source cannot suppress a more precise
        # condition-matched passage from another book. This is answer-agnostic.
        by_source={}
        for i,x in enumerate(self.chunks):
            by_source.setdefault(_source_family(x),[]).append(i)
        for _family,ids in by_source.items():
            candidate.update(sorted(ids,key=lambda i:scores[i],reverse=True)[:SOURCE_BALANCED_PER_BOOK])
        # v237: keep the MAIN evidence path purely stem-driven. Option-conditioned
        # vectors no longer enter the main candidate set at all; they are used only in
        # a separate diagnostic evidence lane below. This prevents distractors from
        # perturbing Top-6 while still letting the solver inspect evidence for each option.
        ranked=sorted(candidate,key=lambda i:float(scores[i]),reverse=True)
        ranked=ranked[:max(TOP_CANDIDATES,TOP_CANDIDATES+SOURCE_BALANCED_PER_BOOK*3)]
        if not ranked: return {'ok':False,'reason':'no-semantic-match','context':'','sources':[],'evidence_count':0,'retrieval':{}}

        # Stage 2 uses the identical sentence-window texts + BGE-M3 cosine scores.
        # Optimized path reads precomputed window vectors from RAM instead of asking
        # Ollama to re-embed the same 50-60 windows on every student question.
        rerank_error=''; rerank_mode='dynamic semantic window embeddings'
        if st.get('window_ready') and (self.window_matrix is not None or self.window_vectors):
            windows,wscores,_candidate_windows=self._precomputed_windows_for_ranked(ranked,qvec); rerank_mode='precomputed exact semantic window vectors + stem-anchor precision'; _terms=_anchor_terms(stem); wscores=[0.90*float(sc)+0.10*_anchor_bonus(w,_terms) for (ci,w),sc in zip(windows,wscores)]
        else:
            windows=[]
            for i in ranked:
                x=self.chunks[i]
                for w in _sentence_windows(x.get('text') or ''): windows.append((i,w))
            try:
                wvecs=[]
                if windows:
                    # One larger request when possible; backend splitting is only an error fallback.
                    wvecs=_embed_resilient([w for _,w in windows],timeout=180)
                wscores=[sum(float(a)*float(b) for a,b in zip(qvec,v)) for v in wvecs]; _terms=_anchor_terms(stem); wscores=[0.90*float(sc)+0.10*_anchor_bonus(w,_terms) for (ci,w),sc in zip(windows,wscores)]
            except Exception as e:
                wscores=[]; rerank_error=str(e)

        selected_items=[]
        if windows and wscores:
            worder=sorted(range(len(wscores)),key=lambda k:wscores[k],reverse=True)
            topw=float(wscores[worder[0]]) if worder else 0.0; wthreshold=max(MIN_SIM,topw-RELATIVE_MARGIN)
            normalized=[]; source_counts={}
            deferred=[]
            for k in worder:
                if float(wscores[k])<wthreshold and len(selected_items)>=3: break
                chunk_i,w=windows[k]; x=self.chunks[chunk_i]; family=_source_family(x); page=(family,x.get('chapter'),x.get('pdf_page')); nw=set(' '.join(w.lower().split()).split()); duplicate=False
                for prev in normalized:
                    if nw and prev:
                        overlap=len(nw & prev)/float(max(1,min(len(nw),len(prev))))
                        if overlap>0.80: duplicate=True; break
                if duplicate: continue
                same_page=sum(1 for item in selected_items if item['page']==page)
                if same_page>=2: continue
                row={'chunk_i':chunk_i,'text':w,'score':float(wscores[k]),'page':page,'family':family,'nw':nw}
                if source_counts.get(family,0)>=SOURCE_MAX_FINAL:
                    deferred.append(row); continue
                selected_items.append(row); normalized.append(nw);source_counts[family]=source_counts.get(family,0)+1
                if len(selected_items)>=FINAL_TOP_K: break
            # If only one source actually has strong evidence, fill remaining slots rather
            # than forcing weak cross-book diversity.
            if len(selected_items)<FINAL_TOP_K:
                for row in deferred:
                    if len(selected_items)>=FINAL_TOP_K: break
                    nw=row['nw'];duplicate=False
                    for prev in normalized:
                        if nw and prev and len(nw & prev)/float(max(1,min(len(nw),len(prev))))>0.80:
                            duplicate=True;break
                    if duplicate:continue
                    selected_items.append(row);normalized.append(nw)
        else:
            ids=self._select(scores)
            for i in ids:
                selected_items.append({'chunk_i':i,'text':str(self.chunks[i].get('text') or ''),'score':float(scores[i]),'page':(_source_family(self.chunks[i]),self.chunks[i].get('chapter'),self.chunks[i].get('pdf_page'))})

        # v237 diagnostic lane: retrieve one compact evidence probe for EACH option
        # from that option's own top candidates, independent of the stem-ranked Top-6.
        # These probes never change the main ranking and carry no correctness label.
        contrast_blocks=[]
        if option_qvecs and contrast_queries:
            contrast_budget=OPTION_CONTRAST_CHARS
            used_contrast=0; seen_contrast=set()
            for (letter,_query),ovec,oscores in zip(contrast_queries,option_qvecs,option_scores):
                probe=set(sorted(range(len(oscores)),key=lambda i:oscores[i],reverse=True)[:OPTION_CONTRAST_PER_CHOICE])
                for _family,ids in by_source.items():
                    probe.update(sorted(ids,key=lambda i:oscores[i],reverse=True)[:1])
                probe_ranked=sorted(probe,key=lambda i:oscores[i],reverse=True)[:max(6,OPTION_CONTRAST_PER_CHOICE+3)]
                owindows,owscores,_=self._precomputed_windows_for_ranked(probe_ranked,ovec) if st.get('window_ready') else ([],[],[])
                if not owindows: continue
                order=sorted(range(len(owscores)),key=lambda k:owscores[k],reverse=True)
                chosen=None
                for k in order:
                    ci,w=owindows[k]; family=_source_family(self.chunks[ci]); norm=' '.join(str(w).lower().split()); key=norm[:260]
                    if key in seen_contrast: continue
                    chosen=(family,' '.join(str(w).split()));seen_contrast.add(key);break
                if not chosen: continue
                family,chosen_text=chosen;remain=contrast_budget-used_contrast
                if remain<120: break
                snippet=chosen_text[:min(390,remain)]
                contrast_blocks.append('[Option %s diagnostic evidence | %s]\n%s'%(letter,family,snippet));used_contrast+=len(snippet)
                if used_contrast>=contrast_budget: break

        main_budget=max(4200,CONTEXT_CHAR_BUDGET-sum(len(x) for x in contrast_blocks))
        selected=[]; chars=0
        for item in selected_items:
            i=item['chunk_i']; x=self.chunks[i]; text=item['text'].strip()
            if selected and chars+len(text)>main_budget: continue
            selected.append((x,text,item['score'])); chars+=len(text)
        main_context='\n\n'.join('[PDF page %s | Chapter %s %s]\n%s'%(x.get('pdf_page',''),x.get('chapter') or '',x.get('chapter_title') or '',text) for x,text,score in selected)
        context=main_context
        if contrast_blocks:
            context=(main_context+'\n\n===== SYMMETRIC OPTION-COMPARISON EVIDENCE =====\n'+\
                     '\n\n'.join(contrast_blocks)).strip()
        sources=[]; seen=set()
        for x,_,_ in selected:
            key=(x.get('pdf_page'),x.get('chapter'),x.get('chapter_title'))
            if key in seen: continue
            seen.add(key); sources.append({'source':x.get('source'),'pdf_page':x.get('pdf_page'),'chapter':x.get('chapter'),'chapter_title':x.get('chapter_title')})
        top_scores=[{'chunk_id':self.chunks[i].get('id'),'source':self.chunks[i].get('source'),'pdf_page':self.chunks[i].get('pdf_page'),'chapter':self.chunks[i].get('chapter'),'score':round(float(scores[i]),5)} for i in ranked[:8]]
        retrieval={'embedding_model':EMBED_MODEL,'retrieval_ms':round((time.time()-t)*1000,1),'stage1_candidate_count':len(ranked),'rerank_window_count':len(windows),
                   'selected_count':len(selected),'rerank_error':rerank_error or None,'rerank_mode':rerank_mode,'query_cache_hit':query_cache_hit,'top_matches':top_scores,
                   'query_profile':profile,'retrieval_query':stem if profile=='optimized' else q,'mcq_stem_used':bool(profile=='optimized' and stem!=q),
                   'option_contrast_enabled':bool(option_scores),'stem_blend_weight':STEM_BLEND_WEIGHT,'option_contrast_count':len(option_scores),'option_contrast_evidence_count':len(contrast_blocks),'option_probe_lane':'independent-per-option-no-main-rank-impact','source_balanced':True,'source_candidate_quota':SOURCE_BALANCED_PER_BOOK,'source_max_final':SOURCE_MAX_FINAL,'corpus_sources':sorted(set(_source_family(x) for x in self.chunks))}
        if diagnostic:
            raw_order=sorted(range(len(scores_full)),key=lambda i:scores_full[i],reverse=True)[:TOP_CANDIDATES]
            stem_order=sorted(range(len(scores_stem)),key=lambda i:scores_stem[i],reverse=True)[:TOP_CANDIDATES]
            retrieval['diagnostic']={
              'raw_question_top16':[{'chunk_id':self.chunks[i].get('id'),'source':self.chunks[i].get('source'),'pdf_page':self.chunks[i].get('pdf_page'),'chapter':self.chunks[i].get('chapter'),'score':round(float(scores_full[i]),5),'text':str(self.chunks[i].get('text') or '')[:1800]} for i in raw_order],
              'stem_top16':[{'chunk_id':self.chunks[i].get('id'),'source':self.chunks[i].get('source'),'pdf_page':self.chunks[i].get('pdf_page'),'chapter':self.chunks[i].get('chapter'),'score':round(float(scores_stem[i]),5),'text':str(self.chunks[i].get('text') or '')[:1800]} for i in stem_order],
              'selected_evidence':[{'source':x.get('source'),'pdf_page':x.get('pdf_page'),'chapter':x.get('chapter'),'chapter_title':x.get('chapter_title'),'score':round(float(score),5),'text':text[:2200]} for x,text,score in selected]
            }
        return {'ok':bool(selected),'reason':'ok' if selected else 'no-semantic-match','context':context,'sources':sources,'evidence_count':len(selected),'retrieval':retrieval}


def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--build-index',action='store_true'); ap.add_argument('--build-window-index',action='store_true'); ap.add_argument('--force',action='store_true'); ap.add_argument('--status',action='store_true'); ap.add_argument('--query',default='')
    args=ap.parse_args()
    if args.build_index: build_index(force=args.force)
    elif args.build_window_index: build_window_index(force=args.force)
    if args.status:
        print(json.dumps({'chunk_index':index_status(),'window_index':window_index_status()},ensure_ascii=False,indent=2))
    if args.query:
        s=ReferenceSearch(); print(json.dumps(s.search(args.query),ensure_ascii=False,indent=2))

if __name__=='__main__': main()
