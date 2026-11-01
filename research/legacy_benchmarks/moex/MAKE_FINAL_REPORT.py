#!/usr/bin/env python3
from __future__ import print_function
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'benchmark/output'
def j(name):
    p=OUT/name
    return json.loads(p.read_text(encoding='utf-8')) if p.exists() else None
base=j('guyton_v229_baseline.json') or {};opt=j('guyton_v231_optimized.json') or {};diag=j('guyton_v231_diagnosis.json') or {};exp=j('expanded_v231_optimized.json');dec=j('FINAL_V231_DECISION.json') or {}
lines=['# v231 MOEX Benchmark Final Report','',
       '## Accuracy','',
       '| Configuration | Correct | Total | Accuracy | Elapsed |','|---|---:|---:|---:|---:|',
       '| v229-compatible Guyton baseline | %s | %s | %.2f%% | %ss |'%(base.get('correct','-'),base.get('total','-'),100*float(base.get('accuracy') or 0),base.get('elapsed_sec','-')),
       '| v231 optimized Guyton | %s | %s | %.2f%% | %ss |'%(opt.get('correct','-'),opt.get('total','-'),100*float(opt.get('accuracy') or 0),opt.get('elapsed_sec','-'))]
if exp:
    lines.append('| v231 optimized Guyton + Beachey + Vander | %s | %s | %.2f%% | %ss |'%(exp.get('correct','-'),exp.get('total','-'),100*float(exp.get('accuracy') or 0),exp.get('elapsed_sec','-')))
lines += ['', '## Error trace after v231 Guyton optimization','']
for k,v in sorted((diag.get('category_counts') or {}).items(),key=lambda kv:(-kv[1],kv[0])):lines.append('- %s: %s'%(k,v))
lines += ['', 'High-confidence corpus coverage gaps: %s'%diag.get('high_confidence_corpus_gaps',0),
          'Supplemental A/B test required: %s'%diag.get('supplemental_ab_test_needed',False),'',
          '## Final decision','',
          '**Selected corpus: %s**'%dec.get('choice','unknown'),'','**Selected agent profile: %s**'%dec.get('profile','unknown'),'',dec.get('reason',''),'',
          'Selection rule: '+str(dec.get('selection_rule','')),'',
          '## Methodology guardrails','',
          '- Official MOEX answers are withheld from production retrieval and answer prompts.',
          '- No MOEX answer is used for fine-tuning, per-question runtime rules, or a separate knowledge validator.',
          '- Official answers are used only after the response for scoring and post-hoc error diagnosis.',
          '- Beachey and Vander are activated only when the trace indicates a current-corpus coverage problem, and retained only if accuracy strictly improves.',
          '- Rau is excluded.','']
(OUT/'FINAL_V231_REPORT.md').write_text('\n'.join(lines),encoding='utf-8')
print('[OK]',OUT/'FINAL_V231_REPORT.md')
