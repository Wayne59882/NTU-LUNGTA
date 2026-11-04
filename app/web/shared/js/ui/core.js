/* v50: original UI core script kept; wrapped to avoid total blank screen if one module fails */
try {

(function(){
  const LESSONS = {"basic":{"title":"Course 1: Gas Exchange Framework","keywords":["gas exchange","氣體交換","basic","framework","ABG"],"script":"大家好。這一單元先建立氣體交換的基本架構。\n\n解讀氣體交換時，不能只看 PaO2 或 PaCO2，而要一起考慮四個層次：通氣、灌流、擴散，以及血液的氧含量。\n\n第一，通氣代表新鮮氣體能不能有效到達肺泡。第二，灌流代表血液能不能到達肺泡周圍的微血管。第三，擴散代表氧氣能不能穿過肺泡微血管膜。第四，氧含量代表血液是否有足夠的血紅素攜帶氧氣。\n\n當病人出現低血氧時，不要立刻假設只有肺泡氧分壓下降，或只有血紅素異常；應該先判斷氣體交換路徑的哪一個步驟受到影響。\n\n後面的課程都會回到這個架構：通氣影響 PaCO2 與 PAO2；灌流影響 V/Q；擴散影響 A-a gradient；血紅素則影響 CaO2 與 oxygen delivery。"},"ventilation":{"title":"Course 2: Ventilation and Alveolar Ventilation","keywords":["ventilation","通氣","alveolar ventilation","VA","VT","VD","respiratory rate","dead space"],"script":"大家好。這一單元說明通氣與肺泡通氣。\n\n每分鐘通氣量是每分鐘進出呼吸系統的總氣體量，可以寫成 VE = VT × f，其中 VT 是潮氣容積，f 是呼吸頻率。\n\n但是吸入的氣體並不是全部都參與肺泡氣體交換。位在死腔中的氣體不會和肺微血管血液進行有效交換。\n\n因此，真正直接影響二氧化碳清除的是肺泡通氣量：VA = (VT − VD) × f。\n\n當 VT 下降、VD 增加，或呼吸頻率下降時，VA 會降低。VA 降低時，二氧化碳容易滯留，PaCO2 會上升；VA 增加時，二氧化碳排除增加，PaCO2 會下降。\n\n以模型的正常設定為例，VA = (500 − 150) × 15 / 1000 = 5.25 公升每分鐘。使用 V/Q Visual Model 時，可以把 VT、VD 與呼吸頻率的改變和這個基準肺泡通氣量一起理解。"},"alveolar_gas":{"title":"Course 3: Alveolar Gas Equation and Oxygenation","keywords":["alveolar gas","PAO2","FiO2","oxygenation","altitude","inspired oxygen"],"script":"大家好。這一單元說明肺泡氣體方程式與氧合。\n\n肺泡氧分壓可以用肺泡氣體方程式估算：PAO2 = FiO2 × (Patm − PH2O) − PaCO2 / R。\n\n這裡有三個重點。第一，FiO2 增加會提高 PAO2，所以補充氧氣可以提高肺泡氧分壓。第二，PaCO2 增加會使 PAO2 降低，因此低通氣造成二氧化碳滯留時，肺泡氧分壓也會下降。第三，在高海拔環境，氣壓降低，所以吸入氧分壓與 PAO2 都會下降。\n\n氧合問題和通氣問題不能視為同一件事。提高 FiO2 可以改善氧合，但不會直接降低 PaCO2；PaCO2 主要仍由肺泡通氣量控制。"},"perfusion":{"title":"Course 4: Perfusion, Cardiac Output, and Mixed Venous Blood","keywords":["perfusion","灌流","cardiac output","mixed venous","SvO2","PvO2"],"script":"大家好。這一單元介紹灌流、心輸出量與混合靜脈血。\n\n灌流是到達已通氣肺泡周圍微血管的血流。如果肺泡仍有通氣，但灌流下降，局部 V/Q 會升高，嚴重時會接近死腔生理。\n\n心輸出量也會影響全身氧氣運送。氧氣運送量大致等於心輸出量乘以動脈血氧含量。\n\n當心輸出量下降時，PaO2 和 PaCO2 不一定立刻出現非常明顯的變化，但混合靜脈血氧值可能明顯下降。因為組織仍需要氧氣，較低的血流量會使組織從每一單位血液中抽取更多氧氣，因此混合靜脈 PvO2 與 SvO2 會下降。\n\n所以混合靜脈血的數值可以幫助我們判斷目前氧氣運送是否足以滿足組織需求。"},"normal_vq":{"title":"Course 5: Normal V/Q Gradient — Apex and Base","keywords":["apex","base","gradient","normal V/Q","肺尖","肺底"],"script":"大家好。這一單元說明正常肺臟的 V/Q 梯度。\n\nV/Q ratio 是通氣量除以灌流量。在直立的肺臟中，從肺尖到肺底，通氣和灌流都會受到重力影響。\n\n在肺尖，通氣較少，灌流也較少，但是灌流下降的比例更大，因此肺尖的 V/Q 相對較高。\n\n在肺底，通氣增加，灌流也增加，而且灌流增加的比例更大，因此肺底的 V/Q 相對較低。\n\n所以正常肺臟並不是每一個區域都有相同的 V/Q。肺尖通常屬於較高 V/Q，肺底屬於較低 V/Q。肺尖 V/Q 較高並不代表肺尖對總氣體交換的貢獻最大，因為肺底通常同時接受更多的總通氣與總灌流。"},"low_vq":{"title":"Course 6: Low V/Q and Shunt-like Physiology","keywords":["low V/Q","shunt-like","pneumonia","asthma","COPD","airway obstruction"],"script":"大家好。這一單元說明 low V/Q 與 shunt-like physiology。\n\nLow V/Q 代表相對於灌流而言，通氣不足。最簡單的理解方式就是：血流還在，但是氣體不夠。\n\n因為血液仍然流經通氣不足的肺泡，所以離開該區域的血液無法完全氧合。局部 PO2 會下降，PCO2 傾向上升，氧含量也會降低。\n\n如果通氣變得非常低，但灌流仍持續存在，low V/Q 就會逐漸接近 shunt-like physiology，極端時可接近 true shunt。\n\n常見例子包括肺炎、氣喘、COPD 與局部呼吸道阻塞。因此在 V/Q Visual Model 中，low V/Q 或 shunt-like 狀態主要應理解為「通氣不足但灌流保留」的區域。"},"high_vq":{"title":"Course 7: High V/Q, Dead Space, and Pulmonary Embolism","keywords":["high V/Q","dead space","pulmonary embolism","PE"],"script":"大家好。這一單元說明 high V/Q、dead space 與 pulmonary embolism。\n\nHigh V/Q 代表通氣相對保留，但是灌流不足。最簡單的理解方式就是：氣體到得了肺泡，但是血流不夠。\n\n當灌流變得非常低時，受影響區域會接近 dead-space physiology。也就是空氣可以進入肺泡，但缺乏足夠血流參與氣體交換。\n\n肺栓塞是典型例子。栓子會降低肺血流，但通氣可能相對保留，因此 V/Q 上升，局部逐漸呈現 high V/Q 或 dead-space-like 的狀態。\n\n所以在 V/Q Visual Model 中，dead-space-like physiology 應該呈現為「有通氣、但灌流不足」的區域，而不是 low V/Q 的通氣不足區域。"},"shunt":{"title":"Course 8: True Shunt and the Shunt Equation","keywords":["true shunt","shunt equation","Qs/Qt","right-to-left shunt"],"script":"大家好。這一單元介紹 true shunt 與 shunt equation。\n\nShunt 的核心是血流存在，但是有效通氣缺失。最簡單的記法就是：有血，但是沒有足夠的氣體和這些血液進行交換。\n\n分流的血液沒有接觸到有效通氣的肺泡，因此在混入動脈血之前無法充分氧合，會造成明顯的 PaO2 下降。\n\nTrue shunt 對提高 FiO2 的反應通常比 low V/Q 差，因為真正被分流的血液根本沒有流經有效通氣的肺泡。\n\nShunt equation 可以寫成 Qs/Qt = (CcO2 − CaO2) / (CcO2 − CvO2)。這個公式使用氧含量，而不是只看 PO2，因為血液中的氧大部分是由血紅素攜帶。"},"diffusion":{"title":"Course 9: Diffusion Limitation and the A-a Gradient","keywords":["diffusion","diffusion limitation","A-a gradient","DLCO","exercise"],"script":"大家好。這一單元說明 diffusion limitation 與 A-a gradient。\n\n擴散是氣體穿過肺泡微血管膜的過程。氧氣由肺泡進入血液，而二氧化碳則由血液進入肺泡。\n\n當肺臟的擴散能力下降時，氧氣可能無法在有限時間內和肺泡氣體達到充分平衡，因此動脈 PaO2 下降。此時 PAO2 可能仍相對正常，所以 A-a gradient 會增加。\n\n運動時氧氣消耗增加，而且肺微血管通過時間縮短，因此 diffusion limitation 可能變得更明顯。\n\n提高 FiO2 可以增加氧分壓梯度，進而改善氧氣轉移。二氧化碳通常較不容易受到單純擴散障礙影響，因為二氧化碳的擴散能力較高。"},"oxygen_content":{"title":"Course 10: Hemoglobin, CaO2, and Oxygen Delivery","keywords":["hemoglobin","Hb","CaO2","oxygen content","oxygen delivery","anemia","SaO2"],"script":"大家好。這一單元說明血紅素、動脈血氧含量 CaO2，以及 oxygen delivery。\n\nPaO2 代表溶解在血漿中的氧分壓，它不等於血液所攜帶的總氧量。\n\n動脈血氧含量主要由血紅素濃度和血紅素氧飽和度決定，可以近似表示為：CaO2 ≈ 1.34 × Hb × SaO2 + 0.003 × PaO2。\n\n在貧血時，PaO2 可以維持正常，SaO2 也可能正常，但是因為血紅素濃度下降，CaO2 仍然會降低。\n\n氧氣運送量大致等於心輸出量乘以 CaO2。因此，不論是血紅素過低，或心輸出量過低，都可能降低組織氧氣運送。這也是為什麼只看 PaO2 可能低估實際的 oxygen delivery 問題。"},"integrated_disease":{"title":"Course 11: Integrated Disease Physiology — PE, Pneumonia, Asthma, and COPD","keywords":["disease","PE","pneumonia","asthma","COPD"],"script":"大家好。最後這一單元整合 pulmonary embolism、pneumonia、asthma、COPD 與 V/Q physiology。\n\n肺栓塞主要降低灌流。通氣相對保留，因此 V/Q 上升，受影響的區域會呈現 high V/Q 或 dead-space-like physiology。\n\n肺炎會因發炎、液體或實變而降低局部通氣，但灌流仍可能存在，因此通常偏向 low V/Q 或 shunt-like physiology。\n\n氣喘與 COPD 常伴隨呼吸道阻塞，受影響區域的通氣下降，因此常見 regional low V/Q。COPD 另外可能合併肺泡破壞、dead space 增加與氣體交換效率下降，所以有時呈現混合型異常。\n\n總結來說：肺栓塞主要降低 Q，使 V/Q 上升；肺炎主要降低 V，使 V/Q 下降；氣喘與 COPD 常造成局部 low V/Q，也可能同時合併其他型態的氣體交換異常。"}};
  const QUESTIONS = [{"title":"Gas Exchange Framework","question":"Which set best describes the four major levels of gas exchange?","choices":["Ventilation, perfusion, diffusion, and oxygen content","Ventilation only","PaO2 and PaCO2 only","Hemoglobin only"],"answer":0,"explanation":"Gas exchange should be interpreted through ventilation, perfusion, diffusion, and oxygen content."},{"title":"Alveolar Ventilation Formula","question":"What is the formula for alveolar ventilation?","choices":["VE = VT × f","VA = (VT − VD) × f","CaO2 = Hb × QT","Qs/Qt = PaO2 / PaCO2"],"answer":1,"explanation":"Alveolar ventilation is VA = (VT − VD) × f."},{"title":"Hypoventilation","question":"What usually happens to PaCO2 when alveolar ventilation decreases?","choices":["It decreases","It does not change","It increases","It becomes zero"],"answer":2,"explanation":"Reduced alveolar ventilation decreases CO2 elimination and raises PaCO2."},{"title":"Alveolar Gas Equation","question":"What does the alveolar gas equation primarily estimate?","choices":["Cardiac output","Hemoglobin concentration","Shunt fraction","Alveolar oxygen partial pressure"],"answer":3,"explanation":"The alveolar gas equation is used to estimate PAO2."},{"title":"Apex and Base","question":"Why is the V/Q ratio usually higher at the apex in the upright lung?","choices":["Perfusion decreases proportionally more than ventilation","The apex has no ventilation","The base has no perfusion","Hemoglobin is higher at the apex"],"answer":0,"explanation":"Both ventilation and perfusion are lower at the apex, but perfusion decreases more."},{"title":"Low V/Q","question":"Which description best matches low V/Q?","choices":["Gas without blood flow","Blood flow with insufficient ventilation","No blood flow and no ventilation","A hemoglobin problem only"],"answer":1,"explanation":"Low V/Q means ventilation is reduced relative to perfusion."},{"title":"High V/Q","question":"Which condition is most closely associated with high V/Q?","choices":["True shunt","Low V/Q","Dead-space-like physiology","Anemia"],"answer":2,"explanation":"High V/Q reflects preserved ventilation relative to reduced perfusion and approaches dead-space physiology."},{"title":"True Shunt","question":"What is the core feature of a true shunt?","choices":["Ventilation without blood flow","Low hemoglobin","Increased diffusion","Blood flow without effective ventilation"],"answer":3,"explanation":"A shunt has blood flow but no effective ventilation."},{"title":"Pulmonary Embolism","question":"What V/Q pattern is most typical of pulmonary embolism?","choices":["High V/Q / dead-space-like","Low V/Q only","True shunt only","Pure anemia"],"answer":0,"explanation":"Pulmonary embolism reduces perfusion and therefore increases V/Q."},{"title":"Pneumonia","question":"What V/Q change is commonly associated with pneumonia?","choices":["High V/Q only","Low V/Q or shunt-like","Dead space only","Low hemoglobin only"],"answer":1,"explanation":"Pneumonia reduces ventilation while perfusion may remain present, causing low V/Q."},{"title":"Diffusion Limitation","question":"Which finding is typical of diffusion limitation?","choices":["Lower PaO2 with a larger A-a gradient","PaCO2 becomes zero","SaO2 is always 100%","Cardiac output always rises"],"answer":0,"explanation":"Diffusion limitation can lower PaO2 and increase the A-a gradient."},{"title":"Anemia","question":"Which statement about anemia is most accurate?","choices":["PaO2 must be zero","SaO2 must be zero","PaO2 may be normal while CaO2 is reduced","PaCO2 must rise"],"answer":2,"explanation":"Anemia lowers hemoglobin and therefore CaO2, even when PaO2 is normal."}];
  const DEFAULTS={VT:500,VD:150,f:15,FIO2:.21,Altitude:0,VO2:300,R:.8,Hb:15,QT:5.5,Shunt:0,DLO2:32,LowVA:50,LowQ:50,HighVA:50,HighQ:50};
  let labMode='No V/Q mismatch', currentQ=0, lessonTimer=null, answerTimer=null, thinkTimer=null, activeDisease=null;
  const $=id=>document.getElementById(id);
  const qa=s=>Array.from(document.querySelectorAll(s));
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const fmt=(x,d=2)=>Number.isFinite(x)?x.toFixed(d):'—';
  function speak(text){try{if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='zh-TW';u.rate=parseFloat($('rateRange')?.value||'1')||1;speechSynthesis.speak(u)}}catch(e){}}
  function type(el,text,delay=28){if(!el)return;clearInterval(lessonTimer);let i=0;el.textContent='';lessonTimer=setInterval(()=>{i++;el.textContent=text.slice(0,i);el.scrollTop=el.scrollHeight;if(i>=text.length)clearInterval(lessonTimer)},delay)}
  function currentLesson(){const sel=$('lessonSelect');const k=sel&&LESSONS[sel.value]?sel.value:Object.keys(LESSONS)[0];return {key:k,item:LESSONS[k]};}
  function initTabs(){
    const map=[['lessonTab','lessonPanel'],['caseTab','casePanel'],['modelTab','modelPanel']];
    map.forEach(([b,p])=>{const btn=$(b),pan=$(p);if(!btn||!pan)return;btn.onclick=()=>{map.forEach(([bb,pp])=>{$(bb)?.classList.remove('active');$(pp)?.classList.remove('active')});btn.classList.add('active');pan.classList.add('active');document.body.classList.toggle('v150-model-active',p==='modelPanel');document.body.classList.toggle('v150-case-active',p==='casePanel');};});
  }
  function initLessons(){
    const sel=$('lessonSelect'); if(!sel) return;
    sel.innerHTML=Object.entries(LESSONS).map(([k,v])=>'<option value="'+k+'">'+v.title+'</option>').join('');
    sel.onchange=()=>{$('lessonText').textContent='Selected: '+currentLesson().item.title+'. Select “Start Lecture”.';};
    $('lessonText').textContent='Selected: '+currentLesson().item.title+'. Select “Start Lecture”.';
    $('startLessonBtn').onclick=e=>{e.preventDefault();const item=currentLesson().item;type($('lessonText'),item.script,30);speak(item.script);$('status').textContent='Status: Lecture in progress — '+item.title;};
    $('pauseLessonBtn').onclick=e=>{e.preventDefault();try{speechSynthesis.pause()}catch(x){}};
    $('resumeLessonBtn').onclick=e=>{e.preventDefault();try{speechSynthesis.resume()}catch(x){}};
    $('stopLessonBtn').onclick=e=>{e.preventDefault();clearInterval(lessonTimer);try{speechSynthesis.cancel()}catch(x){}};
    $('repeatBtn').onclick=e=>{e.preventDefault();speak(currentLesson().item.script);};
    $('clearBtn').onclick=e=>{e.preventDefault();$('studentQuestion').textContent='';$('teacherAnswer').textContent='The AI teacher answer will appear here.';};
    $('submitTypedQuestionBtn').onclick=e=>{e.preventDefault();submitQA();};
  }
  function normalizeQuestionText(text){
    return String(text||'')
      .replace(/學生問的問題會顯示在這裡。?/g,'')
      .replace(/\s+/g,' ')
      .trim()
      .toLowerCase();
  }
  function allTopicKeywords(){
    const extra = ['v/q','vq','v q','ventilation','perfusion','diffusion','oxygen','oxygenation','gas exchange','abg','pao2','paco2','paco2','pa o2','pa co2','fio2','fio₂','co2','o2','a-a','gradient','shunt','dead space','alveolar','hemoglobin','hb','cao2','sao2','svo2','cardiac output','pulmonary embolism','pe','pneumonia','asthma','copd','apex','base','肺','呼吸','通氣','灌流','擴散','氧','血氧','二氧化碳','血氣','肺泡','分流','死腔','血紅素','貧血','肺栓塞','肺炎','氣喘','肺阻塞','肺尖','肺底','低血氧','潮氣容積','呼吸頻率','氣體交換'];
    const set = new Set(extra.map(x=>String(x).toLowerCase()));
    Object.values(LESSONS).forEach(v=>(v.keywords||[]).forEach(k=>set.add(String(k).toLowerCase())));
    return Array.from(set);
  }
  function isGibberishOrTooVague(raw){
    const q = String(raw||'').replace(/\s+/g,'').trim();
    if(!q || q.includes('學生問的問題')) return true;
    // repeated filler/noise such as 餵餵餵、哈哈哈、aaaaa
    const compact = q.replace(/[，。！？,.!?]/g,'');
    if(compact.length < 3) return true;
    const repeated = /(.)\1{4,}/.test(compact);
    const onlyFiller = /^(餵|喂|欸|呃|嗯|啊|哈|嘿|hi|hello|test|測試)+$/i.test(compact);
    return repeated || onlyFiller;
  }
  function analyzeQuestionRelevance(text){
    const t = normalizeQuestionText(text);
    if(isGibberishOrTooVague(text)) return {relevant:false, reason:'empty_or_noise'};
    const topicHits = allTopicKeywords().filter(k => k && t.includes(k));
    const adminWords = ['目前','現在','這頁','這個系統','這個模式','怎麼用','如何使用','開始講課','語音','錄音','麥克風','問答模式','情境題','課程'];
    const adminHit = adminWords.some(w => t.includes(w.toLowerCase()));
    if(topicHits.length > 0) return {relevant:true, reason:'topic', hits:topicHits};
    if(adminHit) return {relevant:false, reason:'admin_vague'};
    return {relevant:false, reason:'off_topic'};
  }
  function lessonByQuestion(text){
    const t=normalizeQuestionText(text);
    let best = null, bestScore = 0;
    for(const [k,v] of Object.entries(LESSONS)){
      let score = 0;
      (v.keywords||[]).forEach(w=>{ if(t.includes(String(w).toLowerCase())) score += 1; });
      if(score > bestScore){ best = {key:k,item:v,score}; bestScore = score; }
    }
    if(best) return best;
    return currentLesson();
  }
  function offTopicReply(q, reason){
    if(reason === 'empty_or_noise'){
      return 'I cannot determine the intended concept yet. Please ask a specific course-related question, for example: “What is low V/Q?”, “Why is pulmonary embolism dead-space-like?”, or “Why does PaCO2 rise?”';
    }
    if(reason === 'admin_vague'){
      return '你目前在「老師講解 / 自由問答」模式。這裡只回答目前生理學課程相關問題。請把問題寫得更具體，例如問 ventilation、perfusion、V/Q ratio、shunt、dead space、diffusion、PaO2、PaCO2 或 oxygen content。';
    }
    return '這個問題和目前課程主題不相關，因此我不會硬套課程內容回答。請改問 gas exchange、V/Q ratio、ventilation、perfusion、shunt、dead space、diffusion、PaO2、PaCO2、hemoglobin 或相關疾病案例。';
  }
  function answerFor(q){
    if(!q||q.includes('學生問的問題')) return 'Please enter a question in the Student Question box first.';
    const rel = analyzeQuestionRelevance(q);
    if(!rel.relevant) return offTopicReply(q, rel.reason);
    const {key,item}=lessonByQuestion(q); let direct='';
    if(key==='low_vq') direct='Low V/Q 是 ventilation 相對不足但 perfusion 仍在，所以是「有血但氣不夠”. 偏 shunt-like。';
    else if(key==='high_vq') direct='High V/Q 是 ventilation 相對保留但 perfusion 不足，所以是「有氣但血不夠”. 偏 dead-space-like。';
    else if(key==='ventilation') direct='VT、VD、f 共同決定 VA = (VT - VD) × f。VA 下降會使 PaCO2 上升。';
    else if(key==='alveolar_gas') direct='PAO2 由 FIO2、barometric pressure、PaCO2 和 R 決定。吸氧提高 PAO2，但不直接降低 PaCO2。';
    else if(key==='normal_vq') direct='直立時 apex V/Q 較高、base V/Q 較低，因為 perfusion 的重力梯度比 ventilation 更明顯。';
    else if(key==='shunt') direct='True shunt 是有血沒氣，PaO2 下降明顯，且對提高 FIO2 反應較差。';
    else if(key==='diffusion') direct='Diffusion limitation 使 PaO2 下降、A-a gradient 增加，運動時更明顯。';
    else if(key==='perfusion') direct='Cardiac output 下降時 oxygen delivery 下降，mixed venous PO2/SvO2 會下降。';
    else if(key==='oxygen_content') direct='PaO2 不等於 CaO2。貧血時 PaO2 可正常，但 Hb 減少會使 CaO2 下降。';
    else if(key==='integrated_disease') direct='PE 偏 high V/Q；pneumonia 偏 low V/Q；asthma/COPD 常見 regional low V/Q，也可能混合。';
    else direct='Gas exchange 要同時看 ventilation、perfusion、diffusion 與 oxygen content。';
    return '我判斷這題屬於：「'+item.title+'」。\n\n'+direct+'\n\n補充：如果你要問其他課程，請直接提到關鍵字，例如 shunt、dead space、diffusion、PaO2、PaCO2 或 hemoglobin。';
  }
  function submitQA(){
    const q=($('studentQuestion')?.textContent||'').trim(), ans=answerFor(q), box=$('teacherAnswer');
    clearInterval(answerTimer);clearInterval(thinkTimer);let dots=0;box.textContent='AI teacher is thinking';
    thinkTimer=setInterval(()=>{dots=(dots+1)%4;box.textContent='AI teacher is thinking'+'.'.repeat(dots)},250);
    setTimeout(()=>{clearInterval(thinkTimer);let i=0;box.textContent='';speak(ans);answerTimer=setInterval(()=>{i++;box.textContent=ans.slice(0,i);box.scrollTop=box.scrollHeight;if(i>=ans.length)clearInterval(answerTimer)},28)},650);
  }
  function num(id,f,maxv){const el=$(id);let n=parseFloat(el?.value);if(!Number.isFinite(n))n=f;if(n<0)n=0;if(Number.isFinite(maxv))n=Math.min(n,maxv);if(el)el.value=n;return n;}
  function buildModel(){
    const panel=$('modelPanel'), row=$('vqConditionRow'); if(!panel||$('v37Wrap'))return;
    const wrap=document.createElement('div');wrap.id='v37Wrap';
    wrap.innerHTML='<div class="v37-lab-card"><div class="v37-title">完整數值輸入區：Lung Lab 參數計算 → 原本雙側肺 V/Q 視覺模型</div><div class="v37-sub">調整參數後按 Calculate。右側完整列出數值，並更新下方肺模型。</div><div class="v37-mode-row"><button id="v37NoBtn" class="active">No V/Q mismatch</button><button id="v37MisBtn">V/Q mismatch</button><button id="v37PEBtn">Pulmonary Embolism</button><button id="v37PneuBtn">Pneumonia</button><button id="v37ShuntBtn">Shunt-like</button><button id="v37DeadBtn">Dead Space-like</button></div><div class="v37-lab-grid"><div><div class="v37-input-grid">'+
    ['VT','VD','f','FIO2','Altitude','VO2','R','Hb','QT','Shunt','DLO2','LowVA','LowQ','HighVA','HighQ'].map(k=>'<div class="v37-input-row"><label>'+k+'</label><input id="v37'+k+'" type="number" step="any" value="'+DEFAULTS[k]+'"></div>').join('')+
    '</div><div class="v37-actions"><button id="v37CalcBtn">Calculate 並更新肺模型</button><button id="v37ResetBtn">Reset normal</button></div></div><div id="v37Result" class="v37-result">尚未計算。請調整參數後按 Calculate。</div></div></div>';
    (row||panel.firstElementChild).parentNode.insertBefore(wrap,row||panel.firstElementChild);
    $('v37NoBtn').onclick=e=>{e.preventDefault();labMode='No V/Q mismatch';activeDisease=null;setModeButtons();};
    $('v37MisBtn').onclick=e=>{e.preventDefault();labMode='V/Q mismatch';activeDisease=null;setModeButtons();};
    $('v37CalcBtn').onclick=e=>{e.preventDefault();activeDisease=null;calculate();setModeButtons();};
    $('v37ResetBtn').onclick=e=>{e.preventDefault();resetModel();};
    $('v37PEBtn').onclick=e=>{e.preventDefault();showDisease('pe');};
    $('v37PneuBtn').onclick=e=>{e.preventDefault();showDisease('pneumonia');};
    $('v37ShuntBtn').onclick=e=>{e.preventDefault();showDisease('shunt');};
    $('v37DeadBtn').onclick=e=>{e.preventDefault();showDisease('deadspace');};
  }
  function setModeButtons(){['v37NoBtn','v37MisBtn','v37PEBtn','v37PneuBtn','v37ShuntBtn','v37DeadBtn'].forEach(id=>$(id)?.classList.remove('active')); if(activeDisease==='pe')$('v37PEBtn')?.classList.add('active'); else if(activeDisease==='pneumonia')$('v37PneuBtn')?.classList.add('active'); else if(activeDisease==='shunt')$('v37ShuntBtn')?.classList.add('active'); else if(activeDisease==='deadspace')$('v37DeadBtn')?.classList.add('active'); else (labMode==='V/Q mismatch'?$('v37MisBtn'):$('v37NoBtn'))?.classList.add('active');}
  function pb(alt){return 760*Math.exp(-alt/7000)}; function sat(po2){return clamp(100/(1+Math.pow(26.8/Math.max(po2,1),2.7)),0,99.8)}; function o2content(po2,hb){return 1.34*hb*(sat(po2)/100)+0.003*Math.max(po2,0)}; function co2content(pco2){return 48+pco2*.20}; function ph(pco2){return clamp(7.40-Math.log(Math.max(pco2,1)/40)/Math.log(10)*.65,6.65,7.65)}
  function read(){return {VT:num('v37VT',500),VD:num('v37VD',150),f:num('v37f',15),FIO2:num('v37FIO2',.21),Altitude:num('v37Altitude',0),VO2:num('v37VO2',300),R:num('v37R',.8),Hb:num('v37Hb',15),QT:num('v37QT',5.5),Shunt:num('v37Shunt',0,1),DLO2:num('v37DLO2',32),LowVA:num('v37LowVA',50,100),LowQ:num('v37LowQ',50,100),HighVA:num('v37HighVA',50,100),HighQ:num('v37HighQ',50,100)}}
  function compute(){const s=read(),Pb=pb(s.Altitude),VCO2=s.VO2*s.R,insp=s.FIO2*Math.max(Pb-47,1),VA=Math.max((s.VT-s.VD)*s.f/1000,.01),VE=s.VT*s.f/1000,PACO2=(VCO2*.863)/VA,PAO2=insp-PACO2/Math.max(s.R,.01);const lr=(labMode==='V/Q mismatch'?s.LowVA/s.LowQ:1),hr=(labMode==='V/Q mismatch'?s.HighVA/s.HighQ:1);let artPO2=PAO2-2-(s.DLO2<32?(32-s.DLO2)*1.15:0)-s.Shunt*55,artPCO2=PACO2+s.Shunt*8;if(labMode==='V/Q mismatch'){const lowPO2=PAO2-30*(1/Math.max(lr,.2)-1),highPO2=PAO2+22*(hr-1);artPO2=(lowPO2*s.LowQ+highPO2*s.HighQ)/Math.max(s.LowQ+s.HighQ,1)-s.Shunt*45;artPCO2=(PACO2*(1.05/Math.max(lr,.12))*s.LowQ+PACO2*(.85/Math.max(hr,.25))*s.HighQ)/Math.max(s.LowQ+s.HighQ,1)+s.Shunt*8;}return {s,Pb,insp,VA,VE,PACO2,PAO2,Vrel:clamp(VA/5.25,.08,2.6),Qrel:clamp(s.QT/5.5,.1,2.6),ratio:labMode==='V/Q mismatch'?clamp((lr+hr)/2,.05,8):clamp((VA/5.25)/Math.max((s.QT/5.5)*(1-s.Shunt),.05),.05,8),artPO2,artPCO2,lr,hr};}
  function tr(a,b,u){const neg=typeof b==='number'&&b<0;return '<tr><td>'+a+'</td><td class="'+(neg?'v37-neg':'')+'">'+(typeof b==='number'?fmt(b,2):b)+' '+(u||'')+'</td></tr>'}
  function calculate(){const d=compute();const s=d.s;let html='<div class="v37-output"><div class="v37-block"><div class="v37-block-title">Input Variables</div><table class="v37-table"><tbody>'+Object.keys(s).map(k=>tr(k,s[k],'')).join('')+'</tbody></table></div>';html+='<div class="v37-block"><div class="v37-block-title">General</div><table class="v37-table"><tbody>'+tr('Barometric pressure',d.Pb,'mmHg')+tr('Minute Vent.',d.VE,'L/min')+tr('Alveolar Vent.',d.VA,'L/min')+tr('Alveolar PCO2',d.PACO2,'mmHg')+tr('Inspired PO2',d.insp,'mmHg')+tr('Alveolar PO2',d.PAO2,'mmHg')+tr('V/Q ratio',d.ratio,'')+'</tbody></table></div>';html+='<div class="v37-block"><div class="v37-block-title">Arterial Blood</div><table class="v37-table"><tbody>'+tr('PCO2',d.artPCO2,'mmHg')+tr('CO2 Content',co2content(d.artPCO2),'ml/dl')+tr('pH',ph(d.artPCO2),'')+tr('PO2',d.artPO2,'mmHg')+tr('O2 Saturation',sat(d.artPO2),'%')+tr('O2 Content',o2content(d.artPO2,s.Hb),'ml/dl')+tr('A-a O2 Diff',d.PAO2-d.artPO2,'mmHg')+'</tbody></table></div>';html+='</div><div class="v37-interpret">目前模式：'+labMode+'<br><br>VA = (VT - VD) × f = '+fmt(d.VA)+' L/min。以 normal VA 5.25 L/min 為基準，肺葉依此放大或縮小。</div>';$('v37Result').innerHTML=html;updateLung(d);}
  function setRegion(id,cls,scale){const el=$(id);if(!el)return;el.removeAttribute('transform');el.style.transform='scale('+scale+')';el.style.transformBox='fill-box';el.style.transformOrigin='center center';if(cls==='high')el.setAttribute('class','vq-lung-region vq-region-high');else if(cls==='low')el.setAttribute('class','vq-lung-region vq-region-low');else el.setAttribute('class','vq-lung-region vq-region-normal');}
  function updateLung(d){const scale=clamp(d.Vrel,.45,1.45);let apex=labMode==='No V/Q mismatch'?'high':'normal',mid='normal',base=labMode==='No V/Q mismatch'?'low':'normal'; if(labMode==='V/Q mismatch'){if(d.hr>1.25)apex='high';if(d.lr<.8||d.s.Shunt>.15)base='low';if(d.s.Shunt>.2)mid='low';}['leftApex','rightApex'].forEach(id=>setRegion(id,apex,scale));['leftMiddle','rightMiddle'].forEach(id=>setRegion(id,mid,scale));['leftBase','rightBase'].forEach(id=>setRegion(id,base,scale));$('zoomTitle').textContent=labMode+' - Calculated';$('ventBar').style.width=clamp(d.Vrel*50,5,100)+'%';$('perfBar').style.width=clamp(d.Qrel*50,5,100)+'%';$('vqBar').style.width=clamp(d.ratio*30,5,100)+'%';$('ventText').textContent='Ventilation '+Math.round(clamp(d.Vrel*50,1,100))+'/100';$('perfText').textContent='Perfusion '+Math.round(clamp(d.Qrel*50,1,100))+'/100';$('vqText').textContent='V/Q ratio '+fmt(d.ratio,2);}
  function showDisease(k){activeDisease=k;setModeButtons();try{ if(typeof renderVQCondition==='function')renderVQCondition(k)}catch(e){}$('v37Result').innerHTML='<div class="v37-interpret">目前顯示疾病模型：'+k+'。疾病模型獨立於數值計算；要計算請按 Calculate。</div>';}
  function resetModel(){Object.entries(DEFAULTS).forEach(([k,v])=>{const el=$('v37'+k);if(el)el.value=v});qa('.vq-lung-region').forEach(el=>{el.style.transform='';el.removeAttribute('transform')});labMode='No V/Q mismatch';activeDisease=null;setModeButtons();$('v37Result').textContent='已 Reset normal。請調整參數後按 Calculate。';}
  function initCases(){const p=$('casePanel');if(!p)return;p.innerHTML='<div class="section-label">COMPLETE CASE QUESTIONS</div><div class="v37-case-card"><div class="v37-case-top"><select id="v37CaseSelect"></select><button id="v37NextBtn" class="secondary">下一題</button></div><div id="v37Question" class="v37-question"></div><div id="v37Choices"></div><div class="section-label" style="margin-top:14px;">AI FEEDBACK</div><div id="v37Feedback" class="dialog-box answer-box v37-feedback">請選擇答案。</div></div>';$('v37CaseSelect').onchange=()=>{currentQ=Number($('v37CaseSelect').value)||0;renderCase()};$('v37NextBtn').onclick=e=>{e.preventDefault();currentQ=(currentQ+1)%QUESTIONS.length;renderCase()};renderCase();}
  function renderCase(){const sel=$('v37CaseSelect');sel.innerHTML=QUESTIONS.map((q,i)=>'<option value="'+i+'">'+(i+1)+'. '+q.title+'</option>').join('');sel.value=currentQ;const item=QUESTIONS[currentQ];$('v37Question').textContent=item.question;$('v37Choices').innerHTML=item.choices.map((c,i)=>'<button class="v37-choice" data-i="'+i+'">'+String.fromCharCode(65+i)+'. '+c+'</button>').join('');qa('.v37-choice').forEach(b=>b.onclick=()=>choose(Number(b.dataset.i)));}
  function choose(i){const item=QUESTIONS[currentQ],ok=i===item.answer;qa('.v37-choice').forEach(b=>{const idx=Number(b.dataset.i);b.classList.toggle('correct',idx===item.answer);b.classList.toggle('wrong',idx===i&&i!==item.answer)});$('v37Feedback').textContent=(ok?'Correct.':'Incorrect.')+'\\n\\n正解：'+String.fromCharCode(65+item.answer)+'. '+item.choices[item.answer]+'\\n\\n解析：'+item.explanation;}
  function init(){initTabs();initLessons();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

} catch (e) {
  console.error('v50 core script error:', e);
  document.addEventListener('DOMContentLoaded', function(){
    var box = document.getElementById('teacherAnswer') || document.body;
    if (box) box.textContent = 'A core script failed to load, but the interface has been preserved. Please capture the browser Console error.';
  });
}
