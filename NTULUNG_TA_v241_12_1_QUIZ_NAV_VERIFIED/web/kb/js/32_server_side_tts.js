(function(){
  'use strict';

  /* v189 server-side TTS bridge.
     - Character role is fixed: Yating = Taiwan female, Zhiwei = Taiwan male.
     - The audio is generated on the server, so iPhone/Android/Windows hear the same gender/voice.
     - Existing SpeechSynthesisUtterance calls are intercepted so the rest of the teaching UI can stay unchanged.
     - Speech recognition remains browser/device-side; only speech OUTPUT is moved to the server. */

  window.VQ_SERVER_TTS_MODE = true;
  const synth = window.speechSynthesis;
  if(!synth) return;

  const $ = id => document.getElementById(id);
  const ROLE_LABELS = {
    yating: 'Yating — Taiwan Female Voice',
    zhiwei: 'Zhiwei — Teacher Voice'
  };
  const SILENT_WAV = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';

  const state = {
    audio: new Audio(),
    primeAudioEl: new Audio(),
    utterance: null,
    controller: null,
    url: '',
    speaking: false,
    paused: false,
    started: false,
    primed: false,
    boundaryTimer: null,
    lastIndex: -1,
    requestSerial: 0,
    pendingPlay: false,
    intentionalPause: false,
    canceling: false,
    lastTouchAt: 0,
    lastScrollAt: 0,
    autoResumeTimer: null,
    segmentText: '',
    segmentBase: 0,
    activeRole: '',
    roleSwitching: false
  };
  state.audio.preload = 'auto';
  state.audio.setAttribute('playsinline','');
  state.primeAudioEl.preload = 'auto';
  state.primeAudioEl.setAttribute('playsinline','');

  function roleKey(){
    const rs = $('avatarRoleSelect');
    if(rs && (rs.value === 'yating' || rs.value === 'zhiwei')) return rs.value;
    const avatar = $('avatar');
    const r = avatar && avatar.getAttribute('data-avatar-role');
    if(r === 'yating' || r === 'zhiwei') return r;
    try{
      const stored = localStorage.getItem('VQ_REAL_AVATAR_ROLE');
      if(stored === 'yating' || stored === 'zhiwei') return stored;
    }catch(_){ }
    return 'zhiwei';
  }

  function setStatus(msg){
    const el = $('status');
    if(el) el.textContent = 'Status: ' + msg;
  }

  function forceVoiceUI(){
    const sel = $('voiceSelect');
    if(!sel) return;
    const current = roleKey();
    const wanted = '<option value="yating">Yating — Taiwan Female Voice</option><option value="zhiwei">Zhiwei — Teacher Voice</option>';
    if(sel.options.length !== 2 || !sel.querySelector('option[value="yating"]') || !sel.querySelector('option[value="zhiwei"]')){
      sel.innerHTML = wanted;
    }
    sel.value = current;
    sel.disabled = false;
    sel.title = 'Server-generated speech. The male 3D TA uses the authorized teacher reference voice when the local cloning service is available.';
    const label = $('voiceSelectLabel') || document.querySelector('label[for="voiceSelect"]');
    if(label) label.textContent = 'Server Voice (consistent across devices)';
  }

  function syncRoleControls(next){
    if(next !== 'yating' && next !== 'zhiwei') return;
    try{ localStorage.setItem('VQ_REAL_AVATAR_ROLE', next); }catch(_){ }

    const rs = $('avatarRoleSelect');
    if(rs && rs.value !== next) rs.value = next;

    try{
      if(window.VQ_REAL_AVATAR && typeof window.VQ_REAL_AVATAR.applyRole === 'function'){
        const avatar = $('avatar');
        const current = avatar && avatar.getAttribute('data-avatar-role');
        if(current !== next) window.VQ_REAL_AVATAR.applyRole(next, true);
      }
    }catch(_){ }

    const sel = $('voiceSelect');
    if(sel && sel.value !== next) sel.value = next;
  }

  function currentGlobalCharIndex(){
    const u = state.utterance;
    if(!u) return 0;
    const full = String(u.text || '');
    if(!full.length) return 0;
    const seg = String(state.segmentText || full.slice(state.segmentBase || 0));
    let local = 0;
    try{
      if(seg.length && isFinite(state.audio.duration) && state.audio.duration > 0){
        const ratio = Math.max(0, Math.min(1, state.audio.currentTime / state.audio.duration));
        local = Math.floor(ratio * seg.length);
      }
    }catch(_){ }
    return Math.max(0, Math.min(full.length - 1, Number(state.segmentBase || 0) + local));
  }

  function stopTransportKeepUtterance(){
    state.requestSerial += 1;
    state.canceling = true;
    state.intentionalPause = true;
    if(state.controller){ try{ state.controller.abort(); }catch(_){ } }
    state.controller = null;
    try{
      state.audio.onplaying = null;
      state.audio.onended = null;
      state.audio.onerror = null;
      state.audio.pause();
      state.audio.removeAttribute('src');
      state.audio.load();
    }catch(_){ }
    stopBoundaryTimer();
    closeMouth();
    if(state.url){
      try{ URL.revokeObjectURL(state.url); }catch(_){ }
      state.url = '';
    }
    state.speaking = false;
    // Keep state.started for the same utterance so a role switch does not fire
    // the lecture/answer onstart callback a second time.
    state.pendingPlay = false;
    state.lastIndex = -1;
    state.intentionalPause = false;
    state.canceling = false;
  }

  function applyRole(next){
    if(next !== 'yating' && next !== 'zhiwei') return;
    syncRoleControls(next);
    forceVoiceUI();

    // v189: avatar role is the single source of truth for Server-side TTS.
    // If speech is currently active, regenerate only the remaining text using
    // the newly selected server voice. This gives an immediate male/female
    // switch on Windows, iPhone/iPad and Android without device-local voices.
    if(state.utterance && state.activeRole && next !== state.activeRole){
      switchActiveRole(next);
    }else{
      state.activeRole = next;
    }
  }

  function bindVoiceUI(){
    forceVoiceUI();
    const sel = $('voiceSelect');
    if(sel && !sel.__VQ189_BOUND__){
      sel.__VQ189_BOUND__ = '1';
      sel.addEventListener('change', function(){
        const next = sel.value;
        applyRole(next);
        setStatus('Switched to “' + (ROLE_LABELS[next] || next) + '”.');
      }, true);
    }
    const rs = $('avatarRoleSelect');
    if(rs && !rs.__VQ189_BOUND__){
      rs.__VQ189_BOUND__ = '1';
      rs.addEventListener('change', function(){
        const next = rs.value;
        applyRole(next);
        setStatus('Avatar and voice switched to “' + (ROLE_LABELS[next] || next) + '”.');
      }, true);
    }
  }

  function primeAudio(){
    if(state.primed) return;
    // v203 audio fix: unlock the SAME Audio element that will later play the
    // server-generated WAV. iOS can reject a delayed play() after network TTS
    // even when a different Audio element was primed. Only do this while idle,
    // so scrolling can never replace/pause an active lecture source.
    const a = (!state.utterance && !state.speaking && !state.audio.src) ? state.audio : state.primeAudioEl;
    try{
      a.muted = false;
      a.volume = 1;
      a.src = SILENT_WAV;
      const p = a.play();
      const done = function(){
        try{ a.pause(); a.currentTime = 0; a.removeAttribute('src'); a.load(); }catch(_){ }
        state.primed = true;
      };
      if(p && typeof p.then === 'function') p.then(done).catch(function(){ });
      else done();
    }catch(_){ }
  }

  function markTouch(){ state.lastTouchAt = Date.now(); }
  function markScroll(){ state.lastScrollAt = Date.now(); }
  ['pointerdown','touchstart','click'].forEach(function(evt){
    document.addEventListener(evt, function(){
      markTouch();
      primeAudio();
    }, {capture:true, passive:true});
  });
  document.addEventListener('touchmove', markTouch, {capture:true, passive:true});
  window.addEventListener('scroll', markScroll, {capture:true, passive:true});

  // Mobile Safari/Chrome should not pause lecture audio merely because the page
  // is being scrolled. If an unexpected pause happens during a visible-page
  // touch/scroll gesture, resume the same audio from the same currentTime.
  state.audio.addEventListener('pause', function(){
    if(state.canceling || state.intentionalPause || state.paused || !state.speaking) return;
    if(state.audio.ended || document.visibilityState !== 'visible') return;
    const now = Date.now();
    const recentGesture = (now - state.lastTouchAt < 1800) || (now - state.lastScrollAt < 1800);
    if(!recentGesture) return;
    if(state.autoResumeTimer) clearTimeout(state.autoResumeTimer);
    state.autoResumeTimer = setTimeout(function(){
      state.autoResumeTimer = null;
      if(state.canceling || state.intentionalPause || state.paused || !state.speaking) return;
      if(document.visibilityState !== 'visible' || state.audio.ended) return;
      try{
        const p = state.audio.play();
        if(p && typeof p.catch === 'function') p.catch(function(){
          state.pendingPlay = true;
          setStatus('Playback position was preserved. Select “Resume” to continue.');
        });
      }catch(_){ }
    }, 80);
  });

  function stopBoundaryTimer(){
    if(state.boundaryTimer) clearInterval(state.boundaryTimer);
    state.boundaryTimer = null;
  }

  function mouthShape(ch){
    ch = String(ch || '').toLowerCase();
    if(/[\s，。！？、,.!?；;：:]/.test(ch)) return 'mouth-closed';
    if(/[bmpㄅㄆㄇ]/i.test(ch)) return 'mouth-m';
    if(/[ao啊阿哈]/i.test(ch)) return 'mouth-a';
    if(/[ei欸ㄟㄧ一衣]/i.test(ch)) return 'mouth-e';
    if(/[ouㄡㄛㄨ喔哦嗚]/i.test(ch)) return 'mouth-o';
    return 'mouth-small';
  }

  function closeMouth(){
    document.body.classList.remove('speaking');
    try{
      if(window.VQ_3D_AVATAR && typeof window.VQ_3D_AVATAR.stopMouthSync === 'function'){
        window.VQ_3D_AVATAR.stopMouthSync(true);
      }else if(window.VQ_REAL_AVATAR && typeof window.VQ_REAL_AVATAR.stopMouthSync === 'function'){
        window.VQ_REAL_AVATAR.stopMouthSync(true);
      }
    }catch(_){ }
  }

  function dispatchBoundary(){
    const u = state.utterance;
    const a = state.audio;
    if(!u || !state.speaking || state.paused || !isFinite(a.duration) || a.duration <= 0) return;
    const fullText = String(u.text || '');
    const segment = String(state.segmentText || fullText.slice(state.segmentBase || 0));
    if(!segment.length) return;
    const ratio = Math.max(0, Math.min(1, a.currentTime / a.duration));
    const localIdx = Math.max(0, Math.min(segment.length - 1, Math.floor(ratio * segment.length)));
    const idx = Math.max(0, Math.min(fullText.length - 1, Number(state.segmentBase || 0) + localIdx));
    if(idx === state.lastIndex) return;
    state.lastIndex = idx;
    try{
      if(typeof u.onboundary === 'function') u.onboundary.call(u, {charIndex: idx, name:'word', elapsedTime:a.currentTime});
    }catch(_){ }
    try{
      if(window.VQ_3D_AVATAR && typeof window.VQ_3D_AVATAR.setMouthShape === 'function'){
        window.VQ_3D_AVATAR.setMouthShape(mouthShape(segment.charAt(localIdx)));
      }else if(window.VQ_REAL_AVATAR && typeof window.VQ_REAL_AVATAR.setMouthShape === 'function'){
        window.VQ_REAL_AVATAR.setMouthShape(mouthShape(segment.charAt(localIdx)));
      }
    }catch(_){ }
  }

  function startBoundaryTimer(){
    stopBoundaryTimer();
    state.boundaryTimer = setInterval(dispatchBoundary, 90);
  }

  function cleanupAudio(revoke){
    stopBoundaryTimer();
    if(state.autoResumeTimer) clearTimeout(state.autoResumeTimer);
    state.autoResumeTimer = null;
    closeMouth();
    state.speaking = false;
    state.paused = false;
    state.started = false;
    state.pendingPlay = false;
    state.lastIndex = -1;
    state.segmentText = '';
    state.segmentBase = 0;
    if(revoke !== false && state.url){
      try{ URL.revokeObjectURL(state.url); }catch(_){ }
      state.url = '';
    }
  }

  function hardCancel(){
    state.requestSerial += 1;
    state.canceling = true;
    state.intentionalPause = true;
    if(state.controller){ try{ state.controller.abort(); }catch(_){ } }
    state.controller = null;
    try{ state.audio.pause(); }catch(_){ }
    try{ state.audio.removeAttribute('src'); state.audio.load(); }catch(_){ }
    cleanupAudio(true);
    state.utterance = null;
    state.intentionalPause = false;
    state.canceling = false;
  }

  function rateOf(u){
    const n = Number(u && u.rate);
    return Number.isFinite(n) ? Math.max(0.8, Math.min(1.2, n)) : 1.0;
  }
  function pitchOf(u){
    const n = Number(u && u.pitch);
    return Number.isFinite(n) ? Math.max(0.8, Math.min(1.2, n)) : 1.0;
  }

  async function requestSegment(u, segmentText, baseIndex, role, keepPaused){
    if(!u || !String(segmentText || '').trim()) return;
    const serial = ++state.requestSerial;
    state.utterance = u;
    state.segmentText = String(segmentText || '');
    state.segmentBase = Math.max(0, Number(baseIndex || 0));
    state.activeRole = (role === 'yating') ? 'yating' : 'zhiwei';
    state.controller = ('AbortController' in window) ? new AbortController() : null;
    forceVoiceUI();
    syncRoleControls(state.activeRole);
    setStatus('Generating “' + (ROLE_LABELS[state.activeRole] || state.activeRole) + '” speech on the server...');

    let response;
    try{
      response = await fetch('/api/kb/tts', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({text:state.segmentText, role:state.activeRole, rate:rateOf(u), pitch:pitchOf(u), language:(u.lang || window.VQ_LAST_DETECTED_LANGUAGE || (window.VQ_detectLanguage?window.VQ_detectLanguage(state.segmentText):'en-US'))}),
        signal: state.controller ? state.controller.signal : undefined,
        cache:'no-store'
      });
    }catch(err){
      if(serial !== state.requestSerial) return;
      cleanupAudio(true);
      state.utterance = null;
      if(err && err.name === 'AbortError') return;
      setStatus('Server TTS connection failed. Confirm that the TTS service is installed and running.');
      try{ if(typeof u.onerror === 'function') u.onerror.call(u, {error:'network'}); }catch(_){ }
      return;
    }
    if(serial !== state.requestSerial) return;
    if(!response.ok){
      let msg = 'Server TTS unavailable';
      try{ const j = await response.json(); if(j && j.error) msg = j.error; }catch(_){ }
      cleanupAudio(true);
      state.utterance = null;
      setStatus('Server TTS failed: ' + msg);
      try{ if(typeof u.onerror === 'function') u.onerror.call(u, {error:'server'}); }catch(_){ }
      return;
    }

    const blob = await response.blob();
    if(serial !== state.requestSerial) return;
    state.url = URL.createObjectURL(blob);
    const a = state.audio;
    a.muted = false;
    a.volume = 1;
    a.src = state.url;
    a.preload = 'auto';
    state.lastIndex = -1;

    a.onplaying = function(){
      if(serial !== state.requestSerial) return;
      state.speaking = true;
      state.paused = false;
      state.intentionalPause = false;
      state.canceling = false;
      document.body.classList.add('speaking');
      if(!state.started){
        state.started = true;
        try{ if(typeof u.onstart === 'function') u.onstart.call(u, {elapsedTime:0}); }catch(_){ }
      }
      startBoundaryTimer();
      setStatus('Playing “' + (ROLE_LABELS[state.activeRole] || state.activeRole) + '”.');
    };
    a.onended = function(){
      if(serial !== state.requestSerial) return;
      try{
        const text = String(u.text || '');
        if(text && typeof u.onboundary === 'function') u.onboundary.call(u, {charIndex:text.length, name:'word', elapsedTime:a.duration || 0});
      }catch(_){ }
      cleanupAudio(true);
      state.utterance = null;
      try{ if(typeof u.onend === 'function') u.onend.call(u, {elapsedTime:a.duration || 0}); }catch(_){ }
    };
    a.onerror = function(){
      if(serial !== state.requestSerial) return;
      cleanupAudio(true);
      state.utterance = null;
      setStatus('Audio playback failed. Select play or replay again.');
      try{ if(typeof u.onerror === 'function') u.onerror.call(u, {error:'audio'}); }catch(_){ }
    };

    if(keepPaused){
      state.paused = true;
      state.speaking = false;
      state.pendingPlay = true;
      state.intentionalPause = true;
      setStatus('Switched to “' + (ROLE_LABELS[state.activeRole] || state.activeRole) + '” while remaining paused.');
      return;
    }

    try{
      const playPromise = a.play();
      if(playPromise && typeof playPromise.catch === 'function'){
        playPromise.catch(function(){
          if(serial !== state.requestSerial) return;
          state.pendingPlay = true;
          setStatus('Speech is ready. Tap once to enable audio playback.');
          const retry = function(){
            document.removeEventListener('click', retry, true);
            if(serial !== state.requestSerial || !state.pendingPlay) return;
            state.pendingPlay = false;
            try{
              const rp = a.play();
              if(rp && typeof rp.catch === 'function') rp.catch(function(){ state.pendingPlay = true; });
            }catch(_){ state.pendingPlay = true; }
          };
          document.addEventListener('click', retry, true);
        });
      }
    }catch(_){
      state.pendingPlay = true;
      setStatus('Speech is ready. Tap Play / Replay / Resume once more to enable mobile audio.');
    }
  }

  async function serverSpeak(u){
    if(!u || !String(u.text || '').trim()) return;
    hardCancel();
    const role = roleKey();
    state.activeRole = role;
    return requestSegment(u, String(u.text || ''), 0, role, false);
  }

  function switchActiveRole(next){
    if(next !== 'yating' && next !== 'zhiwei') return;
    if(state.roleSwitching) return;
    const u = state.utterance;
    if(!u){ state.activeRole = next; return; }
    if(next === state.activeRole){ syncRoleControls(next); return; }

    const fullText = String(u.text || '');
    if(!fullText.trim()){ state.activeRole = next; return; }
    const idx = currentGlobalCharIndex();
    const remaining = fullText.slice(idx);
    const keepPaused = !!state.paused;

    state.roleSwitching = true;
    stopTransportKeepUtterance();
    state.activeRole = next;
    syncRoleControls(next);
    requestSegment(u, remaining, idx, next, keepPaused).finally(function(){
      setTimeout(function(){ state.roleSwitching = false; }, 80);
    });
  }

  const oldCancel = synth.cancel ? synth.cancel.bind(synth) : null;
  synth.speak = function(u){ serverSpeak(u); };
  synth.cancel = function(){
    hardCancel();
    try{ if(oldCancel) oldCancel(); }catch(_){ }
  };
  synth.pause = function(){
    if(!state.speaking || state.paused) return;
    state.intentionalPause = true;
    state.paused = true;
    state.speaking = false;
    try{ state.audio.pause(); }catch(_){ }
    stopBoundaryTimer();
    closeMouth();
    try{ if(state.utterance && typeof state.utterance.onpause === 'function') state.utterance.onpause.call(state.utterance, {}); }catch(_){ }
  };
  synth.resume = function(){
    if(!state.utterance) return;
    if(state.pendingPlay || state.paused){
      state.pendingPlay = false;
      state.intentionalPause = false;
      const p = state.audio.play();
      state.paused = false;
      state.speaking = true;
      try{ if(typeof state.utterance.onresume === 'function') state.utterance.onresume.call(state.utterance, {}); }catch(_){ }
      if(p && typeof p.catch === 'function') p.catch(function(){ setStatus('Tap the page once, then select Resume.'); });
    }
  };

  const api = {
    cancel: hardCancel,
    prime: primeAudio,
    roleKey: roleKey,
    forceVoiceUI: forceVoiceUI,
    resume: function(){ synth.resume(); },
    pause: function(){ synth.pause(); },
    switchRole: function(role){ applyRole(role); }
  };
  Object.defineProperties(api, {
    speaking: {get:function(){ return !!state.speaking; }},
    paused: {get:function(){ return !!state.paused; }},
    pending: {get:function(){ return !!state.pendingPlay; }}
  });
  window.VQ_SERVER_TTS = api;
  window.VQ_SERVER_TTS_ACTIVE = true;

  // Best effort: shadow native state flags for older patches that read speechSynthesis.speaking/paused.
  try{ Object.defineProperty(synth, 'speaking', {configurable:true, get:function(){ return !!state.speaking; }}); }catch(_){ }
  try{ Object.defineProperty(synth, 'paused', {configurable:true, get:function(){ return !!state.paused; }}); }catch(_){ }
  try{ Object.defineProperty(synth, 'pending', {configurable:true, get:function(){ return !!state.pendingPlay; }}); }catch(_){ }

  function init(){ bindVoiceUI(); forceVoiceUI(); primeAudio(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  [0,80,250,600,1200,2200,3200].forEach(function(t){ setTimeout(function(){ bindVoiceUI(); forceVoiceUI(); }, t); });

  const voiceSel = $('voiceSelect');
  if(voiceSel && 'MutationObserver' in window){
    let repairing = false;
    const mo = new MutationObserver(function(){
      if(repairing) return;
      repairing = true;
      setTimeout(function(){ forceVoiceUI(); repairing = false; }, 0);
    });
    mo.observe(voiceSel, {childList:true, subtree:true});
  }
})();
