from pathlib import Path

ROOT=Path(__file__).resolve().parent
PROFILES={
  "granite":{
    "label":"Granite 4.2 8B · IBM",
    "hf_model_id":"ibm-granite/granite-4.2-8b",
    "loader":"causal",
    "output_dir":"granite42_physiology_lora",
    "runtime_tag":"granite4.2-physiology-ft:latest",
    "ft_label":"Granite 4.2 8B · Physiology Fine-tuned (QLoRA)",
    "min_free_vram_gib":7.0,
  },
  "gemma":{
    "label":"Gemma 4 12B · Google",
    "hf_model_id":"google/gemma-4-12B-it",
    "loader":"multimodal",
    "output_dir":"gemma4_12b_physiology_lora",
    "runtime_tag":"gemma4-12b-physiology-ft:latest",
    "ft_label":"Gemma 4 12B · Physiology Fine-tuned (QLoRA)",
    "min_free_vram_gib":9.0,
  },
  "mistral":{
    "label":"Ministral 3 8B · Mistral AI",
    "hf_model_id":"mistralai/Ministral-3-8B-Instruct-2512-BF16",
    "loader":"multimodal",
    "output_dir":"ministral3_8b_physiology_lora",
    "runtime_tag":"ministral3-8b-physiology-ft:latest",
    "ft_label":"Ministral 3 8B · Physiology Fine-tuned (QLoRA)",
    "min_free_vram_gib":7.5,
  },
}

def profile(key):
    key=str(key or '').strip().lower()
    if key not in PROFILES: raise KeyError(f"Unknown local model: {key}. Choose granite, gemma, or mistral.")
    return PROFILES[key]

def adapter_dir(key):
    p=profile(key)
    return ROOT/'output'/p['output_dir']/'adapter'
