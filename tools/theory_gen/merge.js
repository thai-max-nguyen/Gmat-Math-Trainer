#!/usr/bin/env node
// Merge all /tmp/gmat_theories/ok/<id>.json files into data/question_theories.js
// preserving the existing 10 migrated entries (ids 63-72).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const QTFILE = path.join(ROOT, 'data', 'question_theories.js');
const OK_DIR = '/tmp/gmat_theories/ok';

// 1. Load existing QUESTION_THEORIES by executing the module (robust vs. regex —
//    the data legitimately contains `});` substrings that broke a lazy match).
const existing = (() => {
  const src = fs.readFileSync(QTFILE, 'utf8');
  const Module = require('module');
  const m = new Module(QTFILE);
  m._compile(`${src}\nmodule.exports = { QUESTION_THEORIES };`, QTFILE);
  return { ...m.exports.QUESTION_THEORIES };
})();
console.error(`existing entries: ${Object.keys(existing).length}`);

// 2. Load all ok files
let added = 0;
let skipped = 0;
const files = fs.readdirSync(OK_DIR).filter(f => f.endsWith('.json'));
for (const f of files) {
  const id = path.basename(f, '.json');
  if (existing[id]) { skipped++; continue; }
  try {
    const obj = JSON.parse(fs.readFileSync(path.join(OK_DIR, f), 'utf8'));
    existing[id] = obj;
    added++;
  } catch (e) {
    console.error(`parse fail ${f}:`, e.message);
  }
}
console.error(`added: ${added}, skipped (already had): ${skipped}, total now: ${Object.keys(existing).length}`);

// 3. Sort keys numerically for nicer file output
const sorted = {};
const ids = Object.keys(existing).map(n => parseInt(n, 10)).filter(Number.isInteger).sort((a, b) => a - b);
for (const id of ids) sorted[id] = existing[id];

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
//
//  Generated via batched Claude CLI (Sonnet 4.6) + 10 hand-authored seed entries
//  (ids 63-72) which serve as the quality benchmark for tone & structure.
// ════════════════════════════════════════════════════════════════

const QUESTION_THEORIES = ${JSON.stringify(sorted, null, 2)};

if (typeof window !== 'undefined') {
  window.QUESTION_THEORIES = QUESTION_THEORIES;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_THEORIES };
}
`;
fs.writeFileSync(QTFILE, header);
const stat = fs.statSync(QTFILE);
console.error(`Wrote ${QTFILE} — ${(stat.size/1024).toFixed(1)} KB, ${ids.length} entries`);
