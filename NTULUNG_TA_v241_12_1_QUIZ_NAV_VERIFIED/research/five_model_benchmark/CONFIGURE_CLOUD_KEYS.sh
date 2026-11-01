#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
ENV="$ROOT/benchmark.env"
echo 'Cloud API keys are stored only on this server with chmod 600.'
read -r -s -p 'OpenAI API key for GPT-5.6 Luna (blank to skip): ' OPENAI; echo
read -r -s -p 'Gemini API key for Gemini 3.8 Flash (blank to skip): ' GEMINI; echo
{
  printf 'export OPENAI_API_KEY=%q\n' "$OPENAI"
  printf 'export GEMINI_API_KEY=%q\n' "$GEMINI"
} > "$ENV"
chmod 600 "$ENV"
echo "[OK] Saved $ENV"
