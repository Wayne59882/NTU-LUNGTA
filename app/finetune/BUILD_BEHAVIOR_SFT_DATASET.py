#!/usr/bin/env python3
import json, random, math
from pathlib import Path

SEED=42206
random.seed(SEED)
ROOT=Path(__file__).resolve().parent
OUT=ROOT/'dataset'
OUT.mkdir(parents=True, exist_ok=True)
SYSTEM_ZH='你是醫學與呼吸生理學教學助理。請正確、直接、完整回答學生問題；選擇題必須明確選出選項，計算題必須核對公式、數值與單位。'
SYSTEM_EN='You are a medical and respiratory physiology teaching assistant. Answer accurately, directly, and completely. For MCQs, explicitly choose the best option. For calculations, verify formula, arithmetic, units, and option consistency.'

def record(q,a,kind,lang,meta=None):
    return {'messages':[{'role':'system','content':SYSTEM_ZH if lang=='zh-TW' else SYSTEM_EN},{'role':'user','content':q},{'role':'assistant','content':a}], 'type':kind,'language':lang,'meta':meta or {}}

def choice_block(options):
    return ' '.join(f'{chr(65+i)}. {x}' for i,x in enumerate(options))

def mcq_conceptual_examples(n=96):
    facts=[
      ('肺纖維化時，下列何者最符合肺力學變化？','In pulmonary fibrosis, which statement best describes the lung mechanics?',
       '肺順應性下降、彈性回縮力增加，FRC 傾向下降。','Lung compliance decreases, elastic recoil increases, and FRC tends to decrease.',
       ['肺順應性增加且 FRC 上升。','肺順應性下降、彈性回縮力增加，FRC 傾向下降。','彈性回縮力下降且 FRC 上升。','肺順應性與 FRC 均不變。'],
       ['Compliance increases and FRC rises.','Compliance decreases, elastic recoil increases, and FRC tends to decrease.','Elastic recoil decreases and FRC rises.','Compliance and FRC are unchanged.'],
       '肺纖維化使肺組織變硬，順應性下降且向內彈性回縮力增加，因此肺與胸壁的平衡容積下降。','Fibrosis makes the lung stiffer, lowering compliance and increasing inward elastic recoil, so the equilibrium lung volume decreases.'),
      ('肺氣腫時，下列何者最符合肺力學變化？','In emphysema, which statement best describes lung mechanics?',
       '肺順應性增加、彈性回縮力下降，FRC 傾向上升。','Lung compliance increases, elastic recoil decreases, and FRC tends to rise.',
       ['肺順應性下降且 FRC 下降。','肺順應性增加、彈性回縮力下降，FRC 傾向上升。','彈性回縮力增加且 FRC 下降。','肺順應性與 FRC 均不變。'],
       ['Compliance decreases and FRC falls.','Compliance increases, elastic recoil decreases, and FRC tends to rise.','Elastic recoil increases and FRC falls.','Compliance and FRC are unchanged.'],
       '肺氣腫破壞彈性組織，使肺較容易擴張但較不容易回縮，因此靜態平衡肺容積增加。','Emphysema destroys elastic tissue, making the lung easier to expand but less able to recoil, which raises the equilibrium lung volume.'),
      ('肺泡表面活性劑最主要的作用為何？','What is the primary effect of pulmonary surfactant?',
       '降低肺泡表面張力並提高肺順應性。','It lowers alveolar surface tension and increases lung compliance.',
       ['提高肺泡表面張力。','降低肺泡表面張力並提高肺順應性。','增加氣道平滑肌收縮。','降低血紅素攜氧能力。'],
       ['It increases alveolar surface tension.','It lowers alveolar surface tension and increases lung compliance.','It increases airway smooth-muscle contraction.','It decreases hemoglobin oxygen-carrying capacity.'],
       '表面活性劑降低氣液界面的表面張力，使肺泡更容易擴張並降低呼吸功。','Surfactant lowers surface tension at the air-liquid interface, making alveoli easier to expand and reducing the work of breathing.'),
      ('肺泡表面活性劑主要由哪一種細胞分泌？','Which cells primarily secrete pulmonary surfactant?',
       '第二型肺泡上皮細胞。','Type II alveolar epithelial cells.',
       ['第一型肺泡上皮細胞。','第二型肺泡上皮細胞。','肺泡巨噬細胞。','毛細血管內皮細胞。'],
       ['Type I alveolar epithelial cells.','Type II alveolar epithelial cells.','Alveolar macrophages.','Pulmonary capillary endothelial cells.'],
       '第二型肺泡上皮細胞合成並分泌表面活性劑。','Type II alveolar epithelial cells synthesize and secrete surfactant.'),
      ('直立時，為什麼肺尖的 V/Q 比肺底高？','Why is V/Q higher at the lung apex than at the base in an upright person?',
       '由肺底到肺尖，灌流下降的幅度大於通氣下降的幅度。','From base to apex, perfusion falls proportionally more than ventilation.',
       ['肺尖灌流增加得比通氣快。','由肺底到肺尖，灌流下降的幅度大於通氣下降的幅度。','肺尖完全沒有通氣。','肺底完全沒有灌流。'],
       ['Perfusion increases more than ventilation at the apex.','From base to apex, perfusion falls proportionally more than ventilation.','The apex has no ventilation.','The base has no perfusion.'],
       '重力造成通氣與灌流都由肺底往肺尖下降，但灌流下降更明顯，因此肺尖 V/Q 較高。','Gravity causes both ventilation and perfusion to decrease toward the apex, but perfusion decreases more, so apical V/Q is higher.'),
      ('肺泡低通氣最直接會使 PaCO2 如何變化？','What is the most direct effect of alveolar hypoventilation on PaCO2?',
       'PaCO2 上升。','PaCO2 increases.',
       ['PaCO2 上升。','PaCO2 下降。','PaCO2 必定不變。','PaCO2 變成零。'],
       ['PaCO2 increases.','PaCO2 decreases.','PaCO2 must remain unchanged.','PaCO2 becomes zero.'],
       '在 CO2 產生量相近時，肺泡通氣量下降會降低 CO2 排除，使 PaCO2 上升。','At a similar CO2 production rate, reduced alveolar ventilation decreases CO2 elimination and raises PaCO2.'),
      ('肺泡過度通氣最直接會使 PaCO2 如何變化？','What is the most direct effect of alveolar hyperventilation on PaCO2?',
       'PaCO2 下降。','PaCO2 decreases.',
       ['PaCO2 上升。','PaCO2 下降。','PaCO2 必定不變。','PaCO2 與通氣無關。'],
       ['PaCO2 increases.','PaCO2 decreases.','PaCO2 must remain unchanged.','PaCO2 is unrelated to ventilation.'],
       '在 CO2 產生量相近時，肺泡通氣增加會加速 CO2 排除，使 PaCO2 下降。','At a similar CO2 production rate, increased alveolar ventilation removes CO2 faster and lowers PaCO2.'),
      ('若其他條件不變，氣道半徑減少時氣道阻力如何變化？','If other conditions are unchanged, what happens to airway resistance when airway radius decreases?',
       '氣道阻力增加。','Airway resistance increases.',
       ['氣道阻力增加。','氣道阻力下降。','氣道阻力必定不變。','氣道阻力變成零。'],
       ['Airway resistance increases.','Airway resistance decreases.','Airway resistance must remain unchanged.','Airway resistance becomes zero.'],
       '氣道半徑縮小會明顯增加對氣流的阻力，因此相同壓差下氣流下降。','A smaller airway radius markedly increases resistance to airflow, so flow decreases for the same driving pressure.'),
      ('β2 受體刺激對氣道的主要作用為何？','What is the main airway effect of beta-2 receptor stimulation?',
       '支氣管擴張並降低氣道阻力。','Bronchodilation with decreased airway resistance.',
       ['支氣管收縮並增加阻力。','支氣管擴張並降低氣道阻力。','使肺順應性變成零。','直接增加肺泡表面張力。'],
       ['Bronchoconstriction with increased resistance.','Bronchodilation with decreased airway resistance.','It makes lung compliance zero.','It directly increases alveolar surface tension.'],
       'β2 受體刺激使氣道平滑肌放鬆，因此支氣管擴張、氣道阻力下降。','Beta-2 stimulation relaxes airway smooth muscle, causing bronchodilation and reducing airway resistance.'),
      ('副交感刺激對氣道的典型作用為何？','What is the typical effect of parasympathetic stimulation on the airways?',
       '促進支氣管收縮，使氣道阻力增加。','It promotes bronchoconstriction and increases airway resistance.',
       ['促進支氣管擴張。','促進支氣管收縮，使氣道阻力增加。','使肺泡灌流停止。','使表面活性劑完全消失。'],
       ['It promotes bronchodilation.','It promotes bronchoconstriction and increases airway resistance.','It stops alveolar perfusion.','It eliminates surfactant completely.'],
       '迷走神經膽鹼性作用會增加氣道平滑肌收縮，因此提高氣道阻力。','Vagal cholinergic activity increases airway smooth-muscle contraction and therefore raises airway resistance.'),
      ('正常安靜吸氣時，肺泡壓 Pal 的典型變化為何？','During quiet inspiration, what typically happens to alveolar pressure Pal?',
       '短暫低於大氣壓以形成吸氣氣流。','It transiently falls below atmospheric pressure to generate inspiratory flow.',
       ['短暫低於大氣壓以形成吸氣氣流。','持續大幅高於大氣壓。','永遠等於肋膜間壓。','與氣流方向完全無關。'],
       ['It transiently falls below atmospheric pressure to generate inspiratory flow.','It remains far above atmospheric pressure.','It is always equal to pleural pressure.','It is completely unrelated to flow direction.'],
       '胸腔擴張使肺泡容積增加，肺泡壓短暫下降，形成由外界進入肺泡的壓力梯度。','Thoracic expansion increases alveolar volume, transiently lowering alveolar pressure and creating the pressure gradient for inward airflow.'),
      ('安靜呼氣主要由什麼機制驅動？','What primarily drives quiet expiration?',
       '肺與胸壁的彈性回縮造成被動呼氣。','Passive elastic recoil of the respiratory system.',
       ['主要靠強力腹肌收縮。','肺與胸壁的彈性回縮造成被動呼氣。','完全依賴表面活性劑分泌增加。','肺泡壓必須保持負值。'],
       ['Forceful abdominal muscle contraction.','Passive elastic recoil of the respiratory system.','It depends entirely on increased surfactant secretion.','Alveolar pressure must remain negative.'],
       '正常安靜呼氣時吸氣肌放鬆，呼吸系統的彈性回縮使肺容積下降並把氣體推出。','During quiet expiration, inspiratory muscles relax and elastic recoil decreases lung volume, driving gas outward.'),
      ('跨肺壓 PL 的定義為何？','How is transpulmonary pressure PL defined?',
       '肺泡壓 Pal 減去肋膜間壓 Ppl。','Alveolar pressure Pal minus pleural pressure Ppl.',
       ['Ppl − Pal。','Pal − Ppl。','PaCO2 − PAO2。','大氣壓 − Pal。'],
       ['Ppl minus Pal.','Pal minus Ppl.','PaCO2 minus PAO2.','Atmospheric pressure minus Pal.'],
       '跨肺壓是肺泡內外的擴張壓差，定義為 PL = Pal − Ppl。','Transpulmonary pressure is the distending pressure across the lung and is defined as PL = Pal − Ppl.'),
      ('正常 FRC 所代表的力學狀態為何？','What mechanical state does normal FRC represent?',
       '肺向內回縮力與胸壁向外回彈力達到平衡。','A balance between inward lung recoil and outward chest-wall recoil.',
       ['吸氣肌最大收縮時的肺容積。','肺向內回縮力與胸壁向外回彈力達到平衡。','肺泡完全沒有氣體。','肺內壓永遠等於零且沒有任何回縮力。'],
       ['Lung volume during maximal inspiratory muscle contraction.','A balance between inward lung recoil and outward chest-wall recoil.','The alveoli contain no gas.','There is no recoil force at all.'],
       'FRC 是正常被動呼氣末的平衡容積，此時呼吸系統的相反彈性回縮力互相平衡。','FRC is the equilibrium volume at the end of a normal passive expiration, where opposing elastic recoil forces balance.'),
      ('肺纖維化通常如何影響肺擴散能力 DLCO？','How does pulmonary fibrosis typically affect DLCO?',
       'DLCO 下降。','DLCO decreases.',
       ['DLCO 上升。','DLCO 下降。','DLCO 必定不變。','DLCO 與肺間質厚度無關。'],
       ['DLCO increases.','DLCO decreases.','DLCO must remain unchanged.','DLCO is unrelated to interstitial thickness.'],
       '肺纖維化增厚氣體擴散屏障並減少有效交換能力，因此 DLCO 通常下降。','Fibrosis thickens the diffusion barrier and impairs effective gas transfer, so DLCO typically decreases.'),
      ('血液中的氧主要以哪一種形式運送？','In what form is most oxygen transported in blood?',
       '與血紅素結合。','Bound to hemoglobin.',
       ['溶解於血漿。','與血紅素結合。','以碳酸氫根形式。','以氨基甲酸血紅素為主。'],
       ['Dissolved in plasma.','Bound to hemoglobin.','As bicarbonate.','Primarily as carbaminohemoglobin.'],
       '正常情況下，大多數氧與血紅素結合，僅少量直接溶解於血漿。','Under normal conditions, most oxygen is bound to hemoglobin and only a small amount is dissolved in plasma.'),
      ('血液中的二氧化碳主要以哪一種形式運送？','In what form is most carbon dioxide transported in blood?',
       '碳酸氫根 HCO3−。','As bicarbonate HCO3−.',
       ['溶解氧。','碳酸氫根 HCO3−。','氧合血紅素。','游離氮氣。'],
       ['Dissolved oxygen.','As bicarbonate HCO3−.','Oxyhemoglobin.','Free nitrogen gas.'],
       '大部分 CO2 在紅血球內轉換後以碳酸氫根形式在血漿中運送。','Most CO2 is converted in red cells and transported in plasma as bicarbonate.'),
      ('下列何者會使氧合血紅素解離曲線右移？','Which change shifts the oxyhemoglobin dissociation curve to the right?',
       'CO2 增加與 pH 降低。','Increased CO2 with decreased pH.',
       ['CO2 增加與 pH 降低。','CO2 降低與 pH 升高。','溫度降低。','2,3-BPG 降低。'],
       ['Increased CO2 with decreased pH.','Decreased CO2 with increased pH.','Decreased temperature.','Decreased 2,3-BPG.'],
       'CO2 增加與酸化會降低血紅素對氧的親和力，使曲線右移、促進組織釋氧。','Increased CO2 and acidity reduce hemoglobin oxygen affinity, shifting the curve right and facilitating oxygen unloading.'),
      ('肺泡死腔最符合哪個描述？','Which description best matches alveolar dead space?',
       '肺泡有通氣但灌流不足或缺乏。','Alveoli are ventilated but have little or no perfusion.',
       ['肺泡有灌流但完全沒有通氣。','肺泡有通氣但灌流不足或缺乏。','肺泡同時沒有通氣與灌流且仍正常交換。','只代表解剖死腔。'],
       ['Alveoli are perfused but not ventilated.','Alveoli are ventilated but have little or no perfusion.','Alveoli have neither ventilation nor perfusion yet exchange normally.','It refers only to anatomic dead space.'],
       '肺泡死腔代表已到達肺泡的氣體沒有得到相稱的血流，因此形成無效通氣。','Alveolar dead space is ventilation reaching alveoli without matching blood flow, producing wasted ventilation.'),
      ('生理性分流最符合哪個描述？','Which description best matches a physiologic shunt?',
       '有灌流但缺乏有效通氣。','Perfusion without effective ventilation.',
       ['有灌流但缺乏有效通氣。','有通氣但完全沒有灌流。','V/Q 無限大。','所有肺泡的通氣與灌流完全相等。'],
       ['Perfusion without effective ventilation.','Ventilation without perfusion.','V/Q is infinite.','Ventilation and perfusion are identical in every alveolus.'],
       '分流代表血液通過沒有得到足夠通氣的肺區，因此血液未充分氧合即回到動脈循環。','A shunt occurs when blood passes through lung regions without adequate ventilation and returns to the arterial circulation without full oxygenation.'),
      ('肺順應性的基本定義為何？','What is the basic definition of lung compliance?',
       '單位壓力改變所造成的容積改變，即 ΔV/ΔP。','Change in volume per change in pressure, ΔV/ΔP.',
       ['ΔP/ΔV。','ΔV/ΔP。','氣流乘以阻力。','肺泡通氣除以灌流。'],
       ['ΔP/ΔV.','ΔV/ΔP.','Flow multiplied by resistance.','Alveolar ventilation divided by perfusion.'],
       '順應性描述肺在壓力改變下的可擴張程度，數學上為 ΔV/ΔP。','Compliance describes distensibility in response to pressure change and is expressed as ΔV/ΔP.'),
    ]
    out=[]
    i=0
    while len(out)<n:
        f=facts[i%len(facts)]; lang='zh-TW' if (i%2==0) else 'en-US'
        q=f[0] if lang=='zh-TW' else f[1]
        correct=f[2] if lang=='zh-TW' else f[3]
        opts=list(f[4] if lang=='zh-TW' else f[5])
        random.shuffle(opts)
        if correct in opts:
            ci=opts.index(correct)
        else:
            from difflib import SequenceMatcher
            ci=max(range(len(opts)), key=lambda j: SequenceMatcher(None, correct.lower(), opts[j].lower()).ratio())
            correct=opts[ci]
        letter=chr(65+ci)
        q=q+' '+choice_block(opts)
        expl=f[6] if lang=='zh-TW' else f[7]
        if lang=='zh-TW': a=f'正確答案：{letter}. {correct}\n\n解釋：\n{expl}'
        else: a=f'Correct answer: {letter}. {correct}\n\nExplanation:\n{expl}'
        out.append(record(q,a,'multiple_choice_conceptual',lang,{'answer_letter':letter}))
        i+=1
    return out

