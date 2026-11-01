#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
BASE="${VQ_BASE:-/path/to/workdir}"
cd "$ROOT"
# The release ZIP carries one canonical copy of the identical avatar/voice
# assets. Recreate the KB copy locally before checks and Worker deployment.
mkdir -p web/kb/assets
cp -a web/reference/assets/. web/kb/assets/
PYTHON_BIN="$(command -v "${PYTHON_BIN:-python3}")" || { echo '[ERROR] Serving Python was not found.' >&2; exit 127; }
export PYTHON_BIN
echo "[INFO] Serving Python: $PYTHON_BIN"

echo '============================================================'
echo ' v241.12.5 ONE-CLICK COURSE-ADAPTIVE VIRTUAL HUMAN TA'
echo ' Server-stable deployment (no legacy version-locked chain)'
echo '============================================================'

# ---------- 1. Bootstrap Node ----------
if ! command -v node >/dev/null 2>&1; then
  for d in "$BASE/node-v22/bin" "$HOME/node-v22/bin"; do
    if [[ -x "$d/node" ]]; then export PATH="$d:$PATH"; break; fi
  done
fi
if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js not found in PATH, $BASE/node-v22/bin, or $HOME/node-v22/bin." >&2
  echo '[ERROR] Running service was not touched.' >&2
  exit 127
fi
echo "[OK] Node.js: $(command -v node) ($(node --version))"

# ---------- 2. Ensure PyMuPDF compatible with the production Python ----------
if ! "${PYTHON_BIN:-python3}" -c 'import fitz' >/dev/null 2>&1; then
  PY_MM="$("${PYTHON_BIN:-python3}" - <<'PY'
import sys
print('%d.%d' % sys.version_info[:2])
PY
)"
  echo "[INFO] PyMuPDF missing; Python is $PY_MM. Installing a binary wheel only."
  if "${PYTHON_BIN:-python3}" - <<'PY' >/dev/null 2>&1
import sys
raise SystemExit(0 if sys.version_info[:2] <= (3,6) else 1)
PY
  then
    "${PYTHON_BIN:-python3}" -m pip install --user --only-binary=:all: 'PyMuPDF==1.16.6'
  else
    "${PYTHON_BIN:-python3}" -m pip install --user --only-binary=:all: 'PyMuPDF<2'
  fi
fi
"${PYTHON_BIN:-python3}" - <<'PY'
import fitz, course_runtime
assert hasattr(fitz.Document,'get_toc')
assert hasattr(fitz.Document,'page_count')
assert hasattr(fitz.Page,'get_text')
print('[OK] PyMuPDF:', (fitz.__doc__ or '').splitlines()[1] if len((fitz.__doc__ or '').splitlines())>1 else 'imported')
PY

# ---------- 3. Recover persistent data without rebuilding it ----------
mkdir -p reference_corpus analytics feedback benchmark/state course_workspaces
recover_one(){
  local rel="$1"; shift
  if [[ -s "$ROOT/$rel" ]]; then return 0; fi
  local src
  for src in "$@"; do
    if [[ -s "$src" ]]; then
      mkdir -p "$(dirname "$ROOT/$rel")"
      cp -f "$src" "$ROOT/$rel"
      echo "[OK] Recovered persistent file: $rel"
      return 0
    fi
  done
  return 0
}

recover_one reference_corpus/vector_index.sqlite3 \
  "$BASE/v241_keep/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_12_FEEDBACK_RECEIPTS_EMAIL_REPAIR/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_10_QUIZ_REPORT_COURSE_MANAGEMENT/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_4_COURSE_FLOW_FIXED/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_2_ONE_CLICK_SERVER_STABLE_FINAL/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_1_ONE_CLICK_STABLE_FINAL/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_COURSE_ADAPTIVE_FINAL/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v240_1_NODE_PATH_DEPLOYMENT_FIXED_STABLE_FINAL/reference_corpus/vector_index.sqlite3" \
  "$BASE/NTULUNG_TA_v206_7/reference_corpus/vector_index.sqlite3"
