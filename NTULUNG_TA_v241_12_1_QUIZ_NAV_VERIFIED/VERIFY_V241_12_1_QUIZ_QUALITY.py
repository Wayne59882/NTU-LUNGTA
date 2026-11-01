#!/usr/bin/env python3
"""Exam-style quality gates and the reported 91-of-100 preparation case."""
import json
import re
import time
import course_runtime as cr
import exam_questions as exam

fact='Alveolar ventilation changes pulmonary perfusion through a regulated pathway and alters measurable gas exchange.'
source={'id':'e1','anchor':fact,'context':fact,'chunk_id':'c1','language':'en'}
valid={'evidence_id':'e1','stem':'A patient has reduced alveolar ventilation while perfusion remains unchanged. Which consequence is best supported by this relationship?',
       'choices':['Gas exchange is affected by a change in ventilation.','Perfusion must always be completely absent.',
                  'Alveolar ventilation cannot influence gas exchange.','The two physiological processes have no possible relationship.'],
       'answer':0,'choice_explanations':['The course fact links ventilation to measurable gas exchange.',
                                       'The source does not say perfusion must be absent.',
                                       'The source states a relationship with gas exchange.',
                                       'The source describes a relationship between the processes.']}
assert exam._draft_valid(valid,source,set())
for change in ({'stem':'Complete this statement from the course material: ____ therapy?'},
               {'stem':valid['stem'].replace('reduced','55-year-old with reduced')},
               {'choices':['same']*4},
               {'choice_explanations':['because']*4},
               {'stem':valid['stem'].replace('A patient','一位病人')}):
    assert exam._draft_valid(dict(valid,**change),source,set()) is None,change

subjects=['alveolar ventilation','pulmonary perfusion','oxygen diffusion','airway resistance',
          'lung compliance','tidal volume','dead space','hemoglobin saturation','pleural pressure']
chunks=[]
for i in range(91):
    a,b=subjects[i%len(subjects)],subjects[(i+3)%len(subjects)]
    chunks.append({'id':'c'+str(i),'text':a+' changes '+b+' during the measured condition '+str(i)+' and influences the physiological response of the cardiovascular system.'})
unit={'id':'u','title':'Human Physiology'}
def model(_key,system,user,_tokens):
    if 'EXAM_MCQ_GENERATE' in system:
        evidence=json.loads(user.split('EVIDENCE_JSON:\n',1)[1]);out=[]
        for row in evidence:
            q=dict(valid)
            q['evidence_id']=row['id']
            q['stem']='In a physiology assessment, the following relationship is observed: '+row['anchor']+' Which conclusion is best supported by the evidence?'
            out.append(q)
        return json.dumps({'questions':out})
    rows=json.loads(user.split('QUESTIONS_AND_EVIDENCE_JSON:\n',1)[1])
    return json.dumps({'reviews':[{'evidence_id':x['evidence_id'],'valid':True,'best_choice':0} for x in rows]})
progress=[];start=time.monotonic()
bank=exam.build(unit,chunks,cr._question_sentences,[],'gemma',model,lambda cards,total,processed:progress.append((len(cards),total,processed)),100)
assert len(bank)==91 and progress[-1]==(91,91,91) and time.monotonic()-start<3
assert all(q['question']['generation_method']=='exam-mcq-v5' and '____' not in q['question']['stem'] for q in bank)
assert all(len(q['question']['choices'])==4 and len(q['question']['explanation'].splitlines())==4 for q in bank)
assert len(exam.build(unit,chunks,cr._question_sentences,bank,'gemma',model,lambda *_:None,100))==91

def wrong_review(_key,system,user,_tokens):
    if 'EXAM_MCQ_GENERATE' in system:return model(_key,system,user,_tokens)
    rows=json.loads(user.split('QUESTIONS_AND_EVIDENCE_JSON:\n',1)[1])
    return json.dumps({'reviews':[{'evidence_id':x['evidence_id'],'valid':True,'best_choice':1} for x in rows]})
assert exam.build(unit,chunks[:3],cr._question_sentences,[],'gemma',wrong_review,lambda *_:None,100)==[]

