#!/usr/bin/env python3
"""Pull CI-approved public source on the private server; preserve private data.

Run by the same Unix user as the teaching services. No SSH key, cloud token,
uploaded PDF or account database is added to GitHub by this updater.
"""
from __future__ import print_function
import argparse
import fcntl
import json
import os
import re
from pathlib import Path
import shlex
import shutil
import signal
import subprocess
import tempfile
import time
import urllib.request

ROOT=Path(__file__).resolve().parents[2]
REPO='Wayne59882/multi-course-virtual-human-ta'
PRESERVE={'wrangler.jsonc','reference_corpus/chunks.jsonl','reference_corpus/corpus_meta.json'}

def run(args,**kwargs):
    return subprocess.check_output(args,cwd=str(ROOT),**kwargs).decode().strip()

def load_config(path,target):
    text=Path(path).read_text(encoding='utf-8-sig')
    text=re.sub(r'"(?:\\.|[^"\\])*"|//[^\n]*|/\*[\s\S]*?\*/',lambda m:m.group() if m.group().startswith('"') else '',text)
    text=re.sub(r'"(?:\\.|[^"\\])*"|,(?=\s*[}\]])',lambda m:m.group() if m.group().startswith('"') else '',text)
    cfg=json.loads(text)
    if not cfg.get('name') or not isinstance(cfg.get('assets'),dict):raise RuntimeError('Existing Worker configuration is incomplete')
    cfg.pop('vars',None);cfg['keep_vars']=True
    cfg['main']=str(target/'cloudflare/worker/src/index.js')
    cfg['assets']['directory']=str(target/'web')
    return cfg

def ci_passed(sha):
    url='https://api.github.com/repos/'+REPO+'/actions/runs?event=push&head_sha='+sha+'&per_page=30'
    request=urllib.request.Request(url,headers={'User-Agent':'MC-VHTA-private-server-sync'})
    with urllib.request.urlopen(request,timeout=20) as response:data=json.loads(response.read().decode())
    runs=[row for row in data.get('workflow_runs',[]) if row.get('name')=='Offline checks' and row.get('head_sha')==sha]
    return bool(runs and runs[0].get('status')=='completed' and runs[0].get('conclusion')=='success')

def snapshot(target,name):
    candidates=[];pidfile=target/'logs'/(name.replace('_server','')+'_backend.pid')
    for proc in Path('/proc').iterdir():
        if not proc.name.isdigit():continue
        try:
            cmd=[os.fsdecode(x) for x in (proc/'cmdline').read_bytes().split(b'\0') if x]
            indices=[i for i,value in enumerate(cmd) if Path(value).name==name+'.py']
            if len(indices)!=1:continue
            cwd=Path(os.readlink(str(proc/'cwd'))).resolve()
            if cwd!=target and target not in cwd.parents:continue
            index=indices[0];argument=Path(cmd[index])
            if argument.is_absolute() and argument.resolve()!=target/(name+'.py'):continue
            cmd[index]=str(target/(name+'.py'))
            env={os.fsdecode(k):os.fsdecode(v) for k,v in (item.split(b'=',1) for item in (proc/'environ').read_bytes().split(b'\0') if b'=' in item)}
            candidates.append({'pid':int(proc.name),'command':cmd,'cwd':str(cwd),'env':env,'name':name})
        except (OSError,ValueError):continue
    if len(candidates)!=1:raise RuntimeError('Expected one running '+name+' for this target; stopped before updating files.')
    return candidates[0]

def restart(target,service):
    pid=service['pid'];os.kill(pid,signal.SIGTERM)
    for _ in range(50):
        try:
            state=Path('/proc/%s/stat'%pid).read_text().rsplit(')',1)[1].strip()
            if state.startswith('Z'):break
        except FileNotFoundError:break
        time.sleep(.2)
    else:raise RuntimeError(service['name']+' did not stop; no forced kill was sent.')
    with (target/'logs'/(service['name']+'_sync.log')).open('ab') as log:
        process=subprocess.Popen(service['command'],cwd=service['cwd'],env=service['env'],stdin=subprocess.DEVNULL,stdout=log,stderr=log,start_new_session=True)
    service['pid']=process.pid
    name={'reference_server':'reference_backend','kb_server':'kb_backend','gateway':'gateway'}[service['name']]
    (target/'logs'/(name+'.pid')).write_text(str(process.pid)+'\n')

