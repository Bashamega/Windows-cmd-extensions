@echo off

if "%~1"=="" (
    echo Usage: filecounter  ^<path_to_directory^>
    exit /b 1
)

set "directory=%~1"

if not exist "%directory%" (
    echo Error: %directory% is not a valid directory.
    exit /b 1
)

for /f %%F in ('dir /s /b /a-d "%directory%" ^| find /c /v ""') do set "count=%%F"

echo Number of files in %directory% (including subdirectories): %count%
