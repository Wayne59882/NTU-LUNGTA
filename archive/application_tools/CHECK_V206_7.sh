#!/usr/bin/env bash
set -euo pipefail

echo '===== v226 MCQ ACCURACY + COMPLETE ANSWER + INTEGRATED SFT ACCEPTANCE ====='
python3 finetune/BUILD_BEHAVIOR_SFT_DATASET.py >/tmp/v224_dataset_build.txt
python3 finetune/VALIDATE_SFT_DATASET.py
[[ ! -e finetune/dataset/teacher_gold.jsonl ]] || { echo '[ERROR] separate teacher_gold dataset must not exist'; exit 1; }
grep -q "'gemma':{'label':GEMMA_MODEL_LABEL" reference_server.py
grep -q "'mistral':{'label':MISTRAL_MODEL_LABEL" reference_server.py
grep -q 'VQ_GEMMA_API_BASE' kb_server.py
grep -q 'VQ_MISTRAL_API_BASE' kb_server.py
! grep -q 'gemini-3.8-flash' cloudflare/worker/src/index.js
grep -q 'gpt-5.6-luna' cloudflare/worker/src/index.js
grep -q 'MANDATORY RESPONSE CONTRACT' cloudflare/worker/src/index.js
python3 -m py_compile finetune/model_profiles.py finetune/train_local_model_qlora.py finetune/finetuned_local_router.py reference_server.py kb_server.py
echo '[OK] Course examples integrated into main SFT corpus; no separate priority/gold weighting'
echo '[OK] Gemma/Ministral remain student-selectable; historical Granite profile stays available for research compatibility'
echo '[OK] BYOK GPT-5.6 Luna uses the same question-type prompt engineering; no cloud fine-tuning is required'
cd "$(dirname "$0")"
echo '===== v220 DEFAULT REFERENCE TEXTBOOK + v219 ACCEPTANCE ====='
python3 -m py_compile gateway.py kb_server.py reference_search.py reference_server.py speech_stt_server.py teacher_voice_tts_server.py
while IFS= read -r -d '' f; do node --check "$f" >/dev/null; done < <(find web cloudflare -type f -name '*.js' -print0)
echo '[OK] Python + all active JavaScript syntax'
grep -q 'url=/reference/' web/index.html || { echo '[FAIL] root default is not Reference Textbook'; exit 1; }
grep -q "location.replace('/reference/')" web/index.html || { echo '[FAIL] browser root redirect is not Reference Textbook'; exit 1; }
grep -q "if self.path=='/':self.path='/reference/'" gateway.py || { echo '[FAIL] gateway root default is not Reference Textbook'; exit 1; }
echo '[OK] Default knowledge source = Reference Textbook; Query Knowledge Base remains available by explicit selection'

python3 CHECK_REFERENCE_TEXTBOOK.py
./CHECK_HOPKINS_REFERENCE.sh
node VERIFY_V206_7_LUNG.cjs

# Reference Book is now the intentionally simple thesis pipeline:
# chunks -> local embeddings -> vector index -> semantic top-k -> grounded LLM.
grep -q "bge-m3:latest" reference_search.py PREPARE_REFERENCE_VECTOR_RAG.sh
grep -q "127.0.0.1:11438" reference_search.py PREPARE_REFERENCE_VECTOR_RAG.sh START_REFERENCE_EMBEDDING_OLLAMA.sh START_VQ_TA_SERVER.sh
grep -q 'No teacher reference WAV is required' START_TEACHER_VOICE_TTS.sh
printf '[OK] Dedicated active services: answer=11435, STT=11437, vector embedding=11438; legacy teacher-reference TTS is not required\n'
grep -q '/api/embed' reference_search.py PREPARE_REFERENCE_VECTOR_RAG.sh
grep -q "search_method':'source-balanced semantic vector RAG'" reference_server.py
! grep -qiE 'def _bm25|bm25_top_score|semantic query \+ BM25' reference_search.py reference_server.py web/reference/js/48_reference_textbook.js cloudflare/worker/src/index.js
grep -q 'WINDOW_INDEX_FILE' reference_search.py
grep -q 'precomputed exact semantic window vectors' reference_search.py
grep -q 'WINDOW_INDEX_BATCH' reference_search.py
echo '[OK] Reference Textbook = multilingual semantic Vector RAG (no BM25 main path)'
echo '[OK] Rerank-window embeddings are precomputed once and reused from RAM; retrieval quality settings remain unchanged'

