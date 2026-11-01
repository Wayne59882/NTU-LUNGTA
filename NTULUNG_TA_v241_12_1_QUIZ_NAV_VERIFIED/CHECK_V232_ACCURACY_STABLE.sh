#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
python3 -m py_compile gateway.py reference_server.py kb_server.py reference_search.py
python3 VERIFY_V232_SEMANTIC_CONSTRAINTS.py
node --check web/reference/js/31_local_llm_selector.js >/dev/null
node --check web/reference/js/48_reference_textbook.js >/dev/null
node --check web/reference/js/52_v229_semantic_microbatch.js >/dev/null
bash -n START_VQ_TA_SERVER.sh START_PRIVATE_OLLAMA.sh START_REFERENCE_EMBEDDING_OLLAMA.sh
grep -q "BUILD='v232-semantic-constraint-verified-agent'" reference_server.py
grep -q "v232-stable-semantic-verified-shared-gpu" gateway.py reference_server.py
grep -q "semantic_qualifier_risk" reference_server.py
grep -q "blind_constraint_verify_mcq" reference_server.py
grep -q "adjudicate_constraint_disagreement" reference_server.py
grep -q "semantic_constraint_safeguards" reference_server.py
! grep -q "High-confidence respiratory-physiology safeguards" reference_server.py
grep -q "/api/reference/answer-job-start" reference_server.py web/reference/js/48_reference_textbook.js
grep -q "/api/reference/batch-job-start" reference_server.py web/reference/js/52_v229_semantic_microbatch.js
grep -q "SharedModelLock" reference_server.py kb_server.py
grep -q 'CUDA_VISIBLE_DEVICES=""' START_REFERENCE_EMBEDDING_OLLAMA.sh
./CHECK_HOPKINS_REFERENCE.sh >/dev/null
python3 VERIFY_V232_MOEX_AGENT_OPTIMIZATION.py >/dev/null
echo '===== ALL v232 SEMANTIC-CONSTRAINT + STABLE-SERVING CHECKS PASSED ====='
