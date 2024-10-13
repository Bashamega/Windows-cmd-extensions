@echo off

if "%~1"=="" (
    echo Error: Please specify the name of the application to open or use "list" to display available applications.
) else (
    if /i "%~1" == "list" (
        echo.
        echo This is the list of installed applications:
        echo -----------------------------------------------------------

        rem Query the registry for installed applications
        setlocal enabledelayedexpansion
        set "foundApps="

        rem Check both user and local machine uninstall keys
        for %%A in (
            "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall"
            "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall"
        ) do (
            for /f "tokens=2,*" %%B in ('reg query %%A /s /v "DisplayName" 2^>nul') do (
                if not "%%C"=="" (
                    echo %%C
                    set "foundApps=1"
                )
            )
        )

        if not defined foundApps (
            echo No applications found in the registry.
        )

        endlocal
    ) else (
        echo.
        echo Starting "%~1"
        start "" "%~1"
    )
)

