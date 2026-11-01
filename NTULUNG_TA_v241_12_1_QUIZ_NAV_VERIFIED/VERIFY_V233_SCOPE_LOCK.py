#!/usr/bin/env python3
from pathlib import Path
from scope_guard import decision


def found(chapter,score=0.55,ok=True):
    return {
      'ok':ok,
      'context':'synthetic evidence' if ok else '',
      'sources':[{'chapter':str(chapter),'chapter_title':'synthetic'}] if chapter is not None else [],
      'retrieval':{'top_matches':[{'chapter':str(chapter),'score':score}]} if chapter is not None else {'top_matches':[]}
    }

cases=[
  ('正常成人平靜吸氣時肺泡壓力約多少？',found(38),True),
  ('PaCO2 上升會如何影響肺泡通氣？',found(42),True),
  ('What is FRC?',found(38),True),
  ('How does venous return affect cardiac output?',found(20),True),
  ('全身循環中的壓力、流量與阻力之間的關係為何？',found(14,0.62),True),
  ('我今天心情不好',found(57,0.66),False),
  ('幫我寫一份履歷',found(57,0.70),False),
  ('台北有什麼好吃的？',found(65,0.69),False),
  ('腎小球過濾率如何調節？',found(27,0.71),False),
  ('What is the capital of France?',found(57,0.68),False),
]
for q,f,expected in cases:
    d=decision(q,f)
    assert bool(d['in_scope'])==expected,(q,d,expected)

worker=Path('cloudflare/worker/src/index.js').read_text(encoding='utf-8')
server=Path('reference_server.py').read_text(encoding='utf-8')
# Single cloud route must receive scope metadata and return before cloud provider construction/execution.
scope_pos=worker.find("if(ctx.in_scope===false)")
cloud_pos=worker.find("const cloudPromise=(async()=>",scope_pos)
assert scope_pos>=0 and cloud_pos>scope_pos,'Cloud single-answer route is not scope-locked before provider call.'
# Batch cloud route only sends in-scope context items to Local/Cloud solvers.
assert "active=all.filter(x=>x.in_scope!==false&&x.ok&&x.context)" in worker
assert "engine:'scope-rejected'" in worker
# Server is the source of truth for both async local jobs and Worker context routes.
assert "scope=scope_decision(q,found)" in server
assert "engine':'scope-rejected'" in server
assert "'cloud_bypass_allowed':False" in server
print('PASS v233 scope lock:',len(cases),'synthetic scope cases + server/Worker route invariants')
