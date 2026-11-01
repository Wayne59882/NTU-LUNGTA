#!/usr/bin/env python3
from __future__ import print_function
import re
import unicodedata

# v239.5: normalize common scientific Unicode notation before scope matching.
# This prevents short but valid physiology questions copied from rich text (e.g.
# PaO₂, SpO₂, HCO₃⁻) from being rejected by the lexical scope gate.
_SUBSCRIPT_TRANS=str.maketrans({
    '₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9',
    '₊':'+','₋':'-','⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9',
    '⁺':'+','⁻':'-'
})

def normalize_scientific_text(text):
    """Canonicalize common physiology notation without changing semantic content.

    v239.6 fixes short-query aliases that students naturally type in multiple forms,
    e.g. VQ ratio / V/Q ratio and VO2max / VO2 max.  The canonicalized string is
    used only for scope/retrieval matching; the original student text is still shown
    to the model/UI.
    """
    q=unicodedata.normalize('NFKC',str(text or '')).translate(_SUBSCRIPT_TRANS)
    q=(q.replace('−','-').replace('–','-').replace('—','-')
         .replace('／','/').replace('∕','/').replace('⁄','/')
         .replace('×','x').replace('·','.'))
    q=re.sub(r'\s+',' ',q).strip()

    # Ventilation/perfusion ratio: accept VQ, V Q, V/Q, VQratio, VQ ratio, etc.
    q=re.sub(r'(?i)(?<![A-Za-z0-9_])V\s*[/]?\s*Q\s*[-_]?\s*RATIO(?![A-Za-z0-9_])',
             'V/Q ratio',q)
    q=re.sub(r'(?i)(?<![A-Za-z0-9_])V\s*[/]?\s*Q(?![A-Za-z0-9_])',
             'V/Q',q)

    # Maximal oxygen uptake: accept VO2max, VO2 max, VO₂max, V O2 max, etc.
    q=re.sub(r'(?i)(?<![A-Za-z0-9_])V\s*O\s*2\s*[-_]?\s*MAX(?![A-Za-z0-9_])',
             'VO2 max',q)

    return re.sub(r'\s+',' ',q).strip()

# v235 production scope: human physiology + directly related pathophysiology.
# The gate runs before Local/Cloud answer generation. It does not contain exam answers
# and does not use question IDs. Retrieval evidence can support a scope decision but
# cannot by itself turn ordinary conversation into an in-scope physiology question.

