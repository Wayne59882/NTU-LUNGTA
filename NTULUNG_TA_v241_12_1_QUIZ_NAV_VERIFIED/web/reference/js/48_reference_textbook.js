/* v238 Reference Textbook: scope-locked human-physiology selective-evidence RAG. Out-of-scope questions are rejected before Local/Cloud answer calls. Optional BYOK cloud fallback starts after 10 s only for in-scope questions. */
(function(){
  'use strict';
  const $=id=>document.getElementById(id); let lastMeta=null;
  function modelKey(){ const s=$('localModelSelect'); return (s&&s.value)||'granite'; }
  function cloudConfig(){
    const c=(window.VQ_getCloudConfig&&window.VQ_getCloudConfig())||{provider:'off',apiKey:''};
    return {provider:String(c.provider||'off'),apiKey:String(c.apiKey||'').trim()};
  }
  function questionLanguage(q){
    try{
      if(window.VQ_LAST_INPUT_SOURCE==='voice' && window.VQ_LAST_STT_LANGUAGE) return String(window.VQ_LAST_STT_LANGUAGE);
      if(window.VQ_resolveInputLanguage) return String(window.VQ_resolveInputLanguage(String(q||''),null)||'zh-TW');
      if(window.VQ_detectLanguage) return String(window.VQ_detectLanguage(String(q||''))||'zh-TW');
    }catch(_){ }
    return 'zh-TW';
  }
  function renderMeta(data){
    lastMeta=data||{};
    const src=$('referenceSourceInfo');
    if(src){src.textContent='';src.style.display='none';}
  }
  function friendlyError(d,status){
    const code=String(d&&d.code||'');
    if(code==='cloud_api_key_required')return 'Please enter the API Key for the selected cloud model, or choose Off — Local only.';
    if(code==='cloud_auth_failed')return 'The cloud API key is invalid, lacks permission, or has no available quota. Please check the API key.';
    if(code==='all_answer_engines_unavailable')return 'The local model and selected cloud API are currently unable to answer. Please try again or check the API key/server.';
    return String(d&&d.detail||d&&d.error||('HTTP '+status));
  }
  function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
  async function pollLocalJob(jobId,maxMs){
    const started=Date.now();
    while(Date.now()-started<maxMs){
      const r=await fetch('/api/reference/job-status?id='+encodeURIComponent(jobId),{cache:'no-store'});
      const d=await r.json().catch(()=>({error:'Invalid job response'}));
      if(!r.ok)throw new Error(friendlyError(d,r.status));
      if(d.status==='done')return d.result||{};
      if(d.status==='error')throw new Error(String(d.error||d.message||'Local answer failed'));
      await sleep(1500);
    }
    throw new Error('Local answer job timed out.');
  }
  async function answer(q){
    const cloud=cloudConfig();
    const language=questionLanguage(q);
    window.VQ_LAST_DETECTED_LANGUAGE=language;
    if(cloud.provider!=='off'&&!cloud.apiKey){
      renderMeta({engine:'config-error',sources:[]});
      return 'Please enter the API Key for the selected cloud model, or choose Off — Local only.';
    }
    if(cloud.provider==='off'){
      try{
        const payload={question:String(q||''),model_key:modelKey(),language_tag:language};
        const r=await fetch('/api/reference/answer-job-start',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store'});
        const started=await r.json().catch(()=>({error:'Invalid server response'}));
        if(!r.ok||!started.job_id)throw new Error(friendlyError(started,r.status));
        const d=await pollLocalJob(started.job_id,900000);
        renderMeta(d);window.VQ_LAST_DETECTED_LANGUAGE=String(d.answer_language||language||'zh-TW');
        return String(d.answer||'The answer service could not produce a response.');
      }catch(e){
        console.error('[VQ Reference Textbook local job]',e);renderMeta({engine:'error',sources:[]});
        const msg=String(e&&e.message||'').trim();return msg&&msg!=='Failed to fetch'?msg:'The Q&A service is temporarily unreachable. Please check the server/network and try again.';
      }
    }
    const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),300000);
    try{
      const payload={question:String(q||''),model_key:modelKey(),cloud_provider:cloud.provider,language_tag:language};
      if(cloud.provider!=='off')payload.cloud_api_key=cloud.apiKey;
      const r=await fetch('/api/reference/answer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store',signal:controller.signal});
      const d=await r.json().catch(()=>({error:'Invalid server response'}));
      if(!r.ok) throw new Error(friendlyError(d,r.status));
      renderMeta(d);
      window.VQ_LAST_DETECTED_LANGUAGE=String(d.answer_language||d.language_tag||language||'zh-TW');
      return String(d.answer||'The answer service could not produce a response.');
    }catch(e){
      console.error('[VQ Reference Textbook]',e); renderMeta({engine:'error',sources:[]});
      const msg=String(e&&e.message||'').trim();
      return msg&&msg!=='Failed to fetch' ? msg : 'The Q&A service is temporarily unreachable. Please check the server/network and try again.';
    }finally{clearTimeout(timer);}
  }
  window.VQ_generateFinalAnswer=answer; window.VQ_REFERENCE_LAST_META=()=>lastMeta;
  async function health(){
    try{ const r=await fetch('/api/reference/health',{cache:'no-store'}),d=await r.json(); const el=$('referenceCorpusStatus'); if(el){el.textContent='Reference textbook ready';} }catch(_){ }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',health,{once:true}); else health();
  console.log('[VQ] v238 selective-evidence decision Reference Textbook adapter active');
})();
