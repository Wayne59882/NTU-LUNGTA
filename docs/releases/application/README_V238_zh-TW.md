# v238 Accuracy-First Robust-Batch Stable

這版保留 v237 所有正確率優先修正，專門修掉「貼 20 題卻只回答第 1 題」的前端解析 bug。

根因不是 LLM 不願回答剩餘題目，而是舊 parser 把 `### 2` 當成一般 Markdown metadata，`stripTrailingExamMetadata()` 在第一題 D 選項後直接把其餘文字截掉。結果後端實際只收到第 1 題。

v238 支援 `2.`、`2、`、`2.【原題】`、`### 2`、`### 2.【原題】` 與單獨一行的 `2`。另外 Reference async wrapper 有第二套 fallback splitter；即使主 parser 失敗，也不能靜默退化成單題。

驗證包含 20 題 Markdown heading batch、20 題 bare-number batch、考題 metadata heading、單題不誤切與完整舊版整合檢查。

部署後建議先把剛才同一組 20 題原封不動貼入網頁。介面應顯示 `第 1 題` 到 `第 20 題`，而不是只回第一題。
