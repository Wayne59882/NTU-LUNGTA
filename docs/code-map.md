# 程式導覽

[回專案首頁](../README.md)

以下程式都位於 [`app/`](../app)。先從入口與功能模組閱讀，即可追蹤使用者操作到後端處理的路徑。

安裝、啟動、部署與教材匯入工具集中於 [`scripts/`](../scripts/README.md)，與正式服務程式分開。目錄責任及修改流程見[開發說明](development.md)。

## 後端與資料

| 功能 | 程式 | 閱讀重點 |
|---|---|---|
| 公開入口 | [`gateway.py`](../app/gateway.py) | `_target()`、`_proxy()`、`_page_allowed()` |
| 帳號及課程權限 | [`access_control.py`](../app/access_control.py) | `TEACHER_ONLY`、`authorize()`、`after_response()` |
| 帳號管理 | [`auth_admin.py`](../app/auth_admin.py) | CLI 的查詢、核准與停用流程 |
| 問答與 API | [`reference_server.py`](../app/reference_server.py) | context、answer、course 相關路由與模型呼叫 |
| 教科書檢索 | [`reference_search.py`](../app/reference_search.py) | `ReferenceSearch`、`search()`、`_lexical_fallback()` |
| PDF、章節及課程 | [`course_runtime.py`](../app/course_runtime.py) | `_word_chunks()`、課程建立、向量索引與準備狀態 |
| 題庫生成與審查 | [`exam_questions.py`](../app/exam_questions.py) | `build()`、草稿驗證與答案審查 |
| 內建 KB 與語音路由 | [`kb_server.py`](../app/kb_server.py) | KB API、本地模型、TTS／STT |
| 語音辨識 | [`speech_stt_server.py`](../app/speech_stt_server.py) | Faster-Whisper 載入、音訊及語言處理 |
| 回報與更正 | [`feedback/feedback_service.py`](../app/feedback/feedback_service.py) | 回報儲存、寄信及更正查詢 |
| 雲端入口 | [`cloudflare/worker/src/index.js`](../app/cloudflare/worker/src/index.js) | origin 轉發、帳號檢查、雲端模型流程 |

## 前端

`web/reference/` 與 `web/kb/` 是兩個功能入口，`web/login/` 為登入頁。兩邊存在名稱相同的程式；修改共用行為時需要核對兩個頁面。

| 檔案／目錄 | 用途 |
|---|---|
| `web/*/index.html` | 頁面結構與 `<script>` 載入順序 |
| `web/shared/js/course/course-controller.js` | 課程選擇、講稿、上傳與測驗互動 |
| `web/shared/js/auth/role-access.js` | 教師／學生介面控制 |
| `web/shared/js/visual/gas-exchange.js` | 目前 V/Q 計算引擎 |
| `web/shared/js/speech/voice-controller.js` | 語音播放與發音處理 |
| `web/shared/js/speech/recognition-controller.js` | 錄音、停止與送出流程 |
| `web/reference/js/reference-textbook.js` | Reference Textbook 前端互動 |
| `web/reference/js/semantic-microbatch.js` | 多題語義微批次處理 |

共用程式目前依語音、問答、講稿、虛擬人、課程及模擬分組於 `web/shared/js/`。兩個頁面實際不同的程式保留於各自目錄。載入順序仍由 HTML 決定，並由 `tests/fixtures/frontend_contract.json` 的搬移基準驗證。

## 資料與驗證

| 位置 | 內容 |
|---|---|
| `research/three_model_10q/` | 三模型 10 題 pilot 工具與題目 |
| `research/physician_benchmark/` | 既有醫師題目測試原始資料、來源與摘要 |
| `research/legacy_benchmarks/` | 國考題評測與已看過題目的回歸工具 |
| `research/vq_validation/` | V/Q 驗證案例、數值與既有圖檔 |
| `tests/regression/`、`tests/legacy/` | 現行回歸測試與歷史版本驗證工具 |
| `docs/releases/` | 歷史版本說明與 build manifest |

## 開發時的追蹤方式

從一個畫面操作開始，查找按鈕的 element ID 或 API 路徑，再依序找到前端函式、Worker／gateway 路由、Python 實作與對應驗證。提交修改時記錄這條路徑，可讓審閱者確認改動的目的與影響範圍。
