#!/usr/bin/env python3
from __future__ import print_function
import hashlib, json, os, re, sqlite3, smtplib, ssl, threading, time, uuid, urllib.request, urllib.error
from email.message import EmailMessage
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = Path(os.environ.get('VQ_FEEDBACK_DB', str(ROOT/'feedback'/'feedback.sqlite3')))
ALLOWED_REASONS = {'incorrect','incomplete','unclear','style','positive','too_slow','other'}
ALLOWED_SCOPES = {'single','all','one','multiple'}
MAX_BATCH_SIZE = 40


def _conn():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    c = sqlite3.connect(str(DB_PATH), timeout=10)
    c.execute('''CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      reason TEXT NOT NULL,
      comment TEXT,
      model_key TEXT,
      model_label TEXT,
      engine TEXT,
      cloud_provider TEXT,
      latency_ms REAL,
      source_ids TEXT,
      page_version TEXT,
      report_scope TEXT NOT NULL DEFAULT 'single',
      batch_size INTEGER NOT NULL DEFAULT 1,
      reported_items TEXT NOT NULL DEFAULT '[1]',
      email_status TEXT NOT NULL DEFAULT 'pending',
      email_error TEXT,
      course_id TEXT NOT NULL DEFAULT '',
      question_fingerprint TEXT NOT NULL DEFAULT '',
      correction_status TEXT NOT NULL DEFAULT 'queued',
      correction_answer TEXT,
      correction_sources TEXT NOT NULL DEFAULT '[]',
      correction_summary TEXT,
      correction_error TEXT,
      corrected_at TEXT,
      correction_model_key TEXT,
      feedback_intent TEXT NOT NULL DEFAULT 'repair',
      feedback_focus TEXT NOT NULL DEFAULT '[]'
    )''')
    # Safe migration for v239/v239.1/v239.2/v239.3 databases already on server.
    columns = {row[1] for row in c.execute('PRAGMA table_info(feedback)').fetchall()}
    had_correction_status='correction_status' in columns
    migrations = {
      'report_scope': "TEXT NOT NULL DEFAULT 'single'",
      'batch_size': 'INTEGER NOT NULL DEFAULT 1',
      'reported_items': "TEXT NOT NULL DEFAULT '[1]'",
      'course_id': "TEXT NOT NULL DEFAULT ''",
      'question_fingerprint': "TEXT NOT NULL DEFAULT ''",
      'correction_status': "TEXT NOT NULL DEFAULT 'queued'",
      'correction_answer': 'TEXT',
      'correction_sources': "TEXT NOT NULL DEFAULT '[]'",
      'correction_summary': 'TEXT',
      'correction_error': 'TEXT',
      'corrected_at': 'TEXT',
      'correction_model_key': 'TEXT',
      'feedback_intent': "TEXT NOT NULL DEFAULT 'repair'",
      'feedback_focus': "TEXT NOT NULL DEFAULT '[]'",
    }
    for name, ddl in migrations.items():
        if name not in columns:
            c.execute('ALTER TABLE feedback ADD COLUMN %s %s' % (name, ddl))
    if not had_correction_status:
        # Historical reports did not capture enough structured context to run
        # a trustworthy repair automatically during an upgrade.
        c.execute("UPDATE feedback SET correction_status='rejected', correction_summary='Legacy report retained; submit a new report to start automatic correction.'")
    c.execute('CREATE INDEX IF NOT EXISTS idx_feedback_fingerprint ON feedback(course_id,question_fingerprint,correction_status)')
    c.commit()
    return c


def _provider():
    requested=os.environ.get('VQ_EMAIL_PROVIDER','').strip().lower()
    if requested=='resend' and os.environ.get('VQ_RESEND_API_KEY','').strip(): return 'resend'
    if requested=='smtp' and os.environ.get('VQ_SMTP_HOST','').strip(): return 'smtp'
    if os.environ.get('VQ_RESEND_API_KEY','').strip(): return 'resend'
    if os.environ.get('VQ_SMTP_HOST','').strip(): return 'smtp'
    return ''


def email_configured():
    return bool(os.environ.get('VQ_FEEDBACK_TO_EMAIL','').strip() and _provider())


