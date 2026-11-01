# v241.6：課程先啟用、上傳與建置可續接

## 操作改變

1. PDF 以 1 MiB 分段上傳。瀏覽器把所選 PDF 存入此網站的 IndexedDB，伺服器把已收到的分段偏移量存到磁碟。重新整理後會查詢偏移量，從未完成的分段繼續；最後一段的回應遺失也不會重複匯入 PDF。若瀏覽器清除網站資料或儲存空間不足，就需要重新選擇 PDF。
2. 教材辨識後的單元清單預設全選，提供「Select all／Clear all」與已選數量。改名與勾選也會保存，刷新後仍可確認。
3. 按「Build Teaching Assistant」後，先抽取選定單元的文字並啟用講解與課程問答。這時教材檢索使用課程文字；BGE-M3 passage index 在背景完成後自動接手。索引服務出錯時，課程文字檢索仍可用，並可按「Retry Background Preparation」。
4. 每單元 100 題在背景逐批產生，進度會顯示目前單元與已完成題數；全部單元各有 100 題後，才啟用每單元隨機抽 2 題的測驗。講稿先顯示抽取的課程文字，背景產生後自動更新。
5. 建置工作的 ID、狀態與階段寫入磁碟。重新整理或後端重新啟動後，頁面接回原工作；後端從未完成的單元題庫續做。課程切換仍保留內建呼吸生理 V/Q 模型的規則。

此版縮短的是「開始使用講解及 Q&A」的等待時間。大型 PDF 傳輸與 28 個單元共 2,800 題的模型生成仍需要實際時間；目前不宣稱整套題庫會在數秒內完成。

## 部署

在 Windows PowerShell：

```powershell
scp "$env:USERPROFILE\Downloads\NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE.zip" USER@YOUR_SERVER:/path/to/workdir/
ssh USER@YOUR_SERVER
```

在伺服器：

```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE.zip
cd NTULUNG_TA_v241_6_RESUMABLE_FAST_COURSE
chmod +x *.sh
./INSTALL_V241_2_ONE_CLICK_STABLE.sh
```

安裝器會先測試，再停止舊服務，保留舊向量索引與已建立課程，並從上一個版本的工作目錄搬移階段資料，然後啟動、部署 Worker。完成後查詢 `https://lungta.twchu.workers.dev/api/health`，版本應為 `v241.6-resumable-fast-course`。只跑本機預檢可用 `VQ_PREFLIGHT_ONLY=1 ./INSTALL_V241_2_ONE_CLICK_STABLE.sh`。

舊版本在本次更新之前進行中的上傳沒有儲存瀏覽器檔案與分段資訊，因此需要在安裝 v241.6 後重新上傳一次。之後的刷新與同版本重啟可續接。伺服器磁碟空間與瀏覽器網站儲存空間必須足夠放置選取的 PDF。

## 驗證

執行 `./CHECK_V241_2_ONE_CLICK_STABLE.sh`。整合測試包含：PDF 分段中途續傳、最後回應遺失、重複建置不產生兩個課程、課程先可問答、題庫未滿時測驗不開放、題庫與索引背景完成、服務重啟後補齊未完成題庫、嵌入 HTTP 400 的處理及回退檢索。
