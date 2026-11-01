(function(){
  'use strict';
  const $ = (id)=>document.getElementById(id);
  const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));
  const pct=(x)=>Math.round(clamp(Number(x)||0,0,100));

  // ---------- 1) Percentage-based relevance scoring ----------
  // This replaces the previous pure additive score. Each factor contributes a capped percentage-point value.
  const PERCENT_SCORE_RULES = Object.freeze({
    detectedCourseFit: 22,      // detected course equals item course
    selectedCourseTie: 3,       // current UI lesson is only a small tie-breaker
    intentFit: 18,              // definition/mechanism/equation/clinical/model intent match
    aliasFitMax: 18,            // aliases such as V/Q, PaCO2, pneumonia, PE
    questionPatternFitMax: 8,   // stored question patterns
    conceptExactFit: 14,        // exact concept text appears in the query
    domainTermFitMax: 12,       // respiratory-domain terms in both query and item fields
    queryStyleFit: 5,           // course/equation/basic/general expression bonus
    variantQualityFit: 3        // direct/plain/mechanism_chain/teacher_script/student_hint
  });
  const PERCENT_RETRIEVAL_THRESHOLD = 42;

  function v75Norm(s){
    const raw = String(s||'');
    const fixed = (typeof window.fixTranscript === 'function') ? window.fixTranscript(raw) : raw;
    return fixed.toLowerCase()
      .replace(/[，。！？、；：]/g,' ')
      .replace(/[\[\]{}<>]/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }
  function v75Meta(course){
    try{ return (typeof window.meta === 'function') ? window.meta(course) : {title:course||'',courseGoal:''}; }
    catch(e){ return {title:course||'',courseGoal:''}; }
  }
  function v75CourseOrder(){
    return Array.isArray(window.COURSE_ORDER) ? window.COURSE_ORDER : ['basic','ventilation','alveolar_gas','perfusion','normal_vq','low_vq','high_vq','shunt','diffusion','oxygen_content','integrated_disease'];
  }
  function v75SelectedCourse(){
    try{ return (typeof window.selectedCourse === 'function') ? window.selectedCourse() : 'basic'; }
    catch(e){ return 'basic'; }
  }
  function v75Fields(it){
    return [it.courseTitle,it.courseGoal,it.concept,it.intent,it.variant,it.content,it.definition,it.equation,it.mechanism,it.example,it.model,it.clinical,it.misconception,...(it.aliases||[]),...(it.questionPatterns||[])].filter(Boolean).join(' ');
  }
  function v75AliasHits(q, aliases){
    const t=v75Norm(q); let count=0;
    (aliases||[]).forEach(a=>{ const na=v75Norm(a); if(na && (t.includes(na)||na.includes(t))) count++; });
    return count;
  }
  const V75_DOMAIN_TERMS = ['gas exchange','氣體交換','abg','blood gas','血氣','alveolar gas equation','alveolar','oxygenation','ventilation','通氣','alveolar ventilation','perfusion','灌流','v/q','vq','v q','v/q ratio','low v/q','high v/q','shunt','分流','dead space','死腔','diffusion','擴散','a-a','gradient','pao2','paco2','fio2','sao2','svo2','cao2','o2','co2','hemoglobin','hb','貧血','cardiac output','mixed venous','oxygen content','oxygen delivery','pe','pulmonary embolism','肺栓塞','pneumonia','肺炎','asthma','氣喘','copd','apex','base','肺泡','肺微血管','oxygen','carbon dioxide','呼吸','肺','酸鹼'];
  function v75DomainTermPoints(q, it){
    const t=v75Norm(q), f=v75Norm(v75Fields(it)); let hits=0;
    V75_DOMAIN_TERMS.forEach(term=>{ const nt=v75Norm(term); if(nt && t.includes(nt) && f.includes(nt)) hits++; });
    return Math.min(PERCENT_SCORE_RULES.domainTermFitMax, hits*2);
  }
  function v75CoursePercent(q, course){
    const t=v75Norm(q), selected=v75SelectedCourse(); let score=0;
    if(course===selected) score += 5;
    const title=(v75Meta(course).title||'').replace(/^課程\s*\d+\s*[：:]/,'');
    v75Norm(title).split(' ').filter(x=>x.length>=3).forEach(tok=>{ if(t.includes(tok)) score += 7; });
    const rules = [
      ['basic',/gas exchange|氣體交換|abg|blood gas|整體|架構|overview|基本/i,45],
      ['alveolar_gas',/alveolar gas equation|oxygenation|pao2|fio2|paco2|PAO2|肺泡氣|氧合|方程/i,45],
      ['ventilation',/ventilation|alveolar ventilation|respiratory rate|tidal volume|dead space|paco2|通氣|肺泡通氣|潮氣|呼吸頻率|死腔/i,42],
      ['perfusion',/perfusion|cardiac output|mixed venous|svo2|灌流|心輸出|混合靜脈/i,42],
      ['normal_vq',/apex|base|gradient|正常.*v\/?q|肺尖|肺底|normal v/i,42],
      ['low_vq',/low\s*v\/?q|low\s*vq|shunt-like|低.*v\/?q|pneumonia|asthma|copd|肺炎|氣喘/i,42],
      ['high_vq',/high\s*v\/?q|high\s*vq|dead space|pulmonary embolism|肺栓塞|\bpe\b|高.*v\/?q/i,42],
      ['shunt',/true shunt|shunt equation|qs\/?qt|分流|shunt/i,42],
      ['diffusion',/diffusion|a-a|擴散|DLO2|A-a gradient/i,42],
      ['oxygen_content',/hemoglobin|hb|cao2|oxygen content|oxygen delivery|貧血|anemia|血紅素|氧含量/i,42],
      ['integrated_disease',/\bpe\b|pneumonia|asthma|copd|肺栓塞|肺炎|氣喘|疾病|整合/i,38]
    ];
    rules.forEach(([key,re,pts])=>{ if(key===course && re.test(q)) score += pts; });
    const kb = window.EMBEDDED_FULL_KB && window.EMBEDDED_FULL_KB[course] ? window.EMBEDDED_FULL_KB[course] : [];
    const seen=new Set(), step=Math.max(1,Math.floor(kb.length/260));
    for(let i=0;i<kb.length;i+=step){
      const it=kb[i]||{};
      [it.concept,...(it.aliases||[])].filter(Boolean).forEach(v=>{
        const nv=v75Norm(v); if(!nv || seen.has(nv)) return; seen.add(nv);
        if(t.includes(nv)) score += nv.length>5 ? 6 : 3;
      });
    }
    return pct(score);
  }
  window.detectCourse = function v75DetectCourse(q){
    const selected=v75SelectedCourse(); let best={course:selected,percent:5};
    v75CourseOrder().forEach(course=>{
      const percent=v75CoursePercent(q,course);
      if(percent > best.percent) best={course,percent};
    });
    window.__lastCoursePercentDebug = best;
    return best.course;
  };
  try{ detectCourse = window.detectCourse; }catch(e){}

  window.scoreItem = function v75ScoreItemPercent(it,q,intents,detectedCourse){
    const I = Array.isArray(intents) ? intents : ['general'];
    let score=0;
    if(it.course === detectedCourse) score += PERCENT_SCORE_RULES.detectedCourseFit;
    if(it.course === v75SelectedCourse()) score += PERCENT_SCORE_RULES.selectedCourseTie;
    if(I.includes(it.intent)) score += PERCENT_SCORE_RULES.intentFit;
    if(I.includes('compare') && /compare|comparison|vs|difference/i.test((it.intent||'')+' '+(it.concept||'')+' '+(it.content||''))) score += 6;
    score += Math.min(PERCENT_SCORE_RULES.aliasFitMax, v75AliasHits(q,it.aliases)*6);
    score += Math.min(PERCENT_SCORE_RULES.questionPatternFitMax, v75AliasHits(q,it.questionPatterns)*3);
    if(it.concept && v75Norm(q).includes(v75Norm(it.concept))) score += PERCENT_SCORE_RULES.conceptExactFit;
    score += v75DomainTermPoints(q,it);
    if(/course|課程|基本|架構|oxygenation|equation|gas exchange/i.test(q) && ['definition','mechanism','equation'].includes(it.intent)) score += PERCENT_SCORE_RULES.queryStyleFit;
    if(['direct','plain','mechanism_chain','teacher_script','student_hint'].includes(it.variant)) score += PERCENT_SCORE_RULES.variantQualityFit;
    return pct(score);
  };
  try{ scoreItem = window.scoreItem; }catch(e){}

  window.retrieve = function v75Retrieve(q,course,intents){
    const all=[];
    v75CourseOrder().forEach(c=>{
      const arr=(window.EMBEDDED_FULL_KB && window.EMBEDDED_FULL_KB[c]) ? window.EMBEDDED_FULL_KB[c] : [];
      for(const it of arr){
        const percent=window.scoreItem(it,q,intents,course);
        all.push({it, score:percent});
      }
    });
    const scored=all.sort((a,b)=>b.score-a.score);
    const domainOK = (typeof window.questionHasDomain === 'function') ? window.questionHasDomain(q) : true;
    const filtered = domainOK ? scored.filter(x=>x.score>=PERCENT_RETRIEVAL_THRESHOLD) : [];
    const seen=new Set(), top=[];
    for(const x of filtered){
      const key=[x.it.course,x.it.concept,x.it.intent].join('|');
      if(seen.has(key) && top.length>=3) continue;
      seen.add(key); top.push(x.it);
      if(top.length>=6) break;
    }
    window.__lastRetrievalPercentDebug = scored.slice(0,10).map(x=>({percent:x.score,course:x.it.course,concept:x.it.concept,intent:x.it.intent,variant:x.it.variant}));
    return top;
  };
  try{ retrieve = window.retrieve; }catch(e){}
  window.__VQ_PERCENT_WEIGHTING = {enabled:true,threshold:PERCENT_RETRIEVAL_THRESHOLD,rules:PERCENT_SCORE_RULES};

  // ---------- 2) Left lung two-lobe anatomical rendering ----------
  const V75_LEFT_UPPER_D = 'M196 172 C226 128, 267 112, 322 104 L322 342 C286 344, 251 350, 222 365 C200 334, 190 291, 195 246 C187 216, 188 190, 196 172 Z';
  const V75_LEFT_LOWER_D = 'M222 365 C251 350, 286 344, 322 342 L322 576 C277 570, 242 550, 214 513 C191 481, 179 441, 222 365 Z';
  function twoLobeLeftLung(){
    const upper=$('leftApex'), middle=$('leftMiddle'), lower=$('leftBase');
    if(upper){ upper.setAttribute('d',V75_LEFT_UPPER_D); upper.setAttribute('data-lobe','left-upper'); }
    if(middle){ middle.style.display='none'; middle.style.opacity='0'; middle.setAttribute('aria-hidden','true'); middle.setAttribute('data-lobe','hidden-old-middle'); }
    if(lower){ lower.setAttribute('d',V75_LEFT_LOWER_D); lower.setAttribute('data-lobe','left-lower'); }
  }
  function kindClass(kind){
    if(kind==='high') return 'vq-lung-region vq-region-high';
    if(kind==='low') return 'vq-lung-region vq-region-low';
    return 'vq-lung-region vq-region-normal';
  }
  const V75_STATES = {
    normal:{title:'No mismatch：Normal V/Q Gradient', zoomTitle:'Normal gradient（無病灶放大）', vent:100, perf:100, vq:50, perfGlow:.55, zoomClass:'vq-region-normal', zoomScale:1,
      regions:{leftApex:'high',leftBase:'low',rightApex:'high',rightMiddle:'normal',rightBase:'low'}, lesions:[], scales:{},
      explanation:'目前為正常 V/Q gradient：左肺以兩葉呈現，右肺以三葉呈現；肺尖偏 high V/Q、肺底偏 low V/Q，但沒有病灶。',
      mechanisms:['左肺只有 upper / lower 兩葉顯示，沒有左中葉。','正常狀態仍呈現 apex-to-base V/Q gradient。','所有病灶框線與放大效果已清除。']},
    pneumonia:{title:'Pneumonia：Right lower-lobe low V/Q / shunt-like', zoomTitle:'放大病灶：右下肺 pneumonia consolidation', vent:28, perf:78, vq:22, perfGlow:.90, zoomClass:'vq-region-low', zoomScale:1.10,
      regions:{leftApex:'normal',leftBase:'normal',rightApex:'normal',rightMiddle:'normal',rightBase:'low'}, lesions:['rightBase'], scales:{rightBase:.88},
      explanation:'Pneumonia 固定標示在右下肺單一病灶。生理意義是 ventilation 下降但 perfusion 仍存在，所以偏 low V/Q 或 shunt-like。',
      mechanisms:['核心：V 下降，Q 相對保留。','只亮 rightBase，不連動 rightMiddle。','病灶放大區對應右下肺 consolidation。']},
    pe:{title:'Pulmonary Embolism：Right upper-lobe high V/Q / dead-space-like', zoomTitle:'放大病灶：右上肺 pulmonary embolism', vent:82, perf:18, vq:96, perfGlow:.18, zoomClass:'vq-region-high', zoomScale:1.10,
      regions:{leftApex:'normal',leftBase:'normal',rightApex:'high',rightMiddle:'normal',rightBase:'normal'}, lesions:['rightApex'], scales:{rightApex:1.05},
      explanation:'Pulmonary embolism 固定標示在右上肺單一病灶。生理意義是 perfusion 被血栓阻斷，ventilation 相對保留，所以偏 high V/Q 或 dead-space-like。',
      mechanisms:['核心：Q 下降，V 相對保留。','只亮 rightApex，不連動 rightMiddle。','PE 是有氣、血不夠，不是 shunt。']},
    shunt:{title:'Shunt-like：lower-zone very low V/Q', zoomTitle:'放大病灶：下肺 shunt-like 區域', vent:8, perf:90, vq:6, perfGlow:.95, zoomClass:'vq-region-low', zoomScale:1.12,
      regions:{leftApex:'normal',leftBase:'low',rightApex:'normal',rightMiddle:'normal',rightBase:'low'}, lesions:['leftBase','rightBase'], scales:{leftBase:.84,rightBase:.84},
      explanation:'Shunt-like 表示有血流但沒有有效通氣。模型固定放在下肺區域，左肺使用下葉，右肺使用下葉。',
      mechanisms:['核心：V 幾乎消失，Q 仍存在。','V/Q ratio 非常低。','吸氧反應可能有限。']},
    deadspace:{title:'Dead Space-like：upper-zone high V/Q', zoomTitle:'放大病灶：上肺 dead-space-like 區域', vent:88, perf:10, vq:98, perfGlow:.12, zoomClass:'vq-region-high', zoomScale:1.10,
      regions:{leftApex:'high',leftBase:'normal',rightApex:'high',rightMiddle:'normal',rightBase:'normal'}, lesions:['leftApex','rightApex'], scales:{leftApex:1.04,rightApex:1.04},
      explanation:'Dead space-like 表示有通氣但缺乏有效血流。模型固定在上肺區域，左肺使用上葉，右肺使用上葉。',
      mechanisms:['核心：V 保留，Q 明顯下降。','V/Q ratio 很高。','空氣進入肺泡，但缺乏血流參與交換。']}
  };
  function resetAllRegions(){
    ['leftApex','leftMiddle','leftBase','rightApex','rightMiddle','rightBase'].forEach(id=>{
      const el=$(id); if(!el) return;
      el.setAttribute('class','vq-lung-region vq-region-normal');
      el.style.transform='scale(1)'; el.removeAttribute('data-lesion');
    });
    twoLobeLeftLung();
  }
  function setBar(id,textId,val,label){
    const b=$(id),t=$(textId); if(b) b.style.width=clamp(val,4,100)+'%'; if(t) t.textContent=label+' '+Math.round(val)+'/100';
  }
  function renderMechanisms(list){
    const grid=$('vqMechanismGrid'); if(!grid) return;
    grid.innerHTML=(list||[]).map((x,i)=>'<div class="mechanism-card"><b>'+(i+1)+'.</b> '+x+'</div>').join('');
  }
  function syncButtons(key){
    ['normalBtn','peBtn','pneumoniaBtn','shuntBtn','deadSpaceBtn','v37NoBtn','v37MisBtn','v37PEBtn','v37PneuBtn','v37ShuntBtn','v37DeadBtn'].forEach(id=>$(id)?.classList.remove('active'));
    const map={normal:['normalBtn','v37NoBtn'],pe:['peBtn','v37PEBtn'],pneumonia:['pneumoniaBtn','v37PneuBtn'],shunt:['shuntBtn','v37ShuntBtn'],deadspace:['deadSpaceBtn','v37DeadBtn']};
    (map[key]||[]).forEach(id=>$(id)?.classList.add('active'));
  }
  function setInputValues(key){
    const values={
      normal:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.03,DLO2:32,LowVA:50,LowQ:50,HighVA:50,HighQ:50},
      pneumonia:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.12,DLO2:32,LowVA:25,LowQ:80,HighVA:50,HighQ:50},
      pe:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.03,DLO2:32,LowVA:50,LowQ:50,HighVA:85,HighQ:15},
      shunt:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.35,DLO2:32,LowVA:6,LowQ:90,HighVA:50,HighQ:50},
      deadspace:{VT:500,VD:150,f:15,FIO2:0.21,Altitude:0,VO2:250,R:0.8,Hb:15,QT:5.5,Shunt:0.03,DLO2:32,LowVA:50,LowQ:50,HighVA:90,HighQ:8}
    }[key] || {};
    Object.keys(values).forEach(k=>{ const el=$('v37'+k); if(el) el.value=values[k]; });
  }
  function renderV75Model(key){
    key = key==='dead' ? 'deadspace' : (key==='pneu' ? 'pneumonia' : (key||'normal'));
    const st=V75_STATES[key] || V75_STATES.normal;
    resetAllRegions();
    Object.keys(st.regions||{}).forEach(id=>{
      const el=$(id); if(!el || id==='leftMiddle') return;
      const lesion=(st.lesions||[]).includes(id);
      el.setAttribute('class',kindClass(st.regions[id]) + (lesion ? ' vq-region-lesion' : ''));
      el.style.transform='scale(' + ((st.scales&&st.scales[id]) ? st.scales[id] : 1) + ')';
      if(lesion) el.setAttribute('data-lesion','true');
    });
    const z=$('zoomLobe'); if(z){ z.setAttribute('class','vq-zoom-lobe '+(st.zoomClass||'vq-region-normal')); z.style.transform='scale('+(st.zoomScale||1)+')'; }
    const glow=$('zoomPerfusionGlow'); if(glow){ glow.style.opacity=String(clamp(st.perfGlow ?? st.perf/100,.08,.95)); glow.style.transform='scale('+clamp((st.perf||50)/70,.62,1.22)+')'; }
    const title=$('zoomTitle'); if(title) title.textContent=st.zoomTitle || st.title;
    setBar('ventBar','ventText',st.vent,'Ventilation'); setBar('perfBar','perfText',st.perf,'Perfusion'); setBar('vqBar','vqText',st.vq,'V/Q ratio');
    const ex=$('vqModelExplanation'); if(ex) ex.textContent=st.explanation;
    renderMechanisms(st.mechanisms); syncButtons(key); setInputValues(key);
    const r=$('v37Result'); if(r) r.innerHTML='<div class="v37-interpret">目前顯示：'+st.title+'\n\n'+st.explanation+'\n\n模型設定：Ventilation '+Math.round(st.vent)+'/100，Perfusion '+Math.round(st.perf)+'/100，V/Q '+Math.round(st.vq)+'/100。</div>';
    window.__vqStableCurrent=key;
  }
  window.renderVQCondition = renderV75Model;
  window.resetStableVQModel = function(){ renderV75Model('normal'); };
  function bindV75(){
    const pairs=[['normalBtn','normal'],['peBtn','pe'],['pneumoniaBtn','pneumonia'],['shuntBtn','shunt'],['deadSpaceBtn','deadspace'],['v37NoBtn','normal'],['v37PEBtn','pe'],['v37PneuBtn','pneumonia'],['v37ShuntBtn','shunt'],['v37DeadBtn','deadspace']];
    pairs.forEach(([id,key])=>{
      const btn=$(id); if(!btn || btn.dataset.v75TwoLobeBound) return;
      btn.dataset.v75TwoLobeBound='1';
      btn.addEventListener('click',function(ev){
        setTimeout(()=>renderV75Model(key),140);
        setTimeout(()=>renderV75Model(key),260);
      },true);
    });
    const reset=$('v37ResetBtn'); if(reset && !reset.dataset.v75TwoLobeBound){ reset.dataset.v75TwoLobeBound='1'; reset.addEventListener('click',()=>setTimeout(()=>renderV75Model('normal'),160),true); }
  }
  function initV75(){ twoLobeLeftLung(); bindV75(); setTimeout(bindV75,300); setTimeout(()=>renderV75Model('normal'),1000); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initV75); else initV75();
})();
