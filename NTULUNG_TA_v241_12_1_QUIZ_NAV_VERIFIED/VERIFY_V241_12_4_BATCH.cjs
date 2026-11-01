// Offline regression fixtures test count/order/recovery; these are not accuracy data.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const js='web/reference/js/';
const q=n=>`${n}.Question ${n}?\nA.甲\nB.乙\nC.丙\nD.丁`;
const good='正確答案：A. 甲\n解釋：這是完整的測試回覆。';
function sandbox(){return {window:{},document:{readyState:'loading',addEventListener(){},getElementById(){return null;}},console:{log(){},error(){}},setTimeout(){return 0;},clearTimeout(){},AbortController,performance:{now:()=>0}};}
function load(s,name){vm.runInNewContext(fs.readFileSync(js+name,'utf8'),s,{filename:name});}
async function main(){
  const s=sandbox();load(s,'51_v228_multi_question_batch.js');load(s,'52_v229_semantic_microbatch.js');
  for(const n of [5,20,41,100])for(const split of [s.window.VQ_splitQuestionBatch,s.window.VQ_fallbackSplitBatch238]){
    const out=split(Array.from({length:n},(_,i)=>q(i+1)).join('\n'));
    assert.equal(out.length,n);out.forEach((text,i)=>assert(text.startsWith(`Question ${i+1}?`)));
  }
  for(const markers of [['A．','B．','C．','D．'],['(A)','(B)','(C)','(D)'],['Ａ.','Ｂ.','Ｃ.','Ｄ.']]){
    const raw=[1,2,3,4,5].map(n=>`${n}.Question ${n}?\n`+markers.map(m=>m+'內容').join('\n')).join('\n');
    assert.equal(s.window.VQ_splitQuestionBatch(raw).length,5);
  }
  assert.equal(s.window.VQ_splitQuestionBatch([1,2,3,4,5].map(n=>`${n}.Question ${n}?\nA.甲 B.乙 C.丙 D.丁`).join('\n')).length,5);
  assert.equal(s.window.VQ_splitQuestionBatch(q(1)+'\n2.第二題？\nA.甲\nB.乙').length,2);
  assert.equal(s.window.VQ_cleanStudentAnswer('ΔPaO2 ≈ 50 ± 2 ↑ 😊✅'), 'ΔPaO2 ≈ 50 ± 2 ↑');
  assert(!s.window.VQ_validateStudentAnswer(q(1),'正確答案：😊').ok);
  assert(!s.window.VQ_validateStudentAnswer(q(1),'正確答案：A.甲\n解釋：😊').ok);
  assert(!s.window.VQ_validateStudentAnswer(q(1),good+',').ok);
  assert.equal(s.window.VQ_readQuestionText({innerText:'1.題目\nA.甲',textContent:'1.題目A.甲'}),'1.題目\nA.甲');
  for(const provider of ['off','openai'])for(const n of [5,20,41,100]){
    const t=sandbox(),single=[];load(t,'51_v228_multi_question_batch.js');load(t,'52_v229_semantic_microbatch.js');
    t.window.VQ_generateFinalAnswer=async question=>{single.push(question);return good;};
    t.window.VQ_getCloudConfig=()=>({provider,apiKey:provider==='off'?'':'fixture-key'});
    const requests=[],jobs=new Map();
    t.fetch=async (url,init)=>{
      if(url.startsWith('/api/reference/job-status'))return {ok:true,json:async()=>({status:'done',result:jobs.get(url.split('=')[1])})};
      const body=JSON.parse(init.body);requests.push(body.questions);
      // Deliberately omit one row, blank another, and truncate a third.
      const answers=body.questions.map((question,i)=>({id:i+1,answer:i===1?'':i===2?good+',':good,answer_language:'zh-TW'})).filter(row=>row.id!==body.questions.length);
      if(provider==='off'){const job_id=String(requests.length);jobs.set(job_id,{answers});return {ok:true,json:async()=>({job_id})};}
      return {ok:true,json:async()=>({answers})};
    };
    t.window.VQ_installBatch229();
    const result=await t.window.VQ_generateFinalAnswer(Array.from({length:n},(_,i)=>q(i+1)).join('\n'));
    const headings=Array.from(result.matchAll(/^第 (\d+) 題$/gm),m=>Number(m[1]));
    assert.deepEqual(headings,Array.from({length:n},(_,i)=>i+1));
    assert.equal(t.window.VQ_REFERENCE_BATCH_LAST_META.answers.length,n);
    assert.equal(t.window.VQ_LAST_BATCH_META.completed,n);
    assert(single.length>0);
    assert(requests.every(group=>group.length<=(provider==='off'?40:4)));
  }
  // An unrecoverable individual row retains its numbered slot, not a fake success.
  const t=sandbox();load(t,'51_v228_multi_question_batch.js');load(t,'52_v229_semantic_microbatch.js');
  t.window.VQ_generateFinalAnswer=async()=>{throw new Error('fixture failure');};
  t.window.VQ_getCloudConfig=()=>({provider:'openai',apiKey:'fixture-key'});
  t.fetch=async()=>({ok:true,json:async()=>({answers:[{id:1,answer:good,answer_language:'zh-TW'}]})});
  t.window.VQ_installBatch229();const text=await t.window.VQ_generateFinalAnswer(q(1)+'\n'+q(2));
  assert.equal((text.match(/^第 \d+ 題$/gm)||[]).length,2);assert(text.includes('尚未完成'));
  assert.equal(t.window.VQ_LAST_BATCH_META.completed,1);assert.equal(t.window.VQ_LAST_BATCH_META.failed,1);
  // Uploaded-course adaptation must continue after one item fails twice.
  const courseSource=fs.readFileSync(js+'55_v241_course_adaptive_ta.js','utf8');
  const adapter=courseSource.slice(courseSource.indexOf('function installAnswerAdapter(){'),courseSource.indexOf('async function restoreDraft(){'));
  for(const n of [5,20,100]){
    const c=sandbox();load(c,'51_v228_multi_question_batch.js');
    c.courseAnswerOne=async question=>{if(question.includes('Question 2?'))throw new Error('fixture course failure');return good;};
    c.qLang=()=> 'zh-TW';
    vm.runInNewContext("let manifest={course_id:'fixture'},legacyAnswer=null,adapterInstalled=false;const $=()=>null;"+adapter+'installAnswerAdapter();',c);
    const answer=await c.window.VQ_generateFinalAnswer(Array.from({length:n},(_,i)=>q(i+1)).join('\n'));
    assert.equal((answer.match(/^Question \d+$/gm)||[]).length,n);assert(answer.includes('尚未完成'));
    assert.equal(c.window.VQ_LAST_BATCH_META.completed,n-1);assert.equal(c.window.VQ_LAST_BATCH_META.failed,1);
  }
  // All 100 supported course items finish, and a malformed single item retries.
  const allCourse=sandbox();load(allCourse,'51_v228_multi_question_batch.js');let courseCalls=0;
  allCourse.courseAnswerOne=async()=>{courseCalls++;return good;};allCourse.qLang=()=> 'zh-TW';
  vm.runInNewContext("let manifest={course_id:'fixture'},legacyAnswer=null,adapterInstalled=false;const $=()=>null;"+adapter+'installAnswerAdapter();',allCourse);
  const allAnswer=await allCourse.window.VQ_generateFinalAnswer(Array.from({length:100},(_,i)=>q(i+1)).join('\n'));
  assert.equal((allAnswer.match(/^Question \d+$/gm)||[]).length,100);assert.equal(courseCalls,100);
  assert.equal(allCourse.window.VQ_LAST_BATCH_META.completed,100);assert.equal(allCourse.window.VQ_LAST_BATCH_META.failed,0);
  courseCalls=0;allCourse.courseAnswerOne=async()=>++courseCalls===1?'正確答案：A.甲':good;
  assert.equal(await allCourse.window.VQ_generateFinalAnswer(q(1)),good);assert.equal(courseCalls,2);
  const source=fs.readFileSync('cloudflare/worker/src/index.js','utf8');
  const worker=await import('data:text/javascript;base64,'+Buffer.from(source+'\nexport {cleanStudentAnswer,fastVerifyStudentAnswer,cloudBatchFromContexts};').toString('base64'));
  assert(!worker.fastVerifyStudentAnswer(q(1),'正確答案：A. 甲\n解釋：😊').ok);
  assert.equal(worker.cleanStudentAnswer('ΔPaO2 ≈ 50 ± 2 ↑ 😊✅'),'ΔPaO2 ≈ 50 ± 2 ↑');
  const oldFetch=global.fetch;
  try{
    // Simulate a broken batch response; one individual retry also fails.
    global.fetch=async(url,init)=>{
      const body=JSON.parse(init.body);
      if(body.input.includes('ITEM '))throw new Error('fixture batch unavailable');
      if(body.input.includes('Question 2?'))throw new Error('fixture single unavailable');
      return new Response(JSON.stringify({output_text:good}),{headers:{'Content-Type':'application/json'}});
    };
    const rows=await worker.cloudBatchFromContexts({provider:'openai',apiKey:'fixture-key'},[1,2,3,4,5].map(id=>({id,question:q(id),context:'Fixture passage.',language_tag:'zh-TW'})));
    assert.deepEqual(rows.map(x=>x.id),[1,2,3,4,5]);assert.equal(rows[1].status,'error');assert(!rows[0].status);
  }finally{global.fetch=oldFetch;}
  console.log('[OK] 5/20/41/100 questions, no-space/fullwidth options, count/order, local/cloud missing-row recovery, errors and emoji cleanup. Offline fixtures only.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
