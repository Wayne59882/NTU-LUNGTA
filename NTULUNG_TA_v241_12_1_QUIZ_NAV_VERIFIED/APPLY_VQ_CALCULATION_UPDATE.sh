#!/usr/bin/env bash
set -euo pipefail
SOURCE="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:-}"
[[ -n "$TARGET" && -d "$TARGET/web/reference/js" && -f "$TARGET/wrangler.jsonc" ]] || { echo 'Usage: bash APPLY_VQ_CALCULATION_UPDATE.sh /absolute/path/to/the/existing/app'; exit 2; }
TARGET="$(cd "$TARGET" && pwd)"
for d in /path/to/workdir/node-v22/bin "$HOME/node-v22/bin"; do [[ ! -x "$d/node" ]] || { export PATH="$d:$PATH"; break; }; done
command -v node >/dev/null || { echo '[ERROR] Node.js is required.'; exit 2; }
node "$SOURCE/VERIFY_VQ_CONSERVATION.cjs"
ORIGIN="${VQ_ORIGIN_URL:-}"
if [[ -z "$ORIGIN" && -f "$TARGET/logs/cloudflare_origin_url.txt" ]]; then ORIGIN="$(cat "$TARGET/logs/cloudflare_origin_url.txt")"; fi
ORIGIN="${ORIGIN%/}"
if [[ "${VQ_DEPLOY_STATIC:-1}" == 1 ]]; then
 [[ "$ORIGIN" == https://* ]] || { echo '[ERROR] Existing HTTPS API origin was not found. Set VQ_ORIGIN_URL to the existing origin before running. No app files have been changed.'; exit 2; }
 command -v npx >/dev/null || { echo '[ERROR] npx is required for static deployment. No app files have been changed.'; exit 2; }
fi
if [[ "$SOURCE" != "$TARGET" ]]; then
 BACKUP="$TARGET/backups/vq_calc_$(date +%Y%m%d_%H%M%S)"
 for mode in kb reference; do
  for rel in "web/$mode/index.html" "web/$mode/js/29_v153_course_aligned_student_results.js" "web/$mode/js/35_hopkins_reference_lung_physiology.js"; do
   mkdir -p "$BACKUP/$(dirname "$rel")"
   cp -p "$TARGET/$rel" "$BACKUP/$rel"
   cp "$SOURCE/$rel" "$TARGET/$rel"
  done
 done
 for rel in VERIFY_VQ_CONSERVATION.cjs VERIFY_HOPKINS_LUNG_REFERENCE.cjs CHECK_HOPKINS_REFERENCE.sh; do
  [[ ! -f "$TARGET/$rel" ]] || cp -p "$TARGET/$rel" "$BACKUP/$rel"
  cp "$SOURCE/$rel" "$TARGET/$rel"
 done
 echo "[BACKUP] $BACKUP"
fi
node "$TARGET/VERIFY_VQ_CONSERVATION.cjs"
if [[ "${VQ_DEPLOY_STATIC:-1}" == 1 ]]; then
 (cd "$TARGET" && npx --yes wrangler@4.127.0 deploy --config "$TARGET/wrangler.jsonc" --var "ORIGIN_URL:$ORIGIN")
 echo '[DONE] Static calculation files deployed. Reload the V/Q panel once.'
else
 echo '[DONE] Local calculation files updated; public static site not deployed.'
fi
