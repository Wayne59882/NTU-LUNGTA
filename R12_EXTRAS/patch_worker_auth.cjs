// R12: the Worker only serves the application pages (/, /reference/, /kb/) to signed-in users.
// Usage: node patch_worker_auth.cjs <cloudflare/worker/src/index.js> [--check]   exit 3 = anchor missing (unchanged)
const fs=require('fs');const f=process.argv[2];let s=fs.readFileSync(f,'utf8');
const MARK='/* R12 sign-in gate */';
if(s.includes(MARK)){console.log('[OK] Worker already has the sign-in gate');process.exit(0);}
const anchor="    if(!u.pathname.startsWith('/api/'))return env.ASSETS.fetch(request);";
const exportAnchor='export default {';
if(s.split(anchor).length!==2||s.split(exportAnchor).length!==2||!s.includes('function originBase(')){console.log('[STOP] Worker differs: sign-in gate anchor not found (file unchanged)');process.exit(3);}
if(process.argv.includes('--check')){console.log('[OK] Worker sign-in gate anchors found');process.exit(0);}
const helpers=`${MARK}
const GATED_PAGES=new Set(['/','/index.html','/reference','/reference/','/reference/index.html','/kb','/kb/','/kb/index.html']);
const SESSION_CACHE=new Map();
function sessionCookie(request){const m=(request.headers.get('cookie')||'').match(/(?:^|;\\s*)lungta_sid=([A-Za-z0-9_\\-]{20,200})/);return m?m[1]:'';}
async function signedIn(request,env){
  const token=sessionCookie(request);if(!token)return false;
  const now=Date.now(),hit=SESSION_CACHE.get(token);if(hit&&hit.exp>now)return hit.ok;
  let ok=false;
  try{const r=await fetch(new URL('/api/auth/me',originBase(env)).toString(),{headers:{cookie:'lungta_sid='+token,'x-vq-cloudflare-proxy':'workers.dev'},redirect:'manual'});ok=r.status===200;}catch(_){ok=false;}
  if(SESSION_CACHE.size>500)SESSION_CACHE.clear();
  SESSION_CACHE.set(token,{ok,exp:now+(ok?30000:5000)});
  return ok;
}
async function appPage(request,env,u){
  if(!(await signedIn(request,env))){
    const next=(u.pathname==='/'||u.pathname==='/index.html')?'/reference/':u.pathname+u.search;
    return new Response(null,{status:302,headers:{Location:'/login/?next='+encodeURIComponent(next),'Cache-Control':'no-store'}});
  }
  const res=await env.ASSETS.fetch(request),h=new Headers(res.headers);h.set('Cache-Control','no-store');
  return new Response(res.body,{status:res.status,statusText:res.statusText,headers:h});
}
`;
s=s.replace(exportAnchor,helpers+exportAnchor);
s=s.replace(anchor,"    if(!u.pathname.startsWith('/api/'))return GATED_PAGES.has(u.pathname)?await appPage(request,env,u):env.ASSETS.fetch(request);");
// Sign-in / permission answers from the origin keep their status (401/403) instead of becoming 502.
const oj="  if(!r.ok) throw new Error(d.detail||d.error||('Origin HTTP '+r.status)); return d;";
const top="    }catch(error){return Response.json({error:'Cloudflare gateway unavailable.',detail:String(error&&error.message||error)},{status:502});}";
if(s.split(oj).length===2&&s.split(top).length===2){
  s=s.replace(oj,"  if(!r.ok){const e=new Error(d.detail||d.error||('Origin HTTP '+r.status));if(r.status===401||r.status===403){e.status=r.status;e.payload=d;}throw e;} return d;");
  s=s.replace(top,"    }catch(error){if(error&&error.status&&error.payload)return Response.json(error.payload,{status:error.status});return Response.json({error:'Cloudflare gateway unavailable.',detail:String(error&&error.message||error)},{status:502});}");
}
fs.writeFileSync(f,s);console.log('[OK] Worker: application pages require sign-in');
