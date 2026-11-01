// R12: run the Worker first for the application pages so it can check the sign-in session.
// Usage: node patch_wrangler_gate.cjs <app dir> <config_helper.cjs>
const fs=require('fs'),path=require('path'),{parseJsonc}=require(path.resolve(process.argv[3]));
const f=path.join(process.argv[2],'wrangler.jsonc');const cfg=parseJsonc(fs.readFileSync(f,'utf8'));
const want=['/api/*','/','/index.html','/reference','/reference/','/reference/index.html','/kb','/kb/','/kb/index.html'];
if(!cfg.assets||cfg.assets.directory!=='web')throw Error('Unexpected wrangler.jsonc assets section');
const cur=cfg.assets.run_worker_first;
if(cur===true){console.log('[OK] wrangler.jsonc: Worker already runs first for every request');process.exit(0);}
const list=Array.isArray(cur)?cur.slice():[];for(const p of want)if(!list.includes(p))list.push(p);
cfg.assets.run_worker_first=list;fs.writeFileSync(f,JSON.stringify(cfg,null,2)+'\n');console.log('[OK] wrangler.jsonc: Worker checks sign-in before serving the application pages');
