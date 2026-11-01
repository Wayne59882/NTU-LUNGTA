(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  function stopSpeechHard(){
    try{ if(window.stopAllSpeech) window.stopAllSpeech(); }catch(e){}
    try{ if(window.speechSynthesis){ window.speechSynthesis.cancel(); window.speechSynthesis.pause(); window.speechSynthesis.cancel(); } }catch(e){}
  }
  function clearTeacherScriptBox(){
    const oldBox = $('lessonText');
    if(!oldBox) return;
    // Replace the node so any old interval still writing to the old element cannot redraw visible text.
    const fresh = oldBox.cloneNode(false);
    fresh.id = 'lessonText';
    fresh.className = oldBox.className || 'lesson-box';
    fresh.removeAttribute('style');
    fresh.textContent = '';
    oldBox.parentNode.replaceChild(fresh, oldBox);
  }
  function setStoppedControls(){
    const p=$('pauseLessonBtn'), r=$('resumeLessonBtn'), s=$('stopLessonBtn');
    [p,r,s].forEach(btn=>{
      if(!btn) return;
      btn.disabled = true;
      btn.style.opacity = '0.45';
      btn.style.filter = 'grayscale(0.35)';
      btn.setAttribute('aria-disabled','true');
    });
    const st=$('status');
    if(st) st.textContent = 'Status: Speech stopped and lecture script cleared.';
  }
  function clearOnStop(e){
    if(e){ e.preventDefault(); e.stopImmediatePropagation(); }
    stopSpeechHard();
    clearTeacherScriptBox();
    setStoppedControls();
    // A second pass prevents older delayed stop handlers or timers from repainting one character.
    setTimeout(()=>{ stopSpeechHard(); clearTeacherScriptBox(); setStoppedControls(); }, 80);
    setTimeout(()=>{ clearTeacherScriptBox(); setStoppedControls(); }, 220);
  }
  function bindStopButton(){
    const old = $('stopLessonBtn');
    if(!old || old.dataset.v100ClearBound === '1') return;
    const clone = old.cloneNode(true);
    clone.dataset.v100ClearBound = '1';
    old.parentNode.replaceChild(clone, old);
    clone.addEventListener('click', clearOnStop, true);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindStopButton);
  else bindStopButton();
  setTimeout(bindStopButton, 300);
  setTimeout(bindStopButton, 1000);
})();
