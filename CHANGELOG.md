# Change Log

## R14 — 2026-11-02

- Isolate unreadable PDF pages/units and retain durable page checkpoints for large-material retries.
- Accept scanned PDFs and add page-local Tesseract fallback with confidence gates, bounded resources, progress and cached OCR retries from retained originals.
- Retain private upload receipts and expose original-file diagnostics only to the owning teacher and administrator.
- Preserve cross-subject text/symbols and mathematical notation; reuse avatar resources during speech playback.
- Add a CI-gated private-server pull updater with backups, private-data preservation and rollback.
- Add controlled 1,001-page PDF, content, playback, upload-access and updater regressions.

## Operator layout and English README — 2026-11-01

- Separate setup, runtime, deployment, and corpus-ingestion tools under `scripts/`.
- Resolve launcher paths independently of the caller's working directory while retaining application data under `app/`.
- Replace the deployment tool's archived 3D-check dependency with a current local web-resource check.
- Let the speech setup helper create the expected Python environment instead of referring to an obsolete preparation script.
- Add isolated operator-script routing checks and document the verification limits.
- Rewrite the main and application READMEs in English with consistent feature, installation, usage, configuration, architecture, troubleshooting, and project-structure sections.

## 專案結構重整 — 2026-11-01

- 正式程式集中至 `app/`，測試、研究資料、版本說明與歷史工具分開分類。
- 共用 26 組 JavaScript、9 組 CSS 及圖片／音訊資產，保留原有腳本順序。
- 加入前端搬移契約、HTTP 資源與匿名頁面轉址檢查。
- 重寫完整 README，更新安裝、操作、架構、評測與遷移路徑。


## 文件整理草案 — 2026-11-01

- 建立專案首頁、主程式 README 與統一文件導覽。
- 補充安裝前提、系統架構、程式位置、評測定義及展示流程。
- 整理真實版本識別、已知工程項目與可公開重跑的驗證範圍。
- 新增離線檢查入口、GitHub Actions 設定、issue／PR 範本與引用資訊。
- 更新過時的教材檢索目錄說明，修正三模型來源文件中的模型數量文字。

此項為對基準 `8d33615` 的文件與工具整理；尚未成為公開發布版本。

## 既有更新文件索引

下表日期與內容依儲存庫原有文件整理，保留作為歷史索引，不代表已存在同名 Git tag、release 或分次 commit。

| 文件標示 | 內容 | 原始說明 |
|---|---|---|
| R12 · 2026-10-30 | 帳號登入、教師／學生及課程權限 | [R12](docs/releases/deployment/README_ACCOUNTS_R12_20261030.md) |
| R11 · 2026-10-28 | 問答備援、雲端輸出長度及課程名稱處理 | [R11](docs/releases/deployment/README_QA_FIX_R11_20261028.md) |
| R9 · 2026-10-21 | 語音問題與停止／送出流程 | [R9](docs/releases/deployment/README_VOICE_FIX_R9_20261021.md) |
| R8 · 2026-10-21 | 預設 V/Q 課程相關調整 | [R8](docs/releases/deployment/README_DEFAULT_VQ_ONLY_R8_20261021.md) |
| R7 · 2026-10-21 | 手動錄音流程 | [R7](docs/releases/deployment/README_MANUAL_RECORDING_R7_20261021.md) |
