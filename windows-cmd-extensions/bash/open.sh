#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: Please specify the name of the application to open or use 'list' to display available applications."
else
    if [ "$1" == "list" ]; then
        echo ""
        echo "This is the list of available applications in the Start menu:"
        echo "-----------------------------------------------------------"
        
        apps=$(defaults read com.apple.dock persistent-apps | grep _CFURLString\" | awk -F'"' '{print $4}')
        
        for app in $apps; do
            echo "$app"
        done
    else
        echo ""
        echo "Starting $1"
        open -a "$1"
    fi
fi
