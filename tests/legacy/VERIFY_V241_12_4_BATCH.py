#!/usr/bin/env python3
# Offline fixtures verify batch completeness and recovery, not model accuracy.
import ast,re
from pathlib import Path
source=Path('reference_server.py').read_text(encoding='utf-8')
ast.parse(source,feature_version=(3,6)) if __import__('sys').version_info >= (3,8) else ast.parse(source)
tree=ast.parse(source)
names={'clean_answer','parse_mcq_options','fast_verify_answer','local_batch_answer','looks_incomplete_answer','_answer_option_letter','detect_question_type'}
selected=ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in names],type_ignores=[])
namespace={'re':re,'normalize_language_tag':lambda x:x,'V231_DEFAULT_PROFILE':'optimized','_source_leak_remaining':lambda x:False,'deterministic_expected_option':lambda q,o:''}
exec(compile(selected,'reference_server.py','exec'),namespace)
good='正確答案：A. 甲\n解釋：這是完整的測試回覆。'
q='哪個選項正確？\nA.甲\nB.乙\nC.丙\nD.丁'
assert len(namespace['parse_mcq_options'](q))==4
assert len(namespace['parse_mcq_options'](q.replace('A.','Ａ．').replace('B.','Ｂ．').replace('C.','Ｃ．').replace('D.','Ｄ．')))==4
assert namespace['clean_answer']('ΔPaO2 ≈ 50 ± 2 ↑ 😊✅')=='ΔPaO2 ≈ 50 ± 2 ↑'
assert not namespace['fast_verify_answer'](q,'正確答案：A.甲\n解釋：😊','zh-TW')['ok']
assert not namespace['fast_verify_answer'](q,good+',','zh-TW')['ok']
assert namespace['fast_verify_answer'](q,good,'zh-TW')['ok']
namespace['_batch_groups']=lambda items:[items[i:i+4] for i in range(0,len(items),4)]
calls=[]
def solve(server,key,items):
    # Omit the last row, leave another blank, truncate another.
    return [{'id':item['id'],'answer': '' if i==1 else good+',' if i==2 else good} for i,item in enumerate(items[:-1])]
def recover(server,key,question,context,lang,retrieval):
    calls.append(question)
    if 'failure' in question:raise RuntimeError('fixture single failure')
    return good,{'fast_verified':True}
namespace.update(local_batch_answer_baseline=solve,local_batch_answer_optimized=solve,local_answer=recover)
for total in (5,20,41,100):
    items=[{'id':i+1,'question':q,'context':'Fixture','language_tag':'zh-TW'} for i in range(total)]
    rows=namespace['local_batch_answer'](None,'gemma',items)
    assert [r['id'] for r in rows]==list(range(1,total+1))
    assert all(namespace['fast_verify_answer'](q,r['answer'],'zh-TW')['ok'] for r in rows)
items=[{'id':i+1,'question':q+('\nfailure' if i==1 else ''),'context':'Fixture','language_tag':'zh-TW'} for i in range(3)]
rows=namespace['local_batch_answer'](None,'gemma',items)
assert len(rows)==3 and rows[1]['status']=='error' and '尚未完成' in rows[1]['answer']
# A whole micro-batch failure must not abort later items.
namespace['local_batch_answer_optimized']=lambda *args:(_ for _ in ()).throw(RuntimeError('fixture group failure'))
rows=namespace['local_batch_answer'](None,'gemma',items)
assert len(rows)==3 and rows[1]['status']=='error' and 'status' not in rows[2]
print('[OK] Python compatibility, 5/20/41/100 rows, malformed/missing recovery, isolated failures and professional output. Offline fixtures only.')
