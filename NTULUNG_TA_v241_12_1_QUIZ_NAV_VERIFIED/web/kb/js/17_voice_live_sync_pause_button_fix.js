/*
  v85: live voice switching + stable lecture controls.
  Requirements:
  1. Changing voiceSelect while speaking should immediately switch voice by
     cancelling only the current utterance and re-speaking the remaining text.
  2. The teacher script/typewriter must continue after voice switching.
  3. Pause button becomes faded/disabled after pause; Resume becomes active.
     After resume, Resume becomes faded/disabled and Pause becomes active.
*/
(function(){
  'use strict';
  if(window.VQ_SERVER_TTS_MODE) return;
  const $ = id => document.getElementById(id);
  const synth = window.speechSynthesis;
  if(!synth || synth.__VQ_V85_LIVE_SWITCH__) return;

  const nativeSpeak = synth.speak.bind(synth);
  const nativeCancel = synth.cancel.bind(synth);

  const state = {
    fullText: '',
    currentChar: 0,
    startedAt: 0,
    rate: 1,
    activeUtterance: null,
    originalBoundary: null,
    originalEnd: null,
    originalError: null,
    switching: false,
    lastVoiceValue: '',
    lectureMode: false,
    controlTimer: null
  };

  function getVoices(){
    try{ return synth.getVoices ? synth.getVoices() : []; }
    catch(_){ return []; }
  }

  function voiceKey(v){
    return ((v && (v.voiceURI || v.name || '')) + '|' + ((v && v.lang) || '')).trim();
  }

  function selectedVoice(){
    const sel = $('voiceSelect');
    const voices = getVoices();
    if(!voices.length) return null;
    const value = sel ? String(sel.value || '') : '';
    const text = sel && sel.selectedIndex >= 0 && sel.options[sel.selectedIndex] ? sel.options[sel.selectedIndex].textContent || '' : '';
    return voices.find(v => voiceKey(v) === value) ||
           voices.find(v => (v.voiceURI || '') === value || (v.name || '') === value) ||
           voices.find(v => text.includes(v.name || '') && text.includes(v.lang || '')) ||
           voices.find(v => /Yating|Taiwan|Traditional|zh-TW/i.test((v.name || '') + ' ' + (v.lang || ''))) ||
           voices.find(v => /^zh/i.test(v.lang || '')) ||
           voices[0] || null;
  }

  function applyVoice(u){
    if(!u) return u;
    const v = selectedVoice();
    if(v){
      u.voice = v;
      u.lang = v.lang || 'zh-TW';
    }else if(!u.lang){
      u.lang = 'zh-TW';
    }
    // Keep normal speed. Do not use chunk acceleration.
    u.rate = 1.0;
    u.pitch = 1.0;
    u.volume = 1.0;
    return u;
  }

  function patchedEvent(ev, charIndex){
    try{
      const copy = {};
      for(const k in ev) copy[k] = ev[k];
      copy.charIndex = Math.max(0, charIndex|0);
      return copy;
    }catch(_){
      try{
        Object.defineProperty(ev, 'charIndex', {value: Math.max(0, charIndex|0), configurable:true});
      }catch(__){}
      return ev;
    }
  }

  function estimateChar(){
    if(!state.fullText) return 0;
    let byBoundary = Number.isFinite(state.currentChar) ? state.currentChar : 0;
    // Slow conservative estimate only when boundary is absent.
    const byTime = Math.floor((Date.now() - state.startedAt) / 165);
    return Math.max(0, Math.min(state.fullText.length - 1, Math.max(byBoundary, byTime)));
  }

  function wrapUtterance(u){
    if(!u || u.__VQ_V85_WRAPPED__) return u;
    u.__VQ_V85_WRAPPED__ = '1';

    const isContinuation = !!u.__VQ_V85_CONTINUATION__;
    const baseIndex = Number(u.__VQ_V85_BASE__ || 0);

    // The first utterance in a lecture/answer owns the original handlers.
    if(!isContinuation){
      state.fullText = String(u.text || '');
      state.currentChar = 0;
      state.startedAt = Date.now();
      state.rate = 1.0;
      state.originalBoundary = typeof u.onboundary === 'function' ? u.onboundary : null;
      state.originalEnd = typeof u.onend === 'function' ? u.onend : null;
      state.originalError = typeof u.onerror === 'function' ? u.onerror : null;
    }

    const localBoundary = isContinuation ? state.originalBoundary : (typeof u.onboundary === 'function' ? u.onboundary : null);
    const localEnd = isContinuation ? state.originalEnd : (typeof u.onend === 'function' ? u.onend : null);
    const localError = isContinuation ? state.originalError : (typeof u.onerror === 'function' ? u.onerror : null);

    u.onboundary = function(ev){
      try{
        const local = typeof ev.charIndex === 'number' && ev.charIndex >= 0 ? ev.charIndex : 0;
        state.currentChar = Math.max(0, Math.min(state.fullText.length, baseIndex + local));
        if(typeof localBoundary === 'function'){
          return localBoundary.call(this, patchedEvent(ev, state.currentChar));
        }
      }catch(_){}
    };

    u.onend = function(ev){
      if(u.__VQ_V85_IGNORE_END__) return;
      state.activeUtterance = null;
      if(typeof localEnd === 'function') return localEnd.call(this, ev);
    };

    u.onerror = function(ev){
      if(u.__VQ_V85_IGNORE_END__) return;
      state.activeUtterance = null;
      if(typeof localError === 'function') return localError.call(this, ev);
    };

    state.activeUtterance = u;
    return u;
  }

  synth.speak = function(utterance){
    applyVoice(utterance);
    wrapUtterance(utterance);
    return nativeSpeak(utterance);
  };
  synth.__VQ_V85_LIVE_SWITCH__ = '1';

  function liveSwitchVoiceNow(){
    if(!state.fullText || !synth.speaking || synth.paused) return;
    const idx = estimateChar();
    const remaining = state.fullText.slice(idx).trimStart();
    if(remaining.length < 2) return;

    // Ignore end/error callbacks from the utterance we intentionally cancel.
    if(state.activeUtterance) state.activeUtterance.__VQ_V85_IGNORE_END__ = '1';

    state.switching = true;
    try{ nativeCancel(); }catch(_){}

    const u = new SpeechSynthesisUtterance(remaining);
    u.__VQ_V85_CONTINUATION__ = '1';
    u.__VQ_V85_BASE__ = idx;
    applyVoice(u);
    wrapUtterance(u);

    setTimeout(()=>{
      try{ nativeSpeak(u); }catch(_){}
      setTimeout(()=>{ state.switching = false; }, 120);
    }, 40);
  }

  function findVoiceSelect(){
    return $('voiceSelect') || document.querySelector('select[id*="voice" i], select[name*="voice" i]');
  }

  function installVoicePolling(){
    const sel = findVoiceSelect();
    if(sel && !state.lastVoiceValue) state.lastVoiceValue = String(sel.value || '');
    setInterval(()=>{
      const current = findVoiceSelect();
      if(!current) return;
      const val = String(current.value || '');
      if(state.lastVoiceValue === '') state.lastVoiceValue = val;
      if(val !== state.lastVoiceValue){
        state.lastVoiceValue = val;
        try{ localStorage.setItem('vqSelectedVoiceKey', val); }catch(_){}
        liveSwitchVoiceNow();
      }
    }, 120);
  }

  function setBtn(id, disabled){
    const b = $(id);
    if(!b) return;
    b.disabled = !!disabled;
    b.setAttribute('aria-disabled', disabled ? 'true' : 'false');
  }

  function updateLectureButtons(){
    if(window.__VQ105_INPLACE_LECTURE_MASTER__ && window.__VQ105_INPLACE_LECTURE_MASTER__.active){ return; }
    const p = $('pauseLessonBtn'), r = $('resumeLessonBtn'), s = $('stopLessonBtn');
    if(!p && !r && !s) return;

    const speaking = !!(synth.speaking || synth.paused);
    if(!speaking){
      setBtn('pauseLessonBtn', true);
      setBtn('resumeLessonBtn', true);
      setBtn('stopLessonBtn', true);
      return;
    }
    if(synth.paused){
      setBtn('pauseLessonBtn', true);
      setBtn('resumeLessonBtn', false);
      setBtn('stopLessonBtn', false);
    }else{
      setBtn('pauseLessonBtn', false);
      setBtn('resumeLessonBtn', true);
      setBtn('stopLessonBtn', false);
    }
  }

  function installLectureControlVisuals(){
    // mousedown fires before the old capture click handlers; use it only to mark lecture mode.
    const start = $('startLessonBtn');
    if(start && !start.__VQ_V85_MARK__){
      start.addEventListener('mousedown', ()=>{ state.lectureMode = true; setTimeout(updateLectureButtons,80); }, true);
      start.__VQ_V85_MARK__ = '1';
    }
    const stop = $('stopLessonBtn');
    if(stop && !stop.__VQ_V85_MARK__){
      stop.addEventListener('mousedown', ()=>{ setTimeout(()=>{ state.lectureMode = false; updateLectureButtons(); },120); }, true);
      stop.__VQ_V85_MARK__ = '1';
    }
    if(!state.controlTimer){
      state.controlTimer = setInterval(updateLectureButtons, 160);
    }
    updateLectureButtons();
  }

  function init(){
    installVoicePolling();
    installLectureControlVisuals();
    // keep normal speed sliders stable
    const rate = $('rateRange'), pitch = $('pitchRange');
    if(rate) rate.value = '1.00';
    if(pitch) pitch.value = '1.00';
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  setTimeout(init, 300);
  setTimeout(init, 1000);
  setTimeout(init, 2500);

  window.VQ_V85_liveVoiceSwitchNow = liveSwitchVoiceNow;
})();
