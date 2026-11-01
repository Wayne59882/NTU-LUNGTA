# v231 MOEX Benchmark-Guided Agent Optimization

目的：用 2012–2026 考選部呼吸治療師心肺基礎醫學呼吸生理題作為 benchmark，找出 Agent 在現有資源下答錯的原因；官方答案只在 Agent 回答完成後用於評分與 post-hoc diagnosis。

禁止事項：
- 不把 MOEX 題目/答案拿去 fine-tune。
- 不把官方答案送進 production retrieval / answer / self-verification prompt。
- 不針對單題新增答案規則。
- 不新增獨立知識 validator。

自動流程：
1. Guyton + v229-compatible baseline benchmark。
2. Guyton + v231 generic agent optimization benchmark。
   - MCQ stem-weighted semantic retrieval，降低 A-D distractor 對 embedding 的污染。
   - 同一個使用者選定 Local LLM：primary answer → blind independent self-check → disagreement adjudication。
3. 對 v231 Guyton remaining errors 做 full diagnostic trace：retrieval / reasoning / interpretation / option mapping / self-verification / corpus coverage gap。
4. 只有出現 high-confidence corpus coverage gap 或 diagnosis unresolved，才 A/B test Beachey + Vander supplemental respiratory corpus。
5. 最終以 official-MOEX correct count 選擇配置；平手保留較簡單的 Guyton-only。
6. CHECK_V206_7.sh 通過後自動部署既有 lungta.twchu.workers.dev。

完整自動指令：

```bash
nohup ./benchmark/moex/RUN_V231_FULL_BENCHMARK_DIAGNOSE_AND_DEPLOY.sh \
  > /path/to/workdir/v231_auto.log 2>&1 &
```

查看進度：

```bash
tail -f /path/to/workdir/v231_auto.log
```

完成後報告：
- benchmark/output/FINAL_V231_REPORT.md
- benchmark/output/FINAL_V231_DECISION.json
- benchmark/output/guyton_v231_diagnosis.json

