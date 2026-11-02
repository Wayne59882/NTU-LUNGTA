'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
function classes(){const s=new Set();return {add(...xs){xs.forEach(x=>s.add(x))},remove(...xs){xs.forEach(x=>s.delete(x))},contains:x=>s.has(x)};}
(async()=>{
for(const mode of ['reference','kb']){
  const context={window:{},console};
  vm.runInNewContext(fs.readFileSync(`web/shared/vendor/temml/temml.min.js`,'utf8'),context);
  context.window.temml=context.temml;
  vm.runInNewContext(fs.readFileSync(`web/shared/js/course/course-math.js`,'utf8'),context);
  const api=context.window.CourseMath;
  for(const text of [String.raw`$u_{tt}-\nabla^2u=0$`,String.raw`$u_t+b\bullet\nabla u=0$`,String.raw`$$\frac{\partial u}{\partial t}=\Delta u$$`,String.raw`$\text{div}(u)=0$`,String.raw`$\sum_{i,j}(a_{ij}u)_{x_i x_j}$`]){
    const html=api.html(text);assert(html.includes('<math'),html);assert(!html.includes('course-math-error'),html);
    assert.equal(api.restore(api.protect(text).text,api.protect(text).saved),text);
  }
  const wave=api.html(String.raw`$u_{tt}-\nabla^2u=0$`),heat=api.html(String.raw`$u_t-\nabla^2u=0$`);
  assert.notEqual(wave,heat);assert(wave.includes('<msub>')&&wave.includes('<msup>')&&wave.includes('∇'));
  assert(!api.html('<img src=x onerror=alert(1)>').includes('<img'));
  assert(!api.html(String.raw`$\href{javascript:alert(1)}{click}$`).includes('href="javascript:'));
  assert(api.html(String.raw`$\unknownCommand$`).includes('course-math-error'));
  assert(api.html('$'+'x'.repeat(3501)+'$').length<4000);
  const worker=fs.readFileSync('cloudflare/worker/src/index.js','utf8');
  const clean=worker.slice(worker.indexOf('function cleanStudentAnswer('),worker.indexOf('\nfunction parseMcqOptions('));
  const workerContext={};vm.runInNewContext(clean+'\nthis.clean=cleanStudentAnswer;',workerContext);
  const sample=String.raw`公式 $u_{tt}-\nabla^2u=0$。`;
  assert.equal(workerContext.clean(sample),sample,'cloud/Worker route must preserve formula too');
  const lecture=fs.readFileSync(`web/shared/js/speech/recognition-controller.js`,'utf8');
  const begin=lecture.indexOf('  function buildSegments('),end=lecture.indexOf('  function renderScript(',begin);
  const segmentContext={window:context.window};vm.runInNewContext(lecture.slice(begin,end)+'\nthis.split=buildSegments;',segmentContext);
  const multiline=String.raw`文字。$$\begin{aligned}u_t &= 0\\u_{tt} &= 0\end{aligned}$$`;
  assert(segmentContext.split(multiline).some(s=>s.text.includes('$$')&&s.text.endsWith('$$')));
  console.log(`[OK] ${mode}: real MathML rendering, derivative distinction, XSS, parser limits and graceful error fallback`);

  // Execute the actual avatar module with deferred GLB loads. Hundreds of
  // repeated voice/start requests must allocate exactly one head per role.
  let created=0,disposed=0,pending=[];
  class TalkingHead{constructor(){created++;this.scene={traverse(fn){fn({morphTargetDictionary:{jawOpen:0},morphTargetInfluences:[0]})}}}showAvatar(){return new Promise(r=>pending.push(r))}dispose(){disposed++}setView(){}stopGesture(){}lookAtCamera(){}playGesture(){}}
  const stage={innerHTML:'',setAttribute(){}},fallback={},loading={classList:classes()},host={classList:classes(),setAttribute(){},querySelector(){return {}},prepend(){},appendChild(){}};
  const elements={avatar:host,vq3dAvatarStage:stage,vq3dAvatarFallback:fallback,vq3dAvatarLoading:loading,status:{}};
  const doc={readyState:'loading',getElementById:id=>elements[id]||null,addEventListener(){},body:{classList:classes()}};
  const c={TalkingHead,document:doc,window:{devicePixelRatio:3},navigator:{userAgent:'iPhone'},localStorage:{getItem(){return null},setItem(){}},setTimeout(){return 1},clearTimeout(){},console};
  let src=fs.readFileSync(`web/shared/js/avatar/avatar-controller.js`,'utf8').replace(/^import .*;$/m,'');
  vm.runInNewContext(src,c);
  const avatar=c.window.VQ_REAL_AVATAR;
  let calls=Array.from({length:50},()=>avatar.applyRole('zhiwei',true));
  assert.equal(created,1);pending.shift()();await Promise.all(calls);
  await Promise.all(Array.from({length:100},()=>avatar.applyRole('zhiwei',true)));
  assert.equal(created,1);assert.equal(disposed,0);
  calls=Array.from({length:25},()=>avatar.applyRole('yating',true));assert.equal(created,2);assert.equal(disposed,1);
  pending.shift()();await Promise.all(calls);assert.equal(created,2);
  console.log(`[OK] ${mode}: repeated speech/avatar requests reuse model; switching role loads once and disposes once`);

  let queue=new Map(),tid=0,spoken=[],canceled=0;
  class Synth{speak(u){spoken.push(u)}cancel(){canceled++}pause(){}resume(){}getVoices(){return [{name:'Zhiwei',lang:'zh-TW'},{name:'Yating',lang:'zh-TW'}]}}
  class Utterance{constructor(text){this.text=text;this.lang='zh-TW'}}
  const voiceWindow={speechSynthesis:new Synth(),SpeechSynthesis:Synth,VQ_REAL_AVATAR:{role:'zhiwei',applyRole(){throw Error('same role must not reload')}}};
  const speechContext={window:voiceWindow,SpeechSynthesisUtterance:Utterance,document:{readyState:'loading',getElementById(){return null},querySelector(){return null},addEventListener(){}},localStorage:{getItem(){return null},setItem(){}},performance:{now:()=>100},setTimeout(fn){queue.set(++tid,fn);return tid},clearTimeout(id){queue.delete(id)},console};
  vm.runInNewContext(fs.readFileSync(`web/shared/js/speech/voice-controller.js`,'utf8'),speechContext);
  queue.clear();const synth=voiceWindow.speechSynthesis;
  let ended=0;const a=new Utterance('甲'.repeat(250));a.onend=()=>ended++;
  synth.speak(a);assert.equal(spoken.length,1);const staleEnd=spoken[0].onend;staleEnd({});
  synth.cancel();const b=new Utterance('新的講稿。');synth.speak(b);const before=spoken.length;
  for(const fn of [...queue.values()])fn();assert.equal(spoken.length,before,'old segment must not restart a new lecture');
  staleEnd({});assert.equal(ended,0);assert.equal(spoken.length,before);
  synth.pause();assert(voiceWindow.VQ_VOICE_TRANSPORT_STATE.paused);synth.resume();assert(!voiceWindow.VQ_VOICE_TRANSPORT_STATE.paused);
  spoken.at(-1).onend({});assert.equal(voiceWindow.VQ_VOICE_TRANSPORT_STATE.source,null);
  console.log(`[OK] ${mode}: start/stop/restart, stale callback cancellation, pause/resume and completion`);
}
})().catch(e=>{console.error(e);process.exitCode=1});
