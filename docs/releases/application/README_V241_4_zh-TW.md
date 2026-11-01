# v241.4：課程上傳、切換與 V/Q 模型修正

## 這版做了什麼

- 解析 PDF 書籤時排除封面、IFC、書名頁、版權頁、目錄等前置頁。優先辨識 Chapter/Unit/第 N 章；若無可靠書籤，將整份 PDF 標示為待確認單元，適合改成逐章 PDF 上傳。老師仍可取消或修改單元。
- 建置成功後自動選取新課程並重新載入頁面；手動切換課程也會重新載入。下方「Update course list」只用於同步另一個工作階段新增的課程，不是啟用課程的必要步驟。
- 內建 Respiratory Physiology 為預設課程，永遠提供 V/Q Visual Model。其他課程僅在教材偵測到呼吸生理相關內容時顯示該分頁。
- 上傳課程的講課單元、學生問答檢索及 Scenario Practice 隨目前課程切換。每單元**成功建置 100 題**才標示課程就緒；每次測驗從各單元題庫隨機抽 2 題。不足 100 題時清楚顯示建置失敗，避免將不完整題庫當作完成品。
- 若安裝或服務切換使上傳暫存遺失，開始建置時會從仍在檔案輸入框的 PDF 自動補傳一次。其他 API 錯誤會保留伺服器回覆供排查。

題目是模型依上傳教材生成，程式會檢查選項數、答案格式、說明及教材段落 ID；這些檢查**不等於學科正確性審查**。教師仍需抽查題目和解說。掃描版 PDF 必須先 OCR；極短單元可能無法形成 100 題不重複且合格的題目。

## 部署到原站

請在 Windows PowerShell，於 ZIP 所在的「下載」資料夾執行：

```powershell
scp "$env:USERPROFILE\Downloads\NTULUNG_TA_v241_4_COURSE_FLOW_FIXED.zip" USER@YOUR_SERVER:/path/to/workdir/
ssh USER@YOUR_SERVER
```

接著在伺服器執行：

```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v241_4_COURSE_FLOW_FIXED.zip
cd NTULUNG_TA_v241_4_COURSE_FLOW_FIXED
bash ./INSTALL_FINAL.sh
```

等待 `v241.4 DEPLOYMENT COMPLETE`，再在瀏覽器重新整理 `https://lungta.twchu.workers.dev/reference/`。先查版本：

```bash
curl -sS http://127.0.0.1:8179/api/health
```

其中應顯示 `v241.4-course-flow-fixed`。只先執行測試、不切換線上服務：

```bash
VQ_PREFLIGHT_ONLY=1 bash ./INSTALL_FINAL.sh
```

安裝器會保留舊版向量索引與已建課程（如有），並在停止舊服務前執行檢查。請先保留舊資料夾，直到新版網站及課程操作都已核對。原始測試 PDF 並不在此程式包內；若同一份 PDF 的書籤仍辨識錯誤，需檢查該 PDF 的實際書籤結構。