recover_one reference_corpus/window_index.sqlite3 \
  "$BASE/v241_keep/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_12_FEEDBACK_RECEIPTS_EMAIL_REPAIR/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_10_QUIZ_REPORT_COURSE_MANAGEMENT/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_4_COURSE_FLOW_FIXED/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_2_ONE_CLICK_SERVER_STABLE_FINAL/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_1_ONE_CLICK_STABLE_FINAL/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v241_COURSE_ADAPTIVE_FINAL/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v240_1_NODE_PATH_DEPLOYMENT_FIXED_STABLE_FINAL/reference_corpus/window_index.sqlite3" \
  "$BASE/NTULUNG_TA_v206_7/reference_corpus/window_index.sqlite3"
recover_one analytics/site_metrics.sqlite3 \
  "$BASE/NTULUNG_TA_v241_12_FEEDBACK_RECEIPTS_EMAIL_REPAIR/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_10_QUIZ_REPORT_COURSE_MANAGEMENT/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_4_COURSE_FLOW_FIXED/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_2_ONE_CLICK_SERVER_STABLE_FINAL/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_1_ONE_CLICK_STABLE_FINAL/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v241_COURSE_ADAPTIVE_FINAL/analytics/site_metrics.sqlite3" \
  "$BASE/NTULUNG_TA_v240_1_NODE_PATH_DEPLOYMENT_FIXED_STABLE_FINAL/analytics/site_metrics.sqlite3"
recover_one feedback/feedback.env \
  "$BASE/NTULUNG_TA_v241_12_FEEDBACK_RECEIPTS_EMAIL_REPAIR/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_11_INSTANT_QUIZ_DIRECT_CLOUD/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_10_QUIZ_REPORT_COURSE_MANAGEMENT/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_4_COURSE_FLOW_FIXED/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_2_ONE_CLICK_SERVER_STABLE_FINAL/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_1_ONE_CLICK_STABLE_FINAL/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v241_COURSE_ADAPTIVE_FINAL/feedback/feedback.env" \
  "$BASE/NTULUNG_TA_v240_1_NODE_PATH_DEPLOYMENT_FIXED_STABLE_FINAL/feedback/feedback.env"
# A recent release can contain only a recipient address. Prefer an older
# working provider configuration over that incomplete file, without copying a
# secret into the release ZIP or printing it to the installer log.
feedback_provider_in(){
  local file="$1"
  [[ -s "$file" ]] || return 1
  (
    unset VQ_RESEND_API_KEY VQ_SMTP_HOST VQ_EMAIL_PROVIDER VQ_FEEDBACK_TO_EMAIL VQ_FEEDBACK_EXPECTED_TO_EMAIL
    set +u
    # shellcheck disable=SC1090
    source "$file" >/dev/null 2>&1 || exit 1
    [[ -n "${VQ_FEEDBACK_TO_EMAIL:-}" && ( -n "${VQ_RESEND_API_KEY:-}" || -n "${VQ_SMTP_HOST:-}" ) ]]
  )
}
if ! feedback_provider_in "$ROOT/feedback/feedback.env"; then
  for candidate in \
    "$BASE/NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/feedback/feedback.env" \
    "$BASE/NTULUNG_TA_v241_12_FEEDBACK_RECEIPTS_EMAIL_REPAIR/feedback/feedback.env" \
    "$BASE"/NTULUNG_TA_v24*/feedback/feedback.env \
    "$BASE"/NTULUNG_TA_v239*/feedback/feedback.env; do
    if [[ -f "$candidate" && ! "$candidate" -ef "$ROOT/feedback/feedback.env" ]] && feedback_provider_in "$candidate"; then
      cp -f "$candidate" "$ROOT/feedback/feedback.env"
      chmod 600 "$ROOT/feedback/feedback.env"
      echo '[OK] Restored feedback mail settings with provider credentials from an earlier installation.'
      break
    fi
  done
fi
recover_one benchmark/state/final_profile.env \
  "$BASE/NTULUNG_TA_v241_12_FEEDBACK_RECEIPTS_EMAIL_REPAIR/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_10_QUIZ_REPORT_COURSE_MANAGEMENT/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_4_COURSE_FLOW_FIXED/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_2_ONE_CLICK_SERVER_STABLE_FINAL/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_1_ONE_CLICK_STABLE_FINAL/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v241_COURSE_ADAPTIVE_FINAL/benchmark/state/final_profile.env" \
  "$BASE/NTULUNG_TA_v240_1_NODE_PATH_DEPLOYMENT_FIXED_STABLE_FINAL/benchmark/state/final_profile.env"

