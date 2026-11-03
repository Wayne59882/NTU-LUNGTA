"""Page-local PDF ingestion with durable checkpoints and explicit source gaps.

Original uploads stay private on the teaching server. Never guess font codes.
The cache stores one page per file so retrying a large book does not restart it.
"""
from __future__ import print_function
import hashlib
import json
import os
from pathlib import Path
import re
import time
from content_integrity import extract_page, text_issues
from pdf_ocr import LocalOCR
from pdf_vision import LocalVision,teaching_images

REVISION='R15'
# Figures on text-rich pages: read during the build (inline, the R15 method and
# default), or after lectures by a background task (background, faster course
# availability), or never (off). The default keeps the documented R15 method.
FIGURES_MODE=os.environ.get('VQ_PDF_VISION_FIGURES','inline').strip().lower()

def atomic_json(path,value):
    path=Path(path);path.parent.mkdir(parents=True,exist_ok=True)
    temporary=path.with_name(path.name+'.%s.tmp'%os.getpid())
    temporary.write_text(json.dumps(value,ensure_ascii=False),encoding='utf-8')
    os.replace(str(temporary),str(path))

def digest_file(path):
    digest=hashlib.sha256()
    with Path(path).open('rb') as stream:
        for block in iter(lambda:stream.read(1024*1024),b''):digest.update(block)
    return digest.hexdigest()

def inspect_page(page,number,ocr=None,activity=None,vision=None):
    ocr=ocr if ocr is not None else LocalOCR()
    vision=vision if vision is not None else LocalVision()
    native=False
    try:
        row=extract_page(page,number)
        row.update({'status':'readable' if row['text'] else 'blank','issues':[]})
        # Some slide PDFs have a searchable title over a scanned body.
        outlined=False
        drawings=getattr(page,'get_drawings',None) or getattr(page,'getDrawings',None)
        if drawings:
            try:
                paths=drawings()
                area=max(1,float(page.rect.width)*float(page.rect.height))
                # A vector chart can contain labels in the text layer but no
                # embedded raster images. Borders/underlines alone are ignored.
                outlined=bool(paths) if not row['text'] else len(paths)>=3 and any(float(path['rect'].width)*float(path['rect'].height)/area>=.12 for path in paths if path.get('rect'))
            except Exception:pass
        rich=sum(c.isalnum() for c in row['text'])>=160
        if not outlined and not teaching_images(page,row) and (not row.get('has_images') or rich):return row
        if rich and FIGURES_MODE!='inline':
            # Enough native text to teach from now; do not hold the whole
            # course build for a slow two-pass vision reading of this figure.
            if FIGURES_MODE!='off':row['figure_pending']=True
            return row
        native=bool(row['text'])
        row['status']='partial' if row['text'] else 'needs_review';row['issues']=['Sparse searchable text over image or outlined content; visual text requires OCR.']
    except Exception as error:
        # One symbol in a caption must not destroy all independent paragraphs.
        # Keep whole clean PDF blocks and explicitly record incomplete coverage.
        getter=getattr(page,'get_text',None) or getattr(page,'getText',None)
        good=[]
        try:
            for block in getter('blocks'):
                if len(block)>6 and block[6]!=0:continue
                value=str(block[4] or '').strip()
                if len(value)>=30 and not text_issues(value,check_math=False):good.append(value)
        except Exception:pass
        text='\n\n'.join(good)
        if sum(c.isalpha() for c in text)<40:text=''
        row={'page':int(number),'text':text,'status':'partial' if text else 'needs_review',
                'issues':[str(error)[:600]],'image_content_read':False}
    if activity:activity({'page':int(number),'status':'vision_running'},False)
    visual=vision.read(page);row['vision_config']=vision.fingerprint
    row['vision']={key:value for key,value in visual.items() if key!='text'}
    if visual.get('ok'):
        row.update({'text':(row['text']+'\n\n' if native else '')+visual['text'],'status':'partial','extraction_method':'local_vision','image_content_read':True,'ocr_config':ocr.fingerprint})
        row['issues'].append('Local visual transcription reviewed against page pixels; retain original page for verification.')
        return row
    if native and sum(c.isalnum() for c in row['text'])>=160:
        row['extraction_method']='native_text';row['ocr_config']=ocr.fingerprint
        row['issues'].append('Native text preserved; image relationships remain unread until local vision is available.')
        return row
    if activity:activity({'page':int(number),'status':'ocr_running'},False)
    recovered=ocr.read(page);row['ocr_config']=ocr.fingerprint
    row['ocr']={key:value for key,value in recovered.items() if key!='text'}
    row['ocr']['languages']=ocr.requested
    if recovered.get('ok'):
        row.update({'text':recovered['text'],'status':'partial','extraction_method':'local_ocr','image_content_read':False})
        row['issues'].append('Text recovered with local OCR; verify symbols, values, table layout and diagrams against the original PDF.')
    else:row['issues'].append(recovered.get('error','Local OCR unavailable.'))
    return row

