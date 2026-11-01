# v239.6 生理縮寫正規化修正版

目的：修正學生自然輸入縮寫時因字串格式不同而被 scope gate 誤判為 out-of-scope 的問題。

支援範例：
- `VQ ratio`, `VQratio`, `V Q ratio`, `V/Q ratio` -> `V/Q ratio`
- `VO2max`, `VO₂max`, `VO2 max` -> `VO2 max`
- 中文相鄰輸入仍支援，例如 `什麼是VQ ratio`, `什麼是VO2max`

處理位置：
1. scope gate 前先 canonicalize。
2. RAG query embedding 前套用相同 canonicalization。
3. Retrieval-only 加入同義語：`V/Q` -> `ventilation perfusion ratio`; `VO2 max` -> `maximal oxygen uptake`。

不需要修改 chunks、不需要重建 4,792 passage / 16,151 window vector indexes。
原始學生問題仍照原樣顯示與送給答案生成模型，正規化只用於 scope / retrieval。

部署前會執行 `CHECK_V239_6_FULL_PREFLIGHT.sh`。