# ---------- 4. Full current-build preflight BEFORE touching running service ----------
./CHECK_V241_2_ONE_CLICK_STABLE.sh

if [[ "${VQ_PREFLIGHT_ONLY:-0}" == "1" ]]; then
  echo '[OK] VQ_PREFLIGHT_ONLY=1: code preflight passed; live mail acceptance and deployment were not started.'
  exit 0
fi

# Email is a required part of this deployment. Verify an actual provider
# acceptance while the previous server is still running, before stopping it.
if ! feedback_provider_in "$ROOT/feedback/feedback.env"; then
  echo '[ERROR] Report email cannot be sent: no Resend API key or SMTP provider configuration was recovered.' >&2
  echo '[ACTION] Run ./feedback/CONFIGURE_FEEDBACK_RESEND.sh in this release directory, then rerun ./INSTALL_FINAL.sh. The running service was not stopped.' >&2
  exit 41
fi
echo '[INFO] Checking real feedback email delivery before changing the running service.'
if ! (
  set +u
  # shellcheck disable=SC1091
  source feedback/feedback.env
  "$PYTHON_BIN" feedback/TEST_RESEND_EMAIL.py
); then
  echo '[ERROR] The mail service rejected the test email. Check the Resend sender/recipient and credentials. The running service was not stopped.' >&2
  exit 42
fi
MAIL_RECIPIENT="$( (set +u; source feedback/feedback.env; printf '%s' "${VQ_FEEDBACK_TO_EMAIL:-}") )"
echo "[OK] Feedback test email accepted for $MAIL_RECIPIENT before deployment."
if [[ "${VQ_MAIL_PREFLIGHT_ONLY:-0}" == "1" ]]; then
  echo '[OK] Mail preflight passed; deployment was not started.'
  exit 0
fi

# ---------- 5. Stop only this user's serving processes ----------
echo '===== STOP CURRENT WAYNE6 SERVING PROCESSES ====='
pkill -u "$USER" -f '[g]ateway.py.*8179' 2>/dev/null || true
pkill -u "$USER" -f '[k]b_server.py.*8181' 2>/dev/null || true
pkill -u "$USER" -f '[r]eference_server.py.*8182' 2>/dev/null || true
sleep 2

# Copy the SQLite feedback history only after the previous writers have stopped.
# The schema is upgraded in place when the new service first opens it.
recover_one feedback/feedback.sqlite3 \
  "$BASE/NTULUNG_TA_v241_12_FEEDBACK_RECEIPTS_EMAIL_REPAIR/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_11_INSTANT_QUIZ_DIRECT_CLOUD/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_10_QUIZ_REPORT_COURSE_MANAGEMENT/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_5_COURSE_EMBED_RECOVERY/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_4_COURSE_FLOW_FIXED/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_2_ONE_CLICK_SERVER_STABLE_FINAL/feedback/feedback.sqlite3"

# An older feedback.env may point to an earlier release's absolute DB path.
# Merge both the copied release DB and the DB that the old server actually used.
LEGACY_FEEDBACK_DB=''
if [[ -f feedback/feedback.env ]]; then
  LEGACY_FEEDBACK_DB="$( (set +u; source feedback/feedback.env; printf '%s' "${VQ_FEEDBACK_DB:-}") 2>/dev/null || true)"
fi
"$PYTHON_BIN" feedback/MIGRATE_FEEDBACK_HISTORY.py \
  "$BASE/NTULUNG_TA_v241_12_FEEDBACK_RECEIPTS_EMAIL_REPAIR/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_11_INSTANT_QUIZ_DIRECT_CLOUD/feedback/feedback.sqlite3" \
  "$BASE/NTULUNG_TA_v241_10_QUIZ_REPORT_COURSE_MANAGEMENT/feedback/feedback.sqlite3" \
  "$LEGACY_FEEDBACK_DB"

