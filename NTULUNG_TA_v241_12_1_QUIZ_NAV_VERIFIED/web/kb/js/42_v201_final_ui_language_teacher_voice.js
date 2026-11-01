/* v202 UI recovery: one-shot English UI repair. IMPORTANT: no MutationObserver.
   The previous observer repeatedly rewrote recognitionLangSelect.innerHTML,
   triggering itself indefinitely and freezing tabs/buttons/3D rendering. */
(function(){
  'use strict';
  const $=id=>document.getElementById(id);
  function setText(el,text){ if(el && el.textContent!==text) el.textContent=text; }
  function repair(){
    document.documentElement.lang='en';
    const q=$('studentQuestion');
    if(q){
      if(q.getAttribute('data-placeholder')!=='Type your question here, or select “Start Voice Question” to use speech input.')
        q.setAttribute('data-placeholder','Type your question here, or select “Start Voice Question” to use speech input.');
      if(/^(學生問的問題會顯示在這裡。?|學生回答會顯示在這裡。?)$/.test((q.textContent||'').trim())) q.textContent='';
    }
    const a=$('teacherAnswer');
    if(a && /AI 老師回答會顯示/.test(a.textContent||'')) setText(a,'The AI teacher answer will appear here.');
    const st=$('status');
    if(st && /^Status: /.test(st.textContent||'')) setText(st,(st.textContent||'').replace(/^Status: /,'Status: '));

    const rs=$('recognitionLangSelect');
    if(rs){
      let auto=rs.querySelector('option[value="auto"]');
      if(!auto){ auto=document.createElement('option'); auto.value='auto'; rs.insertBefore(auto,rs.firstChild); }
      setText(auto,'Auto — Detect Spoken Language');
      if(rs.value!=='auto') rs.value='auto';
      rs.disabled=false;
    }
    const rsl=document.querySelector('label[for="recognitionLangSelect"]'); setText(rsl,'Speech Recognition');

    const vs=$('voiceSelect');
    if(vs){
      const y=vs.querySelector('option[value="yating"]'), z=vs.querySelector('option[value="zhiwei"]');
      setText(y,'Yating');
      setText(z,'Zhiwei');
    }
    const ar=$('avatarRoleSelect');
    if(ar){
      setText(ar.querySelector('option[value="yating"]'),'Yating');
      setText(ar.querySelector('option[value="zhiwei"]'),'Zhiwei');
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',repair,{once:true}); else repair();
  [250,1000,2500].forEach(t=>setTimeout(repair,t));
  window.VQ_BUILD_VERSION='v202';
})();
