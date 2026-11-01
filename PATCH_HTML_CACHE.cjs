'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert');
const base=path.resolve(process.argv[2]||'');
const defaults={VT:500,VD:150,f:15,FIO2:.21,Altitude:0,VO2:300,R:.8,Hb:15,QT:5.5,Shunt:0,DLO2:32};
const tags={
 '05_recognition_stop_on_submit':'241125manualR720261021',
 '25_v105_resume_after_question_mouth_sync':'241125voiceR920261021',
 '29_v153_course_aligned_student_results':'241129vqhopkinsregion20261010',
 '35_hopkins_reference_lung_physiology':'241129vqhopkinsregion20261010',
 '55_v241_course_adaptive_ta':'241125defaultVQonlyR820261021'
};
const updates=[];
for(const mode of ['kb','reference']){
 const file=path.join(base,'web',mode,'index.html');let html=fs.readFileSync(file,'utf8');
 for(const [key,value] of Object.entries(defaults)){
  const tag=html.match(new RegExp('<input[^>]*id="v149_'+key+'"[^>]*>'));
  assert(tag,'Missing original input '+key);
  const v=tag[0].match(/value="([^"]+)"/);assert(v&&Number(v[1])===value,'Unexpected original input '+key);
 }
 for(const [name,tag] of Object.entries(tags)){
  const re=new RegExp('(\\bsrc\\s*=\\s*["\\\'][^"\\\']*\\/'+name+'\\.js)(?:\\?[^"\\\']*)?(["\\\'])','g');
  const matches=[...html.matchAll(re)];assert(matches.length===1,'Expected one script loader for '+name);
  html=html.replace(re,(_,prefix,quote)=>prefix+'?v='+tag+quote);
 }
 updates.push({file,html});
}
if(process.argv.includes('--check-only')){console.log('[OK] Existing HTML inputs and script loaders verified.');process.exit(0);}
for(const {file,html} of updates){
 const tmp=file+'.vq_cache_'+process.pid;
 try{fs.writeFileSync(tmp,html,{mode:fs.statSync(file).mode&0o777});fs.renameSync(tmp,file);}
 finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp);}
}
console.log('[OK] Cache tags patched; other existing HTML content preserved.');

