# v241.12：Report 收據、郵件狀態與自動修正可見

此文件保留回報功能的歷史說明；最新收件地址與安裝指令請看 `README_V241_12_1_zh-TW.md`。

## 這次修正

- 按 **Send feedback** 後，必須收到伺服器的 `saved=true` 與 Report ID，才顯示「Report saved」。收據留在答案下方；關閉視窗、重新整理後仍可用 ID 查詢。收據分別顯示郵件 `queued / sent / failed / not_configured`，以及修正 `queued / reviewing / ready / error / kept`，不再把「已排入寄送」誤寫為「已寄達」。
- 自動修正完成時，收據可以展開查看修正版。負面評論會分類為錯誤、缺漏、說明不清或樣式問題；原評論作為**未經驗證的改進要求**，重新檢索教材後才用於撰寫與審查。修正版通過自動檢查才保存到同課程、同題的回答記憶；肯定回饋只記錄，不重寫。這是來源約束的答案修訂和記憶，不會更新模型權重，也不能保證每次都修得正確。無法取得教材證據或模型失敗時會顯示錯誤，舊答案不會被默默覆蓋。
- 修正記憶現在也涵蓋內建參考書的雲端單題與批次問答；上傳課程原有的雲端修正記憶仍保留。只有教材檢索確認在範圍內才會套用先前的修正版。
- 郵件目標以伺服器 `feedback/feedback.env` 設定為準，預設為 **admin@example.com**。伺服器優先保留既有寄信設定，並把舊版本可能寫入的絕對資料庫路徑改指向新版本；安裝時會合併舊資料庫中的回報。已排入寄送而被重啟打斷的郵件會恢復。

## 最快部署

此單一 ZIP 含有完整安裝所需的檔案。兩個頁面使用完全相同的圖像與語音素材，壓縮包只存一份；安裝器會在伺服器本機複製成兩份，不依賴舊版素材。

下載 ZIP 到 Windows 的 Downloads，在 PowerShell 依序執行：

```powershell
scp "$env:USERPROFILE\Downloads\NTULUNG_TA_v241_12_1_REPORT_RECIPIENT_FIXED_COMPLETE.zip" USER@YOUR_SERVER:/path/to/workdir/
ssh USER@YOUR_SERVER "cd /path/to/workdir && unzip -tq NTULUNG_TA_v241_12_1_REPORT_RECIPIENT_FIXED_COMPLETE.zip && unzip -oq NTULUNG_TA_v241_12_1_REPORT_RECIPIENT_FIXED_COMPLETE.zip && cd NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED && chmod +x *.sh feedback/*.sh && ./INSTALL_FINAL.sh"
```

完成後開啟 `https://lungta.twchu.workers.dev/reference/`，健康檢查版本應是 `v241.12.1-quiz-navigation`。送出一筆測試回報，確認頁面出現 Report ID；查看答案下方的郵件與自動修正狀態。

## 若收據顯示 Email: not sent

程式碼無法憑收件地址直接寄信；伺服器仍須有可用的 Resend API Key 或 SMTP 憑證。若舊版沒有設定，可在新版本資料夾執行一次：

```bash
./feedback/CONFIGURE_FEEDBACK_RESEND.sh
./INSTALL_FINAL.sh
```

設定程式以 `admin@example.com` 作為預設收件地址；請根據 Resend 帳號上顯示的信箱在提示時確認或修改。若使用預設 `onboarding@resend.dev`，收件地址必須是 Resend 帳號關聯地址；否則要使用你已驗證的寄件網域。Key 只保存在伺服器的 `feedback/feedback.env`，不會放進 ZIP 或學生瀏覽器。

伺服器可用 `curl -fsS http://127.0.0.1:8179/api/reference/feedback-status` 檢查 `email_configured`；它是**設定檢查**，不能代替實際測試信或 Gmail 收件匣確認。舊版因未設定郵件服務而標記 `not_configured` 的回報會保留於資料庫，但不會在升級時大量補寄。

若要補寄剛才那一筆**確實有保存**、但狀態為 `not_configured` 或 `failed` 的回報，可在新版資料夾執行 `./feedback/RETRY_FEEDBACK_EMAIL.sh --latest`；若知道 Report ID，改以該 ID 取代 `--latest` 更精確。這個指令只補寄一筆，不會重寄已標記 `sent` 的紀錄。

## 驗證界限

`./CHECK_V241_2_ONE_CLICK_STABLE.sh` 已測試 SQLite 儲存、舊資料合併、模擬 Resend 接受、重啟恢復、收據各種狀態、修正版預覽，以及雲端單題／批次套用既有修正記憶。這些是本機模擬與生成教材測試；本環境沒有你的正式伺服器郵件憑證、實際 Gmail 投遞紀錄或你剛才那筆回報的 ID，不能據此宣稱那筆舊回報已寄達或正式站已更新。
