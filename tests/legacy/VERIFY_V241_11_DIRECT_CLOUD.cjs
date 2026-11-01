const assert=require('assert');
const fs=require('fs');

(async()=>{
  const source=fs.readFileSync('cloudflare/worker/src/index.js','utf8');
  const worker=(await import('data:text/javascript;charset=utf-8,'+encodeURIComponent(source))).default;
  const env={ORIGIN_URL:'https://origin.example.test'};
  for(const endpoint of ['course-answer','answer']){
    const calls=[];
    global.fetch=async(url,init)=>{
      const path=new URL(url instanceof Request?url.url:String(url)).pathname;calls.push(path);
      if(path==='/api/reference/course-context')return Response.json({ok:true,in_scope:true,context:'Alveolar ventilation contributes to gas exchange.',course:{course_name:'Respiratory'},sources:[],verified_correction:null});
      if(path==='/api/reference/context')return Response.json({ok:true,in_scope:true,context:'Alveolar ventilation contributes to gas exchange.',sources:[]});
      if(path==='/v1/responses')return Response.json({output_text:'Alveolar ventilation contributes to gas exchange in the pulmonary capillaries.'});
      throw new Error('Unexpected local route: '+path);
    };
    const body={question:'What does alveolar ventilation contribute to?',cloud_provider:'openai',cloud_api_key:'test-only',course_id:'respiratory-test'};
    const response=await worker.fetch(new Request('https://site.example.test/api/reference/'+endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),env);
    const result=await response.json();
    assert.strictEqual(response.status,200,JSON.stringify(result));
    assert(result.engine.startsWith('openai-api'));
    assert.strictEqual(result.cloud_started_after_ms,0);
    assert.deepStrictEqual(calls.filter(x=>x.includes('answer-local')),[]);
    assert(calls.includes('/v1/responses'));
    console.log('[OK] '+endpoint+': confirmed key invokes cloud immediately without local answer request');
  }
  {
    const calls=[];
    global.fetch=async(url)=>{
      const path=new URL(url instanceof Request?url.url:String(url)).pathname;calls.push(path);
      if(path==='/api/reference/context-batch')return Response.json({items:[1,2].map(id=>({id,question:'Which option is supported?\nA. Ventilation\nB. Bone',context:'Ventilation participates in gas exchange.',language_tag:'en-US',ok:true,in_scope:true}))});
      if(path==='/v1/responses')return Response.json({output_text:JSON.stringify({answers:[{id:1,option:'A',explanation:'The material discusses ventilation.'},{id:2,option:'A',explanation:'The material discusses ventilation.'}]})});
      throw new Error('Unexpected local route: '+path);
    };
    const body={questions:['Which option is supported?\nA. Ventilation\nB. Bone','Which option is supported?\nA. Ventilation\nB. Bone'],cloud_provider:'openai',cloud_api_key:'test-only'};
    const response=await worker.fetch(new Request('https://site.example.test/api/reference/answer-batch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),env);
    const result=await response.json();
    assert.strictEqual(response.status,200,JSON.stringify(result));
    assert.strictEqual(result.answers.length,2);
    assert(result.engine.startsWith('openai-api'));
    assert(!calls.some(x=>x.includes('answer-batch-local')||x.includes('answer-local')));
    console.log('[OK] answer-batch: confirmed key uses cloud with no local answer request');
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
