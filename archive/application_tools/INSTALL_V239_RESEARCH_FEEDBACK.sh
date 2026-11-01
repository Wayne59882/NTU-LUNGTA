#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
export PATH="$BASE/node-v22/bin:$BASE/ollama/bin:$PATH"
echo '===== v239.1 RESEARCH BENCHMARK + RESEND STUDENT FEEDBACK ACCEPTANCE ====='
./CHECK_V239_RESEARCH_FEEDBACK.sh
./CHECK_V239_1_RESEND_FEEDBACK.sh
echo '===== DEPLOY PRESERVING v238.1 INFERENCE/RAG BEHAVIOR ====='
./INSTALL_V238_ACCURACY_ROBUST_BATCH_STABLE.sh
echo '===== FEEDBACK STATUS ====='
curl -sS http://127.0.0.1:8179/api/reference/feedback-status || true; echo
echo '===== v239.1 FEATURE DEPLOYMENT COMPLETE ====='
echo '[RESEARCH] Configure cloud benchmark keys:'
echo '  cd research/five_model_benchmark && ./CONFIGURE_CLOUD_KEYS.sh'
echo '[RESEARCH] Run 10 or 50 unseen questions after questions_unseen.jsonl is prepared.'
echo '[STUDENT] Recommended email setup (no Gmail App Password):'
echo '  ./feedback/CONFIGURE_FEEDBACK_RESEND.sh'
echo '  then rerun ./INSTALL_FINAL.sh (or restart the TA server).'
echo '[LEGACY] SMTP setup remains available with ./feedback/CONFIGURE_FEEDBACK_EMAIL.sh'
echo '[NOTE] Feedback is always stored in SQLite before any email attempt.'