def status():
    recipient=os.environ.get('VQ_FEEDBACK_TO_EMAIL','').strip()
    expected=os.environ.get('VQ_FEEDBACK_EXPECTED_TO_EMAIL','').strip()
    hint=(recipient[:1]+'***@'+recipient.split('@',1)[1]) if '@' in recipient else None
    return {'enabled': True, 'email_configured': email_configured(), 'email_provider': _provider() or None,
            'email_recipient_hint': hint, 'email_target_matches_expected':bool(recipient and (not expected or recipient.lower()==expected.lower())),
            'storage': 'sqlite', 'auto_correction': True}


def _clean(v, limit):
    s = str(v or '').replace('\x00','').strip()
    return s[:limit]


def _question_fingerprint(value):
    text=unicase_question(value)
    return hashlib.sha256(text.encode('utf-8')).hexdigest() if text else ''


def unicase_question(value):
    text=str(value or '').lower()
    text=re.sub(r'(?mi)^\s*question\s+\d+\s*$', ' ', text)
    text=re.sub(r'(?mi)^\s*第\s*\d+\s*題\s*$', ' ', text)
    return re.sub(r'[^a-z0-9\u3400-\u9fff]+',' ',text).strip()


def _source_ids(value):
    out=[]
    for item in (value if isinstance(value,list) else []):
        if isinstance(item,dict):
            x=item.get('chunk_id') or item.get('id') or item.get('source')
        else:x=item
        if x:
            out.append(_clean(x,160))
        if len(out)>=12:break
    return out


def _int_range(v, default=1):
    try:n=int(v)
    except Exception:return default
    return max(1,min(MAX_BATCH_SIZE,n))


def _reported_items(value, batch_size, scope):
    raw=value if isinstance(value,list) else []
    out=[]
    for x in raw:
        try:n=int(x)
        except Exception:continue
        if 1 <= n <= batch_size and n not in out: out.append(n)
    out.sort()
    if scope=='single': return [1]
    if scope=='all': return list(range(1,batch_size+1))
    if scope=='one': return out[:1] or [1]
    if scope=='multiple': return out if len(out)>=2 else (out or [1])
    return out or [1]


def classify_feedback(reason,comment):
    """Classify student preference, never treat comments as textbook facts."""
    value=str(comment or '').lower();focus=[]
    patterns={
      'incorrect':r'錯誤|不正確|答錯|有誤|\b(?:incorrect|wrong|inaccurate|false)\b',
      'incomplete':r'不完整|不夠完整|不夠詳細|太簡略|欠缺|缺少|漏掉|沒有解釋|需要更多|補充|太短|\b(?:incomplete|missing|too brief|too short|not enough detail|more detail)\b',
      'unclear':r'看不懂|不清楚|模糊|難理解|\b(?:unclear|confusing|hard to understand)\b',
      'style':r'格式|語氣|冗長|太長|條列|排版|寫法|表達|口吻|篇幅|太囉嗦|難讀|\b(?:style|format|wording|verbose|too long|bullet points?)\b'
    }
    for name,pattern in patterns.items():
        if re.search(pattern,value,re.I):focus.append(name)
    if reason in ('incorrect','incomplete','unclear','style') and reason not in focus:focus.insert(0,reason)
    if focus:return 'repair',focus
    if re.search(r'不滿意|不喜欢|不喜歡|不好|不太好|沒幫助|没有帮助|沒有幫助|\b(?:dissatisfied|not satisfied|unhelpful|poor answer)\b',value,re.I):
        return 'repair',['general']
    praise=r'很棒|很好|正確|清楚|完整|有幫助|滿意|謝謝|讚|\b(?:good|great|helpful|correct|clear|complete|thanks|satisfied)\b'
    if reason=='positive' or (reason=='other' and re.search(praise,value,re.I)):
        return 'positive',[]
    if reason=='too_slow':return 'performance',[]
    return 'repair',['general']


