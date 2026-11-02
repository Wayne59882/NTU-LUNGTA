# R14 完整檔案更新方式

這個 ZIP 是可由你自行上傳伺服器的完整程式。保留原本公開網址，不需要讓外部助理連進內網；也不必設定 GitHub 自動同步。套用更新時會短暫重啟服務，請選擇沒有正在上傳或建課的時段。

## 既有網站更新

1. 下載 `MC_VHTA_COMPLETE_R14_20261102.zip`。
2. 上傳到原本伺服器，**解壓在舊程式旁邊**，不要直接覆蓋舊資料夾。
3. 由原本啟動服務的同一個 Linux 使用者，在新解壓的資料夾內執行（不必手動停止既有服務；缺少的服務會先檢查連接埠再啟動）：

```bash
bash UPDATE_EXISTING_SERVER.sh /path/to/existing/live/app
```

把最後一個路徑換成目前放有 `reference_server.py`、`kb_server.py`、`gateway.py` 的舊程式目錄。更新工具會核對封裝中的程式檔、確認既有服務及執行環境，再備份、更新、重啟及發布既有 Cloudflare Worker。它保留帳號資料庫、已上傳教材、課程資料、私有檢索內容與既有 Worker 設定；不會從新封裝覆蓋這些資料。

使用前可先檢查、不更動程式：

```bash
python3 scripts/deploy/apply_release.py --target /path/to/existing/live/app --publish --check-only
```

這個更新工具不需要 Git，但重新發布公開網頁仍需要原本的 Cloudflare 發布權限、Node.js／npx 與對外網路。若出現登入要求，使用自己的 Cloudflare 帳號完成登入；不要把密碼或 API key 放進 ZIP。工具找不到既有服務或路徑時會先停止，不會猜測或強制結束其他程式。

## OCR 套件（伺服器只需準備一次）

掃描頁與亂碼頁會使用本機 Tesseract，不會呼叫付費雲端 OCR。預設需要 `eng`、`chi_tra` 語言資料。在 Ubuntu／Debian 伺服器上：

```bash
sudo apt-get update
sudo apt-get install -y tesseract-ocr tesseract-ocr-eng tesseract-ocr-chi-tra
tesseract --list-langs
```

若沒有 sudo 權限，請由伺服器管理員安裝到原本執行服務可用的環境。更新紀錄的 `LOCAL OCR` 若顯示 `available: false`，代表辨識工具／語言資料仍未就緒；程式更新本身不會自動安裝系統套件。一般可讀文字 PDF 不受此依賴影響。其他語言設定與 OCR 限制見[大型教材說明](server-sync.md)。

## 完成後確認

- 終端機出現 `UPDATE COMPLETE`，並記錄備份位置。
- 原本網址重新整理；管理員登入後可看到「所有教材上傳紀錄」。
- 用一份小型 PDF 試上傳，再測試講稿播放與問答；之後再測老師的大型教材。
- 本機可查 `http://127.0.0.1:8182/api/reference/health`，其中 `content_integrity_revision` 應為 `R14`。
- 更新紀錄在舊程式目錄的 `logs/manual_release_state.json`；備份在 `backups/manual_R14_時間/`。

若更新或發布失敗，工具會嘗試還原本地程式並重啟原服務，請保留完整錯誤訊息。若 Cloudflare 發布在中途失敗，需再確認公開網址；本地還原不等於已還原雲端發布。

這份封裝包含完整程式與測試，未包含你的帳號資料、上傳教材、私有參考書、模型權重或個人憑證。既有環境沿用這些資料；全新伺服器請依[安裝說明](getting-started.md)準備環境，不能只把 ZIP 上傳到 Cloudflare 靜態空間就執行 Python／本地模型。