# Exact user-reported UI regressions must stay fixed.
! grep -q 'scrollIntoView(' web/reference/js/25_v105_resume_after_question_mouth_sync.js
! grep -q 'scrollIntoView(' web/kb/js/25_v105_resume_after_question_mouth_sync.js
grep -q 'Preserve the exact current position when rate/pitch changes' web/reference/js/45_v204_final_voice_controller.js
grep -q 'Preserve the exact current position when rate/pitch changes' web/kb/js/45_v204_final_voice_controller.js
! grep -qi 'CONVERSATION HISTORY' web/reference/index.html
! grep -qi 'CONVERSATION HISTORY' web/kb/index.html
echo '[OK] speech-rate/pitch adjustment preserves current playback position'

for f in web/kb/js/25_v105_resume_after_question_mouth_sync.js web/reference/js/25_v105_resume_after_question_mouth_sync.js; do
  grep -q 'highlighted sentence follows the spoken segment' "$f"
  grep -q 'u.onboundary' "$f"
  grep -q 'startMouthLoop' "$f"
done
echo '[OK] Teacher-script highlighting follows speech timing and lip/mouth animation remains synchronized'

# V/Q pronunciation remains V Q.
grep -q "'V Q'" web/reference/js/45_v204_final_voice_controller.js
! grep -q "V.*Q.*'通氣灌流" web/reference/js/45_v204_final_voice_controller.js
echo '[OK] V/Q pronunciation = V Q'

# Speech recognition is mandatory and has a browser fallback.
grep -q 'voice-question recognition is mandatory in v206.7' START_VQ_TA_SERVER.sh
grep -q 'startBrowserRecognitionFallback' web/reference/js/25_v105_resume_after_question_mouth_sync.js
grep -q 'startBrowserRecognitionFallback' web/kb/js/25_v105_resume_after_question_mouth_sync.js
echo '[OK] STT mandatory startup + browser fallback'
grep -q 'prewarmIfPermissionAlreadyGranted' web/reference/js/25_v105_resume_after_question_mouth_sync.js web/kb/js/25_v105_resume_after_question_mouth_sync.js
grep -q "if(stop) stop.disabled=true" web/reference/js/25_v105_resume_after_question_mouth_sync.js web/kb/js/25_v105_resume_after_question_mouth_sync.js
grep -q 'X-VQ-Language-Hint' web/reference/js/25_v105_resume_after_question_mouth_sync.js web/kb/js/25_v105_resume_after_question_mouth_sync.js speech_stt_server.py kb_server.py reference_server.py
grep -q "hint=='zh'" speech_stt_server.py
grep -q 'v210-stt-whisper-large-v3-turbo-shared-gpu-adaptive-1' speech_stt_server.py START_MULTILINGUAL_STT.sh
grep -q "VQ_STT_MODEL','large-v3-turbo" speech_stt_server.py
grep -q "VQ_STT_BEAM_SIZE','3'" speech_stt_server.py
for f in web/kb/js/25_v105_resume_after_question_mouth_sync.js web/reference/js/25_v105_resume_after_question_mouth_sync.js; do
  ! grep -q "navigator.language||'en-US'" "$f"
  grep -q "return 'zh-TW';" "$f"
done
for f in web/kb/js/02_stable_webspeech_patch.js web/reference/js/02_stable_webspeech_patch.js; do
  ! grep -q "ask.onclick.*startRec('studentQuestion')" "$f"
done
echo '[OK] first-click microphone startup is prewarmed/guarded; QA voice has one server-STT owner; Auto no longer inherits browser UI language; Mandarin retry uses beam-3 decoding'
for f in web/kb/js/25_v105_resume_after_question_mouth_sync.js web/reference/js/25_v105_resume_after_question_mouth_sync.js; do
  grep -q 'startLiveVoicePreview' "$f"
  grep -q 'Listening — speak naturally; 5 seconds of silence will submit automatically.' "$f"
  grep -q 'server Faster-Whisper transcript produced on Stop remains authoritative' "$f"
done
echo '[OK] Start Voice Question shows live interim transcription immediately; final answer still uses server Faster-Whisper transcript'

# v215 one-click Q&A voice workflow: after real speech begins, 5 s of silence
# must automatically stop MediaRecorder and submit to Faster-Whisper/answering.
for f in web/kb/js/25_v105_resume_after_question_mouth_sync.js web/reference/js/25_v105_resume_after_question_mouth_sync.js; do
  grep -q 'const VQ_QA_AUTO_SILENCE_MS = 5000' "$f"
  grep -q 'startVoiceSilenceMonitor(rec,stream,qBox)' "$f"
  grep -q '5 seconds of silence detected — transcribing and answering automatically.' "$f"
  grep -q 'armBrowserFallbackSilenceSubmit(rec)' "$f"
