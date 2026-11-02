# 大型教材處理與伺服器同步

[回專案首頁](../README.md)

## R14 教材處理

「已上傳」代表原檔到達伺服器，與「已完成建立課程」是兩個狀態。R14 保留上傳原檔、接收時間、檔案大小及 SHA-256，並逐頁保存解析結果。重試或服務重啟後沿用已成功的頁面；一頁或一個單元無法辨識，不再中止其他可用單元。

無法讀取的頁面會列出來源頁碼和原因。純掃描 PDF 也會正常接收，不會在上傳檢查時直接退回。圖片頁、文字太少的圖像頁與亂碼頁會自動嘗試本機 Tesseract OCR；原本乾淨的文字頁沿用直接擷取。一次只處理一頁，限制影像大小、OCR 執行緒與每頁時間，逐頁回報進度並保存結果。

OCR 採用辨識信心篩選完整段落，避免刪除一個不確定的否定詞後改變句意。OCR 仍可能辨識錯誤，不能視為理解了圖表、公式或圖中的關係；這些頁面會保留待核對標記與辨識統計。若 OCR 不可用或結果不足，保留同頁中獨立且乾淨的原生文字區塊，沒有可用文字的單元暫停生成，其他單元照常處理。修好 OCR 設定後，可按 Retry Background Preparation 沿用伺服器已存原檔與頁面快取重試，不必再上傳整本書；其他背景準備須先完成。

老師可查看自己的本次上傳紀錄。管理員登入後可用「所有教材上傳紀錄」查看上傳者姓名／Email、對應課程、檔名、接收時間、大小及處理狀態，包含尚未傳完的檔案進度，並下載已收到的原始 PDF。可依上傳者、檔名或課程搜尋，再按「查看問題頁碼與完整處理紀錄」載入該教材的詳細報告。沒有帳號對照的舊資料會明確標示，不會猜測上傳者。其他老師及學生無權使用此檢查路徑。原始教材與帳號資料不會放入 GitHub。

程式測試包含一份 1,001 頁的可控制 PDF，第 501 頁為影像頁：確認該頁／單元隔離、其他內容形成課程、頁碼正確、重試沿用 1,000 個頁面快取。這不是老師的實際 Genomics 教材，也不是對任意千頁掃描書的速度保證。

另外以真正沒有文字層的掃描 PDF 執行本機 OCR，驗證恢復文字、信心篩選、亂碼區塊隔離及 OCR 快取續跑。一般 OCR 無法代替影像語意模型或數學公式專用辨識器。

### 本機 OCR 依賴（一次設定）

伺服器預設需要 `tesseract` 執行檔與 `eng`、`chi_tra` 語言資料，不需雲端 token 或另外啟動大型語言模型。在 Ubuntu／Debian 伺服器上安裝：

```bash
sudo apt-get update
sudo apt-get install -y tesseract-ocr tesseract-ocr-eng tesseract-ocr-chi-tra
tesseract --list-langs
```

若沒有管理員權限，請由伺服器管理員安裝到系統或現有環境，讓啟動教學服務的使用者能執行 `tesseract`。其他語言可安裝相對應的語言資料，並在服務環境設定 `VQ_PDF_OCR_LANGS`（例如 `eng+chi_tra+chi_sim`）。設定 `VQ_PDF_OCR=off` 可停用 OCR。缺少指定語言時會明確回報，不會偷偷改用另一種語言猜字。管理員的上傳紀錄會顯示目前 OCR 可用性與原因；更新工具不會自動執行 sudo 或修改系統套件。

## GitHub 與正式網站

修改 GitHub 不會自動改變已在內部伺服器執行的 Python，也不會自動發布 Cloudflare Worker。現有流程只有 Offline checks。要避免每次下載及上傳整包程式，可在既有伺服器安裝一次主動拉取更新的工具。

工具每兩分鐘檢查 `main`。只有該 commit 的 Offline checks 成功，才更新程式、保留私人資料、備份並重啟既有服務，再發布 Worker。既有 Worker 名稱、路由、綁定與線上的變數會保留，包含目前的 origin。帳號／課程資料庫、上傳 PDF、既有私有檢索內容與設定不會從 GitHub 覆寫。

### 一次設定

在能連到內部伺服器的電腦上執行。下列目錄是既有部署的範例；先確認它包含正在執行的 `reference_server.py`、`kb_server.py` 與 `gateway.py`。

```powershell
ssh -t YOUR_USER@YOUR_SERVER
```

登入伺服器後：

```bash
cd /path/to/workdir
git clone https://github.com/Wayne59882/multi-course-virtual-human-ta.git mc-vhta-source
bash mc-vhta-source/scripts/deploy/install_auto_sync.sh /path/to/live-application
```

若 `mc-vhta-source` 已存在，沿用該 checkout，先確認沒有本地程式修改，再執行 `git -C mc-vhta-source pull --ff-only`。不要用強制 reset 蓋掉本地修改。

伺服器須已有正常運作的三個 Python 服務、相同使用者的 Cloudflare 發布權限、Git、crontab、Node.js／npx 與可連到 GitHub／Cloudflare 的網路。工具不會建立 API key，不會把密碼寫入排程，也不會自動重新登入 Cloudflare。若缺少條件，保留實際錯誤訊息供管理員處理。

安裝後檢查：

```bash
tail -n 50 /path/to/live-application/logs/auto_sync.log
cat /path/to/live-application/logs/auto_sync_state.json
```

`SYNC COMPLETE` 與狀態檔記錄實際完成的 commit；GitHub 已更新不等於正式站已更新。第一次安裝前，不會有這些成功紀錄。更新失敗時工具嘗試還原備份；若發生發布中途失敗，仍需核對正式網站狀態。

### 停用

用 `crontab -e` 移除標有 `# mc-vhta-auto-sync` 的那一行即可。其他既有排程保留。不要刪除課程或帳號資料。
