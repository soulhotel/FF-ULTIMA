#!/bin/bash

set -e

# assuming this script is run within 1 subfolder of the root directory
cd "$(dirname "$0")/.."

INPUT_FILE="change-log.md"
OUTPUT_FILE=".github/Version History.md"
TMP_FILE=$(mktemp)

# fetch version
VERSION=$(grep -m1 "^### <ins> FF Ultima Version " "$INPUT_FILE" | sed -E 's/^### <ins> FF Ultima Version ([0-9.]+) Release.*$/\1/')
echo "## <ins> $VERSION </ins>" >> "$TMP_FILE"
echo >> "$TMP_FILE"

# Flag variables
IN_CHANGELOG=0
APPEND_MEDIA=0
SKIP_COMMENT=0

# Process file line by line
while IFS= read -r line; do

    # start on bullets
    if echo "$line" | grep -q "^### <ins> Change Log"; then
        IN_CHANGELOG=1
        continue
    fi
    # Stop after bullets
    if [[ $IN_CHANGELOG -eq 1 && "$line" =~ ^###\  ]]; then
        IN_CHANGELOG=0
        APPEND_MEDIA=1
        continue
    fi

    # in change log
    if [[ $IN_CHANGELOG -eq 1 && "$line" =~ ^- ]]; then
        echo "$line" >> "$TMP_FILE"
    fi

    # and all media
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
if [[ -f "$OUTPUT_FILE" ]]; then
    {
        cat "$TMP_FILE"
        echo ""
        cat "$OUTPUT_FILE"
    } > "${OUTPUT_FILE}.tmp"
    mv "${OUTPUT_FILE}.tmp" "$OUTPUT_FILE"
else
    mv "$TMP_FILE" "$OUTPUT_FILE"
fi

rm -f "$TMP_FILE"
echo "✅ Added version $VERSION to the top of $OUTPUT_FILE"