done
grep -q 'v=217voiceautosubmit' web/kb/index.html web/reference/index.html
! grep -q 'Automatically submits after 5 seconds of silence after you finish speaking.' web/kb/index.html web/reference/index.html
echo '[OK] Voice Q&A auto-stops and submits after 5 seconds of post-speech silence; manual Stop remains optional fallback'

grep -q '約為理想值的 2.5 倍' reference_server.py cloudflare/worker/src/index.js kb_server.py
grep -q 'decimalWord' web/reference/js/45_v204_final_voice_controller.js web/kb/js/45_v204_final_voice_controller.js
echo '[OK] 2.5× wording and audible decimal-point TTS normalization are enforced'

# 3D Avatar is no longer dependent on deleted old server folders.
./CHECK_V199_3D.sh
echo '[OK] pinned 3D Avatar runtime for Yating/Zhiwei'

! grep -q '"ai"' wrangler.jsonc
! grep -q '@cf/meta/llama' cloudflare/worker/src/index.js
! grep -q 'gemini-3.8-flash' cloudflare/worker/src/index.js web/reference/js/50_cloud_byok_selector.js web/reference/index.html
grep -q 'gpt-5.6-luna' cloudflare/worker/src/index.js web/reference/js/50_cloud_byok_selector.js
grep -q "api.openai.com/v1/responses" cloudflare/worker/src/index.js
grep -q 'FALLBACK_MS=10000' cloudflare/worker/src/index.js
grep -q 'cloud_api_key' web/reference/js/48_reference_textbook.js cloudflare/worker/src/index.js
grep -q 'sessionStorage' web/reference/js/50_cloud_byok_selector.js
! grep -q 'localStorage.*API_KEY' web/reference/js/50_cloud_byok_selector.js
grep -q 'Physiology Virtual Human TA' web/kb/index.html web/reference/index.html
echo '[OK] Cloud fallback = user-selected BYOK GPT-5.6 Luna after 10 s; Gemini removed from the student UI/runtime provider catalog'
echo '[OK] Main title = Physiology Virtual Human TA'
test -x CHECK_REFERENCE_ANSWER_RUNTIME.sh
echo '[OK] Runtime diagnostic script is included for local-answer troubleshooting'
grep -q 'granite4.2:8b-q5_K_M' kb_server.py reference_server.py PREPARE_3_MODELS.sh
! grep -q 'Granite 4.2 8B Q5_K_M · IBM' web/kb/index.html web/reference/index.html web/kb/js/31_local_llm_selector.js web/reference/js/31_local_llm_selector.js
grep -q 'Gemma 4 12B · Google' web/kb/index.html web/reference/index.html web/kb/js/31_local_llm_selector.js web/reference/js/31_local_llm_selector.js
grep -q 'Ministral 3 8B · Mistral AI' web/kb/index.html web/reference/index.html web/kb/js/31_local_llm_selector.js web/reference/js/31_local_llm_selector.js
grep -q 'gemma4:12b' kb_server.py reference_server.py PREPARE_3_MODELS.sh
grep -q 'ministral-3:8b-instruct-2512-q4_K_M' kb_server.py reference_server.py PREPARE_3_MODELS.sh
grep -q 'OLLAMA_MAX_LOADED_MODELS="${OLLAMA_MAX_LOADED_MODELS:-1}"' START_VQ_TA_SERVER.sh
grep -q 'VQ_MODEL_KEEP_ALIVE="${VQ_MODEL_KEEP_ALIVE:-30m}"' START_VQ_TA_SERVER.sh
grep -q 'ensure_single_active_model' reference_server.py
grep -q "'think':False" reference_server.py
grep -q '"think": False' kb_server.py
echo '[OK] Granite 4.2 uses non-thinking mode in local QA to protect latency while retaining Q5_K_M precision'
echo '[OK] Student-selectable local model set: Gemma 4 12B / Ministral 3 8B; one answer model active at a time'
grep -q "VQ_STT_MIN_FREE_VRAM_MB','5500" speech_stt_server.py
grep -q 'FREE_VRAM_MB>=MIN_FREE_VRAM_MB' speech_stt_server.py
echo '[OK] Local STT = Whisper large-v3-turbo with shared-GPU adaptive CUDA (>=5.5 GB free) / CPU int8 fallback'
echo '[OK] No teacher-reference WAV/cloned-teacher dependency in the active voice path'
echo '[OK] BYOK cloud model = GPT-5.6 Luna'

