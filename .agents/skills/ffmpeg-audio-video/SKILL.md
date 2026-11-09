---
name: ffmpeg-audio-video
description: "Instructions for using project-local FFmpeg and ffprobe binaries for video inspection, loudness normalization, audio synthesis, and mixing."
---

# FFmpeg & Audio/Video Tooling Skill

## Project-Local Binaries
Binaries are stored strictly in `tools/bin/`:
- `tools/bin/ffmpeg`
- `tools/bin/ffprobe`

Invoke them via the wrapper scripts:
```bash
./scripts/probe.sh -i output/sun-animation.mp4
# Or run with detailed stream inspection:
./tools/bin/ffprobe -v error -show_format -show_streams output/sun-animation.mp4
```

## Useful Operations

### 1. Loudness Normalization (EBU R128)
Normalize neural speech tracks to the YouTube target standard (-16 LUFS):
```bash
./tools/bin/ffmpeg -y -i input_voice.wav -af "loudnorm=I=-16:TP=-1.5:LRA=11" normalized_voice.wav
```

### 2. Audio Duration Measurement
Retrieve precise audio duration in seconds:
```bash
./tools/bin/ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 input.wav
```

### 3. Voice & SFX Multi-track Mixing
Mix normalized voice and background ambient drone:
```bash
./tools/bin/ffmpeg -y -i voice.wav -i drone.wav -filter_complex "[0:a]volume=1.0[v];[1:a]volume=0.35,afade=t=out:st=3.5:d=0.5[d];[v][d]amix=inputs=2:duration=first[out]" -map "[out]" mixed.wav
```

### 4. Synthetic Sound Effect Generation (lavfi)
Create custom, copyright-free procedural sound effects:
```bash
# Pop / Whoosh:
./tools/bin/ffmpeg -y -f lavfi -i "sine=frequency=180:duration=0.4" -af "afade=t=out:st=0.05:d=0.35,volume=1.5" pop.wav

# Harmonic Ping:
./tools/bin/ffmpeg -y -f lavfi -i "sine=frequency=880:duration=0.6" -af "afade=t=out:st=0.1:d=0.5,volume=0.8" ping.wav

# Sub-bass Cosmic Drone:
./tools/bin/ffmpeg -y -f lavfi -i "sine=frequency=65:duration=4.0" -af "afade=t=in:st=0:d=1.0,afade=t=out:st=2.5:d=1.5,volume=0.5" drone.wav
```

### 5. Stream Verification & Inspection
```bash
./tools/bin/ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration,codec_name -of default=noprint_wrappers=1 <file>
```
