@echo off
setlocal enabledelayedexpansion

echo Advanced Network Diagnostics
echo ----------------------------
echo.

:: Display basic IP configuration
echo Basic IP Configuration:
ipconfig | findstr /R /C:"IPv4 Address" /C:"Subnet Mask" /C:"Default Gateway"
echo.

:: Test connectivity with common servers
echo Testing Internet Connectivity:
ping -n 4 google.com | findstr "Approximate round trip times"
ping -n 4 github.com | findstr "Approximate round trip times"
echo.

:: List established network connections
echo Active Network Connections:
netstat -an | findstr "ESTABLISHED"
echo.

:: Perform a quick scan of well-known ports
echo Scanning Common Ports on Local System:
set "commonPorts=80, 443, 21, 22, 25, 110, 143, 3306, 3389, 5900"
for %%p in (%commonPorts%) do (
    netstat -an | findstr /R /C:":%%p " && echo Port %%p is open || echo Port %%p is not open
)
echo.

:: Display DNS Resolver Cache
echo DNS Resolver Cache:
ipconfig /displaydns
echo.

:: Additional Network Troubleshooting using traceroute
echo Tracing route to google.com to check network paths:
tracert -d google.com
echo.

:: End of script
echo All network diagnostics have been completed.
pause
endlocal