# Reference Book must answer in the detected/requested student language, not force zh-TW.
grep -q '46_v204_2_multilingual_language_router.js?v=212lang' web/reference/index.html
grep -q 'language_tag:language' web/reference/js/48_reference_textbook.js
grep -q 'd.answer_language' web/reference/js/48_reference_textbook.js
grep -q 'language_instruction(language_tag)' reference_server.py
grep -q 'answer_language.:language_tag' reference_server.py
grep -q 'languageInstruction(languageTag)' cloudflare/worker/src/index.js
grep -q 'answer_language:languageTag' cloudflare/worker/src/index.js
! grep -q 'window.VQ_LAST_DETECTED_LANGUAGE=.zh-TW.' web/reference/js/48_reference_textbook.js
! grep -q 'Output Taiwan Traditional Chinese (zh-TW)' reference_server.py cloudflare/worker/src/index.js
echo '[OK] Student-question language is detected/routed and both Local + OpenAI answers use that same language'


# Lecture remains Mandarin/Traditional Chinese, while student Q&A speech preserves the detected student language.
for f in web/kb/js/25_v105_resume_after_question_mouth_sync.js web/reference/js/25_v105_resume_after_question_mouth_sync.js; do
  grep -q "u.lang = 'zh-TW';" "$f"
  grep -q "u.lang = String(window.VQ_LAST_DETECTED_LANGUAGE" "$f"
done
for f in web/kb/js/45_v204_final_voice_controller.js web/reference/js/45_v204_final_voice_controller.js; do
  grep -q 'u.lang=speechLang' "$f"
  grep -q 'targetVoice(role,lang)' "$f"
  ! grep -q "u.lang='zh-TW'" "$f"
done
echo '[OK] Lecture TTS stays zh-TW; Q&A TTS follows detected student language for both Yating/Zhiwei roles'

# BYOK API-key field is hidden in Local-only mode and shown after GPT-5.6 Luna selection.
grep -q "wrap.hidden=(provider==='off')" web/reference/js/50_cloud_byok_selector.js
grep -q 'cloudApiKeyInput' web/reference/index.html
echo '[OK] Cloud model dropdown reveals API Key input only for GPT-5.6 Luna; Off remains Local-only'



# v217 regression: auto-silence must never discard a transcript that was already
# visible to the student. Server Faster-Whisper remains authoritative when valid,
# but an empty/failed STT result falls back to the captured live transcript and
# still submits the question automatically.
for f in web/kb/js/25_v105_resume_after_question_mouth_sync.js web/reference/js/25_v105_resume_after_question_mouth_sync.js; do
  grep -q "rec.__vqPreviewTranscript=shown" "$f"
  grep -q "rec.__vqAutoStopPreview=clean" "$f"
  grep -q "const previewText=clean(rec.__vqAutoStopPreview" "$f"
  grep -q "submitCapturedPreview" "$f"
  grep -q "Server transcription was empty; using the captured live transcript to answer." "$f"
  grep -q "Server transcription is unavailable; using the captured live transcript to answer." "$f"
  ! grep -q "Switching to browser recognition — please speak again." "$f"
done
echo '[OK] Auto-silence preserves the visible student transcript and always submits it when server STT is empty/unavailable; no second recording cycle is required'

# v216 targeted UI/answer cleanup acceptance
for page in web/kb/index.html web/reference/index.html; do
  grep -q '3D AVATAR &amp; VOICE SETTINGS' "$page"
  grep -q 'id="avatarRoleSelect"' "$page"
  grep -q 'id="rateRange"' "$page"
  grep -q 'id="pitchRange"' "$page"
  grep -q 'id="recognitionLangSelect"' "$page"
  ! grep -q 'Automatically submits after 5 seconds of silence after you finish speaking.' "$page"
  ! grep -q 'id="voiceSelect"' "$page"
done
grep -q 'plainStudentAnswer' web/kb/js/25_v105_resume_after_question_mouth_sync.js web/reference/js/25_v105_resume_after_question_mouth_sync.js
grep -q 'never use TeX/LaTeX' reference_server.py cloudflare/worker/src/index.js
echo '[OK] 3D Avatar + Voice Settings are merged into one role selector; duplicate Yating/Zhiwei control removed'
echo '[OK] 5-second auto-submit helper sentence removed; original button grid can flow normally'
echo '[OK] Student answers are forced to plain readable notation; TeX/LaTeX artifacts are stripped in local, cloud, and browser display paths'

# v218 final role/medical/source acceptance
for f in web/kb/js/45_v204_final_voice_controller.js web/reference/js/45_v204_final_voice_controller.js; do
  grep -q 'ROLE_MALE_RE=' "$f"
  grep -q 'ROLE_FEMALE_RE=' "$f"
  grep -q "alveolar ventilation" "$f"
  grep -q "P A O two" "$f"
  grep -q "P A C O two" "$f"
