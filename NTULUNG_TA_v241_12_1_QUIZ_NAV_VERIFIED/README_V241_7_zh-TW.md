# v241.7：講解對準所選課程，兩題即可開始練習

## 這次修正

- 選取上傳課程的單元並按「Start Lecture」時，朗讀、字幕、暫停與續播使用該單元的講稿；內建呼吸生理仍使用自己的講稿。這修正了「Principles of Drug Action」卻講「Gas Exchange Framework」的情況。
- 每個已選單元先產生 **2 道附教材段落來源的題目**。全部單元達到 2 題後，Scenario Practice 即可開始，從每個單元目前可用的題目隨機抽 2 題。背景繼續把每個題庫補到 100 題；未補滿前，抽題變化會比較少。
- 每批請模型寫 5 題、縮短材料與回答，對截斷的 JSON 保留已完整生成的題目。產題仍需本機模型執行時間，無法保證 100 題瞬間完成。
- 舊版本已建置的課程及部分題庫可搬到新版本。若當時停在 18/100 或進度狀態為錯誤，服務重啟後會從現有題目繼續；**不用重新上傳原 PDF**。只要該單元已有 2 題，升級後即可開啟練習。
- 課程選擇、刷新續傳、內建呼吸生理 V/Q 模型等前版功能保留。

## 最快部署步驟

先把下載的 ZIP 放到 Windows 的 `Downloads`，在 PowerShell 執行：

```powershell
scp "$env:USERPROFILE\Downloads\NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST.zip" USER@YOUR_SERVER:/path/to/workdir/
ssh USER@YOUR_SERVER
```

然後在伺服器執行：

```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST.zip
cd NTULUNG_TA_v241_7_COURSE_LECTURE_QUIZ_FAST
chmod +x *.sh
./INSTALL_V241_2_ONE_CLICK_STABLE.sh
```

安裝器先跑預檢，再切換服務並部署 Worker。開啟 `https://lungta.twchu.workers.dev/reference/`，在 **Currently teaching** 選擇原課程；挑選「Principles of Drug Action」按「Start Lecture」，應出現該章教材。原課程若已有 18 題，Scenario Practice 可立即開始。切回內建呼吸生理時，V/Q Visual Model 應再次顯示。

查驗部署版本：`https://lungta.twchu.workers.dev/api/health` 應含 `v241.7-course-lecture-quiz-fast`。若畫面仍顯示舊內容，可強制重新整理瀏覽器頁面。

## 本機驗證

`./CHECK_V241_2_ONE_CLICK_STABLE.sh` 測試課程上傳、續傳、來源檢索、所選講稿、兩題即可練習、每單元抽兩題、補滿 100 題、模型輸出截斷後回收完整題目，以及重啟後續做部分題庫。完整教材的品質與實際產生速度仍須在部署主機上用您的 PDF 與本機模型觀察。
