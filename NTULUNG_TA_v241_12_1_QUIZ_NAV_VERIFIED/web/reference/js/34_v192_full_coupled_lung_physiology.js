(function(){
  'use strict';

  const $ = id => document.getElementById(id);
  const clamp = (x,a,b) => Math.max(a,Math.min(b,x));
  const fmt = (x,d=1) => Number.isFinite(x) ? Number(x).toFixed(d) : '—';
  const DEFAULTS = {VT:500,VD:150,f:12,FIO2:.21,Altitude:0,VO2:250,R:.8,Hb:15,QT:5,Shunt:.05,DLO2:32};

  function readNumber(id, fallback){
    const el=$(id);
    if(!el) return fallback;
    const n=Number(el.valueAsNumber);
    if(Number.isFinite(n)) return n;
    const raw=String(el.value ?? '').trim().replace(/，/g,'.').replace(/,/g,'.');
    const parsed=Number(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function readModel(){
    return {
      VT:Math.max(0,readNumber('v149_VT',DEFAULTS.VT)),
      VD:Math.max(0,readNumber('v149_VD',DEFAULTS.VD)),
      f:Math.max(0,readNumber('v149_f',DEFAULTS.f)),
      FIO2:clamp(readNumber('v149_FIO2',DEFAULTS.FIO2),0.01,1),
      Altitude:Math.max(0,readNumber('v149_Altitude',DEFAULTS.Altitude)),
      VO2:Math.max(0,readNumber('v149_VO2',DEFAULTS.VO2)),
      R:clamp(readNumber('v149_R',DEFAULTS.R),0.05,2),
      Hb:Math.max(0.1,readNumber('v149_Hb',DEFAULTS.Hb)),
      QT:Math.max(0.2,readNumber('v149_QT',DEFAULTS.QT)),
      Shunt:clamp(readNumber('v149_Shunt',DEFAULTS.Shunt),0,.8),
      DLO2:Math.max(0,readNumber('v149_DLO2',DEFAULTS.DLO2))
    };
  }

  function pb(alt){ return 760*Math.exp(-Math.max(alt,0)/7000); }
  function sat(po2){ return clamp(100/(1+Math.pow(26.8/Math.max(po2,1),2.7)),0,99.8); }
  function o2content(po2,hb){ return 1.34*hb*(sat(po2)/100)+.003*Math.max(po2,0); }
  function co2content(pco2){ return 40+pco2*.20; }
  function ph(pco2){ return clamp(7.40-Math.log(Math.max(pco2,1)/40)/Math.log(10)*.65,6.65,7.65); }

  // Invert the model's O2-content equation so a changed arterial/end-capillary
  // O2 content propagates back to PO2/SO2 instead of leaving panels disconnected.
  function po2FromContent(content,hb){
    const target=Math.max(0,content);
    let lo=0, hi=700;
    for(let i=0;i<72;i++){
      const mid=(lo+hi)/2;
      if(o2content(mid,hb)<target) lo=mid; else hi=mid;
    }
    return (lo+hi)/2;
  }

  function presetMismatchFraction(preset){
    // Small functional-mixing terms preserve the educational preset direction
    // while the explicit Shunt input remains the main shunt control.
    return ({lowvq:.06,pneumonia:.08,highvq:.03,pe:.05})[preset] || 0;
  }

  function calculateModel(){
    const s=readModel();
    const preset=$('v149ScenarioPreset')?.value || 'normal';

    // Ventilation / alveolar gas chain.
    const Pb=pb(s.Altitude);
    const PIO2=s.FIO2*Math.max(Pb-47,1);
    const VE=s.VT*s.f/1000;
    const VA=Math.max((s.VT-s.VD)*s.f/1000,.05);
    const VCO2=s.VO2*s.R;
    const PACO2=(VCO2*.863)/VA;
    const PAO2=Math.max(0,PIO2-PACO2/s.R);

    // Coupled O2 chain: alveolus -> end capillary -> arterial -> mixed venous.
    // Fick principle links mixed-venous O2 content to arterial O2 content,
    // so changing VT can propagate through all four numerical panels.
    const diffEff=clamp(s.DLO2/32,.03,1);
    const effectiveShunt=clamp(s.Shunt+presetMismatchFraction(preset),0,.8);
    const extraction=s.VO2/(s.QT*10); // ml O2/dl (VO2 / cardiac output)

    let mvPO2=40;
    let endPO2=Math.max(1,PAO2);
    let artPO2=Math.max(1,PAO2-5);
    let arterialO2Content=o2content(artPO2,s.Hb);
    let mixedVenousO2Content=Math.max(0,arterialO2Content-extraction);

    for(let i=0;i<14;i++){
      // DLO2 controls how far capillary blood equilibrates from mixed venous
      // toward alveolar PO2. At DLO2=32, equilibration is effectively complete.
      endPO2=clamp(mvPO2+(PAO2-mvPO2)*diffEff,1,Math.max(PAO2,1));
      const endCapO2Content=o2content(endPO2,s.Hb);
      const currentMvContent=o2content(mvPO2,s.Hb);
      arterialO2Content=(1-effectiveShunt)*endCapO2Content+effectiveShunt*currentMvContent;
      artPO2=po2FromContent(arterialO2Content,s.Hb);
      mixedVenousO2Content=Math.max(0,arterialO2Content-extraction);
      const targetMvPO2=po2FromContent(mixedVenousO2Content,s.Hb);
      mvPO2=.45*mvPO2+.55*targetMvPO2;
    }
    mixedVenousO2Content=o2content(mvPO2,s.Hb);
    const endCapO2Content=o2content(endPO2,s.Hb);

    // Coupled CO2 chain. CO2 equilibrates rapidly at the end capillary.
    // Mixed-venous PCO2 is derived from arterial PCO2 plus a metabolism/flow
    // term, so VT-driven PACO2 changes propagate to both arterial and venous CO2.
    const endPCO2=PACO2;
    const deltaPCO2=6*(VCO2/200)*(5/s.QT);
    let mvPCO2=endPCO2+deltaPCO2;
    let artPCO2=endPCO2;
    for(let i=0;i<10;i++){
      artPCO2=(1-effectiveShunt)*endPCO2+effectiveShunt*mvPCO2;
      mvPCO2=artPCO2+deltaPCO2;
    }

    return {
      s,preset,VE,VA,VCO2,PACO2,PIO2,PAO2,
      diffEff,effectiveShunt,extraction,
      mvPO2,mvPCO2,mixedVenousO2Content,
      endPO2,endPCO2,endCapO2Content,
      artPO2,artPCO2,arterialO2Content
    };
  }

  function set(id,value){ const el=$(id); if(el) el.textContent=value; }

  function writeOutputs(d){
    const s=d.s;

    // Mixed Venous — now coupled to arterial O2 content (Fick) and arterial CO2.
    set('v149_mv_pco2',fmt(d.mvPCO2));
    set('v149_mv_co2',fmt(co2content(d.mvPCO2)));
    set('v149_mv_ph',fmt(ph(d.mvPCO2),2));
    set('v149_mv_po2',fmt(d.mvPO2));
    set('v149_mv_sat',fmt(sat(d.mvPO2)));
    set('v149_mv_o2',fmt(d.mixedVenousO2Content));

    // End Capillary — coupled to PAO2, mixed venous entry blood, and DLO2.
    set('v149_ec_pco2',fmt(d.endPCO2));
    set('v149_ec_co2',fmt(co2content(d.endPCO2)));
    set('v149_ec_po2',fmt(d.endPO2));
    set('v149_ec_sat',fmt(sat(d.endPO2)));
    set('v149_ec_o2',fmt(d.endCapO2Content));

    // General ventilation / alveolar gas values.
    set('v149_gen_ve',fmt(d.VE,2));
    set('v149_gen_va',fmt(d.VA,2));
    set('v149_gen_paco2',fmt(d.PACO2));
    set('v149_gen_pio2',fmt(d.PIO2));
    set('v149_gen_pao2',fmt(d.PAO2));

    // Arterial Blood — content-based end-capillary/shunt mixing.
    set('v149_art_pco2',fmt(d.artPCO2));
    set('v149_art_co2',fmt(co2content(d.artPCO2)));
    set('v149_art_ph',fmt(ph(d.artPCO2),2));
    set('v149_art_po2',fmt(d.artPO2));
    set('v149_art_sat',fmt(sat(d.artPO2)));
    set('v149_art_o2',fmt(d.arterialO2Content));
    set('v149_art_aa',fmt(Math.max(0,d.PAO2-d.artPO2)));

    const names={normal:'No V/Q mismatch',lowvq:'Low V/Q',highvq:'High V/Q',pe:'Pulmonary embolism',pneumonia:'Pneumonia',shunt:'True shunt',diffusion:'Diffusion limitation',anemia:'Anemia',altitude:'High altitude'};
    const box=$('v149Interpretation');
    if(box){
      box.textContent=[
        `Preset: ${names[d.preset]||d.preset}.`,
        `Minute ventilation = ${fmt(d.VE,2)} L/min; alveolar ventilation = ${fmt(d.VA,2)} L/min.`,
        `Alveolar PCO2 = ${fmt(d.PACO2)} mmHg; alveolar PO2 = ${fmt(d.PAO2)} mmHg.`,
        `End-capillary PO2 = ${fmt(d.endPO2)} mmHg; arterial PO2 = ${fmt(d.artPO2)} mmHg; mixed-venous PO2 = ${fmt(d.mvPO2)} mmHg.`,
        `A-a O2 difference = ${fmt(Math.max(0,d.PAO2-d.artPO2))} mmHg.`,
        'The calculation is physiologically coupled: ventilation changes propagate through alveolar gas, end-capillary blood, arterial blood, and—through the Fick oxygen-extraction relationship—mixed venous blood. Values without a causal VT dependency, such as inspired PO2 when FiO2 and altitude are unchanged, correctly remain unchanged.'
      ].join('\n');
    }

    const btn=$('v149CalculateBtn');
    if(btn){
      btn.dataset.lastCalculated=String(Date.now());
      const old=btn.dataset.normalLabel || btn.textContent || 'Start / Calculate';
      btn.dataset.normalLabel=old==='Calculated' ? 'Start / Calculate' : old;
      btn.textContent='Calculated';
      clearTimeout(btn.__vq192LabelTimer);
      btn.__vq192LabelTimer=setTimeout(()=>{ if(btn) btn.textContent=btn.dataset.normalLabel || 'Start / Calculate'; },650);
    }

    window.VQ_LAST_LUNG_CALC_V192={
      at:new Date().toISOString(),
      inputs:{...s,preset:d.preset},
      coupling:{diffusionEfficiency:d.diffEff,effectiveShunt:d.effectiveShunt,oxygenExtractionMlDl:d.extraction},
      outputs:{
        VE:d.VE,VA:d.VA,PACO2:d.PACO2,PIO2:d.PIO2,PAO2:d.PAO2,
        endPO2:d.endPO2,endPCO2:d.endPCO2,endO2Content:d.endCapO2Content,
        artPO2:d.artPO2,artPCO2:d.artPCO2,artO2Content:d.arterialO2Content,
        mvPO2:d.mvPO2,mvPCO2:d.mvPCO2,mvO2Content:d.mixedVenousO2Content
      }
    };
  }

  function recalculate(){
    const d=calculateModel();
    writeOutputs(d);
    return d;
  }

  function commitFocusedNumericInput(){
    const active=document.activeElement;
    if(active && active.matches && active.matches('.v149-input-row input')){
      try{ active.blur(); }catch(_e){}
    }
  }

  let lastTrigger=0;
  function triggerCalculate(ev){
    if(ev) ev.preventDefault();
    const now=Date.now();
    if(now-lastTrigger<80) return;
    lastTrigger=now;
    commitFocusedNumericInput();
    requestAnimationFrame(()=>setTimeout(recalculate,0));
  }

  function bind(){
    const btn=$('v149CalculateBtn');
    if(btn && btn.dataset.v192Bound!=='1'){
      btn.type='button';
      btn.onclick=null;
      btn.dataset.v192Bound='1';
      btn.addEventListener('click',triggerCalculate,false);
      if(window.PointerEvent) btn.addEventListener('pointerup',triggerCalculate,false);
    }

    // Preset/Reset are still supplied by the existing UI module. Recalculate
    // after those handlers finish so every panel uses this v192 coupled model.
    ['v149ApplyPresetBtn','v149ResetModelBtn'].forEach(id=>{
      const el=$(id);
      if(el && el.dataset.v192PostCalc!=='1'){
        el.dataset.v192PostCalc='1';
        el.addEventListener('click',()=>setTimeout(recalculate,20),false);
      }
    });
  }

  window.VQ_LUNG_CALCULATE_V192=recalculate;
  window.VQ_LUNG_READ_INPUTS_V192=readModel;

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{bind();recalculate();});
  else {bind();recalculate();}
  setTimeout(bind,300);
  setTimeout(bind,1000);
})();
