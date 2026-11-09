# Motion Graphics Studio — Technical Command Inventory

> **Platform**: Windows 11 Home/Pro (x64), NVIDIA GeForce RTX 4070 (8 GB VRAM)  
> **Workspace**: `C:\Dev\science-video-lab` (Planned folder migration: `C:\Dev\motion-graphics-studio`)  
> **Remote Repository**: `AnandGutte/science-video-lab` (Planned rename: `AnandGutte/motion-graphics-studio`)  
> **Classification Legend**:
> - ✅ **Tested on Windows**: Executed and verified directly on this Windows 11 RTX 4070 machine.
> - 📋 **Documented / Planned**: Standard operational command prepared for future workflows.
> - 🟢 **Preauthorized**: Routine development, non-destructive, safe to run autonomously.
> - 🟡 **Conditional**: Moderate impact, requires careful technical review.
> - 🔴 **Explicit Approval Required**: High risk, network push, or destructive action.

---

## 1. Initial Windows Setup

### 1.1 Clone Repository
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  git clone https://github.com/AnandGutte/science-video-lab.git C:\Dev\science-video-lab
  ```
- **Explanation**: Clones the complete project into the authorized local root.
- **Prerequisites**: Git for Windows installed.
- **Expected Output**: `Cloning into 'C:\Dev\science-video-lab'... done.`
- **Side Effects**: Creates `C:\Dev\science-video-lab` directory.

### 1.2 Verify Tooling via Winget
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  Get-Command git, node, npm, python, ffmpeg, ffprobe, nvidia-smi | Select-Object Name, Source
  ```
- **Explanation**: Confirms required CLI tools are resolved in PATH.
- **Prerequisites**: System PATH configured.
- **Expected Output**: Table of executable names and resolved absolute file paths.
- **Side Effects**: None (read-only).

---

## 2. Environment Diagnostics

### 2.1 Full Runtime Version Audit
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  $PSVersionTable.PSVersion; node -v; npm -v; python --version; git --version
  ```
- **Explanation**: Reports PowerShell, Node.js, npm, Python, and Git versions in a single check.
- **Prerequisites**: None.
- **Expected Output**: PS 5.1/7+, Node v20+, npm 10+, Python 3.10+, Git 2.47+.
- **Side Effects**: None.

### 2.2 System Information & Hardware Inspection
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  Get-CimInstance Win32_ComputerSystem | Select-Object Model, TotalPhysicalMemory
  Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors
  ```
- **Explanation**: Inspects physical CPU cores and total RAM.
- **Prerequisites**: Windows PowerShell.
- **Expected Output**: Alienware m16 R2, Intel Core Ultra 9, 32 GB RAM.
- **Side Effects**: None.

---

## 3. Dependency Installation and Updates

### 3.1 Clean NPM Installation
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  npm ci
  ```
- **Explanation**: Installs exact locked dependencies into `node_modules/` based on `package-lock.json`.
- **Prerequisites**: Node.js and npm installed; clean working directory.
- **Expected Output**: `added 247 packages in Xs`.
- **Side Effects**: Populates `node_modules/`.

### 3.2 Add Production Package
- **Status**: 📋 Planned | 🟡 Conditional
- **Command**:
  ```powershell
  npm install <package-name>
  ```
- **Explanation**: Adds a new JavaScript runtime package.
- **Prerequisites**: Approval for new dependency.
- **Expected Output**: Updated `package.json` and `package-lock.json`.
- **Side Effects**: Modifies manifests and `node_modules/`.

---

## 4. Python Virtual Environments

### 4.1 Create Project Virtual Environment
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  python -m venv C:\Dev\science-video-lab\.venv
  ```
- **Explanation**: Creates an isolated Python virtual environment inside the workspace.
- **Prerequisites**: Python 3.10+ installed.
- **Expected Output**: Creates `.venv\` with Scripts and site-packages.
- **Side Effects**: Writes ~30 MB to `.venv\`.

### 4.2 Upgrade Local Pip
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  & .\.venv\Scripts\python.exe -m pip install --upgrade pip
  ```
