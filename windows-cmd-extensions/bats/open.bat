@echo off

if "%~1"=="" (
    echo Error: Please specify the name of the application to open or use "list" to display available applications.
) else (
    if /i "%~1" == "list" (
        echo.
        echo This is the list of available applications in the Start menu:
        echo -----------------------------------------------------------
        
        reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartPage" /v "PinnedTiles" | findstr /i "MRUListEx Applications"
        for /f "tokens=2,*" %%A in ('reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartPage" /v "PinnedTiles" ^| findstr /i "MRUListEx Applications"') do (
            set "apps=%%B"
        )
        
        for %%A in (%apps%) do (
            for /f "tokens=2,*" %%C in ('reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartPage\%%A" /v "AppPath"') do (
                echo %%C
            )
        )
    ) else (
        echo.
        echo Starting "%~1"
        start /B "" "%~1"
    )
)
