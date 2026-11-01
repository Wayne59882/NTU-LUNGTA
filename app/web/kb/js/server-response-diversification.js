(function(){
  'use strict';
  const DEFAULT_TIMEOUT_MS = 180000;
  function shouldKeepCanonical(text){
    const s=String(text||'');
    return !s.trim() || /(超出本系統|無法判斷|未通過正式|不會硬猜|請先在左側|沒有收到語音內容|語音辨識發生錯誤|找不到足夠可靠)/.test(s);
  }
  function selectedModelKey(){
    try{return window.VQ_getSelectedModelKey ? window.VQ_getSelectedModelKey() : 'granite';}
    catch(_){return 'granite';}
  }
  async function postJSON(url,payload,timeoutMs){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),timeoutMs||DEFAULT_TIMEOUT_MS);
    try{
      const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal,cache:'no-store'});
      if(!r.ok) throw new Error('HTTP '+r.status);
      return await r.json();
    }finally{clearTimeout(timer);}
  }
  window.VQ_maybeDiversifyAnswer = async function(question, canonicalAnswer, forcedModelKey, forcedLanguage){
    const canonical=String(canonicalAnswer||'');
    window.VQ_LAST_CANONICAL_ANSWER=canonical;
    window.VQ_LAST_DIVERSIFIED_ANSWER=canonical;
    window.VQ_LAST_RESPONSE_META={usedServer:false,reason:'canonical'};
    if(shouldKeepCanonical(canonical)) return canonical;
    if(location.protocol==='file:') return canonical;
    try{
      const top6=Array.isArray(window.VQ_LAST_TOP6_KB_CONTEXT) ? window.VQ_LAST_TOP6_KB_CONTEXT : [];
      const responseSupport=Array.isArray(window.VQ_LAST_RESPONSE_SUPPORT_CONTEXT) ? window.VQ_LAST_RESPONSE_SUPPORT_CONTEXT : [];
      const responseTargetGroups=Array.isArray(window.VQ_LAST_RESPONSE_TARGET_GROUPS) ? window.VQ_LAST_RESPONSE_TARGET_GROUPS : [];
      const responseIntent=String(window.VQ_LAST_RESPONSE_INTENT||'general');
      const modelKey=forcedModelKey || selectedModelKey();
      const language=String(forcedLanguage || window.VQ_LAST_DETECTED_LANGUAGE || (window.VQ_detectLanguage?window.VQ_detectLanguage(question):'zh-TW'));
      window.VQ_LAST_DETECTED_LANGUAGE=language;
      window.VQ_LAST_TTS_LANGUAGE=language;
      try{localStorage.setItem('VQ_LAST_INPUT_LANG',language);}catch(_){ }
      const data=await postJSON('/api/kb/diversify',{
        question:String(question||''),canonical_answer:canonical,kb_candidates:top6,
        response_support:responseSupport,response_target_groups:responseTargetGroups,
        response_intent:responseIntent,language:language,
        purpose:'respiratory physiology teaching assistant',model_key:modelKey
      },DEFAULT_TIMEOUT_MS);
      const answer=String((data&&data.answer)||'').trim();
      if(answer){
        window.VQ_LAST_DIVERSIFIED_ANSWER=answer;
        window.VQ_LAST_RESPONSE_META={usedServer:!!data.used_model,modelKey:data.model_key||modelKey,model:data.model||'',modelLabel:data.model_label||'',mode:data.mode||'',top6Count:Number(data.top6_count||0),latencyMs:Number(data.latency_ms||0),tokensPerSecond:Number(data.tokens_per_second||0),language:language};
        return answer;
      }
    }catch(err){
      window.VQ_LAST_RESPONSE_META={usedServer:false,reason:'server unavailable',error:String(err&&err.message||err)};
    }
    return canonical;
  };
})();
