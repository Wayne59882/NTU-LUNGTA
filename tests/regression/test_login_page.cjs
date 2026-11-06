require('../helpers.cjs');
'use strict';
// Login page: both password fields have a show/hide button, never auto-capitalize
// (a capital first letter typed by a phone keyboard would break the password), and
// the change-password dialog can show what is typed.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('web/login/index.html','utf8');
for(const id of ['loginPassword','regPassword']){
  const input=html.match(new RegExp('<input id="'+id+'"[^>]*>'))[0];
  assert.match(input,/type="password"/);assert.match(input,/autocapitalize="none"/);assert.match(input,/spellcheck="false"/);
  assert.match(html,new RegExp('<button type="button" class="pw-toggle" data-for="'+id+'"[^>]*aria-pressed="false"[^>]*aria-label="顯示密碼 Show password"'));
}
assert.match(html,/input\.type=visible\?'text':'password'/);
assert.match(html,/addEventListener\('submit',\(\)=>form\.querySelectorAll\('\.pw-toggle'\)\.forEach\(b=>setVisible\(b,false\)\),true\)/,'hidden again when sent');
const role=fs.readFileSync('web/shared/js/auth/role-access.js','utf8');
assert.match(role,/顯示密碼 Show password/);assert.match(role,/f\.old\.type=type;f\.new\.type=type;/);
// API-key fields (cloud model and natural conversation) have the same Show / Hide button.
const page=fs.readFileSync('web/reference/index.html','utf8');
assert.match(page,/<input id="cloudApiKeyInput" type="password"[^>]*data-show-toggle-auto/);
assert(page.indexOf('shared/js/ui/show-toggle.js')>0&&page.indexOf('shared/js/ui/show-toggle.js')<page.indexOf('shared/js/models/cloud-selector.js'),'helper loads before the key fields are used');
assert.match(fs.readFileSync('web/shared/js/qa/gemini-live.js','utf8'),/window\.VQ_addShowToggle\(input\)/);
const helper=fs.readFileSync('web/shared/js/ui/show-toggle.js','utf8');
assert.match(helper,/input\.type=visible\?'text':'password'/);assert.match(helper,/window\.VQ_addShowToggle=add/);
console.log('[OK] login page: show/hide password on sign-in and register, no auto-capitalization, change-password dialog and API-key fields can show what was typed');
