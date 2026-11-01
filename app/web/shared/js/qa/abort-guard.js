/* v63: Do not let intentional SpeechRecognition abort/stop messages overwrite the real AI answer. */
(function(){
  const $ = id => document.getElementById(id);
  function setStatus(msg){ const s=$('status'); if(s) s.textContent='Status: '+msg; }
  function isAbortMsg(t){ return /語音辨識.*(aborted|no-speech)/i.test(String(t||'')); }
  function installAbortGuard(){
    const ans=$('teacherAnswer');
    if(!ans || ans.dataset.v63AbortGuard) return;
    ans.dataset.v63AbortGuard='1';
    let lastGood='';
    const obs=new MutationObserver(()=>{
      const t=(ans.textContent||'').trim();
      if(!t) return;
      if(isAbortMsg(t)){
        // 主動送出或停止錄音造成的 aborted 不是內容答案，不顯示給學生。
        ans.textContent = lastGood || 'Recording stopped; processing the current question.';
        setStatus('Speech stopped; the answer remains available');
        return;
      }
      lastGood=t;
    });
    obs.observe(ans,{childList:true,subtree:true,characterData:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(installAbortGuard,200));
  else setTimeout(installAbortGuard,200);
})();