def feedback_repair_guidance(row):
    try:focus=json.loads(row.get('feedback_focus') or '[]')
    except Exception:focus=[]
    hints=[]
    if 'incorrect' in focus:hints.append('Recheck the conclusion, direction, numbers, units and every option against source evidence.')
    if 'incomplete' in focus:hints.append('Give the direct answer and the evidence-backed mechanism, conditions and missing comparison.')
    if 'unclear' in focus:hints.append('Define the central term and explain the causal steps in a clear order.')
    if 'style' in focus:hints.append('Use concise, readable paragraphs or short bullets; remove repetition while keeping the full answer.')
    return ' '.join(hints)


def save_feedback(payload):
    if not isinstance(payload,dict):
        raise ValueError('feedback payload must be an object')
    # Batch reports can legitimately be much larger than a single answer.
    question=_clean(payload.get('question'),200000)
    answer=_clean(payload.get('answer'),300000)
    if not question or not answer:
        raise ValueError('question and answer are required')
    reason=_clean(payload.get('reason'),40).lower()
    if reason not in ALLOWED_REASONS:
        reason='other'
    comment=_clean(payload.get('comment'),3000)
    intent,focus=classify_feedback(reason,comment)
    batch_size=_int_range(payload.get('batch_size'),1)
    scope=_clean(payload.get('report_scope'),20).lower()
    if batch_size<=1: scope='single'
    elif scope not in ALLOWED_SCOPES or scope=='single': scope='all'
    items=_reported_items(payload.get('reported_items'),batch_size,scope)
    row={
      'id':uuid.uuid4().hex[:16],
      'created_at':time.strftime('%Y-%m-%dT%H:%M:%S%z'),
      'question':question,
      'answer':answer,
      'reason':reason,
      'comment':comment,
      'model_key':_clean(payload.get('model_key'),80),
      'model_label':_clean(payload.get('model_label'),160),
      'engine':_clean(payload.get('engine'),120),
      'cloud_provider':_clean(payload.get('cloud_provider'),40),
      'latency_ms':float(payload.get('latency_ms') or 0) if str(payload.get('latency_ms') or '').strip() else None,
      'source_ids':json.dumps(_source_ids(payload.get('sources')),ensure_ascii=False),
      'page_version':_clean(payload.get('page_version'),80),
      'report_scope':scope,
      'batch_size':batch_size,
      'reported_items':json.dumps(items,ensure_ascii=False),
      'email_status':'queued' if email_configured() else 'not_configured',
      'email_error':'',
      'course_id':_clean(payload.get('course_id'),96),
      'question_fingerprint':_question_fingerprint(question),
      'correction_status':'queued' if intent=='repair' else ('kept' if intent=='positive' else 'logged'),
      'feedback_intent':intent,
      'feedback_focus':json.dumps(focus,ensure_ascii=False)
    }
    c=_conn()
    try:
        c.execute('''INSERT INTO feedback
          (id,created_at,question,answer,reason,comment,model_key,model_label,engine,cloud_provider,latency_ms,source_ids,page_version,report_scope,batch_size,reported_items,email_status,email_error,course_id,question_fingerprint,correction_status,feedback_intent,feedback_focus)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)''', tuple(row[k] for k in ['id','created_at','question','answer','reason','comment','model_key','model_label','engine','cloud_provider','latency_ms','source_ids','page_version','report_scope','batch_size','reported_items','email_status','email_error','course_id','question_fingerprint','correction_status','feedback_intent','feedback_focus']))
        c.commit()
    finally:c.close()
    if email_configured():
        threading.Thread(target=_send_and_update,args=(row,),daemon=True).start()
    return {'id':row['id'],'created_at':row['created_at'],'saved':True,'email_queued':row['email_status']=='queued',
            'email_status':row['email_status'],'email_provider':_provider() or None,'report_scope':scope,
            'batch_size':batch_size,'reported_items':items,'auto_correction_queued':intent=='repair',
            'correction_status':row['correction_status'],'feedback_intent':intent,'feedback_focus':focus}


def feedback_record(feedback_id):
    c=_conn();c.row_factory=sqlite3.Row
    try:
        row=c.execute('SELECT * FROM feedback WHERE id=?',(str(feedback_id or ''),)).fetchone()
        return dict(row) if row else None
    finally:c.close()