- **Explanation**: Updates pip to latest stable release within `.venv`.
- **Prerequisites**: `.venv` created.
- **Expected Output**: `Successfully installed pip-26.x`.
- **Side Effects**: Updates pip in `.venv`.

---

## 5. GPU & CUDA Diagnostics

### 5.1 Query NVIDIA GPU Status
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  nvidia-smi
  ```
- **Explanation**: Displays NVIDIA GPU name, driver version, CUDA UMD version, VRAM allocation, and active processes.
- **Prerequisites**: NVIDIA driver installed.
- **Expected Output**: `NVIDIA GeForce RTX 4070 Laptop GPU`, Driver 610.88, CUDA 13.3 support.
- **Side Effects**: None.

### 5.2 Validate PyTorch CUDA Acceleration
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  & .\.venv\Scripts\python.exe -c "import torch; print('CUDA Available:', torch.cuda.is_available()); print('Device:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'CPU'); print('VRAM (GB):', round(torch.cuda.get_device_properties(0).total_memory / 1e9, 2))"
  ```
- **Explanation**: Verifies PyTorch can access RTX 4070 via CUDA runtime.
- **Prerequisites**: PyTorch with CUDA installed in `.venv`.
- **Expected Output**: `CUDA Available: True`, `Device: NVIDIA GeForce RTX 4070 Laptop GPU`, `VRAM (GB): 8.59`.
- **Side Effects**: None.

---

## 6. Local Neural Narration Generation

### 6.1 Install Kokoro and Audio Libraries
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  & .\.venv\Scripts\python.exe -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
  & .\.venv\Scripts\python.exe -m pip install kokoro soundfile misaki
  ```
- **Explanation**: Installs CUDA-accelerated PyTorch and Kokoro neural speech synthesis engine.
- **Prerequisites**: `.venv` active.
- **Expected Output**: Successful package installations.
- **Side Effects**: Installs packages in `.venv\Lib\site-packages`.

### 6.2 Synthesize Voice Clip with CUDA
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  .\scripts\tts.ps1 -Voice "am_adam" -Speed 1.05 -Text "What if the Sun vanished? Let us test neural audio on Windows." -Output "output\windows_test.wav"
  ```
- **Explanation**: Synthesizes neural voiceover using RTX 4070 GPU.
- **Prerequisites**: PyTorch and Kokoro installed; model weights downloaded.
- **Expected Output**: `[Windows PyTorch] Initializing Kokoro pipeline on device=cuda... Generated audio successfully`.
- **Side Effects**: Writes 24 kHz WAV file to `output\`.

---

## 7. Remotion Development & Preview

### 7.1 Discover Available Compositions
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  npx remotion compositions src/index.ts
  ```
- **Explanation**: Bundles React code and outputs registered composition IDs, dimensions, frame rates, and durations.
- **Prerequisites**: Dependencies installed via `npm ci`.
- **Expected Output**: Compositions table listing `SunDisappearsShort` (900 frames, 30s) and `SunAnimation` (90 frames, 3s).
- **Side Effects**: Caches bundle in `node_modules/.cache`.

### 7.2 Launch Remotion Studio Preview
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  .\scripts\preview.ps1
  ```
- **Explanation**: Launches interactive web GUI at `http://localhost:3000` with timeline scrubber and live visual canvas.
- **Prerequisites**: Chrome Headless Shell installed.
- **Expected Output**: Remotion Studio running on port 3000.
- **Side Effects**: Spawns local HTTP server.

---

## 8. Full Video Rendering

### 8.1 3-Second Smoke Test Render
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  .\scripts\render.ps1 -Composition "SunAnimation" -Output "output\sun-animation-smoke.mp4"
  ```
- **Explanation**: Renders 90 frames of vector animation to verify pipeline end-to-end in < 10 seconds.
- **Prerequisites**: npm dependencies installed.
- **Expected Output**: `Render completed successfully: output\sun-animation-smoke.mp4`.
- **Side Effects**: Generates ~840 kB MP4 file.

### 8.2 Full 30-Second Production Render
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  .\scripts\render.ps1 -Composition "SunDisappearsShort" -Output "output\sun-disappears-final.mp4"
  ```
