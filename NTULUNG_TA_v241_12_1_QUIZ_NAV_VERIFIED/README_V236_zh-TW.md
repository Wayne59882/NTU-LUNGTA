# v236 Evidence-Precision Decision Stable

v235 實機 seen regression = 6/12 (50%)。v236 保留完整 4,792 passages 與 Human Physiology + directly related Pathophysiology scope，但改為 stem-dominant retrieval，避免 distractor-conditioned evidence 污染主排序；同時減少重複 same-model 覆核造成的答案覆寫。

已知 regression 答案只存在 benchmark/regression，沒有進 production prompt、retrieval 或 model weights。
