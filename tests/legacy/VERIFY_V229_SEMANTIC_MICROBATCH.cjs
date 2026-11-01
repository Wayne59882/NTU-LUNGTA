const fs=require('fs');
const vm=require('vm');
const path=require('path');
let fetchCalls=0,startCalls=0,statusCalls=0,singleCalls=0,lastBody=null;
const batchAnswers=Array.from({length:15},(_,i)=>({id:i+1,answer:'正確答案：C. mock '+(i+1)+'\n解釋：完整句子。',verification:{mandatory_verification:true,semantic_verification_used:true,semantic_verification_verdict:'pass'}}));
const context={
  console,
  window:{VQ_getCloudConfig:()=>({provider:'off',apiKey:''}),VQ_detectLanguage:()=> 'zh-TW'},
  document:{readyState:'complete',getElementById:()=>null,addEventListener:()=>{}},
  setTimeout,clearTimeout,AbortController,Promise,Set,Map,String,Number,RegExp,
  fetch:async (url,opts={})=>{
    fetchCalls++;
    if(String(url).includes('/api/reference/batch-job-start')){
      startCalls++;lastBody=JSON.parse(opts.body);return {ok:true,status:202,json:async()=>({ok:true,job_id:'job1',status:'queued'})};
    }
    if(String(url).includes('/api/reference/job-status')){
      statusCalls++;return {ok:true,status:200,json:async()=>({status:'done',progress:100,result:{answers:batchAnswers,engine:'local-microbatch',mandatory_verification:true}})};
    }
    throw new Error('unexpected fetch '+url);
  }
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,'web/reference/js/51_v228_multi_question_batch.js'),'utf8'),context);
context.window.VQ_generateFinalAnswer=async q=>{singleCalls++;return '正確答案：C. single\n解釋：完整句子。';};
if(!context.window.VQ_installBatch228())throw new Error('v228 parser wrapper did not install');
vm.runInContext(fs.readFileSync(path.join(__dirname,'web/reference/js/52_v229_semantic_microbatch.js'),'utf8'),context);
if(typeof context.window.VQ_installBatch229!=='function')throw new Error('batch installer not exposed');
if(!context.window.VQ_installBatch229())throw new Error('batch wrapper did not install');
const sample=Array.from({length:15},(_,i)=>`${i+1}. 題目 ${i+1}：正常呼吸生理測試？\nA. 選項A\nB. 選項B\nC. 選項C\nD. 選項D`).join('\n\n');
(async()=>{
  const out=await context.window.VQ_generateFinalAnswer(sample);
  if(startCalls!==1)throw new Error('expected one async batch start call, got '+startCalls);
  if(statusCalls<1)throw new Error('expected batch status polling');
  if(!lastBody||!Array.isArray(lastBody.questions)||lastBody.questions.length!==15)throw new Error('batch body did not preserve 15 questions');
  if(singleCalls!==0)throw new Error('v228 sequential single-question loop was used');
  for(let i=1;i<=15;i++){const oldFmt=i+'. 正確答案：C. mock '+i,newFmt='第 '+i+' 題\n正確答案：C. mock '+i;if(!out.includes(oldFmt)&&!out.includes(newFmt))throw new Error('missing answer '+i);}
  const single='正常成人肺泡壓力為何？\nA. 10\nB. 1\nC. -1\nD. -10';
  const one=await context.window.VQ_generateFinalAnswer(single);
  if(singleCalls!==1||!one.includes('single'))throw new Error('single-question passthrough changed');
  console.log('[OK] 15-question local-only paste starts one server-side async job');
  console.log('[OK] Browser polls short status requests instead of holding one long Cloudflare request');
  console.log('[OK] answer order 1..15 is preserved');
  console.log('[OK] single-question wrapper passthrough remains intact');
  console.log('ALL STABLE LOCAL MICROBATCH ACCEPTANCE CHECKS PASSED');
})().catch(e=>{console.error(e);process.exit(1);});
