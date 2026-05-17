#!/usr/bin/env bash
# Run all ids in /tmp/gmat_500_ids.txt through gen_one.sh with parallelism.
# Usage: run_batch.sh [parallelism] [start_offset]
set -u
PAR="${1:-10}"
OFFSET="${2:-0}"
ROOT="/Users/lap15964/Documents/gmat-math-trainer"
IDS_FILE="/tmp/gmat_500_ids.txt"

if [[ ! -f "$IDS_FILE" ]]; then
  echo "Missing $IDS_FILE — run sample_ids.js first" >&2
  exit 1
fi

total=$(wc -l < "$IDS_FILE" | tr -d ' ')
echo "Running $total ids with parallelism=$PAR offset=$OFFSET" >&2

tail -n +$((OFFSET + 1)) "$IDS_FILE" | \
  xargs -P "$PAR" -I {} "$ROOT/tools/theory_gen/gen_one.sh" {}

ok=$(ls /tmp/gmat_theories/ok/ 2>/dev/null | wc -l | tr -d ' ')
fail=$(ls /tmp/gmat_theories/fail/ 2>/dev/null | wc -l | tr -d ' ')
echo "Done. ok=$ok fail=$fail" >&2
