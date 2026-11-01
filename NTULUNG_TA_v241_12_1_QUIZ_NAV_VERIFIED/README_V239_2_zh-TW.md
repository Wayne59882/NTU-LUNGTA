# v239.2 — Runtime Secret-Safe Deployment Fix

本版修正 v239.1 安裝器的假陽性：若伺服器先前已透過 `CONFIGURE_CLOUD_KEYS.sh` 或 `CONFIGURE_FEEDBACK_RESEND.sh` 建立 `benchmark.env` / `feedback.env`，舊 acceptance 會把這些「伺服器私有 runtime 設定」誤判成「被打包進 ZIP 的 secret」而停止安裝。

v239.2 改為：
- 允許 runtime `benchmark.env` / `feedback.env` 存在；
- 存在時必須是 chmod 600；
- release manifest 與 `.gitignore` 必須排除這兩個 secret 檔；
- 安裝時保留既有 cloud API keys / Resend 設定，不要求重填；
- inference / RAG / 五模型 benchmark / student feedback 功能不變。

這是 deployment/acceptance 修正，不改模型答案行為。
