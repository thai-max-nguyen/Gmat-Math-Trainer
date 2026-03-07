# GMAT Math Trainer (GMAT Club Flashcards 2025)

This is a small offline-friendly web app that turns the **GMAT Club Math Flashcards 2025** into an interactive trainer with:

- **Flashcard practice** with topic filters and study modes
- **Error tracking** (per-card attempts, correct / wrong counts, last seen)
- **Weak-card log** so you can focus on what you miss
- **Progress overview** (seen cards + overall accuracy)

All data is stored **locally in your browser** using `localStorage`. No sign-in, no server.

---

## How to run it

### Easiest: open the HTML file

1. Go to the `gmat-math-trainer` folder.
2. Double‑click `index.html` (or open it in Chrome/Edge/Safari).
3. Start practicing.

> If your browser blocks some features when opening from the filesystem, you can use a tiny local server instead (see below).

### Option 2: run a simple local server (Node)

If you have Node.js installed:

```bash
cd gmat-math-trainer
npx serve .
```

Then open the URL shown in your terminal (usually `http://localhost:3000` or `http://localhost:5000`).

---

## Study features

- **Study modes**
  - **Mixed**: all cards, with extra weight on ones you miss or haven’t seen.
  - **New only**: only cards you have never answered before.
  - **Weak only**: cards where your accuracy is low or you’ve missed them multiple times.

- **Topic filter**
  - Use the **Topic** dropdown on the left to restrict practice to a topic (e.g., `Word Problems • Compound Interest`, `Probability & Combinatorics • Enumeration Basics`, etc.).

- **Per-card controls**
  - **Show answer / Hide answer**: flip the card.
  - **I was right / I was wrong**: record the result; the trainer updates your stats and serves the next card.

- **Error log (weak cards)**
  - The **Error log** tab lists cards with low accuracy or at least one wrong attempt.
  - Click a row to jump directly to that card in practice mode.

- **All cards view**
  - The **All cards** tab shows every flashcard with a quick question preview and your current accuracy.

---

## Progress & error tracking

- Progress is stored in `localStorage` under the key:

  - `gmat-math-trainer-progress-v1`

- For each flashcard, the app tracks:
  - **attempts**
  - **correct**
  - **wrong**
  - **lastSeen** (date)

- The header shows:
  - **Cards**: total number of flashcards loaded.
  - **Seen**: how many cards you’ve attempted at least once.
  - **Accuracy**: overall correct / attempts percentage.

- To **reset all history**, use the **Reset progress** button in the left sidebar.

> Resetting will clear all attempts and error logs but will not change the underlying flashcards.

---

## Editing / extending the deck

All flashcards are currently stored directly in `app.js` in the `FLASHCARDS` array.  
Each card looks like:

```js
{
  id: 1,
  topic: "Word Problems • Compound Interest",
  question: `Q. ...`,
  answer: `A. ...`
}
```

- You can:
  - **Add new cards** by appending to the `FLASHCARDS` array with a new `id`.
  - **Edit wording** of questions/answers if you want to tweak explanations.
  - **Add your own GMAT-style cards** (keep topics consistent so filters stay useful).

After editing, just refresh the page.

---

## Notes

- The content is adapted from your `GMAT-Club-Math-Flashcards-2025.pdf`.
- No data leaves your machine — it’s 100% local.
- You can back up your progress by exporting the `localStorage` key from your browser dev tools if desired.

