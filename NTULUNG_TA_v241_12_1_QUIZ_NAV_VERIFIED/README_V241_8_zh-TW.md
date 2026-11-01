# v241.8：快速完整題庫與 Report 自動修正

## 這次處理的核心問題

### 1. 課程先可用，100 題也不再慢慢等模型逐題寫

上傳並選定單元後，系統先完成 PDF 文字抽取，立即開放：

- 所選單元的 Lecture
- 對應目前課程的 Student Q&A
- 課程下拉選單與正確的 V/Q 顯示規則

每個單元的 100 題改用教材原文直接建立四選一來源題庫，不再要求本機 8B/12B 模型連續產出 100 組題幹、四個選項、解析與 JSON。這消除了舊版最主要的等待來源。題庫完整達到 100 題後，Scenario Practice 才開放，並從每個已選單元隨機抽 2 題。

快速題庫的題型是「教材原句型、來源可核對的四選一填空題」，不是由模型撰寫的長篇臨床病例。這個設計用題型深度換取可預期的速度與來源正確性。若要每單元 100 道完整臨床情境題，仍會產生數萬個模型輸出 token，無法與直接文字建構有相同速度。

### 2. Report 除了寄信，也會自動修正

學生按 **Report this answer** 後，系統會：

1. 保存問題、原回答、原因、comment、課程 ID 與來源段落。
2. 照原有設定寄信給管理者。
3. 重新從目前課程或內建教科書擷取證據並產生新回答。
4. 進行第二次語意審查與格式完整性檢查。
5. 驗證通過後保存修正版；同課程再次問完全相同的問題時，直接使用修正版。
6. 相近問題只套用固定的改善規則，例如重新核對結論或補足機轉；學生 comment 不會直接改寫全域提示或被當成教材事實。

尚未完成的修正工作與上傳／課程建置工作都保存在磁碟；服務重啟後會接續。舊版 Feedback 資料庫會自動加欄位，歷史回報保留，但不會在升級當下大量重新送模型。

## 網頁內最快的上傳步驟

1. 在 **Course Name** 輸入名稱。
2. 在 **Course Materials (PDF)** 一次選取需要的 PDF。
3. 按 **Upload & Inspect Course Materials**。上傳採 1 MiB 分段；重新整理後會從伺服器已收到的位置接續。
4. 在偵測出的單元中保留真正要教的章節。可用 **Select all** 或 **Clear all**，也可單獨勾選及改名。
5. 按 **Build Teaching Assistant**。
6. Lecture 與課程 Q&A 完成後，頁面會自動切換到新課程；不需要再手動按 Update course list。每單元 100 題完成時，Scenario Practice 按鈕自動啟用。

切回 **Built-in Respiratory Physiology (default)** 時會顯示 V/Q Visual Model；非呼吸課程會隱藏。上傳的呼吸生理課程若內容偵測符合，也會顯示 V/Q。

## 最快部署步驟

Windows PowerShell：

```powershell
scp "$env:USERPROFILE\Downloads\NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION.zip" USER@YOUR_SERVER:/path/to/workdir/
ssh USER@YOUR_SERVER
```

伺服器：

```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION.zip
cd NTULUNG_TA_v241_8_FAST_BANK_AUTO_CORRECTION
chmod +x *.sh
./INSTALL_FINAL.sh
```

安裝器會先完整預檢，再停止舊服務、搬移既有課程／未完成上傳／Feedback 資料、啟動服務並部署 Worker。

部署後檢查：

```bash
curl -fsS http://127.0.0.1:8179/api/health
```

回應應包含：

```text
v241.8-fast-bank-auto-correction
```

公開頁面：<https://lungta.twchu.workers.dev/reference/>

## 驗證結果

執行：

```bash
./CHECK_V241_2_ONE_CLICK_STABLE.sh
```

預檢包含 Python/JavaScript/Shell 語法、4,792 段內建生理教材完整性、續傳、刷新續建、Lecture 路由、兩個單元各 100 題、每單元隨機抽 2 題、語意索引失敗時的文字搜尋降級，以及單題／批次 Report 自動修正記憶。

本機教材樣本直接建立 100 題的函式測量約 0.04 秒；完整的兩單元上傳整合測試約 2 秒。正式主機時間仍會受 PDF 大小、頁數、硬碟、網路與語意索引服務影響。
