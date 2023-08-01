@echo off
if "%~1"=="" (
    echo Usage: %~nx0 file
) else (
    echo. >"%~1"
)
