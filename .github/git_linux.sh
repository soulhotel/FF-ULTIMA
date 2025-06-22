#!/bin/bash

# THEME REPO -------------------------------------------------------
gitTheme="https://github.com/soulhotel/FF-ULTIMA.git"

clear
echo "• 🔴 • This script can be used to download any hosted Theme via the gitTheme variable."
echo
echo "• 🟡 • These are the Profile Folders found in your firefox directory.."
echo

# List all folders in ~/.mozilla/firefox/ --------------------------

profiles=()
index=1
for dir in ~/.mozilla/firefox/*/; do
    folder_name=$(basename "$dir")
    case "$folder_name" in
        "Crash Reports"|"Pending Pings"|"Profile Groups")
            continue
            ;;
    esac
    echo "$index) $folder_name"
    profiles+=("$folder_name")
    index=$((index + 1))
done
echo
read -p "• 🟡 • Which profile are we installing the theme into: " profile_choice
clear
selected_profile="${profiles[$((profile_choice - 1))]}"
profile_path="$HOME/.mozilla/firefox/$selected_profile"


# DOWNLOAD FF ULTIMA -----------------------------------------------

cd "$profile_path" || { echo "• 🔴 • Failed to cd into profile"; exit 1; }
git clone "$gitTheme" chrome
cd chrome && cp "user.js" "../user.js"

echo
echo "• 🟢 • git clone complete"
echo "• 🟢 • user.js has been copied to Profile"
echo "• 🟢 • Restarting Firefox in 3.."
sleep 1
echo "• 🟡 • Restarting Firefox in 2.."
sleep 1
echo "• 🔴 • Restarting Firefox in ..."
sleep 1
clear


# RESTART FIREFOX --------------------------------------------------

echo "• 🟡 • Which Firefox are we working with today?"
echo
echo "1 🟠 firefox"
echo "2 🔵 firefox developer edition"
echo "3 🟣 firefox nightly"
echo "4 ⚪ librewolf"
echo
read -p "Which Firefox is used with $profile_choice: " firefox_choice
clear
case "$firefox_choice" in
  1)  # default firefox
    pkill -9 -f "/usr/lib/firefox/firefox"
    while pgrep -f "/usr/lib/firefox/firefox" >/dev/null; do sleep 0.5; done
    firefox &
    ;;
  2)  # dev edition
    pkill -9 -f "/usr/lib/firefox-developer-edition/firefox"
    while pgrep -f "/usr/lib/firefox-developer-edition/firefox" >/dev/null; do sleep 0.5; done
    firefox-developer-edition &
    ;;
  3)  # nightly
    pkill -9 -f "/usr/lib/firefox-nightly/firefox"
    while pgrep -f "/usr/lib/firefox-nightly/firefox" >/dev/null; do sleep 0.5; done
    firefox-nightly &
    ;;
  4)  # librewolf - assuming path or just name is enough
    pkill -9 -f librewolf
    while pgrep -f librewolf >/dev/null; do sleep 0.5; done
    librewolf &
    ;;
  *)
    echo "• 🔴 • Invalid choice. Exiting."
    exit 1
    ;;
esac


# CLEANUP USER.JS --------------------------
echo
echo "• 🟡 • Waiting to clean up user.js (10 seconds).."
sleep 10 && cd ../ && rm user.js
echo
echo "• 🟢 • Firefox successfully restarted, user.js has been cleaned up. Enjoy the theme."
echo
read -p "Press ENTER to close this script."
