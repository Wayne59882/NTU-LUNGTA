/* v50 minimal Web Speech API patch: original UI preserved, no KB/layout rewrite */
(function(){
  const $ = id => document.getElementById(id);
  let recognition = null;
  let recTarget = null;
  let currentUtteranceText = '';
  let selectedVoice = null;

  function setStatus(msg){ const s=$('status'); if(s) s.textContent = 'Status: ' + msg; }
  function getText(el){ return (el && (el.value || el.textContent) || '').trim(); }
  function setText(id, text){ const el=$(id); if(el) el.textContent = text; }

  function loadVoices(){
    const sel = $('voiceSelect');
    if(!sel || !('speechSynthesis' in window)) return;
    const voices = speechSynthesis.getVoices() || [];
    const old = sel.value;
    sel.innerHTML = '';
    voices.forEach((v,i)=>{
      const opt=document.createElement('option');
      opt.value=String(i);
      opt.textContent = `${v.name}｜${v.lang}`;
      sel.appendChild(opt);
    });
    if(voices.length){
      const zhIndex = voices.findIndex(v => /zh|cmn|Taiwan|Chinese/i.test(v.lang+' '+v.name));
      sel.value = old || String(zhIndex >= 0 ? zhIndex : 0);
      selectedVoice = voices[Number(sel.value)] || null;
    }
    sel.onchange = () => { selectedVoice = (speechSynthesis.getVoices()||[])[Number(sel.value)] || null; };
  }

  function speak(text){
    if(!text || !('speechSynthesis' in window)) return;
    try { speechSynthesis.cancel(); } catch(e){}
    currentUtteranceText = text;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-TW';
    const voices = speechSynthesis.getVoices() || [];
    const sel = $('voiceSelect');
    selectedVoice = selectedVoice || (sel ? voices[Number(sel.value)] : null) || voices.find(v=>/zh|cmn|Taiwan|Chinese/i.test(v.lang+' '+v.name)) || null;
    if(selectedVoice) u.voice = selectedVoice;
    const rate = parseFloat($('rateRange')?.value || '1');
    const pitch = parseFloat($('pitchRange')?.value || '1');
    u.rate = Number.isFinite(rate) ? rate : 1;
    u.pitch = Number.isFinite(pitch) ? pitch : 1;
    u.onstart = () => { document.body.classList.add('speaking'); setStatus('Playing speech'); };
    u.onend = () => { document.body.classList.remove('speaking'); setStatus('Speech playback completed'); };
    u.onerror = () => { document.body.classList.remove('speaking'); setStatus('Speech playback failed'); };
    speechSynthesis.speak(u);
  }

  function stopSpeak(){ try{ speechSynthesis.cancel(); }catch(e){} document.body.classList.remove('speaking'); setStatus('Speech stopped'); }
  function pauseSpeak(){ try{ speechSynthesis.pause(); setStatus('Speech paused'); }catch(e){} }
  function resumeSpeak(){ try{ speechSynthesis.resume(); setStatus('Speech resumed'); }catch(e){} }

  function getRecognition(){
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!Ctor) return null;
    const r = new Ctor();
    const langSel = $('recognitionLangSelect');
    r.lang = (langSel && langSel.value === 'en-US') ? 'en-US' : 'zh-TW';
    r.interimResults = true;
    r.continuous = true;
    return r;
  }

  function startRec(targetId){
    recognition = getRecognition();
    recTarget = targetId;
    const target = $(targetId);
    if(!recognition){
      const msg = 'This browser does not support SpeechRecognition. Use Chrome or Edge over HTTPS or localhost.';
      if(target) target.textContent = msg;
      setStatus('Speech recognition is not supported');
      return;
    }
    let finalText = '';
    recognition.onresult = ev => {
      let interim = '';
      for(let i=ev.resultIndex;i<ev.results.length;i++){
        const t = ev.results[i][0].transcript;
        if(ev.results[i].isFinal) finalText += t;
        else interim += t;
      }
      if(target) target.textContent = (finalText + interim).trim() || 'Listening...';
    };
    recognition.onerror = ev => {
      if(target) target.textContent = 'Speech recognition error: ' + (ev.error || 'unknown') + '. You can use typed input instead.';
      setStatus('Speech recognition error');
    };
    recognition.onend = () => setStatus('Speech recognition stopped');
    try { recognition.start(); setStatus('Listening to the student'); if(target) target.textContent = 'Listening...'; } catch(e){ setStatus('Failed to start speech recognition'); }
  }

  function stopRecAndMaybeSubmit(kind){
    try{ if(recognition) recognition.stop(); }catch(e){}
    setStatus('語音輸入結束');
    if(kind === 'qa'){
      const btn = $('submitTypedQuestionBtn');
      if(btn) setTimeout(()=>btn.click(),250);
    }
    if(kind === 'case'){
      const btn = $('submitTypedCaseBtn');
      if(btn) setTimeout(()=>btn.click(),250);
    }
  }

  function removeWeightExplanationBox(){
    try{
      Array.from(document.querySelectorAll('div,section')).forEach(el=>{
        const tx=(el.textContent||'').trim();
        if(tx.includes('加權比例說明') || tx.includes('總相關度 = 0.30×課程範圍')){
          el.remove();
        }
      });
    }catch(e){}
  }

  function bind(){
    removeWeightExplanationBox();
    loadVoices();
    if('speechSynthesis' in window) speechSynthesis.onvoiceschanged = loadVoices;

    const startLesson = $('startLessonBtn');
    if(startLesson){
      const old = startLesson.onclick;
      startLesson.onclick = function(e){
        if(typeof old === 'function') old.call(this,e);
        setTimeout(()=> speak(getText($('lessonText'))), 400);
      };
    }
    const repeat = $('repeatBtn'); if(repeat) repeat.onclick = e => { e.preventDefault(); speak(getText($('teacherAnswer')) || getText($('lessonText'))); };
    const pause = $('pauseLessonBtn'); if(pause) pause.onclick = e => { e.preventDefault(); pauseSpeak(); };
    const resume = $('resumeLessonBtn'); if(resume) resume.onclick = e => { e.preventDefault(); resumeSpeak(); };
    const stop = $('stopLessonBtn'); if(stop) stop.onclick = e => { e.preventDefault(); stopSpeak(); };

    // QA voice input is owned exclusively by js/25 (server MediaRecorder ->
    // multilingual Whisper). Do not attach this legacy browser-SpeechRecognition
    // handler to askBtn/stopAskBtn: two competing recognizers caused first-click
    // state flips and browser-locale (often en-US) transcription of Mandarin.
    const answerCase = $('answerCaseBtn'); if(answerCase) answerCase.onclick = e => { e.preventDefault(); startRec('studentCaseAnswer'); };
    const stopCase = $('stopCaseBtn'); if(stopCase) stopCase.onclick = e => { e.preventDefault(); stopRecAndMaybeSubmit('case'); };

    // Speak AI answers/feedback after existing original buttons generate text.
    const submitQ = $('submitTypedQuestionBtn');
    if(submitQ){
      const old = submitQ.onclick;
      submitQ.onclick = function(e){
        if(typeof old === 'function') old.call(this,e);
        setTimeout(()=> speak(getText($('teacherAnswer'))), 900);
      };
    }
    const submitC = $('submitTypedCaseBtn');
    if(submitC){
      const old = submitC.onclick;
      submitC.onclick = function(e){
        if(typeof old === 'function') old.call(this,e);
        setTimeout(()=> speak(getText($('caseFeedback'))), 600);
      };
    }
    setStatus('系統已載入，版面與課程內容保持原版');
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  window.v50Speak = speak;
})();
