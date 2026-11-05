require('../helpers.cjs');
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const BASE='web/';
function node(id){
  return {id,value:'',textContent:'',className:'',hidden:false,disabled:false,placeholder:'',dataset:{},
    listeners:{},focus(){},addEventListener(event,fn){(this.listeners[event]||=[]).push(fn);},
    dispatchEvent(event){for(const fn of this.listeners[event.type]||[])fn(event);}};
}
async function main(){
  const nodes=new Map();
  const $=id=>{if(!nodes.has(id))nodes.set(id,node(id));return nodes.get(id);};
  const storage=()=>{const values=new Map();return {
    getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k)};};
  const sessionStorage=storage(),localStorage=storage(),requests=[],window={},doc={
    readyState:'complete',getElementById:$,addEventListener(){}};
  const context={window,document:doc,sessionStorage,localStorage,AbortController,
    Event:class Event{constructor(type){this.type=type;}},console,
    fetch:async(url,init)=>{requests.push({url,init});
      if(url==='/api/cloud/verify-key'){const body=JSON.parse(init.body);
        return {ok:true,json:async()=>(body.cloud_api_key==='bad-key'?{ok:false,error:'OpenAI rejected this API key.'}:{ok:true})};}
      return {ok:true,json:async()=>({models:{}})};},
    setTimeout:()=>0};
  const load=p=>vm.runInNewContext(fs.readFileSync(BASE+p,'utf8'),context,{filename:p});
  const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
  $('localModelSelect').value='gemma';
  $('cloudModelSelect').value='off';
  $('cloudModelSelect').options=[['off','Off — Local only'],['openai:gpt-6-luna','GPT-6 Luna'],['anthropic:claude-haiku-5-5','Claude Haiku 5.5']].map(([value,textContent])=>({value,textContent}));
  load('shared/js/qa/request-controller.js');
  const qa=window.VQ_QA_REQUESTS;
  assert(qa);
  let handoffs=[];
  window.VQ_QA_REASK_CURRENT=(q,source)=>{
    handoffs.push({q,source});
    return qa.begin(q,{force:true,source}).request;
  };
  const first=qa.begin('What is V/Q?',{source:'voice'}).request;
  assert(first.pending);
  assert.equal(qa.begin('What is V/Q?',{source:'voice'}).joined,true);
  assert.equal(qa.lastQuestion(),'What is V/Q?');
  load('shared/js/models/cloud-selector.js');
  $('cloudModelSelect').value='openai:gpt-6-luna';$('cloudModelSelect').dispatchEvent(new context.Event('change'));
  assert.equal(handoffs.length,0,'No handoff before a usable cloud key is confirmed');
  // A rejected key never switches: the local model keeps the question.
  $('cloudApiKeyInput').value='bad-key';
  $('cloudApiKeyInput').dispatchEvent(new context.Event('input'));
  $('cloudApiKeyConfirmBtn').dispatchEvent(new context.Event('click'));
  await flush();
  assert.equal(handoffs.length,0,'A failed key check must not hand off the question');
  assert.equal(window.VQ_getCloudConfig().provider,'off','Local model stays in charge after a failed key check');
  assert.match($('cloudApiKeyStatus').textContent,/failed/);
  assert.equal(sessionStorage.getItem('VQ_CLOUD_API_KEY_SESSION:openai'),null);
  assert.equal(qa.isCurrent(first),true,'The local answer continues after a failed key check');
  $('cloudApiKeyInput').value='fixture-api-key';
  $('cloudApiKeyInput').dispatchEvent(new context.Event('input'));
  $('cloudApiKeyConfirmBtn').dispatchEvent(new context.Event('click'));
  await flush();
  assert.equal(requests.filter(r=>r.url==='/api/cloud/verify-key').length,2,'Every Confirm verifies the key first');
  assert.match($('cloudApiKeyStatus').textContent,/Switched to GPT-6 Luna/);
  assert.equal(handoffs.length,1);
  assert.equal(qa.current().model,'cloud:openai:gpt-6-luna');
  assert.equal(handoffs[0].q,'What is V/Q?');
  assert.equal(handoffs[0].source,'voice');
  assert.equal(first.invalid,true);
  assert.equal(qa.isCurrent(first),false,'Superseded local answer must never render');
  assert.equal(sessionStorage.getItem('VQ_CLOUD_API_KEY_SESSION:openai'),'fixture-api-key');
  const cloud=qa.current();
  // A server job that is still queued gets a best-effort cancellation.
  qa.rememberJob(cloud,'0123456789abcdef0123456789abcdef');
  await Promise.resolve(qa.switchModel());
  assert.equal(qa.isCurrent(cloud),false);
  await Promise.resolve();
  assert.equal(requests.filter(r=>r.url==='/api/reference/job-cancel').length,1);
  // Local model changes disable Cloud mode and restart the original submitted question once.
  load('reference/js/local-llm-selector.js');
  for(let i=0;i<8;i++)await Promise.resolve();
  const n=handoffs.length;
  $('localModelSelect').value='mistral';$('localModelSelect').dispatchEvent(new context.Event('change'));
  assert.equal($('cloudModelSelect').value,'off');
  assert.equal(qa.current().model,'local:mistral');
  assert.equal(handoffs.length,n+1,'Exactly one handoff for cloud-to-local change');
  qa.finish(qa.current());
  assert.equal(qa.current().pending,false);
  const n2=handoffs.length;
  // A finished answer is also answered again by the newly selected model (teacher's rule).
  $('localModelSelect').value='gemma';$('localModelSelect').dispatchEvent(new context.Event('change'));
  assert.equal(qa.current().model,'local:gemma');
  assert.equal(handoffs.length,n2+1);
  assert.equal(handoffs.at(-1).q,'What is V/Q?');
  // Voice Stop is owned by recognition-controller; legacy pre-stop must not steal it.
  const voiceContext={window:{},document:doc,console};
  vm.runInNewContext(fs.readFileSync(BASE+'shared/js/speech/stop-on-submit.js','utf8'),voiceContext);
  assert.equal(($('stopAskBtn').listeners.click||[]).length,0,'Voice stop has one submission owner');
  assert(($('submitTypedQuestionBtn').listeners.click||[]).length>0);
  console.log('[OK] Q&A handoff: same question, cloud confirm, local switch, stale responses, dedupe, queued cancellation, voice Stop ownership.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