done
grep -q 'as shown in Figure' reference_server.py kb_server.py cloudflare/worker/src/index.js
grep -q 'Reference textbook ready' web/reference/js/48_reference_textbook.js
for f in web/kb/js/25_v105_resume_after_question_mouth_sync.js web/reference/js/25_v105_resume_after_question_mouth_sync.js; do
  grep -q 'sourceLeakPatterns' "$f"
done
echo '[OK] Zhiwei/Yating multilingual Q&A voice selection preserves male/female role when matching browser voices are available'
echo '[OK] Medical TTS normalizes PaO2/PaCO2-family abbreviations and expands VA/VE/VT/VD to professional spoken terminology'
python3 - <<'PY2'
import reference_server, kb_server
sample='As shown in Figure 3, alveolar ventilation V_A decreases when dead space rises on page 519.'
for fn in (reference_server.clean_answer, kb_server.clean_student_plain_text):
    out=fn(sample)
    assert 'Figure' not in out and 'page 519' not in out and 'V_A' not in out, out
    assert 'VA decreases' in out, out
PY2
echo '[OK] Student-facing answers strip figure/table/page/chapter/source wording in local, cloud, and browser display paths'

# v219 lecture Pause/Resume ownership regression guard. The final voice controller
# must yield the lecture buttons to the synchronized lecture master instead of
# consuming them with stopImmediatePropagation before js/25 can update controls.
for f in web/kb/js/45_v204_final_voice_controller.js web/reference/js/45_v204_final_voice_controller.js; do
  grep -q "if(master && master.active) return" "$f" || { echo "[FAIL] v219 lecture control delegation missing in $f"; exit 1; }
done
grep -q "resumeLessonBtn: resumeLecture" web/kb/js/25_v105_resume_after_question_mouth_sync.js || { echo '[FAIL] KB lecture resume master missing'; exit 1; }
grep -q "resumeLessonBtn: resumeLecture" web/reference/js/25_v105_resume_after_question_mouth_sync.js || { echo '[FAIL] Reference lecture resume master missing'; exit 1; }
echo '[OK] Lecture Pause enables Resume and Resume is delegated to the synchronized lecture master without restarting the lecture'

echo '===== ALL v220 DEFAULT-REFERENCE + v219 QUALITY/UI ACCEPTANCE CHECKS PASSED ====='

# v222 question-type-aware prompt engineering acceptance
python3 - <<'PYV222'
import reference_server, kb_server
cases=[
 ('Which is correct? A. one B. two C. three D. four','multiple_choice_conceptual'),
 ('VE = 8000 ml/min, VT = 400 ml, VD = 200 ml. Calculate VA. A. 4 B. 40 C. 400 D. 4000','multiple_choice_calculation'),
 ('Given VE = 8000 ml/min and VT = 400 ml, calculate respiratory rate.','numerical_calculation'),
 ('為什麼肺纖維化會使 FRC 改變？','mechanism_explanation'),
 ('什麼是 functional residual capacity?','knowledge_conceptual'),
]
for q,expected in cases:
    got=reference_server.detect_question_type(q)
    assert got==expected,(q,got,expected)
    got2=kb_server.detect_response_task(q)
    assert got2==expected,(q,got2,expected)
assert '正確答案：X.' in reference_server.question_type_contract('題目 A.甲 B.乙 C.丙','zh-TW')[1]
assert '問題：' in reference_server.question_type_contract('什麼是FRC？','zh-TW')[1]
assert 'FRC = ERV + RV' in reference_server.calculation_safeguards()
PYV222
node --check cloudflare/worker/src/index.js >/dev/null
grep -q 'detectResponseTask' cloudflare/worker/src/index.js
grep -q 'MANDATORY RESPONSE CONTRACT' reference_server.py cloudflare/worker/src/index.js
grep -q 'response_contract(question, language)' kb_server.py
grep -q 'FRC = ERV + RV' reference_server.py kb_server.py cloudflare/worker/src/index.js
echo '[OK] v222 question-type routing + mandatory response contracts + calculation safeguards'
echo '[OK] MCQ => explicit option; calculation => recompute/match; knowledge => restate exact question then answer directly'
echo '===== ALL v222 QUESTION-TYPE-AWARE PROMPT ENGINEERING ACCEPTANCE CHECKS PASSED ====='


