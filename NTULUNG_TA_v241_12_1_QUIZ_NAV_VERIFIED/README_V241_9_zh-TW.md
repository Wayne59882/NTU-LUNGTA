# v241.9：中文講稿、情境題、回報與聲線修正

## 修正內容

- **PDF 亂碼**：解碼這本 *Respiratory Care Pharmacology* 範例中可確認的特殊字型字元；無法確認的字元所在句子不再進入課程檢索、講稿或出題。若章節仍缺乏足夠可讀文字，建置會顯示明確的 OCR 提示。舊課程在服務重啟後重新清理已保存的章節文字、來源段落、索引、講稿和題庫，不用重新上傳。
- **Teacher Script**：依所選單元的清理後教材摘錄，用本機模型寫繁體中文講稿；每單元準備狀態獨立顯示。講稿未完成時不開放播放，避免播出原文亂碼。原有講解、同步標示、暫停、繼續功能仍由同一講課控制器管理。
- **Scenario Practice**：從每個單元快速準備 **100 個不同的教材知識點**；每次隨機抽兩個，由本機模型寫成有具體人物與情境的繁體中文四選一應用題。驗證題幹、四選項、解析與可在原文核對的引文，不合格的填空或亂碼不會展示。合格題目會快取，之後抽到同一知識點不必重寫。
- **聲音**：雅婷只選同語言的女性聲線，哲偉只選男性聲線。如果瀏覽器／裝置沒有相符語言及聲線，頁面會說明原因，避免悄悄改用另一性別的聲音。
- **Report**：課程問答完成後會明確顯示 **Report this answer**。回報保存問題、原答案、comment、課程及來源；伺服器重新檢索教材，產生新答案並審查，通過後記住同課程同問題的修正版。相近問題只沿用安全的回答指引。原有寄信功能會在 `feedback/feedback.env` 已設定時排入佇列。
- **課程與續傳**：可一次上傳多個 PDF、全選／清空單元、刷新後從已收的分段續傳。建置作業保存在伺服器；完成後自動切換新課程。切回內建呼吸生理顯示 V/Q，非呼吸課程隱藏。

這裡的「100」是可供隨機抽取的不同**來源知識點**，並非先產生 100 道完整情境題。如此能快速開放練習，同時避免大量低品質填空題。抽中的兩題仍需模型撰寫，速度取決於本機模型與已選單元數；頁面會顯示進度，不能把文字生成當作純檔案複製。

## 網頁內最快上傳流程

1. 輸入 **Course Name**，在 **Course Materials (PDF)** 一次選好 PDF。
2. 按 **Upload & Inspect Course Materials**，確認偵測出的真正教學單元；使用 **Select all**、**Clear all** 或個別勾選。
3. 按 **Build Teaching Assistant**。文字抽取後課程問答先開放，頁面會自動切換；中文講稿、100 個來源知識點與語意索引另有進度。
4. 所選講稿狀態顯示完成後按 **Start Lecture**；知識點完成後按 **Start Balanced Quiz**，等待抽中的情境題寫成並驗證。

重新整理頁面可接續上傳與建置。掃描版 PDF、未能正確抽字的 PDF 請先做 OCR。需要寄信時，在伺服器執行 `feedback/CONFIGURE_FEEDBACK_EMAIL.sh` 或 `feedback/CONFIGURE_FEEDBACK_RESEND.sh`，設定收件地址並重啟服務。

## 部署

Windows PowerShell：

```powershell
scp "$env:USERPROFILE\Downloads\NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE.zip" USER@YOUR_SERVER:/path/to/workdir/
ssh USER@YOUR_SERVER
```

伺服器：

```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE.zip
cd NTULUNG_TA_v241_9_CLEAN_CHINESE_SCENARIOS_FEEDBACK_VOICE
chmod +x *.sh
./INSTALL_FINAL.sh
curl -fsS http://127.0.0.1:8179/api/health
```

健康檢查應顯示 `v241.9-clean-chinese-scenarios-feedback-voice`。安裝器會先跑完整本機預檢，再保留 v241.8 的課程工作區、未完成上傳、回報資料庫與電郵設定並啟動新版。若只想先驗證，執行 `VQ_PREFLIGHT_ONLY=1 ./INSTALL_FINAL.sh`。

## 驗證範圍

`./CHECK_V241_2_ONE_CLICK_STABLE.sh` 包含 PDF 字型修復、未知字形排除、跨刷新續傳、舊課程升級、中文講稿狀態、兩單元各 100 個知識點、抽題後模型 JSON 與教材引文檢查、上傳課程 Report 顯示、男女聲線選擇，以及單題／批次回報後的修正版記憶。測試使用合成 PDF 與模擬模型；正式機器上的實際 PDF、語音清單與郵件送達仍須部署後檢查。
