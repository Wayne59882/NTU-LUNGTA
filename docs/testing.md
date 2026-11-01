# 離線驗證

[回專案首頁](../README.md) · [模型評測](evaluation.md)

從儲存庫根目錄執行：

```bash
python3 scripts/check_offline.py
```

需要 Git、Python 3.12，以及 Node.js 22 或 24。檢查入口只使用 Python／Node 標準函式庫，既有題庫品質測試使用模擬模型。無須安裝 Wrangler、Python 套件、模型、教材全文或 API 金鑰。

## 檢查範圍

| 檢查 | 原有工具 | 覆蓋內容 |
|---|---|---|
| 語法 | Python AST、`node --check` | 公開原始碼的解析；不啟動服務 |
| 文件連結 | `scripts/check_offline.py` | 維護中文件的本地檔案／目錄連結 |
| V/Q | `VERIFY_VQ_CONSERVATION.cjs` | 守恆、預設值、參考案例、錯誤輸入等 28 項檢查 |
| 測驗導覽 | `VERIFY_V241_12_1_QUIZ_NAV.cjs` | 兩個頁面的跳題、保留選項及完成作答 |
| 批次回覆 | `VERIFY_V241_12_4_BATCH.cjs` | 5／20／41／100 題的解析、順序與缺漏回復 fixtures |
| 發音文字 | `VERIFY_V241_12_5_VOICE.cjs` | 答案選項朗讀與語音文字清理 fixtures |
| 錄音停止 | 根目錄 `VERIFY_VOICE_MANUAL_STOP.cjs` | 每個頁面 28 項停止／送出與 STT 路由 mock 檢查 |
| 題庫品質 | `VERIFY_V241_12_1_QUIZ_QUALITY.py` | 模擬生成、審查及題數行為 |
| Pilot 自檢 | `benchmark_3models.py --self-test` | 10 題輸入格式與三模型設定可被 runner 讀取 |

腳本遇到任何失敗就以非零狀態退出。個別 suite 的完整輸出可透過 `--report` 保存；檢查 Python 語法時不匯入模組，既有題庫測試執行時則可能產生被忽略的空課程工作目錄與 Python cache。

```bash
python3 scripts/check_offline.py --report /tmp/lungta-offline-report.json
```

Windows 的 report 路徑可改用本機暫存目錄。報告只在全部成功後寫入，與模型 benchmark 結果分開保存。

## GitHub Actions

[工作流程設定](../.github/workflows/offline-checks.yml) 在 push、pull request 或手動觸發時執行同一指令，以 Python 3.12 配合 Node.js 22／24 檢查。它只需要讀取儲存庫，不使用模型或寄信金鑰，也不執行部署。

此設定需推送到有權寫入的儲存庫後才會執行。此次本機執行通過，不表示已在 GitHub 產生 workflow run 或綠色狀態。

## 未覆蓋項目

真實模型 accuracy／latency、私有教材檢索、GPU 環境、R12 帳號與課程隔離、實機麥克風與音訊、公開部署，以及學習成效均需另外驗證。對功能的信心應限於已完成的對應檢查。
