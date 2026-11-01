#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
fail=0
for mode in kb reference; do
  grep -q 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js' "web/$mode/index.html" || { echo "MISS pinned Three.js import map in $mode"; fail=1; }
  grep -q "https://cdn.jsdelivr.net/npm/@met4citizen/talkinghead@1.7.0/modules/talkinghead.mjs" "web/$mode/js/40_v199_main_3d_avatar.js" || { echo "MISS pinned TalkingHead module in $mode"; fail=1; }
  grep -q 'HeadAudio@main/avatars/david.glb' "web/$mode/js/40_v199_main_3d_avatar.js" || { echo "MISS Zhiwei GLB URL in $mode"; fail=1; }
  grep -q 'HeadAudio@main/avatars/julia.glb' "web/$mode/js/40_v199_main_3d_avatar.js" || { echo "MISS Yating GLB URL in $mode"; fail=1; }
  echo "OK   $mode 3D runtime + Zhiwei/Yating avatar URLs"
done
exit "$fail"
