(function(){
'use strict';
const $=id=>document.getElementById(id);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const fmt=(x,d=1)=>Number.isFinite(x)?Number(x).toFixed(d):'—';
const BUILD='v192-full-coupled-lung-physiology-20260820';
window.__VQ_TA_BUILD__=BUILD;

/*
  v153 course alignment and per-student result rule:
  The Scenario Practice question banks mirror the 11 lecture units defined in
  01_original_ui_core.js. Each lecture unit has 100 generated question-bank
  items and contributes exactly 2 questions to a 22-question balanced quiz.
*/
const COURSES=[
{id:'basic',title:'1. Gas Exchange Framework',facts:[
['four-level gas exchange framework','Gas exchange should be interpreted through ventilation, perfusion, diffusion, and blood oxygen content.',['Gas exchange depends only on PaO2.','Gas exchange depends only on respiratory rate.','Gas exchange excludes circulation and hemoglobin.'],'The lecture framework integrates ventilation, perfusion, diffusion, and oxygen content.'],
['ventilation','Ventilation determines whether fresh gas reaches the alveoli.',['Ventilation is identical to cardiac output.','Ventilation measures only hemoglobin concentration.','Ventilation is unrelated to alveolar gas.'],'Ventilation is the airflow component of gas exchange.'],
['perfusion','Perfusion determines whether blood reaches alveolar capillaries for gas exchange.',['Perfusion means bulk airflow through the trachea.','Perfusion is determined only by FiO2.','Perfusion is unrelated to V/Q.'],'Perfusion is the blood-flow component of gas exchange.'],
['diffusion','Diffusion transfers gases across the alveolar-capillary membrane down partial-pressure gradients.',['Diffusion is identical to minute ventilation.','Diffusion occurs only inside the heart.','Diffusion never affects oxygen transfer.'],'Diffusion is membrane gas transfer driven by partial-pressure gradients.'],
['oxygen content','Blood oxygen content depends mainly on hemoglobin concentration and hemoglobin saturation.',['Oxygen content equals PaO2 alone.','Oxygen content is independent of hemoglobin.','Oxygen content is determined only by respiratory rate.'],'Most oxygen is carried bound to hemoglobin.']]},
{id:'ventilation',title:'2. Ventilation and Alveolar Ventilation',facts:[
['minute ventilation','Minute ventilation equals tidal volume multiplied by respiratory frequency.',['Minute ventilation equals tidal volume minus dead space only.','Minute ventilation equals cardiac output multiplied by hemoglobin.','Respiratory frequency is not part of minute ventilation.'],'VE = VT × f.'],
['alveolar ventilation','Alveolar ventilation equals respiratory rate multiplied by tidal volume minus dead-space volume.',['Alveolar ventilation equals tidal volume alone.','Dead space increases effective alveolar ventilation.','Respiratory rate is never part of the formula.'],'VA = (VT − VD) × f.'],
['dead space','Dead-space ventilation does not participate in alveolar gas exchange.',['Dead space is the best-perfused region.','Dead space always means true shunt.','Dead space directly adds oxygen to arterial blood.'],'Dead-space volume must be subtracted from tidal volume.'],
['PaCO2 relationship','PaCO2 is inversely related to alveolar ventilation when CO2 production is stable.',['PaCO2 rises whenever alveolar ventilation rises.','PaCO2 depends only on FiO2.','PaCO2 is unrelated to ventilation.'],'Reduced effective alveolar ventilation tends to raise PaCO2.'],
['hypoventilation','Hypoventilation means alveolar ventilation is insufficient for metabolic CO2 production.',['Hypoventilation always lowers PaCO2.','Hypoventilation is identical to anemia.','Hypoventilation requires absent perfusion.'],'Insufficient VA causes CO2 retention.']]},
{id:'alveolar_gas',title:'3. Alveolar Gas Equation and Oxygenation',facts:[
['alveolar gas equation','A simplified alveolar gas equation estimates PAO2 from inspired oxygen pressure and PACO2 divided by respiratory exchange ratio.',['PAO2 equals hemoglobin multiplied by heart rate.','The equation excludes inspired oxygen.','PACO2 is added without considering R.'],'PAO2 ≈ PIO2 − PACO2/R.'],
['FiO2','Increasing FiO2 raises inspired oxygen pressure and usually raises PAO2.',['FiO2 changes only perfusion.','FiO2 has no effect on PIO2.','FiO2 directly lowers barometric pressure.'],'PIO2 depends on FiO2 and ambient pressure.'],
['altitude','At altitude, lower barometric pressure reduces inspired PO2.',['Altitude increases barometric pressure.','Altitude does not affect inspired oxygen pressure.','Altitude only changes hemoglobin immediately.'],'Lower Pb reduces PIO2 even if FiO2 remains 0.21.'],
['respiratory exchange ratio','R links CO2 production to O2 consumption and influences calculated PAO2.',['R is the same as respiratory rate.','R is unrelated to alveolar gas calculations.','R is always equal to shunt fraction.'],'R is commonly near 0.8 under mixed-diet conditions.'],
['A-a gradient','The A-a gradient compares alveolar PO2 with arterial PO2.',['It compares mixed venous and arterial PCO2 only.','It equals saturation minus hemoglobin.','It is unrelated to oxygenation.'],'The A-a difference helps distinguish alveolar hypoxia from transfer or V/Q problems.']]},
{id:'perfusion',title:'4. Perfusion, Cardiac Output, and Mixed Venous Blood',facts:[
['perfusion','Perfusion is the blood flow reaching alveolar capillaries.',['Perfusion means airway airflow.','Perfusion equals FiO2.','Perfusion is unrelated to V/Q.'],'Perfusion supplies blood for pulmonary gas exchange.'],
['cardiac output','Cardiac output affects systemic oxygen delivery and pulmonary blood flow.',['Cardiac output is the same as respiratory rate.','Cardiac output never affects oxygen delivery.','Cardiac output is determined only by PaO2.'],'Oxygen delivery depends on cardiac output and arterial oxygen content.'],
['mixed venous PO2','Mixed venous PO2 can fall when tissue oxygen extraction rises or cardiac output falls.',['Mixed venous PO2 always equals arterial PO2.','It depends only on inspired oxygen.','It is unrelated to tissue extraction.'],'Mixed venous values reflect the balance between oxygen delivery and tissue use.'],
['mixed venous saturation','A low mixed venous saturation can indicate inadequate oxygen delivery relative to demand.',['Mixed venous saturation always remains 100%.','It measures alveolar ventilation only.','It is independent of cardiac output.'],'SvO2 integrates delivery and consumption.'],
['high V/Q from low perfusion','When ventilation is preserved but perfusion falls, regional V/Q increases.',['Reduced perfusion creates true shunt.','Reduced perfusion always causes low V/Q.','Perfusion has no role in V/Q.'],'Low blood flow relative to ventilation produces high V/Q or dead-space-like physiology.']]},
{id:'normal_vq',title:'5. Normal V/Q Gradient: Apex and Base',facts:[
['apical V/Q','At the lung apex, perfusion decreases proportionally more than ventilation, so V/Q is relatively high.',['The apex has the lowest V/Q because perfusion is highest.','Ventilation is absent at the apex.','Apex and base have identical gravity effects.'],'Both ventilation and perfusion decrease toward the apex, but perfusion decreases more.'],
['basal V/Q','At the lung base, perfusion is relatively greater, so V/Q is lower than at the apex.',['The base has no perfusion.','Basal V/Q is infinite.','Gravity has no effect on perfusion.'],'The base receives more ventilation and much more perfusion.'],
['gravity','Gravity creates regional gradients in ventilation and perfusion.',['Gravity affects neither airflow nor blood flow.','Gravity affects only hemoglobin.','Gravity makes all lung regions identical.'],'Regional V/Q differences are normal in an upright lung.'],
['regional alveolar gases','Higher V/Q regions tend to have higher alveolar PO2 and lower alveolar PCO2.',['Higher V/Q always lowers PO2.','V/Q does not affect alveolar gases.','Higher V/Q means true shunt.'],'Local alveolar gases follow local V/Q.'],
['regional contribution','The lower lung contributes substantially to total gas exchange because it receives greater blood flow.',['The apex receives all cardiac output.','The base has no role in gas exchange.','Regional blood flow is uniform.'],'Perfusion weighting matters when integrating regional outputs.']]},
{id:'low_vq',title:'6. Low V/Q and Shunt-like Physiology',facts:[
['low V/Q','Low V/Q occurs when ventilation is reduced relative to perfusion.',['Low V/Q means perfusion is absent.','Low V/Q is identical to dead space.','Low V/Q always has infinite oxygen tension.'],'Blood leaves poorly ventilated units incompletely oxygenated.'],
['hypoxemia','Low V/Q commonly causes hypoxemia and an increased A-a gradient.',['Low V/Q always raises arterial PO2.','The A-a gradient must remain zero.','Hypoxemia cannot occur when perfusion is present.'],'Mismatch between ventilation and perfusion impairs oxygenation.'],
['oxygen response','Low V/Q usually improves with supplemental oxygen more than true shunt does.',['Low V/Q never responds to oxygen.','Oxygen only treats anemia.','Low V/Q requires complete absence of ventilation.'],'Some ventilation remains, so raising alveolar oxygen can help.'],
['airway obstruction','Airway obstruction can reduce regional ventilation and produce low V/Q.',['Airway obstruction always creates high V/Q.','It affects perfusion only.','It has no effect on gas exchange.'],'Reduced ventilation relative to blood flow creates low V/Q.'],
['shunt-like physiology','Very severe low V/Q can approach shunt-like physiology when ventilation becomes minimal but perfusion persists.',['Shunt-like physiology requires absent perfusion.','It is identical to pure dead space.','It always has a perfect response to oxygen.'],'The affected unit remains perfused but is poorly ventilated.']]},
{id:'high_vq',title:'7. High V/Q, Dead Space, and Pulmonary Embolism',facts:[
['high V/Q','High V/Q occurs when ventilation is preserved relative to reduced perfusion.',['High V/Q means perfusion exceeds ventilation.','High V/Q is identical to true shunt.','High V/Q always means absent ventilation.'],'Ventilation becomes relatively wasted because blood flow is limited.'],
['dead-space-like physiology','A very high V/Q unit approaches dead-space physiology.',['Dead space means perfusion without ventilation.','Dead space is identical to anemia.','Dead space increases blood flow.'],'Ventilated but poorly perfused units waste ventilation.'],
['pulmonary embolism','Pulmonary embolism reduces perfusion to affected lung regions.',['Pulmonary embolism primarily increases perfusion.','It creates only low V/Q.','It has no effect on pulmonary blood flow.'],'PE produces high V/Q or dead-space-like physiology.'],
['physiologic dead space','Physiologic dead space increases when ventilation reaches units with little or no perfusion.',['It increases only when shunt rises.','It is identical to alveolar ventilation.','It requires high hemoglobin.'],'Wasted ventilation increases when Q falls relative to V.'],
['compensation','Tachypnea can occur in pulmonary embolism but does not restore perfusion to the obstructed region.',['Faster breathing removes the embolus.','Respiratory rate never changes in PE.','Tachypnea converts PE into true shunt.'],'Ventilatory compensation cannot replace missing blood flow.']]},
{id:'shunt',title:'8. True Shunt and the Shunt Equation',facts:[
['true shunt','True shunt means perfusion is present but effective ventilation is absent.',['True shunt means ventilation without perfusion.','True shunt is identical to anemia.','True shunt always has high alveolar PO2 in the affected unit.'],'Shunted blood bypasses effective alveolar oxygenation.'],
['oxygen response','True shunt generally responds less to supplemental oxygen than low V/Q does.',['True shunt always normalizes immediately with low-flow oxygen.','True shunt is corrected only by increasing hemoglobin.','Oxygen response is identical in every V/Q disorder.'],'Blood that never contacts ventilated alveoli cannot be directly oxygenated.'],
['shunt fraction','Shunt fraction describes the proportion of cardiac output bypassing effective gas exchange.',['It measures respiratory rate.','It equals FiO2.','It is unrelated to oxygen content.'],'QS/QT quantifies shunted blood flow.'],
['shunt equation','The shunt equation uses pulmonary end-capillary, arterial, and mixed venous oxygen contents.',['It uses only respiratory rate and tidal volume.','It is based on PaCO2 alone.','It excludes oxygen content.'],'QS/QT = (Cco2 − Cao2)/(Cco2 − Cvo2).'],
['content-based calculation','Oxygen content is used in the shunt equation because most blood oxygen is hemoglobin-bound.',['PaO2 alone represents all blood oxygen.','Hemoglobin is irrelevant to shunt calculation.','Dissolved oxygen is always the largest component.'],'Content accounts for hemoglobin-bound and dissolved oxygen.']]},
{id:'diffusion',title:'9. Diffusion Limitation and the A-a Gradient',facts:[
['diffusion limitation','Diffusion limitation occurs when gas does not fully equilibrate between alveolar gas and capillary blood.',['It means perfusion is completely absent.','It is identical to hypoventilation.','It affects only carbon dioxide content.'],'Transfer may be limited by membrane properties or transit time.'],
['diffusing capacity','Diffusing capacity reflects the lung’s ability to transfer gas across the alveolar-capillary membrane.',['It measures respiratory rate.','It equals shunt fraction.','It is unrelated to membrane area.'],'Surface area, thickness, and gas properties influence diffusion.'],
['exercise effect','Exercise can reveal diffusion limitation by shortening capillary transit time.',['Exercise always lengthens transit time.','Diffusion limitation disappears during exercise.','Transit time has no role in equilibration.'],'Less time is available for gas equilibration.'],
['oxygen response','Supplemental oxygen can improve diffusion-limited hypoxemia by increasing the driving gradient.',['Oxygen removes the membrane barrier.','Diffusion limitation never responds to oxygen.','Oxygen lowers alveolar PO2.'],'Higher alveolar oxygen increases diffusion driving pressure.'],
['A-a gradient','Diffusion limitation can increase the A-a gradient.',['It always produces a normal A-a gradient.','The A-a gradient is independent of diffusion.','Diffusion limitation affects only venous blood.'],'Incomplete transfer lowers arterial PO2 relative to alveolar PO2.']]},
{id:'oxygen_content',title:'10. Hemoglobin, CaO2, and Oxygen Delivery',facts:[
['arterial oxygen content','Arterial oxygen content is dominated by hemoglobin-bound oxygen plus a small dissolved oxygen component.',['CaO2 equals PaO2 alone.','Hemoglobin is unrelated to oxygen content.','Respiratory rate is the main determinant of CaO2.'],'CaO2 ≈ 1.34 × Hb × SaO2 + 0.003 × PaO2.'],
['anemia','Anemia lowers oxygen content mainly by reducing hemoglobin concentration.',['Anemia always lowers PaO2 directly.','Anemia means ventilation is absent.','Anemia increases CaO2.'],'CaO2 may be low even when PaO2 and saturation are near normal.'],
['PaO2 versus CaO2','PaO2 measures dissolved oxygen pressure, whereas CaO2 measures total arterial oxygen content.',['They are always numerically identical.','CaO2 measures ventilation only.','PaO2 directly measures hemoglobin concentration.'],'Pressure and content are related but distinct.'],
['oxygen delivery','Oxygen delivery depends on cardiac output multiplied by arterial oxygen content.',['Delivery depends only on respiratory rate.','Cardiac output is irrelevant.','Oxygen content does not affect delivery.'],'DO2 integrates circulation and blood oxygen content.'],
['hemoglobin correction','Correcting severe anemia increases oxygen-carrying capacity even if PaO2 was already normal.',['Increasing hemoglobin lowers CaO2.','Transfusion directly increases alveolar ventilation.','Hemoglobin correction removes all V/Q mismatch.'],'Increasing Hb raises arterial oxygen content.']]},
{id:'integrated_disease',title:'11. Integrated Disease Physiology: PE, Pneumonia, Asthma, COPD',facts:[
['pulmonary embolism pattern','Pulmonary embolism primarily reduces perfusion and produces high V/Q or dead-space-like physiology.',['PE primarily increases perfusion.','PE always creates true shunt only.','PE is an isolated hemoglobin problem.'],'PE is a perfusion-deficit pattern.'],
['pneumonia pattern','Pneumonia often reduces ventilation in affected regions while perfusion persists, producing low V/Q or shunt-like physiology.',['Pneumonia always creates pure dead space.','Pneumonia increases ventilation without perfusion.','Pneumonia cannot alter oxygenation.'],'Alveolar filling reduces effective ventilation.'],
['asthma pattern','Asthma can cause regional airway obstruction and low V/Q.',['Asthma primarily eliminates perfusion.','Asthma always produces high V/Q only.','Asthma is unrelated to ventilation.'],'Obstructed regions receive less ventilation relative to perfusion.'],
['COPD pattern','COPD can produce mixed V/Q abnormalities through airway obstruction, emphysema, and increased dead space.',['COPD always produces one uniform V/Q value.','COPD affects only hemoglobin.','COPD cannot increase dead space.'],'COPD often contains both low- and high-V/Q regions.'],
['disease comparison','PE is predominantly a perfusion problem, whereas pneumonia and obstructive airway disease often reduce regional ventilation.',['PE and pneumonia have identical mechanisms.','All diseases are explained by anemia.','V/Q interpretation cannot distinguish disease patterns.'],'Comparing the primary V and Q disturbance supports physiologic interpretation.']]}
];

const STEMS=[
'Which statement best describes {concept} in {course}?',
'In {course}, which option is most accurate regarding {concept}?',
'In {course}, a student asks about {concept}. Which explanation is correct?',
'Which finding is most consistent with {concept} in {course}?',
'In {course}, which option avoids a common misconception about {concept}?',
'Select the best physiologic interpretation of {concept} in {course}.',
'For a clinical scenario in {course} involving {concept}, which statement is correct?',
'Which point should be emphasized when teaching {concept} in {course}?',
'Which statement belongs in the {course} unit regarding {concept}?',
'Which answer best connects {concept} to respiratory physiology in {course}?',
'During review of {course}, which statement about {concept} should be retained?',
'Which option correctly applies {concept} to gas exchange in {course}?',
'Which statement is compatible with {concept} in {course}?',
'Choose the most defensible explanation of {concept} in {course}.',
'Which statement would the teaching assistant mark as correct for {concept} in {course}?',
'Which explanation is appropriate for a learner reviewing {concept} in {course}?',
'Which answer correctly distinguishes {concept} from a distractor in {course}?',
'Which statement is physiologically consistent with {concept} in {course}?',
'Which course-specific statement best explains {concept} in {course}?',
'Which response should appear in feedback about {concept} in {course}?'
]
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function shuffle(arr,seed){const a=arr.slice();let s=seed||1;for(let i=a.length-1;i>0;i--){s=(s*1664525+1013904223)>>>0;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
const BANKS={};
function distractorRationale(choice,correct,explanation){
  const c=String(choice||'');
  let lead='This statement conflicts with the course-specific physiologic relationship.';
  if(/\b(always|never|only)\b/i.test(c)) lead='This option uses an absolute claim that is not physiologically valid.';
  else if(/identical|same as|equals/i.test(c)) lead='This option incorrectly treats two distinct physiologic variables or mechanisms as identical.';
  else if(/unrelated|independent|no effect|does not affect|never affects/i.test(c)) lead='This option incorrectly removes a causal relationship that is part of the lecture model.';
  else if(/absent|zero|infinite/i.test(c)) lead='This option incorrectly describes an extreme state rather than the stated physiologic condition.';
  return lead+' '+explanation+' Correct statement: '+correct;
}
COURSES.forEach(course=>{const bank=[];for(let i=0;i<100;i++){const fact=course.facts[i%course.facts.length];const stem=STEMS[Math.floor(i/course.facts.length)%STEMS.length].replaceAll('{concept}',fact[0]).replaceAll('{course}',course.title);const correct=fact[1];const choices=shuffle([correct,...fact[2]],hash(course.id+'-'+i));const answer=choices.indexOf(correct);const choiceRationales=choices.map((choice,index)=>index===answer?fact[3]:distractorRationale(choice,correct,fact[3]));bank.push({id:`${course.id}-${String(i+1).padStart(3,'0')}`,courseId:course.id,courseTitle:course.title,concept:fact[0],question:stem,choices,answer,explanation:fact[3],choiceRationales,difficulty:['basic','intermediate','advanced'][i%3]})}BANKS[course.id]=bank});
window.VQ_COURSE_QUESTION_BANK=BANKS;
window.VQ_COURSE_DEFINITIONS=COURSES;
window.VQ_COURSE_QUESTION_COUNT=Object.values(BANKS).reduce((n,arr)=>n+arr.length,0);

const STORE_PREFIX='VQ_TA_v151_history_';
const SESSION_PREFIX='VQ_TA_v151_sessions_';
const STUDENT_REGISTRY_KEY='VQ_TA_v151_student_registry';
let quiz=[],current=0,sessionAnswers={};
function profile(){return ($('v149StudentProfile')?.value||'Student-1').trim()||'Student-1'}
function keyForStudent(id){return STORE_PREFIX+id}
function sessionKey(id){return SESSION_PREFIX+id}
function key(){return keyForStudent(profile())}
function historyFor(id){try{return JSON.parse(localStorage.getItem(keyForStudent(id))||'{}')}catch(e){return {}}}
function history(){return historyFor(profile())}
function sessionsFor(id){try{return JSON.parse(localStorage.getItem(sessionKey(id))||'[]')}catch(e){return []}}
function studentRegistry(){try{return JSON.parse(localStorage.getItem(STUDENT_REGISTRY_KEY)||'[]')}catch(e){return []}}
function registerStudent(id){const clean=(id||'').trim();if(!clean)return;const list=studentRegistry();if(!list.includes(clean)){list.push(clean);list.sort((a,b)=>a.localeCompare(b));localStorage.setItem(STUDENT_REGISTRY_KEY,JSON.stringify(list))}refreshStudentProfiles()}
function saveHistory(h){try{localStorage.setItem(key(),JSON.stringify(h));registerStudent(profile())}catch(e){}}
function saveSession(id,record){try{const rows=sessionsFor(id);rows.unshift(record);localStorage.setItem(sessionKey(id),JSON.stringify(rows.slice(0,50)));registerStudent(id)}catch(e){}}
function priority(q,h){const r=h[q.id];if(!r)return 60;if(r.lastCorrect===false)return 120;return Math.max(5,25-(r.correct||0)*4)}
function weightedPick(pool,h,count){const avail=pool.slice(),out=[];while(out.length<count&&avail.length){const weights=avail.map(q=>priority(q,h));const total=weights.reduce((a,b)=>a+b,0);let r=Math.random()*total,idx=0;for(;idx<avail.length;idx++){r-=weights[idx];if(r<=0)break}out.push(avail.splice(Math.min(idx,avail.length-1),1)[0])}return out}
function buildQuiz(){const h=history();return COURSES.flatMap(c=>weightedPick(BANKS[c.id],h,2))}
function renderCourses(activeId){const el=$('v149CourseList');if(!el)return;el.innerHTML=COURSES.map(c=>`<div class="v149-course-item ${c.id===activeId?'active':''}"><strong>${c.title}</strong></div>`).join('')}
function renderMetrics(){/* visible metric cards intentionally omitted */}
function startQuiz(){registerStudent(profile());quiz=buildQuiz();current=0;sessionAnswers={};$('v149SessionSummary').hidden=true;$('v149WrongList').hidden=true;renderQuestion();renderMetrics();refreshStudentResults()}
function renderQuestionNavigator(){
  const nav=$('v187QuestionNav');if(!nav)return;
  if(!quiz.length){nav.innerHTML='';return}

  // v188: preserve the student's manual horizontal position.
  // v187 auto-centered the current button after every render, which made the
  // question-number scrollbar jump unexpectedly (especially on phones).
  const keepScrollLeft=nav.scrollLeft;

  nav.innerHTML=quiz.map((q,i)=>{const a=sessionAnswers[q.id];const state=a?'answered':'unanswered';const cur=i===current?' current':'';return `<button type="button" class="${state}${cur}" data-qindex="${i}" aria-label="Question ${i+1}${a?' answered':' unanswered'}" aria-current="${i===current?'true':'false'}" title="Question ${i+1}${a?' — answered':' — unanswered'}">${i+1}</button>`}).join('');

  nav.querySelectorAll('button[data-qindex]').forEach(b=>{
    b.onclick=()=>jumpTo(Number(b.dataset.qindex));
  });

  requestAnimationFrame(()=>{
    const maxLeft=Math.max(0,nav.scrollWidth-nav.clientWidth);
    nav.scrollLeft=Math.min(Math.max(0,keepScrollLeft),maxLeft);
  });
}
function jumpTo(index){if(!quiz.length)return;const i=Number(index);if(!Number.isInteger(i)||i<0||i>=quiz.length)return;current=i;renderQuestion()}
function renderQuestion(){if(!quiz.length){renderCourses();renderQuestionNavigator();return}const q=quiz[current],ans=sessionAnswers[q.id];renderCourses(q.courseId);$('v149QuestionMeta').textContent=`Question ${current+1} / ${quiz.length} · ${q.courseTitle} · ${q.difficulty}`;$('v149QuestionText').textContent=q.question;$('v149ProgressBar').style.width=`${((current+1)/quiz.length)*100}%`;$('v149Choices').innerHTML=q.choices.map((c,i)=>`<button class="v149-choice ${ans?(i===q.answer?'correct':(i===ans.selected&&!ans.correct?'wrong':'')):''}" data-index="${i}" ${ans?'disabled':''}>${String.fromCharCode(65+i)}. ${c}</button>`).join('');document.querySelectorAll('#v149Choices .v149-choice').forEach(b=>b.onclick=()=>answer(Number(b.dataset.index)));$('v149Feedback').textContent=ans?(ans.correct?'Correct.\n':'Incorrect.\n')+`Correct answer: ${String.fromCharCode(65+q.answer)}. ${q.choices[q.answer]}\n\nExplanation: ${q.explanation}\n\nChoice analysis:\n${q.choices.map((choice,i)=>`${String.fromCharCode(65+i)}. ${choice} — ${i===q.answer?'Correct':'Incorrect'}. ${q.choiceRationales[i]}`).join('\n')}`:'Select one answer, or use Previous / Next / a question number to answer in any order.';$('v149PrevBtn').disabled=current===0;$('v149NextBtn').disabled=current===quiz.length-1;$('v149FinishBtn').disabled=false;$('v149NextBtn').textContent='Next';renderQuestionNavigator()}
function answer(selected){const q=quiz[current];if(sessionAnswers[q.id])return;const correct=selected===q.answer;sessionAnswers[q.id]={selected,correct,courseId:q.courseId};const h=history(),r=h[q.id]||{attempts:0,correct:0,wrong:0};Object.assign(r,{questionId:q.id,courseId:q.courseId,courseTitle:q.courseTitle,concept:q.concept,question:q.question,correctAnswer:q.choices[q.answer],difficulty:q.difficulty,lastSelected:selected,lastSelectedText:q.choices[selected],lastCorrect:correct,lastAnsweredAt:new Date().toISOString()});r.attempts++;if(correct)r.correct++;else r.wrong++;h[q.id]=r;saveHistory(h);renderMetrics();renderQuestion();refreshStudentResults()}
function next(){if(!quiz.length||current>=quiz.length-1)return;current++;renderQuestion()}
function previous(){if(!quiz.length||current<=0)return;current--;renderQuestion()}
function finish(){if(!quiz.length)return;const answered=Object.keys(sessionAnswers).length,correct=Object.values(sessionAnswers).filter(a=>a.correct).length,wrong=quiz.filter(q=>sessionAnswers[q.id]&&!sessionAnswers[q.id].correct);const perRows=COURSES.map(c=>{const qs=quiz.filter(q=>q.courseId===c.id);const a=qs.filter(q=>sessionAnswers[q.id]);const ok=a.filter(q=>sessionAnswers[q.id].correct).length;return {courseId:c.id,courseTitle:c.title,correct:ok,answered:a.length}});const per=perRows.map(r=>`${r.courseTitle}: ${r.correct}/${r.answered}`).join('<br>');$('v149SessionSummary').hidden=false;$('v149SessionSummary').innerHTML=`<strong>Session summary — ${escapeHtml(profile())}</strong><br>Answered: ${answered}/${quiz.length} · Correct: ${correct} · Incorrect: ${wrong.length}<hr>${per}`;$('v149WrongList').hidden=false;$('v149WrongList').innerHTML=wrong.length?`<h4>Incorrect items to review (${wrong.length})</h4>`+wrong.map(q=>`<div class="v149-wrong-item"><strong>${escapeHtml(q.courseTitle)}</strong><br>${escapeHtml(q.question)}<br><em>Correct: ${escapeHtml(q.choices[q.answer])}</em><br>${escapeHtml(q.explanation)}</div>`).join(''):'<h4>No incorrect items in the answered questions.</h4>';saveSession(profile(),{finishedAt:new Date().toISOString(),answered,correct,incorrect:wrong.length,total:quiz.length,perCourse:perRows,questionIds:quiz.map(q=>q.id),wrongIds:wrong.map(q=>q.id)});const panel=$('v152StudentResultsPanel');if(panel)panel.open=true;refreshStudentResults()}

function escapeHtml(v){return String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function studentSummary(id){const h=historyFor(id),records=Object.values(h);const attempts=records.reduce((s,r)=>s+(r.attempts||0),0),correct=records.reduce((s,r)=>s+(r.correct||0),0),wrong=records.reduce((s,r)=>s+(r.wrong||0),0);const byCourse={};COURSES.forEach(c=>byCourse[c.id]={title:c.title,attempts:0,correct:0,wrong:0,items:0});records.forEach(r=>{const c=byCourse[r.courseId];if(c){c.attempts+=r.attempts||0;c.correct+=r.correct||0;c.wrong+=r.wrong||0;c.items++}});const missed=records.filter(r=>(r.wrong||0)>0).sort((a,b)=>String(b.lastAnsweredAt||'').localeCompare(String(a.lastAnsweredAt||'')));const latest=sessionsFor(id)[0]||null;return {id,records,attempts,correct,wrong,accuracy:attempts?correct/attempts*100:0,byCourse,missed,latest}}
function refreshStudentProfiles(){
  const all=studentRegistry();
  const datalist=$('v151StudentProfiles');
  if(datalist)datalist.innerHTML=all.map(id=>`<option value="${escapeHtml(id)}"></option>`).join('');
  return all;
}
function latestQuizLine(s){const latest=s.latest;return latest?`${latest.correct}/${latest.total||latest.answered} correct · ${new Date(latest.finishedAt).toLocaleString()}`:'No completed quiz yet.'}
function renderCurrentStudentRecord(){
  const root=$('v152CurrentStudentRecord');if(!root)return;
  const id=profile();const s=studentSummary(id);const sessions=sessionsFor(id);
  if(!sessions.length){root.innerHTML=`<div class="v152-current-record"><h4>Current Student: ${escapeHtml(id)}</h4><p>No completed quiz yet. This Student ID will keep a separate answer history after the quiz is finished.</p></div>`;return}
  root.innerHTML=`<div class="v152-current-record"><h4>Current Student: ${escapeHtml(id)}</h4><div class="v152-current-metrics"><span><b>${sessions.length}</b> completed quizzes</span><span><b>${s.correct}</b> correct</span><span><b>${s.wrong}</b> incorrect</span><span><b>${s.accuracy.toFixed(1)}%</b> cumulative accuracy</span></div><p><strong>Latest completed quiz:</strong> ${escapeHtml(latestQuizLine(s))}</p></div>`;
}
function refreshStudentResults(){refreshStudentProfiles();renderCurrentStudentRecord()}

const DEFAULTS={VT:500,VD:150,f:15,FIO2:.21,Altitude:0,VO2:300,R:.8,Hb:15,QT:5.5,Shunt:0,DLO2:32};
const PRESETS={normal:{},lowvq:{VT:350,VD:180,f:32,Shunt:.08},highvq:{VT:650,VD:280,f:18,QT:3.4,Shunt:.02},pe:{VT:650,VD:300,f:20,QT:3.2,Shunt:.02},pneumonia:{VT:320,VD:150,f:18,Shunt:.18},shunt:{Shunt:.50},diffusion:{DLO2:8,VT:500,f:14},anemia:{Hb:8},altitude:{Altitude:3000,FIO2:.21,f:18}};
function num(id,def){const v=parseFloat($(id)?.value);return Number.isFinite(v)?v:def}
function pb(alt){return 760*Math.exp(-Math.max(alt,0)/7000)}
function sat(po2){return clamp(100/(1+Math.pow(26.8/Math.max(po2,1),2.7)),0,99.8)}
function o2content(po2,hb){return 1.34*hb*(sat(po2)/100)+.003*Math.max(po2,0)}
function co2content(pco2){return 40+pco2*.20}
function ph(pco2){return clamp(7.40-Math.log(Math.max(pco2,1)/40)/Math.log(10)*.65,6.65,7.65)}
function readModel(){return {VT:num('v149_VT',500),VD:num('v149_VD',150),f:num('v149_f',12),FIO2:num('v149_FIO2',.21),Altitude:num('v149_Altitude',0),VO2:num('v149_VO2',250),R:num('v149_R',.8),Hb:num('v149_Hb',15),QT:num('v149_QT',5),Shunt:clamp(num('v149_Shunt',.05),0,.8),DLO2:num('v149_DLO2',32)}}
function calcModel(){const s=readModel(),Pb=pb(s.Altitude),PIO2=s.FIO2*Math.max(Pb-47,1),VA=Math.max((s.VT-s.VD)*s.f/1000,.05),VE=s.VT*s.f/1000,VCO2=s.VO2*s.R,PACO2=(VCO2*.863)/VA,PAO2=Math.max(0,PIO2-PACO2/Math.max(s.R,.05));const preset=$('v149ScenarioPreset').value;let mismatch=0;if(['lowvq','pneumonia'].includes(preset))mismatch=20;if(['highvq','pe'].includes(preset))mismatch=12;if(preset==='diffusion')mismatch+=Math.max(0,32-s.DLO2)*1.2;let artPO2=Math.max(0,PAO2-2-mismatch-s.Shunt*65);let artPCO2=PACO2+s.Shunt*8;const mvPO2=40-(s.VO2/Math.max(s.QT,1)-50)*.05;const mvPCO2=46+(s.VO2/Math.max(s.QT,1)-50)*.04;const endPO2=Math.max(5,PAO2-Math.max(0,32-s.DLO2)*.55);const endPCO2=PACO2;return {s,VE,VA,PACO2,PIO2,PAO2,artPO2,artPCO2,mvPO2,mvPCO2,endPO2,endPCO2,preset}}
function set(id,v){const e=$(id);if(e)e.textContent=v}
function updateModel(){
  // v206.7: the Hopkins-reference engine is the ONLY writer of lung numerical outputs.
  // Legacy v153 math is retained only as archival code above and must never update the UI.
  if(typeof window.VQ_LUNG_CALCULATE_HOPKINS==='function') return window.VQ_LUNG_CALCULATE_HOPKINS();
  return null;
}
function applyPreset(){if(typeof window.VQ_LUNG_APPLY_PRESET_HOPKINS==='function')return window.VQ_LUNG_APPLY_PRESET_HOPKINS($('v149ScenarioPreset').value);const p=PRESETS[$('v149ScenarioPreset').value]||{};Object.entries(DEFAULTS).forEach(([k,v])=>{const e=$('v149_'+k);if(e)e.value=(k in p)?p[k]:v});updateModel()}
function resetModel(){if(typeof window.VQ_LUNG_APPLY_PRESET_HOPKINS==='function')return window.VQ_LUNG_APPLY_PRESET_HOPKINS('normal');Object.entries(DEFAULTS).forEach(([k,v])=>{const e=$('v149_'+k);if(e)e.value=v});$('v149ScenarioPreset').value='normal';updateModel()}

function init(){
  renderCourses();renderMetrics();
  registerStudent(profile());
  $('v149StudentProfile')?.addEventListener('change',()=>{registerStudent(profile());refreshStudentResults()});
  $('v149StartQuizBtn').onclick=startQuiz;
  $('v149ClearHistoryBtn').onclick=()=>{if(confirm(`Clear answer history for ${profile()}?`)){localStorage.removeItem(key());localStorage.removeItem(sessionKey(profile()));refreshStudentResults();startQuiz()}};
  $('v149NextBtn').onclick=next;$('v149PrevBtn').onclick=previous;$('v149FinishBtn').onclick=finish;
  // v192: numeric fields are committed only when Start / Calculate is pressed; the final v192 bridge owns the coupled calculation.
  // A dedicated cross-platform calculation bridge loaded last owns the Calculate button
  // so iPhone, Android, and Windows all commit the focused value before recalculating.
  $('v149CalculateBtn').onclick=null;$('v149ApplyPresetBtn').onclick=applyPreset;$('v149ResetModelBtn').onclick=resetModel;
  updateModel();
  refreshStudentResults();
  console.info('VQ TA loaded:',BUILD,'lecture-aligned courses',COURSES.length,'items',COURSES.length*100,'quiz',COURSES.length*2);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
