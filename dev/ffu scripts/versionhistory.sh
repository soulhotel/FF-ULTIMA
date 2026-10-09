#!/bin/bash

# I generate a compiled version of the themes Release Notes (changelog) mostly for the wiki

set -e

INPUT_FILE="changelog.md"
OUTPUT_FILE="dev/docs/Version History.md"
TMP_FILE=$(mktemp)

# changelog.md always has a version header like this:

HEADER=$(grep -m1 "^### <ins> FF Ultima Version " "$INPUT_FILE" | sed -E 's/\r$//; s/[[:space:]]+$//' || true)
VERSION=$(echo "$HEADER" | sed -E 's/^### <ins> FF Ultima Version ([0-9][0-9.]*).*$/\1/')

if [[ -z "$HEADER" ]]; then
    echo "version header not found, recheck $INPUT_FILE"
    exit 1
fi
echo "$HEADER" >> "$TMP_FILE"
echo >> "$TMP_FILE"

# and eventually a change log header that we log bullets from:

IN_CHANGELOG=0
APPEND_MEDIA=0
SKIP_COMMENT=0


while IFS= read -r line || [[ -n "$line" ]]; do
    line=${line%$'\r'}
    if [[ "$line" =~ ^###\ \<ins\>\ Change\ Log ]]; then
        IN_CHANGELOG=1
        echo "$line" | sed -E 's/[[:space:]]+$//' >> "$TMP_FILE"
        continue
    fi
    if [[ $IN_CHANGELOG -eq 1 && "$line" =~ ^###\  ]]; then
        IN_CHANGELOG=0
        APPEND_MEDIA=1
        continue
    fi
    if [[ $IN_CHANGELOG -eq 1 && "$line" =~ ^- ]]; then
        echo "$line" >> "$TMP_FILE"
    fi

    if [[ $IN_COMMENT -eq 1 ]]; then
        [[ "$line" == *"-->"* ]] && IN_COMMENT=0
        continue
    fi
    if [[ "$line" =~ ^[[:space:]]*\<!-- ]]; then
        [[ "$line" != *"-->"* ]] && IN_COMMENT=1
        continue
    fi

# we also pass along any forms of media through out the changelog

    if [[ $APPEND_MEDIA -eq 1 ]]; then
        # images ![](...)
        if echo "$line" | grep -q '!\[.*\](.*)'; then
            url=$(echo "$line" | sed -E 's/.*!\[[^]]*\]\(([^)]+)\).*/\1/')
            echo "" >> "$TMP_FILE"
            echo "<img width=\"100%\" src=\"$url\" />" >> "$TMP_FILE"
        # videos
        elif [[ "$line" =~ ^https://github\.com/user-attachments/assets/ ]]; then
            url="$line"
            echo "" >> "$TMP_FILE"
            echo "<iframe width=\"100%\" height=\"490\" src=\"$url\" title=\"GitHub video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>" >> "$TMP_FILE"
        fi
    fi
 
done < "$INPUT_FILE"
 
# to the top
# well this file is copied into docusaurus docs so lets preserve the page front
if [[ -f "$OUTPUT_FILE" ]]; then
    FRONT_END=""
    if [[ "$(head -n1 "$OUTPUT_FILE" | tr -d '\r')" == "---" ]]; then
        FRONT_END=$(awk 'NR>1 && /^---[[:space:]]*\r?$/ {print NR; exit}' "$OUTPUT_FILE")
    fi
    if [[ -n "$FRONT_END" ]]; then
        {
            head -n "$FRONT_END" "$OUTPUT_FILE"
            echo ""
            cat "$TMP_FILE"
            echo ""
            tail -n +"$((FRONT_END + 1))" "$OUTPUT_FILE" | sed '/./,$!d'
        } > "${OUTPUT_FILE}.tmp"
    else
        {
            cat "$TMP_FILE"
            echo ""
            cat "$OUTPUT_FILE"
        } > "${OUTPUT_FILE}.tmp"
    fi
    mv "${OUTPUT_FILE}.tmp" "$OUTPUT_FILE"
else
    mkdir -p "$(dirname "$OUTPUT_FILE")"
    mv "$TMP_FILE" "$OUTPUT_FILE"
fi
 
rm -f "$TMP_FILE"
echo "$VERSION added to $OUTPUT_FILE"