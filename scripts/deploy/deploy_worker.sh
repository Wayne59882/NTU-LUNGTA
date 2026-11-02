#!/usr/bin/env bash
set -euo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/../lib/paths.sh"
BASE="$VHTA_APP_DIR"
# Validate before starting a tunnel or invoking Wrangler. No network calls here.
"${PYTHON_BIN:-python3}" "$VHTA_SCRIPTS_DIR/check_web_assets.py"
for d in "${VQ_BASE:-/path/to/workdir}/node-v22/bin" "$HOME/node-v22/bin"; do [[ -x "$d/node" ]] && export PATH="$d:$PATH" && break; done
URLFILE="$BASE/logs/cloudflare_origin_url.txt"; ORIGIN="${VQ_ORIGIN_URL:-}"
if [[ -z "$ORIGIN" ]]; then [[ -f "$URLFILE" ]] || bash "$VHTA_SCRIPTS_DIR/deploy/start_tunnel.sh"; ORIGIN="$(cat "$URLFILE")"; fi
ORIGIN="${ORIGIN%/}"; [[ "$ORIGIN" == https://* ]] || { echo "[ERROR] HTTPS origin required: $ORIGIN"; exit 1; }
command -v node >/dev/null 2>&1 || { echo '[ERROR] Node.js not found.'; exit 1; }
command -v npx >/dev/null 2>&1 || { echo '[ERROR] npx not found.'; exit 1; }
cd "$BASE"
echo '[INFO] Deploying the Multi-Course Virtual Human Teaching Assistant Worker and web assets.'
echo '[INFO] Query Knowledge Base remains Local-only.'
echo '[INFO] Reference Textbook and uploaded-course modes use semantic Vector RAG. Local answer first; optional BYOK GPT-5.6 Luna fallback uses the same retrieved evidence. No system-owned cloud API key is configured.'
echo "[INFO] API origin: $ORIGIN"
npx --yes wrangler@4.127.0 deploy --config "$BASE/wrangler.jsonc" --var "ORIGIN_URL:$ORIGIN"
