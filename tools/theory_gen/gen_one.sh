#!/usr/bin/env bash
# Generate theory JSON for ONE question id via claude CLI.
# Usage: gen_one.sh <id>
# Writes raw stdout to /tmp/gmat_theories/raw/<id>.json
# Writes validated entry to /tmp/gmat_theories/ok/<id>.json
# On failure, writes /tmp/gmat_theories/fail/<id>.txt with the error.

set -u
ID="$1"
ROOT="/Users/lap15964/Documents/gmat-math-trainer"
WD="/tmp/gmat_theories"
mkdir -p "$WD/raw" "$WD/ok" "$WD/fail" "$WD/prompt"

OK_FILE="$WD/ok/${ID}.json"
if [[ -f "$OK_FILE" ]]; then
  exit 0  # already done
fi

# Build prompt — read question, embed JSON, give schema + examples
PROMPT_FILE="$WD/prompt/${ID}.txt"
node "$ROOT/tools/theory_gen/build_prompt.js" "$ID" > "$PROMPT_FILE" 2>"$WD/fail/${ID}.txt"
if [[ ! -s "$PROMPT_FILE" ]]; then
  echo "prompt build failed" >> "$WD/fail/${ID}.txt"
  exit 1
fi

# Run claude --print, single turn, sonnet 4.6 — accept stdin
RAW="$WD/raw/${ID}.json"
ATTEMPT=1
while [[ $ATTEMPT -le 2 ]]; do
  claude --print --model claude-sonnet-4-6 --output-format text < "$PROMPT_FILE" > "$RAW" 2>>"$WD/fail/${ID}.txt"
  RC=$?
  if [[ $RC -ne 0 ]]; then
    echo "claude rc=$RC attempt=$ATTEMPT" >> "$WD/fail/${ID}.txt"
    ATTEMPT=$((ATTEMPT+1))
    sleep 2
    continue
  fi
  # validate via node
  if node "$ROOT/tools/theory_gen/validate.js" "$ID" "$RAW" > "$OK_FILE" 2>>"$WD/fail/${ID}.txt"; then
    rm -f "$WD/fail/${ID}.txt"
    exit 0
  fi
  ATTEMPT=$((ATTEMPT+1))
done

rm -f "$OK_FILE"
exit 1
