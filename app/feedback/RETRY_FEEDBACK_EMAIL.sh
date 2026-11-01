#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [[ -f feedback/feedback.env ]]; then
  # shellcheck disable=SC1091
  source feedback/feedback.env
fi
export VQ_FEEDBACK_DB="$ROOT/feedback/feedback.sqlite3"
export VQ_FEEDBACK_TO_EMAIL="${VQ_FEEDBACK_TO_EMAIL:-admin@example.com}"
exec "${PYTHON_BIN:-python3}" feedback/RETRY_FEEDBACK_EMAIL.py "$@"
