@echo off

if "%~1"=="" (
    echo Error: Please specify the name of the application to open or use "list" to display available applications.
) else (
    if /i "%~1" == "list" (
        echo.
        echo This is the list of available applications in the Start menu:
        echo -----------------------------------------------------------
        
        rem Query the registry for PinnedTiles
        for /f "tokens=2,*" %%A in ('reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartPage" /v "PinnedTiles" 2^>nul') do (
            set "apps=%%B"
        )

        if "%apps%"=="" (
            echo No applications found in the registry.
        ) else (
            rem Iterate over the found applications
            for %%A in (%apps%) do (
                rem Query AppPath for each app in the StartPage
                for /f "tokens=2,*" %%C in ('reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StartPage\%%A" /v "AppPath" 2^>nul') do (
                    if not "%%C"=="" echo %%C
                )
            )
        )
    ) else (
        echo.
        echo Starting "%~1"
        start "" "%~1"
    )
)
