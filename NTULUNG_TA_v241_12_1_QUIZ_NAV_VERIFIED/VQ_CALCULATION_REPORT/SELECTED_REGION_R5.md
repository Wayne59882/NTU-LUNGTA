# V/Q 所選肺區末端血液修正 R5（2026-10-10）

依老師的訊息修正 End Capillary 的顯示範圍：本欄現在顯示所選模式代表的肺區末端血液（affected region, unit 1），不再顯示各肺區混合後的末端血液。

- End Capillary — Selected Region：直接讀取 `units[0]` 的 PCO2、PO2、CO2 內容量、O2 飽和度及 O2 內容量。肺區模式由原有情境選單決定。
- Arterial Blood：保留原有演算法，按各肺區血流及分流，混合 O2/CO2 內容量後反算分壓。没有直接平均分壓。
- General：保留整肺通氣加權的肺泡數值。局部 End Capillary 必須對照該局部肺泡，不要直接用 General 的整肺加權 PO2 判斷局部擴散。
- `selectedEndCapillary` 回傳所選肺區和肺區 V/Q。`mixedEndCapillary` 保留以前的混合末端數值供稽核，不用作這次所選肺區欄位。

本次没有更改11個 Default 輸入、23個 Default 顯示值、任何情境輸入、解離曲線或有效擴散係數。也没有更改肺區通氣/灌流分配、全身氧氣及二氧化碳收支、動脈與混合靜脈的計算、Lecture、Q&A、題庫或雲端設定。

High V/Q 原有情境：所選肺區 PcCO2=18.79 mmHg，PcO2=138.02 mmHg；混合後 PaCO2=55.27 mmHg，PaO2=38.70 mmHg。這些是原有演算法的不同取樣位置，不是固定設定的答案。

Low V/Q 的原有呼吸率仍為28/min，所選肺區 PcCO2=52.07 mmHg；老師圖中的呼吸率為32/min，不應混為同一組輸入。本版手動改成32/min時仍依實際輸入重新計算，並不為了對齊某張圖而固定輸出。

最新檢查與計算資料在 VQ_CALCULATION_REPORT/*R5_20261010.json。R4 及更早報告保留為先前版本的歷史紀錄。

## 原有參考校準說明（本次没有變動）

