/* v199 — main-project 3D avatar integration using the MIT-licensed TalkingHead library.
   The existing KB/LLM/server TTS pipeline remains unchanged.
   - Rigged GLB avatar: blink, idle head/eye motion, hand gestures.
   - Mouth motion is applied to the 3D model's actual morph targets (no overlay mouth).
   - Yating/Zhiwei role selection remains synchronized with server-side female/male TTS.
   - Default demo models are fetched from the TalkingHead project CDN. They can be replaced
     with self-hosted Ready Player Me / MPFB / Avaturn compatible GLB files later.
*/
import { TalkingHead } from 'https://cdn.jsdelivr.net/npm/@met4citizen/talkinghead@1.7.0/modules/talkinghead.mjs';

const $ = (id) => document.getElementById(id);
const ROLE = {
  zhiwei: {
    body: 'M',
    label: 'Zhiwei — 3D Avatar + Teacher Voice',
    url: 'https://cdn.jsdelivr.net/gh/met4citizen/HeadAudio@main/avatars/david.glb',
    view: {cameraY: 0.00}
  },
  yating: {
    body: 'F',
    label: 'Yating — Female 3D TA',
    url: 'https://cdn.jsdelivr.net/gh/met4citizen/HeadAudio@main/avatars/julia.glb',
    view: {cameraY: 0.04}
  }
};

let head = null;
let role = 'zhiwei';
let loadSerial = 0;
let gestureTimer = null;
let idleTimer = null;
let currentShape = 'mouth-closed';
let stage = null;
let loading = null;
let fallback = null;
let host = null;

function savedRole(){
  try{
    const x = localStorage.getItem('VQ_REAL_AVATAR_ROLE');
    return x === 'yating' ? 'yating' : 'zhiwei';
  }catch(_){ return 'zhiwei'; }
}

function setStatus(text){
  const el = $('status');
  if(el && text) el.textContent = 'Status: ' + text;
}

function bootstrapFallback(next){
  if(!fallback) return;
  fallback.src = '/shared/assets/' + (next === 'yating' ? 'avatar_female_closed.png' : 'avatar_male_closed.png');
}

function ensureDOM(){
  host = $('avatar');
  if(!host) return false;
  host.classList.add('vq-3d-avatar-host');

  fallback = $('vq3dAvatarFallback');
  if(!fallback){
    fallback = document.createElement('img');
    fallback.id = 'vq3dAvatarFallback';
    fallback.alt = 'Virtual human teaching assistant fallback portrait';
    host.prepend(fallback);
  }
  bootstrapFallback(role);

  stage = $('vq3dAvatarStage');
  if(!stage){
    stage = document.createElement('div');
    stage.id = 'vq3dAvatarStage';
    stage.setAttribute('aria-label','3D animated virtual human teaching assistant');
    host.appendChild(stage);
  }

  loading = $('vq3dAvatarLoading');
  if(!loading){
    loading = document.createElement('div');
    loading.id = 'vq3dAvatarLoading';
    loading.textContent = 'Loading 3D Avatar…';
    host.appendChild(loading);
  }

  if(!host.querySelector('.vq-3d-badge')){
    const badge = document.createElement('div');
    badge.className = 'vq-3d-badge';
    badge.innerHTML = '<span class="vq-3d-badge-dot"></span><span>3D Avatar</span>';
    host.appendChild(badge);
  }
  return true;
}

function buildRoleControl(){
  const wrap = document.querySelector('.avatar-wrap');
  if(!wrap) return;
  let box = document.querySelector('.real-avatar-switch');
  let sel = $('avatarRoleSelect');
  if(!box){
    box = document.createElement('div');
    box.className = 'real-avatar-switch';
    wrap.insertAdjacentElement('afterend', box);
  }
  if(!sel){
    box.classList.add('v216-avatar-voice-settings');
    box.innerHTML = '<div class="section-label">3D AVATAR &amp; VOICE SETTINGS</div>' +
      '<label for="avatarRoleSelect">Avatar / Voice</label>' +
      '<select id="avatarRoleSelect" aria-label="3D avatar and voice role">' +
      '<option value="yating">Yating</option>' +
      '<option value="zhiwei">Zhiwei</option>' +
      '</select>' +
      '<label for="rateRange">Speech Rate</label>' +
      '<input id="rateRange" max="2.00" min="0.50" step="0.05" type="range" value="1.00"/>' +
      '<label for="pitchRange">Pitch</label>' +
      '<input id="pitchRange" max="1.50" min="0.50" step="0.05" type="range" value="1.00"/>' +
      '<label for="recognitionLangSelect">Speech Recognition</label>' +
      '<select id="recognitionLangSelect"><option selected value="auto">Auto — Detect Spoken Language</option></select>';
    sel = $('avatarRoleSelect');
  }
  if(sel){
    sel.value = role;
    if(!sel.__VQ199_BOUND__){
      sel.__VQ199_BOUND__ = '1';
      sel.addEventListener('change', () => applyRole(sel.value, true), true);
    }
  }
}

