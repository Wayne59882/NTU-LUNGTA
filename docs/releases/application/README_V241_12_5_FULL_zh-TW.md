# v241.12.5 完整安裝檔

本 ZIP 包含完整主程式、網頁、既有 Reference Textbook 語料、Worker 與安裝腳本；部署不必先執行國考雲端補測。

## 部署

將完整 ZIP 下載到 Windows Downloads，將根目錄的 `DEPLOY_FROM_POWERSHELL.ps1` 內容複製貼到 PowerShell。也可用 `Get-Content -Raw -Encoding UTF8` 讀取後執行。此 PowerShell 腳本使用 ASCII，避免 Windows PowerShell 5.1 的預設編碼問題。

程式上傳到 YOUR_SERVER，以新的暫存目錄解壓；先檢查分題與語音流程，再備份既有程式、更新完整程式並執行 `INSTALL_FINAL.sh`。原有上傳課程、測試 CSV、索引資料庫與寄信設定不在覆蓋清單內。失敗會停止並顯示錯誤。

部署完成後以 Ctrl+F5 重新整理 https://lungta.twchu.workers.dev/reference/。`/api/health` 的 build 應為 `v241.12.5-full-answer-voice`。

## 修正內容

- 沒有空格的 `A.左肺`、全形選項、括號選項與貼上換行都可分題；不再將超過 40 題的後段切掉。
- 5、20、41、100 題保留原順序與每題答案位置。Reference local 分段背景執行、cloud 最多四題分批，上傳課程逐題依目前課程檢索後回答。某題失敗仍處理後面所有題目。
- 缺答、空答、選項或解釋不完整會個別補答；重試仍失敗會明確標為未完成。單題與多題的上傳課程答案都檢查格式。
- 語音送給系統朗讀前，把「正確答案：B」展開成「正確答案是選項 B」，避免答案標記被當成表情符號；畫面上的答案不變。語音與畫面清除 emoji，保留醫學符號。
- OpenAI incomplete 回覆及 local 的長度截斷不當成完整答案。

## 驗證範圍

100 題離線測試驗證的是分題、逐題呼叫、順序、缺答補答、錯誤隔離及未完成標記；使用模擬回覆，不是模型國考正確率。語音測試檢查送入原生朗讀器的文字，裝置實際發音須在使用者瀏覽器確認。

程式能完整處理每題並據課程內容回答，不代表所有選擇題一定答對；實際 accuracy 仍須以官方答案逐題核對。教材不足時保留範圍與證據不足提示。

## 選用：補測先前五題雲端結果

根目錄另附 `RESUME_MOEX_CLOUD_PY36.ps1`，修正 server Python 3.6 不支援 `subprocess.run(text=True)` 的問題，保留先前十筆 local 結果，只補五筆 cloud。此腳本獨立執行，部署不會自動呼叫或要求 API key。

若部署後才補测，合併結果會跨版本，論文須註明。先前的 `ok` 代表取得可辨識的選項；正確與否看 CSV 的 `correct`，不可將成功連線當成答對。
