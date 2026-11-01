# NTU-LUNGTA：課程虛擬人教學助理（Course-Adaptive Virtual Human TA）

國立臺灣大學生理學研究所碩士論文系統。以呼吸生理（V/Q）為內建課程，並可由老師上傳任何科目的 PDF 教材，自動建立講解、課程問答與練習題。

> 版本：v241.12.5 R12（2026-10-30）— 帳號登入、老師／學生權限、Email 審核

## 功能

- **Lecture**：虛擬人朗讀繁體中文講稿（內建課程或上傳課程）
- **AI 助理問答**：依教材檢索（RAG）回答，可用本地模型（Gemma 等）或雲端模型
- **Scenario Practice**：章節對應的練習題與作答回饋
- **V/Q Visual Model**：通氣／灌流視覺化模型（Hopkins 校正）
- **上傳課程（老師）**：上傳 PDF → 偵測章節 → 建立講稿、問答與題庫；課程名稱可由 PDF 內容自動判斷
- **帳號與權限（R12）**：登入才能使用；老師可上傳、只看得到自己的課程；學生以課程代碼加入老師的課程；新帳號由管理員以 Email 審核

## 目錄

| 路徑 | 內容 |
|---|---|
| `NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/` | 主程式 |
| `…/gateway.py`、`lungta_auth.py`、`auth_admin.py` | 公開入口、帳號與權限、帳號管理指令 |
| `…/reference_server.py`、`reference_search.py`、`course_runtime.py` | 教材問答、檢索、上傳課程 |
| `…/kb_server.py` | 內建知識庫與語音 |
| `…/web/` | 網頁（`reference/`、`kb/`、`login/`） |
| `…/cloudflare/worker/` | Cloudflare Worker（公開網址） |
| `…/VQ_CALCULATION_REPORT/`、`benchmark/`、`PHYSICIAN_BENCHMARK_DATA/` | V/Q 計算驗證、評測資料 |
| `DEPLOY_*.ps1`、`DEPLOY_COMPLETE.sh` | 從 Windows 上架到伺服器的腳本 |
| `README_*.md` | 各版本說明 |

## 沒有放進 GitHub 的檔案

- **教科書全文**（`reference_corpus/chunks.jsonl`、`benchmark/supplemental_sources/*.jsonl`）：Guyton、Vander、Beachey 教科書內容受著作權保護，只放在伺服器上。
- **密鑰與帳號資料**：`feedback/feedback.env`（寄信 API 金鑰）、`auth/auth.sqlite3`（帳號與密碼雜湊）、`course_workspaces/`（老師上傳的課程）。

公開版已將個人資訊換成代號：伺服器 `USER@YOUR_SERVER`、工作目錄 `/path/to/workdir`、管理員信箱 `admin@example.com`（實際部署時以環境變數 `VQ_AUTH_ADMIN_EMAIL`／`VQ_FEEDBACK_TO_EMAIL` 設定）。

## 執行環境

GPU 伺服器（Ollama：Gemma 4 12B、BGE-M3；Faster-Whisper 語音辨識），以 Cloudflare Tunnel + Worker 對外提供 https://lungta.twchu.workers.dev 。上架流程見 `README_ACCOUNTS_R12_20261030.md` 與各版 README。
