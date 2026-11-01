const assert=require('assert');
const fs=require('fs');

(async()=>{
  const source=fs.readFileSync('cloudflare/worker/src/index.js','utf8');
  const worker=(await import('data:text/javascript;charset=utf-8,'+encodeURIComponent(source))).default;
  const env={ORIGIN_URL:'https://origin.example.test'};
  const correction={id:'saved-report',answer:'The revised source-grounded answer.'};
  for(const endpoint of ['answer','answer-batch','course-answer']){
    const calls=[];
    global.fetch=async(url)=>{
      const path=new URL(url instanceof Request?url.url:String(url)).pathname;calls.push(path);
      if(path==='/api/reference/context')return Response.json({ok:true,in_scope:true,context:'Physiology evidence.',sources:[],verified_correction:correction});
      if(path==='/api/reference/context-batch')return Response.json({items:[1,2].map(id=>({id,question:'How does gas exchange work?',ok:true,in_scope:true,context:'Physiology evidence.',sources:[],language_tag:'en-US',verified_correction:correction}))});
      if(path==='/api/reference/course-context')return Response.json({ok:true,in_scope:true,context:'Course evidence.',course:{course_name:'Respiratory'},verified_correction:correction});
      throw new Error('Unexpected model/local call: '+path);
    };
    const body={question:'How does gas exchange work?',questions:['How does gas exchange work?','How does gas exchange work?'],course_id:'test-course',cloud_provider:'openai',cloud_api_key:'test-only'};
    const response=await worker.fetch(new Request('https://site.example.test/api/reference/'+endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),env);
    const result=await response.json();assert.strictEqual(response.status,200,JSON.stringify(result));
    if(endpoint==='answer-batch'){
      assert(result.answers.every(x=>x.engine==='auto-corrected-answer-memory'&&x.answer===correction.answer));
      assert.strictEqual(result.cloud_started,false);
    }else{
      assert(result.engine.includes('auto-corrected')&&result.answer===correction.answer);
    }
    assert(!calls.some(path=>path==='/v1/responses'||path.includes('answer-local')));
    console.log('[OK] '+endpoint+': same-question correction is reused with confirmed cloud key');
  }
})().catch(e=>{console.error(e);process.exitCode=1;});
