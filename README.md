# GMAT Math Trainer

A focused, local-first GMAT Quant practice app. No backend, no auth, no tracking — everything lives in your browser.

## What's inside

- **160+ hand-curated questions** across Problem Solving (PS) and Data Sufficiency (DS)
- Topics: Arithmetic, Algebra, Geometry, Word Problems, Statistics, Combinatorics, Probability, Sequences
- Difficulty tags: easy / medium / hard
- Per-question 2-minute timer (turns yellow at 1:30, red at 2:00)
- Multiple-choice with reveal-on-submit, explanation, and correct answer highlight
- Session and lifetime stats with topic-level weak-area detection
- Simple Leitner-style spaced repetition (missed questions resurface)
- Dark and light themes
- Keyboard shortcuts

## Run it

```bash
cd ~/Documents/Gmat-Math-Trainer
npm run serve   # opens on http://localhost:4173
```

Or just open `index.html` directly in your browser — no build step.

## Keyboard shortcuts

| Key       | Action                  |
|-----------|-------------------------|
| `1`–`5`   | Select answer choice A–E |
| `Enter`   | Submit answer            |
| `S`       | Skip                     |
| `N`       | Next question            |

## Modes

In the **Mode** filter:

- **Random** — pick any matching question
- **Weak areas** — biased toward questions you got wrong most often
- **Missed (SR)** — spaced-repetition queue: surfaces wrong answers after 1 day, then 3 / 7 / 14 / 30 days
- **Unseen first** — questions you haven't tried yet

## Data

Everything is in `data/questions.js`. Each entry:

```js
{
  id: 1,
  type: 'PS',                     // 'PS' or 'DS'
  topic: 'Arithmetic',
  subtopic: 'Percents',
  difficulty: 'easy',             // 'easy' | 'medium' | 'hard'
  question: '…',
  choices: ['…', '…', …],         // 5 choices (DS uses standard A–E set)
  answer: 'C',                    // letter
  explanation: '…'
}
```

To add questions: append to `QUESTIONS` array. IDs must be unique; use the next integer.

## Storage

Progress, attempt log, daily counts, and theme are persisted to `localStorage` under the key `gmat-trainer-v2`. To reset, click **Reset all progress** on the Dashboard tab, or clear browser storage.

## Legacy

The original Supabase-backed multi-page version is preserved in `legacy/`. It is no longer wired up.

## License

MIT — do whatever.