def calc_mcq_examples(n=96):
    out=[]; seen=set()
    while len(out)<n:
        kind=len(out)%7; zh=(len(out)%2==0); lang='zh-TW' if zh else 'en-US'
        if kind==0: # FRC/RV
            erv=random.choice([700,800,900,1000,1100,1200]); rv=random.choice([800,900,1000,1100,1200,1300]); frc=erv+rv
            correct=rv
            opts=[correct, correct+200, max(100,correct-200), frc]
            random.shuffle(opts); letter=chr(65+opts.index(correct))
            if zh:
                q=f'已知 FRC = {frc} mL、ERV = {erv} mL，RV 為多少？ '+choice_block([f'{x} mL' for x in opts])
                a=f'正確答案：{letter}. {correct} mL\n\n計算：\nFRC = ERV + RV\nRV = {frc} − {erv} = {correct} mL\n\n解釋：\n因此與計算結果相符的選項是 {letter}。'
            else:
                q=f'Given FRC = {frc} mL and ERV = {erv} mL, what is RV? '+choice_block([f'{x} mL' for x in opts])
                a=f'Correct answer: {letter}. {correct} mL\n\nCalculation:\nFRC = ERV + RV\nRV = {frc} − {erv} = {correct} mL\n\nExplanation:\nTherefore, option {letter} matches the calculated result.'
        elif kind==1: # VE VT RR
            vt=random.choice([300,400,500,600]); rr=random.choice([10,12,15,16,20]); ve=vt*rr; correct=rr
            opts=sorted(set([correct, correct+4, max(4,correct-4), correct+8]))
            while len(opts)<4: opts.append(opts[-1]+2)
            random.shuffle(opts); letter=chr(65+opts.index(correct))
            if zh:
                q=f'已知每分鐘通氣量 VE = {ve} mL/min、潮氣容積 VT = {vt} mL，呼吸頻率是多少？ '+choice_block([f'{x} breaths/min' for x in opts])
                a=f'正確答案：{letter}. {correct} breaths/min\n\n計算：\nVE = VT × f\nf = VE / VT = {ve} / {vt} = {correct} breaths/min\n\n解釋：\n計算結果對應選項 {letter}。'
            else:
                q=f'Given minute ventilation VE = {ve} mL/min and tidal volume VT = {vt} mL, what is respiratory rate? '+choice_block([f'{x} breaths/min' for x in opts])
                a=f'Correct answer: {letter}. {correct} breaths/min\n\nCalculation:\nVE = VT × f\nf = VE / VT = {ve} / {vt} = {correct} breaths/min\n\nExplanation:\nThe calculated value matches option {letter}.'
        elif kind==2: # VA from VE/VT/VD
            vt=random.choice([350,400,450,500,600]); vd=random.choice([100,150,200]);
            if vd>=vt: continue
            rr=random.choice([10,12,15,16,20]); ve=vt*rr; va=(vt-vd)*rr; correct=va
            opts=[correct, ve, vd*rr, max(500,correct+1000)]; random.shuffle(opts); letter=chr(65+opts.index(correct))
            if zh:
                q=f'已知 VE = {ve} mL/min、VT = {vt} mL、VD = {vd} mL，肺泡通氣量 VA 為多少？ '+choice_block([f'{x} mL/min' for x in opts])
                a=f'正確答案：{letter}. {correct} mL/min\n\n計算：\nf = VE / VT = {ve} / {vt} = {rr} breaths/min\nVA = (VT − VD) × f = ({vt} − {vd}) × {rr} = {correct} mL/min\n\n解釋：\n因此答案為 {letter}。'
            else:
                q=f'Given VE = {ve} mL/min, VT = {vt} mL, and VD = {vd} mL, what is alveolar ventilation VA? '+choice_block([f'{x} mL/min' for x in opts])
                a=f'Correct answer: {letter}. {correct} mL/min\n\nCalculation:\nf = VE / VT = {ve} / {vt} = {rr} breaths/min\nVA = (VT − VD) × f = ({vt} − {vd}) × {rr} = {correct} mL/min\n\nExplanation:\nTherefore, the correct option is {letter}.'
        elif kind==3: # TLC VC RV
            rv=random.choice([900,1000,1100,1200]); vc=random.choice([3500,4000,4500,5000]); tlc=rv+vc; correct=vc
            opts=[vc,vc-500,vc+500,tlc]; random.shuffle(opts); letter=chr(65+opts.index(correct))
            if zh:
                q=f'已知 TLC = {tlc} mL、RV = {rv} mL，VC 為多少？ '+choice_block([f'{x} mL' for x in opts])
                a=f'正確答案：{letter}. {correct} mL\n\n計算：\nTLC = VC + RV\nVC = {tlc} − {rv} = {correct} mL\n\n解釋：\n因此與結果相符的是選項 {letter}。'
            else:
                q=f'Given TLC = {tlc} mL and RV = {rv} mL, what is VC? '+choice_block([f'{x} mL' for x in opts])
                a=f'Correct answer: {letter}. {correct} mL\n\nCalculation:\nTLC = VC + RV\nVC = {tlc} − {rv} = {correct} mL\n\nExplanation:\nOption {letter} matches the result.'
        elif kind==4: # IC
            irv=random.choice([2000,2500,3000]); vt=random.choice([400,500,600]); ic=irv+vt; correct=ic
            opts=[ic,irv,vt,ic+500]; random.shuffle(opts); letter=chr(65+opts.index(correct))
            if zh:
                q=f'已知 IRV = {irv} mL、VT = {vt} mL，IC 為多少？ '+choice_block([f'{x} mL' for x in opts])
                a=f'正確答案：{letter}. {correct} mL\n\n計算：\nIC = IRV + VT = {irv} + {vt} = {correct} mL\n\n解釋：\n因此答案為 {letter}。'
            else:
                q=f'Given IRV = {irv} mL and VT = {vt} mL, what is IC? '+choice_block([f'{x} mL' for x in opts])
                a=f'Correct answer: {letter}. {correct} mL\n\nCalculation:\nIC = IRV + VT = {irv} + {vt} = {correct} mL\n\nExplanation:\nTherefore, the correct option is {letter}.'
        elif kind==5: # Bohr
            paco2=random.choice([36,40,44,48]); peco2=random.choice([18,20,24,30]);
            if peco2>=paco2: continue
            ratio=(paco2-peco2)/paco2; pct=round(ratio*100)
            opts=[pct, max(0,pct-10), min(100,pct+10), round(peco2/paco2*100)]
            # ensure unique
            opts2=[]
            for x in opts:
                while x in opts2: x+=3
                opts2.append(x)
            opts=opts2; random.shuffle(opts); letter=chr(65+opts.index(pct))
            if zh:
                q=f'使用 Bohr equation，PaCO2 = {paco2} mmHg、PECO2 = {peco2} mmHg，VD/VT 約為多少？ '+choice_block([f'{x}%' for x in opts])
                a=f'正確答案：{letter}. {pct}%\n\n計算：\nVD/VT = (PaCO2 − PECO2) / PaCO2\n= ({paco2} − {peco2}) / {paco2} = {ratio:.2f} ≈ {pct}%\n\n解釋：\n因此與計算值最相符的是選項 {letter}。'
            else:
                q=f'Using the Bohr equation, PaCO2 = {paco2} mmHg and PECO2 = {peco2} mmHg. What is VD/VT approximately? '+choice_block([f'{x}%' for x in opts])
                a=f'Correct answer: {letter}. {pct}%\n\nCalculation:\nVD/VT = (PaCO2 − PECO2) / PaCO2\n= ({paco2} − {peco2}) / {paco2} = {ratio:.2f} ≈ {pct}%\n\nExplanation:\nOption {letter} is the closest match.'
        else: # multi variable volume choice, target VC
            vt=random.choice([300,400,500]); erv=random.choice([800,1000,1200]); frc=random.choice([1800,2000,2200]);
            if frc<=erv: continue
            rv=frc-erv; tlc=random.choice([5000,5500,6000]); vc=tlc-rv
            correct=f'RV = {rv} mL; VC = {vc} mL'
            opts=[correct,f'RV = {rv+500} mL; VC = {vc-500} mL',f'RV = {rv} mL; VC = {vc+500} mL',f'RV = {erv} mL; VC = {tlc-erv} mL']
            random.shuffle(opts); letter=chr(65+opts.index(correct))
            if zh:
                q=f'已知 TLC = {tlc} mL、VT = {vt} mL、ERV = {erv} mL、FRC = {frc} mL，何者正確？ '+choice_block(opts)
                a=f'正確答案：{letter}. {correct}\n\n計算：\nRV = FRC − ERV = {frc} − {erv} = {rv} mL\nVC = TLC − RV = {tlc} − {rv} = {vc} mL\n\n解釋：\n兩個數值都與選項 {letter} 完全一致。'
            else:
                q=f'Given TLC = {tlc} mL, VT = {vt} mL, ERV = {erv} mL, and FRC = {frc} mL, which option is correct? '+choice_block(opts)
                a=f'Correct answer: {letter}. {correct}\n\nCalculation:\nRV = FRC − ERV = {frc} − {erv} = {rv} mL\nVC = TLC − RV = {tlc} − {rv} = {vc} mL\n\nExplanation:\nBoth values match option {letter}.'
        if q in seen:
            continue
        seen.add(q)
        out.append(record(q,a,'multiple_choice_calculation',lang,{'answer_letter':letter}))
    return out

