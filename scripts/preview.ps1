# PowerShell Remotion Studio Preview Script for Windows 11
# Usage: .\scripts\preview.ps1

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "Starting Remotion Studio preview server..." -ForegroundColor Cyan

$env:PUPPETEER_CACHE_DIR = Join-Path $ProjectRoot ".cache\puppeteer"
$env:REMOTION_CACHE_DIR = Join-Path $ProjectRoot ".cache\remotion"
$env:TMPDIR = Join-Path $ProjectRoot ".tmp"

npx remotion preview src/index.ts
