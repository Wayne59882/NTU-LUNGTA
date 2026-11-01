/* v202 strict final recovery patch.
   Keep Zhiwei identity and strict English UI without a self-triggering DOM observer. */
(function(){
  'use strict';
  const $=id=>document.getElementById(id);
  const MAP=[
    [/^Status: ?\s*/,'Status: '],[/System ready/g,'System ready'],[/Listening/g,'Listening'],
    [/已停止錄音/g,'Recording stopped'],[/正在送出文字問題/g,'Submitting typed question'],
    [/正在送出語音問題/g,'Submitting voice question'],[/正在產生新回答/g,'Generating a new answer'],
    [/正在回答新問題/g,'Answering the new question'],[/Speech playback completed/g,'Speech playback completed'],
    [/Speech playback stopped or failed/g,'Speech playback stopped or failed'],[/Speech playback failed/g,'Speech playback failed'],
    [/Speech stopped/g,'Speech stopped'],[/Switching to the current voice/g,'Switching to the current voice']
  ];
  function apply(){
    document.documentElement.lang='en';
    const st=$('status');
    if(st){ let t=String(st.textContent||''); for(const [re,to] of MAP) t=t.replace(re,to); if(st.textContent!==t) st.textContent=t; }
    const q=$('studentQuestion');
    if(q && q.getAttribute('data-placeholder')!=='Type your question here, or select “Start Voice Question” to use speech input.')
      q.setAttribute('data-placeholder','Type your question here, or select “Start Voice Question” to use speech input.');
    try{
      const saved=localStorage.getItem('VQ_REAL_AVATAR_ROLE');
      if(saved!=='yating' && saved!=='zhiwei') localStorage.setItem('VQ_REAL_AVATAR_ROLE','zhiwei');
    }catch(_){ }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  [500,1800].forEach(t=>setTimeout(apply,t));
  window.VQ_BUILD_VERSION='v202';
})();