def numerical_examples(n=96):
    out=[]; seen=set(); i=0
    while len(out)<n:
        zh=(i%2==0); lang='zh-TW' if zh else 'en-US'; k=i%6
        i += 1
        if k==0:
            erv=random.randrange(600,1301,50); rv=random.randrange(700,1501,50); frc=erv+rv
            q=(f'FRC 為 {frc} mL、ERV 為 {erv} mL，請計算 RV。' if zh else f'FRC is {frc} mL and ERV is {erv} mL. Calculate RV.')
            a=(f'答案：\n{rv} mL\n\n計算：\nFRC = ERV + RV\nRV = {frc} − {erv} = {rv} mL' if zh else f'Answer:\n{rv} mL\n\nCalculation:\nFRC = ERV + RV\nRV = {frc} − {erv} = {rv} mL')
        elif k==1:
            vt=random.randrange(300,651,25); rr=random.randrange(8,23); ve=vt*rr
            q=(f'VT = {vt} mL、呼吸頻率 = {rr} breaths/min，計算 VE。' if zh else f'VT = {vt} mL and respiratory rate = {rr} breaths/min. Calculate VE.')
            a=(f'答案：\n{ve} mL/min\n\n計算：\nVE = VT × f = {vt} × {rr} = {ve} mL/min' if zh else f'Answer:\n{ve} mL/min\n\nCalculation:\nVE = VT × f = {vt} × {rr} = {ve} mL/min')
        elif k==2:
            vt=random.randrange(350,651,25); vd=random.randrange(100,min(226,vt),25); rr=random.randrange(8,23); va=(vt-vd)*rr
            q=(f'VT = {vt} mL、VD = {vd} mL、呼吸頻率 = {rr} breaths/min，計算 VA。' if zh else f'VT = {vt} mL, VD = {vd} mL, and respiratory rate = {rr} breaths/min. Calculate VA.')
            a=(f'答案：\n{va} mL/min\n\n計算：\nVA = (VT − VD) × f = ({vt} − {vd}) × {rr} = {va} mL/min' if zh else f'Answer:\n{va} mL/min\n\nCalculation:\nVA = (VT − VD) × f = ({vt} − {vd}) × {rr} = {va} mL/min')
        elif k==3:
            rv=random.randrange(700,1501,50); vc=random.randrange(3200,5201,100); tlc=rv+vc
            q=(f'TLC = {tlc} mL、RV = {rv} mL，計算 VC。' if zh else f'TLC = {tlc} mL and RV = {rv} mL. Calculate VC.')
            a=(f'答案：\n{vc} mL\n\n計算：\nVC = TLC − RV = {tlc} − {rv} = {vc} mL' if zh else f'Answer:\n{vc} mL\n\nCalculation:\nVC = TLC − RV = {tlc} − {rv} = {vc} mL')
        elif k==4:
            irv=random.randrange(1800,3301,100); vt=random.randrange(300,651,50); ic=irv+vt
            q=(f'IRV = {irv} mL、VT = {vt} mL，計算 IC。' if zh else f'IRV = {irv} mL and VT = {vt} mL. Calculate IC.')
            a=(f'答案：\n{ic} mL\n\n計算：\nIC = IRV + VT = {irv} + {vt} = {ic} mL' if zh else f'Answer:\n{ic} mL\n\nCalculation:\nIC = IRV + VT = {irv} + {vt} = {ic} mL')
        else:
            paco2=random.choice([36,38,40,42,44,46,48]); peco2=random.choice([16,18,20,22,24,26,28,30])
            if peco2>=paco2: continue
            ratio=(paco2-peco2)/paco2; pct=round(ratio*100)
            q=(f'PaCO2 = {paco2} mmHg、PECO2 = {peco2} mmHg，使用 Bohr equation 計算 VD/VT。' if zh else f'PaCO2 = {paco2} mmHg and PECO2 = {peco2} mmHg. Use the Bohr equation to calculate VD/VT.')
            a=(f'答案：\n約 {pct}%\n\n計算：\nVD/VT = (PaCO2 − PECO2) / PaCO2 = ({paco2} − {peco2}) / {paco2} = {ratio:.2f} ≈ {pct}%' if zh else f'Answer:\nApproximately {pct}%\n\nCalculation:\nVD/VT = (PaCO2 − PECO2) / PaCO2 = ({paco2} − {peco2}) / {paco2} = {ratio:.2f} ≈ {pct}%')
        if q in seen: continue
        seen.add(q); out.append(record(q,a,'numerical_calculation',lang))
    return out

