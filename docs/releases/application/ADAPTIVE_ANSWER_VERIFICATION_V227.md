# v227 Adaptive Answer Verification

## Goal
Keep physiology QA accuracy high while preserving normal one-pass response latency and natural answer wording.

## Runtime policy
1. Generate the answer with question-type-aware prompt engineering.
2. Run Stage-1 deterministic verification on every answer. This does not call an LLM.
3. If Stage 1 passes, return the original answer unchanged.
4. If Stage 1 flags a concrete risk, run a short Stage-2 semantic reviewer using the same selected local model (or the same BYOK cloud provider for cloud answers).
5. The reviewer must return PASS for a correct answer and must not rewrite it for style alone.

## Stage-1 checks
- incomplete/truncated answer
- residual source/figure/table/page/chapter leakage
- MCQ option-letter validity
- deterministic option check for rule-checkable respiratory calculations/normal values
- existing language/output-contract guards

## Conditional Stage-2 triggers
- Stage-1 inconsistency
- Reference conceptual MCQ with weak retrieval
- weak-evidence knowledge/mechanism answer only when the draft itself signals uncertainty
- cloud draft only when Stage 1 fails, to avoid routine extra BYOK cost

## Diversity
Correctness constraints are strict; surface wording is flexible. Calculations and MCQ selection remain low-temperature. Knowledge/mechanism explanations use modest non-zero temperature. A correct answer is not rewritten merely to match a preferred sentence pattern.

## Fine-tuning
The 491-row SFT corpus keeps its existing train/validation/test split. System instructions now explicitly teach the same policy: strict correctness and required structure, flexible natural wording. Granite 4.2, Gemma 4, and Ministral 3 retain independent QLoRA profiles.
