# 修改與提交方式

一個提交處理一個可描述的改動，並附上該次實際完成的驗證。既有歷史資料與基準 commit 保留；後續從真實修改累積紀錄。

程式、設定、操作工具與研究資料的目錄責任見[開發說明](docs/development.md)。目前正式程式位於 `app/`，操作入口位於 `scripts/`。

## 建議流程

```bash
git switch -c fix/describe-the-change
# 修改對應程式或文件
python3 scripts/check_offline.py
git diff --check
git diff
# 逐一加入本次要提交的檔案
git add path/to/changed-file
git commit -m "fix: describe the observed behavior change"
git push -u origin fix/describe-the-change
```

若修改牽涉模型、教材檢索、帳號或真實音訊，還需要對應服務的實際驗證。離線檢查的範圍見 [Testing](docs/testing.md)。

## 修改說明應包含

- 什麼操作會觸發問題，以及原本的實際行為。
- 修改後使用者看到的結果與對應程式位置。
- 執行過的命令、環境與結果；未測試的部分也應寫明。

提交前檢查變更清單，避免加入金鑰、帳號資料庫、上傳教材或私有全文。前端目前有 `reference` 與 `kb` 兩個頁面，調整共用功能時需一併確認兩者及 HTML 載入次序。

大型目錄重整、重新命名或合併歷史補丁應獨立處理，並核對部署腳本與回歸結果。
