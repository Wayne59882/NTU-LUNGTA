#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
ENV_FILE=finetune/active_models.env
: > "$ENV_FILE"
echo 'export VQ_ENABLE_LOCAL_FT_ROUTER=1' >> "$ENV_FILE"
N=0
if [[ -f finetune/output/granite42_physiology_lora/adapter/adapter_config.json ]]; then
  echo 'export VQ_GRANITE_API_BASE=http://127.0.0.1:11439' >> "$ENV_FILE"
  echo 'export VQ_GRANITE_MODEL_TAG=granite4.2-physiology-ft:latest' >> "$ENV_FILE"
  echo "export VQ_GRANITE_MODEL_LABEL='Granite 4.2 8B · Physiology Fine-tuned (QLoRA)'" >> "$ENV_FILE"
  N=$((N+1))
fi
if [[ -f finetune/output/gemma4_12b_physiology_lora/adapter/adapter_config.json ]]; then
  echo 'export VQ_GEMMA_API_BASE=http://127.0.0.1:11439' >> "$ENV_FILE"
  echo 'export VQ_GEMMA_MODEL_TAG=gemma4-12b-physiology-ft:latest' >> "$ENV_FILE"
  echo "export VQ_GEMMA_MODEL_LABEL='Gemma 4 12B · Physiology Fine-tuned (QLoRA)'" >> "$ENV_FILE"
  N=$((N+1))
fi
if [[ -f finetune/output/ministral3_8b_physiology_lora/adapter/adapter_config.json ]]; then
  echo 'export VQ_MISTRAL_API_BASE=http://127.0.0.1:11439' >> "$ENV_FILE"
  echo 'export VQ_MISTRAL_MODEL_TAG=ministral3-8b-physiology-ft:latest' >> "$ENV_FILE"
  echo "export VQ_MISTRAL_MODEL_LABEL='Ministral 3 8B · Physiology Fine-tuned (QLoRA)'" >> "$ENV_FILE"
  N=$((N+1))
fi
if [[ $N -eq 0 ]]; then rm -f "$ENV_FILE"; echo '[ERROR] No trained adapter exists yet.'; exit 1; fi
echo "[OK] Enabled $N trained local adapter(s). Untrained local models remain available through their original Ollama path."
