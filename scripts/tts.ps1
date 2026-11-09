# PowerShell Neural TTS Generator for Windows 11
# Runs project-local Python virtual environment with CUDA / CPU acceleration
# Usage: .\scripts\tts.ps1 -Voice "am_adam" -Speed 1.05 -Text "Hello universe" -Output "output/test.wav"

param (
    [string]$Voice = "am_adam",
    [double]$Speed = 1.05,
    [Parameter(Mandatory=$true)]
    [string]$Text,
    [Parameter(Mandatory=$true)]
    [string]$Output
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

# Set project-local cache directories
$env:HF_HOME = Join-Path $ProjectRoot ".cache\huggingface"
$env:XDG_CACHE_HOME = Join-Path $ProjectRoot ".cache"
$env:TMPDIR = Join-Path $ProjectRoot ".tmp"

# Detect Python interpreter
$PythonExe = Join-Path $ProjectRoot ".venv\Scripts\python.exe"
if (-not (Test-Path $PythonExe)) {
    $PythonExe = Join-Path $ProjectRoot "tools\venv\Scripts\python.exe"
}
if (-not (Test-Path $PythonExe)) {
    $PythonExe = "python"
}

Write-Host "Executing TTS with interpreter '$PythonExe'..." -ForegroundColor Cyan

& $PythonExe (Join-Path $ProjectRoot "scripts\generate_neural_tts.py") --voice $Voice --speed $Speed --text $Text --output $Output
