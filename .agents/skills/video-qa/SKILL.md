---
name: video-qa
description: "Quality assurance validation criteria for programmatic video exports, ensuring YouTube Shorts compliance."
---

# Video QA & Validation Skill

## YouTube Shorts Standard Specifications
- **Aspect Ratio**: 9:16 Vertical (`1080 x 1920`)
- **Frame Rate**: 30 FPS or 60 FPS (constant frame rate)
- **Container**: MP4 (`isom` / `mp42`)
- **Video Codec**: H.264 / AVC (`yuv420p` pixel format for broad mobile playback)
- **Audio Codec**: AAC stereo 44.1kHz or 48kHz (when audio present)
- **Duration**: <= 60 seconds (Shorts boundary)

## Automated QA Checklist
Run the verification script or ffprobe:
```bash
./tools/bin/ffprobe -v error -select_streams v:0 -show_entries stream=width,height,codec_name,pix_fmt,r_frame_rate,duration -of csv=p=0 <video-file>
```
Expected output pattern:
`h264,yuv420p,1080,1920,30/1,3.000000`