_TERM_PATTERNS=[
    # General physiology / cell / transport / homeostasis
    r'生理',r'人體',r'人体',r'恆定',r'恒定',r'內環境',r'内环境',r'細胞',r'细胞',r'細胞膜',r'细胞膜',r'膜電位',r'膜电位',r'動作電位',r'动作电位',r'離子通道',r'离子通道',r'擴散',r'扩散',r'滲透',r'渗透',r'主動運輸',r'主动运输',r'受體',r'受体',r'訊號傳遞',r'信号传递',r'酵素',r'酶',r'代謝',r'代谢',
    # Nervous / sensory / muscle
    r'神經',r'神经',r'突觸',r'突触',r'神經傳導',r'神经传导',r'感覺',r'感觉',r'視覺',r'视觉',r'聽覺',r'听觉',r'痛覺',r'痛觉',r'自主神經',r'自主神经',r'交感',r'副交感',r'肌肉',r'骨骼肌',r'平滑肌',r'肌收縮',r'肌收缩',r'運動控制',r'运动控制',
    # Cardiovascular / blood
    r'心臟',r'心脏',r'心肌',r'心率',r'心輸出量',r'心输出量',r'每搏輸出量',r'每搏输出量',r'血壓',r'血压',r'血流',r'血管',r'循環',r'循环',r'靜脈回流',r'静脉回流',r'微循環',r'微循环',r'冠狀',r'冠状',r'心電圖',r'心电图',r'血紅素',r'血红素',r'紅血球',r'红血球',r'凝血',r'血小板',r'休克',
    # Respiratory
    r'呼吸',r'吸氣',r'吸气',r'吐氣',r'吐气',r'呼氣',r'呼气',r'肺',r'肺泡',r'氣道',r'气道',r'支氣管',r'支气管',r'胸膜',r'橫膈',r'横膈',r'潮氣量',r'潮气量',r'肺容積',r'肺容积',r'肺容量',r'通氣',r'通气',r'灌流',r'換氣',r'换气',r'死腔',r'無效腔',r'无效腔',r'氧合',r'低氧',r'缺氧',r'二氧化碳',r'肺順應性',r'肺顺应性',r'氣道阻力',r'气道阻力',r'表面活性',
    # Renal / fluids / acid-base
    r'腎',r'肾',r'腎臟',r'肾脏',r'腎元',r'肾元',r'腎小球',r'肾小球',r'腎小管',r'肾小管',r'尿液',r'尿量',r'清除率',r'腎血流',r'肾血流',r'體液',r'体液',r'滲透壓',r'渗透压',r'鈉',r'钠',r'鉀',r'钾',r'鈣',r'钙',r'酸.?鹼',r'酸.?碱',r'酸中毒',r'鹼中毒',r'碱中毒',r'碳酸氫',r'碳酸氢',
    # Endocrine / metabolism
    r'內分泌',r'内分泌',r'荷爾蒙',r'荷尔蒙',r'激素',r'垂體',r'垂体',r'下視丘',r'下丘脑',r'甲狀腺',r'甲状腺',r'腎上腺',r'肾上腺',r'胰島素',r'胰岛素',r'升糖素',r'糖皮質',r'糖皮质',r'生長激素',r'生长激素',r'葡萄糖',r'脂肪酸',r'能量平衡',r'體溫',r'体温',r'發燒',r'发烧',
    # GI / reproduction / immune
    r'消化',r'胃',r'腸',r'肠',r'腸胃',r'胃肠',r'吸收',r'分泌',r'蠕動',r'蠕动',r'膽汁',r'胆汁',r'生殖',r'睪丸',r'睾丸',r'卵巢',r'月經',r'月经',r'排卵',r'懷孕',r'怀孕',r'泌乳',r'免疫',r'發炎',r'炎症',r'白血球',r'白细胞',r'抗體',r'抗体',
    # Common physiology symbols/terms
    r'(?<![A-Za-z0-9_])(?:FRC|TLC|VC|RV|ERV|IC|VT|VD|VE|VA|DLCO|PaO2|PaCO2|PACO2|PECO2|FiO2|SpO2|PEEP|V/Q|SaO2|SvO2|PvO2|PvCO2|CaO2|CvO2|VO2|VCO2|DO2|O2ER|P50|Hb|HCO3|ABG|GFR|RPF|MAP|SV|CO|HR|ECG|ADH|ACTH|TSH|T3|T4|FSH|LH|pH)(?![A-Za-z0-9_])',
    r'(?<![A-Za-z0-9_])V\s*/?\s*Q(?:\s*ratio)?(?![A-Za-z0-9_])',r'(?<![A-Za-z0-9_])VO2\s*max(?![A-Za-z0-9_])',r'maximal\s+oxygen\s+(?:uptake|consumption)',
    r'Poiseuille',r'Laplace',r'Boyle',r'Fick',r'Bohr',r'Haldane',r'Frank.?Starling',
    # English domain terms
    r'physiolog',r'homeostas',r'cell\s+membrane',r'membrane\s+potential',r'action\s+potential',r'ion\s+channel',r'osmosis',r'diffusion',r'active\s+transport',r'receptor',r'signal\s+transduction',r'metaboli',
    r'neuron',r'neural',r'synap',r'autonomic',r'sympathetic',r'parasympathetic',r'sensory',r'vision',r'hearing',r'muscle',r'contraction',
    r'cardiac',r'heart',r'blood\s+pressure',r'blood\s+flow',r'cardiac\s+output',r'stroke\s+volume',r'venous\s+return',r'vascular',r'circulation',r'hemoglobin',r'erythrocyte',r'coagulation',
    r'respirat',r'breath',r'inspir',r'expir',r'inhal',r'exhal',r'pulmon',r'lung',r'alveol',r'airway',r'ventilat',r'perfusion',r'dead\s*space',r'shunt',r'hypox',r'oxygen',r'carbon\s*dioxide',
    r'renal',r'kidney',r'nephron',r'glomerul',r'tubular',r'clearance',r'osmolar',r'acid.?base',r'acidosis',r'alkalosis',
    r'endocrine',r'hormone',r'pituitary',r'hypothalam',r'thyroid',r'adrenal',r'insulin',r'glucagon',r'cortisol',r'growth\s+hormone',r'thermoreg',
    r'digest',r'gastrointestinal',r'gastric',r'intestin',r'reproduct',r'ovary',r'testis',r'menstrual',r'ovulation',r'pregnan',r'lactation',r'immune',r'inflamm'
]
TERM_RE=re.compile('(?:'+'|'.join(_TERM_PATTERNS)+')',re.I)

