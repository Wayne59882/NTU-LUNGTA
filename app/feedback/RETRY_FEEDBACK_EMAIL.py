#!/usr/bin/env python3
"""Server-only manual resend for a previously saved, undelivered report."""
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent.parent))
from feedback import feedback_service as fb

def retry(requested):
    if not fb.email_configured():raise RuntimeError('Feedback email provider is not configured on this server.')
    c=fb._conn();c.row_factory=fb.sqlite3.Row
    try:
        if requested=='--latest':
            row=c.execute("SELECT * FROM feedback WHERE email_status IN ('not_configured','failed') ORDER BY created_at DESC, rowid DESC LIMIT 1").fetchone()
        else:
            row=c.execute('SELECT * FROM feedback WHERE id=?',(requested,)).fetchone()
        if not row:raise RuntimeError('No matching saved report was found.')
        record=dict(row)
        if record['email_status'] not in ('not_configured','failed'):
            raise RuntimeError('Report %s has status %s; only never-sent/failed reports can be retried.'%(record['id'],record['email_status']))
        try:
            provider_id=fb._send_email(record)
            c.execute("UPDATE feedback SET email_status='sent',email_error='' WHERE id=?",(record['id'],));c.commit()
            return record['id'],provider_id
        except Exception as error:
            c.execute("UPDATE feedback SET email_status='failed',email_error=? WHERE id=?",(str(error)[:1000],record['id']));c.commit()
            raise
    finally:c.close()

if __name__=='__main__':
    if len(sys.argv)!=2:
        raise SystemExit('Usage: ./feedback/RETRY_FEEDBACK_EMAIL.sh --latest | REPORT_ID')
    fid,provider_id=retry(sys.argv[1]);print('[OK] Mail service accepted saved report %s (provider id %s).'%(fid,provider_id or 'SMTP'))