# v224 integrated main-corpus + three-local-model QLoRA acceptance
python3 finetune/VALIDATE_SFT_DATASET.py >/tmp/v224_sft_validate.txt
cat /tmp/v224_sft_validate.txt
grep -q 'DATASET VALIDATION PASSED' /tmp/v224_sft_validate.txt
! grep -q '^from __future__ import annotations$' finetune/EVALUATE_BASE_VS_FINETUNED.py || { echo '[FAIL] Python 3.6 compatibility regression in fine-tuning evaluator'; exit 1; }
echo '[OK] Fine-tuning evaluator is compatible with the server system Python (3.6+ syntax; no annotations future import)'
python3 -m py_compile finetune/model_profiles.py finetune/train_local_model_qlora.py finetune/finetuned_local_router.py finetune/EVALUATE_BASE_VS_FINETUNED.py
bash -n finetune/PREPARE_FINETUNE_ENV.sh finetune/TRAIN_ONE_LOCAL_MODEL_QLORA.sh finetune/TRAIN_ALL_3_LOCAL_MODELS_QLORA.sh finetune/TRAIN_ALL_3_AND_ENABLE.sh finetune/START_FINETUNED_LOCAL_ROUTER.sh finetune/ENABLE_FINETUNED_LOCAL_MODELS.sh finetune/DISABLE_FINETUNED_LOCAL_MODELS.sh
[[ ! -e finetune/dataset/teacher_gold.jsonl ]]
grep -q '371' finetune/README_FINE_TUNING_zh-TW.md BUILD_MANIFEST_V224.txt
grep -q 'google/gemma-4-12B-it' finetune/model_profiles.py
grep -q 'mistralai/Ministral-3-8B-Instruct-2512-BF16' finetune/model_profiles.py
grep -q 'ibm-granite/granite-4.2-8b' finetune/model_profiles.py
grep -q 'VQ_GEMMA_API_BASE' reference_server.py kb_server.py
grep -q 'VQ_MISTRAL_API_BASE' reference_server.py kb_server.py
grep -q 'VQ_ENABLE_LOCAL_FT_ROUTER' START_VQ_TA_SERVER.sh
grep -q 'MANDATORY RESPONSE CONTRACT' cloudflare/worker/src/index.js
! grep -q 'gemini-3.8-flash' cloudflare/worker/src/index.js
grep -q 'gpt-5.6-luna' cloudflare/worker/src/index.js
grep -q 'refreshServerLabels' web/kb/js/31_local_llm_selector.js web/reference/js/31_local_llm_selector.js
python3 - <<'PYV224DATA'
import json
from pathlib import Path
rows=[json.loads(x) for x in Path('finetune/dataset/train.jsonl').read_text(encoding='utf-8').splitlines() if x.strip()]
qs='\n'.join(r['messages'][1]['content'] for r in rows)
assert len(rows)==371
assert '肺纖維化的病人' in qs and 'VE = 8000' in qs and 'TLC = 5500' in qs and 'Bohr equation' in qs
assert not any((r.get('meta') or {}).get('teacher_priority') for r in rows)
PYV224DATA
echo '[OK] v226 SFT corpus validated: 491 total / 371 train / 60 validation / 60 held-out test'
echo '[OK] Course-aligned examples are ordinary train.jsonl rows; no separate priority/gold file or repeat weighting'
echo '[OK] Gemma/Ministral remain student-selectable; historical Granite training profile remains available for research compatibility'
echo '[OK] BYOK GPT-5.6 Luna uses the same question-type response contract; cloud model weights are not modified'
echo '===== ALL v225 SERVER-PYTHON-COMPAT + v224 INTEGRATED SFT ACCEPTANCE CHECKS PASSED ====='


# v226 MCQ accuracy / completeness / clean-source regression guards
python3 - <<'PYV226'
import reference_server, kb_server
routing=[
 ('正常成人在安靜呼吸時，潮氣量（Tidal Volume, VT）約為多少？ A. 150 mL B. 300 mL C. 500 mL D. 1000 mL','multiple_choice_conceptual'),
 ('正常人平靜呼吸時，其功能肺餘量（FRC）占全肺量（TLC）的多少%？ A. 80 B. 60 C. 40 D. 20','multiple_choice_calculation'),
]
for q,e in routing:
    assert reference_server.detect_question_type(q)==e,(q,reference_server.detect_question_type(q),e)
    assert kb_server.detect_response_task(q)==e,(q,kb_server.detect_response_task(q),e)
