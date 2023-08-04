@echo off
set /p minutes="Enter the number of minutes to set display timeout: "

rem Calculate the number of seconds


rem Set the display timeout
powercfg -change -monitor-timeout-ac %minutes%
powercfg -change -monitor-timeout-dc %minutes%

echo Display timeout set to %minutes% minutes.
pause
