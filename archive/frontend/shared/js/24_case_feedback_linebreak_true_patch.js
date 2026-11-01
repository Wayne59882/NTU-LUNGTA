(function(){
  'use strict';
  function normalizeText(s){
    return String(s || '')
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '    ');
  }
  function normalizeElement(el){
    if(!el || el.dataset.v105Normalizing === '1') return;
    const text = el.textContent || '';
    if(text.indexOf('\\n') === -1 && text.indexOf('\\r\\n') === -1 && text.indexOf('\\t') === -1) return;
    el.dataset.v105Normalizing = '1';
    el.textContent = normalizeText(text);
    setTimeout(function(){ delete el.dataset.v105Normalizing; }, 0);
  }
  function targets(){
    return Array.from(document.querySelectorAll('#caseFeedback, #teacherAnswer, #v37Result, #lessonText, .v37-feedback'));
  }
  function run(){ targets().forEach(normalizeElement); }
  function bind(){
    run();
    const obs = new MutationObserver(function(muts){
      let hit = false;
      for(const m of muts){
        if(m.target && m.target.nodeType === 1){
          const el = m.target;
          if(el.matches && el.matches('#caseFeedback, #teacherAnswer, #v37Result, #lessonText, .v37-feedback')) hit = true;
          if(el.querySelector && el.querySelector('#caseFeedback, #teacherAnswer, #v37Result, #lessonText, .v37-feedback')) hit = true;
        }
      }
      if(hit) setTimeout(run, 0);
    });
    obs.observe(document.body, {subtree:true, childList:true, characterData:true});
    ['click','keyup','change'].forEach(function(evt){ document.addEventListener(evt, function(){ setTimeout(run, 30); }, true); });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
})();
