(function(){
  'use strict';
  const VISITOR_KEY='VQ_ANON_VISITOR_ID_V240';
  const SESSION_KEY='VQ_ANON_SESSION_ID_V240';
  const HEARTBEAT_MS=30000;
  function randomId(prefix){
    try{ if(window.crypto&&crypto.randomUUID) return prefix+':'+crypto.randomUUID(); }catch(_){ }
    return prefix+':'+Date.now().toString(36)+':'+Math.random().toString(36).slice(2)+Math.random().toString(36).slice(2);
  }
  function getId(store,key,prefix){
    try{let v=store.getItem(key);if(!v){v=randomId(prefix);store.setItem(key,v);}return v;}catch(_){return randomId(prefix);}
  }
  const visitorId=getId(localStorage,VISITOR_KEY,'v');
  const sessionId=getId(sessionStorage,SESSION_KEY,'s');
  function ensureBadge(){
    let el=document.getElementById('siteActivityBadge');
    if(el)return el;
    el=document.createElement('div');
    el.id='siteActivityBadge';
    el.className='site-activity-badge';
    el.setAttribute('aria-live','polite');
    el.textContent='Online now: — · Total visitors: —';
    document.body.appendChild(el);
    return el;
  }
  function render(d){
    const el=ensureBadge();
    if(!d||!d.ok)return;
    const online=Number.isFinite(Number(d.online_now))?Number(d.online_now):'—';
    const total=Number.isFinite(Number(d.total_visitors))?Number(d.total_visitors):'—';
    el.textContent='Online now: '+online+' · Total visitors: '+total;
  }
  async function heartbeat(){
    try{
      const r=await fetch('/api/reference/site-metrics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitor_id:visitorId,session_id:sessionId}),cache:'no-store',keepalive:true});
      if(r.ok)render(await r.json());
    }catch(_){ }
  }
  function init(){
    ensureBadge();heartbeat();
    window.setInterval(function(){if(!document.hidden)heartbeat();},HEARTBEAT_MS);
    document.addEventListener('visibilitychange',function(){if(!document.hidden)heartbeat();});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
