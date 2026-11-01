(function(){
'use strict';
/*
 v229 Reference Textbook micro-batch execution
 - Multi-question MCQs are sent to one server-side batch endpoint.
 - The server dynamically groups up to 4 items per LLM call for accuracy-first reasoning.
 - Every item is solved by an LLM and receives a mandatory semantic verification pass.
 - Deterministic checks are validation safeguards only; they never replace LLM understanding.
 - Optional BYOK GPT-5.6 Luna remains a backup path; v229 gives Local 10 s before cloud starts.
 - Single-question behavior remains unchanged.
*/
const $=id=>document.getElementById(id);
function fallbackSplitBatch(raw){
function normalizeNewlines(text){
  return String(text || '').replace(/\r\n?|\u2028|\u2029/g,'\n').replace(/\u00a0/g,' ').trim();
}

function optionLetters(text){
  const seen = new Set();
  const re = /(?:^|[\n\r\t ]+)(?:\*\*)?[(（]?([A-EＡ-Ｅ])\s*[.．、:：)）]\s*/gi;
  let m;
  while((m=re.exec(String(text||'')))) seen.add(m[1].normalize('NFKC').toUpperCase());
  return seen;
}

function isCompleteMcq(text){
  const s=optionLetters(text);
  return s.has('A') && s.has('B') && s.has('C') && s.has('D');
}

function stripTrailingExamMetadata(segment){
  let s=String(segment||'');
  // Only remove known prose/separator metadata. IMPORTANT: numeric Markdown
  // headings such as "### 2" are valid question boundaries, not metadata.
  if(isCompleteMcq(s)){
    const markers=[/\n\s*以上為[^\n]*/m,/\n\s*-{3,}\s*(?:\n|$)/m,/\n\s*#{1,6}\s+(?!\d{1,3}(?:\s|[.．、:：)）]|$))[^\n]*/m];
    let cut=s.length;
    for(const re of markers){const m=re.exec(s); if(m && m.index<cut) cut=m.index;}
    if(cut<s.length) s=s.slice(0,cut);
  }
  return s.trim();
}
function cleanQuestionSegment(segment){
  let s=normalizeNewlines(segment);
  // Form 1: a standalone question heading, e.g. "### 2", "2", "2.【原第25題】".
  s=s.replace(/^\s*(?:#{1,6}\s*)?(?:\*\*)?\s*\d{1,3}\s*(?:[.．、:：)）])?\s*(?:【[^】\n]*】)?\s*(?:\*\*)?\s*(?:\n+|$)/,'');
  // Form 2: a numbered prefix followed by the stem on the same line.
  s=s.replace(/^\s*(?:#{1,6}\s*)?(?:\*\*)?\s*\d{1,3}\s*[.．、:：)）]\s*(?:【[^】\n]*】)?\s*(?:\*\*)?\s*/,'');
  s=stripTrailingExamMetadata(s);
  s=s.replace(/^(?:\s*-{3,}\s*\n)+/,'').trim();
  return s;
}
function splitQuestionBatch(raw){
  const text=normalizeNewlines(raw);
  if(!text) return [];

  // Accept the forms users actually paste from ChatGPT / exam documents:
  //   2. stem...      2、stem...      2.【metadata】 stem...
  //   ### 2           2               ### 2.【metadata】
  // Circled sub-items ①②③ are never top-level boundaries.
  const lineRe=/^\s*(?:#{1,6}\s*)?(?:\*\*)?\s*(\d{1,3})(?:(?:\s*[.．、:：)）]\s*(?:【[^】\n]*】)?\s*(?:\*\*)?\s*.*)|(?:\s*(?:【[^】\n]*】)?\s*(?:\*\*)?\s*))$/gm;
  const rawStarts=[]; let m;
  while((m=lineRe.exec(text))) rawStarts.push({index:m.index,number:Number(m[1])});

  // Filter false numeric boundaries by requiring the following segment to
  // contain a complete A-D MCQ. This lets us safely support a bare "2" line.
  const starts=[];
  for(let i=0;i<rawStarts.length;i++){
    const st=rawStarts[i], end=i+1<rawStarts.length?rawStarts[i+1].index:text.length;
    const seg=cleanQuestionSegment(text.slice(st.index,end));
    const letters=optionLetters(seg);
    // Keep a partial numbered item too: a missing option must never erase a question.
    if(isCompleteMcq(seg) || (letters.has('A') && letters.size>=2) || /^[^\n]*[?？]/.test(seg)) starts.push(st);
  }

  const candidates=[];
  if(starts.length){
    const prefix=stripTrailingExamMetadata(text.slice(0,starts[0].index));
    if(isCompleteMcq(prefix)) candidates.push(prefix);
    for(let i=0;i<starts.length;i++){
      const end=i+1<starts.length?starts[i+1].index:text.length;
      const seg=cleanQuestionSegment(text.slice(starts[i].index,end));
      if(seg) candidates.push(seg);
    }
  }else if(isCompleteMcq(text)){
    candidates.push(cleanQuestionSegment(text));
  }

  if(candidates.length<2) return candidates.length===1?[candidates[0]]:[text];
  return candidates;
}


  const parts=splitQuestionBatch(raw); return parts.length>=2?parts:[];
}
window.VQ_fallbackSplitBatch238=fallbackSplitBatch;
function modelKey(){const s=$('localModelSelect');return (s&&s.value)||'granite';}
function cloudConfig(){
  const c=(window.VQ_getCloudConfig&&window.VQ_getCloudConfig())||{provider:'off',apiKey:''};
  return {provider:String(c.provider||'off'),apiKey:String(c.apiKey||'').trim()};
}
function questionLanguage(q){
  try{
    if(window.VQ_resolveInputLanguage)return String(window.VQ_resolveInputLanguage(String(q||''),null)||'zh-TW');
    if(window.VQ_detectLanguage)return String(window.VQ_detectLanguage(String(q||''))||'zh-TW');
  }catch(_){ }
  return 'zh-TW';
}
function updateProgress(text){try{const box=$('teacherAnswer');if(box)box.textContent=text;}catch(_){ }}
function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
async function pollBatchJob(jobId,maxMs){
  const started=Date.now();
  while(Date.now()-started<maxMs){
    const r=await fetch('/api/reference/job-status?id='+encodeURIComponent(jobId),{cache:'no-store'});
    const d=await r.json().catch(()=>({error:'Invalid job response'}));
    if(!r.ok)throw new Error(friendlyError(d,r.status));
    if(d.status==='done')return d.result||{};
    if(d.status==='error')throw new Error(String(d.error||d.message||'Local batch failed'));
    updateProgress('正在處理 '+String(d.progress||0)+'% · '+String(d.message||'Local model working')+'…');
    await sleep(1800);
  }
  throw new Error('Local batch job timed out.');
}
function friendlyError(d,status){
  const code=String(d&&d.code||'');
  if(code==='cloud_api_key_required')return 'Please enter the API Key for the selected cloud model, or choose Off — Local only.';
  if(code==='cloud_auth_failed')return 'The cloud API key is invalid, lacks permission, or has no available quota. Please check the API key.';
  return String(d&&d.detail||d&&d.error||('HTTP '+status));
}
function formatAnswers(data,total){
  const rows=Array.isArray(data&&data.answers)?data.answers:[];
  const byId=new Map(rows.map(x=>[Number(x&&x.id),x]));
  const out=[];
  for(let i=1;i<=total;i++){
    const x=byId.get(i),a=String(x&&x.answer||'').trim()||'此題目前無法產生可靠答案。';
    const tag=String(x&&x.answer_language||'zh-TW');
    const heading=/^zh/i.test(tag)?('第 '+String(i)+' 題'):('Question '+String(i));
    out.push(heading+'\n'+a);
  }
  return out.join('\n\n');
}
function install(){
  if(window.VQ_BATCH229_WRAPPED)return true;
  const current=window.VQ_generateFinalAnswer;
  if(typeof current!=='function'||current.__vqBatch229)return false;
  const original=current;
  const wrapped=async function(raw){
    const text=String(raw||'').trim();
    const splitter=window.VQ_splitQuestionBatch;
    let items=typeof splitter==='function'?splitter(text):[text];
    // Defense in depth: if an older/failed parser collapses a Markdown batch
    // (e.g. headings `### 2` or bare `2`) into one item, parse it again here.
    if(!Array.isArray(items)||items.length<2){const fb=fallbackSplitBatch(text);if(fb.length>=2)items=fb;}
    if(!Array.isArray(items)||items.length<2)return original.call(window,raw);
    const cloud=cloudConfig();
    if(cloud.provider!=='off'&&!cloud.apiKey)return 'Please enter the API Key for the selected cloud model, or choose Off — Local only.';
    const all=[];
    const terminal=x=>/^(?:scope-rejected|reference-search-no-evidence|auto-corrected-answer-memory)$/.test(String(x&&x.engine||''));
    const clean=value=>window.VQ_cleanStudentAnswer?window.VQ_cleanStudentAnswer(value):String(value||'').trim();
    const valid=(q,a)=>window.VQ_validateStudentAnswer?window.VQ_validateStudentAnswer(q,a).ok:!!clean(a);
    const failed=(id,lang)=>({id,answer:/^zh/i.test(lang)?'此題尚未完成：未取得完整且格式有效的答案，請重試此題。':'This question is unfinished: no complete, valid answer was received. Please retry this question.',answer_language:lang,engine:'answer-incomplete',status:'error'});
    // Local uses an asynchronous job. Cloud sends small requests so one long
    // request cannot lose the entire pasted set. No question is silently sliced off.
    const chunkSize=cloud.provider==='off'?40:4;
    window.VQ_LAST_BATCH_META={active:true,total:items.length,completed:0,version:'v241.12.4'};
    for(let offset=0;offset<items.length;offset+=chunkSize){
      const group=items.slice(offset,offset+chunkSize);
      updateProgress('正在處理第 '+(offset+1)+'–'+(offset+group.length)+' 題 / '+items.length+' 題…'+(all.length?'\n\n'+formatAnswers({answers:all},all.length):''));
      let data={answers:[]},batchError='';
      try{
        if(group.length===1){
          data={answers:[{id:1,answer:await original.call(window,group[0]),answer_language:questionLanguage(group[0])}]};
        }else if(cloud.provider==='off'){
          const sr=await fetch('/api/reference/batch-job-start',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({questions:group,model_key:modelKey()}),cache:'no-store'});
          const sd=await sr.json().catch(()=>({error:'Invalid server response'}));
          if(!sr.ok||!sd.job_id)throw new Error(friendlyError(sd,sr.status));
          data=await pollBatchJob(sd.job_id,Math.max(1800000,group.length*120000));
        }else{
          const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),300000);
          try{
            const body={questions:group,model_key:modelKey(),cloud_provider:cloud.provider,cloud_api_key:cloud.apiKey,language_tags:group.map(questionLanguage)};
            const r=await fetch('/api/reference/answer-batch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),cache:'no-store',signal:controller.signal});
            data=await r.json().catch(()=>({error:'Invalid server response'}));
            if(!r.ok)throw new Error(friendlyError(data,r.status));
          }finally{clearTimeout(timer);}
        }
      }catch(e){batchError=String(e&&e.message||e);console.error('[VQ batch]',e);}
      const byId=new Map((Array.isArray(data.answers)?data.answers:[]).map(x=>[Number(x&&x.id),x]));
      for(let i=0;i<group.length;i++){
        let row=byId.get(i+1),lang=String(row&&row.answer_language||questionLanguage(group[i]));
        // The server already tried malformed answers once. Retry only a missing
        // result or a legacy server's incomplete response, never a known error.
        if(!batchError && !(row&&row.status==='error') && !terminal(row) && !valid(group[i],row&&row.answer)){
          try{const answer=await original.call(window,group[i]);row=valid(group[i],answer)?{id:i+1,answer,answer_language:lang,engine:'individual-recovery'}:failed(i+1,lang);}catch(_){row=failed(i+1,lang);}
        }
        if(batchError || !row || (!terminal(row)&&row.status!=='error'&&!valid(group[i],row.answer)))row=failed(i+1,lang);
        row={...row,id:offset+i+1,answer:clean(row.answer),answer_language:lang};
        all.push(row);
      }
      window.VQ_LAST_BATCH_META.completed=all.filter(x=>x.status!=='error').length;
      updateProgress(formatAnswers({answers:all},all.length));
    }
    const data={answers:all,batch_size:items.length,engine:cloud.provider==='off'?'local-microbatch':cloud.provider+'-api-microbatch'};
    window.VQ_REFERENCE_BATCH_LAST_META=data;
    window.VQ_LAST_BATCH_META={...window.VQ_LAST_BATCH_META,active:false,failed:all.filter(x=>x.status==='error').length,cloud_started:cloud.provider!=='off'};
    return formatAnswers(data,items.length);
  };
  wrapped.__vqBatch229=true;wrapped.__vqBatch229Original=original;
  window.VQ_generateFinalAnswer=wrapped;
  window.VQ_BATCH229_WRAPPED=true;
  window.VQ_REFERENCE_MICROBATCH_229=true;
  console.log('[VQ] v238 robust-batch accuracy-first async micro-batch installed');
  return true;
}
window.VQ_installBatch229=install;
function schedule(){setTimeout(install,1250);setTimeout(install,2100);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
})();