def install_files(source,target,backup,relative_paths):
    plan=[]
    for relative in relative_paths:
        path=Path(relative)
        if path.is_absolute() or '..' in path.parts:raise ValueError('Invalid source path')
        if relative in PRESERVE and (target/path).exists():continue
        if path.parts[0] in ('auth','logs','course_workspaces','backups') or path.suffix in ('.sqlite','.sqlite3','.db','.env'):raise ValueError('Persistent data cannot be installed from source')
        src=source/path;dest=target/path
        if dest.parent.resolve()!=target and target not in dest.parent.resolve().parents:raise ValueError('Target parent escapes application')
        if src.is_symlink() or dest.is_symlink():raise ValueError('Symlinked application file')
        existed=dest.exists();plan.append({'path':relative,'existed':existed})
        if existed:
            saved=backup/path;saved.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(str(dest),str(saved))
    (backup/'plan.json').write_text(json.dumps(plan))
    try:
        for row in plan:
            path=Path(row['path']);dest=target/path;dest.parent.mkdir(parents=True,exist_ok=True)
            temp=dest.with_name(dest.name+'.sync_tmp')
            shutil.copy2(str(source/path),str(temp));os.replace(str(temp),str(dest))
    except Exception:
        restore_files(target,backup);raise
    return plan

def restore_files(target,backup):
    for row in json.loads((backup/'plan.json').read_text()):
        dest=target/row['path']
        if row['existed']:shutil.copy2(str(backup/row['path']),str(dest))
        elif dest.exists():dest.unlink()

def health():
    for _ in range(20):
        try:
            with urllib.request.urlopen('http://127.0.0.1:8182/api/reference/health',timeout=10) as response:data=json.loads(response.read().decode())
            if data.get('ok') and data.get('content_integrity_revision')=='R14':return
        except Exception:pass
        time.sleep(.5)
    raise RuntimeError('R14 backend health did not pass; keep the backup.')

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--target',required=True);parser.add_argument('--apply',action='store_true');parser.add_argument('--publish',action='store_true')
    args=parser.parse_args();target=Path(args.target).resolve()
    if not (target/'reference_server.py').is_file():raise RuntimeError('Target is not the existing teaching application')
    (target/'logs').mkdir(exist_ok=True)
    with (target/'logs/auto_sync.lock').open('w') as lock:
        try:fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
        except BlockingIOError:return
        if run(['git','status','--porcelain','--untracked-files=no']):raise RuntimeError('Source checkout has local edits; no forced reset was performed')
        run(['git','fetch','origin','main']);sha=run(['git','rev-parse','origin/main'])
        state=target/'logs/auto_sync_state.json'
        if state.exists() and json.loads(state.read_text()).get('commit')==sha and (not args.publish or json.loads(state.read_text()).get('published')):print('Already synchronized: '+sha);return
        if not ci_passed(sha):print('Waiting for successful Offline checks on '+sha);return
        if not args.apply:print('CI-approved update available: '+sha);return
        run(['git','merge','--ff-only','origin/main'])
        services=[snapshot(target,name) for name in ('reference_server','kb_server','gateway')]
        python=services[0]['command'][0]
        subprocess.check_call([python,'-c','import fitz,course_runtime,json; from pdf_ocr import LocalOCR; assert course_runtime.fitz is not None; print("LOCAL OCR: "+json.dumps(LocalOCR().report()))'],cwd=str(ROOT/'app'))
        paths=[path[4:] for path in run(['git','ls-files','app']).splitlines() if path.startswith('app/')]
        cfg=load_config(target/'wrangler.jsonc',target) if args.publish else None
        backup=target/'backups'/('auto_sync_'+time.strftime('%Y%m%d_%H%M%S'));backup.mkdir(parents=True)
        install_files(ROOT/'app',target,backup,paths)
        try:
            for service in services:restart(target,service)
            health()
            if args.publish:
                # Preserve the existing Worker name, routing and bindings.
                # Omitting local vars prevents replacing its live origin.
                with tempfile.NamedTemporaryFile(mode='w',suffix='.json',dir=str(target),delete=False) as file:json.dump(cfg,file);config_path=file.name
                try:subprocess.check_call(['npx','--yes','wrangler@4.127.0','deploy','--config',config_path,'--keep-vars'],cwd=str(target))
                finally:os.unlink(config_path)
            state.write_text(json.dumps({'commit':sha,'updated_at':time.time(),'published':args.publish,'backup':str(backup)}))
            print('SYNC COMPLETE '+sha+'; backup '+str(backup))
        except Exception:
            restore_files(target,backup)
            for service in services:
                try:restart(target,service)
                except Exception:pass
            raise

if __name__=='__main__':main()
