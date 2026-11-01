/* v60: Global speech stop and state sync patch.
   Goal: whenever the user changes course/tab/question/mode, all current TTS audio stops immediately.
   This patch is intentionally UI-preserving and content-preserving. */
(function(){
  const $ = id => document.getElementById(id);
  let lastStopAt = 0;
  function setStatus(msg){
    const s = $('status');
    if(s) s.textContent = 'Status: ' + msg;
  }
  function hardStopSpeech(reason){
    lastStopAt = Date.now();
    try{
      if(window.speechSynthesis){
        window.speechSynthesis.pause();
        window.speechSynthesis.cancel();
        // Some Chromium voices keep one queued utterance; cancel twice in next tick.
        setTimeout(()=>{ try{ window.speechSynthesis.cancel(); }catch(_){} }, 0);
        setTimeout(()=>{ try{ window.speechSynthesis.cancel(); }catch(_){} }, 80);
      }
    }catch(_){ }
    try{ document.body.classList.remove('speaking'); }catch(_){ }
    if(reason) setStatus(reason);
  }

  // Replace the public speech function used by later QA patches.
  // It always cancels any previous utterance before speaking the current visible answer.
  window.v60HardStopSpeech = hardStopSpeech;
  window.v50Speak = function(text){
    const clean = String(text || '').trim();
    if(!clean || !window.speechSynthesis) return;
    hardStopSpeech('Switching to the current voice');
    const startedAt = Date.now();
    setTimeout(()=>{
      // If another stop/switch happened after this speak request, do not speak stale text.
      if(lastStopAt > startedAt) return;
      try{
        const u = new SpeechSynthesisUtterance(clean);
        const voiceSelect = $('voiceSelect');
        const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
        if(voiceSelect && voices[Number(voiceSelect.value)]) u.voice = voices[Number(voiceSelect.value)];
        else {
          const zh = voices.find(v => /zh|cmn|Taiwan|Chinese/i.test((v.lang||'') + ' ' + (v.name||'')));
          if(zh) u.voice = zh;
        }
        u.lang = 'zh-TW';
        const rate = parseFloat(($('rateRange')||{}).value || '1');
        const pitch = parseFloat(($('pitchRange')||{}).value || '1');
        u.rate = Number.isFinite(rate) ? rate : 1;
        u.pitch = Number.isFinite(pitch) ? pitch : 1;
        u.onstart = ()=>{ document.body.classList.add('speaking'); setStatus('Reading the current content aloud'); };
        u.onend = ()=>{ document.body.classList.remove('speaking'); setStatus('Speech playback completed'); };
        u.onerror = ()=>{ document.body.classList.remove('speaking'); setStatus('Speech playback stopped or failed'); };
        window.speechSynthesis.speak(u);
      }catch(e){ setStatus('Speech playback failed'); }
    }, 120);
  };

  function bindStopTo(el, eventName, reason){
    if(!el || el.dataset.v60StopBound) return;
    el.addEventListener(eventName, ()=>hardStopSpeech(reason), true);
    el.dataset.v60StopBound = '1';
  }

  function install(){
    // Stop old speech when user starts typing/editing a new question.
    const q = $('studentQuestion');
    if(q){
      // v186 mobile-scroll fix: focus alone must NOT stop speech. On iPhone/Android,
      // a swipe can focus a contenteditable while the user is only scrolling.
      // Stop only when the user actually edits/pastes a question.
      q.addEventListener('beforeinput', ()=>hardStopSpeech('Speech stopped; editing a new question'), true);
      q.addEventListener('input', ()=>hardStopSpeech('Speech stopped; editing a new question'), true);
      q.addEventListener('paste', ()=>hardStopSpeech('Speech stopped; pasting a new question'), true);
    }

    // Stop old speech when starting voice recognition.
    bindStopTo($('askBtn'), 'click', 'Current speech stopped; ready for a new question');
    bindStopTo($('answerCaseBtn'), 'click', 'Current speech stopped; ready for the scenario answer');

    // Stop speech immediately before submitting a new question/answer; new answer may speak afterward.
    bindStopTo($('submitTypedQuestionBtn'), 'click', 'Previous speech stopped; generating a new answer');
    bindStopTo($('stopAskBtn'), 'click', 'Previous speech stopped; submitting the voice question');
    bindStopTo($('submitTypedCaseBtn'), 'click', 'Previous speech stopped; generating scenario feedback');
    bindStopTo($('stopCaseBtn'), 'click', 'Previous speech stopped; submitting the scenario answer');

    // Stop on course/menu/tab/model/case switching. These actions should never leave stale audio playing.
    const switchIds = [
      'caseSelect',
      'lessonTab','caseTab','modelTab',
      'nextCaseBtn','hintBtn','startCaseBtn',
      'normalBtn','peBtn','pneumoniaBtn','shuntBtn','deadSpaceBtn',
      'v37NoBtn','v37MisBtn','v37PEBtn','v37PneuBtn','v37ShuntBtn','v37DeadBtn','v37NextBtn',
      'clearBtn'
    ];
    switchIds.forEach(id=>{
      const el = $(id);
      if(el){
        bindStopTo(el, 'click', 'Speech stopped');
        bindStopTo(el, 'change', 'Speech stopped; content changed');
      }
    });

    // The explicit stop button should be aggressive.
    const stopLesson = $('stopLessonBtn');
    if(stopLesson){
      stopLesson.onclick = function(e){ e.preventDefault(); hardStopSpeech('語音已完全停止'); };
    }

    // Patch submit if available: stop first, then submit, and only speak the answer produced by that submit.
    if(window.VQ_V55_submit && !window.VQ_V55_submit_v60_wrapped){
      const oldSubmit = window.VQ_V55_submit;
      window.VQ_V55_submit = async function(){
        hardStopSpeech('已停止上一段語音，正在回答新問題');
        return oldSubmit.apply(this, arguments);
      };
      window.VQ_V55_submit_v60_wrapped = true;
    }

    setStatus('System ready');
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ()=>setTimeout(install, 180));
  else setTimeout(install, 180);
})();
