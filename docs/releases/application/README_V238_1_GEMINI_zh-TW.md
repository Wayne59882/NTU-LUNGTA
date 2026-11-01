# v238.1 Gemini BYOK 相容性修正

此修正版不更動 v238 的教材、RAG、Local LLM、scope、MCQ accuracy 或 batch parser。

修正 Gemini 3.8 Flash API 呼叫：移除新版已淘汰的 temperature 取樣參數，改用 thinkingLevel=medium，並將單次 Gemini 請求逾時由 30 秒提高至 45 秒。

使用者 API Key 仍只由瀏覽器送至 Cloudflare Worker，套件不保存 API Key。
