#!/usr/bin/env python3
from pathlib import Path
import json,re
import scope_guard, reference_server
ROOT=Path(__file__).resolve().parent

def ok(cond,msg):
    if not cond: raise AssertionError(msg)
    print('[OK]',msg)

rows=[json.loads(x) for x in (ROOT/'reference_corpus/chunks.jsonl').read_text(encoding='utf-8').splitlines() if x.strip()]
counts={}; chapters={}
for r in rows:
    s=str(r.get('source','')); counts[s]=counts.get(s,0)+1; chapters.setdefault(s,set()).add(r.get('chapter'))
guy='Guyton and Hall Textbook of Medical Physiology, 15th ed.'
van='Vander Human Physiology, 16th ed.'
bea='Beachey Respiratory Care Anatomy and Physiology'
ok(len(rows)==4792,'production corpus has 4,792 passages')
ok(counts.get(guy)==2644 and len(chapters[guy])==85,'full indexed Guyton body preserved: 2,644 passages / 85 chapters')
ok(counts.get(van)==1610 and chapters[van]==set(range(1,20)),'full Vander human-physiology body: 1,610 passages / Chapters 1-19')
ok(counts.get(bea)==538 and chapters[bea]==set(range(1,14)),'complete Beachey chapter corpus: 538 passages / Chapters 1-13')
ok(not any('rau' in str(r.get('source','')).lower() for r in rows),'Rau pharmacology excluded from primary physiology RAG')

# Verify that the known failure concepts are genuinely present in source material rather than hard-coded in prompts.
alltext='\n'.join(str(r.get('text','')) for r in rows)
ok('Normal R aw in adults measured at the FRC level at a constant flow rate of 0.5 L per second is about 0.5 to 1.5 cm H 2 O/L/sec' in alltext,'condition-matched Beachey airway-resistance evidence is present')
ok('long delay occurs for transport of blood from the lungs to the brain' in alltext,'Guyton Cheyne-Stokes lungs-to-brain delay evidence is present')
ok('less than 60 mm Hg elicits significantly more nerve activity' in alltext,'peripheral-chemoreceptor threshold/interactions evidence is present')
ok('equilibrium between alveolar gas and capillary blood PO 2 occurs within the first 0.25 second' in alltext,'Beachey early pulmonary-capillary exchange evidence is present')

rs=(ROOT/'reference_search.py').read_text(encoding='utf-8')
sv=(ROOT/'reference_server.py').read_text(encoding='utf-8')
worker=(ROOT/'cloudflare/worker/src/index.js').read_text(encoding='utf-8')
start=(ROOT/'START_VQ_TA_SERVER.sh').read_text(encoding='utf-8')
for token in ['SOURCE_BALANCED_PER_BOOK','SOURCE_MAX_FINAL','_option_contrast_queries','source_balanced','corpus_sources','SYMMETRIC OPTION-COMPARISON EVIDENCE']:
    ok(token in rs,'retrieval contains '+token)
for token in ['model_structured_consistency_choice','model_structured_consistency_repair','option_checks','runner_up_rejection','challenge_high_risk_agreement','blind_constraint_verify_mcq','target_polarity']:
    ok(token in sv,'answer agent contains '+token)
ok("'options':{'num_ctx':MODEL_NUM_CTX,'num_predict':1" in sv,'Granite prewarm uses production context length, avoiding first-question runner reload')
ok('full multi-textbook source-balanced RAG' in start,'server startup advertises full-physiology multi-textbook profile')

# Scope must be broad human physiology, but not open-domain chat.
def fake_found(source='Guyton and Hall Textbook of Medical Physiology, 15th ed.',score=.70):
    return {'ok':True,'context':'physiology evidence','retrieval':{'top_matches':[{'source':source,'score':score} for _ in range(4)]}}
for q in ['腎小球過濾率如何調節？','胰島素如何促進葡萄糖利用？','動作電位的不反應期機轉為何？','胃排空如何受到調控？','月經週期中 LH surge 的生理機轉？','肺泡通氣如何影響 PaCO2？']:
    ok(scope_guard.decision(q,fake_found()).get('in_scope') is True,'in-scope human physiology: '+q[:16])
for q in ['我今天心情不好','台北今天天氣如何？','幫我寫履歷','推薦一家餐廳']:
    ok(scope_guard.decision(q,fake_found()).get('in_scope') is False,'open-domain question rejected: '+q)
ok('人體生理學及直接相關的病理生理' in worker and 'human physiology or directly related pathophysiology' in worker,'cloud fallback uses the same broad physiology scope')
ok('specializing in respiratory physiology' not in worker,'cloud answer prompt is no longer respiratory-only')

# No memorized exam/normal-value patch in production decision code.
prod=rs+'\n'+sv+'\n'+worker+'\n'+(ROOT/'scope_guard.py').read_text(encoding='utf-8')
for forbidden in ['114 年第二次','112 年第二次','111 年第二次','110 年第二次','109 年第二次','C C B A B A A A D A C C A D B']:
    ok(forbidden not in prod,'production code excludes benchmark key/text marker: '+forbidden)
ok("?2300:NaN" not in worker and 'normal quiet adult VT is about 500 mL' not in worker,'cloud deterministic verifier contains no memorized normal-value answer shortcuts')
ok('2300.0' not in sv and '5800.0' not in sv,'local deterministic verifier contains no memorized FRC/TLC shortcut')

# The model-consistency repair is answer-agnostic: it follows the model's own unique option verdict.
checks={'A':{'verdict':'supports','reason':'matches decisive relation'},'B':{'verdict':'contradicts','reason':'opposite'},'C':{'verdict':'contradicts','reason':'opposite'},'D':{'verdict':'insufficient','reason':'not established'}}
choice,meta=reference_server.model_structured_consistency_choice('Which statement is correct? A. one B. two C. three D. four',checks,'choose true/best',set('ABCD'))
ok(choice=='A' and meta.get('target')=='supports','structured consistency repair follows model-internal option table, not physiology facts')
checks_false={'A':{'verdict':'supports'},'B':{'verdict':'supports'},'C':{'verdict':'contradicts'},'D':{'verdict':'supports'}}
choice,_=reference_server.model_structured_consistency_choice('下列何者錯誤？ A. 一 B. 二 C. 三 D. 四',checks_false,'choose false/incorrect',set('ABCD'))
ok(choice=='C','negative-polarity MCQ consistency repair handles "何者錯誤" generically')

reg=[json.loads(x) for x in (ROOT/'benchmark/regression/v235_seen_regression.jsonl').read_text(encoding='utf-8').splitlines() if x.strip()]
ok(len(reg)==12,'12 already-seen items are isolated as development regression, not production knowledge')
runner=(ROOT/'benchmark/regression/RUN_V235_SEEN_REGRESSION.py').read_text(encoding='utf-8')
ok("{'question':row['question'],'model_key':args.model,'profile':'optimized'}" in runner,'regression runner sends question/model only; expected option is not in production request')
ok('Expected options were used only after each production answer completed' in runner,'regression report explicitly records post-hoc scoring policy')

print('===== ALL v235 FULL HUMAN-PHYSIOLOGY + MULTI-TEXTBOOK + OPTION-CONSISTENCY CHECKS PASSED =====')
