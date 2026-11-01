#!/usr/bin/env bash
set -euo pipefail
BASE="${VQ_BASE:-/path/to/workdir}"
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo '===== v240.1 NODE-PATH FIX + SITE METRICS + 3 MODEL UI ====='

# The server keeps Node.js in a project-local directory. Interactive SSH shells
# do not always include it in PATH, so bootstrap it before the v240 acceptance
# suite runs any `node --check` commands.
if ! command -v node >/dev/null 2>&1; then
  for d in "$BASE/node-v22/bin" "$HOME/node-v22/bin"; do
    if [[ -x "$d/node" ]]; then
      export PATH="$d:$PATH"
      break
    fi
  done
fi

if ! command -v node >/dev/null 2>&1; then
  echo "[ERROR] Node.js was not found in PATH, $BASE/node-v22/bin, or $HOME/node-v22/bin." >&2
  echo '[ERROR] Deployment stopped before changing the running service.' >&2
  exit 127
fi

echo "[OK] Node.js bootstrap: $(command -v node) ($(node --version))"
exec ./INSTALL_V240_SITE_METRICS_3MODEL_REFERENCE_FLOW.sh "$@"
