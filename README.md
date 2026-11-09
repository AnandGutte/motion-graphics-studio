# Science Video Lab — Cross-Platform Animated Video Production

A self-contained, portable development and rendering environment for programmatic animated YouTube Shorts and science documentaries powered by **Remotion**, **React 18**, **TypeScript**, **Kokoro Neural TTS**, and **FFmpeg**.

Designed for seamless portability between **macOS (Apple Silicon)** and **Windows 11 (NVIDIA GeForce RTX 4070)**.

---

## Highlights
- **Cross-Platform**: Dual execution pipelines for macOS (Bash + MLX Metal) and Windows 11 (PowerShell + PyTorch CUDA / NVENC).
- **Zero Global Dependencies**: All runtimes, node_modules, Python environments, browser downloads, model weights, and caches are local and excluded from source control via `.gitignore`.
- **Neural Voice Synthesis**: On-device neural text-to-speech via **Kokoro-82M** (Apple Silicon MLX or NVIDIA CUDA).
- **Programmatic Motion Graphics**: Deterministic SVG vector animation, spring dynamics, and scene choreography in React.
- **6 Workspace-Local Agent Skills**: Pre-configured in `.agents/skills/` for Antigravity-powered development.

---

## Directory Structure
```
science-video-lab/
├── .agents/
│   └── skills/
│       ├── remotion-video/           # Remotion CLI, compositions, and rendering
│       ├── react-motion-graphics/    # Spring physics, deterministic animation principles
│       ├── svg-animation/            # Procedural SVGs, radial gradients, coronal glows
│       ├── ffmpeg-audio-video/       # Local FFmpeg/ffprobe inspection & normalization
│       ├── video-qa/                 # Quality assurance & YouTube Shorts spec validation
│       └── neural-narration/         # On-device Kokoro neural TTS pipeline
├── src/
│   ├── components/                   # Reusable vector graphic components
│   │   ├── CartoonSun.tsx            # Animated vector Sun with implosive vanish burst
│   │   ├── CartoonEarth.tsx          # Vector globe with day/night shader & city lights
│   │   ├── Starfield.tsx             # Deterministic parallax starfield
│   │   ├── LightBeam.tsx             # Photonic wave packets with trailing particles
│   │   ├── OrbitDiagram.tsx          # Relativistic space-time grid & gravity ripple
│   │   ├── TimerBadge.tsx            # Digital HUD timer
│   │   └── Captions.tsx              # YouTube Shorts safe-area typography pills
│   ├── scenes/                       # Individual scene components (Scenes 1 - 6)
│   ├── compositions/                 # Master compositions (MainShort.tsx)
│   ├── Root.tsx                      # Remotion composition registry
│   └── index.ts                      # Remotion entry point
├── scripts/
│   ├── render.sh / render.ps1        # Render composition to MP4 (macOS / Windows)
│   ├── preview.sh / preview.ps1      # Launch Remotion interactive web preview
│   ├── probe.sh / probe.ps1          # ffprobe inspection wrapper
│   ├── tts.sh / tts.ps1              # Kokoro neural TTS generation wrapper
│   ├── generate_neural_tts.py        # Cross-platform neural voice synthesizer
│   └── generate-audio.sh             # Procedural SFX & voice synthesis pipeline
├── public/
│   └── audio/                        # Synchronized narration clips and synthesized SFX
├── docs/
│   ├── PRODUCTION_REPORT.md          # 30-second Short technical verification & QA
│   ├── PHASE4_PRODUCTION_PLAN.md     # 2-3 minute documentary plan & script
│   └── WINDOWS_SETUP.md              # Windows 11 & RTX 4070 setup instructions
├── package.json
├── package-lock.json
├── tsconfig.json
├── remotion.config.ts
├── .gitignore
├── README.md
└── CLEANUP.md
```

---

## Quick Start

### macOS (Apple Silicon)
```bash
# Render 30-second Short
./scripts/render.sh

# Open interactive Remotion Studio preview
./scripts/npm.sh run preview

# Generate neural voice audio (Kokoro MLX)
./scripts/tts.sh --voice am_adam --text "What if the Sun vanished?" --output test.wav
```

### Windows 11 (PowerShell)
```powershell
# See docs/WINDOWS_SETUP.md for full prerequisites

# Render 30-second Short
.\scripts\render.ps1

# Open interactive Remotion Studio preview
.\scripts\preview.ps1

# Generate neural voice audio (Kokoro CUDA)
.\scripts\tts.ps1 -Voice "am_adam" -Text "What if the Sun vanished?" -Output "test.wav"
```

---

## Active Compositions
1. **`SunDisappearsShort`**: 30-second production animation (900 frames, 1080x1920, 30 FPS).
2. **`SunAnimation`**: 3-second smoke test animation (90 frames, 1080x1920, 30 FPS).
