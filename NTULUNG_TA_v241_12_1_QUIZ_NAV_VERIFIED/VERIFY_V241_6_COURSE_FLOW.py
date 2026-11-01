#!/usr/bin/env python3
"""Local integration check. Uses generated PDFs and a mock LLM/embedding backend."""
from __future__ import print_function
import json, re, shutil, tempfile, threading, time, urllib.error, urllib.request, uuid
from pathlib import Path

import fitz
import course_runtime as cr
import reference_server as ref
import gateway
import feedback.feedback_service as feedback_service
from reference_server import ThreadingHTTPServer
from http.server import BaseHTTPRequestHandler


def make_pdf(label,respiratory=False):
    doc=fitz.open()
    headings=['Cover','IFC','Title','Copyright','Chapter 1: Foundations','Chapter 1: Foundations','Chapter 2: Applications','Chapter 2: Applications']
    subjects=(['alveolar ventilation','pulmonary perfusion','oxygen diffusion','carbon dioxide transport','airway resistance','lung compliance','tidal volume','functional residual capacity','minute ventilation','dead space','hemoglobin saturation','partial pressure','respiratory rhythm','pleural pressure','elastic recoil','surface tension','bronchial tone','capillary transit','regional perfusion','inspired oxygen','mixed venous blood','arterial content','diffusion capacity','ventilation ratio','oxygen delivery','metabolic demand','pulmonary shunt','hypoxic vasoconstriction','alveolar pressure','dynamic compression','respiratory workload','gas solubility'] if respiratory else ['covalent bonding','atomic orbital','reaction kinetics','molecular geometry','electron affinity','activation energy','equilibrium constant','crystal lattice','organic synthesis','catalytic pathway','spectral analysis','aqueous solution','redox potential','chemical isotope','polymer structure','transition metal','acid dissociation','molar concentration','reaction quotient','coordination complex','nuclear spin','aromatic compound','stereochemical center','ionic strength','phase transition','quantum state','chemical potential','bond enthalpy','rate constant','solvent polarity','molecular symmetry','electrochemical cell'])
    for i,heading in enumerate(headings):
        page=doc.new_page() if hasattr(doc,'new_page') else doc.newPage()
        put=page.insert_text if hasattr(page,'insert_text') else page.insertText
        for j in range(24):
            n=(i*24+j)%len(subjects);subject=subjects[n]
            other=subjects[(n+7)%len(subjects)]
            text='%s changes %s because regulated pathway %s preserves measurable physiology.'%(subject,other,i*24+j+11)
            put((54,55+j*30),text[:112],fontsize=7)
    toc=[[1,'Cover',1],[1,'IFC',2],[1,'Title',3],[1,'Copyright',4],[1,'Chapter 1: Foundations',5],[1,'Chapter 2: Applications',7]]
    (doc.set_toc if hasattr(doc,'set_toc') else doc.setToC)(toc)
    doc.set_metadata({'title':'Unhelpful {publisher/import} libgen.li'}) if hasattr(doc,'set_metadata') else doc.setMetadata({'title':'Unhelpful {publisher/import} libgen.li'})
    b=doc.tobytes() if hasattr(doc,'tobytes') else doc.write()
    doc.close()
    return b


def request(url,body=None,content_type='application/json'):
    data=None if body is None else (body if isinstance(body,bytes) else json.dumps(body).encode('utf-8'))
    req=urllib.request.Request(url,data=data,headers={'Content-Type':content_type} if data is not None else {})
    with urllib.request.urlopen(req,timeout=20) as response:
        return response.status,json.loads(response.read().decode('utf-8'))


def multipart(name,content,course_name='Pharmacology',stage_id=''):
    boundary='course-test-'+uuid.uuid4().hex
    parts=[]
    for key,value in [('course_name',course_name),('stage_id',stage_id)]:
        if not value:continue
        parts.append(('--'+boundary+'\r\nContent-Disposition: form-data; name="'+key+'"\r\n\r\n'+value+'\r\n').encode('utf-8'))
    parts.append(('--'+boundary+'\r\nContent-Disposition: form-data; name="pdf"; filename="'+name+'"\r\nContent-Type: application/pdf\r\n\r\n').encode('utf-8')+content+b'\r\n')
    parts.append(('--'+boundary+'--\r\n').encode('utf-8'))
    return b''.join(parts),'multipart/form-data; boundary='+boundary


