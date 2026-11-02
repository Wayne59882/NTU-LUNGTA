"""ZIP-integrity gate, offline update dry run and failed-health rollback."""
import hashlib
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'scripts/deploy'))
import apply_release as release


def fixture(directory):
    source=directory/'bundle';target=directory/'live';source.mkdir();target.mkdir()
    (source/'app').mkdir();rows=[]
    for name in ('reference_server.py','kb_server.py','gateway.py','pdf_ocr.py','wrangler.jsonc'):
        data=('new '+name).encode();(source/'app'/name).write_bytes(data)
        rows.append({'path':'app/'+name,'sha256':hashlib.sha256(data).hexdigest()})
    (source/'RELEASE_FILES.json').write_text(json.dumps({'source_commit':'fixture-commit','files':rows}))
    for name in ('reference_server.py','kb_server.py','gateway.py'):(target/name).write_text('old '+name)
    config='{"name":"existing-worker","assets":{"directory":"web"},"vars":{"ORIGIN_URL":"https://current.example"}}'
    (target/'wrangler.jsonc').write_text(config)
    (target/'auth').mkdir();(target/'auth/accounts.sqlite3').write_bytes(b'private accounts')
    (target/'course_workspaces').mkdir();(target/'course_workspaces/book.pdf').write_bytes(b'private book')
    return source,target,config


with tempfile.TemporaryDirectory() as temporary:
    directory=Path(temporary)
    for mode in ('check','apply','rollback'):
        case=directory/mode;case.mkdir();source,target,config=fixture(case)
        manifest,paths=release.validate_bundle(source);assert len(paths)==5
        old=(source/'app/pdf_ocr.py').read_bytes();(source/'app/pdf_ocr.py').write_bytes(b'changed')
        try:release.validate_bundle(source)
        except ValueError:pass
        else:raise AssertionError('corrupt release accepted')
        (source/'app/pdf_ocr.py').write_bytes(old)
        calls=[]
        def snapshot(target,name):return {'command':[sys.executable],'name':name,'pid':1}
        argv=['apply_release.py','--target',str(target),'--publish']+(['--check-only'] if mode=='check' else [])
        with patch.object(release,'ROOT',source),patch.object(sys,'argv',argv),patch.object(release.sync,'snapshot',side_effect=snapshot),patch.object(release.subprocess,'check_call',return_value=0),patch.object(release.sync,'restart',side_effect=lambda target,service:calls.append(service['name'])),patch.object(release.sync,'health',side_effect=RuntimeError('health fixture failed') if mode=='rollback' else None):
            if mode=='rollback':
                try:release.main()
                except RuntimeError as error:assert 'health fixture failed' in str(error)
                else:raise AssertionError('health failure ignored')
            else:release.main()
        assert (target/'wrangler.jsonc').read_text()==config
        assert (target/'auth/accounts.sqlite3').read_bytes()==b'private accounts'
        assert (target/'course_workspaces/book.pdf').read_bytes()==b'private book'
        if mode=='apply':
            assert (target/'reference_server.py').read_text()=='new reference_server.py'
            assert (target/'pdf_ocr.py').exists() and len(calls)==3
            assert json.loads((target/'logs/manual_release_state.json').read_text())['published']
        else:
            assert (target/'reference_server.py').read_text()=='old reference_server.py'
            assert not (target/'pdf_ocr.py').exists()
            if mode=='check':assert not calls and not (target/'logs').exists()
            else:assert len(calls)==6
    # An archive cannot supply a file outside its application subtree.
    manifest['files'][0]['path']='app/../escape.py'
    (source/'RELEASE_FILES.json').write_text(json.dumps(manifest))
    try:release.validate_bundle(source)
    except ValueError:pass
    else:raise AssertionError('path escape accepted')
print('PASS manual ZIP checksums/path guard, no-write preflight, existing Worker/private-data preservation, restart sequence and failed-health rollback')
