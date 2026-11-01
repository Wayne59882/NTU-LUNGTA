# v224：Prompt Engineering + 三個 Local Model QLoRA Fine-tuning

## 核心設計

這版將「知道什麼」與「怎麼回答」分開：

- Reference Textbook Vector RAG：提供教材知識。
- Question-type-aware Prompt Engineering：所有 Local/Cloud 模型都使用同一套題型回答規則。
- QLoRA SFT：可分別調整 Granite 4.2 8B、Gemma 4 12B、Ministral 3 8B 的回答行為。

## Dataset

只有一套主要 SFT corpus：

- train.jsonl: 371
- val.jsonl: 60
- test.jsonl: 60
- total: 491

課程與老師回饋的題型範例都直接放在 `train.jsonl`，與其他訓練資料相同，不存在 `teacher_gold.jsonl`、priority weighting 或重複 rehearsal。held-out test 使用其他未見題目。

## 三個 Local Model

```bash
./finetune/TRAIN_ONE_LOCAL_MODEL_QLORA.sh granite
./finetune/TRAIN_ONE_LOCAL_MODEL_QLORA.sh gemma
./finetune/TRAIN_ONE_LOCAL_MODEL_QLORA.sh mistral
```

或依序訓練三個：

```bash
./finetune/TRAIN_ALL_3_LOCAL_MODELS_QLORA.sh
```

三個模型不會同時塞進 GPU。訓練與推論皆遵守 one-active-model 原則。若只有部分 adapter 已訓練，已訓練者可走 fine-tuned router；其餘仍走既有 Ollama base model，因此三個 selector 始終可用。

訓練完成後：

```bash
./finetune/ENABLE_FINETUNED_LOCAL_MODELS.sh
```

再重新啟動主服務。

## Cloud 要不要 Fine-tune？

不用把 BYOK Gemini/OpenAI 做 fine-tuning。Cloud fallback 已套用與 local 相同的 question-type prompt contract、計算檢查、語言規則與 student-facing output constraints。這樣可維持 BYOK、無 server-owned API key，也不需要建立 provider-specific fine-tuning job。

因此 v224 的一致性是：

- Local Granite/Gemma/Ministral：Prompt Engineering；可各自 QLoRA Fine-tune。
- Cloud Gemini/OpenAI：相同 Prompt Engineering；不改 cloud model weights。
- Reference knowledge：仍由同一個 Vector RAG evidence 提供。

## Shared GPU

QLoRA trainer 會先檢查 free VRAM。當共享 A5000 記憶體不足時會拒絕硬啟動，避免干擾其他人的 root GPU process。不要 kill 非自己的 process。

## v227：正確性嚴格、表達方式保留多樣性

v227 不把每個正確答案強制改寫成完全相同的句型。三個 local model 的 SFT system instruction 明確要求：必要答題結構與生理正確性必須嚴格，但只要答案正確，允許自然多樣的措辭。MCQ 選項、計算結果與單位仍屬不可變的 correctness constraints。

Production runtime 採 two-stage verification：所有答案都先經快速 deterministic audit；只有發現選項、計算、完整性、來源字樣或高風險不一致時，才啟動短版 semantic reviewer。Reviewer 對正確答案必須回傳 PASS，不因文風而重寫。
