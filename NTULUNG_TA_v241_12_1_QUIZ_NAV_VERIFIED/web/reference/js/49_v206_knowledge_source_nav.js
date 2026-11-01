(function(){
  'use strict';
  function $(id){return document.getElementById(id)}
  var mode=(document.documentElement.getAttribute('data-knowledge-mode')||'kb').toLowerCase();
  function go(next){ if(next===mode) return; location.assign(next==='reference'?'/reference/':'/kb/'); }
  function init(){
    var kb=$('v206KbModeBtn'), ref=$('v206ReferenceModeBtn');
    if(kb) kb.onclick=function(){go('kb')};
    if(ref) ref.onclick=function(){go('reference')};
    if(kb) kb.classList.toggle('active',mode==='kb');
    if(ref) ref.classList.toggle('active',mode==='reference');
    var note=$('v206SourceNote');
    if(note) note.textContent=mode==='kb'
      ? '12,134 curated Knowledge Base items · only Gate 68 · Local LLM only.'
      : 'Searches the provided Guyton & Hall textbook, then the selected Local LLM rewrites the grounded answer.';
    var pill=$('v206CloudPill'); if(pill) pill.style.display=mode==='reference'?'inline-block':'none';
    try{localStorage.setItem('VQ_KNOWLEDGE_SOURCE',mode)}catch(_){ }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
