# 離線驗證

[回專案首頁](../README.md) · [模型評測](evaluation.md)

需要 Python 3.12 與 Node.js 22 或 24，從儲存庫根目錄執行：

```bash
python3 scripts/check_offline.py
```

入口使用 Python／Node 標準函式庫。既有題庫測試使用模擬模型，資源測試使用短暫的本機 HTTP 服務，不需要 GPU、私有教材、API 金鑰或第三方 Python 套件。

| Suite | 工具 | 覆蓋範圍 |
|---|---|---|
| V/Q | `tests/regression/test_vq_conservation.cjs` | 原有 28 項數值、守恆與參考案例檢查 |
| 測驗導覽 | `test_quiz_navigation.cjs` | 跳題、選項保留與完成作答 fixtures |
| 批次回覆 | `test_batch_recovery.cjs` | 5／20／41／100 題解析、順序、復原及錯誤 fixtures |
| 發音文字 | `test_speech_pronunciation.cjs` | 選項朗讀、語言與文字清理 fixtures |
| 錄音停止 | `test_manual_stop.cjs` | 共享控制器的 28 項停止／送出 mock 檢查 |
| 題庫品質 | `test_question_generation.py` | 原有模擬生成、審查、題數與復原行為 |
| Pilot 自檢 | `research/three_model_10q/benchmark_3models.py --self-test` | 題目格式與三模型設定可被讀取 |
| 資源與 HTTP | `test_static_assets.py` | 兩頁原有腳本順序／內容雜湊、CSS／圖片、直接服務與 gateway 資源、健康端點及匿名轉址 |
| 操作腳本 | `test_operator_scripts.py` | Bash 語法、獨立暫存專案中的啟動／設定／部署呼叫鏈、缺少資源時阻止部署，以及教材輸出位置；外部指令均由替代指令模擬 |

入口另檢查現行 Python／JavaScript 語法及維護中文件的本地連結。`archive/`、`tests/legacy/` 與歷史 benchmark 不納入現行通過結果。

操作腳本檢查需要 POSIX 與 Bash；沒有 Bash 或非 POSIX 環境會明確回報跳過這一組。部署工具另使用 `python3 scripts/check_web_assets.py` 檢查本地資源及宣告的 avatar URL，該檢查不連網驗證外部 URL 的可用性。

保存完整輸出可使用：

```bash
python3 scripts/check_offline.py --report /tmp/lungta-offline-report.json
```

Windows 可使用自己的暫存路徑。腳本在任一檢查失敗時以非零狀態退出，完整成功後才寫入 report。

[GitHub Actions](../.github/workflows/offline-checks.yml) 在 push、PR 或手動觸發時，以 Python 3.12 配合 Node.js 22／24 執行同一入口，不執行部署。

真實模型 accuracy／latency、私有教材、GPU、實機語音、R12 帳號／課程隔離及學習成效均需另行驗證。本地資源檢查與匿名轉址檢查僅支持各自的測試範圍。
