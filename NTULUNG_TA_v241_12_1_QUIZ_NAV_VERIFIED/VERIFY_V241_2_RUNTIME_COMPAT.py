#!/usr/bin/env python3
from __future__ import print_function
from pathlib import Path
import json
import shutil
import uuid

ROOT=Path(__file__).resolve().parent

def ok(cond,msg):
    if not cond:
        raise AssertionError(msg)
    print('[OK]',msg)

# Current build/profile must use the repaired course build.
sv=(ROOT/'reference_server.py').read_text(encoding='utf-8')
gw=(ROOT/'gateway.py').read_text(encoding='utf-8')
rs=(ROOT/'reference_search.py').read_text(encoding='utf-8')
worker=(ROOT/'cloudflare/worker/src/index.js').read_text(encoding='utf-8')
start=(ROOT/'START_VQ_TA_SERVER.sh').read_text(encoding='utf-8')
installer=(ROOT/'INSTALL_V241_2_ONE_CLICK_STABLE.sh').read_text(encoding='utf-8')

ok("BUILD='v241.12.5-full-answer-voice'" in sv,'v241.12.5 reference backend build label active')
ok("'build':'v241.12.5-full-answer-voice'" in gw,'v241.12.5 gateway health build label active')
ok((ROOT/'VERSION.txt').read_text(encoding='utf-8').strip()=='v241.12.5-full-answer-voice','v241.12.5 package version marker active')
ok('INSTALL_V240_1_NODE_BOOTSTRAP_FIXED.sh' not in installer,'deployment no longer enters legacy version-locked installer chain')

# Preserve the mature physiology RAG/verification behavior while allowing the new course layer.
rows=[json.loads(x) for x in (ROOT/'reference_corpus/chunks.jsonl').read_text(encoding='utf-8').splitlines() if x.strip()]
counts={}; chapters={}
for r in rows:
    s=str(r.get('source','')); counts[s]=counts.get(s,0)+1; chapters.setdefault(s,set()).add(r.get('chapter'))
guy='Guyton and Hall Textbook of Medical Physiology, 15th ed.'
van='Vander Human Physiology, 16th ed.'
bea='Beachey Respiratory Care Anatomy and Physiology'
ok(len(rows)==4792,'legacy Reference Textbook corpus remains 4,792 passages')
ok(counts.get(guy)==2644 and len(chapters.get(guy,set()))==85,'Guyton corpus preserved')
ok(counts.get(van)==1610 and chapters.get(van,set())==set(range(1,20)),'Vander corpus preserved')
ok(counts.get(bea)==538 and chapters.get(bea,set())==set(range(1,14)),'Beachey corpus preserved')
for token in ['v237 diagnostic lane','probe_ranked','option_probe_lane','STEM_BLEND_WEIGHT','SOURCE_BALANCED_PER_BOOK']:
    ok(token in rs,'legacy semantic retrieval behavior preserved: '+token)
for token in ['_batch_selective_review_needed','v237-selective-evidence-review','negative-polarity','threshold-range','selective_review_used','batch_missing_retry','local-single-recovery']:
    ok(token in sv,'answer verification behavior preserved: '+token)
for token in ['v238-cloud-selective-evidence','cloudConsistencyChoice','cloudRiskReasons','cloudBatchBlindPrompt','cloudBatchAdjudicationPrompt']:
    ok(token in worker,'cloud verification behavior preserved: '+token)

# Launcher must not silently weaken the source defaults.
ok('VQ_BATCH_CHAR_BUDGET:-9000' in start,'batch character budget aligned with accuracy-first backend default')
ok('VQ_BATCH_EVIDENCE_CHARS:-1250' in start,'batch evidence budget aligned with accuracy-first backend default')

# New course-adaptive routes exist end-to-end.
for route in ['/api/reference/course-inspect','/api/reference/course-build','/api/reference/course-context','/api/reference/course-answer-local','/api/reference/course-quiz','/api/reference/course-quiz-result','/api/reference/course-quiz-stats','/api/reference/course-delete']:
    ok(route in sv,'reference backend route present: '+route)
ok("u.pathname==='/api/reference/course-answer'" in worker,'Worker course-answer route present')
ok("p.startswith('/api/reference/')" in gw,'gateway proxies reference/course routes')

