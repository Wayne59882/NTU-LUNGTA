#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
f=cloudflare/worker/src/index.js
grep -q "gemini-3.8-flash" "$f"
grep -q "x-goog-api-key" "$f"
grep -q "thinkingLevel:'medium'" "$f"
! grep -q "temperature:0.05" "$f"
grep -q "const CLOUD_TIMEOUT_MS=45000" "$f"
echo "[OK] v238.1 Gemini BYOK compatibility fix present"
