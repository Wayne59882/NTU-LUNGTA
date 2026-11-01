# v241.1 One-Click Stable — Course-Adaptive Virtual Human TA

## 這版修正
- 一鍵安裝腳本會先處理 production server 的 Node PATH。
- Python 3.6 會自動安裝可用的 PyMuPDF 1.16.6 binary wheel，不再嘗試 source build。
- `course_runtime.py` 內建新舊 PyMuPDF API compatibility (`getToC/get_toc`, `pageCount/page_count`, `getText/get_text`)。
- 若新版資料夾沒有舊 Reference Textbook sqlite index，會自動從既有 v206.7 / v240.1 / v241_keep 尋找並複製；找不到時原有 runtime 仍可依既有流程重建。
- v241.1 acceptance 在任何部署/切換前完成，檢查失敗即停止，不改正在跑的服務。

## 多 PDF
支援一次在瀏覽器選取多個 PDF。前端會逐檔上傳到同一個 `stage_id`，backend 將所有 PDF 的 source 與 chapter/unit 合併在同一個 course workspace；Build Teaching Assistant 後，RAG index、lecture 與 question banks 都以這一組合併教材建立。

## Scenario Practice
每個「已選定的 chapter/unit」預先建立目標 100 題的題庫。每次 Scenario Practice 固定從每個 chapter/unit 隨機抽 2 題。

因此：
- 11 units → 22 題
- 8 units → 16 題
- N units → 2N 題

## Visual Model
由教師建立課程時明確選擇：
- `None — No Specialized Visual Model`
- `V/Q Visual Model`
系統不自行猜測是否顯示 V/Q。

## Server 一鍵執行
解壓後：

```bash
cd /path/to/workdir/NTULUNG_TA_v241_1_ONE_CLICK_STABLE_FINAL
chmod +x *.sh
./INSTALL_FINAL.sh
```

`INSTALL_FINAL.sh` 會自動完成 dependency/PATH 檢查、v241.1 acceptance，然後沿用既有穩定 deployment chain 啟動服務、Cloudflare Tunnel 與 Worker 部署。
