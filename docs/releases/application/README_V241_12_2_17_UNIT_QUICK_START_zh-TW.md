# v241.12.2：17 單元教材快速開始練習

第 1 單元已經有 32 題時，現在可以立即從該單元抽兩題。Scenario Practice 的「Practice units」可選「All ready units」或一個指定單元；只會抽已達到所選題數的單元，不必等全部 17 個單元完成。

新建課程和舊課程續做時，系統先為各單元取得兩題，再為各單元建立最多十題的快速題庫，之後停止自動出題。想擴充某單元時，在 Practice units 選該單元，按「Build more for selected unit」，可繼續朝 100 題生成。已審核的題庫、教材、講稿和測驗紀錄會保留。選擇未完成的講稿或題庫單元時，系統會在目前模型呼叫完成後優先處理它。完整 17 個單元的講稿仍需逐個由本機模型生成，所需時間依硬體與教材長度而定。

## 最快部署（Windows PowerShell）

下載 `NTULUNG_TA_v241_12_2_17_UNIT_QUICK_START.zip` 到 Downloads，再貼上：

```powershell
$zip="$env:USERPROFILE\Downloads\NTULUNG_TA_v241_12_2_17_UNIT_QUICK_START.zip"
scp $zip USER@YOUR_SERVER:/path/to/workdir/
if ($LASTEXITCODE -ne 0) { throw "上傳失敗；停止安裝。" }
ssh -t USER@YOUR_SERVER "cd /path/to/workdir && unzip -tq NTULUNG_TA_v241_12_2_17_UNIT_QUICK_START.zip && unzip -oq NTULUNG_TA_v241_12_2_17_UNIT_QUICK_START.zip && cd NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED && chmod +x *.sh feedback/*.sh && ./INSTALL_FINAL.sh"
```

看到 `v241.12.2 DEPLOYMENT COMPLETE` 後重新整理 <https://lungta.twchu.workers.dev/reference/>；<https://lungta.twchu.workers.dev/api/health> 應顯示 `v241.12.2-17-unit-quick-start`。若安裝器在停止舊服務前提示未設定寄信，於套件目錄執行 `./feedback/CONFIGURE_FEEDBACK_RESEND.sh` 後再執行 `./INSTALL_FINAL.sh`。

驗證：完整 `./CHECK_V241_2_ONE_CLICK_STABLE.sh` 預檢通過，包含 17 單元已有 32 題的續做、單元局部抽題、先 2 題再 10 題、手動擴充、講稿優先處理、舊課程與兩種前端。測試使用模擬模型；正式機器的實際秒數與真實教材品質需部署後確認。