- **Explanation**: Renders all 6 scenes (900 frames, 1080x1920 @ 30fps) with multi-track narration, sound effects, and captions.
- **Prerequisites**: All audio assets present in `public/audio/`.
- **Expected Output**: `Render completed successfully: output\sun-disappears-final.mp4` (~9.0 MB).
- **Side Effects**: Generates production MP4.

---

## 9. FFmpeg Video Processing

### 9.1 Inspect Media Format & Stream Details
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  ffprobe -v error -show_format -show_streams output\sun-disappears-final.mp4
  ```
- **Explanation**: Dumps container format and codec details (H.264, AAC, resolution, bitrate).
- **Prerequisites**: FFmpeg installed.
- **Expected Output**: Structured stream entries for Video (H.264 High 1080x1920) and Audio (AAC 48kHz stereo).
- **Side Effects**: None.

### 9.2 Extract Audio Track from Video
- **Status**: 📋 Planned | 🟢 Preauthorized
- **Command**:
  ```powershell
  ffmpeg -y -i output\sun-disappears-final.mp4 -vn -c:a pcm_s16le output\extracted_audio.wav
  ```
- **Explanation**: Extracts mixed master audio for external audio inspection.
- **Prerequisites**: Rendered MP4 exists.
- **Expected Output**: Lossless WAV audio file.
- **Side Effects**: Creates `output\extracted_audio.wav`.

---

## 10. Audio Mixing & Loudness Normalization

### 10.1 Measure Integrated Loudness (LUFS / True Peak)
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  ffmpeg -i output\sun-disappears-final.mp4 -af "ebur128=framelog=verbose" -f null -
  ```
- **Explanation**: Measures EBU R128 integrated loudness, loudness range (LRA), and true peak dBTP.
- **Prerequisites**: Rendered MP4.
- **Expected Output**: Target `-14 LUFS` for YouTube Shorts compliance.
- **Side Effects**: None.

### 10.2 Normalize Audio to YouTube Standard (-14 LUFS)
- **Status**: 📋 Planned | 🟢 Preauthorized
- **Command**:
  ```powershell
  ffmpeg -y -i input.wav -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a pcm_s16le normalized.wav
  ```
- **Explanation**: Applies broadcast-grade two-pass loudness normalization.
- **Prerequisites**: Input audio WAV.
- **Expected Output**: Normalized audio conforming to `-14 LUFS` and `-1.5 dBTP`.
- **Side Effects**: Writes normalized audio file.

---

## 11. Subtitle Generation & Validation

### 11.1 Verify Captions In Remotion
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  npx tsc --noEmit
  ```
- **Explanation**: Ensures caption timing pills and styled typography components pass TypeScript checks.
- **Prerequisites**: `src/components/Captions.tsx`.
- **Expected Output**: Clean exit (code 0).
- **Side Effects**: None.

### 11.2 Generate SRT Subtitle Track (Planned)
- **Status**: 📋 Planned | 🟢 Preauthorized
- **Command**:
  ```powershell
  & .\.venv\Scripts\python.exe scripts\generate_subtitles.py --input output\sun-disappears-final.mp4 --output output\captions.srt
  ```
- **Explanation**: Extracts word-level timestamps from voiceover for standalone caption upload.
- **Prerequisites**: Whisper or Misaki forced aligner.
- **Expected Output**: Valid `.srt` file.
- **Side Effects**: Writes subtitle file to `output\`.

---

## 12. Thumbnail & Contact Sheet Generation

### 12.1 Extract High-Resolution Thumbnail Frame
- **Status**: 📋 Planned | 🟢 Preauthorized
- **Command**:
  ```powershell
  ffmpeg -y -ss 00:00:08.500 -i output\sun-disappears-final.mp4 -vframes 1 -q:v 2 output\thumbnail.png
  ```
- **Explanation**: Captures representative frame at 8.5 seconds (Earth in darkness).
- **Prerequisites**: Rendered MP4.
- **Expected Output**: 1080x1920 crisp PNG image.
- **Side Effects**: Writes `output\thumbnail.png`.

### 12.2 Generate 3x2 Visual Contact Sheet
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  ffmpeg -y -i output\sun-disappears-final.mp4 -vf "fps=1/5,scale=270:480,tile=3x2" -frames:v 1 output\contact_sheet.png
  ```
