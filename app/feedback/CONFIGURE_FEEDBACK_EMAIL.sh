#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV="$ROOT/feedback/feedback.env"
mkdir -p "$ROOT/feedback"
echo 'Configure developer feedback email. Credentials stay on this server only.'
read -r -p 'Developer recipient email: ' TO
read -r -p 'Use Gmail SMTP? [Y/n]: ' GMAIL
GMAIL="${GMAIL:-Y}"
if [[ "$GMAIL" =~ ^[Yy]$ ]]; then
  HOST='smtp.gmail.com'; PORT='587'; STARTTLS='1'; SSL='0'
  read -r -p 'Gmail/Google Workspace sender address: ' USER
  echo 'Use a Google App Password, not your normal account password.'
else
  read -r -p 'SMTP host: ' HOST
  read -r -p 'SMTP port [587]: ' PORT; PORT="${PORT:-587}"
  read -r -p 'SMTP username (blank if none): ' USER
  read -r -p 'STARTTLS? [Y/n]: ' T; T="${T:-Y}"; [[ "$T" =~ ^[Yy]$ ]] && STARTTLS='1' || STARTTLS='0'
  read -r -p 'Implicit SSL? [y/N]: ' S; S="${S:-N}"; [[ "$S" =~ ^[Yy]$ ]] && SSL='1' || SSL='0'
fi
read -r -s -p 'SMTP password / app password: ' PASS; echo
FROM="$USER"; [[ -z "$FROM" ]] && FROM="$TO"
{
  printf 'export VQ_FEEDBACK_TO_EMAIL=%q\n' "$TO"
  printf 'export VQ_FEEDBACK_EXPECTED_TO_EMAIL=%q\n' "$TO"
  printf 'export VQ_SMTP_HOST=%q\n' "$HOST"
  printf 'export VQ_SMTP_PORT=%q\n' "$PORT"
  printf 'export VQ_SMTP_USER=%q\n' "$USER"
  printf 'export VQ_SMTP_PASSWORD=%q\n' "$PASS"
  printf 'export VQ_SMTP_FROM_EMAIL=%q\n' "$FROM"
  printf 'export VQ_SMTP_STARTTLS=%q\n' "$STARTTLS"
  printf 'export VQ_SMTP_SSL=%q\n' "$SSL"
  printf 'export VQ_FEEDBACK_DB=%q\n' "$ROOT/feedback/feedback.sqlite3"
} > "$ENV"
chmod 600 "$ENV"
echo "[OK] Feedback email configuration saved: $ENV"
echo 'Restart the TA server using scripts/start.sh from the repository root to load the new settings.'
