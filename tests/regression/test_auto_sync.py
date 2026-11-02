"""Verify source installation/rollback without contacting a teaching server."""
import importlib.util
import json
from pathlib import Path
import tempfile

ROOT=Path(__file__).resolve().parents[2]
spec=importlib.util.spec_from_file_location('auto_sync',ROOT/'scripts/deploy/auto_sync.py')
sync=importlib.util.module_from_spec(spec);spec.loader.exec_module(sync)
with tempfile.TemporaryDirectory() as temporary:
    root=Path(temporary);source=root/'source';target=root/'target';backup=root/'backup'
    for path in (source,target,backup):path.mkdir()
    (source/'reference_server.py').write_text('new code')
    (source/'content_integrity.py').write_text('new module')
    (source/'wrangler.jsonc').write_text('{"name":"different-worker"}')
    (target/'reference_server.py').write_text('old code')
    (target/'wrangler.jsonc').write_text('{// existing settings\n"name":"lungta","compatibility_date":"2026-08-28","assets":{"directory":"web","binding":"ASSETS"},"vars":{"ORIGIN_URL":"https://current.example"},}')
    (target/'course_workspaces').mkdir();(target/'course_workspaces/original.pdf').write_bytes(b'private PDF')
    (target/'auth').mkdir();(target/'auth/auth.sqlite3').write_bytes(b'private accounts')
    sync.install_files(source,target,backup,['reference_server.py','content_integrity.py','wrangler.jsonc'])
    assert (target/'reference_server.py').read_text()=='new code'
    config=sync.load_config(target/'wrangler.jsonc',target)
    assert config['name']=='lungta' and config['keep_vars'] and 'vars' not in config
    assert config['compatibility_date']=='2026-08-28' and config['assets']['binding']=='ASSETS'
    sync.restore_files(target,backup)
    assert (target/'reference_server.py').read_text()=='old code'
    assert not (target/'content_integrity.py').exists()
    assert (target/'course_workspaces/original.pdf').read_bytes()==b'private PDF'
    assert (target/'auth/auth.sqlite3').read_bytes()==b'private accounts'
    try:sync.install_files(source,target,backup,['../outside.py'])
    except ValueError:pass
    else:raise AssertionError('unsafe path accepted')
print('PASS atomic source install/rollback, private PDF/account preservation, original Worker name/bindings and remote variables retained')
