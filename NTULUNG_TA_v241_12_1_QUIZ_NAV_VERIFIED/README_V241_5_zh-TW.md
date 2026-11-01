# v241.5：修正課程建置時的 HTTP 400

畫面中的 23 個單元已從 PDF 成功辨識。v241.4 把**背景建置失敗**錯誤地顯示成「build failed to start」，沒有指出是哪個階段失敗；建置流程中未處理的 HTTP 400 出現在 PDF 向量嵌入請求。原始 PDF 和伺服器的 Ollama 錯誤內容不在程式包內，因此無法從截圖判定是該段文字過長、特殊字元或模型設定所致。

這版在送入 BGE-M3 前清除控制字元並限制單次文字長度。遇到嵌入 HTTP 400/413 時，先拆分批次，再縮短出錯的單段文字，並以最簡請求重試；若仍無法嵌入，會將 Ollama 回傳的原因、失敗的 passage/窗口序號與建置進度顯示在畫面上。安裝器會在更新公開網站前，使用較長的英文和中文文本實測同一個課程嵌入流程。

這項修正不會修改既有的內建呼吸生理課程、V/Q 分頁或已建立的課程。23 個單元若全部選取，建置還需要用選定的本機模型產生合計 2,300 題；這會花相當長的時間。可先勾選一個單元確認完整建置，再處理整本書。每單元必須形成 100 題合格格式的題庫，Scenario Practice 才能從每單元抽 2 題；模型生成的學科正確性仍需教師抽查。

## 部署

Windows PowerShell：

```powershell
scp "$env:USERPROFILE\Downloads\NTULUNG_TA_v241_5_COURSE_EMBED_RECOVERY.zip" USER@YOUR_SERVER:/path/to/workdir/
ssh USER@YOUR_SERVER
```

伺服器終端：

```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v241_5_COURSE_EMBED_RECOVERY.zip
cd NTULUNG_TA_v241_5_COURSE_EMBED_RECOVERY
bash ./INSTALL_FINAL.sh
```

看到 `v241.5 DEPLOYMENT COMPLETE` 後重新整理 `https://lungta.twchu.workers.dev/reference/`。先確認版本：

```bash
curl -sS http://127.0.0.1:8179/api/health
```

回覆應含 `v241.5-course-embed-recovery`。安裝器會保留上一版的向量索引與已建課程。若嵌入服務的**單段短文字**仍回傳 400，安裝器會在更新公開站前停止，保留原始 Ollama 原因供排查；不會將這類失敗偽裝成上傳或建置請求錯誤。
