# v235：Full Human Physiology Multi-Textbook Agent

這一版把系統定位修正為「人體生理學 + 直接相關病理生理」，呼吸國考只是目前的 benchmark subset，不再用呼吸題目反過來限制整個系統範圍。

Production RAG 使用 4,792 個 passages：Guyton 全部已索引內容 2,644、Vander 全 19 章 1,610、Beachey 13 章完整 corpus 538。Rau 為呼吸藥理學，暫不納入主要 physiology corpus。

檢索採 source-balanced Vector RAG：除了全 corpus Top candidates，也讓 Guyton / Vander / Beachey 各自取得候選名額，再以相同 BGE-M3 sentence-window vectors 做 exact semantic rerank，最後送 Top 6 evidence 給模型。MCQ 另外對 A/B/C/D 做完全對稱的 option-contrast retrieval，不知道官方答案，也不會把答案 key 放進 prompt。

v235 也新增「模型內部選項一致性」檢查：模型先對每個選項標記 supports / contradicts / insufficient；只有當它自己的表格唯一指向某選項、但最後輸出的字母卻與自己的判斷矛盾時，系統才允許修正。這不是外部 knowledge validator，也沒有寫死任何生理答案。

已看過的 12 題放在 `benchmark/regression/v235_seen_regression.jsonl`，只做 regression。執行時 expected option 不會送進 retrieval 或 LLM，答案完成後才比對。真正研究 accuracy 必須另外用未參與修改的新題。

## 安裝

在 server：

```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v235_FULL_HUMAN_PHYSIOLOGY_MULTITEXTBOOK_AGENT_STABLE_FINAL.zip
cd /path/to/workdir/NTULUNG_TA_v206_7
chmod +x INSTALL_V235_FULL_PHYSIOLOGY_STABLE.sh
./INSTALL_V235_FULL_PHYSIOLOGY_STABLE.sh
```

第一次安裝因 corpus 從 2,644 擴充到 4,792 passages，需要替新增內容建立 BGE-M3 passage/window embeddings。installer 會自行處理並顯示進度；不要中途關閉 SSH。既有 Guyton prefix index 若符合驗證條件會直接重用，不重新計算原本 2,644 passages。

## Regression（安裝完成後再跑）

```bash
cd /path/to/workdir/NTULUNG_TA_v206_7
./benchmark/regression/RUN_V235_SEEN_REGRESSION.sh --model granite
```

目標是 12/12，但這個數字必須以 server 上實際 Granite 執行結果為準；portable ZIP 的 static acceptance 不能取代真實 LLM inference。
