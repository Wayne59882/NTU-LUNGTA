# v241.3 課程 PDF 上傳與版面修正

## 一條龍部署（原站 lungta.twchu.workers.dev）

先確認新版 ZIP 已下載到 Windows 的「下載」資料夾，然後**在 Windows PowerShell** 執行（先前成功的 SSH 帳號／位址為 `USER@YOUR_SERVER`；該私有 IP 須在可連到伺服器的校園網路或 VPN 環境）：

```powershell
scp "$env:USERPROFILE\Downloads\NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED.zip" USER@YOUR_SERVER:/path/to/workdir/
ssh USER@YOUR_SERVER
```

看到伺服器的 Linux 提示字元後，才執行以下命令；不要在 Linux 終端執行上面的 PowerShell `scp`：

```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED.zip
cd NTULUNG_TA_v241_3_COURSE_UPLOAD_FIXED
bash ./INSTALL_FINAL.sh
```

請等到 `v241.3 DEPLOYMENT COMPLETE`，才以瀏覽器重新整理 `https://lungta.twchu.workers.dev/reference/`。在伺服器檢查版本：

```bash
curl -sS http://127.0.0.1:8179/api/health
```

應含 `v241.3-course-upload-fixed`。若只想先檢查、尚不切換服務：

```bash
VQ_PREFLIGHT_ONLY=1 bash ./INSTALL_FINAL.sh
```

安裝腳本會在停止舊服務前，使用和服務相同的 Python 安裝並檢查 PyMuPDF，跑 PDF 上傳預檢。會從 v241.2 等舊目錄恢復既有向量索引、課程、網站計數與設定（如有），再啟動服務與更新 Worker。不要刪除舊目錄，直到新版已驗證可用。

## 課程操作

1. 於 `Build a Course` 輸入課名、選一份或多份可搜尋文字的 PDF，按 `Upload & Inspect Course Materials`。
2. 查看偵測到的來源與章節；可取消章節或修正章節名稱，按 `Build Teaching Assistant`。
3. 等候建置完成（向量索引、各章講稿與題庫，教材大時可能較久）。`Active Teaching Assistant` 切換為新課程後，Lecture、Free Q&A 與 Scenario Practice 才使用新教材。
4. V/Q Visual Model 在成功解析的 PDF 內偵測到呼吸生理內容時才出現。非呼吸課程不顯示。分類採用教材文字的關鍵概念，教師仍應檢查判定；無文字的掃描 PDF 先 OCR。

## 注意

線上公開網址的上傳需經 Cloudflare 與伺服器；過大的檔案可能超出其請求上限，建議按章節拆成多份 PDF。API Key 的 Confirm 和 Clear 在同一排。舊的 Knowledge Base / Reference Textbook 切換已從此介面移除，課程 Q&A 會依目前所選的教材回答；既有資料與 API 保留。

## 啟動停在 START SERVER STACK

若啟動紀錄顯示 `No module named 'fitz'`，表示語音環境更動 PATH 使服務啟動時用到另一個 Python。此修正版在安裝一開始固定 Python 的絕對路徑；正在使用先前已上傳的 ZIP 時，可在伺服器暫時以 `PYTHON_BIN="$(command -v python3)" bash ./INSTALL_FINAL.sh` 重啟。若仍失敗，查看 `/path/to/workdir/v241_3_course_upload_server.log`；安裝器現在會顯示進度並在服務退出時立即列出錯誤。
