(function(){
  'use strict';
  if(window.VQ_SERVER_TTS_MODE) return;
  const $ = (id)=>document.getElementById(id);
  let lastVoiceKey = '';

  function voiceKey(v){ return (v && ((v.voiceURI || v.name || '') + '|' + (v.lang || ''))) || ''; }
  function getVoices(){
    try{ return (window.speechSynthesis && window.speechSynthesis.getVoices) ? window.speechSynthesis.getVoices() : []; }
    catch(_){ return []; }
  }
  function preferIndex(list){
    if(!list || !list.length) return -1;
    let i = list.findIndex(v=>/Yating|Zhiwei|Taiwan|Traditional|zh-TW/i.test((v.name||'')+' '+(v.lang||'')));
    if(i >= 0) return i;
    i = list.findIndex(v=>/zh|cmn|Chinese|Mandarin/i.test((v.name||'')+' '+(v.lang||'')));
    return i >= 0 ? i : 0;
  }
  function selectedVoice(){
    const sel=$('voiceSelect');
    const list=getVoices();
    if(!sel || !list.length) return null;
    const raw = String(sel.value || '');
    let v = list.find(x => voiceKey(x) === raw || x.name === raw || x.voiceURI === raw || (x.name+'｜'+x.lang) === raw || (x.name+'|'+x.lang) === raw);
    if(!v && sel.selectedIndex >= 0) v = list[sel.selectedIndex];
    return v || list[preferIndex(list)] || null;
  }
  function restoreVoiceSelect(){
    const sel=$('voiceSelect');
    if(!sel || !('speechSynthesis' in window)) return;
    const list=getVoices();
    // Keep previous selection if possible.
    const prev = lastVoiceKey || String(sel.value || '');
    sel.style.display='block';
    sel.style.visibility='visible';
    sel.style.opacity='1';

    if(!list.length){
      if(!sel.options.length){
        sel.innerHTML = '<option value="">Loading browser voices...</option>';
      }
      return;
    }
    sel.innerHTML = '';
    list.forEach((v, idx)=>{
      const opt=document.createElement('option');
      opt.value = voiceKey(v);
      opt.textContent = (v.name || ('Voice '+(idx+1))) + ' - ' + (v.lang || 'unknown');
      sel.appendChild(opt);
    });
    let pick = list.findIndex(v => voiceKey(v) === prev || v.name === prev || v.voiceURI === prev);
    if(pick < 0) pick = preferIndex(list);
    if(pick >= 0){
      sel.selectedIndex = pick;
      lastVoiceKey = voiceKey(list[pick]);
    }
  }

  function applyNormalVoice(u){
    if(!u) return u;
    const v = selectedVoice();
    if(v){ u.voice = v; u.lang = v.lang || 'zh-TW'; }
    else { u.lang = 'zh-TW'; }
    u.rate = 1.0;
    u.pitch = 1.0;
    return u;
  }
  window.v83ApplyVoice = applyNormalVoice;
  window.v83SelectedVoice = selectedVoice;

  // Wrap speechSynthesis.speak so every utterance uses current selector.
  try{
    const synth = window.speechSynthesis;
    if(synth && !synth.__v83VoiceWrapped){
      const nativeSpeak = synth.speak.bind(synth);
      synth.speak = function(u){
        try{ applyNormalVoice(u); }catch(_){ }
        return nativeSpeak(u);
      };
      synth.__v83VoiceWrapped = true;
    }
  }catch(_){ }

  function bindChange(){
    const sel=$('voiceSelect');
    if(!sel || sel.__v83Bound) return;
    sel.addEventListener('change', ()=>{
      const v=selectedVoice();
      if(v) lastVoiceKey = voiceKey(v);
      // If the previous v82 live-switch function exists, use it; otherwise next utterance uses the new voice.
      try{ if(typeof window.restartWithSelectedVoice === 'function') window.restartWithSelectedVoice(); }catch(_){ }
    });
    sel.__v83Bound = true;
  }

  function init(){ restoreVoiceSelect(); bindChange(); }
  document.addEventListener('DOMContentLoaded', init);
  setTimeout(init, 0);
  setTimeout(init, 300);
  setTimeout(init, 1000);
  setTimeout(init, 2500);
  try{
    if(window.speechSynthesis){
      const old = window.speechSynthesis.onvoiceschanged;
      window.speechSynthesis.onvoiceschanged = function(ev){
        try{ if(typeof old === 'function') old.call(this, ev); }catch(_){ }
        restoreVoiceSelect(); bindChange();
      };
    }
  }catch(_){ }
})();
