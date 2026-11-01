#!/usr/bin/env bash
set -uo pipefail
cd "$(dirname "$0")/../.."
python3 benchmark/regression/RUN_V235_SEEN_REGRESSION.py "$@"
