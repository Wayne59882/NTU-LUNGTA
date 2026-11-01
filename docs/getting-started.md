# 安裝與設定

[回專案首頁](../README.md)

## 先選擇執行範圍

| 目的 | 需要準備 | 入口 |
|---|---|---|
| 閱讀程式、重跑離線功能檢查 | Git、Python 3.12、Node.js 22 或 24 | `python3 scripts/check_offline.py` |
| 完整教材問答與課程準備 | Python 套件、Ollama、回答模型、BGE-M3、合法教材 | 下列伺服器設定 |
| 麥克風提問 | Faster-Whisper 環境、FFmpeg、模型檔與裝置權限 | `START_MULTILINGUAL_STT.sh` |
| 公開網站與 R12 登入 | Cloudflare、可連線的後端、HTTPS、管理員設定 | [R12 說明](../README_ACCOUNTS_R12_20261030.md) |

公開儲存庫沒有教科書全文、已建好的私有向量索引、模型權重或帳號資料庫。完整服務的硬體最低需求與冷啟動時間尚未在全新環境量測；請記錄實際 CPU、RAM、GPU／VRAM、模型量化與版本。

## 複製與先行驗證

```bash
git clone https://github.com/Wayne59882/NTU-LUNGTA.git
cd NTU-LUNGTA
python3 scripts/check_offline.py
```

這一步不安裝套件、不呼叫模型、不寄信，也不發布網站。Windows 的 Python 指令可改為 `py -3`。

## Python 與模型環境

以下為 Linux / Bash 的環境準備範例；完整 GPU 與語音環境仍需依伺服器設定。

```bash
cd NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED
python3 -m venv .venv
source .venv/bin/activate
python -m pip install pymupdf numpy
python -c "import fitz, course_runtime; assert course_runtime.fitz is not None"
```

`PyMuPDF` 用來讀取 PDF，`NumPy` 可加速向量計算。此處未固定套件版本；需要正式重現時，保存安裝成功環境的套件清單並與評測結果一起留存。

既有啟動腳本使用以下目錄配置。先把 `VQ_BASE` 設成伺服器實際的基底目錄；表內路徑必須存在。

| 路徑／變數 | 用途 |
|---|---|
| `$VQ_BASE/ollama/bin/ollama` | 既有腳本呼叫的 Ollama 執行檔 |
| `$VQ_BASE/ollama-models` / `OLLAMA_MODELS` | 模型儲存位置 |
| `$VQ_BASE/miniforge-teacher-tts/bin/python` | 主啟動腳本檢查的 Faster-Whisper Python 環境 |
| `$VQ_BASE/miniforge-teacher-tts/bin/ffmpeg`，或 PATH 中的 `ffmpeg` | 語音解碼 |
| `PYTHON_BIN` | 啟動教材服務、匯入 PyMuPDF 的同一個 Python |

主啟動腳本目前會檢查上述 Faster-Whisper 環境，且固定檢查 11437 的語音健康端點；僅改 `VQ_STT_PYTHON` 或 `VQ_STT_PORT` 不足以改變完整啟動流程。

Git 中的既有 shell 腳本沒有執行權限旗標，首次使用時先設定：

```bash
chmod +x ./*.sh
```

回答模型與嵌入服務分別使用 `OLLAMA_HOST=127.0.0.1:11435` 與 `VQ_REFERENCE_EMBED_HOST=127.0.0.1:11438`。目前介面可選的本地回答模型對應 `gemma` 與 `mistral`；實際標籤需與伺服器已安裝模型相符，見[評測設定](evaluation.md)。歷史工具 `PREPARE_3_MODELS.sh` 還會下載 Granite，使用前請先確認用途。

## 教材與索引

內建 Reference Textbook 模式讀取 `reference_corpus/chunks.jsonl`。該檔沒有放入公開儲存庫；必須使用研究者有權使用的教材，在自己的環境準備內容。

完成 Ollama、模型與教材設定後，可在主程式目錄執行：

```bash
bash PREPARE_REFERENCE_VECTOR_RAG.sh
python reference_search.py --status
```

第一個指令會啟動嵌入服務、必要時下載 BGE-M3，並建立／檢查索引。上傳課程則由 `course_runtime.py` 建立各課程獨立的教材與向量資料，不與內建教科書混用。

## 啟動與健康檢查

確認前述路徑與依賴完成後，設定實際 `VQ_BASE`、`PYTHON_BIN`、管理員信箱及寄信環境，再執行：

```bash
bash START_VQ_TA_SERVER.sh
```

它會啟動或檢查本地模型、語音辨識、教材向量索引、兩個後端，再以前景方式提供 gateway。它也會終止並重啟匹配既有 8181／8182 的後端程序，更新既有伺服器前應先確認使用中的工作。

另一個終端機可檢查：

```bash
curl --fail http://127.0.0.1:8179/api/health
curl --fail http://127.0.0.1:8181/api/health
curl --fail http://127.0.0.1:8182/api/reference/health
curl --fail http://127.0.0.1:11437/health
```

健康回應只能證明對應服務有回應；還需另測教材檢索、真實模型回答與完整使用流程。

## 帳號與公開部署

設定 `VQ_AUTH_ADMIN_EMAIL`、`VQ_FEEDBACK_TO_EMAIL`、`VQ_PUBLIC_URL`，以及研究者自己的 Resend 或 SMTP 寄信設定。可參考 [`config/runtime.env.example`](../config/runtime.env.example)；該檔僅為範例，不會自動載入。

R12 使用 Secure cookie，瀏覽器完整登入流程應經由自己的 HTTPS 入口測試。新帳號要經管理員核准；帳號與課程權限操作見 [R12 文件](../README_ACCOUNTS_R12_20261030.md)。

`feedback/CONFIGURE_FEEDBACK_RESEND.sh`、`auth_admin.py test-email` 都會真的寄送測試信，應只由部署者在確認收件設定後操作。

根目錄 `DEPLOY_COMPLETE.sh` 是既有完整更新包的部署流程，需要 ZIP 摘要、封裝清單及現有服務。它不適用於直接把全新 clone 當成更新包執行。Worker 設定中的 `ORIGIN_URL` 目前是占位網址，須指向自己的可連線後端。

## 常見問題

| 現象 | 檢查方向 |
|---|---|
| `Permission denied` | 確認 shell 腳本的執行權限 |
| PDF parser unavailable | 確認啟動服務的 `PYTHON_BIN` 能匯入 `fitz` |
| 找不到教材或索引 | 確認私有 `chunks.jsonl` 與向量索引已準備完成 |
| 模型不存在 | 比對程式中的 model tag、API base 與實際 `ollama list` |
| 無法登入或未核准 | 確認管理員設定、帳號狀態、HTTPS 與 cookie |
| 語音服務無法啟動 | 檢查固定環境路徑、Faster-Whisper、FFmpeg 與 11437 的回應 |
| 公開網址 502 | 分別檢查 gateway、兩個內部後端與 Tunnel，再檢查 Worker origin |
