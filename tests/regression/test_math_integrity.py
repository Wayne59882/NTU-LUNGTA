import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[2]/"app"))
"""Regression cases from the PDE screenshots, without network/model calls."""
import ast
import json
import tempfile
from pathlib import Path
import math_integrity as mi
import exam_questions as eq
import course_runtime as cr
import reference_server as rs

formulas=[r'$u_{tt}-\nabla^2u=0$',r'$u_t+b\bullet\nabla u=0$',
          r'$F(D^ku(x),\nabla u(x),\nabla^2u(x),\text{...},D^1u(x),u(x),x)=0$',
          r'$\sum_{i,j}(a_{ij}u)_{x_ix_j}$',r'$$\frac{\partial u}{\partial t}=\Delta u$$']
for formula in formulas:
    assert mi.loads_model_json(json.dumps({'x':formula}))['x']==formula
    # Even a valid JSON escape such as \n must not eat the start of \nabla.
    loose='{"x":"'+formula+'"}'
    assert mi.loads_model_json(loose)['x']==formula
    assert not mi.math_issues(formula),formula
    assert formula in rs.clean_answer('說明 '+formula+'，結束。')
assert mi.loads_model_json(r'{"x":"line one\nline two","path":"C:\\tmp","quote":"\"yes\""}')=={'x':'line one\nline two','path':'C:\\tmp','quote':'"yes"'}
for text in ['$u_t- abla^2 u=0$', '$b \x08ullet u=0$', '$\\ext{div}(u)=0$', '$u_t + □ullet u=0$', '$u_{tt - u=0$', '$u_t=0']:
    assert mi.math_issues(text),repr(text)
assert not mi.math_issues('This costs $20. The wave travels at 5 m/s.')
assert eq._parse_object('{"questions":[{"stem":"$\\nabla u$"}]}')['questions'][0]['stem']==r'$\nabla u$'
print('[OK] JSON escape preservation, screenshot corruption, delimiter/brace checks, Q&A math preservation')

source={'id':'e1','language':'en','context':'The wave equation is '+formulas[0],'anchor':'The wave equation is '+formulas[0],'chunk_id':'c1'}
draft={'evidence_id':'e1','stem':'Which equation describes the propagation of a wave in the given mathematical model?',
       'choices':[formulas[0],r'$u_t-\nabla^2u=0$',r'$\nabla^2u=0$',r'$u_t+b\bullet\nabla u=0$'],'answer':0}
assert eq._draft_valid(draft,source,set())
bad=dict(draft,choices=['$u_{tt}- abla^2u=0$']+draft['choices'][1:])
assert eq._draft_valid(bad,source,set()) is None
assert eq._draft_valid(dict(draft,choices=1),source,set()) is None
print('[OK] Damaged formulas cannot enter a reviewed question bank')

chunks=[{'id':'c1','text':'Partial differential equations describe the evolution of functions.\n'+formulas[0]+'\nThe highest derivative order determines the order of the PDE. '*4}]
evidence=cr._lecture_evidence({'title':'PDE'},chunks)
assert formulas[0] in evidence
with tempfile.TemporaryDirectory() as td:
    old=cr.COURSE_ROOT;cr.COURSE_ROOT=Path(td)
    try:
        manager=cr.CourseManager();cid='pde';cd=Path(td)/cid;cd.mkdir()
        good={'id':'good-seed','source_statement':'wave','evidence_chunk_id':'c1','question':dict(draft,id='good-question',generation_method='exam-mcq-v5',source_review={'revision':'R15','support_quote':source['context']})}
        (cd/'chunks.jsonl').write_text(json.dumps({'id':'c1','text':source['context']})+'\n')
        badrow={'id':'bad-seed','source_statement':'broken','question':dict(bad,id='bad-question',generation_method='exam-mcq-v5')}
        bank={'u1':[good,badrow]};cr._json_dump(cd/'question_banks.json',bank)
        man={'course_id':cid,'course_name':'PDE','question_generation':'exam-mcq-v5','units':[{'id':'u1','title':'PDE','script':'Formula $u_t - abla u=0$','script_status':'ready','question_count':2}],'preparation':{}}
        cr._json_dump(cd/'course_manifest.json',man)
        # Retain historical score data byte-for-byte.
        db=manager._quiz_db(cid);db.close();before=(cd/'quiz_results.sqlite3').read_bytes()
        fixed=manager._quarantine_damaged_math(man)
        assert fixed['units'][0]['script_status']=='preparing'
        assert len(json.loads((cd/'question_banks.json').read_text())['u1'])==1
        assert json.loads((Path(fixed['math_repair']['backup'])/'question_banks.json').read_text())==bank
        assert (cd/'quiz_results.sqlite3').read_bytes()==before
        assert manager.quiz(cid,1)['questions'][0]['id']=='good-question'
        assert manager._quarantine_damaged_math(fixed)==fixed
    finally:cr.COURSE_ROOT=old
print('[OK] Existing corrupted content backup/quarantine, safe draw, saved score preservation, idempotent repair')
for name in ('math_integrity.py','course_runtime.py','exam_questions.py','reference_server.py','ollama_cancel.py','model_lock.py','pdf_ingestion.py','pdf_vision.py','kb_server.py','access_control.py','../scripts/deploy/auto_sync.py'):
    if __import__('sys').version_info>=(3,8):ast.parse(Path(name).read_text(),feature_version=(3,6))
    else:ast.parse(Path(name).read_text())
print('[OK] Updated Python modules parse with Python 3.6 grammar')
