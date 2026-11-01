/* v81 TRUE: restore native Web Speech playback speed.
   Important: This patch intentionally removes the later micro-chunk / immediate-restart idea.
   Browser speechSynthesis cannot change the voice inside an already-started utterance without restarting it.
   To keep normal speed, the system now uses one native utterance per answer/lecture segment.
   Voice/rate/pitch are applied immediately before speak(), but the current utterance is not re-chunked. */
(function(){
  'use strict';
  function $(id){ return document.getElementById(id); }
  function voices(){
    try { return (window.speechSynthesis && window.speechSynthesis.getVoices) ? window.speechSynthesis.getVoices() : []; }
    catch(e){ return []; }
  }
  function num(id, fallback){
    const el=$(id);
    const x=parseFloat(el && el.value);
    if(!Number.isFinite(x)) return fallback;
    return Math.max(0.8, Math.min(1.2, x));
  }
  function selectedVoice(){
    const list=voices();
    if(!list.length) return null;
    const sel=$('voiceSelect');
    if(sel){
      const raw=String(sel.value || '').trim();
      const idx=parseInt(raw,10);
      if(Number.isInteger(idx) && list[idx]) return list[idx];
      const byName=list.find(v => v.name===raw || v.voiceURI===raw || (v.name+'｜'+v.lang)===raw || (v.name+'|'+v.lang)===raw);
      if(byName) return byName;
      if(sel.selectedIndex>=0){
        const label=(sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].textContent || '').trim();
        const byLabel=list.find(v => label.includes(v.name) && label.includes(v.lang || '')) || list.find(v => label.includes(v.name));
        if(byLabel) return byLabel;
      }
    }
    return list.find(v => /zh|cmn|Taiwan|Chinese|Mandarin/i.test((v.lang||'') + ' ' + (v.name||''))) || list[0] || null;
  }
  function applyVoiceSettings(u){
    if(!u) return u;
    try{
      const v=selectedVoice();
      if(v){ u.voice=v; u.lang=v.lang || 'zh-TW'; }
      else if(!u.lang){ u.lang='zh-TW'; }
      u.rate=num('rateRange', 1.0);
      u.pitch=num('pitchRange', 1.0);
      u.volume=1;
    }catch(e){}
    return u;
  }
  function normalizeControls(){
    const r=$('rateRange'), p=$('pitchRange');
    if(r){ r.min='0.80'; r.max='1.20'; r.step='0.05'; if(!r.__VQ_USER_TOUCHED__) r.value='1.00'; r.addEventListener('input',()=>{r.__VQ_USER_TOUCHED__=true;}); }
    if(p){ p.min='0.80'; p.max='1.20'; p.step='0.05'; if(!p.__VQ_USER_TOUCHED__) p.value='1.00'; p.addEventListener('input',()=>{p.__VQ_USER_TOUCHED__=true;}); }
  }
  function wrapSpeak(){
    if(!window.speechSynthesis || window.speechSynthesis.__VQ_V81_TRUE_WRAPPED__) return;
    const nativeSpeak=window.speechSynthesis.speak.bind(window.speechSynthesis);
    window.speechSynthesis.speak=function(utterance){
      applyVoiceSettings(utterance);
      return nativeSpeak(utterance);
    };
    window.speechSynthesis.__VQ_V81_TRUE_WRAPPED__=true;
  }
  function bindVoiceChangeNoRestart(){
    const sel=$('voiceSelect');
    if(sel && !sel.__VQ_V81_BOUND__){
      sel.__VQ_V81_BOUND__=true;
      sel.addEventListener('change', function(){
        // Do not cancel or restart current speech; that was the cause of abnormal speed.
        // The next native utterance uses the newly selected voice.
        try{ if(typeof window.status==='function') window.status('Voice changed; the next spoken segment will use the new voice'); }catch(e){}
      });
    }
  }
  function init(){
    normalizeControls();
    wrapSpeak();
    bindVoiceChangeNoRestart();
    try{ if(typeof window.status==='function') window.status('System ready'); }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
  setTimeout(init,300);
  setTimeout(init,1200);
})();
