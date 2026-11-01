#!/usr/bin/env python3
import csv, os, sqlite3, sys
from pathlib import Path
root=Path(__file__).resolve().parent.parent
db=Path(os.environ.get('VQ_FEEDBACK_DB',str(root/'feedback'/'feedback.sqlite3')))
out=Path(sys.argv[1]) if len(sys.argv)>1 else root/'feedback'/'feedback_export.csv'
if not db.exists():raise SystemExit('No feedback database yet: '+str(db))
c=sqlite3.connect(str(db));c.row_factory=sqlite3.Row
rows=c.execute('SELECT * FROM feedback ORDER BY created_at').fetchall();c.close()
out.parent.mkdir(parents=True,exist_ok=True)
with out.open('w',newline='',encoding='utf-8-sig') as f:
    w=csv.writer(f); w.writerow(rows[0].keys() if rows else ['id']);
    for r in rows:w.writerow(list(r))
print('[OK] exported',len(rows),'rows to',out)
