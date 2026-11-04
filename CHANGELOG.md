# Change Log

## R17f — 2026-11-04

- 自然對話只保留一種回答方式：伺服器先在選定課程（內建教材或上傳的 PDF）搜尋，Gemini 只依回傳的教材片段回答，超出範圍由伺服器拒答。移除「Checked reply」選項及其程式（由 Gemma／Ministral／Luna 寫答案再由 Gemini 念出）；左邊原本的 Q&A 與模型完全不變。
- 說明文字只留「Press Start and talk any time. Answers use only the course material.」

## R17e — 2026-11-04

- 自然對話的選項改名，避免誤以為答案來自 Gemini 自己的知識：兩種方式都只用課程教材（內建教材或上傳的 PDF）。「Fast reply · Gemini」由 Gemini 依教材片段直接回答；「Checked reply · <選定模型> · slower」由 Gemma／Ministral／Luna 依教材寫答案並核對，Gemini 只負責念。標題改為「NATURAL CONVERSATION」，說明文字註明答案只用課程教材。

## R17d — 2026-11-04

- 修正：自然對話一開始沒人說話卻用西班牙文開頭。背景雜音被當成說話，Gemini 再從雜音猜語言。現在預設語言為台灣華語（繁體用語），開始時先用中文簡短問候；學生清楚說出完整的其他語言句子才切換；雜音不會再決定語言，也較不容易被誤判為說話。
- 自然對話說明文字精簡為一行：「Press Start and talk any time — you can interrupt. Voice is processed by Google Gemini.」；狀態列簡化為「Listening — talk any time.」。

## R17c — 2026-11-04

- 修正：自然對話（Gemini Live）把內建課程名稱「Respiratory Physiology」當成範圍，拒答腎臟、腸胃等其他生理章節。內建教材本來就涵蓋整套生理學教科書；現在範圍只由伺服器的教材搜尋決定，伺服器找到教材片段時 Gemini 必須依片段回答，不再自行依課程名稱判斷。
- 內建預設課程名稱改為「Built-in Physiology (default)」／「內建生理學課程」。只改畫面文字；Q&A 模型提示、講稿、題目產生方式與 V/Q 模型不變。

## R17 — 2026-11-04

- 新增選用的「自然對話（Gemini Live）」模式，與原本的 Q&A 並存。學生直接說話、可隨時插話；每個課程問題先由本系統伺服器搜尋目前選定的課程（內建教材或老師上傳的課程），超出範圍由伺服器判定並拒答，Gemini 只能依回傳的教材片段回答，並列出使用的來源。
- 使用者自行輸入 Gemini API Key（只存在此瀏覽器分頁）；學生語音與相關教材片段會送到 Google，回答為即時語音，未像原本 Q&A 逐段核對。原本的 Q&A、核對流程與模型完全不變。
- 聲音跟隨老師設定：Yating 女聲（Gemini Kore）、Zhiwei 男聲（Gemini Charon）；對話中切換會重新連線並延續對話。3 分鐘無人說話自動結束。
- 畫面改為左右並排：左邊原本的 Q&A（打字／錄音），右邊自然對話。自然對話可選回答來源：「Gemini（最快）」或「目前選定的 Q&A 模型」——Gemini 只負責聽與說，答案由 Gemma／Ministral（本機）或 GPT-5.6 Luna 透過原本的伺服器流程產生並經教材核對；等待時先說「我查一下教材」，新問題會取消仍在準備的舊答案。

## R16 — 2026-11-03

- 修正：本機模型回答時出現「Invalid job response」。回答進度查詢誤把內部的取消控制物件一起回傳，伺服器無法轉成資料而中斷連線；新增實際伺服器 HTTP 測試。
- 學生問答優先：背景準備課程（講稿、題目、PDF 圖片）遇到學生提問時立即讓出模型，答完再接續；所有本機模型呼叫使用同一個 context 大小，避免模型反覆重新載入。
- 切換模型：已送出的題目改由新選的模型重新回答，舊模型的工作在伺服器端取消，不會再出現第二個答案；Confirm API Key 先驗證金鑰，失敗時維持原本的本機模型並顯示原因。
- Stop Recording & Answer：顯示轉錄進度，伺服器轉錄最多等 10 秒即改用即時字幕自動送出；連按 Submit 只建立一個回答工作。
- 課程處理中可隨時 Delete Course；建課中可 Cancel Build，背景工作會停止且不會重建已刪除的檔案。
- 教材處理方法維持 R15：講稿、題目與圖片辨識的產生方式不變。另提供選用設定 `VQ_PDF_VISION_FIGURES=background`（文字充足頁面的圖片改在講稿後背景辨識），預設關閉。
- 已變更的網頁程式更新快取版本，手機與瀏覽器會載入新版；新增學生優先／刪除／取消測試與真實瀏覽器 Q&A 流程測試。

## R15 — 2026-11-03

- 修正 KB 啟動缺少 SharedModelLock；共用模型鎖與背景預熱，新增不依賴模型暖機的版本 ready 檢查。
- PDF 圖片／損壞文字／重要圖像改先使用已安裝的本機視覺模型，再以原始像素核對；保持逐頁快取及 OCR 備援，未讀內容明確列示。
- 講稿、本機／雲端問答逐段核對教材引文，情境題增加引文檢查；封住傳入 context 及舊更正快取繞過課程範圍的路徑。
- 舊生成內容備份後重新核對，保留上傳原檔、帳號與作答紀錄；新增實際三服務啟動與跨學科來源測試。

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
