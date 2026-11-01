(function(){
'use strict';
const ACTIVE_KEY='VQ_V241_ACTIVE_COURSE_ID';
const READY_NOTICE='VQ_V241_COURSE_READY';
const PENDING_KEY='VQ_V241_PENDING_COURSE_STAGE';
const DRAFT_KEY='current';
const $=id=>document.getElementById(id);
let manifest=null,inspection=null,legacyAnswer=null,legacyCaseHTML='',quizState=null,adapterInstalled=false,draft=null,uploading=false,polling=false;

function dbOpen(){return new Promise((resolve,reject)=>{if(!window.indexedDB){reject(new Error('This browser does not support resumable file storage.'));return;}const r=indexedDB.open('VQCourseUpload',1);r.onupgradeneeded=()=>r.result.createObjectStore('drafts');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
async function draftIO(mode,value){const db=await dbOpen();return new Promise((resolve,reject)=>{const tx=db.transaction('drafts',mode),r=mode==='readonly'?tx.objectStore('drafts').get(DRAFT_KEY):tx.objectStore('drafts').put(value,DRAFT_KEY);let result;r.onsuccess=()=>{result=r.result;};r.onerror=()=>reject(r.error);tx.oncomplete=()=>{db.close();resolve(result);};tx.onerror=()=>{db.close();reject(tx.error);};});}
async function saveDraft(){if(draft)await draftIO('readwrite',draft);}
function newId(){return window.crypto&&crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);}
function pendingStage(){try{return localStorage.getItem(PENDING_KEY)||'';}catch(_){return '';}}
function setPending(v){try{if(v)localStorage.setItem(PENDING_KEY,v);else localStorage.removeItem(PENDING_KEY);}catch(_){}}

function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function modelKey(){const s=$('localModelSelect');return (s&&s.value)||'gemma';}
function cloudCfg(){try{return (window.VQ_getCloudConfig&&window.VQ_getCloudConfig())||{provider:'off',apiKey:''};}catch(_){return {provider:'off',apiKey:''};}}
function qLang(q){try{return String((window.VQ_resolveInputLanguage&&window.VQ_resolveInputLanguage(String(q||''),null))||(window.VQ_detectLanguage&&window.VQ_detectLanguage(String(q||'')))||'en-US');}catch(_){return 'en-US';}}
function setBuildStatus(text,kind){const el=$('v241BuildStatus');if(!el)return;el.textContent=String(text||'');el.className='v241-status'+(kind?' v241-'+kind:'');}
function setMeter(name,value,label){const wrap=$('v241WorkProgress'),row=$('v241Meter'+name),bar=$('v241Bar'+name),detail=$('v241Label'+name);if(!wrap||!row)return;wrap.hidden=false;row.hidden=false;bar.value=Math.max(0,Math.min(100,Number(value)||0));detail.textContent=String(label||Math.round(bar.value)+'%');}
function resetMeters(){const wrap=$('v241WorkProgress');if(wrap)wrap.hidden=true;for(const name of ['Upload','Activate','Lectures','Questions','Index']){const row=$('v241Meter'+name);if(row)row.hidden=true;}}
function activeId(){try{return localStorage.getItem(ACTIVE_KEY)||'';}catch(_){return '';}}
function setActiveId(v){try{if(v)localStorage.setItem(ACTIVE_KEY,v);else localStorage.removeItem(ACTIVE_KEY);}catch(_){}applyVisualModule();}

function injectBuilder(){
  const app=document.querySelector('.app'),title=app&&app.querySelector('.title');if(!app||!title||$('v241CourseBuilder'))return;
  title.id=title.id||'appTitle';
  const wrap=document.createElement('section');wrap.id='v241CourseBuilder';wrap.className='v241-course-builder';
  wrap.innerHTML=`<div class="v241-head"><div><h2>Build a Course</h2><div class="v241-sub">Upload course PDFs to detect chapters, prepare lecture scripts, build course Q&amp;A, and prepare practice questions.</div></div><span class="v241-course-badge" id="v241ActiveBadge">Built-in Physiology</span></div>
  <div class="v241-grid">
    <div class="v241-field"><label for="v241CourseName">Course Name</label><input id="v241CourseName" type="text" placeholder="e.g. Biochemistry"></div>
    <div class="v241-field v241-pdf-field"><label for="v241PdfFiles">Course Materials (PDF)</label><input id="v241PdfFiles" type="file" accept="application/pdf,.pdf" multiple></div>
  </div>
  <div class="v241-actions"><button type="button" class="v241-primary" id="v241InspectBtn">Upload &amp; Inspect Course Materials</button><button type="button" id="v241BuildBtn" disabled>Build Teaching Assistant</button><button type="button" id="v241RetryPrep" hidden>Retry Background Preparation</button></div>
  <div class="v241-status" id="v241BuildStatus" role="status" aria-live="polite">Select searchable PDFs, inspect the teaching units, then build. Course Q&amp;A opens after extraction; reviewed exam-style questions become playable as soon as two per unit are ready.</div>
  <div class="v241-meters" id="v241WorkProgress" hidden><div id="v241MeterUpload" hidden><span>PDF upload</span><span id="v241LabelUpload"></span><progress id="v241BarUpload" max="100" value="0"></progress></div><div id="v241MeterActivate" hidden><span>Course activation</span><span id="v241LabelActivate"></span><progress id="v241BarActivate" max="100" value="0"></progress></div><div id="v241MeterLectures" hidden><span>Traditional Chinese scripts</span><span id="v241LabelLectures"></span><progress id="v241BarLectures" max="100" value="0"></progress></div><div id="v241MeterQuestions" hidden><span>Practice readiness</span><span id="v241LabelQuestions"></span><progress id="v241BarQuestions" max="100" value="0"></progress></div><div id="v241MeterIndex" hidden><span>Semantic search</span><span id="v241LabelIndex"></span><progress id="v241BarIndex" max="100" value="0"></progress></div></div>
  <div class="v241-unit-wrap" id="v241UnitWrap" hidden><div class="v241-unit-title">Teaching units found — confirm or rename them before building</div><div class="v241-unit-toolbar"><div class="v241-unit-summary" id="v241UnitSummary"></div><div class="v241-unit-buttons"><button type="button" id="v241SelectAll">Select all</button><button type="button" id="v241ClearAll">Clear all</button></div></div><div class="v241-unit-list" id="v241UnitList"></div></div>
  <div class="v241-active"><div class="v241-field"><label for="v241ExistingCourses">Currently teaching</label><select class="v241-active-select" id="v241ExistingCourses"><option value="">Built-in Respiratory Physiology (default)</option></select></div><div class="v241-actions" style="margin:0"><button type="button" id="v241DeleteCourse" disabled>Delete selected course</button></div></div><div class="v241-sub">Select a saved course to teach or delete it when it is no longer needed. The built-in course cannot be deleted.</div>`;
  title.insertAdjacentElement('afterend',wrap);
  $('v241InspectBtn').addEventListener('click',inspectCourse);
  $('v241BuildBtn').addEventListener('click',buildCourse);
  $('v241DeleteCourse').addEventListener('click',deleteSelectedCourse);
  $('v241RetryPrep').addEventListener('click',retryPreparation);
  $('v241SelectAll').addEventListener('click',()=>selectAllUnits(true));
  $('v241ClearAll').addEventListener('click',()=>selectAllUnits(false));
  $('v241ExistingCourses').addEventListener('change',e=>{setActiveId(String(e.target.value||''));location.reload();});
}

async function inspectCourse(){
  const files=[...(($('v241PdfFiles')||{}).files||[])];
  if(draft&&draft.phase==='uploading'&&draft.files&&draft.files.length&&(!files.length||files.length===draft.files.length&&files.every((f,i)=>f.name===draft.files[i].file.name&&f.size===draft.files[i].file.size))){try{await resumeUpload();}catch(e){setBuildStatus('Upload paused: '+String(e.message||e)+'. Try again after checking the connection.','error');}return;}
  if(!files.length){setBuildStatus('Select at least one PDF before inspection.','error');return;}
  const btn=$('v241InspectBtn');btn.disabled=true;inspection=null;$('v241BuildBtn').disabled=true;$('v241UnitWrap').hidden=true;
  try{
    resetMeters();draft={stageId:newId(),courseName:String(($('v241CourseName')||{}).value||''),files:files.map(f=>({file:f,id:newId()})),nextIndex:0,phase:'uploading',selections:{}};
    await saveDraft();setPending(draft.stageId);await resumeUpload();
  }catch(e){setBuildStatus('Upload paused: '+String(e&&e.message||e)+'. Refresh to resume, or select the PDFs again.','error');btn.disabled=false;}
}
async function resumeUpload(){
  if(!draft||uploading||draft.phase!=='uploading')return;uploading=true;$('v241InspectBtn').disabled=true;
  try{
    const allBytes=draft.files.reduce((sum,x)=>sum+x.file.size,0);let previousBytes=draft.files.slice(0,draft.nextIndex).reduce((sum,x)=>sum+x.file.size,0);
    for(let i=draft.nextIndex;i<draft.files.length;i++){
      const item=draft.files[i],file=item.file,base='/api/reference/course-upload-status?stage_id='+encodeURIComponent(draft.stageId)+'&upload_id='+encodeURIComponent(item.id);
      const s=await fetch(base,{cache:'no-store'}),state=await s.json();if(!s.ok||!state.ok)throw new Error(state.error||'Upload status unavailable');let offset=Number(state.offset||0);
      setMeter('Upload',100*(previousBytes+offset)/allBytes,Math.round(100*(previousBytes+offset)/allBytes)+'% · '+(i+1)+' / '+draft.files.length+' PDFs');
      if(state.complete){inspection=state.inspection;draft.nextIndex=i+1;previousBytes+=file.size;await saveDraft();continue;}
      while(offset<file.size){
        const end=Math.min(offset+1024*1024,file.size),fd=new FormData();fd.append('stage_id',draft.stageId);fd.append('upload_id',item.id);fd.append('file_name',file.name);fd.append('total_size',String(file.size));fd.append('offset',String(offset));fd.append('course_name',draft.courseName);fd.append('chunk',file.slice(offset,end),file.name);
        setBuildStatus(end===file.size?'PDF '+(i+1)+' / '+draft.files.length+' uploaded; inspecting teaching units…':'Uploading PDF '+(i+1)+' / '+draft.files.length+': '+file.name+' · '+Math.round(100*offset/file.size)+'%. You may refresh; upload resumes from the saved chunk.');
        let response,data;try{response=await fetch('/api/reference/course-upload-chunk',{method:'POST',body:fd,cache:'no-store'});data=await response.json();}catch(e){const check=await fetch(base,{cache:'no-store'}).then(r=>r.json());if(check.offset>offset||check.complete){data=check;}else throw e;}
        if(!data.ok||(!response?.ok&&response))throw new Error(data.detail||data.error||'Upload HTTP '+(response&&response.status));
        offset=Number(data.offset);if(data.inspection)inspection=data.inspection;
        setMeter('Upload',100*(previousBytes+offset)/allBytes,Math.round(100*(previousBytes+offset)/allBytes)+'% · '+(i+1)+' / '+draft.files.length+' PDFs');
      }
      draft.nextIndex=i+1;previousBytes+=file.size;await saveDraft();
    }
    if(!inspection){const r=await fetch('/api/reference/course-stage-status?stage_id='+encodeURIComponent(draft.stageId),{cache:'no-store'}),d=await r.json();if(!r.ok||!d.inspection)throw new Error('The server has not finished inspecting the staged PDFs. Refresh to retry.');inspection=d.inspection;}
    draft.phase='inspected';draft.inspection=inspection;draft.files=[];await saveDraft();
    if(!$('v241CourseName').value)$('v241CourseName').value=inspection.course_name||'';renderInspection();
    setMeter('Upload',100,'Upload and chapter inspection complete');setBuildStatus('Upload complete. Review the teaching units, then build. Your upload and selections are saved across refreshes.','ok');$('v241BuildBtn').disabled=false;setPending('');
  }finally{uploading=false;$('v241InspectBtn').disabled=false;}
}
function renderInspection(){
  const list=$('v241UnitList'),wrap=$('v241UnitWrap'),summary=$('v241UnitSummary');if(!list||!inspection)return;wrap.hidden=false;list.innerHTML='';
  const units=inspection.units||[];
  units.forEach((u,i)=>{const row=document.createElement('div');row.className='v241-unit-row';row.dataset.unitId=u.id;const saved=draft&&draft.selections&&draft.selections[u.id];row.innerHTML=`<input class="v241-unit-check" type="checkbox" ${!saved||saved.enabled?'checked':''} aria-label="Include unit ${i+1}"><input class="v241-unit-name" type="text" value="${esc(saved?saved.title:u.title)}" aria-label="Unit title"><span class="v241-unit-meta" title="${esc(u.source_title)}">${esc(u.source_title)} · pp. ${u.start_page}–${u.end_page}${u.needs_review?' · review boundaries':''}</span>`;list.appendChild(row);});
  list.onchange=saveSelections;list.oninput=e=>{if(e.target.classList.contains('v241-unit-name'))saveSelections();};updateSelectionSummary();
}
function updateSelectionSummary(){const el=$('v241UnitSummary');if(!el||!inspection)return;const total=(inspection.units||[]).length,selected=selectedUnits().length;el.textContent=selected+' / '+total+' units selected · '+(selected*100)+' complete evidence questions will be prepared.';}
function saveSelections(){updateSelectionSummary();if(!draft)return;draft.selections={};for(const row of document.querySelectorAll('#v241UnitList .v241-unit-row'))draft.selections[row.dataset.unitId]={enabled:row.querySelector('.v241-unit-check').checked,title:row.querySelector('.v241-unit-name').value};saveDraft().catch(e=>setBuildStatus('Could not save unit selection: '+String(e.message||e),'error'));}
function selectAllUnits(checked){for(const box of document.querySelectorAll('#v241UnitList .v241-unit-check'))box.checked=checked;saveSelections();}
function selectedUnits(){return [...document.querySelectorAll('#v241UnitList .v241-unit-row')].filter(r=>r.querySelector('.v241-unit-check').checked).map(r=>({id:r.dataset.unitId,title:String(r.querySelector('.v241-unit-name').value||'').trim()}));}
async function buildCourse(){
  if(!inspection){setBuildStatus('Inspect the uploaded PDFs first.','error');return;}const units=selectedUnits();if(!units.length){setBuildStatus('Select at least one chapter/unit.','error');return;}
  const body={stage_id:inspection.stage_id,course_name:String($('v241CourseName').value||inspection.course_name||'Uploaded Course').trim(),units,model_key:modelKey()};
  $('v241BuildBtn').disabled=true;setMeter('Activate',0,'Extracting course material');setBuildStatus('Extracting selected units for course Q&A. You may refresh; the server continues the build.');
  try{
    if(draft){draft.phase='building';draft.buildBody=body;await saveDraft();setPending(draft.stageId);}
    let r=await fetch('/api/reference/course-build',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),cache:'no-store'}),d=await r.json().catch(()=>({}));
    if(!r.ok||!d.ok)throw new Error(d.detail||d.error||('Build request HTTP '+r.status));
    await pollBuild(d.job.id);
  }catch(e){setBuildStatus('Could not reconnect to the course build: '+String(e&&e.message||e)+'. Refresh to reconnect.','error');$('v241BuildBtn').disabled=false;}
}
async function pollBuild(jid){
  if(polling)return;polling=true;
  try{
  for(;;){
    const r=await fetch('/api/reference/course-job-status?id='+encodeURIComponent(jid),{cache:'no-store'}),d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||('HTTP '+r.status));
    setBuildStatus('Building course: '+String(d.progress||0)+'%\n'+String(d.message||'Working…'));
    setMeter('Activate',d.progress||0,String(d.message||'Extracting material'));
    if(d.status==='done'){
      const cid=d.result&&d.result.course_id;if(!cid)throw new Error('Build completed without a course ID.');
      setActiveId(cid);setPending('');if(draft){draft.phase='active';draft.files=[];await saveDraft();}try{sessionStorage.setItem(READY_NOTICE,'Course Q&A is active. Exam-style questions can be drawn as soon as two per unit pass review.');}catch(_){}
      location.reload();return;
    }
    if(d.status==='error'){
      setBuildStatus('Course build stopped at '+String(d.progress||0)+'% ('+String(d.phase||'processing')+').\n'+String(d.error||d.message||'Unknown backend error')+'\nThe uploaded PDFs remain selected; you can retry after correcting this cause.','error');
      $('v241BuildBtn').disabled=false;return;
    }
    await new Promise(res=>setTimeout(res,2000));
  }
  }finally{polling=false;}
}

async function loadCourseList(){
  const sel=$('v241ExistingCourses');if(!sel)return;
  try{const r=await fetch('/api/reference/course-list',{cache:'no-store'}),d=await r.json();if(!r.ok||!d.ok)throw new Error(d.error||('HTTP '+r.status));const current=activeId();sel.innerHTML='<option value="">Built-in Respiratory Physiology (default)</option>'+(d.courses||[]).map(c=>`<option value="${esc(c.course_id)}">${esc(c.course_name)} · ${Number(c.unit_count||0)} units · ${esc(c.course_id.slice(-8))}</option>`).join('');if(current&&![...sel.options].some(x=>x.value===current)){setActiveId('');setBuildStatus('The previous course is unavailable. Built-in Respiratory Physiology is active.','error');}sel.value=activeId();const del=$('v241DeleteCourse');if(del)del.disabled=!sel.value;}catch(e){setBuildStatus('Could not update the course list: '+String(e&&e.message||e),'error');}
}
async function deleteSelectedCourse(){
  const sel=$('v241ExistingCourses'),cid=String(sel&&sel.value||'');if(!cid)return;
  const label=sel.options[sel.selectedIndex].text;
  if(!window.confirm('Permanently delete this uploaded course and its PDFs, question bank and quiz statistics?\n'+label))return;
  const btn=$('v241DeleteCourse');btn.disabled=true;
  try{const r=await fetch('/api/reference/course-delete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({course_id:cid}),cache:'no-store'}),d=await r.json().catch(()=>({}));if(!r.ok||!d.ok)throw new Error(d.detail||d.error||('HTTP '+r.status));if(activeId()===cid){setActiveId('');location.reload();return;}await loadCourseList();setBuildStatus('Deleted '+label+'.','ok');}
  catch(e){setBuildStatus('Course deletion failed: '+String(e&&e.message||e),'error');btn.disabled=false;}
}
async function loadManifest(cid){
  if(!cid){manifest=null;applyVisualModule();return;}
  try{/* R11: servers that prepare one course at a time resume the selected course; older servers fall back to the status read. */let r=await fetch('/api/reference/course-activate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({course_id:cid,model_key:modelKey()}),cache:'no-store'}).catch(()=>null);if(!r||[404,405,501].includes(r.status))r=await fetch('/api/reference/course-status?course_id='+encodeURIComponent(cid),{cache:'no-store'});const d=await r.json();if(!r.ok||!d.ok)throw new Error(d.error||'course unavailable');manifest=d.manifest;applyManifest();}catch(e){setActiveId('');manifest=null;applyVisualModule();setBuildStatus('Could not load selected course: '+String(e&&e.message||e)+'. Built-in course is active.','error');}
}
function applyManifest(){
  if(!manifest)return;setActiveId(manifest.course_id);const title=$('appTitle')||document.querySelector('.app .title');if(title)title.textContent=manifest.course_name+' Virtual Human TA';const badge=$('v241ActiveBadge');if(badge)badge.textContent=manifest.course_name;
  // The existing lecture/voice controller owns the capture-phase click event.
  // Feed it the selected uploaded unit so highlighting, pause and resume all
  // use the same script as the current course.
  window.VQ_getActiveCourseLecture=id=>(manifest.units||[]).find(u=>u.id===id)||null;
  const sel=$('v241ExistingCourses');if(sel)sel.value=manifest.course_id;
  const lesson=$('lessonSelect');if(lesson){lesson.innerHTML=(manifest.units||[]).map((u,i)=>`<option value="${esc(u.id)}">Unit ${i+1}: ${esc(u.title)}</option>`).join('');lesson.onchange=()=>{showSelectedLectureIntro();const u=currentUnit();if(u&&u.script_status!=='ready')prioritizeUnit('lectures',u.id);};showSelectedLectureIntro();}
  applyVisualModule();installDynamicCase();installAnswerAdapter();
  showPreparation();
}
function quizUnits(){if(!manifest)return [];const scope=String(($('v241QuizUnit')||{}).value||'ready'),per=quizCount();return (manifest.units||[]).filter(u=>Number(u.question_count||0)>=per&&(scope==='ready'||u.id===scope));}
function quizReady(){return !!manifest&&manifest.question_generation==='exam-mcq-v5'&&quizUnits().length>0;}
function showPreparation(){
  if(!manifest)return;const prep=manifest.preparation||{},q=prep.questions||{},lecture=prep.lectures||{},idx=prep.index||{},retry=$('v241RetryPrep');if(retry)retry.hidden=q.status!=='error'&&lecture.status!=='error'&&idx.status!=='error';
  const count=$('v241QuizCount');if(count){const available=Math.max(0,...(manifest.units||[]).map(u=>Number(u.question_count||0)));[...count.options].forEach(o=>o.disabled=Number(o.value)>available);}
  const scope=$('v241QuizUnit');if(scope){const selected=scope.value||'ready',ready=(manifest.units||[]).filter(u=>Number(u.question_count||0)>=quizCount()).length;scope.innerHTML=`<option value="ready">All ready units (${ready})</option>`+(manifest.units||[]).map((u,i)=>`<option value="${esc(u.id)}">${i+1}. ${esc(u.title)} (${Number(u.question_count||0)} questions)</option>`).join('');scope.value=selected;}
  const btn=$('v241StartQuiz');if(btn&&!btn.dataset.loading){btn.disabled=!quizReady();btn.textContent=quizReady()?'Start '+(quizCount()*quizUnits().length)+'-Question Quiz':'Waiting for reviewed questions';}
  const expand=$('v241ExpandQuiz'),chosen=(manifest.units||[]).find(u=>u.id===(scope&&scope.value));if(expand){expand.disabled=!chosen||Number(chosen.question_count||0)>=100||(Number(chosen.question_source_count||0)>0&&Number(chosen.question_processed_count||0)>=Number(chosen.question_source_count||0));expand.title=chosen?'Build additional reviewed questions for this unit':'Select one unit to build more questions';}
  const names=$('v241QuizUnits');if(names)names.innerHTML=(manifest.units||[]).map((u,i)=>`<div class="v241-case-unit">${i+1}. ${esc(u.title)}</div>`).join('');
  const body=$('v241QuizBody');if(body&&!body.dataset.error&&!quizState&&!(btn&&btn.dataset.loading))body.textContent=quizReady()?(q.status==='error'?'Ready units can be practised now. Further preparation stopped: '+String(q.error||'Unknown error')+'. Use Retry Background Preparation to add more.':'Choose one ready unit or all ready units and start now. Other chapters continue preparing in the background.'):q.status==='error'?'Question bank preparation stopped: '+String(q.error||'Unknown error')+'. Ready units remain available.':'Course Q&A is active. Practice questions are being prepared by chapter.';
  if(lecture.status)setMeter('Lectures',lecture.status==='ready'?100:100*Number(lecture.completed_units||0)/Math.max(1,Number(lecture.total_units||1)),String(lecture.message||'Preparing Chinese scripts'));
  if(q.status)setMeter('Questions',q.status==='ready'?100:100*Number(q.ready_units||0)/Math.max(1,(manifest.units||[]).length),q.status==='ready'?'Practice ready':q.status==='error'?'Preparation paused; ready chapters remain available':'Preparing practice questions');
  if(idx.status)setMeter('Index',idx.status==='ready'?100:100*Number(idx.completed||0)/Math.max(1,Number(idx.total||1)),String(idx.message||'Preparing semantic search'));
  showSelectedLectureIntro();
  if(draft&&(draft.phase==='uploading'||draft.phase==='building'))return;
  if(q.status!=='ready'||lecture.status!=='ready'||idx.status!=='ready')setBuildStatus('Course Q&A active. '+(quizReady()?'Practice ready. ':'Preparing practice questions. ')+(lecture.status==='ready'?'Chinese scripts ready. ':lecture.status==='error'?'Chinese script needs a retry. ':'Chinese scripts preparing. ')+(idx.status==='ready'?'Semantic search ready.':idx.status==='error'?'Course text search active; semantic search needs a retry.':'Course text search active; semantic enhancement running.'),q.status==='error'||lecture.status==='error'?'error':'ok');
  else setBuildStatus('Course ready. Chinese scripts, question bank, and semantic search are available.','ok');
}
async function retryPreparation(){if(!manifest)return;const b=$('v241RetryPrep');b.disabled=true;try{const r=await fetch('/api/reference/course-retry-preparation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({course_id:manifest.course_id,model_key:modelKey()}),cache:'no-store'}),d=await r.json();if(!r.ok||!d.ok)throw new Error(d.detail||d.error||'Retry failed');manifest=d.manifest;showPreparation();}catch(e){setBuildStatus('Could not restart preparation: '+String(e&&e.message||e),'error');}finally{b.disabled=false;}}
async function expandQuizUnit(){const selected=$('v241QuizUnit'),id=selected&&selected.value,btn=$('v241ExpandQuiz');if(!manifest||!id||id==='ready'||!btn)return;btn.disabled=true;try{const r=await fetch('/api/reference/course-expand-questions',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({course_id:manifest.course_id,unit_ids:[id],model_key:modelKey()}),cache:'no-store'}),d=await r.json();if(!r.ok||!d.ok)throw new Error(d.error||d.detail||'Could not request more questions');manifest=d.manifest;showPreparation();}catch(e){setBuildStatus('Could not expand this unit: '+String(e&&e.message||e),'error');}finally{showPreparation();}}
async function prioritizeUnit(kind,unitId){if(!manifest||!unitId)return;try{const r=await fetch('/api/reference/course-prioritize-unit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({course_id:manifest.course_id,unit_id:unitId,kind,model_key:modelKey()}),cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);}catch(e){setBuildStatus('Could not prioritize this unit: '+String(e&&e.message||e),'error');}}
async function refreshPreparation(){if(!manifest)return;try{const r=await fetch('/api/reference/course-status?course_id='+encodeURIComponent(manifest.course_id),{cache:'no-store'}),d=await r.json();if(!r.ok||!d.ok)return;manifest=d.manifest;showPreparation();}catch(_){} }
function currentUnit(){if(!manifest)return null;const id=String(($('lessonSelect')||{}).value||'');return (manifest.units||[]).find(u=>u.id===id)||manifest.units[0]||null;}
function showSelectedLectureIntro(){const u=currentUnit(),box=$('lessonText'),start=$('startLessonBtn');if(!u)return;const ready=u.script_status==='ready'&&!!u.script;if(start)start.disabled=!ready;const master=window.__VQ105_INPLACE_LECTURE_MASTER__;if(box&&!(master&&master.running))box.textContent=ready?'Selected: '+u.title+'. Select “Start Lecture”.':u.script_status==='error'?'The Chinese script for '+u.title+' could not be prepared. Use Retry Background Preparation.':'Preparing the Traditional Chinese script for '+u.title+'…';}
function speechLang(text){return /[\u3400-\u9fff]/.test(String(text||''))?'zh-TW':'en-US';}
function speak(text){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(text||''));u.lang=speechLang(text);u.rate=parseFloat(($('rateRange')||{}).value||'1')||1;u.pitch=parseFloat(($('pitchRange')||{}).value||'1')||1;speechSynthesis.speak(u);}catch(_){}}
function installDynamicLecture(){
  const start=$('startLessonBtn'),pause=$('pauseLessonBtn'),resume=$('resumeLessonBtn'),stop=$('stopLessonBtn'),repeat=$('repeatBtn');if(!start)return;
  start.onclick=e=>{e.preventDefault();const u=currentUnit();if(!u)return;const box=$('lessonText');if(box)box.textContent=u.script||'Lecture content is unavailable.';speak(u.script||'');if(pause)pause.disabled=false;if(stop)stop.disabled=false;if(resume)resume.disabled=true;const st=$('status');if(st)st.textContent='Status: Lecture in progress — '+u.title;};
  if(pause)pause.onclick=e=>{e.preventDefault();try{speechSynthesis.pause();}catch(_){ }pause.disabled=true;if(resume)resume.disabled=false;};
  if(resume)resume.onclick=e=>{e.preventDefault();try{speechSynthesis.resume();}catch(_){ }resume.disabled=true;if(pause)pause.disabled=false;};
  if(stop)stop.onclick=e=>{e.preventDefault();try{speechSynthesis.cancel();}catch(_){ }pause.disabled=true;resume.disabled=true;stop.disabled=true;};
  if(repeat)repeat.onclick=e=>{e.preventDefault();const u=currentUnit();if(u)speak(u.script||'');};
}
function applyVisualModule(){
  // Only the built-in default respiratory course includes this simulator.
  // Uploaded respiratory PDFs are still uploaded courses, not the default course.
  const show=!activeId()&&!manifest,tab=$('modelTab'),panel=$('modelPanel');
  const wasActive=(tab&&tab.classList.contains('active'))||(panel&&panel.classList.contains('active'));
  if(tab){tab.hidden=!show;tab.disabled=!show;tab.style.display=show?'':'none';}
  if(panel){panel.hidden=!show;panel.style.display=show?'':'none';}
  if(!show){
    if(wasActive){const lesson=$('lessonTab');if(lesson)lesson.click();}
    if(tab)tab.classList.remove('active');if(panel)panel.classList.remove('active');
    document.body.classList.remove('v150-model-active');
  }
  if(show&&tab)tab.textContent='V/Q Visual Model';
}
function installDynamicCase(){
  const panel=$('casePanel');if(!panel||!manifest)return;if(!legacyCaseHTML)legacyCaseHTML=panel.innerHTML;
  panel.innerHTML=`<div class="v241-dynamic-case"><div class="v241-case-head"><div><div class="section-label">CHAPTER-ALIGNED EXAM PRACTICE</div><h3>${esc(manifest.course_name)}</h3></div><div class="v241-quiz-controls"><label for="v241QuizUnit">Practice units</label><select id="v241QuizUnit" aria-label="Practice units"><option value="ready">All ready units</option>${(manifest.units||[]).map((u,i)=>`<option value="${esc(u.id)}">${i+1}. ${esc(u.title)}</option>`).join('')}</select><label for="v241QuizCount">Questions per unit</label><select id="v241QuizCount" aria-label="Questions per unit">${Array.from({length:10},(_,i)=>`<option value="${i+1}" ${i===1?'selected':''}>${i+1}</option>`).join('')}</select><button type="button" class="primary" id="v241StartQuiz" ${quizReady()?'':'disabled'}>Start Practice</button><button type="button" id="v241ExpandQuiz" disabled>Build more for selected unit</button></div></div><div class="v241-case-layout"><aside class="v241-case-units"><strong>${(manifest.units||[]).length} chapters</strong><div id="v241QuizUnits">${(manifest.units||[]).map((u,i)=>`<div class="v241-case-unit">${i+1}. ${esc(u.title)}</div>`).join('')}</div></aside><main class="v241-case-card"><div id="v241QuizBody">${quizReady()?'Choose ready units, then start practice.':'Course Q&A is available while the first questions prepare.'}</div></main></div></div>`;
  $('v241StartQuiz').addEventListener('click',startDynamicQuiz);
  $('v241QuizCount').addEventListener('change',updateQuizCount);
  $('v241QuizUnit').addEventListener('change',()=>{updateQuizCount();const id=$('v241QuizUnit').value,u=(manifest.units||[]).find(x=>x.id===id);if(u&&Number(u.question_count||0)<quizCount())prioritizeUnit('questions',id);});
  $('v241ExpandQuiz').addEventListener('click',expandQuizUnit);
  $('v241QuizCount').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();if(!$('v241StartQuiz').disabled)startDynamicQuiz();}});
}
function quizCount(){return Math.max(1,Math.min(10,Number(($('v241QuizCount')||{}).value)||2));}
function updateQuizCount(){showPreparation();}
async function startDynamicQuiz(){
  const btn=$('v241StartQuiz');if(btn.dataset.loading||!quizReady())return;const selected=quizUnits().map(u=>u.id);btn.disabled=true;btn.dataset.loading='1';const body=$('v241QuizBody'),per=quizCount();quizState=null;delete body.dataset.error;body.textContent='Drawing '+per+' ready questions per selected unit…';
  try{const r=await fetch('/api/reference/course-quiz',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({course_id:manifest.course_id,per_unit:per,unit_ids:selected}),cache:'no-store'}),result=await r.json();if(!r.ok||!result.ok||!result.quiz_id)throw new Error(result.detail||result.error||'quiz unavailable');quizState={quizId:result.quiz_id,items:result.questions||[],index:0,answers:{},submitted:{},generation:result.generation||{}};renderDynamicQuestion();}
  catch(e){body.dataset.error='1';body.textContent='Scenario Practice could not start: '+String(e&&e.message||e);}
  finally{delete btn.dataset.loading;btn.disabled=!quizReady();}
}
function renderDynamicQuestion(){
  if(!quizState)return;const body=$('v241QuizBody'),items=quizState.items;if(!items.length){body.textContent='No validated scenario questions were returned.';return;}
  const priorNav=body.querySelector('#v241QuestionNav'),scroll=priorNav?priorNav.scrollLeft:0;
  const i=quizState.index,q=items[i],chosen=quizState.answers[i],done=quizState.submitted[i],letters=['A','B','C','D'];
  const jumpOptions=items.map((item,n)=>`<option value="${n}" ${n===i?'selected':''}>${n+1}. ${esc(item.unit_title)}${quizState.submitted[n]?' · answered':quizState.answers[n]!==undefined?' · selected':''}</option>`).join('');
  const buttons=items.map((item,n)=>{const state=quizState.submitted[n]?'answered':quizState.answers[n]!==undefined?'selected':'';return `<button type="button" class="${state}${n===i?' current':''}" data-v241-question="${n}" aria-label="Question ${n+1}${state?' '+state:' unanswered'}" aria-current="${n===i?'step':'false'}" title="Question ${n+1} · ${esc(item.unit_title)}">${n+1}</button>`;}).join('');
  body.innerHTML=`<div class="v241-question-navigation"><div class="v241-question-jump"><span id="v241QuizProgress" aria-live="polite"></span><label for="v241QuestionJump">Go to question</label><select id="v241QuestionJump" aria-label="Go to question">${jumpOptions}</select></div><div class="v241-question-nav" id="v241QuestionNav" role="navigation" aria-label="Quiz question numbers">${buttons}</div></div><div class="v241-qmeta">Question ${i+1} of ${items.length} · ${esc(q.unit_title)}</div><div class="v241-qstem">${esc(q.stem)}</div>${(q.choices||[]).map((c,n)=>`<label class="v241-choice"><input type="radio" name="v241Choice" value="${n}" ${String(chosen)===String(n)?'checked':''} ${done?'disabled':''}> <strong>${letters[n]}.</strong> ${esc(c)}</label>`).join('')}<div class="v241-feedback" id="v241Feedback" ${done?'':'hidden'}></div><div class="v241-nav"><button type="button" id="v241Prev" ${i===0?'disabled':''}>Previous</button><button type="button" id="v241Submit" ${done?'disabled':''}>Submit Answer</button><button type="button" id="v241Next" ${i===items.length-1?'disabled':''}>Next</button><button type="button" id="v241Finish">Finish &amp; View Results</button></div>`;
  const nav=$('v241QuestionNav');nav.scrollLeft=scroll;
  nav.querySelectorAll('button[data-v241-question]').forEach(button=>button.onclick=()=>jumpDynamicQuestion(Number(button.dataset.v241Question)));
  $('v241QuestionJump').onchange=e=>jumpDynamicQuestion(Number(e.target.value));
  [...body.querySelectorAll('input[name="v241Choice"]')].forEach(x=>x.addEventListener('change',()=>{quizState.answers[i]=Number(x.value);updateDynamicNavigation();}));
  $('v241Prev').onclick=()=>jumpDynamicQuestion(i-1);$('v241Next').onclick=()=>jumpDynamicQuestion(i+1);$('v241Submit').onclick=()=>submitDynamicAnswer();$('v241Finish').onclick=finishDynamicQuiz;
  updateDynamicNavigation();if(done)showDynamicFeedback();
}
function jumpDynamicQuestion(index){if(!quizState||!Number.isInteger(index)||index<0||index>=quizState.items.length)return;quizState.index=index;renderDynamicQuestion();}
function updateDynamicNavigation(){
  if(!quizState)return;const total=quizState.items.length,answered=Object.keys(quizState.submitted).length,selected=Object.keys(quizState.answers).length;
  const progress=$('v241QuizProgress');if(progress)progress.textContent=answered+' / '+total+' answered'+(selected>answered?' · '+(selected-answered)+' selected':'');
  const button=document.querySelector('#v241QuestionNav button[data-v241-question="'+quizState.index+'"]');
  if(button){const state=quizState.submitted[quizState.index]?'answered':quizState.answers[quizState.index]!==undefined?'selected':'';button.className=state+' current';button.setAttribute('aria-label','Question '+(quizState.index+1)+(state?' '+state:' unanswered'));}
  const option=$('v241QuestionJump')&&$('v241QuestionJump').options[quizState.index];if(option)option.text=(quizState.index+1)+'. '+String(quizState.items[quizState.index].unit_title||'')+(quizState.submitted[quizState.index]?' · answered':quizState.answers[quizState.index]!==undefined?' · selected':'');
}
function submitDynamicAnswer(){const i=quizState.index;if(quizState.answers[i]===undefined){$('v241Feedback').hidden=false;$('v241Feedback').textContent='Select one answer first.';return;}quizState.submitted[i]=true;renderDynamicQuestion();}
function showDynamicFeedback(){const i=quizState.index,q=quizState.items[i],chosen=Number(quizState.answers[i]),correct=Number(q.answer),fb=$('v241Feedback'),letters=['A','B','C','D'];if(!fb)return;fb.hidden=false;fb.textContent=(chosen===correct?'Correct.':'Incorrect.')+'\nCorrect answer: '+letters[correct]+'. '+String((q.choices||[])[correct]||'')+(q.explanation?'\n'+q.explanation:'');}
async function finishDynamicQuiz(){
  if(!quizState||quizState.finished)return;const state=quizState,missing=state.items.filter((_,i)=>state.answers[i]===undefined).length;
  if(missing&&!window.confirm(missing+' question(s) are unanswered. Submit this quiz anyway?'))return;
  const btn=$('v241Finish');if(btn)btn.disabled=true;
  try{const answers=state.items.map((q,i)=>({id:q.id,choice:state.answers[i]===undefined?null:state.answers[i]}));const r=await fetch('/api/reference/course-quiz-result',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({course_id:manifest.course_id,quiz_id:state.quizId,answers}),cache:'no-store'}),report=await r.json().catch(()=>({}));if(!r.ok||!report.ok)throw new Error(report.error||report.detail||'Results unavailable');state.finished=true;let aggregate=null;try{const s=await fetch('/api/reference/course-quiz-stats?course_id='+encodeURIComponent(manifest.course_id),{cache:'no-store'});if(s.ok)aggregate=await s.json();}catch(_){}renderQuizSummary(report,aggregate);}
  catch(e){const fb=$('v241Feedback');if(fb){fb.hidden=false;fb.textContent='Could not save quiz result: '+String(e&&e.message||e);}if(btn)btn.disabled=false;}
}
function renderQuizSummary(report,aggregate){
  const items=quizState.items,letters=['A','B','C','D'],rows=items.map((q,i)=>{const graded=report.items[i],chosen=graded.choice===null?'Not answered':letters[graded.choice]+'. '+q.choices[graded.choice],correct=letters[q.answer]+'. '+q.choices[q.answer];return `<div class="v241-summary-item"><strong>Question ${i+1} · ${esc(q.unit_title)} · ${graded.correct?'Correct':graded.choice===null?'Unanswered':'Incorrect'}</strong><div>${esc(q.stem)}</div><div>Your answer: ${esc(chosen)}</div><div>Correct answer: ${esc(correct)}</div><div>${esc(q.explanation||'')}</div></div>`;}).join('');
  const totals=aggregate&&aggregate.ok?`<p>Course statistics: ${aggregate.attempts} completed quiz(es), ${aggregate.correct} / ${aggregate.questions} correct (${aggregate.accuracy}%).</p>`:'';
  const unitNames=Object.fromEntries(items.map(q=>[q.unit_id,q.unit_title]));
  const byUnit=(report.units||[]).map(u=>`<li>${esc(unitNames[u.unit_id]||u.unit_id)}: ${u.correct} / ${u.total} correct</li>`).join('');
  $('v241QuizBody').innerHTML=`<div class="v241-summary"><h4>Quiz Results</h4><p>${report.correct} / ${report.total} correct (${report.accuracy}%) · ${report.answered} answered</p>${totals}${byUnit?'<ul class="v241-unit-results">'+byUnit+'</ul>':''}<p>Random draw from the prepared bank: ${quizState.generation.prebuilt_questions||items.length} questions · ${quizState.generation.model_calls||0} model calls · ${quizState.generation.elapsed_ms||0} ms.</p>${rows}<button type="button" id="v241NewQuiz">Start another quiz</button></div>`;
  $('v241NewQuiz').onclick=()=>startDynamicQuiz();
}

async function courseAnswerOne(q){
  const cloud=cloudCfg(),lang=qLang(q);window.VQ_LAST_DETECTED_LANGUAGE=lang;if(cloud.provider!=='off'&&!cloud.apiKey)return 'Please enter the API Key and press Enter or “Confirm API Key” before using the selected cloud model.';
  const path=cloud.provider==='off'?'/api/reference/course-answer-local':'/api/reference/course-answer';const payload={course_id:manifest.course_id,question:String(q||''),model_key:modelKey(),language_tag:lang,cloud_provider:cloud.provider};if(cloud.provider!=='off')payload.cloud_api_key=cloud.apiKey;
  const r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store'}),d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||d.error||('HTTP '+r.status));window.VQ_LAST_COURSE_ANSWER_META={course_id:manifest.course_id,engine:d.engine||'local-course-rag',sources:Array.isArray(d.sources)?d.sources:[],correction_id:d.correction_id||''};const answer=String(d.answer||'').trim();if(!answer)throw new Error('The course answer service returned no answer.');return answer;
}
function installAnswerAdapter(){
  if(!manifest)return;const current=window.VQ_generateFinalAnswer;if(!legacyAnswer&&typeof current==='function')legacyAnswer=current;if(current&&current.__v241CourseAdapter)return;
  async function checkedAnswer(question){
    let response='';
    for(let attempt=0;attempt<2;attempt++){
      window.VQ_LAST_COURSE_ANSWER_META=null;
      try{
        response=await courseAnswerOne(question);
        if(window.VQ_cleanStudentAnswer)response=window.VQ_cleanStudentAnswer(response);
        const engine=String(window.VQ_LAST_COURSE_ANSWER_META&&window.VQ_LAST_COURSE_ANSWER_META.engine||'');
        const terminal=/^(?:course-scope-rejected|course-no-evidence)$/.test(engine);
        if(String(response||'').trim()&&(terminal||!window.VQ_validateStudentAnswer||window.VQ_validateStudentAnswer(question,response).ok))return {answer:response,ok:true};
      }catch(e){response='';}
    }
    return {answer:/^zh/i.test(qLang(question))?'此題尚未完成：未取得完整且格式有效的答案，請重試此題。':'This question is unfinished. Please retry this question.',ok:false};
  }
  const fn=async function(raw){
    if(!manifest&&legacyAnswer)return legacyAnswer.call(window,raw);
    const started=performance.now(),question=String(raw||'').trim();let items=[];
    try{items=(window.VQ_splitQuestionBatch&&window.VQ_splitQuestionBatch(question))||[question];}catch(_){items=[question];}
    if(!Array.isArray(items)||!items.length)items=[question];
    const out=[],rows=[],batch=items.length>=2;
    for(let i=0;i<items.length;i++){
      const box=$('teacherAnswer');if(batch&&box)box.textContent=out.concat('Processing uploaded-course batch: '+(i+1)+' / '+items.length+'…').join('\n\n');
      const result=await checkedAnswer(items[i]);rows.push({id:i+1,question:items[i],answer:result.answer,status:result.ok?'ok':'error'});
      out.push(batch?'Question '+(i+1)+'\n'+result.answer:result.answer);if(box)box.textContent=out.join('\n\n');
    }
    const completed=rows.filter(row=>row.status==='ok').length;
    window.VQ_LAST_BATCH_META={requested:items.length,completed,failed:items.length-completed,answers:rows};
    const answer=out.join('\n\n'),elapsed=performance.now()-started;
    setTimeout(()=>{if(typeof window.VQ_showAnswerFeedback==='function')window.VQ_showAnswerFeedback(question,answer,elapsed);},80);return answer;
  };fn.__v241CourseAdapter=true;window.VQ_generateFinalAnswer=fn;adapterInstalled=true;
}

async function restoreDraft(){
  try{draft=await draftIO('readonly');}catch(e){if(pendingStage())setBuildStatus('Saved PDF data could not be read: '+String(e.message||e)+'. Select the PDFs again.','error');return;}
  if(!draft)return;
  if(draft.courseName)$('v241CourseName').value=draft.courseName;
  if(draft.phase==='uploading'){
    setBuildStatus('Reconnecting to the saved upload…');
    try{await resumeUpload();}catch(e){setBuildStatus('Upload paused: '+String(e.message||e)+'. Select Upload & Inspect to start a new upload, or refresh to retry.','error');}
  }else if(draft.phase==='inspected'){
    inspection=draft.inspection;renderInspection();$('v241BuildBtn').disabled=false;setBuildStatus('Saved PDF inspection restored. Review the teaching units and build.','ok');
  }else if(draft.phase==='building'||pendingStage()===draft.stageId){
    try{
      const r=await fetch('/api/reference/course-stage-status?stage_id='+encodeURIComponent(draft.stageId),{cache:'no-store'}),d=await r.json();if(!r.ok||!d.ok)throw new Error(d.error||'Stage status unavailable');
      if(d.job)await pollBuild(d.job.id);
      else if(draft.buildBody){const start=await fetch('/api/reference/course-build',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(draft.buildBody),cache:'no-store'}),job=await start.json();if(!start.ok||!job.ok)throw new Error(job.error||'Build request failed');await pollBuild(job.job.id);}
    }catch(e){setBuildStatus('Build is saved, but reconnect failed: '+String(e.message||e)+'. Refresh to retry.','error');}
  }
}
async function init(){injectBuilder();applyVisualModule();if(!legacyCaseHTML&&$('casePanel'))legacyCaseHTML=$('casePanel').innerHTML;await loadCourseList();const cid=activeId();if(cid)await loadManifest(cid);await restoreDraft();try{const notice=sessionStorage.getItem(READY_NOTICE);if(notice&&manifest){sessionStorage.removeItem(READY_NOTICE);setBuildStatus(notice,'ok');}}catch(_){}setInterval(refreshPreparation,4500);setTimeout(()=>{if(manifest)installAnswerAdapter();},2800);setTimeout(()=>{if(manifest)installAnswerAdapter();},4200);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
