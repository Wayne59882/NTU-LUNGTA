(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));
  const COLORS = {
    high:{fill:'#fecaca',stroke:'#ef4444'},
    normal:{fill:'#dbe4ee',stroke:'#94a3b8'},
    low:{fill:'#bbf7d0',stroke:'#16a34a'}
  };
  const INPUTS = {
    normal:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.03,DLO2:32,LowVA:50,LowQ:50,HighVA:50,HighQ:50},
    pneumonia:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.12,DLO2:32,LowVA:25,LowQ:80,HighVA:50,HighQ:50},
    pe:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.03,DLO2:32,LowVA:50,LowQ:50,HighVA:85,HighQ:15},
    shunt:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.35,DLO2:32,LowVA:6,LowQ:90,HighVA:50,HighQ:50},
    deadspace:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.03,DLO2:32,LowVA:50,LowQ:50,HighVA:90,HighQ:8}
  };
  const STATES = {
    normal:{ title:'No mismatch：Normal V/Q Gradient', zoomTitle:'Normal gradient\n（無病灶放大）', vent:100, perf:100, vq:50, perfGlow:.55, zoomKind:'normal', zoomScale:1,
      regions:{leftApex:'high',leftBase:'low',rightApex:'high',rightMiddle:'normal',rightBase:'low'}, lesions:[], scales:{},
      explanation:'正常狀態下，肺尖 V/Q 較高、肺底 V/Q 較低，右中肺葉接近中間。左側主圖、右側放大圖與圖例使用同一套著色規則。',
      mechanisms:['上肺區偏 high V/Q。','下肺區偏 low V/Q。','右中肺葉為接近中間的灰藍色。'] },
    pneumonia:{ title:'Pneumonia：Right lower-lobe low V/Q / shunt-like', zoomTitle:'放大病灶：右下肺\npneumonia', vent:28, perf:78, vq:22, perfGlow:.90, zoomKind:'low', zoomScale:1.10,
      regions:{leftApex:'normal',leftBase:'normal',rightApex:'normal',rightMiddle:'normal',rightBase:'low'}, lesions:['rightBase'], scales:{rightBase:.80},
      explanation:'Pneumonia 固定標示在右下肺單一病灶。右下肺以綠色表示 low V/Q 或 shunt-like，其餘區域維持灰藍正常色。',
      mechanisms:['病灶區 ventilation 下降。','perfusion 仍存在，因此 V/Q 降低。','主圖與放大圖同步顯示右下肺病灶。'] },
    pe:{ title:'Pulmonary Embolism：Right upper-lobe high V/Q / dead-space-like', zoomTitle:'放大病灶：右上肺\npulmonary embolism', vent:82, perf:18, vq:96, perfGlow:.18, zoomKind:'high', zoomScale:1.10,
      regions:{leftApex:'normal',leftBase:'normal',rightApex:'high',rightMiddle:'normal',rightBase:'normal'}, lesions:['rightApex'], scales:{rightApex:1.08},
      explanation:'Pulmonary embolism 固定標示在右上肺單一病灶。右上肺以紅色表示 high V/Q / dead-space-like，其餘區域維持灰藍正常色。',
      mechanisms:['病灶區 perfusion 下降。','ventilation 相對保留，因此 V/Q 升高。','只標示右上肺，不連動右中肺葉。'] },
    shunt:{ title:'Shunt-like：Lower-zone very low V/Q', zoomTitle:'放大病灶：下肺\nshunt-like 區域', vent:8, perf:90, vq:6, perfGlow:.95, zoomKind:'low', zoomScale:1.12,
      regions:{leftApex:'normal',leftBase:'low',rightApex:'normal',rightMiddle:'normal',rightBase:'low'}, lesions:['leftBase','rightBase'], scales:{leftBase:.76,rightBase:.76},
      explanation:'Shunt-like 固定標示在左右下肺病灶。左右下肺都以綠色表示 very low V/Q，其餘區域維持灰藍正常色。',
      mechanisms:['有血流，但沒有有效通氣。','V/Q ratio 很低。','放大圖對應下肺 shunt-like 病灶。'] },
    deadspace:{ title:'Dead Space-like：Upper-zone high V/Q', zoomTitle:'放大病灶：上肺\ndead-space-like 區域', vent:88, perf:10, vq:98, perfGlow:.12, zoomKind:'high', zoomScale:1.10,
      regions:{leftApex:'high',leftBase:'normal',rightApex:'high',rightMiddle:'normal',rightBase:'normal'}, lesions:['leftApex','rightApex'], scales:{leftApex:1.08,rightApex:1.08},
      explanation:'Dead space-like 固定標示在左右上肺病灶。左右上肺以紅色表示 high V/Q；下肺與右中肺一律維持灰藍正常色。',
      mechanisms:['有通氣，但血流不足。','左右上肺同步著色為 high V/Q。','避免上下著色不同步。'] }
  };
  const lesionDefs = {
    rightApex:{text:'RUL lesion',x:505,y:120,lx:455,ly:168,anchor:'start',w:86},
    rightBase:{text:'RLL lesion',x:500,y:430,lx:458,ly:404,anchor:'start',w:82},
    leftApex:{text:'LUL lesion',x:185,y:130,lx:240,ly:170,anchor:'end',w:82},
    leftBase:{text:'LLL lesion',x:180,y:430,lx:236,ly:400,anchor:'end',w:82}
  };
  function setBar(id,textId,val,label){ const b=$(id),t=$(textId); if(b) b.style.width=clamp(val,4,100)+'%'; if(t) t.textContent=label+' '+Math.round(val)+'/100'; }
  function applyRegion(id, kind, scale, lesion){
    const el=$(id); if(!el) return;
    const c = COLORS[kind] || COLORS.normal;
    el.setAttribute('class','vq-lung-region vq-region-'+kind + (lesion ? ' vq-region-lesion' : ''));
    el.style.fill = c.fill;
    el.style.stroke = c.stroke;
    el.style.transform='scale('+(scale||1)+')';
  }
  function ensureLesionLabels(){
    const svg = document.querySelector('.vq-lung-svg');
    if(!svg || $('vqLesionLabels')) return;
    const ns='http://www.w3.org/2000/svg';
    const g=document.createElementNS(ns,'g'); g.setAttribute('id','vqLesionLabels'); g.setAttribute('class','vq-lesion-callout');
    Object.entries(lesionDefs).forEach(([key,d])=>{
      const wrap=document.createElementNS(ns,'g'); wrap.setAttribute('id','lesion_'+key); wrap.style.display='none';
      const line=document.createElementNS(ns,'line'); line.setAttribute('x1',d.x); line.setAttribute('y1',d.y); line.setAttribute('x2',d.lx); line.setAttribute('y2',d.ly);
      const rect=document.createElementNS(ns,'rect');
      const rx = d.anchor==='end' ? d.x-d.w-8 : d.x-8;
      rect.setAttribute('x', rx); rect.setAttribute('y', d.y-18); rect.setAttribute('width', d.w); rect.setAttribute('height', 24);
      const text=document.createElementNS(ns,'text'); text.setAttribute('x', d.x + (d.anchor==='end' ? -8 : 8)); text.setAttribute('y', d.y-1); text.setAttribute('text-anchor', d.anchor);
      text.textContent = d.text;
      wrap.appendChild(line); wrap.appendChild(rect); wrap.appendChild(text); g.appendChild(wrap);
    });
    svg.appendChild(g);
  }
  function showLesions(ids){
    ensureLesionLabels();
    Object.keys(lesionDefs).forEach(k=>{ const el=$('lesion_'+k); if(el) el.style.display='none'; });
    (ids||[]).forEach(k=>{ const el=$('lesion_'+k); if(el) el.style.display='block'; });
  }
  function renderMechanisms(list){ const grid=$('vqMechanismGrid'); if(grid) grid.innerHTML=(list||[]).map((x,i)=>'<div class="mechanism-card"><b>'+(i+1)+'.</b> '+x+'</div>').join(''); }
  function syncButtons(key){
    ['normalBtn','peBtn','pneumoniaBtn','shuntBtn','deadSpaceBtn','v37NoBtn','v37MisBtn','v37PEBtn','v37PneuBtn','v37ShuntBtn','v37DeadBtn'].forEach(id=>$(id)?.classList.remove('active'));
    const map={normal:['normalBtn','v37NoBtn'],pe:['peBtn','v37PEBtn'],pneumonia:['pneumoniaBtn','v37PneuBtn'],shunt:['shuntBtn','v37ShuntBtn'],deadspace:['deadSpaceBtn','v37DeadBtn']};
    (map[key]||[]).forEach(id=>$(id)?.classList.add('active'));
  }
  function setInputValues(key){ const values=INPUTS[key]||{}; Object.keys(values).forEach(k=>{ const el=$('v37'+k); if(el) el.value=values[k]; }); }
  function num(id,def){ const el=$(id); const v=el ? parseFloat(el.value) : NaN; return Number.isFinite(v) ? v : def; }
  function calcState(){
    const VT=num('v37VT',500), VD=num('v37VD',150), f=num('v37f',15), Shunt=num('v37Shunt',0), LowVA=num('v37LowVA',50), LowQ=num('v37LowQ',50), HighVA=num('v37HighVA',50), HighQ=num('v37HighQ',50);
    const VA=Math.max((VT-VD)*f/1000,0.01), scale=clamp(VA/5.25,0.45,1.45), mismatch=$('v37MisBtn') && $('v37MisBtn').classList.contains('active');
    const lr=LowVA/Math.max(LowQ,1), hr=HighVA/Math.max(HighQ,1);
    let apex=mismatch?'normal':'high', middle='normal', base=mismatch?'normal':'low';
    if(mismatch){ if(hr>1.25) apex='high'; if(lr<0.8||Shunt>0.15) base='low'; if(Shunt>0.2) middle='low'; }
    const normalScale=clamp(scale,.85,1.15), highScale=clamp(HighVA/50,.75,1.30), lowScale=clamp(LowVA/50,.55,1.12);
    return {
      title:'Calculated V/Q model', zoomTitle:'Calculated V/Q model', vent:clamp(scale*50,1,100), perf:50, vq:clamp(apex==='high'?85:(base==='low'?20:50),1,100), perfGlow:.50, zoomKind:apex==='high'?'high':(base==='low'?'low':'normal'), zoomScale:1,
      regions:{leftApex:apex,leftBase:base,rightApex:apex,rightMiddle:middle,rightBase:base}, lesions:[], scales:{leftApex:apex==='high'?highScale:normalScale,leftBase:base==='low'?lowScale:normalScale,rightApex:apex==='high'?highScale:normalScale,rightMiddle:middle==='low'?lowScale:normalScale,rightBase:base==='low'?lowScale:normalScale},
      explanation:'此畫面依目前參數自動同步上色：高 V/Q 用紅色、接近正常用灰藍、低 V/Q 用綠色。右側放大圖與左側主圖使用同一套著色規則。',
      mechanisms:['顏色依 V/Q 類型同步。','肺葉大小依 ventilation 相對變化縮放。','右側放大圖與左側主圖一致。']
    };
  }
  function detectPreset(){
    const map=[['peBtn','pe'],['pneumoniaBtn','pneumonia'],['shuntBtn','shunt'],['deadSpaceBtn','deadspace'],['normalBtn','normal'],['v37PEBtn','pe'],['v37PneuBtn','pneumonia'],['v37ShuntBtn','shunt'],['v37DeadBtn','deadspace'],['v37NoBtn','normal']];
    for(const [id,key] of map){ const el=$(id); if(el && el.classList.contains('active')) return key; }
    return null;
  }
  function renderModel(key){
    if(key==='dead') key='deadspace'; if(key==='pneu') key='pneumonia';
    const st = key && STATES[key] ? JSON.parse(JSON.stringify(STATES[key])) : calcState();
    ['leftApex','leftBase','rightApex','rightMiddle','rightBase'].forEach(id=>applyRegion(id, st.regions[id]||'normal', (st.scales&&st.scales[id])||1, (st.lesions||[]).includes(id)));
    const leftMiddle=$('leftMiddle'); if(leftMiddle){ leftMiddle.style.display='none'; }
    showLesions(st.lesions||[]);
    const zoomKind = st.zoomKind || ((st.lesions&&st.lesions[0]&&st.regions[st.lesions[0]]) || 'normal');
    const z=$('zoomLobe'); if(z){ z.setAttribute('class','vq-zoom-lobe vq-region-'+zoomKind); z.style.fill=COLORS[zoomKind].fill; z.style.stroke=COLORS[zoomKind].stroke; z.style.transform='scale('+(st.zoomScale||1)+')'; }
    const glow=$('zoomPerfusionGlow'); if(glow){ glow.style.opacity=String(clamp(st.perfGlow ?? st.perf/100,.08,.95)); glow.style.transform='scale('+clamp((st.perf||50)/70,.62,1.22)+')'; }
    const title=$('zoomTitle'); if(title) title.textContent = st.zoomTitle || st.title;
    setBar('ventBar','ventText',st.vent,'Ventilation'); setBar('perfBar','perfText',st.perf,'Perfusion'); setBar('vqBar','vqText',st.vq,'V/Q ratio');
    const ex=$('vqModelExplanation'); if(ex) ex.textContent = st.explanation || '';
    renderMechanisms(st.mechanisms || []);
    if(STATES[key]){ syncButtons(key); setInputValues(key); }
    const r=$('v37Result'); if(r && key && STATES[key]) r.innerHTML='<div class="v37-interpret">目前顯示：'+(st.title||'Calculated V/Q model')+'<br><br>'+(st.explanation||'')+'<br><br>模型設定：Ventilation '+Math.round(st.vent)+'/100，Perfusion '+Math.round(st.perf)+'/100，V/Q '+Math.round(st.vq)+'/100。</div>';
    window.__vqStableCurrent = key || 'calculated';
  }
  window.renderVQCondition = renderModel;
  window.resetStableVQModel = function(){ renderModel('normal'); };
  function bind(){
    ensureLesionLabels();
    const ids=['normalBtn','peBtn','pneumoniaBtn','shuntBtn','deadSpaceBtn','v37NoBtn','v37MisBtn','v37PEBtn','v37PneuBtn','v37ShuntBtn','v37DeadBtn'];
    ids.forEach(id=>{ const btn=$(id); if(btn && !btn.dataset.v96Bound){ btn.dataset.v96Bound='1'; btn.addEventListener('click',()=>setTimeout(()=>renderModel(detectPreset()||'normal'),180),true); } });
    const calc=$('v37CalcBtn'); if(calc && !calc.dataset.v96Bound){ calc.dataset.v96Bound='1'; calc.addEventListener('click',()=>setTimeout(()=>renderModel(),180),true); }
    const reset=$('v37ResetBtn'); if(reset && !reset.dataset.v96Bound){ reset.dataset.v96Bound='1'; reset.addEventListener('click',()=>setTimeout(()=>renderModel('normal'),200),true); }
    ['v37VT','v37VD','v37f','v37QT','v37Shunt','v37LowVA','v37LowQ','v37HighVA','v37HighQ'].forEach(id=>{ const el=$(id); if(el && !el.dataset.v96Input){ el.dataset.v96Input='1'; el.addEventListener('change',()=>setTimeout(()=>renderModel(),80)); } });
    renderModel('normal');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  setTimeout(bind,500);
})();
