#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
ENV="$ROOT/research/five_model_benchmark/benchmark.env"
if [[ -f "$ENV" ]]; then set -a; source "$ENV"; set +a; fi
cd "$HERE"
exec python3 benchmark_3models.py "$@"
