require('../helpers.cjs');
'use strict';
// Cloud models (ChatGPT, Claude, Gemini) through the actual Worker with simulated
// provider APIs: request shapes, answer extraction, key checks, model whitelist,
// and the page's model menu and per-company keys. No network, no real keys.
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');

async function main(){
  const source=fs.readFileSync('cloudflare/worker/src/index.js','utf8');
  const worker=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {CLOUD_PROVIDERS,providerConfig,callProviderRaw};').toString('base64'));
  // 1. The page menu offers exactly the Worker's models, lowest cost first in each company.
  const html=fs.readFileSync('web/reference/index.html','utf8');
  const menu=[...html.matchAll(/<option value="((?:openai|anthropic|gemini):[^"]+)">([^<]+)<\/option>/g)].map(m=>[m[1],m[2]]);
  const catalog=Object.entries(worker.CLOUD_PROVIDERS).flatMap(([p,v])=>v.models.map(m=>p+':'+m.id));
  assert.deepEqual(menu.map(x=>x[0]),catalog);
  for(const [value,label] of menu){const [p,id]=value.split(':');assert.equal(label.split(' · ')[0],worker.CLOUD_PROVIDERS[p].models.find(m=>m.id===id).label);}
  assert.deepEqual(Object.keys(worker.CLOUD_PROVIDERS),['openai','anthropic','gemini']);
  for(const p of Object.values(worker.CLOUD_PROVIDERS))assert.match(p.models[0].label,/Luna|Haiku|Flash-Lite/,'cheapest model first');
  // Old pages that send only "openai" keep the model used in the thesis evaluation; unknown models are refused.
  assert.equal(worker.providerConfig({cloud_provider:'openai',cloud_api_key:'k'}).model,'gpt-5.6-luna');
  assert.equal(worker.providerConfig({cloud_provider:'anthropic',cloud_model:'claude-sonnet-5-5',cloud_api_key:'k'}).model,'claude-sonnet-5-5');
  assert.equal(worker.providerConfig({cloud_provider:'gemini',cloud_model:'gemini-1.0-pro',cloud_api_key:'k'}).unknownModel,true);
  assert.equal(worker.providerConfig({cloud_provider:'other',cloud_api_key:'k'}).provider,'off');

  // Every page module that sends cloud questions passes the chosen model on.
  for(const file of ['web/reference/js/reference-textbook.js','web/reference/js/semantic-microbatch.js','web/shared/js/course/course-controller.js']){
    const text=fs.readFileSync(file,'utf8');assert.match(text,/cloud_model(?::|=)cloud\.model/,file);
    if(/function cloudConfig\(\)/.test(text))assert.match(text,/model:String\(c\.model/,file+' keeps the model in its cloud settings');
  }
  // 2. Provider request shapes and answer extraction.
  const calls=[];let reply=null;const oldFetch=global.fetch;
  global.fetch=async(url,init)=>{
    let raw=init&&init.body,hdrs=init&&init.headers;
    if(url instanceof Request){hdrs=url.headers;raw=url.method==='GET'?'':await url.text();url=url.url;}
    url=String(url);const headers=Object.fromEntries(new Headers(hdrs||{}).entries());
    const body=raw?JSON.parse(raw):null;calls.push({url,headers,body});
    if(url.endsWith('/api/auth/me'))return new Response('{}',{status:200});
    if(url.endsWith('/api/reference/context'))return Response.json({ok:true,in_scope:true,context:'正常的通氣灌流比約為 0.8。',sources:[{source:'Guyton',page:530}]});
    const r=reply(url,body,headers);return r instanceof Response?r:Response.json(r);
  };
  try{
    reply=()=>({output_text:'OK'});
    assert.equal(await worker.callProviderRaw({provider:'openai',model:'gpt-6-luna',apiKey:'sk-o'},'sys','user',100),'OK');
    let c=calls.at(-1);
    assert.equal(c.url,'https://api.openai.com/v1/responses');assert.equal(c.headers.authorization,'Bearer sk-o');
    assert.equal(c.body.model,'gpt-6-luna');assert.equal(c.body.reasoning.effort,'none');assert.equal(c.body.max_output_tokens,100);
    await worker.callProviderRaw({provider:'openai',model:'gpt-6.1-sol',apiKey:'sk-o'},'sys','user',100);
    assert.equal(calls.at(-1).body.reasoning.effort,'low','GPT-6.1 Sol does not accept effort none');
    assert(calls.at(-1).body.max_output_tokens>100,'room for reasoning tokens');

    reply=()=>({content:[{type:'thinking',thinking:''},{type:'text',text:'Claude answer'}],stop_reason:'end_turn'});
    assert.equal(await worker.callProviderRaw({provider:'anthropic',model:'claude-haiku-5-5',apiKey:'sk-a'},'sys','user',100),'Claude answer');
    c=calls.at(-1);
    assert.equal(c.url,'https://api.anthropic.com/v1/messages');assert.equal(c.headers['x-api-key'],'sk-a');assert.equal(c.headers['anthropic-version'],'2023-06-01');
    assert.equal(c.body.model,'claude-haiku-5-5');assert.equal(c.body.system,'sys');assert.deepEqual(c.body.messages,[{role:'user',content:'user'}]);
    assert.equal(c.body.output_config.effort,'low');assert(c.body.max_tokens>100,'thinking counts toward max_tokens');
    for(const k of ['temperature','top_p','top_k','thinking'])assert(!(k in c.body),k+' is not sent to Claude 5.5 models');
    reply=()=>({content:[{type:'text',text:'cut'}],stop_reason:'max_tokens'});
    await assert.rejects(worker.callProviderRaw({provider:'anthropic',model:'claude-haiku-5-5',apiKey:'sk-a'},'s','u',100),/truncated/);

    reply=()=>({candidates:[{content:{parts:[{text:'hidden thought',thought:true},{text:'Gemini answer'}]},finishReason:'STOP'}]});
    assert.equal(await worker.callProviderRaw({provider:'gemini',model:'gemini-3.8-flash',apiKey:'AIza-g'},'sys','user',100),'Gemini answer');
    c=calls.at(-1);
    assert.equal(c.url,'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent');
    assert.equal(c.headers['x-goog-api-key'],'AIza-g');assert(!/key=/.test(c.url),'key is sent in a header, not the URL');
    assert.equal(c.body.systemInstruction.parts[0].text,'sys');assert.equal(c.body.contents[0].parts[0].text,'user');
    assert.equal(c.body.generationConfig.thinkingConfig.thinkingLevel,'low');assert(!('temperature' in c.body.generationConfig));
    reply=()=>({candidates:[{content:{parts:[{text:'cut'}]},finishReason:'MAX_TOKENS'}]});
    await assert.rejects(worker.callProviderRaw({provider:'gemini',model:'gemini-3.8-flash',apiKey:'g'},'s','u',100),/truncated/);
    // A model that refuses the optional thinking setting is asked once more without it.
    reply=(url,body)=>body.generationConfig.thinkingConfig?new Response(JSON.stringify({error:{code:400,message:'Thinking level is not supported for this model.'}}),{status:400}):{candidates:[{content:{parts:[{text:'plain'}]},finishReason:'STOP'}]};
    assert.equal(await worker.callProviderRaw({provider:'gemini',model:'gemini-3.5-flash-lite',apiKey:'g'},'s','u',100),'plain');
    reply=(url,body)=>body.output_config?new Response(JSON.stringify({type:'error',error:{type:'invalid_request_error',message:'output_config.effort: unsupported'}}),{status:400}):{content:[{type:'text',text:'plain'}],stop_reason:'end_turn'};
    assert.equal(await worker.callProviderRaw({provider:'anthropic',model:'claude-opus-5-5',apiKey:'a'},'s','u',100),'plain');
    reply=()=>new Response(JSON.stringify({error:{message:'Invalid request: messages too long'}}),{status:400});
    await assert.rejects(worker.callProviderRaw({provider:'anthropic',model:'claude-opus-5-5',apiKey:'a'},'s','u',100),/too long/,'other refusals are not retried');

    // 3. Confirm API Key through the Worker route, for each company.
    const env={ORIGIN_URL:'https://origin.test',ASSETS:{fetch:()=>new Response('')}};
    const verify=async body=>(await worker.default.fetch(new Request('https://site.test/api/cloud/verify-key',{method:'POST',headers:{cookie:'lungta_sid='+'s'.repeat(24)},body:JSON.stringify(body)}),env)).json();
    reply=()=>({content:[{type:'text',text:'OK'}],stop_reason:'end_turn'});
    assert.deepEqual(await verify({cloud_provider:'anthropic',cloud_model:'claude-sonnet-5-5',cloud_api_key:'sk-a'}),{ok:true,provider:'anthropic',model:'claude-sonnet-5-5'});
    reply=()=>new Response(JSON.stringify({type:'error',error:{type:'authentication_error',message:'invalid x-api-key'}}),{status:401});
    assert.deepEqual(await verify({cloud_provider:'anthropic',cloud_model:'claude-haiku-5-5',cloud_api_key:'bad'}),{ok:false,code:'cloud_auth_failed',error:'Anthropic rejected this API key.'});
    reply=()=>new Response(JSON.stringify({error:{code:400,message:'API key not valid. Please pass a valid API key.',status:'INVALID_ARGUMENT'}}),{status:400});
    assert.equal((await verify({cloud_provider:'gemini',cloud_model:'gemini-3.5-flash-lite',cloud_api_key:'bad'})).code,'cloud_auth_failed');
    reply=()=>({candidates:[{content:{parts:[]},finishReason:'MAX_TOKENS'}]});
    assert.equal((await verify({cloud_provider:'gemini',cloud_model:'gemini-4-argon',cloud_api_key:'g'})).ok,true,'a reply cut short still proves the key works');
    reply=()=>new Response(JSON.stringify({error:{message:'The model does not exist'}}),{status:404});
    assert.deepEqual(await verify({cloud_provider:'openai',cloud_model:'gpt-6.1-sol',cloud_api_key:'sk'}),{ok:false,code:'cloud_model_unavailable',error:'This API key cannot use GPT-6.1 Sol.'});
    reply=()=>{throw new TypeError('Network connection lost.');};
    assert.equal((await verify({cloud_provider:'openai',cloud_model:'gpt-6-luna',cloud_api_key:'sk'})).code,'cloud_unreachable');
    assert.equal((await verify({cloud_provider:'openai',cloud_model:'gpt-9',cloud_api_key:'sk'})).code,'cloud_model_unsupported');

    // 4. A student question answered by Claude with the server's evidence.
    reply=()=>({content:[{type:'text',text:'正常的通氣灌流比約為 0.8，代表肺泡通氣與血流大致相配，這是整個肺的平均值，不同區域會有差異。'}],stop_reason:'end_turn'});
    const r=await worker.default.fetch(new Request('https://site.test/api/reference/answer',{method:'POST',body:JSON.stringify({question:'正常的通氣灌流比是多少？',cloud_provider:'anthropic',cloud_model:'claude-haiku-5-5',cloud_api_key:'sk-a',language_tag:'zh-TW'})}),env);
    const answer=await r.json();
    assert.equal(r.status,200,JSON.stringify(answer));assert.equal(answer.engine,'anthropic-api');assert.equal(answer.cloud_model,'claude-haiku-5-5');assert.match(answer.answer,/0\.8/);
    const asked=calls.filter(x=>x.url==='https://api.anthropic.com/v1/messages').at(-1);
    assert.match(asked.body.messages[0].content,/正常的通氣灌流比約為 0\.8/,'the textbook evidence is in the prompt');
    const bad=await worker.default.fetch(new Request('https://site.test/api/reference/answer',{method:'POST',body:JSON.stringify({question:'Q?',cloud_provider:'gemini',cloud_model:'gemini-1.0-pro',cloud_api_key:'g'})}),env);
    assert.equal(bad.status,400);assert.equal((await bad.json()).code,'cloud_model_unsupported');
  }finally{global.fetch=oldFetch;}

  // 5. Page menu: one key per company, verified per model, local model until verified.
  const nodes=new Map(),node=id=>({id,value:'',textContent:'',className:'',hidden:false,disabled:false,placeholder:'',options:[],listeners:{},focus(){},
    addEventListener(e,f){(this.listeners[e]||=[]).push(f);},dispatchEvent(e){for(const f of this.listeners[e.type]||[])f(e);}});
  const $=id=>{if(!nodes.has(id))nodes.set(id,node(id));return nodes.get(id);};
  const values=new Map(),sessionStorage={getItem:k=>values.has(k)?values.get(k):null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k)};
  const checks=[],window={};
  $('cloudModelSelect').options=[['off','Off — Local only'],...menu].map(([value,textContent])=>({value,textContent}));
  const context={window,document:{readyState:'complete',getElementById:$,addEventListener(){}},sessionStorage,console,Proxy,JSON,Array,Set,
    Event:class{constructor(type){this.type=type;}},
    fetch:async(url,init)=>{const b=JSON.parse(init.body);checks.push(b);return {ok:true,json:async()=>(b.cloud_api_key==='good'?{ok:true}:{ok:false,error:'rejected'})};}};
  vm.runInNewContext(fs.readFileSync('web/shared/js/models/cloud-selector.js','utf8'),context);
  const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
  const choose=v=>{$('cloudModelSelect').value=v;$('cloudModelSelect').dispatchEvent(new context.Event('change'));};
  choose('anthropic:claude-haiku-5-5');
  assert.equal($('cloudApiKeyInput').placeholder,'Paste Anthropic API key');
  assert.equal(window.VQ_getCloudConfig().provider,'off','local until the key is verified');
  $('cloudApiKeyInput').value='good';$('cloudApiKeyInput').dispatchEvent(new context.Event('input'));
  $('cloudApiKeyConfirmBtn').dispatchEvent(new context.Event('click'));await flush();
  assert.deepEqual({...checks.at(-1)},{cloud_provider:'anthropic',cloud_model:'claude-haiku-5-5',cloud_api_key:'good'});
  assert.deepEqual({...window.VQ_getCloudConfig()},{provider:'anthropic',model:'claude-haiku-5-5',apiKey:'good',label:'Claude Haiku 5.5 · lowest cost'});
  // Another Claude model reuses the stored key and is checked at once.
  choose('anthropic:claude-sonnet-5-5');assert.equal(window.VQ_getCloudConfig().provider,'off');await flush();
  assert.equal(checks.at(-1).cloud_model,'claude-sonnet-5-5');assert.equal(window.VQ_getCloudConfig().model,'claude-sonnet-5-5');
  // A different company needs its own key; until then the local model answers.
  choose('gemini:gemini-3.8-flash');await flush();
  assert.equal($('cloudApiKeyInput').value,'');assert.equal(window.VQ_getCloudConfig().provider,'off');
  assert.equal(window.VQ_CLOUD_MODEL_LABELS['gemini:gemini-3.8-flash'],'Gemini 3.8 Flash · balanced');
  choose('anthropic:claude-haiku-5-5');assert.equal(window.VQ_getCloudConfig().model,'claude-haiku-5-5','already verified models switch back without a new check');
  console.log('[OK] cloud models: ChatGPT, Claude and Gemini request shapes, answer extraction, key checks per company, model whitelist, legacy OpenAI default and per-model verification');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
