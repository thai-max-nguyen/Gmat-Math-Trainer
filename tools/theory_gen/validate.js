#!/usr/bin/env node
// validate.js <id> <raw_file>  →  prints validated JSON to stdout, exits 0 on success
const fs = require('fs');

const id = parseInt(process.argv[2], 10);
const file = process.argv[3];
if (!Number.isInteger(id) || !file) {
  console.error('usage: validate.js <id> <raw_file>'); process.exit(2);
}
let raw = fs.readFileSync(file, 'utf8').trim();

// Strip markdown fences if present
raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();

// Try to locate first { and last } if there's chatter
if (!raw.startsWith('{')) {
  const i = raw.indexOf('{');
  if (i === -1) { console.error('no JSON object found'); process.exit(1); }
  raw = raw.slice(i);
}
if (!raw.endsWith('}')) {
  const j = raw.lastIndexOf('}');
  if (j === -1) { console.error('no JSON terminator'); process.exit(1); }
  raw = raw.slice(0, j + 1);
}

let parsed;
try { parsed = JSON.parse(raw); }
catch (e) { console.error('JSON parse error:', e.message); process.exit(1); }

const errs = [];
const isStr = v => typeof v === 'string' && v.trim().length > 0;
const isStrArr = v => Array.isArray(v) && v.length > 0 && v.every(isStr);

if (!isStr(parsed.hint)) errs.push('hint missing/empty');
const t = parsed.theory;
if (!t || typeof t !== 'object') errs.push('theory missing');
else {
  if (!isStr(t.title)) errs.push('theory.title missing');
  if (!isStr(t.icon)) errs.push('theory.icon missing');
  if (!isStr(t.summary)) errs.push('theory.summary missing');
  if (!isStrArr(t.keyFacts) || t.keyFacts.length < 3) errs.push('theory.keyFacts < 3');
  if (!t.example || typeof t.example !== 'object') errs.push('theory.example missing');
  else {
    if (!isStr(t.example.problem)) errs.push('example.problem missing');
    if (!isStrArr(t.example.steps) || t.example.steps.length < 2) errs.push('example.steps < 2');
    if (!isStr(t.example.answer)) errs.push('example.answer missing');
  }
  if (!isStrArr(t.traps) || t.traps.length < 1) errs.push('theory.traps < 1');
  if (!isStrArr(t.solveSteps) || t.solveSteps.length < 2) errs.push('theory.solveSteps < 2');
}

if (errs.length) {
  console.error('validation failed:', errs.join('; '));
  process.exit(1);
}

// emit just { hint, theory } (no id key — the merge step keys by filename)
const out = { hint: parsed.hint.trim(), theory: parsed.theory };
process.stdout.write(JSON.stringify(out));
