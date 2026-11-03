"""Actual Reference server: answer jobs return valid JSON through start, status and cancel.

Runs the production entry point in mock answer mode (no model) and talks HTTP,
the same way the browser does.
"""
import json
import os
from pathlib import Path
import socket
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[2]
APP = Path(os.environ.get('VHTA_TEST_APP') or ROOT / 'app')


def free_port():
    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        return sock.getsockname()[1]


def request(base, path, payload=None):
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(base + path, data=data, headers={'Content-Type': 'application/json'},
                                 method='POST' if data is not None else 'GET')
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            status, body = response.status, response.read()
    except urllib.error.HTTPError as error:
        status, body = error.code, error.read()
    try:
        return status, json.loads(body.decode('utf-8'))
    except ValueError:
        raise AssertionError('%s returned invalid JSON (HTTP %s): %r' % (path, status, body[:200]))


with tempfile.TemporaryDirectory() as temporary:
    temp = Path(temporary);number = free_port();base = 'http://127.0.0.1:%d' % number
    script = temp / 'reference_boot.py'
    script.write_text(
        "import sys,time\nsys.path.insert(0,%r)\nimport reference_server as service\n"
        "service.installed_models=lambda *args:set()\nservice.COURSES.resume_pending=lambda *args:None\n"
        "service.pending_corrections=lambda:[]\nservice.resume_pending_emails=lambda:None\n"
        "sys.argv=['fixture','--host','127.0.0.1','--port',%r,'--mode','mock','--open','none']\nservice.main()\n"
        % (str(APP), str(number)))
    env = dict(os.environ, VQ_AUTH_DB=str(temp / 'auth.sqlite3'), VQ_SHARED_MODEL_LOCK=str(temp / 'model.lock'),
               VQ_MODEL_PRIORITY_DIR=str(temp / 'priority'))
    with (temp / 'reference.log').open('w+') as log:
        child = subprocess.Popen([sys.executable, str(script)], cwd=str(temp), env=env, stdout=log, stderr=log)
        try:
            deadline = time.monotonic() + 15
            while True:
                if child.poll() is not None:
                    log.seek(0);raise AssertionError('reference server crashed:\n' + log.read())
                try:
                    if request(base, '/api/reference/ready')[1].get('ok'):break
                except Exception:
                    if time.monotonic() > deadline:raise
                    time.sleep(.1)
            # Single local answer: every status poll is valid JSON until the answer is done.
            status, started = request(base, '/api/reference/answer-job-start',
                                      {'question': 'What is ventilation-perfusion matching?', 'model_key': 'gemma'})
            assert status == 202 and len(started.get('job_id', '')) == 32, started
            for _ in range(100):
                status, job = request(base, '/api/reference/job-status?id=' + started['job_id'])
                assert status == 200 and job.get('status'), job
                assert not any(key.startswith('_') for key in job), 'internal fields leaked: %s' % sorted(job)
                if job['status'] == 'done':break
                time.sleep(.05)
            assert job['status'] == 'done' and job['result']['answer'], job
            # Cancelling a finished job is harmless; its status stays readable JSON.
            status, cancelled = request(base, '/api/reference/job-cancel', {'job_id': started['job_id']})
            assert status == 200 and cancelled['ok'], cancelled
            status, job = request(base, '/api/reference/job-status?id=' + started['job_id'])
            assert status == 200 and job['status'] == 'done', job
            # Batch jobs use the same status route.
            status, batch = request(base, '/api/reference/batch-job-start', {'questions': ['Define dead space.', 'Define shunt.'], 'model_key': 'gemma'})
            assert status == 202, batch
            for _ in range(100):
                status, job = request(base, '/api/reference/job-status?id=' + batch['job_id'])
                assert status == 200 and job.get('status'), job
                if job['status'] == 'done':break
                time.sleep(.05)
            assert job['status'] == 'done' and len(job['result']['answers']) == 2, job
            # Unknown jobs and bad input are JSON errors, never broken responses.
            assert request(base, '/api/reference/job-status?id=' + '0' * 32) == (404, {'error': 'job not found'})
            assert request(base, '/api/reference/course-answer-job-start', {'course_id': 'missing', 'question': 'x'})[0] == 400
            assert request(base, '/api/reference/job-cancel', {'job_id': 'bad'})[0] == 400
        finally:
            child.terminate();child.wait(timeout=5)
print('[OK] actual Reference server: answer/batch job start, status polling, cancel and errors all return valid JSON')