def iter_pages(doc,start,end,cache_directory,source_identity,progress=None,ocr=None,vision=None):
    ocr=ocr if ocr is not None else LocalOCR()
    vision=vision if vision is not None else LocalVision()
    directory=Path(cache_directory)/hashlib.sha256((REVISION+'|'+source_identity).encode()).hexdigest()[:24]
    directory.mkdir(parents=True,exist_ok=True)
    for number in range(max(1,int(start)),min(int(end),doc.page_count)+1):
        path=directory/('%06d.json'%number);cached=False;row=None
        if path.exists():
            try:
                row=json.loads(path.read_text(encoding='utf-8'))
                cached=row.get('page')==number and row.get('status') in ('readable','blank','partial')
                if row.get('status')=='partial':cached=cached and row.get('ocr_config')==ocr.fingerprint and row.get('vision_config')==vision.fingerprint
            except Exception:pass
        if not cached:
            row=inspect_page(doc[number-1],number,ocr,progress,vision)
            atomic_json(path,row)
        if progress:progress(row,cached)
        yield row

def unit_quality(rows):
    warnings=[{'page':r['page'],'status':r['status'],'issues':r.get('issues',[]),'ocr':r.get('ocr'),'vision':r.get('vision')} for r in rows if r['status'] in ('partial','needs_review')]
    usable=sum(bool(r.get('text')) for r in rows)
    return {'revision':REVISION,'pages':len(rows),'usable_pages':usable,'warnings':warnings,
            'complete':not warnings,'status':'partial' if warnings and usable else 'needs_review' if not usable else 'readable'}

def write_receipt(stage_directory,file_path,display_name):
    path=Path(file_path)
    receipt={'file_name':path.name,'display_name':Path(display_name).name,'size_bytes':path.stat().st_size,
             'sha256':digest_file(path),'received_at':time.time(),'upload_received':True,'inspection_status':'received'}
    atomic_json(Path(stage_directory)/'receipts'/(path.name+'.json'),receipt)
    return receipt

def upload_diagnostics(stage_directory,ocr_report=None,vision_report=None):
    directory=Path(stage_directory)
    receipts=[]
    for path in sorted((directory/'receipts').glob('*.json')):
        try:receipts.append(json.loads(path.read_text(encoding='utf-8')))
        except Exception:pass
    known={row['file_name'] for row in receipts}
    for path in sorted((directory/'source').glob('*.pdf')):
        if path.name not in known:
            receipts.append({'file_name':path.name,'display_name':path.name,'size_bytes':path.stat().st_size,
                             'received_at':path.stat().st_mtime,'upload_received':True,'inspection_status':'legacy-staged'})
    transfers=[]
    for path in sorted((directory/'_uploads').glob('*.json')):
        try:
            row=json.loads(path.read_text(encoding='utf-8'))
            transfers.append({'upload_id':path.stem,'name':row.get('name',''),'size_bytes':row.get('size',0),
                'received_bytes':row.get('offset',0),'complete':bool(row.get('complete')),
                'created_at':row.get('created_at') or path.stat().st_ctime,'updated_at':row.get('updated_at') or path.stat().st_mtime})
        except (ValueError,OSError):pass
    job={}
    if (directory/'build_job.json').exists():
        try:job=json.loads((directory/'build_job.json').read_text(encoding='utf-8'))
        except Exception:pass
    return {'stage_id':directory.name,'received_files':receipts,'transfers':transfers,'build_job':job,'local_ocr':ocr_report if ocr_report is not None else LocalOCR().report(),'local_vision':vision_report if vision_report is not None else LocalVision().report()}
