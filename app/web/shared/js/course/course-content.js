/* R13: subject-neutral display and integrity checks, shared by every course. */
(function(){
  'use strict';
  const bad=/[\uFFFD\uE000-\uF8FF\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}\x00-\x08\x0B\x0C\x0E-\x1F\x7F]|\(cid:\d+\)|ï¿½|â€™|â€œ|â€“|â€”|Ã©|Ã¼|Ã¶|Ã¤|Â°|Âµ|Â±/u;
  const notice='此內容含無法辨識的文字或符號，請重新準備此單元。 Content needs source review; please retry preparation.';
  function issues(value){return bad.test(String(value||''));}
  function clean(value){const text=String(value||'').replace(/\r\n?/g,'\n').normalize('NFC').trim();if(issues(text))throw new Error(notice);return text;}
  function display(value){try{return clean(value);}catch(_){return notice;}}
  function questionOk(q){return q&&Array.isArray(q.choices)&&![q.stem,q.explanation,...q.choices,...(Array.isArray(q.choice_explanations)?q.choice_explanations:[])].some(issues);}
  window.CourseContent={issues,clean,display,questionOk};
})();
