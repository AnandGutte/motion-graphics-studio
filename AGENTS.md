# AGENTS.md — Science Video Lab Development Guide

Welcome to **Science Video Lab**. This file is the primary developer and agent onboarding guide for all Antigravity coding sessions working in this repository.

> **Important Security & Scope Notice**:  
> Standing authorization in this repository applies strictly to routine, non-destructive development tasks within `C:\Dev\science-video-lab`. This document does **not** override Antigravity's actual security boundaries, tool approval dialogues, or operating system access controls.

---

## 1. Project Overview

**Science Video Lab** is a high-performance, automated animation lab that generates science documentaries and educational YouTube Shorts using:
- **React 18 & Remotion** (`v4.0.542`): Programmatic SVG animation, spring physics, and canvas rendering.
- **TypeScript**: Strictly typed mathematical coordinates, timing frames, and props.
- **Kokoro Neural TTS (82M)**: Local, on-device neural voice narration via PyTorch with NVIDIA CUDA acceleration on Windows and MLX on macOS.
- **FFmpeg & FFprobe**: Broadcast-quality audio mixing, loudness normalization (-14 LUFS), and video encoding (H.264 / AAC).

---

## 2. Key Documentation References

Before performing operations, consult the following project documentation:
- 📜 [`AGENT_COMMAND_AUTHORIZATION.md`](file:///C:/Dev/science-video-lab/AGENT_COMMAND_AUTHORIZATION.md): Formal policy on preauthorized routine commands, conditional commands, and actions requiring explicit approval.
- 📋 [`docs/COMMAND_INVENTORY.md`](file:///C:/Dev/science-video-lab/docs/COMMAND_INVENTORY.md): Comprehensive inventory of 20 tested and planned development workflows on Windows 11.
- ⚙️ [`docs/WINDOWS_SETUP.md`](file:///C:/Dev/science-video-lab/docs/WINDOWS_SETUP.md): Hardware specifications, environment setup, and driver requirements.
- 🎬 [`docs/PHASE4_PRODUCTION_PLAN.md`](file:///C:/Dev/science-video-lab/docs/PHASE4_PRODUCTION_PLAN.md): Production blueprint and narration script for the upcoming 2-3 minute documentary.
- 📊 [`docs/WINDOWS_INITIALIZATION_REPORT.md`](file:///C:/Dev/science-video-lab/docs/WINDOWS_INITIALIZATION_REPORT.md): Initial audit, benchmark numbers, and validation results.

---

## 3. Repository Architecture

```
science-video-lab/
├── .agents/
│   └── skills/                       # 6 Workspace-local Antigravity skills
│       ├── remotion-video/           # Remotion CLI, compositions, and rendering
│       ├── react-motion-graphics/    # Spring physics, deterministic animation
│       ├── svg-animation/            # Procedural SVGs, gradients, coronal glows
│       ├── ffmpeg-audio-video/       # FFmpeg/ffprobe inspection & normalization
│       ├── video-qa/                 # YouTube Shorts QA spec validation
│       └── neural-narration/         # On-device Kokoro neural TTS pipeline
├── src/
│   ├── components/                   # Vector graphic components (CartoonSun, CartoonEarth, etc.)
│   ├── scenes/                       # Scene components (SunScene, EarthScene, etc.)
│   ├── compositions/                 # Master compositions (MainShort.tsx)
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

Always check and utilize the specialized skills in `.agents/skills/`:
1. **`remotion-video`**: Composition design, frame rate timing, sequence choreography, CLI rendering flags.
2. **`react-motion-graphics`**: Interpolation formulas, `spring()` physics, deterministic frame functions.
3. **`svg-animation`**: Vector mathematics, procedural paths, lighting shaders, relativistic grids.
4. **`ffmpeg-audio-video`**: Audio filter graphs, volume normalization, stream mapping, lossless clipping.
5. **`video-qa`**: Black frame detection (`blackdetect`), audio peak inspection (`volumedetect`), YouTube Shorts safe margins.
6. **`neural-narration`**: Kokoro-82M voice profiles (`am_adam`, `af_heart`), speech speed tuning, and forced alignment.

---

## 5. Standard Development Workflow

When modifying code or creating new scenes:
1. **Develop Scene**: Implement or edit components in `src/components/` and scenes in `src/scenes/`.
2. **Typecheck**: Verify TypeScript static typing passes without errors:
   ```powershell
   npx tsc --noEmit
   ```
3. **Generate Voiceover**: If new narration is needed, synthesize with project-local Kokoro TTS:
   ```powershell
   .\scripts\tts.ps1 -Voice "am_adam" -Speed 1.05 -Text "Your narration text here" -Output "public\audio\new_clip.wav"
   ```
4. **Smoke Test Render**: Run a quick low-frame render to confirm visual integrity:
   ```powershell
   .\scripts\render.ps1 -Composition "SunAnimation" -Output "output\smoke_test.mp4"
   ```
5. **Production Render**: Render the target composition:
   ```powershell
   .\scripts\render.ps1 -Composition "SunDisappearsShort" -Output "output\sun-disappears-final.mp4"
   ```
6. **Automated QA Validation**: Verify zero black frames, correct audio loudness, and inspect contact sheet:
   ```powershell
   ffmpeg -i output\sun-disappears-final.mp4 -af "volumedetect" -f null -
   ffmpeg -i output\sun-disappears-final.mp4 -vf "blackdetect=d=0.2:pix_th=0.10" -an -f null -
   ffmpeg -y -i output\sun-disappears-final.mp4 -vf "fps=1/5,scale=270:480,tile=3x2" -frames:v 1 output\contact_sheet.png
   ```
7. **Commit Verified Changes Locally**:
   ```powershell
   git add <modified-source-files>
   git commit -m "Clear description of tested changes"
   ```

---

## 6. Project Authorization Boundaries

Agents must strictly observe:
- **Project Isolation**: All reads, writes, and process launches are confined to `C:\Dev\science-video-lab`.
- **Local Commits Permitted**: Staging and committing tested code to the local Git repository is preauthorized.
- **Explicit Approval Gates**:
  - ❌ Never execute `git push` to remote GitHub without explicit human approval.
  - ❌ Never execute destructive operations like `git reset --hard` or `git clean -fdx`.
  - ❌ Never modify system settings or invoke administrator elevation (`sudo` / `RunAs`).
  - ❌ Never invoke external paid APIs or cloud speech services.
  - ❌ Never access unrelated user files or private folders outside `C:\Dev\science-video-lab`.
- **Phase 4 Documentary Execution**: Do not begin rendering full-scale Phase 4 documentary production until explicitly directed.
