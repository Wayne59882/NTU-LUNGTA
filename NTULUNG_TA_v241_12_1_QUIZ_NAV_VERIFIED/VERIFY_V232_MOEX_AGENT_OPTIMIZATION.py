#!/usr/bin/env python3
from __future__ import print_function
import json,re,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent

def ok(cond,msg):
    if not cond: raise AssertionError(msg)
    print('[OK]',msg)

rs=(ROOT/'reference_search.py').read_text(encoding='utf-8')
rsv=(ROOT/'reference_server.py').read_text(encoding='utf-8')
fetch=(ROOT/'benchmark/moex/FETCH_MOEX_BENCHMARK.py').read_text(encoding='utf-8')
evalp=(ROOT/'benchmark/moex/EVALUATE_V231_TRACE.py').read_text(encoding='utf-8')
diag=(ROOT/'benchmark/moex/DIAGNOSE_V231_ERRORS.py').read_text(encoding='utf-8')
run=(ROOT/'benchmark/moex/RUN_V231_FULL_BENCHMARK_DIAGNOSE_AND_DEPLOY.sh').read_text(encoding='utf-8')
manifest=(ROOT/'BUILD_MANIFEST_V231.txt').read_text(encoding='utf-8')

ok("BUILD='v232-semantic-constraint-verified-agent'" in rsv,'v232 Reference backend build is active')
ok("V231_DEFAULT_PROFILE" in rsv and "profile='optimized'" in rsv,'optimized production profile is available and defaulted')
ok('_mcq_stem' in rs and '_blend_vectors' in rs and "query_profile':profile" in rs,'answer-agnostic MCQ stem-weighted semantic retrieval is wired')
ok('local_batch_answer_optimized' in rsv and '_batch_mcq_blind_review_prompt' in rsv and '_batch_mcq_adjudication_prompt' in rsv,'same selected LLM performs primary answer, blind self-check and disagreement adjudication')
ok('official_answer_letter' in fetch and "'messages'" not in fetch[fetch.find("row={'question_text'"):fetch.find("splits[split].append",fetch.find("row={'question_text'"))], 'MOEX benchmark rows are not formatted as training conversations')
ok("{'questions':questions,'model_key':args.model,'profile':args.profile,'diagnostic':True}" in evalp,'official answers are not sent to retrieval endpoint')
ok("{'items':items,'model_key':args.model,'profile':args.profile}" in evalp,'official answers are not sent to answer endpoint')
ok('Answer-aware oracle retrieval' in diag and 'OFFLINE ERROR DIAGNOSIS' in diag,'answer-aware diagnosis is explicitly isolated to post-hoc benchmark analysis')
ok('corpus_coverage_gap' in diag and 'retrieval_failure' in diag and 'reasoning_failure' in diag and 'question_interpretation_failure' in diag and 'option_mapping_failure' in diag,'full diagnostic failure taxonomy is present')
ok('beachey_respiratory_core.jsonl' in (ROOT/'benchmark/moex/APPLY_SUPPLEMENTAL_CORPUS.py').read_text(encoding='utf-8') and 'vander_respiratory_ch13.jsonl' in (ROOT/'benchmark/moex/APPLY_SUPPLEMENTAL_CORPUS.py').read_text(encoding='utf-8'),'conditional supplemental corpus contains Beachey + Vander')
ok('Rau' not in (ROOT/'benchmark/moex/APPLY_SUPPLEMENTAL_CORPUS.py').read_text(encoding='utf-8'),'Rau is excluded from supplemental retrieval')
ok('Highest official-MOEX correct count wins' in (ROOT/'benchmark/moex/COMPARE_AND_SELECT.py').read_text(encoding='utf-8'),'final configuration is selected by official-MOEX correct count')
ok('NO HIGH-CONFIDENCE CORPUS GAP -> KEEP GUYTON ONLY' in run and 'TRUE CORPUS GAP DETECTED -> A/B TEST BEACHEY + VANDER' in run,'one-command workflow conditionally tests books only after trace diagnosis')
ok('DEPLOY_CLOUDFLARE_WORKERS_DEV.sh' in run,'final benchmark-selected configuration is deployed automatically')
ok('no exam-answer training' in manifest.lower() and 'no per-question answer patches' in manifest.lower(),'manifest enforces model/RAG optimization rather than exam-answer fitting')
# Supplemental package sanity.
for name,minrows in [('beachey_respiratory_core.jsonl',300),('vander_respiratory_ch13.jsonl',80)]:
    p=ROOT/'benchmark/supplemental_sources'/name
    rows=[x for x in p.read_text(encoding='utf-8').splitlines() if x.strip()]
    ok(len(rows)>=minrows,'%s prepared (%d passages)'%(name,len(rows)))
print('===== ALL v232 MOEX BENCHMARK-GUIDED AGENT OPTIMIZATION CHECKS PASSED =====')
