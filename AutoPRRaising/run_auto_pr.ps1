# Auto PR Raiser for ExpenseTracker Backend
Write-Host "🚀 Auto PR Raiser for ExpenseTracker Backend" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python 3.7+ and try again" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if we're in the right directory
if (!(Test-Path "AutoPRRaising\main.py")) {
    Write-Host "❌ Please run this script from the backend root directory" -ForegroundColor Red
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Install requirements if needed
if (!(Test-Path "AutoPRRaising\.requirements_installed")) {
    Write-Host "📦 Installing Python requirements..." -ForegroundColor Yellow
    python -m pip install -r AutoPRRaising\requirements.txt
    if ($LASTEXITCODE -eq 0) {
        New-Item -Path "AutoPRRaising\.requirements_installed" -ItemType File | Out-Null
        Write-Host "✅ Requirements installed successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install requirements" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host ""
}

# Check for GitHub token
if (-not $env:GITHUB_TOKEN) {
    Write-Host "⚠️ GITHUB_TOKEN environment variable not set" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📖 To set up GitHub token:" -ForegroundColor Cyan
    Write-Host "1. Go to GitHub Settings > Developer settings > Personal access tokens"
    Write-Host "2. Generate new token with 'repo' permissions"
    Write-Host "3. Set GITHUB_TOKEN environment variable"
    Write-Host ""
    
    $token = Read-Host "Enter your GitHub token (or press Enter to exit)"
    if ([string]::IsNullOrWhiteSpace($token)) {
        Write-Host "Exiting..." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
    $env:GITHUB_TOKEN = $token
}

# Run the PR automation script
Write-Host "🔄 Running Auto PR creation..." -ForegroundColor Yellow
python AutoPRRaising\main.py $args

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Auto PR process completed successfully!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Auto PR process failed" -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"
