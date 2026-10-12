@echo off
title ASH INSTRUMENTS - Chrome Launcher
color 0A

echo ==========================================================
echo          ASH INSTRUMENTS - WEB EXPORT LAUNCHER
echo ==========================================================
echo.

cd /d "%~dp0"

:: Step 1: Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found on your PC!
    echo Please download and install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b
)

:: Step 2: Instant launch using pre-built dist folder (Zero installation needed!)
if exist "dist\index.html" (
    echo [INFO] Pre-compiled web application found!
    echo [INFO] Launching directly in Google Chrome (no npm install required)...
    echo.
    node serve.cjs
    pause
    exit /b
)

:: Step 3: Fallback if dist doesn't exist
if not exist "node_modules\" (
    echo [INFO] Installing packages (npm install --legacy-peer-deps)...
    call npm install --legacy-peer-deps
)

echo [INFO] Launching development server...
start "" http://localhost:3000
call npm run dev

pause
