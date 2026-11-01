#!/usr/bin/env python3
"""Run the installer's post-stop feedback migration in an isolated release."""
from __future__ import print_function
import os
import shutil
import sqlite3
import subprocess
import sys
import tempfile
from pathlib import Path


SOURCE = Path(__file__).resolve().parent
with tempfile.TemporaryDirectory(prefix='v241_install_migration_') as temp:
    root = Path(temp)
    feedback = root / 'feedback'
    feedback.mkdir()
    for name in ('__init__.py', 'feedback_service.py', 'MIGRATE_FEEDBACK_HISTORY.py'):
        shutil.copyfile(str(SOURCE / 'feedback' / name), str(feedback / name))

    legacy = root / 'older_release' / 'feedback.sqlite3'
    legacy.parent.mkdir()
    connection = sqlite3.connect(str(legacy))
    connection.execute('CREATE TABLE feedback (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, question TEXT NOT NULL, answer TEXT NOT NULL, reason TEXT NOT NULL, comment TEXT, email_status TEXT NOT NULL)')
    connection.execute('INSERT INTO feedback VALUES (?,?,?,?,?,?,?)',
                       ('legacy-report-1', '2026-09-28T22:44:31Z', '肺泡通氣與灌流有何關係？', '舊回覆', 'incomplete', '請補充機轉', 'failed'))
    connection.commit()
    connection.close()

    # This is exactly the form invoked by INSTALL_V241_2_ONE_CLICK_STABLE.sh.
    # Running with a fresh cwd and no PYTHONPATH catches package import failures
    # that in-process runpy or py_compile cannot see.
    environment = os.environ.copy()
    environment.pop('PYTHONPATH', None)
    command = [sys.executable, 'feedback/MIGRATE_FEEDBACK_HISTORY.py', str(legacy)]
    for attempt in (1, 2):
        process = subprocess.Popen(command, cwd=str(root), env=environment,
                                   stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()
        if process.returncode:
            raise AssertionError('Production migration invocation failed (attempt %d): %s\n%s' %
                                 (attempt, stdout.decode('utf-8', 'replace'), stderr.decode('utf-8', 'replace')))
    current = sqlite3.connect(str(feedback / 'feedback.sqlite3'))
    try:
        rows = current.execute('SELECT id, email_status, correction_status FROM feedback').fetchall()
        assert rows == [('legacy-report-1', 'failed', 'rejected')], rows
    finally:
        current.close()
print('[OK] Exact post-stop feedback migration command imports, retains legacy report, and is idempotent.')
