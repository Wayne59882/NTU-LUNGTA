#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
if [[ -f "$HERE/benchmark.env" ]]; then
  # shellcheck disable=SC1091
  source "$HERE/benchmark.env"
fi
QUESTIONS="${1:-$HERE/questions_unseen.jsonl}"
shift || true
exec python3 "$HERE/benchmark_5models.py" --questions "$QUESTIONS" --models all "$@"
