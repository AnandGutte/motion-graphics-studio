---
name: ffmpeg-audio-video
description: "Instructions for using project-local FFmpeg and ffprobe binaries for video inspection, transcoding, and audio/video multiplexing."
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
1. **Stream Verification**:
   ```bash
   ./tools/bin/ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration,codec_name -of default=noprint_wrappers=1 <file>
   ```
2. **Audio Mixing**:
   ```bash
   ./tools/bin/ffmpeg -i video.mp4 -i audio.wav -c:v copy -c:a aac -shortest final.mp4
   ```
3. **Thumbnail Generation**:
   ```bash
   ./tools/bin/ffmpeg -ss 00:00:01.500 -i output/sun-animation.mp4 -vframes 1 -q:v 2 output/thumbnail.jpg
   ```
