require('../helpers.cjs');
// Browser-free interaction test for the uploaded-course question navigator.
const assert=require('assert');
const fs=require('fs');
const vm=require('vm');

(async()=>{
  for(const pageName of ['reference','kb']){
    const source=fs.readFileSync('web/shared/js/course/course-controller.js','utf8');
    const readiness=source.match(/function quizReady\(\)\{[^\n]+\}/)[0];
    const availableUnits=source.match(/function quizUnits\(\)\{[^\n]+\}/)[0];
    for(const [scope,requested,expected,ids] of [['ready',2,true,['u1']],['u1',2,true,['u1']],['u2',2,false,[]],['ready',10,true,['u1']]]){
      const probe={manifest:{question_generation:'exam-mcq-v5',units:[{id:'u1',question_count:32},{id:'u2',question_count:0}]},
        $:id=>id==='v241QuizUnit'?{value:scope}:{},quizCount:()=>requested};
      vm.runInNewContext(availableUnits+'\n'+readiness+'\nthis.ready=quizReady();this.ids=quizUnits().map(x=>x.id);',probe);
      assert.strictEqual(probe.ready,expected,`${pageName}: ${scope} with ${requested} requested`);
      assert.deepStrictEqual([...probe.ids],ids);
    }
    assert(!source.includes('source facts evaluated'),`${pageName}: internal source processing must stay off the page`);
    assert(!source.includes('reviewed questions ready'),`${pageName}: chapter list must not repeat technical counts`);
    const begin=source.indexOf('async function startDynamicQuiz(){');
    const end=source.indexOf('async function courseAnswerOne(',begin);
    assert(begin>=0&&end>begin);
    const elements={},buttons=[],radios=[];
    const nav={scrollLeft:0,querySelectorAll:()=>buttons};
    const body={dataset:{},textContent:'',querySelector:s=>s==='#v241QuestionNav'&&elements.v241QuestionNav||null,
      querySelectorAll:()=>radios};
    Object.defineProperty(body,'innerHTML',{get(){return this.html||''},set(html){
      this.html=html;buttons.length=0;radios.length=0;
      if(html.includes('id="v241QuestionNav"')){
        elements.v241QuestionNav=nav;nav.scrollLeft=0;
        const tags=html.match(/<button[^>]+data-v241-question="\d+"[^>]*>/g)||[];
        for(const tag of tags){const index=Number(tag.match(/data-v241-question="(\d+)"/)[1]);buttons[index]={dataset:{v241Question:String(index)},className:tag.match(/class="([^"]*)"/)[1],setAttribute(name,value){this[name]=value}};}
        const labels=html.match(/<option value="\d+"[^>]*>[^<]*<\/option>/g)||[];
        elements.v241QuestionJump={options:labels.map(tag=>({text:tag.replace(/<[^>]+>/g,'')})),onchange:null};
        elements.v241QuizProgress={textContent:''};
        const inputTags=html.match(/<input type="radio" name="v241Choice"[^>]*>/g)||[];
        for(const tag of inputTags)radios.push({value:tag.match(/value="(\d+)"/)[1],checked:tag.includes('checked'),addEventListener(name,fn){this.change=fn}});
        for(const id of ['v241Prev','v241Next','v241Submit','v241Finish'])elements[id]={disabled:false,onclick:null};
        elements.v241Feedback={hidden:true,textContent:''};
      }else if(html.includes('id="v241NewQuiz"'))elements.v241NewQuiz={onclick:null};
    }});
    elements.v241QuizBody=body;
    elements.v241StartQuiz={disabled:false,dataset:{}};
    elements.v241QuizCount={value:'10'};
    let submitted=null;
    const context={
      $:id=>elements[id],document:{querySelector:selector=>{const match=selector.match(/data-v241-question="(\d+)"/);return match?buttons[Number(match[1])]:null}},
      esc:value=>String(value==null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
      manifest:{course_id:'sample',units:[{id:'u1'},{id:'u2'}]},quizCount:()=>10,quizReady:()=>true,quizUnits:()=>[{id:'u1'},{id:'u2'}],window:{confirm:()=>true},encodeURIComponent,
      fetch:async(path,init)=>{
        if(path==='/api/reference/course-quiz'){
          assert.strictEqual(JSON.parse(init.body).per_unit,10);
          assert.deepStrictEqual(JSON.parse(init.body).unit_ids,['u1','u2']);
          return {ok:true,json:async()=>({ok:true,quiz_id:'a'.repeat(32),generation:{prebuilt_questions:200,model_calls:0,elapsed_ms:12},questions:Array.from({length:20},(_,i)=>({id:'q'+i,unit_id:i<10?'u1':'u2',unit_title:i<10?'Unit 1':'Unit 2',stem:'Scenario '+(i+1),choices:['A','B','C','D'],answer:2,explanation:'Evidence.'}))})};
        }
        if(path==='/api/reference/course-quiz-result'){
          submitted=JSON.parse(init.body).answers;
          const rows=submitted.map(x=>({id:x.id,choice:x.choice,correct:x.choice===2}));
          return {ok:true,json:async()=>({ok:true,items:rows,total:20,answered:rows.filter(x=>x.choice!==null).length,correct:rows.filter(x=>x.correct).length,accuracy:10,units:[]})};
        }
        return {ok:true,json:async()=>({ok:true,attempts:1,correct:2,questions:20,accuracy:10})};
      }
    };
    vm.runInNewContext('let quizState=null;\n'+source.slice(begin,end)+'\nthis.start=startDynamicQuiz;this.state=()=>quizState;',context);
    await context.start();
    assert.strictEqual(buttons.length,20);
    assert.strictEqual(elements.v241QuestionJump.options.length,20);
    buttons[15].onclick();assert(body.innerHTML.includes('Question 16 of 20'));
    radios[2].checked=true;radios[2].change();
    assert(elements.v241QuizProgress.textContent.includes('1 selected'));
    elements.v241QuestionJump.onchange({target:{value:'0'}});
    assert(body.innerHTML.includes('Question 1 of 20'));
    elements.v241QuestionJump.onchange({target:{value:'15'}});
    assert(radios[2].checked,'selection survives jumping');
    elements.v241Submit.onclick();
    assert(elements.v241QuizProgress.textContent.includes('1 / 20 answered'));
    assert(buttons[15].className.includes('answered'));
    nav.scrollLeft=100;
    elements.v241QuestionJump.onchange({target:{value:'3'}});
    assert.strictEqual(nav.scrollLeft,100,'manual number-strip position survives render');
    radios[2].checked=true;radios[2].change();
    await elements.v241Finish.onclick();
    assert(body.innerHTML.includes('2 / 20 correct'));
    assert.strictEqual(submitted.length,20);
    assert.strictEqual(submitted[15].choice,2);
    assert.strictEqual(submitted[3].choice,2);
    assert.strictEqual(submitted[0].choice,null);
    await elements.v241NewQuiz.onclick();
    assert.strictEqual(buttons.length,20);
    assert(elements.v241QuizProgress.textContent.includes('0 / 20 answered'));
    console.log(`[OK] ${pageName}: 10/unit, free question jumps, saved selections, answer states, finish, new quiz`);
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
