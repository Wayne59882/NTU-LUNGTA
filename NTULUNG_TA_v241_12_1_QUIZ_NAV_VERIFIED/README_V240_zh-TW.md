# NTULUNG TA v240 — Site Metrics + 3 Models + Reference Textbook Flow

## Student website changes

1. A small, unobtrusive English badge is shown at the lower-right corner:
   - `Online now: N`
   - `Total visitors: N`
2. Counts use random browser/session IDs plus timestamps only. No IP, name, email, or question content is stored.
3. Student-selectable models are now:
   - Gemma 4 12B · Google (Local, default)
   - Ministral 3 8B · Mistral AI (Local)
   - GPT-5.6 Luna · OpenAI (Cloud BYOK)
4. Granite 4.2 is no longer student-selectable. Gemini 3.8 Flash is removed from the student cloud catalog.
5. Existing Reference Textbook RAG, Knowledge Base, feedback, STT/TTS, avatar, and V/Q visual model are retained.

## 10-question × 3-model benchmark

The release includes the same exact-source 10-question pilot set used previously, now restricted to the three remaining models.

```bash
cd /path/to/workdir/NTULUNG_TA_v206_7
./research/three_model_10q/RUN_3MODEL_10Q_BENCHMARK.sh
```

Outputs include per-question accuracy, retrieval time, model inference time, and `question_to_reply_sec = retrieval + inference`, plus mean/median/P95 summaries.

## Flowchart

`docs/V240_VQ_RATIO_VIRTUAL_HUMAN_TA_SUMMARY_FLOWCHART.png`

Student Q&A now branches to **Knowledge Base** and **Reference Textbook**. The Reference Textbook branch shows physiology scope check → bge-m3 semantic vector retrieval → source-balanced rerank → Top 6 evidence → selected model answer → verification/completeness check.

## Deploy

```bash
cd /path/to/workdir
unzip -o NTULUNG_TA_v240_SITE_METRICS_3MODEL_REFERENCE_FLOW_CHECKED_FINAL.zip
cd /path/to/workdir/NTULUNG_TA_v206_7
chmod +x INSTALL_FINAL.sh
./INSTALL_FINAL.sh
```
