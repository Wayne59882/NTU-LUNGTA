#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
python3 -m py_compile gateway.py reference_server.py kb_server.py
node --check web/reference/js/31_local_llm_selector.js >/dev/null
node --check web/reference/js/48_reference_textbook.js >/dev/null
node --check web/reference/js/52_v229_semantic_microbatch.js >/dev/null
bash -n START_VQ_TA_SERVER.sh START_PRIVATE_OLLAMA.sh START_REFERENCE_EMBEDDING_OLLAMA.sh
grep -q "serving_profile':'v231-stable-async-shared-gpu'" gateway.py
grep -q "/api/reference/answer-job-start" reference_server.py web/reference/js/48_reference_textbook.js
grep -q "/api/reference/batch-job-start" reference_server.py web/reference/js/52_v229_semantic_microbatch.js
grep -q "/api/reference/job-status" reference_server.py web/reference/js/48_reference_textbook.js web/reference/js/52_v229_semantic_microbatch.js
grep -q "SharedModelLock" reference_server.py kb_server.py
grep -q "VQ_MODEL_KEEP_ALIVE.*30m" START_VQ_TA_SERVER.sh
grep -q "VQ_BATCH_MAX_ITEMS.*4" START_VQ_TA_SERVER.sh
grep -q 'CUDA_VISIBLE_DEVICES=""' START_REFERENCE_EMBEDDING_OLLAMA.sh
grep -q "'/api/warm-model','/api/reference/warm-model'" reference_server.py
node VERIFY_V229_SEMANTIC_MICROBATCH.cjs >/dev/null
./CHECK_HOPKINS_REFERENCE.sh >/dev/null
python3 VERIFY_V231_MOEX_AGENT_OPTIMIZATION.py >/dev/null
echo '===== ALL v231 STABLE SHARED-GPU SERVING CHECKS PASSED ====='
