#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
echo '===== v238 ACCURACY-FIRST ROBUST-BATCH STATIC ACCEPTANCE ====='
python3 -m py_compile gateway.py reference_server.py kb_server.py reference_search.py scope_guard.py VERIFY_V238_ACCURACY_ROBUST_BATCH_AGENT.py benchmark/regression/RUN_V237_EXTENDED_SEEN_REGRESSION.py
python3 VERIFY_V238_ACCURACY_ROBUST_BATCH_AGENT.py
node VERIFY_V238_ROBUST_BATCH_PARSER.cjs
node --check cloudflare/worker/src/index.js >/dev/null
node --check web/reference/js/51_v228_multi_question_batch.js >/dev/null
node --check web/reference/js/52_v229_semantic_microbatch.js >/dev/null
node --check web/kb/js/51_v228_multi_question_batch.js >/dev/null
bash -n START_VQ_TA_SERVER.sh START_PRIVATE_OLLAMA.sh START_REFERENCE_EMBEDDING_OLLAMA.sh PREPARE_REFERENCE_VECTOR_RAG.sh INSTALL_V238_ACCURACY_ROBUST_BATCH_STABLE.sh
grep -q "BUILD='v238-accuracy-first-robust-batch-agent'" reference_server.py
grep -q 'v238-accuracy-first-robust-batch-stable' gateway.py reference_server.py
grep -q '^v238$' VERSION.txt
grep -q '51_v228_multi_question_batch.js?v=238batch1' web/reference/index.html web/kb/index.html
grep -q '52_v229_semantic_microbatch.js?v=238batch2' web/reference/index.html
grep -q 'VQ_fallbackSplitBatch238' web/reference/js/52_v229_semantic_microbatch.js
grep -q 'numeric Markdown' web/reference/js/51_v228_multi_question_batch.js
grep -q 'batch_missing_retry' reference_server.py
grep -q "'第 '+String(i)+' 題'" web/reference/js/52_v229_semantic_microbatch.js
grep -q 'v238-cloud-selective-evidence' cloudflare/worker/src/index.js
./CHECK_HOPKINS_REFERENCE.sh >/dev/null
./CHECK_V206_7.sh >/dev/null
echo '===== ALL v238 ACCURACY-FIRST ROBUST-BATCH STABLE CHECKS PASSED ====='
