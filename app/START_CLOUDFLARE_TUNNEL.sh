#!/usr/bin/env bash
set -euo pipefail
BASE="$(cd "$(dirname "$0")" && pwd)"
BIN="$HOME/.local/bin/cloudflared"
LOG="$BASE/logs/cloudflared.log"
PIDFILE="$BASE/logs/cloudflared.pid"
URLFILE="$BASE/logs/cloudflare_origin_url.txt"
mkdir -p "$HOME/.local/bin" "$BASE/logs"
if [[ ! -x "$BIN" ]]; then
  ARCH="$(uname -m)"
  case "$ARCH" in
    x86_64|amd64) ASSET='cloudflared-linux-amd64' ;;
    aarch64|arm64) ASSET='cloudflared-linux-arm64' ;;
    *) echo "[ERROR] Unsupported architecture: $ARCH"; exit 1 ;;
  esac
  echo "[INFO] Downloading cloudflared ($ASSET)..."
  curl -fL "https://github.com/cloudflare/cloudflared/releases/latest/download/$ASSET" -o "$BIN"
  chmod +x "$BIN"
fi
if [[ -f "$PIDFILE" ]]; then
  OLD="$(cat "$PIDFILE" 2>/dev/null || true)"
  [[ -z "$OLD" ]] || kill "$OLD" 2>/dev/null || true
fi
pkill -f 'cloudflared tunnel --url http://127.0.0.1:8179' 2>/dev/null || true
: > "$LOG"
nohup "$BIN" tunnel --no-autoupdate --url http://127.0.0.1:8179 >"$LOG" 2>&1 &
echo $! > "$PIDFILE"
for _ in $(seq 1 40); do
  URL="$(grep -Eo 'https://[-a-z0-9]+\.trycloudflare\.(com|app)' "$LOG" | tail -n1 || true)"
  if [[ -n "$URL" ]]; then
    echo "$URL" > "$URLFILE"
    echo "[OK] CLOUDFLARE ORIGIN: $URL"
    exit 0
  fi
  sleep 1
done
echo '[ERROR] Cloudflare Tunnel URL was not detected.'
tail -n 80 "$LOG"
exit 1