# Obvious ordinary-conversation intents are rejected unless a physiology term is also present.
# This list is about intent classes, not medical answers.
CASUAL_RE=re.compile(r'(?:心情不好|心情很好|陪我聊天|聊聊天|講笑話|讲笑话|推薦.*餐廳|推荐.*餐厅|哪裡好吃|哪里好吃|天氣|天气|履歷|履历|求職|求职|股票|股價|股价|旅遊|旅游|飯店|酒店|電影|电影|音樂|音乐|weather|restaurant|resume|stock price|travel|hotel|movie|music)',re.I)

PHYSIOLOGY_SOURCES=('guyton','vander','beachey')

def _phys_source(src):
    s=str(src or '').lower()
    return any(x in s for x in PHYSIOLOGY_SOURCES)

def decision(question,found=None):
    q=normalize_scientific_text(question)
    found=found or {}; lexical=bool(TERM_RE.search(q)); casual=bool(CASUAL_RE.search(q))
    retrieval=found.get('retrieval') or {}; top=retrieval.get('top_matches') or [] if isinstance(retrieval,dict) else []
    try: top_score=float((top[0] or {}).get('score',0.0)) if top else 0.0
    except Exception: top_score=0.0
    phys_top=sum(1 for row in top[:4] if _phys_source((row or {}).get('source')))
    retrieval_ok=bool(found.get('ok') and found.get('context'))
    if casual and not lexical:
        return {'in_scope':False,'confidence':0.99,'reason':'ordinary-conversation-outside-human-physiology','topic_term_hit':False,'top_similarity':round(top_score,5)}
    if lexical and retrieval_ok:
        return {'in_scope':True,'confidence':0.98,'reason':'human-physiology-topic+textbook-evidence','topic_term_hit':True,'top_similarity':round(top_score,5)}
    if lexical and not retrieval_ok:
        return {'in_scope':True,'confidence':0.74,'reason':'human-physiology-topic-but-evidence-unavailable','topic_term_hit':True,'top_similarity':round(top_score,5)}
    # Terminology-free questions can still be accepted when the full physiology corpus
    # strongly and repeatedly matches. This supports natural student wording without
    # turning generic chat into an open-domain assistant.
    if retrieval_ok and phys_top>=3 and top_score>=0.54:
        return {'in_scope':True,'confidence':0.82,'reason':'strong-human-physiology-textbook-evidence','topic_term_hit':False,'top_similarity':round(top_score,5)}
    return {'in_scope':False,'confidence':0.94 if retrieval_ok else 0.86,'reason':'outside-human-physiology-scope','topic_term_hit':False,'top_similarity':round(top_score,5)}
