# CLEANUP & DISPOSAL INSTRUCTIONS

This document outlines everything installed for the `science-video-lab` experiment, where files are located, how to stop active processes, and how to safely and completely delete the project.

---

## 1. Inventory of What Was Installed

Everything installed for this project is strictly isolated inside:
`/Users/asistudio47/Library/CloudStorage/Dropbox-ASI/ASI Studio/ASI STUDIO TRANSFER/Anand/science-video-lab`

### Project-Local Binaries & Runtime
* **Node.js LTS (`v22.11.0` arm64)**: Located in `tools/node/`
* **npm (`10.9.0`)**: Located in `tools/node/bin/npm`
* **FFmpeg static binary (`v4.4` arm64)**: Located in `tools/bin/ffmpeg`
* **ffprobe static binary (`v4.4.1` arm64)**: Located in `tools/bin/ffprobe`
* **Chrome Headless Shell (Puppeteer)**: Located in `.cache/puppeteer/`

### Project-Local Caches
* **npm Cache**: `.npm-cache/` (enforced via `.npmrc`)
* **Remotion Bundle Cache**: `.cache/remotion/`
* **Temporary Render Files**: `.tmp/`

### Project-Local Dependencies
* **JavaScript / TypeScript Packages**: `node_modules/` (React, Remotion, TypeScript, and dependencies)

---

## 2. Confirmation of External Changes

* **System PATH**: NOT modified.
* **Shell configuration files** (`~/.zshrc`, `~/.bashrc`, `~/.profile`): NOT modified.
* **Global npm packages**: NONE installed.
* **System packages (Homebrew / MacPorts / sudo)**: NONE installed.
* **Global Antigravity settings or skills**: NOT touched (all skills are strictly in `.agents/skills/` inside the project).
* **Dropbox Configuration**: Only the `science-video-lab` directory was assigned `com.dropbox.ignored 1`. No other folders or Dropbox global settings were modified.

---

## 3. How to Stop Any Running Processes

Before deleting the directory, verify no background Remotion preview server or node processes remain running:

```bash
# Check if any project processes are active:
ps aux | grep "science-video-lab" | grep -v grep

# If any process is running, terminate it:
pkill -f "science-video-lab"
```

---

## 4. How to Completely Delete the Experiment

To delete the entire experiment and reclaim all disk space, run a single command from your terminal:

```bash
rm -rf "/Users/asistudio47/Library/CloudStorage/Dropbox-ASI/ASI Studio/ASI STUDIO TRANSFER/Anand/science-video-lab"
```

### What Will Remain After Deletion:
* **Absolutely nothing.**
* Since all runtimes, packages, browser binaries, caches, and output videos reside exclusively within `science-video-lab`, removing this folder leaves your macOS system in the exact state it was before the project was created.
