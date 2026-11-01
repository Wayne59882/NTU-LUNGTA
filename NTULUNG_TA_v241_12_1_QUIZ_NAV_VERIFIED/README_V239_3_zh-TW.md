# v239.3 Checked Five-Model Benchmark + Feedback

此版修正 v239.2 的 acceptance test 本身：舊測試以 `unittest.mock.call_args` 讀取最後一次呼叫，在特定 server runtime 可取得字串而非 Request，造成 `AttributeError: 'str' object has no attribute 'full_url'`。實際 Resend request code 並未因此失效，但 installer 被測試程式中止。

v239.3 改成 deterministic fake `urlopen`，直接捕捉 `urllib.request.Request`，不使用網路、不消耗 Resend quota，並新增完整 preflight。

可先只驗證、不部署：

```bash
VQ_PREFLIGHT_ONLY=1 ./INSTALL_FINAL.sh
```

看到 `ALL v239.3 FULL PREFLIGHT CHECKS PASSED` 後，再執行：

```bash
./INSTALL_FINAL.sh
```

Server 上既有 `research/five_model_benchmark/benchmark.env` 與 `feedback/feedback.env` 只要權限為 0600 會保留，不會被視為 release secret。
