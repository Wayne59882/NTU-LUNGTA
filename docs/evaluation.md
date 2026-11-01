# 評測與資料

[回專案首頁](../README.md) · [離線驗證](testing.md)

## 各項證據可以回答什麼

| 證據 | 能回答的問題 | 適用界線 |
|---|---|---|
| 離線功能檢查 | 指定輸入下，計算、跳題、回覆復原及語音控制是否符合測試預期 | 模擬資料不代表真實模型回答正確率或裝置音訊品質 |
| 三模型 10 題 pilot | 固定題目與 RAG context 下的逐題模型比較 | 樣本少；不等於整體生理學問答表現 |
| 國考／回歸工具 | 指定題集、版本與設定的答題表現 | 已用於調整系統的題目應標為 seen regression |
| 教學研究 | 對學習成效或實際教學使用的影響 | 需要另外定義對象、設計、指標與分析 |

## 三模型 10 題 pilot

工具位於 [`research/three_model_10q/`](../research/three_model_10q)。Runner 對每個模型逐題呼叫，重用同一題已快取的教材證據；本地模型先做一次不計分 warm-up。

以下是**儲存庫中的設定字串**，不是此次實際載入或重新測得的模型清單：

| Runner key | 程式標籤 | 預設 model tag／API model |
|---|---|---|
| `gemma` | Gemma 4 12B | `gemma4:12b` |
| `mistral` | Ministral 3 8B | `ministral-3:8b-instruct-2512-q4_K_M` |
| `openai` | GPT-5.6 Luna | `gpt-5.6-luna` |

執行前需確認本地模型及雲端帳號實際可用的識別字。保留真實 model ID、量化、環境與日期；介面另保留 Granite 相關歷史設定，但目前學生端本地選項是 Gemma／Ministral。

題目在 `questions_10_exact_sources.jsonl`，為教材段落支持的自編 pilot 題；來源對照見 [`SOURCE_AUDIT_10Q.md`](../research/three_model_10q/SOURCE_AUDIT_10Q.md)。Runner 的 `expected_option` 僅供評分，不放入模型提示。

僅檢查題集與 runner 設定可執行：

```bash
python3 research/three_model_10q/benchmark_3models.py --self-test
```

完整 benchmark 會實際呼叫本地服務及雲端 API，應在環境與費用設定完成後另行執行：

```bash
bash research/three_model_10q/RUN_3MODEL_10Q_BENCHMARK.sh
```

### 指標定義

| 指標 | Runner 的計算方式 |
|---|---|
| `accuracy_all_requests` | 正確題數／全部請求數；失敗請求仍在分母 |
| `accuracy_completed` | 正確題數／成功完成請求數；沒有完成時為空值 |
| `availability` | 成功完成請求數／全部請求數 |
| `retrieval_sec` | 問題送至教材 context 端點後，取得 context 的 wall time |
| `inference_sec` | 模型請求至完整回應完成的 wall time |
| `question_to_reply_sec` | `retrieval_sec + inference_sec`；不包含瀏覽器呈現與 TTS |

輸出包含 `raw_results.csv`、`summary.csv`、`summary.json`。引用結果時應保留逐題記錄，並註明是 inference time 或 question-to-reply time。不同模型使用同一題時屬配對資料；失敗與遺漏回應應明確處理。

## 既有檔案位置

| 路徑 | 用途 | 解讀前需要核對 |
|---|---|---|
| [`PHYSICIAN_BENCHMARK_DATA/`](../research/physician_benchmark) | 原始結果、來源與 mean/SD 摘要 | 題目、模型、單位、測試日期及版本 |
| [`benchmark/regression/`](../research/legacy_benchmarks/regression) | seen regression 題集與工具 | 是否已用於系統調整 |
| [`benchmark/moex/`](../research/legacy_benchmarks/moex) | 國考題抓取、評估與診斷工具 | 題目取得、答案鍵、去重與 seen/unseen 區分 |
| [`VQ_CALCULATION_REPORT/`](../research/vq_validation) | V/Q 數值、守恆與參考比較 | 檔名中的日期與模型 revision |
| [`QA_FIX_VALIDATION_R11_20261028.json`](../research/validation_history/QA_FIX_VALIDATION_R11_20261028.json) | R11 歷史檢查範圍 | 明列尚未測試真實模型與公開部署 |

本次整理沒有把不同版本結果合併，也沒有把離線通過率填入模型 accuracy 表。50／200 題 gate 分析需先找到對應原始題集、ground truth、計分規則與程式設定，再獨立核對。

## 未放入公開儲存庫的資料

| 位置 | 內容 |
|---|---|
| `reference_corpus/chunks.jsonl` | 合法取得教材的抽取段落全文 |
| `reference_corpus/*.sqlite3` | 本地建立的向量索引 |
| `course_workspaces/` | 教師教材、課程 manifest 與索引 |
| `auth/auth.sqlite3` | 帳號、登入 session 與課程關聯 |
| `feedback/feedback.env`、私有 benchmark env | 金鑰、寄信與私有環境設定 |

完整重現前需補齊這些環境與資料。僅有 corpus metadata 或舊報告，不表示已重現當時的實驗。
