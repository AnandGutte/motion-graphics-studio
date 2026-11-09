#!/usr/bin/env python3
"""
Kokoro MLX Neural TTS Generator for Science Video Lab.
Runs 100% locally on Apple Silicon using MLX.
All model weights, caches, and phoneme data are restricted to the project workspace.
"""

import os
import sys
import argparse
from pathlib import Path

# Enforce project-local caches and environment
PROJECT_ROOT = Path(__file__).resolve().parent.parent
os.environ["HF_HOME"] = str(PROJECT_ROOT / ".cache" / "huggingface")
os.environ["XDG_CACHE_HOME"] = str(PROJECT_ROOT / ".cache")
os.environ["TMPDIR"] = str(PROJECT_ROOT / ".tmp")
os.environ["ESPEAK_DATA_PATH"] = str(PROJECT_ROOT / "tools")

try:
    from kokoro_mlx import KokoroTTS
except ImportError:
    print("Error: kokoro-mlx is not installed in the current environment.", file=sys.stderr)
    print("Please run inside the project virtual environment: ./tools/venv/bin/python", file=sys.stderr)
    sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="Generate neural voice audio via Kokoro MLX.")
    parser.add_argument("--text", "-t", required=True, help="Text to synthesize")
    parser.add_argument("--voice", "-v", default="am_michael", help="Voice identifier (e.g. am_michael, am_adam, af_heart)")
    parser.add_argument("--output", "-o", required=True, help="Output WAV path")
    parser.add_argument("--speed", "-s", type=float, default=1.0, help="Speech rate multiplier (default: 1.0)")
    parser.add_argument("--sample-rate", "-r", type=int, default=24000, help="Output sample rate (24000 or 48000)")
    args = parser.parse_args()

    out_path = Path(args.output).resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"Loading Kokoro TTS model (cache: {os.environ['HF_HOME']})...")
    tts = KokoroTTS.from_pretrained("mlx-community/Kokoro-82M-bf16")

    print(f"Synthesizing text with voice='{args.voice}', speed={args.speed}, sample_rate={args.sample_rate}...")
    result = tts.save(
        text=args.text,
        path=str(out_path),
        voice=args.voice,
        speed=args.speed,
        sample_rate=args.sample_rate,
    )

    if out_path.exists() and out_path.stat().st_size > 0:
        print(f"Generated audio successfully: {out_path} ({out_path.stat().st_size} bytes)")
    else:
        print(f"Error: Output file was not generated or is empty.", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
