# v240：10 題 × 3 模型研究測試

固定使用同一組 10 題與同一份 Reference Textbook RAG evidence，比較：

- Gemma 4 12B（Local）
- Ministral 3 8B（Local）
- GPT-5.6 Luna（Cloud）

每題逐題送出，不做 10 題 batch prompt。Local 各做一次不計分 warm-up。

輸出：
- `raw_results.csv`：每題 predicted option、正誤、retrieval、inference、question-to-reply 秒數。
- `summary.csv/json`：accuracy、availability、mean/median/P95 latency。

`question_to_reply_sec = retrieval_sec + inference_sec`，表示後端從問題進入 Reference Textbook retrieval 到模型回答完成的時間；不含瀏覽器顯示與 TTS。

執行：
```bash
# 從 NTU-LUNGTA 儲存庫根目錄執行
bash research/three_model_10q/RUN_3MODEL_10Q_BENCHMARK.sh
```

OpenAI key 沿用 server-private `research/five_model_benchmark/benchmark.env`；release ZIP 不包含任何 API key。