- **Explanation**: Samples frames at 5-second intervals and arranges them into a 3x2 mosaic grid for visual review.
- **Prerequisites**: Rendered MP4.
- **Expected Output**: 810x960 PNG showing all 6 scene progressions.
- **Side Effects**: Writes `output\contact_sheet.png` (~226 kB).

---

## 13. Video QA and Validation

### 13.1 Black Frame Interval Detection
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  ffmpeg -i output\sun-disappears-final.mp4 -vf "blackdetect=d=0.2:pix_th=0.10" -an -f null -
  ```
- **Explanation**: Scans video for unintentional black screens lasting longer than 0.2 seconds.
- **Prerequisites**: Rendered MP4.
- **Expected Output**: Zero black interval timestamps.
- **Side Effects**: None.

### 13.2 Audio Volume & Peak Inspection
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  ffmpeg -i output\sun-disappears-final.mp4 -af "volumedetect" -f null -
  ```
- **Explanation**: Computes mean volume, max volume peak, and volume distribution histogram.
- **Prerequisites**: Rendered MP4.
- **Expected Output**: `mean_volume: ~ -19.4 dB`, `max_volume: -3.0 dB` (healthy headroom, zero clipping).
- **Side Effects**: None.

---

## 14. Git Version Control

### 14.1 Status & Branch Review
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  git status; git log -3 --oneline
  ```
- **Explanation**: Checks working tree cleanliness and recent commit history.
- **Prerequisites**: Git installed.
- **Expected Output**: Clean working tree or modified files list.
- **Side Effects**: None.

### 14.2 Local Commit of Verified Changes
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  git add AGENT_COMMAND_AUTHORIZATION.md docs/COMMAND_INVENTORY.md AGENTS.md docs/WINDOWS_INITIALIZATION_REPORT.md
  git commit -m "Initialize Windows 11 RTX 4070 pipeline and establish standing command authorization"
  ```
- **Explanation**: Commits tested documentation and configuration locally.
- **Prerequisites**: Verified tests.
- **Expected Output**: `[branch <hash>] Commit message`.
- **Side Effects**: Updates local Git branch.

---

## 15. Local Branching & Integration

### 15.1 Create Feature Branch
- **Status**: 📋 Planned | 🟢 Preauthorized
- **Command**:
  ```powershell
  git checkout -b feature/phase4-scene-development
  ```
- **Explanation**: Creates and switches to a dedicated feature branch.
- **Prerequisites**: Clean working tree.
- **Expected Output**: `Switched to a new branch 'feature/...'`.
- **Side Effects**: Updates `HEAD`.

### 15.2 Merge Local Branch
- **Status**: 📋 Planned | 🟡 Conditional
- **Command**:
  ```powershell
  git checkout main; git merge --no-ff feature/phase4-scene-development
  ```
- **Explanation**: Merges completed feature into local main.
- **Prerequisites**: All tests passing on feature branch.
- **Expected Output**: Clean merge commit.
- **Side Effects**: Modifies local `main`.

---

## 16. Remote GitHub Synchronization

### 16.1 Push Local Branch to GitHub
- **Status**: 📋 Planned | 🔴 Explicit Approval Required
- **Command**:
  ```powershell
  git push origin main
  ```
- **Explanation**: Uploads local commits to remote repository `AnandGutte/science-video-lab` (or `AnandGutte/motion-graphics-studio` following approved remote rename).
- **Prerequisites**: Explicit human approval; valid credentials.
- **Expected Output**: `To https://github.com/AnandGutte/science-video-lab.git` (or updated remote URL).
- **Side Effects**: Updates remote repository.

