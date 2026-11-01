const assert=require('assert');
const fs=require('fs');
const vm=require('vm');

(async()=>{
  for(const page of ['reference','kb']){
    const js=fs.readFileSync(`web/${page}/js/55_v241_course_adaptive_ta.js`,'utf8');
    const from=js.indexOf('async function startDynamicQuiz(){'),to=js.indexOf('function renderDynamicQuestion(){',from);
    assert(from>=0&&to>from);
    const btn={disabled:false,dataset:{}},body={dataset:{},textContent:''},calls=[];
    const ctx={manifest:{course_id:'test-course',units:[{},{}]},quizState:null,
      $:id=>id==='v241StartQuiz'?btn:body,quizCount:()=>10,quizReady:()=>true,quizUnits:()=>[{id:'u1'},{id:'u2'}],
      renderDynamicQuestion:()=>{},fetch:async(path,init)=>{calls.push(path);const payload=JSON.parse(init.body);assert.strictEqual(payload.per_unit,10);assert.deepStrictEqual(payload.unit_ids,['u1','u2']);return {ok:true,json:async()=>({ok:true,quiz_id:'a'.repeat(32),questions:Array(20).fill({id:'q'}),generation:{prebuilt_questions:20,model_calls:0}})};}};
    vm.runInNewContext(js.slice(from,to)+'\nthis.startQuiz=startDynamicQuiz;',ctx);
    await ctx.startQuiz();
    assert.deepStrictEqual(calls,['/api/reference/course-quiz']);
    assert.strictEqual(ctx.quizState.items.length,20);
    assert.strictEqual(ctx.quizState.generation.model_calls,0);
    assert(!js.includes('X-VQ-Course-Delete-Token')&&!js.includes('window.prompt('));
    console.log(`[OK] ${page}: ten questions per unit use one ready-bank request; deletion asks no server code`);
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
