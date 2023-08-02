@echo off
setlocal EnableDelayedExpansion

REM Check if the system supports querying battery information
systeminfo | find "Battery" > nul
if %errorlevel% neq 0 (
    echo Battery information not available on this system.
    exit /b
)

REM Query battery status using WMIC (Windows Management Instrumentation Command-line)
for /f "tokens=2 delims==" %%G in ('wmic path Win32_Battery get EstimatedChargeRemaining /value') do (
    set "BatteryLevel=%%G"
)

for /f "tokens=2 delims==" %%G in ('wmic path Win32_Battery get BatteryStatus /value') do (
    set "BatteryStatus=%%G"
)

REM Convert BatteryStatus value to meaningful text
if "%BatteryStatus%"=="1" (
    set "BatteryStatusText=Unknown"
) else if "%BatteryStatus%"=="2" (
    set "BatteryStatusText=Fully charged"
) else if "%BatteryStatus%"=="3" (
    set "BatteryStatusText=Discharging"
) else if "%BatteryStatus%"=="4" (
    set "BatteryStatusText=Charging"
) else if "%BatteryStatus%"=="5" (
    set "BatteryStatusText=Partially charged"
)

REM Display the battery information
echo Battery Level: %BatteryLevel%%%
echo Battery Status: %BatteryStatusText%

pause
