#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
BASE="${VQ_BASE:-/path/to/workdir}"
cd "$ROOT"

echo '============================================================'
echo ' v241.1 ONE-CLICK COURSE-ADAPTIVE VIRTUAL HUMAN TA'
echo '============================================================'

# 1) Bootstrap Node before any static check.
if ! command -v node >/dev/null 2>&1; then
  for d in "$BASE/node-v22/bin" "$HOME/node-v22/bin"; do
    if [[ -x "$d/node" ]]; then
      export PATH="$d:$PATH"
      break
    fi
  done
fi
if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js not found in PATH, $BASE/node-v22/bin, or $HOME/node-v22/bin." >&2
  echo '[ERROR] Nothing was stopped or redeployed.' >&2
  exit 127
fi
echo "[OK] Node.js: $(command -v node) ($(node --version))"

# 2) Install a PyMuPDF binary compatible with the server Python.
if ! python3 -c 'import fitz' >/dev/null 2>&1; then
  PY_MM="$(python3 - <<'PY'
import sys
print('%d.%d' % sys.version_info[:2])
PY
)"
  echo "[INFO] PyMuPDF missing; Python is $PY_MM. Installing a compatible binary wheel."
  if python3 - <<'PY' >/dev/null 2>&1
import sys
raise SystemExit(0 if sys.version_info[:2] <= (3,6) else 1)
PY
  then
    python3 -m pip install --user --only-binary=:all: 'PyMuPDF==1.16.6'
  else
    # Prefer wheels and avoid source builds. If the newest compatible wheel is not
    # available from the configured index, fall back to a broadly compatible wheel.
    if ! python3 -m pip install --user --only-binary=:all: 'PyMuPDF<2'; then
      python3 -m pip install --user --only-binary=:all: 'PyMuPDF==1.16.6'
    fi
  fi
fi
python3 -c "import fitz; print('[OK] PyMuPDF:', (fitz.__doc__ or '').splitlines()[1] if len((fitz.__doc__ or '').splitlines())>1 else 'imported')"

# 3) Preserve/recover the legacy Reference Textbook indexes when available.
# Uploaded courses always receive their own independent indexes under course_workspaces/.
mkdir -p reference_corpus
for idx in vector_index.sqlite3 window_index.sqlite3; do
  if [[ ! -s "reference_corpus/$idx" ]]; then
    for src in \
      "$BASE/NTULUNG_TA_v206_7/reference_corpus/$idx" \
      "$BASE/NTULUNG_TA_v240_1_NODE_PATH_DEPLOYMENT_FIXED_STABLE_FINAL/reference_corpus/$idx" \
      "$BASE/v241_keep/$idx"; do
      if [[ -s "$src" ]]; then
        cp -f "$src" "reference_corpus/$idx"
        echo "[OK] Recovered legacy Reference Textbook index: $idx"
        break
      fi
    done
  fi
done

# 4) Validate v241.1 before touching the running deployment.
./CHECK_V241_COURSE_ADAPTIVE.sh

if [[ "${VQ_PREFLIGHT_ONLY:-0}" == "1" ]]; then
  echo '[OK] v241.1 preflight complete; deployment intentionally not started.'
  exit 0
fi

# 5) Reuse the proven v240.1 runtime/tunnel/Worker deployment chain.
# PATH is already bootstrapped and PDF compatibility is already verified.
exec ./INSTALL_V240_1_NODE_BOOTSTRAP_FIXED.sh "$@"
