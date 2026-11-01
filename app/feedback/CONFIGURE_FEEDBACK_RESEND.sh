#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV="$ROOT/feedback/feedback.env"
PYTHON_BIN="$(command -v "${PYTHON_BIN:-python3}")" || { echo '[ERROR] Python was not found.' >&2; exit 127; }
mkdir -p "$ROOT/feedback"
echo 'Configure Resend for developer feedback email.'
echo 'No Gmail App Password is needed.'
echo 'For the simplest test, sign up to Resend with the SAME email address that should receive feedback.'
echo 'Using onboarding@resend.dev can send test mail only to the email address associated with your Resend account.'
DEFAULT_TO="${VQ_FEEDBACK_DEFAULT_TO_EMAIL:-admin@example.com}"
read -r -p "Developer recipient email [${DEFAULT_TO}; use the email shown by your Resend account in test mode]: " TO
TO="${TO:-$DEFAULT_TO}"
if [[ ! "$TO" =~ ^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$ ]]; then echo '[ERROR] A valid recipient email is required.' >&2; exit 1; fi
echo "[INFO] Reports and the test email will be sent to: $TO"
read -r -s -p 'Resend API key (starts with re_): ' KEY; echo
if [[ "$KEY" != re_* ]]; then echo '[ERROR] Resend API key should start with re_.'; exit 1; fi
read -r -p 'From address [NTULUNG Feedback <onboarding@resend.dev>]: ' FROM
FROM="${FROM:-NTULUNG Feedback <onboarding@resend.dev>}"
echo '[INFO] Sending one test email before activating this key. The previous configuration stays in place if Resend rejects it.'
if ! (
  export VQ_EMAIL_PROVIDER=resend VQ_FEEDBACK_TO_EMAIL="$TO" VQ_RESEND_API_KEY="$KEY" VQ_RESEND_FROM="$FROM"
  "$PYTHON_BIN" "$ROOT/feedback/TEST_RESEND_EMAIL.py"
); then
  echo '[ERROR] Resend did not accept the test email. Feedback mail configuration was not changed.' >&2
  exit 1
fi
umask 077
TEMP_ENV="$(mktemp "$ROOT/feedback/feedback.env.XXXXXX")"
trap 'rm -f "$TEMP_ENV"' EXIT
{
  printf 'export VQ_EMAIL_PROVIDER=%q\n' 'resend'
  printf 'export VQ_FEEDBACK_TO_EMAIL=%q\n' "$TO"
  printf 'export VQ_FEEDBACK_EXPECTED_TO_EMAIL=%q\n' "$TO"
  printf 'export VQ_RESEND_API_KEY=%q\n' "$KEY"
  printf 'export VQ_RESEND_FROM=%q\n' "$FROM"
  printf 'export VQ_RESEND_TIMEOUT=%q\n' '12'
  printf 'export VQ_FEEDBACK_DB=%q\n' "$ROOT/feedback/feedback.sqlite3"
} > "$TEMP_ENV"
mv -f "$TEMP_ENV" "$ENV"
chmod 600 "$ENV"
echo '[OK] Resend accepted a test email and the server-side configuration was saved.'
echo '[INFO] API key is stored only on this server and is not sent to the browser.'
if [[ -s "$ROOT/feedback/feedback.sqlite3" ]]; then
  read -r -p 'Email the newest previously saved but unsent report now? [Y/n]: ' RETRY
  if [[ "${RETRY:-Y}" =~ ^[Yy]$ ]]; then
    "$ROOT/feedback/RETRY_FEEDBACK_EMAIL.sh" --latest || echo '[WARN] No undelivered report was found, or Resend declined this report.' >&2
  fi
fi
echo '[NEXT] Run bash scripts/start.sh from the repository root to load the verified mail settings.'
