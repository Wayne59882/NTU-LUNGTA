"""Start actual production server entrypoints; do not replace them with stubs."""
import json
import os
from pathlib import Path
import socket
import subprocess
import sys
import tempfile
import time
import urllib.request

ROOT=Path(__file__).resolve().parents[2];APP=ROOT/'app'

def port():
    with socket.socket() as sock:sock.bind(('127.0.0.1',0));return sock.getsockname()[1]

with tempfile.TemporaryDirectory() as temporary:
    temp=Path(temporary)
    for role in ('kb','reference','gateway'):
        number=port();path='/api/reference/ready' if role=='reference' else '/api/ready'
        script=temp/(role+'_boot.py')
        setup="import sys,time\nsys.path.insert(0,%r)\n"%str(APP)
        if role=='kb':
            setup+="import kb_server as service\nservice.start_ollama_if_needed=lambda:(True,'')\nservice.installed_ollama_models=lambda:{service.model_meta(service.DEFAULT_MODEL_KEY)['tag']}\nservice.installed_models_for_base=lambda base:service.installed_ollama_models()\nservice.run_selected_chat=lambda *args,**kwargs:time.sleep(30)\n"
        elif role=='reference':
            setup+="import reference_server as service\nservice.installed_models=lambda *args:set()\nservice.COURSES.resume_pending=lambda *args:time.sleep(30)\nservice.pending_corrections=lambda:[]\nservice.resume_pending_emails=lambda:None\n"
        else:setup+="import gateway as service\n"
        setup+="sys.argv=['fixture','--host','127.0.0.1','--port',%r]%s\nservice.main()\n"%(str(number),"+['--mode','ollama','--open','none']" if role!='gateway' else '')
        script.write_text(setup)
        env=dict(os.environ,VQ_AUTH_DB=str(temp/'auth.sqlite3'),VQ_SHARED_MODEL_LOCK=str(temp/'model.lock'))
        with (temp/(role+'.log')).open('w+') as log:
            child=subprocess.Popen([sys.executable,str(script)],cwd=str(temp),env=env,stdout=log,stderr=log)
            try:
                started=time.monotonic();deadline=started+10;response=None
                while time.monotonic()<deadline:
                    if child.poll() is not None:log.seek(0);raise AssertionError(role+' crashed:\n'+log.read())
                    try:
                        with urllib.request.urlopen('http://127.0.0.1:%s%s'%(number,path),timeout=.5) as stream:response=json.loads(stream.read().decode())
                        break
                    except Exception:time.sleep(.05)
                assert response and response['ok'] and response['content_integrity_revision']=='R15',(role,response)
                assert time.monotonic()-started<10,'readiness was blocked by model warm-up/job resume'
            finally:
                child.terminate();child.wait(timeout=5)
    sys.path.insert(0,str(APP))
    import kb_server,reference_server
    from model_lock import SharedModelLock
    assert kb_server.SharedModelLock is reference_server.SharedModelLock is SharedModelLock
    with SharedModelLock(str(temp/'shared.lock')):pass
print('PASS actual KB/Reference/gateway startup, SharedModelLock definition, readiness independent of 30-second model warm-up and job resumption')