def update_correction(feedback_id,status,answer='',sources=None,summary='',error='',model_key=''):
    status=str(status or '').strip().lower()
    if status not in ('queued','reviewing','ready','rejected','error','kept','logged'):raise ValueError('invalid correction status')
    c=_conn()
    try:
        c.execute('''UPDATE feedback SET correction_status=?,correction_answer=?,correction_sources=?,correction_summary=?,correction_error=?,corrected_at=?,correction_model_key=? WHERE id=?''',
                  (status,_clean(answer,300000),json.dumps(_source_ids(sources),ensure_ascii=False),_clean(summary,3000),_clean(error,3000),time.strftime('%Y-%m-%dT%H:%M:%S%z'),_clean(model_key,80),str(feedback_id or '')))
        c.commit()
    finally:c.close()


def pending_corrections(limit=40):
    """Return saved correction jobs that should resume after a server restart."""
    c=_conn()
    try:
        rows=c.execute("SELECT id FROM feedback WHERE correction_status IN ('queued','reviewing') ORDER BY created_at ASC LIMIT ?",(max(1,min(200,int(limit or 40))),)).fetchall()
        return [row[0] for row in rows]
    finally:c.close()


def resume_pending_emails(limit=100):
    """Resume saved but unsent reports after a service restart (Resend uses a stable idempotency key)."""
    if not email_configured():return 0
    c=_conn();c.row_factory=sqlite3.Row
    try:
        rows=c.execute("SELECT * FROM feedback WHERE email_status='queued' ORDER BY created_at ASC LIMIT ?",
                       (max(1,min(500,int(limit or 100))),)).fetchall()
    finally:c.close()
    for row in rows:
        threading.Thread(target=_send_and_update,args=(dict(row),),daemon=True).start()
    return len(rows)


def _numbered_blocks(value,label):
    text=str(value or '').strip()
    marks=list(re.finditer(r'(?mi)^\s*'+re.escape(label)+r'\s+(\d+)\s*$',text))
    if not marks:return [text] if text else []
    out=[]
    for i,mark in enumerate(marks):
        end=marks[i+1].start() if i+1<len(marks) else len(text)
        out.append(text[mark.end():end].strip())
    return [x for x in out if x]


def find_correction(question,course_id=''):
    fp=_question_fingerprint(question)
    if not fp:return None
    c=_conn();c.row_factory=sqlite3.Row
    try:
        row=c.execute('''SELECT id,correction_answer,correction_sources,correction_summary,correction_model_key,corrected_at
                         FROM feedback WHERE course_id=? AND question_fingerprint=? AND correction_status='ready' AND length(correction_answer)>0
                         ORDER BY corrected_at DESC LIMIT 1''',(_clean(course_id,96),fp)).fetchone()
        if row:
            out=dict(row)
            try:out['sources']=json.loads(out.pop('correction_sources') or '[]')
            except Exception:out['sources']=[]
            return out
        # A report may contain selected items from a batch.  Store one report
        # and one email, while still making each repaired item reusable when a
        # student asks that individual question again.
        rows=c.execute('''SELECT id,question,correction_answer,correction_sources,correction_summary,correction_model_key,corrected_at
                          FROM feedback WHERE course_id=? AND correction_status='ready' AND batch_size>1 AND length(correction_answer)>0
                          ORDER BY corrected_at DESC LIMIT 120''',(_clean(course_id,96),)).fetchall()
        for batch in rows:
            questions=_numbered_blocks(batch['question'],'Question')
            answers=_numbered_blocks(batch['correction_answer'],'Question')
            for index,item in enumerate(questions):
                if _question_fingerprint(item)!=fp or index>=len(answers):continue
                out=dict(batch);out['id']=str(out['id'])+':'+str(index+1);out['correction_answer']=answers[index]
                try:out['sources']=json.loads(out.pop('correction_sources') or '[]')
                except Exception:out['sources']=[]
                out.pop('question',None)
                return out
        return None
    finally:c.close()


