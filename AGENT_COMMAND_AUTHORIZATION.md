# Motion Graphics Studio — Agent Command Authorization Policy

> **Status**: Active & Enforced  
> **Workspace Root**: `C:\Dev\science-video-lab` (Planned folder migration: `C:\Dev\motion-graphics-studio`)  
> **Target Platform**: Windows 11 Home/Pro (x64) with NVIDIA GeForce RTX 4070 (8 GB VRAM)  
> **Primary Shell**: Windows PowerShell 5.1 / PowerShell 7+  
> **Antigravity Policy Compliance**: This document defines project-level authorization boundaries. It operates strictly within Antigravity's system security model and cannot override tool permissions, operating-system security boundaries, or sandbox approval mechanisms.

---

## 1. Project Scope & Execution Context

### 1.1 Authorized Workspace Root
All project actions, file modifications, executions, and runtime artifacts must remain strictly anchored within:
```
C:\Dev\science-video-lab
```
*(Following user-approved directory migration, this boundary will shift to `C:\Dev\motion-graphics-studio`)*

### 1.2 Approved Tools & Runtimes
Agents operating in this repository are authorized to invoke:
- **Node.js & npm / npx**: `v20.x` or `v22.x` (LTS runtimes).
- **Python**: Project-local virtual environment at `.venv\Scripts\python.exe` (Python 3.10+).
- **PyTorch & CUDA**: PyTorch 2.6+ with CUDA 12.4 acceleration on NVIDIA RTX 4070.
- **Kokoro Neural TTS**: On-device Python pipeline (`scripts/generate_neural_tts.py`, `scripts/tts.ps1`).
- **Remotion CLI & Studio**: `@remotion/cli` (v4.x) and Chrome Headless Shell (win64).
- **FFmpeg & FFprobe**: WinGet-installed or local binaries (`ffmpeg.exe`, `ffprobe.exe`).
- **Git**: Local Git operations inside the repository working tree.
- **PowerShell**: Automation and pipeline scripts (`scripts/*.ps1`).

### 1.3 Filesystem Boundaries
- **Permitted Write Targets**:
  - `src/` (components, scenes, compositions, utilities).
  - `public/` (audio assets, SVGs, static media).
  - `scripts/` (PowerShell and Python utilities).
  - `docs/` (technical documentation, reports, specifications).
  - `output/` (video renders, audio clips, thumbnails, contact sheets).
  - `.venv/` (project-local Python virtual environment).
  - `node_modules/` (project-local npm dependencies).
  - `.cache/` (project-local Hugging Face weights, Puppeteer, and Remotion caches).
  - `.tmp/` (project-local scratch space).
  - Root configuration files (`package.json`, `tsconfig.json`, `remotion.config.ts`, `AGENTS.md`, `README.md`).
- **Forbidden Write Targets**:
  - Any directory outside `C:\Dev\science-video-lab` (e.g., `C:\Windows`, `C:\Program Files`, personal user folders, Dropbox, external drives).

### 1.4 Git & Remote Boundaries
- **Authorized Locally**: Creating branches, staging files, checking diffs, inspecting logs, and creating clean local commits.
- **Forbidden Remotely**: `git push`, `git push --force`, `git pull --rebase` to non-tracked remotes, merging pull requests on GitHub, or changing remote repository URLs without explicit user instruction.

### 1.5 Network & Download Boundaries
- **Permitted Network Destinations**:
  - Official npm registry (`registry.npmjs.org`) for lockfile-compliant dependencies.
  - Official PyTorch wheel servers (`download.pytorch.org`) for CUDA wheels.
  - Official Hugging Face model repository (`hexgrad/Kokoro-82M`) for neural voice weights (~350 MB).
  - Remotion media CDN (`remotion.media` / `www.remotion.dev`) for Chrome Headless Shell binaries.
- **Forbidden Network Destinations**:
  - Paid API services (OpenAI, Anthropic, ElevenLabs, Runway, etc.).
  - Untrusted third-party script downloaders or unverified package mirrors.

---

## 2. Preauthorized Routine Operations

The developer has granted standing authorization for routine, non-destructive development, testing, and rendering operations. Agents may perform these autonomously without seeking repeated approval:

| Category | Description | Preauthorized Command Patterns |
| :--- | :--- | :--- |
| **Environment Diagnostics** | Check system health, GPU, tool versions | `nvidia-smi`, `node --version`, `python --version`, `git --version`, `ffprobe -version` |
| **Git Local Inspection** | Review status, commits, and diffs | `git status`, `git log -n ...`, `git diff`, `git branch` |
| **Local Git Commits** | Commit tested code & documentation | `git add <files>`, `git commit -m "..."` |
| **Node.js Dependencies** | Install reproducible npm packages | `npm ci`, `npm ls` |
| **TypeScript Validation** | Static typechecking without emit | `npx tsc --noEmit` |
| **Remotion Discovery** | List compositions and duration | `npx remotion compositions src/index.ts` |
| **Video Rendering** | Render test and production compositions | `.\scripts\render.ps1 -Composition ... -Output ...` |
| **Remotion Studio** | Launch local preview server | `.\scripts\preview.ps1`, `npx remotion preview src/index.ts` |
| **Python Environment** | Manage and run virtual environment | `python -m venv .venv`, `.\.venv\Scripts\python.exe ...` |
| **PyTorch & CUDA Testing** | Validate GPU availability and memory | `.\.venv\Scripts\python.exe -c "import torch; print(torch.cuda.is_available())"` |
| **Neural TTS Generation** | Generate voiceover audio | `.\scripts\tts.ps1 -Voice ... -Text ... -Output ...` |
| **FFmpeg QA & Probing** | Inspect codecs, detect silence/black frames | `.\scripts\probe.ps1 ...`, `ffmpeg -i ... -af volumedetect -f null -` |
| **Contact Sheet Generation** | Generate visual QA grid tiles | `ffmpeg -y -i ... -vf "fps=...,scale=...,tile=..." -frames:v 1 ...` |
| **Output Maintenance** | Clean old renders within `output/` | `Remove-Item output\*.mp4 -Force` |

