@echo off
setlocal enabledelayedexpansion

echo Gathering drive information...
echo.

for /f "skip=2 tokens=1,2,3,4 delims=," %%a in ('wmic logicaldisk get DeviceID^,FileSystem^,FreeSpace^,Size /format:csv') do (
    set "drive=%%a"
    set "filesystem=%%b"
    set "freespace=%%c"
    set "totalsize=%%d"

    if "!drive!" NEQ "Node" (
        echo Drive: !drive!
        echo File System: !filesystem!
        echo Free Space: !freespace! bytes
        echo Total Size: !totalsize! bytes
        echo ----------------------------------------
    )
)

pause
