# PowerShell Video Render Script for Windows 11
# Usage: .\scripts\render.ps1 [CompositionName] [OutputPath]

param (
    [string]$Composition = "SunDisappearsShort",
    [string]$Output = "output/sun-disappears-final.mp4"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "Rendering composition '$Composition' to '$Output'..." -ForegroundColor Cyan

# Set project-local cache directories
$env:PUPPETEER_CACHE_DIR = Join-Path $ProjectRoot ".cache\puppeteer"
$env:REMOTION_CACHE_DIR = Join-Path $ProjectRoot ".cache\remotion"
$env:TMPDIR = Join-Path $ProjectRoot ".tmp"

# Ensure output directory exists
$OutputDir = Split-Path -Parent (Join-Path $ProjectRoot $Output)
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}

# Execute Remotion render using npx
npx remotion render src/index.ts $Composition $Output --overwrite

Write-Host "Render completed successfully: $Output" -ForegroundColor Green
