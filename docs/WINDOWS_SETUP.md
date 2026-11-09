# Windows 11 & NVIDIA RTX 4070 Setup Guide

This guide explains how to clone and run the **Science Video Lab** on a Windows 11 machine equipped with an NVIDIA GeForce RTX 4070 GPU.

---

## 1. Prerequisites (Installed on Windows)

1. **Git for Windows**: Download from [git-scm.com](https://git-scm.com/) or install via winget:
   ```powershell
   winget install --id Git.Git -e --source winget
   ```
2. **Node.js LTS (v20 or v22)**:
   ```powershell
   winget install --id OpenJS.NodeJS.LTS -e --source winget
   ```
3. **FFmpeg & ffprobe**:
   ```powershell
   winget install --id Gyan.FFmpeg -e --source winget
   ```
4. **Python 3.11 or 3.12**:
   ```powershell
   winget install --id Python.Python.3.11 -e --source winget
   ```
5. **NVIDIA CUDA Toolkit 12.x / Driver**: Ensure modern NVIDIA Studio or Game Ready drivers are installed for the RTX 4070.

---

## 2. Cloning the Repository

Open **PowerShell** in your preferred development directory:

```powershell
git clone <YOUR_PRIVATE_GITHUB_URL>/science-video-lab.git
cd science-video-lab
```

---

## 3. Node.js & Remotion Installation

Install all JavaScript and Remotion dependencies using npm:

```powershell
npm install
```

Verify Remotion CLI is operational:
```powershell
npx remotion --version
```

---

## 4. Python Virtual Environment & Kokoro Neural TTS Setup

Set up a project-local virtual environment with PyTorch CUDA acceleration for your NVIDIA RTX 4070:

```powershell
# Create virtual environment in .venv
python -m venv .venv

# Activate the virtual environment
.\.venv\Scripts\Activate.ps1

# Upgrade pip
pip install --upgrade pip

# Install PyTorch with CUDA 12.1+ support for RTX 4070
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Install Kokoro TTS, soundfile, and dependencies
pip install kokoro soundfile misaki
```

### Verifying GPU Acceleration
Test that PyTorch sees the RTX 4070:
```powershell
python -c "import torch; print('CUDA Available:', torch.cuda.is_available()); print('Device:', torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'CPU')"
```
*Expected output*: `CUDA Available: True`, `Device: NVIDIA GeForce RTX 4070 Laptop GPU`.

---

## 5. Downloading TTS Model Weights (Automated)

Model weights are **not committed to Git** to keep the repository lightweight (< 5 MB).
When you run the generator script for the first time, weights (~350 MB) download automatically from Hugging Face into the project-local `.cache/huggingface/`:

```powershell
# Test neural voice synthesis (Voice: am_adam)
.\scripts\tts.ps1 -Voice "am_adam" -Speed 1.05 -Text "What if the Sun vanished? Let us test neural audio on Windows." -Output "output\windows_test.wav"
```

Verify audio playback:
```powershell
.\scripts\probe.ps1 output\windows_test.wav
```

---

## 6. Windows Rendering & Verification Workflow

### Smoke Test: 3-Second Sun Animation
```powershell
.\scripts\render.ps1 -Composition "SunAnimation" -Output "output\sun-smoke-test.mp4"
```

### Render Full 30-Second Short: What If The Sun Disappeared?
```powershell
.\scripts\render.ps1 -Composition "SunDisappearsShort" -Output "output\sun-disappears-final.mp4"
```

### Interactive Remotion Studio Preview
```powershell
.\scripts\preview.ps1
```
Opens the interactive visual timeline at `http://localhost:3000`.

### Validate Output Video
```powershell
.\scripts\probe.ps1 output\sun-disappears-final.mp4
```

---

## 7. Portability & Cross-Platform Notes

| Feature | macOS (Office M-series) | Windows 11 (Home RTX 4070) |
| :--- | :--- | :--- |
| **TTS Backend** | `kokoro-mlx` (Apple Silicon Metal) | `kokoro` (PyTorch CUDA acceleration) |
| **Shell Scripts** | Bash (`scripts/*.sh`) | PowerShell (`scripts/*.ps1`) |
| **Remotion Rendering** | Chrome Headless Shell arm64 | Chrome Headless Shell win64 (NVENC accelerated) |
| **Path Handling** | Posix `/` | Automated via `pathlib` and PowerShell `Join-Path` |
| **Model Caches** | `.cache/` (Ignored by Git) | `.cache\` (Ignored by Git) |

### Steps that must be executed on Windows:
1. Running `winget install` for Node.js, Python, and FFmpeg (if not already installed).
2. Creating `.venv` and installing `torch` with CUDA wheels (`--index-url https://download.pytorch.org/whl/cu121`).
3. Running PowerShell scripts (`.\scripts\render.ps1`).