def chunk_request(base,stage_id,upload_id,name,data,total,offset):
    boundary='course-chunk-'+uuid.uuid4().hex
    parts=[]
    for key,value in [('stage_id',stage_id),('upload_id',upload_id),('file_name',name),('total_size',str(total)),('offset',str(offset)),('course_name','Respiratory Teaching')]:
        parts.append(('--'+boundary+'\r\nContent-Disposition: form-data; name="'+key+'"\r\n\r\n'+value+'\r\n').encode())
    parts.append(('--'+boundary+'\r\nContent-Disposition: form-data; name="chunk"; filename="part.pdf"\r\nContent-Type: application/octet-stream\r\n\r\n').encode()+data+b'\r\n')
    parts.append(('--'+boundary+'--\r\n').encode())
    return request(base+'/api/reference/course-upload-chunk',b''.join(parts),'multipart/form-data; boundary='+boundary)


def wait_for(fn,description):
    for _ in range(200):
        result=fn()
        if result:return result
        time.sleep(.05)
    raise AssertionError('Timed out waiting for '+description)


def main():
    root=Path(tempfile.mkdtemp(prefix='vq-course-flow-'))
    servers=[]
    try:
        repaired=cr._clean_text('e rug es  he y. e s nenrin is eerine y srin.')
        assert 'The drug does to the body.' in repaired and 'plasma concentration is determined by absorption.' in repaired,repaired
        assert not cr._PDF_PRIVATE.search(repaired)
        assert cr._question_sentences([{'id':'glyph_1','text':'e plasma concentration of a drug depends on the rate and extent of absorption versus elimination.'}])
        assert not cr._question_sentences([{'id':'bad_1','text':'The drug  and plasma concentration depend on a very long sentence about the effect of absorption versus elimination.'}])
        safe=cr._safe_source_text('The uncertain ratio is 0.7. The verified statement concerns absorption and elimination of a drug in the body.')
        assert '0.' not in safe and 'verified statement' in safe and not cr._PDF_PRIVATE.search(safe),safe
        print('[OK] Actual reported PDF subset glyphs decode; unknown glyph facts are rejected')
        abbreviations=cr._candidate_terms('The V/Q ratio changes when alveolar ventilation exceeds pulmonary perfusion in the patient.',{},8)
        assert any(term['value']=='V/Q' for term in abbreviations),abbreviations
        assert any(term['value']=='IV' for term in cr._candidate_terms('IV infusion delivers the drug into systemic circulation in a patient.',{},8))
        print('[OK] Short clinical abbreviations remain eligible as question concepts')
        cr.COURSE_ROOT=root;cr.STAGING_ROOT=root/'_staging';cr.STAGING_ROOT.mkdir();feedback_service.DB_PATH=root/'feedback.sqlite3'
        manager=cr.CourseManager();cr.COURSES=manager;ref.COURSES=manager
        class LimitedEmbedding(BaseHTTPRequestHandler):
            def log_message(self,*args):pass
            def do_POST(self):
                body=json.loads(self.rfile.read(int(self.headers['Content-Length'])).decode('utf-8'))
                items=body['input'] if isinstance(body['input'],list) else [body['input']]
                bad='invalid model' if body['model']=='invalid' or any('permanent-rejection' in x for x in items) else ('input too long' if any(len(x)>500 for x in items) else '')
                response=json.dumps({'error':bad} if bad else {'embeddings':[[1.0]+[0.0]*1023 for _ in items]}).encode('utf-8')
                self.send_response(400 if bad else 200);self.send_header('Content-Type','application/json');self.send_header('Content-Length',str(len(response)));self.end_headers();self.wfile.write(response)
        es=ThreadingHTTPServer(('127.0.0.1',0),LimitedEmbedding);servers.append(es)
        threading.Thread(target=es.serve_forever,daemon=True).start()
        cr.EMBED_BASE='http://127.0.0.1:%d'%es.server_address[1]
        vectors=cr._embed_resilient(['pulmonary physiology '*140,'gas exchange '*160])
        assert len(vectors)==2 and len(vectors[0])==1024
        try:cr._embed_resilient(['permanent-rejection'])
        except RuntimeError as error:assert 'invalid model' in str(error) and 'bge-m3' in str(error)
        else:raise AssertionError('Permanent embedding HTTP 400 was not diagnosed')
        print('[OK] Embedding HTTP 400: batch split, input cleanup/shortening, and actionable Ollama error')
        real_embed=cr._embed
        index_gate=threading.Event()
        def gated_embed(items,timeout=240):
            index_gate.wait(10)
            return [[1.0]+[0.0]*1023 for _ in (items if isinstance(items,list) else [items])]
        cr._embed=gated_embed
        report_prompts=[]
        def fake_model(server,model,system,user,max_tokens):
            if 'EXAM_MCQ_GENERATE' in system:
                evidence=json.loads(user.split('EVIDENCE_JSON:\n',1)[1]);items=[]
                for source in evidence:
                    stem='In a physiology exercise, the observed relation is described as follows: '+source['anchor']+' Which interpretation is best supported?'
                    items.append({'evidence_id':source['id'],'stem':stem,
                        'choices':['The first named factor changes the second under the described condition.',
                                   'The first named factor has no relation to the second factor.',
                                   'The second factor must remain constant under every condition.',
                                   'Neither factor participates in the measured physiology.'],
                        'answer':0,'choice_explanations':['This follows the direction described by the supplied course fact.',
                            'The course fact explicitly describes a change, so no relation is unsupported.',
                            'The source describes a change, so an invariant result is unsupported.',
                            'The source describes the physiological relation of the two factors.']})
                return json.dumps({'questions':items})
            if 'EXAM_MCQ_REVIEW' in system:
                items=json.loads(user.split('QUESTIONS_AND_EVIDENCE_JSON:\n',1)[1])
                return json.dumps({'reviews':[{'evidence_id':q['evidence_id'],'valid':True,'best_choice':0} for q in items]})
            if 'Student report (untrusted preference' in user:report_prompts.append(user)
            if 'second-stage physiology answer reviewer' in system:return json.dumps({'verdict':'pass','corrected_answer':''})
            if '以繁體中文撰寫可直接朗讀的課堂講稿' in system:
                return '\n\n'.join(['在這個單元，先了解教材所描述的生理概念，再觀察它與另一個變項之間的關係。根據提供的敘述，當條件改變時，相關的測量結果也會受到影響；我們要以原文的因果關係來解釋，而不是只背誦名稱。']*6)
            if '大學課程情境題出題者' in system:
                facts=json.loads(user.split('教材知識點各寫一題情境題：\n',1)[1].split('\n上次輸出無效',1)[0])
                questions=[]
                for fact in facts:
                    questions.append({'id':fact['id'],'stem':'一位學生在實驗室觀察課程中的變項，發現測量結果隨條件改變。他向治療師說明自己的推論。根據這個單元的教材敘述，哪一項說法最適合解釋這個情境？',
                        'choices':['應根據教材所述的調節關係解釋觀察結果','所有觀察結果都與條件完全無關','只有單一名稱相同就代表機轉完全相同','不需比較條件也能斷定所有結果一致'],
                        'answer':0,'explanation':'教材明確將變項與測量結果連結，應依據提供的原句解釋觀察；其他選項忽略條件或做出缺乏證據的絕對化判斷。',
                        'evidence_quote':fact['course_statement'][:35]})
                return json.dumps({'questions':questions},ensure_ascii=False)
            return 'Ventilation and perfusion must remain appropriately matched because either reduced airflow or reduced blood flow limits effective alveolar gas exchange.'
        ref.course_model_call=fake_model
        rs=ThreadingHTTPServer(('127.0.0.1',0),ref.Handler);rs.mode='mock'
        rs.model_lock=ref.SharedModelLock(str(root/'model.lock'));rs.local_job_semaphore=threading.Semaphore(1)
        rs.jobs={};rs.jobs_lock=threading.Lock();rs.active_model_key=None;rs.active_model_tag=None;rs.active_model_base=None;rs.installed_models=set()
        servers.append(rs);threading.Thread(target=rs.serve_forever,daemon=True).start()
        gateway.REF='http://127.0.0.1:%d'%rs.server_address[1]
        gs=ThreadingHTTPServer(('127.0.0.1',0),gateway.H);servers.append(gs)
        threading.Thread(target=gs.serve_forever,daemon=True).start()
        base='http://127.0.0.1:%d'%gs.server_address[1]
        pdf=make_pdf('Respiratory',True);stage_id='stage-'+uuid.uuid4().hex[:12];upload_id='upload-'+uuid.uuid4().hex[:12]
        middle=len(pdf)//2
        status,out=chunk_request(base,stage_id,upload_id,'Respiratory.pdf',pdf[:middle],len(pdf),0)
        assert status==200 and out['offset']==middle and not out['complete']
        # The browser can reconnect to a new server process using only IDs and the saved File.
        restarted=cr.CourseManager();ref.COURSES=restarted
        _,partial=request(base+'/api/reference/course-upload-status?stage_id='+stage_id+'&upload_id='+upload_id)
        assert partial['offset']==middle and not partial['complete']
        status,out=chunk_request(base,stage_id,upload_id,'Respiratory.pdf',pdf[middle:],len(pdf),middle)
        assert status==200 and out['complete']
        _,lost_reply=request(base+'/api/reference/course-upload-status?stage_id='+stage_id+'&upload_id='+upload_id)
        assert lost_reply['complete'] and len(lost_reply['inspection']['sources'])==1
        meta_path=root/'_staging'/stage_id/'_uploads'/(upload_id+'.json')
        part_path=root/'_staging'/stage_id/'_uploads'/(upload_id+'.part')
        unfinished=json.loads(meta_path.read_text(encoding='utf-8'));unfinished['complete']=False
        meta_path.write_text(json.dumps(unfinished),encoding='utf-8');part_path.write_bytes(pdf)
        _,lost_final=request(base+'/api/reference/course-upload-status?stage_id='+stage_id+'&upload_id='+upload_id)
        assert lost_final['complete'] and len(lost_final['inspection']['sources'])==1,'Lost final response must not append a duplicate PDF'
        stage=out['inspection']
        stage=out['inspection'];assert status==200 and len(stage['units'])==2,stage['units']
        assert all(u['start_page']>=5 for u in stage['units'])
        assert stage['visual_model']=='vq' and 'libgen' not in stage['course_name']
        data,ctype=multipart('Biochemistry.pdf',make_pdf('Biochemistry'),stage_id=stage['stage_id'])
        status,out=request(base+'/api/reference/course-inspect',data,ctype)
        stage=out['inspection'];assert status==200 and len(stage['units'])==4
        assert stage['visual_model']=='vq'
        selected=[{'id':u['id'],'title':u['title']} for u in stage['units'][:2]]
        build={'stage_id':stage['stage_id'],'course_name':'Respiratory Teaching','units':selected,'model_key':'gemma'}
        build_started=time.time();status,out=request(base+'/api/reference/course-build',build)
        assert status==202 and out['ok'],out
        job_id=out['job']['id']
        _,duplicate=request(base+'/api/reference/course-build',build)
        assert duplicate['job']['id']==job_id,'Duplicate retry must attach to the original job'
        job=wait_for(lambda:(lambda j:j if j['status'] in ('done','error') else None)(request(base+'/api/reference/course-job-status?id='+job_id)[1]),'initial activation')
        assert job['status']=='done',job
        course_id=job['result']['course_id']
        _,listing=request(base+'/api/reference/course-list')
        assert any(x['course_id']==course_id for x in listing['courses'])
        _,course=request(base+'/api/reference/course-status?course_id='+course_id)
        assert course['manifest']['visual_model']=='vq'
        assert time.time()-build_started<3.0,'Lecture activation should not wait on local-model question generation'
        assert all(x['script_status'] in ('preparing','ready') for x in course['manifest']['units'])
        assert not (manager._course_dir(course_id)/'vector_index.sqlite3').exists()
        _,context=request(base+'/api/reference/course-context',{'course_id':course_id,'question':'How does V/Q influence gas exchange?'})
        assert context['ok'] and context['retrieval']['rerank_mode']=='course text lexical fallback',context
        _,answer=request(base+'/api/reference/course-answer-local',{'course_id':course_id,'question':'How does V/Q influence gas exchange?','model_key':'gemma','context':context['context']})
        assert answer['engine']=='local-course-rag' and answer['course_id']==course_id
        # Job status and active course survive a fresh CourseManager instance.
        disk_view=cr.CourseManager()
        assert disk_view.job_status(job_id)['status']=='done'
        assert disk_view.manifest(course_id)['course_id']==course_id
        index_gate.set()
        course=wait_for(lambda:(lambda m:m if m['status']=='ready' and m['preparation']['index']['status']=='ready' and m['preparation']['lectures']['status']=='ready' else None)(request(base+'/api/reference/course-status?course_id='+course_id)[1]['manifest']),'background source concepts, scripts and index')
        assert all(2<=x['question_count']<=100 for x in course['units'])
        assert course['question_generation']=='exam-mcq-v5'
        assert all(x['script_status']=='ready' and len(re.findall(r'[\u3400-\u9fff]',x['script']))>=150 for x in course['units'])
        assert time.time()-build_started<12.0,'Mock-reviewed banks should build promptly'
        # A restarted server resumes partial question banks without re-uploading PDFs.
        resumed_id='resume-'+uuid.uuid4().hex[:8];resume_dir=root/resumed_id
        resume_dir.mkdir();shutil.copytree(str(manager._course_dir(course_id)/'units'),str(resume_dir/'units'))
        shutil.copyfile(str(manager._course_dir(course_id)/'chunks.jsonl'),str(resume_dir/'chunks.jsonl'))
        partial_banks=json.loads((manager._course_dir(course_id)/'question_banks.json').read_text(encoding='utf-8'))
        partial_banks[selected[1]['id']]=partial_banks[selected[1]['id']][:20]
        (resume_dir/'question_banks.json').write_text(json.dumps(partial_banks),encoding='utf-8')
        partial_manifest=dict(course);partial_manifest['course_id']=resumed_id;partial_manifest['status']='error'
        partial_manifest.pop('content_version',None)
        partial_manifest['units']=[dict(u,question_count=len(partial_banks[u['id']])) for u in course['units']]
        partial_manifest['preparation']={'questions':{'status':'error','completed_units':1,'total_units':2},'index':{'status':'ready'}}
        (resume_dir/'course_manifest.json').write_text(json.dumps(partial_manifest),encoding='utf-8')
        restarted_manager=cr.CourseManager();restarted_manager.resume_pending(lambda mk,sys,user,max_tokens:fake_model(None,mk,sys,user,max_tokens))
        resumed=wait_for(lambda:(lambda m:m if m['status']=='ready' and m['preparation']['lectures']['status']=='ready' else None)(restarted_manager.manifest(resumed_id)),'restart migration of a partial old bank')
        assert all(u['question_count']>=2 for u in resumed['units'])
        assert resumed['content_version']=='v241.9'
        # A completed prior-release course must replace its quotation-match
        # cards with clean relationship cases without another PDF upload.
        old_id='old-ready-'+uuid.uuid4().hex[:8];old_dir=root/old_id
        shutil.copytree(str(manager._course_dir(course_id)),str(old_dir))
        old_manifest=json.loads((old_dir/'course_manifest.json').read_text(encoding='utf-8'))
        old_manifest['course_id']=old_id;old_manifest['question_generation']='source-evidence-choice-v2'
        (old_dir/'course_manifest.json').write_text(json.dumps(old_manifest),encoding='utf-8')
        old_banks=json.loads((old_dir/'question_banks.json').read_text(encoding='utf-8'))
        for bank in old_banks.values():
            for seed in bank:
                seed['question']['stem']='Legacy quotation-match question'
                seed['question']['generation_method']='source-evidence-choice-v2'
        (old_dir/'question_banks.json').write_text(json.dumps(old_banks),encoding='utf-8')
        migrated_manager=cr.CourseManager()
        migrated_manager.resume_pending(lambda mk,sys,user,max_tokens:fake_model(None,mk,sys,user,max_tokens))
        upgraded=wait_for(lambda:(lambda m:m if m.get('question_generation')=='exam-mcq-v5' and all(u.get('question_count',0)>=2 for u in m['units']) else None)(migrated_manager.manifest(old_id)),'prior-bank question quality upgrade')
        assert all(u['question_count']>=2 for u in upgraded['units'])
        new_cards=migrated_manager.quiz(old_id,10)['questions']
        assert len(new_cards)==20 and all(q['generation_method']=='exam-mcq-v5' and 'Legacy' not in q['stem'] for q in new_cards)
        print('[OK] Existing course replaces quoted evidence cards without PDF re-upload')
        draw_started=time.monotonic();status,quiz=request(base+'/api/reference/course-quiz',{'course_id':course_id,'per_unit':2})
        assert status==200 and time.monotonic()-draw_started<1.5,'Selecting a prepared quiz should be a fast database/text operation'
        assert 'error' not in quiz,quiz
        assert quiz['total']==4 and all(x['available']>=10 and x['selected']==2 for x in quiz['units'])
        scoped_status,scoped=request(base+'/api/reference/course-quiz',{'course_id':course_id,'per_unit':2,'unit_ids':[course['units'][0]['id']]})
        assert scoped_status==200 and scoped['total']==2 and len(scoped['units'])==1 and scoped['generation']['model_calls']==0
        assert quiz['quiz_id'] and quiz['generation']['model_calls']==0
        assert len(set(x['id'] for x in quiz['questions']))==4
        assert all(x['generation_method']=='exam-mcq-v5' and x['stem'].endswith('?') and '____' not in x['stem'] and not re.search(r'[\u3400-\u9fff]',x['stem']) and len(x['choices'])==4 and x['choices'][x['answer']]!=x['evidence_statement'] and all('Appendix' not in choice and '.indd' not in choice for choice in x['choices']) for x in quiz['questions'])
        qs=quiz['questions']
        choices=[{'id':q['id'],'choice':(q['answer'] if i in (0,3) else (q['answer']+1)%4 if i==1 else None)} for i,q in enumerate(qs)]
        submitted={'course_id':course_id,'quiz_id':quiz['quiz_id'],'answers':choices}
        _,graded=request(base+'/api/reference/course-quiz-result',submitted)
        assert graded['total']==4 and graded['answered']==3 and graded['correct']==2 and graded['accuracy']==50.0,graded
        _,graded_twice=request(base+'/api/reference/course-quiz-result',submitted)
        assert graded_twice==graded,'Duplicate submit must not inflate statistics'
        _,stats=request(base+'/api/reference/course-quiz-stats?course_id='+course_id)
        assert stats['attempts']==1 and stats['questions']==4 and stats['correct']==2 and len(stats['units'])==2,stats
        for count in (1,10):
            draw_started=time.monotonic();status,draw=request(base+'/api/reference/course-quiz',{'course_id':course_id,'per_unit':count})
            assert status==200 and time.monotonic()-draw_started<1.5
            assert 'error' not in draw and draw['total']==count*2 and all(u['selected']==count for u in draw['units']) and draw['generation']['model_calls']==0,draw
        print('[OK] 1–10 prepared questions per unit; fast draw, idempotent grading and course statistics')
        _,quiz_again=request(base+'/api/reference/course-quiz',{'course_id':course_id,'per_unit':2})
        assert 'error' not in quiz_again,quiz_again
        assert len(set(x['id'] for x in quiz_again['questions']))==4
        # Earlier packages could mark a course ready with a partial bank.
        bank_path=manager._course_dir(course_id)/'question_banks.json'
        banks=json.loads(bank_path.read_text(encoding='utf-8'));first=selected[0]['id']
        full=banks[first];banks[first]=full[:5]
        bank_path.write_text(json.dumps(banks),encoding='utf-8')
        assert manager.quiz(course_id,2)['total']==4,'Five approved questions must permit a two-question draw'
        try:manager.quiz(course_id,10)
        except ValueError as error:assert 'has 5 reviewed questions' in str(error)
        else:raise AssertionError('A ten-question draw used only five approved questions')
        banks[first]=full[:1]
        bank_path.write_text(json.dumps(banks),encoding='utf-8')
        assert manager.quiz(course_id,1)['total']==2
        try:manager.quiz(course_id,2)
        except ValueError as error:assert 'has 1 reviewed questions' in str(error)
        else:raise AssertionError('A two-question draw silently used one available question')
        banks[first]=full;bank_path.write_text(json.dumps(banks),encoding='utf-8')
        _,context=request(base+'/api/reference/course-context',{'course_id':course_id,'question':'How does V/Q influence gas exchange?'})
        assert context['ok'] and context['course']['course_id']==course_id
        cr._embed=real_embed;cr.EMBED_MODEL='invalid'
        # A failed embedding service pauses semantic indexing, while uploaded-course Q&A stays usable.
        cr._embed=lambda items,timeout=240: (_ for _ in ()).throw(RuntimeError('invalid model'))
        _,retry=request(base+'/api/reference/course-retry-preparation',{'course_id':course_id,'model_key':'gemma'})
        assert retry['ok']
        failed_index=wait_for(lambda:(lambda m:m if m['preparation']['index']['status']=='error' else None)(request(base+'/api/reference/course-status?course_id='+course_id)[1]['manifest']),'embedding failure status')
        assert 'invalid model' in failed_index['preparation']['index']['error']
        _,fallback=request(base+'/api/reference/course-context',{'course_id':course_id,'question':'gas exchange'})
        assert fallback['ok'],'The existing index or text fallback must remain available'
        cr._embed=real_embed
        cr.EMBED_MODEL='bge-m3:latest'
        _,report=request(base+'/api/reference/feedback',{'question':'How does V/Q influence gas exchange?','answer':'Too short.','reason':'incomplete','comment':'Please explain the mechanism.','model_key':'gemma','engine':'local-course-rag','course_id':course_id,'sources':context.get('sources') or []})
        assert report['auto_correction_queued'] and report['saved']
        correction=wait_for(lambda:(lambda x:x if x.get('correction_status') in ('ready','error') else None)(request(base+'/api/reference/feedback-correction-status?id='+report['id'])[1]),'automatic feedback correction')
        assert correction['correction_status']=='ready',feedback_service.feedback_record(report['id'])
        assert correction['saved'] and correction['correction_answer'] and correction['email_status']=='not_configured',correction
        _,remembered=request(base+'/api/reference/course-answer-local',{'course_id':course_id,'question':'How does V/Q influence gas exchange?','model_key':'gemma'})
        assert remembered['engine']=='auto-corrected-course-memory' and remembered['correction_id']==report['id']
        # Selected items from one batch report are also reusable individually.
        _,batch_report=request(base+'/api/reference/feedback',{'question':'Question 2\nHow does ventilation influence gas exchange?\n\nQuestion 5\nHow does perfusion influence gas exchange?','answer':'AI Answer 2\nToo short.\n\nAI Answer 5\nAlso too short.','reason':'incomplete','comment':'Explain both mechanisms.','model_key':'gemma','engine':'local-course-rag','course_id':course_id,'batch_size':5,'report_scope':'multiple','reported_items':[2,5],'sources':context.get('sources') or []})
        batch_correction=wait_for(lambda:(lambda x:x if x.get('correction_status') in ('ready','error') else None)(request(base+'/api/reference/feedback-correction-status?id='+batch_report['id'])[1]),'automatic batch feedback correction')
        assert batch_correction['correction_status']=='ready',feedback_service.feedback_record(batch_report['id'])
        individual=feedback_service.find_correction('How does perfusion influence gas exchange?',course_id)
        assert individual and individual['id'].startswith(batch_report['id']+':')
        _,positive=request(base+'/api/reference/feedback',{'question':'How does V/Q influence gas exchange?','answer':'Good supported answer.','reason':'positive','comment':'回答很完整，謝謝','course_id':course_id})
        assert positive['feedback_intent']=='positive' and positive['correction_status']=='kept' and not positive['auto_correction_queued']
        assert feedback_service.find_correction('How does V/Q influence gas exchange?',course_id)['id']==report['id']
        _,style=request(base+'/api/reference/feedback',{'question':'How does airway resistance change?','answer':'Hard to read.','reason':'other','comment':'回覆太囉嗦，想要條列重點','model_key':'gemma','course_id':course_id})
        assert style['feedback_intent']=='repair' and 'style' in style['feedback_focus'] and style['auto_correction_queued']
        style_review=wait_for(lambda:(lambda x:x if x.get('correction_status') in ('ready','error') else None)(request(base+'/api/reference/feedback-correction-status?id='+style['id'])[1]),'style feedback correction')
        assert style_review['correction_status']=='ready' and 'concise' in feedback_service.correction_guidance('How does airway resistance change?',course_id)
        assert any('回覆太囉嗦，想要條列重點' in prompt and 'untrusted preference' in prompt for prompt in report_prompts),report_prompts
        assert feedback_service.classify_feedback('other','解釋不夠詳細，缺少機轉')[1]==['incomplete']
        assert feedback_service.classify_feedback('other','回答不夠完整')[1]==['incomplete']
        assert feedback_service.classify_feedback('other','這個答案不滿意')[0]=='repair'
        print('[OK] Positive feedback keeps behavior; style/completeness comments become fixed review guidance')
        # The same outline in a different discipline must not show the lung simulator.
        no_lung=manager.inspect([('Chemistry.pdf',make_pdf('Chemistry'))],course_name='Chemistry')
        assert no_lung['visual_model']=='none' and len(no_lung['units'])==2
        disposable='delete-'+uuid.uuid4().hex[:8];discard=root/disposable;discard.mkdir()
        (discard/'course_manifest.json').write_text(json.dumps({'course_id':disposable,'course_name':'Discard me','units':[]}),encoding='utf-8')
        assert any(c['course_id']==disposable for c in request(base+'/api/reference/course-list')[1]['courses'])
        req=urllib.request.Request(base+'/api/reference/course-delete',data=json.dumps({'course_id':disposable}).encode(),headers={'Content-Type':'application/json'})
        with urllib.request.urlopen(req,timeout=10) as response:assert json.loads(response.read())['deleted']
        assert not discard.exists() and manager.manifest(course_id),'Deletion must remove only the chosen uploaded course'
        assert disposable in json.loads((root/'_deleted_courses.json').read_text(encoding='utf-8'))
        print('[OK] Course deletion needs no server code and removes the selected course only')
        print('[OK] Resumable PDF -> immediate Q&A -> Chinese scripts and reviewed exam questions -> instant draw')
        print('[OK] Report -> saved/email queue -> evidence-based auto-correction -> corrected answer memory')
        print('[OK] Built-in V/Q policy and nonrespiratory detection are separately checked in the page adapter')
    finally:
        for server in reversed(servers):server.shutdown();server.server_close()
        shutil.rmtree(str(root),ignore_errors=True)


if __name__=='__main__':main()
