// Smoke test: per-question theory table is loaded and resolveTheory merges correctly.
const { test, expect } = require('@playwright/test');
const BASE = 'http://localhost:4173';

test.describe('Per-question theory table', () => {
  test('window.QUESTION_THEORIES loaded with >= 500 entries', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('#q-question');
    const count = await page.evaluate(() => {
      const t = window.QUESTION_THEORIES || {};
      return Object.keys(t).length;
    });
    expect(count).toBeGreaterThanOrEqual(500);
  });

  test('5 sample ids have full theory schema via resolveTheory', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('#q-question');
    const results = await page.evaluate(() => {
      const ids = Object.keys(window.QUESTION_THEORIES).map(n => parseInt(n, 10));
      // sample 5 deterministically
      const sample = [ids[0], ids[Math.floor(ids.length/4)], ids[Math.floor(ids.length/2)], ids[Math.floor(3*ids.length/4)], ids[ids.length-1]];
      return sample.map(id => {
        const q = (window.GMAT_QUESTIONS || []).find(x => x.id === id);
        if (!q) return { id, error: 'question not in bank' };
        const t = window.resolveTheory(q);
        return {
          id,
          title: t && t.title,
          summaryLen: t && t.summary ? t.summary.length : 0,
          keyFactsLen: t && Array.isArray(t.keyFacts) ? t.keyFacts.length : 0,
          stepsLen: t && t.example && Array.isArray(t.example.steps) ? t.example.steps.length : 0,
          trapsLen: t && Array.isArray(t.traps) ? t.traps.length : 0,
          solveStepsLen: t && Array.isArray(t.solveSteps) ? t.solveSteps.length : 0,
          hint: window.QUESTION_THEORIES[id].hint && window.QUESTION_THEORIES[id].hint.length > 0,
        };
      });
    });
    console.log('Sample theory check:', JSON.stringify(results, null, 2));
    for (const r of results) {
      expect(r.title, `id ${r.id} title`).toBeTruthy();
      expect(r.summaryLen).toBeGreaterThan(20);
      expect(r.keyFactsLen).toBeGreaterThanOrEqual(3);
      expect(r.stepsLen).toBeGreaterThanOrEqual(2);
      expect(r.trapsLen).toBeGreaterThanOrEqual(1);
      expect(r.solveStepsLen).toBeGreaterThanOrEqual(2);
      expect(r.hint).toBe(true);
    }
  });

  test('migrated id 65 (gold standard) preserved', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('#q-question');
    const r = await page.evaluate(() => {
      const q = window.GMAT_QUESTIONS.find(x => x.id === 65);
      const t = window.resolveTheory(q);
      return { title: t.title, hint: window.QUESTION_THEORIES[65].hint };
    });
    expect(r.title).toContain('Harmonic Mean');
    expect(r.hint).toContain('HARMONIC');
  });
});
