@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0RUN_FROM_WINDOWS.ps1"
if errorlevel 1 echo Deployment was not verified. Keep the error output above.
pause
