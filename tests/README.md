# 測試

從儲存庫根目錄執行 `python3 scripts/check_offline.py`。

`regression/` 包含目前自動執行的回歸測試；`fixtures/frontend_contract.json` 保存重整前的腳本內容雜湊與載入順序，用來檢查搬移與共用化是否改變既有程式。`legacy/` 保留歷史版本的驗證工具，未納入目前通過結果。

這些檢查涵蓋指定功能與本地 HTTP 資源，不包含真實模型正確率、GPU 效能或使用者裝置的音訊品質。詳見[測試範圍](../docs/testing.md)。