def correction_guidance(question,course_id=''):
    """Return only fixed policy hints; student comments never enter future prompts."""
    target=set(unicase_question(question).split())
    if len(target)<2:return ''
    c=_conn();c.row_factory=sqlite3.Row
    try:rows=c.execute("SELECT question,reason,feedback_focus FROM feedback WHERE course_id=? AND correction_status='ready' ORDER BY corrected_at DESC LIMIT 80",(_clean(course_id,96),)).fetchall()
    finally:c.close()
    reasons=[]
    for row in rows:
        terms=set(unicase_question(row['question']).split())
        score=len(target & terms)/float(max(1,len(target | terms)))
        if score>=0.72:
            try:focus=json.loads(row['feedback_focus'] or '[]')
            except Exception:focus=[]
            for name in (focus or [row['reason']]):
                if name not in reasons:reasons.append(name)
    hints=[]
    if 'incorrect' in reasons:hints.append('Recheck the conclusion, option constraints, direction, calculation and units against the evidence before answering.')
    if 'incomplete' in reasons:hints.append('Include the direct conclusion and the key evidence-based mechanism or comparison needed to support it.')
    if 'unclear' in reasons:hints.append('Define the central term and present the causal steps in a short, explicit order.')
    if 'style' in reasons:hints.append('Use concise readable paragraphs or short bullets and avoid repeating the same point.')
    return ' '.join(hints)


def _send_and_update(row):
    try:
        _send_email(row)
        st,err='sent',''
    except Exception as e:
        st,err='failed',str(e)[:1000]
        print('[FEEDBACK_EMAIL] report %s delivery failed: %s'%(row['id'],err),flush=True)
    try:
        c=_conn();c.execute('UPDATE feedback SET email_status=?,email_error=? WHERE id=?',(st,err,row['id']));c.commit();c.close()
    except Exception:pass


def _reason_label(reason):
    return {'incorrect':'Incorrect answer','incomplete':'Incomplete answer','unclear':'Explanation unclear / confusing','style':'Answer style','positive':'Helpful answer','too_slow':'Too slow','other':'Other'}.get(reason,'Feedback')


def _scope_label(scope):
    return {'single':'Single question','all':'All questions','one':'One question','multiple':'Multiple questions'}.get(scope,'Feedback selection')


def _compress_items(items):
    if not items:return 'not recorded'
    out=[];start=prev=items[0]
    for n in items[1:]:
        if n==prev+1:prev=n;continue
        out.append(str(start) if start==prev else '%d-%d'%(start,prev));start=prev=n
    out.append(str(start) if start==prev else '%d-%d'%(start,prev))
    return ', '.join(out)


def _body_text(row):
    try:items=[int(x) for x in json.loads(row.get('reported_items') or '[]')]
    except Exception:items=[]
    return '\n'.join([
      'Feedback ID: '+row['id'],
      'Time: '+row['created_at'],
      'Reason: '+_reason_label(row['reason']),
      'Detected intent: '+(row.get('feedback_intent') or 'repair'),
      'Improvement focus: '+(', '.join(json.loads(row.get('feedback_focus') or '[]')) or 'none'),
      'Report scope: '+_scope_label(row.get('report_scope') or 'single'),
      'Detected batch size: '+str(row.get('batch_size') or 1),
      'Reported questions: '+_compress_items(items),
      'Model: '+(row.get('model_label') or row.get('model_key') or 'unknown'),
      'Engine: '+(row.get('engine') or 'unknown'),
      'Cloud provider: '+(row.get('cloud_provider') or 'off'),
      'Latency: '+(('%.0f ms'%row['latency_ms']) if row.get('latency_ms') is not None else 'unknown'),
      'Source IDs: '+(', '.join(json.loads(row.get('source_ids') or '[]')) or 'not recorded'),
      '', 'QUESTION(S)', row['question'], '', 'AI ANSWER(S)', row['answer'],
      '', 'WHAT WAS UNSATISFACTORY / REQUESTED CHANGE', row.get('comment') or '(No details provided by the student.)'
    ])


