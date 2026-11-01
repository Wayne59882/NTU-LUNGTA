/* v154 KB data: alveolar_gas (1000 items). */
(function(store){
  'use strict';
  store.courses["alveolar_gas"] = [
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "definition",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "A-a gradient 需要先計算 PAO2，再比較 PaO2。 白話說，這題在問「A-a setup 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 1
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "definition",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "PaCO2 會反向影響 PAO2。 白話說，這題在問「CO2 effect on PAO2 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 2
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "definition",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "FIO2 是吸入氧氣分率。 白話說，這題在問「FIO2 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 3
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "definition",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。 白話說，這題在問「PH2O 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 4
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "definition",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "R 是 CO2 production / O2 consumption 比值。 白話說，這題在問「R exchange ratio 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 5
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "definition",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "高海拔低氧來自 barometric pressure 下降。 白話說，這題在問「altitude hypoxemia 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 6
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "definition",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "肺泡氣方程式估計肺泡氧分壓。 白話說，這題在問「alveolar gas equation 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 7
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "definition",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "Patm 是大氣壓，影響 inspired oxygen pressure。 白話說，這題在問「barometric pressure 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 8
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "definition",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "低通氣可使 PAO2 降低。 白話說，這題在問「hypoxemia from hypoventilation 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 9
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "definition",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "oxygenation 是血液取得氧氣的結果。 白話說，這題在問「oxygenation 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 10
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "definition",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "oxygenation 與 ventilation 是不同問題。 白話說，這題在問「oxygenation ventilation distinction 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 11
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "definition",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "main KB item oxygen 提高 FIO2。 白話說，這題在問「main KB item oxygen 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 12
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "definition",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 13
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "definition",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 14
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "definition",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 15
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "definition",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 16
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "definition",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 17
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "definition",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 18
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "definition",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 19
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "definition",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 20
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "definition",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 21
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "definition",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 22
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "definition",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 23
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "definition",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 24
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "definition",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 25
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "definition",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 26
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "definition",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 27
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "definition",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 28
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "definition",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 29
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "definition",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 30
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "definition",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 31
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "definition",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 32
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "definition",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 33
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "definition",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 34
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "definition",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 35
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "definition",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 36
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "definition",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 37
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "definition",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 38
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "definition",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 39
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "definition",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 40
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "definition",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 41
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "definition",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 42
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "definition",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 43
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "definition",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 44
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "definition",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 45
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "definition",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 46
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "definition",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 47
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "definition",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 48
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "definition",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 49
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "definition",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 50
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "definition",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 51
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "definition",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 52
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "definition",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 53
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "definition",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 54
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "definition",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 55
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "definition",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 56
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "definition",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 57
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "definition",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 58
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "definition",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 59
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "definition",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 60
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "definition",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 61
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "definition",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 62
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "definition",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 63
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "definition",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 64
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "definition",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 65
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "definition",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 66
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "definition",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 67
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "definition",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 68
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "definition",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 69
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "definition",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 70
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "definition",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 71
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "definition",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 72
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "definition",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：A-a gradient 需要先計算 PAO2，再比較 PaO2。 白話說，這題在問「A-a setup 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 73
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "definition",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：PaCO2 會反向影響 PAO2。 白話說，這題在問「CO2 effect on PAO2 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 74
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "definition",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：FIO2 是吸入氧氣分率。 白話說，這題在問「FIO2 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 75
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "definition",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：PH2O 是水蒸氣壓，體溫下約 47 mmHg。 白話說，這題在問「PH2O 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 76
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "definition",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：R 是 CO2 production / O2 consumption 比值。 白話說，這題在問「R exchange ratio 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 77
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "definition",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：高海拔低氧來自 barometric pressure 下降。 白話說，這題在問「altitude hypoxemia 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 78
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "definition",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：肺泡氣方程式估計肺泡氧分壓。 白話說，這題在問「alveolar gas equation 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 79
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "definition",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：Patm 是大氣壓，影響 inspired oxygen pressure。 白話說，這題在問「barometric pressure 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 80
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "definition",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：低通氣可使 PAO2 降低。 白話說，這題在問「hypoxemia from hypoventilation 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 81
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "definition",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：oxygenation 是血液取得氧氣的結果。 白話說，這題在問「oxygenation 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 82
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "definition",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：oxygenation 與 ventilation 是不同問題。 白話說，這題在問「oxygenation ventilation distinction 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 83
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "definition",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "是什麼",
      "意思",
      "definition",
      "what is",
      "define",
      "何謂"
    ],
    "content": "用白話講：main KB item oxygen 提高 FIO2。 白話說，這題在問「main KB item oxygen 是什麼」，回答要先給定義，再補它在 課程 3：Alveolar Gas Equation 與 Oxygenation 中的位置。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 84
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "equation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "A-a setup 對應的公式或方向式是：A-a = PAO2 - PaO2。 解釋時要說明每個變項如何影響結果。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 85
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "equation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "CO2 effect on PAO2 對應的公式或方向式是：PAO2 = PIO2 - PaCO2/R。 解釋時要說明每個變項如何影響結果。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 86
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "equation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "FIO2 對應的公式或方向式是：PIO2 = FIO2 × (Patm - PH2O)。 解釋時要說明每個變項如何影響結果。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 87
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "equation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "PH2O 對應的公式或方向式是：PIO2 = FIO2(Patm - 47)。 解釋時要說明每個變項如何影響結果。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 88
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "equation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "R exchange ratio 對應的公式或方向式是：PAO2 = PIO2 - PaCO2/R。 解釋時要說明每個變項如何影響結果。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 89
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "equation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "altitude hypoxemia 對應的公式或方向式是：PIO2 = FIO2(Patm-PH2O)。 解釋時要說明每個變項如何影響結果。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 90
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "equation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "alveolar gas equation 對應的公式或方向式是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。 解釋時要說明每個變項如何影響結果。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 91
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "equation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "barometric pressure 對應的公式或方向式是：PIO2 = FIO2(Patm-PH2O)。 解釋時要說明每個變項如何影響結果。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 92
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "equation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "hypoxemia from hypoventilation 對應的公式或方向式是：PaCO2↑ → PAO2↓。 解釋時要說明每個變項如何影響結果。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 93
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "equation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "oxygenation 對應的公式或方向式是：可用 PaO2、SaO2、A-a gradient 判斷。 解釋時要說明每個變項如何影響結果。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 94
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "equation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "oxygenation ventilation distinction 對應的公式或方向式是：PaO2 看 oxygenation；PaCO2 看 ventilation。 解釋時要說明每個變項如何影響結果。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 95
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "equation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "main KB item oxygen 對應的公式或方向式是：FIO2↑ → PIO2↑ → PAO2↑。 解釋時要說明每個變項如何影響結果。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 96
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "equation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 97
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "equation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 98
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "equation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 99
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "equation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 100
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "equation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 101
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "equation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 102
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "equation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 103
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "equation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 104
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "equation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 105
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "equation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 106
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "equation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 107
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "equation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 108
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "equation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 109
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "equation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 110
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "equation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 111
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "equation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 112
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "equation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 113
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "equation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 114
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "equation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 115
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "equation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 116
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "equation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 117
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "equation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 118
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "equation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 119
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "equation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 120
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "equation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 121
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "equation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 122
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "equation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 123
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "equation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 124
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "equation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 125
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "equation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 126
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "equation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 127
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "equation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 128
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "equation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 129
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "equation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 130
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "equation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 131
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "equation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 132
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "equation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 133
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "equation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 134
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "equation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 135
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "equation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 136
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "equation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 137
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "equation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 138
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "equation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 139
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "equation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 140
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "equation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 141
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "equation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 142
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "equation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 143
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "equation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 144
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "equation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 145
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "equation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 146
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "equation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 147
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "equation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 148
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "equation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 149
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "equation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 150
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "equation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 151
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "equation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 152
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "equation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 153
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "equation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 154
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "equation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 155
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "equation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 156
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "equation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：A-a setup 對應的公式或方向式是：A-a = PAO2 - PaO2。 解釋時要說明每個變項如何影響結果。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 157
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "equation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：CO2 effect on PAO2 對應的公式或方向式是：PAO2 = PIO2 - PaCO2/R。 解釋時要說明每個變項如何影響結果。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 158
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "equation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：FIO2 對應的公式或方向式是：PIO2 = FIO2 × (Patm - PH2O)。 解釋時要說明每個變項如何影響結果。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 159
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "equation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：PH2O 對應的公式或方向式是：PIO2 = FIO2(Patm - 47)。 解釋時要說明每個變項如何影響結果。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 160
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "equation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：R exchange ratio 對應的公式或方向式是：PAO2 = PIO2 - PaCO2/R。 解釋時要說明每個變項如何影響結果。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 161
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "equation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：altitude hypoxemia 對應的公式或方向式是：PIO2 = FIO2(Patm-PH2O)。 解釋時要說明每個變項如何影響結果。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 162
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "equation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：alveolar gas equation 對應的公式或方向式是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。 解釋時要說明每個變項如何影響結果。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 163
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "equation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：barometric pressure 對應的公式或方向式是：PIO2 = FIO2(Patm-PH2O)。 解釋時要說明每個變項如何影響結果。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 164
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "equation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：hypoxemia from hypoventilation 對應的公式或方向式是：PaCO2↑ → PAO2↓。 解釋時要說明每個變項如何影響結果。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 165
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "equation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：oxygenation 對應的公式或方向式是：可用 PaO2、SaO2、A-a gradient 判斷。 解釋時要說明每個變項如何影響結果。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 166
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "equation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：oxygenation ventilation distinction 對應的公式或方向式是：PaO2 看 oxygenation；PaCO2 看 ventilation。 解釋時要說明每個變項如何影響結果。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 167
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "equation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "公式",
      "equation",
      "formula",
      "怎麼算",
      "計算式",
      "方程"
    ],
    "content": "用白話講：main KB item oxygen 對應的公式或方向式是：FIO2↑ → PIO2↑ → PAO2↑。 解釋時要說明每個變項如何影響結果。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 168
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "mechanism",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "A-a setup 的機轉是：如果 PAO2 正常但 PaO2 低，代表交換障礙。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 169
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "mechanism",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "CO2 effect on PAO2 的機轉是：PaCO2 增加時，PAO2 下降。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 170
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "mechanism",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "FIO2 的機轉是：提高 FIO2 會提高肺泡氧。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 171
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "mechanism",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "PH2O 的機轉是：吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 172
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "mechanism",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "R exchange ratio 的機轉是：R 影響 CO2 項扣除量。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 173
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "mechanism",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "altitude hypoxemia 的機轉是：Patm 降低使 PIO2/PAO2 降低。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 174
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "mechanism",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "alveolar gas equation 的機轉是：FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 175
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "mechanism",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "barometric pressure 的機轉是：Patm 降低會降低 PIO2。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 176
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "mechanism",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "hypoxemia from hypoventilation 的機轉是：CO2 retention 會透過肺泡氣方程式降低 PAO2。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 177
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "mechanism",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "oxygenation 的機轉是：PAO2 到 PaO2 的落差反映氧合障礙。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 178
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "mechanism",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "oxygenation ventilation distinction 的機轉是：給氧提高 PaO2，但 PaCO2 要靠 VA。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 179
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "mechanism",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "main KB item oxygen 的機轉是：有通氣肺泡可因給氧而提高 oxygenation。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 180
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "mechanism",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 181
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "mechanism",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 182
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "mechanism",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 183
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "mechanism",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 184
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "mechanism",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 185
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "mechanism",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 186
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "mechanism",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 187
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "mechanism",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 188
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "mechanism",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 189
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "mechanism",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 190
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "mechanism",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 191
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "mechanism",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 192
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "mechanism",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 193
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "mechanism",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 194
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "mechanism",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 195
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "mechanism",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 196
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "mechanism",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 197
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "mechanism",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 198
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "mechanism",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 199
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "mechanism",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 200
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "mechanism",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 201
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "mechanism",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 202
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "mechanism",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 203
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "mechanism",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 204
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "mechanism",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 205
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "mechanism",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 206
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "mechanism",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 207
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "mechanism",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 208
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "mechanism",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 209
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "mechanism",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 210
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "mechanism",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 211
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "mechanism",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 212
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "mechanism",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 213
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "mechanism",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 214
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "mechanism",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 215
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "mechanism",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 216
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "mechanism",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 217
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "mechanism",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 218
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "mechanism",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 219
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "mechanism",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 220
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "mechanism",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 221
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "mechanism",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 222
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "mechanism",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 223
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "mechanism",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 224
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "mechanism",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 225
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "mechanism",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 226
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "mechanism",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 227
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "mechanism",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 228
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "mechanism",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 229
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "mechanism",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 230
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "mechanism",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 231
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "mechanism",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 232
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "mechanism",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 233
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "mechanism",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 234
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "mechanism",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 235
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "mechanism",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 236
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "mechanism",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 237
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "mechanism",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 238
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "mechanism",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 239
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "mechanism",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 240
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "mechanism",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：A-a setup 的機轉是：如果 PAO2 正常但 PaO2 低，代表交換障礙。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 241
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "mechanism",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：CO2 effect on PAO2 的機轉是：PaCO2 增加時，PAO2 下降。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 242
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "mechanism",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：FIO2 的機轉是：提高 FIO2 會提高肺泡氧。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 243
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "mechanism",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：PH2O 的機轉是：吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 244
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "mechanism",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：R exchange ratio 的機轉是：R 影響 CO2 項扣除量。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 245
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "mechanism",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：altitude hypoxemia 的機轉是：Patm 降低使 PIO2/PAO2 降低。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 246
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "mechanism",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：alveolar gas equation 的機轉是：FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 247
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "mechanism",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：barometric pressure 的機轉是：Patm 降低會降低 PIO2。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 248
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "mechanism",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：hypoxemia from hypoventilation 的機轉是：CO2 retention 會透過肺泡氣方程式降低 PAO2。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 249
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "mechanism",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：oxygenation 的機轉是：PAO2 到 PaO2 的落差反映氧合障礙。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 250
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "mechanism",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：oxygenation ventilation distinction 的機轉是：給氧提高 PaO2，但 PaCO2 要靠 VA。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 251
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "mechanism",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "為什麼",
      "why",
      "原因",
      "機轉",
      "怎麼造成",
      "如何影響"
    ],
    "content": "用白話講：main KB item oxygen 的機轉是：有通氣肺泡可因給氧而提高 oxygenation。 回答時要從起點變項推到血氣或模型結果。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 252
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "model",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "A-a setup 在模型上的呈現是：數值區應列 A-a O2 Diff。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 253
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "model",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "CO2 effect on PAO2 在模型上的呈現是：模型應把 VA 與 PAO2 連起來。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 254
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "model",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "FIO2 在模型上的呈現是：調 FIO2 應改變 PAO2/PaO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 255
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "model",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "PH2O 在模型上的呈現是：模型可固定 PH2O=47。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 256
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "model",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "R exchange ratio 在模型上的呈現是：R 變化影響 PAO2 計算。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 257
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "model",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "altitude hypoxemia 在模型上的呈現是：Altitude input 應改 PAO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 258
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "model",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "alveolar gas equation 在模型上的呈現是：PAO2 應顯示在 General 數值區。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 259
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "model",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "barometric pressure 在模型上的呈現是：Altitude 變化應改變 Patm 與 PAO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 260
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "model",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "hypoxemia from hypoventilation 在模型上的呈現是：模型應同時顯示 PACO2 上升與 PAO2 下降。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 261
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "model",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "oxygenation 在模型上的呈現是：模型應列 PAO2 與 arterial PO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 262
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "model",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "oxygenation ventilation distinction 在模型上的呈現是：回答問題時應分開 PaO2 與 PaCO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 263
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "model",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "main KB item oxygen 在模型上的呈現是：模型可讓 FIO2 改變 arterial PO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 264
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "model",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 265
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "model",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 266
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "model",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 267
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "model",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 268
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "model",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 269
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "model",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 270
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "model",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 271
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "model",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 272
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "model",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 273
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "model",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 274
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "model",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 275
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "model",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 276
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "model",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 277
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "model",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 278
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "model",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 279
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "model",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 280
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "model",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 281
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "model",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 282
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "model",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 283
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "model",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 284
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "model",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 285
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "model",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 286
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "model",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 287
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "model",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 288
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "model",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 289
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "model",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 290
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "model",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 291
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "model",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 292
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "model",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 293
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "model",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 294
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "model",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 295
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "model",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 296
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "model",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 297
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "model",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 298
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "model",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 299
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "model",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 300
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "model",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 301
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "model",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 302
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "model",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 303
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "model",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 304
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "model",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 305
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "model",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 306
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "model",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 307
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "model",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 308
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "model",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 309
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "model",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 310
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "model",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 311
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "model",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 312
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "model",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 313
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "model",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 314
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "model",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 315
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "model",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 316
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "model",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 317
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "model",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 318
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "model",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 319
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "model",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 320
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "model",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 321
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "model",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 322
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "model",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 323
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "model",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 324
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "model",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：A-a setup 在模型上的呈現是：數值區應列 A-a O2 Diff。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 325
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "model",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：CO2 effect on PAO2 在模型上的呈現是：模型應把 VA 與 PAO2 連起來。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 326
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "model",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：FIO2 在模型上的呈現是：調 FIO2 應改變 PAO2/PaO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 327
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "model",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：PH2O 在模型上的呈現是：模型可固定 PH2O=47。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 328
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "model",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：R exchange ratio 在模型上的呈現是：R 變化影響 PAO2 計算。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 329
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "model",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：altitude hypoxemia 在模型上的呈現是：Altitude input 應改 PAO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 330
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "model",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：alveolar gas equation 在模型上的呈現是：PAO2 應顯示在 General 數值區。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 331
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "model",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：barometric pressure 在模型上的呈現是：Altitude 變化應改變 Patm 與 PAO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 332
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "model",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：hypoxemia from hypoventilation 在模型上的呈現是：模型應同時顯示 PACO2 上升與 PAO2 下降。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 333
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "model",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：oxygenation 在模型上的呈現是：模型應列 PAO2 與 arterial PO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 334
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "model",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：oxygenation ventilation distinction 在模型上的呈現是：回答問題時應分開 PaO2 與 PaCO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 335
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "model",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "模型",
      "肺葉",
      "圖",
      "顏色",
      "放大",
      "縮小",
      "位置"
    ],
    "content": "用白話講：main KB item oxygen 在模型上的呈現是：模型可讓 FIO2 改變 arterial PO2。 回答模型問題時要說明位置、大小、顏色與參數方向。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 336
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "clinical",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "A-a setup 的臨床意義是：A-a 協助分辨低氧原因。 回答時要把生理變化連到病人判讀。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 337
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "clinical",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "CO2 effect on PAO2 的臨床意義是：PaCO2 是通氣與氧合交會點。 回答時要把生理變化連到病人判讀。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 338
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "clinical",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "FIO2 的臨床意義是：給氧改善氧合但不直接排 CO2。 回答時要把生理變化連到病人判讀。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 339
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "clinical",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "PH2O 的臨床意義是：估 PAO2 時要扣 PH2O。 回答時要把生理變化連到病人判讀。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 340
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "clinical",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "R exchange ratio 的臨床意義是：R 有助於代謝與氣體交換估算。 回答時要把生理變化連到病人判讀。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 341
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "clinical",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "altitude hypoxemia 的臨床意義是：高海拔反應可用吸氧改善。 回答時要把生理變化連到病人判讀。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 342
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "clinical",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "alveolar gas equation 的臨床意義是：A-a gradient 判讀需要先估 PAO2。 回答時要把生理變化連到病人判讀。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 343
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "clinical",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "barometric pressure 的臨床意義是：高海拔低氧是低 inspired oxygen。 回答時要把生理變化連到病人判讀。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 344
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "clinical",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "hypoxemia from hypoventilation 的臨床意義是：治療需改善通氣，不只是給氧。 回答時要把生理變化連到病人判讀。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 345
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "clinical",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "oxygenation 的臨床意義是：氧合障礙要分機轉。 回答時要把生理變化連到病人判讀。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 346
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "clinical",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "oxygenation ventilation distinction 的臨床意義是：臨床需分開處理 oxygen 與 CO2。 回答時要把生理變化連到病人判讀。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 347
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "clinical",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "main KB item oxygen 的臨床意義是：高氧反應差提示 shunt。 回答時要把生理變化連到病人判讀。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 348
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "clinical",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 349
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "clinical",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 350
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "clinical",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 351
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "clinical",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 352
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "clinical",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 353
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "clinical",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 354
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "clinical",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 355
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "clinical",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 356
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "clinical",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 357
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "clinical",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 358
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "clinical",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 359
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "clinical",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 360
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "clinical",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 361
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "clinical",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 362
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "clinical",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 363
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "clinical",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 364
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "clinical",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 365
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "clinical",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 366
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "clinical",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 367
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "clinical",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 368
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "clinical",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 369
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "clinical",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 370
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "clinical",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 371
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "clinical",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 372
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "clinical",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 373
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "clinical",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 374
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "clinical",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 375
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "clinical",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 376
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "clinical",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 377
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "clinical",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 378
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "clinical",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 379
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "clinical",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 380
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "clinical",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 381
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "clinical",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 382
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "clinical",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 383
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "clinical",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 384
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "clinical",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 385
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "clinical",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 386
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "clinical",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 387
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "clinical",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 388
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "clinical",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 389
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "clinical",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 390
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "clinical",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 391
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "clinical",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 392
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "clinical",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 393
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "clinical",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 394
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "clinical",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 395
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "clinical",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 396
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "clinical",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 397
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "clinical",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 398
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "clinical",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 399
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "clinical",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 400
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "clinical",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 401
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "clinical",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 402
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "clinical",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 403
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "clinical",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 404
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "clinical",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 405
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "clinical",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 406
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "clinical",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 407
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "clinical",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 408
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "clinical",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：A-a setup 的臨床意義是：A-a 協助分辨低氧原因。 回答時要把生理變化連到病人判讀。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 409
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "clinical",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：CO2 effect on PAO2 的臨床意義是：PaCO2 是通氣與氧合交會點。 回答時要把生理變化連到病人判讀。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 410
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "clinical",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：FIO2 的臨床意義是：給氧改善氧合但不直接排 CO2。 回答時要把生理變化連到病人判讀。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 411
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "clinical",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：PH2O 的臨床意義是：估 PAO2 時要扣 PH2O。 回答時要把生理變化連到病人判讀。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 412
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "clinical",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：R exchange ratio 的臨床意義是：R 有助於代謝與氣體交換估算。 回答時要把生理變化連到病人判讀。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 413
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "clinical",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：altitude hypoxemia 的臨床意義是：高海拔反應可用吸氧改善。 回答時要把生理變化連到病人判讀。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 414
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "clinical",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：alveolar gas equation 的臨床意義是：A-a gradient 判讀需要先估 PAO2。 回答時要把生理變化連到病人判讀。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 415
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "clinical",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：barometric pressure 的臨床意義是：高海拔低氧是低 inspired oxygen。 回答時要把生理變化連到病人判讀。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 416
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "clinical",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：hypoxemia from hypoventilation 的臨床意義是：治療需改善通氣，不只是給氧。 回答時要把生理變化連到病人判讀。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 417
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "clinical",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：oxygenation 的臨床意義是：氧合障礙要分機轉。 回答時要把生理變化連到病人判讀。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 418
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "clinical",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：oxygenation ventilation distinction 的臨床意義是：臨床需分開處理 oxygen 與 CO2。 回答時要把生理變化連到病人判讀。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 419
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "clinical",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "臨床",
      "病人",
      "判讀",
      "低血氧",
      "治療"
    ],
    "content": "用白話講：main KB item oxygen 的臨床意義是：高氧反應差提示 shunt。 回答時要把生理變化連到病人判讀。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 420
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "example",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "A-a setup 的例子是：diffusion limitation 會增加 A-a。 可用來連結講義概念與臨床或模型情境。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 421
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "example",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "CO2 effect on PAO2 的例子是：VA 下降時 PaCO2 上升，PAO2 下降。 可用來連結講義概念與臨床或模型情境。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 422
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "example",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "FIO2 的例子是：FIO2 0.28 可改善 oxygenation。 可用來連結講義概念與臨床或模型情境。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 423
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "example",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "PH2O 的例子是：海平面 room air PIO2 約 0.21×713。 可用來連結講義概念與臨床或模型情境。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 424
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "example",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "R exchange ratio 的例子是：教學常用 R=0.8。 可用來連結講義概念與臨床或模型情境。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 425
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "example",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "altitude hypoxemia 的例子是：登高可造成低氧血症。 可用來連結講義概念與臨床或模型情境。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 426
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "example",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "alveolar gas equation 的例子是：低通氣時 PaCO2 上升，PAO2 下降。 可用來連結講義概念與臨床或模型情境。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 427
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "example",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "barometric pressure 的例子是：高海拔使 PIO2 下降。 可用來連結講義概念與臨床或模型情境。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 428
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "example",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "hypoxemia from hypoventilation 的例子是：opioid 抑制呼吸會使 PaCO2 高、PAO2 低。 可用來連結講義概念與臨床或模型情境。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 429
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "example",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "oxygenation 的例子是：V/Q mismatch 可使 PaO2 下降。 可用來連結講義概念與臨床或模型情境。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 430
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "example",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "oxygenation ventilation distinction 的例子是：COPD 病人可同時氧合差與通氣不足。 可用來連結講義概念與臨床或模型情境。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 431
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "example",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "main KB item oxygen 的例子是：diffusion limitation 可因提高梯度改善。 可用來連結講義概念與臨床或模型情境。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 432
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "example",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 433
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "example",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 434
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "example",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 435
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "example",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 436
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "example",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 437
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "example",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 438
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "example",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 439
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "example",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 440
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "example",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 441
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "example",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 442
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "example",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 443
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "example",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 444
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "example",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 445
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "example",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 446
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "example",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 447
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "example",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 448
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "example",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 449
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "example",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 450
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "example",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 451
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "example",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 452
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "example",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 453
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "example",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 454
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "example",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 455
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "example",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 456
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "example",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 457
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "example",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 458
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "example",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 459
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "example",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 460
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "example",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 461
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "example",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 462
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "example",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 463
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "example",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 464
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "example",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 465
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "example",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 466
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "example",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 467
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "example",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 468
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "example",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 469
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "example",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 470
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "example",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 471
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "example",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 472
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "example",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 473
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "example",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 474
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "example",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 475
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "example",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 476
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "example",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 477
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "example",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 478
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "example",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 479
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "example",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 480
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "example",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 481
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "example",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 482
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "example",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 483
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "example",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 484
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "example",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 485
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "example",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 486
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "example",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 487
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "example",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 488
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "example",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 489
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "example",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 490
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "example",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 491
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "example",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 492
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "example",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：A-a setup 的例子是：diffusion limitation 會增加 A-a。 可用來連結講義概念與臨床或模型情境。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 493
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "example",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：CO2 effect on PAO2 的例子是：VA 下降時 PaCO2 上升，PAO2 下降。 可用來連結講義概念與臨床或模型情境。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 494
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "example",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：FIO2 的例子是：FIO2 0.28 可改善 oxygenation。 可用來連結講義概念與臨床或模型情境。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 495
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "example",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：PH2O 的例子是：海平面 room air PIO2 約 0.21×713。 可用來連結講義概念與臨床或模型情境。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 496
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "example",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：R exchange ratio 的例子是：教學常用 R=0.8。 可用來連結講義概念與臨床或模型情境。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 497
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "example",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：altitude hypoxemia 的例子是：登高可造成低氧血症。 可用來連結講義概念與臨床或模型情境。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 498
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "example",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：alveolar gas equation 的例子是：低通氣時 PaCO2 上升，PAO2 下降。 可用來連結講義概念與臨床或模型情境。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 499
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "example",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：barometric pressure 的例子是：高海拔使 PIO2 下降。 可用來連結講義概念與臨床或模型情境。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 500
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "example",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：hypoxemia from hypoventilation 的例子是：opioid 抑制呼吸會使 PaCO2 高、PAO2 低。 可用來連結講義概念與臨床或模型情境。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 501
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "example",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：oxygenation 的例子是：V/Q mismatch 可使 PaO2 下降。 可用來連結講義概念與臨床或模型情境。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 502
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "example",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：oxygenation ventilation distinction 的例子是：COPD 病人可同時氧合差與通氣不足。 可用來連結講義概念與臨床或模型情境。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 503
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "example",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "例子",
      "例如",
      "case",
      "疾病",
      "臨床例子"
    ],
    "content": "用白話講：main KB item oxygen 的例子是：diffusion limitation 可因提高梯度改善。 可用來連結講義概念與臨床或模型情境。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 504
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "comparison",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 A-a setup 時，先看定義：A-a gradient 需要先計算 PAO2，再比較 PaO2。，再看方向或公式：A-a = PAO2 - PaO2。，最後提醒：A-a 不是 oxygen content。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 505
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "comparison",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 CO2 effect on PAO2 時，先看定義：PaCO2 會反向影響 PAO2。，再看方向或公式：PAO2 = PIO2 - PaCO2/R。，最後提醒：不要把 CO2 與 O2 完全獨立。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 506
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "comparison",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 FIO2 時，先看定義：FIO2 是吸入氧氣分率。，再看方向或公式：PIO2 = FIO2 × (Patm - PH2O)。，最後提醒：FIO2 不是 respiratory rate。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 507
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "comparison",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 PH2O 時，先看定義：PH2O 是水蒸氣壓，體溫下約 47 mmHg。，再看方向或公式：PIO2 = FIO2(Patm - 47)。，最後提醒：不能用 760×FIO2 直接當 PIO2。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 508
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "comparison",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 R exchange ratio 時，先看定義：R 是 CO2 production / O2 consumption 比值。，再看方向或公式：PAO2 = PIO2 - PaCO2/R。，最後提醒：R 不是 respiratory rate。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 509
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "comparison",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 altitude hypoxemia 時，先看定義：高海拔低氧來自 barometric pressure 下降。，再看方向或公式：PIO2 = FIO2(Patm-PH2O)。，最後提醒：高海拔不是肺泡通氣必然下降。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 510
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "comparison",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 alveolar gas equation 時，先看定義：肺泡氣方程式估計肺泡氧分壓。，再看方向或公式：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。，最後提醒：PAO2 不是 PaO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 511
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "comparison",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 barometric pressure 時，先看定義：Patm 是大氣壓，影響 inspired oxygen pressure。，再看方向或公式：PIO2 = FIO2(Patm-PH2O)。，最後提醒：高海拔不是 FIO2 下降。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 512
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "comparison",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 hypoxemia from hypoventilation 時，先看定義：低通氣可使 PAO2 降低。，再看方向或公式：PaCO2↑ → PAO2↓。，最後提醒：低通氣不一定 A-a gradient 增加。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 513
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "comparison",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 oxygenation 時，先看定義：oxygenation 是血液取得氧氣的結果。，再看方向或公式：可用 PaO2、SaO2、A-a gradient 判斷。，最後提醒：PaO2 不代表 PaCO2。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 514
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "comparison",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 oxygenation ventilation distinction 時，先看定義：oxygenation 與 ventilation 是不同問題。，再看方向或公式：PaO2 看 oxygenation；PaCO2 看 ventilation。，最後提醒：SpO2 正常不代表 ventilation 正常。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 515
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "comparison",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "比較 main KB item oxygen 時，先看定義：main KB item oxygen 提高 FIO2。，再看方向或公式：FIO2↑ → PIO2↑ → PAO2↑。，最後提醒：給氧不代表所有機轉都完全修正。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 516
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "comparison",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 517
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "comparison",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 518
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "comparison",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 519
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "comparison",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 520
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "comparison",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 521
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "comparison",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 522
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "comparison",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 523
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "comparison",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 524
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "comparison",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 525
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "comparison",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 526
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "comparison",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 527
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "comparison",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 528
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "comparison",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 529
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "comparison",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 530
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "comparison",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 531
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "comparison",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 532
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "comparison",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 533
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "comparison",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 534
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "comparison",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 535
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "comparison",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 536
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "comparison",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 537
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "comparison",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 538
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "comparison",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 539
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "comparison",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 540
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "comparison",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 541
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "comparison",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 542
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "comparison",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 543
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "comparison",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 544
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "comparison",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 545
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "comparison",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 546
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "comparison",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 547
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "comparison",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 548
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "comparison",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 549
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "comparison",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 550
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "comparison",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 551
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "comparison",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 552
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "comparison",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 553
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "comparison",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 554
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "comparison",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 555
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "comparison",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 556
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "comparison",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 557
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "comparison",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 558
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "comparison",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 559
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "comparison",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 560
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "comparison",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 561
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "comparison",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 562
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "comparison",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 563
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "comparison",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 564
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "comparison",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 565
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "comparison",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 566
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "comparison",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 567
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "comparison",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 568
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "comparison",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 569
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "comparison",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 570
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "comparison",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 571
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "comparison",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 572
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "comparison",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 573
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "comparison",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 574
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "comparison",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 575
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "comparison",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 576
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "comparison",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 A-a setup 時，先看定義：A-a gradient 需要先計算 PAO2，再比較 PaO2。，再看方向或公式：A-a = PAO2 - PaO2。，最後提醒：A-a 不是 oxygen content。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 577
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "comparison",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 CO2 effect on PAO2 時，先看定義：PaCO2 會反向影響 PAO2。，再看方向或公式：PAO2 = PIO2 - PaCO2/R。，最後提醒：不要把 CO2 與 O2 完全獨立。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 578
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "comparison",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 FIO2 時，先看定義：FIO2 是吸入氧氣分率。，再看方向或公式：PIO2 = FIO2 × (Patm - PH2O)。，最後提醒：FIO2 不是 respiratory rate。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 579
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "comparison",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 PH2O 時，先看定義：PH2O 是水蒸氣壓，體溫下約 47 mmHg。，再看方向或公式：PIO2 = FIO2(Patm - 47)。，最後提醒：不能用 760×FIO2 直接當 PIO2。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 580
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "comparison",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 R exchange ratio 時，先看定義：R 是 CO2 production / O2 consumption 比值。，再看方向或公式：PAO2 = PIO2 - PaCO2/R。，最後提醒：R 不是 respiratory rate。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 581
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "comparison",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 altitude hypoxemia 時，先看定義：高海拔低氧來自 barometric pressure 下降。，再看方向或公式：PIO2 = FIO2(Patm-PH2O)。，最後提醒：高海拔不是肺泡通氣必然下降。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 582
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "comparison",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 alveolar gas equation 時，先看定義：肺泡氣方程式估計肺泡氧分壓。，再看方向或公式：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。，最後提醒：PAO2 不是 PaO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 583
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "comparison",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 barometric pressure 時，先看定義：Patm 是大氣壓，影響 inspired oxygen pressure。，再看方向或公式：PIO2 = FIO2(Patm-PH2O)。，最後提醒：高海拔不是 FIO2 下降。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 584
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "comparison",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 hypoxemia from hypoventilation 時，先看定義：低通氣可使 PAO2 降低。，再看方向或公式：PaCO2↑ → PAO2↓。，最後提醒：低通氣不一定 A-a gradient 增加。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 585
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "comparison",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 oxygenation 時，先看定義：oxygenation 是血液取得氧氣的結果。，再看方向或公式：可用 PaO2、SaO2、A-a gradient 判斷。，最後提醒：PaO2 不代表 PaCO2。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 586
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "comparison",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 oxygenation ventilation distinction 時，先看定義：oxygenation 與 ventilation 是不同問題。，再看方向或公式：PaO2 看 oxygenation；PaCO2 看 ventilation。，最後提醒：SpO2 正常不代表 ventilation 正常。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 587
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "comparison",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "比較",
      "差別",
      "不同",
      "vs",
      "difference"
    ],
    "content": "用白話講：比較 main KB item oxygen 時，先看定義：main KB item oxygen 提高 FIO2。，再看方向或公式：FIO2↑ → PIO2↑ → PAO2↑。，最後提醒：給氧不代表所有機轉都完全修正。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 588
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "misconception",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "A-a setup 的常見錯誤是：A-a 不是 oxygen content。 正確說法要回到：如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 589
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "misconception",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "CO2 effect on PAO2 的常見錯誤是：不要把 CO2 與 O2 完全獨立。 正確說法要回到：PaCO2 增加時，PAO2 下降。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 590
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "misconception",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "FIO2 的常見錯誤是：FIO2 不是 respiratory rate。 正確說法要回到：提高 FIO2 會提高肺泡氧。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 591
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "misconception",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "PH2O 的常見錯誤是：不能用 760×FIO2 直接當 PIO2。 正確說法要回到：吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 592
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "misconception",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "R exchange ratio 的常見錯誤是：R 不是 respiratory rate。 正確說法要回到：R 影響 CO2 項扣除量。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 593
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "misconception",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "altitude hypoxemia 的常見錯誤是：高海拔不是肺泡通氣必然下降。 正確說法要回到：Patm 降低使 PIO2/PAO2 降低。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 594
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "misconception",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "alveolar gas equation 的常見錯誤是：PAO2 不是 PaO2。 正確說法要回到：FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 595
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "misconception",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "barometric pressure 的常見錯誤是：高海拔不是 FIO2 下降。 正確說法要回到：Patm 降低會降低 PIO2。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 596
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "misconception",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "hypoxemia from hypoventilation 的常見錯誤是：低通氣不一定 A-a gradient 增加。 正確說法要回到：CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 597
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "misconception",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "oxygenation 的常見錯誤是：PaO2 不代表 PaCO2。 正確說法要回到：PAO2 到 PaO2 的落差反映氧合障礙。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 598
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "misconception",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "oxygenation ventilation distinction 的常見錯誤是：SpO2 正常不代表 ventilation 正常。 正確說法要回到：給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 599
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "misconception",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "main KB item oxygen 的常見錯誤是：給氧不代表所有機轉都完全修正。 正確說法要回到：有通氣肺泡可因給氧而提高 oxygenation。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 600
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "misconception",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 601
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "misconception",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 602
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "misconception",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 603
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "misconception",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 604
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "misconception",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 605
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "misconception",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 606
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "misconception",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 607
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "misconception",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 608
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "misconception",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 609
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "misconception",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 610
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "misconception",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 611
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "misconception",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 612
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "misconception",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 613
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "misconception",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 614
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "misconception",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 615
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "misconception",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 616
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "misconception",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 617
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "misconception",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 618
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "misconception",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 619
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "misconception",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 620
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "misconception",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 621
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "misconception",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 622
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "misconception",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 623
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "misconception",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 624
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "misconception",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 625
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "misconception",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 626
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "misconception",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 627
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "misconception",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 628
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "misconception",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 629
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "misconception",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 630
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "misconception",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 631
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "misconception",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 632
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "misconception",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 633
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "misconception",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 634
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "misconception",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 635
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "misconception",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 636
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "misconception",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 637
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "misconception",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 638
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "misconception",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 639
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "misconception",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 640
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "misconception",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 641
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "misconception",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 642
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "misconception",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 643
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "misconception",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 644
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "misconception",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 645
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "misconception",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 646
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "misconception",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 647
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "misconception",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 648
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "misconception",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 649
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "misconception",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 650
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "misconception",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 651
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "misconception",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 652
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "misconception",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 653
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "misconception",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 654
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "misconception",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 655
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "misconception",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 656
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "misconception",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 657
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "misconception",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 658
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "misconception",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 659
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "misconception",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 660
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "misconception",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：A-a setup 的常見錯誤是：A-a 不是 oxygen content。 正確說法要回到：如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 661
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "misconception",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：CO2 effect on PAO2 的常見錯誤是：不要把 CO2 與 O2 完全獨立。 正確說法要回到：PaCO2 增加時，PAO2 下降。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 662
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "misconception",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：FIO2 的常見錯誤是：FIO2 不是 respiratory rate。 正確說法要回到：提高 FIO2 會提高肺泡氧。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 663
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "misconception",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：PH2O 的常見錯誤是：不能用 760×FIO2 直接當 PIO2。 正確說法要回到：吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 664
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "misconception",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：R exchange ratio 的常見錯誤是：R 不是 respiratory rate。 正確說法要回到：R 影響 CO2 項扣除量。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 665
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "misconception",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：altitude hypoxemia 的常見錯誤是：高海拔不是肺泡通氣必然下降。 正確說法要回到：Patm 降低使 PIO2/PAO2 降低。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 666
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "misconception",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：alveolar gas equation 的常見錯誤是：PAO2 不是 PaO2。 正確說法要回到：FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 667
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "misconception",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：barometric pressure 的常見錯誤是：高海拔不是 FIO2 下降。 正確說法要回到：Patm 降低會降低 PIO2。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 668
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "misconception",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：hypoxemia from hypoventilation 的常見錯誤是：低通氣不一定 A-a gradient 增加。 正確說法要回到：CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 669
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "misconception",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：oxygenation 的常見錯誤是：PaO2 不代表 PaCO2。 正確說法要回到：PAO2 到 PaO2 的落差反映氧合障礙。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 670
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "misconception",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：oxygenation ventilation distinction 的常見錯誤是：SpO2 正常不代表 ventilation 正常。 正確說法要回到：給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 671
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "misconception",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "錯在哪",
      "常見錯誤",
      "誤解",
      "不是",
      "為什麼不是"
    ],
    "content": "用白話講：main KB item oxygen 的常見錯誤是：給氧不代表所有機轉都完全修正。 正確說法要回到：有通氣肺泡可因給氧而提高 oxygenation。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 672
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "calculation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 A-a setup 時，先取公式：A-a = PAO2 - PaO2。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 673
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "calculation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 CO2 effect on PAO2 時，先取公式：PAO2 = PIO2 - PaCO2/R。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 674
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "calculation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 FIO2 時，先取公式：PIO2 = FIO2 × (Patm - PH2O)。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 675
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "calculation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 PH2O 時，先取公式：PIO2 = FIO2(Patm - 47)。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 676
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "calculation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 R exchange ratio 時，先取公式：PAO2 = PIO2 - PaCO2/R。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 677
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "calculation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 altitude hypoxemia 時，先取公式：PIO2 = FIO2(Patm-PH2O)。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 678
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "calculation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 alveolar gas equation 時，先取公式：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 679
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "calculation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 barometric pressure 時，先取公式：PIO2 = FIO2(Patm-PH2O)。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 680
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "calculation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 hypoxemia from hypoventilation 時，先取公式：PaCO2↑ → PAO2↓。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 681
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "calculation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 oxygenation 時，先取公式：可用 PaO2、SaO2、A-a gradient 判斷。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 682
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "calculation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 oxygenation ventilation distinction 時，先取公式：PaO2 看 oxygenation；PaCO2 看 ventilation。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 683
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "calculation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "計算 main KB item oxygen 時，先取公式：FIO2↑ → PIO2↑ → PAO2↑。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 684
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "calculation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 685
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "calculation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 686
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "calculation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 687
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "calculation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 688
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "calculation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 689
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "calculation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 690
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "calculation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 691
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "calculation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 692
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "calculation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 693
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "calculation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 694
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "calculation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 695
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "calculation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 696
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "calculation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 697
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "calculation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 698
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "calculation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 699
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "calculation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 700
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "calculation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 701
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "calculation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 702
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "calculation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 703
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "calculation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 704
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "calculation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 705
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "calculation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 706
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "calculation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 707
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "calculation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 708
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "calculation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 709
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "calculation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 710
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "calculation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 711
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "calculation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 712
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "calculation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 713
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "calculation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 714
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "calculation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 715
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "calculation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 716
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "calculation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 717
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "calculation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 718
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "calculation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 719
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "calculation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 720
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "calculation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 721
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "calculation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 722
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "calculation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 723
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "calculation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 724
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "calculation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 725
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "calculation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 726
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "calculation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 727
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "calculation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 728
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "calculation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 729
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "calculation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 730
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "calculation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 731
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "calculation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 732
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "calculation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 733
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "calculation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 734
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "calculation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 735
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "calculation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 736
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "calculation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 737
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "calculation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 738
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "calculation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 739
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "calculation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 740
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "calculation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 741
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "calculation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 742
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "calculation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 743
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "calculation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 744
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "calculation",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 A-a setup 時，先取公式：A-a = PAO2 - PaO2。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 745
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "calculation",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 CO2 effect on PAO2 時，先取公式：PAO2 = PIO2 - PaCO2/R。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 746
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "calculation",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 FIO2 時，先取公式：PIO2 = FIO2 × (Patm - PH2O)。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 747
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "calculation",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 PH2O 時，先取公式：PIO2 = FIO2(Patm - 47)。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 748
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "calculation",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 R exchange ratio 時，先取公式：PAO2 = PIO2 - PaCO2/R。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 749
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "calculation",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 altitude hypoxemia 時，先取公式：PIO2 = FIO2(Patm-PH2O)。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 750
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "calculation",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 alveolar gas equation 時，先取公式：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 751
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "calculation",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 barometric pressure 時，先取公式：PIO2 = FIO2(Patm-PH2O)。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 752
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "calculation",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 hypoxemia from hypoventilation 時，先取公式：PaCO2↑ → PAO2↓。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 753
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "calculation",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 oxygenation 時，先取公式：可用 PaO2、SaO2、A-a gradient 判斷。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 754
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "calculation",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 oxygenation ventilation distinction 時，先取公式：PaO2 看 oxygenation；PaCO2 看 ventilation。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 755
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "calculation",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "計算",
      "帶入",
      "數值",
      "calculate"
    ],
    "content": "用白話講：計算 main KB item oxygen 時，先取公式：FIO2↑ → PIO2↑ → PAO2↑。，再代入目前輸入值，最後判斷變大、變小或 V/Q 方向。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 756
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "summary",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "A-a setup 的總結：A-a gradient 需要先計算 PAO2，再比較 PaO2。 如果 PAO2 正常但 PaO2 低，代表交換障礙。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 757
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "summary",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "CO2 effect on PAO2 的總結：PaCO2 會反向影響 PAO2。 PaCO2 增加時，PAO2 下降。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 758
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "summary",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "FIO2 的總結：FIO2 是吸入氧氣分率。 提高 FIO2 會提高肺泡氧。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 759
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "summary",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "PH2O 的總結：PH2O 是水蒸氣壓，體溫下約 47 mmHg。 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 760
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "summary",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "R exchange ratio 的總結：R 是 CO2 production / O2 consumption 比值。 R 影響 CO2 項扣除量。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 761
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "summary",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "altitude hypoxemia 的總結：高海拔低氧來自 barometric pressure 下降。 Patm 降低使 PIO2/PAO2 降低。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 762
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "summary",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "alveolar gas equation 的總結：肺泡氣方程式估計肺泡氧分壓。 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 763
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "summary",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "barometric pressure 的總結：Patm 是大氣壓，影響 inspired oxygen pressure。 Patm 降低會降低 PIO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 764
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "summary",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "hypoxemia from hypoventilation 的總結：低通氣可使 PAO2 降低。 CO2 retention 會透過肺泡氣方程式降低 PAO2。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 765
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "summary",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "oxygenation 的總結：oxygenation 是血液取得氧氣的結果。 PAO2 到 PaO2 的落差反映氧合障礙。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 766
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "summary",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "oxygenation ventilation distinction 的總結：oxygenation 與 ventilation 是不同問題。 給氧提高 PaO2，但 PaCO2 要靠 VA。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 767
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "summary",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "main KB item oxygen 的總結：main KB item oxygen 提高 FIO2。 有通氣肺泡可因給氧而提高 oxygenation。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 768
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "summary",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 769
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "summary",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 770
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "summary",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 771
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "summary",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 772
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "summary",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 773
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "summary",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 774
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "summary",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 775
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "summary",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 776
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "summary",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 777
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "summary",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 778
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "summary",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 779
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "summary",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 780
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "summary",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 781
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "summary",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 782
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "summary",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 783
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "summary",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 784
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "summary",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 785
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "summary",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 786
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "summary",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 787
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "summary",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 788
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "summary",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 789
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "summary",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 790
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "summary",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 791
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "summary",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 792
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "summary",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 793
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "summary",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 794
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "summary",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 795
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "summary",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 796
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "summary",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 797
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "summary",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 798
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "summary",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 799
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "summary",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 800
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "summary",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 801
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "summary",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 802
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "summary",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 803
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "summary",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 804
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "summary",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 805
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "summary",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 806
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "summary",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 807
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "summary",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 808
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "summary",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 809
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "summary",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 810
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "summary",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 811
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "summary",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 812
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "summary",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 813
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "summary",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 814
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "summary",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 815
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "summary",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 816
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "summary",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 817
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "summary",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 818
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "summary",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 819
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "summary",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 820
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "summary",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 821
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "summary",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 822
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "summary",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 823
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "summary",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 824
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "summary",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 825
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "summary",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 826
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "summary",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 827
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "summary",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 828
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "summary",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：A-a setup 的總結：A-a gradient 需要先計算 PAO2，再比較 PaO2。 如果 PAO2 正常但 PaO2 低，代表交換障礙。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 829
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "summary",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：CO2 effect on PAO2 的總結：PaCO2 會反向影響 PAO2。 PaCO2 增加時，PAO2 下降。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 830
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "summary",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：FIO2 的總結：FIO2 是吸入氧氣分率。 提高 FIO2 會提高肺泡氧。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 831
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "summary",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：PH2O 的總結：PH2O 是水蒸氣壓，體溫下約 47 mmHg。 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 832
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "summary",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：R exchange ratio 的總結：R 是 CO2 production / O2 consumption 比值。 R 影響 CO2 項扣除量。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 833
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "summary",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：altitude hypoxemia 的總結：高海拔低氧來自 barometric pressure 下降。 Patm 降低使 PIO2/PAO2 降低。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 834
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "summary",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：alveolar gas equation 的總結：肺泡氣方程式估計肺泡氧分壓。 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 835
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "summary",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：barometric pressure 的總結：Patm 是大氣壓，影響 inspired oxygen pressure。 Patm 降低會降低 PIO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 836
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "summary",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：hypoxemia from hypoventilation 的總結：低通氣可使 PAO2 降低。 CO2 retention 會透過肺泡氣方程式降低 PAO2。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 837
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "summary",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：oxygenation 的總結：oxygenation 是血液取得氧氣的結果。 PAO2 到 PaO2 的落差反映氧合障礙。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 838
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "summary",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：oxygenation ventilation distinction 的總結：oxygenation 與 ventilation 是不同問題。 給氧提高 PaO2，但 PaCO2 要靠 VA。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 839
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "summary",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "重點",
      "總結",
      "整理",
      "summary"
    ],
    "content": "用白話講：main KB item oxygen 的總結：main KB item oxygen 提高 FIO2。 有通氣肺泡可因給氧而提高 oxygenation。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 840
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "content_extraction",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 A-a setup 會抽出 aliases=['A-a', 'A-a gradient', 'PAO2 PaO2']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 841
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "content_extraction",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 CO2 effect on PAO2 會抽出 aliases=['PaCO2 PAO2', 'CO2 effect']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 842
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "content_extraction",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 FIO2 會抽出 aliases=['FIO2', 'inspired oxygen', '吸氧']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 843
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "content_extraction",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 PH2O 會抽出 aliases=['PH2O', 'water vapor', '水蒸氣壓']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 844
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "content_extraction",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 R exchange ratio 會抽出 aliases=['R', 'RER', 'respiratory exchange ratio']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 845
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "content_extraction",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 altitude hypoxemia 會抽出 aliases=['altitude hypoxemia', '高海拔低氧']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 846
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "content_extraction",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 alveolar gas equation 會抽出 aliases=['PAO2', 'alveolar gas equation', '肺泡氣方程式']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 847
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "content_extraction",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 barometric pressure 會抽出 aliases=['Patm', 'barometric pressure', '大氣壓']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 848
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "content_extraction",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 hypoxemia from hypoventilation 會抽出 aliases=['hypoventilation oxygenation', '低通氣低氧']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 849
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 oxygenation 會抽出 aliases=['oxygenation', '氧合', 'PaO2']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 850
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 oxygenation ventilation distinction 會抽出 aliases=['oxygenation vs ventilation', '氧合 通氣']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 851
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "content_extraction",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "Content extraction 對 main KB item oxygen 會抽出 aliases=['main KB item oxygen', '給氧', '高氧']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 852
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "content_extraction",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 853
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "content_extraction",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 854
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "content_extraction",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 855
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "content_extraction",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 856
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "content_extraction",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 857
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "content_extraction",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 858
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "content_extraction",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 859
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "content_extraction",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 860
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "content_extraction",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 861
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 862
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 863
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "content_extraction",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 864
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "content_extraction",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 865
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "content_extraction",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 866
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "content_extraction",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 867
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "content_extraction",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 868
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "content_extraction",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 869
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "content_extraction",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 870
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "content_extraction",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 871
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "content_extraction",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 872
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "content_extraction",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 873
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 874
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 875
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "content_extraction",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 876
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "content_extraction",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 877
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "content_extraction",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 878
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "content_extraction",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 879
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "content_extraction",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 880
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "content_extraction",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 881
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "content_extraction",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 882
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "content_extraction",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 883
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "content_extraction",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 884
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "content_extraction",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 885
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 886
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 887
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "content_extraction",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 888
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "content_extraction",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 889
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "content_extraction",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 890
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "content_extraction",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 891
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "content_extraction",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 892
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "content_extraction",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 893
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "content_extraction",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 894
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "content_extraction",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 895
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "content_extraction",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 896
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "content_extraction",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 897
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 898
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 899
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "content_extraction",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 900
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "content_extraction",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 901
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "content_extraction",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 902
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "content_extraction",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 903
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "content_extraction",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 904
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "content_extraction",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 905
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "content_extraction",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 906
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "content_extraction",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 907
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "content_extraction",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 908
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "content_extraction",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 909
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 910
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 911
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "content_extraction",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 912
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "content_extraction",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 A-a setup 會抽出 aliases=['A-a', 'A-a gradient', 'PAO2 PaO2']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 913
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "content_extraction",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 CO2 effect on PAO2 會抽出 aliases=['PaCO2 PAO2', 'CO2 effect']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 914
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "content_extraction",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 FIO2 會抽出 aliases=['FIO2', 'inspired oxygen', '吸氧']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 915
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "content_extraction",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 PH2O 會抽出 aliases=['PH2O', 'water vapor', '水蒸氣壓']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 916
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "content_extraction",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 R exchange ratio 會抽出 aliases=['R', 'RER', 'respiratory exchange ratio']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 917
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "content_extraction",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 altitude hypoxemia 會抽出 aliases=['altitude hypoxemia', '高海拔低氧']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "plain",
    "unitItemNumber": 918
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "content_extraction",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 alveolar gas equation 會抽出 aliases=['PAO2', 'alveolar gas equation', '肺泡氣方程式']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "plain",
    "unitItemNumber": 919
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "content_extraction",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 barometric pressure 會抽出 aliases=['Patm', 'barometric pressure', '大氣壓']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "plain",
    "unitItemNumber": 920
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "content_extraction",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 hypoxemia from hypoventilation 會抽出 aliases=['hypoventilation oxygenation', '低通氣低氧']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "plain",
    "unitItemNumber": 921
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 oxygenation 會抽出 aliases=['oxygenation', '氧合', 'PaO2']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "plain",
    "unitItemNumber": 922
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "content_extraction",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 oxygenation ventilation distinction 會抽出 aliases=['oxygenation vs ventilation', '氧合 通氣']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "plain",
    "unitItemNumber": 923
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "content_extraction",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "抽取",
      "content extraction",
      "content",
      "擷取"
    ],
    "content": "用白話講：Content extraction 對 main KB item oxygen 會抽出 aliases=['main KB item oxygen', '給氧', '高氧']、核心定義、公式、機轉、模型表現與常見錯誤。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "plain",
    "unitItemNumber": 924
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "intent_detection",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 A-a setup 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "direct",
    "unitItemNumber": 925
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "intent_detection",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 CO2 effect on PAO2 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "direct",
    "unitItemNumber": 926
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "intent_detection",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 FIO2 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 927
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "intent_detection",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 PH2O 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "direct",
    "unitItemNumber": 928
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "intent_detection",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 R exchange ratio 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "direct",
    "unitItemNumber": 929
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "intent_detection",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 altitude hypoxemia 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "direct",
    "unitItemNumber": 930
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "intent_detection",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 alveolar gas equation 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "direct",
    "unitItemNumber": 931
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "intent_detection",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 barometric pressure 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "direct",
    "unitItemNumber": 932
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "intent_detection",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 hypoxemia from hypoventilation 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "direct",
    "unitItemNumber": 933
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 oxygenation 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "direct",
    "unitItemNumber": 934
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 oxygenation ventilation distinction 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "direct",
    "unitItemNumber": 935
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "intent_detection",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "Intent detection 若偵測到學生問 main KB item oxygen 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "direct",
    "unitItemNumber": 936
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "intent_detection",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 A-a gradient 需要先計算 PAO2，再比較 PaO2。；中間變化是 如果 PAO2 正常但 PaO2 低，代表交換障礙。；最後在模型或臨床上表現為：數值區應列 A-a O2 Diff。 A-a 協助分辨低氧原因。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "mechanism_chain",
    "unitItemNumber": 937
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "intent_detection",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 PaCO2 會反向影響 PAO2。；中間變化是 PaCO2 增加時，PAO2 下降。；最後在模型或臨床上表現為：模型應把 VA 與 PAO2 連起來。 PaCO2 是通氣與氧合交會點。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "mechanism_chain",
    "unitItemNumber": 938
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "intent_detection",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 FIO2 是吸入氧氣分率。；中間變化是 提高 FIO2 會提高肺泡氧。；最後在模型或臨床上表現為：調 FIO2 應改變 PAO2/PaO2。 給氧改善氧合但不直接排 CO2。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 939
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "intent_detection",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 PH2O 是水蒸氣壓，體溫下約 47 mmHg。；中間變化是 吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。；最後在模型或臨床上表現為：模型可固定 PH2O=47。 估 PAO2 時要扣 PH2O。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 940
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "intent_detection",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 R 是 CO2 production / O2 consumption 比值。；中間變化是 R 影響 CO2 項扣除量。；最後在模型或臨床上表現為：R 變化影響 PAO2 計算。 R 有助於代謝與氣體交換估算。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "mechanism_chain",
    "unitItemNumber": 941
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "intent_detection",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 高海拔低氧來自 barometric pressure 下降。；中間變化是 Patm 降低使 PIO2/PAO2 降低。；最後在模型或臨床上表現為：Altitude input 應改 PAO2。 高海拔反應可用吸氧改善。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 942
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "intent_detection",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 肺泡氣方程式估計肺泡氧分壓。；中間變化是 FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。；最後在模型或臨床上表現為：PAO2 應顯示在 General 數值區。 A-a gradient 判讀需要先估 PAO2。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 943
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "intent_detection",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 Patm 是大氣壓，影響 inspired oxygen pressure。；中間變化是 Patm 降低會降低 PIO2。；最後在模型或臨床上表現為：Altitude 變化應改變 Patm 與 PAO2。 高海拔低氧是低 inspired oxygen。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "mechanism_chain",
    "unitItemNumber": 944
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "intent_detection",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 低通氣可使 PAO2 降低。；中間變化是 CO2 retention 會透過肺泡氣方程式降低 PAO2。；最後在模型或臨床上表現為：模型應同時顯示 PACO2 上升與 PAO2 下降。 治療需改善通氣，不只是給氧。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "mechanism_chain",
    "unitItemNumber": 945
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 oxygenation 是血液取得氧氣的結果。；中間變化是 PAO2 到 PaO2 的落差反映氧合障礙。；最後在模型或臨床上表現為：模型應列 PAO2 與 arterial PO2。 氧合障礙要分機轉。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "mechanism_chain",
    "unitItemNumber": 946
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 oxygenation 與 ventilation 是不同問題。；中間變化是 給氧提高 PaO2，但 PaCO2 要靠 VA。；最後在模型或臨床上表現為：回答問題時應分開 PaO2 與 PaCO2。 臨床需分開處理 oxygen 與 CO2。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "mechanism_chain",
    "unitItemNumber": 947
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "intent_detection",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "機轉鏈：起點是 main KB item oxygen 提高 FIO2。；中間變化是 有通氣肺泡可因給氧而提高 oxygenation。；最後在模型或臨床上表現為：模型可讓 FIO2 改變 arterial PO2。 高氧反應差提示 shunt。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "mechanism_chain",
    "unitItemNumber": 948
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "intent_detection",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 A-a setup，先說「A-a gradient 需要先計算 PAO2，再比較 PaO2。」，再接「如果 PAO2 正常但 PaO2 低，代表交換障礙。」，最後補「diffusion limitation 會增加 A-a。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "teacher_script",
    "unitItemNumber": 949
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "intent_detection",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 CO2 effect on PAO2，先說「PaCO2 會反向影響 PAO2。」，再接「PaCO2 增加時，PAO2 下降。」，最後補「VA 下降時 PaCO2 上升，PAO2 下降。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "teacher_script",
    "unitItemNumber": 950
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "intent_detection",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 FIO2，先說「FIO2 是吸入氧氣分率。」，再接「提高 FIO2 會提高肺泡氧。」，最後補「FIO2 0.28 可改善 oxygenation。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 951
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "intent_detection",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 PH2O，先說「PH2O 是水蒸氣壓，體溫下約 47 mmHg。」，再接「吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。」，最後補「海平面 room air PIO2 約 0.21×713。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "teacher_script",
    "unitItemNumber": 952
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "intent_detection",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 R exchange ratio，先說「R 是 CO2 production / O2 consumption 比值。」，再接「R 影響 CO2 項扣除量。」，最後補「教學常用 R=0.8。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "teacher_script",
    "unitItemNumber": 953
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "intent_detection",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 altitude hypoxemia，先說「高海拔低氧來自 barometric pressure 下降。」，再接「Patm 降低使 PIO2/PAO2 降低。」，最後補「登高可造成低氧血症。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "teacher_script",
    "unitItemNumber": 954
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "intent_detection",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 alveolar gas equation，先說「肺泡氣方程式估計肺泡氧分壓。」，再接「FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。」，最後補「低通氣時 PaCO2 上升，PAO2 下降。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "teacher_script",
    "unitItemNumber": 955
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "intent_detection",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 barometric pressure，先說「Patm 是大氣壓，影響 inspired oxygen pressure。」，再接「Patm 降低會降低 PIO2。」，最後補「高海拔使 PIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "teacher_script",
    "unitItemNumber": 956
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "intent_detection",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 hypoxemia from hypoventilation，先說「低通氣可使 PAO2 降低。」，再接「CO2 retention 會透過肺泡氣方程式降低 PAO2。」，最後補「opioid 抑制呼吸會使 PaCO2 高、PAO2 低。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "teacher_script",
    "unitItemNumber": 957
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation，先說「oxygenation 是血液取得氧氣的結果。」，再接「PAO2 到 PaO2 的落差反映氧合障礙。」，最後補「V/Q mismatch 可使 PaO2 下降。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "teacher_script",
    "unitItemNumber": 958
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 oxygenation ventilation distinction，先說「oxygenation 與 ventilation 是不同問題。」，再接「給氧提高 PaO2，但 PaCO2 要靠 VA。」，最後補「COPD 病人可同時氧合差與通氣不足。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "teacher_script",
    "unitItemNumber": 959
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "intent_detection",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "老師講解版：這題如果學生問 main KB item oxygen，先說「main KB item oxygen 提高 FIO2。」，再接「有通氣肺泡可因給氧而提高 oxygenation。」，最後補「diffusion limitation 可因提高梯度改善。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "teacher_script",
    "unitItemNumber": 960
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "intent_detection",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 A-a setup 來說，關鍵是：A-a = PAO2 - PaO2。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "student_hint",
    "unitItemNumber": 961
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "intent_detection",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 CO2 effect on PAO2 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "student_hint",
    "unitItemNumber": 962
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "intent_detection",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 FIO2 來說，關鍵是：PIO2 = FIO2 × (Patm - PH2O)。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 963
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "intent_detection",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 PH2O 來說，關鍵是：PIO2 = FIO2(Patm - 47)。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "student_hint",
    "unitItemNumber": 964
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "intent_detection",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 R exchange ratio 來說，關鍵是：PAO2 = PIO2 - PaCO2/R。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "student_hint",
    "unitItemNumber": 965
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "intent_detection",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 altitude hypoxemia 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "student_hint",
    "unitItemNumber": 966
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "intent_detection",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 alveolar gas equation 來說，關鍵是：PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "student_hint",
    "unitItemNumber": 967
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "intent_detection",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 barometric pressure 來說，關鍵是：PIO2 = FIO2(Patm-PH2O)。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "student_hint",
    "unitItemNumber": 968
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "intent_detection",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 hypoxemia from hypoventilation 來說，關鍵是：PaCO2↑ → PAO2↓。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "student_hint",
    "unitItemNumber": 969
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation 來說，關鍵是：可用 PaO2、SaO2、A-a gradient 判斷。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "student_hint",
    "unitItemNumber": 970
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 oxygenation ventilation distinction 來說，關鍵是：PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "student_hint",
    "unitItemNumber": 971
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "intent_detection",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "給學生的提示：先不要背答案。先問自己這題是定義、公式、機轉、模型還是臨床。對 main KB item oxygen 來說，關鍵是：FIO2↑ → PIO2↑ → PAO2↑。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "student_hint",
    "unitItemNumber": 972
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "intent_detection",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：A-a setup 應連到模型表現：數值區應列 A-a O2 Diff。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "model_link",
    "unitItemNumber": 973
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "intent_detection",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：CO2 effect on PAO2 應連到模型表現：模型應把 VA 與 PAO2 連起來。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "model_link",
    "unitItemNumber": 974
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "intent_detection",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：FIO2 應連到模型表現：調 FIO2 應改變 PAO2/PaO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 975
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "intent_detection",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：PH2O 應連到模型表現：模型可固定 PH2O=47。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "model_link",
    "unitItemNumber": 976
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "intent_detection",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：R exchange ratio 應連到模型表現：R 變化影響 PAO2 計算。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "model_link",
    "unitItemNumber": 977
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "intent_detection",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：altitude hypoxemia 應連到模型表現：Altitude input 應改 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "model_link",
    "unitItemNumber": 978
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "intent_detection",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：alveolar gas equation 應連到模型表現：PAO2 應顯示在 General 數值區。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "model_link",
    "unitItemNumber": 979
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "intent_detection",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：barometric pressure 應連到模型表現：Altitude 變化應改變 Patm 與 PAO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "model_link",
    "unitItemNumber": 980
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "intent_detection",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：hypoxemia from hypoventilation 應連到模型表現：模型應同時顯示 PACO2 上升與 PAO2 下降。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "model_link",
    "unitItemNumber": 981
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：oxygenation 應連到模型表現：模型應列 PAO2 與 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "model_link",
    "unitItemNumber": 982
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：oxygenation ventilation distinction 應連到模型表現：回答問題時應分開 PaO2 與 PaCO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "model_link",
    "unitItemNumber": 983
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "intent_detection",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "模型連結版：main KB item oxygen 應連到模型表現：模型可讓 FIO2 改變 arterial PO2。 若學生調參數，需看該變項如何改變 course goal：讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "model_link",
    "unitItemNumber": 984
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "intent_detection",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 A-a setup，要指出正確核心是「A-a = PAO2 - PaO2。」，並提醒常見錯誤：「A-a 不是 oxygen content。」。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "exam_feedback",
    "unitItemNumber": 985
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "intent_detection",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 CO2 effect on PAO2，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「不要把 CO2 與 O2 完全獨立。」。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "exam_feedback",
    "unitItemNumber": 986
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "intent_detection",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 FIO2，要指出正確核心是「PIO2 = FIO2 × (Patm - PH2O)。」，並提醒常見錯誤：「FIO2 不是 respiratory rate。」。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 987
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "intent_detection",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 PH2O，要指出正確核心是「PIO2 = FIO2(Patm - 47)。」，並提醒常見錯誤：「不能用 760×FIO2 直接當 PIO2。」。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 988
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "R exchange ratio",
    "intent": "intent_detection",
    "aliases": [
      "R",
      "RER",
      "respiratory exchange ratio",
      "R exchange ratio"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 R exchange ratio，要指出正確核心是「PAO2 = PIO2 - PaCO2/R。」，並提醒常見錯誤：「R 不是 respiratory rate。」。",
    "definition": "R 是 CO2 production / O2 consumption 比值。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "R 影響 CO2 項扣除量。",
    "example": "教學常用 R=0.8。",
    "model": "R 變化影響 PAO2 計算。",
    "clinical": "R 有助於代謝與氣體交換估算。",
    "misconception": "R 不是 respiratory rate。",
    "variant": "exam_feedback",
    "unitItemNumber": 989
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "altitude hypoxemia",
    "intent": "intent_detection",
    "aliases": [
      "altitude hypoxemia",
      "高海拔低氧",
      "altitude hypoxemia"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 altitude hypoxemia，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是肺泡通氣必然下降。」。",
    "definition": "高海拔低氧來自 barometric pressure 下降。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低使 PIO2/PAO2 降低。",
    "example": "登高可造成低氧血症。",
    "model": "Altitude input 應改 PAO2。",
    "clinical": "高海拔反應可用吸氧改善。",
    "misconception": "高海拔不是肺泡通氣必然下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 990
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "alveolar gas equation",
    "intent": "intent_detection",
    "aliases": [
      "PAO2",
      "alveolar gas equation",
      "肺泡氣方程式",
      "alveolar gas equation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 alveolar gas equation，要指出正確核心是「PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。」，並提醒常見錯誤：「PAO2 不是 PaO2。」。",
    "definition": "肺泡氣方程式估計肺泡氧分壓。",
    "equation": "PAO2 = FIO2 × (Patm - PH2O) - PaCO2/R。",
    "mechanism": "FIO2 和 Patm 提高會提高 PAO2，PaCO2 上升會降低 PAO2。",
    "example": "低通氣時 PaCO2 上升，PAO2 下降。",
    "model": "PAO2 應顯示在 General 數值區。",
    "clinical": "A-a gradient 判讀需要先估 PAO2。",
    "misconception": "PAO2 不是 PaO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 991
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "barometric pressure",
    "intent": "intent_detection",
    "aliases": [
      "Patm",
      "barometric pressure",
      "大氣壓",
      "barometric pressure"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 barometric pressure，要指出正確核心是「PIO2 = FIO2(Patm-PH2O)。」，並提醒常見錯誤：「高海拔不是 FIO2 下降。」。",
    "definition": "Patm 是大氣壓，影響 inspired oxygen pressure。",
    "equation": "PIO2 = FIO2(Patm-PH2O)。",
    "mechanism": "Patm 降低會降低 PIO2。",
    "example": "高海拔使 PIO2 下降。",
    "model": "Altitude 變化應改變 Patm 與 PAO2。",
    "clinical": "高海拔低氧是低 inspired oxygen。",
    "misconception": "高海拔不是 FIO2 下降。",
    "variant": "exam_feedback",
    "unitItemNumber": 992
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "hypoxemia from hypoventilation",
    "intent": "intent_detection",
    "aliases": [
      "hypoventilation oxygenation",
      "低通氣低氧",
      "hypoxemia from hypoventilation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 hypoxemia from hypoventilation，要指出正確核心是「PaCO2↑ → PAO2↓。」，並提醒常見錯誤：「低通氣不一定 A-a gradient 增加。」。",
    "definition": "低通氣可使 PAO2 降低。",
    "equation": "PaCO2↑ → PAO2↓。",
    "mechanism": "CO2 retention 會透過肺泡氣方程式降低 PAO2。",
    "example": "opioid 抑制呼吸會使 PaCO2 高、PAO2 低。",
    "model": "模型應同時顯示 PACO2 上升與 PAO2 下降。",
    "clinical": "治療需改善通氣，不只是給氧。",
    "misconception": "低通氣不一定 A-a gradient 增加。",
    "variant": "exam_feedback",
    "unitItemNumber": 993
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation",
      "氧合",
      "PaO2",
      "oxygenation"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation，要指出正確核心是「可用 PaO2、SaO2、A-a gradient 判斷。」，並提醒常見錯誤：「PaO2 不代表 PaCO2。」。",
    "definition": "oxygenation 是血液取得氧氣的結果。",
    "equation": "可用 PaO2、SaO2、A-a gradient 判斷。",
    "mechanism": "PAO2 到 PaO2 的落差反映氧合障礙。",
    "example": "V/Q mismatch 可使 PaO2 下降。",
    "model": "模型應列 PAO2 與 arterial PO2。",
    "clinical": "氧合障礙要分機轉。",
    "misconception": "PaO2 不代表 PaCO2。",
    "variant": "exam_feedback",
    "unitItemNumber": 994
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "oxygenation ventilation distinction",
    "intent": "intent_detection",
    "aliases": [
      "oxygenation vs ventilation",
      "氧合 通氣",
      "oxygenation ventilation distinction"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 oxygenation ventilation distinction，要指出正確核心是「PaO2 看 oxygenation；PaCO2 看 ventilation。」，並提醒常見錯誤：「SpO2 正常不代表 ventilation 正常。」。",
    "definition": "oxygenation 與 ventilation 是不同問題。",
    "equation": "PaO2 看 oxygenation；PaCO2 看 ventilation。",
    "mechanism": "給氧提高 PaO2，但 PaCO2 要靠 VA。",
    "example": "COPD 病人可同時氧合差與通氣不足。",
    "model": "回答問題時應分開 PaO2 與 PaCO2。",
    "clinical": "臨床需分開處理 oxygen 與 CO2。",
    "misconception": "SpO2 正常不代表 ventilation 正常。",
    "variant": "exam_feedback",
    "unitItemNumber": 995
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "main KB item oxygen",
    "intent": "intent_detection",
    "aliases": [
      "main KB item oxygen",
      "給氧",
      "高氧",
      "main KB item oxygen"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "評量回饋版：若學生答錯 main KB item oxygen，要指出正確核心是「FIO2↑ → PIO2↑ → PAO2↑。」，並提醒常見錯誤：「給氧不代表所有機轉都完全修正。」。",
    "definition": "main KB item oxygen 提高 FIO2。",
    "equation": "FIO2↑ → PIO2↑ → PAO2↑。",
    "mechanism": "有通氣肺泡可因給氧而提高 oxygenation。",
    "example": "diffusion limitation 可因提高梯度改善。",
    "model": "模型可讓 FIO2 改變 arterial PO2。",
    "clinical": "高氧反應差提示 shunt。",
    "misconception": "給氧不代表所有機轉都完全修正。",
    "variant": "exam_feedback",
    "unitItemNumber": 996
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "A-a setup",
    "intent": "intent_detection",
    "aliases": [
      "A-a",
      "A-a gradient",
      "PAO2 PaO2",
      "A-a setup"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "用白話講：Intent detection 若偵測到學生問 A-a setup 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "A-a gradient 需要先計算 PAO2，再比較 PaO2。",
    "equation": "A-a = PAO2 - PaO2。",
    "mechanism": "如果 PAO2 正常但 PaO2 低，代表交換障礙。",
    "example": "diffusion limitation 會增加 A-a。",
    "model": "數值區應列 A-a O2 Diff。",
    "clinical": "A-a 協助分辨低氧原因。",
    "misconception": "A-a 不是 oxygen content。",
    "variant": "plain",
    "unitItemNumber": 997
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "CO2 effect on PAO2",
    "intent": "intent_detection",
    "aliases": [
      "PaCO2 PAO2",
      "CO2 effect",
      "CO2 effect on PAO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "用白話講：Intent detection 若偵測到學生問 CO2 effect on PAO2 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "PaCO2 會反向影響 PAO2。",
    "equation": "PAO2 = PIO2 - PaCO2/R。",
    "mechanism": "PaCO2 增加時，PAO2 下降。",
    "example": "VA 下降時 PaCO2 上升，PAO2 下降。",
    "model": "模型應把 VA 與 PAO2 連起來。",
    "clinical": "PaCO2 是通氣與氧合交會點。",
    "misconception": "不要把 CO2 與 O2 完全獨立。",
    "variant": "plain",
    "unitItemNumber": 998
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "FIO2",
    "intent": "intent_detection",
    "aliases": [
      "FIO2",
      "inspired oxygen",
      "吸氧",
      "FIO2"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "用白話講：Intent detection 若偵測到學生問 FIO2 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "FIO2 是吸入氧氣分率。",
    "equation": "PIO2 = FIO2 × (Patm - PH2O)。",
    "mechanism": "提高 FIO2 會提高肺泡氧。",
    "example": "FIO2 0.28 可改善 oxygenation。",
    "model": "調 FIO2 應改變 PAO2/PaO2。",
    "clinical": "給氧改善氧合但不直接排 CO2。",
    "misconception": "FIO2 不是 respiratory rate。",
    "variant": "plain",
    "unitItemNumber": 999
  },
  {
    "course": "alveolar_gas",
    "courseTitle": "課程 3：Alveolar Gas Equation 與 Oxygenation",
    "courseGoal": "讓學生能用 alveolar gas equation 解釋 FIO2、PaCO2、R、海拔對 PAO2/PaO2 的影響.",
    "concept": "PH2O",
    "intent": "intent_detection",
    "aliases": [
      "PH2O",
      "water vapor",
      "水蒸氣壓",
      "PH2O"
    ],
    "questionPatterns": [
      "intent",
      "意圖",
      "判斷問題",
      "問法"
    ],
    "content": "用白話講：Intent detection 若偵測到學生問 PH2O 的公式、原因、模型、臨床或比較，就會分別抓 equation、mechanism、model、clinical 或 comparison 欄位。",
    "definition": "PH2O 是水蒸氣壓，體溫下約 47 mmHg。",
    "equation": "PIO2 = FIO2(Patm - 47)。",
    "mechanism": "吸入氣體在氣道加濕後，可用壓力需扣掉 PH2O。",
    "example": "海平面 room air PIO2 約 0.21×713。",
    "model": "模型可固定 PH2O=47。",
    "clinical": "估 PAO2 時要扣 PH2O。",
    "misconception": "不能用 760×FIO2 直接當 PIO2。",
    "variant": "plain",
    "unitItemNumber": 1000
  }
];
})(window.VQ_KB_DATA);
