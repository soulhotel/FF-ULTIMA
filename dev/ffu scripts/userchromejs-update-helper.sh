#!/usr/bin/env bash

set -euo pipefail

# Autoconfig/userchromejs integration is sourced from Alex Vallat's https://github.com/AlexVallat/firefox-scripts
# When updating the base, these directory preferences should also be defined:

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
CONFIG_FILE="../userchromejs/firefox/config.js"
USERCHROME_FILE="../userchromejs/utils/userChrome.js"
MANIFEST_FILE="../userchromejs/utils/chrome.manifest"
echo "$SCRIPT_DIR"

if [ -f "$CONFIG_FILE" ]; then
  echo "updating $CONFIG_FILE..."
  if ! grep -q "cmanifest\.append(['\"]\userchromejs['\"])" "$CONFIG_FILE"; then
    sed -i "/cmanifest\.append(['\"]utils['\"])/i \  cmanifest.append('userchromejs');" "$CONFIG_FILE"
  fi
else
  echo "Error: cant find $CONFIG_FILE" >&2
fi

if [ -f "$USERCHROME_FILE" ]; then
  echo "updating $USERCHROME_FILE..."
  sed -i -E "s/scriptsDir:[[:space:]]*'[^']*'/scriptsDir: 'userchromejs\/scripts'/g" "$USERCHROME_FILE"
  if ! grep -q "chromedir\.appendRelativePath(_uc\.scriptsDir)" "$USERCHROME_FILE"; then
    sed -i "s/chromedir\.append(_uc\.scriptsDir)/chromedir.appendRelativePath(_uc.scriptsDir)/" "$USERCHROME_FILE"
  fi
else
  echo "error: cant find $USERCHROME_FILE" >&2
fi

mkdir -p "$(dirname "$MANIFEST_FILE")"
cat << 'EOF' > "$MANIFEST_FILE"
content userchromejs ./
resource userchromejs ../scripts/
content userscripts ../scripts/
EOF
# content userchromemanager ../scripts/