KNOWLEDGE=[
 ('什麼是功能肺餘量 FRC？','What is functional residual capacity FRC?','FRC 是正常被動呼氣結束後仍留在肺內的氣體容積，且 FRC = ERV + RV。','FRC is the volume of gas remaining in the lungs at the end of a normal passive expiration, and FRC = ERV + RV.'),
 ('什麼是殘氣量 RV？','What is residual volume RV?','RV 是最大呼氣後仍留在肺內、無法再主動呼出的氣體容積。','RV is the volume of gas remaining in the lungs after a maximal expiration and cannot be voluntarily exhaled further.'),
 ('什麼是肺活量 VC？','What is vital capacity VC?','VC 是最大吸氣後可以呼出的最大氣體容積，等於 IRV + VT + ERV。','VC is the maximum volume that can be exhaled after a maximal inspiration and equals IRV + VT + ERV.'),
 ('什麼是全肺容量 TLC？','What is total lung capacity TLC?','TLC 是最大吸氣末肺內的總氣體容積，等於 VC + RV。','TLC is the total volume of gas in the lungs at maximal inspiration and equals VC + RV.'),
 ('什麼是肺泡通氣量 VA？','What is alveolar ventilation VA?','VA 是每分鐘真正到達可進行氣體交換肺泡的新鮮氣體量，VA = (VT − VD) × 呼吸頻率。','VA is the volume of fresh gas reaching gas-exchanging alveoli per minute, VA = (VT − VD) × respiratory rate.'),
 ('什麼是每分鐘通氣量 VE？','What is minute ventilation VE?','VE 是每分鐘進出呼吸系統的總氣體量，VE = VT × 呼吸頻率。','VE is the total volume of gas moved into or out of the respiratory system per minute, VE = VT × respiratory rate.'),
 ('什麼是生理死腔？','What is physiologic dead space?','生理死腔是沒有參與有效氣體交換的通氣容積，包括解剖死腔與肺泡死腔。','Physiologic dead space is ventilated volume that does not participate effectively in gas exchange and includes anatomic plus alveolar dead space.'),
 ('什麼是跨肺壓 PL？','What is transpulmonary pressure PL?','跨肺壓是肺泡壓與肋膜間壓之差，PL = Pal − Ppl，代表肺的擴張壓。','Transpulmonary pressure is the difference between alveolar and pleural pressure, PL = Pal − Ppl, and represents the lung-distending pressure.'),
 ('什麼是肺順應性？','What is lung compliance?','肺順應性描述肺在壓力改變下的容積變化程度，定義為 ΔV/ΔP。','Lung compliance describes the change in lung volume for a given pressure change and is defined as ΔV/ΔP.'),
 ('什麼是肺彈性回縮力？','What is lung elastic recoil?','肺彈性回縮力是肺組織與肺泡表面張力產生、使肺傾向向內縮小的力量。','Lung elastic recoil is the inward force generated by lung tissue elasticity and alveolar surface tension that tends to reduce lung volume.'),
 ('什麼是 V/Q 比值？','What is the V/Q ratio?','V/Q 是肺泡通氣量與肺灌流量的比值，用來描述通氣與血流的匹配程度。','V/Q is the ratio of alveolar ventilation to pulmonary perfusion and describes how well ventilation and blood flow are matched.'),
 ('什麼是肺泡表面活性劑？','What is pulmonary surfactant?','肺泡表面活性劑是由第二型肺泡上皮細胞分泌、可降低肺泡表面張力的物質。','Pulmonary surfactant is secreted by type II alveolar epithelial cells and lowers alveolar surface tension.'),
 ('什麼是 DLCO？','What is DLCO?','DLCO 是肺對一氧化碳的擴散能力，臨床上用來反映肺泡－毛細血管氣體轉移能力。','DLCO is the diffusing capacity of the lung for carbon monoxide and is used clinically to reflect alveolar-capillary gas transfer.'),
 ('什麼是肺泡低通氣？','What is alveolar hypoventilation?','肺泡低通氣是相對於代謝產生的 CO2 而言，肺泡有效通氣不足，通常會使 PaCO2 上升。','Alveolar hypoventilation is inadequate effective alveolar ventilation relative to metabolic CO2 production and typically raises PaCO2.'),
 ('什麼是肺泡過度通氣？','What is alveolar hyperventilation?','肺泡過度通氣是相對於 CO2 產生量而言，肺泡有效通氣過多，通常會使 PaCO2 下降。','Alveolar hyperventilation is excessive effective alveolar ventilation relative to CO2 production and typically lowers PaCO2.'),
 ('什麼是肺內分流？','What is an intrapulmonary shunt?','肺內分流是血流通過缺乏有效通氣的肺區，使血液未充分氧合即進入動脈循環。','An intrapulmonary shunt is blood flow through lung regions with inadequate ventilation, allowing incompletely oxygenated blood to enter the arterial circulation.'),
]

