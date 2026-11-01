/* v156 PPT-aligned questions supporting stem-only direct answers and option-level feedback. */
(function(store){
  'use strict';
  store.pptQuestions = [
  {
    "id": "ppt-s05-minute-ventilation-double-rr",
    "slide": 5,
    "course": "ventilation",
    "question": "當呼吸速率增加 2 倍時，每分鐘通氣量如何變化？",
    "aliases": [
      "請問當呼吸速率增加2倍時, 每分鐘通氣量如何變化?",
      "呼吸速率增加2倍 每分鐘通氣量",
      "respiratory rate doubles minute ventilation",
      "呼吸頻率加倍 minute ventilation"
    ],
    "answer": "在 tidal volume（VT）不變時，minute ventilation（VE）增加為 2 倍。",
    "rationale": "VE = VT × f；當 VT 固定而 respiratory frequency（f）加倍，VE 也按比例加倍。",
    "equation": "VE = VT × f。",
    "questionType": "multiple_choice",
    "choices": [
      "增加2倍",
      "增加3倍",
      "減少2倍",
      "不變"
    ],
    "correctIndex": 0,
    "choiceRationales": [
      "在 tidal volume 不變時，VE = VT × f；呼吸速率加倍會使每分鐘通氣量加倍。",
      "公式中只有呼吸速率增加為 2 倍，沒有任何條件可使 VE 增加為 3 倍。",
      "呼吸速率增加會提高而不是降低每分鐘通氣量。",
      "只要 VT 不變，f 改變就會直接改變 VE，因此不會維持不變。"
    ]
  },
  {
    "id": "ppt-s06-alveolar-ventilation-double-rr",
    "slide": 6,
    "course": "ventilation",
    "question": "當呼吸速率增加 2 倍時，肺泡通氣量如何變化？",
    "aliases": [
      "請問當呼吸速率增加2倍時, 肺泡通氣量如何變化?",
      "呼吸速率增加2倍 肺泡通氣量",
      "respiratory rate doubles alveolar ventilation",
      "呼吸頻率加倍 alveolar ventilation"
    ],
    "answer": "在 VT 與 dead-space volume（VD）不變時，alveolar ventilation（VA）增加為 2 倍。",
    "rationale": "VA = (VT − VD) × f；有效每口氣體積不變時，f 加倍會使 VA 加倍。",
    "equation": "VA = (VT − VD) × f。",
    "questionType": "multiple_choice",
    "choices": [
      "增加2倍",
      "增加3倍",
      "減少2倍",
      "不變"
    ],
    "correctIndex": 0,
    "choiceRationales": [
      "在 VT 與 VD 不變時，VA = (VT − VD) × f；呼吸速率加倍會使肺泡通氣量加倍。",
      "有效每口氣量沒有改變，只有 f 加倍，因此 VA 不會增加為 3 倍。",
      "呼吸速率增加會增加有效肺泡通氣，而不是使其減少。",
      "只要 VT、VD 固定，f 的改變必然使 VA 同比例改變。"
    ]
  },
  {
    "id": "ppt-s08-pco2-double-va",
    "slide": 8,
    "course": "ventilation",
    "question": "當肺泡通氣量增加 2 倍時，二氧化碳分壓如何變化？",
    "aliases": [
      "請問當肺泡通氣量增加2倍時, 二氧化碳分壓(PCO2)如何變化?",
      "肺泡通氣量增加2倍 二氧化碳分壓",
      "alveolar ventilation doubles PCO2",
      "VA doubles PaCO2"
    ],
    "answer": "在 CO2 production（VCO2）不變時，PaCO2／PACO2 約降為原來的一半。",
    "rationale": "PaCO2 與 VA 呈反比；有效肺泡通氣加倍，CO2 清除加倍，因此穩態 PaCO2 約減半。",
    "equation": "PaCO2 ∝ VCO2 / VA。",
    "questionType": "multiple_choice",
    "choices": [
      "增加2倍",
      "增加3倍",
      "減少2倍",
      "不變"
    ],
    "correctIndex": 2,
    "choiceRationales": [
      "PaCO2 與 VA 呈反比；VA 增加時 PaCO2 應下降，不會增加。",
      "PaCO2 不會因 VA 加倍而增加為 3 倍；方向與反比關係相反。",
      "在 VCO2 不變時，VA 加倍使 PaCO2 約降至原來的一半；投影片用「減少2倍」表達此結果。",
      "只要 CO2 production 不變，VA 改變就會改變 PaCO2，因此不會保持不變。"
    ]
  },
  {
    "id": "ppt-s10-pao2-double-pco2",
    "directAnswer": "依投影片採用的選項值，肺泡氧分壓約為 53.3 mmHg；按投影片公式與顯示參數精算約落在 49.6–53.3 mmHg。",
    "slide": 10,
    "course": "alveolar_gas",
    "question": "當二氧化碳分壓增加為 2 倍時，肺泡氧分壓變為多少？",
    "aliases": [
      "請問當二氧化碳分壓增加為2倍時, 肺泡氧分壓變為多少?",
      "二氧化碳分壓增加2倍 肺泡氧分壓",
      "PCO2 doubles PAO2",
      "PaCO2 double alveolar oxygen"
    ],
    "answer": "正確選項為 B：53.3 mmHg。依投影片模型，PACO2 約為 83.04 mmHg、R=0.83，計算 PAO2 約為 49.63–53.25 mmHg，選項取 53.3 mmHg。",
    "rationale": "Alveolar gas equation 中 PaCO2/R 是扣除項；PaCO2 加倍會明顯降低 PAO2。",
    "equation": "PAO2 = FiO2(Patm − PH2O) − PaCO2/R；投影片示例約為 149.68 − 83.04/0.83 ≈ 49.6 mmHg。",
    "questionType": "multiple_choice",
    "choices": [
      "100 mmHg",
      "53.3 mmHg",
      "149.7 mmHg",
      "40 mmHg"
    ],
    "correctIndex": 1,
    "choiceRationales": [
      "100 mmHg 接近正常基準 PAO2，但忽略 PaCO2 加倍後 alveolar gas equation 中扣除項增加。",
      "依投影片參數：PIO2 約 149.68 mmHg、PACO2 約 83.04 mmHg、R=0.83，PAO2 約 49.63–53.25 mmHg，因此選 53.3 mmHg。",
      "149.7 mmHg 是 humidified inspired PO2，尚未扣除 CO2/R，不是肺泡氧分壓。",
      "40 mmHg 是常用的正常 PaCO2 基準值，不是本題計算所得的 PAO2。"
    ]
  },
  {
    "id": "ppt-s12-fio2-double-pco2",
    "slide": 12,
    "course": "alveolar_gas",
    "question": "當受試者吸入 2 倍濃度的氧後，二氧化碳分壓如何變化？",
    "aliases": [
      "請問當受試者吸入2倍濃度的氧後,二氧化碳分壓如何變化?",
      "吸入2倍濃度氧 二氧化碳分壓",
      "double inspired oxygen PCO2",
      "FiO2 doubles PaCO2"
    ],
    "answer": "若 alveolar ventilation 與 CO2 production 不變，PaCO2 不會因 FiO2 加倍而直接改變。",
    "rationale": "FiO2 主要改變 PIO2 與 PAO2；PaCO2 主要由 VCO2 與 VA 決定。",
    "equation": "PaCO2 ∝ VCO2 / VA，而不是由 FiO2 直接決定。",
    "questionType": "multiple_choice",
    "choices": [
      "增加2倍",
      "增加4倍",
      "減少2倍",
      "不變"
    ],
    "correctIndex": 3,
    "choiceRationales": [
      "FiO2 主要影響 PIO2 與 PAO2；在 VA 與 VCO2 不變時，不會使 PaCO2 加倍。",
      "PaCO2 並不由 FiO2 直接決定，因此更不會增加為 4 倍。",
      "提高 FiO2 本身不會讓 CO2 production 或 alveolar ventilation 加倍，因此不會使 PaCO2 減半。",
      "PaCO2 主要由 VCO2/VA 決定；兩者不變時，FiO2 加倍不會直接改變 PaCO2。"
    ]
  },
  {
    "id": "ppt-s14-restore-paco2-40",
    "slide": 14,
    "course": "ventilation",
    "question": "如何把 PaCO2 改回 40 mmHg？",
    "aliases": [
      "How to change Paco2 back to 40 mmHg?",
      "如何把Paco2改回40",
      "How to change PaCO2 back to 40",
      "PaCO2 back to 40"
    ],
    "answer": "依投影片的模擬條件，可把 O2 uptake 從 300 降回 150 mL/min，使相關 CO2 production 降低，PaCO2 回到約 40 mmHg。",
    "rationale": "在 VA 固定時，PaCO2 隨 CO2 production 增加而上升；降低代謝產生的 CO2 可使 PaCO2 回降。",
    "equation": "PaCO2 ∝ VCO2 / VA。",
    "questionType": "open_ended",
    "workedSteps": [
      "在 alveolar ventilation 固定時，PaCO2 與 CO2 production（VCO2）成正比。",
      "投影片把 O2 uptake 由 150 增至 300 mL/min，相關 VCO2 增加，使 PaCO2 約由 40 上升至 80 mmHg。",
      "將 O2 uptake 由 300 降回 150 mL/min，可使 VCO2 約減半，PaCO2 回到約 40 mmHg。"
    ]
  },
  {
    "id": "ppt-s16-double-vt-pco2",
    "slide": 16,
    "course": "ventilation",
    "question": "當潮氣容積增加 2 倍時，二氧化碳分壓如何變化？",
    "aliases": [
      "請問當潮氣容積增加2倍時, 二氧化碳分壓(PCO2)如何變化?",
      "潮氣容積增加2倍 二氧化碳分壓",
      "tidal volume doubles PCO2",
      "VT doubles PaCO2"
    ],
    "answer": "嚴格計算結果為 PaCO2 約由 40 降至 16.5 mmHg，即下降超過 2 倍、降至原值約 41%；投影片四個選項沒有一個文字完全精確。",
    "rationale": "Dead space 不會隨 VT 同比例消失，因此 PaCO2 與 VT 並非簡單反比。若只要讓 PaCO2 降至 20 mmHg，投影片計算所需 VT 約 850 mL。",
    "equation": "VA基準=(0.50−0.15)×15=5.25 L/min；VA新值=(1.00−0.15)×15=12.75 L/min；PaCO2新值≈40×5.25/12.75≈16.5 mmHg。",
    "questionType": "multiple_choice",
    "choices": [
      "增加2倍",
      "減少，但倍數小於2倍",
      "減少2倍",
      "不變"
    ],
    "correctIndex": null,
    "bestAvailableIndex": 1,
    "answerStatus": "no_exact_option",
    "choiceRationales": [
      "VT 增加會提高 VA，因此 PaCO2 應下降而不是增加。",
      "「減少」的方向正確，但「倍數小於2倍」與投影片後續計算不一致。以 VT 500→1000 mL、VD 150 mL、f 15/min 計算，PaCO2 約由 40 降至 16.5 mmHg，屬下降超過 2 倍、降至原值約 41%。若此選項原意是「降至不到一半」，才可視為最接近。",
      "PaCO2 不是剛好減半；因 dead space 固定，VT 加倍使 VA 增加約 2.43 倍，PaCO2 約降至 16.5 mmHg。",
      "VT 改變會改變有效 alveolar ventilation，因此 PaCO2 不會維持不變。"
    ]
  },
  {
    "id": "ppt-s19-shunt-increase-gases",
    "directAnswer": "分流增加時，PaO2 下降；PaCO2 通常僅小幅上升或接近不變，視整體通氣代償而定。",
    "slide": 19,
    "course": "shunt",
    "question": "當分流比例增加時，肺泡後血管氧分壓及二氧化碳分壓如何變化？",
    "aliases": [
      "請問當分流(shunt)比例增加時,肺泡後血管氧分壓及二氧化碳分壓如何變化?",
      "分流比例增加 氧分壓 二氧化碳分壓",
      "shunt fraction increases PO2 PCO2",
      "increased shunt arterial gases"
    ],
    "answer": "四個選項中以 D 最佳：氧分壓下降、二氧化碳分壓上升；但更精確地說，PaCO2 通常只小幅上升或接近不變。",
    "rationale": "Shunted blood 未接觸有效通氣肺泡，會拉低 arterial oxygenation；但 mixed venous 與 arterial PCO2 差距較小，且可由未分流肺區增加 CO2 排除，因此 PaCO2 受影響較少。",
    "equation": "Shunt 主要造成 refractory hypoxemia；PaCO2 不一定同步明顯上升。",
    "questionType": "multiple_choice",
    "choices": [
      "氧分壓上升，二氧化碳分壓下降",
      "氧分壓上升，二氧化碳分壓上升",
      "氧分壓下降，二氧化碳分壓下降",
      "氧分壓下降，二氧化碳分壓上升"
    ],
    "correctIndex": 3,
    "precisionNote": "D 是四個選項中的最佳答案；更精確地說，PaO2 明顯下降，而 PaCO2 通常僅小幅上升或接近不變。",
    "choiceRationales": [
      "Shunt 增加會讓未氧合血混入動脈血，因此 PaO2 不會上升；此選項兩個方向都不符合。",
      "PaCO2 可輕微上升，但 PaO2 應下降而不是上升。",
      "PaO2 下降正確，但 shunt blood 的 PCO2 較高，混合後 PaCO2 不應以「下降」概括。",
      "這是最佳選項：PaO2 下降；PaCO2 因混合較高 PCO2 的靜脈血而可小幅上升，但通常變化不大。"
    ]
  },
  {
    "id": "ppt-s21-shunt-high-oxygen",
    "slide": 21,
    "course": "shunt",
    "question": "分流造成動脈氧分壓降低時，吸入高濃度氧後動脈氧分壓如何變化？",
    "aliases": [
      "當受試者動脈氧分壓降低的原因是分流(shunt)所致,請問讓他吸入高濃度的氧後,動脈氧分壓的影響如何?",
      "分流 高濃度氧 動脈氧分壓",
      "shunt high concentration oxygen PaO2",
      "supplemental oxygen true shunt"
    ],
    "answer": "通常只小幅上升，改善有限，不會像 low V/Q 那樣明顯。",
    "rationale": "分流血液完全繞過有效通氣肺泡，FiO2 再高也無法直接氧合這部分血流；只能提高未分流血液的氧含量。",
    "equation": "投影片示例 PaO2 約由 54.1 上升至 59.0 mmHg。",
    "questionType": "multiple_choice",
    "choices": [
      "明顯上升",
      "明顯下降",
      "幾乎不變"
    ],
    "correctIndex": 2,
    "choiceRationales": [
      "True shunt 的血流沒有接觸有效通氣肺泡，高 FiO2 只能改善未分流部分，因此不會明顯上升。",
      "提高 FiO2 不會使 PaO2 明顯下降；方向錯誤。",
      "這是最佳答案。投影片示例僅由約 54.1 升至 59.0 mmHg，屬小幅改善、可概括為幾乎不變。"
    ]
  },
  {
    "id": "ppt-s23-shunt-caco2",
    "slide": 23,
    "course": "shunt",
    "question": "Shunt fraction 為 0.3 時，如何用 shunt equation 計算 post-capillary oxygen content？",
    "aliases": [
      "Shunt fraction is 0.3. Calculate post-capillary oxygen content using the shunt equation.",
      "shunt fraction 0.3 CcO2",
      "分流比例0.3 肺微血管氧含量",
      "calculate post capillary O2 content"
    ],
    "answer": "依投影片數值代入 shunt equation，CcO2 約為 19.86 mL/dL。",
    "rationale": "將 Qs/Qt、CaO2 與 CvO2 代入後，解出理想肺泡末端微血管 oxygen content。",
    "equation": "Qs/Qt = (CcO2 − CaO2)/(CcO2 − CvO2)。",
    "questionType": "open_ended",
    "workedSteps": [
      "使用 Qs/Qt = (CcO2 − CaO2)/(CcO2 − CvO2)。",
      "代入 0.30 = (CcO2 − 17.52)/(CcO2 − 12.07)。",
      "整理：0.30CcO2 − 3.621 = CcO2 − 17.52。",
      "0.70CcO2 = 13.899，因此 CcO2 ≈ 19.86 mL/dL。"
    ]
  },
  {
    "id": "ppt-s25-low-vq-gases",
    "slide": 25,
    "course": "low_vq",
    "question": "當肺的 V/Q 降低時，肺泡後微血管的二氧化碳分壓及氧分壓如何變化？",
    "aliases": [
      "請問當肺的V/Q降低時, 肺泡後微血管的二氧化碳分壓及氧分壓如何變化?",
      "V/Q降低 肺泡後微血管 PCO2 PO2",
      "low VQ end capillary gases",
      "low V/Q PCO2 PO2"
    ],
    "answer": "End-capillary PCO2 上升，PO2 下降。",
    "rationale": "Ventilation 相對 perfusion 不足，使該肺區 CO2 排除變差、O2 補充不足，局部肺泡與末端微血管氣體往 mixed venous values 靠近。",
    "equation": "V/Q↓ → PACO2/PcCO2↑，PAO2/PcO2↓。",
    "questionType": "multiple_choice",
    "choices": [
      "二氧化碳分壓增加，氧分壓減少",
      "二氧化碳分壓減少，氧分壓減少",
      "二氧化碳分壓增加，氧分壓增加",
      "二氧化碳分壓減少，氧分壓增加"
    ],
    "correctIndex": 0,
    "choiceRationales": [
      "Low V/Q 表示 ventilation 相對 perfusion 不足，局部 CO2 排除下降、O2 補充不足，因此 PCO2 上升、PO2 下降。",
      "PO2 下降正確，但通氣不足會使 CO2 累積，PCO2 應上升而不是下降。",
      "PCO2 上升正確，但 O2 補充不足使 PO2 下降，不會上升。",
      "這是 high V/Q 的典型方向，不是 low V/Q。"
    ]
  },
  {
    "id": "ppt-s27-high-vq-gases",
    "slide": 27,
    "course": "high_vq",
    "question": "當肺的 V/Q 上升時，肺泡後微血管的二氧化碳分壓及氧分壓如何變化？",
    "aliases": [
      "請問當肺的V/Q上升時, 肺泡後微血管的二氧化碳分壓及氧分壓如何變化?",
      "V/Q上升 肺泡後微血管 PCO2 PO2",
      "high VQ end capillary gases",
      "high V/Q PCO2 PO2"
    ],
    "answer": "局部 end-capillary PCO2 下降，PO2 上升。",
    "rationale": "Ventilation 相對 perfusion 過多，局部肺泡氣體更接近 inspired gas；但因該區血流少，對整體 arterial oxygenation 的補償有限。",
    "equation": "V/Q↑ → PACO2/PcCO2↓，PAO2/PcO2↑。",
    "questionType": "multiple_choice",
    "choices": [
      "二氧化碳分壓增加，氧分壓減少",
      "二氧化碳分壓減少，氧分壓減少",
      "二氧化碳分壓增加，氧分壓增加",
      "二氧化碳分壓減少，氧分壓增加"
    ],
    "correctIndex": 3,
    "choiceRationales": [
      "此方向符合 low V/Q，而不是 high V/Q。",
      "High V/Q 會使 PCO2 下降，但局部 PO2 應上升而不是下降。",
      "局部 PO2 上升正確，但過度通氣相對少血流會降低 PCO2，不會使其上升。",
      "High V/Q 使局部肺泡氣體接近 inspired gas，因此 PCO2 下降、PO2 上升。"
    ]
  },
  {
    "id": "ppt-s29-high-vq-fixed-total-va",
    "slide": 29,
    "course": "high_vq",
    "question": "當肺的 V/Q 上升且肺泡通氣量保持不變時，動脈血二氧化碳分壓如何變化？",
    "aliases": [
      "請問當肺的V/Q上升時, 若肺泡通氣量保持不變, 動脈充氧血的二氧化碳分壓如何變化?",
      "V/Q上升 肺泡通氣量保持不變 動脈二氧化碳",
      "high VQ fixed ventilation arterial PCO2",
      "dead space fixed minute ventilation PaCO2"
    ],
    "answer": "Arterial PaCO2 會上升。",
    "rationale": "High V/Q／dead-space-like 區域造成 wasted ventilation；若 total minute ventilation 沒有代償增加，有效 alveolar ventilation 下降，CO2 清除不足。",
    "equation": "有效 VA↓ → PaCO2↑。",
    "questionType": "multiple_choice",
    "choices": [
      "增加",
      "減少",
      "不變"
    ],
    "correctIndex": 0,
    "choiceRationales": [
      "High V/Q／dead-space-like 區域增加 wasted ventilation；若總通氣未代償，有效 VA 下降，PaCO2 上升。",
      "PaCO2 只有在有效 alveolar ventilation 增加時才會下降；本題恰好相反。",
      "總通氣量雖固定，但有效通氣因 dead-space ventilation 增加而下降，因此 PaCO2 不會不變。"
    ]
  },
  {
    "id": "ppt-s31-dead-space-components",
    "slide": 31,
    "course": "high_vq",
    "question": "Physiological dead space ratio 為 0.37 時，anatomic dead space ratio 與 alveolar dead space ratio 是多少？",
    "aliases": [
      "Riley Model shows a physiological dead space ratio of 0.37, plus a shunt ratio of 0.30. Calculate the normal anatomic dead space ratio and alveolar dead space ratio?",
      "physiological dead space 0.37 anatomic alveolar ratio",
      "生理死腔0.37 解剖死腔 肺泡死腔",
      "Riley Model dead space ratio 0.37"
    ],
    "answer": "Anatomic dead space ratio = 0.30；alveolar dead space ratio = 0.07。",
    "rationale": "Physiologic dead space = anatomic dead space + alveolar dead space。以 VD=150 mL、VT=500 mL，anatomic ratio=150/500=0.30；因此 alveolar ratio=0.37−0.30=0.07。",
    "equation": "VDphys/VT = VDanat/VT + VDalv/VT。",
    "questionType": "open_ended",
    "workedSteps": [
      "Physiologic VD/VT = anatomic VD/VT + alveolar VD/VT。",
      "Anatomic dead-space ratio = 150/500 = 0.30。",
      "Alveolar dead-space ratio = 0.37 − 0.30 = 0.07。"
    ]
  },
  {
    "id": "ppt-s32-bohr-peco2",
    "slide": 32,
    "course": "high_vq",
    "question": "Physiological dead space ratio 為 0.37 時，expired CO2（PECO2）是多少？",
    "aliases": [
      "Riley Model shows a physiological dead space ratio of 0.37, what is the value of expired CO2 (PeCO2)?",
      "physiological dead space 0.37 PECO2",
      "生理死腔0.37 呼出二氧化碳",
      "Bohr equation PECO2 44.76"
    ],
    "answer": "PECO2 約為 28.2 mmHg。",
    "rationale": "由 Bohr equation 0.37=(44.76−PECO2)/44.76，解得 PECO2=44.76×(1−0.37)≈28.2。",
    "equation": "VD/VT = (PACO2 − PECO2)/PACO2。",
    "questionType": "open_ended",
    "workedSteps": [
      "Bohr equation：VD/VT = (PACO2 − PECO2)/PACO2。",
      "代入 0.37 = (44.76 − PECO2)/44.76。",
      "PECO2 = 44.76 × (1 − 0.37) ≈ 28.2 mmHg。"
    ]
  },
  {
    "id": "ppt-s34-diffusion-aa-gradients",
    "slide": 34,
    "course": "diffusion",
    "question": "當肺的擴散效率變差時，A-a oxygen difference 及二氧化碳分壓差如何變化？",
    "aliases": [
      "請問當肺的擴散效率變差時, 肺泡與動脈間的氧分壓差(A-a difference)及二氧化碳分壓差如何變化?",
      "擴散效率變差 A-a difference 二氧化碳分壓差",
      "diffusion worsens A-a O2 CO2 gradient",
      "low diffusion capacity gradients"
    ],
    "answer": "A-a O2 difference 增加；CO2 的 alveolar–arterial gradient 通常仍很小、沒有顯著增加。",
    "rationale": "O2 較容易在 transit time 或 membrane diffusion 受限時無法完全平衡；CO2 的 diffusibility 較高，通常仍能快速達到近似平衡。",
    "equation": "Diffusion limitation → PaO2↓、A-a O2 gradient↑；A-a CO2 gradient 通常不明顯。",
    "questionType": "multiple_choice",
    "choices": [
      "氧分壓差減少，二氧化碳分壓差不變",
      "氧分壓差增加，二氧化碳分壓差不變",
      "氧分壓差不變，二氧化碳分壓差增加",
      "氧分壓差不變，二氧化碳分壓差減少"
    ],
    "correctIndex": 1,
    "choiceRationales": [
      "Diffusion limitation 會讓 capillary PO2 無法完全平衡，使 A-a O2 difference 增加而不是減少。",
      "O2 diffusion 受限使 A-a O2 difference 增加；CO2 擴散能力較高，通常不形成顯著 A-a CO2 gradient。",
      "O2 gradient 不會維持不變；CO2 gradient 通常也不會顯著增加。",
      "主要變化是 A-a O2 difference 增加，而不是不變；CO2 gradient 通常仍很小。"
    ]
  },
  {
    "id": "ppt-s37-reduce-aa-diffusion",
    "slide": 37,
    "course": "diffusion",
    "question": "當肺的擴散效率變差時，如何減少 A-a oxygen difference？",
    "aliases": [
      "請問當肺的擴散效率變差時,如何減少肺泡與動脈間的氧分壓差(A-a difference)?",
      "擴散效率變差 如何減少A-a difference",
      "reduce A-a gradient diffusion limitation",
      "diffusion limitation increase FiO2"
    ],
    "answer": "提高 FiO2，可提高 PAO2 與 diffusion driving pressure，改善 capillary equilibration，降低 A-a oxygen difference。",
    "rationale": "提高 alveolar PO2 會增加跨膜氧分壓梯度；相對地，exercise 增加 O2 uptake 並縮短 transit time，可能使問題更明顯。",
    "equation": "FiO2↑ → PAO2↑ → O2 diffusion gradient↑。",
    "questionType": "multiple_choice",
    "choices": [
      "運動增加血流量",
      "做過度換氣",
      "吸高濃度的氧氣",
      "噘嘴吐氣"
    ],
    "correctIndex": 2,
    "choiceRationales": [
      "運動會增加 O2 uptake 並縮短 capillary transit time，可能使 diffusion limitation 更明顯。",
      "過度換氣可降低 PaCO2、提高 PAO2，但投影片指定的直接方法是提高 FiO2；單靠換氣不能修復 membrane diffusion capacity。",
      "提高 FiO2 可提高 PAO2 與跨膜 O2 driving pressure，促進 capillary equilibration，降低 A-a O2 difference。",
      "噘嘴吐氣主要用於減少動態氣道塌陷與改善呼氣，不是本題降低 diffusion-related A-a difference 的直接方法。"
    ]
  },
  {
    "id": "ppt-s40-low-cardiac-output",
    "slide": 40,
    "course": "perfusion",
    "question": "若 cardiac output 下降而其他條件不變，blood gas values 如何變化？",
    "aliases": [
      "If cardiac output falls with everything else held constant, how will blood gas values change?",
      "cardiac output falls blood gas values",
      "心輸出量下降 血氣",
      "cardiac output decreases PaO2 PvO2"
    ],
    "answer": "PaO2 通常可維持不變；但 systemic oxygen delivery 下降，組織 extraction 增加，使 mixed venous PO2 與 SvO2 下降。",
    "rationale": "Arterial gas tension 主要由肺泡氣體與肺交換決定；cardiac output 下降首先影響的是 DO2 與 venous return 的氧合狀態。",
    "equation": "DO2 = QT × CaO2；QT↓ → DO2↓ → PvO2/SvO2↓（若 VO2 不變）。",
    "questionType": "open_ended",
    "workedSteps": [
      "肺泡氣體與肺交換條件不變時，PaO2 與 PaCO2 可大致維持。",
      "DO2 = cardiac output × CaO2；cardiac output 下降使 systemic oxygen delivery 下降。",
      "組織為維持 VO2 會提高 extraction，因此 mixed venous PO2 與 SvO2 下降。",
      "投影片示例中 PaO2 約維持 101.8 mmHg；PvO2 可由 39.5 降至 34.0、28.7 mmHg，SvO2 由 71.4% 降至 61.3%、48.9%。"
    ]
  },
  {
    "id": "ppt-s41-anemia-gas-exchange",
    "slide": 41,
    "course": "oxygen_content",
    "question": "Anemia 如何影響 gas exchange？",
    "aliases": [
      "How does anemia affect gas exchange?",
      "anemia affect gas exchange",
      "貧血如何影響氣體交換",
      "anemia PaO2 CaO2 SvO2"
    ],
    "answer": "PaO2 可維持正常，但 CaO2 與 oxygen delivery 下降；若代謝需求不變，組織 extraction 增加，PvO2 與 SvO2 可能下降。",
    "rationale": "Blood-gas analyzer 的 PaO2 反映 plasma dissolved oxygen，不直接代表 hemoglobin-bound oxygen。Anemia 降低 Hb，因此降低總氧含量與運送能力。",
    "equation": "CaO2 ≈ 1.34×Hb×SaO2 + 0.003×PaO2；DO2 = QT×CaO2。",
    "questionType": "open_ended",
    "workedSteps": [
      "PaO2 是溶解在 plasma 中的氧分壓；Hb 下降不一定改變 PaO2。",
      "CaO2 ≈ 1.34×Hb×SaO2 + 0.003×PaO2；Hb 下降會直接降低 CaO2。",
      "DO2 下降後，組織 extraction 增加，使 PvO2 與 SvO2 下降。",
      "投影片示例中 Hb 15→10→7.5 g/dL 時，PaO2 約維持 101.8 mmHg；PvO2 39.5→31.6→25.7 mmHg，SvO2 71.4%→58.4%→45.5%。"
    ]
  }
];
})(window.VQ_KB_DATA);
