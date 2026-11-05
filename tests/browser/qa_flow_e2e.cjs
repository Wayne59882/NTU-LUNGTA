// Real-browser Q&A flow on the actual Reference page with a fake microphone and
// stand-in API responses: Stop Recording & Answer, model handoff, API-key check
// and repeated Submit clicks. Requires Playwright + Chromium (not run in CI).
'use strict';
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const WEB=path.resolve(__dirname,'../../app/web');
const TYPES={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.mp3':'audio/mpeg','.webp':'image/webp'};

function staticServer(){
  return new Promise(resolve=>{
    const srv=http.createServer((req,res)=>{
      let p=decodeURIComponent(new URL(req.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';
      const file=path.join(WEB,p);if(!file.startsWith(WEB)||!fs.existsSync(file)){res.writeHead(404);return res.end();}
      res.writeHead(200,{'Content-Type':TYPES[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);
    });srv.listen(0,'127.0.0.1',()=>resolve(srv));
  });
}

async function main(){
  const srv=await staticServer(),base='http://127.0.0.1:'+srv.address().port;
  const browser=await chromium.launch({args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream','--autoplay-policy=no-user-gesture-required']});
  const page=await browser.newPage();
  const log=[],jobs=new Map(),cloudBodies=[];let seq=0,slowMs=4000;
  const json=(route,body,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
  await page.route('**/api/**',async route=>{
    const req=route.request(),url=new URL(req.url()),p=url.pathname;let body={};
    try{body=JSON.parse(req.postData()||'{}');}catch(_){}
    log.push({p,body,at:Date.now()});
    if(p==='/api/auth/me')return json(route,{ok:true,user:{id:1,name:'Fixture Teacher',email:'t@example.test',role:'teacher',status:'approved',is_admin:false}});
    if(p==='/api/reference/models')return json(route,{models:{gemma:{label:'Gemma 4 12B · Google'},mistral:{label:'Ministral 3 8B · Mistral AI'}}});
    if(p==='/api/reference/course-list')return json(route,{ok:true,courses:[]});
    if(p==='/api/kb/stt')return json(route,{text:'What is ventilation perfusion matching?',language:'en'});
    if(p==='/api/reference/answer-job-start'){const id=(++seq).toString(16).padStart(32,'0');jobs.set(id,{model:body.model_key,q:body.question,at:Date.now(),status:'answering'});return json(route,{ok:true,job_id:id,status:'queued'},202);}
    if(p==='/api/reference/job-status'){const j=jobs.get(url.searchParams.get('id'));if(!j)return json(route,{error:'not found'},404);
      if(j.status==='cancelled')return json(route,{status:'cancelled'});
      if(Date.now()-j.at<slowMs)return json(route,{status:'answering',progress:40});
      return json(route,{status:'done',result:{answer:'LOCAL-'+j.model+': '+j.q,engine:'local',answer_language:'en',sources:[]}});}
    if(p==='/api/reference/job-cancel'){const j=jobs.get(body.job_id);if(j)j.status='cancelled';return json(route,{ok:!!j});}
    if(p==='/api/cloud/verify-key')return json(route,body.cloud_api_key==='good-key'?{ok:true}:{ok:false,error:'Anthropic rejected this API key.'});
    if(p==='/api/reference/answer'){cloudBodies.push(body);await new Promise(r=>setTimeout(r,800));return json(route,{answer:'CLOUD-CLAUDE: '+body.question,engine:body.cloud_provider+'-api',cloud_model:body.cloud_model,answer_language:'en',sources:[]});}
    return json(route,{ok:true});
  });
  page.on('pageerror',e=>log.push({p:'pageerror',body:String(e)}));
  await page.goto(base+'/reference/index.html');
  await page.waitForFunction(()=>window.VQ_QA_REQUESTS&&typeof window.VQ_generateFinalAnswer==='function',null,{timeout:20000});
  await page.waitForTimeout(1500);
  const answerText=()=>page.$eval('#teacherAnswer',el=>el.textContent);
  const starts=()=>log.filter(x=>x.p==='/api/reference/answer-job-start');
  const results={};

  // 1) Voice: one press of Stop Recording & Answer transcribes and answers.
  slowMs=300;
  await page.click('#askBtn');
  await page.waitForFunction(()=>!document.getElementById('stopAskBtn').disabled,null,{timeout:10000});
  await page.waitForTimeout(1500);
  await page.click('#stopAskBtn');
  await page.waitForFunction(()=>/LOCAL-gemma: What is ventilation/.test(document.getElementById('teacherAnswer').textContent),null,{timeout:30000});
  assert.equal(log.filter(x=>x.p==='/api/kb/stt').length,1,'one transcription');
  assert.equal(starts().length,1,'Stop Recording & Answer submitted exactly once without pressing Submit');
  results.voice='Stop Recording & Answer: transcribed and answered automatically';

  // 2) Repeated Submit clicks create one answer job.
  slowMs=1500;
  await page.$eval('#studentQuestion',el=>{el.textContent='Define dead space ventilation.';});
  const before=starts().length;
  await page.click('#submitTypedQuestionBtn');await page.click('#submitTypedQuestionBtn');await page.click('#submitTypedQuestionBtn');
  await page.waitForFunction(()=>/LOCAL-gemma: Define dead space/.test(document.getElementById('teacherAnswer').textContent),null,{timeout:20000});
  assert.equal(starts().length-before,1,'three clicks, one answer job');
  results.dedupe='three Submit clicks -> one answer job';

  // 3) Gemma still answering -> select Ministral: Gemma job cancelled, Ministral answers the same question.
  slowMs=5000;
  await page.$eval('#studentQuestion',el=>{el.textContent='Explain hypoxic pulmonary vasoconstriction.';});
  await page.click('#submitTypedQuestionBtn');
  await page.waitForTimeout(800);
  const gemmaJob=[...jobs.entries()].filter(([,j])=>j.model==='gemma').at(-1);
  await page.selectOption('#localModelSelect','mistral');
  await page.waitForTimeout(400);slowMs=500;
  await page.waitForFunction(()=>/LOCAL-mistral: Explain hypoxic/.test(document.getElementById('teacherAnswer').textContent),null,{timeout:20000});
  assert.equal(jobs.get(gemmaJob[0]).status,'cancelled','old Gemma job cancelled on the server');
  await page.waitForTimeout(6000);
  assert.match(await answerText(),/LOCAL-mistral/,'the old Gemma answer never replaces the new one');
  results.local_switch='Gemma in progress -> Ministral: Gemma job cancelled, Ministral answered the same question';

  // 4) Wrong API key: no switch; correct key: answered again by Luna.
  slowMs=6000;
  await page.$eval('#studentQuestion',el=>{el.textContent='What limits diffusion across the alveolar membrane?';});
  await page.click('#submitTypedQuestionBtn');await page.waitForTimeout(600);
  await page.selectOption('#cloudModelSelect','anthropic:claude-haiku-5-5');
  await page.fill('#cloudApiKeyInput','bad-key');await page.click('#cloudApiKeyConfirmBtn');
  await page.waitForFunction(()=>/failed/.test(document.getElementById('cloudApiKeyStatus').textContent),null,{timeout:8000});
  const pending=[...jobs.entries()].filter(([,j])=>j.status==='answering').at(-1);
  assert(pending&&pending[1].model==='mistral','the local answer keeps running after a rejected key');
  await page.fill('#cloudApiKeyInput','good-key');await page.click('#cloudApiKeyConfirmBtn');
  await page.waitForFunction(()=>/CLOUD-CLAUDE: What limits diffusion/.test(document.getElementById('teacherAnswer').textContent),null,{timeout:20000});
  assert.equal(jobs.get(pending[0]).status,'cancelled','local job cancelled when Claude takes over');
  assert.match(await page.$eval('#cloudApiKeyStatus',el=>el.textContent),/Claude Haiku 5\.5/);
  assert.deepEqual([cloudBodies.at(-1).cloud_provider,cloudBodies.at(-1).cloud_model,cloudBodies.at(-1).cloud_api_key],['anthropic','claude-haiku-5-5','good-key']);
  results.cloud='wrong key -> stays local with error; correct key -> Claude Haiku 5.5 answered the same question';

  // 5) Finished answer, then switch back to a local model: answered again once by that model.
  slowMs=300;
  const n=starts().length;
  await page.selectOption('#cloudModelSelect','off');
  await page.waitForFunction(()=>/LOCAL-mistral: What limits diffusion/.test(document.getElementById('teacherAnswer').textContent),null,{timeout:20000});
  assert.equal(starts().length-n,1,'one re-answer after switching back to local');
  results.finished_switch='finished Claude answer -> Off: answered again once by the local model';

  const errors=log.filter(x=>x.p==='pageerror');
  await browser.close();srv.close();
  console.log(JSON.stringify({results,page_errors:errors.map(e=>e.body)},null,2));
  console.log('[OK] browser Q&A flow: voice auto-submit, one job per submit, model handoff with server cancellation, API-key check');
}
main().catch(e=>{console.error(e);process.exit(1);});
