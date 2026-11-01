const fs=require('fs'),vm=require('vm');
function load(file){
  const sandbox={window:{},document:{readyState:'loading',addEventListener(){}},console};
  vm.runInNewContext(fs.readFileSync(file,'utf8'),sandbox,{filename:file});
  return sandbox;
}
function assert(cond,msg){if(!cond){throw new Error(msg);}}
function q(n,heading){
  const h=n===1?'':(heading==='markdown'?`### ${n}\n\n`:heading==='bare'?`${n}\n\n`:`${n}. `);
  return `${h}Question ${n}?\n\nA. A${n}\n\nB. B${n}\n\nC. C${n}\n\nD. D${n}`;
}
for(const file of ['web/reference/js/51_v228_multi_question_batch.js','web/kb/js/51_v228_multi_question_batch.js']){
  const s=load(file),split=s.window.VQ_splitQuestionBatch;
  assert(typeof split==='function',file+': splitter missing');
  let raw=Array.from({length:20},(_,i)=>q(i+1,'markdown')).join('\n\n');
  let arr=split(raw); assert(arr.length===20,file+`: Markdown heading batch parsed ${arr.length}/20`);
  assert(arr[0].startsWith('Question 1?')&&arr[19].startsWith('Question 20?'),file+': order/content corrupted');
  raw=Array.from({length:20},(_,i)=>q(i+1,'bare')).join('\n\n');
  arr=split(raw); assert(arr.length===20,file+`: bare-number batch parsed ${arr.length}/20`);
  raw=`Question 1?\nA. a\nB. b\nC. c\nD. d\n\n2.【114 年第二次｜原第 28 題】\nQuestion 2?\nA. a\nB. b\nC. c\nD. d`;
  arr=split(raw); assert(arr.length===2,file+': exam metadata heading not parsed');
  raw=`Question 1?\nA. a\nB. b\nC. c\nD. d\n\n### Notes\nThis is metadata.`;
  arr=split(raw); assert(arr.length===1,file+': ordinary single MCQ changed into batch');
}
// Also verify the independent v238 fallback parser in the async Reference wrapper.
{
  const s=load('web/reference/js/52_v229_semantic_microbatch.js');
  const split=s.window.VQ_fallbackSplitBatch238;
  assert(typeof split==='function','v238 fallback splitter missing');
  const raw=Array.from({length:20},(_,i)=>q(i+1,'markdown')).join('\n\n');
  const arr=split(raw); assert(arr.length===20,`async fallback parsed ${arr.length}/20`);
}
console.log('V238 ROBUST BATCH PARSER REGRESSION PASSED: Markdown ### N, bare N, exam metadata, 20-item completeness');
