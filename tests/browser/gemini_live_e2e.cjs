// Real-browser natural conversation on the actual Reference page against a simulated
// Gemini Live WebSocket server: key check, setup message, microphone streaming,
// course-scoped tool calls, spoken reply, interruption, voice switch and ending.
// Requires Playwright + Chromium (not run in CI).
'use strict';
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const WEB=path.resolve(__dirname,'../../app/web');
const TYPES={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.mp3':'audio/mpeg','.webp':'image/webp'};
function staticServer(){return new Promise(resolve=>{const srv=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';const file=path.join(WEB,p);if(!file.startsWith(WEB)||!fs.existsSync(file)){res.writeHead(404);return res.end();}res.writeHead(200,{'Content-Type':TYPES[path.extname(file)]||'application/octet-stream'});fs.createReadStream(file).pipe(res);});srv.listen(0,'127.0.0.1',()=>resolve(srv));});}
function tone(seconds){const n=Math.round(24000*seconds),b=Buffer.alloc(n*2);for(let i=0;i<n;i++)b.writeInt16LE(Math.round(Math.sin(i/24000*2*Math.PI*220)*12000),i*2);return b.toString('base64');}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn,ms,label){const end=Date.now()+ms;while(Date.now()<end){if(await fn())return;await wait(50);}throw new Error('Timed out: '+label);}

async function main(){
  const srv=await staticServer(),base='http://127.0.0.1:'+srv.address().port;
  const browser=await chromium.launch({args:['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream','--autoplay-policy=no-user-gesture-required']});
  const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  const json=(route,body,status=200)=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
  const searches=[],jobs=new Map(),cancels=[];let jobSeq=0,jobDelay=1500;
  await page.route('**/api/**',async route=>{
    const req=route.request(),p=new URL(req.url()).pathname;let body={};try{body=JSON.parse(req.postData()||'{}');}catch(_){}
    if(p==='/api/auth/me')return json(route,{ok:true,user:{id:1,name:'Fixture Teacher',email:'t@example.test',role:'teacher',status:'approved'}});
    if(p==='/api/reference/course-list')return json(route,{ok:true,courses:[]});
    if(p==='/api/reference/answer-job-start'){const id=(++jobSeq).toString(16).padStart(32,'0');jobs.set(id,{q:body.question,model:body.model_key,at:Date.now(),status:'answering'});return json(route,{ok:true,job_id:id},202);}
    if(p==='/api/reference/job-status'){const j=jobs.get(new URL(req.url()).searchParams.get('id'));if(!j)return json(route,{error:'job not found'},404);
      if(j.status==='cancelled')return json(route,{status:'cancelled'});
      if(Date.now()-j.at<jobDelay)return json(route,{status:'answering'});
      return json(route,{status:'done',result:{answer:'【'+j.model+'】正常的通氣灌流比約為 0.8。',engine:'local',sources:[{source:'Guyton and Hall',page:530}]}});}
    if(p==='/api/reference/job-cancel'){const j=jobs.get(body.job_id);if(j)j.status='cancelled';cancels.push(body.job_id);return json(route,{ok:!!j});}
    if(p==='/api/reference/course-context'){searches.push('course:'+body.course_id+':'+body.question);
      return json(route,{ok:true,in_scope:true,context:'The transport equation u_t + b . grad u = 0 has constant coefficients.',sources:[{source:'PDE lecture notes',page:12}],course:{course_name:'PDE'}});}
    if(p==='/api/reference/context'){searches.push(body.question);
      if(/天氣|weather/.test(body.question))return json(route,{ok:false,in_scope:false,context:'',sources:[]});
      return json(route,{ok:true,in_scope:true,context:'[Guyton] The normal overall ventilation-perfusion ratio is about 0.8.',sources:[{source:'Guyton and Hall',page:530}]});}
    return json(route,{ok:true});
  });
  await page.route('https://generativelanguage.googleapis.com/**',route=>{
    const key=new URL(route.request().url()).searchParams.get('key');
    return key==='good-key'?json(route,{name:'models/gemini-3.8-live'}):json(route,{error:{message:'API key not valid.'}},400);
  });
  const g={setups:[],audio:0,toolResponses:[],closed:0,ws:null,client:[]};
  await page.routeWebSocket(/generativelanguage\.googleapis\.com\/ws\//,ws=>{
    g.ws=ws;g.url=ws.url();
    ws.onMessage(raw=>{
      const m=JSON.parse(String(raw));
      if(m.setup){g.setups.push(m.setup);ws.send(JSON.stringify({setupComplete:{}}));ws.send(JSON.stringify({sessionResumptionUpdate:{newHandle:'handle-'+g.setups.length,resumable:true}}));return;}
      if(m.realtimeInput&&m.realtimeInput.audio){g.audio++;g.mime=m.realtimeInput.audio.mimeType;g.bytes=Buffer.from(m.realtimeInput.audio.data,'base64').length;return;}
      if(m.toolResponse)g.toolResponses.push(m.toolResponse.functionResponses);
      if(m.clientContent)g.client.push(m.clientContent);
    });
    ws.onClose(()=>{g.closed++;});
  });
  await page.goto(base+'/reference/index.html');
  await page.waitForSelector('#vqLivePanel',{timeout:20000});
  const results={};
  // Layout: regular Q&A on the left, natural conversation on the right.
  const layout=await page.evaluate(()=>{const l=document.getElementById('vqQaLeft'),r=document.getElementById('vqLivePanel'),a=l.getBoundingClientRect(),b=r.getBoundingClientRect();
    return {leftHasQa:!!l.querySelector('#askBtn')&&!!l.querySelector('#teacherAnswer'),sideBySide:b.left>=a.right-1&&Math.abs(a.top-b.top)<5};});
  assert(layout.leftHasQa,'regular Q&A stays in the left column');assert(layout.sideBySide,'two columns side by side at desktop width');
  assert.equal(await page.$eval('#vqLiveMode',e=>e.value),'gemini');
  results.layout='left: regular Q&A; right: natural conversation (default answer source: Gemini)';

  // Key check: rejected key is not stored; a working key is.
  await page.fill('#vqLiveKey','bad-key');await page.click('#vqLiveKeyBtn');
  await page.waitForFunction(()=>/✗/.test(document.getElementById('vqLiveStatus').textContent));
  assert.equal(await page.evaluate(()=>sessionStorage.getItem('VQ_GEMINI_API_KEY_SESSION')),null);
  await page.fill('#vqLiveKey','good-key');await page.click('#vqLiveKeyBtn');
  await page.waitForFunction(()=>/Key verified/.test(document.getElementById('vqLiveStatus').textContent));
  results.key='rejected key not stored; verified key stored for this session';

  // Start: setup follows the teacher voice and declares the course search tool.
  const role=await page.evaluate(()=>{const el=document.getElementById('avatarRoleSelect')||document.getElementById('voiceSelect');return el&&el.value||'yating';});
  await page.click('#vqLiveStart');
  await until(()=>g.setups.length===1,8000,'setup');
  const s=g.setups[0];
  assert.match(g.url,/BidiGenerateContent\?key=good-key$/);
  assert.equal(s.model,'models/gemini-3.8-live');
  assert.deepEqual(s.generationConfig.responseModalities,['AUDIO']);
  assert.equal(s.generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName,role==='zhiwei'?'Charon':'Kore');
  const fn=s.tools[0].functionDeclarations[0];
  assert.equal(fn.name,'search_course_material');assert.equal(fn.behavior,'BLOCKING');
  assert(s.inputAudioTranscription&&s.outputAudioTranscription&&/ALWAYS call search_course_material/.test(s.systemInstruction.parts[0].text));
  // A fresh conversation opens with one short Taiwan-Mandarin greeting.
  await until(()=>g.client.length===1,8000,'greeting');
  assert.match(g.client[0].turns[0].parts[0].text,/Taiwan Mandarin/);assert.equal(g.client[0].turnComplete,true);
  assert.equal(await page.$eval('#vqLiveStatus',e=>e.textContent.trim()),'🎙 Listening — talk any time.');
  await until(()=>g.audio>=5,8000,'microphone audio');
  assert.equal(g.mime,'audio/pcm;rate=16000');assert(g.bytes>=3000&&g.bytes<=3400,'about 100 ms of 16 kHz PCM per message: '+g.bytes);
  results.setup='model gemini-3.8-live, voice '+(role==='zhiwei'?'Charon (Zhiwei male)':'Kore (Yating female)')+', blocking course-search tool, Mandarin greeting once, 16 kHz microphone stream';

  // An in-course question: the browser searches the course and returns the passages.
  g.ws.send(JSON.stringify({serverContent:{inputTranscription:{text:'什麼是通氣灌流比？'}}}));
  g.ws.send(JSON.stringify({toolCall:{functionCalls:[{id:'call-1',name:'search_course_material',args:{query:'什麼是通氣灌流比'}}]}}));
  await until(()=>g.toolResponses.length===1,8000,'tool response');
  const r1=g.toolResponses[0][0];
  assert.equal(r1.id,'call-1');assert.equal(r1.response.result.status,'ok');assert.match(r1.response.result.passages,/about 0\.8/);
  assert.equal(searches[0],'什麼是通氣灌流比');
  g.ws.send(JSON.stringify({serverContent:{modelTurn:{parts:[{inlineData:{mimeType:'audio/pcm;rate=24000',data:tone(1.2)}}]},outputTranscription:{text:'通氣灌流比是肺泡通氣量與血流量的比值，正常約 0.8。'}}}));
  g.ws.send(JSON.stringify({serverContent:{turnComplete:true}}));
  await page.waitForFunction(()=>/0\.8/.test(document.getElementById('vqLiveLog').textContent)&&document.body.classList.contains('speaking'),null,{timeout:5000});
  const log=await page.$eval('#vqLiveLog',e=>e.textContent);
  assert.match(log,/什麼是通氣灌流比/);assert.match(log,/Sources: Guyton and Hall p\. 530/);
  assert.equal(await page.$eval('#teacherAnswer',e=>e.textContent),'The AI teacher answer will appear here.','the regular Q&A box is untouched');
  results.in_scope='course search ran, passages returned, answer shown and spoken, source listed';

  // Interruption stops the spoken answer immediately.
  g.ws.send(JSON.stringify({serverContent:{modelTurn:{parts:[{inlineData:{mimeType:'audio/pcm;rate=24000',data:tone(3)}}]}}}));
  await page.waitForFunction(()=>document.body.classList.contains('speaking'));
  g.ws.send(JSON.stringify({serverContent:{interrupted:true}}));
  await page.waitForFunction(()=>!document.body.classList.contains('speaking'),null,{timeout:1500});
  results.interrupt='student interruption stops playback at once';

  // An out-of-course question is declined by the course search.
  g.ws.send(JSON.stringify({toolCall:{functionCalls:[{id:'call-2',name:'search_course_material',args:{query:'明天天氣如何'}}]}}));
  await until(()=>g.toolResponses.length===2,8000,'second tool response');
  assert.equal(g.toolResponses[1][0].response.result.status,'out_of_scope');
  results.out_of_scope='outside-course question returned out_of_scope to Gemini';

  // Switching Yating/Zhiwei reconnects with the other voice and keeps the conversation.
  const other=role==='zhiwei'?'yating':'zhiwei';
  const switched=await page.evaluate(v=>{const el=document.getElementById('avatarRoleSelect')||document.getElementById('voiceSelect');if(!el)return false;el.value=v;el.dispatchEvent(new Event('change'));return true;},other);
  if(switched){
    await until(()=>g.setups.length===2,8000,'reconnect');
    assert.equal(g.setups[1].generationConfig.speechConfig.voiceConfig.prebuiltVoiceConfig.voiceName,other==='zhiwei'?'Charon':'Kore');
    assert.equal(g.setups[1].sessionResumption.handle,'handle-1');
    await new Promise(r=>setTimeout(r,500));assert.equal(g.client.length,1,'no second greeting after a voice-switch reconnect');
    results.voice_switch='teacher voice change reconnected with '+(other==='zhiwei'?'Charon':'Kore')+' and resumed the same conversation';
  }

  // Answer source "Selected Q&A model": Gemini only listens/speaks; Gemma writes the checked answer.
  await page.waitForFunction(()=>/Listening|Reconnected/.test(document.getElementById('vqLiveStatus').textContent),null,{timeout:5000});
  const before=g.setups.length;
  await page.focus('#vqLiveMode');
  assert.match(await page.$eval('#vqLiveMode option[value="selected"]',o=>o.textContent),/^Checked reply · Gemma 4 12B \(local\) · slower$/);
  await page.selectOption('#vqLiveMode','selected');
  await until(()=>g.setups.length===before+1,8000,'setup for selected-model mode');
  const sel=g.setups.at(-1);
  assert.equal(sel.tools[0].functionDeclarations[0].name,'answer_course_question');
  assert.equal(sel.tools[0].functionDeclarations[0].behavior,'NON_BLOCKING');
  assert(!sel.sessionResumption.handle,'a new answer source starts a fresh session');
  assert.match(sel.systemInstruction.parts[0].text,/never answer course questions yourself/);
  const responsesBefore=g.toolResponses.length;
  g.ws.send(JSON.stringify({toolCall:{functionCalls:[{id:'call-3',name:'answer_course_question',args:{question:'正常的通氣灌流比是多少？'}}]}}));
  await page.waitForFunction(()=>/is answering from the course/.test(document.getElementById('vqLiveStatus').textContent),null,{timeout:4000});
  // A newer question replaces the one still being prepared: its job is cancelled and its result silenced.
  g.ws.send(JSON.stringify({toolCall:{functionCalls:[{id:'call-4',name:'answer_course_question',args:{question:'通氣灌流比正常值是多少？'}}]}}));
  await until(()=>g.toolResponses.length>=responsesBefore+2,15000,'selected-model tool responses');
  const silenced=g.toolResponses.find(r=>r[0].id==='call-3'),answered=g.toolResponses.find(r=>r[0].id==='call-4');
  assert(silenced&&silenced[0].scheduling==='SILENT'&&silenced[0].response.result.status==='superseded');
  assert.equal(cancels.length,1,'the replaced Gemma job was cancelled on the server');
  assert(answered&&answered[0].scheduling==='WHEN_IDLE');
  assert.equal(answered[0].response.result.status,'answered');assert.match(answered[0].response.result.answer_text,/【gemma】.*0\.8/);
  await page.waitForFunction(()=>/Checked answer by Gemma 4 12B \(local\)/.test(document.getElementById('vqLiveLog').textContent));
  results.selected_model='Gemini listens/speaks; Gemma wrote the checked answer (WHEN_IDLE); a newer question cancelled the older Gemma job';

  // Starting the regular voice question ends the live conversation (one sound source).
  const closedBefore=g.closed;
  await page.click('#vqLiveStop');
  await page.waitForFunction(()=>/Conversation ended/.test(document.getElementById('vqLiveStatus').textContent));
  await until(()=>g.closed>closedBefore,5000,'socket closed');
  assert.equal(await page.$eval('#vqLiveStart',b=>b.disabled),false);
  const tracks=await page.evaluate(()=>window.VQ_GEMINI_LIVE.active);
  assert.equal(tracks,false);
  results.end='End Conversation closed the connection and released the microphone';

  // With a teacher's uploaded course selected, the search uses that course only.
  const uploaded=await page.evaluate(async()=>{window.VQ_UPLOADED_COURSE_ACTIVE=true;localStorage.setItem('VQ_V241_ACTIVE_COURSE_ID','pde-course-1');
    const r=await window.VQ_GEMINI_LIVE.searchCourse('What is the transport equation?');window.VQ_UPLOADED_COURSE_ACTIVE=false;localStorage.removeItem('VQ_V241_ACTIVE_COURSE_ID');return r;});
  assert.equal(uploaded.status,'ok');assert.match(uploaded.passages,/transport equation/);
  assert.equal(searches.at(-1),'course:pde-course-1:What is the transport equation?');
  results.uploaded_course='uploaded course selected -> searched only that course (course-context)';
  assert.deepEqual(errors,[]);
  await browser.close();srv.close();
  console.log(JSON.stringify(results,null,2));
  console.log('[OK] Gemini Live natural conversation: key check, setup, course-scoped answers, interruption, voice switch, end');
}
main().catch(e=>{console.error(e);process.exit(1);});
