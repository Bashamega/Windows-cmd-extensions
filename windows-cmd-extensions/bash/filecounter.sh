#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: filecounter <path_to_directory>"
    exit 1
fi

directory="$1"

if [ ! -d "$directory" ]; then
    echo "Error: $directory is not a valid directory."
    exit 1
fi

count=$(find "$directory" -type f | wc -l)

echo "Number of files in $directory (including subdirectories): $count"
