#!/usr/bin/env python3
"""A large first chapter cannot block the other units or practice."""
import json
import shutil
import tempfile
import time
from pathlib import Path
import course_runtime as cr
import exam_questions as exam

previous_root=cr.COURSE_ROOT
root=Path(tempfile.mkdtemp(prefix='vq17_'))
cr.COURSE_ROOT=root
try:
    manager=cr.CourseManager();cid='seventeen-units';folder=root/cid;folder.mkdir()
    units=[{'id':'u%02d'%i,'title':'Unit %s'%i,'question_count':0,'script':'','script_status':'preparing'} for i in range(1,18)]
    chunks=[]
    for i,unit in enumerate(units,1):
        for j in range(241 if i==1 else 40):
            fact='Regulated pulmonary circulation condition %s in unit %s changes alveolar ventilation and influences the measurable physiological response.'%(j,i)
            chunks.append({'id':'%s_c%03d'%(unit['id'],j),'unit_id':unit['id'],'text':fact})
    def model(key,system,user,tokens):
        if 'EXAM_MCQ_GENERATE' in system:
            rows=json.loads(user.split('EVIDENCE_JSON:\n',1)[1]);questions=[]
            for r in rows:
                questions.append({'evidence_id':r['id'],
                    'stem':'A clinical physiology team observes this source relationship: '+r['anchor']+' Which conclusion best follows from the evidence?',
                    'choices':['The measured physiological response changes with alveolar ventilation.',
                               'The physiological response must remain entirely unchanged.',
                               'Alveolar ventilation cannot influence the measured response.',
                               'The source proves the response always becomes absent.'],
                    'answer':0,'choice_explanations':['This conclusion follows from the observed source relationship.',
                        'The source explicitly describes a changed response.',
                        'The described relationship includes alveolar ventilation.',
                        'No complete absence is supported by the source.']})
            return json.dumps({'questions':questions})
        if 'EXAM_MCQ_REVIEW' in system:
            rows=json.loads(user.split('QUESTIONS_AND_EVIDENCE_JSON:\n',1)[1])
            return json.dumps({'reviews':[{'evidence_id':r['evidence_id'],'valid':True,'best_choice':0} for r in rows]})
        raise AssertionError('Unexpected model call')
    first=exam.build(units[0],[c for c in chunks if c['unit_id']=='u01'],cr._question_sentences,[],'gemma',model,lambda *_:None,32)
    assert len(first)==32
    units[0]['question_count']=32;units[0]['question_source_count']=241;units[0]['question_processed_count']=39
    manifest={'course_id':cid,'course_name':'Large book','units':units,'question_generation':'exam-mcq-v5',
              'status':'preparing','content_version':'v241.9','preparation':{'questions':{'status':'preparing','total_units':17},
              'lectures':{'status':'preparing','total_units':17},'index':{'status':'ready'}}}
    cr._json_dump(folder/'course_manifest.json',manifest)
    cr._json_dump(folder/'question_banks.json',{'u01':first})
    (folder/'chunks.jsonl').write_text(''.join(json.dumps(c)+'\n' for c in chunks),encoding='utf-8')
    seen=[];original=manager._update_manifest
    def observe(course_id,change):
        result=original(course_id,change)
        if result and not seen and result['units'][1]['question_count']>=2 and all(u['question_count']==0 for u in result['units'][2:]):
            selected=manager.quiz(cid,2,unit_ids=['u01'])
            assert selected['total']==2 and selected['generation']['model_calls']==0
            try:manager.quiz(cid,2)
            except ValueError:pass
            else:raise AssertionError('The full 17-unit draw should still wait for its remaining units')
            seen.append((result['units'][0]['question_count'],result['units'][1]['question_count']))
        return result
    manager._update_manifest=observe
    manager._prepare_questions(cid,'gemma',model)
    ready=manager.manifest(cid)
    assert seen==[(32,2)],seen
    assert ready['preparation']['questions']['status']=='ready'
    assert ready['units'][0]['question_count']==32
    assert all(u['question_count']==10 for u in ready['units'][1:]),[u['question_count'] for u in ready['units']]
    assert manager.quiz(cid,2)['total']==34
    assert manager.quiz(cid,2,unit_ids=['u17'])['total']==2
    try:manager.quiz(cid,2,unit_ids=['not-a-unit'])
    except ValueError:pass
    else:raise AssertionError('Unknown unit accepted')
    manager.expand_questions(cid,['u17'],'gemma',model)
    deadline=time.time()+10
    while time.time()<deadline:
        updated=manager.manifest(cid)
        if updated['units'][16]['question_count']>10 and updated['preparation']['questions']['status']=='ready':break
        time.sleep(.03)
    else:raise AssertionError('Selected bank expansion did not complete')
    assert updated['units'][16]['question_count']==40
    assert all(u['question_count']==10 for u in updated['units'][1:16])
    lecture_calls=[]
    manager._update_manifest(cid,lambda m:m['preparation']['lectures'].update({'priority_unit_id':'u17'}))
    def lecture_model(key,system,user,tokens):
        lecture_calls.append(user.split('\n',1)[0])
        return '\n\n'.join(['這個單元先說明教材記載的生理變項與調節條件，再解釋肺泡通氣對測量結果的影響，最後整理證據支持的觀察結果。']*6)
    manager._prepare_lectures(cid,'gemma',lecture_model)
    assert lecture_calls[0]=='單元：Unit 17',lecture_calls[:2]
    assert manager.manifest(cid)['preparation']['lectures']['status']=='ready'
    print('[OK] 17 units: chapter 1 already has 32 cards; a 2-card unit draw opens before other units; 10-card banks prepare across units; expansion and lecture priority are selective')
finally:
    cr.COURSE_ROOT=previous_root
    shutil.rmtree(str(root),ignore_errors=True)
