#!/usr/bin/env python3
"""Apply a verified ZIP release to an existing server, without Git or SSH."""
from __future__ import print_function
import argparse
import fcntl
import hashlib
import json
import os
from pathlib import Path
import subprocess
import tempfile
import time
import auto_sync as sync

ROOT=Path(__file__).resolve().parents[2]


def validate_bundle(root):
    root=Path(root).resolve()
    manifest=json.loads((root/'RELEASE_FILES.json').read_text(encoding='utf-8'))
    files=manifest.get('files')
    if not isinstance(files,list) or not files:raise ValueError('Release file manifest is missing or empty')
    paths=[]
    for row in files:
        relative=row['path'];path=Path(relative)
        if path.is_absolute() or '..' in path.parts or not relative.startswith('app/'):
            raise ValueError('Invalid release application path')
        source=root/path
        if source.is_symlink() or not source.is_file() or root not in source.resolve().parents:
            raise ValueError('Invalid or missing release file: '+relative)
        digest=hashlib.sha256()
        with source.open('rb') as stream:
            for block in iter(lambda:stream.read(1024*1024),b''):digest.update(block)
        if digest.hexdigest()!=row.get('sha256'):raise ValueError('Release file checksum mismatch: '+relative)
        paths.append(relative[4:])
    if len(set(paths))!=len(paths):raise ValueError('Duplicate release files')
    if not {'reference_server.py','kb_server.py','gateway.py','pdf_ocr.py'}.issubset(set(paths)):
        raise ValueError('This is not a complete R16 application release')
    return manifest,paths


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--target',required=True,help='Existing live directory containing reference_server.py')
    parser.add_argument('--publish',action='store_true',help='Also publish the existing Cloudflare Worker')
    parser.add_argument('--check-only',action='store_true',help='Validate release and target; change nothing')
    args=parser.parse_args();target=Path(args.target).resolve()
    manifest,paths=validate_bundle(ROOT)
    if not (target/'reference_server.py').is_file():raise RuntimeError('Existing live application not found; no files changed')
    if target==ROOT or target==ROOT/'app':raise RuntimeError('Unzip beside the existing application, not over it')
    services=sync.plan_services(target)
    python=services[0]['command'][0]
    subprocess.check_call([python,'-c','import fitz,course_runtime,kb_server,reference_server,gateway,json; from model_lock import SharedModelLock; from pdf_ocr import LocalOCR; from pdf_vision import LocalVision; assert course_runtime.fitz is not None; assert kb_server.SharedModelLock is reference_server.SharedModelLock is SharedModelLock; print("LOCAL OCR: "+json.dumps(LocalOCR().report())); print("LOCAL VISION: "+json.dumps(LocalVision().report()))'],cwd=str(ROOT/'app'))
    cfg=sync.load_config(target/'wrangler.jsonc',target) if args.publish else None
    if args.check_only:
        print('CHECK PASSED: release checksums, existing services, Python and Worker configuration; no files changed')
        return
    (target/'logs').mkdir(exist_ok=True)
    with (target/'logs/auto_sync.lock').open('w') as lock:
        try:fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
        except BlockingIOError:raise RuntimeError('Another update is running; no files changed')
        # Recheck PIDs under the lock so a concurrent updater cannot leave stale
        # process snapshots. The same lock is used by the optional Git updater.
        services=sync.plan_services(target)
        backup=target/'backups'/('manual_R16_'+time.strftime('%Y%m%d_%H%M%S'));backup.mkdir(parents=True)
        sync.install_files(ROOT/'app',target,backup,paths)
        try:
            for service in services:sync.restart(target,service)
            sync.health(services)
            if args.publish:
                with tempfile.NamedTemporaryFile(mode='w',suffix='.json',dir=str(target),delete=False) as file:
                    json.dump(cfg,file);config_path=file.name
                try:subprocess.check_call(['npx','--yes','wrangler@4.127.0','deploy','--config',config_path,'--keep-vars'],cwd=str(target))
                finally:os.unlink(config_path)
            state={'commit':manifest.get('source_commit'),'updated_at':time.time(),'published':args.publish,'backup':str(backup),'method':'manual_zip'}
            (target/'logs/manual_release_state.json').write_text(json.dumps(state))
            print('UPDATE COMPLETE; commit '+str(manifest.get('source_commit'))+'; backup '+str(backup))
        except Exception:
            sync.restore_files(target,backup)
            sync.restore_services(target,services)
            raise


if __name__=='__main__':main()
