/* v62: stop microphone recognition immediately whenever a question is submitted or the user switches task.
   This patch does not change UI/course/KB content. It only synchronizes SpeechRecognition state with submit events. */
(function(){
  const $ = id => document.getElementById(id);
  const activeRecognizers = new Set();
  let recognitionActive = false;

  function setStatus(msg){
    const s = $('status');
    if(s) s.textContent = 'Status: ' + msg;
  }
  function resetVoiceButtons(){
    ['askBtn','answerCaseBtn'].forEach(id=>{ const b=$(id); if(b) b.disabled=false; });
    ['stopAskBtn','stopCaseBtn'].forEach(id=>{ const b=$(id); if(b) b.disabled=true; });
    ['studentQuestion','studentCaseAnswer'].forEach(id=>{
      const el=$(id); if(!el) return;
      el.classList && el.classList.remove('listening-mode');
      if((el.textContent||'').trim()==='Listening...' || (el.textContent||'').trim()==='Listening…') el.textContent='';
      if(id==='studentQuestion') el.setAttribute('data-placeholder','Type your question here, or select “Start Voice Question” to use speech input.');
    });
  }
  function stopAllRecognition(reason){
    recognitionActive = false;
    activeRecognizers.forEach(r=>{ try{ r.stop ? r.stop() : (r.abort ? r.abort() : null); }catch(_){} });
    resetVoiceButtons();
    if(reason) setStatus(reason);
  }
  window.VQ_stopAllRecognition = stopAllRecognition;

  function wrapRecognitionConstructor(name){
    const Original = window[name];
    if(!Original || Original.__v62Wrapped) return;
    function WrappedRecognition(){
      const r = new Original();
      activeRecognizers.add(r);
      const origStart = r.start ? r.start.bind(r) : null;
      const origStop = r.stop ? r.stop.bind(r) : null;
      const origAbort = r.abort ? r.abort.bind(r) : null;
      if(origStart){
        r.start = function(){ recognitionActive = true; activeRecognizers.add(r); return origStart(); };
      }
      if(origStop){
        r.stop = function(){ recognitionActive = false; return origStop(); };
      }
      if(origAbort){
        r.abort = function(){ recognitionActive = false; return origAbort(); };
      }
      // The manual Q&A owner keeps Stop enabled until the student's explicit Stop.
      // A native browser recognition end/error must not reset its controls.
      r.addEventListener && r.addEventListener('end', ()=>{ recognitionActive=false; if(!r.__vqManualVoiceOwner)resetVoiceButtons(); });
      r.addEventListener && r.addEventListener('error', ()=>{ recognitionActive=false; if(!r.__vqManualVoiceOwner)resetVoiceButtons(); });
      return r;
    }
    WrappedRecognition.prototype = Original.prototype;
    WrappedRecognition.__v62Wrapped = true;
    window[name] = WrappedRecognition;
  }
  wrapRecognitionConstructor('SpeechRecognition');
  wrapRecognitionConstructor('webkitSpeechRecognition');

  function bindStopBefore(el, eventName, reason){
    if(!el || el.dataset.v62RecStopBound) return;
    el.addEventListener(eventName, function(){
      if(recognitionActive || activeRecognizers.size) stopAllRecognition(reason);
    }, true);
    el.dataset.v62RecStopBound='1';
  }
  function install(){
    // If the user sends a typed question, recording must end immediately.
    bindStopBefore($('submitTypedQuestionBtn'), 'click', 'Recording stopped; submitting typed question');
    // If the user finishes voice input, stop recording first; existing handler may then submit the recognized text.
    // Stop Recording & Answer is owned by recognition-controller.js. A capture-phase\n    // pre-stop here raced with __vqManualStopRequested and suppressed auto-submit.
    bindStopBefore($('submitTypedCaseBtn'), 'click', 'Recording stopped; submitting the scenario answer');
    bindStopBefore($('stopCaseBtn'), 'click', 'Recording stopped; submitting the voice answer');
    // Switching content should also end recording.
    ['lessonSelect','caseSelect','lessonTab','caseTab','modelTab','clearBtn','startCaseBtn','nextCaseBtn'].forEach(id=>{
      const el=$(id); if(el){ bindStopBefore(el,'click','Recording stopped'); bindStopBefore(el,'change','Recording stopped，content changed'); }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();