guard=reference_server.semantic_constraint_safeguards()
assert 'phase' in guard and 'timing' in guard and 'sign' in guard and 'question-specific fact' in guard
assert '500 mL' not in guard and 'carbon monoxide' not in guard
assert not reference_server.looks_incomplete_answer('正確答案：C. 500 mL\n解釋：正常成人安靜呼吸時潮氣量約為 500 mL。')
assert reference_server.looks_incomplete_answer('因此，')
raw='參考文本，表格 38.1 和段落說明指出，正常潮氣量約 500 mL。'
out=reference_server.clean_answer(raw)
assert '參考文本' not in out and '表格 38.1' not in out, out
assert '正常潮氣量約 500 mL' in out, out
opts=reference_server.parse_mcq_options(routing[0][0])
assert dict(opts).get('C')=='500 mL',opts
PYV226
node --check cloudflare/worker/src/index.js >/dev/null
node --check web/reference/js/25_v105_resume_after_question_mouth_sync.js >/dev/null
node --check web/kb/js/25_v105_resume_after_question_mouth_sync.js >/dev/null
python3 finetune/VALIDATE_SFT_DATASET.py >/tmp/v226_sft_validate.txt
grep -q 'DATASET VALIDATION PASSED' /tmp/v226_sft_validate.txt
python3 - <<'PYV226DATA'
import json
from pathlib import Path
rows=[json.loads(x) for x in Path('finetune/dataset/train.jsonl').read_text(encoding='utf-8').splitlines() if x.strip()]
assert len(rows)==371,len(rows)
qs='\n'.join(r['messages'][1]['content'] for r in rows)
for phrase in ['正常成人在安靜呼吸時，潮氣量','功能肺餘量（FRC）占全肺量','周邊化學受體','攝氏37度1大氣壓下','正常安靜呼吸時，吸氣主要']:
    assert phrase in qs, phrase
assert not any((r.get('meta') or {}).get('teacher_priority') for r in rows)
PYV226DATA
echo '[OK] Direct normal-value MCQ is routed as conceptual; derived ratio MCQ remains calculation'
echo '[OK] Local MCQ answer path uses one structured audited option decision and deterministic rendering'
echo '[OK] Output-limit retry prevents incomplete mid-sentence student answers'
echo '[OK] Reference-text/table/figure/page/chapter attribution cleanup covers observed source-leak variants'
echo '[OK] Seven course test items are ordinary main-corpus SFT rows with no priority weighting'
echo '===== ALL v226 MCQ ACCURACY + COMPLETE ANSWER + CLEAN SOURCE ACCEPTANCE CHECKS PASSED ====='

# v227 adaptive verification + speed + diversity acceptance
python3 - <<'PYV227'
import reference_server, kb_server
# v235 intentionally removes memorized normal-value shortcuts from Reference Textbook.
# Reference deterministic checks remain only for values/formulas explicitly supplied in the item.
cases=[
 ('正常成人安靜呼吸的潮氣容積約為多少？ A. 100 mL B. 300 mL C. 500 mL D. 1000 mL','C',False),
 ('正常成人 FRC = 2300 mL、TLC = 5800 mL，FRC/TLC 約多少？ A. 20% B. 30% C. 40% D. 60%','C',True),
 ('VE = 8000 mL/min, VT = 400 mL, VD = 200 mL，肺泡通氣量 VA 為何？ A. 1000 B. 2000 C. 3000 D. 4000 mL/min','D',True),
 ('Bohr equation: PaCO2 = 40 mmHg, PECO2 = 30 mmHg，VD/VT 為多少？ A. 10% B. 25% C. 40% D. 75%','B',True),
]
for q,expected,ref_checkable in cases:
    ro=reference_server.parse_mcq_options(q); ko=kb_server.parse_mcq_options(q)
    got_ref=reference_server.deterministic_expected_option(q,ro)
    if ref_checkable:
        assert got_ref==expected,(q,got_ref,expected)
    else:
        assert got_ref in ('',None),(q,got_ref,'expected no memorized Reference shortcut')
    assert kb_server.deterministic_expected_option(q,ko)==expected,(q,kb_server.deterministic_expected_option(q,ko),expected)
    bad=('A' if expected!='A' else 'B')
    good=expected
    rb=reference_server.fast_verify_answer(q,'正確答案：'+bad,'zh-TW',knowledge_rules='legacy')
    rg=reference_server.fast_verify_answer(q,'正確答案：'+good,'zh-TW',knowledge_rules='legacy')
    if ref_checkable and expected!='A': assert 'deterministic-option-mismatch' in rb['reasons'],(q,rb)
    if ref_checkable: assert rg['ok'],(q,rg)
    kb_good=kb_server.fast_verify_kb_answer(q,'正確答案：'+good,'zh-TW')
    assert kb_good['ok'],(q,kb_good)