def _send_resend(row):
    api_key=os.environ.get('VQ_RESEND_API_KEY','').strip()
    to_addr=os.environ.get('VQ_FEEDBACK_TO_EMAIL','').strip()
    from_addr=os.environ.get('VQ_RESEND_FROM','').strip() or 'NTULUNG Feedback <onboarding@resend.dev>'
    if not api_key or not to_addr:
        raise RuntimeError('Resend feedback email is not configured')
    payload={
      'from':from_addr,
      'to':[to_addr],
      'subject':'[Physiology TA Feedback] %s · %s' % (_reason_label(row['reason']), row.get('model_label') or row.get('model_key') or 'Local LLM'),
      'text':_body_text(row)
    }
    req=urllib.request.Request(
        os.environ.get('VQ_RESEND_API_URL','https://api.resend.com/emails').strip(),
        data=json.dumps(payload,ensure_ascii=False).encode('utf-8'),
        headers={
          'Authorization':'Bearer '+api_key,
          'Content-Type':'application/json',
          'User-Agent':'NTULUNG-TA-v239.4',
          'Idempotency-Key':'feedback/'+row['id']
        },
        method='POST')
    timeout=float(os.environ.get('VQ_RESEND_TIMEOUT','12'))
    try:
        with urllib.request.urlopen(req,timeout=timeout) as r:
            raw=r.read().decode('utf-8','replace')
            data=json.loads(raw or '{}')
            if not data.get('id'):
                raise RuntimeError('Resend accepted request without an email id')
            return data.get('id')
    except urllib.error.HTTPError as e:
        detail=e.read().decode('utf-8','replace')[:1200]
        raise RuntimeError('Resend HTTP %s: %s' % (getattr(e,'code','error'),detail))
    except urllib.error.URLError as e:
        raise RuntimeError('Resend connection failed: %s' % getattr(e,'reason',e))


def _send_smtp(row):
    host=os.environ.get('VQ_SMTP_HOST','').strip();port=int(os.environ.get('VQ_SMTP_PORT','587') or 587)
    user=os.environ.get('VQ_SMTP_USER','').strip();password=os.environ.get('VQ_SMTP_PASSWORD','')
    to_addr=os.environ.get('VQ_FEEDBACK_TO_EMAIL','').strip();from_addr=os.environ.get('VQ_SMTP_FROM_EMAIL','').strip() or user or to_addr
    if not host or not to_addr:raise RuntimeError('SMTP feedback email is not configured')
    msg=EmailMessage();msg['To']=to_addr;msg['From']=from_addr
    msg['Subject']='[Physiology TA Feedback] %s · %s' % (_reason_label(row['reason']), row.get('model_label') or row.get('model_key') or 'Local LLM')
    msg.set_content(_body_text(row))
    use_ssl=str(os.environ.get('VQ_SMTP_SSL','0')).lower() in ('1','true','yes')
    starttls=str(os.environ.get('VQ_SMTP_STARTTLS','1')).lower() not in ('0','false','no')
    timeout=float(os.environ.get('VQ_SMTP_TIMEOUT','10'))
    if use_ssl:
        s=smtplib.SMTP_SSL(host,port,timeout=timeout,context=ssl.create_default_context())
    else:
        s=smtplib.SMTP(host,port,timeout=timeout)
    try:
        if starttls and not use_ssl:s.starttls(context=ssl.create_default_context())
        if user:s.login(user,password)
        s.send_message(msg)
    finally:
        try:s.quit()
        except Exception:pass


def _send_email(row):
    provider=_provider()
    if provider=='resend': return _send_resend(row)
    if provider=='smtp': return _send_smtp(row)
    raise RuntimeError('Developer feedback email is not configured')


def send_test_email():
    row={
      'id':'test-'+uuid.uuid4().hex[:10],
      'created_at':time.strftime('%Y-%m-%dT%H:%M:%S%z'),
      'question':'Question 1\nThis is a test message from the NTULUNG student feedback system.',
      'answer':'AI Answer 1\nIf you received this email, Resend delivery is configured correctly.',
      'reason':'other','comment':'Configuration test only.','model_key':'test','model_label':'NTULUNG Feedback Test',
      'engine':'system-test','cloud_provider':'off','latency_ms':0,'source_ids':'[]','page_version':'v239.4-dynamic-batch-feedback',
      'report_scope':'single','batch_size':1,'reported_items':'[1]'
    }
    email_id=_send_email(row)
    return {'ok':True,'provider':_provider(),'email_id':email_id,'to':os.environ.get('VQ_FEEDBACK_TO_EMAIL','').strip()}
