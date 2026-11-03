"""Real process discovery, absent KB bootstrap and configured-port health."""
import json
import os
from pathlib import Path
import socket
import subprocess
import sys
import tempfile
import time
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts/deploy'))
import auto_sync as sync

SERVER='''import argparse,json,os
from http.server import HTTPServer,BaseHTTPRequestHandler
LEGACY=os.environ.get('VQ_EDGE_TTS_BIN','/private/fixture/edge-tts')
parser=argparse.ArgumentParser();parser.add_argument('--port',type=int);args,extra=parser.parse_known_args()
class Handler(BaseHTTPRequestHandler):
 def log_message(self,*args):pass
 def do_GET(self):
  data=json.dumps({'ok':True,'content_integrity_revision':'R15','release_revision':'R16'}).encode()
  self.send_response(200);self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
HTTPServer(('127.0.0.1',args.port),Handler).serve_forever()
'''

def free_port():
    with socket.socket() as sock:sock.bind(('127.0.0.1',0));return sock.getsockname()[1]

def ready(port):
    deadline=time.monotonic()+10
    while time.monotonic()<deadline:
        if sync.endpoint_ok(port,'/api/health'):return
        time.sleep(.05)
    raise AssertionError('fixture server did not start')

with tempfile.TemporaryDirectory() as temporary:
    root=Path(temporary);target=root/'live';target.mkdir();(target/'logs').mkdir();outside=root/'outside';outside.mkdir()
    for name in ('reference_server','kb_server','gateway'):(target/(name+'.py')).write_text(SERVER)
    ports={name:free_port() for name in ('reference_server','kb_server','gateway')}
    assert len(set(ports.values()))==3
    env=dict(os.environ,VQ_KB_INTERNAL_PORT=str(ports['kb_server']),VQ_REFERENCE_INTERNAL_PORT=str(ports['reference_server']),VQ_PORT=str(ports['gateway']))
    children=[];services=[]
    try:
        # Both existing services have a working directory outside their script
        # tree. The old updater incorrectly rejected this valid arrangement.
        for name in ('reference_server','gateway'):
            child=subprocess.Popen([sys.executable,str(target/(name+'.py')),'--port',str(ports[name])],cwd=str(outside),env=env,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
            children.append(child);ready(ports[name])
        services=sync.plan_services(target)
        ref=next(row for row in services if row['name']=='reference_server')
        kb=next(row for row in services if row['name']=='kb_server')
        assert ref['was_running'] and ref['cwd']==str(outside)
        assert ref['pid']==children[0].pid
        assert not kb['was_running'] and kb['pid'] is None and sync.service_port(kb)==ports['kb_server']
        assert kb['env']['VQ_EDGE_TTS_BIN']=='/private/fixture/edge-tts'
        for row in services:
            try:sync.restart(target,row)
            except Exception:
                print((target/'logs'/(row['name']+'_sync.log')).read_text());raise
        sync.health(services);assert kb['pid'] and sync.endpoint_ok(ports['kb_server'],'/api/health')
        # Rollback restores the pre-update service layout: newly started KB is
        # stopped; originally running Reference/gateway are restored.
        sync.restore_services(target,services)
        assert kb['pid'] is None
        ready(ports['reference_server']);ready(ports['gateway'])
        assert not sync.endpoint_ok(ports['kb_server'],'/api/health')
        # An occupied port is never blindly killed or rebound by the updater.
        with socket.socket() as blocker:
            blocker.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
            blocker.bind(('127.0.0.1',ports['kb_server']));blocker.listen(1)
            with patch.object(sync,'endpoint_ok',return_value=False):
                try:sync.plan_services(target)
                except RuntimeError as error:assert 'occupied' in str(error)
                else:raise AssertionError('occupied unrelated port was accepted')
            with patch.object(sync,'endpoint_ok',return_value=True):
                shared=next(row for row in sync.plan_services(target) if row['name']=='kb_server')
                assert shared['external'] and shared['pid'] is None
                with patch.object(sync.os,'kill',side_effect=AssertionError('shared endpoint was killed')):sync.restart(target,shared)
        # Multiple matches are a real ambiguity; do not stop any candidate.
        duplicate=subprocess.Popen([sys.executable,str(target/'reference_server.py'),'--port',str(free_port())],cwd=str(outside),env=env,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        children.append(duplicate)
        deadline=time.monotonic()+5
        while time.monotonic()<deadline:
            try:sync.snapshot(target,'reference_server')
            except RuntimeError:break
            time.sleep(.05)
        else:raise AssertionError('duplicate process ambiguity ignored')
    finally:
        for row in services:sync.stop(row)
        for child in children:
            if child.poll() is None:child.terminate()
            try:child.wait(timeout=5)
            except subprocess.TimeoutExpired:child.kill();child.wait()
print('PASS real absolute-script discovery outside cwd, missing KB startup, inherited legacy settings, custom-port health, rollback to original services, occupied-port protection and shared-KB preservation')
