#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
echo "[1/4] V/Q conservation and original-input regression"
node "$ROOT/VERIFY_HOPKINS_LUNG_REFERENCE.cjs"
echo "[2/4] KB script wiring"
grep -q '35_hopkins_reference_lung_physiology.js' "$ROOT/web/kb/index.html"
echo "[3/4] Reference Textbook script wiring"
grep -q '35_hopkins_reference_lung_physiology.js' "$ROOT/web/reference/index.html"
echo "[4/4] JS syntax"
node --check "$ROOT/web/kb/js/35_hopkins_reference_lung_physiology.js"
node --check "$ROOT/web/reference/js/35_hopkins_reference_lung_physiology.js"
echo "ALL V/Q CALCULATION CHECKS PASSED"
