# v237 Accuracy-First Full-Regression Stable

這版以「前面實際答錯的題目與失敗型態」為修正依據，但不把官方答案寫進 production prompt、retrieval、模型權重或 deterministic physiology rules。

## 系統範圍與教材
- Human Physiology + directly related Pathophysiology
- Guyton 2,644 passages / 85 chapters
- Vander 1,610 passages / Chapters 1–19
- Beachey 538 passages / Chapters 1–13
- Total 4,792 passages
- Rau 不納入 primary physiology RAG
- 沿用既有 4,792 passage vectors / 16,151 rerank windows

## 依已發生錯誤修正的通用能力
1. **Negative-polarity / EXCEPT**：何者錯誤、不屬於等題目，不能把「不是核心機轉」誤判成「敘述為假」。
2. **Threshold / exact range**：70 vs 60 mmHg、FRC 下特定 Raw 範圍等，優先使用條件完全吻合的 evidence，不用模糊正常值覆蓋。
3. **State / phase / starting condition**：吸氣尚未停止、由 RV 開始吸氣、吸氣末 dead space 等，起始狀態與時相為 binding constraints。
4. **Compartment**：alveolar / dead-space / arterial / venous / pleural 等不得互相代換。
5. **Timing / order / sign**：前 1/3、+/- pressure、transit time 等必須和模型自己的理由一致。
6. **Set membership**：①②③、nucleus 組合題逐項判斷後才映射到 A/B/C/D。
7. **Relationship topology**：Cheyne–Stokes 等題精確核對「哪裡到哪裡」的 delay / association，不以關鍵字命中代替機轉。
8. **Reason-to-option consistency**：模型若自己的 option table 唯一支持/反駁某項，最後 letter 不得與其自身判斷矛盾。

## Retrieval / decision
- 主 Top-6 由 stem-dominant ranking 決定；選項文字不能改寫主排序。
- A/B/C/D 各有獨立 diagnostic evidence probe，只協助辨別 distractor。
- Batch compaction 強制保留四個 option probes，不再因 context 截斷而消失。
- 一般高信心題一次作答；negative/threshold/state/compartment/set/numeric/relationship 等風險題才做 blind verifier。
- Primary 與 blind 真正不同時才 adjudicate。
- Local 與 BYOK Cloud 使用同一套 accuracy-first constraints；Cloud 不再走較鬆的舊 v229 batch decision。

## Batch 完整性與顯示
- 預設每 4 題一個 micro-batch，降低一次處理 8–10 題造成的漏題與判斷互相污染。
- Local batch 若缺少/空白某題，只重跑該題；不再靜默漏答。
- 前端固定顯示「第 X 題」/「Question X」，每題分段。

## Regression
已看過的題目只做 development regression，不是 held-out benchmark。v237 extended regression 共有 22 題，涵蓋先前已實際發生的主要錯誤類型。

```bash
./benchmark/regression/RUN_V237_EXTENDED_SEEN_REGRESSION.sh --model granite
```

Expected option 只在 production answer 完成後做 post-hoc scoring，不會送進模型或 retrieval。

## 安裝
```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v237_ACCURACY_FIRST_FULL_REGRESSION_STABLE_FINAL.zip
cd /path/to/workdir/NTULUNG_TA_v206_7
chmod +x INSTALL_FINAL.sh
./INSTALL_FINAL.sh
```
