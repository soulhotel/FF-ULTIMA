#!/bin/sh
set -eu

PROJECT_DIR="FF-ULTIMA"
CHANGELOG_FILE="changelog.md"
ATTACHMENT_PATTERN="setup-wizard-*"
VERSION_PATTERN='[0-9]+(\.[0-9]+)*'

cd "$PROJECT_DIR"

if [ ! -f "$CHANGELOG_FILE" ]; then
    echo "error: $CHANGELOG_FILE not found in $PROJECT_DIR" >&2
    exit 1
fi

VERSION=$(head -n 1 "$CHANGELOG_FILE" | tr -d '\r' | grep -oE "$VERSION_PATTERN" | head -n 1 || true)

if [ -z "$VERSION" ]; then
    echo "error: version number found in the first line of $CHANGELOG_FILE." >&2
    exit 1
fi

RELEASE_TAG="$VERSION"
RELEASE_TITLE="$VERSION"

set --
for FILE in $ATTACHMENT_PATTERN; do
    if [ -f "$FILE" ]; then
        set -- "$@" "$FILE"
    fi
done

echo -e "
Version:     $VERSION
Tag:         $RELEASE_TAG
Title:       $RELEASE_TITLE
Summary:     $CHANGELOG_FILE
Attachments: $*
"

gh release create "$RELEASE_TAG" \
    --title "$RELEASE_TITLE" \
    --notes-file "$CHANGELOG_FILE" \
    # --prerelease \
    "$@"