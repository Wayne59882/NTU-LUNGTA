#!/usr/bin/env python3
"""SQLite receipt and provider acceptance checks without sending real email."""
import os, sqlite3, tempfile, time, json, runpy
from pathlib import Path

from feedback import feedback_service as fb

class Accepted:
    def __enter__(self):return self
    def __exit__(self,*args):return False
    def read(self):return b'{"id":"mock-email-accepted"}'

with tempfile.TemporaryDirectory(prefix='v24112-feedback-') as folder:
    root=Path(folder);fb.DB_PATH=root/'current.sqlite3'
    old_env={k:os.environ.get(k) for k in ('VQ_FEEDBACK_TO_EMAIL','VQ_FEEDBACK_EXPECTED_TO_EMAIL','VQ_EMAIL_PROVIDER','VQ_RESEND_API_KEY','VQ_SMTP_HOST')}
    old_urlopen=fb.urllib.request.urlopen
    sent=[]
    def fake(req,timeout=None):
        payload=json.loads(req.data.decode('utf-8'))
        sent.append(payload)
        assert payload['to']==['admin@example.com']
        assert 'WHAT WAS UNSATISFACTORY / REQUESTED CHANGE' in payload['text']
        assert 'QUESTION(S)' in payload['text'] and 'AI ANSWER(S)' in payload['text']
        return Accepted()
    try:
        os.environ['VQ_FEEDBACK_TO_EMAIL']='admin@example.com'
        os.environ['VQ_FEEDBACK_EXPECTED_TO_EMAIL']='admin@example.com'
        os.environ['VQ_EMAIL_PROVIDER']='resend'
        os.environ.pop('VQ_RESEND_API_KEY',None);os.environ.pop('VQ_SMTP_HOST',None)
        old=fb.save_feedback({'question':'How does ventilation affect gas exchange?','answer':'Incomplete old answer.','reason':'incomplete','comment':'Explain the mechanism.'})
        assert old['saved'] and old['email_status']=='not_configured' and fb.feedback_record(old['id'])['email_status']=='not_configured'
        legacy=root/'legacy.sqlite3'
        # sqlite3.Connection.backup was added after the Python 3.6 runtime
        # used by the teaching server. iterdump works on both runtimes.
        with sqlite3.connect(str(fb.DB_PATH)) as src, sqlite3.connect(str(legacy)) as dst:
            dst.executescript('\n'.join(src.iterdump()))
        fb.DB_PATH=root/'current-new.sqlite3';fb._conn().close()
        merger=runpy.run_path(str(Path(__file__).parent/'feedback'/'MIGRATE_FEEDBACK_HISTORY.py'),run_name='imported')
        fb.DB_PATH=root/'current-new.sqlite3'
        added,updated=merger['merge']([str(legacy)])
        assert added==1 and fb.feedback_record(old['id'])['comment']=='Explain the mechanism.'
        ancient=root/'ancient.sqlite3'
        with sqlite3.connect(str(ancient)) as c:
            c.execute('CREATE TABLE feedback (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, question TEXT NOT NULL, answer TEXT NOT NULL, reason TEXT NOT NULL)')
            c.execute('INSERT INTO feedback VALUES (?,?,?,?,?)',('old-schema-report','2024-01-01','Old question','Old answer','other'))
        assert merger['merge']([str(ancient)])[0]==1
        assert fb.feedback_record('old-schema-report')['correction_status']=='rejected'
        os.environ['VQ_RESEND_API_KEY']='re_mock_key';fb.urllib.request.urlopen=fake
        current=fb.save_feedback({'question':'What changes in pulmonary perfusion?','answer':'Needs more detail.','reason':'incomplete','comment':'Add the comparison.'})
        assert current['email_status']=='queued'
        deadline=time.time()+3
        while time.time()<deadline and fb.feedback_record(current['id'])['email_status']!='sent':time.sleep(.01)
        assert fb.feedback_record(current['id'])['email_status']=='sent'
        assert fb.status()['email_target_matches_expected'] and fb.status()['email_recipient_hint']=='h***@gmail.com'
        os.environ['VQ_FEEDBACK_EXPECTED_TO_EMAIL']='another@example.com'
        assert not fb.status()['email_target_matches_expected']
        os.environ['VQ_FEEDBACK_EXPECTED_TO_EMAIL']='admin@example.com'
        c=fb._conn();c.execute("UPDATE feedback SET email_status='queued' WHERE id=?",(current['id'],));c.commit();c.close()
        assert fb.resume_pending_emails()==1
        deadline=time.time()+3
        while time.time()<deadline and fb.feedback_record(current['id'])['email_status']!='sent':time.sleep(.01)
        assert fb.feedback_record(current['id'])['email_status']=='sent' and len(sent)==2
        def blocked(req,timeout=None):raise RuntimeError('mock delivery unavailable')
        fb.urllib.request.urlopen=blocked
        failed=fb.save_feedback({'question':'What is alveolar ventilation?','answer':'Old answer.','reason':'incomplete'})
        deadline=time.time()+3
        while time.time()<deadline and fb.feedback_record(failed['id'])['email_status']!='failed':time.sleep(.01)
        assert fb.feedback_record(failed['id'])['email_status']=='failed'
        fb.urllib.request.urlopen=fake
        from feedback.RETRY_FEEDBACK_EMAIL import retry
        retried,_=retry(failed['id'])
        assert retried==failed['id'] and fb.feedback_record(failed['id'])['email_status']=='sent'
        newest,_=retry('--latest')
        assert newest==old['id'] and fb.feedback_record(old['id'])['email_status']=='sent'
        print('[OK] SQLite saved receipt, old DB merge, Resend recipient, accepted delivery, restart recovery')
    finally:
        fb.urllib.request.urlopen=old_urlopen
        for k,v in old_env.items():
            if v is None:os.environ.pop(k,None)
            else:os.environ[k]=v
