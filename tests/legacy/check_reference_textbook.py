#!/usr/bin/env python3
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "app"))
from reference_search import ReferenceSearch, index_status
S=ReferenceSearch(); st=S.status()
assert st['passages']==4792,st
assert st['search_method']=='source-balanced semantic vector RAG',st
assert st['embedding_model']=='bge-m3:latest',st
assert st['top_candidates']==16,st
assert st['final_top_k']==6,st
assert st['context_budget_chars']==8500,st
assert st['source_counts']=={'guyton':2644,'beachey':538,'vander':1610},st
assert st['scope']=='human physiology + directly related pathophysiology',st
print('[OK] Reference corpus = 4,792 passages: Guyton 2,644 + Vander 1,610 + Beachey 538')
print('[OK] Reference retrieval = source-balanced semantic vector RAG + exact semantic window rerank')
print('[OK] Embedding model =',st['embedding_model'])
print('[OK] Retrieval settings: global Top16 + per-book quotas -> semantic rerank -> Top6, context=8500 chars')
idx=index_status()
if idx.get('ready'):
    print('[OK] Vector index ready: count=%s dimension=%s'%(idx.get('count'),idx.get('dimension')))
else:
    print('[INFO] Vector index is absent/stale in portable package; installer builds/extends it on the server.')
print('[OK] Full human-physiology Reference Textbook static acceptance passed')