# Preserve active upload chunks, build jobs, and completed courses after the old
# serving processes stop. This also allows upgrades during a long build.
if ! find course_workspaces -mindepth 1 -maxdepth 1 ! -name '_staging' ! -name '.gitkeep' -print -quit | grep -q .; then
  for old in "$BASE/NTULUNG_TA_v241_12_FEEDBACK_RECEIPTS_EMAIL_REPAIR/course_workspaces" "$BASE/NTULUNG_TA_v241_11_INSTANT_QUIZ_DIRECT_CLOUD/course_workspaces" "$BASE/NTULUNG_TA_v241_10_QUIZ_REPORT_COURSE_MANAGEMENT/course_workspaces" "$BASE/NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE/course_workspaces" "$BASE/NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION/course_workspaces" "$BASE/NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST/course_workspaces" "$BASE/NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE/course_workspaces" "$BASE/NTULUNG_TA_v241_5_COURSE_EMBED_RECOVERY/course_workspaces" "$BASE/NTULUNG_TA_v241_4_COURSE_FLOW_FIXED/course_workspaces" "$BASE/NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED/course_workspaces" "$BASE/NTULUNG_TA_v241_2_ONE_CLICK_SERVER_STABLE_FINAL/course_workspaces" "$BASE/NTULUNG_TA_v241_1_ONE_CLICK_STABLE_FINAL/course_workspaces" "$BASE/NTULUNG_TA_v241_COURSE_ADAPTIVE_FINAL/course_workspaces"; do
    if [[ -d "$old" && "$old" != "$ROOT/course_workspaces" ]]; then
      find "$old" -mindepth 1 -maxdepth 1 ! -name '.gitkeep' -print0 2>/dev/null | while IFS= read -r -d '' p; do cp -a "$p" course_workspaces/; done
      if find course_workspaces -mindepth 1 -maxdepth 1 ! -name '_staging' ! -name '.gitkeep' -print -quit | grep -q .; then
        echo '[OK] Recovered uploaded courses, in-flight uploads and build jobs.'
        break
      fi
    fi
  done
fi

# ---------- 6. Start current v241.12.5 stack ----------
echo '===== START v241.12.5 SERVER STACK ====='
mkdir -p logs
nohup ./START_VQ_TA_SERVER.sh > "$BASE/v241_12_1_quiz_nav_server.log" 2>&1 &
START_PID=$!
echo "$START_PID" > "$BASE/v241_12_1_quiz_nav_server.pid"

for i in $(seq 1 180); do
  if curl -fsS http://127.0.0.1:8179/api/health >/dev/null 2>&1; then break; fi
  if ! kill -0 "$START_PID" 2>/dev/null; then
    echo '[ERROR] Server startup exited. Last startup log lines:' >&2
    tail -n 80 "$BASE/v241_12_1_quiz_nav_server.log" >&2 || true
    exit 31
  fi
  if (( i % 10 == 0 )); then
    echo "[WAIT] Server startup: ${i}/180 checks (every 3 s). Latest log:"
    tail -n 3 "$BASE/v241_12_1_quiz_nav_server.log" 2>/dev/null || true
  fi
  sleep 3
  if [[ "$i" == 180 ]]; then
    echo '[ERROR] v241.12.5 gateway did not become healthy.' >&2
    tail -n 240 "$BASE/v241_12_1_quiz_nav_server.log" 2>/dev/null || true
    exit 31
  fi
done

HEALTH="$(curl -fsS http://127.0.0.1:8179/api/health)"
echo "$HEALTH"
printf '%s' "$HEALTH" | grep -q 'v241.12.5-full-answer-voice' || { echo '[ERROR] Local health is not the v241.12.5 build.' >&2; exit 32; }
curl -fsS http://127.0.0.1:8179/api/reference/health; echo
curl -fsS http://127.0.0.1:8179/api/reference/course-list; echo
echo '[OK] v241.12.5 local gateway + Reference Textbook + course-adaptive API are healthy.'
FEEDBACK_HEALTH="$(curl -fsS http://127.0.0.1:8179/api/reference/feedback-status)"
echo "$FEEDBACK_HEALTH"
if ! printf '%s' "$FEEDBACK_HEALTH" | "$PYTHON_BIN" -c 'import sys,json; x=json.load(sys.stdin); sys.exit(0 if x.get("email_configured") and x.get("email_target_matches_expected") else 1)'; then
  echo '[ERROR] The running server did not load the verified feedback mail configuration.' >&2
  exit 43
else
  echo '[OK] Feedback email provider and recipient are configured; a test email was accepted before deployment.'
fi

# Verify the preserved physiology Reference Textbook retrieval path without using an answer model.
./CHECK_REFERENCE_RETRIEVAL_RUNTIME.sh http://127.0.0.1:8179

