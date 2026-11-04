require('../helpers.cjs');
'use strict';
// Offline contract of the Gemini Live natural-conversation module (no network, no browser).
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
function storage(values){const map=new Map(Object.entries(values||{}));return {getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)};}
async function load(role,courseId,fetchImpl){
  const nodes={};
  const select=role?{id:'avatarRoleSelect',value:role}:null;
  const context={window:{},document:{readyState:'complete',getElementById:id=>id==='avatarRoleSelect'?select:(nodes[id]||null),addEventListener(){},head:{appendChild(){}}},
    localStorage:storage(courseId?{VQ_V241_ACTIVE_COURSE_ID:courseId}:{}),sessionStorage:storage(),fetch:fetchImpl,console,setTimeout,clearTimeout,URL,Blob,performance};
  context.window.addEventListener=()=>{};
  if(courseId)context.window.VQ_UPLOADED_COURSE_ACTIVE=true;
  vm.runInNewContext(fs.readFileSync('web/shared/js/qa/gemini-live.js','utf8'),context,{filename:'gemini-live.js'});
  return context.window.VQ_GEMINI_LIVE;
}
async function main(){
  const calls=[];
  const fetchImpl=async(url,init)=>{calls.push({url,body:JSON.parse(init.body)});
    const body=JSON.parse(init.body);
    if(/天氣/.test(body.question))return {ok:true,json:async()=>({ok:false,in_scope:false})};
    return {ok:true,json:async()=>({ok:true,in_scope:true,context:'Normal V/Q is about 0.8.',sources:[{source:'Guyton',page:530}]})};};
  const female=await load('yating','',fetchImpl),male=await load('zhiwei','',fetchImpl);
  assert.equal(female.voiceName(),'Kore');assert.equal(male.voiceName(),'Charon');
  const setup=female.setupMessage('').setup;
  assert.equal(setup.model,'models/gemini-3.8-live');
  assert.deepEqual(Array.from(setup.generationConfig.responseModalities),['AUDIO']);
  assert.equal(setup.generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName,'Kore');
  const tool=setup.tools[0].functionDeclarations[0];
  assert.equal(tool.name,'search_course_material');assert.equal(tool.behavior,'BLOCKING');
  assert.match(setup.systemInstruction.parts[0].text,/ALWAYS call search_course_material/);
  assert.match(setup.systemInstruction.parts[0].text,/out_of_scope/);
  // Scope is decided by the server only; the course title must not make Gemini refuse (e.g. kidney questions in the built-in textbooks).
  assert.match(setup.systemInstruction.parts[0].text,/only the tool result decides/);
  assert.match(female.setupMessage('', 'selected').setup.systemInstruction.parts[0].text,/only the tool result decides/);
  assert.doesNotMatch(setup.systemInstruction.parts[0].text,/Respiratory Physiology/);
  assert.equal(female.setupMessage('h-7').setup.sessionResumption.handle,'h-7');
  const ok=await female.searchCourse('What is the normal V/Q ratio?');
  assert.equal(ok.status,'ok');assert.match(ok.passages,/0\.8/);assert.equal(ok.scope,'confirmed_in_course_by_server');assert.equal(calls.at(-1).url,'/api/reference/context');
  const outside=await female.searchCourse('明天天氣如何');
  assert.equal(outside.status,'out_of_scope');
  const course=await load('yating','pde-1',fetchImpl);
  await course.searchCourse('transport equation');
  assert.equal(calls.at(-1).url,'/api/reference/course-context');assert.equal(calls.at(-1).body.course_id,'pde-1');
  // "Selected Q&A model" mode: Gemini only voices the answer written by the chosen model.
  const selected=female.setupMessage('', 'selected').setup;
  assert.equal(selected.tools[0].functionDeclarations[0].name,'answer_course_question');
  assert.equal(selected.tools[0].functionDeclarations[0].behavior,'NON_BLOCKING');
  assert.match(selected.systemInstruction.parts[0].text,/never answer course questions yourself/);
  const jobCalls=[];let polls=0;
  const jobFetch=async(url,init)=>{jobCalls.push({url,body:init&&init.body?JSON.parse(init.body):null});
    if(url==='/api/reference/answer-job-start')return {ok:true,json:async()=>({ok:true,job_id:'a'.repeat(32)})};
    if(url.startsWith('/api/reference/job-status'))return {ok:true,json:async()=>(++polls<2?{status:'answering'}:{status:'done',result:{answer:'Normal V/Q is about 0.8.',engine:'local',sources:[{source:'Guyton'}]}})};
    if(url==='/api/reference/answer')return {ok:true,json:async()=>({answer:'Luna: about 0.8.',engine:'openai-api'})};
    return {ok:true,json:async()=>({})};};
  const local=await load('yating','',jobFetch);
  const localAnswer=await local.answerWithSelectedModel('What is the normal V/Q ratio?');
  assert.equal(localAnswer.status,'answered');assert.match(localAnswer.answer_text,/0\.8/);
  assert.equal(jobCalls[0].url,'/api/reference/answer-job-start');assert.equal(jobCalls[0].body.model_key,'gemma');
  // A verified GPT-5.6 Luna key makes the cloud model write the answer instead.
  const luna=await (async()=>{
    const context={window:{VQ_getCloudConfig:()=>({provider:'openai',apiKey:'sk-test',label:'GPT-5.6 Luna · OpenAI'}),addEventListener(){}},
      document:{readyState:'complete',getElementById:()=>null,addEventListener(){},head:{appendChild(){}}},
      localStorage:storage(),sessionStorage:storage(),fetch:jobFetch,console,setTimeout,clearTimeout,URL,Blob,performance};
    vm.runInNewContext(fs.readFileSync('web/shared/js/qa/gemini-live.js','utf8'),context,{filename:'gemini-live.js'});
    return context.window.VQ_GEMINI_LIVE;})();
  assert.equal(luna.selectedModelLabel(),'GPT-5.6 Luna (cloud)');
  const lunaAnswer=await luna.answerWithSelectedModel('What is the normal V/Q ratio?');
  const lunaCall=jobCalls.at(-1);
  assert.equal(lunaCall.url,'/api/reference/answer');assert.equal(lunaCall.body.cloud_provider,'openai');assert.equal(lunaCall.body.cloud_api_key,'sk-test');
  assert.match(lunaAnswer.answer_text,/Luna/);
  const failing=await load('yating','',async()=>{throw new Error('offline');});
  assert.equal((await failing.searchCourse('V/Q')).status,'error');
  console.log('[OK] Gemini Live: Yating->Kore, Zhiwei->Charon, both answer sources (Gemini course search; Gemma/Ministral/Luna checked answers), scope and offline handling');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
