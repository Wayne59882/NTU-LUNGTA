# v231 Stable Shared-GPU Serving

這個封包保留 v231 的 RAG、MOEX benchmark-guided agent optimization、3D avatar、STT/TTS 與 Hopkins 肺模擬，不重新訓練國考題，也不加入題目特例。

本版針對實際 server log 的 serving 問題：Granite direct test 可生成，但冷載入約 35.9 秒；共享 A5000 的 VRAM 被其他帳號大量占用；Reference 的 long POST 因此可能超過 gateway/Cloudflare 可穩定等待時間。

主要修正：Local-only 單題與批次改為 server async job + polling、batch 4 題一組、Granite server-side prewarm、30 分鐘 keep-alive、KB/Reference 共用跨 process model lock、修復 warm-model 404、embedding 11438 強制 CPU、移除 page-load 自動 model warm。

部署：將 ZIP 解壓覆蓋到 `/path/to/workdir/NTULUNG_TA_v206_7` 後，在該資料夾執行 `./INSTALL_V231_STABLE_SERVING.sh`。腳本只會停止 USER 自己的專案 serving/Ollama 程序，不會碰其他使用者的 GPU process。
