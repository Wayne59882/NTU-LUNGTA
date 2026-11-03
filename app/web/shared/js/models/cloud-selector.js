(function(){
  'use strict';
  /* Cloud model selection. A cloud model answers only after its API key has
     been verified; until then (or after a failed check) the selected local
     model keeps answering. The key stays in this browser session only. */
  const PROVIDER_KEY='VQ_CLOUD_PROVIDER_SESSION';
  const API_KEY_KEY='VQ_CLOUD_API_KEY_SESSION';
  const LABELS={off:'Off — Local only',openai:'GPT-5.6 Luna · OpenAI'};
  let checking=false;
  function $(id){return document.getElementById(id);}
  function normalize(v){return Object.prototype.hasOwnProperty.call(LABELS,v)?v:'off';}
  function selectedProvider(){const el=$('cloudModelSelect');return normalize(el&&el.value||'off');}
  function confirmedKey(){try{return String(sessionStorage.getItem(API_KEY_KEY)||'').trim();}catch(_){return '';}}
  function localLabel(){try{return (window.VQ_getSelectedModelLabel&&window.VQ_getSelectedModelLabel())||'the local model';}catch(_){return 'the local model';}}
  function shortLabel(provider){return String(LABELS[provider]||provider).split(' · ')[0];}
  function setStatus(text,kind){const el=$('cloudApiKeyStatus');if(!el)return;el.textContent=text||'';el.className='v241-api-status'+(kind?' '+kind:'');}
  function handOff(){if(window.VQ_QA_REQUESTS)window.VQ_QA_REQUESTS.switchModel();}
  function sync(){
    const provider=selectedProvider(),wrap=$('cloudApiKeyWrap'),input=$('cloudApiKeyInput');
    if(wrap)wrap.hidden=(provider==='off');
    if(input)input.placeholder=provider==='openai'?'Paste OpenAI API key':'Enter API key';
    try{sessionStorage.setItem(PROVIDER_KEY,provider);}catch(_){ }
    if(provider!=='off'){
      if(confirmedKey())setStatus('✓ '+shortLabel(provider)+' answers your questions. The local model is not used while it is selected.','ok');
      else setStatus('Paste the API key and press Enter or “Confirm API Key”. Until the key is verified, '+localLabel()+' keeps answering.','');
    }
  }
  async function verify(provider,key){
    try{
      const r=await fetch('/api/cloud/verify-key',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({cloud_provider:provider,cloud_api_key:key}),cache:'no-store'});
      const d=await r.json().catch(()=>({}));
      if(r.ok&&d.ok)return {ok:true};
      return {ok:false,error:String(d.error||d.detail||('HTTP '+r.status))};
    }catch(e){return {ok:false,error:'The key check could not reach the server ('+String(e&&e.message||e)+').'};}
  }
  async function confirm(){
    if(checking)return;
    const input=$('cloudApiKeyInput'),provider=selectedProvider(),value=String(input&&input.value||'').trim(),btn=$('cloudApiKeyConfirmBtn');
    if(provider==='off'){setStatus('Cloud model is off.','');return;}
    if(!value){try{sessionStorage.removeItem(API_KEY_KEY);}catch(_){ }setStatus('Enter an API key before confirming. '+localLabel()+' keeps answering.','pending');if(input)input.focus();return;}
    checking=true;if(btn)btn.disabled=true;
    setStatus('Checking the API key with '+shortLabel(provider)+'… '+localLabel()+' keeps answering until the check succeeds.','pending');
    let result;
    try{result=await verify(provider,value);}finally{checking=false;if(btn)btn.disabled=false;}
    if(selectedProvider()!==provider||String(input&&input.value||'').trim()!==value)return;  // changed while checking
    if(!result.ok){
      try{sessionStorage.removeItem(API_KEY_KEY);}catch(_){ }
      setStatus('✗ API key check failed: '+result.error+' Still answering with '+localLabel()+'.','error');
      return;
    }
    try{sessionStorage.setItem(API_KEY_KEY,value);}catch(_){ }
    setStatus('✓ Switched to '+shortLabel(provider)+'. The current question is answered again by '+shortLabel(provider)+'; the local model is no longer used.','ok');
    handOff();
  }
  function init(){
    const select=$('cloudModelSelect'),input=$('cloudApiKeyInput'),clear=$('cloudApiKeyClearBtn'),confirmBtn=$('cloudApiKeyConfirmBtn');if(!select)return;
    try{select.value=normalize(sessionStorage.getItem(PROVIDER_KEY)||'off');}catch(_){select.value='off';}
    try{if(input)input.value=sessionStorage.getItem(API_KEY_KEY)||'';}catch(_){ }
    sync();
    select.addEventListener('change',function(){
      sync();
      // Off -> local model; a cloud model with an already verified key -> cloud.
      // Either way the current question is answered again by the model now in charge.
      if(selectedProvider()==='off'||confirmedKey())handOff();
    });
    if(input){
      input.addEventListener('input',function(){
        const confirmed=confirmedKey();
        if(String(input.value||'').trim()!==confirmed){
          try{sessionStorage.removeItem(API_KEY_KEY);}catch(_){ }
          setStatus('New key detected. Press Enter or “Confirm API Key” to verify it. Until then '+localLabel()+' answers.','pending');
        }
      });
      input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();confirm();}});
    }
    if(confirmBtn)confirmBtn.addEventListener('click',confirm);
    if(clear)clear.addEventListener('click',function(){
      if(input)input.value='';try{sessionStorage.removeItem(API_KEY_KEY);}catch(_){ }
      setStatus('API key cleared. '+localLabel()+' answers your next question.','');if(input)input.focus();
    });
  }
  // The cloud model is in charge only with a verified key; otherwise local.
  window.VQ_getCloudConfig=function(){
    const key=confirmedKey(),provider=key?selectedProvider():'off';
    return {provider:provider,apiKey:provider==='off'?'':key,label:LABELS[provider]};
  };
  window.VQ_CLOUD_MODEL_LABELS=Object.assign({},LABELS);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
