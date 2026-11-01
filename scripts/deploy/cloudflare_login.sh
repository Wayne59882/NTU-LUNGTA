#!/usr/bin/env bash
set -euo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/../lib/paths.sh"
BASE_HOME="${VQ_BASE:-/path/to/workdir}"
if [[ -d "$BASE_HOME/node-v22/bin" ]]; then export PATH="$BASE_HOME/node-v22/bin:$PATH"; fi
command -v node >/dev/null 2>&1 || { echo '[ERROR] Node.js is required for Wrangler.'; exit 1; }
command -v npx >/dev/null 2>&1 || { echo '[ERROR] npx is required for Wrangler.'; exit 1; }
echo 'Cloudflare device login will print a URL + code. Approve it from your phone/PC browser.'
npx --yes wrangler@latest login --device --browser=false
