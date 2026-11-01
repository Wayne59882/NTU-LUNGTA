(function(){
  'use strict';

  const $ = id => document.getElementById(id);
  const clamp = (x,a,b) => Math.max(a,Math.min(b,x));
  const fmt = (x,d=1) => Number.isFinite(x) ? Number(x).toFixed(d) : '—';
  const DEFAULTS = {VT:500,VD:150,f:12,FIO2:.21,Altitude:0,VO2:250,R:.8,Hb:15,QT:5,Shunt:.05,DLO2:32};

  // Accept normal decimal input on desktop/mobile.  Number inputs usually normalize
  // decimal separators, but the fallback also handles a comma if a mobile keyboard
  // leaves one in a text representation.
  function readNumber(id, fallback){
    const el=$(id);
    if(!el) return fallback;
    const asNumber=Number(el.valueAsNumber);
    if(Number.isFinite(asNumber)) return asNumber;
    const raw=String(el.value ?? '').trim().replace(/，/g,'.').replace(/,/g,'.');
    const parsed=Number(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function readModel(){
    return {
      VT:readNumber('v149_VT',DEFAULTS.VT),
      VD:readNumber('v149_VD',DEFAULTS.VD),
      f:readNumber('v149_f',DEFAULTS.f),
      FIO2:readNumber('v149_FIO2',DEFAULTS.FIO2),
      Altitude:readNumber('v149_Altitude',DEFAULTS.Altitude),
      VO2:readNumber('v149_VO2',DEFAULTS.VO2),
      R:readNumber('v149_R',DEFAULTS.R),
      Hb:readNumber('v149_Hb',DEFAULTS.Hb),
      QT:readNumber('v149_QT',DEFAULTS.QT),
      Shunt:clamp(readNumber('v149_Shunt',DEFAULTS.Shunt),0,.8),
      DLO2:readNumber('v149_DLO2',DEFAULTS.DLO2)
    };
  }

  function pb(alt){ return 760*Math.exp(-Math.max(alt,0)/7000); }
  function sat(po2){ return clamp(100/(1+Math.pow(26.8/Math.max(po2,1),2.7)),0,99.8); }
  function o2content(po2,hb){ return 1.34*hb*(sat(po2)/100)+.003*Math.max(po2,0); }
  function co2content(pco2){ return 40+pco2*.20; }
  function ph(pco2){ return clamp(7.40-Math.log(Math.max(pco2,1)/40)/Math.log(10)*.65,6.65,7.65); }

  function calculateModel(){
    const s=readModel();
    const Pb=pb(s.Altitude);
    const PIO2=s.FIO2*Math.max(Pb-47,1);
    const VA=Math.max((s.VT-s.VD)*s.f/1000,.05);
    const VE=Math.max(s.VT,0)*Math.max(s.f,0)/1000;
    const VCO2=Math.max(s.VO2,0)*Math.max(s.R,.05);
    const PACO2=(VCO2*.863)/VA;
    const PAO2=Math.max(0,PIO2-PACO2/Math.max(s.R,.05));
    const preset=$('v149ScenarioPreset')?.value || 'normal';
    let mismatch=0;
    if(['lowvq','pneumonia'].includes(preset)) mismatch=20;
    if(['highvq','pe'].includes(preset)) mismatch=12;
    if(preset==='diffusion') mismatch+=Math.max(0,32-s.DLO2)*1.2;
    const artPO2=Math.max(0,PAO2-2-mismatch-s.Shunt*65);
    const artPCO2=PACO2+s.Shunt*8;
    const mvPO2=40-(Math.max(s.VO2,0)/Math.max(s.QT,1)-50)*.05;
    const mvPCO2=46+(Math.max(s.VO2,0)/Math.max(s.QT,1)-50)*.04;
    const endPO2=Math.max(5,PAO2-Math.max(0,32-s.DLO2)*.55);
    const endPCO2=PACO2;
    return {s,VE,VA,PACO2,PIO2,PAO2,artPO2,artPCO2,mvPO2,mvPCO2,endPO2,endPCO2,preset};
  }

  function set(id,value){ const el=$(id); if(el) el.textContent=value; }

  function writeOutputs(d){
    const s=d.s;
    set('v149_mv_pco2',fmt(d.mvPCO2));
    set('v149_mv_co2',fmt(co2content(d.mvPCO2)));
    set('v149_mv_ph',fmt(ph(d.mvPCO2),2));
    set('v149_mv_po2',fmt(d.mvPO2));
    set('v149_mv_sat',fmt(sat(d.mvPO2)));
    set('v149_mv_o2',fmt(o2content(d.mvPO2,s.Hb)));

    set('v149_ec_pco2',fmt(d.endPCO2));
    set('v149_ec_co2',fmt(co2content(d.endPCO2)));
    set('v149_ec_po2',fmt(d.endPO2));
    set('v149_ec_sat',fmt(sat(d.endPO2)));
    set('v149_ec_o2',fmt(o2content(d.endPO2,s.Hb)));

    set('v149_gen_ve',fmt(d.VE,2));
    set('v149_gen_va',fmt(d.VA,2));
    set('v149_gen_paco2',fmt(d.PACO2));
    set('v149_gen_pio2',fmt(d.PIO2));
    set('v149_gen_pao2',fmt(d.PAO2));

    set('v149_art_pco2',fmt(d.artPCO2));
    set('v149_art_co2',fmt(co2content(d.artPCO2)));
    set('v149_art_ph',fmt(ph(d.artPCO2),2));
    set('v149_art_po2',fmt(d.artPO2));
    set('v149_art_sat',fmt(sat(d.artPO2)));
    set('v149_art_o2',fmt(o2content(d.artPO2,s.Hb)));
    set('v149_art_aa',fmt(Math.max(0,d.PAO2-d.artPO2)));

    const names={normal:'No V/Q mismatch',lowvq:'Low V/Q',highvq:'High V/Q',pe:'Pulmonary embolism',pneumonia:'Pneumonia',shunt:'True shunt',diffusion:'Diffusion limitation',anemia:'Anemia',altitude:'High altitude'};
    const box=$('v149Interpretation');
    if(box){
      box.textContent=[
        `Preset: ${names[d.preset]||d.preset}.`,
        `Minute ventilation = ${fmt(d.VE,2)} L/min; alveolar ventilation = ${fmt(d.VA,2)} L/min.`,
        `Estimated PAO2 = ${fmt(d.PAO2)} mmHg; arterial PO2 = ${fmt(d.artPO2)} mmHg; A-a difference = ${fmt(Math.max(0,d.PAO2-d.artPO2))} mmHg.`,
        'All dependent numerical panels were recalculated from the current input values.'
      ].join('\n');
    }

    // A small observable marker helps verify that the button actually completed a new calculation.
    const btn=$('v149CalculateBtn');
    if(btn){
      btn.dataset.lastCalculated=String(Date.now());
      const old=btn.textContent;
      btn.textContent='Calculated';
      clearTimeout(btn.__vq191LabelTimer);
      btn.__vq191LabelTimer=setTimeout(()=>{ if(btn) btn.textContent=old || 'Start / Calculate'; },650);
    }
    window.VQ_LAST_LUNG_CALC_V191={at:new Date().toISOString(),inputs:{...s},outputs:{VE:d.VE,VA:d.VA,PACO2:d.PACO2,PIO2:d.PIO2,PAO2:d.PAO2,artPO2:d.artPO2,artPCO2:d.artPCO2,mvPO2:d.mvPO2,mvPCO2:d.mvPCO2,endPO2:d.endPO2,endPCO2:d.endPCO2}};
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
    if(ev){ ev.preventDefault(); }
    const now=Date.now();
    if(now-lastTrigger<80) return;
    lastTrigger=now;
    commitFocusedNumericInput();
    // Run after the blur/change cycle so iOS/Android commits the latest keyboard value.
    requestAnimationFrame(()=>setTimeout(recalculate,0));
  }

  function bind(){
    const btn=$('v149CalculateBtn');
    if(!btn) return;
    btn.type='button';
    // Remove the older property handler; this module is the single source of truth.
    btn.onclick=null;
    if(btn.dataset.v191Bound==='1') return;
    btn.dataset.v191Bound='1';
    btn.addEventListener('click',triggerCalculate,false);
    // Pointer-up is a mobile safety net.  The 80 ms de-duplication prevents the
    // synthesized click from calculating twice on browsers that emit both events.
    if(window.PointerEvent) btn.addEventListener('pointerup',triggerCalculate,false);
  }

  window.VQ_LUNG_CALCULATE_V191=recalculate;
  window.VQ_LUNG_READ_INPUTS_V191=readModel;

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>{bind();recalculate();});
  else {bind();recalculate();}
  setTimeout(bind,300);
  setTimeout(bind,1000);
})();
