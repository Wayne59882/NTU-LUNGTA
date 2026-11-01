#!/usr/bin/env python3
from pathlib import Path
import json
import scope_guard, reference_server
ROOT=Path(__file__).resolve().parent

def ok(cond,msg):
    if not cond: raise AssertionError(msg)
    print('[OK]',msg)

rows=[json.loads(x) for x in (ROOT/'reference_corpus/chunks.jsonl').read_text(encoding='utf-8').splitlines() if x.strip()]
counts={};chapters={}
for r in rows:
    s=str(r.get('source',''));counts[s]=counts.get(s,0)+1;chapters.setdefault(s,set()).add(r.get('chapter'))
guy='Guyton and Hall Textbook of Medical Physiology, 15th ed.'
van='Vander Human Physiology, 16th ed.'
bea='Beachey Respiratory Care Anatomy and Physiology'
ok(len(rows)==4792,'production corpus remains 4,792 passages')
ok(counts.get(guy)==2644 and len(chapters[guy])==85,'Guyton 2,644 / 85 chapters preserved')
ok(counts.get(van)==1610 and chapters[van]==set(range(1,20)),'Vander 1,610 / Chapters 1-19 preserved')
ok(counts.get(bea)==538 and chapters[bea]==set(range(1,14)),'Beachey 538 / Chapters 1-13 preserved')
ok(not any('rau' in str(r.get('source','')).lower() for r in rows),'Rau remains excluded from primary physiology RAG')
alltext='\n'.join(str(r.get('text','')) for r in rows)
ok('long delay occurs for transport of blood from the lungs to the brain' in alltext,'Cheyne-Stokes endpoint evidence exists in corpus')
ok('hypoxemia increases their sensitivity to hydrogen ions' in alltext,'hypoxemia-H+ sensitivity evidence exists in corpus')
ok('PaO 2 falls below 60 mm Hg' in alltext,'peripheral chemoreceptor threshold evidence exists in corpus')

rs=(ROOT/'reference_search.py').read_text(encoding='utf-8')
sv=(ROOT/'reference_server.py').read_text(encoding='utf-8')
gw=(ROOT/'gateway.py').read_text(encoding='utf-8')
worker=(ROOT/'cloudflare/worker/src/index.js').read_text(encoding='utf-8')
for token in ['v237 diagnostic lane','probe_ranked','option_probe_lane','STEM_BLEND_WEIGHT','SOURCE_BALANCED_PER_BOOK']:
    ok(token in rs,'v237 retrieval contains '+token)
ok('candidate.update(sorted(range(len(oscores))' not in rs,'option-conditioned vectors cannot alter main candidate ranking')
ok("OPTION_CONTRAST_CHARS','1800" in rs,'option-probe context budget is compact')
for token in ['_batch_selective_review_needed','v237-selective-evidence-review','negative-polarity','threshold-range','selective_review_used']:
    ok(token in sv,'v237 selective batch path contains '+token)
ok("VQ_BATCH_MAX_ITEMS','4'" in sv,'batch default is accuracy-first 4 items')
ok("VQ_BATCH_EVIDENCE_CHARS','1250'" in sv,'batch evidence budget expanded for accuracy')
ok('v236 appended option-comparison evidence at the END' in sv,'batch compactor explicitly fixes dropped option-evidence failure')
ok("BUILD='v237-selective-evidence-decision-agent'" in sv,'v237 backend build active')
ok('v237-selective-evidence-decision-stable' in sv and 'v237-selective-evidence-decision-stable' in gw,'v237 serving profile active')

# Generic review-trigger checks; no expected answer is consulted.
q6='有關陳氏（Cheyne-Stokes）呼吸的敘述，下列何者錯誤？\nA. 與低心輸出量有關\nB. 與腦部創傷有關\nC. 與心臟及肺部間血液傳送延遲有關\nD. 呼吸中樞對於二氧化碳分壓的改變延遲反應'
q8='動脈血氧分壓和周邊化學受體調控通氣的機制，下列敘述何者正確？\nA. 氧分壓低於70 mm Hg時增加通氣\nB. 氧分壓高於80 mm Hg時降低通氣\nC. 氧分壓越低（60～30 mm Hg），越增加對氫離子濃度的敏感度\nD. 氧分壓越低，心輸出量越高'
base={'option':'A','confidence':0.95,'needs_review':False,'decisive_relation':'present'}
need,reasons=reference_server._batch_selective_review_needed({'question':q6},base)
ok(need and 'negative-polarity' in reasons,'generic negative-polarity MCQ gets selective blind review')
need,reasons=reference_server._batch_selective_review_needed({'question':q8},base)
ok(need and 'threshold-range' in reasons,'generic threshold/range MCQ gets selective blind review')
qplain='人體呼吸道內氣流型態多為層流之區域為：\nA. 氣管\nB. 主支氣管\nC. 小呼吸道\nD. 肺泡'
need,reasons=reference_server._batch_selective_review_needed({'question':qplain},{'option':'C','confidence':0.95,'needs_review':False,'decisive_relation':'flow pattern'})
ok(not need,'ordinary high-confidence conceptual MCQ remains single-pass')

