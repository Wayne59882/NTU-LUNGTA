# Reference Textbook Corpus

本目錄存放內建生理學教材的段落與索引。教材全文及本地向量資料庫未納入公開儲存庫；`corpus_meta.json` 為既有 metadata，不能單獨用來重建全文。

| 本地檔案 | 用途 |
|---|---|
| `chunks.jsonl` | 教材抽取段落及來源 |
| `vector_index.sqlite3` | BGE-M3 段落向量索引 |
| `window_index.sqlite3` | 預先計算的語義視窗索引 |

目前 `reference_search.py` 使用語義向量檢索與視窗重排，另含嵌入／索引失敗時的文字檢索備援。完整路徑見[系統架構](../../docs/architecture.md)，環境設定見[安裝文件](../../docs/getting-started.md)。

取得可合法使用的教材並完成本地環境後，再從儲存庫根目錄執行 `bash scripts/setup/prepare_reference.sh` 準備索引。
