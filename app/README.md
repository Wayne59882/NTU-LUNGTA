# NTU-LUNGTA Application

這是正式教學系統的執行目錄。程式基底為 `v241.12.5-full-answer-voice`，包含 R12 帳號與課程權限更新。

| 位置 | 內容 |
|---|---|
| `gateway.py`、`lungta_auth.py` | 公開入口、帳號與課程存取 |
| `reference_server.py`、`reference_search.py` | 教材問答 API 與檢索 |
| `course_runtime.py`、`exam_questions.py` | PDF、章節、講稿與題庫準備 |
| `kb_server.py`、`speech_stt_server.py` | 內建知識庫與語音路由／辨識 |
| `web/shared/` | 按功能分組的共用前端程式、樣式及資產 |
| `web/reference/`、`web/kb/` | 兩個頁面及各自需要的程式／資料 |
| `cloudflare/worker/` | Worker 公開入口與雲端回答流程 |
| `feedback/`、`reference_corpus/` | 回報工具與教材 metadata；私有內容不在 Git 中 |

從儲存庫根目錄執行 `python3 scripts/check_offline.py`；完整環境準備完成後執行 `bash scripts/start.sh`。

[專案首頁](../README.md) · [安裝](../docs/getting-started.md) · [架構](../docs/architecture.md) · [程式導覽](../docs/code-map.md) · [評測](../docs/evaluation.md) · [遷移](../docs/migration.md)