---

## 17. Project Cleanup & Cache Management

### 17.1 Clean Video Output Artifacts
- **Status**: 📋 Planned | 🟢 Preauthorized
- **Command**:
  ```powershell
  Remove-Item -Path "output\*.mp4", "output\*.png" -Force -ErrorAction SilentlyContinue
  ```
- **Explanation**: Deletes intermediate or test render files to reclaim disk space.
- **Prerequisites**: Confirm rendered files are no longer needed.
- **Expected Output**: Deletes files inside `output\`.
- **Side Effects**: Deletes files.

### 17.2 Clean Remotion & Puppeteer Caches
- **Status**: 📋 Planned | 🟢 Preauthorized
- **Command**:
  ```powershell
  Remove-Item -Recurse -Force -Path ".cache\remotion", ".cache\puppeteer", ".tmp\*" -ErrorAction SilentlyContinue
  ```
- **Explanation**: Purges temporary webpack and browser cache directories.
- **Prerequisites**: Studio servers stopped.
- **Expected Output**: Empties temporary folders.
- **Side Effects**: Reclaims ~200 MB disk space.

---

## 18. Model Downloads & Cache Management

### 18.1 Verify Hugging Face Cache Contents
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  Get-ChildItem -Path ".cache\huggingface\hub" -Recurse -File | Select-Object Name, Length
  ```
- **Explanation**: Inspects downloaded Kokoro neural TTS model weights.
- **Prerequisites**: TTS script executed at least once.
- **Expected Output**: Model shards (`kokoro-v0_19.onnx` or PyTorch weights).
- **Side Effects**: None.

---

## 19. Troubleshooting

### 19.1 Terminate Dangling Chrome or Node Processes
- **Status**: ✅ Tested on Windows | 🟢 Preauthorized
- **Command**:
  ```powershell
  Get-Process -Name "chrome-headless-shell", "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*remotion*" } | Stop-Process -Force
  ```
- **Explanation**: Cleans up abandoned headless browser instances if a render is interrupted.
- **Prerequisites**: Dangling processes identified.
- **Expected Output**: Stops matching processes.
- **Side Effects**: Releases memory and locks.

### 19.2 Reset Virtual Environment
- **Status**: 📋 Planned | 🟡 Conditional
- **Command**:
  ```powershell
  Remove-Item -Recurse -Force .venv
  python -m venv .venv
  ```
- **Explanation**: Re-creates Python virtual environment if packages become corrupted.
- **Prerequisites**: Approval to reinstall dependencies.
- **Expected Output**: Fresh clean `.venv`.
- **Side Effects**: Requires reinstalling PyTorch and Kokoro.

---

## 20. Future Phase 4 Production

### 20.1 Multi-Scene Modular Render
- **Status**: 📋 Planned | 🟢 Preauthorized (When Phase 4 Starts)
- **Command**:
  ```powershell
  .\scripts\render.ps1 -Composition "DocumentaryMaster" -Output "output\sun-disappears-documentary.mp4"
  ```
- **Explanation**: Renders the complete 2-3 minute widescreen (1920x1080) science documentary.
- **Prerequisites**: Phase 4 scenes, narration tracks, and compositions assembled.
- **Expected Output**: Multi-minute 4K/1080p documentary video.
- **Side Effects**: Generates large production video (~100-300 MB).

### 20.2 Batch Neural Voice Generation for Phase 4 Scenes
- **Status**: 📋 Planned | 🟢 Preauthorized (When Phase 4 Starts)
- **Command**:
  ```powershell
  & .\.venv\Scripts\python.exe scripts\batch_tts.py --manifest docs\narration_manifest.json --outdir public\audio\phase4\
  ```
- **Explanation**: Generates all documentary scene narrations in a single batch using CUDA acceleration.
- **Prerequisites**: Narration script finalized in `docs/PHASE4_PRODUCTION_PLAN.md`.
- **Expected Output**: Sequential scene WAV files in `public\audio\phase4\`.
- **Side Effects**: Writes multiple audio files.
