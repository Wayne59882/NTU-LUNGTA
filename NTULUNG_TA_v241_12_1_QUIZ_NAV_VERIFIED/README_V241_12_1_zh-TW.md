# v241.12.3：簡潔的章節清單

練習畫面左側只列章節名稱，不再顯示每章的「reviewed questions ready」與「source facts evaluated」等內部處理數字；上方題目進度也改為簡單的練習狀態。選章節的下拉選單仍顯示可用題數，方便選擇可練習的單元。原本的逐章先 2 題、再補到 10 題、選章節擴充到 100 題、既有課程續做與考題審核功能均保留。

## 最快部署（Windows PowerShell）

下載 `NTULUNG_TA_v241_12_3_CLEAN_CHAPTER_LIST.zip` 到 Downloads，貼上：

```powershell
$zip="$env:USERPROFILE\Downloads\NTULUNG_TA_v241_12_3_CLEAN_CHAPTER_LIST.zip"
scp $zip USER@YOUR_SERVER:/path/to/workdir/
if ($LASTEXITCODE -ne 0) { throw "上傳失敗；停止安裝。" }
ssh -t USER@YOUR_SERVER "cd /path/to/workdir && unzip -tq NTULUNG_TA_v241_12_3_CLEAN_CHAPTER_LIST.zip && unzip -oq NTULUNG_TA_v241_12_3_CLEAN_CHAPTER_LIST.zip && cd NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED && chmod +x *.sh feedback/*.sh && ./INSTALL_FINAL.sh"
```

安裝完成後重新整理 <https://lungta.twchu.workers.dev/reference/>。<https://lungta.twchu.workers.dev/api/health> 的 build 應為 `v241.12.3-clean-chapter-list`。如安裝器在切換服務前提示未設定寄信，請在套件目錄執行 `./feedback/CONFIGURE_FEEDBACK_RESEND.sh`，再執行 `./INSTALL_FINAL.sh`。

驗證：完整 `./CHECK_V241_2_ONE_CLICK_STABLE.sh` 預檢通過，包含 17 單元分段出題、題目導覽、章節練習 UI 與部署相容性。正式機器的實際模型生成速度需在部署後觀察。
