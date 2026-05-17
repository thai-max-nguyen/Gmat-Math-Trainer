#!/usr/bin/env node
// build_prompt.js <id>  →  prints prompt text to stdout
const fs = require('fs');
const path = require('path');

const id = parseInt(process.argv[2], 10);
if (!Number.isInteger(id)) { console.error('usage: build_prompt.js <id>'); process.exit(2); }

const QFILE = path.join(__dirname, '..', '..', 'data', 'questions.js');
const src = fs.readFileSync(QFILE, 'utf8');
globalThis.window = {};
const Module = require('module');
const m = new Module(QFILE);
m._compile(`${src}\nmodule.exports = { QUESTIONS };`, QFILE);
const { QUESTIONS } = m.exports;
const q = QUESTIONS.find(x => x.id === id);
if (!q) { console.error('id not found:', id); process.exit(2); }

// Slimmed question payload — exclude inline theory if any
const payload = {
  id: q.id, type: q.type, topic: q.topic, subtopic: q.subtopic,
  difficulty: q.difficulty,
  question: q.question, choices: q.choices, answer: q.answer,
  explanation: q.explanation,
};

const prompt = `You are writing per-question theory for a GMAT Quant trainer app.

Output STRICT JSON (no markdown fence, no commentary) matching exactly this schema:
{
  "hint": "single-line strategic nudge under 160 chars — never reveal which letter is correct",
  "theory": {
    "title": "Short title naming the concept, e.g. 'Average Speed — Harmonic Mean'",
    "icon": "one emoji or unicode glyph like '⚖' '🚂' '∑'",
    "summary": "1-2 sentence intuition. Appears as the wrong-answer snippet.",
    "keyFacts": ["4-6 formulas / rules / insights, one per item, terse"],
    "example": {
      "problem": "the actual question paraphrased compactly",
      "steps": ["3-6 derivation steps, each short"],
      "answer": "the final answer text"
    },
    "traps": ["2-4 common mistakes / sucker answers"],
    "solveSteps": ["3-5 numbered decision-procedure steps like '1. ...'"]
  }
}

Quality bar — match this gold-standard tone (from question id 65, avg speed):
{"hint":"Same distance each leg → use HARMONIC mean: 2ab/(a+b). NOT (a+b)/2 — that is the trap.","theory":{"title":"Average Speed — Harmonic Mean","icon":"⚖","summary":"Average speed ≠ average of speeds. Slower leg eats more time → average pulled toward slower speed. Equal distance → harmonic mean.","keyFacts":["Avg speed = total distance / total time (ALWAYS)","Equal distance both legs → Avg = 2ab / (a + b)  (harmonic mean)","Equal time both legs → Avg = (a + b) / 2  (arithmetic mean)","Round trip = equal distance → harmonic mean ALWAYS applies","Harmonic mean < arithmetic mean — answer pulled toward slower speed"],"example":{"problem":"Out at 6 mph, back at 4 mph, same path. Avg speed for round trip?","steps":["Pick distance d = 12 mi each leg (any number works — it cancels)","Time out = 12/6 = 2 hr","Time back = 12/4 = 3 hr","Total: 24 mi / 5 hr = 4.8 mph","Shortcut: 2(6)(4)/(6+4) = 48/10 = 4.8 ✓"],"answer":"4.8 mph"},"traps":["(6+4)/2 = 5 mph — WRONG. Arithmetic mean only applies if TIMES are equal","Answer must be between the two speeds, closer to slower one","Same path / round trip = same distance, even if not said explicitly"],"solveSteps":["1. Ask: what is equal — distance or time?","2. Equal distance → harmonic mean  2ab/(a+b)","3. Equal time → arithmetic mean  (a+b)/2","4. Sanity: result lies between a and b, pulled toward slower"]}}

Rules:
- Theory should teach the CONCEPT, not just re-narrate this specific question. example.problem may paraphrase it.
- For DS questions: hint should remind the solver to ask "is statement alone sufficient?" without revealing C/B/D/A/E. Theory should be about the underlying math + DS decision flow.
- example.answer for DS = "X" where X is one of A,B,C,D,E with a 1-sentence WHY (e.g. "B — statement 2 pins the value, statement 1 leaves a range").
- Never reveal the letter answer in 'hint' or 'summary'.
- Output ONLY the JSON object, starting with { and ending with }. No markdown, no preamble.

Question to write theory for:
${JSON.stringify(payload, null, 2)}
`;

process.stdout.write(prompt);
