(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  let savedDetailedHTML = '';
  function isDetailed(html){ return /v37-output/.test(html || '') && /Input Variables/.test(html || '') && /Arterial Blood/.test(html || ''); }
  function normalizeBreaks(){
    const box = $('v37Result'); if(!box) return;
    if((box.innerHTML || '').includes('\\n')) box.innerHTML = box.innerHTML.replace(/\\n/g, '<br>');
    box.querySelectorAll('.v37-interpret').forEach(el=>{
      if((el.textContent || '').includes('\\n')) el.textContent = el.textContent.replace(/\\n/g, '\n');
    });
  }
  function saveIfDetailed(){ const box=$('v37Result'); if(box && isDetailed(box.innerHTML)){ normalizeBreaks(); savedDetailedHTML = box.innerHTML; } }
  function restoreIfSummary(){
    const box=$('v37Result'); if(!box || !savedDetailedHTML) return;
    const html = box.innerHTML || '';
    const overwritten = /目前顯示：Calculated V\/Q model|此畫面依目前參數自動同步上色/.test(html) && !isDetailed(html);
    if(overwritten) box.innerHTML = savedDetailedHTML;
    normalizeBreaks();
  }
  function bind(){
    const calc=$('v37CalcBtn');
    if(calc && calc.dataset.v102Stable !== '1'){
      calc.dataset.v102Stable = '1';
      calc.addEventListener('click', function(){
        savedDetailedHTML = '';
        setTimeout(saveIfDetailed, 20);
        setTimeout(saveIfDetailed, 60);
        setTimeout(restoreIfSummary, 120);
        setTimeout(restoreIfSummary, 220);
        setTimeout(restoreIfSummary, 420);
      }, true);
    }
    normalizeBreaks();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  setTimeout(bind,500); setTimeout(bind,1200);
})();
