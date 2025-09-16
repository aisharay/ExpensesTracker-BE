@echo off
echo 🚀 Auto PR Raiser for ExpenseTracker Backend
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.7+ and try again
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "AutoPRRaising\main.py" (
    echo ❌ Please run this script from the backend root directory
    echo Current directory: %CD%
    pause
    exit /b 1
)

REM Install requirements if needed
if not exist "AutoPRRaising\.requirements_installed" (
    echo 📦 Installing Python requirements...
    python -m pip install -r AutoPRRaising\requirements.txt
    if %errorlevel% equ 0 (
        echo. > AutoPRRaising\.requirements_installed
        echo ✅ Requirements installed successfully
    ) else (
        echo ❌ Failed to install requirements
        pause
        exit /b 1
    )
    echo.
)

REM Check for GitHub token
if "%GITHUB_TOKEN%"=="" (
    echo ⚠️ GITHUB_TOKEN environment variable not set
    echo.
    echo 📖 To set up GitHub token:
    echo 1. Go to GitHub Settings ^> Developer settings ^> Personal access tokens
    echo 2. Generate new token with 'repo' permissions
    echo 3. Set GITHUB_TOKEN environment variable
    echo.
    set /p token="Enter your GitHub token (or press Enter to exit): "
    if "!token!"=="" (
        echo Exiting...
        pause
        exit /b 1
    )
    set GITHUB_TOKEN=!token!
)

REM Run the PR automation script
echo 🔄 Running Auto PR creation...
python AutoPRRaising\main.py %*

if %errorlevel% equ 0 (
    echo.
    echo ✅ Auto PR process completed successfully!
) else (
    echo.
    echo ❌ Auto PR process failed
)

echo.
pause
