/* v82 REAL: live voice switching while preserving normal speech speed.
   Design: Web Speech API cannot mutate the voice of an utterance already playing.
   This patch tracks the approximate current character index, cancels the current utterance
   only when the voice selector changes, and immediately resumes the remaining text with
   the newly selected voice at normal rate/pitch. */
(function(){
  'use strict';
  if(window.VQ_SERVER_TTS_MODE) return;
  function $(id){ return document.getElementById(id); }
  function setStatus(msg){
    try{
      const s=$('status');
      if(s) s.textContent='Status: '+msg;
    }catch(_){ }
  }
  function allVoices(){
    try{ return (window.speechSynthesis && window.speechSynthesis.getVoices) ? window.speechSynthesis.getVoices() : []; }
    catch(_){ return []; }
  }
  function selectedVoice(){
    const list=allVoices();
    if(!list.length) return null;
    const sel=$('voiceSelect');
    if(sel){
      const raw=String(sel.value||'').trim();
      const idx=parseInt(raw,10);
      if(Number.isInteger(idx) && list[idx]) return list[idx];
      const byValue=list.find(v=>v.name===raw || v.voiceURI===raw || (v.name+'｜'+v.lang)===raw || (v.name+'|'+v.lang)===raw);
      if(byValue) return byValue;
      if(sel.selectedIndex>=0){
        const label=(sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].textContent || '').trim();
        const byLabel=list.find(v=>label.includes(v.name) && label.includes(v.lang||'')) || list.find(v=>label.includes(v.name));
        if(byLabel) return byLabel;
      }
    }
    return list.find(v=>/zh|cmn|Taiwan|Chinese|Mandarin|Huihui|Zira/i.test((v.lang||'')+' '+(v.name||''))) || list[0] || null;
  }
  function normalizeSpeechControls(){
    const r=$('rateRange'), p=$('pitchRange');
    if(r){ r.min='0.80'; r.max='1.20'; r.step='0.05'; r.value='1.00'; }
    if(p){ p.min='0.80'; p.max='1.20'; p.step='0.05'; p.value='1.00'; }
  }
  function applyVoiceAndNormalSpeed(u){
    if(!u) return u;
    try{
      const v=selectedVoice();
      if(v){ u.voice=v; u.lang=v.lang || 'zh-TW'; }
      else if(!u.lang){ u.lang='zh-TW'; }
      // Force normal speed. This prevents the previous restart/chunk logic from accelerating speech.
      u.rate=1.0;
      u.pitch=1.0;
      u.volume=1.0;
    }catch(_){ }
    return u;
  }

  const state={
    text:'',
    index:0,
    startTime:0,
    timer:null,
    speaking:false,
    restarting:false
  };
  function clearTimer(){ if(state.timer){ clearInterval(state.timer); state.timer=null; } }
  function estimateIndex(){
    if(!state.text) return 0;
    const elapsed=Date.now()-state.startTime;
    // Conservative estimate: Chinese TTS around 130-170 ms per visible character.
    // Use 155 ms to avoid jumping too far ahead when changing voice.
    const approx=Math.floor(elapsed/155);
    return Math.max(state.index, Math.min(state.text.length-1, approx));
  }
  function trackUtterance(u){
    const text=String(u && u.text || '');
    state.text=text;
    state.index=0;
    state.startTime=Date.now();
    state.speaking=!!text;
    clearTimer();
    state.timer=setInterval(()=>{
      if(!state.speaking || !state.text || (window.speechSynthesis && window.speechSynthesis.paused)) return;
      state.index=estimateIndex();
    },250);

    const oldBoundary=u.onboundary;
    u.onboundary=function(ev){
      try{
        if(typeof ev.charIndex==='number' && ev.charIndex>=0) state.index=Math.min(ev.charIndex, state.text.length-1);
      }catch(_){ }
      if(typeof oldBoundary==='function') return oldBoundary.call(this,ev);
    };
    const oldEnd=u.onend;
    u.onend=function(ev){
      state.speaking=false; state.index=0; state.text=''; clearTimer();
      if(typeof oldEnd==='function') return oldEnd.call(this,ev);
    };
    const oldErr=u.onerror;
    u.onerror=function(ev){
      state.speaking=false; clearTimer();
      if(typeof oldErr==='function') return oldErr.call(this,ev);
    };
    return u;
  }
  function wrapSpeak(){
    if(!window.speechSynthesis || window.speechSynthesis.__VQ_V82_REAL_LIVE_SYNC__) return;
    const previousSpeak=window.speechSynthesis.speak.bind(window.speechSynthesis);
    window.speechSynthesis.speak=function(utterance){
      normalizeSpeechControls();
      applyVoiceAndNormalSpeed(utterance);
      trackUtterance(utterance);
      return previousSpeak(utterance);
    };
    window.speechSynthesis.__VQ_V82_REAL_LIVE_SYNC__=true;
  }
  function restartWithSelectedVoice(){
    if(!window.speechSynthesis || state.restarting) return;
    if(!state.speaking || !state.text) return;
    const idx=Math.max(0, Math.min(state.text.length-1, estimateIndex()));
    let remaining=state.text.slice(idx).trimStart();
    if(remaining.length<2) return;
    state.restarting=true;
    try{ window.speechSynthesis.cancel(); }catch(_){ }
    clearTimer();
    setTimeout(()=>{
      try{
        const u=new SpeechSynthesisUtterance(remaining);
        u.lang='zh-TW';
        applyVoiceAndNormalSpeed(u);
        window.speechSynthesis.speak(u);
        setStatus('Voice changed and speech resumed');
      }catch(_){ }
      setTimeout(()=>{ state.restarting=false; },120);
    },60);
  }
  function bindVoiceSelect(){
    const sel=$('voiceSelect');
    if(!sel || sel.__VQ_V82_REAL_BOUND__) return;
    sel.__VQ_V82_REAL_BOUND__='1';
    sel.addEventListener('change',()=>{
      normalizeSpeechControls();
      restartWithSelectedVoice();
    });
  }
  function init(){
    normalizeSpeechControls();
    wrapSpeak();
    bindVoiceSelect();
    try{ if(window.speechSynthesis) window.speechSynthesis.onvoiceschanged = function(){ bindVoiceSelect(); }; }catch(_){ }
    setStatus('System ready');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  setTimeout(init,300);
  setTimeout(init,1200);
})();
