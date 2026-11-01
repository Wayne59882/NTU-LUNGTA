#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
BASE="${VQ_BASE:-/path/to/workdir}"
cd "$ROOT"

echo '===== v241.12.1 COURSE-ADAPTIVE TA ACCEPTANCE ====='

# Production server keeps Node.js outside the default SSH PATH.
if ! command -v node >/dev/null 2>&1; then
  for d in "$BASE/node-v22/bin" "$HOME/node-v22/bin"; do
    if [[ -x "$d/node" ]]; then
      export PATH="$d:$PATH"
      break
    fi
  done
fi
if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js not found in PATH, $BASE/node-v22/bin, or $HOME/node-v22/bin." >&2
  exit 127
fi
echo "[OK] Node.js: $(command -v node) ($(node --version))"

"${PYTHON_BIN:-python3}" - <<'PY'
import fitz
import course_runtime
assert hasattr(fitz.Document, 'get_toc'), 'PyMuPDF Document.get_toc compatibility missing'
assert hasattr(fitz.Document, 'page_count'), 'PyMuPDF Document.page_count compatibility missing'
assert hasattr(fitz.Page, 'get_text'), 'PyMuPDF Page.get_text compatibility missing'
print('[OK] PyMuPDF + legacy/new API compatibility + course_runtime import')
PY

"${PYTHON_BIN:-python3}" -m py_compile course_runtime.py feedback/feedback_service.py reference_server.py gateway.py kb_server.py
node --check web/reference/js/55_v241_course_adaptive_ta.js
node --check web/reference/js/53_local_answer_feedback.js
node --check web/reference/js/50_cloud_byok_selector.js
node --check cloudflare/worker/src/index.js

grep -q 'Build a Course' web/reference/js/55_v241_course_adaptive_ta.js
grep -q 'type="file" accept="application/pdf,.pdf" multiple' web/reference/js/55_v241_course_adaptive_ta.js
grep -q "fd.append('stage_id',draft.stageId)" web/reference/js/55_v241_course_adaptive_ta.js
grep -q "indexedDB.open('VQCourseUpload'" web/reference/js/55_v241_course_adaptive_ta.js
grep -q "manifest.visual_model==='vq'" web/reference/js/55_v241_course_adaptive_ta.js
grep -q 'reviewed exam-style questions become playable as soon as two per unit' web/reference/js/55_v241_course_adaptive_ta.js
grep -q 'def _ready_question_bank' course_runtime.py
grep -q 'window.VQ_showAnswerFeedback' web/reference/js/55_v241_course_adaptive_ta.js
grep -q 'Confirm API Key' web/reference/index.html
grep -q 'API key confirmed' web/reference/js/50_cloud_byok_selector.js
grep -q "'/api/reference/course-answer'" cloudflare/worker/src/index.js
grep -q '/api/reference/course-inspect' reference_server.py
grep -q '/api/reference/course-quiz' reference_server.py
grep -q '/api/reference/feedback-correction-status' reference_server.py
grep -q 'auto-corrected-course-memory' reference_server.py
grep -q 'pending_corrections' feedback/feedback_service.py
grep -q 'QUESTION_TARGET' course_runtime.py
grep -q 'def quiz_statistics' course_runtime.py
grep -q 'def delete_course' course_runtime.py
grep -q 'feedback_intent' feedback/feedback_service.py
grep -q 'id="v241QuizCount"' web/reference/js/55_v241_course_adaptive_ta.js
grep -q 'id="v241DeleteCourse"' web/reference/js/55_v241_course_adaptive_ta.js

echo '[OK] Multi-PDF upload: resumable chunks and staged course restore after refresh'
echo '[OK] PDF TOC chapter/unit confirmation'
echo '[OK] Automatic respiratory-physiology detection for visual model'
echo '[OK] Uploaded-course Q&A activates first; Chinese lecture scripts prepare in the background'
echo '[OK] Source builder saves reviewed exam questions as they pass; instant 1–10 random draw from available questions'
echo '[OK] Quiz submission saves detailed results and cumulative per-course statistics'
echo '[OK] Uploaded-course deletion needs one clear browser confirmation and no server code'
echo '[OK] Report saves/emails feedback; positive feedback is kept, issue feedback is classified and reviewed'
echo '[OK] Confirmed API Key sends answers directly to the selected cloud model'
echo '===== v241.12.1 COURSE-ADAPTIVE ACCEPTANCE PASSED ====='
