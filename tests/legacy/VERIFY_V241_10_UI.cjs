const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

for (const page of ['reference', 'kb']) {
  const js = fs.readFileSync(`web/${page}/js/55_v241_course_adaptive_ta.js`, 'utf8');
  const start = js.indexOf('function quizCount(){');
  const end = js.indexOf('async function startDynamicQuiz(){', start);
  assert(start >= 0 && end > start);
  const count = {value: '7'};
  const button = {textContent: ''};
  let refreshed=0;
  const ctx = { $: id => id === 'v241QuizCount' ? count : button, manifest: {units: [{}, {}, {}]},
    showPreparation:()=>{refreshed++;} };
  vm.runInNewContext(js.slice(start, end) + '\nthis.countQuiz=quizCount;this.updateCount=updateQuizCount;', ctx);
  assert.strictEqual(ctx.countQuiz(), 7);
  ctx.updateCount();
  assert.strictEqual(refreshed, 1);
  count.value = '10';
  assert.strictEqual(ctx.countQuiz(), 10);
  assert(js.includes("if(e.key==='Enter')") && js.includes('id="v241Finish"'));
  assert(js.includes("'/api/reference/course-quiz-result'") && js.includes("'/api/reference/course-quiz-stats?course_id='"));
  const caseStart = js.indexOf('function installDynamicCase(){');
  const caseEnd = js.indexOf('function quizCount(){', caseStart);
  assert(!js.slice(caseStart, caseEnd).includes('100 distinct source concepts are prepared'), 'Unnecessary subtitle must be removed');

  const summaryStart = js.indexOf('function renderQuizSummary(report,aggregate){');
  const summaryEnd = js.indexOf('\n\nasync function courseAnswerOne', summaryStart);
  assert(summaryStart >= 0 && summaryEnd > summaryStart);
  const body = {innerHTML: ''};
  const summaryCtx = {
    quizState: {generation: {cached_questions: 1, model_calls: 2, elapsed_ms: 5000},items: [
      {stem: 'A patient scenario', unit_title: 'Drug action', answer: 0, choices: ['Right', 'Wrong', 'C', 'D'], explanation: 'The source explains why.'},
      {stem: 'A clinical scenario', unit_title: 'Drug action', answer: 0, choices: ['Correct', 'Wrong', 'C', 'D'], explanation: 'A second explanation.'}
    ]},
    $: id => id === 'v241QuizBody' ? body : {set onclick(fn) {}},
    esc: s => String(s).replace(/</g, '&lt;'),
    startDynamicQuiz() {}
  };
  const render = vm.runInNewContext(`(${js.slice(summaryStart, summaryEnd)})`, summaryCtx);
  render({correct:1,total:2,accuracy:50,answered:2,items:[{choice:0,correct:true},{choice:1,correct:false}]},
    {ok:true,attempts:3,correct:4,questions:6,accuracy:66.7});
  assert(body.innerHTML.includes('Question 1') && body.innerHTML.includes('Correct'));
  assert(body.innerHTML.includes('Question 2') && body.innerHTML.includes('Incorrect'));
  assert(body.innerHTML.includes('3 completed quiz(es)'));
  console.log(`[OK] ${page}: 1–10 question selection, Enter/Finish controls, per-question and aggregate report`);
}
