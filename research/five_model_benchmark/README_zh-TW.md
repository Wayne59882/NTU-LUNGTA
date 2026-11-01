# 五模型 Local vs Cloud 實測 Benchmark（研究端，不顯示在學生網頁）

比較模型固定為：
- Local: Granite 4.2 8B Q5_K_M
- Local: Gemma 4 12B
- Local: Ministral 3 8B
- Cloud: GPT-5.6 Luna
- Cloud: Gemini 3.8 Flash

## 公平比較原則
每一題只做一次 Vector RAG，將**同一份 context**快取後依序交給五個模型。五個模型使用同一個 benchmark prompt；`expected_option` 只在模型回答完成後評分，永遠不送入 prompt。

Local 模型逐模型跑完整題集，先做一次不計時 warm-up，避免每題切模型造成不合理的冷啟動時間。Cloud latency 包含實際網路/API時間。所有 raw response、錯誤、token usage（API有回傳時）與時間都保存。

## 題庫
正式論文建議使用 50 題**未參與系統修改**的新題。格式為 JSONL，每列：
`{"id":"Q001","source":"...","expected_option":"C","question":"完整題目含 A-D"}`

不要拿 `v237_extended_seen_regression` 當最終 accuracy；它是 development regression。

## 設定 Cloud Key
```bash
# 從 NTU-LUNGTA 儲存庫根目錄開始
cd research/five_model_benchmark
./CONFIGURE_CLOUD_KEYS.sh
```
Key 只存在 server 的 `benchmark.env`（chmod 600），不會寫進 CSV/JSON。

## 先跑 10 題（省 free quota）
```bash
cp questions_unseen.template.jsonl questions_unseen.jsonl
# 把 questions_unseen.jsonl 換成你的正式題目
./RUN_5MODEL_BENCHMARK.sh questions_unseen.jsonl --max-questions 10
```

## 正式跑 50 題
```bash
./RUN_5MODEL_BENCHMARK.sh questions_unseen.jsonl --max-questions 50 --cloud-delay-seconds 1.5
```

若 API free quota 中斷，**不要刪 run 資料夾**。使用同一個 `--run-dir` 重新執行，checkpoint 會跳過已完成的 model-question pair。

## 輸出
每次 run 會產生：
- `raw_results.csv`: 每題 × 每模型的實際結果/時間/答案
- `summary.csv`: 五模型 accuracy、availability、mean/median/P95 latency
- `summary.json`: 完整統計 + 6 組 Local-vs-Cloud paired comparison
- `checkpoint.json`: quota-safe 續跑
- `contexts/`: 每題固定的同一份 RAG evidence（證明公平比較）

`summary.json` 另外包含：
- accuracy difference (Cloud - Local)
- latency difference (Cloud - Local)
- McNemar exact test（paired accuracy）
- Wilcoxon signed-rank approximation（paired latency）

API 429/503/timeout 被記為 availability/error，不會偷偷當成模型「知識答錯」。同時會提供 completed-answer accuracy 與 end-to-end accuracy。