# Small reviewed banks prepare first, and a draw does not call a model.
cr=(ROOT/'course_runtime.py').read_text(encoding='utf-8')
ok("QUESTION_TARGET=100" in cr,'complete question bank target is 100 per unit')
ok("def quiz(self,course_id,per_unit=2," in cr,'Scenario Practice default is 2 draws per unit')
ok("'quiz_questions_per_unit':2" in cr,'course manifest records 2 questions per unit')
ok("questions=build_exam_questions" in cr and "QUESTION_GENERATION='exam-mcq-v5'" in cr and "def expand_questions(" in cr,'reviewed quick banks prepare first; selected banks can expand toward 100')
ok("if len(bank)<per:" in cr,'practice waits only for the requested questions per unit')
quiz_body=cr.split('    def quiz(self,course_id,per_unit=2,',1)[1].split('    def _quiz_db(',1)[0]
ok('_scenario_questions' not in quiz_body and 'model_call(' not in quiz_body,'the 1–10 question draw makes no language-model call')
ok('if per<1 or per>10:raise ValueError' in cr,'each unit permits 1–10 randomly drawn scenarios')
ok('def record_quiz(' in cr and 'def quiz_statistics(' in cr,'quiz result persistence and per-course statistics present')
ok('def course_summaries(' in cr and 'def delete_course(self,course_id):' in cr,'lightweight list and code-free deletion present')
ok('NTULUNG_TA_v241_10_QUIZ_REPORT_COURSE_MANAGEMENT/course_workspaces' in installer,'existing v241.10 uploaded courses are recovered')
ok('.admin_delete_token' not in installer and 'X-VQ-Course-Delete-Token' not in (ROOT/'web/reference/js/55_v241_course_adaptive_ta.js').read_text(encoding='utf-8'),'deployment and UI do not require a deletion code')
ok('FALLBACK_MS' not in worker and "if(cloud.provider==='off')" in worker,'confirmed cloud provider answers without a local delay')
ok("'script_status':'preparing'" in cr and "def _chinese_lecture" in cr,'course Q&A activates before Chinese script preparation')

# UI supports multiple PDFs in one staged course and explicit visual-model selection.
ui=(ROOT/'web/reference/js/55_v241_course_adaptive_ta.js').read_text(encoding='utf-8')
html=(ROOT/'web/reference/index.html').read_text(encoding='utf-8')
byok=(ROOT/'web/reference/js/50_cloud_byok_selector.js').read_text(encoding='utf-8')
ok('type="file" accept="application/pdf,.pdf" multiple' in ui,'multi-PDF file input enabled')
ok("fd.append('stage_id',draft.stageId)" in ui,'subsequent PDFs append to the same staging course')
ok("indexedDB.open('VQCourseUpload'" in ui and 'resumeUpload' in ui,'browser saves PDF files for resumed uploads')
ok("def upload_chunk(" in cr and "def resume_pending(" in cr,'server saves upload offsets and resumes build jobs')
ok("manifest.visual_model==='vq'" in ui and '_is_respiratory_physiology' in cr,'automatic visual-model detection present')
ok("const show=!manifest||manifest.visual_model==='vq'" in ui,'built-in physiology shows V/Q and nonrespiratory courses hide it')
ok('id="modelTab" style="display:none"' not in html,'V/Q tab is visible in built-in default HTML')
ok('location.reload();return;' in ui,'completed course activates through a clean page reload')
ok('window.VQ_getActiveCourseLecture' in ui,'selected uploaded unit supplies the lecture voice controller')
ok('Confirm API Key' in html and 'API key confirmed' in byok,'API Key Confirm/Enter acknowledgement present')

# Reports remain emailed/stored and now create a verified correction memory.
feedback=(ROOT/'feedback/feedback_service.py').read_text(encoding='utf-8')
for token in ['correction_status','def pending_corrections','def find_correction','def correction_guidance']:
    ok(token in feedback,'feedback correction persistence present: '+token)
for token in ['/api/reference/feedback-correction-status','def _auto_correct_feedback','auto-corrected-course-memory','pending_corrections()']:
    ok(token in sv,'automatic correction route/runtime present: '+token)
fbui=(ROOT/'web/reference/js/53_local_answer_feedback.js').read_text(encoding='utf-8')
ok('renderReport(d,d.id)' in fbui and 'VQ_LAST_COURSE_ANSWER_META' in fbui,'report UI sends course evidence metadata and shows a persistent saved receipt')
ok('window.VQ_showAnswerFeedback=showFeedback' in fbui and 'window.VQ_showAnswerFeedback(question,answer,elapsed)' in ui,'uploaded-course answer explicitly reveals Report action')
ok("'feedback_intent':intent" in feedback and "'positive'" in feedback and "'style'" in feedback,'positive and style feedback are classified and persisted')

print('===== ALL v241.12.5 CURRENT-BUILD + LEGACY-COMPAT CHECKS PASSED =====')
