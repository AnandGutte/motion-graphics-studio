#!/bin/bash
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec "$PROJECT_ROOT/scripts/run-in-env.sh" remotion render src/index.ts SunAnimation output/sun-animation.mp4 "$@"
