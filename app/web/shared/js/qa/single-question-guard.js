(function(){
'use strict';

/*
 v204.3 integrated single-QA guard
 - Only one active pipeline is allowed for the same submitted question.
 - Duplicate submissions while the same question is processing share the same Promise.
 - Legacy property onclick handlers are cleared; the final capture controller remains owner.
 - This only prevents duplicate submissions; knowledge-source behavior is unchanged.
*/

let pendingQuestion = '';
let pendingPromise = null;
let pendingToken = null;

function install(){
  if(typeof window.VQ_generateFinalAnswer === 'function' &&
     !window.VQ_generateFinalAnswer.__vqSingleGuard){

    const original = window.VQ_generateFinalAnswer;

    const guarded = function(raw){
      const q = String(raw || '').trim();

      const token = window.VQ_QA_ACTIVE_REQUEST_TOKEN || 0;
      if(pendingPromise && q === pendingQuestion && token === pendingToken){
        console.log('[VQ single-QA] duplicate submission merged:', q);
        return pendingPromise;
      }

      const p = Promise.resolve().then(function(){
        return original.call(window, raw);
      });

      pendingQuestion = q;
      pendingPromise = p;
    pendingToken = token;

      p.finally(function(){
        if(pendingPromise === p){
          pendingPromise = null;
          pendingQuestion = '';
          pendingToken = null;
        }
      }).catch(function(){});

      return p;
    };

    guarded.__vqSingleGuard = true;
    window.VQ_generateFinalAnswer = guarded;
  }

  ['submitTypedQuestionBtn','askBtn','stopAskBtn'].forEach(function(id){
    const el = document.getElementById(id);
    if(el) el.onclick = null;
  });

  window.VQ_SINGLE_QA_GUARD = true;
  console.log('[VQ] v204.3 single-QA guard installed');
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(install, 500);
  }, {once:true});
}else{
  setTimeout(install, 500);
}
})();
