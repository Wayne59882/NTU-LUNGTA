(function(){
  'use strict';
  if(window.VQ_SERVER_TTS_MODE) return;

  /* v184: Windows + iOS + Android cross-platform avatar-role TTS.
     Microsoft Yating/Zhiwei are preferred only when the current device exposes them.
     Otherwise the page selects a device-local Chinese voice and never hard-fails solely
     because a Microsoft voice is absent. */

  const ROLE_TO_VOICE = {
    yating: {
      label: 'Yating — Female Avatar / Female Voice',
      exact: /Yating/i,
      roleHints: /Yating|Hsiao|Xiao|Mei|Ting|Yu|Ting-Ting|Sinji|Female|女/i
    },
    zhiwei: {
      label: 'Male 3D TA — Teacher Voice',
      exact: /Zhiwei/i,
      roleHints: /Zhiwei|Yun|Jhe|Kangkang|Male|男/i
    }
  };

  const DEFAULT_ROLE = 'yating';
  const $ = id => document.getElementById(id);
  const getSynth = () => window.speechSynthesis || null;

  function platform(){
    const ua = navigator.userAgent || '';
    const p = navigator.platform || '';
    const touchMac = /Mac/i.test(p) && Number(navigator.maxTouchPoints || 0) > 1;
    if(/iPhone|iPad|iPod/i.test(ua) || touchMac) return 'ios';
    if(/Android/i.test(ua)) return 'android';
    if(/Windows/i.test(ua)) return 'windows';
    return 'other';
  }

  function getVoices(){
    try{
      const synth = getSynth();
      return synth && synth.getVoices ? (synth.getVoices() || []) : [];
    }catch(_){ return []; }
  }

  function voiceKey(v){
    return ((v && (v.voiceURI || v.name || '')) + '|' + ((v && v.lang) || '')).trim();
  }

  function voiceText(v){
    return ((v && v.name) || '') + ' ' + ((v && v.voiceURI) || '') + ' ' + ((v && v.lang) || '');
  }

  function langOf(v){ return String((v && v.lang) || '').replace('_','-'); }
  function isTwVoice(v){
    return /^zh-(TW|Hant)(-|$)/i.test(langOf(v)) || /Taiwan|臺灣|台灣|Traditional/i.test(voiceText(v));
  }
  function isHkVoice(v){ return /^zh-HK(-|$)/i.test(langOf(v)) || /Hong Kong|香港/i.test(voiceText(v)); }
  function isChineseVoice(v){
    return /^(zh|cmn)(-|$)/i.test(langOf(v)) || /Chinese|中文|Mandarin|國語|普通話/i.test(voiceText(v));
  }

  function getRoleKey(){
    const roleSel = $('avatarRoleSelect');
    if(roleSel && ROLE_TO_VOICE[roleSel.value]) return roleSel.value;
    const avatar = $('avatar');
    const dataRole = avatar && avatar.getAttribute('data-avatar-role');
    if(dataRole && ROLE_TO_VOICE[dataRole]) return dataRole;
    try{
      const stored = localStorage.getItem('VQ_REAL_AVATAR_ROLE');
      if(stored && ROLE_TO_VOICE[stored]) return stored;
    }catch(_){ }
    return DEFAULT_ROLE;
  }

  function orderedChineseCandidates(){
    const list = getVoices();
    const tw = list.filter(isTwVoice);
    const hk = list.filter(isHkVoice);
    const zh = list.filter(v => isChineseVoice(v) && !tw.includes(v) && !hk.includes(v));
    const rest = list.filter(v => !tw.includes(v) && !hk.includes(v) && !zh.includes(v));

    // On every platform Taiwan Chinese remains first priority. Android commonly exposes
    // Google/Samsung/system voices with generic zh locales, while iOS may expose Apple
    // voices under zh-TW/zh-Hant. The ranking intentionally uses capability, not vendor.
    return [...tw, ...hk, ...zh, ...rest];
  }

  function getTargetVoice(roleKey){
    const role = ROLE_TO_VOICE[roleKey] || ROLE_TO_VOICE[DEFAULT_ROLE];
    const list = getVoices();
    if(!list.length) return null;

    // Preserve exact Windows/Edge Microsoft voice when available.
    const exact = list.find(v => role.exact.test(voiceText(v)));
    if(exact) return exact;

    const pool = orderedChineseCandidates();
    const chineseOnly = pool.filter(isChineseVoice);
    const effectivePool = chineseOnly.length ? chineseOnly : pool;

    const hinted = effectivePool.find(v => role.roleHints.test(voiceText(v)));
    if(hinted) return hinted;

    // Keep the female/male avatar roles distinct when the device exposes more than one
    // usable Chinese voice. Gender metadata is not standardized, so this is a best-effort
    // distinction; it never blocks speech if only one voice is available.
    if(effectivePool.length > 1) return roleKey === 'zhiwei' ? effectivePool[1] : effectivePool[0];
    return effectivePool[0] || null;
  }

  function applyTargetVoiceToUtterance(u){
    if(!u) return null;
    const target = getTargetVoice(getRoleKey());
    if(target) u.voice = target;
    u.lang = (target && target.lang) || 'zh-TW';
    u.rate = 1.0;
    u.pitch = 1.0;
    u.volume = 1.0;
    return target;
  }

  function setStatus(msg){
    const s = $('status');
    if(s) s.textContent = 'Status: ' + msg;
  }

  function deviceLabel(){
    const p = platform();
    if(p === 'ios') return 'iPhone/iPad';
    if(p === 'android') return 'Android';
    if(p === 'windows') return 'Windows';
    return 'This device';
  }

  function rebuildVoiceSelect(){
    const sel = $('voiceSelect');
    if(!sel) return null;
    const list = getVoices();
    sel.style.display = 'block';
    sel.style.visibility = 'visible';
    sel.style.opacity = '1';

    const roleKey = getRoleKey();
    const target = getTargetVoice(roleKey);
    if(!list.length){
      sel.innerHTML = '<option value="">Loading voices on this device</option>';
      return null;
    }

    const ordered = orderedChineseCandidates();
    const chinese = ordered.filter(isChineseVoice);
    const shown = chinese.length ? chinese : ordered;
    sel.innerHTML = '';
    shown.forEach(v => {
      const opt = document.createElement('option');
      opt.value = voiceKey(v);
      opt.textContent = (v.name || 'Voice') + ' - ' + (v.lang || 'unknown');
      opt.dataset.voiceName = v.name || '';
      opt.dataset.lang = v.lang || '';
      opt.dataset.uri = v.voiceURI || '';
      sel.appendChild(opt);
    });

    if(target){
      sel.value = voiceKey(target);
      try{
        localStorage.setItem('vqSelectedVoiceKey', voiceKey(target));
        localStorage.setItem('vqSelectedVoiceText', target.name + ' - ' + (target.lang || ''));
      }catch(_){ }
    }
    return target;
  }

  function enforceRoleAndVoice(){
    const roleKey = getRoleKey();
    const roleSel = $('avatarRoleSelect');
    if(roleSel && ROLE_TO_VOICE[roleKey] && roleSel.value !== roleKey) roleSel.value = roleKey;
    return rebuildVoiceSelect();
  }

  function installSpeakGuard(){
    const synth = getSynth();
    if(!synth || synth.__VQ184_CROSS_PLATFORM_VOICE__) return;
    const nativeSpeak = synth.speak.bind(synth);
    synth.speak = function(utterance){
      let target = null;
      try{
        // Mobile browsers may pause synthesis or populate the voice list only after a
        // user gesture. resume() is harmless when already active.
        if(typeof synth.resume === 'function') synth.resume();
        enforceRoleAndVoice();
        target = applyTargetVoiceToUtterance(utterance);
      }catch(_){ }

      if(!target && utterance && !utterance.__VQ184_RETRY_DONE__){
        const tries = Number(utterance.__VQ184_TRIES__ || 0);
        if(tries < 10){
          utterance.__VQ184_TRIES__ = tries + 1;
          setTimeout(() => { try{ synth.speak(utterance); }catch(_){ } }, 120);
          return;
        }
        utterance.__VQ184_RETRY_DONE__ = '1';
        utterance.lang = 'zh-TW';
        setStatus(deviceLabel() + ' The requested browser voice is unavailable.');
      }
      return nativeSpeak(utterance);
    };
    synth.__VQ184_CROSS_PLATFORM_VOICE__ = '1';
  }

  function bindRoleSelect(){
    const roleSel = $('avatarRoleSelect');
    if(!roleSel || roleSel.__VQ184_BOUND__) return;
    roleSel.__VQ184_BOUND__ = '1';
    roleSel.addEventListener('change', () => {
      const roleKey = getRoleKey();
      try{ localStorage.setItem('VQ_REAL_AVATAR_ROLE', roleKey); }catch(_){ }
      setTimeout(() => {
        const v = enforceRoleAndVoice();
        const roleLabel = (ROLE_TO_VOICE[roleKey] && ROLE_TO_VOICE[roleKey].label) || roleKey;
        if(v) setStatus('Changed to “' + roleLabel + '”. ' + deviceLabel() + 'Current voice: ' + v.name);
        else setStatus('Changed to “' + roleLabel + '”. ' + deviceLabel() + 'Browser fallback voice is unavailable; Zhiwei uses the server teacher voice.');
      }, 20);
    }, true);
  }

  function warmVoiceList(){
    try{ getVoices(); }catch(_){ }
    setTimeout(enforceRoleAndVoice, 0);
    setTimeout(enforceRoleAndVoice, 120);
    setTimeout(enforceRoleAndVoice, 500);
  }

  function bindBeforeSpeechButtons(){
    ['startLessonBtn','repeatBtn','submitTypedQuestionBtn','submitTypedCaseBtn','avatarRoleSelect','voiceSelect'].forEach(id => {
      const el = $(id);
      if(!el || el.__VQ184_PRE_SPEECH_BOUND__) return;
      el.__VQ184_PRE_SPEECH_BOUND__ = '1';
      el.addEventListener('touchstart', warmVoiceList, {passive:true, capture:true});
      el.addEventListener('pointerdown', warmVoiceList, true);
      el.addEventListener('click', warmVoiceList, true);
      el.addEventListener('change', warmVoiceList, true);
    });
  }

  function init(){
    installSpeakGuard();
    bindRoleSelect();
    bindBeforeSpeechButtons();
    enforceRoleAndVoice();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  [60,180,450,900,1600,2600].forEach(t => setTimeout(init,t));

  try{
    const synth = getSynth();
    if(synth){
      const old = synth.onvoiceschanged;
      synth.onvoiceschanged = function(ev){
        try{ if(typeof old === 'function') old.call(this, ev); }catch(_){ }
        setTimeout(init, 0);
        setTimeout(enforceRoleAndVoice, 80);
        setTimeout(enforceRoleAndVoice, 300);
      };
    }
  }catch(_){ }

  window.VQ184_CROSS_PLATFORM_VOICE = { init, enforceRoleAndVoice, getRoleKey, getTargetVoice, platform };
})();
