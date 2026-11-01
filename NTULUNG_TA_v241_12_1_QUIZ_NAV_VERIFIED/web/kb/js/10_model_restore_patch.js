/* v68 RESTORE: V/Q disease model controls restored without changing UI/course content.
   This patch only re-implements the disease model renderer that earlier patches accidentally removed. */
(function(){
  const $ = id => document.getElementById(id);
  const qa = sel => Array.from(document.querySelectorAll(sel));
  function clamp(n,a,b){ return Math.max(a, Math.min(b, n)); }

  const REGIONS = ['leftApex','leftMiddle','leftBase','rightApex','rightMiddle','rightBase'];
  const diseaseData = {
    normal: {
      title:'Normal V/Q Gradient', vent:72, perf:78, vq:55,
      zoomClass:'vq-region-normal', zoomScale:1,
      explanation:'正常直立肺並不是每一區 V/Q 都完全相同。Apex 因 perfusion 下降較明顯而 V/Q 較高；Base 因 perfusion 增加較多而 V/Q 較低。',
      regions:{leftApex:'high',rightApex:'high',leftMiddle:'normal',rightMiddle:'normal',leftBase:'low',rightBase:'low'},
      lesion:[],
      mechanisms:['Apex：V 與 Q 都低，但 Q 降得更明顯，所以 V/Q 較高。','Base：V 與 Q 都高，但 Q 增加更多，所以 V/Q 較低。','正常 gradient 是生理現象，不等於疾病。']
    },
    pe: {
      title:'Pulmonary Embolism：High V/Q / Dead-space-like', vent:82, perf:18, vq:96,
      zoomClass:'vq-region-high', zoomScale:1.08,
      explanation:'PE 的核心是 perfusion 被血栓阻斷：有通氣但血流不足，所以形成 high V/Q，嚴重時接近 dead space-like physiology。',
      regions:{leftApex:'normal',rightApex:'high',leftMiddle:'normal',rightMiddle:'high',leftBase:'normal',rightBase:'normal'},
      lesion:['rightApex'],
      mechanisms:['Q 下降是主因，V 相對保留。','V/Q ratio 上升，偏 dead-space-like。','不是 shunt；shunt 是有血沒氣，PE 是有氣沒血。']
    },
    pneumonia: {
      title:'Pneumonia：Low V/Q / Shunt-like', vent:28, perf:78, vq:22,
      zoomClass:'vq-region-low', zoomScale:.82,
      explanation:'Pneumonia 造成肺泡發炎、滲出物或 consolidation，使局部 ventilation 下降，但 perfusion 仍可存在，因此偏 low V/Q 或 shunt-like。',
      regions:{leftApex:'normal',rightApex:'normal',leftMiddle:'low',rightMiddle:'normal',leftBase:'low',rightBase:'normal'},
      lesion:['rightBase'],
      mechanisms:['V 下降是主因，Q 仍存在。','V/Q ratio 下降，氧合變差。','嚴重時接近 true shunt，給氧改善可能有限。']
    },
    shunt: {
      title:'Shunt-like / True Shunt：Very Low V/Q', vent:8, perf:90, vq:6,
      zoomClass:'vq-region-low', zoomScale:.72,
      explanation:'Shunt 的核心是有血流但沒有有效通氣。血液通過未通氣區域後無法被氧合，所以 PaO2 下降明顯，且對提高 FiO2 反應較差。',
      regions:{leftApex:'normal',rightApex:'normal',leftMiddle:'low',rightMiddle:'low',leftBase:'low',rightBase:'low'},
      lesion:['leftBase','rightBase','leftMiddle','rightMiddle'],
      mechanisms:['有血，沒氣。','PaO2 下降明顯。','提高 FiO2 對完全未通氣區域幫助有限。']
    },
    deadspace: {
      title:'Dead Space-like：High V/Q', vent:88, perf:10, vq:98,
      zoomClass:'vq-region-high', zoomScale:1.10,
      explanation:'Dead space-like 的核心是有通氣但缺乏有效血流。空氣進入肺泡，但沒有足夠 perfusion 參與交換，所以 V/Q 偏高。',
      regions:{leftApex:'high',rightApex:'high',leftMiddle:'high',rightMiddle:'normal',leftBase:'normal',rightBase:'normal'},
      lesion:['leftApex','rightApex','leftMiddle'],
      mechanisms:['有氣，血不夠。','V/Q ratio 上升。','PE 是典型臨床例子之一。']
    }
  };

  function clsFor(kind){
    if(kind === 'high') return 'vq-lung-region vq-region-high';
    if(kind === 'low') return 'vq-lung-region vq-region-low';
    return 'vq-lung-region vq-region-normal';
  }
  function applyRegion(id, kind, lesion, scale){
    const el = $(id); if(!el) return;
    el.setAttribute('class', clsFor(kind) + (lesion ? ' vq-region-lesion' : ''));
    el.style.transformBox = 'fill-box';
    el.style.transformOrigin = 'center center';
    el.style.transform = 'scale(' + (scale || 1) + ')';
  }
  function setBar(id, textId, val, label){
    const b=$(id), t=$(textId); if(b) b.style.width = clamp(val,4,100) + '%'; if(t) t.textContent = label + ' ' + Math.round(val) + '/100';
  }
  function renderMechanisms(list){
    const grid = $('vqMechanismGrid'); if(!grid) return;
    grid.innerHTML = (list||[]).map((x,i)=>'<div class="mechanism-card"><b>'+(i+1)+'.</b> '+x+'</div>').join('');
  }
  function syncButtons(key){
    const map = {normal:'normalBtn',pe:'peBtn',pneumonia:'pneumoniaBtn',shunt:'shuntBtn',deadspace:'deadSpaceBtn'};
    Object.values(map).forEach(id=>$(id)?.classList.remove('active'));
    if(map[key]) $(map[key])?.classList.add('active');
    // v37 buttons
    ['v37NoBtn','v37MisBtn','v37PEBtn','v37PneuBtn','v37ShuntBtn','v37DeadBtn'].forEach(id=>$(id)?.classList.remove('active'));
    const map2 = {normal:'v37NoBtn',pe:'v37PEBtn',pneumonia:'v37PneuBtn',shunt:'v37ShuntBtn',deadspace:'v37DeadBtn'};
    if(map2[key]) $(map2[key])?.classList.add('active');
  }
  function renderVQCondition(key){
    key = key || 'normal';
    if(key === 'dead') key = 'deadspace';
    const d = diseaseData[key] || diseaseData.normal;
    REGIONS.forEach(id => applyRegion(id, d.regions[id] || 'normal', (d.lesion||[]).includes(id), (d.lesion||[]).includes(id) ? d.zoomScale : 1));
    const z = $('zoomLobe'); if(z){ z.setAttribute('class','vq-zoom-lobe '+(d.zoomClass||'vq-region-normal')); z.style.transform='scale('+ (d.zoomScale || 1) +')'; }
    const glow = $('zoomPerfusionGlow'); if(glow){ glow.style.opacity = String(clamp(d.perf/70, .10, .95)); glow.style.transform = 'scale(' + clamp(d.perf/70, .65, 1.25) + ')'; }
    const title = $('zoomTitle'); if(title) title.textContent = d.title;
    setBar('ventBar','ventText',d.vent,'Ventilation');
    setBar('perfBar','perfText',d.perf,'Perfusion');
    setBar('vqBar','vqText',d.vq,'V/Q ratio');
    const ex = $('vqModelExplanation'); if(ex) ex.textContent = d.explanation;
    renderMechanisms(d.mechanisms);
    syncButtons(key);
    const r = $('v37Result'); if(r){ r.innerHTML = '<div class="v37-interpret">目前顯示疾病模型：'+d.title+'\n\n'+d.explanation+'\n\n此模型是視覺化病灶模式；如果要看數值變化，請再按 Calculate。</div>'; }
  }

  // Expose for old v37 showDisease() calls.
  window.renderVQCondition = renderVQCondition;

  function bindDiseaseButtons(){
    const pairs = [['normalBtn','normal'],['peBtn','pe'],['pneumoniaBtn','pneumonia'],['shuntBtn','shunt'],['deadSpaceBtn','deadspace'],['v37PEBtn','pe'],['v37PneuBtn','pneumonia'],['v37ShuntBtn','shunt'],['v37DeadBtn','deadspace'],['v37NoBtn','normal']];
    pairs.forEach(([id,key])=>{
      const btn=$(id); if(btn && !btn.dataset.v68ModelBound){
        btn.dataset.v68ModelBound='1';
        btn.addEventListener('click', function(ev){ ev.preventDefault(); try{ if(window.stopAllSpeech) window.stopAllSpeech(); }catch(e){} renderVQCondition(key); }, true);
      }
    });
  }
  function init(){ bindDiseaseButtons(); setTimeout(bindDiseaseButtons,300); setTimeout(()=>{ if($('zoomTitle')) renderVQCondition('normal'); }, 500); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
