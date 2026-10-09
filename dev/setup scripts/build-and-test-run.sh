#!/usr/bin/env bash

set -e

# find "setup wizard/src"
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
until [ -d "$dir/setup wizard/src" ]; do
  if [ "$dir" = "/" ]; then echo "could not find setup wizard/src"; exit 1; fi
  dir="$(dirname "$dir")"
done
echo "operating in: $dir/setup wizard"
cd "$dir/setup wizard/src"

npm run build

cd ..
go mod tidy

# static builds (no libc), linux binary good for any distro
export CGO_ENABLED=0

# just build for your system if you are personally testing
GOOS=linux   GOARCH=amd64 go build -o "../Setup Wizard - Linux" .
# GOOS=windows GOARCH=amd64 go build -ldflags "-H=windowsgui" -o "../Setup Wizard - windows.exe" .
# GOOS=darwin  GOARCH=arm64 go build -o "../Setup Wizard - Mac Arm" .
# GOOS=darwin  GOARCH=amd64 go build -o "../Setup Wizard - Mac Intel" .

# dry run
"../Setup Wizard - Linux" -dry-run

