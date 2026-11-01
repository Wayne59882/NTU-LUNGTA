(function(root){
  'use strict';
  // Steady-state educational model. Inputs retain the v241.12.5 defaults.
  // VA is BTPS L/min; metabolism is STPD mL/min; Q is L/min; contents mL/dL.
  // Calibrated to the Johns Hopkins Gas Exchange Simulator reference screens (teacher baseline):
  // default (VT500/VD150/f15) and VT400 cases reproduce every displayed value at two decimals.
  // Calibrated to the Johns Hopkins Gas Exchange Simulator reference screens (teacher baseline).
  // Oxygen: logit S = HILL_N*u + HILL_NS*u^2, u = ln(PO2/P50), P50 = P50_STD*(PCO2/40)^BOHR_CO2; content = HUFNER*Hb*S + O2_SOL*PO2.
  // CO2 content (mL/dL) = CO2_A*(PCO2/40)^(CO2_M+CO2_M2*ln(PCO2/40))*(1+CO2_D*(1-SO2)) with Douglas Hb scaling.
  // pH = 7.40 + PH_E0 - PH_A1*log10(PCO2/40) - PH_A2*log10(PCO2/40)^2 - PH_H1*(1-SO2).
  // Diffusion: Bohr integral with exposure DIFF_SCALE*DLO2/(10*Q).
  // ADMIX: fixed venous-admixture fraction added to the input shunt (calibrates the residual Hopkins A-a O2 difference).
  const PAR=Object.freeze({PH2O:47.22008044797684,CO2_K:0.875,HUFNER:1.3334113513097012,O2_SOL:0.003,P50_STD:26.91994555243228,HILL_N:2.70183452864892,HILL_NS:0.10801771843567778,BOHR_CO2:0.2845747334987544,CO2_A:49.096180624865816,CO2_M:0.3501577805282745,CO2_M2:3.29828e-05,CO2_D:0.10360994258699664,PH_E0:0.0011438243365001887,PH_A1:0.49159302163159746,PH_A2:0.32296556803702525,PH_H1:0.049417373101574874,ADMIX:2.3345004240447807e-05,DIFF_SCALE:0.7697322233304311});
  const SEA_LEVEL_PB=760;
  const DEFAULTS={VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:300,R:0.80,Hb:15,QT:5.5,Shunt:0,DLO2:32};
  // Teaching presets (Apply Preset / scenario menu). Only the listed inputs differ from DEFAULTS.
  const PRESETS={normal:{},lowvq:{VT:350,VD:180,f:32,Shunt:.08},highvq:{VT:650,VD:280,f:18,QT:3.4,Shunt:.02},pe:{VT:650,VD:300,f:20,QT:3.2,Shunt:.02},pneumonia:{VT:320,VD:150,f:18,Shunt:.18},shunt:{Shunt:.50},diffusion:{DLO2:8,VT:500,f:14},anemia:{Hb:8},altitude:{Altitude:3000,FIO2:.21,f:18}};
  function presetInputs(preset){if(!Object.prototype.hasOwnProperty.call(PRESETS,preset))throw new Error('Unknown V/Q preset: '+preset);return {...DEFAULTS,...PRESETS[preset],preset};}
  const MODEL_PROFILES={normal:{va:1,q:1},lowvq:{va:.20,q:.465},highvq:{va:.70,q:.10},pe:{va:.50,q:.10},pneumonia:{va:.30,q:.50}};
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const finite=(x,d)=>Number.isFinite(Number(x))?Number(x):d;
  const fmt=(x,d=2)=>Number.isFinite(x)?(Math.abs(x)<0.5*Math.pow(10,-d)?0:Number(x)).toFixed(d):'—';
  function barometricPressureMmHg(h){return SEA_LEVEL_PB*Math.pow(1-2.25577e-5*clamp(finite(h,0),0,11000),5.25588);}
  function acidBaseFromPco2(pco2,so2=0.9778){
    const p=Math.max(.01,pco2),L=Math.log10(p/40);
    const ph=7.4+PAR.PH_E0-PAR.PH_A1*L-PAR.PH_A2*L*L-PAR.PH_H1*(1-clamp(so2,0,1));
    return {pH:ph,HCO3:.03*p*Math.pow(10,ph-6.1),baseExcess:null};
  }
  function curve(pco2,hb){const p=Math.max(.01,pco2);return {p50:PAR.P50_STD*Math.pow(p/40,PAR.BOHR_CO2),hb,pco2:p};}
  function logitU(p,c){return Math.max(Math.log(p/c.p50),-10);}
  function saturation(p,c){if(p<=0)return 0;const u=logitU(p,c);return 1/(1+Math.exp(-(PAR.HILL_N*u+PAR.HILL_NS*u*u)));}
  function content(p,c){return PAR.HUFNER*c.hb*saturation(p,c)+PAR.O2_SOL*Math.max(p,0);}
  function dContent(p,c){if(p<=1e-12)return PAR.O2_SOL;const v=saturation(p,c),u=logitU(p,c);return PAR.O2_SOL+PAR.HUFNER*c.hb*v*(1-v)*Math.max(PAR.HILL_N+2*PAR.HILL_NS*u,0)/p;}
  function inverseO2(t,c){let lo=0,hi=2000;for(let i=0;i<48;i++){let m=(lo+hi)/2;if(content(m,c)<t)lo=m;else hi=m;}return (lo+hi)/2;}
  function o2SaturationFraction(po2,pco2){return saturation(Math.max(po2,0),curve(pco2,15));}
  function o2ContentMlDl(po2,hb,pco2){return content(Math.max(po2,0),curve(pco2,hb));}
  function po2FromO2Content(t,hb,pco2){return inverseO2(Math.max(t,0),curve(pco2,hb));}
  function douglasHbFactor(hb,so2,ph){return 1-.0289*hb/Math.max((3.352-.456*clamp(so2,0,1))*(8.142-ph),.1);}
  function co2ContentMlDl(pco2,hb,so2){
    const p=Math.max(.01,pco2),s=clamp(so2,0,1),L=Math.log(p/40),ph=acidBaseFromPco2(p,s).pH;
    const base=PAR.CO2_A*Math.exp((PAR.CO2_M+PAR.CO2_M2*L)*L)*(1+PAR.CO2_D*(1-s));
    return base*douglasHbFactor(hb,s,ph)/douglasHbFactor(15,s,ph);
  }
  function pco2FromCo2Content(t,hb,so2){let lo=.01,hi=500;for(let i=0;i<50;i++){const m=(lo+hi)/2;if(co2ContentMlDl(m,hb,so2)<t)lo=m;else hi=m;}return (lo+hi)/2;}
  // Gauss-Legendre integration: integral dC/dP /(PA-P) dP = DLO2/(10 Q).
  // u = -log[(PA-P)/(PA-Pin)] removes the equilibrium singularity.
  const GX=[.09501250983763744,.2816035507792589,.4580167776572274,.6178762444026438,.755404408355003,.8656312023878318,.9445750230732326,.9894009349916499];
  const GW=[.1894506104550685,.1826034150449236,.1691565193950025,.1495959888165767,.1246289712555339,.0951585116824928,.06225352393864789,.0271524594117541];
  function endCapillaryO2FromContent(cv,pa,q,dl,c){
    const pin=inverseO2(cv,c);if(Math.abs(pa-pin)<1e-10)return {po2:pa,effectiveness:1};
    const exposure=PAR.DIFF_SCALE*dl/(10*Math.max(q,1e-12));
    function integral(u){let sum=0;const mid=u/2;for(let i=0;i<8;i++){const a=mid*(1-GX[i]),b=mid*(1+GX[i]);sum+=GW[i]*(dContent(pa-(pa-pin)*Math.exp(-a),c)+dContent(pa-(pa-pin)*Math.exp(-b),c));}return sum*mid;}
    let lo=0,hi=28;if(integral(hi)<exposure)return {po2:pa,effectiveness:1};
    for(let i=0;i<30;i++){const mid=(lo+hi)/2;if(integral(mid)<exposure)lo=mid;else hi=mid;}
    const eff=1-Math.exp(-(lo+hi)/2);return {po2:pin+(pa-pin)*eff,effectiveness:eff};
  }
  function endCapillaryO2FromDiffusion(pv,pa,q,dl,hb=15,pc=40){return endCapillaryO2FromContent(o2ContentMlDl(pv,hb,pc),pa,q,dl,curve(pc,hb));}
  function normalizeInputs(raw){
    const s={};const errors=[],warnings=[];
    for(const [k,d] of Object.entries(DEFAULTS)){const v=raw[k]===undefined?d:Number(raw[k]);if(!Number.isFinite(v)){errors.push(k+' must be a finite number.');s[k]=d;}else s[k]=v;}
    s.preset=String(raw.preset||'normal');
    if(s.VT<=s.VD||s.VD<0)errors.push('Tidal volume must exceed non-negative dead space.');
    if(s.f<=0||s.QT<=0||s.Hb<=0||s.DLO2<0||s.VO2<=0||s.R<=0)errors.push('Rate, flow, Hb, uptake and exchange ratio must be positive; diffusion cannot be negative.');
    if(s.FIO2<=0||s.FIO2>1||s.Shunt<0||s.Shunt>=1||s.Altitude<0||s.Altitude>11000)errors.push('FiO2, shunt fraction or altitude is outside the model range.');
    if(s.VO2===0)warnings.push('Zero metabolic uptake: oxygen and carbon dioxide flux are zero.');
    return {s,errors,warnings};
  }
  function newton2(fn,start,bounds,tol,maxIt){
    let v=start.map((x,i)=>clamp(x,bounds[i][0],bounds[i][1]));let best=null;
    for(let i=0;i<maxIt;i++){
      const f=fn(v);if(!f||!f.r.every(Number.isFinite))break;const norm=Math.max(...f.r.map(Math.abs));if(!best||norm<best.norm)best={v:[...v],result:f,norm};if(norm<tol)return {...best,converged:true,iterations:i};
      const h=[Math.max(.001,Math.abs(v[0])*1e-4),Math.max(.001,Math.abs(v[1])*1e-4)];const a=fn([v[0]+h[0],v[1]]),b=fn([v[0],v[1]+h[1]]);if(!a||!b)break;
      const j00=(a.r[0]-f.r[0])/h[0],j10=(a.r[1]-f.r[1])/h[0],j01=(b.r[0]-f.r[0])/h[1],j11=(b.r[1]-f.r[1])/h[1],det=j00*j11-j01*j10;if(!Number.isFinite(det)||Math.abs(det)<1e-14)break;
      const d=[(j11*f.r[0]-j01*f.r[1])/det,(-j10*f.r[0]+j00*f.r[1])/det];let accepted=false;
      for(let step=1;step>=1/1024;step/=2){const nv=v.map((x,k)=>clamp(x-step*d[k],bounds[k][0],bounds[k][1])),nf=fn(nv);if(nf&&Math.max(...nf.r.map(Math.abs))<norm){v=nv;accepted=true;break;}}
      if(!accepted)break;
    }
    return best?{...best,converged:best.norm<tol}:null;
  }
  function localUnit(va,q,dl,cvO2,cvCO2,s,pio2,guessPc){
    if(q<1e-10)return {va,q,dl,pa:pio2,pc:.01,ecPO2:pio2,co2:cvCO2,o2:cvO2,o2Flux:0,co2Flux:0,effectiveness:1,localResidual:0};
    function evaluate(v){
      const pa=v[0],pc=v[1],c=curve(pc,s.Hb),diff=endCapillaryO2FromContent(cvO2,pa,q,dl,c);const sat=saturation(diff.po2,c),o2=content(diff.po2,c),co2=co2ContentMlDl(pc,s.Hb,sat);
      const o2Flux=10*q*(o2-cvO2),co2Flux=10*q*(cvCO2-co2);
      return {r:[pa-(pio2-PAR.CO2_K*(s.FIO2*co2Flux+(1-s.FIO2)*o2Flux)/va),pc-PAR.CO2_K*co2Flux/va],pa,pc,o2,co2,sat,ecPO2:diff.po2,o2Flux,co2Flux,effectiveness:diff.effectiveness,va,q,dl};
    }
    const result=newton2(evaluate,[clamp(pio2-guessPc*(s.FIO2+(1-s.FIO2)/s.R),.05,pio2),Math.max(guessPc,.02)],[[.001,Math.max(pio2,1)],[.01,500]],2e-6,28);
    if(!result||!result.converged)return null;return {...result.result,localResidual:result.norm};
  }
  function gasFromContents(o2,co2,hb,guess){
    let pc=Math.max(.02,guess),po=0,sat=0;
    for(let i=0;i<90;i++){const c=curve(pc,hb);po=inverseO2(o2,c);sat=saturation(po,c);const next=pco2FromCo2Content(co2,hb,sat);if(Math.abs(pc-next)<1e-10){pc=next;break;}pc=.5*(pc+next);}
    const c=curve(pc,hb);po=inverseO2(o2,c);sat=saturation(po,c);return {po2:po,pco2:pc,sat,...acidBaseFromPco2(pc,sat)};
  }
  function calculateFromInputs(raw){
    const norm=normalizeInputs(raw||{}),s=norm.s;if(norm.errors.length)return {ok:false,s,errors:norm.errors,warnings:norm.warnings};
    const Pb=barometricPressureMmHg(s.Altitude),PIO2=s.FIO2*(Pb-PAR.PH2O),VE=s.VT*s.f/1000,VA=(s.VT-s.VD)*s.f/1000,VCO2=s.VO2*s.R,shEff=Math.min(s.Shunt+PAR.ADMIX*(1-s.Shunt),.999),qv=s.QT*(1-shEff),homogeneousPc=PAR.CO2_K*VCO2/VA;
    if(PIO2<=0)return {ok:false,s,errors:['Inspired oxygen pressure is not positive.'],warnings:norm.warnings};
    const profile=MODEL_PROFILES[s.preset]||MODEL_PROFILES.normal;
    const units=profile.va===1?[{va:VA,q:qv,dl:s.DLO2}]:[{va:VA*profile.va,q:qv*profile.q,dl:s.DLO2*profile.q},{va:VA*(1-profile.va),q:qv*(1-profile.q),dl:s.DLO2*(1-profile.q)}];
    function systemic(v){
      const cvCurve=curve(v[1],s.Hb),cvO2=content(v[0],cvCurve),mvSat=saturation(v[0],cvCurve),cvCO2=co2ContentMlDl(v[1],s.Hb,mvSat);
      const lungs=units.map(u=>localUnit(u.va,u.q,u.dl,cvO2,cvCO2,s,PIO2,homogeneousPc));if(lungs.some(x=>!x))return null;
      const artO2=shEff*cvO2+lungs.reduce((a,u)=>a+u.q/s.QT*u.o2,0),artCO2=shEff*cvCO2+lungs.reduce((a,u)=>a+u.q/s.QT*u.co2,0);
      return {r:[10*s.QT*(artO2-cvO2)-s.VO2,10*s.QT*(cvCO2-artCO2)-VCO2],lungs,cvO2,cvCO2,artO2,artCO2,mvSat};
    }
    const startPc=clamp(homogeneousPc+8,2,350);const initialPo=clamp(PIO2-homogeneousPc/s.R,5,40);
    let solution=newton2(systemic,[initialPo,startPc],[[.001,Math.max(PIO2,1)],[.02,500]],1e-4,35);
    if(!solution||!solution.converged){for(const a of [[20,startPc],[8,startPc*1.15],[40,46],[3,startPc],[12,startPc*1.3],[25,startPc*0.9],[5,startPc*1.6],[15,startPc*2],[30,startPc*1.2],[2,startPc*2.5]]){const next=newton2(systemic,a,[[.001,Math.max(PIO2,1)],[.02,500]],1e-4,35);if(next&&(!solution||next.norm<solution.norm))solution=next;if(solution?.converged)break;}}
    if(!solution||!solution.converged)return {ok:false,s,errors:['No feasible steady state was found for the requested metabolic demand and gas-exchange settings. Reduce demand or correct ventilation, flow or diffusion.'],warnings:norm.warnings,solverResidual:solution?.norm??null};
    const z=solution.result,mvPO2=solution.v[0],mvPCO2=solution.v[1];const mvAB=acidBaseFromPco2(mvPCO2,z.mvSat);
    const PACO2=z.lungs.reduce((a,u)=>a+u.va/VA*u.pc,0),PAO2=z.lungs.reduce((a,u)=>a+u.va/VA*u.pa,0);
    const ecO2=z.lungs.reduce((a,u)=>a+u.q/qv*u.o2,0),ecCO2=z.lungs.reduce((a,u)=>a+u.q/qv*u.co2,0);
    const end=gasFromContents(ecO2,ecCO2,s.Hb,PACO2),art=gasFromContents(z.artO2,z.artCO2,s.Hb,end.pco2);
    // End Capillary panel = the selected (affected) V/Q region, unit 0, before mixing.
    // Arterial blood still mixes every perfused region and the shunt by O2/CO2 content.
    const selected=z.lungs[0];
    const selectedEndCapillary={regionIndex:0,regionCount:z.lungs.length,preset:s.preset,ventilationLMin:selected.va,perfusionLMin:selected.q,vqRatio:selected.va/Math.max(selected.q,1e-12),alveolarPO2:selected.pa,alveolarPCO2:selected.pc,po2:selected.ecPO2,pco2:selected.pc,saturation:selected.sat,o2Content:selected.o2,co2Content:selected.co2};
    const mixedEndCapillary={po2:end.po2,pco2:end.pco2,saturation:end.sat,o2Content:ecO2,co2Content:ecCO2};
    const idealAlveolarPO2=PIO2-art.pco2*(s.FIO2+(1-s.FIO2)/s.R);
    const aa=idealAlveolarPO2-art.po2;
    if(profile.va!==1)norm.warnings.push('Regional teaching assumption: affected unit receives '+(profile.va*100)+'% of total alveolar ventilation and '+(profile.q*100)+'% of ventilated perfusion. Whole-lung input values are unchanged.');
    if(s.preset==='lowvq')norm.warnings.push('Low V/Q teaching preset: VT 350 mL, VD 180 mL, 32 breaths/min, 8% shunt.');
    if(s.preset==='diffusion')norm.warnings.push('Diffusion teaching preset uses a severely reduced O2 diffusing capacity (8 mL/min/mmHg, 25% of default).');
    if(s.preset==='shunt')norm.warnings.push('True shunt teaching preset uses 50% bypass flow. Supplemental oxygen has a minimal arterial effect, not an exactly zero effect.');
    norm.warnings.push('Steady-state educational calculation with fixed 37 C and rapid CO2 equilibration. No ventilatory compensation is assumed. Blood-gas curves are calibrated to the Johns Hopkins Gas Exchange Simulator reference values.');
    return {ok:true,s,errors:[],warnings:norm.warnings,Pb,PIO2,VE,VA,VCO2,PACO2,PAO2,extraction:s.VO2/(10*s.QT),oxygenSupplyLimited:false,diffusionEffectiveness:z.lungs.reduce((a,u)=>a+u.q/qv*u.effectiveness,0),
      mvPO2,mvPCO2,mvSat:z.mvSat,mixedVenousO2Content:z.cvO2,mixedVenousCO2Content:z.cvCO2,mvPH:mvAB.pH,mvHCO3:mvAB.HCO3,
      endPO2:selected.ecPO2,endPCO2:selected.pc,endSat:selected.sat,endCapO2Content:selected.o2,endCO2Content:selected.co2,
      selectedEndCapillary,mixedEndCapillary,endCapillaryScope:'selected-region',
      artPO2:art.po2,artPCO2:art.pco2,artSat:art.sat,arterialO2Content:z.artO2,arterialCO2Content:z.artCO2,artPH:art.pH,artHCO3:art.HCO3,idealAlveolarPO2,aaGradient:aa,
      units:z.lungs,profile,shuntEffective:shEff,solverResidual:solution.norm,oxygenBalanceResidual:z.r[0],co2BalanceResidual:z.r[1],modelRevision:'v241.12.9-VQ-hopkins-region-20261010'};
  }
  const API={PAR,DEFAULTS,PRESETS,presetInputs,MODEL_PROFILES,barometricPressureMmHg,acidBaseFromPco2,o2SaturationFraction,o2ContentMlDl,po2FromO2Content,co2ContentMlDl,pco2FromCo2Content,endCapillaryO2FromDiffusion,calculateFromInputs,gasFromContents};
  if(typeof module!=='undefined'&&module.exports)module.exports=API;
  if(root){root.VQ_LUNG_ENGINE_HOPKINS=API;root.VQ_LUNG_ENGINE_V193=API;root.VQ_LUNG_ENGINE_CONSERVATION=API;}
  if(typeof document==='undefined') return;
  const $=id=>document.getElementById(id);
  function readNumber(id,fallback){
    const el=$(id); if(!el) return fallback;
    const n=Number(el.valueAsNumber); if(Number.isFinite(n)) return n;
    const raw=String(el.value==null?'':el.value).trim().replace(/，/g,'.').replace(/,/g,'.');
    const p=Number(raw); return Number.isFinite(p)?p:fallback;
  }
  function readDomInputs(){
    return {
      VT:readNumber('v149_VT',DEFAULTS.VT),VD:readNumber('v149_VD',DEFAULTS.VD),f:readNumber('v149_f',DEFAULTS.f),
      FIO2:readNumber('v149_FIO2',DEFAULTS.FIO2),Altitude:readNumber('v149_Altitude',DEFAULTS.Altitude),VO2:readNumber('v149_VO2',DEFAULTS.VO2),
      R:readNumber('v149_R',DEFAULTS.R),Hb:readNumber('v149_Hb',DEFAULTS.Hb),QT:readNumber('v149_QT',DEFAULTS.QT),
      Shunt:readNumber('v149_Shunt',DEFAULTS.Shunt),DLO2:readNumber('v149_DLO2',DEFAULTS.DLO2),preset:$('v149ScenarioPreset')?.value||'normal'
    };
  }
  function setText(id,v){const el=$(id);if(el)el.textContent=v;}
  function clearOutputs(){
    ['v149_mv_pco2','v149_mv_co2','v149_mv_ph','v149_mv_po2','v149_mv_sat','v149_mv_o2','v149_ec_pco2','v149_ec_co2','v149_ec_po2','v149_ec_sat','v149_ec_o2','v149_gen_ve','v149_gen_va','v149_gen_paco2','v149_gen_pio2','v149_gen_pao2','v149_art_pco2','v149_art_co2','v149_art_ph','v149_art_po2','v149_art_sat','v149_art_o2','v149_art_aa'].forEach(id=>setText(id,'—'));
    setText('v149SelectedRegionLabel','Selected region: unavailable');
  }
  function writeDom(d){
    if(!d.ok){
      clearOutputs();
      const box=$('v149Interpretation'); if(box) box.textContent='Input error:\n• '+d.errors.join('\n• ');
      return d;
    }
    // Hopkins reference UI displays two decimals for all numeric panels.
    setText('v149_mv_pco2',fmt(d.mvPCO2));
    setText('v149_mv_co2',fmt(d.mixedVenousCO2Content));
    setText('v149_mv_ph',fmt(d.mvPH));
    setText('v149_mv_po2',fmt(d.mvPO2));
    setText('v149_mv_sat',fmt(d.mvSat*100));
    setText('v149_mv_o2',fmt(d.mixedVenousO2Content));

    setText('v149_ec_pco2',fmt(d.endPCO2));
    setText('v149_ec_co2',fmt(d.endCO2Content));
    setText('v149_ec_po2',fmt(d.endPO2));
    setText('v149_ec_sat',fmt(d.endSat*100));
    setText('v149_ec_o2',fmt(d.endCapO2Content));

    setText('v149_gen_ve',fmt(d.VE));
    setText('v149_gen_va',fmt(d.VA));
    setText('v149_gen_paco2',fmt(d.PACO2));
    setText('v149_gen_pio2',fmt(d.PIO2));
    setText('v149_gen_pao2',fmt(d.PAO2));

    setText('v149_art_pco2',fmt(d.artPCO2));
    setText('v149_art_co2',fmt(d.arterialCO2Content));
    setText('v149_art_ph',fmt(d.artPH));
    setText('v149_art_po2',fmt(d.artPO2));
    setText('v149_art_sat',fmt(d.artSat*100));
    setText('v149_art_o2',fmt(d.arterialO2Content));
    setText('v149_art_aa',fmt(d.aaGradient));

    const preset=$('v149ScenarioPreset')?.value||'normal';
    const names={normal:'No V/Q mismatch',lowvq:'Low V/Q',highvq:'High V/Q',pe:'Pulmonary embolism',pneumonia:'Pneumonia',shunt:'True shunt',diffusion:'Diffusion limitation',anemia:'Anemia / low hemoglobin',altitude:'High altitude'};
    const region=d.selectedEndCapillary;
    const regionLabel=region.regionCount===1?'Single ventilated region':(names[preset]||preset)+' region (1 of '+region.regionCount+')';
    setText('v149SelectedRegionLabel',regionLabel);
    const lines=[
      `Preset: ${names[preset]||preset}.`,
      `Content-conserving steady-state gas-exchange model.`,
      `Minute ventilation = ${fmt(d.VE)} L/min; alveolar ventilation = ${fmt(d.VA)} L/min.`,
      `Alveolar PCO2 = ${fmt(d.PACO2)} mmHg; alveolar PO2 = ${fmt(d.PAO2)} mmHg.`,
      `End Capillary: ${regionLabel}, VA/Q = ${fmt(region.vqRatio)}. These values are from the selected region, before mixing.`,
      `Selected-region alveolar PCO2 = ${fmt(region.alveolarPCO2)} mmHg; end-capillary PCO2 = ${fmt(d.endPCO2)} mmHg.`,
      `Selected-region alveolar PO2 = ${fmt(region.alveolarPO2)} mmHg; end-capillary PO2 = ${fmt(d.endPO2)} mmHg.`,
      `General alveolar values are ventilation-weighted across all ventilated regions.`,
      `Arterial Blood: all perfused regions and shunt mixed by O2/CO2 content. Arterial PO2 = ${fmt(d.artPO2)} mmHg; mixed-venous PO2 = ${fmt(d.mvPO2)} mmHg.`,
      `A-a O2 difference = ${fmt(d.aaGradient)} mmHg (ideal alveolar estimate ${fmt(d.idealAlveolarPO2)} minus arterial PO2).`
    ];
    if(d.warnings.length) lines.push('Notice: '+d.warnings.join(' '));
    const box=$('v149Interpretation'); if(box) box.textContent=lines.join('\n');

    const btn=$('v149CalculateBtn');
    if(btn){
      btn.dataset.lastCalculated=String(Date.now());
      const normal=btn.dataset.normalLabel||'Start / Calculate'; btn.dataset.normalLabel=normal;
      btn.textContent='Calculated'; clearTimeout(btn.__hopkinsTimer);
      btn.__hopkinsTimer=setTimeout(()=>{if(btn)btn.textContent=btn.dataset.normalLabel||'Start / Calculate';},650);
    }
    root.VQ_LAST_LUNG_CALC_HOPKINS={at:new Date().toISOString(),inputs:{...d.s,preset},outputs:{...d}};
    root.VQ_LAST_LUNG_CALC_V193=root.VQ_LAST_LUNG_CALC_HOPKINS;
    return d;
  }

  function recalculate(){return writeDom(calculateFromInputs(readDomInputs()));}
  function applyModelPreset(preset){
    const values=presetInputs(preset);
    for(const [key,value] of Object.entries(values))if(key!=='preset'){const el=$('v149_'+key);if(el)el.value=value;}
    const select=$('v149ScenarioPreset');if(select)select.value=preset;
    return recalculate();
  }

  function trigger(ev){
    if(ev){ev.preventDefault();ev.stopPropagation();}
    const active=document.activeElement;
    if(active&&active.matches&&active.matches('.v149-input-row input')){try{active.blur();}catch(_e){}}
    setTimeout(recalculate,0);
  }
  function bind(){
    const select=$('v149ScenarioPreset');
    if(select&&select.dataset.vqModeBound!=='1'){select.dataset.vqModeBound='1';select.addEventListener('change',()=>applyModelPreset(select.value));}
    const btn=$('v149CalculateBtn');
    if(btn&&btn.dataset.hopkinsBound!=='1'){
      btn.type='button';btn.onclick=null;btn.dataset.hopkinsBound='1';
      // Remove the prior v193 marker so this file remains the single authoritative handler.
      btn.dataset.v193Bound='1';
      btn.addEventListener('click',trigger,true);
    }
    ['v149ApplyPresetBtn','v149ResetModelBtn'].forEach(id=>{
      const el=$(id);if(el&&el.dataset.hopkinsPostCalc!=='1'){
        el.dataset.hopkinsPostCalc='1';
        el.addEventListener('click',()=>setTimeout(recalculate,30),false);
      }
    });
  }

  root.VQ_LUNG_APPLY_PRESET_HOPKINS=applyModelPreset;
  root.VQ_LUNG_CALCULATE_HOPKINS=recalculate;
  root.VQ_LUNG_CALCULATE_V193=recalculate;
  root.VQ_LUNG_READ_INPUTS_HOPKINS=readDomInputs;
  root.VQ_LUNG_READ_INPUTS_V193=readDomInputs;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{bind();recalculate();});
  else{bind();recalculate();}
  setTimeout(bind,300);setTimeout(bind,1000);
})(typeof window!=='undefined'?window:(typeof globalThis!=='undefined'?globalThis:null));
