#!/usr/bin/env bash
# Shared by operator scripts; resolve paths independently of the caller's cwd.
VHTA_REPO_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
VHTA_APP_DIR="$VHTA_REPO_ROOT/app"
VHTA_SCRIPTS_DIR="$VHTA_REPO_ROOT/scripts"