# The public upload build uses batches of extracted PDF text, not the one-word
# embedding smoke test in PREPARE_REFERENCE_VECTOR_RAG.sh. Check that path
# before switching the Worker to this deployment.
"$PYTHON_BIN" - <<'PY' || echo '[WARN] Semantic embedding preflight failed. Uploaded-course text search remains available; retry index preparation after fixing Ollama.'
from course_runtime import _embed_resilient
items=[('Pulmonary ventilation, perfusion and gas exchange in the alveoli. '*32),
       ('呼吸生理、肺泡通氣與血流灌注影響氧氣交換。 '*52)]
vectors=_embed_resilient(items)
assert len(vectors)==2 and len(vectors[0])>=128
print('[OK] Uploaded-course PDF embedding batch + 400 recovery path is ready.')
PY

# ---------- 7. Reuse or create Cloudflare quick-tunnel origin ----------
echo '===== CLOUDFLARE ORIGIN ====='
ORIGIN="$(cat "$BASE/current_cloudflare_origin.txt" 2>/dev/null || true)"
if [[ -z "$ORIGIN" ]] || ! curl -fsS --max-time 12 "$ORIGIN/api/health" >/dev/null 2>&1; then
  pkill -u "$USER" -f '[c]loudflared' 2>/dev/null || true
  ./START_CLOUDFLARE_TUNNEL.sh
  ORIGIN="$(cat logs/cloudflare_origin_url.txt)"
  printf '%s\n' "$ORIGIN" > "$BASE/current_cloudflare_origin.txt"
fi
echo "ORIGIN=$ORIGIN"
ORIGIN_HEALTH="$(curl -fsS --max-time 20 "$ORIGIN/api/health")"
echo "$ORIGIN_HEALTH"
printf '%s' "$ORIGIN_HEALTH" | grep -q 'v241.12.5-full-answer-voice' || { echo '[ERROR] Cloudflare origin is not serving the v241.12.5 build.' >&2; exit 33; }

# ---------- 8. Deploy current Worker/static assets ----------
echo '===== DEPLOY WORKER + STATIC SITE ====='
VQ_ORIGIN_URL="$ORIGIN" ./DEPLOY_CLOUDFLARE_WORKERS_DEV.sh

# Public check can time out from the server network even after Wrangler succeeds.
if PUB="$(curl -fsS --max-time 25 https://lungta.twchu.workers.dev/api/health 2>/dev/null)"; then
  echo "$PUB"
  if printf '%s' "$PUB" | grep -q 'v241.12.5-full-answer-voice'; then
    echo '[OK] Public workers.dev health reports v241.12.5.'
  else
    echo '[WARN] Public endpoint answered, but its build marker was not v241.12.5. Browser hard-refresh and recheck.' >&2
  fi
else
  echo '[WARN] Server-to-workers.dev health check timed out/failed after Wrangler deploy; verify from the browser/client network.' >&2
fi

# ---------- 9. Final local invariant ----------
FINAL="$(curl -fsS http://127.0.0.1:8179/api/health)"
printf '%s' "$FINAL" | grep -q 'v241.12.5-full-answer-voice' || { echo '[ERROR] Final local build invariant failed.' >&2; exit 34; }

echo '============================================================'
echo ' v241.12.5 DEPLOYMENT COMPLETE'
echo '============================================================'
echo '[URL] https://lungta.twchu.workers.dev/reference/'
echo '[UPLOAD] Multiple PDFs -> resumable chunks in one staged course workspace.'
echo '[LECTURE] Course Q&A opens after extraction; selected Chinese scripts prepare per unit in the background.'
echo '[RAG] Course text search activates first; BGE-M3 passage indexing continues in background.'
echo '[QUIZ] Reviewed exam-style questions are saved as they pass; draw 2 per unit as soon as available, up to 10 per unit.'
echo '[COURSES] Select an uploaded course, confirm its deletion, and remove it without a server code.'
echo '[CLOUD] Confirmed API keys send answers directly to the selected cloud model.'
echo '[FEEDBACK] Positive reports keep the answer; issue reports are classified, saved and reviewed; configured email is queued.'
echo '[VISUAL] V/Q model is enabled only when uploaded course text shows respiratory physiology.'
echo '[MODELS] Gemma 4 12B + Ministral 3 8B + GPT-5.6 Luna BYOK.'
