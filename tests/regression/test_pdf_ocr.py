"""Real local OCR on an image-only PDF plus glyph salvage and cache checks."""
import io
import json
import os
from pathlib import Path
import sys
import tempfile
import time
from unittest.mock import patch

ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'app'))
import fitz
import gateway
import course_runtime as cr
import pdf_ingestion as ingestion
from pdf_ocr import LocalOCR,parse_tsv

os.environ['VQ_PDF_OCR']='auto'
os.environ['VQ_PDF_VISION']='off'
engine=LocalOCR(languages='eng')
assert not engine.error,engine.report()
with tempfile.TemporaryDirectory() as temporary:
    directory=Path(temporary)
    source=fitz.open();page=source.new_page(width=612,height=792)
    paragraph=('Genomics studies gene expression and molecular regulation.\n'
        'Transcriptome analysis measures RNA abundance in biological samples.\n'
        'Compare the experimental results with the control group.\n'
        'Validate the findings using independent measurements.')
    page.insert_text((45,90),paragraph,fontsize=14)
    pixmap=page.get_pixmap(matrix=fitz.Matrix(2,2));scan=fitz.open()
    scan.new_page(width=612,height=792).insert_image(page.rect,pixmap=pixmap)
    scan.save(str(directory/'scan.pdf'));source.close();scan.close()
    events=[]
    with fitz.open(str(directory/'scan.pdf')) as document:
        assert not document[0].get_text().strip()
        rows=list(ingestion.iter_pages(document,1,1,directory/'cache','scan-test',lambda row,cached:events.append((row['status'],cached)),ocr=engine))
        recovered=rows[0]
        assert recovered['extraction_method']=='local_ocr' and 'Transcriptome' in recovered['text'],recovered
        assert recovered['ocr']['accepted_paragraphs']>=1 and recovered['ocr']['mean_confidence']>=80
        assert recovered['status']=='partial' and not recovered['image_content_read']
        assert events[0][0]=='vision_running' and any(event[0]=='ocr_running' for event in events)
        # A restart uses saved OCR, not another rasterization/subprocess.
        engine.read=lambda page:(_ for _ in ()).throw(AssertionError('OCR cache was not reused'))
        cached=list(ingestion.iter_pages(document,1,1,directory/'cache','scan-test',ocr=engine))
        assert cached==rows

    # The full upload/build path accepts a scan. Installing/enabling OCR later
    # repairs it from the saved original without losing an unchanged unit bank.
    course_pdf=fitz.open(str(directory/'scan.pdf'))
    native=course_pdf.new_page(width=612,height=792);native.insert_text((45,90),paragraph,fontsize=14)
    course_pdf.set_toc([[1,'Scanned transcriptome',1],[1,'Readable validation',2]])
    course_pdf.save(str(directory/'mixed.pdf'));course_pdf.close()
    cr.COURSE_ROOT=directory/'courses';cr.STAGING_ROOT=cr.COURSE_ROOT/'_staging';cr.STAGING_ROOT.mkdir(parents=True)
    manager=cr.CourseManager();manager._start_preparation=lambda *args,**kwargs:None
    model=lambda *args:(_ for _ in ()).throw(AssertionError('unexpected language-model call'))
    os.environ['VQ_PDF_OCR']='off'
    stage=manager.inspect([('mixed.pdf',directory/'mixed.pdf')],course_name='Genomics')
    # Also cover the all-image upload inspector, which previously refused it.
    scanned_stage=manager.inspect([('scan.pdf',directory/'scan.pdf')],course_name='Genomics')
    assert scanned_stage['sources'][0]['ocr_recommended']
    jid='scan-job';cid='scan-course';job={'id':jid,'stage_id':stage['stage_id'],'course_id':cid,'selected':stage['units'],'status':'queued'}
    manager.jobs[jid]=job;cr._json_dump(manager._job_path(jid),job)
    manager._build(jid,stage,stage['units'],cid,'Genomics','none','gemma',model)
    manifest=manager.manifest(cid);assert manifest['units'][0]['source_blocked']
    native_uid=manifest['units'][1]['id'];cd=manager._course_dir(cid)
    native_chunks=[row for row in map(json.loads,(cd/'chunks.jsonl').read_text().splitlines()) if row['unit_id']==native_uid]
    cr._json_dump(cd/'question_banks.json',{native_uid:[{'saved':'approved native bank'}]})
    manager._update_manifest(cid,lambda m:m['units'][1].update({'script':'Existing lecture','script_status':'ready','question_count':1}))
    os.environ['VQ_PDF_OCR']='auto';os.environ['VQ_PDF_OCR_LANGS']='eng'
    manager.retry_preparation(cid,'gemma',model)
    deadline=time.monotonic()+10
    while time.monotonic()<deadline and manager.manifest(cid)['preparation']['sources']['status']=='preparing':time.sleep(.05)
    repaired=manager.manifest(cid)
    assert repaired['preparation']['sources']['status']=='ready',repaired
    assert not repaired['units'][0]['source_blocked'] and 'Transcriptome' in (cd/'units'/(stage['units'][0]['id']+'.txt')).read_text()
    assert repaired['units'][1]['script']=='Existing lecture'
    assert json.loads((cd/'question_banks.json').read_text())[native_uid]==[{'saved':'approved native bank'}]
    assert [row for row in map(json.loads,(cd/'chunks.jsonl').read_text().splitlines()) if row['unit_id']==native_uid]==native_chunks

