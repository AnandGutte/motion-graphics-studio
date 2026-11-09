#!/bin/bash
set -e
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$PROJECT_ROOT/tools/bin:$PROJECT_ROOT/tools/node/bin:$PROJECT_ROOT/node_modules/.bin:$PATH"
export PUPPETEER_CACHE_DIR="$PROJECT_ROOT/.cache/puppeteer"
export REMOTION_CACHE_DIR="$PROJECT_ROOT/.cache/remotion"
export TMPDIR="$PROJECT_ROOT/.tmp"
exec "$@"
