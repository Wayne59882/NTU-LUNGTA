# NTULUNG TA v241.2 — One-Click Server-Stable

此版本針對 production server（Python 3.6 + project-local Node.js）重新整理部署流程，**不再呼叫舊版 v238/v239/v240 的 version-locked installer chain**。因此不會再因目前 backend 已是 v241，而被舊版檢查硬性要求 `BUILD='v238-...'` 而中止。

## 一鍵部署

在 server 解壓後：

```bash
cd /path/to/workdir/NTULUNG_TA_v241_2_ONE_CLICK_SERVER_STABLE_FINAL
bash ./INSTALL_FINAL.sh
```

安裝器會依序：

1. 找到 `/path/to/workdir/node-v22/bin/node`。
2. 檢查 PyMuPDF；Python 3.6 缺少時只安裝可用 binary wheel `PyMuPDF==1.16.6`，不做 source compile。
3. 自動恢復舊 Reference Textbook vector/window index（若新版資料夾尚未有）。
4. 盡可能保留 site metrics、feedback 設定與已建立的 uploaded-course workspaces。
5. 在停止既有服務前先跑 v241.2 full preflight。
6. 直接啟動 v241.2 server stack，不再進入 v238 version-string acceptance。
7. 驗證 local health / Reference Textbook / course-adaptive API。
8. 建立或沿用 Cloudflare Tunnel。
9. 部署目前這包的 Worker + static site。
10. 最後再次確認 local build 為 `v241.2-course-adaptive-ta`。

## 多 PDF 行為

- 前端允許一次選擇多份 PDF。
- 大型檔案可逐檔上傳，但會使用同一個 `stage_id`，因此全部進入**同一個 course workspace**。
- RAG index 會包含該 course 中所有被老師確認保留的教材單元，因此 Student Q&A 可跨多份上傳教材檢索。
- 系統不會自行把不同書中相似章節「AI 合併成新章節」。每份 PDF 的 top-level TOC chapter 會先被列成 unit，老師再確認/取消/改名。這符合「不要讓 AI 自己重新發明單元」的設計。

## Scenario Practice

- 每個被老師確認的 chapter/unit：預先建立目標 100 題的 MCQ 題庫。
- 學生開始一次 Scenario Practice 時：**每個 unit 隨機抽 2 題**。
- 例如 11 units → 22 題；8 units → 16 題。
- 題目不是學生進入時才臨時生成，而是 course build 階段預先建立後再抽題。

## Visual Model

由老師建立課程時明確選擇：

- `None — No Specialized Visual Model`
- `V/Q Visual Model`

系統不會自己猜哪一科應該顯示 V/Q model。

## API Key

Cloud BYOK 需要貼入 API Key 後按 Enter 或 `Confirm API Key`，介面才顯示 `API key received`。Key 僅供 browser session 使用。

## Preflight-only

只驗證、不停止現有服務：

```bash
VQ_PREFLIGHT_ONLY=1 bash ./INSTALL_FINAL.sh
```

## 版本辨識

部署後：

```bash
curl -sS http://127.0.0.1:8179/api/health
```

應包含：

```text
v241.2-course-adaptive-ta
```
