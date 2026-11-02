#!/usr/bin/env python3
"""Build a complete manual-deployment ZIP from an exact clean Git commit."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tarfile
import tempfile
import zipfile

ROOT=Path(__file__).resolve().parents[1]


def package(output,report=None):
    if subprocess.check_output(['git','status','--porcelain','--untracked-files=normal'],cwd=ROOT).strip():
        raise RuntimeError('Commit source changes before packaging; the ZIP must match GitHub source')
    commit=subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT).decode().strip()
    output=Path(output).resolve();output.parent.mkdir(parents=True,exist_ok=True)
    prefix=output.stem+'/';manifest={'revision':'R14','source_commit':commit,'files':[]}
    with tempfile.TemporaryDirectory(prefix='mc-vhta-release-') as temporary:
        archive=Path(temporary)/'source.tar'
        subprocess.check_call(['git','archive','--format=tar','--output',str(archive),'HEAD'],cwd=ROOT)
        pending=Path(temporary)/'release.zip'
        with tarfile.open(archive) as source,zipfile.ZipFile(pending,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as bundle:
            for member in source:
                if member.isdir():continue
                path=Path(member.name)
                if not member.isfile() or path.is_absolute() or '..' in path.parts:raise ValueError('Unsupported source archive entry')
                info=zipfile.ZipInfo(prefix+member.name);info.compress_type=zipfile.ZIP_DEFLATED
                info.external_attr=(member.mode | 0o100000)<<16
                digest=hashlib.sha256()
                with source.extractfile(member) as stream,bundle.open(info,'w') as destination:
                    for block in iter(lambda:stream.read(1024*1024),b''):
                        digest.update(block);destination.write(block)
                if member.name.startswith('app/'):
                    manifest['files'].append({'path':member.name,'sha256':digest.hexdigest(),'size_bytes':member.size})
            bundle.writestr(prefix+'RELEASE_FILES.json',json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
            bundle.writestr(prefix+'START_HERE_ZH_TW.md',
                '# R14 完整更新包\n\n'
                '完整程式在 app/；既有伺服器更新使用根目錄 UPDATE_EXISTING_SERVER.sh。\n\n'
                '1. 解壓在舊程式旁邊，不要直接覆蓋舊資料夾。\n'
                '2. 由原本啟動服務的使用者登入伺服器，在這個新資料夾執行：\n\n'
                '```bash\nbash UPDATE_EXISTING_SERVER.sh /path/to/existing/live/app\n```\n\n'
                '最後一個路徑改成放有 reference_server.py 的舊程式目錄。\n'
                '掃描 PDF 另需本機 Tesseract 與 eng、chi_tra 語言資料。\n'
                '完整步驟、OCR 安裝與確認方式見 [更新說明](docs/manual-release.md)。\n\n'
                '來源 commit：'+commit+'。本包未包含私人教材、帳號、密碼或模型權重。\n')
            if report:bundle.write(Path(report),prefix+'VALIDATION_REPORT.json')
        with zipfile.ZipFile(pending) as verify:
            bad=verify.testzip()
            if bad:raise RuntimeError('ZIP integrity check failed: '+bad)
        shutil.copy2(pending,output)
    return {'path':str(output),'source_commit':commit,'application_files':len(manifest['files']),'size_bytes':output.stat().st_size}


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',required=True,type=Path)
    parser.add_argument('--report',type=Path)
    args=parser.parse_args();print(json.dumps(package(args.output,args.report),ensure_ascii=False))
