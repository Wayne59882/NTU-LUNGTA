(function(){
  'use strict';
  /* Cloud model selection (ChatGPT, Claude, Gemini). A cloud model answers only
     after its API key has been verified for that model; until then (or after a
     failed check) the selected local model keeps answering. Keys stay in this
     browser session only, one key per company. */
  const CHOICE_KEY='VQ_CLOUD_MODEL_SESSION';            // "openai:gpt-6-luna" or "off"
  const KEY_PREFIX='VQ_CLOUD_API_KEY_SESSION:';          // + provider
  const VERIFIED_KEY='VQ_CLOUD_VERIFIED_SESSION';        // models verified with the stored keys
  const COMPANY={openai:'OpenAI',anthropic:'Anthropic',gemini:'Google Gemini'};
  let checking=false;
  function $(id){return document.getElementById(id);}
  function store(){try{return typeof sessionStorage!=='undefined'?sessionStorage:null;}catch(_){return null;}}
  function get(k){const s=store();try{return s?String(s.getItem(k)||''):'';}catch(_){return '';}}
  function put(k,v){const s=store();try{if(s)s.setItem(k,v);}catch(_){}}
  function drop(k){const s=store();try{if(s)s.removeItem(k);}catch(_){}}
  function options(){const el=$('cloudModelSelect');return el?Array.from(el.options):[];}
  function labels(){const out={off:'Off — Local only'};for(const o of options())out[o.value]=String(o.textContent||o.value).trim();return out;}
  function normalize(v){return options().some(o=>o.value===v)?v:'off';}
  function choice(){const el=$('cloudModelSelect');return normalize(el&&el.value||'off');}
  function parts(value){const i=String(value).indexOf(':');return i<0?{provider:'off',model:''}:{provider:value.slice(0,i),model:value.slice(i+1)};}
  function verified(){try{return JSON.parse(get(VERIFIED_KEY)||'[]');}catch(_){return [];}}
  function setVerified(list){put(VERIFIED_KEY,JSON.stringify(Array.from(new Set(list))));}
  function keyFor(provider){return get(KEY_PREFIX+provider).trim();}
  function isVerified(value){return value!=='off'&&!!keyFor(parts(value).provider)&&verified().indexOf(value)>=0;}
  function localLabel(){try{return (window.VQ_getSelectedModelLabel&&window.VQ_getSelectedModelLabel())||'the local model';}catch(_){return 'the local model';}}
  function shortLabel(value){return String(labels()[value]||value).split(' · ')[0];}
  function setStatus(text,kind){const el=$('cloudApiKeyStatus');if(!el)return;el.textContent=text||'';el.className='v241-api-status'+(kind?' '+kind:'');}
  function handOff(){if(window.VQ_QA_REQUESTS)window.VQ_QA_REQUESTS.switchModel();}
  function forgetKey(provider){drop(KEY_PREFIX+provider);setVerified(verified().filter(v=>parts(v).provider!==provider));}
  function sync(){
    const value=choice(),provider=parts(value).provider,wrap=$('cloudApiKeyWrap'),input=$('cloudApiKeyInput'),label=$('cloudApiKeyLabel');
    if(wrap)wrap.hidden=(value==='off');
    if(label)label.textContent=value==='off'?'API Key':COMPANY[provider]+' API Key';
    if(input){input.placeholder=value==='off'?'Enter API key':'Paste '+COMPANY[provider]+' API key';input.value=value==='off'?'':keyFor(provider);}
    put(CHOICE_KEY,value);
    if(value==='off')return;
    if(isVerified(value))setStatus('✓ '+shortLabel(value)+' answers your questions. The local model is not used while it is selected.','ok');
    else setStatus('Paste the '+COMPANY[provider]+' API key and press Enter or “Confirm API Key”. Until the key is verified, '+localLabel()+' keeps answering.','');
  }
  async function verify(value,key){
    const p=parts(value);
    try{
      const r=await fetch('/api/cloud/verify-key',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({cloud_provider:p.provider,cloud_model:p.model,cloud_api_key:key}),cache:'no-store'});
      const d=await r.json().catch(()=>({}));
      if(r.ok&&d.ok)return {ok:true};
      return {ok:false,error:String(d.error||d.detail||('HTTP '+r.status))};
    }catch(e){return {ok:false,error:'The key check could not reach the server ('+String(e&&e.message||e)+').'};}
  }
  async function confirm(){
    if(checking)return;
    const input=$('cloudApiKeyInput'),value=choice(),provider=parts(value).provider,key=String(input&&input.value||'').trim(),btn=$('cloudApiKeyConfirmBtn');
    if(value==='off'){setStatus('Cloud model is off.','');return;}
    if(!key){forgetKey(provider);setStatus('Enter an API key before confirming. '+localLabel()+' keeps answering.','pending');if(input)input.focus();return;}
    checking=true;if(btn)btn.disabled=true;
    setStatus('Checking the API key with '+shortLabel(value)+'… '+localLabel()+' keeps answering until the check succeeds.','pending');
    let result;
    try{result=await verify(value,key);}finally{checking=false;if(btn)btn.disabled=false;}
    if(choice()!==value||String(input&&input.value||'').trim()!==key)return;  // changed while checking
    if(!result.ok){
      setVerified(verified().filter(v=>v!==value));
      setStatus('✗ API key check failed: '+result.error+' Still answering with '+localLabel()+'.','error');
      return;
    }
    if(keyFor(provider)!==key)setVerified(verified().filter(v=>parts(v).provider!==provider));
    put(KEY_PREFIX+provider,key);setVerified(verified().concat([value]));
    setStatus('✓ Switched to '+shortLabel(value)+'. The current question is answered again by '+shortLabel(value)+'; the local model is no longer used.','ok');
    handOff();
  }
  function init(){
    const select=$('cloudModelSelect'),input=$('cloudApiKeyInput'),clear=$('cloudApiKeyClearBtn'),confirmBtn=$('cloudApiKeyConfirmBtn');if(!select)return;
    select.value=normalize(get(CHOICE_KEY)||'off');
    sync();
    select.addEventListener('change',function(){
      sync();
      const value=choice();
      // Off -> local model; a verified cloud model -> cloud. Either way the current
      // question is answered again by the model now in charge. Another model of a
      // company whose key is already stored is checked right away.
      if(value==='off'||isVerified(value))handOff();
      else if(keyFor(parts(value).provider))confirm();
    });
    if(input){
      input.addEventListener('input',function(){
        const provider=parts(choice()).provider;
        if(provider!=='off'&&String(input.value||'').trim()!==keyFor(provider)){
          forgetKey(provider);
          setStatus('New key detected. Press Enter or “Confirm API Key” to verify it. Until then '+localLabel()+' answers.','pending');
        }
      });
      input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();confirm();}});
    }
    if(confirmBtn)confirmBtn.addEventListener('click',confirm);
    if(clear)clear.addEventListener('click',function(){
      const provider=parts(choice()).provider;if(input)input.value='';if(provider!=='off')forgetKey(provider);
      setStatus('API key cleared. '+localLabel()+' answers your next question.','');if(input)input.focus();
    });
  }
  // The cloud model is in charge only with a key verified for it; otherwise local.
  window.VQ_getCloudConfig=function(){
    const value=choice();
    if(!isVerified(value))return {provider:'off',model:'',apiKey:'',label:labels().off};
    const p=parts(value);
    return {provider:p.provider,model:p.model,apiKey:keyFor(p.provider),label:labels()[value]};
  };
  window.VQ_CLOUD_MODEL_LABELS=new Proxy({},{get:(_,k)=>labels()[k]});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
