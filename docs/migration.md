# 目錄遷移與部署

[回專案首頁](../README.md)

## 目前的正式入口

正式程式由版本命名的目錄移至固定的 `app/`。從儲存庫根目錄執行 `python3 scripts/check_offline.py`；完成伺服器環境準備後，以 `bash scripts/start.sh` 啟動。

| 舊位置 | 新位置 |
|---|---|
| `NTULUNG_TA_v241_12_1_QUIZ_NAV_VERIFIED/` | `app/`；舊網址只保留 README 導覽 |
| 兩個頁面重複的前端腳本 | `app/web/shared/js/`，依功能分組 |
| 相同的頁面樣式及圖片／音訊 | `app/web/shared/css/`、`app/web/shared/assets/` |
| 版本 README、build manifest | `docs/releases/` |
| 現行回歸測試 | `tests/regression/` |
| 舊版驗證工具 | `tests/legacy/` |
| 模型、醫師題目與 V/Q 評測資料 | `research/` |
| 舊部署／安裝鏈、未載入前端程式 | `archive/` |

逐檔對照見 [migration-map.json](migration-map.json)。其中包含中間搬移步驟；若一個目的地仍有下一筆對照，繼續追蹤即可找到最終位置。Git 也保留重整前的完整內容。

## 保持的執行行為

共用前端採用原有腳本內容與原有載入順序，僅調整檔案及資產 URL；這項關係由重整前的 SHA-256 與頁面載入契約檢查。Python 的共用資源處理讓 gateway 以及直接開啟的教材服務都能提供相同檔案，並限制路徑必須位於共用資產目錄。

既有 V/Q 數值期望、測驗導覽、批次回覆與語音控制 fixtures 保留。這些測試不取代真實教材、模型、裝置及帳號隔離的操作驗收。

## 既有伺服器需要另行遷移

此次更新的是 GitHub 原始碼，沒有自動變更教學伺服器。舊版 ZIP 安裝工具保留在 `archive/`，其相對路徑對應舊封裝；目前程式應依新的安裝文件啟動。

若既有伺服器原本使用版本目錄，部署者需要在維護時段保留完整備份，確認服務與資料位置後，把需要的私有資料移轉或明確設定到新的 `app/` 環境。通常包括：

- `auth/`：帳號、session 與課程關聯。
- `course_workspaces/`：上傳教材、課程、索引與作答資料。
- `reference_corpus/`：私有教材全文與既有向量索引。
- `feedback/feedback.env`、`feedback/feedback.sqlite3`：寄信設定與回報紀錄。
- `analytics/site_metrics.sqlite3`、`benchmark/state/`：使用紀錄及目前啟用設定。
- 既有模型、語音環境與 `finetune/active_models.env` 等本機設定。

實際資料可能由環境變數指向其他位置，應先確認原有設定。上述內容不應加入公開儲存庫。新版本啟動後，依序檢查健康端點、登入／權限、原有課程、教材檢索、真實回答、語音及 Worker/Tunnel origin，再完成切換。

## 後續維護

修改共用功能時，先從 `app/web/shared/` 找到對應模組。部分既有全域函式仍有包裝與載入順序依賴；此階段先消除重複維護並釐清責任，後續可在相同回歸基準下逐項整合。
