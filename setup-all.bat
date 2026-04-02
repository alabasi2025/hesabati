@echo off
echo ===================================
echo   Hesabati - Full System Setup
echo ===================================

echo.
echo [1/3] Starting Backend (port 3000)...
start "Hesabati-Backend" cmd /k "cd /d d:\alabasi2026\hesabati\backend && npx tsx watch src/index.ts"

echo.
echo [2/3] Starting Frontend Dev Server (port 4200)...
start "Hesabati-Frontend" cmd /k "cd /d d:\alabasi2026\hesabati\frontend && npx ng serve --port 4200"

echo.
echo [3/3] Building Frontend to backend/public...
start "Hesabati-Build" cmd /k "cd /d d:\alabasi2026\hesabati && node build-frontend.js"

echo.
echo ===================================
echo   System is starting!
echo ===================================
echo.
echo Backend API:  http://localhost:3000/api
echo Frontend Dev: http://localhost:4200
echo Frontend via Backend: http://localhost:3000
echo.
pause
