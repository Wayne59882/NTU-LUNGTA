const assert=require('assert');
const fs=require('fs');
const vm=require('vm');

(async()=>{
  for(const page of ['reference','kb']){
    const source=fs.readFileSync(`web/${page}/js/53_local_answer_feedback.js`,'utf8');
    const from=source.indexOf('function renderReport('),to=source.indexOf('function showFeedback(',from);
    assert(from>=0&&to>from);
    const ids=['vqFeedbackReceiptTitle','vqFeedbackReceiptMail'];
    const elements=Object.fromEntries(ids.map(id=>[id,{textContent:'',hidden:false}]));
    const box={hidden:true},id='a'.repeat(16),timers=[];
    const ctx={$:name=>elements[name],receipt:()=>box,text:v=>String(v==null?'':v).trim(),window:{VQ_LAST_FEEDBACK_REPORT_ID:id},
      fetch:async()=>({ok:true,json:async()=>({ok:true,id,saved:true,email_status:'sent',correction_status:'ready',feedback_intent:'repair',correction_answer:'A better evidence-backed explanation.'})}),
      setTimeout:fn=>{timers.push(fn);return timers.length;},clearTimeout:()=>{},Promise,encodeURIComponent};
    vm.runInNewContext('let reportPoll=0,receiptTimer=0;\n'+source.slice(from,to)+'\nthis.render=renderReport;this.poll=startReportPolling;',ctx);
    ctx.render({email_status:'not_configured',correction_status:'reviewing',feedback_intent:'repair'},id);
    assert(!box.hidden&&elements.vqFeedbackReceiptTitle.textContent.includes(id));
    assert(elements.vqFeedbackReceiptMail.textContent.includes('not sent'));
    ctx.render({email_status:'failed',correction_status:'error',correction_error:'insufficient course evidence',feedback_intent:'repair'},id);
    assert(elements.vqFeedbackReceiptMail.textContent.includes('not sent'));
    await ctx.poll(id);
    assert(elements.vqFeedbackReceiptMail.textContent.includes('accepted by the mail service'));
    timers[timers.length-1]();assert(box.hidden,'temporary receipt must hide itself');
    assert(!source.includes('View revised answer'));
    assert(!source.includes('vqFeedbackReceiptRepair'));
    assert(!source.includes('localStorage.setItem('));
    assert(!source.includes('localStorage.getItem('));
    assert(source.includes('!d.saved||!d.id'));
    assert(!source.includes('overlay.isConnected'));
    console.log(`[OK] ${page}: brief report receipt, accurate mail state, no revised-answer panel or reload persistence`);
  }
})().catch(e=>{console.error(e);process.exitCode=1;});
