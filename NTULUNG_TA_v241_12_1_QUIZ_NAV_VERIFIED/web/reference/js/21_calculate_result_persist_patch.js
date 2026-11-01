(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  let lastDetailedResult = '';

  function isDetailedCalculationHTML(html){
    return /v37-output/.test(html || '') && /Input Variables/.test(html || '') && /Arterial Blood/.test(html || '');
  }

  function saveDetailedResult(){
    const box = $('v37Result');
    if(!box) return;
    const html = box.innerHTML || '';
    if(isDetailedCalculationHTML(html)) lastDetailedResult = html;
  }

  function restoreDetailedResult(){
    const box = $('v37Result');
    if(!box || !lastDetailedResult) return;
    const current = box.innerHTML || '';
    const gotOverwrittenBySummary = /目前顯示：Calculated V\/Q model|此畫面依目前參數自動同步上色|模型設定：Ventilation/.test(current);
    const stillDetailed = isDetailedCalculationHTML(current);
    if(gotOverwrittenBySummary && !stillDetailed){
      box.innerHTML = lastDetailedResult;
    }
  }

  function bindCalcPersistence(){
    const calc = $('v37CalcBtn');
    if(!calc || calc.dataset.v101KeepResult === '1') return;
    calc.dataset.v101KeepResult = '1';

    calc.addEventListener('click', function(){
      // Original v37 calculate() writes the detailed table first.
      // Later visual-model patches update the lung and sometimes overwrite v37Result.
      // We save the detailed table after original calculation, then restore it after the visual sync finishes.
      lastDetailedResult = '';
      setTimeout(saveDetailedResult, 40);
      setTimeout(saveDetailedResult, 100);
      setTimeout(restoreDetailedResult, 260);
      setTimeout(restoreDetailedResult, 520);
      setTimeout(restoreDetailedResult, 900);
    }, true);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindCalcPersistence);
  else bindCalcPersistence();
  setTimeout(bindCalcPersistence, 500);
  setTimeout(bindCalcPersistence, 1200);
})();
