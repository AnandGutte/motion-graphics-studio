# PowerShell Media Inspection Script using ffprobe
# Usage: .\scripts\probe.ps1 output/sun-disappears-final.mp4

param (
    [Parameter(Mandatory=$true)]
    [string]$FilePath
)

$ErrorActionPreference = "Stop"

if (Get-Command ffprobe -ErrorAction SilentlyContinue) {
    ffprobe -v error -show_format -show_streams $FilePath
} else {
    Write-Warning "ffprobe is not found in system PATH. Install it via 'winget install Gyan.FFmpeg' or place ffprobe.exe in tools\bin\"
}
