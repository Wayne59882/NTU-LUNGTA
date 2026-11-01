# NTU-LUNGTA 主程式

這是目前教學系統的程式目錄。資料夾沿用 v241.12.1 的名稱；`VERSION.txt` 為 `v241.12.5-full-answer-voice`，程式另外包含 R12 帳號與權限更新。

**第一次閱讀請先看[專案首頁](../README.md)**，再依需求查看：

| 文件 | 內容 |
|---|---|
| [安裝與設定](../docs/getting-started.md) | 執行環境、模型、教材、帳號與服務檢查 |
| [系統架構](../docs/architecture.md) | 前後端、服務埠與教材檢索流程 |
| [程式導覽](../docs/code-map.md) | 各模組對應的實際檔案 |
| [評測與資料](../docs/evaluation.md) | 正確率、等待時間、測試資料及適用範圍 |
| [離線驗證](../docs/testing.md) | 可以在公開版本直接重跑的檢查 |
| [展示流程](../docs/demo-guide.md) | 向老師展示功能、程式與證據的順序 |

從儲存庫根目錄執行：

```bash
python3 scripts/check_offline.py
```

本目錄的 `README_V*.md`、`BUILD_MANIFEST_*.txt`、`INSTALL_V*.sh` 和 `CHECK_V*.sh` 保留各次更新的說明與工具。請先從統一文件入口判斷用途，再選擇對應版本的工具。
