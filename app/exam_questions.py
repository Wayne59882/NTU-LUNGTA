"""Source-grounded, reviewed four-choice questions for uploaded courses.

The model drafts in batches while course preparation runs in the background.
Only structurally sound questions whose answer a separate blinded review can
recover from the same uploaded evidence enter the student question bank.
"""
import hashlib
import json
import re

FIRST_BATCH_SIZE=3  # Unlock a two-question draw after the first review.
BATCH_SIZE=12


def _parse_object(raw):
    text=str(raw or '').strip()
    start=text.find('{');end=text.rfind('}')
    if start<0 or end<=start:return {}
    try:
        value=json.loads(text[start:end+1])
        return value if isinstance(value,dict) else {}
    except (ValueError,TypeError):return {}


def _language(text):
    han=len(re.findall(r'[\u3400-\u9fff]',text))
    latin=len(re.findall(r'[A-Za-z]',text))
    return 'zh-TW' if han>=20 and han>latin//3 else 'en'


def evidence_rows(chunks,sentences):
    by_chunk={}
    for row in sentences(chunks):by_chunk.setdefault(row['evidence_chunk_id'],[]).append(row['text'])
    rows=[];seen=set()
    for chunk in chunks:
        facts=by_chunk.get(chunk['id'],[])
        for i,fact in enumerate(facts):
            key=' '.join(fact.casefold().split())
            if key in seen:continue
            seen.add(key)
            context=' '.join(facts[max(0,i-1):min(len(facts),i+2)])[:1000]
            language=_language(fact)
            if language=='en' and len(re.findall(r'[A-Za-z]',fact))<45:continue
            if language=='zh-TW' and len(re.findall(r'[\u3400-\u9fff]',fact))<25:continue
            rows.append({'id':'e'+hashlib.sha1((chunk['id']+'|'+fact).encode('utf-8')).hexdigest()[:14],
                         'anchor':fact,'context':context,'chunk_id':chunk['id'],'language':language})
    # Slide decks and lecture notes often contain coherent bullet groups with
    # no sentence-final punctuation. Let the model work from bounded passages,
    # while the same structural and blinded-answer review still applies.
    if len(rows)<10:
        for chunk in chunks:
            words=str(chunk.get('text') or '').split()
            for start in range(0,len(words),90):
                passage=' '.join(words[start:start+90]).strip()
                if len(passage)<100 or re.search(r'[\ue000-\uf8ff\ufffd]|\.indd\b|copyright|isbn',passage,re.I):continue
                key=' '.join(passage.casefold().split())
                if key in seen:continue
                seen.add(key);language=_language(passage)
                rows.append({'id':'e'+hashlib.sha1((chunk['id']+'|'+passage).encode('utf-8')).hexdigest()[:14],
                             'anchor':passage,'context':passage[:1000],
                             'chunk_id':chunk['id'],'language':language})
    return rows


def _valid_reasons(raw,language):
    if not isinstance(raw,list) or len(raw)!=4 or not all(isinstance(x,str) for x in raw):return None
    reasons=[' '.join(x.split()) for x in raw]
    if any(len(x)<12 or len(x)>300 for x in reasons):return None
    if re.search(r'[\ue000-\uf8ff\ufffd]',' '.join(reasons)):return None
    if language=='en' and re.search(r'[\u3400-\u9fff]',' '.join(reasons)):return None
    return reasons


