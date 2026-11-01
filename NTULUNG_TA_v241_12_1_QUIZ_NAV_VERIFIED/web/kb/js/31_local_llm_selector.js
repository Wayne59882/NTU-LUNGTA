(function(){
  'use strict';
  const STORAGE_KEY='vq_local_llm_model_v240';
  const DEFAULT_KEY='gemma';
  const LABELS={
    gemma:'Gemma 4 12B · Google',
    mistral:'Ministral 3 8B · Mistral AI'
  };
  function getSelect(){ return document.getElementById('localModelSelect'); }
  async function warmSelectedModel(key){
    const note=document.getElementById('localModelNote');
    try{
      if(note) note.textContent=LABELS[key]+' — warming offline model…';
      const r=await fetch('/api/kb/warm-model',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model_key:key}),cache:'no-store'});
      const data=await r.json();
      if(data&&data.ok){
        if(note) note.textContent=LABELS[key]+' — ready. Same offline model performs semantic recognition, language detection, and final answer generation.';
        window.VQ_MODEL_WARM_READY=key;
      }else{ updateNote(); }
    }catch(_){ updateNote(); }
  }
  function normalizeKey(v){ return Object.prototype.hasOwnProperty.call(LABELS,v) ? v : DEFAULT_KEY; }
  function selectedKey(){
    const el=getSelect();
    return normalizeKey(el && el.value ? el.value : DEFAULT_KEY);
  }
  function updateNote(){
    const note=document.getElementById('localModelNote');
    const key=selectedKey();
    if(note) note.textContent=LABELS[key]+' — this same offline model performs semantic recognition, language detection, and final answer generation.';
    window.VQ_SELECTED_MODEL_KEY=key;
    window.VQ_SELECTED_MODEL_LABEL=LABELS[key];
  }
  async function refreshServerLabels(){
    try{
      const r=await fetch('/api/kb/models',{cache:'no-store'});
      const data=await r.json();
      if(data&&data.models){
        Object.keys(LABELS).forEach(function(key){
          if(data.models[key]&&data.models[key].label) LABELS[key]=data.models[key].label;
          const opt=document.querySelector('#localModelSelect option[value="'+key+'"]');
          if(opt) opt.textContent=LABELS[key];
        });
        window.VQ_LOCAL_MODEL_LABELS=Object.assign({},LABELS);
      }
    }catch(_){}
  }
  async function init(){
    const el=getSelect();
    if(!el) return;
    await refreshServerLabels();
    let saved=DEFAULT_KEY;
    try{ saved=normalizeKey(localStorage.getItem(STORAGE_KEY)||DEFAULT_KEY); }catch(_){ saved=DEFAULT_KEY; }
    el.value=saved;
    updateNote();
    // Default Gemma model is pre-warmed by the server; this call also confirms readiness.
    warmSelectedModel(saved);
    el.addEventListener('change',function(){
      const key=selectedKey();
      try{ localStorage.setItem(STORAGE_KEY,key); }catch(_){}
      updateNote();
      warmSelectedModel(key);
    });
  }
  window.VQ_getSelectedModelKey=selectedKey;
  window.VQ_getSelectedModelLabel=function(){ return LABELS[selectedKey()]; };
  window.VQ_LOCAL_MODEL_LABELS=Object.assign({},LABELS);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
})();
