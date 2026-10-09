#!/usr/bin/env bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THIS_SCRIPT="$(basename "${BASH_SOURCE[0]}")"
GREEN='\033[0;32m'; NC='\033[0m'

PRIORITY_ORDER=("dev" "update" "distribution")

mapfile -t all_scripts < <(find "$SCRIPT_DIR" -type f \( -name "*.sh" -o -name "*.js" \) ! -name "$THIS_SCRIPT" | sort)

for script in "${all_scripts[@]}"; do
  if [[ "$script" == *.sh ]] && [[ ! -x "$script" ]]; then
    chmod +x "$script"
  fi
done

echo -e "${GREEN}/////////////////////////////////////////////////////////////////${NC}"

if [[ ${#all_scripts[@]} -eq 0 ]]; then
  echo "no scripts found in $SCRIPT_DIR."
  exit 0
fi

declare -A folder_scripts
root_scripts=()
found_folders=()

for script in "${all_scripts[@]}"; do
  rel="${script#"$SCRIPT_DIR"/}"
  if [[ "$rel" == */* ]]; then
    folder="${rel%%/*}"
    if [[ -z "${folder_scripts[$folder]:-}" ]]; then
      found_folders+=("$folder")
    fi
    folder_scripts["$folder"]+="$script"$'\n'
  else
    root_scripts+=("$script")
  fi
done

other_folders=()
for f in "${found_folders[@]}"; do
  is_priority=false
  for pf in "${PRIORITY_ORDER[@]}"; do
    [[ "$f" == "$pf" ]] && is_priority=true && break
  done
  $is_priority || other_folders+=("$f")
done
if [[ ${#other_folders[@]} -gt 0 ]]; then
  mapfile -t other_folders < <(printf "%s\n" "${other_folders[@]}" | sort)
fi

ordered_folders=()
for f in "${PRIORITY_ORDER[@]}"; do
  [[ -n "${folder_scripts[$f]:-}" ]] && ordered_folders+=("$f")
done
if [[ ${#other_folders[@]} -gt 0 ]]; then
  ordered_folders+=("${other_folders[@]}")
fi

numbered_scripts=()
n=1

for folder in "${ordered_folders[@]}"; do
  [[ -z "$folder" ]] && continue
  echo -e "${GREEN}${folder} scripts ${NC}"
  while IFS= read -r script; do
    [[ -z "$script" ]] && continue
    printf "  %2d) %s\n" "$n" "$(basename "$script")"
    numbered_scripts+=("$script")
    n=$((n + 1))
  done <<< "${folder_scripts[$folder]}"
  echo ""
done

if [[ ${#root_scripts[@]} -gt 0 ]]; then
  echo -e "${GREEN}ungrouped scripts ${NC}"
  for script in "${root_scripts[@]}"; do
    printf "  %2d) %s\n" "$n" "$(basename "$script")"
    numbered_scripts+=("$script")
    n=$((n + 1))
  done
  echo ""
fi

read -p "enter a script to run it (or press Enter to cancel): " selection

if [[ "$selection" =~ ^[0-9]+$ ]] && [ "$selection" -ge 1 ] && [ "$selection" -le "${#numbered_scripts[@]}" ]; then
  target="${numbered_scripts[$((selection - 1))]}"

  echo -e "${GREEN}/////////////////////////////////////////////////////////////////${NC}"
  echo -e "$(basename "$target")...\n"

  if [[ "$target" == *.js ]]; then
    node "$target"
  else
    bash "$target"
  fi
else
  echo -e "${GREEN}/////////////////////////////////////////////////////////////////${NC}"
fi