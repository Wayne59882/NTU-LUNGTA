# v239：五模型研究 Benchmark + 學生 Feedback 補償機制

這版以 **v238.1** 為 inference baseline，不把研究分析 UI 塞進學生網站。

## A. 研究端：五模型實際比較
固定測試：Granite / Gemma / Ministral / GPT-5.6 Luna / Gemini 3.8 Flash。

每題只檢索一次 RAG evidence，五個模型收到**完全相同的題目與 context**。答案 key 只在回答完成後評分。正式論文建議使用 50 題未參與系統修改的新題；free API quota 不足時可以先跑 10 題，checkpoint 之後續跑。

```bash
cd /path/to/workdir/NTULUNG_TA_v206_7/research/five_model_benchmark
./CONFIGURE_CLOUD_KEYS.sh
# 準備 questions_unseen.jsonl 後：
./RUN_5MODEL_BENCHMARK.sh questions_unseen.jsonl --max-questions 10
# 正式 50 題：
./RUN_5MODEL_BENCHMARK.sh questions_unseen.jsonl --max-questions 50 --cloud-delay-seconds 1.5
```

結果自動輸出 accuracy、availability、mean/median/P95 latency、Cloud-Local accuracy/latency difference、McNemar、Wilcoxon，以及 raw CSV。

## B. 學生端：Local LLM 不滿意回報
Local 回答下方會出現 `Report this answer`。學生可選 Incorrect / Incomplete / Unclear / Too slow / Other，並填 optional comment。

系統先存 `feedback/feedback.sqlite3`，再（若已設定 SMTP）寄 Email 給開發者。即使 Email 暫時失敗，回報仍保留在 DB。

第一次設定 Email：
```bash
cd /path/to/workdir/NTULUNG_TA_v206_7
./feedback/CONFIGURE_FEEDBACK_EMAIL.sh
./INSTALL_FINAL.sh
```

匯出 feedback：
```bash
python3 feedback/EXPORT_FEEDBACK_CSV.py
```
