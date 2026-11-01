#!/usr/bin/env python3
"""Merge reports from prior release directories into the current release DB."""
import os
import sqlite3
import sys
from pathlib import Path

# The running service must always use this release's database after migration.
ROOT=Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
os.environ['VQ_FEEDBACK_DB']=str(ROOT/'feedback'/'feedback.sqlite3')
from feedback.feedback_service import _conn  # noqa: E402

def merge(paths):
    dest=Path(os.environ['VQ_FEEDBACK_DB']).resolve()
    target=_conn()
    names={row[1] for row in target.execute('PRAGMA table_info(feedback)')}
    count=0;updated=0
    try:
        for raw in paths:
            source=Path(raw).expanduser()
            if not source.is_file() or source.resolve()==dest:continue
            try:
                old=sqlite3.connect('file:'+str(source.resolve())+'?mode=ro',uri=True)
                old.row_factory=sqlite3.Row
                if not old.execute("SELECT 1 FROM sqlite_master WHERE type='table' AND name='feedback'").fetchone():
                    old.close();continue
                source_columns=[r[1] for r in old.execute('PRAGMA table_info(feedback)') if r[1] in names]
                if 'id' not in source_columns:old.close();continue
                source_sql=','.join('"'+name+'"' for name in source_columns)
                for row in old.execute('SELECT '+source_sql+' FROM feedback'):
                    values=dict(row)
                    present=target.execute('SELECT * FROM feedback WHERE id=?',(values['id'],)).fetchone()
                    if present is None:
                        if 'correction_status' not in values:
                            values['correction_status']='rejected'
                            values['correction_summary']='Legacy report retained; submit a new report to start automatic correction.'
                        columns=list(values)
                        quoted=','.join('"'+name+'"' for name in columns)
                        marks=','.join('?' for _ in columns)
                        target.execute('INSERT INTO feedback ('+quoted+') VALUES ('+marks+')',tuple(values[name] for name in columns));count+=1
                    else:
                        # A copied release DB can contain an older state of the same report.
                        current=target.execute('SELECT email_status,correction_status,corrected_at FROM feedback WHERE id=?',(values['id'],)).fetchone()
                        if values.get('email_status') in ('sent','failed') and current[0] in ('pending','queued','not_configured'):
                            target.execute('UPDATE feedback SET email_status=?,email_error=? WHERE id=?',
                                           (values['email_status'],values.get('email_error') or '',values['id']));updated+=1
                        if values.get('correction_status') in ('ready','error','rejected','kept','logged') and current[1] in ('queued','reviewing'):
                            fields=[name for name in ('correction_status','correction_answer','correction_sources','correction_summary','correction_error','corrected_at','correction_model_key','feedback_intent','feedback_focus') if name in values]
                            if fields:
                                target.execute('UPDATE feedback SET '+','.join('"'+name+'"=?' for name in fields)+' WHERE id=?',
                                               tuple(values[name] for name in fields)+(values['id'],));updated+=1
                old.close()
            except sqlite3.DatabaseError as error:
                raise RuntimeError('Could not read feedback history from %s: %s'%(source,error))
        target.commit()
    finally:target.close()
    return count,updated

if __name__=='__main__':
    added,refreshed=merge(sys.argv[1:])
    print('[OK] Feedback history preserved: %s additional reports, %s updated delivery/review statuses.'%(added,refreshed))
