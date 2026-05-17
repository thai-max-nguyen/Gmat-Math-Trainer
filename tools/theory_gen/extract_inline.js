#!/usr/bin/env node
// Extract the 10 inline {hint, theory} objects from questions.js for ids 63-72,
// write them to question_theories.js, and produce a stripped questions.js
// with those keys removed (preserving formatting / line layout as much as possible).

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const QFILE = path.join(ROOT, 'data', 'questions.js');
const QTFILE = path.join(ROOT, 'data', 'question_theories.js');

// 1. Load the bank via eval (file uses const QUESTIONS = [...] then no export)
const src = fs.readFileSync(QFILE, 'utf8');
globalThis.window = {};
const wrapped = `${src}\nmodule.exports = { QUESTIONS, DS_CHOICES };`;
const Module = require('module');
const m = new Module(QFILE);
m._compile(wrapped, QFILE);
const { QUESTIONS } = m.exports;
console.error(`Loaded ${QUESTIONS.length} questions.`);

const TARGET_IDS = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72];
const table = {};
for (const id of TARGET_IDS) {
  const q = QUESTIONS.find(x => x.id === id);
  if (!q) throw new Error(`missing id ${id}`);
  const entry = {};
  if (q.hint) entry.hint = q.hint;
  if (q.theory) entry.theory = q.theory;
  table[id] = entry;
}

// 2. Write question_theories.js (initial — will be appended to by generator)
const header = `// ════════════════════════════════════════════════════════════════
//  Per-question theory + hint table
//  Keyed by question id. Loaded BEFORE data/theories.js.
//  resolveTheory(q) in theories.js merges entry.theory over the topic theory.
//  generateHint(q) in app.js prefers entry.hint over q.hint.
//
//  Schema per entry:
//    {
//      hint?: 'one-line nudge',
//      theory?: { title, icon, summary, keyFacts[], example{problem,steps[],answer}, traps[], solveSteps[] }
//    }
// ════════════════════════════════════════════════════════════════

const QUESTION_THEORIES = ${JSON.stringify(table, null, 2)};

if (typeof window !== 'undefined') {
  window.QUESTION_THEORIES = QUESTION_THEORIES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_THEORIES };
}
`;
fs.writeFileSync(QTFILE, header);
console.error(`Wrote ${QTFILE} with ${Object.keys(table).length} migrated entries.`);

// 3. Produce stripped questions.js by removing hint: and theory: properties
//    from objects whose `id:` is in TARGET_IDS. Text-based but precise.
const lines = src.split('\n');
const out = [];

// We'll walk objects: each question entry starts with `{` line that contains nothing else after,
// or with `id: NN,` near top. Strategy: find ranges where `id: NN,` appears and the
// enclosing object, then remove `hint:` and `theory:` blocks via bracket counting.

// Simpler: find each `id: NN,` (NN in TARGET_IDS), then scan forward to remove
// the lines for `hint:` (one line) and `theory: { ... },` (multi-line, count braces).

const idRe = /^\s+id:\s*(\d+),/;
const targetSet = new Set(TARGET_IDS);
const linesToDelete = new Set();

for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(idRe);
  if (!m) continue;
  const id = parseInt(m[1], 10);
  if (!targetSet.has(id)) continue;
  // scan forward until the matching `},` of the question object
  // count opening braces from this point
  let depth = 0;
  let started = false;
  for (let j = i; j < lines.length; j++) {
    const line = lines[j];
    // First brace seen on or before line i is the question's `{` — find it
    // We can find object end by depth = 0 again after opening, but starting from `id:` line
    // is mid-object. So let's find the question's outer { by going back.
    // Easier: track depth from i forward, treating { we encounter as opens; when net depth -1 → outer close.
    // But initial line `id:` is at outer-depth = 1 inside the object already.
    // Use a relative count: assume depth-after = 1 at start of line i.
    if (j === i) {
      depth = 1; // we're inside the question object
    }
    // count braces in this line
    for (const ch of line) {
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    if (depth === 0) {
      // Question object ends at line j. Now we have the range [i..j]
      const qStart = i;
      const qEnd = j;
      // strip `hint:` single-line entries and `theory: { ... },` blocks
      for (let k = qStart; k <= qEnd; k++) {
        const ln = lines[k];
        if (/^\s+hint:\s*['"]/.test(ln) && ln.trim().endsWith(',')) {
          linesToDelete.add(k);
        } else if (/^\s+theory:\s*\{/.test(ln)) {
          // multi-line: walk braces until close
          let d = 0;
          for (let k2 = k; k2 <= qEnd; k2++) {
            const l2 = lines[k2];
            for (const ch of l2) {
              if (ch === '{') d++;
              else if (ch === '}') d--;
            }
            linesToDelete.add(k2);
            if (d === 0) {
              break;
            }
          }
        }
      }
      i = qEnd; // advance outer loop past this object
      break;
    }
  }
}

for (let i = 0; i < lines.length; i++) {
  if (!linesToDelete.has(i)) out.push(lines[i]);
}
const newSrc = out.join('\n');
fs.writeFileSync(QFILE, newSrc);
console.error(`Stripped questions.js — removed ${linesToDelete.size} lines from ${TARGET_IDS.length} objects.`);
console.error(`questions.js: ${src.length} → ${newSrc.length} bytes`);
