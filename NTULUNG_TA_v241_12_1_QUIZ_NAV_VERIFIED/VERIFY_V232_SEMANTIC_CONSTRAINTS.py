#!/usr/bin/env python3
from pathlib import Path
import json
import reference_server

Q='正常成人在平靜自然呼吸下，吸氣動作尚未停止時，其肺泡內之壓力（PA）約為多少 cm H2O？\nA.10\nB.1\nC.-1\nD.-10'
assert reference_server.detect_question_type(Q)=='multiple_choice_conceptual'
assert reference_server.semantic_qualifier_risk(Q) is True
opts=dict(reference_server.parse_mcq_options(Q))
assert opts=={'A':'10','B':'1','C':'-1','D':'-10'},opts
prompt=reference_server.mcq_solver_prompt(Q,'dummy grounding','zh-TW','multiple_choice_conceptual')
for token in ('phase','timing','sign/direction','dynamic in-progress state','constraint_summary','decisive_relation','constraint_check'):
    assert token in prompt,token
guard=reference_server.semantic_constraint_safeguards()
assert '500 mL' not in guard and 'carbon monoxide' not in guard
# Corpus-coverage regression only: verify the existing Guyton corpus contains the decisive relation.
found=False
for line in Path('reference_corpus/chunks.jsonl').read_text(encoding='utf-8').splitlines():
    if not line.strip(): continue
    text=str(json.loads(line).get('text',''))
    low=text.lower()
    if 'during normal inspiration' in low and 'alveolar pressure decreases to about' in low and '1 cm h2o' in low:
        found=True; break
assert found,'Existing Guyton corpus lacks the known inspiration/alveolar-pressure relation'
print('V232 SEMANTIC-CONSTRAINT REGRESSION PASSED')
