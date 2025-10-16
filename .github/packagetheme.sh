#!/bin/bash

set -e

# assuming this script is run within 1 subfolder of the root directory

cd "$(dirname "$0")/.."
version=$(head -n 1 change-log.md | grep -oE '[0-9]+(\.[0-9]+)*')
zipname="ffultima${version}.zip"
zip -r "$zipname" . -x ".git/*" ".github/*"
mv -f "$zipname" ".github/$zipname"
echo "$(realpath ".github/$zipname")"