# Glyph corruption preserves independent clean paragraphs if OCR cannot run.
class BrokenPage:
    def get_text(self,kind,**kwargs):
        if kind=='text':return '\ue001 bad font mapping'
        if kind=='dict':return {'blocks':[]}
        return [(0,0,1,1,'Genomics studies gene expression and molecular regulation in biological samples.',0,0),
                (0,0,1,1,'\ue001 corrupted caption',1,0),(0,0,1,1,'<image metadata must not be used>',2,1)]
class Unavailable:
    fingerprint='unavailable';requested='eng'
    def read(self,page):return {'ok':False,'error':'missing engine'}
salvaged=ingestion.inspect_page(BrokenPage(),7,Unavailable())
assert salvaged['status']=='partial' and 'Genomics' in salvaged['text'] and '\ue001' not in salvaged['text'] and 'metadata' not in salvaged['text']

# A low-confidence negation rejects the entire paragraph, not just one word.
header='level\tpage_num\tblock_num\tpar_num\tline_num\tword_num\tconf\ttext\n'
raw=header+'5\t1\t1\t1\t1\t1\t99\tGenes\n5\t1\t1\t1\t1\t2\t20\tnot\n5\t1\t1\t1\t1\t3\t99\texpressed\n'
assert not parse_tsv(raw)['ok']
with patch.dict(os.environ,{'VQ_PDF_OCR':'off'}):assert not LocalOCR().report()['available']

# The authenticated gateway streams original PDFs in bounded reads and retains
# their filename. It does not buffer a thousand-page original or skip auth.
class Response:
    status=200;headers={'Content-Type':'application/pdf','Content-Length':'2097152','Content-Disposition':'attachment; filename="source.pdf"'}
    def __init__(self):self.remaining=2097152;self.sizes=[]
    def __enter__(self):return self
    def __exit__(self,*args):pass
    def read(self,size=None):
        assert size==1048576,'unbounded PDF proxy read'
        self.sizes.append(size);length=min(size,self.remaining);self.remaining-=length;return b'x'*length
handler=object.__new__(gateway.H);handler.path='/api/reference/course-upload-source?stage_id=own&file=source.pdf';handler.command='GET'
handler.headers={};handler.rfile=io.BytesIO();handler.wfile=io.BytesIO();headers={};statuses=[]
handler.send_response=statuses.append;handler.send_header=lambda name,value:headers.__setitem__(name,value);handler.end_headers=lambda:None
response=Response()
with patch.object(gateway.AUTH,'user_from_request',return_value={'id':1}),patch.object(gateway.AUTH,'authorize',return_value=(None,{})),patch.object(gateway.urllib.request,'urlopen',return_value=response):
    assert handler._proxy()
assert statuses==[200] and len(handler.wfile.getvalue())==2097152 and 'source.pdf' in headers['Content-Disposition']
with patch.object(gateway.AUTH,'user_from_request',return_value=None),patch.object(gateway.urllib.request,'urlopen',side_effect=AssertionError('unauthorized backend access')):
    assert handler._proxy() and statuses[-1]==401
print('PASS real scanned-PDF local OCR, confidence/negation gate, glyph-block salvage, OCR checkpoint reuse, missing-engine status, authenticated bounded original download')
