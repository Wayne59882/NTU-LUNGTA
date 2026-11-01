#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
exec python3 benchmark/regression/RUN_V237_SEEN_REGRESSION.py "$@"
