# Science Video Lab — Fully Local, Disposable Setup

A self-contained, disposable development and rendering environment for programmatic animated YouTube Shorts (9:16 vertical video) powered by **Remotion**, **React 18**, **TypeScript**, and **FFmpeg**.

## Project Highlights
- **100% Isolated**: Uses a project-local Node.js LTS arm64 runtime, project-local static FFmpeg/ffprobe binaries, and project-local caches.
- **Zero Global Pollution**: No Homebrew packages, no `sudo`, no global npm packages, and no modifications to macOS system PATH or shell configurations.
- **Dropbox Excluded**: Marked with `com.dropbox.ignored 1` so Dropbox sync does not thrash on `node_modules` or render caches.
- **Agent Skills**: Pre-configured with 5 workspace-local skills in `.agents/skills/`.

---

## Directory Structure
```
science-video-lab/
├── .agents/
│   └── skills/
│       ├── remotion-video/           # Remotion CLI, compositions, and rendering workflows
│       ├── react-motion-graphics/    # Spring physics, deterministic animation principles
│       ├── svg-animation/            # Procedural SVGs, radial gradients, coronal glows
│       ├── ffmpeg-audio-video/       # Local FFmpeg/ffprobe inspection & transcoding
│       └── video-qa/                 # Quality assurance & YouTube Shorts spec validation
├── .cache/                           # Remotion bundle cache & Chromium headless shell
├── .config/                          # Project local configs
├── .npm-cache/                       # Isolated npm cache (via .npmrc)
├── .tmp/                             # Isolated render temp files
├── tools/
│   ├── bin/                          # Standalone arm64 FFmpeg & ffprobe binaries
│   └── node/                         # Standalone Node.js v22 LTS arm64 runtime
├── src/
│   ├── components/
│   │   ├── Sun.tsx                   # Declarative animated vector Sun with coronal flares
│   │   └── Title.tsx                 # Spring-interpolated cinematic title card
│   ├── compositions/                 # Scene choreography
│   ├── scenes/
│   │   └── SunScene.tsx              # 1080x1920 vertical composition
│   ├── Root.tsx                      # Remotion composition registry
│   └── index.ts                      # Remotion entry point
├── scripts/
│   ├── run-in-env.sh                 # Environment runner injecting local tools into PATH
│   ├── npm.sh                        # Project-local npm wrapper
│   ├── npx.sh                        # Project-local npx wrapper
│   ├── render.sh                     # Renders the 3-second Sun animation to MP4
│   └── probe.sh                      # Runs project-local ffprobe
├── output/
│   ├── sun-animation.mp4             # 1080x1920 30fps H.264 MP4 export
│   └── thumbnail.png                 # Extracted preview frame
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── .gitignore
├── README.md
└── CLEANUP.md
```

---

## Quick Start / Commands

All commands should be run using the provided project-local scripts:

### 1. Render Video
```bash
./scripts/render.sh
```
Renders the `SunAnimation` composition to `output/sun-animation.mp4`.

### 2. Inspect with Local ffprobe
```bash
./scripts/probe.sh -v error -show_format -show_streams output/sun-animation.mp4
```

### 3. Open Remotion Studio Preview
```bash
./scripts/npm.sh run preview
```
Launches the interactive Remotion web preview on `http://localhost:3000`.

### 4. Run Any Command in Local Environment
```bash
./scripts/run-in-env.sh <any-command>
```

---

## 3-Second Smoke Test Results
- **Resolution**: 1080 × 1920 (9:16 Vertical)
- **Framerate**: 30.00 FPS (90 frames total)
- **Duration**: 3.00 seconds
- **Video Codec**: H.264 (High Profile, `yuv420p`)
- **Container**: MP4 (`isom` / `mp42`)
- **File Size**: ~517 kB
