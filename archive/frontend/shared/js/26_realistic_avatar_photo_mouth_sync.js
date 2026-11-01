(function(){
  'use strict';

  /* v125 clean portrait state swap patch
     - Replaces the old warped-mouth approach with full-portrait state images.
     - Uses one stable portrait per mouth shape, so only the mouth state changes.
     - Supports both lecture narration and system answer speech.
     - Keeps the original control-button logic, only reflecting disabled buttons visually. */

  const ASSETS = 'assets/';
  const CANVAS_W = 520;
  const CANVAS_H = 640;

  const ROLES = {
    yating: {
      label: 'Yating — Female Avatar / Female Voice',
      voiceNames: ['Yating'],
      states: {
        closed: ASSETS + 'avatar_female_closed.png',
        mbp:    ASSETS + 'avatar_female_mbp.png',
        small:  ASSETS + 'avatar_female_small.png',
        a:      ASSETS + 'avatar_female_a.png',
        e:      ASSETS + 'avatar_female_e.png',
        o:      ASSETS + 'avatar_female_o.png'
      }
    },
    zhiwei: {
      label: 'Zhiwei — Teacher Voice',
      voiceNames: ['Zhiwei'],
      states: {
        closed: ASSETS + 'avatar_male_closed.png',
        mbp:    ASSETS + 'avatar_male_mbp.png',
        small:  ASSETS + 'avatar_male_small.png',
        a:      ASSETS + 'avatar_male_a.png',
        e:      ASSETS + 'avatar_male_e.png',
        o:      ASSETS + 'avatar_male_o.png'
      }
    }
  };

  const SHAPE_TO_STATE = {
    'mouth-closed': 'closed',
    'mouth-rest': 'closed',
    'mouth-m': 'mbp',
    'mouth-neutral': 'small',
    'mouth-small': 'small',
    'mouth-soft': 'small',
    'mouth-fv': 'small',
    'mouth-teeth': 'e',
    'mouth-open': 'a',
    'mouth-a': 'a',
    'mouth-wide': 'e',
    'mouth-e': 'e',
    'mouth-round': 'o',
    'mouth-o': 'o'
  };

  const CJK_VISEME_TABLE = ['mouth-a', 'mouth-small', 'mouth-e', 'mouth-small', 'mouth-o', 'mouth-small', 'mouth-m'];
  const VISEME_TICK_MS = 110;
  const MIN_STATE_HOLD_MS = 150;
  const CROSSFADE_MS = 90;

  let currentRoleKey = localStorage.getItem('VQ_REAL_AVATAR_ROLE') || 'zhiwei';
  if(currentRoleKey === 'hanhan') currentRoleKey = 'zhiwei';
  if(!ROLES[currentRoleKey]) currentRoleKey = 'zhiwei';

  let internalVoiceChange = false;
  let mouthTimer = null;
  let activeProvider = null;
  let currentSpeakingText = '';
  let currentStateKey = 'closed';
  let avatarCanvas = null;
  let avatarCtx = null;
  let imageCache = {};
  let lastStateChangeAt = 0;
  let transitionSerial = 0;
  let lastProviderIndex = -1;
  let sameIndexTicks = 0;

  const $ = id => document.getElementById(id);
  function role(){ return ROLES[currentRoleKey] || ROLES.zhiwei; }

  function buildAvatar(key){
    currentRoleKey = ROLES[key] ? key : 'zhiwei';
    const avatar = $('avatar');
    if(!avatar) return;
    avatar.className = 'avatar real-avatar canvas-avatar avatar-bootstrap';
    avatar.setAttribute('data-avatar-role', currentRoleKey);

    // v182: keep a real closed-mouth portrait visible while the canvas states load.
    // The legacy cartoon HTML is gone, so there is never a cartoon flash on startup.
    let bootstrap = $('realAvatarBootstrapImage');
    if(!bootstrap){
      bootstrap = document.createElement('img');
      bootstrap.id = 'realAvatarBootstrapImage';
      bootstrap.className = 'real-avatar-bootstrap-image';
      bootstrap.alt = 'Virtual Human TA portrait';
      avatar.innerHTML = '';
      avatar.appendChild(bootstrap);
    }
    bootstrap.src = role().states.closed;

    preloadRoleStates(currentRoleKey, function(){
      avatar.innerHTML = '<canvas id="realAvatarCanvas" class="real-avatar-canvas" width="' + CANVAS_W + '" height="' + CANVAS_H + '" aria-label="Virtual Human TA portrait"></canvas>';
      avatar.className = 'avatar real-avatar canvas-avatar';
      avatarCanvas = $('realAvatarCanvas');
      avatarCtx = avatarCanvas ? avatarCanvas.getContext('2d', {willReadFrequently:false}) : null;
      currentStateKey = 'closed';
      drawState('closed');
    });
  }

  function preloadRoleStates(roleKey, done){
    const cfg = ROLES[roleKey];
    if(!cfg) return done && done();
    const entries = Object.entries(cfg.states);
    let remaining = entries.length;
    imageCache[roleKey] = imageCache[roleKey] || {};
    if(!remaining) return done && done();
    entries.forEach(([stateKey, src]) => {
      if(imageCache[roleKey][stateKey]){
        remaining -= 1;
        if(!remaining && done) done();
        return;
      }
      const img = new Image();
      img.onload = function(){
        imageCache[roleKey][stateKey] = img;
        remaining -= 1;
        if(!remaining && done) done();
      };
      img.onerror = function(){
        remaining -= 1;
        if(!remaining && done) done();
      };
      img.src = src;
    });
  }

  function getStateImage(stateKey){
    const cache = imageCache[currentRoleKey] || {};
    return cache[stateKey] || cache.small || cache.closed || null;
  }

  function drawImage(img){
    if(!avatarCtx || !img) return;
    avatarCtx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    avatarCtx.globalAlpha = 1;
    avatarCtx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);
  }

  function drawState(stateKey){
    const img = getStateImage(stateKey);
    if(!img) return;
    drawImage(img);
    currentStateKey = stateKey;
  }

  function crossfadeState(nextStateKey){
    const prevKey = currentStateKey || 'closed';
    const prevImg = getStateImage(prevKey);
    const nextImg = getStateImage(nextStateKey);
    if(!prevImg || !nextImg || prevKey === nextStateKey){
      drawState(nextStateKey);
      return;
    }
    const serial = ++transitionSerial;
    const startedAt = performance.now ? performance.now() : Date.now();
    function frame(now){
      if(serial !== transitionSerial || !avatarCtx) return;
      const elapsed = (now || Date.now()) - startedAt;
      const t = Math.max(0, Math.min(1, elapsed / CROSSFADE_MS));
      avatarCtx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      avatarCtx.globalAlpha = 1;
      avatarCtx.drawImage(prevImg, 0, 0, CANVAS_W, CANVAS_H);
      avatarCtx.globalAlpha = t;
      avatarCtx.drawImage(nextImg, 0, 0, CANVAS_W, CANVAS_H);
      avatarCtx.globalAlpha = 1;
      if(t < 1) requestAnimationFrame(frame);
      else currentStateKey = nextStateKey;
    }
    requestAnimationFrame(frame);
  }

  function setMouthShape(shape){
    const nextStateKey = SHAPE_TO_STATE[shape] || 'small';
    const now = Date.now();
    if(nextStateKey === currentStateKey) return;
    if(now - lastStateChangeAt < MIN_STATE_HOLD_MS) return;
    lastStateChangeAt = now;
    crossfadeState(nextStateKey);
  }

  function isCJK(ch){ return /[\u3400-\u9fff]/.test(ch); }

  function baseVisemeForChar(ch){
    if(!ch) return 'mouth-small';
    if(/[，。！？；：、,.!?;:\n\r\s]/.test(ch)) return 'mouth-closed';
    if(/[bmpㄅㄆㄇ]/i.test(ch)) return 'mouth-m';
    if(/[fvㄈ]/i.test(ch)) return 'mouth-fv';
    if(/[ao啊阿哈]/i.test(ch)) return 'mouth-a';
    if(/[eéiíê欸ㄟㄝㄧ一衣]/i.test(ch)) return 'mouth-e';
    if(/[ouwㄡㄛㄨ喔哦嗚]/i.test(ch)) return 'mouth-o';
    if(isCJK(ch)) return CJK_VISEME_TABLE[ch.charCodeAt(0) % CJK_VISEME_TABLE.length];
    const cycle = ['mouth-small', 'mouth-a', 'mouth-e', 'mouth-small', 'mouth-o'];
    return cycle[ch.charCodeAt(0) % cycle.length];
  }

  function stabilizedShape(text, idx){
    const ch = String((text || '').charAt(idx) || '').toLowerCase();
    const base = baseVisemeForChar(ch);

    if(idx !== lastProviderIndex){
      lastProviderIndex = idx;
      sameIndexTicks = 0;
      return base;
    }

    sameIndexTicks += 1;

    if(base === 'mouth-closed' || base === 'mouth-m') return base;
    if(base === 'mouth-small' || base === 'mouth-fv') return sameIndexTicks % 4 === 3 ? 'mouth-closed' : 'mouth-small';
    if(base === 'mouth-e') return sameIndexTicks % 5 >= 3 ? 'mouth-small' : 'mouth-e';
    if(base === 'mouth-o') return sameIndexTicks % 5 >= 3 ? 'mouth-small' : 'mouth-o';
    if(base === 'mouth-a') return sameIndexTicks % 5 >= 3 ? 'mouth-small' : 'mouth-a';
    return base;
  }

  function startMouthSync(provider){
    stopMouthSync(false);
    activeProvider = provider;
    lastProviderIndex = -1;
    sameIndexTicks = 0;
    document.body.classList.add('speaking');
    mouthTimer = window.setInterval(() => {
      let text = '';
      let idx = 0;
      try {
        const data = activeProvider ? activeProvider() : null;
        text = String((data && data.text) || currentSpeakingText || '');
        idx = Math.max(0, Math.min(Number((data && data.index) || 0), text.length ? text.length - 1 : 0));
      } catch(_){ }
      setMouthShape(stabilizedShape(text, idx));
    }, VISEME_TICK_MS);
  }

  function stopMouthSync(close){
    if(mouthTimer) clearInterval(mouthTimer);
    mouthTimer = null;
    activeProvider = null;
    lastProviderIndex = -1;
    sameIndexTicks = 0;
    document.body.classList.remove('speaking');
    if(close !== false) drawState('closed');
  }

  function buildRoleControl(){
    const wrap = document.querySelector('.avatar-wrap');
    if(!wrap || $('avatarRoleSelect')) return;
    const box = document.createElement('div');
    box.className = 'real-avatar-switch';
    box.innerHTML =
      '<label for="avatarRoleSelect">Avatar / Voice Role</label>' +
      '<select id="avatarRoleSelect">' +
        '<option value="yating">Yating — Female Avatar</option>' +
        '<option value="zhiwei">Zhiwei — Teacher Voice</option>' +
      '</select>';
    wrap.insertAdjacentElement('afterend', box);
    const sel = $('avatarRoleSelect');
    if(sel){
      sel.value = currentRoleKey;
      sel.addEventListener('change', () => applyRole(sel.value, true), true);
    }
  }

  function voices(){
    try { return (window.speechSynthesis && window.speechSynthesis.getVoices) ? window.speechSynthesis.getVoices() : []; }
    catch(_){ return []; }
  }

  function optionMatchesRole(option, cfg){
    const t = ((option && option.textContent) || '') + ' ' + ((option && option.value) || '');
    return cfg.voiceNames.some(name => new RegExp(name, 'i').test(t));
  }

  function selectVoiceForRole(){
    const sel = $('voiceSelect');
    const cfg = role();
    if(!sel || !sel.options || !sel.options.length) return false;
    for(let i=0;i<sel.options.length;i++){
      if(optionMatchesRole(sel.options[i], cfg)){
        if(sel.selectedIndex !== i){
          internalVoiceChange = true;
          sel.selectedIndex = i;
          try { sel.dispatchEvent(new Event('change', {bubbles:true})); } catch(_){ }
          internalVoiceChange = false;
        }
        return true;
      }
    }
    return false;
  }

  function findVoiceForCurrentRole(){
    const cfg = role();
    const list = voices();
    for(const n of cfg.voiceNames){
      const hit = list.find(v => new RegExp(n, 'i').test((v.name || '') + ' ' + (v.voiceURI || '') + ' ' + (v.lang || '')));
      if(hit) return hit;
    }
    return null;
  }

  function applyRole(key, userInitiated){
    if(!ROLES[key]) key = 'zhiwei';
    currentRoleKey = key;
    localStorage.setItem('VQ_REAL_AVATAR_ROLE', key);
    buildAvatar(key);
    const roleSel = $('avatarRoleSelect');
    if(roleSel && roleSel.value !== key) roleSel.value = key;
    selectVoiceForRole();
    setTimeout(selectVoiceForRole, 120);
    setTimeout(selectVoiceForRole, 650);
    if(userInitiated){
      const status = $('status');
      if(status) status.textContent = 'Status: Changed to “' + role().label + '」。';
    }
  }

  function syncRoleFromVoiceSelect(){
    if(internalVoiceChange) return;
    const sel = $('voiceSelect');
    if(!sel || sel.selectedIndex < 0 || !sel.options[sel.selectedIndex]) return;
    const text = sel.options[sel.selectedIndex].textContent || '';
    let next = null;
    if(/Yating/i.test(text)) next = 'yating';
    else if(/Zhiwei/i.test(text)) next = 'zhiwei';
    if(next && next !== currentRoleKey) applyRole(next, false);
  }

  function syncControlVisuals(){
    ['pauseLessonBtn','resumeLessonBtn','stopLessonBtn'].forEach(id => {
      const b = $(id);
      if(!b) return;
      const disabled = !!b.disabled;
      b.classList.toggle('vq-control-muted', disabled);
      b.style.pointerEvents = disabled ? 'none' : 'auto';
      b.style.opacity = disabled ? '0.42' : '1';
      b.style.filter = disabled ? 'grayscale(100%) saturate(0.3)' : 'none';
      b.style.cursor = disabled ? 'not-allowed' : 'pointer';
    });
  }

  function installControlVisualSync(){
    const observer = new MutationObserver(syncControlVisuals);
    ['pauseLessonBtn','resumeLessonBtn','stopLessonBtn'].forEach(id => {
      const b = $(id);
      if(b) observer.observe(b, {attributes:true, attributeFilter:['disabled','class','style']});
      if(b) b.addEventListener('click', () => setTimeout(syncControlVisuals, 40), true);
    });
    const start = $('startLessonBtn');
    if(start) start.addEventListener('click', () => setTimeout(syncControlVisuals, 60), true);
    syncControlVisuals();
  }

  function patchSpeechSynthesis(){
    const synth = window.speechSynthesis;
    if(!synth || synth.__VQ_REAL_AVATAR_SYNC_PATCHED__) return;
    const nativeSpeak = synth.speak.bind(synth);
    const nativeCancel = synth.cancel ? synth.cancel.bind(synth) : null;
    const nativePause = synth.pause ? synth.pause.bind(synth) : null;
    const nativeResume = synth.resume ? synth.resume.bind(synth) : null;

    synth.speak = function(utterance){
      try { attachUtterance(utterance); } catch(_){ }
      return nativeSpeak(utterance);
    };
    if(nativeCancel){
      synth.cancel = function(){
        stopMouthSync(true);
        return nativeCancel();
      };
    }
    if(nativePause){
      synth.pause = function(){
        stopMouthSync(true);
        return nativePause();
      };
    }
    if(nativeResume){
      synth.resume = function(){
        const ret = nativeResume();
        if(synth.speaking && !synth.paused) startMouthSync(() => ({text: currentSpeakingText, index: 0}));
        return ret;
      };
    }
    synth.__VQ_REAL_AVATAR_SYNC_PATCHED__ = true;
  }

  function attachUtterance(u){
    if(!u || u.__VQ_REAL_AVATAR_UTTERANCE__) return;
    u.__VQ_REAL_AVATAR_UTTERANCE__ = true;
    const text = String(u.text || '');
    let idx = 0;

    const targetVoice = findVoiceForCurrentRole();
    if(targetVoice){
      u.voice = targetVoice;
      u.lang = targetVoice.lang || 'zh-TW';
    }

    const oldStart = u.onstart;
    const oldBoundary = u.onboundary;
    const oldEnd = u.onend;
    const oldError = u.onerror;
    const oldPause = u.onpause;
    const oldResume = u.onresume;

    u.onstart = function(ev){
      currentSpeakingText = text;
      startMouthSync(() => ({text, index: idx}));
      if(typeof oldStart === 'function') oldStart.call(this, ev);
    };
    u.onboundary = function(ev){
      if(ev && typeof ev.charIndex === 'number' && ev.charIndex >= 0) idx = ev.charIndex;
      if(typeof oldBoundary === 'function') oldBoundary.call(this, ev);
    };
    u.onend = function(ev){
      stopMouthSync(true);
      if(typeof oldEnd === 'function') oldEnd.call(this, ev);
    };
    u.onerror = function(ev){
      stopMouthSync(true);
      if(typeof oldError === 'function') oldError.call(this, ev);
    };
    u.onpause = function(ev){
      stopMouthSync(true);
      if(typeof oldPause === 'function') oldPause.call(this, ev);
    };
    u.onresume = function(ev){
      startMouthSync(() => ({text, index: idx}));
      if(typeof oldResume === 'function') oldResume.call(this, ev);
    };
  }

  function init(){
    buildRoleControl();
    buildAvatar(currentRoleKey);
    patchSpeechSynthesis();
    installControlVisualSync();
    const roleSel = $('avatarRoleSelect');
    if(roleSel) roleSel.value = currentRoleKey;
    const voiceSel = $('voiceSelect');
    if(voiceSel && !voiceSel.dataset.vqRealAvatarBound){
      voiceSel.dataset.vqRealAvatarBound = '1';
      voiceSel.addEventListener('change', syncRoleFromVoiceSelect, true);
    }
    selectVoiceForRole();
    setTimeout(selectVoiceForRole, 200);
    setTimeout(selectVoiceForRole, 900);
    try {
      if(window.speechSynthesis){
        const old = window.speechSynthesis.onvoiceschanged;
        window.speechSynthesis.onvoiceschanged = function(ev){
          if(typeof old === 'function') old.call(this, ev);
          selectVoiceForRole();
        };
      }
    } catch(_){ }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.VQ_REAL_AVATAR = { applyRole, setMouthShape, stopMouthSync, roles: ROLES };
})();
