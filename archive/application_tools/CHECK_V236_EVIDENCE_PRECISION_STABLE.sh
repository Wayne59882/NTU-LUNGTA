#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo '===== v236 EVIDENCE-PRECISION STATIC ACCEPTANCE ====='
python3 -m py_compile gateway.py reference_server.py kb_server.py reference_search.py scope_guard.py VERIFY_V236_EVIDENCE_PRECISION_AGENT.py benchmark/regression/RUN_V236_SEEN_REGRESSION.py
python3 VERIFY_V236_EVIDENCE_PRECISION_AGENT.py
node --check cloudflare/worker/src/index.js >/dev/null
node --check web/reference/js/31_local_llm_selector.js >/dev/null
node --check web/reference/js/48_reference_textbook.js >/dev/null
node --check web/reference/js/52_v229_semantic_microbatch.js >/dev/null
bash -n START_VQ_TA_SERVER.sh START_PRIVATE_OLLAMA.sh START_REFERENCE_EMBEDDING_OLLAMA.sh PREPARE_REFERENCE_VECTOR_RAG.sh INSTALL_V236_EVIDENCE_PRECISION_STABLE.sh
grep -q "BUILD='v236-evidence-precision-decision-agent'" reference_server.py
grep -q 'v236-evidence-precision-decision-stable' gateway.py reference_server.py
grep -q '^v236$' VERSION.txt
grep -q 'v=236precision1' web/reference/index.html
grep -q 'CUDA_VISIBLE_DEVICES=""' START_REFERENCE_EMBEDDING_OLLAMA.sh
./CHECK_HOPKINS_REFERENCE.sh >/dev/null
./CHECK_V206_7.sh >/dev/null
echo '===== ALL v236 EVIDENCE-PRECISION STABLE CHECKS PASSED ====='
