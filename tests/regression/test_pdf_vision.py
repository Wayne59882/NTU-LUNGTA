"""Rendered-PDF local vision transport and pixel-review gates; no real model."""
import json
import os
from pathlib import Path
import sys
from unittest.mock import patch
import fitz

ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'app'))
from pdf_vision import LocalVision
import pdf_ingestion

with patch.dict(os.environ,{'VQ_PDF_VISION':'auto','VQ_PDF_VISION_HOST':'http://127.0.0.1:11435','VQ_PDF_VISION_MODEL':'fixture-local'}):
    document=fitz.open();page=document.new_page();page.insert_text((40,70),'Wave equation and second time derivative')
    reader=LocalVision();calls=[]
    def request(path,payload,timeout=180):
        calls.append((path,payload))
        if path=='/api/show':return {'capabilities':['completion','vision']}
        assert payload['messages'][1]['images'] and payload['model']=='fixture-local'
        if len([x for x in calls if x[0]=='/api/chat'])==1:return {'message':{'content':json.dumps({'blocks':[{'kind':'equation','text':r'$u_{tt}-\Delta u=0$','legible':True},{'kind':'figure','text':'A fabricated unreadable relation','legible':False}],'uncertainties':[]})}}
        return {'message':{'content':json.dumps({'approved_indices':[0],'uncertain':False})}}
    reader.request=request;result=reader.read(page)
    assert result['ok'] and result['reviewed'] and r'\Delta' in result['text'] and 'fabricated' not in result['text']
    assert result['excluded_blocks']==1 and len([x for x in calls if x[0]=='/api/chat'])==2
    # Run the actual ingestion path on a PDF page with no searchable text.
    scan=fitz.open();scan_page=scan.new_page()
    scan_page.insert_image(scan_page.rect,pixmap=page.get_pixmap())
    class NeverOCR:
        fingerprint='fixture-ocr'
        def read(self,page):raise AssertionError('vision succeeded; OCR must not overwrite it')
    calls[:]=[]
    ingested=pdf_ingestion.inspect_page(scan_page,4,ocr=NeverOCR(),vision=reader)
    assert ingested['extraction_method']=='local_vision' and ingested['image_content_read']
    assert ingested['page']==4 and r'\Delta' in ingested['text'] and ingested['status']=='partial'
    scan.close()
    # A model that only supports text must never be sent the PDF image.
    text_only=LocalVision();text_only.request=lambda *args,**kwargs:{'capabilities':['completion']}
    assert not text_only.read(page)['ok']
    document.close()
with patch.dict(os.environ,{'VQ_PDF_VISION_HOST':'https://cloud.example','VQ_PDF_VISION':'auto'}):
    cloud=LocalVision();cloud.request=lambda *args,**kwargs:(_ for _ in ()).throw(AssertionError('cloud transmission'))
    assert not cloud.probe()
print('PASS PDF rendering, local vision capability detection, base64 image transport, independent pixel review, uncertain-block exclusion and cloud prohibition; real vision accuracy not measured')
