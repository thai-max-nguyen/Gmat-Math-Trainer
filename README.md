# GMAT Focus Trainer

> **1,750 questions · GMAT Focus 2026 · Zero setup · Runs in your browser**

A no-fluff GMAT prep tool built for people who want to drill seriously. No login, no subscription, no tracking — just you and 1,750 hand-curated questions in a Duolingo-style interface that actually makes it enjoyable.

---

## Why this exists

Every GMAT prep product gates its best content behind paywalls. The free tiers are too thin to build real skill. Paid tools are great but overkill for targeted drilling.

This trainer gives you:
- **All 5 GMAT Focus question types** — PS, DS, CR, RC, DI (including Graph Interpretation, Table Analysis, Multi-Source Reasoning)
- **Accurate exam simulation** — same timing and question count as the official test
- **Spaced repetition** that actually surfaces your weak spots
- **Zero backend** — everything runs in your browser from a single HTML file

---

## Features

### Question Bank
- **1,750 questions** across all GMAT Focus 2026 question types
- Problem Solving (PS) · Data Sufficiency (DS) · Critical Reasoning (CR) · Reading Comprehension (RC)
- Graph Interpretation (GI) · Table Analysis (TA) · Multi-Source Reasoning (MSR)
- Difficulty tags: easy / medium / hard
- Legacy types (SC, Geometry) available but flagged as non-GMAT Focus

### Exam Simulation
- **Full test**: Quant (37Q / 70 min) → Verbal (23Q / 45 min) → DI (20Q / 45 min)
- **Section drills**: target individual sections at official timing
- Section break screen between sections — same flow as the real exam
- Real-time section progress header with question counter + timer
- **DI Warmup**: 3-question primer before diving into Data Insights

### Study Phase System
```
Foundation  →  Core  →  Speed
<50 Qs or      <200 Qs   200+ Qs AND
<50% acc        <70% acc  70%+ acc
```
Phase banner shows where you are, what to focus on, and your trajectory.

### Smart Practice Modes
| Mode | What it does |
|------|-------------|
| Random | Any matching question |
| Weak areas | Biased toward your lowest-accuracy topics |
| Missed (SR) | Leitner spaced repetition: resurfaces after 1→3→7→14→30 days |
| Unseen first | Fresh questions you haven't tried |

### After You Answer
- Full explanation with step-by-step solution
- **Question-specific hint** — strategic nudge without spoiling the answer
- **Theory modal** with per-question explanation panel
- Error tagging: 😅 Careless · 📚 Conceptual · ⏱ Timing · 🔍 Misread
- Personal annotation / note per question
- Flag for review

### Dashboard
- Session stats: streak, XP, accuracy, time per question
- Topic-level weak area heatmap
- Score predictor (updates after 15+ answers)
- 7-day accuracy trend
- Error journal: review every wrong answer with your tags and notes
- Momentum card

### UX Details
- Dark / light theme
- Keyboard shortcuts (1–5 select, Enter submit, S skip, N next, H hint)
- Collapsible advanced filters — clean by default, power features one tap away
- 2-minute timer per question (amber at 1:30, red at 0:00)
- Minimal interface: only what you need visible by default

---

## Run it

**Option 1: Open directly**
```bash
open index.html
```
No server needed. Works in any modern browser.

**Option 2: Serve locally**
```bash
npm install
npm run serve   # http://localhost:4173
```

No build step. No environment variables. No API keys.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1`–`5` | Select answer A–E |
| `Enter` | Submit answer |
| `S` | Skip question |
| `N` | Next question |
| `H` | Show hint |

---

## Question Format

Questions live in `data/questions.js`:

```js
{
  id: 1,
  type: 'PS',            // PS | DS | CR | RC | GI | TA | MSR
  topic: 'Algebra',
  subtopic: 'Linear Equations',
  difficulty: 'medium',  // easy | medium | hard
  question: 'If 3x + 2 = 11, what is x?',
  choices: ['A) 2', 'B) 3', 'C) 4', 'D) 5', 'E) 6'],
  answer: 'B',
  explanation: 'Subtract 2 from both sides: 3x = 9, so x = 3.',
  hint: 'Isolate x by undoing operations in reverse order.'
}
```

Table Analysis questions use `|`-delimited content that renders as an HTML table automatically.

To add questions: append to the `QUESTIONS` array. IDs must be unique integers.

---

## Storage

All progress lives in `localStorage` under key `gmat-trainer-v2`. To reset: click **Reset all progress** on the Dashboard tab, or clear browser storage.

---

## Mobile (iOS Safari / Chrome on iPhone)

The trainer is responsive from iPhone SE (375px) through iPad and desktop. Mobile layer lives in `mobile.css` and activates at `≤ 600px`.

Key mobile patterns:
- **Single-row header** — brand + level + compact stat pills + theme/sound toggle, with `safe-area-inset` for the notch.
- **Bottom-sheet filter drawer** — the sidebar (filters + mode + exam-mode CTA) is hidden by default and opens via the "Filters & Mode" button. The question card is the first thing the user sees on Practice.
- **Horizontally-scrollable tab bar** — main tabs and review sub-tabs scroll when there are too many to fit.
- **Touch targets** — main CTAs ≥ 44 px (Apple HIG); icon buttons ≥ 36 px.
- **Bottom-sheet modals** — exam-simulation, formula sheet, and other modals slide up from the bottom on phones, respecting the home-indicator safe area.
- **Float-friendly mascot** — Quill shrinks and moves out of choice-tap zones; auto-hides while the drawer is open.

To extend mobile rules, edit `mobile.css` (loaded after `styles.css`). Use `@media (max-width: 600px)` for the phone breakpoint and `@media (max-width: 380px)` for the iPhone SE / mini range.

## Tests

Playwright E2E suite — desktop + mobile:

```bash
npm test                                # full suite (desktop + mobile)
npx playwright test --project=desktop   # desktop only
npx playwright test --project=mobile    # iPhone 13 Pro emulation only
npm run test:mobile                     # shortcut for the mobile project
```

Mobile suite (`tests/mobile.spec.js`) pins layout invariants on a chromium-rendered iPhone 13 Pro viewport (390 × 844 @ DPR 3): no horizontal overflow, header height, tap-target heights, modal width, and drawer behaviour.

---

## Tech Stack

- Vanilla JavaScript — no framework, no bundler
- Single HTML file + CSS + JS module
- `localStorage` for all persistence
- Playwright for E2E testing

The entire app is ~5,000 lines of vanilla JS. Zero runtime dependencies.

---

## Contributing

PRs welcome.

Good starting points:
- Adding questions (follow the format above)
- Theory notes in `data/theories.js`
- UI improvements
- More test coverage

---

## License

MIT

---

*Built for GMAT Focus 2026 prep. Not affiliated with GMAC.*
