#!/bin/bash
set -e
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export HF_HOME="$PROJECT_ROOT/.cache/huggingface"
export XDG_CACHE_HOME="$PROJECT_ROOT/.cache"
export TMPDIR="$PROJECT_ROOT/.tmp"
exec "$PROJECT_ROOT/tools/venv/bin/python3" "$PROJECT_ROOT/scripts/generate_neural_tts.py" "$@"
