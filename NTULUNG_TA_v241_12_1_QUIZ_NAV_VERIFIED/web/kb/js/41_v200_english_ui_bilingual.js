(function(){
  'use strict';
  const $=id=>document.getElementById(id);
  function detectLanguage(text){
    const s=String(text||'');
    const cjk=(s.match(/[\u3400-\u9fff]/g)||[]).length;
    const words=(s.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)||[]).length;
    if(!cjk) return 'en-US';
    if(!words) return 'zh-TW';
    return cjk >= words*2 ? 'zh-TW' : 'en-US';
  }
  window.VQ_detectLanguage=window.VQ_detectLanguage||detectLanguage;
  function init(){
    const sel=$('recognitionLangSelect');
    if(sel && !sel.querySelector('option[value="auto"]')){
      sel.insertAdjacentHTML('afterbegin','<option value="auto">Auto — English / Traditional Chinese</option>');
      sel.value='auto';
    }
    const q=$('studentQuestion');
    if(q){
      q.setAttribute('data-placeholder','Type your question here, or select “Start Voice Question” to use speech input.');
      q.addEventListener('input',function(){
        const text=(q.textContent||'').trim();
        if(text){ try{ localStorage.setItem('VQ_LAST_INPUT_LANG',detectLanguage(text)); }catch(_){ } }
      });
    }
    const status=$('status'); if(status && /^Status: /.test(status.textContent||'')) status.textContent=(status.textContent||'').replace(/^Status: /,'Status: ');
    document.documentElement.lang='en';
    window.VQ_BUILD_VERSION='v200';
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
