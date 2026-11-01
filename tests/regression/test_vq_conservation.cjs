require('../helpers.cjs');
'use strict';
// Independent constraints, analytic limits, and original-input regression.
const fs=require('fs'),path=require('path'),assert=require('assert'),vm=require('vm');
const base=require('../helpers.cjs').APP;
const context={module:{exports:{}}};
vm.runInNewContext(fs.readFileSync(path.join(base,'web/shared/js/visual/gas-exchange.js'),'utf8'),context);
const E=context.module.exports;
const defaults={VT:500,VD:150,f:15,FIO2:.21,Altitude:0,VO2:300,R:.8,Hb:15,QT:5.5,Shunt:0,DLO2:32};
const presets={normal:{},lowvq:{VT:350,VD:180,f:32,Shunt:.08},highvq:{VT:650,VD:280,f:18,QT:3.4,Shunt:.02},pe:{VT:650,VD:300,f:20,QT:3.2,Shunt:.02},pneumonia:{VT:320,VD:150,f:18,Shunt:.18},shunt:{Shunt:.50},diffusion:{DLO2:8,VT:500,f:14},anemia:{Hb:8},altitude:{Altitude:3000,FIO2:.21,f:18}};
const checks=[];function test(name,fn){fn();checks.push(name);console.log('PASS '+name);}
function near(x,y,t=1e-3){assert(Number.isFinite(x)&&Number.isFinite(y));assert(Math.abs(x-y)<t,`${x} differs from ${y} (tolerance ${t})`);}
function calc(x){const d=E.calculateFromInputs({...defaults,...x});assert(d.ok,JSON.stringify(d.errors));return d;}
test('all eleven initial engine defaults are unchanged',()=>assert.deepStrictEqual(JSON.parse(JSON.stringify(E.DEFAULTS)),defaults));
test('both pages retain every original initial HTML input',()=>{
 for(const mode of ['kb','reference']){
 const html=fs.readFileSync(path.join(base,'web',mode,'index.html'),'utf8');
 for(const [key,value] of Object.entries(defaults)){
 const input=html.match(new RegExp('<input[^>]*id="v149_'+key+'"[^>]*>'));assert(input,'Missing '+key);
 near(Number(input[0].match(/value="([^"]+)"/)[1]),value,1e-12);
 }
 for(const name of ['../shared/js/visual/course-results','../shared/js/visual/gas-exchange'])assert(html.includes(name+'.js?v=241129vqhopkinsregion20261010'));
 }
});
test('KB and Reference load the single authoritative calculation module',()=>{for(const mode of ['kb','reference'])assert(fs.readFileSync(path.join(base,'web',mode,'index.html'),'utf8').includes('../shared/js/visual/gas-exchange.js'));});
const results={};
for(const [preset,patch] of Object.entries(presets))test(preset+': oxygen/CO2 conservation and content mixing',()=>{
 const d=calc({...patch,preset});results[preset]=d;
 near(10*d.s.QT*(d.arterialO2Content-d.mixedVenousO2Content),d.s.VO2,.001);
 near(10*d.s.QT*(d.mixedVenousCO2Content-d.arterialCO2Content),d.VCO2,.001);
 near(d.arterialO2Content,d.shuntEffective*d.mixedVenousO2Content+d.units.reduce((a,u)=>a+u.q/d.s.QT*u.o2,0),1e-10);
 near(d.arterialCO2Content,d.shuntEffective*d.mixedVenousCO2Content+d.units.reduce((a,u)=>a+u.q/d.s.QT*u.co2,0),1e-10);
 near(E.o2ContentMlDl(d.artPO2,d.s.Hb,d.artPCO2),d.arterialO2Content,1e-7);
 near(E.co2ContentMlDl(d.artPCO2,d.s.Hb,d.artSat),d.arterialCO2Content,1e-7);
 near(d.aaGradient,d.PIO2-d.artPCO2*(d.s.FIO2+(1-d.s.FIO2)/d.s.R)-d.artPO2,1e-9);
 for(const u of d.units){near(u.pc,E.PAR.CO2_K*u.co2Flux/u.va,1e-4);near(u.pa,d.PIO2-E.PAR.CO2_K*(d.s.FIO2*u.co2Flux+(1-d.s.FIO2)*u.o2Flux)/u.va,1e-4);}
});
test('homogeneous ventilation matches the independent alveolar equations',()=>{
 const d=results.normal,va=(500-150)*15/1000,K=E.PAR.CO2_K,PIO2=.21*(760-E.PAR.PH2O);
 near(d.VA,va,1e-12);near(d.VE,500*15/1000,1e-12);
 near(d.artPCO2,K*300*.8/va,.001);
 near(d.PAO2,PIO2-K*(.21*240+.79*300)/va,.001);
 near(calc({f:30}).artPCO2,d.artPCO2/2,.001);
});
// Teacher baseline: Johns Hopkins Gas Exchange Simulator screens, compared at two decimals as displayed.
const show=(k,v)=>{const x=/Sat$/.test(k)?v*100:v;return (Math.abs(x)<0.005?0:x).toFixed(2);};
function hopkins(label,inp,exp){test(label,()=>{const d=calc(inp);const miss=Object.entries(exp).filter(([k,v])=>show(k,d[k])!==v.toFixed(2)).map(([k,v])=>k+' '+show(k,d[k])+' vs '+v.toFixed(2));assert(!miss.length,miss.join('; '));});}
hopkins('Hopkins default screen (No V/Q mismatch): all 23 displayed values identical',{},
 {mvPCO2:47.22,mixedVenousCO2Content:53.57,mvPH:7.35,mvPO2:39.45,mvSat:71.44,mixedVenousO2Content:14.41,endPCO2:40.00,endCO2Content:49.21,endPO2:101.78,endSat:97.78,endCapO2Content:19.86,VE:7.50,VA:5.25,PACO2:40.00,PIO2:149.68,PAO2:101.78,artPCO2:40.00,arterialCO2Content:49.21,artPH:7.40,artPO2:101.78,artSat:97.78,arterialO2Content:19.86,aaGradient:0.01});
hopkins('Hopkins VT 400 reference screen: 23 displayed values identical',{VT:400},
 {VE:6.00,VA:3.75,PACO2:56.00,PIO2:149.68,PAO2:82.62,mvPCO2:64.33,mixedVenousCO2Content:59.90,mvPH:7.27,mvPO2:40.65,mvSat:68.06,mixedVenousO2Content:13.74,endPCO2:56.00,endCO2Content:55.54,endPO2:82.61,endSat:94.71,endCapO2Content:19.19,artPCO2:56.00,arterialCO2Content:55.54,artPH:7.32,artPO2:82.61,artSat:94.71,arterialO2Content:19.19,aaGradient:0.02});
test('regional wasted ventilation changes arterial, not whole-lung input values',()=>{
 const a=calc({preset:'normal'}),b=calc({preset:'highvq'});
 assert(b.artPCO2>a.artPCO2);near(a.VA,b.VA,1e-12);near(a.VE,b.VE,1e-12);
});
test('lower diffusing capacity widens A-a oxygen difference',()=>{
 const a=calc({f:14,DLO2:32}),b=calc({f:14,DLO2:8}),c=calc({f:14,DLO2:5});
 assert(a.aaGradient<b.aaGradient&&b.aaGradient<c.aaGradient);assert(b.aaGradient>5);
});
test('true shunt has a reduced oxygen response, without a false flat PaO2',()=>{
 const a=calc({...presets.shunt,preset:'shunt',FIO2:.21}),b=calc({...presets.shunt,preset:'shunt',FIO2:.4});
 const n=calc({FIO2:.21}),m=calc({FIO2:.4});
 assert(b.artPO2>a.artPO2);assert(b.artPO2-a.artPO2<m.artPO2-n.artPO2);
});
// Teacher feedback 2026-10-10 (four annotated screenshots).
test('teacher 1: Low V/Q selected-region end-capillary PCO2 is about 46 mmHg',()=>{
 const d=calc({...presets.lowvq,preset:'lowvq'});assert(Math.abs(d.endPCO2-46)<2,'endPCO2 '+d.endPCO2);
 assert(d.aaGradient>results.normal.aaGradient+20,'Low V/Q must widen A-a');
});
test('teacher 2: High V/Q raises arterial PaCO2 above the normal case',()=>{
 const d=calc({...presets.highvq,preset:'highvq'});assert(d.artPCO2>results.normal.artPCO2+5,'PaCO2 '+d.artPCO2);
});
test('teacher 2b (LINE): High V/Q selected-region PcO2 increases and PcCO2 decreases a lot',()=>{
 const d=calc({...presets.highvq,preset:'highvq'}),n=results.normal;
 assert(d.endPO2>n.endPO2+20,'PcO2 '+d.endPO2);assert(d.endPCO2<n.endPCO2-15,'PcCO2 '+d.endPCO2);
});
test('End Capillary shows the selected V/Q region (unit 0) before mixing; arterial blood stays mixed',()=>{
 for(const k of ['lowvq','highvq','pe','pneumonia']){const d=results[k];
  near(d.endPCO2,d.units[0].pc,1e-12);near(d.endPO2,d.units[0].ecPO2,1e-12);near(d.endCapO2Content,d.units[0].o2,1e-12);
  assert(d.endCapillaryScope==='selected-region'&&d.selectedEndCapillary.regionCount===2);
  near(d.arterialO2Content,d.shuntEffective*d.mixedVenousO2Content+d.units.reduce((a,u)=>a+u.q/d.s.QT*u.o2,0),1e-10);}
 for(const k of ['normal','shunt','diffusion','anemia','altitude'])assert(results[k].selectedEndCapillary.regionCount===1);
});
test('scenario menu presets in the engine and in the page script are identical',()=>{
 assert.deepStrictEqual(JSON.parse(JSON.stringify(E.PRESETS)),presets);
});
test('teacher 3: Diffusion limitation widens the alveolar-arterial PO2 gap',()=>{
 const d=calc({...presets.diffusion,preset:'diffusion'});
 assert(d.PAO2-d.artPO2>20,'PAO2-PaO2 '+(d.PAO2-d.artPO2));assert(d.aaGradient>20,'A-a '+d.aaGradient);
});
test('teacher 4: True shunt PaO2 barely rises when FiO2 is raised to 0.4',()=>{
 const a=calc({...presets.shunt,preset:'shunt',FIO2:.21}),b=calc({...presets.shunt,preset:'shunt',FIO2:.4});
 assert(b.artPO2-a.artPO2<5,'rise '+(b.artPO2-a.artPO2));
 const l=calc({...presets.lowvq,preset:'lowvq',FIO2:.21}),k=calc({...presets.lowvq,preset:'lowvq',FIO2:.4});
 assert(k.artPO2-l.artPO2>10*(b.artPO2-a.artPO2),'Low V/Q must respond to oxygen far more than shunt');
});
test('diffusion solver agrees with the exact dissolved-only exponential limit',()=>{
 const pv=40,pa=100,q=5,dl=.05,beta=E.PAR.O2_SOL;
 near(E.endCapillaryO2FromDiffusion(pv,pa,q,dl,0,40).po2,pa-(pa-pv)*Math.exp(-E.PAR.DIFF_SCALE*dl/(10*q*beta)),1e-5);
});
test('invalid/infeasible settings return errors, without plausible fabricated outputs',()=>{
 for(const x of [{VT:150,VD:150},{QT:0},{Hb:-1},{FIO2:1.1},{Shunt:1},{VO2:0},{VT:NaN},{DLO2:0}])assert(!E.calculateFromInputs({...defaults,...x}).ok,JSON.stringify(x));
});
test('reset defaults and all scenario preset inputs match this release',()=>{
 for(const mode of ['kb','reference']){
 const s=fs.readFileSync(path.join(base,'web/shared/js/visual/course-results.js'),'utf8');
 const t=s.match(/const DEFAULTS=(\{[^;]+\});/)[1];assert.deepStrictEqual(Function('return ('+t+')')(),defaults);
 const p=s.match(/const PRESETS=(\{[^;]+\});/)[1];assert.deepStrictEqual(Function('return ('+p+')')(),presets);
 }
});
if(process.argv.includes('--write-report')){
 fs.mkdirSync(path.join(base,'../research/vq_validation'),{recursive:true});
 const rows=Object.entries(results).map(([preset,d])=>({preset,inputs:d.s,VE:d.VE,VA:d.VA,alveolarPCO2:d.PACO2,alveolarPO2:d.PAO2,endCapillaryPCO2:d.endPCO2,endCapillaryPO2:d.endPO2,arterialPCO2:d.artPCO2,arterialPO2:d.artPO2,AaDifference:d.aaGradient,oxygenBalanceResidual:d.oxygenBalanceResidual,co2BalanceResidual:d.co2BalanceResidual,units:d.units,assumptions:d.warnings}));
 fs.writeFileSync(path.join(base,'../research/vq_validation/verified_cases.json'),JSON.stringify({revision:'v241.12.9-VQ-hopkins-region-20261010',checks,rows},null,2)+'\n');
 const cols=['preset','VE','VA','alveolarPCO2','alveolarPO2','endCapillaryPCO2','endCapillaryPO2','arterialPCO2','arterialPO2','AaDifference','oxygenBalanceResidual','co2BalanceResidual'];
 fs.writeFileSync(path.join(base,'../research/vq_validation/verified_cases.csv'),cols.join(',')+'\n'+rows.map(x=>cols.map(k=>x[k]).join(',')).join('\n')+'\n');
}
console.log(checks.length+' checks passed. Initial defaults preserved.');
