'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert');
const [action,sourceArg,targetArg,backupArg]=process.argv.slice(2);
const source=fs.realpathSync(sourceArg),target=fs.realpathSync(targetArg);
const inside=(root,rel)=>{assert(rel&&!path.isAbsolute(rel)&&!rel.split('/').includes('..')&&!/[\r\n]/.test(rel),'Unsafe manifest path');return path.join(root,rel);};
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const rels=fs.readFileSync(path.join(source,'FULL_RELEASE_FILES.txt'),'utf8').split(/\r?\n/).filter(Boolean);
assert(new Set(rels).size===rels.length,'Duplicate manifest file');
const dataPath=r=>r.startsWith('course_workspaces/')||r.startsWith('benchmark/state/')||r.startsWith('logs/')||r.startsWith('backups/')||(r.startsWith('analytics/')&&r!=='analytics/README.md')||r.endsWith('.env')||/\.(?:sqlite3?|db)$/.test(r);
for(const r of rels){assert(!dataPath(r),'Persistent user data must not be in release manifest: '+r);assert(fs.statSync(inside(source,r)).isFile(),'Missing full-release file: '+r);}
const preserveExisting=new Set(['wrangler.jsonc','reference_corpus/chunks.jsonl','reference_corpus/corpus_meta.json']);
const allowedOps=rels.map(r=>({rel:r,src:r}));
const ops=allowedOps.filter(x=>!(preserveExisting.has(x.rel)&&fs.existsSync(inside(target,x.rel))));
for(const r of rels.filter(r=>r.startsWith('web/reference/assets/'))){
 const rel=r.replace('web/reference/assets/','web/kb/assets/');
 if(!allowedOps.some(x=>x.rel===rel)){allowedOps.push({rel,src:r});ops.push({rel,src:r});}
}
function assertTargetPath(rel){
 const p=inside(target,rel);
 if(fs.existsSync(p)){assert(!fs.lstatSync(p).isSymbolicLink(),'Symlinked target file: '+rel);assert(fs.statSync(p).isFile(),'Expected target file: '+rel);}
 let parent=path.dirname(p);while(!fs.existsSync(parent))parent=path.dirname(parent);
 const real=fs.realpathSync(parent);
 assert(real===target||real.startsWith(target+path.sep),'Target parent is outside app: '+rel);
}
for(const op of ops)assertTargetPath(op.rel);
if(action==='preflight'){
 const runtime=['gateway.py','reference_server.py','reference_search.py','scope_guard.py','course_runtime.py','exam_questions.py','site_metrics.py','kb_server.py','feedback/feedback_service.py'];
 for(const r of runtime){
  const p=inside(target,r);assert(fs.existsSync(p)&&hash(p)===hash(inside(source,r)),'Running backend differs from this v241.12.5 full release: '+r+'. Stop and reconcile it before updating.');
 }
 console.log('[OK] Full release manifest verified: '+rels.length+' files; running backend is unchanged.');
 process.exit(0);
}
const backup=fs.realpathSync(backupArg);
assert(backup.startsWith(path.join(target,'backups')+path.sep),'Backup must be under this app backups directory.');
const planPath=path.join(backup,'restore_plan.json');
if(action==='backup'){
 const plan=ops.map(op=>({...op,existed:fs.existsSync(inside(target,op.rel))}));
 for(const op of plan)if(op.existed){
  const p=inside(backup,op.rel);fs.mkdirSync(path.dirname(p),{recursive:true});fs.copyFileSync(inside(target,op.rel),p);fs.chmodSync(p,fs.statSync(inside(target,op.rel)).mode&0o777);
 }
 fs.writeFileSync(planPath,JSON.stringify({target,source,ops:plan},null,2)+'\n');
 console.log('[OK] Full program files backed up: '+plan.length+' destinations.');
}else if(action==='apply'){
 const plan=JSON.parse(fs.readFileSync(planPath,'utf8'));assert(plan.target===target&&plan.source===source,'Backup identity mismatch');
 for(const op of plan.ops){
  assertTargetPath(op.rel);const src=inside(source,op.src),dest=inside(target,op.rel);fs.mkdirSync(path.dirname(dest),{recursive:true});
  const tmp=dest+'.full_stage_'+process.pid;
  try{fs.copyFileSync(src,tmp);fs.chmodSync(tmp,fs.statSync(src).mode&0o777);fs.renameSync(tmp,dest);}finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp);}
 }
 console.log('[OK] Complete program installed; existing configuration, corpus, courses, databases and keys retained.');
}else if(action==='restore'){
 const plan=JSON.parse(fs.readFileSync(planPath,'utf8'));assert(plan.target===target&&plan.source===source,'Backup identity mismatch');
 for(const op of plan.ops){
  assert(allowedOps.some(x=>x.rel===op.rel&&x.src===op.src),'Unexpected restore destination');
  assertTargetPath(op.rel);const dest=inside(target,op.rel);
  if(op.existed){fs.copyFileSync(inside(backup,op.rel),dest);fs.chmodSync(dest,fs.statSync(inside(backup,op.rel)).mode&0o777);}
  else if(fs.existsSync(dest))fs.unlinkSync(dest);
 }
 console.log('[OK] Original full program files restored.');
}else throw Error('Expected preflight, backup, apply or restore.');