---

## 3. Conditional Operations (Require Review & Justification)

The following operations carry moderate impact. Agents must document the technical need, verify compatibility, and ensure reversibility before execution:

1. **Adding New npm Packages**:
   - `npm install <package>`: Allowed only when required for vector animation, math, or audio processing. Lockfile must be updated cleanly.
2. **Adding New Python Packages**:
   - `pip install <package>`: Must be installed strictly inside `.venv`. Must not conflict with PyTorch CUDA wheels.
3. **Downloading Large Models (> 500 MB)**:
   - Must verify disk space and project-local cache path (`.cache/`).
4. **Deleting or Reorganizing Source Code in `src/`**:
   - Must run `git diff` and verify TypeScript compilation passes immediately after.
5. **Switching Local Git Branches**:
   - Allowed only when the working tree is clean or changes are properly committed/stashed.

---

## 4. Operations Requiring Explicit User Approval

Agents must **halt and request explicit human approval** before executing any of the following:

- ❌ **Destructive Git Actions**: `git reset --hard`, `git clean -fdx`, `git rebase -i`, deleting branches with unmerged work.
- ❌ **Remote Repository Synchronization**: `git push`, `git push --tags`, creating or merging GitHub PRs.
- ❌ **Administrator Elevation**: `Start-Process -Verb RunAs`, modifying UAC, changing Windows registry, or altering system security settings.
- ❌ **Global System Modifications**: Installing software globally, modifying system-wide `PATH` or environment variables outside the current process.
- ❌ **Filesystem Actions Outside Workspace**: Reading, moving, or deleting files in `C:\Users\anand\Documents`, desktop, other repositories, or system folders.
- ❌ **Paid API Usage**: Invoking any cloud service that incurs financial billing.
- ❌ **Credential Exposure**: Reading, storing, printing, or transmitting SSH keys, tokens, `.env` files, or passwords.
- ❌ **Phase 4 Documentary Production Execution**: Initiating full multi-minute Phase 4 production rendering before Phase 4 authorization is given.

---

## 5. Denied Operations (Strict Prohibition)

The following actions are strictly forbidden at all times under any circumstance:
1. Bypassing or disabling Antigravity security sandboxes or command approval dialogs without legitimate operational need.
2. Accessing personal files, ASI documents, private documents, or unrelated workspaces.
3. Running obfuscated, encoded, or encrypted PowerShell commands (`-EncodedCommand`).
4. Downloading or executing arbitrary binaries from untrusted sources.
5. Disabling antivirus, Windows Defender, or firewall protections.

---

## 6. Command Reference Matrix for Windows PowerShell

| Command | Purpose | Side Effects | Affected Paths | Network Req? | Risk Level | Classification |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| `nvidia-smi` | Check GPU driver, VRAM, and CUDA version | Read-only | None | No | Low | **Preauthorized** |
| `git status` | Check working tree state | Read-only | None | No | Low | **Preauthorized** |
| `git diff` | Review unstaged changes | Read-only | None | No | Low | **Preauthorized** |
| `git add <files>` | Stage verified changes | Stages files | `.git/index` | No | Low | **Preauthorized** |
| `git commit -m "..."` | Commit local changes | Creates Git commit | `.git/` | No | Low | **Preauthorized** |
| `npm ci` | Install lockfile packages | Installs JS deps | `node_modules/` | Yes (first run) | Low | **Preauthorized** |
| `npx tsc --noEmit` | Validate TypeScript | Read-only check | None | No | Low | **Preauthorized** |
| `npx remotion compositions src/index.ts` | Discover compositions | Bundles JS code | `.cache/` | No | Low | **Preauthorized** |
| `.\scripts\render.ps1 -Composition "..." -Output "..."` | Render MP4 video | Generates MP4 | `output/` | No | Low | **Preauthorized** |
| `.\scripts\preview.ps1` | Start Remotion Studio | Opens HTTP port 3000 | Network port | No | Low | **Preauthorized** |
| `python -m venv .venv` | Create local Python venv | Creates venv dir | `.venv/` | No | Low | **Preauthorized** |
| `.\.venv\Scripts\python.exe -m pip install ...` | Install Python package | Modifies venv packages | `.venv/Lib/` | Yes | Medium | **Conditional** |
| `.\scripts\tts.ps1 -Voice ... -Text ... -Output ...` | Generate neural speech | Creates WAV audio | `output/`, `.cache/` | Yes (on 1st run) | Low | **Preauthorized** |
| `.\scripts\probe.ps1 <file>` | Inspect media format & streams | Read-only | None | No | Low | **Preauthorized** |
| `ffmpeg -i ... -af volumedetect -f null -` | Measure audio volume/peaks | Read-only | None | No | Low | **Preauthorized** |
| `ffmpeg -i ... -vf blackdetect -f null -` | Check for black screen intervals | Read-only | None | No | Low | **Preauthorized** |
| `ffmpeg -y -i ... -vf ... -frames:v 1 ...` | Generate thumbnail / contact sheet | Creates PNG image | `output/` | No | Low | **Preauthorized** |
| `git push origin main` | Push commits to remote GitHub | Updates remote repo | Remote Git | Yes | High | **Explicit Approval Required** |
| `git reset --hard` | Destructively wipe changes | Loses uncommitted work | Working tree | No | High | **Explicit Approval Required** |
