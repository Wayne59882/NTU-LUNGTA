const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

async function main() {
for (const page of ['reference', 'kb']) {
  const feedback = fs.readFileSync(`web/${page}/js/53_local_answer_feedback.js`, 'utf8');
  const adapter = fs.readFileSync(`web/${page}/js/55_v241_course_adaptive_ta.js`, 'utf8');
  const voice = fs.readFileSync(`web/${page}/js/45_v204_final_voice_controller.js`, 'utf8');
  const elements = {};
  const head = {appendChild(el) {elements[el.id] = el;}};
  elements.teacherAnswer = {insertAdjacentElement(position, el) {elements[el.id] = el; elements.vqFeedback239Btn = {addEventListener() {}};}};
  const context = {
    window: {VQ_LAST_COURSE_ANSWER_META: {course_id: 'course-123', engine: 'local-course-rag', sources: [{chunk_id: 'evidence'}]}},
    document: {readyState: 'loading', head, getElementById: id => elements[id] || null,
      createElement: tag => ({tag, style: {}, innerHTML: '', textContent: '', id: ''}),
      addEventListener() {}},
    performance: {now: (() => {let t = 0; return () => ++t;})()},
    setTimeout: fn => fn()
  };
  vm.runInNewContext(feedback, context);
  assert.strictEqual(typeof context.window.VQ_showAnswerFeedback, 'function');
  context.window.VQ_showAnswerFeedback('Student question', 'Course answer', 24);
  assert.strictEqual(elements.vqFeedback239Wrap.style.display, 'flex', `${page}: Report must appear after course answers`);

  const start = adapter.indexOf('function installAnswerAdapter(){');
  const end = adapter.indexOf('\n\nasync function restoreDraft()', start);
  assert(start >= 0 && end > start);
  const bridge = vm.runInNewContext(`(${adapter.slice(start, end)})`, {
    window: context.window, manifest: {course_id: 'course-123'}, legacyAnswer: null,
    courseAnswerOne: async () => 'Uploaded unit answer', adapterInstalled: false,
    performance: context.performance, setTimeout: fn => fn(),
    $: id => elements[id] || null
  });
  context.window.VQ_generateFinalAnswer = async () => 'Built-in answer';
  let reported = null;
  const actualShow = context.window.VQ_showAnswerFeedback;
  context.window.VQ_showAnswerFeedback = (q, a, elapsed) => {reported = {q, a, elapsed}; actualShow(q, a, elapsed);};
  bridge();
  assert.strictEqual(context.window.VQ_generateFinalAnswer.__v241CourseAdapter, true);
  assert.strictEqual(await context.window.VQ_generateFinalAnswer('Student question'), 'Uploaded unit answer');
  assert.strictEqual(reported.q, 'Student question');
  assert.strictEqual(reported.a, 'Uploaded unit answer');

  const roleStart = voice.indexOf('function targetVoice(role,lang){');
  const roleEnd = voice.indexOf('\n\n  function normalizeMedical', roleStart);
  assert(roleStart >= 0 && roleEnd > roleStart);
  const female = {name: 'Yating Female', lang: 'zh-TW'};
  const male = {name: 'Zhiwei Male', lang: 'zh-TW'};
  let voices = [male];
  const voiceCtx = {
    allVoices: () => voices,
    normalizedSpeechLang: s => s,
    voiceMatchesLanguage: (v, s) => v.lang === s,
    voiceText: v => v.name + ' ' + v.lang,
    ROLE_MALE_RE: /Zhiwei|Male/i,
    ROLE_FEMALE_RE: /Yating|Female/i
  };
  const targetVoice = vm.runInNewContext(`(${voice.slice(roleStart, roleEnd)})`, voiceCtx);
  assert.strictEqual(targetVoice('yating', 'zh-TW'), null, `${page}: Yating cannot silently play a male voice`);
  voices = [male, female];
  assert.strictEqual(targetVoice('yating', 'zh-TW'), female);
  assert.strictEqual(targetVoice('zhiwei', 'zh-TW'), male);
  console.log(`[OK] ${page}: Report visible, uploaded-course adapter bridge, role-matched Chinese voice`);
}
}
main().catch(error => {console.error(error); process.exitCode = 1;});
