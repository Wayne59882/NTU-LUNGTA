/* Q&A lifecycle coordinator: one visible answer per question and model handoff.
   This module never stores or logs cloud credentials. */
(function(window){
  'use strict';
  let sequence=0, active=null, lastQuestion='', lastSource='text';
  function localKey(){const el=document.getElementById('localModelSelect');return String(el&&el.value||'gemma');}
  function selectedModel(){
    const config=window.VQ_getCloudConfig&&window.VQ_getCloudConfig();
    if(config&&config.provider&&config.provider!=='off'&&config.apiKey)return 'cloud:'+config.provider+':'+(config.model||'');
    return 'local:'+localKey();
  }
  function cancelLocalJob(request){
    const id=request&&request.localJobId;
    if(!id||request.cancelSent)return;
    request.cancelSent=true;
    fetch('/api/reference/job-cancel',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({job_id:id}),cache:'no-store'}).catch(function(){});
  }
  function invalidate(){
    if(!active)return;
    const old=active;active=null;old.invalid=true;
    if(old.controller)try{old.controller.abort();}catch(_){}
    cancelLocalJob(old);
    try{if(window.v60HardStopSpeech)window.v60HardStopSpeech('Switching to the latest answer');}catch(_){}
  }
  function begin(question,options){
    const q=String(question||'').trim(),opts=options||{};
    if(!q)return null;
    const model=selectedModel();
    if(!opts.force&&active&&active.pending&&!active.invalid&&active.question===q&&active.model===model)
      return {request:active,joined:true};
    invalidate();
    const controller=typeof AbortController!=='undefined'?new AbortController():null;
    const request={id:++sequence,question:q,source:opts.source||lastSource,model:model,pending:true,
      invalid:false,controller:controller,promise:null,localJobId:'',cancelSent:false};
    active=request;lastQuestion=q;lastSource=request.source;
    window.VQ_QA_ACTIVE_REQUEST_TOKEN=request.id;
    return {request:request,joined:false};
  }
  function isCurrent(request){return !!request&&active===request&&!request.invalid;}
  function finish(request){if(isCurrent(request))request.pending=false;}
  function bind(request,promise){if(isCurrent(request))request.promise=promise;}
  function rememberJob(request,jobId){
    if(!request)return;
    request.localJobId=String(jobId||'');
    if(!isCurrent(request))cancelLocalJob(request);
  }
  function switchModel(){
    if(!lastQuestion)return Promise.resolve(false);
    if(typeof window.VQ_QA_REASK_CURRENT!=='function')return Promise.resolve(false);
    return Promise.resolve(window.VQ_QA_REASK_CURRENT(lastQuestion,lastSource));
  }
  window.VQ_QA_REQUESTS={begin:begin,isCurrent:isCurrent,finish:finish,bind:bind,
    current:function(){return active;},lastQuestion:function(){return lastQuestion;},
    invalidate:invalidate,switchModel:switchModel,rememberJob:rememberJob};
})(window);
