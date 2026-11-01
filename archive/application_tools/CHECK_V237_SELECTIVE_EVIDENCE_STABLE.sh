#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo '===== v237 SELECTIVE-EVIDENCE STATIC ACCEPTANCE ====='
python3 -m py_compile gateway.py reference_server.py kb_server.py reference_search.py scope_guard.py VERIFY_V237_SELECTIVE_EVIDENCE_AGENT.py benchmark/regression/RUN_V237_SEEN_REGRESSION.py benchmark/regression/RUN_V237_EXTENDED_SEEN_REGRESSION.py
python3 VERIFY_V237_SELECTIVE_EVIDENCE_AGENT.py
node --check cloudflare/worker/src/index.js >/dev/null
node --check web/reference/js/31_local_llm_selector.js >/dev/null
node --check web/reference/js/48_reference_textbook.js >/dev/null
node --check web/reference/js/52_v229_semantic_microbatch.js >/dev/null
bash -n START_VQ_TA_SERVER.sh START_PRIVATE_OLLAMA.sh START_REFERENCE_EMBEDDING_OLLAMA.sh PREPARE_REFERENCE_VECTOR_RAG.sh INSTALL_V237_SELECTIVE_EVIDENCE_STABLE.sh
grep -q "BUILD='v237-selective-evidence-decision-agent'" reference_server.py
grep -q 'v237-selective-evidence-decision-stable' gateway.py reference_server.py
grep -q '^v237$' VERSION.txt
grep -q 'v=237selective1' web/reference/index.html
grep -q 'CUDA_VISIBLE_DEVICES=""' START_REFERENCE_EMBEDDING_OLLAMA.sh
grep -q 'v237-cloud-selective-evidence' cloudflare/worker/src/index.js
grep -q "'第 '+String(i)+' 題'" web/reference/js/52_v229_semantic_microbatch.js
./CHECK_HOPKINS_REFERENCE.sh >/dev/null
./CHECK_V206_7.sh >/dev/null
echo '===== ALL v237 SELECTIVE-EVIDENCE STABLE CHECKS PASSED ====='
