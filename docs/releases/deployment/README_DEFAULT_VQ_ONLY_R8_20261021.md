# v241.12.5 完整版 R8：V/Q 只顯示於預設課程

檔案：LUNGTA_COMPLETE_V241_12_5_DEFAULT_VQ_ONLY_R8_20261021.zip

只有 Currently teaching 選擇 Built-in Respiratory Physiology (default) 才顯示 V/Q Visual Model 按鈕與內容。所有上傳課程均隱藏，包含上傳的呼吸生理 PDF。載入上傳課程資料期間也隱藏；由 V/Q 切換至上傳課程時會回到 Lecture / Q&A。切回預設課程後恢復 V/Q 按鈕。

本包沿用前一份手動停止錄音完整版；錄音、模型、RAG、課程內容及 V/Q 數值計算檔案未在本次修改。此版本保留完整 503 個應用程式檔案。

## 最快更新

將本 ZIP 下載至 Windows Downloads，執行本次回覆提供的整段 PowerShell 指令。會自動找本次 R8 ZIP、驗證、解壓縮並部署。

也可解壓縮本 ZIP 後，雙擊 RUN_UPDATE.cmd；它會呼叫同包 RUN_FROM_WINDOWS.ps1，尋找 Downloads 內最新 R8 ZIP。若 ZIP 放在其他地方，可傳入 -ZipPath。

看到 [FULL DEPLOY VERIFIED] 才代表本次公開網站檔案及 API 驗證完成。程式會先檢查既有服務、備份，再更新；本次加入 course UI JS 的公開檔案比對，以確認新顯示規則已發布。需要既有 Cloudflare 登入及健康的 v241.12.5-full-answer-voice 後端。沿用既有 /path/to/workdir/NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED 安裝位置。

兩份介面各完成 6 項 DOM 邏輯檢查（共 12 項）：預設顯示、載入課程期間隱藏、上傳呼吸 PDF 隱藏、其他課程隱藏、切離 V/Q 返回 Lecture / Q&A、切回預設恢復顯示。JavaScript/Bash 語法檢查通過，且比對前版確認其他應用程式內容相同。這些不是實際瀏覽器或實際伺服器的部署驗證。本次未登入或更新網站，Windows PowerShell 尚未在本環境實跑。
