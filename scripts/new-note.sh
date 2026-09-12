#!/usr/bin/env bash
# Add a new field note under an existing section/group.
#
# Usage: scripts/new-note.sh <section> <group> <slug>
#   section - matches a note's `section:` front matter (e.g. robotics, vision)
#   group   - matches a note's `group:` front matter; must already be listed for this
#             section in _data/note_groups.yml, or the note won't get a heading
#   slug    - the last path segment for the new note's permalink
#
# Writes _templates/note.md to <section>/<group-ish-path>/<slug>/index.md. This only
# creates a new file - it never edits an existing one.

set -euo pipefail

if [ $# -ne 3 ]; then
  echo "usage: $0 <section> <group> <slug>" >&2
  exit 1
fi

SECTION="$1"
GROUP="$2"
SLUG="$3"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TEMPLATE="$ROOT/_templates/note.md"
NOTE_GROUPS="$ROOT/_data/note_groups.yml"

KNOWN_GROUP=$(ruby -ryaml -rdate -e "
doc = YAML.safe_load(File.read('$NOTE_GROUPS'), permitted_classes: [Date, Time]) || {}
groups = doc['$SECTION'] || []
puts(groups.any? { |g| g['id'] == '$GROUP' } ? 'yes' : 'no')
")
if [ "$KNOWN_GROUP" = "no" ]; then
  echo "warning: '$GROUP' is not listed under '$SECTION' in _data/note_groups.yml — the note" >&2
  echo "will render but won't get a heading until you add it there." >&2
fi

PAGE_DIR="$ROOT/${SECTION}/${GROUP}/${SLUG}"
PAGE_FILE="$PAGE_DIR/index.md"

if [ -f "$PAGE_FILE" ]; then
  echo "error: $PAGE_FILE already exists" >&2
  exit 1
fi

PERMALINK="/${SECTION}/${GROUP}/${SLUG}/"

mkdir -p "$PAGE_DIR"
sed \
  -e "s#REPLACE/SECTION/GROUP/SLUG#${PERMALINK#/}#g" \
  -e "s#REPLACE_SECTION#${SECTION}#g" \
  -e "s#REPLACE_GROUP#${GROUP}#g" \
  "$TEMPLATE" > "$PAGE_FILE"

echo "Wrote $PAGE_FILE from $TEMPLATE."
echo "Fill in title/description/date/date_label/category/order/body, then confirm"
echo "'$GROUP' is listed under '$SECTION' in _data/note_groups.yml so it gets a heading."
