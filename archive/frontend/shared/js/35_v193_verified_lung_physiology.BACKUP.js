(function(root){
  'use strict';

  const PH2O = 47.0;              // mmHg at 37 C
  const O2_SOL = 0.0031;          // mL O2/dL/mmHg
  const HUFNER = 1.34;            // mL O2/g Hb
  const CO2_K = 0.863;            // unit conversion in alveolar ventilation equation
  const TEMP_C = 37.0;
  const DEFAULTS = {VT:500,VD:150,f:12,FIO2:0.21,Altitude:0,VO2:250,R:0.80,Hb:15,QT:5.0,Shunt:0.05,DLO2:32};

  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const finite=(x,d)=>Number.isFinite(Number(x))?Number(x):d;
  const fmt=(x,d=1)=>Number.isFinite(x)?Number(x).toFixed(d):'—';

  // ICAO/standard-atmosphere tropospheric approximation (0-11 km).
  function barometricPressureMmHg(altitudeM){
    const h=clamp(finite(altitudeM,0),0,11000);
    return 760*Math.pow(1-2.25577e-5*h,5.25588);
  }

  // Severinghaus 1979 standard oxyhemoglobin dissociation approximation.
  // Returns fraction 0..1 under standard blood conditions.
  function o2SaturationFraction(po2){
    const p=Math.max(0,finite(po2,0));
    if(p<=0) return 0;
    const denom=p*p*p+150*p;
    if(denom<=0) return 0;
    return clamp(1/(1+23400/denom),0,0.9999);
  }

  function o2ContentMlDl(po2,hb){
    const p=Math.max(0,finite(po2,0));
    const h=Math.max(0,finite(hb,0));
    return HUFNER*h*o2SaturationFraction(p)+O2_SOL*p;
  }

  function po2FromO2Content(content,hb){
    const target=Math.max(0,finite(content,0));
    let lo=0, hi=700;
    for(let i=0;i<90;i++){
      const mid=(lo+hi)/2;
      if(o2ContentMlDl(mid,hb)<target) lo=mid; else hi=mid;
    }
    return (lo+hi)/2;
  }

  // Acid-base estimate from Henderson-Hasselbalch with standard base excess = 0.
  // Because bicarbonate/base excess is not an input in this teaching model, this
  // is the explicit metabolic-state assumption rather than an unlabelled pH fudge.
  function acidBaseFromPco2(pco2){
    const p=Math.max(1,finite(pco2,40));
    function residual(ph){
      const hco3=0.03*p*Math.pow(10,ph-6.1);
      // Siggaard-Andersen standard base excess approximation set to zero.
      return hco3-24.4+14.83*(ph-7.4);
    }
    let lo=6.5,hi=7.9;
    for(let i=0;i<90;i++){
      const mid=(lo+hi)/2;
      if(residual(mid)>0) hi=mid; else lo=mid;
    }
    const ph=(lo+hi)/2;
    const hco3=0.03*p*Math.pow(10,ph-6.1);
    return {pH:ph,HCO3:hco3,baseExcess:0};
  }

  // Douglas-Jones-Reed whole-blood CO2 content equation (mL/dL), 37 C.
  function co2ContentMlDl(pco2,hb,so2Fraction){
    const p=Math.max(1,finite(pco2,40));
    const h=Math.max(0.1,finite(hb,15));
    const so2=clamp(finite(so2Fraction,0.97),0,1);
    const ab=acidBaseFromPco2(p);
    const solubility=0.0307 + 0.00057*(37-TEMP_C) + 0.00002*Math.pow(37-TEMP_C,2);
    const pKprime=6.086 + 0.042*(7.4-ab.pH) + (38-TEMP_C)*(0.00472 + 0.00139*(7.4-ab.pH));
    const plasma=2.226*solubility*p*(1+Math.pow(10,ab.pH-pKprime));
    const denom=(3.352-0.456*so2)*(8.142-ab.pH);
    const bloodFactor=1-(0.0289*h)/Math.max(denom,0.1);
    return Math.max(0,plasma*bloodFactor);
  }

  function pco2FromCo2Content(target,hb,so2Fraction){
    const t=Math.max(0,finite(target,0));
    let lo=1,hi=200;
    while(co2ContentMlDl(hi,hb,so2Fraction)<t && hi<500) hi*=1.35;
    hi=Math.min(hi,500);
    for(let i=0;i<100;i++){
      const mid=(lo+hi)/2;
      if(co2ContentMlDl(mid,hb,so2Fraction)<t) lo=mid; else hi=mid;
    }
    return (lo+hi)/2;
  }

  function normalizeInputs(raw){
    const s={
      VT:Math.max(0,finite(raw.VT,DEFAULTS.VT)),
      VD:Math.max(0,finite(raw.VD,DEFAULTS.VD)),
      f:Math.max(0,finite(raw.f,DEFAULTS.f)),
      FIO2:clamp(finite(raw.FIO2,DEFAULTS.FIO2),0.01,1),
      Altitude:clamp(finite(raw.Altitude,DEFAULTS.Altitude),0,11000),
      VO2:Math.max(0,finite(raw.VO2,DEFAULTS.VO2)),
      R:clamp(finite(raw.R,DEFAULTS.R),0.1,2),
      Hb:Math.max(0.1,finite(raw.Hb,DEFAULTS.Hb)),
      QT:Math.max(0.2,finite(raw.QT,DEFAULTS.QT)),
      Shunt:clamp(finite(raw.Shunt,DEFAULTS.Shunt),0,0.8),
      DLO2:Math.max(0.01,finite(raw.DLO2,DEFAULTS.DLO2))
    };
    const errors=[];
    const warnings=[];
    if(s.VT<=s.VD) errors.push('Tidal volume must be greater than dead space for positive alveolar ventilation.');
    if(s.f<=0) errors.push('Respiratory rate must be greater than 0.');
    if(s.VO2<=0) warnings.push('O2 uptake is zero; tissue extraction and CO2 production are correspondingly zero.');
    if(finite(raw.Altitude,0)>11000) warnings.push('Altitude was limited to 11,000 m, the range of the standard-atmosphere equation used here.');
    return {s,errors,warnings};
  }

  // Counter-current/exchanger-style approximation for finite O2 diffusion.
  // NTU = D_L / (blood-flow O2 capacitance); effectiveness = 1-exp(-NTU).
  // The O2 capacitance is calculated from the actual nonlinear O2 content curve.
  function endCapillaryO2FromDiffusion(pvO2,pAO2,hb,ventilatedFlowLMin,dlo2){
    if(pAO2<=pvO2) return {po2:Math.max(0,pAO2),NTU:0,effectiveness:0};
    const cv=o2ContentMlDl(pvO2,hb);
    const cAlvEq=o2ContentMlDl(pAO2,hb);
    const beta=Math.max((cAlvEq-cv)/(pAO2-pvO2),1e-4); // mL/dL/mmHg
    const flowCapacitance=Math.max(ventilatedFlowLMin*10*beta,1e-6); // mL/min/mmHg
    const NTU=Math.max(0,dlo2)/flowCapacitance;
    const effectiveness=clamp(1-Math.exp(-NTU),0,1);
    return {po2:pvO2+(pAO2-pvO2)*effectiveness,NTU,effectiveness};
  }

  function calculateFromInputs(raw){
    const norm=normalizeInputs(raw||{});
    const s=norm.s;
    if(norm.errors.length){
      return {ok:false,s,errors:norm.errors,warnings:norm.warnings};
    }

    const Pb=barometricPressureMmHg(s.Altitude);
    const PIO2=s.FIO2*Math.max(Pb-PH2O,0);
    const VE=s.VT*s.f/1000;
    const VA=(s.VT-s.VD)*s.f/1000;
    const VCO2=s.VO2*s.R;
    const PACO2=CO2_K*VCO2/VA;

    // General alveolar gas equation, including the FiO2 correction term.
    const alveolarCO2Term=PACO2*(s.FIO2+(1-s.FIO2)/s.R);
    const PAO2=Math.max(0,PIO2-alveolarCO2Term);

    // O2: tissue Fick principle + shunt content mixing + finite diffusion.
    const qVent=Math.max(s.QT*(1-s.Shunt),0.001);
    const extraction=s.VO2/(s.QT*10); // mL O2/dL whole-blood flow

    function oxygenBalance(pvO2){
      const diff=endCapillaryO2FromDiffusion(pvO2,PAO2,s.Hb,qVent,s.DLO2);
      const Cv=o2ContentMlDl(pvO2,s.Hb);
      const Cc=o2ContentMlDl(diff.po2,s.Hb);
      const Ca=(1-s.Shunt)*Cc+s.Shunt*Cv;
      return {residual:(Ca-Cv)-extraction,diff,Cv,Cc,Ca};
    }

    let lo=0.1,hi=Math.max(PAO2,0.2);
    let flo=oxygenBalance(lo).residual;
    let fhi=oxygenBalance(hi).residual;
    let oxygenSupplyLimited=false;
    let pvO2;
    if(flo*fhi<=0){
      for(let i=0;i<100;i++){
        const mid=(lo+hi)/2;
        const fm=oxygenBalance(mid).residual;
        if(flo*fm<=0){hi=mid;fhi=fm;}else{lo=mid;flo=fm;}
      }
      pvO2=(lo+hi)/2;
    }else{
      // No exact steady-state root: use the physically closest boundary and flag it.
      const a=oxygenBalance(lo),b=oxygenBalance(hi);
      pvO2=Math.abs(a.residual)<=Math.abs(b.residual)?lo:hi;
      oxygenSupplyLimited=true;
      norm.warnings.push('Requested O2 uptake cannot be fully supported by the selected ventilation/perfusion/diffusion settings; the nearest physically feasible O2 state is displayed.');
    }

    const oxy=oxygenBalance(pvO2);
    const endPO2=oxy.diff.po2;
    const mixedVenousO2Content=oxy.Cv;
    const endCapO2Content=oxy.Cc;
    const arterialO2Content=oxy.Ca;
    const artPO2=po2FromO2Content(arterialO2Content,s.Hb);
    const mvSat=o2SaturationFraction(pvO2);
    const ecSat=o2SaturationFraction(endPO2);
    const artSat=o2SaturationFraction(artPO2);

    // CO2: end-capillary equilibration with alveolar PCO2, then exact mass
    // balance across the shunt and systemic circulation in CO2-content space.
    const endPCO2=PACO2;
    const endCO2Content=co2ContentMlDl(endPCO2,s.Hb,ecSat);
    const systemicCO2Increment=VCO2/(s.QT*10); // CvCO2 - CaCO2, mL/dL
    const denomShunt=Math.max(1-s.Shunt,0.05);
    const mixedVenousCO2Content=endCO2Content+systemicCO2Increment/denomShunt;
    const arterialCO2Content=mixedVenousCO2Content-systemicCO2Increment;
    const artPCO2=pco2FromCo2Content(arterialCO2Content,s.Hb,artSat);
    const mvPCO2=pco2FromCo2Content(mixedVenousCO2Content,s.Hb,mvSat);
    const artAB=acidBaseFromPco2(artPCO2);
    const mvAB=acidBaseFromPco2(mvPCO2);

    return {
      ok:true,s,errors:[],warnings:norm.warnings,
      Pb,PIO2,VE,VA,VCO2,PACO2,PAO2,
      extraction,oxygenSupplyLimited,
      diffusionNTU:oxy.diff.NTU,diffusionEffectiveness:oxy.diff.effectiveness,
      mvPO2:pvO2,mvPCO2,mvSat,mixedVenousO2Content,mixedVenousCO2Content,mvPH:mvAB.pH,mvHCO3:mvAB.HCO3,
      endPO2,endPCO2,endSat:ecSat,endCapO2Content,endCO2Content,
      artPO2,artPCO2,artSat,arterialO2Content,arterialCO2Content,artPH:artAB.pH,artHCO3:artAB.HCO3,
      aaGradient:Math.max(0,PAO2-artPO2)
    };
  }

  const API={
    DEFAULTS,barometricPressureMmHg,o2SaturationFraction,o2ContentMlDl,po2FromO2Content,
    acidBaseFromPco2,co2ContentMlDl,pco2FromCo2Content,endCapillaryO2FromDiffusion,
    calculateFromInputs
  };

  if(typeof module!=='undefined' && module.exports) module.exports=API;
  if(root) root.VQ_LUNG_ENGINE_V193=API;

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
      Shunt:readNumber('v149_Shunt',DEFAULTS.Shunt),DLO2:readNumber('v149_DLO2',DEFAULTS.DLO2)
    };
  }
  function setText(id,v){const el=$(id);if(el)el.textContent=v;}
  function clearOutputs(){
    ['v149_mv_pco2','v149_mv_co2','v149_mv_ph','v149_mv_po2','v149_mv_sat','v149_mv_o2','v149_ec_pco2','v149_ec_co2','v149_ec_po2','v149_ec_sat','v149_ec_o2','v149_gen_ve','v149_gen_va','v149_gen_paco2','v149_gen_pio2','v149_gen_pao2','v149_art_pco2','v149_art_co2','v149_art_ph','v149_art_po2','v149_art_sat','v149_art_o2','v149_art_aa'].forEach(id=>setText(id,'—'));
  }

  function writeDom(d){
    if(!d.ok){
      clearOutputs();
      const box=$('v149Interpretation'); if(box) box.textContent='Input error:\n• '+d.errors.join('\n• ');
      return d;
    }
    setText('v149_mv_pco2',fmt(d.mvPCO2));
    setText('v149_mv_co2',fmt(d.mixedVenousCO2Content));
    setText('v149_mv_ph',fmt(d.mvPH,2));
    setText('v149_mv_po2',fmt(d.mvPO2));
    setText('v149_mv_sat',fmt(d.mvSat*100));
    setText('v149_mv_o2',fmt(d.mixedVenousO2Content));

    setText('v149_ec_pco2',fmt(d.endPCO2));
    setText('v149_ec_co2',fmt(d.endCO2Content));
    setText('v149_ec_po2',fmt(d.endPO2));
    setText('v149_ec_sat',fmt(d.endSat*100));
    setText('v149_ec_o2',fmt(d.endCapO2Content));

    setText('v149_gen_ve',fmt(d.VE,2));
    setText('v149_gen_va',fmt(d.VA,2));
    setText('v149_gen_paco2',fmt(d.PACO2));
    setText('v149_gen_pio2',fmt(d.PIO2));
    setText('v149_gen_pao2',fmt(d.PAO2));

    setText('v149_art_pco2',fmt(d.artPCO2));
    setText('v149_art_co2',fmt(d.arterialCO2Content));
    setText('v149_art_ph',fmt(d.artPH,2));
    setText('v149_art_po2',fmt(d.artPO2));
    setText('v149_art_sat',fmt(d.artSat*100));
    setText('v149_art_o2',fmt(d.arterialO2Content));
    setText('v149_art_aa',fmt(d.aaGradient));

    const preset=$('v149ScenarioPreset')?.value||'normal';
    const names={normal:'No V/Q mismatch',lowvq:'Low V/Q',highvq:'High V/Q',pe:'Pulmonary embolism',pneumonia:'Pneumonia',shunt:'True shunt',diffusion:'Diffusion limitation',anemia:'Anemia / low hemoglobin',altitude:'High altitude'};
    const lines=[
      `Preset: ${names[preset]||preset}.`,
      `VE = VT × f = ${fmt(d.VE,2)} L/min; VA = (VT − VD) × f = ${fmt(d.VA,2)} L/min.`,
      `PACO2 = 0.863 × VCO2 / VA = ${fmt(d.PACO2)} mmHg; PAO2 = ${fmt(d.PAO2)} mmHg by the alveolar gas equation.`,
      `End-capillary PO2 = ${fmt(d.endPO2)} mmHg; arterial PO2 = ${fmt(d.artPO2)} mmHg; mixed-venous PO2 = ${fmt(d.mvPO2)} mmHg.`,
      `A-a O2 difference = ${fmt(d.aaGradient)} mmHg.`,
      `O2 content uses 1.34 × Hb × SO2 + 0.0031 × PO2; mixed-venous O2 uses the Fick principle. CO2 content uses the Douglas whole-blood equation.`,
      `Acid-base estimate assumes standard base excess = 0 because bicarbonate/base excess is not an input. DLO2 uses a finite-diffusion exchanger approximation based on blood O2 capacitance.`,
      `Only physiologically dependent outputs change; quantities with no causal dependency on the edited input correctly remain unchanged.`
    ];
    if(d.warnings.length) lines.push('Notice: '+d.warnings.join(' '));
    const box=$('v149Interpretation'); if(box) box.textContent=lines.join('\n');

    const btn=$('v149CalculateBtn');
    if(btn){
      btn.dataset.lastCalculated=String(Date.now());
      const normal=btn.dataset.normalLabel||'Start / Calculate';
      btn.dataset.normalLabel=normal;
      btn.textContent='Calculated';
      clearTimeout(btn.__v193Timer);
      btn.__v193Timer=setTimeout(()=>{if(btn)btn.textContent=btn.dataset.normalLabel||'Start / Calculate';},650);
    }
    root.VQ_LAST_LUNG_CALC_V193={at:new Date().toISOString(),inputs:{...d.s,preset},outputs:{...d}};
    return d;
  }

  function recalculate(){return writeDom(calculateFromInputs(readDomInputs()));}
  function trigger(ev){
    if(ev){ev.preventDefault();ev.stopPropagation();}
    const active=document.activeElement;
    if(active&&active.matches&&active.matches('.v149-input-row input')){try{active.blur();}catch(_e){}}
    setTimeout(recalculate,0);
  }
  function bind(){
    const btn=$('v149CalculateBtn');
    if(btn&&btn.dataset.v193Bound!=='1'){
      btn.type='button';btn.onclick=null;btn.dataset.v193Bound='1';
      btn.addEventListener('click',trigger,true);
    }
    ['v149ApplyPresetBtn','v149ResetModelBtn'].forEach(id=>{
      const el=$(id);if(el&&el.dataset.v193PostCalc!=='1'){
        el.dataset.v193PostCalc='1';
        el.addEventListener('click',()=>setTimeout(recalculate,30),false);
      }
    });
  }

  root.VQ_LUNG_CALCULATE_V193=recalculate;
  root.VQ_LUNG_READ_INPUTS_V193=readDomInputs;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{bind();recalculate();});
  else{bind();recalculate();}
  setTimeout(bind,300);setTimeout(bind,1000);
})(typeof window!=='undefined'?window:(typeof globalThis!=='undefined'?globalThis:null));
