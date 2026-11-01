/* v219 multilingual lecture/Q&A voice controller
   - Restores the pre-teacher-clone Zhiwei/Yating browser voices.
   - Voice UI shows only Zhiwei / Yating.
   - Role switch stops the old voice immediately and continues near the current position with the new role.
   - Pause/resume uses the same native utterance and never intentionally restarts the full script.
   - Medical pronunciation normalization is applied before speech output.
*/
(function(){
  'use strict';

  const synth = window.speechSynthesis;
  if(!synth) return;

  const proto = window.SpeechSynthesis && window.SpeechSynthesis.prototype;
  const nativeSpeak = proto && typeof proto.speak === 'function' ? proto.speak : synth.speak;
  const nativePause = proto && typeof proto.pause === 'function' ? proto.pause : synth.pause;
  const nativeResume = proto && typeof proto.resume === 'function' ? proto.resume : synth.resume;
  const nativeCancel = proto && typeof proto.cancel === 'function' ? proto.cancel : synth.cancel;

  const $ = id => document.getElementById(id);

  const state = {
    source: null,
    fullText: '',
    role: 'zhiwei',
    segments: [],
    segmentIndex: 0,
    segmentOffset: 0,
    internal: null,
    seq: 0,
    paused: false,
    started: false,
    segmentStartedAt: 0,
    lastBoundaryAt: 0,
    lastBoundaryOffset: 0,
    suppressEnd: false,
    activeRate: 1.0,
    voiceWaits: 0
  };

  function roleKey(){
    const rs=$('avatarRoleSelect');
    if(rs && (rs.value==='zhiwei' || rs.value==='yating')) return rs.value;
    const vs=$('voiceSelect');
    if(vs && (vs.value==='zhiwei' || vs.value==='yating')) return vs.value;
    const avatar=$('avatar');
    const ar=avatar && avatar.getAttribute('data-avatar-role');
    if(ar==='zhiwei' || ar==='yating') return ar;
    try{
      const saved=localStorage.getItem('VQ_REAL_AVATAR_ROLE');
      if(saved==='zhiwei' || saved==='yating') return saved;
    }catch(_){ }
    return 'zhiwei';
  }

  function voiceText(v){
    return [v&&v.name||'',v&&v.voiceURI||'',v&&v.lang||''].join(' ');
  }

  function allVoices(){
    try{return synth.getVoices ? (synth.getVoices()||[]) : [];}catch(_){return [];}
  }

  function normalizedSpeechLang(lang){
    const raw=String(lang||'').trim().replace('_','-');
    if(!raw) return 'zh-TW';
    if(/^zh(?:-|$)/i.test(raw)){
      if(/(?:CN|Hans|SG)/i.test(raw)) return 'zh-CN';
      return 'zh-TW';
    }
    const parts=raw.split('-');
    return parts[0].toLowerCase()+(parts[1]?'-'+parts[1].toUpperCase():'');
  }

  function voiceMatchesLanguage(v,lang){
    const want=normalizedSpeechLang(lang);
    const have=normalizedSpeechLang(v&&v.lang||'');
    if(have===want) return true;
    return have.split('-')[0]===want.split('-')[0];
  }

  const ROLE_MALE_RE=/Zhiwei|Yunxi|Yunyang|Yunfeng|Kangkang|Jhe|Guy|David|Mark|Andrew|Brian|Christopher|Eric|Jacob|James|Roger|Ryan|Steffan|Thomas|George|Daniel|Liam|William|Arthur|Oliver|Alfie|Ethan|Connor|Adam|Matthew|Michael|John|Alex|Keita|Ichiro|Naoki|InJoon|BongJin|Male|男/i;
  const ROLE_FEMALE_RE=/Yating|Hsiao|Xiao|Mei|Ting|Jenny|Samantha|Aria|Michelle|Zira|Ava|Emma|Libby|Sonia|Susan|Hazel|Victoria|Karen|Moira|Tessa|Fiona|Allison|Serena|Salli|Joanna|Kendra|Kimberly|Amy|Ivy|Haruka|Ayumi|Sayaka|Nanami|Heami|SunHi|Yumi|Female|女/i;

  function targetVoice(role,lang){
    const list=allVoices();
    if(!list.length) return null;
    const want=normalizedSpeechLang(lang);
    const exact=list.filter(v=>normalizedSpeechLang(v.lang||'')===want);
    const sameBase=list.filter(v=>voiceMatchesLanguage(v,want));
    const roleRe=role==='zhiwei'?ROLE_MALE_RE:ROLE_FEMALE_RE;
    return exact.find(v=>roleRe.test(voiceText(v))) ||
           sameBase.find(v=>roleRe.test(voiceText(v))) || null;
  }

  function normalizeMedical(text,lang){
    let t=String(text||'');
    const speechLang=normalizedSpeechLang(lang||'zh-TW');
    const isZh=/^zh(?:-|$)/i.test(speechLang);
    // Spell out the answer marker before native speech sees it. A colon next
    // to an option letter can be interpreted as an emoticon by system voices.
    // Only the spoken copy changes; the displayed answer and option stay intact.
    t=t.replace(/[\u{1F000}-\u{1FAFF}\u2600-\u26FF\u2700-\u27BF\uFE0E\uFE0F\u200D\u20E3]/gu,'');
    const spokenChoice=letter=>isZh?'正確答案是選項 '+letter.normalize('NFKC').toUpperCase()+'。':'The correct answer is option '+letter.normalize('NFKC').toUpperCase()+'.';
    t=t.replace(/(?:正確答案|正确答案)\s*(?:[:：]|為|为|是)?\s*(?:選項|选项)?\s*[(（]?([A-EＡ-Ｅ])[)）]?(?=$|[^A-Za-zＡ-Ｚａ-ｚ])(?:\s*[.．、])?/g,(_,letter)=>spokenChoice(letter));
    t=t.replace(/\bcorrect\s+answer\s*(?:[:：]|is)?\s*(?:option\s*)?[(（]?([A-EＡ-Ｅ])[)）]?(?=$|[^A-Za-zＡ-Ｚａ-ｚ])(?:\s*[.．、])?/gi,(_,letter)=>spokenChoice(letter));
    const full={
      VA:isZh?'肺泡通氣量':'alveolar ventilation',
      VE:isZh?'每分鐘通氣量':'minute ventilation',
      VT:isZh?'潮氣容積':'tidal volume',
      VD:isZh?'死腔容積':'dead-space volume',
      Aa:isZh?'肺泡動脈氧分壓差':'alveolar arterial oxygen gradient'
    };
    t=t.replace(/\bV\s*_\s*\{?A\}?\b/gi,full.VA);
    t=t.replace(/\bV\s*_\s*\{?E\}?\b/gi,full.VE);
    t=t.replace(/\bV\s*_\s*\{?T\}?\b/gi,full.VT);
    t=t.replace(/\bV\s*_\s*\{?D\}?\b/gi,full.VD);
    t=t.replace(/\bVA\b/g,full.VA);
    t=t.replace(/\bVE\b/g,full.VE);
    t=t.replace(/\bVT\b/g,full.VT);
    t=t.replace(/\bVD\b/g,full.VD);
    t=t.replace(/\bPaCO(?:2|₂)\b/g,'P A C O two');
    t=t.replace(/\bPaO(?:2|₂)\b/g,'P A O two');
    t=t.replace(/\bPAO(?:2|₂)\b/g,'P A O two');
    t=t.replace(/\bPvCO(?:2|₂)\b/g,'P V C O two');
    t=t.replace(/\bPvO(?:2|₂)\b/g,'P V O two');
    t=t.replace(/\bFiO(?:2|₂)\b/gi,'F I O two');
    t=t.replace(/\bSpO(?:2|₂)\b/gi,'S P O two');
    t=t.replace(/\bSaO(?:2|₂)\b/gi,'S A O two');
    t=t.replace(/\bSvO(?:2|₂)\b/gi,'S V O two');
    t=t.replace(/\bCaO(?:2|₂)\b/gi,'C A O two');
    t=t.replace(/\bCvO(?:2|₂)\b/gi,'C V O two');
    t=t.replace(/V[\u0307]?\s*\/\s*Q[\u0307]?\s*ratio/gi,'V Q ratio');
    t=t.replace(/V[\u0307]?\s*\/\s*Q[\u0307]?\s*mismatch/gi,'V Q mismatch');
    t=t.replace(/V[\u0307]?\s*\/\s*Q[\u0307]?/gi,'V Q');
    t=t.replace(/V\s*[•·]?\s*A?\s*\/\s*Q\s*[•·]?/gi,'V Q');
    t=t.replace(/\bA\s*-\s*a\s+gradient\b/gi,full.Aa);
    t=t.replace(/\bPEEP\b/g,'P E E P');
    t=t.replace(/\bCPAP\b/g,'C P A P');
    t=t.replace(/\bDLCO\b/g,'D L C O');
    const decimalWord=isZh?' 點 ':' point ';
    t=t.replace(/(\d+)\.(\d+)/g,(_,a,b)=>a+decimalWord+b.split('').join(' '));
    return t;
  }

  function splitSegments(text){
    const src=String(text||'');
    const out=[];
    let start=0;
    let buf='';
    let bufStart=0;
    const pieces=src.match(/[^.!?。！？；;\n]+[.!?。！？；;]?\s*/g) || [src];
    for(const piece0 of pieces){
      const piece=String(piece0||'');
      if(!piece) continue;
      if(!buf){bufStart=start;}
      if(buf && (buf.length+piece.length)>90){
        out.push({text:buf,start:bufStart});
        buf=piece; bufStart=start;
      }else{
        buf+=piece;
      }
      start+=piece.length;
      while(buf.length>120){
        let cut=buf.lastIndexOf(' ',90);
        if(cut<35) cut=90;
        out.push({text:buf.slice(0,cut),start:bufStart});
        bufStart+=cut;
        buf=buf.slice(cut);
      }
    }
    if(buf) out.push({text:buf,start:bufStart});
    if(!out.length && src) out.push({text:src,start:0});
    return out;
  }

  function setStatus(extra){
    const st=$('status');
    if(!st) return;
    const activeLang=normalizedSpeechLang((state.source&&state.source.lang)||window.VQ_LAST_TTS_LANGUAGE||'zh-TW');
    const v=targetVoice(state.role,activeLang);
    const roleName=state.role==='zhiwei'?'Zhiwei':'Yating';
    st.textContent='Voice: '+roleName+(v?' → '+(v.name||''):'')+(extra?' | '+extra:'');
  }

  function renderVoiceUI(){
    const vs=$('voiceSelect');
    if(vs){
      const ok=vs.options.length===2 && vs.options[0].value==='yating' && vs.options[1].value==='zhiwei';
      if(!ok) vs.innerHTML='<option value="yating">Yating</option><option value="zhiwei">Zhiwei</option>';
      vs.value=roleKey();
      vs.disabled=false;
    }
    const label=$('voiceSelectLabel') || document.querySelector('label[for="voiceSelect"]');
    if(label) label.textContent='Voice';
    const rs=$('avatarRoleSelect');
    if(rs){
      const y=rs.querySelector('option[value="yating"]');
      const z=rs.querySelector('option[value="zhiwei"]');
      if(y) y.textContent='Yating';
      if(z) z.textContent='Zhiwei';
    }
  }

  function applyRoleUI(role){
    state.role=role;
    try{localStorage.setItem('VQ_REAL_AVATAR_ROLE',role);}catch(_){ }
    const rs=$('avatarRoleSelect'); if(rs && rs.value!==role) rs.value=role;
    const vs=$('voiceSelect'); if(vs && vs.value!==role) vs.value=role;
    const avatar=$('avatar');
    if(avatar && avatar.getAttribute('data-avatar-role')!==role) avatar.setAttribute('data-avatar-role',role);
    try{
      if(window.VQ_REAL_AVATAR && typeof window.VQ_REAL_AVATAR.applyRole==='function') window.VQ_REAL_AVATAR.applyRole(role,true);
    }catch(_){ }
    renderVoiceUI();
  }

  function cancelInternal(){
    state.seq++;
    if(state.internal){
      try{state.internal.onstart=state.internal.onboundary=state.internal.onend=state.internal.onerror=null;}catch(_){ }
    }
    try{nativeCancel.call(synth);}catch(_){ }
    state.internal=null;
  }

  function currentSegment(){return state.segments[state.segmentIndex]||null;}

  function sliderValue(id, fallback, lo, hi){
    const el=$(id); const n=Number(el&&el.value);
    if(!Number.isFinite(n)) return fallback;
    return Math.max(lo,Math.min(hi,n));
  }
  function currentRate(){ return sliderValue('rateRange',1.0,0.50,2.00); }
  function currentPitch(){ return sliderValue('pitchRange',1.0,0.50,1.50); }

  function estimateCurrentOffset(){
    const seg=currentSegment();
    if(!seg) return state.segmentOffset||0;
    // Preserve the exact current position when rate/pitch changes. The previous
    // implementation deliberately scanned FORWARD to the next punctuation mark,
    // which made a slider adjustment sound like it skipped to the next sentence.
    let off=Math.max(0,state.lastBoundaryOffset||state.segmentOffset||0);
    if(state.segmentStartedAt && (!state.lastBoundaryAt || performance.now()-state.lastBoundaryAt>650)){
      const elapsed=Math.max(0,(performance.now()-state.segmentStartedAt)/1000);
      const src=seg.text.slice(state.segmentOffset||0);
      const cjk=(src.match(/[\u3400-\u9fff]/g)||[]).length;
      const ratio=src.length?cjk/src.length:0;
      // Use the rate that was active for the utterance that is currently playing,
      // not the newly selected slider value, otherwise increasing the slider can
      // over-estimate progress and jump forward.
      const cps=(ratio>0.25?4.5:13.0)*(Number(state.activeRate)||1.0);
      off=Math.max(off,(state.segmentOffset||0)+Math.floor(elapsed*cps));
    }
    return Math.max(0,Math.min(off,seg.text.length));
  }

  function finishSource(e){
    const source=state.source;
    state.source=null; state.internal=null; state.paused=false; state.started=false;
    state.segments=[]; state.segmentIndex=0; state.segmentOffset=0;
    try{if(source && typeof source.onend==='function') source.onend.call(source,e||{});}catch(_){ }
  }

  function speakCurrent(fireStart){
    if(!state.source) return;
    const seg=currentSegment();
    if(!seg){finishSource({});return;}
    const offset=Math.max(0,Math.min(state.segmentOffset||0,seg.text.length));
    const text=seg.text.slice(offset).replace(/^\s+/,'');
    if(!text){
      state.segmentIndex++; state.segmentOffset=0; state.lastBoundaryOffset=0;
      speakCurrent(false); return;
    }

    const source=state.source;
    const role=state.role;
    const speechLang=normalizedSpeechLang((source&&source.lang)||window.VQ_LAST_TTS_LANGUAGE||window.VQ_LAST_DETECTED_LANGUAGE||'zh-TW');
    const voice=targetVoice(role,speechLang);
    if(!voice){
      if(!allVoices().length && state.voiceWaits++<8){setStatus('Loading browser voices…');setTimeout(()=>{if(state.source===source)speakCurrent(fireStart);},350);return;}
      setStatus((role==='yating'?'Yating (female)':'Zhiwei (male)')+' '+speechLang+' voice is unavailable on this device. Add a matching browser/system voice.');
      const failure={error:'voice-unavailable',role:role,language:speechLang};
      finalCancel();
      try{if(typeof source.onerror==='function')source.onerror.call(source,failure);}catch(_){ }
      return;
    }
    const u=new SpeechSynthesisUtterance(text);
    u.voice=voice;
    // Lecture utterances already carry zh-TW. Q&A utterances carry the student's detected language.
    // Preserve the source language so Chinese questions are spoken in Chinese, English in English, etc.
    u.lang=speechLang;
    const appliedRate=currentRate();
    u.rate=appliedRate;
    u.pitch=currentPitch();
    u.volume=1.0;
    state.activeRate=appliedRate;
    const seq=++state.seq;
    const leading=seg.text.slice(offset).length-text.length;
    const baseOffset=offset+leading;
    state.internal=u;
    state.segmentStartedAt=0; state.lastBoundaryAt=0; state.lastBoundaryOffset=baseOffset;
    setStatus(state.paused?'Paused':'Speaking');

    u.onstart=function(e){
      if(seq!==state.seq) return;
      state.segmentStartedAt=performance.now();
      if(fireStart && !state.started){
        state.started=true;
        try{if(typeof source.onstart==='function') source.onstart.call(source,e||{});}catch(_){ }
      }
    };
    u.onboundary=function(e){
      if(seq!==state.seq) return;
      const local=Math.max(0,Number(e&&e.charIndex||0));
      state.lastBoundaryOffset=Math.min(seg.text.length,baseOffset+local);
      state.lastBoundaryAt=performance.now();
      try{
        if(typeof source.onboundary==='function') source.onboundary.call(source,{charIndex:seg.start+state.lastBoundaryOffset,name:(e&&e.name)||'word',elapsedTime:(e&&e.elapsedTime)||0});
      }catch(_){ }
    };
    u.onerror=function(e){
      if(seq!==state.seq) return;
      try{if(typeof source.onerror==='function') source.onerror.call(source,e||{});}catch(_){ }
    };
    u.onend=function(e){
      if(seq!==state.seq) return;
      state.internal=null;
      state.segmentIndex++;
      state.segmentOffset=0;
      state.lastBoundaryOffset=0;
      state.segmentStartedAt=0;
      if(state.segmentIndex>=state.segments.length){finishSource(e);return;}
      if(!state.paused) setTimeout(()=>speakCurrent(false),10);
    };
    try{nativeSpeak.call(synth,u);}catch(err){console.error('[VQ v204 voice]',err);}
  }

  function finalSpeak(source){
    if(!source || !String(source.text||'').trim()) return;
    cancelInternal();
    state.source=source;
    const sourceLang=normalizedSpeechLang((source&&source.lang)||window.VQ_LAST_TTS_LANGUAGE||window.VQ_LAST_DETECTED_LANGUAGE||'zh-TW');
    state.fullText=normalizeMedical(String(source.text||''),sourceLang);
    state.segments=splitSegments(state.fullText);
    state.segmentIndex=0; state.segmentOffset=0; state.lastBoundaryOffset=0;
    state.voiceWaits=0;
    state.role=roleKey(); state.paused=false; state.started=false;
    applyRoleUI(state.role);
    speakCurrent(true);
  }

  function finalPause(){
    if(!state.source || state.paused) return;
    state.paused=true;
    try{nativePause.call(synth);}catch(_){ }
    setStatus('Paused');
    try{if(typeof state.source.onpause==='function') state.source.onpause.call(state.source,{});}catch(_){ }
  }

  function finalResume(){
    if(!state.source || !state.paused) return;
    state.paused=false;
    if(state.internal){
      try{nativeResume.call(synth);}catch(_){ }
    }else{
      speakCurrent(false);
    }
    setStatus('Speaking');
    try{if(typeof state.source.onresume==='function') state.source.onresume.call(state.source,{});}catch(_){ }
  }

  function finalCancel(){
    cancelInternal();
    state.source=null; state.fullText=''; state.segments=[]; state.segmentIndex=0; state.segmentOffset=0;
    state.paused=false; state.started=false;
  }

  function switchRole(next){
    if(next!=='zhiwei' && next!=='yating') return;
    applyRoleUI(next);
    if(!state.source){setStatus('Ready');return;}
    const wasPaused=state.paused;
    const seg=currentSegment();
    if(seg) state.segmentOffset=estimateCurrentOffset();
    cancelInternal();
    state.role=next;
    state.paused=wasPaused;
    if(wasPaused){setStatus('Paused — '+(next==='zhiwei'?'Zhiwei':'Yating')+' selected');return;}
    setTimeout(()=>speakCurrent(false),20);
  }

  function lockMethod(name,fn){
    try{
      Object.defineProperty(synth,name,{configurable:false,enumerable:true,get:function(){return fn;},set:function(){}});
    }catch(_){try{synth[name]=fn;}catch(__){ }}
  }
  lockMethod('speak',finalSpeak);
  lockMethod('pause',finalPause);
  lockMethod('resume',finalResume);
  lockMethod('cancel',finalCancel);

  // v219: the synchronized lecture master in 25_v105_resume_after_question_mouth_sync.js
  // owns the Lecture Pause / Resume / Stop buttons. This controller still owns the
  // underlying speechSynthesis pause/resume methods, but it must NOT consume the
  // button click before the lecture master can update lecturePaused, highlighting,
  // mouth sync, and the disabled/enabled states of Pause/Resume.
  //
  // The old capture handler called stopImmediatePropagation() here. Because this file
  // is loaded while DOMContentLoaded is still pending, that handler could be
  // registered before the lecture master's handler and therefore blocked it. The
  // visible symptom was exactly: Pause worked, Resume stayed disabled, and the user
  // had to Stop and restart the lecture.
  document.addEventListener('click',function(e){
    const t=e.target && e.target.closest ? e.target.closest('#pauseLessonBtn,#resumeLessonBtn,#stopLessonBtn') : null;
    if(!t) return;
    const master=window.__VQ105_INPLACE_LECTURE_MASTER__;
    if(master && master.active) return; // let js/25 own the lecture controls

    // Fallback only for pages/builds where the lecture master is absent.
    e.preventDefault(); e.stopImmediatePropagation();
    if(t.id==='pauseLessonBtn') finalPause();
    else if(t.id==='resumeLessonBtn') finalResume();
    else finalCancel();
  },true);

  // Role/voice selectors: switch voice immediately and continue the remaining text.
  document.addEventListener('change',function(e){
    const t=e.target;
    if(!t || (t.id!=='avatarRoleSelect' && t.id!=='voiceSelect')) return;
    const next=t.value;
    if(next!=='zhiwei' && next!=='yating') return;
    e.preventDefault(); e.stopImmediatePropagation();
    switchRole(next);
  },true);

  function restoreDocumentPosition(x,y){
    // Prosody changes must never navigate/scroll the surrounding page.
    const restore=function(){ try{ window.scrollTo(x,y); }catch(_){ } };
    try{ requestAnimationFrame(restore); }catch(_){ }
    setTimeout(restore,40); setTimeout(restore,140);
  }

  function applyProsodyChange(savedX,savedY){
    try{
      localStorage.setItem('VQ_SPEECH_RATE',String(currentRate()));
      localStorage.setItem('VQ_SPEECH_PITCH',String(currentPitch()));
    }catch(_){ }
    if(!state.source){ setStatus('Rate '+currentRate().toFixed(2)+'× · Pitch '+currentPitch().toFixed(2)); restoreDocumentPosition(savedX,savedY); return; }
    const wasPaused=state.paused;
    const seg=currentSegment(); if(seg) state.segmentOffset=estimateCurrentOffset();
    cancelInternal(); state.paused=wasPaused;
    if(!wasPaused) setTimeout(function(){speakCurrent(false);setStatus('Speaking · Rate '+currentRate().toFixed(2)+'× · Pitch '+currentPitch().toFixed(2));restoreDocumentPosition(savedX,savedY);},25);
    else{
      setStatus('Paused · rate '+currentRate().toFixed(2)+' · pitch '+currentPitch().toFixed(2));
      restoreDocumentPosition(savedX,savedY);
    }
  }

  function bindProsodyControls(){
    ['rateRange','pitchRange'].forEach(function(id){
      const el=$(id); if(!el || el.__VQ2066_PROSODY__) return;
      if(id==='rateRange'){ el.min='0.50'; el.max='2.00'; el.step='0.05'; }
      else { el.min='0.50'; el.max='1.50'; el.step='0.05'; }
      try{
        const saved=localStorage.getItem(id==='rateRange'?'VQ_SPEECH_RATE':'VQ_SPEECH_PITCH');
        if(saved && Number.isFinite(Number(saved))) el.value=saved;
      }catch(_){ }
      el.__VQ205_PROSODY__=true;
      el.__VQ2066_PROSODY__=true;
      const schedule=function(immediate){
        const x=window.scrollX||0, y=window.scrollY||0;
        if(el.__VQ2066_TIMER__) clearTimeout(el.__VQ2066_TIMER__);
        el.__VQ2066_TIMER__=setTimeout(function(){el.__VQ2066_TIMER__=null;applyProsodyChange(x,y);},immediate?0:220);
      };
      // Debounce while dragging; apply once after the user pauses/releases.
      // Re-generating on every slider pixel was the source of speech/UI jitter.
      el.addEventListener('input',function(){schedule(false);},true);
      el.addEventListener('change',function(){schedule(true);},true);
    });
  }

  function init(){
    renderVoiceUI();
    bindProsodyControls();
    applyRoleUI(roleKey());
    const vs=$('voiceSelect');
    if(vs && !vs.__VQ204_OBSERVER__){
      vs.__VQ204_OBSERVER__=true;
      try{new MutationObserver(()=>setTimeout(renderVoiceUI,0)).observe(vs,{childList:true});}catch(_){ }
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  [100,500,1200,2500,4000].forEach(ms=>setTimeout(init,ms));
  try{
    const old=synth.onvoiceschanged;
    synth.onvoiceschanged=function(ev){try{if(typeof old==='function') old.call(synth,ev);}catch(_){ } setTimeout(init,0);};
  }catch(_){ }

  window.VQ_medicalPronunciation=normalizeMedical;
  window.VQ_SWITCH_ROLE_CONTINUE=switchRole;
  window.VQ_VOICE_TRANSPORT_STATE=state;
  console.log('[VQ] v218 role-consistent multilingual medical voice controller active');
})();
