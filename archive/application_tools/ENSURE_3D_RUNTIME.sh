#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
# v207 uses pinned public CDN modules/GLBs for the browser 3D layer. This avoids
# losing the avatar when old server folders are deleted and keeps the project
# package independent of previously downloaded runtime assets.
./CHECK_V199_3D.sh
echo '[OK] 3D Avatar browser runtime is pinned and does not depend on old server folders.'