fake='[Main evidence]\nMAIN-FACT-ONE '*30+'\n\n===== SYMMETRIC OPTION-COMPARISON EVIDENCE =====\n\n[Option A diagnostic evidence | guyton]\nAAA evidence sentence\n\n[Option B diagnostic evidence | vander]\nBBB evidence sentence\n\n[Option C diagnostic evidence | beachey]\nCCC evidence sentence\n\n[Option D diagnostic evidence | guyton]\nDDD evidence sentence'
compact=reference_server._compact_batch_context(fake,700)
for letter in 'ABCD':ok(('Option '+letter) in compact,'batch compactor preserves Option '+letter+' diagnostic evidence')

# Accuracy-first generic review classes and completeness guard.
for token in ['state-compartment','set-membership','numeric-discrimination','relationship-topology','batch_missing_retry','local-single-recovery']:
    ok(token in sv,'accuracy-first path contains '+token)
qstate='海平面正常吸氣末時，解剖性無效腔內的氣體組成最可能為何？\nA. x\nB. y\nC. z\nD. w'
need,reasons=reference_server._batch_selective_review_needed({'question':qstate},{'option':'A','confidence':0.95,'needs_review':False,'decisive_relation':'gas composition'})
ok(need and 'state-compartment' in reasons,'state/compartment MCQ gets independent review')
qset='下列那些部位含有吸氣神經元？ ①a ②b ③c ④d\nA.①② B.②③ C.③④ D.①④'
need,reasons=reference_server._batch_selective_review_needed({'question':qset},{'option':'A','confidence':0.95,'needs_review':False,'decisive_relation':'membership'})
ok(need and 'set-membership' in reasons,'combination/set-membership MCQ gets independent review')

# Scope / cloud lock preserved.
def fake_found():return {'ok':True,'context':'physiology evidence','retrieval':{'top_matches':[{'source':guy,'score':.7} for _ in range(4)]}}
ok(scope_guard.decision('腎小球過濾率如何調節？',fake_found()).get('in_scope') is True,'broad human physiology remains in scope')
ok(scope_guard.decision('我今天心情不好',fake_found()).get('in_scope') is False,'open-domain chat remains blocked')
ok('human physiology or directly related pathophysiology' in worker,'cloud fallback remains full-physiology scoped')


# Cloud/BYOK must use the same accuracy-first decision discipline, not a looser v229 path.
for token in ['v237-cloud-selective-evidence','cloudConsistencyChoice','cloudRiskReasons','cloudBatchBlindPrompt','cloudBatchAdjudicationPrompt','microGroups(items,maxItems=4','OPTION-COMPARISON EVIDENCE']:
    ok(token in worker,'cloud accuracy-first path contains '+token)
front=(ROOT/'web/reference/js/52_v229_semantic_microbatch.js').read_text(encoding='utf-8')
ok("'第 '+String(i)+' 題'" in front,'batch frontend prints an explicit question number for every returned item')
extended=ROOT/'benchmark/regression/v237_extended_seen_regression.jsonl'
rows_ext=[json.loads(x) for x in extended.read_text(encoding='utf-8').splitlines() if x.strip()]
ok(len(rows_ext)==22,'extended seen regression contains all 22 previously reviewed items')
ok(len({r['id'] for r in rows_ext})==22,'extended seen regression IDs are unique')

# No benchmark answer leakage into production sources.
prod=rs+'\n'+sv+'\n'+gw+'\n'+worker+'\n'+(ROOT/'scope_guard.py').read_text(encoding='utf-8')
for forbidden in ['114 年第二次','112 年第二次','111 年第二次','110 年第二次','109 年第二次','C C B A B A A A D A C C A D B']:
    ok(forbidden not in prod,'production excludes benchmark marker: '+forbidden)

runner=(ROOT/'benchmark/regression/RUN_V237_EXTENDED_SEEN_REGRESSION.py').read_text(encoding='utf-8')
ok("{'question':row['question'],'model_key':args.model,'profile':'optimized'}" in runner,'regression sends question/model only')
ok('Expected options were used only after each production answer completed' in runner,'expected answers remain post-hoc only')
print('===== ALL v237 SELECTIVE-EVIDENCE + FAST-BATCH STATIC CHECKS PASSED =====')
