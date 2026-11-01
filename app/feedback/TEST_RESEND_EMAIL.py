#!/usr/bin/env python3
import json, os, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT))
from feedback.feedback_service import send_test_email
try:
    result=send_test_email()
    print('[OK] Feedback test email accepted by the mail service: '+json.dumps(result,ensure_ascii=False))
except Exception as e:
    print('[ERROR] Feedback test email failed: '+str(e))
    print('[HINT] For Resend onboarding@resend.dev, use the Resend account email as the recipient. Otherwise use a verified sending domain.')
    raise SystemExit(1)
