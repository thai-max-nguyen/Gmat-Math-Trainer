#!/usr/bin/env node
// Pick ~500 question ids distributed across topic + difficulty.
// Skips DI types (TPA, TA, GI, MSR). Keeps only PS + DS.
// Skips ids 63-72 (locked manual benchmarks).
// Output: writes /tmp/gmat_500_ids.txt (one id per line) + prints stats to stderr.

const fs = require('fs');
const path = require('path');

const QFILE = path.join(__dirname, '..', '..', 'data', 'questions.js');
const src = fs.readFileSync(QFILE, 'utf8');
globalThis.window = {};
const Module = require('module');
const m = new Module(QFILE);
m._compile(`${src}\nmodule.exports = { QUESTIONS };`, QFILE);
const { QUESTIONS } = m.exports;

const LOCKED = new Set([63, 64, 65, 66, 67, 68, 69, 70, 71, 72]);
const QUANT_TYPES = new Set(['PS', 'DS']);
const TARGET = 500;

const eligible = QUESTIONS.filter(q =>
  QUANT_TYPES.has(q.type) && !LOCKED.has(q.id)
);
console.error(`Eligible quant (PS+DS, ex locked): ${eligible.length}`);

// Stratify by (type × topic × difficulty), allocate proportionally
const buckets = new Map();
for (const q of eligible) {
  const key = `${q.type}|${q.topic}|${q.difficulty || 'medium'}`;
  if (!buckets.has(key)) buckets.set(key, []);
  buckets.get(key).push(q);
}

// proportional allocation
const totalElig = eligible.length;
const picks = [];
const allocations = [];
for (const [key, arr] of buckets) {
  const share = (arr.length / totalElig) * TARGET;
  const take = Math.max(1, Math.round(share));
  allocations.push({ key, n: arr.length, take });
}
// fix rounding so total = TARGET
let allocSum = allocations.reduce((s, a) => s + a.take, 0);
allocations.sort((a, b) => b.n - a.n);
let i = 0;
while (allocSum > TARGET) {
  if (allocations[i].take > 1) { allocations[i].take--; allocSum--; }
  i = (i + 1) % allocations.length;
}
i = 0;
while (allocSum < TARGET) {
  allocations[i].take++; allocSum++;
  i = (i + 1) % allocations.length;
}

// deterministic shuffle (seeded) per bucket so re-runs produce same sample
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260513);

for (const { key, take } of allocations) {
  const arr = buckets.get(key).slice();
  // Fisher-Yates seeded
  for (let j = arr.length - 1; j > 0; j--) {
    const k = Math.floor(rand() * (j + 1));
    [arr[j], arr[k]] = [arr[k], arr[j]];
  }
  for (const q of arr.slice(0, Math.min(take, arr.length))) picks.push(q);
}

// trim/pad to exact target
const seen = new Set(picks.map(q => q.id));
if (picks.length < TARGET) {
  for (const q of eligible) {
    if (picks.length >= TARGET) break;
    if (!seen.has(q.id)) { picks.push(q); seen.add(q.id); }
  }
}
const final = picks.slice(0, TARGET);

// stats
const byType = {};
const byTopic = {};
for (const q of final) {
  byType[q.type] = (byType[q.type] || 0) + 1;
  byTopic[q.topic] = (byTopic[q.topic] || 0) + 1;
}
console.error(`Selected ${final.length} ids`);
console.error(`  by type:`, byType);
console.error(`  by topic:`, byTopic);

const out = final.map(q => q.id).join('\n') + '\n';
fs.writeFileSync('/tmp/gmat_500_ids.txt', out);
console.error(`Wrote /tmp/gmat_500_ids.txt`);
