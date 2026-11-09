# Motion Graphics Studio — AI-Assisted Animation & Video Production

A modular, reusable studio framework for producing programmatic 2D motion graphics, animated explainers, educational documentaries, and YouTube Shorts powered by **Remotion**, **React 18**, **TypeScript**, **Kokoro Neural TTS**, and **FFmpeg**.

Designed for seamless portability between **Windows 11 (NVIDIA GeForce RTX 4070 with CUDA)** and **macOS (Apple Silicon with MLX Metal)**.

---

## Studio Purpose & Philosophy

**Motion Graphics Studio** is not a single-video codebase, but a permanent, extensible production environment. It provides an end-to-end programmatic pipeline for turning concepts and scripts into broadcast-ready motion graphics videos with synchronized neural voiceovers, dynamic vector graphics, and automated quality assurance.

While currently specialized for high-retention 2D vector animations and educational science explainers, its architecture is domain-agnostic and designed to scale to history, economics, mathematics, technical tutorials, and future 3D/Blender rendering pipelines.

---

## Core Production Technologies

- **Video Engine**: **Remotion** (`v4.0.542`) with Chrome Headless Shell.
- **Frontend & Logic**: **React 18** and **TypeScript** (strictly typed coordinates, timings, and easing curves).
- **Visuals**: Procedural SVG graphics, radial glows, space-time relativistic grids, and spring dynamics (`remotion/spring`).
- **Neural Voiceover**: On-device **Kokoro-82M** neural TTS accelerated via PyTorch CUDA on Windows 11 and MLX on macOS.
- **Hardware Acceleration**: Local NVIDIA GeForce RTX 4070 (8 GB GDDR6 VRAM) for parallel rendering and neural inference.
- **Audio Engineering & QA**: **FFmpeg & FFprobe** for loudness normalization (-14 LUFS), zero-black-frame detection, and audio mixing.
- **AI-Assisted Workflow**: Antigravity agents orchestrating research, scripting, asset creation, narration, and automated QA.

---

## Production Workflow

Every project in the studio progresses through a standardized eleven-stage production lifecycle:

```
Concept ──► Research ──► Script ──► Storyboard ──► Asset Creation
                                                        │
Final Export ◄── Quality Assurance ◄── Rendering ◄── Audio Mixing ◄── Animation ◄── Narration
```

1. **Concept**: Define the core educational thesis or viral hook.
2. **Research**: Gather verified scientific facts, physical constants, and empirical data.
3. **Script**: Draft punchy narration timed for audience retention and natural vocal cadence.
4. **Storyboard**: Structure frame-accurate scene beats, camera choreography, and visual cues.
5. **Asset Creation**: Build procedural SVG components, HUD timers, diagrams, and vector illustrations.
6. **Narration**: Synthesize on-device neural voiceovers with Kokoro CUDA (`scripts/tts.ps1`).
7. **Animation**: Program declarative React transitions, spring dynamics, and sequence choreographies.
8. **Audio Mixing**: Balance sound effects, ambient drones, and voiceover with loudness normalization (-14 LUFS).
9. **Rendering**: Headless Chrome frame rasterization via Remotion CLI (`scripts/render.ps1`).
10. **Quality Assurance**: Inspect audio peaks, detect black frames (`blackdetect`), and generate contact sheets.
11. **Final Export**: Tag and archive the master MP4 in `output/`.

---

## Repository Architecture

```text
motion-graphics-studio/
├── .agents/
│   └── skills/                       # 6 Workspace-local Antigravity skills
│       ├── remotion-video/           # Remotion CLI, compositions, and rendering
│       ├── react-motion-graphics/    # Spring physics, deterministic animation
│       ├── svg-animation/            # Procedural SVGs, gradients, coronal glows
│       ├── ffmpeg-audio-video/       # FFmpeg/ffprobe inspection & normalization
│       ├── video-qa/                 # YouTube Shorts QA spec validation
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
│   ├── scenes/                       # Scene choreography components
│   ├── compositions/                 # Master compositions (MainShort.tsx)
│   ├── productions/                  # Multi-production registry and specifications
│   │   ├── types.ts                  # ProductionDefinition schema
│   │   ├── sun-disappears/           # "What If the Sun Disappeared?" production
│   │   │   └── index.ts
│   │   └── README.md                 # Production authoring guide
│   ├── Root.tsx                      # Remotion composition registry
│   └── index.ts                      # Remotion entry point
├── scripts/
│   ├── render.ps1 / render.sh        # Video rendering wrapper (Windows / macOS)
│   ├── preview.ps1 / preview.sh      # Remotion Studio preview server
│   ├── probe.ps1 / probe.sh          # Media stream analysis wrapper
│   ├── tts.ps1 / tts.sh              # Kokoro neural TTS synthesis wrapper
│   └── generate_neural_tts.py        # Cross-platform PyTorch/MLX voice generator
├── public/
│   └── audio/                        # Synchronized narration WAVs and sound effects
├── docs/
│   ├── COMMAND_INVENTORY.md          # Comprehensive inventory of development commands
│   ├── WINDOWS_SETUP.md              # Windows 11 & RTX 4070 setup instructions
│   ├── WINDOWS_INITIALIZATION_REPORT.md # Initial benchmark & environment audit
│   ├── PHASE4_PRODUCTION_PLAN.md     # Extended 2-3 minute documentary production plan
│   ├── PRODUCTION_REPORT.md          # 30-second Short technical verification & QA
│   └── PROJECT_REBRANDING_REPORT.md  # Identity rebrand & architecture documentation
├── output/                           # Rendered MP4s, test audio, and QA contact sheets
├── .venv/                            # Local Python 3.10+ virtual environment (CUDA)
├── node_modules/                     # Local npm dependencies
├── AGENT_COMMAND_AUTHORIZATION.md    # Standing authorization policy
├── AGENTS.md                         # Agent onboarding guide
└── package.json
```

---

## Active Productions

### 1. `sun-disappears` — "What If the Sun Disappeared?"
- **Short Composition (`SunDisappearsShort`)**: 30-second production animation (900 frames, 1080x1920, 30 FPS).
- **Smoke Test Composition (`SunAnimation`)**: 3-second smoke test animation (90 frames, 1080x1920, 30 FPS).
- **Planned Documentary**: Extended 2–3-minute deep dive into the astrophysics of solar disappearance (see `docs/PHASE4_PRODUCTION_PLAN.md`).

---

## Quick Start

### Windows 11 (PowerShell with NVIDIA CUDA)
```powershell
# See docs/WINDOWS_SETUP.md for full prerequisites

# Render 30-second Short
.\scripts\render.ps1

# Launch interactive Remotion Studio preview
.\scripts\preview.ps1

# Synthesize neural voiceover (Kokoro CUDA)
.\scripts\tts.ps1 -Voice "am_adam" -Speed 1.05 -Text "What if the Sun vanished?" -Output "output\test.wav"

# Perform audio volume QA check
ffmpeg -i output\sun-disappears-final.mp4 -af "volumedetect" -f null -
```

### macOS (Apple Silicon with MLX)
```bash
# Render 30-second Short
./scripts/render.sh

# Open interactive Remotion Studio preview
./scripts/npm.sh run preview

# Synthesize neural voiceover (Kokoro MLX)
./scripts/tts.sh --voice am_adam --text "What if the Sun vanished?" --output output/test.wav
```
