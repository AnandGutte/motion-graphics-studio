# CLEANUP & DISPOSAL INSTRUCTIONS — Motion Graphics Studio

This document outlines everything installed for the **Motion Graphics Studio** (originally initialized as `science-video-lab`), where files are located, how to stop active processes, and how to safely and completely delete the project on either macOS or Windows.

---

## 1. Inventory of What Was Installed (macOS Disposable Setup)

All temporary binaries and caches were isolated strictly within the project root directory:

### Project-Local Binaries & Runtime
* **Node.js LTS arm64**: Located in `tools/node/` (macOS only)
* **FFmpeg / ffprobe static binaries**: Located in `tools/bin/` (macOS only)
* **Python 3.11 standalone & venv**: Located in `tools/python/` and `tools/venv/`
* **Chrome Headless Shell**: Located in `.cache/puppeteer/`

### Project-Local Caches (All Git-Ignored)
* **npm Cache**: `.npm-cache/` (enforced via `.npmrc`)
* **Remotion Bundle Cache**: `.cache/remotion/`
* **Model Weights**: `.cache/huggingface/`
* **Pip Cache**: `.cache/pip/`
* **Temporary Files**: `.tmp/`
* **Render Outputs**: `output/`

---

## 2. Confirmation of External Changes

* **System PATH**: NOT modified.
* **Shell profiles** (`~/.zshrc`, `~/.bashrc`, `~/.profile`): NOT modified.
* **Global npm packages**: NONE installed.
* **System packages (Homebrew / sudo / choco / winget)**: NONE installed by the project.
* **Global Antigravity settings**: NOT modified.
* **Dropbox**: Only this specific experiment directory was marked with `com.dropbox.ignored 1`. No parent or external folders were modified.

---

## 3. How to Stop Running Processes

```bash
# macOS / Linux:
pkill -f "motion-graphics-studio" || pkill -f "science-video-lab"

# Windows (PowerShell):
Get-Process | Where-Object { $_.CommandLine -like "*motion-graphics-studio*" -or $_.CommandLine -like "*science-video-lab*" } | Stop-Process
```

---

## 4. How to Completely Delete the Studio

To delete the entire project directory and reclaim all disk space:

```bash
# macOS / Linux (from parent directory):
rm -rf motion-graphics-studio science-video-lab

# Windows 11 (PowerShell from parent directory):
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue motion-graphics-studio, science-video-lab
```

### What Will Remain After Deletion:
* **Absolutely nothing.**
* The repository is 100% self-contained. Deleting the project folder leaves the host system in its exact prior state.
