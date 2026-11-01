# V/Q Visual Model 最終版（2026-10-10）：Hopkins 基準 + 老師註記 + 所選肺區 End Capillary

以 R5（End Capillary — Selected Region）為底，計算核心換成對齊 Johns Hopkins Gas Exchange Simulator 的版本。

## 1. No V/Q mismatch default：23 格全部 = Hopkins
11 個 default 輸入不變。Mixed venous 47.22 / 53.57 / 7.35 / 39.45 / 71.44% / 14.41；End capillary 40.00 / 49.21 / 101.78 / 97.78% / 19.86；General 7.50 / 5.25 / 40.00 / 149.68 / 101.78；Arterial 40.00 / 49.21 / 7.40 / 101.78 / 97.78% / 19.86；A-a 0.01。
程式包原有的第二組 Hopkins 基準（VT 400）23 格也全部相同。（R5 原版 VT 400 有 15 格不同，A-a 3.17 vs 0.02。）

## 2. 老師要求（含 LINE 訊息）

| 要求 | 本版結果 |
|---|---|
| End Capillary 改為顯示所選 V/Q 肺區的末端血液（LINE） | 已改；標題「End Capillary — Selected Region」，並標示「Low V/Q region (1 of 2)」等。Arterial 仍為各肺區與分流按含量混合 |
| High V/Q：PcO2 應上升、PcCO2 應大幅下降（LINE） | 所選肺區 PcO2 139.22、PcCO2 17.39（Normal 101.78 / 40.00）；動脈 PaCO2 58.41 上升 |
| Low V/Q：PcCO2 約 46 | 所選肺區 PcCO2 46.03（PcO2 64.13；PaO2 68.35、A-a 31.57） |
| Diffusion：PAO2 與 PaO2 應有差距 | PAO2 98.36、PaO2 70.40、A-a 27.96；FiO2 0.4 時 PaO2 回升到約 236 |
| True shunt：提高 FiO2，PaO2 不應上升 | FiO2 0.21 → 0.4：39.45 → 42.60（FiO2 1.0：49.31） |

## 3. 情境設定（與 R5 的差異）
- Low V/Q：VT 350、VD 180、f 32、Shunt 0.08（R5：f 28）；病變區 20% 通氣、46.5% 灌流（R5：50%）。f 32 依老師圖中的呼吸頻率；46.5% 使所選肺區 PcCO2 落在老師要求的約 46。
- Diffusion：DLO2 8（R5：16）。在 Hopkins 對齊的擴散效率下，DLO2 16 的 A-a 只有 0.11，看不出擴散障礙。8 為 default 32 的 25%，屬 ATS/ERS severe（<40%）。
- True shunt：Shunt 0.50，通氣維持正常（R5：另設 VT 400、f 16，造成低通氣，給氧時 PaO2 45.44，上升較多）。
- High V/Q、PE、Pneumonia、Anemia、High altitude：情境輸入未改。

## 4. 計算方法
肺泡氣體方程、Fick 原理的 O2/CO2 含量守恆、分流按含量混合、Bohr 擴散積分。常數由 Hopkins 兩個畫面反推：PACO2 = 0.875 × VCO2/VA；PIO2 = FiO2 × (760 − 47.22)；O2 content = 1.3334 × Hb × SO2 + 0.003 × PO2；Hill 型解離曲線（P50 26.92、n 2.70、PCO2 Bohr 修正）；CO2 含量與 pH 以 PCO2、SO2（Haldane）表示；擴散效率 0.770；固定靜脈混合 0.0023%（對齊 Hopkins A-a 的校準常數，非實際生理分流量）。

## 5. 驗證
`node VERIFY_VQ_CONSERVATION.cjs`：28 項全部通過（Hopkins 兩畫面、老師各點、所選肺區顯示、含量守恆、輸入錯誤處理）。瀏覽器實測 reference / kb 兩頁 default 23 格 = Hopkins，Reset 後相同，無頁面錯誤。

## 參考來源
- Deranged Physiology — shunt: https://derangedphysiology.com/main/cicm-primary-exam/respiratory-system/Chapter-083/physiological-consequences-increased-shunt
- Deranged Physiology — V/Q mismatch: https://derangedphysiology.com/main/cicm-primary-exam/respiratory-system/Chapter-0732/effects-ventilation-perfusion-mismatch-gas-exchange
- Pellegrino R, et al. Eur Respir J 2005;26:948–968: https://www.ers-education.org/lr/show-media/?id=34390
- Petersson J, Glenny RW. Eur Respir J 2014: https://pubmed.ncbi.nlm.nih.gov/25063240/
