// Exercise the production lecture selection function with a conflicting
// built-in lesson, matching the reported uploaded-course regression.
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

for (const page of ['reference', 'kb']) {
  const source = fs.readFileSync(`web/${page}/js/25_v105_resume_after_question_mouth_sync.js`, 'utf8');
  const adapter = fs.readFileSync(`web/${page}/js/55_v241_course_adaptive_ta.js`, 'utf8');
  assert(adapter.includes('window.VQ_getActiveCourseLecture=id=>(manifest.units||[]).find(u=>u.id===id)||null'));
  const start = source.indexOf('function getLessonScript(){');
  const end = source.indexOf('\n\n  function startFallbackTimer', start);
  assert(start >= 0 && end > start);
  const getLessonScript = source.slice(start, end);
  const selected = {value: 'pharmacology_unit_2'};
  const uploaded = {id: selected.value, title: 'Principles of Drug Action', script: 'Pharmacology course material'};
  const context = {
    $: () => selected,
    window: {VQ_getActiveCourseLecture: id => id === uploaded.id ? uploaded : null},
    LESSONS_V105: {basic: {title: 'Gas Exchange Framework', script: 'Built-in gas exchange lecture'}}
  };
  const fn = vm.runInNewContext(`(${getLessonScript})`, context);
  assert.strictEqual(fn().script, uploaded.script, `${page} must speak the selected uploaded unit`);
  assert.strictEqual(fn().title, uploaded.title);
  delete context.window.VQ_getActiveCourseLecture;
  selected.value = 'basic';
  assert.strictEqual(fn().script, context.LESSONS_V105.basic.script, `${page} must retain its built-in lesson`);
  console.log(`[OK] ${page}: uploaded lecture overrides built-in voice controller; built-in fallback works`);
}
