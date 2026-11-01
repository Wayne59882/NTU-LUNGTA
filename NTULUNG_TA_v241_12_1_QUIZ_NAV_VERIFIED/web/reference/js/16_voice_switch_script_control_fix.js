/* v84 TRUE: voice selector safety patch.
   Purpose:
   - Keep VOICE SETTINGS visible.
   - Do NOT let voice changes cancel/restart the current lecture script.
   - Do NOT reset script index, script timer, or pause/resume/end button state.
   - The selected voice is stored and applied to the next SpeechSynthesisUtterance.
*/
(function(){
  'use strict';
  if(window.VQ_SERVER_TTS_MODE) return;
  const $ = (id)=>document.getElementById(id);

  function getVoiceSelect(){
    return $('voiceSelect') || document.querySelector('select[id*="voice" i], select[name*="voice" i]');
  }

  function ensureVoiceUIVisible(){
    const sel = getVoiceSelect();
    if(!sel) return;
    try{
      sel.style.display = '';
      sel.hidden = false;
      sel.disabled = false;
      const panel = sel.closest('.voice-settings, .settings, .control-card, .card, section, div');
      if(panel){
        panel.style.display = '';
        panel.hidden = false;
      }
    }catch(_){}
  }

  function getVoices(){
    try{ return (window.speechSynthesis && window.speechSynthesis.getVoices) ? window.speechSynthesis.getVoices() : []; }
    catch(_){ return []; }
  }

  function voiceKey(v){
    return ((v && (v.voiceURI || v.name || '')) + '|' + ((v && v.lang) || '')).trim();
  }

  function populateVoicesIfEmpty(){
    const sel = getVoiceSelect();
    if(!sel) return;
    const voices = getVoices();
    if(!voices.length) return;

    // If the list is missing or contains only placeholder-like items, rebuild it.
    const realOptions = Array.from(sel.options || []).filter(o => o.value && !/loading|載入|select/i.test(o.textContent || ''));
    if(realOptions.length >= Math.min(voices.length, 2)) return;

    const oldValue = sel.value || localStorage.getItem('vqSelectedVoiceKey') || '';
    sel.innerHTML = '';
    voices.forEach((v, i)=>{
      const opt = document.createElement('option');
      opt.value = voiceKey(v) || String(i);
      opt.textContent = `${v.name || 'Voice'} - ${v.lang || ''}`;
      opt.dataset.name = v.name || '';
      opt.dataset.lang = v.lang || '';
      opt.dataset.uri = v.voiceURI || '';
      sel.appendChild(opt);
    });

    if(oldValue && Array.from(sel.options).some(o=>o.value===oldValue)) sel.value = oldValue;
    else {
      const zh = Array.from(sel.options).find(o => /zh|Chinese|Taiwan|Yating/i.test((o.textContent||'') + ' ' + (o.value||'')));
      if(zh) sel.value = zh.value;
    }
  }

  function saveSelectedVoiceOnly(){
    const sel = getVoiceSelect();
    if(!sel) return;
    try{
      localStorage.setItem('vqSelectedVoiceKey', sel.value || '');
      localStorage.setItem('vqSelectedVoiceText', (sel.options[sel.selectedIndex] && sel.options[sel.selectedIndex].textContent) || '');
    }catch(_){}
    try{
      if(typeof window.status === 'function') window.status('Voice settings changed; the current lecture and controls remain active');
    }catch(_){}
  }

  function bindSafeVoiceChange(){
    const sel = getVoiceSelect();
    if(!sel || sel.__VQ_V84_TRUE_SAFE_BOUND__) return;
    sel.__VQ_V84_TRUE_SAFE_BOUND__ = '1';

    // Capture phase: block older v82/v83 bubble handlers that cancel/restart speech
    // and break the lecture typewriter timer/buttons.
    sel.addEventListener('change', function(ev){
      saveSelectedVoiceOnly();
      try{ ev.stopImmediatePropagation(); }catch(_){}
      // Do not cancel speechSynthesis here.
      // Do not restart utterance here.
      // Do not touch pause/resume/end button states here.
    }, true);
  }

  function getSelectedVoice(){
    const sel = getVoiceSelect();
    const voices = getVoices();
    if(!voices.length) return null;
    const val = sel && sel.value;
    if(val){
      let found = voices.find(v => voiceKey(v) === val);
      if(found) return found;
      found = voices.find(v => (v.voiceURI||'') === val || (v.name||'') === val);
      if(found) return found;
    }
    // fallback to Traditional Chinese/Taiwan voice when possible
    return voices.find(v => /Yating|Taiwan|zh-TW/i.test((v.name||'') + ' ' + (v.lang||''))) ||
           voices.find(v => /^zh/i.test(v.lang||'')) ||
           voices[0] || null;
  }

  function wrapSpeakOnce(){
    if(!window.speechSynthesis || window.speechSynthesis.__VQ_V84_TRUE_WRAP__) return;
    const synth = window.speechSynthesis;
    const originalSpeak = synth.speak.bind(synth);
    synth.speak = function(utterance){
      try{
        const v = getSelectedVoice();
        if(v) utterance.voice = v;
        utterance.lang = (v && v.lang) || utterance.lang || 'zh-TW';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
      }catch(_){}
      return originalSpeak(utterance);
    };
    synth.__VQ_V84_TRUE_WRAP__ = '1';
  }

  function normalizeControlButtons(){
    // Only ensure buttons are visible/clickable when a lecture is active.
    // Do not override existing handlers.
    ['pauseBtn','resumeBtn','stopBtn','pauseLectureBtn','resumeLectureBtn','stopLectureBtn','lecturePauseBtn','lectureResumeBtn','lectureStopBtn'].forEach(id=>{
      const b = $(id);
      if(!b) return;
      try{
        b.style.display = '';
        b.hidden = false;
      }catch(_){}
    });
  }

  function init(){
    ensureVoiceUIVisible();
    populateVoicesIfEmpty();
    bindSafeVoiceChange();
    wrapSpeakOnce();
    normalizeControlButtons();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  [0,300,1000,2500].forEach(t=>setTimeout(init,t));

  try{
    if(window.speechSynthesis){
      const old = window.speechSynthesis.onvoiceschanged;
      window.speechSynthesis.onvoiceschanged = function(ev){
        try{ if(typeof old === 'function') old.call(this, ev); }catch(_){}
        init();
      };
    }
  }catch(_){}

  window.VQ_V84_voiceSafetyPatch = {
    init,
    getSelectedVoice,
    saveSelectedVoiceOnly
  };
})();
