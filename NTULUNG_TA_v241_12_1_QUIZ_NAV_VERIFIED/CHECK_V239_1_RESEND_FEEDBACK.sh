#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
python3 -m py_compile feedback/feedback_service.py feedback/TEST_RESEND_EMAIL.py
python3 - <<'PY'
from pathlib import Path
p=Path('feedback/feedback_service.py').read_text()
c=Path('feedback/CONFIGURE_FEEDBACK_RESEND.sh').read_text()
for token in ['https://api.resend.com/emails','VQ_RESEND_API_KEY','Idempotency-Key','VQ_EMAIL_PROVIDER']:
    assert token in p, token
for token in ['onboarding@resend.dev','Resend API key','chmod 600']:
    assert token in c, token
print('[OK] Resend REST API integration + secure server-only configuration present')
PY
python3 - <<'PY'
import os, json, urllib.request
os.environ['VQ_EMAIL_PROVIDER']='resend'
os.environ['VQ_RESEND_API_KEY']='re_test_mock_key'
os.environ['VQ_FEEDBACK_TO_EMAIL']='owner@example.net'
os.environ['VQ_RESEND_FROM']='NTULUNG Feedback <onboarding@resend.dev>'
from feedback import feedback_service as f
class Resp:
    def __enter__(self): return self
    def __exit__(self,*a): return False
    def read(self): return b'{"id":"mock-email-id"}'

captured={}
orig=f.urllib.request.urlopen

def fake_urlopen(req, timeout=None):
    # Capture the exact Request used by feedback_service.  Avoid unittest.mock
    # call_args introspection, which proved brittle across server runtimes.
    assert isinstance(req, urllib.request.Request), type(req)
    captured['url']=req.full_url
    captured['headers']={k.lower():v for k,v in req.header_items()}
    captured['body']=json.loads(req.data.decode('utf-8'))
    captured['timeout']=timeout
    return Resp()

try:
    f.urllib.request.urlopen=fake_urlopen
    r=f.send_test_email()
finally:
    f.urllib.request.urlopen=orig

assert r['ok'] and r['provider']=='resend' and r['email_id']=='mock-email-id', r
assert captured['url']=='https://api.resend.com/emails', captured
assert captured['headers'].get('authorization')=='Bearer re_test_mock_key', captured['headers']
assert captured['body']['to']==['owner@example.net'], captured['body']
assert 'Feedback' in captured['body']['subject'], captured['body']
print('[OK] Resend send path deterministic mock test passed without network/API quota')
PY
TMPDB="$(mktemp /tmp/vqfb2391.XXXXXX.sqlite3)"; rm -f "$TMPDB"
VQ_FEEDBACK_DB="$TMPDB" VQ_EMAIL_PROVIDER='' VQ_RESEND_API_KEY='' VQ_SMTP_HOST='' python3 - <<'PY'
from feedback.feedback_service import save_feedback,status
x=save_feedback({'question':'test','answer':'answer','reason':'incorrect'})
assert x['saved'] and not x['email_queued'] and status()['storage']=='sqlite'
print('[OK] SQLite-first fallback preserved when email is unconfigured')
PY
rm -f "$TMPDB"
echo '===== ALL v239.1 RESEND FEEDBACK CHECKS PASSED ====='
