(function(){
  'use strict';
  const PROVIDER_KEY='VQ_CLOUD_PROVIDER_SESSION';
  const API_KEY_KEY='VQ_CLOUD_API_KEY_SESSION';
  const LABELS={off:'Off — Local only',openai:'GPT-5.6 Luna · OpenAI'};
  function $(id){return document.getElementById(id);}
  function normalize(v){return Object.prototype.hasOwnProperty.call(LABELS,v)?v:'off';}
  function selectedProvider(){const el=$('cloudModelSelect');return normalize(el&&el.value||'off');}
  function confirmedKey(){try{return String(sessionStorage.getItem(API_KEY_KEY)||'').trim();}catch(_){return '';}}
  function setStatus(text,kind){const el=$('cloudApiKeyStatus');if(!el)return;el.textContent=text||'';el.className='v241-api-status'+(kind?' '+kind:'');}
  function sync(){
    const provider=selectedProvider(),wrap=$('cloudApiKeyWrap'),input=$('cloudApiKeyInput');
    if(wrap)wrap.hidden=(provider==='off');
    if(input)input.placeholder=provider==='openai'?'Paste OpenAI API key':'Enter API key';
    try{sessionStorage.setItem(PROVIDER_KEY,provider);}catch(_){ }
    if(provider!=='off'){
      const key=confirmedKey();
      if(key)setStatus('✓ API key confirmed. Answers use the selected cloud model directly in this browser session.','ok');
      else setStatus('Press Enter or select “Confirm API Key” after pasting the key.','');
    }
  }
  function confirm(){
    const input=$('cloudApiKeyInput'),provider=selectedProvider(),value=String(input&&input.value||'').trim();
    if(provider==='off'){setStatus('Cloud model is off.','');return;}
    if(!value){try{sessionStorage.removeItem(API_KEY_KEY);}catch(_){ }setStatus('Enter an API key before confirming.','pending');if(input)input.focus();return;}
    try{sessionStorage.setItem(API_KEY_KEY,value);}catch(_){ }
    setStatus('✓ API key confirmed. Answers use the selected cloud model directly in this browser session.','ok');
  }
  function init(){
    const select=$('cloudModelSelect'),input=$('cloudApiKeyInput'),clear=$('cloudApiKeyClearBtn'),confirmBtn=$('cloudApiKeyConfirmBtn');if(!select)return;
    try{select.value=normalize(sessionStorage.getItem(PROVIDER_KEY)||'off');}catch(_){select.value='off';}
    try{if(input)input.value=sessionStorage.getItem(API_KEY_KEY)||'';}catch(_){ }
    sync();select.addEventListener('change',sync);
    if(input){
      input.addEventListener('input',function(){
        const confirmed=confirmedKey();if(String(input.value||'').trim()!==confirmed){try{sessionStorage.removeItem(API_KEY_KEY);}catch(_){ }setStatus('New key detected. Press Enter or select “Confirm API Key” to apply it.','pending');}
      });
      input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();confirm();}});
    }
    if(confirmBtn)confirmBtn.addEventListener('click',confirm);
    if(clear)clear.addEventListener('click',function(){if(input)input.value='';try{sessionStorage.removeItem(API_KEY_KEY);}catch(_){ }setStatus('API key cleared.','');if(input)input.focus();});
  }
  window.VQ_getCloudConfig=function(){return {provider:selectedProvider(),apiKey:confirmedKey(),label:LABELS[selectedProvider()]};};
  window.VQ_CLOUD_MODEL_LABELS=Object.assign({},LABELS);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
