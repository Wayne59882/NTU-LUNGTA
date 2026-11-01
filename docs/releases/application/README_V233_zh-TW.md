# v233 Scope-Locked RAG

此版本在 v232 的正確率與 shared-GPU 穩定服務上，加上統一的有限範圍控制。

## 系統範圍
Reference Textbook 僅回答：
- 呼吸生理
- 與呼吸治療/心肺基礎醫學直接相關的心血管生理與酸鹼生理

例如一般聊天、心情、天氣、餐廳、履歷、與心肺無關的腎臟/腸胃/內分泌問題，會在回答模型之前被拒絕。

## BYOK Cloud 行為
Gemini/OpenAI API Key 不會解除範圍限制。Cloud fallback 只會處理已通過 scope gate 的問題，而且仍使用同一份 Reference Textbook RAG evidence。

## 重要設計
這不是舊的 domain score gate，也不是針對某一題寫規則。判定依據是題目中的呼吸/心肺概念，以及現有教材 semantic retrieval 的章節/相似度證據。
