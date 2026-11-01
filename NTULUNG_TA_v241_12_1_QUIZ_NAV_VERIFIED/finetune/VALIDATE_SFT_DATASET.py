#!/usr/bin/env python3
import json,re,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent/'dataset'
EXPECTED={'train.jsonl':371,'val.jsonl':60,'test.jsonl':60}
ALLOWED={'multiple_choice_conceptual','multiple_choice_calculation','numerical_calculation','knowledge_conceptual','mechanism_explanation'}
all_q=set(); errors=[]; stats={}
for name,count in EXPECTED.items():
    p=ROOT/name
    rows=[]
    if not p.exists(): errors.append(f'missing {name}'); continue
    for ln,line in enumerate(p.read_text(encoding='utf-8').splitlines(),1):
        if not line.strip(): continue
        try:r=json.loads(line)
        except Exception as e: errors.append(f'{name}:{ln}: invalid json: {e}'); continue
        rows.append(r)
        msgs=r.get('messages') or []
        if [m.get('role') for m in msgs] != ['system','user','assistant']:
            errors.append(f'{name}:{ln}: roles must be system,user,assistant')
            continue
        q=msgs[1].get('content','').strip(); a=msgs[2].get('content','').strip(); typ=r.get('type'); lang=r.get('language')
        if not q or not a: errors.append(f'{name}:{ln}: empty question/answer')
        if q in all_q: errors.append(f'{name}:{ln}: duplicate question across dataset')
        all_q.add(q)
        if typ not in ALLOWED: errors.append(f'{name}:{ln}: unknown type {typ}')
        if lang not in ('zh-TW','en-US'): errors.append(f'{name}:{ln}: bad language {lang}')
        stats[typ]=stats.get(typ,0)+1
        if typ.startswith('multiple_choice'):
            if lang=='zh-TW': m=re.match(r'^正確答案：([A-E])\.\s*(.+)',a)
            else: m=re.match(r'^Correct answer:\s*([A-E])\.\s*(.+)',a)
            if not m: errors.append(f'{name}:{ln}: MCQ answer does not start with explicit option')
            else:
                letter=m.group(1); opt_text=m.group(2).splitlines()[0].strip()
                om=re.search(rf'\b{letter}\.\s*(.*?)(?=\s+[A-E]\.\s|$)',q)
                if not om: errors.append(f'{name}:{ln}: selected option {letter} missing in question')
                elif opt_text.rstrip('。.') not in om.group(1).rstrip('。.') and om.group(1).rstrip('。.') not in opt_text.rstrip('。.'):
                    errors.append(f'{name}:{ln}: selected option text mismatch')
        if typ in ('multiple_choice_calculation','numerical_calculation'):
            token='計算：' if lang=='zh-TW' else 'Calculation:'
            if token not in a: errors.append(f'{name}:{ln}: calculation section missing')
        if typ=='knowledge_conceptual':
            if lang=='zh-TW' and not (a.startswith('問題：') and '\n\n回答：' in a): errors.append(f'{name}:{ln}: knowledge zh format')
            if lang=='en-US' and not (a.startswith('Question:') and '\n\nAnswer:' in a): errors.append(f'{name}:{ln}: knowledge en format')
        if typ=='mechanism_explanation':
            token='機轉：' if lang=='zh-TW' else 'Mechanism:'
            if token not in a: errors.append(f'{name}:{ln}: mechanism section missing')
    if len(rows)!=count: errors.append(f'{name}: expected {count}, got {len(rows)}')

if errors:
    print('DATASET VALIDATION FAILED')
    for e in errors[:50]: print('[ERROR]',e)
    if len(errors)>50: print(f'... {len(errors)-50} more')
    sys.exit(1)
print('DATASET VALIDATION PASSED')
print('total=',sum(EXPECTED.values()),'unique_questions=',len(all_q))
for k in sorted(stats): print(k,stats[k])

# No separate teacher-priority/gold dataset is permitted in v226.
assert not (ROOT/'teacher_gold.jsonl').exists(), 'teacher_gold.jsonl must not exist; course examples belong in train.jsonl'
