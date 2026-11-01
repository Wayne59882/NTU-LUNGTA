# v239.1：Resend API Feedback（不需要 Gmail App Password）

本版保留 v239 的五模型 benchmark 與 SQLite feedback，僅新增 Resend Email API 作為推薦的寄信方式。SMTP/Gmail 仍保留為 legacy fallback。

## 最簡單的設定方式

1. 到 Resend 註冊帳號，使用你希望收到學生 feedback 的那個 Email。
2. 在 Resend 建立 API Key（`re_...`）。
3. Server 執行：

```bash
cd /path/to/workdir/NTULUNG_TA_v206_7
./feedback/CONFIGURE_FEEDBACK_RESEND.sh
```

4. 收件 Email 填 Resend 帳號本身的 Email；From 直接接受預設 `NTULUNG Feedback <onboarding@resend.dev>`。
5. 設定程式可以立刻寄一封 test email。
6. 測試成功後重新啟動：

```bash
./INSTALL_FINAL.sh
```

## 重要限制

`onboarding@resend.dev` 是 Resend 的測試寄件網域，只能寄到與 Resend 帳號關聯的 Email。對本專案的用途（學生 Report 寄到開發者本人）通常已足夠，因此不需要先驗證自有網域。

若未來要寄到其他收件者，才需要在 Resend 驗證自己的 domain，並把 `VQ_RESEND_FROM` 換成該 domain 的寄件地址。

## 安全性

API Key 只存於 `feedback/feedback.env`，檔案權限為 `600`，不會送到學生瀏覽器。Feedback 一律先寫入 `feedback.sqlite3`，Email 失敗不會造成資料遺失。
