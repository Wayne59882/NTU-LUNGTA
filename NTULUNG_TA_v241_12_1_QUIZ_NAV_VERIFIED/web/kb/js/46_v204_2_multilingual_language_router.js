(function(){
  'use strict';
  // v204.2 multilingual routing: medical English terminology is content, not the language signal.
  const MEDICAL_PATTERNS=[
    /\b(?:pa(?:co|o)2|paco2|pao2|fio2|spo2|sao2|svo2|cao2|peep|cpap|bipap|v\s*\/\s*q|vq)\b/gi,
    /\b(?:ventilation|perfusion|hypoxemia|hypoxaemia|hypercapnia|hypocapnia|shunt|dead\s*space|compliance|diffusion|alveol(?:ar|i)|oxygen|carbon\s*dioxide|tidal\s*volume|respiratory|physiology)\b/gi
  ];
  const TRAD_HINT='這個們來時說對會從還沒讓與並過後裡發見問題應醫氣體壓經學變動較實機開關點數總區間進則級組別類種傳達選顯聽語聲頭腦網簡復統衝擊臨結論臟脈濃擴質導嚴現處產響減維調節術華臺灣獲識別優勢頻線載設備進階';
  const SIMP_HINT='这个们来时说对会从还没让与并过后里发见问题应医气体压经学变动较实机开关点数总区间进则级组别类种传达选显听语声头脑网简复统冲击临结论脏脉浓扩质导严现处产响减维调节术华台湾获识别优势频线载设备进阶';
  const LATIN_WORDS={
    'en-US':['the','is','are','what','why','how','does','do','can','cause','causes','explain','difference','between','and','with','when','which','please','because'],
    'es-ES':['el','la','los','las','es','son','qué','que','por','porque','cómo','como','causa','causar','entre','y','con','cuando','cuál','cual','explica','explique'],
    'fr-FR':['le','la','les','est','sont','quoi','pourquoi','comment','cause','entre','et','avec','quand','quel','quelle','explique','expliquer','parce'],
    'de-DE':['der','die','das','ist','sind','was','warum','wie','verursacht','zwischen','und','mit','wenn','welche','welcher','erkläre','erklaere'],
    'it-IT':['il','lo','la','gli','le','è','sono','cosa','perché','perche','come','causa','tra','fra','e','con','quando','quale','spiega'],
    'pt-PT':['o','a','os','as','é','são','que','por','porque','como','causa','entre','e','com','quando','qual','explique'],
    'nl-NL':['de','het','is','zijn','wat','waarom','hoe','veroorzaakt','tussen','en','met','wanneer','welke','leg','uit'],
    'pl-PL':['co','jest','są','sa','dlaczego','jak','powoduje','między','miedzy','i','z','kiedy','który','ktory','wyjaśnij','wyjasnij'],
    'tr-TR':['bu','nedir','neden','nasıl','nasil','sebep','olur','arasında','arasinda','ve','ile','ne','zaman','açıkla','acikla'],
    'id-ID':['apa','adalah','mengapa','kenapa','bagaimana','menyebabkan','antara','dan','dengan','ketika','jelaskan'],
    'vi-VN':['là','gì','tại','sao','vì','thế','nào','gây','giữa','và','với','khi','giải','thích']
  };
  function maskMedical(text){
    let s=' '+String(text||'')+' ';
    MEDICAL_PATTERNS.forEach(r=>{s=s.replace(r,' ');});
    return s.replace(/\s+/g,' ').trim();
  }
  function normalizeTag(tag){
    const t=String(tag||'').trim().toLowerCase().replace('_','-');
    if(!t) return '';
    const map={zh:'zh-TW','zh-tw':'zh-TW','zh-hant':'zh-TW','zh-cn':'zh-CN','zh-hans':'zh-CN',en:'en-US',ja:'ja-JP',ko:'ko-KR',es:'es-ES',fr:'fr-FR',de:'de-DE',it:'it-IT',pt:'pt-PT',ru:'ru-RU',ar:'ar',hi:'hi-IN',th:'th-TH',he:'he-IL',el:'el-GR',tr:'tr-TR',pl:'pl-PL',nl:'nl-NL',id:'id-ID',vi:'vi-VN'};
    if(map[t]) return map[t];
    if(/^zh-/.test(t)) return /hans|cn|sg/.test(t)?'zh-CN':'zh-TW';
    if(/^[a-z]{2,3}(?:-[a-z0-9]+)*$/.test(t)) return t.split('-').map((x,i)=>i?x.toUpperCase():x).join('-');
    return '';
  }
  function countHints(s,chars){let n=0; for(const ch of s){if(chars.includes(ch)) n++;} return n;}
  function localDetect(text){
    const raw=String(text||'');
    const s=maskMedical(raw);
    if(!s) return {tag:'',confidence:0,reason:'medical-only'};
    if(/[\u3040-\u30ff]/.test(s)) return {tag:'ja-JP',confidence:.99,reason:'kana'};
    if(/[\uac00-\ud7af]/.test(s)) return {tag:'ko-KR',confidence:.99,reason:'hangul'};
    if(/[\u0e00-\u0e7f]/.test(s)) return {tag:'th-TH',confidence:.99,reason:'thai-script'};
    if(/[\u0590-\u05ff]/.test(s)) return {tag:'he-IL',confidence:.99,reason:'hebrew-script'};
    if(/[\u0600-\u06ff]/.test(s)) return {tag:'ar',confidence:.99,reason:'arabic-script'};
    if(/[\u0900-\u097f]/.test(s)) return {tag:'hi-IN',confidence:.99,reason:'devanagari'};
    if(/[\u0370-\u03ff]/.test(s)) return {tag:'el-GR',confidence:.99,reason:'greek-script'};
    if(/[\u0400-\u04ff]/.test(s)) return {tag:'ru-RU',confidence:.96,reason:'cyrillic'};
    if(/[\u3400-\u9fff]/.test(s)){
      const trad=countHints(s,TRAD_HINT), simp=countHints(s,SIMP_HINT);
      return {tag:(simp>trad+1?'zh-CN':'zh-TW'),confidence:.97,reason:'han-script'};
    }
    const words=(s.toLowerCase().match(/[\p{L}\p{M}]+/gu)||[]);
    if(!words.length) return {tag:'',confidence:0,reason:'no-natural-language'};
    const scores={};
    for(const [tag,list] of Object.entries(LATIN_WORDS)){
      const set=new Set(list); let score=0;
      for(const w of words) if(set.has(w)) score++;
      scores[tag]=score;
    }
    const ranked=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
    const best=ranked[0], second=ranked[1];
    if(best && best[1]>=2 && best[1]>=second[1]+1) return {tag:best[0],confidence:Math.min(.96,.68+best[1]*.06),reason:'function-words'};
    if(best && best[1]>=1 && words.length<=4 && best[1]>second[1]) return {tag:best[0],confidence:.72,reason:'short-function-word'};
    // Latin-script text with no decisive function words is intentionally ambiguous.
    return {tag:'',confidence:.25,reason:'latin-ambiguous'};
  }
  function semanticTag(recognition){
    if(!recognition) return '';
    const conf=Number(recognition.language_confidence||0);
    return conf>=0.45 ? normalizeTag(recognition.language_tag) : '';
  }
  function fallbackTag(){
    try{
      const prev=normalizeTag(localStorage.getItem('VQ_LAST_INPUT_LANG'));
      if(prev) return prev;
    }catch(_){ }
    return normalizeTag(navigator.language)||'zh-TW';
  }
  function resolveInputLanguage(text,recognition){
    try{
      if(window.VQ_LAST_INPUT_SOURCE==='voice'){
        const stt=normalizeTag(window.VQ_LAST_STT_LANGUAGE || localStorage.getItem('VQ_STT_LANGUAGE'));
        if(stt) return stt;
      }
    }catch(_){ }
    const local=localDetect(text);
    if(local.tag && local.confidence>=0.70) return local.tag;
    // A message made only of medical notation (for example "V/Q?") contains no
    // reliable human-language evidence. Preserve conversational/UI language instead
    // of allowing the semantic model to invent a language from the terminology.
    if(local.reason==='medical-only' || local.reason==='no-natural-language') return fallbackTag();
    const sem=semanticTag(recognition);
    if(sem) return sem;
    if(local.tag) return local.tag;
    return fallbackTag();
  }
  window.VQ_maskMedicalTermsForLanguage=maskMedical;
  window.VQ_detectNaturalLanguage=localDetect;
  window.VQ_resolveInputLanguage=resolveInputLanguage;
  window.VQ_detectLanguage=function(text){return localDetect(text).tag||fallbackTag();};
})();
