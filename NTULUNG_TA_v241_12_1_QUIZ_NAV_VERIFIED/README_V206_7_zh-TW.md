# NTU-LUNGTA v206.7

## 兩種知識來源

- **Query Knowledge Base**：原始 12,134 筆 curated KB、Active-7、ONLY Gate 68、Local LLM only。
- **Reference Textbook**：直接搜尋已提供的 Guyton 教材，取得相關教材文字與前後文，再交由使用者選擇的 Granite / Gemma / Mistral 整理成繁體中文回答。Local 太慢時，Reference Textbook 可由使用者自行選擇 Gemini 或 OpenAI 並輸入自己的 API Key；雲端模型只使用相同教材 evidence。系統不保存也不提供預設付費 API Key。

## v206.7 修正

- Conversation History 標題與框完全移除。
- 站著/坐著 VQ 問題會直接抓 Guyton Chapter 40 的 upright/VQ 內容。
- V/Q 語音讀作「V Q」。
- Speech Rate / Pitch 變更會重建目前語句並套用新 prosody，且保留頁面位置。
- Zhiwei / Yating 3D Avatar 與 STT 都列為部署驗收必測。
- Lung simulator 只保留一個數值引擎：Hopkins-reference engine。舊 v153 計算器不得再寫入輸出。
- Lung simulator 初始值固定為：500 / 150 / 15 / 0.21 / 0 / 300 / 0.8 / 15 / 5.5 / 0 / 32。
- 相同輸入在 Query KB 與 Reference Textbook 模式下必須產生完全一致的 Hopkins 數值。

- Student-facing Reference answers do not expose internal Evidence/Context/Chunk labels or source-attribution prefaces; citations remain in the separate source UI.


## v211 shared RTX A5000 balanced local-model profile (2026-09)
- Local LLM: Granite 4.2 8B Q5_K_M, Gemma 4 12B Q4_K_M, Ministral 3 8B Q4_K_M. Only one answer model is kept active; idle keep-alive defaults to 5 minutes.
- Local STT: faster-whisper large-v3-turbo. On the shared RTX A5000, CUDA is used only when at least 5.5 GB VRAM is free; otherwise CPU int8 is selected to avoid starving shared GPU services.
- Local cloned teacher TTS: XTTS-v2 latest Chinese-capable release in current coqui-tts model registry.
- BYOK cloud: Gemini 3.8 Flash and GPT-5.6 Luna. These are selected for low-latency/cost fallback rather than maximum model size. API keys remain browser-session only and are never bundled in the server package.
