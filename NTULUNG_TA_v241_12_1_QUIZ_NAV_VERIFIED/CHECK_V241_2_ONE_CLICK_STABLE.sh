#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
BASE="${VQ_BASE:-/path/to/workdir}"
cd "$ROOT"
mkdir -p web/kb/assets
cp -a web/reference/assets/. web/kb/assets/

echo '============================================================'
echo ' v241.12.5 ONE-CLICK SERVER-STABLE FULL PREFLIGHT'
echo '============================================================'

# Node bootstrap for the production server layout.
if ! command -v node >/dev/null 2>&1; then
  for d in "$BASE/node-v22/bin" "$HOME/node-v22/bin"; do
    if [[ -x "$d/node" ]]; then export PATH="$d:$PATH"; break; fi
  done
fi
command -v node >/dev/null 2>&1 || { echo '[ERROR] Node.js not found.' >&2; exit 127; }
echo "[OK] Node.js: $(command -v node) ($(node --version))"

# Python / PyMuPDF import and compatibility.
"${PYTHON_BIN:-python3}" - <<'PY'
import fitz
import course_runtime
assert hasattr(fitz.Document,'get_toc')
assert hasattr(fitz.Document,'page_count')
assert hasattr(fitz.Page,'get_text')
print('[OK] PyMuPDF + course_runtime compatibility')
PY

# Python syntax for all production Python files and current-bundle verifier.
"${PYTHON_BIN:-python3}" -m py_compile gateway.py reference_server.py reference_search.py scope_guard.py course_runtime.py exam_questions.py site_metrics.py kb_server.py feedback/feedback_service.py feedback/MIGRATE_FEEDBACK_HISTORY.py feedback/TEST_RESEND_EMAIL.py feedback/RETRY_FEEDBACK_EMAIL.py VERIFY_V241_2_RUNTIME_COMPAT.py VERIFY_V241_6_COURSE_FLOW.py VERIFY_V241_12_FEEDBACK_MAIL.py VERIFY_V241_12_1_QUIZ_QUALITY.py VERIFY_V241_12_1_INSTALL_MIGRATION.py VERIFY_V241_12_2_17_UNIT_FAST_START.py
"${PYTHON_BIN:-python3}" VERIFY_V241_12_1_INSTALL_MIGRATION.py

# Active browser/Worker JavaScript syntax.
for f in \
  web/reference/js/25_v105_resume_after_question_mouth_sync.js \
  web/reference/js/45_v204_final_voice_controller.js \
  web/reference/js/53_local_answer_feedback.js \
  web/reference/js/55_v241_course_adaptive_ta.js \
  web/reference/js/50_cloud_byok_selector.js \
  web/reference/js/51_v228_multi_question_batch.js \
  web/reference/js/52_v229_semantic_microbatch.js \
  web/kb/js/25_v105_resume_after_question_mouth_sync.js \
  web/kb/js/45_v204_final_voice_controller.js \
  web/kb/js/53_local_answer_feedback.js \
  web/kb/js/55_v241_course_adaptive_ta.js \
  cloudflare/worker/src/index.js; do
  node --check "$f" >/dev/null
done
echo '[OK] Production JavaScript syntax'
node VERIFY_V241_12_4_BATCH.cjs
node VERIFY_V241_12_5_VOICE.cjs
"${PYTHON_BIN:-python3}" VERIFY_V241_12_4_BATCH.py
node VERIFY_V241_7_LECTURE_ROUTE.cjs
node VERIFY_V241_9_UI.cjs
node VERIFY_V241_10_UI.cjs
node VERIFY_V241_11_UI.cjs
node VERIFY_V241_11_DIRECT_CLOUD.cjs
node VERIFY_V241_12_FEEDBACK_UI.cjs
node VERIFY_V241_12_CORRECTION_MEMORY.cjs
node VERIFY_V241_12_1_QUIZ_NAV.cjs
"${PYTHON_BIN:-python3}" VERIFY_V241_12_FEEDBACK_MAIL.py
"${PYTHON_BIN:-python3}" VERIFY_V241_12_1_QUIZ_QUALITY.py
"${PYTHON_BIN:-python3}" VERIFY_V241_12_2_17_UNIT_FAST_START.py

# Shell syntax for the exact one-click/deployment path.
bash -n INSTALL_FINAL.sh INSTALL_V241_2_ONE_CLICK_STABLE.sh feedback/CONFIGURE_FEEDBACK_RESEND.sh feedback/RETRY_FEEDBACK_EMAIL.sh START_VQ_TA_SERVER.sh START_PRIVATE_OLLAMA.sh START_REFERENCE_EMBEDDING_OLLAMA.sh PREPARE_REFERENCE_VECTOR_RAG.sh START_CLOUDFLARE_TUNNEL.sh DEPLOY_CLOUDFLARE_WORKERS_DEV.sh
echo '[OK] One-click shell syntax'

./CHECK_V241_COURSE_ADAPTIVE.sh
"${PYTHON_BIN:-python3}" VERIFY_V241_2_RUNTIME_COMPAT.py

# Real local smoke test: two PDF files are appended into ONE stage/course definition.
# Uses whichever page/text API is available on old or new PyMuPDF.
"${PYTHON_BIN:-python3}" - <<'PY'
from __future__ import print_function
import shutil, tempfile, uuid
from pathlib import Path
import fitz
import course_runtime

def make_pdf(label):
    d=fitz.open()
    p=d.new_page() if hasattr(d,'new_page') else d.newPage()
    sample=label+' course material covering key concepts and examples used for a complete university lecture chapter.'
    if hasattr(p,'insert_text'): p.insert_text((72,72), sample)
    else: p.insertText((72,72), sample)
    fn=Path(tempfile.gettempdir())/('v2412_%s_%s.pdf'%(label,uuid.uuid4().hex[:8]))
    d.save(str(fn)); d.close()
    b=fn.read_bytes(); fn.unlink()
    return b

stage='smoke-'+uuid.uuid4().hex[:10]
try:
    m1=course_runtime.COURSES.inspect([('Book_A.pdf',make_pdf('Book A'))],course_name='Smoke Course',stage_id=stage)
    m2=course_runtime.COURSES.inspect([('Book_B.pdf',make_pdf('Book B'))],course_name='Smoke Course',stage_id=stage)
    assert m1['stage_id']==m2['stage_id']==stage
    assert len(m2['sources'])==2, m2
    assert len(m2['units'])==2, m2
    print('[OK] Real multi-PDF staging smoke test: 2 PDFs -> 1 staging course -> 2 source units')
finally:
    shutil.rmtree(str(course_runtime.STAGING_ROOT/stage),ignore_errors=True)
PY

# The integration below exercises an actual async quiz job and validates the
# generated Chinese scenarios rather than merely counting stored seed rows.
"${PYTHON_BIN:-python3}" VERIFY_V241_6_COURSE_FLOW.py
echo '============================================================'
echo ' v241.12.5 FULL PREFLIGHT PASSED'
echo '============================================================'
