#!/usr/bin/env bash
# Shared by operator scripts; resolve paths independently of the caller's cwd.
LUNGTA_REPO_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd)"
LUNGTA_APP_DIR="$LUNGTA_REPO_ROOT/app"
LUNGTA_SCRIPTS_DIR="$LUNGTA_REPO_ROOT/scripts"
