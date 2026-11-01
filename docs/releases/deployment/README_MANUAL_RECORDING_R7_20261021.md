# v241.12.5 手動停止錄音完整版 R7（2026-10-21）

檔案：LUNGTA_COMPLETE_V241_12_5_MANUAL_RECORDING_R7_20261021.zip

## 使用方式

按 Start Voice Question 開始收音並更新文字；按原本的 Stop Recording & Answer（停止錄音並回答問題）後才停止收音、轉寫完整錄音並產生回答。停頓不會自動停止，也不會自動送出問題。沒有新增計時器、距上次更新秒數或狀態欄，沒有瀏覽器語音辨識重連機制。原有的狀態列仍可顯示正常操作或錯誤訊息。

## 最快上架

1. 將本 ZIP 保留在 Windows Downloads。
2. 解壓縮本 ZIP，進入解壓縮後的資料夾，雙擊 RUN_UPDATE.cmd。
3. 依提示輸入既有伺服器的密碼。看到 [FULL DEPLOY VERIFIED] 才代表網站與 API 檢查通過；程式會開啟網站。

RUN_FROM_WINDOWS.ps1 會尋找 Downloads 中最新的本次 R7 ZIP，計算與驗證傳輸 SHA-256，再呼叫同包 DEPLOY_FROM_WINDOWS.ps1。檔案若不在 Downloads，可從解壓縮目錄執行：

powershell -NoProfile -ExecutionPolicy Bypass -File .\RUN_FROM_WINDOWS.ps1 -ZipPath "完整 ZIP 路徑"

沿用目前已設定的 /path/to/workdir/NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED 與 v241.12.5-full-answer-voice 後端。先檢查既有後端，再備份及更新；保留課程、API key、資料庫、reference corpus 與設定。需要既有的 Cloudflare 登入、本機後端及 Node 20 以上版本。這是完整程式更新包，非空白伺服器的首次安裝器。

## 內部處理

完整音訊由單一 MediaRecorder 持續收集，沒有靜音終止計時器。文字預覽改由同一麥克風的 PCM 音訊分段交給既有本地 Faster-Whisper 端點 /api/reference/stt；一般約累積 4 秒音訊才送出一段，實際文字出現速度仍取決於本地轉寫服務。每次最多 12 秒新音訊並保留少量邊界重疊，同時只送一個預覽轉寫請求，避免無限制堆疊請求。這些請求只轉文字，不會呼叫回答模型。

按 Stop 時關閉文字預覽擷取，完整 MediaRecorder 音訊再送到原轉寫端點。完整轉寫結果是回答的主要輸入；預覽失敗不會主動停止錄音或提前回答。清除／切換模組視為取消，不送出舊問題；延遲的舊轉寫不會覆蓋新問題。作業系統或裝置若中斷麥克風，程式不會把該事件自動當成送出指令。

瀏覽器需要支援 MediaRecorder、Web Audio，且本地 STT 須正常運作，才有完整音訊與分段文字預覽。不支援完整路徑時保留原瀏覽器文字辨識備援；備援不會重新啟動辨識服務，其可持續多久受瀏覽器限制。背景頁面／鎖定螢幕／裝置權限中斷也可能由系統停止收音，程式不能保證排除此類系統限制。

## 驗證範圍

18 項手動停止／PCM 事件模擬測試在 Reference 與 KB 兩份實際程式均通過，包括長時間停頓、文字分段、沒有額外 UI、最後音訊區塊、停止只送出一次、意外中斷不送出、取消、延遲回傳、WAV 標頭與取樣值、AudioWorklet、預覽請求數限制及備援模式。原 V/Q 初始值與守恆、批次答題完整性、答案朗讀檢查通過。完整安裝／備份／還原／資料保留在隔離副本驗證。結果見 MANUAL_RECORDING_VALIDATION_20261021.json。

上述檢查未使用實際麥克風、真實 STT 或模型，亦未登入、修改或發布實際網站；Windows PowerShell 未在本執行環境實跑。真實裝置的長錄音體驗、轉寫延遲與正確性仍須上架後確認。模型、RAG、課程教材與 V/Q 計算未在本次變更。
