#!/usr/bin/env bash
set -eu

# PROJECT_DIR="FF-ULTIMA"
CHANGELOG_FILE="changelog.md"
ATTACHMENT_PATTERN="setup-wizard-*"
VERSION_PATTERN='[0-9]+(\.[0-9]+)*'

if [ ! -f "$CHANGELOG_FILE" ]; then
    echo "error: $CHANGELOG_FILE not found in $PROJECT_DIR" >&2
    exit 1
fi

VERSION=$(head -n 1 "$CHANGELOG_FILE" | tr -d '\r' | grep -oE "$VERSION_PATTERN" | head -n 1 || true)

if [ -z "$VERSION" ]; then
    echo "error: no version number found in the first line of $CHANGELOG_FILE." >&2
    exit 1
fi

RELEASE_TAG="$VERSION"
RELEASE_TITLE="$VERSION"

while :; do
    printf 'Release type? [r]egular / [p]re-release: '
    read -r ANSWER || ANSWER=""
    case "$ANSWER" in
        ""|r|R|regular)
            PRERELEASE=0; RELEASE_KIND="Regular"; break ;;
        p|P|pre|pre-release|prerelease)
            PRERELEASE=1; RELEASE_KIND="Pre-release"; break ;;
        *)
            echo "Type 'r' for regular, 'p' for pre-release." ;;
    esac
done

set --
for FILE in $ATTACHMENT_PATTERN; do
    if [ -f "$FILE" ]; then
        set -- "$@" "$FILE"
    fi
done

# Prepend the prerelease flag if needed
if [ "$PRERELEASE" -eq 1 ]; then
    set -- --prerelease "$@"
fi

echo -e "
Version:     $VERSION
Tag:         $RELEASE_TAG
Title:       $RELEASE_TITLE
Type:        $RELEASE_KIND
Summary:     $CHANGELOG_FILE
Attachments: $*
"

RELEASE_URL=$(gh release create "$RELEASE_TAG" \
    --title "$RELEASE_TITLE" \
    --notes-file "$CHANGELOG_FILE" \
    "$@")

echo "View here: $RELEASE_URL"