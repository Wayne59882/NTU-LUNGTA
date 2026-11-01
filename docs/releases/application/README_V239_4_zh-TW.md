# v239.4 Dynamic Batch Feedback

此版針對多題回答的學生回報機制修正，不改變 v238.1 的推論/RAG 主流程，也不改變五模型 benchmark 設計。

## 多題偵測
系統沿用既有 robust batch parser。輸入 15 題時，Feedback 會以 15 題處理；輸入 20 題時會以 20 題處理。既有 batch 上限仍為 40 題。

## Report scope
多題回答的 Report UI 提供三種範圍：

- All questions：回報整批。
- One question：輸入單一題號，例如 `6`。
- Multiple questions：輸入多個題號或範圍，例如 `2,5,8-10`。

不再列出 15/20/40 個下拉選項。

## Email / SQLite
每筆 feedback 會記錄：
- `report_scope`
- `batch_size`
- `reported_items`

既有 SQLite 會自動新增欄位，不會刪除舊 feedback。Resend 仍採「先寫 SQLite，再非同步寄信」流程。

## 部署前驗證
可只跑檢查、不重啟服務：

```bash
VQ_PREFLIGHT_ONLY=1 ./INSTALL_FINAL.sh
```

必須看到：

```text
===== ALL v239.4 FULL PREFLIGHT CHECKS PASSED =====
```

再正式執行：

```bash
./INSTALL_FINAL.sh
```

如果校內 server 對 `workers.dev:443` 暫時 timeout，Worker 已成功 upload 且 origin health 正常時，v239.4 會顯示 WARN 而不再把整個 installer 誤判成失敗。
