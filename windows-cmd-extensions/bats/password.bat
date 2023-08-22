@echo off

REM Check if the password length argument is provided
if "%~1"=="" (
    echo Usage: %~nx0 password_length
    exit /b 1
)

REM Function to generate a random password
setlocal enabledelayedexpansion

set "length=%1"
set "chars=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
set "password="
for /l %%i in (1,1,%length%) do (
    set /a "rand=!random! %% 62"
    for %%j in (!rand!) do set "char=!chars:~%%j,1!"
    set "password=!password!!char!"
)

REM Output the generated password
echo Random Password: %password%