def _draft_valid(raw,evidence,used_stems):
    if not isinstance(raw,dict) or str(raw.get('evidence_id') or '')!=evidence['id']:return None
    stem=' '.join(str(raw.get('stem') or '').split())
    choices=raw.get('choices');reasons=raw.get('choice_explanations')
    answer=raw.get('answer')
    if isinstance(answer,str) and answer.strip().upper() in 'ABCD' and len(answer.strip())==1:
        answer='ABCD'.index(answer.strip().upper())
    if isinstance(answer,bool) or not isinstance(answer,int) or answer not in range(4):return None
    if not isinstance(choices,list) or len(choices)!=4 or not all(isinstance(x,str) for x in choices):return None
    choices=[' '.join(re.sub(r'^\s*[A-D][.)]\s*','',x).split()) for x in choices]
    lang=evidence['language']
    # Compact drafts omit explanations; the blinded reviewer supplies them.
    # Legacy drafts may include explanations as a fallback.
    if reasons is not None:
        reasons=_valid_reasons(reasons,lang)
        if reasons is None:return None
    if len(stem)<(35 if lang=='zh-TW' else 55) or len(stem)>700 or not stem.endswith(('?','？')):return None
    if re.search(r'_{2,}|complete this statement|fill in the blank|according to (?:the )?(?:passage|course material|textbook)',stem,re.I):return None
    if any(len(x)<3 or len(x)>260 for x in choices) or len({x.casefold() for x in choices})!=4:return None
    if re.search(r'[\ue000-\uf8ff\ufffd]',stem+' '.join(choices)):return None
    if lang=='en' and re.search(r'[\u3400-\u9fff]',stem+' '.join(choices)):return None
    if lang=='zh-TW' and len(re.findall(r'[\u3400-\u9fff]',stem))<25:return None
    # Numbers in cases must come from the teaching evidence; invented patient
    # measurements make a plausible looking answer impossible to audit.
    source_numbers=set(re.findall(r'\d+(?:\.\d+)?',evidence['context']))
    if not set(re.findall(r'\d+(?:\.\d+)?',stem)).issubset(source_numbers):return None
    normalized=re.sub(r'\W+','',stem.casefold())
    if normalized in used_stems:return None
    return {'stem':stem,'choices':choices,'answer':answer,'choice_explanations':reasons,'normalized':normalized}


def _generate(batch,unit_title,model_key,model_call):
    language=batch[0]['language']
    system=('大學課程情境題出題者 EXAM_MCQ_GENERATE. Return only valid JSON. '
            'Write original professional licensing-exam-style single-best-answer questions. '
            'For every evidence_id, write ONE complete question with meaningful context, four parallel plausible options, '
            'one unambiguously best answer. Keep the JSON compact; the independent review writes option explanations. '
            'Ask about a mechanism, comparison, application or inference supported by the supplied course text. '
            'Never write a cloze, quote-completion task, generic classroom preface, or copy an official exam question. '
            'Do not invent measured values, patient findings or factual assertions absent from the evidence. '
            'Use English throughout for English evidence; for Chinese evidence use Traditional Chinese with necessary technical terms. '
            'Schema: {"questions":[{"evidence_id":"...","stem":"...？",'
            '"choices":["...","...","...","..."],"answer":0}]}.')
    user=('COURSE: '+str(unit_title)+'\nLANGUAGE: '+language+'\n'
          'Make one question per evidence_id. Ground the keyed option in its anchor and context. '
          'If the evidence cannot support a unique answer, omit that evidence_id.\nEVIDENCE_JSON:\n'+
          json.dumps(batch,ensure_ascii=False))
    raw=model_call(model_key,system,user,max(1800,min(4600,390*len(batch))))
    drafts=_parse_object(raw).get('questions')
    if not isinstance(drafts,list) or (not drafts and len(batch)>FIRST_BATCH_SIZE):
        if len(batch)<=FIRST_BATCH_SIZE:return []
        middle=len(batch)//2
        return _generate(batch[:middle],unit_title,model_key,model_call)+_generate(batch[middle:],unit_title,model_key,model_call)
    return drafts


def _review(batch,model_key,model_call):
    system=('大學課程情境題出題者 EXAM_MCQ_REVIEW. Return only valid JSON. '
            'Independently solve each question from the uploaded evidence. You do not see the proposed answer. '
            'Set valid=true only if the complete stem is clear, all four choices address the same task, '
            'exactly one answer is supported, the source contains enough facts, and the language matches. '
            'Reject invented physiology, ambiguous choices, fragmentary wording and fill-in-the-blank questions. '
            'For valid questions write four short, source-grounded explanations, one for each option; '
            'for rejected questions omit explanations. '
            'Schema: {"reviews":[{"evidence_id":"...","valid":true,"best_choice":0,'
            '"choice_explanations":["why A is right/wrong","why B...","why C...","why D..."]}]}')
    user='QUESTIONS_AND_EVIDENCE_JSON:\n'+json.dumps(batch,ensure_ascii=False)
    raw=model_call(model_key,system,user,max(1100,min(3400,280*len(batch))))
    reviews=_parse_object(raw).get('reviews') or []
    verdicts={str(r.get('evidence_id')):r for r in reviews if isinstance(r,dict)}
    missing=[r for r in batch if r['evidence_id'] not in verdicts]
    if missing and len(batch)>FIRST_BATCH_SIZE:
        if len(missing)==len(batch):
            middle=len(batch)//2
            verdicts.update(_review(batch[:middle],model_key,model_call))
            verdicts.update(_review(batch[middle:],model_key,model_call))
        else:verdicts.update(_review(missing,model_key,model_call))
    return verdicts