# 25 facts used to require five serial draft/review pairs. A short first
# batch unlocks the draw, then compact twelve-question batches cut the count.
calls=[];quick_progress=[]
def compact_model(key,system,user,tokens):
    calls.append((system,tokens))
    if 'EXAM_MCQ_GENERATE' in system:
        rows=json.loads(user.split('EVIDENCE_JSON:\n',1)[1]);items=[]
        for row in rows:
            q={k:v for k,v in valid.items() if k!='choice_explanations'}
            q['evidence_id']=row['id']
            q['stem']='In a physiology assessment, the following relationship is observed: '+row['anchor']+' Which conclusion is best supported by the evidence?'
            items.append(q)
        return json.dumps({'questions':items})
    rows=json.loads(user.split('QUESTIONS_AND_EVIDENCE_JSON:\n',1)[1])
    assert all('answer' not in r for r in rows)
    return json.dumps({'reviews':[{'evidence_id':r['evidence_id'],'valid':True,'best_choice':0,
                                   'choice_explanations':valid['choice_explanations']} for r in rows]})
fast_bank=exam.build(unit,chunks[:25],cr._question_sentences,[],'gemma',compact_model,
                     lambda cards,total,processed:quick_progress.append((len(cards),total,processed,len(calls))),100)
assert len(fast_bank)==25 and quick_progress[-1]==(25,25,25,6)
assert next(p for p in quick_progress if p[0]>=2)[3]==2
assert all(len(x['question']['explanation'].splitlines())==4 for x in fast_bank)
assert len([1 for system,_ in calls if 'EXAM_MCQ_GENERATE' in system])==3
assert all('choice_explanations' not in system.split('Schema:',1)[-1] for system,_ in calls if 'EXAM_MCQ_GENERATE' in system)

large_rows=exam.evidence_rows(chunks[:12],cr._question_sentences)
fallback_calls=[]
def once_truncated(key,system,user,tokens):
    fallback_calls.append(system)
    if len(fallback_calls)==1:return '{"questions":['
    return compact_model(key,system,user,tokens)
assert len(exam._generate(large_rows,unit['title'],'gemma',once_truncated))==12
assert len(fallback_calls)==3
review_rows=[{'evidence_id':row['id'],'anchor':row['anchor'],'context':row['context'],
              'stem':valid['stem'],'choices':valid['choices']} for row in large_rows]
fallback_calls[:]=[]
assert len(exam._review(review_rows,'gemma',once_truncated))==12
assert len(fallback_calls)==3
partial_calls=[]
def partial_review(key,system,user,tokens):
    rows=json.loads(user.split('QUESTIONS_AND_EVIDENCE_JSON:\n',1)[1]);partial_calls.append(len(rows))
    if len(partial_calls)==1:rows=rows[:5]
    return json.dumps({'reviews':[{'evidence_id':r['evidence_id'],'valid':True,'best_choice':0,
                                   'choice_explanations':valid['choice_explanations']} for r in rows]})
assert len(exam._review(review_rows,'gemma',partial_review))==12 and partial_calls==[12,7]

def bad_explanations(key,system,user,tokens):
    if 'EXAM_MCQ_GENERATE' in system:return compact_model(key,system,user,tokens)
    rows=json.loads(user.split('QUESTIONS_AND_EVIDENCE_JSON:\n',1)[1])
    return json.dumps({'reviews':[{'evidence_id':r['evidence_id'],'valid':True,'best_choice':0,
                                   'choice_explanations':['vague']*4} for r in rows]})
assert not exam.build(unit,chunks[:3],cr._question_sentences,[],'gemma',bad_explanations,lambda *_:None,100)

zh='肺泡通氣量下降會影響肺泡內氧氣與二氧化碳的分壓，並改變肺泡與血液間的氣體交換效率。'
zh_source={'id':'zh','anchor':zh,'context':zh,'chunk_id':'z','language':'zh-TW'}
zh_item={'evidence_id':'zh','stem':'一位病人的肺泡通氣量下降，但灌流條件維持穩定。根據本單元所述的生理關係，何種變化最合理？',
         'choices':['肺泡氣體分壓及交換效率可能改變','肺泡氧氣分壓必定完全不受影響','肺泡與血液之間不再進行氣體交換','肺泡灌流必然增加至原本的兩倍'],
         'answer':0,'choice_explanations':['教材指出通氣改變會影響氣體分壓及交換效率。','教材並未支持氧氣分壓完全不受影響。','教材描述的是交換效率改變而非完全停止。','教材沒有指出灌流必然增加兩倍。']}
assert exam._draft_valid(zh_item,zh_source,set())
print('[OK] Exam-style quality gates; 25 source facts use 6 model calls and unlock a draw after 2; 91 approved questions remain valid; blinded review and Chinese course language are supported')
