(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));
  const UNITS = {
    VT:'mL', VD:'mL', f:'breaths/min', FIO2:'fraction', Altitude:'m', VO2:'mL/min', R:'unitless', Hb:'g/dL', QT:'L/min', Shunt:'fraction', DLO2:'mL/min/mmHg', LowVA:'%', LowQ:'%', HighVA:'%', HighQ:'%'
  };
  const COLORS = {
    high:{fill:'#fecaca',stroke:'#ef4444'},
    normal:{fill:'#dbe4ee',stroke:'#94a3b8'},
    low:{fill:'#bbf7d0',stroke:'#16a34a'}
  };
  function num(id,def){ const el=$(id); const v=el ? parseFloat(el.value) : NaN; return Number.isFinite(v) ? v : def; }
  function read(){
    return {VT:num('v37VT',500),VD:num('v37VD',150),f:num('v37f',15),FIO2:num('v37FIO2',0.21),Altitude:num('v37Altitude',0),VO2:num('v37VO2',250),R:num('v37R',0.8),Hb:num('v37Hb',15),QT:num('v37QT',5.5),Shunt:num('v37Shunt',0.03),DLO2:num('v37DLO2',32),LowVA:num('v37LowVA',50),LowQ:num('v37LowQ',50),HighVA:num('v37HighVA',50),HighQ:num('v37HighQ',50)};
  }
  function isDetailed(){ const box=$('v37Result'); return !!(box && /v37-output/.test(box.innerHTML||'') && /Input Variables/.test(box.innerHTML||'')); }
  function normalizeBreaks(){
    const box=$('v37Result'); if(!box) return;
    if((box.innerHTML||'').includes('\\n')) box.innerHTML = box.innerHTML.replace(/\\n/g,'<br>');
    box.querySelectorAll('.v37-interpret').forEach(el=>{ if((el.textContent||'').includes('\\n')) el.textContent = el.textContent.replace(/\\n/g,'\n'); });
  }
  function removeInputUnits(){
    document.querySelectorAll('.v37-input-row').forEach(row=>{
      const label=row.querySelector('label'); const input=row.querySelector('input[id^="v37"]');
      if(!label || !input) return;
      const key=input.id.replace(/^v37/,'');
      if(UNITS[key] && label.textContent.trim() !== key) label.textContent = key;
    });
  }
  function addUnitsToResult(){
    const box=$('v37Result'); if(!box || !isDetailed()) return;
    const titleBlocks = Array.from(box.querySelectorAll('.v37-block'));
    const inputBlock = titleBlocks.find(b => /Input Variables/.test(b.querySelector('.v37-block-title')?.textContent || ''));
    if(!inputBlock) return;
    inputBlock.querySelectorAll('tbody tr').forEach(tr=>{
      const td=tr.querySelector('td:first-child'); if(!td) return;
      const raw=(td.textContent||'').replace(/\([^)]*\)/g,'').trim();
      if(!UNITS[raw]) return;
      td.innerHTML = raw + ' <span class="v104-unit">(' + UNITS[raw] + ')</span>';
    });
  }
  function applyRegion(id,kind,scale,lesion){
    const el=$(id); if(!el) return;
    const c=COLORS[kind] || COLORS.normal;
    el.setAttribute('class','vq-lung-region vq-region-'+kind + (lesion ? ' vq-region-lesion' : ''));
    el.style.fill=c.fill; el.style.stroke=c.stroke;
    el.style.transform='scale('+clamp(scale||1,.35,1.55)+')';
    el.style.transformBox='fill-box'; el.style.transformOrigin='center center';
  }
  function setBar(id,textId,val,label){ const b=$(id),t=$(textId); if(b) b.style.width=clamp(val,4,100)+'%'; if(t) t.textContent=label+' '+Math.round(val)+'/100'; }
  function renderCalculatedLung(){
    const s=read();
    const VA=Math.max((s.VT-s.VD)*s.f/1000,0);
    const Vrel=clamp(VA/5.25,0,2.4);
    const baseScale=clamp(0.42 + 0.62*Vrel, .38, 1.45);
    const diffScale=clamp(s.DLO2/32, .75, 1.15);
    const lowScale=clamp(baseScale * clamp(s.LowVA/50,.45,1.45) * (s.Shunt>0.15 ? .82 : 1) * diffScale, .35, 1.55);
    const highScale=clamp(baseScale * clamp(s.HighVA/50,.45,1.45) * diffScale, .35, 1.55);
    const midScale=clamp(baseScale * diffScale, .35, 1.55);
    const mismatch = $('v37MisBtn') && $('v37MisBtn').classList.contains('active');
    const lowRatio = s.LowVA / Math.max(s.LowQ,1);
    const highRatio = s.HighVA / Math.max(s.HighQ,1);
    let apexKind = mismatch ? 'normal' : 'high';
    let baseKind = mismatch ? 'normal' : 'low';
    let midKind = 'normal';
    if(mismatch){
      if(highRatio > 1.25) apexKind = 'high';
      if(lowRatio < .8 || s.Shunt > .15) baseKind = 'low';
      if(s.Shunt > .25) midKind = 'low';
    }
    applyRegion('leftApex',apexKind,highScale,false);
    applyRegion('rightApex',apexKind,highScale,false);
    applyRegion('leftBase',baseKind,lowScale,false);
    applyRegion('rightBase',baseKind,lowScale,false);
    applyRegion('rightMiddle',midKind,midScale,false);
    const leftMiddle=$('leftMiddle'); if(leftMiddle) leftMiddle.style.display='none';
    const QTrel=clamp(s.QT/5.5,.1,2.4);
    const vqApprox = mismatch ? clamp((lowRatio + highRatio)/2,.05,8) : clamp((VA/5.25)/Math.max(QTrel*(1-s.Shunt),.05),.05,8);
    setBar('ventBar','ventText',clamp(Vrel*50,1,100),'Ventilation');
    setBar('perfBar','perfText',clamp(QTrel*50,1,100),'Perfusion');
    setBar('vqBar','vqText',clamp(vqApprox*30,1,100),'V/Q ratio');
    const z=$('zoomLobe');
    const zoomKind = apexKind==='high' ? 'high' : (baseKind==='low' ? 'low' : 'normal');
    if(z){ z.setAttribute('class','vq-zoom-lobe vq-region-'+zoomKind); z.style.fill=(COLORS[zoomKind]||COLORS.normal).fill; z.style.stroke=(COLORS[zoomKind]||COLORS.normal).stroke; z.style.transform='scale('+clamp((zoomKind==='low'?lowScale:(zoomKind==='high'?highScale:midScale)),.45,1.35)+')'; }
    const glow=$('zoomPerfusionGlow'); if(glow){ glow.style.opacity=String(clamp(QTrel*.45,.08,.95)); glow.style.transform='scale('+clamp(QTrel,.62,1.22)+')'; }
    const title=$('zoomTitle'); if(title) title.textContent='Calculated V/Q model';
    const ex=$('vqModelExplanation'); if(ex) ex.textContent='After selecting Calculate, the lung display updates from the input parameters. VT, VD, and f alter overall ventilation through VA=(VT-VD)×f; LowVA/HighVA alter the low/high V/Q regions; Shunt alters the lower-lung low-V/Q region; QT changes the perfusion display.';
  }
  function afterCalculate(){
    removeInputUnits();
    normalizeBreaks();
    renderCalculatedLung();
    addUnitsToResult();
    normalizeBreaks();
  }
  function bind(){
    removeInputUnits();
    const calc=$('v37CalcBtn');
    if(calc && calc.dataset.v104Bound !== '1'){
      calc.dataset.v104Bound='1';
      calc.addEventListener('click',()=>{
        setTimeout(afterCalculate,80);
        setTimeout(afterCalculate,180);
        setTimeout(afterCalculate,360);
      },false);
    }
    const reset=$('v37ResetBtn');
    if(reset && reset.dataset.v104Reset !== '1'){
      reset.dataset.v104Reset='1';
      reset.addEventListener('click',()=>{ setTimeout(removeInputUnits,60); },false);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  setTimeout(bind,500); setTimeout(bind,1200);
})();
