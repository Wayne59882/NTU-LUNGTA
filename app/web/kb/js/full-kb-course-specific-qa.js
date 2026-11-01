/* v151: Binary Domain entry logic is handled in the UI workflow. Main Knowledge scoring uses the Active-7 configuration with Main KB Gate = 68. Original v127 clean branch:
   v160: tolerant detection is separated from the formal Active-7 decision gate; statistics are delivered separately.
   Fuzzy matching corrects/identifies the intended question or concept but contributes zero KB points.
   Every Scenario/PPT answer must pass Active-7 Main KB Gate = 68. The formal Domain Gate is disabled in v182.
   Small typos, one- or two-character changes, polite filler, and minor extra wording are tolerated.
   Exact/signature matching remains first priority; fuzzy matching is guarded by numeric and direction consistency.
   Formal score components remain: 45, 8, alias 7 capped at 28, 18, domain overlap 2, variant 2, and detected-course 12.
   Pipeline: text normalization → full 12,134-item Main KB Active-7 scoring → ONLY Gate 68 → Top-6 evidence → answer generation.
   No debug weighting block is shown in the student UI. */
(function(){
  const $ = id => document.getElementById(id);
  const KB_STORE = window.VQ_KB_DATA || {};
  const EMBEDDED_FULL_KB = KB_STORE.courses || {};
  const COURSE_ORDER = KB_STORE.courseOrder || Object.keys(EMBEDDED_FULL_KB);
  const MAIN_KB_DOMAIN_ITEMS_V113 = KB_STORE.fineGrainedItems || [];
  const PPT_LECTURE_QA = KB_STORE.pptQuestions || [];

  const FORMAL_DOMAIN_GATE_ENABLED = false;
  const MAIN_KB_GATE = 68;
  const ACTIVE7_WEIGHTS = Object.freeze({
    course_base:45,
    intent_match:8,
    alias_hit:7,
    alias_cap:28,
    concept_exact:18,
    domain_terms_overlap:2,
    response_variant:2,
    detected_course_bonus:12
  });

  /*
    v158 unified Main Knowledge Base and canonical retrieval
    --------------------------------
    The previous build kept the 11,000 course records, 15 fine-grained records,
    1,100 Scenario Practice questions, and 19 PPT questions in separate stores.
    That made the QA service able to answer them, but the object called "Main KB"
    still contained only the original course records.  v157 registers every
    top-level retrievable record in one canonical registry.
  */
  let UNIFIED_KB_CACHE = null;
  let UNIFIED_KB_SIGNATURE = '';
  let CANONICAL_KB_CACHE = null;
  let CANONICAL_KB_SIGNATURE = '';
  let COURSE_FACT_GROUP_CACHE = null;
  let COURSE_FACT_GROUP_COUNT = -1;


  function baseCourseKnowledgeRecords(){
    const out=[];
    COURSE_ORDER.forEach(function(courseKey){
      const arr=(KB_STORE.courses && KB_STORE.courses[courseKey]) || [];
      if(!Array.isArray(arr)) return;
      arr.forEach(function(item){
        const n=Number(item && item.unitItemNumber);
        if(Number.isFinite(n) && n>=1 && n<=11000) out.push(item);
      });
    });
    return out;
  }

  function scenarioQuestionRecords(){
    const out=[];
    const banks=window.VQ_COURSE_QUESTION_BANK || {};
    Object.keys(banks).forEach(function(courseKey){
      const arr=banks[courseKey];
      if(Array.isArray(arr)) arr.forEach(function(q){out.push(q);});
    });
    return out;
  }

  function makeUnifiedRecord(recordType, source, index){
    if(recordType==='course_knowledge' || recordType==='fine_grained_knowledge'){
      return {
        recordId: recordType+':'+(source.unitItemNumber || index+1),
        recordType: recordType,
        course: source.course || '',
        courseTitle: source.courseTitle || '',
        concept: source.concept || '',
        intent: source.intent || 'general',
        aliases: source.aliases || [],
        questionPatterns: source.questionPatterns || [],
        content: source.content || '',
        definition: source.definition || '',
        equation: source.equation || '',
        mechanism: source.mechanism || '',
        example: source.example || '',
        model: source.model || '',
        clinical: source.clinical || '',
        misconception: source.misconception || '',
        variant: source.variant || '',
        source: source
      };
    }
    if(recordType==='scenario_question'){
      const correctIndex=Number(source.answer);
      const answerText=(source.choices || [])[correctIndex] || '';
      return {
        recordId: 'scenario_question:'+(source.id || index+1),
        recordType: recordType,
        course: source.courseId || source.course || '',
        courseTitle: source.courseTitle || '',
        concept: source.concept || answerText || 'Scenario Practice question',
        intent: (source.intent || detectIntent(source.question || '')[0] || 'general'),
        aliases: [source.question].concat(source.choices || []).filter(Boolean),
        questionPatterns: [source.question].filter(Boolean),
        question: source.question || '',
        choices: source.choices || [],
        correctIndex: correctIndex,
        answerText: answerText,
        choiceRationales: source.choiceRationales || [],
        content: source.explanation || answerText,
        definition: answerText,
        mechanism: source.explanation || '',
        example: source.question || '',
        variant: 'direct',
        answerVariant: 'scenario_question',
        source: source
      };
    }
    const pptCorrectIndex=Number(source.correctIndex);
    const pptAnswerText=source.answer || (source.choices || [])[pptCorrectIndex] || '';
    return {
      recordId: 'ppt_question:'+(source.id || index+1),
      recordType: 'ppt_question',
      course: source.course || '',
      courseTitle: 'PPT Slide '+(source.slide || ''),
      concept: source.concept || source.question || 'PPT lecture question',
      intent: (source.intent || detectIntent(source.question || '')[0] || (source.questionType==='multiple_choice' ? 'general' : 'mechanism')),
      aliases: [source.question].concat(source.aliases || [], source.choices || []).filter(Boolean),
      questionPatterns: [source.question].concat(source.aliases || []).filter(Boolean),
      question: source.question || '',
      choices: source.choices || [],
      correctIndex: pptCorrectIndex,
      answerText: pptAnswerText,
      choiceRationales: source.choiceRationales || [],
      workedSteps: source.workedSteps || [],
      content: source.directAnswer || source.answer || source.rationale || '',
      definition: source.directAnswer || source.answer || '',
      equation: source.equation || '',
      mechanism: source.rationale || '',
      example: source.question || '',
      variant: 'direct',
      answerVariant: 'ppt_question',
      source: source
    };
  }

  function ensureUnifiedKnowledgeBase(){
    const fine=Array.isArray(MAIN_KB_DOMAIN_ITEMS_V113) ? MAIN_KB_DOMAIN_ITEMS_V113 : [];
    const ppt=Array.isArray(PPT_LECTURE_QA) ? PPT_LECTURE_QA : [];
    const rawCourseCount=COURSE_ORDER.reduce(function(n,key){
      const arr=(KB_STORE.courses&&KB_STORE.courses[key])||[]; return n+(Array.isArray(arr)?arr.length:0);
    },0);
    const banks=window.VQ_COURSE_QUESTION_BANK||{};
    const scenarioCount=Object.keys(banks).reduce(function(n,key){const arr=banks[key];return n+(Array.isArray(arr)?arr.length:0);},0);
    const signature=[rawCourseCount,fine.length,scenarioCount,ppt.length].join('|');
    if(UNIFIED_KB_CACHE && signature===UNIFIED_KB_SIGNATURE) return UNIFIED_KB_CACHE;

    // Materialize the large arrays only when the underlying counts changed.
    const base=baseCourseKnowledgeRecords();
    const scenario=scenarioQuestionRecords();
    const records=[];
    base.forEach(function(item,i){records.push(makeUnifiedRecord('course_knowledge',item,i));});
    fine.forEach(function(item,i){records.push(makeUnifiedRecord('fine_grained_knowledge',item,i));});
    scenario.forEach(function(item,i){records.push(makeUnifiedRecord('scenario_question',item,i));});
    ppt.forEach(function(item,i){records.push(makeUnifiedRecord('ppt_question',item,i));});

    const byType=Object.create(null);
    records.forEach(function(record){
      if(!byType[record.recordType]) byType[record.recordType]=[];
      byType[record.recordType].push(record);
    });
    UNIFIED_KB_CACHE=records;
    UNIFIED_KB_SIGNATURE=signature;
    KB_STORE.knowledgeRecords=records;
    KB_STORE.mainKnowledgeBase=records;
    KB_STORE.knowledgeByType=byType;
    KB_STORE.mainKnowledgeCount=records.length;
    window.VQ_MAIN_KNOWLEDGE_BASE=records;
    return records;
  }

  function uniqueTextList(values){
    const out=[];
    const seen=new Set();
    (values||[]).forEach(function(value){
      const text=String(value||'').trim();
      const key=norm(text);
      if(text && key && !seen.has(key)){seen.add(key);out.push(text);}
    });
    return out;
  }

  /*
    The raw 11,000 course records are response variants, not 11,000 independent facts.
    Canonical retrieval groups them by course + concept, preserving all useful fields
    and aliases while avoiding seven near-duplicate styles competing in ranking.
  */
  function ensureCanonicalKnowledgeBase(){
    const records=ensureUnifiedKnowledgeBase();
    const signature=String(records.length)+'|'+String(KB_STORE.mainKnowledgeCount||0);
    if(CANONICAL_KB_CACHE && signature===CANONICAL_KB_SIGNATURE) return CANONICAL_KB_CACHE;
    const groups=new Map();
    records.forEach(function(record){
      if(record.recordType!=='course_knowledge' && record.recordType!=='fine_grained_knowledge') return;
      const key=[record.recordType,record.course,record.concept].join('|').toLowerCase();
      let group=groups.get(key);
      if(!group){
        group=Object.assign({},record,{
          recordId:'canonical:'+key,
          recordType:record.recordType==='fine_grained_knowledge'?'canonical_fine_grained':'canonical_course_concept',
          aliases:[],questionPatterns:[],sourceRecords:[],availableIntents:[],availableVariants:[]
        });
        groups.set(key,group);
      }
      group.sourceRecords.push(record);
      group.aliases=uniqueTextList(group.aliases.concat(record.aliases||[],record.concept||''));
      group.questionPatterns=uniqueTextList(group.questionPatterns.concat(record.questionPatterns||[]));
      group.availableIntents=uniqueTextList(group.availableIntents.concat(record.intent||''));
      group.availableVariants=uniqueTextList(group.availableVariants.concat(record.variant||''));
      ['courseTitle','content','definition','equation','mechanism','example','model','clinical','misconception'].forEach(function(field){
        if(!group[field] && record[field]) group[field]=record[field];
        if(record.variant==='direct' && record[field]) group[field]=record[field];
      });
    });
    CANONICAL_KB_CACHE=Array.from(groups.values());
    CANONICAL_KB_SIGNATURE=signature;
    KB_STORE.canonicalKnowledgeBase=CANONICAL_KB_CACHE;
    KB_STORE.canonicalKnowledgeCount=CANONICAL_KB_CACHE.length;
    return CANONICAL_KB_CACHE;
  }

  if(!COURSE_ORDER.length || !Object.keys(EMBEDDED_FULL_KB).length){
    console.error('VQ KB data files were not loaded before the QA engine.');
  }
  (function installMainKBItemTermsFineGrained(){
    MAIN_KB_DOMAIN_ITEMS_V113.forEach(function(item){
      if(!EMBEDDED_FULL_KB[item.course]) EMBEDDED_FULL_KB[item.course]=[];
      const key = [item.course,item.concept,item.intent].join('|').toLowerCase();
      const exists = EMBEDDED_FULL_KB[item.course].some(function(x){
        return [x.course,x.concept,x.intent].join('|').toLowerCase() === key;
      });
      if(!exists) EMBEDDED_FULL_KB[item.course].unshift(item);
    });
  })();
  const COURSE_META = COURSE_ORDER.map(k=>{
    const arr = EMBEDDED_FULL_KB[k] || [];
    const first = arr[0] || {};
    return {key:k, title:first.courseTitle || k, goal:first.courseGoal || '', count:arr.length};
  });

  let rec = null;
  let finalTranscript = '';

  function meta(key){ return COURSE_META.find(x=>x.key===key) || COURSE_META[0]; }
  function selectedCourse(){ const sel=$('lessonSelect'); return (sel && sel.value) || COURSE_ORDER[0]; }
  function selectedTitle(){ return meta(selectedCourse()).title; }

  function stripPlaceholder(t){
    return String(t||'')
      .replace(/^學生問的問題會顯示在這裡。?$/,'')
      .replace(/^學生回答會顯示在這裡。?$/,'')
      .replace(/^AI 老師回答會顯示在這裡。?$/,'')
      .replace(/^Listening[\.。…]*$/,'')
      .trim();
  }
  function getText(el){ return stripPlaceholder(el ? (el.innerText || el.textContent || el.value || '') : ''); }

  function fixTranscript(s){
    let t = String(s||'');
    const reps = [
      [/\bgalaxy\s+exchange\b/ig,'gas exchange'],[/\bgases\s+exchange\b/ig,'gas exchange'],[/\bguess\s+exchange\b/ig,'gas exchange'],[/\bguys\s+exchange\b/ig,'gas exchange'],[/\bgas\s+in\s+change\b/ig,'gas exchange'],[/\bgas\s+exchange\b/ig,'gas exchange'],[/\bchange\s+change\b/ig,'gas exchange'],[/\bcan\s+exchange\b/ig,'gas exchange'],[/\bgas\s+exchang\b/ig,'gas exchange'],[/蓋斯\s*exchange/ig,'gas exchange'],[/氣體\s*exchange/ig,'gas exchange'],
      [/\balveolar\s+(?:guest|guess|gases|gas)\s+equation\b/ig,'alveolar gas equation'],[/\balveolar\s+gas\s+equation\b/ig,'alveolar gas equation'],[/\balveolar\s+equation\b/ig,'alveolar gas equation'],
      [/oxygen\s*nation/ig,'oxygenation'],[/oxygen\s*asian/ig,'oxygenation'],[/oxygenization/ig,'oxygenation'],[/oxy\s*genation/ig,'oxygenation'],[/per\s*fusion/ig,'perfusion'],[/profusion/ig,'perfusion'],[/vent\s*relation/ig,'ventilation'],[/dead\s*(?:space|spade|spec|spac)/ig,'dead space'],[/cardiac\s*output/ig,'cardiac output'],[/mixed\s*venous/ig,'mixed venous'],[/destin/ig,'dead space'],[/deston/ig,'dead space'],
      [/v\s*\/\s*q/ig,'V/Q'],
      [/\bv\s*[-_ ]?\s*q\s*ratio\b/ig,'V/Q ratio'],
      [/\bv\s*[-_ ]?\s*q\b/ig,'V/Q'],
      [/\bvq\b/ig,'V/Q'],
      [/\bventilation\s*[-/ ]\s*perfusion\s*(?:ratio)?\b/ig,'V/Q ratio'],
      [/\bhigh\s*v\s*[-_/ ]?\s*q\b/ig,'high V/Q'],
      [/\blow\s*v\s*[-_/ ]?\s*q\b/ig,'low V/Q'],
      [/通氣\s*(?:與|和|及)?\s*(?:灌流|灌注|血流)\s*(?:比|比例|比值)/g,'V/Q ratio'],
      [/換氣\s*(?:與|和|及)?\s*(?:灌流|灌注|血流)\s*(?:比|比例|比值)/g,'V/Q ratio'],
      [/PaCO₂/g,'PaCO2'],[/PaO₂/g,'PaO2'],[/FiO₂/g,'FiO2'],[/CaO₂/g,'CaO2'],[/SvO₂/g,'SvO2'],[/SaO₂/g,'SaO2'],[/O₂/g,'O2'],[/CO₂/g,'CO2'],
      [/paco\s*2/ig,'PaCO2'],[/pao\s*2/ig,'PaO2'],[/fio\s*2/ig,'FiO2'],[/cao\s*2/ig,'CaO2'],[/svo\s*2/ig,'SvO2'],[/sao\s*2/ig,'SaO2']
    ];
    reps.forEach(([a,b])=>{t=t.replace(a,b);});
    // Do not collapse all spaces around English terms too aggressively; only normalize repeated spaces.
    return t.replace(/dead\s+spacee/ig,'dead space').replace(/\s{2,}/g,' ').trim();
  }

  function norm(s){
    return fixTranscript(String(s||''))
      .toLowerCase()
      .replace(/[，。！？、；：]/g,' ')
      .replace(/[\[\]{}<>]/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }


  function normalizeQuestionText(s){
    return norm(s)
      .replace(/\b([a-d])\s*[\.\)\:：]\s*/g,' ')
      .replace(/[?？!！,，;；:：()（）"“”'‘’]/g,' ')
      .replace(/\s+/g,' ')
      .trim();
  }


  // ================================================================
  // v172 COMPREHENSIVE RECOGNITION LAYER
  // Expands natural student wording into EXISTING canonical terms.
  // Numeric scoring weights/gates are intentionally untouched.
  // ================================================================

  const COURSE_RECOGNITION_ANCHOR = {
    basic: 'gas exchange',
    ventilation: 'ventilation',
    alveolar_gas: 'alveolar gas equation',
    perfusion: 'perfusion',
    normal_vq: 'V/Q ratio',
    low_vq: 'low V/Q',
    high_vq: 'high V/Q',
    shunt: 'shunt',
    diffusion: 'diffusion',
    oxygen_content: 'oxygen content',
    integrated_disease: 'gas exchange'
  };

  const RECOGNITION_GENERIC_ALIASES = new Set([
    'define','definition','what is','what does it mean','meaning','explain','explanation',
    'mechanism','why','how','compare','comparison','difference','example','clinical',
    'model','formula','equation','calculate','calculation','general','direct','plain',
    'teacher script','student hint','misconception',
    '是什麼','什麼意思','意思','定義','解釋','說明','介紹','為什麼','怎麼','如何',
    '原因','機轉','比較','差別','例子','臨床','模型','公式','計算','一般','生理'
  ].map(norm));

  const MANUAL_RECOGNITION_RULES = [
    // V/Q and regional distribution
    {re:/\b(v\s*[-_/ ]?\s*q|vq)\b/i, add:['V/Q ratio']},
    {re:/ventilation\s*(?:and|to|\/|-)?\s*perfusion/i, add:['V/Q ratio']},
    {re:/通氣.*(?:灌流|灌注|血流)|(?:灌流|灌注|血流).*通氣/, add:['V/Q ratio']},
    {re:/換氣.*(?:灌流|灌注|血流)|(?:灌流|灌注|血流).*換氣/, add:['V/Q ratio']},
    {re:/v\/?q\s*(?:mismatch|imbalance|inequality)|ventilation[- /]?perfusion\s*(?:mismatch|imbalance)/i, add:['V/Q mismatch','V/Q ratio']},
    {re:/通氣灌流(?:不匹配|失衡|不均|不一致)|通氣血流(?:不匹配|失衡|不均|不一致)/, add:['V/Q mismatch','V/Q ratio']},
    {re:/\bapex\b|肺尖|肺頂|上肺|肺的上方|肺上部/i, add:['apex','V/Q ratio']},
    {re:/\bbase\b|肺底|肺基底|下肺|肺的下方|肺下部/i, add:['base','V/Q ratio']},

    // Ventilation
    {re:/\balveolar\s+ventilation\b|肺泡通氣|肺泡換氣/i, add:['alveolar ventilation','ventilation']},
    {re:/\bminute\s+ventilation\b|分鐘通氣|每分鐘通氣/i, add:['ventilation']},
    {re:/\brespiratory\s+rate\b|\bbreathing\s+rate\b|\brr\b|呼吸頻率|呼吸速率|呼吸次數/i, add:['ventilation']},
    {re:/\btidal\s+volume\b|\bvt\b|潮氣容積|潮氣量/i, add:['ventilation']},
    {re:/hyperventilat|過度通氣|過度換氣/i, add:['ventilation','PaCO2']},
    {re:/hypoventilat|低通氣|通氣不足|換氣不足/i, add:['ventilation','PaCO2']},

    // Perfusion / pulmonary blood flow
    {re:/\bpulmonary\s+(?:blood\s+flow|perfusion)\b|肺血流|肺部血流|肺循環血流|肺灌流|肺灌注/i, add:['perfusion']},
    {re:/\bperfusion\b|灌流|灌注/i, add:['perfusion']},
    {re:/\bcardiac\s+output\b|心輸出量|心輸出/i, add:['cardiac output','perfusion']},
    {re:/mixed\s+venous|混合靜脈/i, add:['mixed venous','perfusion']},
    {re:/\bsvo2\b|靜脈氧飽和度/i, add:['SvO2','perfusion']},

    // Position/gravity: requires respiratory context to prevent false positives
    {re:/\b(?:upright|standing|stand|sitting|seated|supine|prone|lying|posture|body\s+position)\b|站著|站立|直立|站姿|坐著|坐立|坐姿|坐下|平躺|躺著|仰躺|仰臥|俯臥|臥位|體位|姿勢/i,
     add:['V/Q ratio','perfusion','apex','base'],
     requires:/v\/q|vq|通氣|換氣|灌流|灌注|血流|肺|perfusion|ventilation|apex|base/i},

    // Dead space family
    {re:/\bdead\s*[- ]?\s*space\b|\bdeadspace\b|死腔|無效腔|無效空間|無效通氣/i, add:['dead space']},
    {re:/anatom(?:ic|ical)\s+dead\s*space|解剖死腔|解剖無效腔/i, add:['anatomic dead space','dead space']},
    {re:/alveolar\s+dead\s*space|肺泡死腔|肺泡無效腔/i, add:['alveolar dead space','dead space','high V/Q']},
    {re:/physiolog(?:ic|ical)\s+dead\s*space|生理死腔|生理無效腔/i, add:['physiologic dead space','dead space']},
    {re:/\bvd\s*\/?\s*vt\b|死腔比例|死腔分率/i, add:['VD/VT','dead space']},
    {re:/\bbohr\b|bohr\s+equation|波爾公式|波爾方程/i, add:['Bohr equation','dead space']},

    // Shunt family
    {re:/\bshunt(?:ing)?\b|分流/i, add:['shunt']},
    {re:/true\s+shunt|真正分流|真性分流/i, add:['true shunt','shunt']},
    {re:/anatom(?:ic|ical)\s+shunt|解剖分流/i, add:['anatomic shunt','shunt']},
    {re:/physiolog(?:ic|ical)\s+shunt|生理分流/i, add:['physiologic shunt','shunt']},
    {re:/right\s*[- ]?to\s*[- ]?left\s+shunt|right[- ]left\s+shunt|右(?:到|向)左分流/i, add:['right-to-left shunt','shunt']},
    {re:/venous\s+admixture|靜脈血混合|靜脈混合/i, add:['venous admixture','shunt']},
    {re:/\bqs\s*\/?\s*qt\b|shunt\s+fraction|分流比例|分流分率/i, add:['Qs/Qt','shunt']},
    {re:/有血沒氣|有灌流沒通氣|有血流沒通氣/i, add:['shunt','low V/Q']},

    // Low / high VQ
    {re:/\blow\s*v\s*[-_/ ]?\s*q\b|低\s*v\s*[-_/ ]?\s*q|低通氣灌流比|低通氣血流比/i, add:['low V/Q','V/Q ratio']},
    {re:/\bhigh\s*v\s*[-_/ ]?\s*q\b|高\s*v\s*[-_/ ]?\s*q|高通氣灌流比|高通氣血流比/i, add:['high V/Q','V/Q ratio']},
    {re:/通氣少.*(?:灌流|灌注|血流)多|(?:灌流|灌注|血流)多.*通氣少/i, add:['low V/Q','V/Q ratio']},
    {re:/通氣多.*(?:灌流|灌注|血流)少|(?:灌流|灌注|血流)少.*通氣多/i, add:['high V/Q','V/Q ratio']},
    {re:/有氣沒血|有通氣沒灌流|有通氣沒血流/i, add:['dead space','high V/Q']},

    // Diffusion / A-a
    {re:/\bdiffusion\b|diffusion\s+limitation|擴散|擴散受限|擴散限制/i, add:['diffusion']},
    {re:/\ba\s*[-–— ]\s*a\b|alveolar[- ]arterial\s+(?:gradient|difference)|肺泡動脈氧梯度|肺泡動脈氧差|a-a\s*(?:gradient|gradiant)/i, add:['A-a gradient','diffusion']},
    {re:/\bdlco\b|\bdlo2\b|diffusing\s+capacity|擴散能力|肺擴散能力/i, add:['diffusion']},

    // Alveolar gas / oxygenation
    {re:/alveolar\s+gas\s+equation|肺泡氣方程|肺泡氣體方程/i, add:['alveolar gas equation']},
    {re:/\bpao2\b|動脈氧分壓|動脈血氧分壓/i, add:['PaO2','oxygenation']},
    {re:/\bpaco2\b|動脈二氧化碳分壓|動脈血二氧化碳分壓/i, add:['PaCO2','ventilation']},
    {re:/\bfio2\b|吸入氧濃度|吸入氧比例|吸氧濃度/i, add:['FiO2','oxygenation']},
    {re:/\bpao2\b|肺泡氧分壓/i, add:['alveolar gas equation','oxygenation']},
    {re:/oxygenat|氧合|血氧/i, add:['oxygenation']},
    {re:/\babg\b|arterial\s+blood\s+gas|blood\s+gas|動脈血氣|血液氣體|血氣/i, add:['ABG','gas exchange']},

    // Oxygen content / Hb / delivery
    {re:/\bhemoglobin\b|\bhb\b|血紅素|血色素/i, add:['hemoglobin','oxygen content']},
    {re:/\bcao2\b|arterial\s+oxygen\s+content|oxygen\s+content|動脈氧含量|血氧含量|氧含量/i, add:['CaO2','oxygen content']},
    {re:/oxygen\s+delivery|\bdo2\b|氧氣運輸|氧輸送|氧供應/i, add:['oxygen delivery','oxygen content']},
    {re:/\banemia\b|貧血/i, add:['anemia','hemoglobin','oxygen content']},
    {re:/\bsao2\b|arterial\s+oxygen\s+saturation|動脈氧飽和度/i, add:['SaO2','oxygen content']},

    // Diseases
    {re:/pulmonary\s+embol(?:ism|us)|\bpe\b|肺栓塞|肺動脈栓塞/i, add:['pulmonary embolism','high V/Q']},
    {re:/\bpneumonia\b|肺炎/i, add:['pneumonia','low V/Q']},
    {re:/\basthma\b|氣喘|哮喘/i, add:['asthma','low V/Q']},
    {re:/\bcopd\b|chronic\s+obstructive\s+pulmonary\s+disease|慢性阻塞性肺病|慢性阻塞性肺疾病/i, add:['COPD','low V/Q']},

    // General gas exchange
    {re:/gas\s+exchange|gas\s+transfer|氣體交換/i, add:['gas exchange']},
    {re:/\bo2\b|oxygen|氧氣/i, add:['oxygen']},
    {re:/\bco2\b|carbon\s+dioxide|二氧化碳/i, add:['CO2']}
  ];

  let RECOGNITION_KB_LEXICON_CACHE=null;
  let RECOGNITION_KB_LEXICON_SIGNATURE='';

  function recognitionAliasIsDistinctive(alias){
    const n=norm(alias).trim();
    if(!n || RECOGNITION_GENERIC_ALIASES.has(n)) return false;
    if(/^[\d\s.,/%+\-=]+$/.test(n)) return false;
    if(n.length>140) return false;

    const cjk=(n.match(/[\u4e00-\u9fff]/g)||[]).length;
    const latin=(n.match(/[a-z]/g)||[]).length;

    if(/^(o2|co2|hb|pe|rr|vt|va|ve|q|v)$/i.test(n)) return false;
    if(cjk>0 && cjk<2) return false;
    if(cjk===0 && latin>0 && n.replace(/[^a-z0-9]/g,'').length<4 &&
       !/^(abg|copd|fio2|pao2|paco2|sao2|svo2|cao2|dlco)$/i.test(n)) return false;

    return true;
  }

  function buildRecognitionKbLexicon(){
    const canonical=ensureCanonicalKnowledgeBase();
    const signature=canonical.length+'|'+canonical.map(function(x){
      return [x.course,x.concept,(x.aliases||[]).length,(x.questionPatterns||[]).length].join(':');
    }).join('|');

    if(RECOGNITION_KB_LEXICON_CACHE && signature===RECOGNITION_KB_LEXICON_SIGNATURE){
      return RECOGNITION_KB_LEXICON_CACHE;
    }

    // Group by the alias text first. If the same wording points to multiple
    // concepts/courses, it is ambiguous and must NOT auto-inject a course anchor.
    const grouped=new Map();

    canonical.forEach(function(item){
      const candidates=uniqueTextList(
        [item.concept].concat(item.aliases||[],item.questionPatterns||[])
      );

      candidates.forEach(function(alias){
        if(!recognitionAliasIsDistinctive(alias)) return;
        const normalized=semanticNormalize(alias);
        const compact=normalized.replace(/\s+/g,'');
        if(!normalized || !compact) return;

        let row=grouped.get(normalized);
        if(!row){
          row={
            alias:String(alias),
            normalized:normalized,
            compact:compact,
            concepts:new Set(),
            courses:new Set(),
            specificity:compact.length
          };
          grouped.set(normalized,row);
        }
        if(item.concept) row.concepts.add(String(item.concept));
        if(item.course) row.courses.add(String(item.course));
      });
    });

    const rows=[];
    grouped.forEach(function(row){
      // Only unambiguous KB aliases are allowed to auto-expand.
      if(row.concepts.size!==1 || row.courses.size!==1) return;
      const concept=Array.from(row.concepts)[0];
      const course=Array.from(row.courses)[0];
      rows.push({
        alias:row.alias,
        normalized:row.normalized,
        compact:row.compact,
        concept:concept,
        course:course,
        anchor:COURSE_RECOGNITION_ANCHOR[course]||'',
        specificity:row.specificity
      });
    });

    rows.sort(function(a,b){return b.specificity-a.specificity;});
    RECOGNITION_KB_LEXICON_CACHE=rows;
    RECOGNITION_KB_LEXICON_SIGNATURE=signature;
    return rows;
  }

  function appendRecognitionTerms(target,values,seen){
    (values||[]).forEach(function(value){
      const s=String(value||'').trim();
      const k=norm(s);
      if(!s || !k || seen.has(k)) return;
      seen.add(k);
      target.push(s);
    });
  }

  function expandRecognitionFromKbAliases(base,target,seen){
    const qNorm=semanticNormalize(base);
    const qCompact=qNorm.replace(/\s+/g,'');
    if(!qCompact) return;

    const lexicon=buildRecognitionKbLexicon();
    let matched=0;

    for(const row of lexicon){
      // KB-derived expansion is intentionally exact/compact only.
      // The pre-existing fuzzy detector remains available later in the pipeline,
      // with zero fuzzy bonus. This prevents broad recognition from inventing
      // unrelated concepts because two long phrases happen to look similar.
      const hit=qNorm.includes(row.normalized) || qCompact.includes(row.compact);
      if(!hit) continue;

      appendRecognitionTerms(target,[row.concept,row.anchor],seen);
      matched++;
      if(matched>=12) break;
    }
  }

  function expandRecognitionQuery(raw){
    const base=fixTranscript(String(raw||''));
    const additions=[];
    const seen=new Set();
    const baseNorm=norm(base);

    MANUAL_RECOGNITION_RULES.forEach(function(rule){
      if(rule.requires && !rule.requires.test(base)) return;
      rule.re.lastIndex=0;
      if(rule.re.test(base)) appendRecognitionTerms(additions,rule.add,seen);
    });

    // Automatically cover every distinctive concept / alias / question pattern
    // that already exists in the canonical KB.
    expandRecognitionFromKbAliases(base,additions,seen);

    const filtered=additions.filter(function(x){
      return !baseNorm.includes(norm(x));
    });

    const expanded=filtered.length ? (base+' '+filtered.join(' ')).trim() : base;

    window.VQ_LAST_RECOGNITION = {
      original:String(raw||''),
      normalized:base,
      added:filtered.slice(),
      expanded:expanded
    };

    return expanded;
  }

  window.VQ_expandRecognitionQuery=expandRecognitionQuery;
  window.VQ_getLastRecognition=function(){ return window.VQ_LAST_RECOGNITION||null; };


  function getRecognitionAllowlist(){
    const out=[];
    const seen=new Set();
    function add(v){
      const s=String(v||'').trim();
      const k=norm(s);
      if(!s || !k || seen.has(k)) return;
      seen.add(k); out.push(s);
    }

    // Existing scoring-domain terms + canonical KB concepts.
    DOMAIN_TERMS.forEach(add);
    DOMAIN_TERMS_FINE_GRAINED.forEach(add);
    ensureCanonicalKnowledgeBase().forEach(function(item){
      add(item.concept);
      // Include distinctive aliases only; avoid dumping generic question words.
      (item.aliases||[]).forEach(function(a){
        if(recognitionAliasIsDistinctive(a)) add(a);
      });
    });

    // Keep the semantic normalizer compact enough for the selected local model.
    // Concepts are ordered before aliases, and duplicates are already removed.
    return out.slice(0,500);
  }

  async function semanticRecognizeQuestion(raw, forcedModelKey){
    if(location.protocol==='file:') return null;
    const controller=(typeof AbortController!=='undefined') ? new AbortController() : null;
    const timer=controller ? setTimeout(function(){controller.abort();},120000) : null;
    try{
      const modelKey=forcedModelKey || ((window.VQ_getSelectedModelKey && window.VQ_getSelectedModelKey()) || 'granite');
      const r=await fetch('/api/kb/normalize',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          question:String(raw||''),
          allowed_terms:getRecognitionAllowlist(),
          model_key:modelKey
        }),
        signal:controller ? controller.signal : undefined,
        cache:'no-store'
      });
      if(!r.ok) return null;
      const data=await r.json();
      if(!data) return null;
      return {
        in_scope:!!data.in_scope,
        terms:Array.isArray(data.terms) ? data.terms.slice(0,8) : [],
        confidence:Number(data.confidence||0),
        normalized_question:String(data.normalized_question||''),
        language_tag:String(data.language_tag||''),
        language_confidence:Number(data.language_confidence||0),
        model_key:String(data.model_key||modelKey),
        model:String(data.model||''),
        model_label:String(data.model_label||''),
        latency_ms:Number(data.latency_ms||0),
        tokens_per_second:Number(data.tokens_per_second||0)
      };
    }catch(_){
      return null;
    }finally{
      if(timer) clearTimeout(timer);
    }
  }

  // Backward-compatible alias only; this stage is NOT a rescue and never bypasses Gate 68.
  const semanticRescueQuestion=semanticRecognizeQuestion;

  window.VQ_getRecognitionAllowlist=getRecognitionAllowlist;
  window.VQ_semanticRecognizeQuestion=semanticRecognizeQuestion;
  window.VQ_semanticRescueQuestion=semanticRecognizeQuestion;

  let COURSE_QUESTION_CACHE=null;
  let COURSE_QUESTION_EXACT_INDEX=null;
  let COURSE_QUESTION_SIGNATURE_INDEX=null;
  let COURSE_QUESTION_CACHE_COUNT=-1;

  function allCourseQuestions(){
    const banks = window.VQ_COURSE_QUESTION_BANK || {};
    const count=Object.keys(banks).reduce((n,k)=>n+(Array.isArray(banks[k])?banks[k].length:0),0);
    if(COURSE_QUESTION_CACHE && COURSE_QUESTION_CACHE_COUNT===count) return COURSE_QUESTION_CACHE;
    const out=[];
    const exact=new Map();
    const signatures=new Map();
    Object.keys(banks).forEach(function(k){
      const arr=banks[k];
      if(Array.isArray(arr)) arr.forEach(function(q){
        q.__normalizedStem=normalizeQuestionText(q.question);
        q.__normalizedChoices=(q.choices||[]).map(normalizeQuestionText);
        out.push(q);
        if(q.__normalizedStem){
          if(!exact.has(q.__normalizedStem)) exact.set(q.__normalizedStem,[]);
          exact.get(q.__normalizedStem).push(q);
          const sig=q.__normalizedStem+'||'+q.__normalizedChoices.slice().sort().join('||');
          signatures.set(sig,q);
        }
      });
    });
    COURSE_QUESTION_CACHE=out;
    COURSE_QUESTION_EXACT_INDEX=exact;
    COURSE_QUESTION_SIGNATURE_INDEX=signatures;
    COURSE_QUESTION_CACHE_COUNT=count;
    return out;
  }

  function rawQuestionStem(raw){
    const text=String(raw||'').replace(/\r/g,'\n');
    const marker=/(?:^|\n|\s)A\s*[\.\)\]：:、]\s*/i.exec(text);
    return marker ? text.slice(0,marker.index).trim() : text.trim();
  }

  function matchCourseQuestion(raw){
    const questions=allCourseQuestions();
    const t=normalizeQuestionText(raw);
    if(t.length<18 || !questions.length) return null;
    const stemKey=normalizeQuestionText(rawQuestionStem(raw));
    const directList=(COURSE_QUESTION_EXACT_INDEX && COURSE_QUESTION_EXACT_INDEX.get(stemKey)) || [];
    const parsedChoices=parseAnswerChoices(raw).map(x=>normalizeQuestionText(x.text)).filter(Boolean);
    if(parsedChoices.length>=2 && COURSE_QUESTION_SIGNATURE_INDEX){
      const direct=COURSE_QUESTION_SIGNATURE_INDEX.get(stemKey+'||'+parsedChoices.slice().sort().join('||'));
      if(direct) return direct;
    }
    if(directList.length===1) return directList[0];
    if(directList.length>1){
      // Duplicate stems can only be resolved safely by supplied choices.
      let best=null;
      for(const q of directList){
        const choiceNorms=q.__normalizedChoices||(q.choices||[]).map(normalizeQuestionText);
        const choiceHits=parsedChoices.filter(function(pc){return choiceNorms.includes(pc);}).length;
        if(!best||choiceHits>best.choiceHits) best={item:q,choiceHits:choiceHits};
      }
      if(best&&best.choiceHits>=2) return best.item;
    }
    // Do not scan all 1,100 long stems with edit distance. Resolve minor changes
    // against 55 canonical course facts instead.
    return fuzzyMatchCourseQuestion(raw);
  }


  function composeCourseQuestionAnswer(q,raw){
    const correctIndex=Number(q.answer);
    const correct=(q.choices||[])[correctIndex] || '';
    const provided=parseAnswerChoices(raw);
    const hasProvidedChoices=provided.length>=2;

    // Condition 1: the student asks only the question stem.
    // Return the physiologic answer directly; do not force A-D feedback into the response.
    if(!hasProvidedChoices){
      const lines=[
        '答案：'+correct,
        '',
        '原因：',
        (q.explanation || '此答案符合本課程的核心生理原則。')
      ];
      lines.push('', '課程：'+(q.courseTitle||q.courseId||'呼吸生理'), '題庫編號：'+(q.id||'未標示'));
      return lines.join('\n');
    }

    // Condition 2: the student supplies the stem together with answer choices.
    // Identify the correct option in the supplied order and explain every supplied option.
    const mapped=mapProvidedPptChoices(q,provided);
    const providedCorrect=mapped.find(function(x){return x.canonicalIndex===correctIndex;});
    const correctLabel=providedCorrect?providedCorrect.provided.label:String.fromCharCode(65+correctIndex);
    const correctText=providedCorrect?providedCorrect.provided.text:correct;
    const lines=[
      '正確答案：'+correctLabel+'. '+correctText,
      '',
      '為什麼正確：',
      (q.explanation || '這個選項符合本課程的核心生理原則。')
    ];
    lines.push('', '各選項解析：');
    provided.forEach(function(row){
      const hit=mapped.find(function(x){return x.provided===row;});
      const idx=hit?hit.canonicalIndex:-1;
      const tag=idx===correctIndex?'正確':(idx>=0?'錯誤':'無法可靠對應');
      let reason='';
      if(idx>=0 && Array.isArray(q.choiceRationales) && q.choiceRationales[idx]) reason=q.choiceRationales[idx];
      else if(idx===correctIndex) reason=q.explanation || '符合課程核心原則。';
      else if(idx>=0) reason='此敘述與正確生理關係不一致。正確原則是：'+correct+' '+(q.explanation||'');
      else reason='此選項文字無法和題庫原始選項可靠對應，因此不應猜測判定。';
      lines.push(row.label+'. '+row.text+' — '+tag+'。'+reason);
    });
    lines.push('', '課程：'+(q.courseTitle||q.courseId||'呼吸生理'), '題庫編號：'+(q.id||'未標示'));
    return lines.join('\n');
  }

  function compactMatchText(s){
    return normalizeQuestionText(s)
      .replace(/請問|請教|想問|可以告訴我|what is|how does|how will|calculate|the value of/gi,'')
      .replace(/\s+/g,'')
      .trim();
  }

  function charBigrams(s){
    const out=[];
    for(let i=0;i<s.length-1;i++) out.push(s.slice(i,i+2));
    return out;
  }

  function diceSimilarity(a,b){
    if(!a || !b) return 0;
    if(a===b) return 1;
    if(a.includes(b) || b.includes(a)) return Math.min(a.length,b.length)/Math.max(a.length,b.length)+0.35;
    const aa=charBigrams(a), bb=charBigrams(b), counts=new Map();
    aa.forEach(x=>counts.set(x,(counts.get(x)||0)+1));
    let hit=0;
    bb.forEach(x=>{const n=counts.get(x)||0;if(n){hit++;counts.set(x,n-1);}});
    return (2*hit)/Math.max(1,aa.length+bb.length);
  }


  function levenshteinDistance(a,b,maxDistance){
    a=String(a||''); b=String(b||'');
    if(a===b) return 0;
    if(!a.length) return b.length;
    if(!b.length) return a.length;
    if(Math.abs(a.length-b.length)>(maxDistance==null?Infinity:maxDistance)) return Math.abs(a.length-b.length);
    if(a.length>b.length){const tmp=a;a=b;b=tmp;}
    let previous=Array.from({length:a.length+1},(_,i)=>i);
    for(let j=1;j<=b.length;j++){
      const current=[j]; let rowMin=j;
      for(let i=1;i<=a.length;i++){
        const cost=a.charCodeAt(i-1)===b.charCodeAt(j-1)?0:1;
        const value=Math.min(current[i-1]+1,previous[i]+1,previous[i-1]+cost);
        current[i]=value; if(value<rowMin) rowMin=value;
      }
      previous=current;
      if(maxDistance!=null && rowMin>maxDistance && j>a.length+maxDistance) return rowMin;
    }
    return previous[a.length];
  }

  const MATCH_STOPWORDS=new Set([
    'what','which','when','where','who','why','how','is','are','was','were','be','been','being','the','a','an','of','to','for','in','on','at','by','with','and','or','this','that','these','those','should','would','could','can','please','tell','me','about','answer','option','statement','course','unit','review','learner','teaching','assistant','correctly','best','most',
    '請問','請教','想問','可以','能不能','告訴我','一下','這題','這個','那個','就是','如果','假如','關於','答案','選項','問題','老師','學生','謝謝','麻煩'
  ]);
  const DIRECTION_GROUPS={
    up:['increase','increases','increased','increasing','rise','rises','higher','double','doubles','twice','twofold','增加','上升','升高','提高','加倍','兩倍','2倍'],
    down:['decrease','decreases','decreased','decreasing','fall','falls','lower','half','halves','減少','下降','降低','減半','一半'],
    same:['unchanged','same','constant','nochange','不變','相同','維持','沒有改變'],
    negative:['not','no','never','without','cannot','isnt','arent','不','不是','沒有','無法','不會']
  };

  function normalizeNumberWords(s){
    return String(s||'')
      .replace(/兩倍|二倍/g,'2倍').replace(/三倍/g,'3倍').replace(/四倍/g,'4倍')
      .replace(/百分之\s*([0-9.]+)/g,'$1%')
      .replace(/\bdouble[ds]?\b/ig,'2倍').replace(/\btwice\b/ig,'2倍').replace(/\btwofold\b/ig,'2倍')
      .replace(/\bhalf\b/ig,'0.5倍');
  }

  function semanticNormalize(s){
    return normalizeQuestionText(normalizeNumberWords(s))
      .replace(/每分鐘通氣量/g,'minute ventilation')
      .replace(/肺泡通氣量/g,'alveolar ventilation')
      .replace(/呼吸速率|呼吸頻率/g,'respiratory rate')
      .replace(/潮氣量/g,'tidal volume')
      .replace(/死腔量/g,'dead space')
      .replace(/心輸出量/g,'cardiac output')
      .replace(/肺泡氣體方程式|肺泡氣方程式/g,'alveolar gas equation')
      .replace(/通氣灌流比值|通氣灌流比/g,'v q ratio')
      .replace(/\s+/g,' ').trim();
  }

  function semanticTokens(s){
    const text=semanticNormalize(s);
    const english=(text.match(/[a-z0-9]+(?:\/[a-z0-9]+)?/g)||[]).filter(function(tok){return tok.length>1&&!MATCH_STOPWORDS.has(tok);});
    const cjkRuns=text.match(/[\u4e00-\u9fff]+/g)||[];
    const chinese=[];
    cjkRuns.forEach(function(run){
      if(run.length<=2){if(!MATCH_STOPWORDS.has(run)) chinese.push(run);return;}
      for(let i=0;i<run.length-1;i++){
        const gram=run.slice(i,i+2); if(!MATCH_STOPWORDS.has(gram)) chinese.push(gram);
      }
    });
    return uniqueTextList(english.concat(chinese));
  }

  function tokenNearEqual(a,b){
    if(a===b) return true;
    if(a.length<4||b.length<4) return false;
    const limit=Math.max(a.length,b.length)>=9?2:1;
    return levenshteinDistance(a,b,limit)<=limit;
  }

  function fuzzyTokenF1(a,b){
    const aa=semanticTokens(a), bb=semanticTokens(b);
    if(!aa.length||!bb.length) return 0;
    const used=new Set(); let hit=0;
    aa.forEach(function(x){
      let best=-1;
      for(let i=0;i<bb.length;i++) if(!used.has(i)&&tokenNearEqual(x,bb[i])){best=i;break;}
      if(best>=0){used.add(best);hit++;}
    });
    const precision=hit/aa.length, recall=hit/bb.length;
    return precision+recall ? 2*precision*recall/(precision+recall) : 0;
  }

  function directionSignature(s){
    const t=semanticNormalize(s).replace(/\s+/g,'');
    const out={};
    Object.keys(DIRECTION_GROUPS).forEach(function(group){
      out[group]=DIRECTION_GROUPS[group].some(function(word){return t.includes(String(word).replace(/\s+/g,''));});
    });
    return out;
  }

  function extractNumbers(s){
    return (normalizeNumberWords(s).match(/\d+(?:\.\d+)?/g)||[]).map(Number);
  }

  function semanticConflictPenalty(query,candidate){
    let penalty=0;
    const qd=directionSignature(query), cd=directionSignature(candidate);
    if((qd.up&&cd.down)||(qd.down&&cd.up)) penalty+=0.25;
    if((qd.same&&(cd.up||cd.down))||(cd.same&&(qd.up||qd.down))) penalty+=0.18;
    if(qd.negative!==cd.negative && (qd.negative||cd.negative)) penalty+=0.08;
    const qn=extractNumbers(query), cn=extractNumbers(candidate);
    if(qn.length&&cn.length){
      const numberHit=qn.some(function(x){return cn.some(function(y){return Math.abs(x-y)<=Math.max(0.05,Math.abs(y)*0.03);});});
      if(!numberHit) penalty+=0.18;
    }
    return penalty;
  }

  function tolerantSimilarity(query,candidate){
    const q=semanticNormalize(query), c=semanticNormalize(candidate);
    if(!q||!c) return 0;
    if(q===c) return 1;
    const qc=q.replace(/\s+/g,''), cc=c.replace(/\s+/g,'');
    const containment=(qc.includes(cc)||cc.includes(qc)) ? Math.min(qc.length,cc.length)/Math.max(qc.length,cc.length) : 0;
    const dice=diceSimilarity(qc,cc);
    const token=fuzzyTokenF1(q,c);
    let edit=0;
    const maxLen=Math.max(qc.length,cc.length);
    if(maxLen<=180){
      const dist=levenshteinDistance(qc,cc,Math.ceil(maxLen*0.45));
      edit=Math.max(0,1-dist/Math.max(1,maxLen));
    }
    let score=Math.max(dice*0.46+token*0.42+edit*0.12, containment*0.72+token*0.28, token*0.78+dice*0.22);
    score-=semanticConflictPenalty(query,candidate);
    return Math.max(0,Math.min(1,score));
  }

  function approximateCompactLocation(t,p){
    t=String(t||'');p=String(p||'');
    if(!t||!p) return {score:0,start:-1,length:0,textCompact:t,phraseCompact:p};
    const exact=t.indexOf(p);
    if(exact>=0) return {score:1,start:exact,length:p.length,textCompact:t,phraseCompact:p};
    const maxEdits=p.length>=12?2:1;
    if(p.length<=2) return {score:0,start:-1,length:0,textCompact:t,phraseCompact:p};
    const anchorLen=Math.min(4,Math.max(2,Math.floor(p.length/3)));
    const anchors=[{value:p.slice(0,anchorLen),offset:0},{value:p.slice(-anchorLen),offset:p.length-anchorLen}];
    if(p.length>=8){const mid=Math.floor((p.length-anchorLen)/2);anchors.push({value:p.slice(mid,mid+anchorLen),offset:mid});}
    const starts=new Set();
    for(const anchor of anchors){
      let pos=t.indexOf(anchor.value);
      while(pos>=0){const estimate=pos-anchor.offset;for(let d=-maxEdits;d<=maxEdits;d++)if(estimate+d>=0)starts.add(estimate+d);pos=t.indexOf(anchor.value,pos+1);}
    }
    if(!starts.size&&p.length<=8){for(let i=0;i<t.length;i++)starts.add(i);}
    let best={score:0,start:-1,length:0,textCompact:t,phraseCompact:p};
    for(const st of starts){
      for(let len=Math.max(1,p.length-maxEdits);len<=Math.min(t.length-st,p.length+maxEdits);len++){
        const d=levenshteinDistance(t.slice(st,st+len),p,maxEdits);
        if(d<=maxEdits){const score=1-d/Math.max(p.length,len);if(score>best.score)best={score:score,start:st,length:len,textCompact:t,phraseCompact:p};}
      }
    }
    return best;
  }

  function approximatePhraseLocation(text,phrase){
    return approximateCompactLocation(semanticNormalize(text).replace(/\s+/g,''),semanticNormalize(phrase).replace(/\s+/g,''));
  }
  function approximatePhraseScore(text,phrase){return approximatePhraseLocation(text,phrase).score;}


  function tolerantQuestionThreshold(text){
    const compact=semanticNormalize(text).replace(/\s+/g,'');
    if(compact.length<18) return 0.82;
    if(compact.length<35) return 0.74;
    return 0.66;
  }

  function fuzzyTokenCoverageFromTokens(textTokens,phraseTokens){
    if(!textTokens.length||!phraseTokens.length) return 0;
    let hit=0;
    phraseTokens.forEach(function(target){
      if(textTokens.some(function(token){return tokenNearEqual(token,target);})) hit++;
    });
    return hit/phraseTokens.length;
  }

  function fuzzyTokenCoverage(text,phrase){
    return fuzzyTokenCoverageFromTokens(semanticTokens(text),semanticTokens(phrase));
  }

  function courseFactGroups(){
    const questions=allCourseQuestions();
    if(COURSE_FACT_GROUP_CACHE && COURSE_FACT_GROUP_COUNT===questions.length) return COURSE_FACT_GROUP_CACHE;
    const map=new Map();
    questions.forEach(function(q){
      const correct=(q.choices||[])[Number(q.answer)]||'';
      const key=[q.courseId,q.concept,correct,q.explanation].join('|');
      let g=map.get(key);
      if(!g){
        g={representative:q,questions:[],courseId:q.courseId,courseTitle:q.courseTitle,concept:q.concept,correct:correct,explanation:q.explanation};
        map.set(key,g);
      }
      g.questions.push(q);
    });
    COURSE_FACT_GROUP_CACHE=Array.from(map.values()).map(function(g){
      g.__conceptText=semanticNormalize(g.concept);
      g.__courseText=semanticNormalize(g.courseTitle);
      g.__answerText=semanticNormalize(g.correct+' '+g.explanation);
      g.__conceptTokens=semanticTokens(g.__conceptText);
      g.__courseTokens=semanticTokens(g.__courseText);
      g.__conceptCompact=g.__conceptText.replace(/\s+/g,'');
      g.__courseCompact=g.__courseText.replace(/\s+/g,'');
      g.__choiceNorms=(g.representative.choices||[]).map(normalizeQuestionText);
      return g;
    });
    COURSE_FACT_GROUP_COUNT=questions.length;
    return COURSE_FACT_GROUP_CACHE;
  }

  function fuzzyMatchCourseQuestion(raw){
    const stem=rawQuestionStem(raw);
    const normalizedStem=semanticNormalize(stem);
    const normalizedStemCompact=normalizedStem.replace(/\s+/g,'');
    const provided=parseAnswerChoices(raw);
    const providedNorms=provided.map(function(x){return normalizeQuestionText(x.text);});
    const groups=courseFactGroups();
    const stemTokens=semanticTokens(normalizedStem);

    // Fuzzy Scenario matching is for altered versions of the generated course-bank
    // questions. A free-form physiology question should fall through to canonical KB
    // retrieval instead of being forced into one of the 55 Scenario facts.
    const courseRows=[];
    const seenCourses=new Set();
    groups.forEach(function(group){
      if(seenCourses.has(group.courseId)) return;
      seenCourses.add(group.courseId);
      const exactTitle=normalizedStemCompact.includes(group.__courseCompact);
      const coverage=fuzzyTokenCoverageFromTokens(stemTokens,group.__courseTokens);
      const location=approximateCompactLocation(normalizedStemCompact,group.__courseCompact);
      courseRows.push({courseId:group.courseId,courseTitle:group.__courseText,score:exactTitle?1:Math.max(coverage,location.score),location:location});
    });
    courseRows.sort(function(a,b){return b.score-a.score;});
    const bestCourse=courseRows[0];
    if(!bestCourse || bestCourse.score<0.72) return null;

    let conceptContextCompact=normalizedStemCompact;
    if(bestCourse.location&&bestCourse.location.start>=0&&bestCourse.location.score>=0.72){
      conceptContextCompact=conceptContextCompact.slice(0,bestCourse.location.start)+' '+conceptContextCompact.slice(bestCourse.location.start+bestCourse.location.length);
    }
    const conceptContext=conceptContextCompact;
    const conceptTokens=semanticTokens(conceptContext);
    let best=null,second=null;
    for(const group of groups){
      if(group.courseId!==bestCourse.courseId) continue;
      const tokenCoverage=fuzzyTokenCoverageFromTokens(conceptTokens,group.__conceptTokens);
      const phraseCoverage=approximateCompactLocation(conceptContextCompact,group.__conceptCompact).score;
      const conceptCoverage=Math.max(tokenCoverage,phraseCoverage);
      const specificity=Math.min(0.18,group.__conceptText.replace(/\s+/g,'').length*0.006);
      let score=conceptCoverage*0.75 + specificity + bestCourse.score*0.10;
      if(providedNorms.length>=2){
        let choiceHits=0;
        providedNorms.forEach(function(choice){if(group.__choiceNorms.includes(choice)) choiceHits++;});
        score+=Math.min(0.24,choiceHits*0.06);
      }
      if(conceptCoverage<0.48) score-=0.25;
      const row={group:group,score:score,conceptCoverage:conceptCoverage};
      if(!best||score>best.score){second=best;best=row;} else if(!second||score>second.score) second=row;
    }
    if(!best) return null;
    const margin=best.score-(second?second.score:0);
    if(best.score>=0.60 && best.conceptCoverage>=0.48 && (margin>=0.04 || best.score>=0.90)) return best.group.representative;
    return null;
  }

  function fuzzyMatchPptQuestion(raw){
    const stem=rawQuestionStem(raw);
    let best=null,second=null;
    for(const item of PPT_LECTURE_QA){
      const candidates=[item.question].concat(item.aliases||[]);
      let score=0;
      candidates.forEach(function(candidate){score=Math.max(score,tolerantSimilarity(stem,candidate),approximatePhraseScore(stem,candidate));});
      const row={item:item,score:score};
      if(!best||score>best.score){second=best;best=row;} else if(!second||score>second.score) second=row;
    }
    if(!best) return null;
    const threshold=Math.max(0.60,tolerantQuestionThreshold(stem)-0.06);
    const margin=best.score-(second?second.score:0);
    return best.score>=threshold && (margin>=0.025 || best.score>=0.84) ? best.item : null;
  }

  function bestAliasSimilarity(query,item,queryTokens){
    const qNorm=semanticNormalize(query);
    const qCompact=qNorm.replace(/\s+/g,'');
    if(!item.__searchAliases){
      item.__searchAliases=uniqueTextList([item.concept].concat(item.aliases||[],item.questionPatterns||[]).filter(Boolean)).map(function(alias){
        const normalized=semanticNormalize(alias);
        return {text:alias,normalized:normalized,compact:normalized.replace(/\s+/g,''),tokens:semanticTokens(normalized)};
      });
    }
    let best=0;
    for(const alias of item.__searchAliases){
      if(!alias.compact) continue;
      if(qCompact.includes(alias.compact)||alias.compact.includes(qCompact)) return 1;
      const coverage=fuzzyTokenCoverageFromTokens(queryTokens,alias.tokens);
      const phraseScore=approximatePhraseScore(qNorm,alias.normalized);
      const combined=Math.max(coverage,phraseScore);
      if(combined>best) best=combined;
      if(best>=0.92) return best;
    }
    return best;
  }


  function matchPptQuestion(raw){
    const t=normalizeQuestionText(raw);
    const ct=compactMatchText(raw);
    if(t.length<8) return null;
    let best=null;
    for(const item of PPT_LECTURE_QA){
      const candidates=[item.question].concat(item.aliases||[]);
      let score=0;
      for(const c of candidates){
        const nc=normalizeQuestionText(c);
        const cc=compactMatchText(c);
        if(!nc || !cc) continue;
        if(t.includes(nc) || nc.includes(t) || ct.includes(cc) || cc.includes(ct)){
          score=Math.max(score,1000+Math.min(ct.length,cc.length));
          continue;
        }
        const sim=diceSimilarity(ct,cc);
        const tokens=nc.split(' ').filter(x=>x.length>1);
        const hit=tokens.filter(x=>t.includes(x)).length;
        const tokenScore=tokens.length ? Math.round(520*hit/tokens.length) : 0;
        score=Math.max(score,Math.round(sim*820),tokenScore);
      }
      if(!best || score>best.score) best={item:item,score:score};
    }
    if(best && best.score>=560) return best.item;
    return fuzzyMatchPptQuestion(raw);
  }

  function parseAnswerChoices(raw){
    const text=String(raw||'').replace(/\r/g,'\n');
    const found=[];
    const lineRe=/^\s*([A-H])\s*(?:[\.\)\]：:、]\s*|-\s+)(.+?)\s*$/gim;
    let m;
    while((m=lineRe.exec(text))) found.push({label:m[1].toUpperCase(),text:m[2].trim()});
    if(found.length>=2) return found;
    const inline=[];
    const inlineRe=/(?:^|\s)([A-H])\s*(?:[\.\)\]：:、]\s*|-\s+)([\s\S]*?)(?=(?:\s+[A-H]\s*(?:[\.\)\]：:、]\s*|-\s+))|$)/gi;
    while((m=inlineRe.exec(text))){
      const value=m[2].trim();
      if(value) inline.push({label:m[1].toUpperCase(),text:value});
    }
    return inline.length>=2 ? inline : [];
  }

  function hasAny(t, patterns){ return patterns.some(p=>p.test(t)); }
  function nearNumber(t,target,tolerance){
    const nums=(String(t).match(/\d+(?:\.\d+)?/g)||[]).map(Number);
    return nums.some(n=>Math.abs(n-target)<=tolerance);
  }
  function varDirection(t, vars, dirs){
    const v='(?:'+vars.join('|')+')', d='(?:'+dirs.join('|')+')';
    return new RegExp(v+'.{0,20}'+d+'|'+d+'.{0,20}'+v,'i').test(t);
  }
  function pptChoiceConfidence(item,choice){
    const t=norm(choice).replace(/\s+/g,' ');
    const up=['上升','增加','升高','提高','變高','↑','increase','increases','increased','rise','rises','higher'];
    const down=['下降','降低','減少','變低','↓','decrease','decreases','decreased','fall','falls','lower'];
    const same=['不變','維持','相同','無明顯','沒有明顯','沒有顯著','不顯著','仍很小','接近不變','影響很小','小幅改變','↔','unchanged','no change','same','little affected','minimal change','remains small'];
    const slightUp=['小幅上升','稍微上升','輕微上升','改善有限','slight rise','slightly increase','limited improvement'];
    const double=['2 倍','2倍','兩倍','加倍','double','doubles','twice','twofold'];
    const half=['一半','減半','half','50%'];
    const co2=['paco2','paco2','pco2','二氧化碳分壓','co2'];
    const o2=['pao2','po2','氧分壓','oxygen pressure'];
    switch(item.id){
      case 'ppt-s05-minute-ventilation-double-rr':
      case 'ppt-s06-alveolar-ventilation-double-rr': return hasAny(t,double.map(x=>new RegExp(x,'i'))) ? 100 : 0;
      case 'ppt-s08-pco2-double-va': return hasAny(t,half.map(x=>new RegExp(x,'i'))) || nearNumber(t,20,1.5) ? 100 : 0;
      case 'ppt-s10-pao2-double-pco2': return nearNumber(t,50,4) || nearNumber(t,49.6,2) || varDirection(t,o2,down) ? 90 : 0;
      case 'ppt-s12-fio2-double-pco2': return hasAny(t,same.map(x=>new RegExp(x,'i'))) ? 100 : 0;
      case 'ppt-s14-restore-paco2-40': return (nearNumber(t,150,2) && /reduce|decrease|降低|減少|降回|改回/i.test(t)) || /reduce.{0,20}o2 uptake|降低.{0,20}氧攝取/i.test(t) ? 100 : 0;
      case 'ppt-s16-double-vt-pco2': return nearNumber(t,16.5,2) || nearNumber(t,17,2) ? 100 : 0;
      case 'ppt-s19-shunt-increase-gases': return varDirection(t,o2,down) && (varDirection(t,co2,same) || hasAny(t,same.map(x=>new RegExp(x,'i')))) ? 100 : 0;
      case 'ppt-s21-shunt-high-oxygen': return hasAny(t,slightUp.map(x=>new RegExp(x,'i'))) || (nearNumber(t,59,2)&&nearNumber(t,54.1,2)) ? 100 : 0;
      case 'ppt-s23-shunt-caco2': return nearNumber(t,19.86,.5) ? 100 : 0;
      case 'ppt-s25-low-vq-gases': return varDirection(t,co2,up) && varDirection(t,o2,down) ? 100 : 0;
      case 'ppt-s27-high-vq-gases': return varDirection(t,co2,down) && varDirection(t,o2,up) ? 100 : 0;
      case 'ppt-s29-high-vq-fixed-total-va': return varDirection(t,co2,up) || hasAny(t,up.map(x=>new RegExp(x,'i'))) ? 100 : 0;
      case 'ppt-s31-dead-space-components': return nearNumber(t,.30,.015) && nearNumber(t,.07,.015) ? 100 : 0;
      case 'ppt-s32-bohr-peco2': return nearNumber(t,28.2,.6) ? 100 : 0;
      case 'ppt-s34-diffusion-aa-gradients': return (/a-a|oxygen|氧/.test(t) && hasAny(t,up.map(x=>new RegExp(x,'i'))) && (/co2|二氧化碳/.test(t) && hasAny(t,same.map(x=>new RegExp(x,'i'))))) ? 100 : 0;
      case 'ppt-s37-reduce-aa-diffusion': return /fio2|高濃度氧|提高吸入氧|increase inspired oxygen|supplemental oxygen/i.test(t) ? 100 : 0;
      case 'ppt-s40-low-cardiac-output': return varDirection(t,['pao2','動脈氧分壓'],same) && (varDirection(t,['pvo2','svo2','靜脈氧分壓','靜脈氧飽和度'],down)||/tissue hypoxia|組織缺氧/i.test(t)) ? 100 : 0;
      case 'ppt-s41-anemia-gas-exchange': return varDirection(t,['pao2','動脈氧分壓'],same) && (varDirection(t,['cao2','oxygen content','氧含量','pvo2','svo2'],down)||/tissue hypoxia|組織缺氧/i.test(t)) ? 100 : 0;
      default: return 0;
    }
  }

  function lexicalAnswerScore(item,choice){
    const a=normalizeQuestionText(item.answer+' '+(item.rationale||''));
    const c=normalizeQuestionText(choice);
    const tokens=a.split(' ').filter(x=>x.length>2 && !/^(the|and|with|from|that|this|通常|因此|如果|而且)$/.test(x));
    const hit=tokens.filter(x=>c.includes(x)).length;
    return tokens.length ? Math.round(55*hit/tokens.length) : 0;
  }

  function canonicalChoiceMatchScore(a,b){
    const na=normalizeQuestionText(a), nb=normalizeQuestionText(b);
    if(!na || !nb) return 0;
    if(na===nb) return 1000;
    if(na.includes(nb) || nb.includes(na)) return 850;
    return Math.round(diceSimilarity(compactMatchText(a),compactMatchText(b))*700);
  }

  function mapProvidedPptChoices(item,provided){
    const canonical=Array.isArray(item.choices)?item.choices:[];
    if(!canonical.length || !provided.length) return [];
    return provided.map(function(p){
      let best={index:-1,score:0};
      canonical.forEach(function(c,i){
        const score=canonicalChoiceMatchScore(c,p.text);
        if(score>best.score) best={index:i,score:score};
      });
      return {provided:p,canonicalIndex:best.score>=430?best.index:-1,score:best.score};
    });
  }

  function composePptAnswer(item,raw){
    const provided=parseAnswerChoices(raw);
    const canonical=Array.isArray(item.choices)?item.choices:[];
    const lines=[];

    if(item.questionType==='multiple_choice' && canonical.length){
      const noExact=item.answerStatus==='no_exact_option' || !Number.isInteger(item.correctIndex);

      // Stem-only PPT question: answer the question itself without requiring or inventing choices.
      if(provided.length<2){
        const direct=item.directAnswer || item.answer || (Number.isInteger(item.correctIndex)?canonical[item.correctIndex]:'');
        lines.push('答案：', direct);
        if(item.rationale) lines.push('', '原因：', item.rationale);
        if(item.precisionNote) lines.push('', '精確說明：', item.precisionNote);
        if(item.equation) lines.push('', '公式／數值關係：', item.equation);
        lines.push('', '對應投影片：Slide '+item.slide);
        return lines.join('\n');
      }

      const mapped=mapProvidedPptChoices(item,provided);
      if(noExact){
        lines.push('嚴格判定：本題目前沒有完全正確的選項。');
        if(Number.isInteger(item.bestAvailableIndex)){
          lines.push('最接近的選項：'+String.fromCharCode(65+item.bestAvailableIndex)+'. '+canonical[item.bestAvailableIndex]);
        }
        lines.push('', '正確生理答案：', item.answer);
      }else{
        const ci=Number(item.correctIndex);
        let label=String.fromCharCode(65+ci), shown=canonical[ci];
        const providedCorrect=mapped.find(x=>x.canonicalIndex===ci);
        if(providedCorrect){ label=providedCorrect.provided.label; shown=providedCorrect.provided.text; }
        lines.push('正確答案：'+label+'. '+shown, '', '為什麼正確：', item.rationale||item.answer);
      }
      if(item.precisionNote) lines.push('', '精確說明：', item.precisionNote);
      lines.push('', '各選項解析：');

      const rows=provided.length>=2 ? provided.map(function(p){
        const hit=mapped.find(x=>x.provided===p);
        return {label:p.label,text:p.text,index:hit?hit.canonicalIndex:-1};
      }) : canonical.map(function(c,i){return {label:String.fromCharCode(65+i),text:c,index:i};});

      rows.forEach(function(row){
        const idx=row.index;
        let status='無法可靠對應';
        if(noExact){
          status='不完全正確';
          if(idx===item.bestAvailableIndex) status='最接近但文字不精確';
        }else if(idx===Number(item.correctIndex)) status='正確';
        else if(idx>=0) status='錯誤';
        const reason=(idx>=0 && Array.isArray(item.choiceRationales) && item.choiceRationales[idx])
          ? item.choiceRationales[idx]
          : '此選項文字無法和投影片原始選項可靠對應，因此不應猜測判定。';
        lines.push(row.label+'. '+row.text+' — '+status+'。'+reason);
      });
      if(item.equation) lines.push('', '公式／數值關係：', item.equation);
      lines.push('', '對應投影片：Slide '+item.slide);
      return lines.join('\n');
    }

    lines.push('答案：',item.answer);
    if(item.rationale) lines.push('', '原因：', item.rationale);
    if(Array.isArray(item.workedSteps) && item.workedSteps.length){
      lines.push('', '完整推導：');
      item.workedSteps.forEach(function(step,i){lines.push((i+1)+'. '+step);});
    }
    if(item.equation) lines.push('', '公式／數值關係：', item.equation);
    lines.push('', '對應投影片：Slide '+item.slide);
    return lines.join('\n');
  }


  const OFF_TOPIC = ['股票','台積電','銀行','資產','投資','晚餐','天氣','手機','line','html','github','檔案','下載','白屏','薪水','起薪','履歷','公文'];
  const DOMAIN_TERMS = ['gas exchange','氣體交換','abg','blood gas','血氣','alveolar gas equation','alveolar','oxygenation','ventilation','通氣','alveolar ventilation','perfusion','灌流','v/q','vq','v q','v/q ratio','low v/q','high v/q','shunt','分流','dead space','死腔','diffusion','擴散','a-a','gradient','pao2','paco2','fio2','sao2','svo2','cao2','o2','co2','hemoglobin','hb','貧血','cardiac output','mixed venous','oxygen content','oxygen delivery','pe','pulmonary embolism','肺栓塞','pneumonia','肺炎','asthma','氣喘','copd','apex','base','肺泡','肺微血管','oxygen','carbon dioxide','呼吸','肺','酸鹼','二氧化碳分壓','氧分壓','潮氣容積','潮氣量','吸入氧濃度','氧濃度'];

  const DOMAIN_TERMS_FINE_GRAINED = ['anatomic shunt','anatomical shunt','physiologic shunt','physiological shunt','venous admixture','right-to-left shunt','right left shunt','qs/qt','shunt fraction','anatomic dead space','anatomical dead space','alveolar dead space','physiologic dead space','physiological dead space','vd/vt','bohr equation','bohr dead space equation','dead space fraction','v/q mismatch','vq mismatch','ventilation perfusion mismatch','ventilation-perfusion mismatch','v/q spectrum','vq spectrum','shunt-like','dead-space-like','解剖分流','生理分流','靜脈血混合','右到左分流','解剖死腔','肺泡死腔','生理死腔','死腔比例','死腔分率','分流比例','分流分率','通氣灌流不匹配','通氣灌流失衡','有氣沒血','有血沒氣'];
  DOMAIN_TERMS_FINE_GRAINED.forEach(function(t){ if(!DOMAIN_TERMS.includes(t)) DOMAIN_TERMS.push(t); });

  function titleTokens(course){
    return norm(meta(course).title).split(' ').filter(w=>w.length>=3 && !/^課程$|^與$/.test(w));
  }
  function domainEvidenceScore(q){
    const t=norm(fixTranscript(q));
    if(!t) return 0;
    let score=0;
    const strong = ['gas exchange','alveolar gas equation','oxygenation','ventilation','alveolar ventilation','perfusion','v/q','v/q ratio','low v/q','high v/q','shunt','dead space','diffusion','a-a gradient','pao2','paco2','fio2','sao2','svo2','cao2','hemoglobin','hb','cardiac output','mixed venous','oxygen content','oxygen delivery','pulmonary embolism','pneumonia','asthma','copd','abg','blood gas'];
    const zhStrong = ['氣體交換','肺泡氣','肺泡氧','氧合','通氣','肺泡通氣','灌流','分流','死腔','擴散','血氣','血紅素','貧血','心輸出','混合靜脈','氧含量','氧氣運輸','肺栓塞','肺炎','氣喘','肺泡','肺微血管','呼吸生理','二氧化碳分壓','氧分壓','潮氣容積','潮氣量','吸入氧濃度','氧濃度'];
    strong.forEach(k=>{ if(t.includes(norm(k))) score += 6; });
    zhStrong.forEach(k=>{ if(t.includes(norm(k))) score += 6; });

    DOMAIN_TERMS_FINE_GRAINED.forEach(function(k){ if(t.includes(norm(k))) score += 2; });
    if(/q\s*s\s*\/\s*q\s*t|qs\s*\/\s*qt|v\s*d\s*\/\s*v\s*t|vd\s*\/\s*vt/i.test(q)) score += 8;
    if(/a\s*-\s*a/i.test(q)) score += 6; // tolerate A-a gradient misspellings such as gradiant
    if(/通氣灌流(不匹配|失衡)|有氣沒血|有血沒氣|解剖分流|生理分流|解剖死腔|肺泡死腔|生理死腔/.test(q)) score += 8;
    // Generic words only add weak evidence; they cannot pass the guard alone.
    ['oxygen','o2','co2','肺','呼吸','酸鹼','apex','base','gradient'].forEach(k=>{ if(t.includes(norm(k))) score += 1; });
    COURSE_ORDER.forEach(course=>{
      titleTokens(course).forEach(tok=>{ if(tok.length>=4 && t.includes(tok)) score += 4; });
    });
    return score;
  }
  function questionHasDomain(q){
    return domainEvidenceScore(q) >= 1;
  }
  function obviousOffTopic(q){
    const t=norm(q);
    // Off-topic words only reject when there is no respiratory-domain evidence.
    return OFF_TOPIC.some(k=>t.includes(norm(k))) && !questionHasDomain(q);
  }
  function mostlyNonsense(q){
    const raw=String(q||'').trim();
    const t=norm(raw);
    if(questionHasDomain(raw)) return false;
    if(!t || t.length < 3) return true;
    const digits=(raw.match(/[0-9]/g)||[]).length;
    const letters=(raw.match(/[A-Za-z]/g)||[]).length;
    const cjk=(raw.match(/[\u4e00-\u9fff]/g)||[]).length;
    const filler=(raw.match(/(就是|然後|所以|這個|那個|嗯|呃|喔|餵|好像|不知道|什麼意思|請問)/g)||[]).join('').length;
    if(digits >= 5 && domainEvidenceScore(raw) < 11) return true;
    if((letters+cjk)>0 && filler/(letters+cjk+1) > 0.45 && domainEvidenceScore(raw) < 11) return true;
    if(/(餵){2,}|(嗯){2,}|幹嘛|幹什麼|隨便|亂問|123456/.test(raw) && domainEvidenceScore(raw) < 11) return true;
    // One unknown English word plus「是什麼意思」should not be treated as physiology.
    if(/^[\u4e00-\u9fff\s，,。?？]*(?:[A-Za-z]{4,})[\u4e00-\u9fff\s，,。?？]*$/.test(raw) && domainEvidenceScore(raw) < 11) return true;
    return false;
  }
  function tooVague(q){
    const t=norm(q);
    if(questionHasDomain(q)) return false;
    if(t.length < 3) return true;
    if(/^(嗯|呃|喔|好|所以|現在|幹嘛|幹什麼|不知道)$/i.test(t)) return true;
    if(/(餵){2,}|(嗯){2,}/.test(t)) return true;
    return mostlyNonsense(q);
  }

  function detectIntent(q){
    const t=norm(q); const out=[];
    if(/什麼意思|是什麼|何謂|define|definition|what is|意思|介紹|說明/.test(t)) out.push('definition');
    if(/為什麼|why|機轉|mechanism|造成|導致|原因|怎麼會|如何造成|生理/.test(t)) out.push('mechanism');
    if(/公式|equation|formula|怎麼算|計算|calculate|方程|qs\/?qt|vd\/?vt|bohr/.test(t)) out.push('equation');
    if(/臨床|clinical|病人|疾病|pe|pulmonary embolism|pneumonia|asthma|copd|肺炎|肺栓塞|氣喘|案例/.test(t)) out.push('clinical');
    if(/差別|比較|vs|versus|difference|不同|一樣嗎|分辨|有氣沒血|有血沒氣/.test(t)) out.push('compare');
    if(/圖|模型|model|visual|apex|base|肺區|顯示|畫/.test(t)) out.push('model');
    if(/錯|誤解|misconception|不是|搞不清楚|混淆|陷阱/.test(t)) out.push('misconception');
    if(!out.length) out.push('general');
    return out;
  }

  function detectCourse(q){
    const t=norm(fixTranscript(q));
    const selected=selectedCourse();
    let best={course:selected,score:0};
    COURSE_ORDER.forEach(course=>{
      let score=0;
      const arr=EMBEDDED_FULL_KB[course]||[];
      const m=meta(course);
      // Current selected course is only a small tie-breaker, not a hard restriction.
      if(course===selected) score += 2;
      titleTokens(course).forEach(tok=>{ if(tok.length>=4 && t.includes(tok)) score += 7; });
      const seen=new Set();
      const step=Math.max(1,Math.floor(arr.length/300));
      for(let i=0;i<arr.length;i+=step){
        const it=arr[i];
        const vals=[it.concept,...(it.aliases||[])].filter(Boolean);
        for(const v of vals){
          const nv=norm(v); if(!nv || seen.has(nv)) continue; seen.add(nv);
          if(t.includes(nv)) score += nv.length>5 ? 7 : 3;
        }
      }
      if(course==='basic' && /gas exchange|氣體交換|abg|blood gas|整體|架構|overview|基本/i.test(q)) score+=25;
      if(course==='alveolar_gas' && /alveolar gas equation|oxygenation|pao2|fio2|paco2|PAO2|肺泡氣|氧合|方程/i.test(q)) score+=25;
      if(course==='ventilation' && /ventilation|alveolar ventilation|respiratory rate|tidal volume|dead space|anatomic dead space|anatomical dead space|physiologic dead space|physiological dead space|vd\/?vt|bohr|paco2|通氣|肺泡通氣|潮氣|呼吸頻率|死腔|解剖死腔|生理死腔|死腔比例|死腔分率/i.test(q)) score+=22;
      if(course==='perfusion' && /perfusion|cardiac output|mixed venous|svo2|灌流|心輸出|混合靜脈/i.test(q)) score+=22;
      if(course==='normal_vq' && /v\/?q mismatch|vq mismatch|ventilation[- ]?perfusion mismatch|v\/?q spectrum|vq spectrum|apex|base|gradient|正常.*v\/?q|肺尖|肺底|normal v|通氣灌流不匹配|通氣灌流失衡/i.test(q)) score+=22;
      if(course==='low_vq' && /low\s*v\/?q|low\s*vq|shunt-like|低.*v\/?q|pneumonia|asthma|copd|肺炎|氣喘|low.*shunt|shunt.*low/i.test(q)) score+=22;
      if(course==='high_vq' && /high\s*v\/?q|high\s*vq|dead space|alveolar dead space|dead-space-like|pulmonary embolism|肺栓塞|pe|高.*v\/?q|肺泡死腔|有氣沒血/i.test(q)) score+=22;
      if(course==='shunt' && /true shunt|anatomic shunt|anatomical shunt|physiologic shunt|physiological shunt|right[- ]?to[- ]?left shunt|venous admixture|shunt equation|qs\/?qt|分流|解剖分流|生理分流|靜脈血混合|右到左分流|shunt|有血沒氣/i.test(q)) score+=22;
      if(course==='diffusion' && /diffusion|a-a|擴散|DLO2|A-a gradient/i.test(q)) score+=22;
      if(course==='oxygen_content' && /hemoglobin|\bhb\b|cao2|oxygen content|oxygen delivery|貧血|anemia|血紅素|氧含量/i.test(q)) score+=36;
      if(course==='integrated_disease' && /pe|pneumonia|asthma|copd|肺栓塞|肺炎|氣喘|疾病|整合/i.test(q)) score+=18;
      if(score>best.score) best={course,score};
    });
    return best.course;
  }

  function fields(it){
    return [it.courseTitle,it.courseGoal,it.concept,it.intent,it.variant,it.question,it.answerText,it.content,it.definition,it.equation,it.mechanism,it.example,it.model,it.clinical,it.misconception,...(it.aliases||[]),...(it.questionPatterns||[]),...(it.choices||[]),...(it.choiceRationales||[]),...(it.workedSteps||[])].filter(Boolean).join(' ');
  }
  function normalizedAliases(it){
    if(Array.isArray(it.__vqNormAliases)) return it.__vqNormAliases;
    const arr=(it.aliases||[]).map(norm).filter(Boolean);
    try{ it.__vqNormAliases=arr; }catch(_){ }
    return arr;
  }
  function aliasesHit(q, aliases, record){
    const t=norm(q); let count=0;
    const list=record ? normalizedAliases(record) : (aliases||[]).map(norm).filter(Boolean);
    list.forEach(function(na){ if(na && (t.includes(na)||na.includes(t))) count++; });
    return count;
  }
  function active7ScoreBreakdown(it,q,intents,detectedCourse){
    const t=norm(q);
    let f=it.__vqNormFields;
    if(!f){ f=norm(fields(it)); try{it.__vqNormFields=f;}catch(_){ } }
    const available=(it.availableIntents||[]).map(String);
    const aliasCount=aliasesHit(q,it.aliases,it);
    let domainHits=0;
    DOMAIN_TERMS.forEach(function(term){
      const nt=norm(term);
      if(nt && t.includes(nt) && f.includes(nt)) domainHits++;
    });
    const acceptedVariant=['direct','plain','mechanism_chain','teacher_script','student_hint','canonical_course_concept','canonical_fine_grained'];
    const breakdown={
      course_base:ACTIVE7_WEIGHTS.course_base,
      intent_match:(available.some(function(x){return intents.includes(x);}) || intents.includes(it.intent)) ? ACTIVE7_WEIGHTS.intent_match : 0,
      alias_hit:Math.min(ACTIVE7_WEIGHTS.alias_cap,aliasCount*ACTIVE7_WEIGHTS.alias_hit),
      concept_exact:(it.concept && t.includes(norm(it.concept))) ? ACTIVE7_WEIGHTS.concept_exact : 0,
      domain_terms_overlap:domainHits*ACTIVE7_WEIGHTS.domain_terms_overlap,
      response_variant:(acceptedVariant.includes(it.variant)||String(it.recordType||'').startsWith('canonical_')) ? ACTIVE7_WEIGHTS.response_variant : 0,
      detected_course_bonus:(it.course && it.course===detectedCourse) ? ACTIVE7_WEIGHTS.detected_course_bonus : 0,
      alias_hits:aliasCount,
      domain_overlap_hits:domainHits,
      fuzzy_bonus:0
    };
    breakdown.total=breakdown.course_base+breakdown.intent_match+breakdown.alias_hit+breakdown.concept_exact+breakdown.domain_terms_overlap+breakdown.response_variant+breakdown.detected_course_bonus;
    return breakdown;
  }

  function scoreItem(it,q,intents,detectedCourse){
    return active7ScoreBreakdown(it,q,intents,detectedCourse).total;
  }

  function rankCanonicalCandidates(q,course,intents){
    // v204 FINAL: score EVERY record in the unified 12,134-item Main KB.
    // Course/domain/canonical labels are metadata or score features only; they never pre-filter candidates.
    const records=ensureUnifiedKnowledgeBase();
    return records.map(function(it){
      const breakdown=active7ScoreBreakdown(it,q,intents,course);
      return {it:it,score:breakdown.total,breakdown:breakdown};
    }).sort(function(a,b){return b.score-a.score;});
  }

  function retrieveRanked(q,course,intents){
    // SINGLE runtime decision gate: full Main KB Active-7 score >= 68.
    const scored=rankCanonicalCandidates(q,course,intents);
    const minScore=MAIN_KB_GATE;
    const filtered=scored.filter(function(x){return x.score>=minScore;});
    const seen=new Set();
    const top=[];
    for(const x of filtered){
      // Score all 12,134 records, then deduplicate response variants only AFTER Gate 68.
      // This keeps the user's validated full-KB scoring while preventing seven style variants
      // of the same fact from occupying the entire Top-6 evidence set.
      const k2=(x.it.recordType==='course_knowledge' || x.it.recordType==='fine_grained_knowledge')
        ? ['fact',x.it.course,x.it.concept].join('|').toLowerCase()
        : (x.it.recordId || [x.it.course,x.it.concept,x.it.intent].join('|'));
      if(seen.has(k2)) continue;
      seen.add(k2);
      top.push(x);
      if(top.length>=6) break;
    }
    return top;
  }

  function retrieve(q,course,intents){
    return retrieveRanked(q,course,intents).map(function(x){return x.it;});
  }

  function compactTop6ForServer(ranked){
    return (ranked||[]).slice(0,6).map(function(x,index){
      const it=x.it||{};
      return {
        rank:index+1,
        score:Number(x.score||0),
        course:String(it.course||''),
        courseTitle:String(it.courseTitle||''),
        concept:String(it.concept||''),
        intent:String(it.intent||''),
        definition:compact(String(it.definition||it.content||''),420),
        equation:compact(String(it.equation||''),240),
        mechanism:compact(String(it.mechanism||''),480),
        example:compact(String(it.example||''),260),
        model:compact(String(it.model||''),260),
        clinical:compact(String(it.clinical||''),280),
        misconception:compact(String(it.misconception||''),260)
      };
    });
  }

  function clearTop6Context(){
    window.VQ_LAST_TOP6_KB_CONTEXT=[];
  }


  function isCompareQuestion(q){
    const t=norm(q);
    return /差別|比較|不同|一樣嗎|vs|versus|difference|compare|between|跟.{0,24}(?:差|不同)|和.{0,24}(?:差|不同)/i.test(t);
  }


  // v176: response-only target bundles for broad physiology terms.
  // These improve final explanation quality only and never enter scoring.
  const RESPONSE_TARGET_BUNDLES = [
    {
      label:'perfusion',
      re:/\bperfusion\b|灌流|灌注|肺血流|肺部血流/i,
      course:'perfusion',
      concepts:['perfusion']
    },
    {
      label:'diffusion',
      re:/\bdiffusion\b|擴散/i,
      course:'diffusion',
      concepts:['DLO2','diffusion limitation','membrane thickness','surface area','high oxygen diffusion']
    },
    {
      label:'ventilation',
      re:/\bventilation\b|通氣|換氣/i,
      course:'ventilation',
      concepts:['alveolar ventilation','minute ventilation']
    },
    {
      label:'oxygen content',
      re:/oxygen\s+content|\bcao2\b|氧含量|血氧含量/i,
      course:'oxygen_content',
      concepts:['oxygen content','CaO2']
    },
    {
      label:'shunt',
      re:/\bshunt\b|分流/i,
      course:'shunt',
      concepts:['true shunt','anatomic shunt','physiologic shunt']
    },
    {
      label:'dead space',
      re:/dead\s*[- ]?\s*space|deadspace|死腔|無效腔/i,
      course:'ventilation',
      concepts:['anatomic dead space','physiologic dead space']
    }
  ];

  function canonicalRecordFor(course,concept){
    const target=norm(concept);
    const candidates=ensureCanonicalKnowledgeBase().filter(function(it){
      return it.course===course && norm(it.concept)===target;
    });
    return candidates[0]||null;
  }

  function collectTargetBundleSupport(q){
    const raw=String(q||'');
    const groups=[];
    RESPONSE_TARGET_BUNDLES.forEach(function(bundle){
      bundle.re.lastIndex=0;
      if(!bundle.re.test(raw)) return;
      const records=[];
      bundle.concepts.forEach(function(concept){
        const it=canonicalRecordFor(bundle.course,concept);
        if(it) records.push(compactResponseSupportRecord(it,'target_bundle'));
      });
      if(records.length){
        groups.push({target:bundle.label,records:records});
      }
    });
    return groups.slice(0,4);
  }

  function compactResponseSupportRecord(it,matchType){
    return {
      concept:String(it.concept||''),
      course:String(it.course||''),
      courseTitle:String(it.courseTitle||''),
      matchType:String(matchType||''),
      definition:String(it.definition||it.content||''),
      equation:String(it.equation||''),
      mechanism:String(it.mechanism||''),
      example:String(it.example||''),
      clinical:String(it.clinical||''),
      misconception:String(it.misconception||'')
    };
  }

  function collectExplicitResponseSupport(q){
    const raw=String(q||'');
    const t=semanticNormalize(raw);
    const compact=t.replace(/\s+/g,'');
    const canonical=ensureCanonicalKnowledgeBase();
    const hits=[];
    const seen=new Set();

    function add(it,matchType,priority){
      const key=[it.course,it.concept].join('|').toLowerCase();
      if(seen.has(key)) return;
      seen.add(key);
      hits.push({it:it,matchType:matchType,priority:priority});
    }

    canonical.forEach(function(it){
      const c=semanticNormalize(it.concept||'');
      const cc=c.replace(/\s+/g,'');
      if(!cc) return;
      if(t.includes(c) || (cc.length>=5 && compact.includes(cc))){
        add(it,'concept_exact',1000+cc.length);
      }
    });

    canonical.forEach(function(it){
      if(seen.has([it.course,it.concept].join('|').toLowerCase())) return;
      const aliases=(it.aliases||[]).filter(recognitionAliasIsDistinctive);
      for(const a of aliases){
        const na=semanticNormalize(a);
        const ca=na.replace(/\s+/g,'');
        if(!ca) continue;
        if(t.includes(na) || (ca.length>=6 && compact.includes(ca))){
          add(it,'alias_exact',700+ca.length);
          break;
        }
      }
    });

    hits.sort(function(a,b){return b.priority-a.priority;});
    const limit=isCompareQuestion(raw)?4:2;
    return hits.slice(0,limit).map(function(x){
      return compactResponseSupportRecord(x.it,x.matchType);
    });
  }

  function setResponseSupportContext(q){
    window.VQ_LAST_RESPONSE_SUPPORT_CONTEXT=collectExplicitResponseSupport(q);
    window.VQ_LAST_RESPONSE_TARGET_GROUPS=collectTargetBundleSupport(q);
    window.VQ_LAST_RESPONSE_INTENT=isCompareQuestion(q)?'compare':'general';
  }

  window.VQ_collectExplicitResponseSupport=collectExplicitResponseSupport;
  window.VQ_collectTargetBundleSupport=collectTargetBundleSupport;

  function findUnifiedQuestionRecord(recordType,source){
    const records=ensureUnifiedKnowledgeBase();
    const sourceId=String(source&&source.id||'');
    return records.find(function(record){
      return record.recordType===recordType && ((record.source===source) || (sourceId && String(record.source&&record.source.id||'')===sourceId));
    }) || null;
  }

  function scoreDetectedQuestion(record){
    if(!record) return null;
    // Detection supplies the canonical stem. This repairs typos without adding points.
    const canonicalQuestion=record.question || record.example || record.concept || '';
    const detectedCourse=record.course || detectCourse(canonicalQuestion);
    const intents=detectIntent(canonicalQuestion);
    const domainScore=domainEvidenceScore(canonicalQuestion);
    const breakdown=active7ScoreBreakdown(record,canonicalQuestion,intents,detectedCourse);
    return {
      record:record,
      canonicalQuestion:canonicalQuestion,
      detectedCourse:detectedCourse,
      intents:intents,
      domainScore:domainScore,
      breakdown:breakdown,
      passedDomain:true,
      domainGateEnabled:FORMAL_DOMAIN_GATE_ENABLED,
      passedKB:breakdown.total>=MAIN_KB_GATE
    };
  }

  function debugScoreQuestion(raw){
    ensureUnifiedKnowledgeBase();
    const restored=fixTranscript(String(raw||''));
    const courseQuestion=matchCourseQuestion(restored);
    if(courseQuestion){
      const record=findUnifiedQuestionRecord('scenario_question',courseQuestion);
      const result=scoreDetectedQuestion(record);
      return Object.assign({mode:'scenario_question',matchedId:courseQuestion.id||''},result||{score:0});
    }
    const pptQuestion=matchPptQuestion(restored);
    if(pptQuestion){
      const record=findUnifiedQuestionRecord('ppt_question',pptQuestion);
      const result=scoreDetectedQuestion(record);
      return Object.assign({mode:'ppt_question',matchedId:pptQuestion.id||''},result||{score:0});
    }
    const recognitionQuery=expandRecognitionQuery(restored);
    const domainScore=domainEvidenceScore(recognitionQuery);
    const course=detectCourse(recognitionQuery);
    const intents=detectIntent(recognitionQuery);
    const ranked=rankCanonicalCandidates(recognitionQuery,course,intents);
    const top=ranked[0]||null;
    return {
      mode:'canonical',
      domainScore:domainScore,
      passedDomain:true,
      domainGateEnabled:FORMAL_DOMAIN_GATE_ENABLED,
      detectedCourse:course,
      intents:intents,
      record:top?top.it:null,
      breakdown:top?top.breakdown:null,
      passedKB:!!top && top.score>=MAIN_KB_GATE,
      canonicalQuestion:recognitionQuery
    };
  }

  // Legacy separate MainKB domain helper removed; all records are handled inside EMBEDDED_FULL_KB retrieval.
  function dominantCourse(items, fallback){
    const counts={};
    items.forEach(it=>{ counts[it.course]=(counts[it.course]||0)+1; });
    let best=fallback, n=0;
    Object.keys(counts).forEach(k=>{ if(counts[k]>n){best=k;n=counts[k];} });
    return best;
  }

  function compact(s,max){
    const t=String(s||'').replace(/\s+/g,' ').trim();
    if(!t) return '';
    return t.length>max ? t.slice(0,max-1)+'…' : t;
  }
  function courseIntro(course){
    const m=meta(course); const arr=EMBEDDED_FULL_KB[course]||[];
    const defs=[];
    for(const it of arr){
      if(it.intent==='definition' && it.definition && !defs.includes(it.definition)) defs.push(it.definition);
      if(defs.length>=4) break;
    }
    return '這題我會依「'+m.title+'」來回答。\n\n課程目的：'+(m.goal||'建立本單元核心呼吸生理判讀架構。')+'\n\n本課核心包含：\n- '+defs.map(x=>compact(x,80)).join('\n- ');
  }
  function inferMainConcept(items){
    if(!items.length) return '';
    const c=items[0].concept||'';
    return c ? '「'+c+'」' : '';
  }
  function isCourseOverviewQuestion(q){
    const t=norm(q);
    // v67: treat natural student confusion like「我看不懂這堂課在講什麼」as a course-intro request.
    // This should be answered directly, not rejected as off-topic.
    const s=String(q||'');
    return /(這個|目前|現在|本|這門|這堂|這節|這個單元)?(課程|課|堂課|單元|章節).{0,18}(講什麼|在講什麼|說什麼|內容|介紹|概覽|重點|目的|學什麼|在學什麼|overview|intro|introduction|content)/i.test(s)
      || /(不太清楚|不清楚|不知道|不懂|看不懂|聽不懂|搞不懂).{0,18}(課程|課|堂課|單元|章節).{0,18}(講什麼|內容|意思|重點|目的|在幹嘛|在做什麼|是什麼)/i.test(s)
      || /(課程|課|堂課|單元|章節).{0,18}(不太清楚|不清楚|不知道|不懂|看不懂|聽不懂|搞不懂)/i.test(s)
      || /course.*(about|overview|intro|introduction|content)/i.test(s)
      || /我不太清楚.*(講什麼|內容|意思)/.test(s);
  }

  function composeCourseOverview(course){
    const m=meta(course || selectedCourse());
    const arr=EMBEDDED_FULL_KB[m.key]||[];
    const defs=[]; const seen=new Set();
    for(const it of arr){
      const text=(it.definition || it.mechanism || it.content || '').trim();
      const key=text.toLowerCase().replace(/\s+/g,' ');
      if(text && !seen.has(key)){
        seen.add(key); defs.push(compact(text,90));
      }
      if(defs.length>=4) break;
    }
    const title=m.title || '目前課程';
    const goal=m.goal || '建立本單元的呼吸生理核心概念。';
    const points = defs.length ? defs.map(x=>'• '+x).join('\n') : '• 先建立本單元核心名詞。\n• 再連到生理機轉與臨床判讀。';
    return '這堂課主要在講「'+title.replace(/^課程\s*\d+\s*[：:]\s*/,'')+'」。\n\n'+
      '你可以把它想成這個單元的學習地圖：先抓住核心名詞，再理解它如何影響 PaO2、PaCO2、A-a gradient、V/Q ratio 或 oxygen content。\n\n'+
      '課程重點：\n'+points+'\n\n'+
      '如果你還不確定要從哪裡問，可以直接問：「這個概念是什麼？」、「為什麼會這樣？」或「臨床上要怎麼判斷？」';
  }

  function composeAnswer(original,restored,course,intents,items){
    const finalCourse = items && items.length ? dominantCourse(items, course) : course;
    const m=meta(finalCourse);
    const lines=[];
    if(!items.length){
      return composeCourseOverview(finalCourse);
    }
    const main=items[0];
    const concept=inferMainConcept(items);

    // v61: student-facing answer should not expose internal retrieval pipeline.
    // Do not show「我怎麼判斷、最相關課程、語音修正」unless necessary.
    const askingOverview = isCourseOverviewQuestion(restored);
    if(askingOverview) return composeCourseOverview(finalCourse);

    const isDef = intents.includes('definition') || /是什麼|什麼意思|介紹|說明|define|what is/i.test(restored);
    const isCompare = intents.includes('compare');
    const isEq = intents.includes('equation') || /equation|公式|pao2|paco2|fio2|calculate|計算|alveolar gas/i.test(restored);
    const isMech = intents.includes('mechanism') || intents.includes('general') || isDef || isCompare;
    const isClinical = intents.includes('clinical') || /pe|pneumonia|asthma|copd|病人|臨床|疾病|肺栓塞|肺炎|氣喘/i.test(restored);
    const isModel = intents.includes('model');

    if(isDef){
      lines.push((main.definition || main.content || m.goal || '這是本單元的核心概念。').trim());
    } else if(concept){
      lines.push(concept+'的重點是：'+compact(main.definition || main.content || m.goal,360));
    } else {
      lines.push(compact(main.definition || main.content || m.goal,420));
    }

    if(isEq && main.equation) lines.push('\n公式／數值關係：\n'+compact(main.equation,360));
    if(isMech && main.mechanism) lines.push('\n機轉：\n'+compact(main.mechanism,460));
    if(main.example) lines.push('\n例子：\n'+compact(main.example,340));
    if(isClinical && main.clinical) lines.push('\n臨床連結：\n'+compact(main.clinical,380));
    if(isModel && main.model) lines.push('\n模型上可以這樣看：\n'+compact(main.model,360));
    if(main.misconception) lines.push('\n不要搞混：\n'+compact(main.misconception,340));

    const related=[];
    const relatedSeen=new Set();
    for(const x of items.slice(1)){
      const conceptName=String(x.concept||'').trim();
      if(conceptName && conceptName===main.concept) continue;
      let d=x.definition||x.mechanism||x.equation||x.content||'';
      const body=compact(d,150);
      if(!body) continue;
      const key=(conceptName+'|'+body).toLowerCase().replace(/\s+/g,' ');
      if(relatedSeen.has(key)) continue;
      relatedSeen.add(key);
      related.push((conceptName?conceptName+'：':'')+body);
      if(related.length>=3) break;
    }
    if(related.length){ lines.push('\n相關補充：'); related.forEach((r,i)=>lines.push((i+1)+'. '+r)); }

    const summary = '一句話總結：'+compact(main.mechanism || main.definition || main.content || m.goal,140);
    if(!lines.join('\n').includes(summary)) lines.push('\n'+summary);
    return lines.join('\n');
  }

  async function answerQuestion(raw){
    ensureUnifiedKnowledgeBase();
    clearTop6Context();
    window.VQ_LAST_RESPONSE_SUPPORT_CONTEXT=[];
    window.VQ_LAST_RESPONSE_TARGET_GROUPS=[];
    window.VQ_LAST_RESPONSE_INTENT='general';
    const original=String(raw||'').trim();
    if(!original) return '請先在左側 STUDENT QUESTION 完整輸入問題，再按「送出文字問題」。';
    const restored=fixTranscript(original);
    const recognitionQuery=expandRecognitionQuery(restored);

    // v204 FINAL: no pre-match route and no off-topic/vague/course/domain/canonical pre-gate.
    // Scenario/PPT records are already part of the same 12,134-record Main KB and compete under the same score.
    // Every remaining student question proceeds to the full 12,134-item Main KB and is decided ONLY by score >= 68.
    const course=detectCourse(recognitionQuery);
    const intents=detectIntent(recognitionQuery);
    const ranked=retrieveRanked(recognitionQuery,course,intents);
    const items=ranked.map(function(x){return x.it;});
    if(!items.length){
      return '目前 Main Knowledge Base 全庫評分沒有任何項目達到回答門檻，因此我不會硬猜。請補上更明確的生理變數或關係，例如 ventilation、perfusion、V/Q、shunt、dead space、diffusion、PaO2 或 PaCO2。';
    }

    // v167: preserve the validated retrieval result and expose only the
    // already-passed Top-6 KB records to the response-generation layer.
    window.VQ_LAST_TOP6_KB_CONTEXT=compactTop6ForServer(ranked);
    return composeAnswer(original,recognitionQuery,course,intents,items);
  }

  function knowledgeStats(){
    const records=ensureUnifiedKnowledgeBase();
    const byType=KB_STORE.knowledgeByType || {};
    const base=(byType.course_knowledge || []).length;
    const fine=(byType.fine_grained_knowledge || []).length;
    const scenario=(byType.scenario_question || []).length;
    const ppt=(byType.ppt_question || []).length;
    const scenarioChoiceRationales=(byType.scenario_question || []).reduce(function(n,r){
      return n+(Array.isArray(r.choiceRationales)?r.choiceRationales.length:0);
    },0);
    const pptChoiceRationales=(byType.ppt_question || []).reduce(function(n,r){
      return n+(Array.isArray(r.choiceRationales)?r.choiceRationales.length:0);
    },0);
    const pptOpenAnswers=(byType.ppt_question || []).filter(function(r){
      return !r.source || r.source.questionType!=='multiple_choice';
    }).length;
    return {
      mainKnowledgeRecords:records.length,
      rawRegistryRecords:records.length,
      baseCourseKnowledgeRecords:base,
      baseCourseCanonicalConcepts:ensureCanonicalKnowledgeBase().filter(function(r){return r.recordType==='canonical_course_concept';}).length,
      fineGrainedKnowledgeRecords:fine,
      canonicalFineGrainedConcepts:ensureCanonicalKnowledgeBase().filter(function(r){return r.recordType==='canonical_fine_grained';}).length,
      scenarioQuestionRecords:scenario,
      uniqueScenarioFacts:(function(){
        const set=new Set();
        (byType.scenario_question||[]).forEach(function(r){set.add([r.course,r.concept,r.answerText,r.mechanism].join('|'));});
        return set.size;
      })(),
      pptQuestionRecords:ppt,
      canonicalAnswerUnits:ensureCanonicalKnowledgeBase().length+(function(){
        const set=new Set();
        (byType.scenario_question||[]).forEach(function(r){set.add([r.course,r.concept,r.answerText,r.mechanism].join('|'));});
        return set.size;
      })()+ppt,
      topLevelRetrievableRecords:records.length,
      scenarioChoiceRationales:scenarioChoiceRationales,
      pptChoiceRationales:pptChoiceRationales,
      pptOpenWorkedAnswers:pptOpenAnswers,
      atomicExplanationUnits:base+fine+scenarioChoiceRationales+pptChoiceRationales+pptOpenAnswers
    };
  }

  window.VQ_getKnowledgeStats=knowledgeStats;
  function isDeterministicRejection(text){
    return /(超出本系統|找不到足夠可靠|無法判斷你要問的概念|不會硬套知識庫|不會硬猜|沒有任何項目達到回答門檻|Main Knowledge Base 全庫評分)/.test(String(text||''));
  }

  async function generateFinalAnswer(raw){
    const q=String(raw||'').trim();
    if(!q) return await answerQuestion(q);

    /*
      v204.2 FORMAL RUNTIME
      1) SAME selected offline LLM: semantic recognition (also returns language_tag for ambiguity fallback).
      2) ALL 12,134 Main KB records: Active-7 scoring.
      3) ONLY runtime gate: Main KB score >= 68.  <68 is final rejection; no rescue/bypass.
      4) Language routing does NOT call a separate LLM:
         voice = faster-whisper language; typed = medical-term-neutral local router;
         ambiguous text = language_tag already returned by step 1 in the SAME inference.
      5) SAME selected offline LLM: v199-style final grounded answer synthesis.
    */
    const modelKey=(window.VQ_getSelectedModelKey && window.VQ_getSelectedModelKey()) || 'granite';
    const recognition=await semanticRecognizeQuestion(q,modelKey);

    const semanticParts=[q];
    if(recognition){
      const normalized=String(recognition.normalized_question||'').trim();
      if(normalized) semanticParts.push(normalized);
      (recognition.terms||[]).forEach(function(term){
        const t=String(term||'').trim(); if(t) semanticParts.push(t);
      });
    }
    const seen=new Set();
    const effectiveQuestion=semanticParts.filter(function(part){
      const k=norm(part); if(!k || seen.has(k)) return false; seen.add(k); return true;
    }).join(' ');

    const languageTag=(window.VQ_resolveInputLanguage
      ? window.VQ_resolveInputLanguage(q,recognition)
      : (recognition && recognition.language_tag) || 'zh-TW');
    window.VQ_LAST_DETECTED_LANGUAGE=String(languageTag||'zh-TW');
    window.VQ_LAST_TTS_LANGUAGE=window.VQ_LAST_DETECTED_LANGUAGE;
    try{localStorage.setItem('VQ_LAST_INPUT_LANG',window.VQ_LAST_DETECTED_LANGUAGE);}catch(_){ }

    window.VQ_LAST_SEMANTIC_RECOGNITION={
      used:!!recognition,original:q,effectiveQuestion:effectiveQuestion,
      inScope:recognition ? !!recognition.in_scope : null,
      terms:recognition ? (recognition.terms||[]) : [],
      confidence:recognition ? Number(recognition.confidence||0) : 0,
      normalizedQuestion:recognition ? String(recognition.normalized_question||'') : '',
      languageTag:window.VQ_LAST_DETECTED_LANGUAGE,
      languageConfidence:recognition ? Number(recognition.language_confidence||0) : 0,
      modelKey:recognition ? String(recognition.model_key||modelKey) : modelKey,
      model:recognition ? String(recognition.model||'') : ''
    };
    window.VQ_LAST_SEMANTIC_RESCUE=null;

    // Full 12,134-item scoring; course/domain/canonical metadata never pre-filter candidates.
    const canonicalAns=await answerQuestion(effectiveQuestion || q);
    if(isDeterministicRejection(canonicalAns)){
      window.VQ_LAST_RESPONSE_META={usedServer:false,reason:'main-kb-gate-failed',gate:MAIN_KB_GATE,modelKey:modelKey,language:window.VQ_LAST_DETECTED_LANGUAGE};
      return canonicalAns;
    }

    setResponseSupportContext(effectiveQuestion || q);
    if(window.VQ_maybeDiversifyAnswer){
      return await window.VQ_maybeDiversifyAnswer(q,canonicalAns,modelKey,window.VQ_LAST_DETECTED_LANGUAGE);
    }
    return canonicalAns;
  }

  window.VQ_generateFinalAnswer=generateFinalAnswer;
  window.VQ_V55_answerQuestion=answerQuestion;
  window.VQ_debugScoreQuestion=debugScoreQuestion;
  window.VQ_scoreActive7=function(record,question,detectedCourse){
    const q=String(question||'');
    return active7ScoreBreakdown(record,q,detectIntent(q),detectedCourse||record.course||detectCourse(q));
  };
  window.VQ_ACTIVE7_WEIGHTS=ACTIVE7_WEIGHTS;
  window.VQ_DOMAIN_GATE=null;
  window.VQ_DOMAIN_GATE_ENABLED=FORMAL_DOMAIN_GATE_ENABLED;
  window.VQ_MAIN_KB_GATE=MAIN_KB_GATE;
  window.VQ_BUILD_VERSION='v204-correct-pipeline';

  function setQuestionText(text){
    const q=$('studentQuestion'); if(!q) return;
    const clean = fixTranscript(text || '').trim();
    q.classList && q.classList.remove('placeholder-like','listening-mode');
    if(!clean || clean === 'Listening...' || clean === 'Listening…'){
      q.textContent = '';
      q.removeAttribute('data-live-text');
      return;
    }
    q.textContent = clean;
    q.setAttribute('data-live-text', clean);
  }
  function setAnswer(text){
    const a=$('teacherAnswer'); if(!a) return;
    a.classList && a.classList.remove('placeholder-like','typewriter-active');
    a.textContent=String(text||'');
    a.scrollTop=0;
  }
  function speak(text){
    try{
      if(window.v50Speak) return window.v50Speak(text);
      if('speechSynthesis' in window){
        speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang='zh-TW'; speechSynthesis.speak(u);
      }
    }catch(e){}
  }
  async function submit(){
    const q=getText($('studentQuestion'));
    setQuestionText(q);
    setAnswer('AI 老師正在依目前課程與知識庫判斷問題...');
    const ans=await generateFinalAnswer(q);
    setAnswer(ans); // v161: canonical KB answer may be diversified by the school server; safe fallback remains canonical.
    setTimeout(()=>speak(ans),200);
  }

  function startRecognition(){
    const SR=window.SpeechRecognition || window.webkitSpeechRecognition;
    const qBox=$('studentQuestion');
    if(!SR){ setAnswer('此瀏覽器不支援 SpeechRecognition。請改用 Chrome / Edge，或直接輸入文字問題。'); return; }
    try{ if(rec) rec.stop(); }catch(e){}
    finalTranscript='';
    rec=new SR(); rec.lang='zh-TW'; rec.interimResults=true; rec.continuous=true;
    const ask=$('askBtn'), stop=$('stopAskBtn');
    if(ask) ask.disabled=true; if(stop) stop.disabled=false;
    if(qBox){
      qBox.classList.add('listening-mode');
      if(!getText(qBox)) qBox.setAttribute('data-placeholder','Listening中，請開始說話…');
    }
    rec.onresult=e=>{
      let interim='';
      for(let i=e.resultIndex;i<e.results.length;i++){
        const txt=e.results[i][0].transcript;
        if(e.results[i].isFinal) finalTranscript += txt + ' '; else interim += txt;
      }
      const heard=(finalTranscript + interim).trim();
      if(heard) setQuestionText(heard);
    };
    rec.onerror=e=>{
      const err=e.error||'unknown';
      const intentional = (err === 'aborted' || err === 'no-speech');
      if(qBox){
        qBox.classList.remove('listening-mode');
        qBox.setAttribute('data-placeholder','Type your question here, or select “Start Voice Question” to use speech input.');
        // 若是送出問題造成的正常停止，不要把學生已輸入/已辨識文字清掉。
        if(!intentional && !finalTranscript.trim()) qBox.textContent='';
      }
      if(ask) ask.disabled=false; if(stop) stop.disabled=true;
      // Chrome 在程式主動停止 SpeechRecognition 時常回報 aborted。這不是錯誤，不應覆蓋 AI 回答。
      if(intentional){
        setStatus('語音輸入已停止，正在處理目前問題');
        return;
      }
      setAnswer('語音辨識發生錯誤：'+err+'。可改用文字輸入。');
    };
    rec.onend=()=>{
      if(ask) ask.disabled=false; if(stop) stop.disabled=true;
      if(qBox){ qBox.classList.remove('listening-mode'); qBox.setAttribute('data-placeholder','Type your question here, or select “Start Voice Question” to use speech input.'); }
      const q=getText(qBox);
      if(q && q!=='Listening...' && q!=='Listening…') setQuestionText(q);
      else if(qBox) qBox.textContent='';
    };
    try{ rec.start(); }
    catch(e){
      if(qBox){ qBox.classList.remove('listening-mode'); qBox.setAttribute('data-placeholder','Type your question here, or select “Start Voice Question” to use speech input.'); qBox.textContent=''; }
      if(ask) ask.disabled=false; if(stop) stop.disabled=true;
      setAnswer('語音辨識啟動失敗。可改用文字輸入。');
    }
  }
  function stopRecognitionAndSubmit(){
    try{ if(rec) rec.stop(); }catch(e){}
    setTimeout(()=>{
      const q=getText($('studentQuestion'));
      if(!q || q==='Listening...' || q==='Listening…'){
        setQuestionText('');
        setAnswer('沒有收到語音內容。請重新按「學生開始提問”. 或直接用文字輸入問題。');
        return;
      }
      submit();
    },450);
  }

  function applyStyleFix(){
    const css=`
#studentQuestion,#studentCaseAnswer,#teacherAnswer,#caseFeedback,#lessonText{
  white-space:pre-wrap !important;
  word-break:keep-all !important;
  overflow-wrap:normal !important;
  line-break:auto !important;
  text-rendering:optimizeLegibility;
}
#studentQuestion,#teacherAnswer{font-family:"Microsoft JhengHei","Noto Sans TC","Segoe UI",Arial,sans-serif !important;}
#studentQuestion{position:relative; min-height:180px;}
#studentQuestion:empty::before{content:attr(data-placeholder); color:#94a3b8; pointer-events:none;}
#studentQuestion:focus:empty::before{content:"";}
#studentQuestion.listening-mode{border-style:dashed !important; background:#eef6ff !important;}
`;
    const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
  }
  function bind(){
    applyStyleFix();
    ['studentQuestion','studentCaseAnswer','teacherAnswer','caseFeedback'].forEach(id=>{ const el=$(id); if(el){ el.style.whiteSpace='pre-wrap'; el.style.wordBreak='normal'; el.style.overflowWrap='break-word'; }});
    const q=$('studentQuestion'); if(q){
      q.setAttribute('contenteditable','true');
      q.setAttribute('data-placeholder','Type your question here, or select “Start Voice Question” to use speech input.');
      if(stripPlaceholder(q.textContent).trim()==='學生問的問題會顯示在這裡。') q.textContent='';
      q.addEventListener('focus',()=>{
        if(stripPlaceholder(q.textContent).trim()==='學生問的問題會顯示在這裡。' || stripPlaceholder(q.textContent).trim()==='Listening...') q.textContent='';
      });
      q.addEventListener('input',()=>{ q.classList&&q.classList.remove('placeholder-like','listening-mode'); q.setAttribute('data-placeholder','Type your question here, or select “Start Voice Question” to use speech input.'); });
      q.addEventListener('blur',()=>{ if(!getText(q)) q.textContent=''; });
    }
    const send=$('submitTypedQuestionBtn'); if(send) send.onclick=e=>{e.preventDefault(); submit();};
    const ask=$('askBtn'); if(ask) ask.onclick=e=>{e.preventDefault(); startRecognition();};
    const stop=$('stopAskBtn'); if(stop) stop.onclick=e=>{e.preventDefault(); stopRecognitionAndSubmit();};
    const clear=$('clearBtn'); if(clear) clear.onclick=e=>{e.preventDefault(); try{ if('speechSynthesis' in window) speechSynthesis.cancel(); if(rec) rec.stop(); }catch(_){ } setQuestionText(''); setAnswer('AI 老師回答會顯示在這裡。');};
    const st=$('status'); if(st) st.textContent='Status: v204.2 — Full 12,134 Main KB scoring; ONLY Gate = 68';
    window.VQ_V55_answerQuestion=answerQuestion; window.VQ_V55_submit=submit;
    window.VQ_tolerantSimilarity=tolerantSimilarity;
    window.VQ_matchCourseQuestion=matchCourseQuestion;
    window.VQ_matchPptQuestion=matchPptQuestion;
    window.VQ_getCanonicalKnowledgeBase=ensureCanonicalKnowledgeBase;
    window.VQ_scoreActive7=function(record,question,detectedCourse){
      const q=String(question||'');
      return active7ScoreBreakdown(record,q,detectIntent(q),detectedCourse||record.course||detectCourse(q));
    };
    window.VQ_debugScoreQuestion=debugScoreQuestion;
    window.VQ_ACTIVE7_WEIGHTS=ACTIVE7_WEIGHTS;
    window.VQ_DOMAIN_GATE=null;
    window.VQ_DOMAIN_GATE_ENABLED=FORMAL_DOMAIN_GATE_ENABLED;
    window.VQ_MAIN_KB_GATE=MAIN_KB_GATE;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(bind,100)); else setTimeout(bind,100);
})();
