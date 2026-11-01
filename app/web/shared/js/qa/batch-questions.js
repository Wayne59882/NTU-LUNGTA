(function(){
'use strict';

/*
 v228 multi-question MCQ batch orchestrator
 - Detects pasted batches containing multiple numbered A/B/C/D exam items.
 - Preserves an unnumbered first item (common when copied from an exam list).
 - Ignores exam/year headings and circled sub-items such as ①②③.
 - Sends every detected item through the existing v227 single-question pipeline,
   so each item keeps its own retrieval, Stage-1 audit, conditional Stage-2 review,
   language routing, cloud fallback policy, and answer cleanup.
 - Single-question behavior is unchanged.
*/

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

function cleanStudentText(value){
  return String(value||'').replace(/[\u{1F000}-\u{1FAFF}\u2600-\u26FF\u2700-\u27BF\uFE0E\uFE0F\u200D\u20E3]/gu,'').trim();
}
function validateStudentAnswer(question,value){
  const answer=cleanStudentText(value),letters=optionLetters(question),reasons=[];
  if(!answer || /[,，:：;；-]$/.test(answer) || /(?:因此|所以|because|therefore|and|or|which|that)\s*$/i.test(answer))reasons.push('incomplete');
  if(letters.size>=2){
    const heads=[...answer.matchAll(/(?:正確答案|正确答案|correct\s+answer)\s*[:：]\s*([A-E])\b/gi)];
    if(heads.length!==1 || !letters.has(heads[0][1].toUpperCase()))reasons.push('invalid-option');
    const explanation=answer.match(/(?:解釋|解释|Explanation)\s*[:：]\s*([\s\S]+)/i);
    if(!explanation || !explanation[1].trim())reasons.push('missing-explanation');
  }
  return {ok:reasons.length===0,answer,reasons};
}
window.VQ_cleanStudentAnswer=cleanStudentText;
window.VQ_validateStudentAnswer=validateStudentAnswer;
window.VQ_readQuestionText=el=>normalizeNewlines(el?(typeof el.innerText==='string'?el.innerText:el.textContent):'');
function updateProgress(done,total){
  try{
    const box=document.getElementById('teacherAnswer');
    if(box) box.textContent='正在逐題處理多題問題：'+done+' / '+total;
  }catch(_){ }
}

function formatBatchAnswer(index,answer){
  const a=String(answer||'').trim() || '此題目前無法產生可靠答案。';
  return String(index)+'. '+a;
}

function install(){
  if(window.VQ_BATCH228_WRAPPED) return true;
  const current=window.VQ_generateFinalAnswer;
  if(typeof current!=='function' || current.__vqBatch228) return false;
  const original=current;

  const wrapped=async function(raw){
    const input=String(raw||'').trim();
    const items=splitQuestionBatch(input);
    if(items.length<2) return original.call(window,raw);

    const answers=[];
    window.VQ_LAST_BATCH_META={active:true,total:items.length,completed:0,version:'v228'};
    for(let i=0;i<items.length;i++){
      updateProgress(i+1,items.length);
      let ans;
      try{
        ans=await original.call(window,items[i]);
      }catch(err){
        console.error('[VQ v228 batch] item failed',i+1,err);
        ans='此題處理時發生錯誤，請稍後重試。';
      }
      answers.push(formatBatchAnswer(i+1,ans));
      window.VQ_LAST_BATCH_META.completed=i+1;
    }
    window.VQ_LAST_BATCH_META.active=false;
    return answers.join('\n\n');
  };

  wrapped.__vqBatch228=true;
  wrapped.__vqBatchOriginal=original;
  window.VQ_generateFinalAnswer=wrapped;
  window.VQ_BATCH228_WRAPPED=true;
  window.VQ_MULTI_QUESTION_BATCH=true;
  console.log('[VQ] v238 robust multi-question parser/fallback orchestrator installed');
  return true;
}

window.VQ_splitQuestionBatch=splitQuestionBatch;
window.VQ_installBatch228=install;

function scheduleInstall(){
  // v204.3 single-submission guard installs after 500 ms. Install this wrapper
  // afterwards so duplicate whole-batch submissions are still guarded while the
  // per-question calls reuse the already-stable single-question pipeline.
  setTimeout(install,850);
  setTimeout(install,1600);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',scheduleInstall,{once:true});
else scheduleInstall();
})();
