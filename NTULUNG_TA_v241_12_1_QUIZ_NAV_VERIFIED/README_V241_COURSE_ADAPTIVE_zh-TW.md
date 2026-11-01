# v241 Course-Adaptive Virtual Human TA

此版本在 v240.1 穩定版上新增「教材上傳後建立課程 TA」功能，原有生理學 TA、Local/Cloud 模型、語音、3D Avatar、V/Q Visual Model 與既有 Reference Textbook 模式保留。

## 新增功能

1. **Course-Adaptive TA Builder**
   - 教師可選擇一份或多份 PDF；前端會逐檔上傳並合併到同一個 course staging，避免多本大型教材被塞進單一 HTTP request。
   - 系統直接讀取 PDF 內建 Table of Contents 的第一層 chapter 結構，不由 AI 自行重新分組。
   - 教師可勾選要使用的章節並修改顯示名稱後再建立 TA。
   - Course Name 若未輸入，會以 PDF metadata title 或檔名預填。

2. **Specialized Visual Module**
   - `None — No Specialized Visual Model`
   - `V/Q Visual Model`
   - 是否顯示 V/Q 模型由教師建立課程時明確選擇，不由 AI 猜測學科。

3. **Dynamic Course RAG**
   - 每個上傳課程建立獨立 `course_workspaces/<course_id>/`。
   - PDF chapter text -> passages -> BGE-M3 embedding index -> semantic window rerank index -> Top 6 evidence。
   - 多本教材時保留 source-diversity constraint，避免單一本大型教材只因 passage 數量較多而過度佔據檢索結果。
   - Q&A scope 由目前上傳課程的檢索證據決定，不再綁死 physiology keyword gate。

4. **Teacher Lecture**
   - 每個確認 chapter 會依上傳教材產生並儲存 lecture script。
   - 學生播放 Lecture 時讀取已建立的 script，不在每次播放時重新生成。

5. **Scenario Practice**
   - 每個 chapter 建立自己的預生成 MCQ question bank，目標為 100 題 / chapter。
   - 每次 practice 固定從每個 chapter 隨機抽 2 題。
   - 因此總題數 = chapter 數 × 2，而不再固定為 22 題。
   - 題庫在 course build 階段生成並儲存，不在學生開始 quiz 時臨時生題。

6. **API Key confirmation**
   - Cloud API Key 貼上後必須按 `Enter` 或 `Confirm API Key`。
   - UI 顯示 `API key received` 後才會被本次 browser session 使用。
   - `Clear` 會移除 session key；server 不永久儲存 BYOK key。

7. **Model support**
   - Local: Gemma 4 12B、Ministral 3 8B。
   - Cloud BYOK: GPT-5.6 Luna。
   - Uploaded-course Q&A 使用同一個 course evidence context；Cloudflare Worker 保留 Local-first / 10-second cloud fallback。

## 主要新增檔案

- `course_runtime.py`
- `web/reference/js/55_v241_course_adaptive_ta.js`
- `web/reference/css/v241_course_adaptive.css`
- 同步版本亦加入 `web/kb/`

## Server dependency

課程 PDF ingestion 需要 PyMuPDF (`fitz`)；Reference Textbook 原本的 BGE-M3 embedding service 需保持可用。

## 使用流程

1. Server 解壓後執行 `chmod +x INSTALL_FINAL.sh && ./INSTALL_FINAL.sh`；v241 會先做 course-adaptive preflight，再沿用 v240.1 已驗證的 server/tunnel/Worker 部署流程。
2. 開啟網站。
3. 在最上方 `Course-Adaptive Virtual Human TA Builder` 選擇 PDF。
4. 選擇 `None — No Specialized Visual Model` 或 `V/Q Visual Model`。
5. `Upload & Inspect Course Materials`。
6. 確認 chapter list。
7. `Build Teaching Assistant`。
8. 建立完成後，Lecture、Uploaded Course RAG Q&A、Scenario Practice 會切換至該課程。
