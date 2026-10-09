#!/bin/bash

while true; do
    clear

    echo -e "
Quick gits, enter an option, or exit on an empty enter:

s. git status
p. git pull
1. git add . && git commit -m
2. git push
3. git tag

If your git is configured to commit messages through external text editor, then:

4. git add . && git commit
5. git add . && git commit && git push
"
    read -rp "Enter an option > " option

    case "$option" in
        "")
            exit 0
            ;;
        s)
            git status
            ;;
        p)
            git pull
            ;;
        1)
            read -rp "Commit message: " message
            git add . && git commit -m "$message"
            ;;
        2)
            git push
            ;;
        3)
            read -rp "Tag name (1.0, 5.4, etc): " tag
            git tag "$tag"
            ;;
        4)
            git add . && git commit
            ;;
        5)
            git add . && git commit && git push
            ;;
        *)
            echo
            echo "not an option"
            ;;
    esac

    echo
    read -rp "Press Enter to return to menu..."
done