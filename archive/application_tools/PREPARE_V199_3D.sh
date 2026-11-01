#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$PWD"; TMP="$ROOT/.v2066_3d_download"
mkdir -p "$TMP" web/vendor web/assets/3d web/kb/assets/3d web/reference/assets/3d
need(){ command -v "$1" >/dev/null 2>&1 || { echo "[ERROR] Missing command: $1"; exit 1; }; }
need wget; need tar

echo "[1/4] Installing Three.js 0.180.0..."
rm -rf "$TMP/three" web/vendor/three; mkdir -p "$TMP/three"
wget -q -O "$TMP/three.tgz" "https://registry.npmjs.org/three/-/three-0.180.0.tgz"
tar xzf "$TMP/three.tgz" -C "$TMP/three"; mv "$TMP/three/package" web/vendor/three

echo "[2/4] Installing TalkingHead 1.7.0..."
rm -rf "$TMP/talkinghead" web/vendor/talkinghead; mkdir -p "$TMP/talkinghead"
wget -q -O "$TMP/talkinghead.tgz" "https://registry.npmjs.org/@met4citizen/talkinghead/-/talkinghead-1.7.0.tgz"
tar xzf "$TMP/talkinghead.tgz" -C "$TMP/talkinghead"; mv "$TMP/talkinghead/package" web/vendor/talkinghead
if [[ ! -s web/vendor/talkinghead/modules/retargeter.mjs ]]; then
  wget -q -O web/vendor/talkinghead/modules/retargeter.mjs "https://raw.githubusercontent.com/met4citizen/TalkingHead/main/modules/retargeter.mjs"
fi

echo "[3/4] Installing Zhiwei/Yating GLB avatars..."
wget -q -O web/assets/3d/zhiwei.glb "https://raw.githubusercontent.com/met4citizen/HeadAudio/main/avatars/david.glb"
wget -q -O web/assets/3d/yating.glb "https://raw.githubusercontent.com/met4citizen/HeadAudio/main/avatars/julia.glb"
cp -f web/assets/3d/zhiwei.glb web/assets/3d/yating.glb web/kb/assets/3d/
cp -f web/assets/3d/zhiwei.glb web/assets/3d/yating.glb web/reference/assets/3d/
rm -rf "$TMP"

echo "[4/4] Verifying 3D runtime..."
./CHECK_V199_3D.sh
echo "[OK] 3D runtime ready for /kb/ and /reference/."
