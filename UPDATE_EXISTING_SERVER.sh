#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:?Usage: bash UPDATE_EXISTING_SERVER.sh /path/to/existing/live/app}"
for d in "$(dirname "$TARGET")/node-v22/bin" "$HOME/node-v22/bin"; do
  [[ ! -x "$d/node" ]] || export PATH="$d:$PATH"
done
exec "${PYTHON_BIN:-python3}" "$ROOT/scripts/deploy/apply_release.py" --target "$TARGET" --publish
