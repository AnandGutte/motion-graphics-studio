# AGENTS.md — Motion Graphics Studio Development Guide

Welcome to **Motion Graphics Studio**. This document is the primary developer and agent onboarding guide for all Antigravity coding sessions operating in this repository.

> **Important Security & Scope Notice**:  
> Standing authorization in this repository applies strictly to routine, non-destructive development tasks within the workspace root (`C:\Dev\science-video-lab`, planned for migration to `C:\Dev\motion-graphics-studio`). This document does **not** override Antigravity's native security boundaries, tool approval dialogues, or operating system access controls.

---

## 1. Project Purpose & Philosophy

**Motion Graphics Studio** is a modular, AI-assisted video production studio engineered to produce high-retention animated explainers, educational documentaries, YouTube Shorts, and cinematic motion graphics.

Key architectural pillars:
- **Reusable Multi-Production Engine**: Not a single-video codebase. Each video or documentary series is maintained as a distinct production within `src/productions/`, sharing vector components, motion algorithms, neural voices, and rendering infrastructure.
- **Pure Code-Driven Animation**: Remotion (`v4.0.542`), React 18, and TypeScript driving deterministic frame-based SVG vector animations and spring physics.
- **On-Device Neural Voice Synthesis**: Kokoro-82M neural TTS accelerated by NVIDIA CUDA (PyTorch 2.6+) on Windows 11 and Apple Silicon MLX on macOS.
- **Hardware-Accelerated Encoding**: Leveraging NVIDIA RTX 4070 (8 GB VRAM) for NVENC video encoding and parallel headless Chrome rendering.
- **Broadcast-Grade Audio & Automated QA**: FFmpeg/ffprobe loudness normalization (-14 to -16 LUFS), zero-black-frame verification, and automated contact sheet generation.
- **Extensible Roadmap**: Designed to expand from 2D vector animations to 3D scenes (Three.js/WebGL), programmatic Blender renders, and multi-language voice pipelines.

---

## 2. Key Documentation References