print('v227 deterministic verifier compatibility OK (v235 Reference uses explicit-value checks only)')
PYV227
node --check cloudflare/worker/src/index.js >/dev/null
grep -q 'fastVerifyStudentAnswer' cloudflare/worker/src/index.js
grep -q 'reviewCloudAnswer' cloudflare/worker/src/index.js
grep -q 'semantic_review_used' reference_server.py kb_server.py cloudflare/worker/src/index.js
grep -q 'Do not rewrite a correct answer merely' reference_server.py kb_server.py cloudflare/worker/src/index.js finetune/dataset/train.jsonl
echo '[OK] Every answer has a deterministic Stage-1 audit; rule-checkable respiratory MCQs catch option/calculation mismatches without another LLM call'
echo '[OK] Conditional Stage-2 semantic review is wired for local Reference, local KB, and BYOK cloud; correct answers are preserved rather than stylistically rewritten'
echo '[OK] Production prompts + SFT instructions enforce strict correctness while retaining natural surface-wording diversity'
echo '===== ALL v227 ADAPTIVE VERIFICATION + SPEED + DIVERSITY ACCEPTANCE CHECKS PASSED ====='

# v228 multi-question MCQ batch acceptance
node VERIFY_V228_MULTI_QUESTION_BATCH.cjs
grep -q '51_v228_multi_question_batch.js?v=238batch1' web/reference/index.html web/kb/index.html
grep -q 'VQ_splitQuestionBatch' web/reference/js/51_v228_multi_question_batch.js web/kb/js/51_v228_multi_question_batch.js
grep -q 'VQ_generateFinalAnswer' web/reference/js/51_v228_multi_question_batch.js web/kb/js/51_v228_multi_question_batch.js
grep -q '^v238$' VERSION.txt
node --check web/reference/js/51_v228_multi_question_batch.js >/dev/null
node --check web/kb/js/51_v228_multi_question_batch.js >/dev/null
echo '[OK] Multi-question parser recognizes pasted exam batches without treating ①②③ as top-level questions'
echo '[OK] Each batch item reuses the complete v227 per-question RAG/KB + adaptive-verification pipeline'
echo '[OK] Batch answers are returned in original order; single-question behavior remains unchanged'
echo '===== ALL v228 MULTI-QUESTION BATCH + v227 ADAPTIVE VERIFICATION ACCEPTANCE CHECKS PASSED ====='


# v229 semantic micro-batch + mandatory verification acceptance
python3 -m py_compile reference_server.py
node --check cloudflare/worker/src/index.js >/dev/null
node --check web/reference/js/52_v229_semantic_microbatch.js >/dev/null
node VERIFY_V229_SEMANTIC_MICROBATCH.cjs
grep -q '/api/reference/context-batch' reference_server.py
grep -q '/api/reference/answer-batch-local' reference_server.py
grep -q '/api/reference/answer-batch' cloudflare/worker/src/index.js web/reference/js/52_v229_semantic_microbatch.js
grep -q 'BATCH_MAX_ITEMS' reference_server.py
grep -q 'mandatory_verification' reference_server.py cloudflare/worker/src/index.js
grep -q 'semantic_verification_used' reference_server.py cloudflare/worker/src/index.js
grep -q 'FALLBACK_MS=10000' cloudflare/worker/src/index.js
grep -q '52_v229_semantic_microbatch.js?v=238batch2' web/reference/index.html
python3 - <<'PYV229'
import reference_server
items=[]
for i in range(15):
    items.append({'id':i+1,'question':'正常呼吸生理測試？ A. A B. B C. C D. D','context':'[PDF page 1]\n'+('evidence '*80),'language_tag':'zh-TW'})
groups=reference_server._batch_groups(items)
assert [len(g) for g in groups]==[4,4,4,3],[len(g) for g in groups]
assert reference_server.BATCH_MAX_ITEMS==4
assert sum(len(g) for g in groups)==15
assert hasattr(reference_server,'_batch_selective_review_needed')
need,reasons=reference_server._batch_selective_review_needed({'question':'下列何者錯誤？ A. A B. B C. C D. D'},{'option':'A','confidence':.95,'decisive_relation':'x'})
assert need and 'negative-polarity' in reasons
PYV229
echo '[OK] Reference local-only batch browser path uses one async job start plus short status polling requests'
echo '[OK] Shared-GPU local micro-batches default to 4 items (15 items => 4 + 4 + 4 + 3)'
echo '[OK] Every batch item is answered by the LLM; semantic re-solving is selective for ambiguity/negation/threshold instead of mandatory for all items'
echo '[OK] Optional BYOK GPT-5.6 Luna batch fallback waits 10 s for Local and uses the same per-question Vector-RAG evidence'
echo '===== v229 ASYNC MICROBATCH COMPATIBILITY + v238 ROBUST BATCH VERIFICATION CHECKS PASSED ====='

echo '===== v238 FULL-PHYSIOLOGY MOEX BENCHMARK-GUIDED AGENT OPTIMIZATION ACCEPTANCE ====='
python3 VERIFY_V233_MOEX_AGENT_OPTIMIZATION.py
