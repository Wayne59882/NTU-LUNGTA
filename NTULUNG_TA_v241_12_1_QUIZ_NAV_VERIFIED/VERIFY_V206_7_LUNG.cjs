const fs=require('fs');
const path=require('path');
const vm=require('vm');

function assert(cond,msg){ if(!cond){ throw new Error(msg); } }
function close(a,b,t=1e-9){ return Math.abs(Number(a)-Number(b))<=t; }

const expectedDefaults={VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:300,R:0.80,Hb:15,QT:5.5,Shunt:0,DLO2:32};
const benchmark={VT:400,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:300,R:0.80,Hb:15,QT:5.5,Shunt:0,DLO2:32};
const expected={VE:6.00,VA:3.75,PACO2:56.00,PIO2:149.68,PAO2:82.62,mvPCO2:64.33,mixedVenousCO2Content:59.90,mvPH:7.27,mvPO2:40.65,mvSat:0.6806,mixedVenousO2Content:13.74,endPCO2:56.00,endCO2Content:55.54,endPO2:82.61,endSat:0.9471,endCapO2Content:19.19,artPCO2:56.00,arterialCO2Content:55.54,artPH:7.32,artPO2:82.61,artSat:0.9471,arterialO2Content:19.19,aaGradient:0.02};

for(const mode of ['reference','kb']){
  const enginePath=path.join(__dirname,'web',mode,'js','35_hopkins_reference_lung_physiology.js');
  const src=fs.readFileSync(enginePath,'utf8');
  const sandbox={module:{exports:{}},exports:{},console,globalThis:{}};
  vm.runInNewContext(src,sandbox,{filename:enginePath});
  const E=sandbox.module.exports;
  assert(JSON.stringify(E.DEFAULTS)===JSON.stringify(expectedDefaults), `${mode}: defaults mismatch ${JSON.stringify(E.DEFAULTS)}`);

  const a=E.calculateFromInputs(expectedDefaults);
  const b=E.calculateFromInputs(expectedDefaults);
  assert(a.ok && b.ok, `${mode}: default calculation failed`);
  for(const k of ['VE','VA','PACO2','PIO2','PAO2','mvPCO2','mvPO2','endPCO2','endPO2','artPCO2','artPO2','aaGradient']){
    assert(Object.is(a[k],b[k]) || close(a[k],b[k]), `${mode}: non-deterministic ${k}: ${a[k]} vs ${b[k]}`);
  }

  const x=E.calculateFromInputs(benchmark);
  assert(x.ok, `${mode}: benchmark failed`);
  for(const [k,v] of Object.entries(expected)){
    const got = k==='mvSat'||k==='endSat'||k==='artSat' ? Number(x[k].toFixed(4)) : Number(x[k].toFixed(2));
    const exp = k==='mvSat'||k==='endSat'||k==='artSat' ? v : Number(v.toFixed(2));
    assert(got===exp, `${mode}: ${k} got ${got}, expected ${exp}`);
  }

  const html=fs.readFileSync(path.join(__dirname,'web',mode,'index.html'),'utf8');
  const htmlExpect={v149_VT:'500',v149_VD:'150',v149_f:'15',v149_FIO2:'0.21',v149_Altitude:'0',v149_VO2:'300',v149_R:'0.80',v149_Hb:'15',v149_QT:'5.5',v149_Shunt:'0',v149_DLO2:'32'};
  for(const [id,val] of Object.entries(htmlExpect)){
    const re=new RegExp(`id=["']${id}["'][^>]*value=["']${val.replace('.','\\.')}["']`);
    assert(re.test(html), `${mode}: HTML default ${id} != ${val}`);
  }

  const legacy=fs.readFileSync(path.join(__dirname,'web',mode,'js','29_v153_course_aligned_student_results.js'),'utf8');
  assert(legacy.includes('the Hopkins-reference engine is the ONLY writer of lung numerical outputs'), `${mode}: legacy writer not disabled`);
  assert(legacy.includes("if(typeof window.VQ_LUNG_CALCULATE_HOPKINS==='function') return window.VQ_LUNG_CALCULATE_HOPKINS();"), `${mode}: legacy updateModel not delegated`);
}
console.log('[OK] Lung simulator defaults exactly match requested reference initial values.');
console.log('[OK] Same input -> same output in both knowledge modes.');
console.log('[OK] Four Hopkins gold-standard runs are enforced by CHECK_HOPKINS_REFERENCE.sh.');
console.log('[OK] Legacy v153 calculator can no longer overwrite Hopkins numerical outputs.');