function disposeHead(){
  if(gestureTimer){ clearTimeout(gestureTimer); gestureTimer = null; }
  if(idleTimer){ clearTimeout(idleTimer); idleTimer = null; }
  if(head){
    try{ head.stopGesture(100); }catch(_){ }
    try{ head.dispose(); }catch(_){ }
  }
  head = null;
  if(stage) stage.innerHTML = '';
}

function progressText(ev){
  if(!loading) return;
  if(ev && ev.lengthComputable && ev.total){
    loading.textContent = 'Loading 3D Avatar… ' + Math.min(100,Math.round(ev.loaded/ev.total*100)) + '%';
  }else if(ev && ev.loaded){
    loading.textContent = 'Loading 3D Avatar… ' + Math.round(ev.loaded/1024) + ' KB';
  }
}

async function loadRole(next, greeting){
  role = next === 'yating' ? 'yating' : 'zhiwei';
  const cfg = ROLE[role];
  const serial = ++loadSerial;
  ensureDOM();
  bootstrapFallback(role);
  host.setAttribute('data-avatar-role',role);
  host.classList.remove('vq-3d-ready');
  if(loading){ loading.classList.remove('vq-hidden'); loading.textContent = 'Loading ' + cfg.label + '…'; }

  disposeHead();
  try{
    head = new TalkingHead(stage, {
      cameraView: 'upper',
      modelFPS: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 24 : 30,
      modelPixelRatio: Math.min(1.5, window.devicePixelRatio || 1),
      modelMovementFactor: 0.82,
      lipsyncModules: [],
      ttsEndpoint: null,
      cameraDistance: 0.05
    });
    await head.showAvatar({
      url: cfg.url,
      body: cfg.body,
      avatarMood: 'neutral',
      avatarIdleEyeContact: 0.75,
      avatarIdleHeadMove: 0.42,
      avatarSpeakingEyeContact: 0.92,
      avatarSpeakingHeadMove: 0.68,
      avatarListeningEyeContact: 0.88
    }, progressText);
    if(serial !== loadSerial) return;
    try{ head.setView('upper', {cameraDistance:0.02, cameraY:(cfg.view && Number(cfg.view.cameraY)) || 0}); }catch(_){ }
    host.classList.add('vq-3d-ready');
    if(loading){ loading.textContent = cfg.label; setTimeout(()=>loading && loading.classList.add('vq-hidden'),450); }
    closeMouth();
    scheduleIdleGesture();
    if(greeting) setTimeout(()=>greet(),280);
  }catch(err){
    console.error('[v199 3D avatar] load failed',err);
    if(serial !== loadSerial) return;
    host.classList.remove('vq-3d-ready');
    if(loading){
      loading.classList.remove('vq-hidden');
      loading.textContent = '3D Avatar failed to load. Check browser network access to the pinned avatar runtime.';
    }
  }
}

function morphRoot(){
  if(!head) return null;
  return head.armature || head.scene || null;
}

const MOUTH_KEYS = [
  'viseme_sil','viseme_PP','viseme_FF','viseme_TH','viseme_DD','viseme_kk','viseme_CH','viseme_SS','viseme_nn','viseme_RR',
  'viseme_aa','viseme_E','viseme_I','viseme_O','viseme_U','mouthOpen','jawOpen','mouthClose','mouthFunnel','mouthPucker','mouthSmileLeft','mouthSmileRight'
];

function applyMorphValues(values){
  const root = morphRoot();
  if(!root || typeof root.traverse !== 'function') return;
  root.traverse(obj => {
    const dict = obj && obj.morphTargetDictionary;
    const infl = obj && obj.morphTargetInfluences;
    if(!dict || !infl) return;
    for(const k of MOUTH_KEYS){
      const i = dict[k];
      if(i !== undefined) infl[i] = 0;
    }
    Object.entries(values || {}).forEach(([k,v]) => {
      const i = dict[k];
      if(i !== undefined) infl[i] = Math.max(0,Math.min(1,Number(v)||0));
    });
  });
}