def knowledge_examples(n=96):
    out=[]
    i=0
    while len(out)<n:
        zh=(i%2==0); item=KNOWLEDGE[(i//2)%len(KNOWLEDGE)]; lang='zh-TW' if zh else 'en-US'
        q=item[0] if zh else item[1]; ans=item[2] if zh else item[3]
        variant=(i//(2*len(KNOWLEDGE)))%3
        if zh:
            if variant==1: q='請簡要說明：'+q
            elif variant==2: q='在呼吸生理學中，'+q
            a=f'問題：\n{q}\n\n回答：\n{ans}'
        else:
            if variant==1: q='Briefly define: '+q
            elif variant==2: q='In respiratory physiology, '+q
            a=f'Question:\n{q}\n\nAnswer:\n{ans}'
        out.append(record(q,a,'knowledge_conceptual',lang)); i+=1
    return out

MECHANISMS=[
 ('為什麼肺纖維化會使 FRC 下降？','Why does pulmonary fibrosis decrease FRC?','肺纖維化使肺順應性下降、向內彈性回縮力增加，因此肺與胸壁的平衡點移向較低肺容積，FRC 下降。','Pulmonary fibrosis decreases lung compliance and increases inward elastic recoil, shifting the lung-chest wall equilibrium to a lower volume and decreasing FRC.'),
 ('為什麼肺氣腫會使 FRC 上升？','Why does emphysema increase FRC?','肺氣腫破壞彈性組織，使肺彈性回縮力下降、順應性增加，因此平衡肺容積上升，FRC 增加。','Emphysema destroys elastic tissue, reducing elastic recoil and increasing compliance, so the equilibrium lung volume and FRC rise.'),
 ('為什麼表面活性劑可以增加肺順應性？','Why does surfactant increase lung compliance?','表面活性劑降低肺泡氣液界面的表面張力，因此需要較小壓力即可產生相同容積變化，肺順應性增加。','Surfactant lowers surface tension at the alveolar air-liquid interface, so less pressure is required for the same volume change and compliance increases.'),
 ('為什麼直立時肺尖的 V/Q 較高？','Why is V/Q higher at the apex in an upright lung?','重力使通氣與灌流都由肺底往肺尖下降，但灌流下降的比例更大，因此肺尖的 V/Q 較高。','Gravity decreases both ventilation and perfusion from base to apex, but perfusion falls proportionally more, so apical V/Q is higher.'),
 ('為什麼肺泡低通氣會使 PaCO2 上升？','Why does alveolar hypoventilation increase PaCO2?','在 CO2 產生量相近時，肺泡有效通氣下降會減少 CO2 排除，因此 PaCO2 上升。','At a similar CO2 production rate, reduced effective alveolar ventilation decreases CO2 elimination, causing PaCO2 to rise.'),
 ('為什麼肺泡過度通氣會使 PaCO2 下降？','Why does alveolar hyperventilation decrease PaCO2?','在 CO2 產生量相近時，肺泡有效通氣增加會加速 CO2 排除，因此 PaCO2 下降。','At a similar CO2 production rate, increased effective alveolar ventilation removes CO2 faster, causing PaCO2 to fall.'),
 ('為什麼氣道半徑變小會使氣道阻力增加？','Why does a smaller airway radius increase airway resistance?','氣道縮窄會大幅增加氣流受到的黏滯阻力，因此在相同壓差下氣流下降、氣道阻力增加。','Airway narrowing markedly increases viscous resistance to airflow, so flow falls for the same pressure gradient and airway resistance rises.'),
 ('為什麼 β2 受體刺激會降低氣道阻力？','Why does beta-2 receptor stimulation reduce airway resistance?','β2 受體刺激使氣道平滑肌放鬆，支氣管擴張、半徑增加，因此氣道阻力下降。','Beta-2 receptor stimulation relaxes airway smooth muscle, causing bronchodilation and a larger airway radius, which reduces resistance.'),
 ('為什麼肺纖維化會降低 DLCO？','Why does pulmonary fibrosis reduce DLCO?','肺纖維化使肺間質增厚並破壞有效交換結構，增加擴散距離，因此肺泡－毛細血管的氣體轉移能力下降。','Fibrosis thickens the interstitium and disrupts effective exchange structure, increasing diffusion distance and reducing alveolar-capillary gas transfer.'),
 ('為什麼低 V/Q 區域容易造成低血氧？','Why do low-V/Q regions tend to cause hypoxemia?','低 V/Q 代表相對於血流而言通氣不足，因此離開該區的血液氧合不充分，混合後會降低動脈氧合。','Low V/Q means ventilation is insufficient relative to perfusion, so blood leaving that region is incompletely oxygenated and lowers arterial oxygenation after mixing.'),
 ('為什麼高 V/Q 區域可視為無效通氣增加？','Why can high-V/Q regions represent increased wasted ventilation?','高 V/Q 代表相對於通氣而言灌流不足，因此部分通氣沒有足夠血流參與氣體交換，呈現類似肺泡死腔的效應。','High V/Q means perfusion is insufficient relative to ventilation, so some ventilation lacks enough blood flow for gas exchange and behaves like alveolar dead space.'),
 ('為什麼安靜吸氣時 Ppl 會變得更負？','Why does pleural pressure Ppl become more negative during quiet inspiration?','吸氣肌收縮使胸腔擴張，胸壁向外拉動肋膜，使肋膜間壓下降並變得更負，增加跨肺壓以擴張肺。','Inspiratory muscle contraction expands the thorax and pulls the pleura outward, making pleural pressure more negative and increasing transpulmonary pressure to expand the lung.'),
]

def mechanism_examples(n=96):
    out=[]; i=0
    while len(out)<n:
        zh=(i%2==0); item=MECHANISMS[(i//2)%len(MECHANISMS)]; lang='zh-TW' if zh else 'en-US'; q=item[0] if zh else item[1]; ans=item[2] if zh else item[3]
        variant=(i//(2*len(MECHANISMS)))%4
        if zh:
            if variant==1: q='請解釋：'+q
            elif variant==2: q='從呼吸生理機轉來看，'+q
            elif variant==3: q='請用生理機轉回答：'+q
            conclusion=ans.split('因此')[-1].strip(' ，。')+'。' if '因此' in ans else ans
            a=f'問題：\n{q}\n\n回答：\n{conclusion}\n\n機轉：\n{ans}'
        else:
            if variant==1: q='Explain: '+q
            elif variant==2: q='From a respiratory-physiology mechanism perspective, '+q
            elif variant==3: q='Answer using the physiological mechanism: '+q
            lower=ans.lower()
            conclusion=ans
            for marker in [', so ', ', causing ', ', which ']:
                pos=lower.rfind(marker)
                if pos>=0:
                    tail=ans[pos+len(marker):].strip()
                    if tail:
                        conclusion=tail[0].upper()+tail[1:]
                    break
            a=f'Question:\n{q}\n\nAnswer:\n{conclusion}\n\nMechanism:\n{ans}'
        out.append(record(q,a,'mechanism_explanation',lang)); i+=1
    return out

def course_training_examples():
    """Regular course-aligned SFT rows.

    These examples are part of the main training corpus. They are not stored in a
    separate priority/gold file and receive no repeat weighting.
    """
    rows=[]
    rows.append(record(
        '請問肺纖維化的病人，其功能肺餘量(FRC)會如何變化？原因為何？ A. 增加；肋膜間壓(Ppl)的壓力變小 B. 增加；肋膜間壓(Ppl)的壓力變大 C. 減少；肺泡壓(Pal)與肋膜間壓(Ppl)的壓力差變大 D. 減少；肺泡壓(Pal)與肋膜間壓(Ppl)的壓力差變小 E. 不變；跨肺壓(PL)與跨胸壁壓(Pw)的力矩相等',
        '正確答案：C. 減少；肺泡壓(Pal)與肋膜間壓(Ppl)的壓力差變大\n\n解釋：\n肺纖維化使肺順應性下降、向內彈性回縮力增加，因此肺與胸壁的平衡肺容積下降，FRC 減少。跨肺壓 PL = Pal − Ppl；纖維化後需要較大的跨肺壓來維持肺擴張，因此 Pal 與 Ppl 的壓力差變大。',
        'multiple_choice_conceptual','zh-TW'))
    rows.append(record(
        '已知每分鐘通氣量 VE = 8000 mL/min、潮氣容積 VT = 400 mL、死腔容積 VD = 200 mL，肺泡通氣量 VA 為多少？ A. 1000 mL/min B. 2000 mL/min C. 3000 mL/min D. 4000 mL/min E. 8000 mL/min',
        '正確答案：D. 4000 mL/min\n\n計算：\nf = VE / VT = 8000 / 400 = 20 breaths/min\nVA = (VT − VD) × f = (400 − 200) × 20 = 4000 mL/min\n\n解釋：\n計算結果與選項 D 完全一致。',
        'multiple_choice_calculation','zh-TW'))
    rows.append(record(
        '已知 TLC = 5500 mL、VT = 300 mL、ERV = 1000 mL、FRC = 2000 mL，下列何者正確？ A. RV = 500 mL；VC = 5000 mL B. RV = 1000 mL；VC = 4500 mL C. RV = 1500 mL；VC = 4000 mL D. RV = 2000 mL；VC = 3500 mL',
        '正確答案：B. RV = 1000 mL；VC = 4500 mL\n\n計算：\nRV = FRC − ERV = 2000 − 1000 = 1000 mL\nVC = TLC − RV = 5500 − 1000 = 4500 mL\n\n解釋：\nRV 與 VC 兩個計算結果都與選項 B 完全一致。',
        'multiple_choice_calculation','zh-TW'))
    rows.append(record(
        '使用 Bohr equation，若 PaCO2 = 40 mmHg、混合呼出氣 PCO2 (PECO2) = 30 mmHg，VD/VT 為多少？ A. 10% B. 25% C. 50% D. 75%',
        '正確答案：B. 25%\n\n計算：\nVD/VT = (PaCO2 − PECO2) / PaCO2 = (40 − 30) / 40 = 0.25 = 25%\n\n解釋：\n因此答案為 B。',
        'multiple_choice_calculation','zh-TW'))
    # Additional ordinary course-aligned rows from normal instructor test material.
    # They are part of the same main SFT corpus with no priority flag or repeat weighting.
    rows.extend([
      record('正常成人在安靜呼吸時，潮氣量（Tidal Volume, VT）約為多少？ A. 150 mL B. 300 mL C. 500 mL D. 1000 mL',
             '正確答案：C. 500 mL\n\n解釋：\n正常成人安靜呼吸時，每次正常吸入或呼出的潮氣量約為 500 mL，因此選 C。','multiple_choice_conceptual','zh-TW'),
      record('下列那些肺臟與胸壁的活動會造成胸腔內的壓力低於大氣壓？①肺臟與胸壁均往外拉開 ②肺臟往內回彈（recoil）及胸壁向外擴張 ③胸壁向外擴張，與肺臟遠離 A. ①②③ B. 僅①③ C. 僅②③ D. 僅①②',
             '正確答案：C. 僅②③\n\n解釋：\n肺向內的彈性回縮力與胸壁向外的回縮／擴張趨勢彼此拉離，使胸膜腔形成低於大氣壓的負壓；②與③符合此力學關係。','multiple_choice_conceptual','zh-TW'),
      record('正常人平靜呼吸時，其功能肺餘量（FRC）占全肺量（TLC）的多少%？ A. 80 B. 60 C. 40 D. 20',
             '正確答案：C. 40\n\n計算：\nFRC/TLC ≈ 2300/5800 ≈ 0.40 = 40%\n\n解釋：\n因此最符合的選項是 C。','multiple_choice_calculation','zh-TW'),
      record('當氣喘病人的呼吸頻率增加，最容易發生下列何種現象？ A. 肺動態順應性（Cdyn）增加 B. 肺動態順應性（Cdyn）減低 C. 肺靜態順應性（Cst）增加 D. 肺靜態順應性（Cst）減低',
             '正確答案：B. 肺動態順應性（Cdyn）減低\n\n解釋：\n氣喘造成氣道阻力增加；呼吸頻率加快時，部分肺單位來不及充分充盈與排空，動態順應性較容易下降。','multiple_choice_conceptual','zh-TW'),
      record('下列何種臨床情況會對周邊化學受體（peripheral chemoreceptor）產生刺激而引起呼吸加速？ A. 肺炎導致的低氧血症 B. 貧血 C. 一氧化碳中毒 D. 咖啡中毒',
             '正確答案：A. 肺炎導致的低氧血症\n\n解釋：\n周邊動脈化學受體主要受到動脈血 PaO2 降低的刺激。肺炎可造成真正的低氧血症而降低 PaO2；貧血與一氧化碳中毒主要降低血液攜氧內容量，PaO2 不一定相應下降。','multiple_choice_conceptual','zh-TW'),
      record('攝氏37度1大氣壓下，氧與二氧化碳的溶解係數分別為 0.0244、0.592 mL/mmHg/mL H2O；在1/2大氣壓下，二氧化碳的溶解係數約為氧的多少倍？ A. 12.5 B. 25 C. 6.25 D. 50',
             '正確答案：B. 25\n\n計算：\n0.592 / 0.0244 ≈ 24.3，約為 25 倍。\n\n解釋：\n在相同溫度與溶劑下，降低環境壓力會改變依 Henry 定律溶解的氣體量，但不會把兩種氣體的溶解係數比值減半。','multiple_choice_calculation','zh-TW'),
      record('在正常安靜呼吸時，吸氣主要是由下列哪一個肌肉收縮所造成？ A. 腹直肌 B. 橫膈膜 C. 內肋間肌 D. 胸鎖乳突肌',
             '正確答案：B. 橫膈膜\n\n解釋：\n正常安靜吸氣主要由橫膈膜收縮並向下移動，使胸腔容積增加而產生吸氣。','multiple_choice_conceptual','zh-TW')
    ])
    return rows

def split_balanced(examples):
    by={}
    for e in examples: by.setdefault(e['type'],[]).append(e)
    train=[]; val=[]; test=[]
    for typ,items in sorted(by.items()):
        random.shuffle(items)
        # 96 each -> 72 / 12 / 12
        train += items[:72]; val += items[72:84]; test += items[84:96]
    random.shuffle(train); random.shuffle(val); random.shuffle(test)
    return train,val,test

def write_jsonl(path,items):
    with open(path,'w',encoding='utf-8') as f:
        for x in items: f.write(json.dumps(x,ensure_ascii=False)+'\n')

all_examples=[]
all_examples += mcq_conceptual_examples(96)
all_examples += calc_mcq_examples(96)
all_examples += numerical_examples(96)
all_examples += knowledge_examples(96)
all_examples += mechanism_examples(96)
train,val,test=split_balanced(all_examples)
# Course-aligned examples are normal members of the main training corpus.
# They are not a separate gold/priority dataset and are not repeated or up-weighted.
train += course_training_examples()
random.shuffle(train)
write_jsonl(OUT/'train.jsonl',train); write_jsonl(OUT/'val.jsonl',val); write_jsonl(OUT/'test.jsonl',test)
manifest={'seed':SEED,'total':len(train)+len(val)+len(test),'train':len(train),'validation':len(val),'test':len(test),'per_type_total':{t:sum(1 for x in (train+val+test) if x['type']==t) for t in sorted(set(x['type'] for x in (train+val+test)))},'purpose':'behavior/style SFT; course examples are integrated into the main corpus; factual grounding remains RAG at inference time','languages':['zh-TW','en-US']}
(OUT/'dataset_manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
# Remove obsolete separate priority/gold data if it exists from an earlier build.
obsolete=OUT/'teacher_gold.jsonl'
if obsolete.exists(): obsolete.unlink()
print(json.dumps(manifest,ensure_ascii=False,indent=2))