Before performing operations, consult the authoritative studio documentation:
- 📜 [`AGENT_COMMAND_AUTHORIZATION.md`](file:///C:/Dev/science-video-lab/AGENT_COMMAND_AUTHORIZATION.md): Formal policy on preauthorized routine commands, conditional commands, and actions requiring explicit approval.
- 📋 [`docs/COMMAND_INVENTORY.md`](file:///C:/Dev/science-video-lab/docs/COMMAND_INVENTORY.md): Comprehensive inventory of 20 tested and planned development workflows on Windows 11.
- ⚙️ [`docs/WINDOWS_SETUP.md`](file:///C:/Dev/science-video-lab/docs/WINDOWS_SETUP.md): Hardware specifications, environment setup, and driver requirements.
- 🎬 [`docs/PHASE4_PRODUCTION_PLAN.md`](file:///C:/Dev/science-video-lab/docs/PHASE4_PRODUCTION_PLAN.md): Production blueprint and narration script for the extended Sun Disappearance documentary.
- 📊 [`docs/WINDOWS_INITIALIZATION_REPORT.md`](file:///C:/Dev/science-video-lab/docs/WINDOWS_INITIALIZATION_REPORT.md): Historical initialization audit, benchmark numbers, and validation results.
- 📝 [`docs/PROJECT_REBRANDING_REPORT.md`](file:///C:/Dev/science-video-lab/docs/PROJECT_REBRANDING_REPORT.md): Rebranding audit and future workspace migration guide.

---

## 3. Repository Architecture

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
│   ├── scenes/                       # Scene choreography components
│   ├── compositions/                 # Master compositions (MainShort.tsx)
│   ├── productions/                  # Production definitions and registry
│   │   ├── types.ts                  # ProductionDefinition interface
│   │   ├── sun-disappears/           # "What If the Sun Disappeared?" production
│   │   │   └── index.ts
│   │   └── README.md                 # Multi-production architecture guide
│   ├── Root.tsx                      # Remotion composition registry
│   └── index.ts                      # Remotion entry point
├── scripts/
│   ├── render.ps1 / render.sh        # Video rendering wrapper
│   ├── preview.ps1 / preview.sh      # Remotion Studio preview server
│   ├── probe.ps1 / probe.sh          # Media stream analysis wrapper
│   ├── tts.ps1 / tts.sh              # Kokoro neural TTS synthesis wrapper
│   └── generate_neural_tts.py        # Cross-platform PyTorch/MLX voice generator
├── public/
│   └── audio/                        # Synchronized narration WAVs and sound effects
├── output/                           # Rendered MP4s, test audio, and QA contact sheets
├── .venv/                            # Local Python 3.10+ virtual environment (CUDA)
├── node_modules/                     # Local npm dependencies
├── AGENT_COMMAND_AUTHORIZATION.md    # Standing authorization policy
├── AGENTS.md                         # This onboarding guide
└── package.json
```

---

## 4. The Six Workspace-Local Agent Skills

Always utilize the specialized skills in `.agents/skills/`:
1. **`remotion-video`**: Composition design, frame rate timing, sequence choreography, CLI rendering flags.
2. **`react-motion-graphics`**: Interpolation formulas, `spring()` physics, deterministic frame functions.
3. **`svg-animation`**: Vector mathematics, procedural paths, lighting shaders, relativistic grids.
4. **`ffmpeg-audio-video`**: Audio filter graphs, volume normalization, stream mapping, lossless clipping.
5. **`video-qa`**: Black frame detection (`blackdetect`), audio peak inspection (`volumedetect`), YouTube Shorts safe margins.
6. **`neural-narration`**: Kokoro-82M voice profiles (`am_adam`, `af_heart`), speech speed tuning, and forced alignment.

---

## 5. End-to-End Production Workflow

Every video production moves through an 11-step pipeline:
1. **Concept**: Define the thesis, target audience, and retention hook.
2. **Research**: Gather verified facts and formulas.
3. **Script**: Draft punchy narration timed for natural cadence.
4. **Storyboard**: Define scene beats, visual transitions, and frame budgets.
5. **Asset Creation**: Build reusable SVG components in `src/components/`.
6. **Narration**: Synthesize speech using local Kokoro CUDA (`scripts/tts.ps1`).
7. **Animation**: Assemble scenes in `src/scenes/` using deterministic frame functions.
8. **Audio Mixing**: Balance voiceover, music, and SFX to -14 LUFS standard.
9. **Rendering**: Render frames with Remotion CLI (`scripts/render.ps1`).
10. **Quality Assurance**: Automated black frame detection and volume inspection.
11. **Final Export**: Verified master MP4 archived in `output/`.

---

## 6. Standard Development & Testing Commands

When modifying code or creating new productions:

1. **Static Typecheck**:
   ```powershell
   npx tsc --noEmit
   ```
2. **Synthesize Neural Narration** (on NVIDIA RTX 4070):
   ```powershell
   .\scripts\tts.ps1 -Voice "am_adam" -Speed 1.05 -Text "Your narration text here" -Output "public\audio\new_clip.wav"
   ```
3. **Smoke Test Render**:
   ```powershell
   .\scripts\render.ps1 -Composition "SunAnimation" -Output "output\smoke_test.mp4"
   ```
4. **Production Video Render**:
   ```powershell
   .\scripts\render.ps1 -Composition "SunDisappearsShort" -Output "output\sun-disappears-final.mp4"
   ```
5. **Automated QA Validation**:
   ```powershell
   ffmpeg -i output\sun-disappears-final.mp4 -af "volumedetect" -f null -
   ffmpeg -i output\sun-disappears-final.mp4 -vf "blackdetect=d=0.2:pix_th=0.10" -an -f null -
   ffmpeg -y -i output\sun-disappears-final.mp4 -vf "fps=1/5,scale=270:480,tile=3x2" -frames:v 1 output\contact_sheet.png
   ```
6. **Local Git Commit**:
   ```powershell
   git add <modified-source-files>
   git commit -m "Clear description of tested changes"
   ```

---

## 7. Project Authorization Boundaries & Git Safety Rules

Agents must strictly observe:
- **Project Isolation**: All operations must remain strictly inside the project root (`C:\Dev\science-video-lab` / future `C:\Dev\motion-graphics-studio`).
- **Standing Authorization**: Non-destructive diagnostic, compilation, testing, rendering, and local Git commits are preauthorized as detailed in `AGENT_COMMAND_AUTHORIZATION.md`.
- **Approval Gates**:
  - ❌ **Never execute `git push`** to remote GitHub without explicit user approval.
  - ❌ **Never execute destructive Git commands** (`git reset --hard`, `git clean -fdx`, `git rebase -i`).
  - ❌ **Never modify system settings** or request administrator elevation (`RunAs` / `sudo`).
  - ❌ **Never invoke external paid APIs** or third-party cloud speech services.
  - ❌ **Never access files outside the workspace root**.
- **Production Scope**: Do not initiate rendering of the extended 2-3 minute Phase 4 documentary until explicitly directed.