function setMouthShape(shape){
  currentShape = shape || 'mouth-small';
  switch(currentShape){
    case 'mouth-closed': applyMorphValues({viseme_sil:0.9,mouthClose:0.12}); break;
    case 'mouth-m':      applyMorphValues({viseme_PP:0.82,mouthClose:0.45}); break;
    case 'mouth-a':      applyMorphValues({viseme_aa:0.82,jawOpen:0.28,mouthOpen:0.24}); break;
    case 'mouth-e':      applyMorphValues({viseme_E:0.80,jawOpen:0.15,mouthSmileLeft:0.08,mouthSmileRight:0.08}); break;
    case 'mouth-o':      applyMorphValues({viseme_O:0.84,mouthFunnel:0.25,jawOpen:0.18}); break;
    case 'mouth-fv':     applyMorphValues({viseme_FF:0.78}); break;
    default:             applyMorphValues({mouthOpen:0.20,jawOpen:0.10}); break;
  }
}

function closeMouth(){ setMouthShape('mouth-closed'); }

function greet(){
  if(!head || document.body.classList.contains('speaking')) return;
  try{
    head.lookAtCamera(600);
    // Built-in rig gesture: real arm/hand bones move; no sprite/frame swapping.
    head.playGesture('handup', 2.0, true, 320);
    gestureTimer = setTimeout(()=>{
      try{ head.stopGesture(420); }catch(_){ }
    },1450);
  }catch(_){ }
}

function speakingGesture(on){
  if(!head) return;
  try{
    if(on){
      head.lookAtCamera(700);
      // Subtle explanatory gesture while speaking; TalkingHead keeps natural head/eye motion active.
      head.playGesture('side', 2.4, false, 650);
      gestureTimer = setTimeout(()=>{ try{ head.stopGesture(700); }catch(_){ } },2100);
    }else{
      head.stopGesture(550);
      closeMouth();
    }
  }catch(_){ }
}

function scheduleIdleGesture(){
  if(idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(()=>{
    if(head && !document.body.classList.contains('speaking')){
      try{
        const options = ['shrug','side','ok'];
        const g = options[Math.floor(Math.random()*options.length)];
        head.playGesture(g, 2.1, Math.random()>.5, 700);
        setTimeout(()=>{ try{ head && head.stopGesture(650); }catch(_){ } },1800);
      }catch(_){ }
    }
    scheduleIdleGesture();
  }, 7000 + Math.round(Math.random()*5000));
}

async function applyRole(next, userInitiated){
  next = next === 'yating' ? 'yating' : 'zhiwei';
  try{ localStorage.setItem('VQ_REAL_AVATAR_ROLE',next); }catch(_){ }
  const voice = $('voiceSelect');
  if(voice && voice.value !== next){
    voice.value = next;
    try{ voice.dispatchEvent(new Event('change',{bubbles:true})); }catch(_){ }
  }
  const sel = $('avatarRoleSelect');
  if(sel && sel.value !== next) sel.value = next;
  setStatus('Switching to “' + ROLE[next].label + '”…');
  await loadRole(next, !!userInitiated);
}

function observeSpeaking(){
  let prev = document.body.classList.contains('speaking');
  const mo = new MutationObserver(()=>{
    const now = document.body.classList.contains('speaking');
    if(now === prev) return;
    prev = now;
    speakingGesture(now);
    if(!now) scheduleIdleGesture();
  });
  mo.observe(document.body,{attributes:true,attributeFilter:['class']});
}

function onVisibility(){
  if(!head) return;
  try{
    if(document.visibilityState === 'visible') head.start(); else head.stop();
  }catch(_){ }
}

async function init(){
  role = savedRole();
  if(!ensureDOM()) return;
  buildRoleControl();
  observeSpeaking();
  document.addEventListener('visibilitychange',onVisibility);
  await loadRole(role,true);
}

const api = {
  applyRole,
  setMouthShape,
  stopMouthSync: (close=true)=>{ if(close) closeMouth(); },
  startMouthSync: ()=>{},
  greet,
  speakingGesture,
  get role(){ return role; },
  get head(){ return head; }
};
window.VQ_3D_AVATAR = api;
// Backward-compatible alias for existing server-TTS patches that call VQ_REAL_AVATAR.
window.VQ_REAL_AVATAR = api;

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
