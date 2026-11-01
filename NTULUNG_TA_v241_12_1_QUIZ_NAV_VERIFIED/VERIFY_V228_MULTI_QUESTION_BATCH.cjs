const fs=require('fs');
const vm=require('vm');
const path=require('path');

function load(file){
  const context={
    console,
    window:{},
    document:{readyState:'complete',getElementById:()=>null,addEventListener:()=>{}},
    setTimeout:()=>0,
    clearTimeout:()=>{},
    Promise,
    Set,
    String,
    Number,
    RegExp,
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
  return context;
}

const script=path.join(__dirname,'web/reference/js/51_v228_multi_question_batch.js');
const ctx=load(script);
const split=ctx.window.VQ_splitQuestionBatch;
if(typeof split!=='function') throw new Error('VQ_splitQuestionBatch not exposed');

const sample=`下列那些肺臟與胸壁的活動會造成胸腔內的壓力低於大氣壓？①肺臟與胸壁均往外拉開 ②肺臟往內回彈（recoil）及胸壁向外擴張 ③胸壁向外擴張，與肺臟遠離

A. ①②③
B. 僅①③
C. 僅②③
D. 僅①②

**2.【原第 26 題】**
正常人平靜呼吸時，其功能肺餘量（FRC）占全肺量（TLC）的多少%？
A. 80
B. 60
C. 40
D. 20

**3.【原第 27 題】**
當氣喘病人的呼吸頻率增加，最容易發生下列何種現象？
A. 肺動態順應性（Cdyn）增加
B. 肺動態順應性（Cdyn）減低
C. 肺靜態順應性（Cst）增加
D. 肺靜態順應性（Cst）減低

**4.【原第 28 題】**
下列何種臨床情況會對周邊化學受體（peripheral chemoreceptor）產生刺激而引起呼吸加速？
A. 肺炎導致的低氧血症
B. 貧血
C. 一氧化碳中毒
D. 嗎啡中毒

**5.【原第 29 題】**
攝氏37度1大氣壓下，氧與二氧化碳的溶解係數分別為0.0244、0.592 mL/mm Hg/mL H2O；在1/2大氣壓下，二氧化碳的溶解係數約為氧的多少倍？
A. 12.5
B. 25
C. 6.25
D. 50

**6.【原第 30 題】**
當混合靜脈血流經肺泡微血管膜時，其氣體交換發生在下列那一時段最多？
A. 前1/3
B. 中1/3
C. 後1/3
D. 各時段均相同

**7.【原第 31 題】**
與氧分壓45 mm Hg的血液相較，氧分壓100 mm Hg血液的特性為何？
A. 溶解的氧量較多，與血紅素的結合力較大
B. 溶解的氧量較多，與血紅素的結合力較小
C. 溶解的氧量較少，與血紅素的結合力較大
D. 溶解的氧量較少，與血紅素的結合力較小

**8.【原第 32 題】**
血氧分壓增加，促進了血紅素與二氧化碳間的解離，此現象為：
A. Haldane effect，可增加二氧化碳排出體外
B. Haldane effect，可減少二氧化碳排出體外
C. Bohr effect，可增加氧在體內組織的釋放
D. Bohr effect，可減少氧在體內組織的釋放

以上為考選部 114 年第二次呼吸治療師考試原題。

---

### 115 年第二次專技高考

**9.【原第 25 題】**
50 歲女性（過去病史為 asthma），因車禍大腿骨骨折，且合併呼吸窘迫（respiratory distress）入院，病人呼吸急促且每分鐘通氣量（minute ventilation）高達 20 L/min，呼吸治療師緊急抽取 arterial blood gas 後測得 PaCO2＝40 mm Hg，此時 PaCO2仍處在正常範圍最可能的原因為何？
A. 發燒（fever）
B. 藥物過量（drug overdose）
C. 氣喘發作（asthma attack）初期
D. 肺栓塞（pulmonary embolism）

**10.【原第 26 題】**
比較生理性（physiological）與解剖性（anatomical）無效腔（dead space）之容積，下列敘述何者正確？
A. 健康成人的生理性無效腔與解剖性無效腔之容積相當
B. 健康成人的生理性無效腔約解剖性無效腔之 0.6 倍
C. 健康成人的生理性無效腔約解剖性無效腔之 2 倍
D. 肺阻塞病人的生理性無效腔約解剖性無效腔之 0.5 倍

**11.【原第 27 題】**
正常成人在平靜自然呼吸下，吸氣動作尚未停止時，其肺泡內之壓力（PA）約為多少 cm H2O？
A. 10
B. 1
C. -1
D. -10

**12.【原第 28 題】**
下列何者不會降低肺泡氣體擴散（gas diffusion）？
A. 肺水腫
B. 肺氣腫
C. 氣喘
D. 肺炎

**13.【原第 29 題】**
肺氣腫（pulmonary emphysema）常見的肺功能變化為何？
A. 功能肺餘量（functional residual capacity）上升
B. 殘餘容積（residual volume）下降
C. 肺活量（vital capacity）上升
D. 全肺量（total lung capacity）下降

**14.【原第 30 題】**
關於用力呼氣過程中氣道動態壓縮（dynamic compression）的現象，下列敘述何者正確？
A. 阻力主要來自有軟骨的氣道
B. 張嘴呼氣可以改善氣道的動態壓縮的程度
C. 流速由肺回彈力決定，而不是由氣道外壓力決定
D. 驅動壓力（肺泡壓力減去胸膜內壓力）在中低肺容積下，與用力程度無關

**15.【原第 31 題】**
下列何項肺泡的特性，可以 Laplace's law 來解釋？
A. 小肺泡將空氣排向大肺泡，導致肺泡群的穩定
B. 小肺泡將空氣排向大肺泡，導致肺泡群的不穩定
C. 大肺泡將空氣排向小肺泡，導致肺泡群的穩定
D. 大肺泡將空氣排向小肺泡，導致肺泡群的不穩定`;

const items=split(sample);
if(items.length!==15) throw new Error('expected 15 questions, got '+items.length);
if(!items[0].includes('①肺臟與胸壁') || !items[0].includes('D. 僅①②')) throw new Error('circled sub-items or unnumbered first item were damaged');
if(!items[10].includes('肺泡內之壓力') || !items[10].includes('C. -1')) throw new Error('question 11 binding failed');
if(items[7].includes('以上為考選部') || items[7].includes('115 年第二次專技高考')) throw new Error('exam metadata leaked into question 8');
for(let i=0;i<items.length;i++){
  for(const letter of ['A','B','C','D']) if(!new RegExp('(?:^|\\n)\\s*'+letter+'\\s*[.．、:：)）]').test(items[i])) throw new Error('question '+(i+1)+' missing '+letter);
}
console.log('[OK] 15 questions detected');
console.log('[OK] unnumbered first item + circled ①②③ preserved');
console.log('[OK] question order and A-D option binding preserved');
console.log('[OK] exam/year headings excluded from question bodies');

// Verify orchestration without calling a real model: each item must independently
// enter the pre-existing one-question function and all answers must be aggregated.
const calls=[];
ctx.window.VQ_generateFinalAnswer=async q=>{calls.push(String(q)); return '正確答案：C. mock\n解釋：完整句子。';};
if(!ctx.window.VQ_installBatch228()) throw new Error('batch wrapper did not install');
(async()=>{
  const out=await ctx.window.VQ_generateFinalAnswer(sample);
  if(calls.length!==15) throw new Error('expected 15 pipeline calls, got '+calls.length);
  for(let i=1;i<=15;i++) if(!out.includes(String(i)+'. 正確答案：C. mock')) throw new Error('missing aggregated answer '+i);
  calls.length=0;
  const single='正常成人肺泡壓力為何？\nA. 10\nB. 1\nC. -1\nD. -10';
  const one=await ctx.window.VQ_generateFinalAnswer(single);
  if(calls.length!==1 || calls[0]!==single) throw new Error('single-question behavior changed');
  if(!one.startsWith('正確答案：C. mock')) throw new Error('single answer unexpectedly reformatted');
  console.log('[OK] 15/15 items enter the existing single-question pipeline independently');
  console.log('[OK] 15/15 answers aggregate in original order');
  console.log('[OK] single-question behavior unchanged');
  console.log('ALL v228 MULTI-QUESTION BATCH ACCEPTANCE CHECKS PASSED');
})().catch(e=>{console.error(e);process.exit(1);});
