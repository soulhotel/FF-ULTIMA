#!/usr/bin/env bash

set -e

# find "setup wizard/src"
dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
until [ -d "$dir/setup wizard/src" ]; do
  if [ "$dir" = "/" ]; then echo "could not find setup wizard/src above this script"; exit 1; fi
  dir="$(dirname "$dir")"
done
echo "operating in: $dir/setup wizard"
cd "$dir/setup wizard/src"

cd ..

# you can dry run with or without -dev. removing -dev will serve the webapp embed in the binary.
# keeping -dev serves the webapp using "../../setup wizard/src/" files, allowing live refresh & editting.
"../Setup Wizard - Linux" -dry-run -dev