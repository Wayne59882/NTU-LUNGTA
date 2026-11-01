# v241.12.5 完整版 R9：語音提問修復（2026-10-21）

檔案：LUNGTA_COMPLETE_V241_12_5_VOICE_FIX_R9_20261021.zip

## 修好的問題

R7/R8 的語音提問把錄音送到 `/api/reference/stt` 轉文字，但伺服器的 gateway 把這個路徑轉給 Reference 後端，後端只有 `/api/stt`，所以一律回 404：
- 錄音期間文字完全不出來；
- 按 Stop Recording & Answer 後顯示「Server speech recognition is temporarily unavailable」，問題沒有送出。

R5 以前看起來正常，是因為瀏覽器內建語音辨識負責顯示即時文字，伺服器轉寫失敗時用它代替；R7 拿掉了這一層，問題才浮現。

## R9 的語音流程

1. 按 **Start Voice Question**：開始錄音，按鈕變成 Stop 可按。
2. 錄音期間：說的話即時顯示在問題框。
   - 主要：瀏覽器語音辨識（Chrome/Edge），邊說邊出字；瀏覽器每隔一段時間結束一次辨識時，自動接續，不會中斷錄音，也不會清掉已顯示的字。
   - 備援：瀏覽器辨識不能用或沒有出字時，每約 4 秒把錄音片段送到伺服器 Faster-Whisper（`/api/kb/stt`）轉寫，接在後面顯示。
3. 停頓不會自動停止、不會自動送出。只有按 **Stop Recording & Answer** 才停止收音。
4. 按 Stop 後：完整錄音送 Faster-Whisper 轉寫，結果取代預覽文字並送出回答；伺服器轉寫失敗時改用已顯示的文字回答。

Reference 與 Knowledge Base 兩個頁面相同。轉寫改走既有 `/api/kb/stt`（gateway → KB 後端 `/api/stt` → Faster-Whisper），伺服器後端不需修改或重啟；若某路徑回 404 會自動改試 `/api/reference/stt`。

## 同包一併恢復：老師要求的 V/Q 結果

R8 與目前網站上的 V/Q 計算是 R5 版（Low V/Q 所選肺區 PcCO2 52.07，老師要求約 46）。R9 放回 2026-10-10 依老師意見完成的 Hopkins 校正版：
- 23 個預設值不變（與 Hopkins 相同）；
- Low V/Q 所選肺區 PcCO2 46.03；High V/Q PcO2 139.22、PcCO2 17.39、動脈 PaCO2 58.41 上升；Diffusion PAO2 98.36、PaO2 70.40；True shunt FiO2 0.21→0.4 時 PaO2 39.45→42.60。
- V/Q 只在預設課程顯示（R8 功能）保留。

## 沒有改的部分

伺服器後端（gateway、reference/kb server、RAG、模型、課程、資料庫、金鑰）、Worker、題庫、講課、情境練習、批次答題、回饋功能都與 R8 相同。Web 只改 5 個檔：兩頁的 `25_v105_resume_after_question_mouth_sync.js`、`29_v153_course_aligned_student_results.js`、`35_hopkins_reference_lung_physiology.js` 與 `index.html` 快取版本號。

## 上架

Windows：把 ZIP 放在 Downloads，貼上回覆中的 PowerShell 指令；或解壓縮後雙擊 RUN_UPDATE.cmd。看到 `[FULL DEPLOY VERIFIED]` 才算完成，網站會自動開啟。部署前會先檢查既有服務並備份，失敗會自動還原。

## 驗證

見 VOICE_FIX_VALIDATION_R9_20261021.json。