def build(unit,chunks,sentences,existing,model_key,model_call,progress,target=100,max_new_facts=None):
    evidence=evidence_rows(chunks,sentences)
    cards=[r for r in existing if isinstance(r,dict) and (r.get('question') or {}).get('generation_method')=='exam-mcq-v5']
    # A short readiness pass must never discard questions already saved by a
    # previous release or an earlier background pass.
    cards=cards[:100]
    used_anchors={r.get('source_statement') for r in cards}
    used_stems={re.sub(r'\W+','',r['question']['stem'].casefold()) for r in cards}
    remaining=[r for r in evidence if r['anchor'] not in used_anchors]
    processed=len(evidence)-len(remaining)
    if max_new_facts is not None:remaining=remaining[:max(0,int(max_new_facts))]
    progress(cards,len(evidence),processed)
    offset=0
    while offset<len(remaining) and len(cards)<target:
        size=FIRST_BATCH_SIZE if offset==0 and len(cards)<2 else BATCH_SIZE
        group=[]
        for row in remaining[offset:offset+size]:
            if group and row['language']!=group[0]['language']:break
            group.append(row)
        offset+=len(group)
        try:drafts=_generate(group,unit['title'],model_key,model_call)
        except Exception as exc:raise RuntimeError('Selected model could not draft exam questions: '+str(exc))
        lookup={r['id']:r for r in group};candidates=[]
        for raw in drafts if isinstance(drafts,list) else []:
            if not isinstance(raw,dict):continue
            source=lookup.get(str(raw.get('evidence_id') or ''))
            if not source or source['anchor'] in used_anchors:continue
            card=_draft_valid(raw,source,used_stems)
            if card:candidates.append((source,card))
        if candidates:
            review_input=[{'evidence_id':source['id'],'anchor':source['anchor'],'context':source['context'],
                           'stem':card['stem'],'choices':card['choices']} for source,card in candidates]
            try:verdicts=_review(review_input,model_key,model_call)
            except Exception as exc:raise RuntimeError('Selected model could not review exam questions: '+str(exc))
            for source,card in candidates:
                verdict=verdicts.get(source['id']) or {}
                if verdict.get('valid') is not True or verdict.get('best_choice')!=card['answer']:continue
                if source['anchor'] in used_anchors or card['normalized'] in used_stems:continue
                reasons=(_valid_reasons(verdict['choice_explanations'],source['language'])
                         if 'choice_explanations' in verdict else card['choice_explanations'])
                if reasons is None:continue
                qid='%s_exam%03d'%(unit['id'],len(cards)+1);seed_id=qid+'_seed'
                explanation='\n'.join('%s. %s'%(letter,reason) for letter,reason in zip('ABCD',reasons))
                question={'id':qid,'source_seed_id':seed_id,'stem':card['stem'],'choices':card['choices'],
                          'answer':card['answer'],'explanation':explanation,'evidence_statement':source['anchor'],
                          'evidence_chunk_id':source['chunk_id'],'generation_method':'exam-mcq-v5'}
                cards.append({'id':seed_id,'source_concept':card['choices'][card['answer']],
                              'source_statement':source['anchor'],'evidence_chunk_id':source['chunk_id'],
                              'generation_method':'exam-mcq-v5','question':question})
                used_anchors.add(source['anchor']);used_stems.add(card['normalized'])
                if len(cards)>=target:break
        processed+=len(group)
        progress(cards,len(evidence),processed)
    return cards
