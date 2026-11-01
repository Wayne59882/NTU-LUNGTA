/* V69 LUNG MODEL CONSISTENCY PATCH
   Purpose: keep the original UI but restore deterministic V/Q disease states.
   This patch deliberately controls the model with one authoritative state table.
*/
(function(){
  'use strict';
  const $ = (id)=>document.getElementById(id);
  const REGIONS = ['leftApex','leftMiddle','leftBase','rightApex','rightMiddle','rightBase'];
  const DEFAULT_INPUTS = {VT:500,VD:150,f:15,FIO2:.21,Altitude:0,VO2:300,R:.8,Hb:15,QT:5.5,Shunt:0,DLO2:32,LowVA:50,LowQ:50,HighVA:50,HighQ:50};
  const STATE_INPUTS = {
    normal: {...DEFAULT_INPUTS},
    pe: {...DEFAULT_INPUTS, HighVA:85, HighQ:12, LowVA:50, LowQ:50},
    pneumonia: {...DEFAULT_INPUTS, LowVA:25, LowQ:80, Shunt:.12},
    shunt: {...DEFAULT_INPUTS, LowVA:6, LowQ:90, Shunt:.35},
    deadspace: {...DEFAULT_INPUTS, HighVA:90, HighQ:8, LowVA:50, LowQ:50}
  };
  const STATES = {
    normal:{
      title:'No mismatch：Normal V/Q Gradient',
      zoomTitle:'Normal gradient（無病灶放大）',
      vent:100, perf:100, vq:50, perfGlow:.55, zoomClass:'vq-region-normal', zoomScale:1,
      regions:{leftApex:'high',rightApex:'high',leftMiddle:'normal',rightMiddle:'normal',leftBase:'low',rightBase:'low'},
      lesions:[], scales:{},
      explanation:'目前為正常 V/Q gradient：肺尖偏 high V/Q、肺底偏 low V/Q，但沒有病灶、沒有局部放大、沒有殘留 pneumonia 或 pulmonary embolism 的標記。',
      mechanisms:['正常狀態仍有 apex-to-base V/Q gradient。','沒有通氣或灌流的病理性缺損。','所有病灶框線與放大效果已清除。']
    },
    pneumonia:{
      title:'Pneumonia：Right lower-zone low V/Q / shunt-like',
      zoomTitle:'放大病灶：右下肺 pneumonia consolidation',
      vent:28, perf:78, vq:22, perfGlow:.90, zoomClass:'vq-region-low', zoomScale:1.10,
      regions:{leftApex:'normal',leftMiddle:'normal',leftBase:'normal',rightApex:'normal',rightMiddle:'normal',rightBase:'low'},
      lesions:['rightBase'], scales:{rightBase:.88},
      explanation:'Pneumonia 的重點是局部肺泡被發炎滲出物或 consolidation 佔據，造成 ventilation 下降；perfusion 仍可存在，所以偏 low V/Q，嚴重時接近 shunt-like。這裡固定標示右下肺為單一主要病灶，不再連動中肺區，避免看起來像兩個病灶。',
      mechanisms:['核心：V 下降，Q 相對保留。','受影響區域偏 low V/Q / shunt-like。','病灶放大區對應右下肺 consolidation，不會跑到 high V/Q 的位置。']
    },
    shunt:{
      title:'Shunt-like：bilateral lower-zone very low V/Q',
      zoomTitle:'放大病灶：下肺 shunt-like 區域',
      vent:8, perf:90, vq:6, perfGlow:.95, zoomClass:'vq-region-low', zoomScale:1.12,
      regions:{leftApex:'normal',leftMiddle:'normal',leftBase:'low',rightApex:'normal',rightMiddle:'normal',rightBase:'low'},
      lesions:['leftBase','rightBase'], scales:{leftBase:.84,rightBase:.84},
      explanation:'Shunt-like 的核心是有血流但沒有有效通氣，也就是「有血、沒氣」。因此模型固定放在下肺雙側區域，呈現 ventilation 很低、perfusion 保留，而不是隨機變成有氣沒血的位置。',
      mechanisms:['核心：V 幾乎消失，Q 仍存在。','V/Q ratio 非常低，PaO2 下降明顯。','對吸氧反應可能有限，因為未通氣血流無法直接被氧合。']
    },
    pe:{
      title:'Pulmonary Embolism：right upper-zone high V/Q / dead-space-like',
      zoomTitle:'放大病灶：右上肺 pulmonary embolism',
      vent:82, perf:18, vq:96, perfGlow:.18, zoomClass:'vq-region-high', zoomScale:1.10,
      regions:{leftApex:'normal',leftMiddle:'normal',leftBase:'normal',rightApex:'high',rightMiddle:'normal',rightBase:'normal'},
      lesions:['rightApex'], scales:{rightApex:1.05},
      explanation:'Pulmonary embolism 的重點是局部灌流被血栓阻斷，ventilation 相對保留，所以是「有氣、血不夠”. 偏 high V/Q 或 dead-space-like。這裡固定標示右上肺為單一主要 PE 病灶，不再連動中肺區，避免看起來像兩個病灶。',
      mechanisms:['核心：Q 下降，V 相對保留。','V/Q ratio 上升，接近 dead space-like。','PE 不是 shunt；shunt 是有血沒氣，PE 是有氣沒血。']
    },
    deadspace:{
      title:'Dead Space-like：upper-zone high V/Q',
      zoomTitle:'放大病灶：上肺 dead-space-like 區域',
      vent:88, perf:10, vq:98, perfGlow:.12, zoomClass:'vq-region-high', zoomScale:1.10,
      regions:{leftApex:'high',leftMiddle:'normal',leftBase:'normal',rightApex:'high',rightMiddle:'normal',rightBase:'normal'},
      lesions:['leftApex','rightApex'], scales:{leftApex:1.04,rightApex:1.04},
      explanation:'Dead space-like 的重點是有通氣但缺乏有效血流，也就是「有氣、血不夠」。因此固定標示上肺區域為 high V/Q，不再跟 pneumonia 或 shunt-like 的低通氣下肺病灶混在一起。',
      mechanisms:['核心：V 保留，Q 明顯下降。','V/Q ratio 很高。','空氣進入肺泡，但缺乏血流參與交換。']
    }
  };
  function clamp(x,min,max){ return Math.max(min, Math.min(max, x)); }
  function kindClass(kind){
    if(kind === 'high') return 'vq-lung-region vq-region-high';
    if(kind === 'low') return 'vq-lung-region vq-region-low';
    return 'vq-lung-region vq-region-normal';
  }
  function setInputValues(key){
    const vals = STATE_INPUTS[key] || STATE_INPUTS.normal;
    Object.keys(vals).forEach(k=>{ const el=$('v37'+k); if(el) el.value = vals[k]; });
  }
  function hardResetSvg(){
    REGIONS.forEach(id=>{
      const el=$(id); if(!el) return;
      el.setAttribute('class','vq-lung-region vq-region-normal');
      el.style.transform = 'scale(1)';
      el.style.transformBox = 'fill-box';
      el.style.transformOrigin = 'center center';
      el.style.opacity = '1';
      el.style.filter = '';
      el.removeAttribute('data-lesion');
    });
    const z=$('zoomLobe');
    if(z){
      z.setAttribute('class','vq-zoom-lobe vq-region-normal');
      z.style.transform='scale(1)';
      z.style.transformBox='fill-box';
      z.style.transformOrigin='center center';
    }
    const glow=$('zoomPerfusionGlow');
    if(glow){
      glow.style.opacity='.55';
      glow.style.transform='scale(1)';
      glow.style.transformBox='fill-box';
      glow.style.transformOrigin='center center';
    }
  }
  function applyStateToSvg(state){
    hardResetSvg();
    REGIONS.forEach(id=>{
      const el=$(id); if(!el) return;
      const kind = state.regions[id] || 'normal';
      const lesion = (state.lesions || []).includes(id);
      el.setAttribute('class', kindClass(kind) + (lesion ? ' vq-region-lesion' : ''));
      el.style.transform = 'scale(' + (state.scales && state.scales[id] ? state.scales[id] : 1) + ')';
      if(lesion) el.setAttribute('data-lesion','true');
    });
    const z=$('zoomLobe');
    if(z){
      z.setAttribute('class','vq-zoom-lobe ' + (state.zoomClass || 'vq-region-normal'));
      z.style.transform='scale(' + (state.zoomScale || 1) + ')';
    }
    const glow=$('zoomPerfusionGlow');
    if(glow){
      glow.style.opacity = String(clamp(state.perfGlow ?? state.perf/100, .08, .95));
      glow.style.transform = 'scale(' + clamp((state.perf || 50)/70, .62, 1.22) + ')';
    }
  }
  function setBar(id, textId, val, label){
    const b=$(id), t=$(textId);
    if(b) b.style.width = clamp(val,4,100) + '%';
    if(t) t.textContent = label + ' ' + Math.round(val) + '/100';
  }
  function renderMechanisms(list){
    const grid=$('vqMechanismGrid'); if(!grid) return;
    grid.innerHTML = (list||[]).map((x,i)=>'<div class="mechanism-card"><b>'+(i+1)+'.</b> '+x+'</div>').join('');
  }
  function syncButtons(key){
    const all=['normalBtn','peBtn','pneumoniaBtn','shuntBtn','deadSpaceBtn','v37NoBtn','v37MisBtn','v37PEBtn','v37PneuBtn','v37ShuntBtn','v37DeadBtn'];
    all.forEach(id=>$(id)?.classList.remove('active'));
    const map={normal:['normalBtn','v37NoBtn'], pe:['peBtn','v37PEBtn'], pneumonia:['pneumoniaBtn','v37PneuBtn'], shunt:['shuntBtn','v37ShuntBtn'], deadspace:['deadSpaceBtn','v37DeadBtn']};
    (map[key]||[]).forEach(id=>$(id)?.classList.add('active'));
  }
  function renderStableModel(key, opts={}){
    if(key === 'dead') key='deadspace';
    if(key === 'pneu') key='pneumonia';
    key = key || 'normal';
    const state = STATES[key] || STATES.normal;
    if(opts.updateInputs !== false) setInputValues(key);
    applyStateToSvg(state);
    const title=$('zoomTitle'); if(title) title.textContent = state.zoomTitle || state.title;
    setBar('ventBar','ventText',state.vent,'Ventilation');
    setBar('perfBar','perfText',state.perf,'Perfusion');
    setBar('vqBar','vqText',state.vq,'V/Q ratio');
    const ex=$('vqModelExplanation'); if(ex) ex.textContent = state.explanation;
    renderMechanisms(state.mechanisms);
    syncButtons(key);
    const r=$('v37Result');
    if(r){
      r.innerHTML = '<div class="v37-interpret">目前顯示：'+state.title+'\n\n'+state.explanation+'\n\n模型設定：Ventilation '+Math.round(state.vent)+'/100，Perfusion '+Math.round(state.perf)+'/100，V/Q '+Math.round(state.vq)+'/100。</div>';
    }
    window.__vqStableCurrent = key;
  }
  window.renderVQCondition = function(key){ renderStableModel(key); };
  window.resetStableVQModel = function(){ renderStableModel('normal'); };
  function bind(){
    const pairs=[['normalBtn','normal'],['peBtn','pe'],['pneumoniaBtn','pneumonia'],['shuntBtn','shunt'],['deadSpaceBtn','deadspace'],['v37NoBtn','normal'],['v37PEBtn','pe'],['v37PneuBtn','pneumonia'],['v37ShuntBtn','shunt'],['v37DeadBtn','deadspace']];
    pairs.forEach(([id,key])=>{
      const btn=$(id); if(!btn || btn.dataset.v69StableBound) return;
      btn.dataset.v69StableBound='1';
      btn.addEventListener('click', function(ev){
        ev.preventDefault();
        try{ ev.stopPropagation(); }catch(e){}
        try{ if(window.stopAllSpeech) window.stopAllSpeech(); }catch(e){}
        setTimeout(()=>renderStableModel(key),0);
        setTimeout(()=>renderStableModel(key),80);
      }, true);
    });
    const resetBtn=$('v37ResetBtn');
    if(resetBtn && !resetBtn.dataset.v69StableBound){
      resetBtn.dataset.v69StableBound='1';
      resetBtn.addEventListener('click', function(ev){ setTimeout(()=>renderStableModel('normal'),0); }, true);
    }
  }
  function init(){ bind(); setTimeout(bind,200); setTimeout(bind,700); setTimeout(()=>renderStableModel('normal'),900); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
