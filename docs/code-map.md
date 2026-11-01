# 程式導覽

[回專案首頁](../README.md)

以下程式都位於 [`NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/)。先從入口與功能模組閱讀，即可追蹤使用者操作到後端處理的路徑。

## 後端與資料

| 功能 | 程式 | 閱讀重點 |
|---|---|---|
| 公開入口 | [`gateway.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/gateway.py) | `_target()`、`_proxy()`、`_page_allowed()` |
| 帳號及課程權限 | [`lungta_auth.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/lungta_auth.py) | `TEACHER_ONLY`、`authorize()`、`after_response()` |
| 帳號管理 | [`auth_admin.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/auth_admin.py) | CLI 的查詢、核准與停用流程 |
| 問答與 API | [`reference_server.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/reference_server.py) | context、answer、course 相關路由與模型呼叫 |
| 教科書檢索 | [`reference_search.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/reference_search.py) | `ReferenceSearch`、`search()`、`_lexical_fallback()` |
| PDF、章節及課程 | [`course_runtime.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/course_runtime.py) | `_word_chunks()`、課程建立、向量索引與準備狀態 |
| 題庫生成與審查 | [`exam_questions.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/exam_questions.py) | `build()`、草稿驗證與答案審查 |
| 內建 KB 與語音路由 | [`kb_server.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/kb_server.py) | KB API、本地模型、TTS／STT |
| 語音辨識 | [`speech_stt_server.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/speech_stt_server.py) | Faster-Whisper 載入、音訊及語言處理 |
| 回報與更正 | [`feedback/feedback_service.py`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/feedback/feedback_service.py) | 回報儲存、寄信及更正查詢 |
| 雲端入口 | [`cloudflare/worker/src/index.js`](../NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/cloudflare/worker/src/index.js) | origin 轉發、帳號檢查、雲端模型流程 |

## 前端

`web/reference/` 與 `web/kb/` 是兩個功能入口，`web/login/` 為登入頁。兩邊存在名稱相同的程式；修改共用行為時需要核對兩個頁面。

| 檔案／目錄 | 用途 |
|---|---|
| `web/*/index.html` | 頁面結構與 `<script>` 載入順序 |
| `web/*/js/55_v241_course_adaptive_ta.js` | 課程選擇、講稿、上傳與測驗互動 |
| `web/*/js/57_role_access.js` | 教師／學生介面控制 |
| `web/*/js/35_hopkins_reference_lung_physiology.js` | 目前 V/Q 計算引擎 |
| `web/*/js/45_v204_final_voice_controller.js` | 語音播放與發音處理 |
| `web/*/js/25_v105_resume_after_question_mouth_sync.js` | 錄音、停止與送出流程 |
| `web/reference/js/48_reference_textbook.js` | Reference Textbook 前端互動 |
| `web/reference/js/52_v229_semantic_microbatch.js` | 多題語義微批次處理 |

前端目前包含多層歷史補丁，檔名數字與版本字樣不足以單獨判斷生效順序，應查看 HTML 載入清單及最後覆寫的函式。本次文件整理保留既有檔名與載入順序；未完成回歸驗證前不宜直接搬動或合併。

## 資料與驗證

| 位置 | 內容 |
|---|---|
| `research/three_model_10q/` | 三模型 10 題 pilot 工具與題目 |
| `PHYSICIAN_BENCHMARK_DATA/` | 既有醫師題目測試原始資料、來源與摘要 |
| `benchmark/` | 國考題評測與已看過題目的回歸工具 |
| `VQ_CALCULATION_REPORT/` | V/Q 驗證案例、數值與既有圖檔 |
| `VERIFY_*.cjs`、`VERIFY_*.py` | 各版本功能驗證工具 |
| `README_V*.md`、`BUILD_MANIFEST_*.txt` | 歷史版本說明 |

## 開發時的追蹤方式

從一個畫面操作開始，查找按鈕的 element ID 或 API 路徑，再依序找到前端函式、Worker／gateway 路由、Python 實作與對應驗證。提交修改時記錄這條路徑，可讓審閱者確認改動的目的與影響範圍。
