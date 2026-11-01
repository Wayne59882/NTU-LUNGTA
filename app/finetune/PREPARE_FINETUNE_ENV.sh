#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ENV_DIR="${VQ_FT_ENV:-$BASE/lungta-ft-venv}"
SOURCE_PY="${VQ_FT_SOURCE_PY:-$BASE/miniforge-teacher-tts/bin/python}"
if [[ ! -x "$SOURCE_PY" ]]; then SOURCE_PY="$(command -v python3)"; fi
if [[ ! -x "$ENV_DIR/bin/python" ]]; then echo "[INFO] Creating isolated fine-tuning environment at $ENV_DIR"; "$SOURCE_PY" -m venv --system-site-packages "$ENV_DIR"; fi
"$ENV_DIR/bin/python" -m pip install -U pip setuptools wheel
"$ENV_DIR/bin/python" -m pip install -U 'transformers>=5.10,<6' 'peft>=0.17,<0.30' 'accelerate>=1.10,<2' 'bitsandbytes>=0.47,<0.60' 'safetensors>=0.6' 'huggingface_hub>=0.34' 'sentencepiece>=0.2'
"$ENV_DIR/bin/python" - <<'PY2'
import torch,transformers,peft
print('[OK] torch',torch.__version__,'cuda=',torch.cuda.is_available())
print('[OK] transformers',transformers.__version__,'peft',peft.__version__)
PY2
