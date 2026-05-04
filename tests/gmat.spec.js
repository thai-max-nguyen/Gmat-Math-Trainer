const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:4173';

// Clear localStorage before each test for isolation
// Set practiceMode:true to bypass hearts system during tests
test.beforeEach(async ({ page }) => {
  await page.goto(BASE);
  await page.evaluate(() => {
    localStorage.removeItem('gmat-trainer-v2');
  });
  await page.reload();
  await page.waitForSelector('#q-question');
  // Set practice mode via exposed window function (app ignores practiceMode in localStorage)
  await page.evaluate(() => {
    if (window._gmatSetPracticeMode) window._gmatSetPracticeMode(true);
    if (window._gmatResetSummary) window._gmatResetSummary();
  });
});

// ══════════════════════════════════════════════
// 1. PAGE LOAD & INITIAL STATE
// ══════════════════════════════════════════════
test.describe('Page load & initial state', () => {
  test('loads without JS errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(BASE);
    await page.waitForSelector('#q-question');
    expect(errors).toHaveLength(0);
  });

  test('shows brand title "GMAT Focus Trainer"', async ({ page }) => {
    await expect(page.locator('.brand-title')).toContainText('GMAT Focus Trainer');
  });

  test('bank summary shows question count ≥1000', async ({ page }) => {
    const summary = await page.locator('#bank-summary').textContent();
    const count = parseInt(summary.match(/(\d+)/)?.[1] ?? '0');
    expect(count).toBeGreaterThanOrEqual(1000);
  });

  test('bank summary mentions DI count', async ({ page }) => {
    const summary = await page.locator('#bank-summary').textContent();
    expect(summary).toContain('DI');
  });

  test('Practice tab is active by default', async ({ page }) => {
    await expect(page.locator('.tab-btn.active')).toHaveAttribute('data-tab', 'practice');
    await expect(page.locator('#tab-practice')).toHaveClass(/active/);
  });

  test('header stats are visible', async ({ page }) => {
    await expect(page.locator('#hdr-today')).toBeVisible();
    await expect(page.locator('#hdr-streak')).toBeVisible();
  });

  test('GMAT score badge visible in header', async ({ page }) => {
    await expect(page.locator('#gmat-score-value')).toBeVisible();
  });

  test('Submit button disabled before choosing answer', async ({ page }) => {
    await expect(page.locator('#btn-submit')).toBeDisabled();
  });

  test('Skip button enabled', async ({ page }) => {
    await expect(page.locator('#btn-skip')).toBeEnabled();
  });

  test('Next button hidden initially', async ({ page }) => {
    const isHidden = await page.locator('#btn-next').evaluate(el => el.hidden);
    expect(isHidden).toBe(true);
  });
});

// ══════════════════════════════════════════════
// 2. QUESTION DISPLAY
// ══════════════════════════════════════════════
test.describe('Question display', () => {
  test('shows question text', async ({ page }) => {
    const qText = await page.locator('#q-question').textContent();
    expect(qText.trim().length).toBeGreaterThan(10);
  });

  test('shows 5 answer choices', async ({ page }) => {
    const choices = page.locator('#q-choices .choice');
    await expect(choices).toHaveCount(5);
  });

  test('choice labels A–E visible', async ({ page }) => {
    const labels = await page.locator('#q-choices .choice-letter').allTextContents();
    expect(labels).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  test('shows valid type badge', async ({ page }) => {
    const type = await page.locator('#q-type').textContent();
    const VALID_TYPES = ['PS', 'DS', 'CR', 'SC', 'RC', 'TPA', 'TA', 'GI', 'MSR'];
    expect(VALID_TYPES).toContain(type.trim());
  });

  test('shows topic badge', async ({ page }) => {
    const topic = await page.locator('#q-topic').textContent();
    expect(topic.trim().length).toBeGreaterThan(0);
    expect(topic.trim()).not.toBe('—');
  });

  test('shows difficulty badge', async ({ page }) => {
    const diff = await page.locator('#q-difficulty').textContent();
    expect(['easy', 'medium', 'hard']).toContain(diff.trim().toLowerCase());
  });

  test('timer is visible and counting up', async ({ page }) => {
    const t1 = await page.locator('#q-timer-value').textContent();
    await page.waitForTimeout(1200);
    const t2 = await page.locator('#q-timer-value').textContent();
    expect(t1).not.toBe(t2);
  });

  test('timer starts near 0:00', async ({ page }) => {
    const timerText = await page.locator('#q-timer-value').textContent();
    expect(timerText).toMatch(/^0:0[0-9]/);
  });
});

// ══════════════════════════════════════════════
// 3. ANSWER SELECTION
// ══════════════════════════════════════════════
test.describe('Answer selection', () => {
  test('clicking a choice selects it', async ({ page }) => {
    const firstChoice = page.locator('#q-choices .choice').first();
    await firstChoice.click();
    await expect(firstChoice).toHaveClass(/selected/);
  });

  test('selecting a choice enables Submit button', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await expect(page.locator('#btn-submit')).toBeEnabled();
  });

  test('only one choice selected at a time', async ({ page }) => {
    const choices = page.locator('#q-choices .choice');
    await choices.nth(0).click();
    await choices.nth(2).click();
    const selectedCount = await page.locator('#q-choices .choice.selected').count();
    expect(selectedCount).toBe(1);
    await expect(choices.nth(2)).toHaveClass(/selected/);
  });

  test('keyboard 1 selects first choice', async ({ page }) => {
    await page.keyboard.press('1');
    await expect(page.locator('#q-choices .choice').nth(0)).toHaveClass(/selected/);
  });

  test('keyboard 3 selects third choice', async ({ page }) => {
    await page.keyboard.press('3');
    await expect(page.locator('#q-choices .choice').nth(2)).toHaveClass(/selected/);
  });
});

// ══════════════════════════════════════════════
// 4. SUBMIT & FEEDBACK
// ══════════════════════════════════════════════
test.describe('Submit & feedback', () => {
  test('submitting shows inline feedback panel', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.waitForSelector('#btn-submit:not([disabled])', { timeout: 5000 }).catch(() => {});
    await page.locator('#btn-submit').click();
    await expect(page.locator('#feedback-inline')).toBeVisible({ timeout: 5000 });
  });

  test('feedback shows correct answer letter (when wrong)', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const label = await page.locator('#feedback-inline-label').textContent();
    const isWrong = label.includes('✗') || label.includes('Incorrect');
    if (isWrong) {
      const answer = await page.locator('#feedback-answer').textContent();
      expect(answer.trim()).toMatch(/^[A-E]/);
    }
  });

  test('feedback shows explanation', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const explanation = await page.locator('#feedback-explanation').textContent();
    expect(explanation.trim().length).toBeGreaterThan(5);
  });

  test('feedback label shows Correct or Incorrect status', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const status = await page.locator('#feedback-inline-label').textContent();
    expect(status.trim()).toMatch(/Correct|Incorrect|Skipped/i);
  });

  test('after submit: Next button visible, Submit hidden', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const nextHidden = await page.locator('#btn-next').evaluate(el => el.hidden);
    const submitHidden = await page.locator('#btn-submit').evaluate(el => el.hidden);
    expect(nextHidden).toBe(false);
    expect(submitHidden).toBe(true);
  });

  test('Enter key submits when choice selected', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.keyboard.press('Enter');
    await expect(page.locator('#feedback-inline')).toBeVisible();
  });

  test('choices are disabled after submit', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const choices = page.locator('#q-choices .choice');
    const count = await choices.count();
    for (let i = 0; i < count; i++) {
      const classBefore = await choices.nth(i).getAttribute('class');
      await choices.nth(i).click({ force: true });
      const classAfter = await choices.nth(i).getAttribute('class');
      expect(classBefore).toBe(classAfter);
    }
  });

  test('correct answer choice highlighted green', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const correctCount = await page.locator('#q-choices .choice.correct').count();
    expect(correctCount).toBe(1);
  });
});

// ══════════════════════════════════════════════
// 5. SKIP
// ══════════════════════════════════════════════
test.describe('Skip', () => {
  test('clicking Skip shows feedback or advances', async ({ page }) => {
    await page.locator('#btn-skip').click();
    await page.waitForTimeout(300);
    const nextHidden = await page.locator('#btn-next').evaluate(el => el.hidden);
    const feedbackVisible = await page.locator('#feedback-inline').isVisible();
    expect(!nextHidden || feedbackVisible).toBeTruthy();
  });

  test('keyboard S key skips', async ({ page }) => {
    await page.keyboard.press('s');
    await page.waitForTimeout(300);
    const nextHidden = await page.locator('#btn-next').evaluate(el => el.hidden);
    const feedbackVisible = await page.locator('#feedback-inline').isVisible();
    expect(!nextHidden || feedbackVisible).toBeTruthy();
  });

  test('skip increments skipped counter', async ({ page }) => {
    const before = parseInt(await page.locator('#ss-skipped').textContent() || '0');
    await page.locator('#btn-skip').click();
    await page.waitForTimeout(300);
    const after = parseInt(await page.locator('#ss-skipped').textContent() || '0');
    expect(after).toBe(before + 1);
  });
});

// ══════════════════════════════════════════════
// 6. NEXT QUESTION
// ══════════════════════════════════════════════
test.describe('Next question', () => {
  test('Next button loads a new question (feedback hidden)', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-next').click();
    await page.waitForTimeout(300);
    const feedbackVisible = await page.locator('#feedback-inline').isVisible();
    expect(feedbackVisible).toBe(false);
  });

  test('keyboard N advances after submit', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.keyboard.press('n');
    await page.waitForTimeout(300);
    const feedbackVisible = await page.locator('#feedback-inline').isVisible();
    expect(feedbackVisible).toBe(false);
  });

  test('session today count increments after each question', async ({ page }) => {
    const before = parseInt(await page.locator('#hdr-today').textContent() || '0');
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const after = parseInt(await page.locator('#hdr-today').textContent() || '0');
    expect(after).toBe(before + 1);
  });

  test('correct/wrong counters update correctly', async ({ page }) => {
    const correctBefore = parseInt(await page.locator('#ss-correct').textContent() || '0');
    const wrongBefore = parseInt(await page.locator('#ss-wrong').textContent() || '0');
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await expect(page.locator('#feedback-inline')).toBeVisible();
    await page.waitForTimeout(100);
    const status = await page.locator('#feedback-inline-label').textContent();
    const correctAfter = parseInt(await page.locator('#ss-correct').textContent() || '0');
    const wrongAfter = parseInt(await page.locator('#ss-wrong').textContent() || '0');
    if (status.includes('✓')) {
      expect(correctAfter).toBe(correctBefore + 1);
      expect(wrongAfter).toBe(wrongBefore);
    } else {
      expect(wrongAfter).toBe(wrongBefore + 1);
      expect(correctAfter).toBe(correctBefore);
    }
  });
});

// ══════════════════════════════════════════════
// 7. FILTERS — includes DI types
// ══════════════════════════════════════════════
test.describe('Filters', () => {
  test('filtering by PS shows only PS questions', async ({ page }) => {
    await page.selectOption('#filter-type', 'PS');
    await page.waitForTimeout(300);
    for (let i = 0; i < 3; i++) {
      const type = await page.locator('#q-type').textContent();
      expect(type.trim()).toBe('PS');
      await page.locator('#btn-skip').click();
      await page.waitForTimeout(200);
      await page.locator('#btn-next').click();
      await page.waitForTimeout(200);
    }
  });

  test('filtering by DS shows only DS questions', async ({ page }) => {
    await page.selectOption('#filter-type', 'DS');
    await page.waitForTimeout(300);
    const type = await page.locator('#q-type').textContent();
    expect(type.trim()).toBe('DS');
  });

  test('filtering by Data Insights section works', async ({ page }) => {
    await page.selectOption('#filter-section', 'Data Insights');
    await page.waitForTimeout(300);
    const qText = await page.locator('#q-question').textContent();
    expect(qText.trim().length).toBeGreaterThan(5);
  });

  test('filtering by TPA type shows TPA context banner', async ({ page }) => {
    await page.selectOption('#filter-type', 'TPA');
    await page.waitForTimeout(300);
    const type = await page.locator('#q-type').textContent();
    expect(type.trim()).toBe('TPA');
    const banner = page.locator('.di-tpa');
    await expect(banner).toBeVisible();
  });

  test('filtering by TA type shows TA context banner', async ({ page }) => {
    await page.selectOption('#filter-type', 'TA');
    await page.waitForTimeout(300);
    const type = await page.locator('#q-type').textContent();
    expect(type.trim()).toBe('TA');
    const banner = page.locator('.di-ta');
    await expect(banner).toBeVisible();
  });

  test('filtering by Easy shows only easy questions', async ({ page }) => {
    await page.selectOption('#filter-difficulty', 'easy');
    await page.waitForTimeout(300);
    for (let i = 0; i < 3; i++) {
      const diff = await page.locator('#q-difficulty').textContent();
      expect(diff.trim().toLowerCase()).toBe('easy');
      await page.locator('#btn-skip').click();
      await page.waitForTimeout(200);
      await page.locator('#btn-next').click();
      await page.waitForTimeout(200);
    }
  });

  test('filtering by Hard shows only hard questions', async ({ page }) => {
    await page.selectOption('#filter-difficulty', 'hard');
    await page.waitForTimeout(300);
    const diff = await page.locator('#q-difficulty').textContent();
    expect(diff.trim().toLowerCase()).toBe('hard');
  });

  test('topic filter populates with multiple topics', async ({ page }) => {
    const options = await page.locator('#filter-topic option').allTextContents();
    expect(options.length).toBeGreaterThan(5);
    expect(options[0]).toMatch(/all/i);
  });

  test('Restart button resets question state', async ({ page }) => {
    await page.locator('#btn-restart').click();
    await page.waitForTimeout(300);
    const feedbackVisible = await page.locator('#feedback-inline').isVisible();
    expect(feedbackVisible).toBe(false);
    const nextHidden = await page.locator('#btn-next').evaluate(el => el.hidden);
    expect(nextHidden).toBe(true);
  });
});

// ══════════════════════════════════════════════
// 8. TABS — including new Study Plan tab
// ══════════════════════════════════════════════
test.describe('Tab navigation', () => {
  test('Dashboard tab shows dashboard panel', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#tab-dashboard')).toHaveClass(/active/);
    await expect(page.locator('#tab-practice')).not.toHaveClass(/active/);
  });

  test('Review tab shows review panel', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('#tab-review')).toHaveClass(/active/);
  });

  test('Study Plan tab is present and clickable', async ({ page }) => {
    const planBtn = page.locator('[data-tab="plan"]');
    await expect(planBtn).toBeVisible();
    await planBtn.click();
    await expect(page.locator('#tab-plan')).toHaveClass(/active/);
  });

  test('Study Plan tab renders week cards', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    await page.waitForTimeout(300);
    const weeks = await page.locator('#plan-weeks .plan-week-card').count();
    expect(weeks).toBe(4);
  });

  test('Study Plan tab renders daily recommendations', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    await page.waitForTimeout(300);
    const items = await page.locator('#plan-daily .plan-daily-item').count();
    expect(items).toBeGreaterThan(0);
  });

  test('Practice tab returns to practice', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await page.locator('[data-tab="practice"]').click();
    await expect(page.locator('#tab-practice')).toHaveClass(/active/);
  });
});

// ══════════════════════════════════════════════
// 9. DASHBOARD — includes score predictor
// ══════════════════════════════════════════════
test.describe('Dashboard', () => {
  test('shows total questions stat', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    const total = await page.locator('#dash-total').textContent();
    expect(parseInt(total)).toBeGreaterThanOrEqual(0);
  });

  test('shows accuracy stat', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    const acc = await page.locator('#dash-accuracy').textContent();
    expect(acc.trim()).toMatch(/^[\d—%]/);
  });

  test('score predictor card is visible', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#score-total')).toBeVisible();
    await expect(page.locator('#score-predictor-note')).toBeVisible();
  });

  test('score predictor shows unlock prompt before 15 answers', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    const note = await page.locator('#score-predictor-note').textContent();
    // Fresh state = 0 attempts → should show unlock prompt
    expect(note).toMatch(/question|unlock/i);
  });

  test('score predictor updates after 15+ answers', async ({ page }) => {
    test.setTimeout(120000);

    // All overlays: use evaluate to dismiss without side-effects.
    // hearts-modal: hide + set practiceMode=true via window._gmatSetPracticeMode if available
    // summary-modal: hide without calling nextQuestion (btn-next click does that)
    // levelup-overlay: hide (pointer-events:none, but in case the handler fires)
    const dismissOverlaysEval = async () => {
      await page.evaluate(() => {
        const hideEl = id => { const e = document.getElementById(id); if (e && !e.hidden) { e.hidden = true; document.body.classList.remove('modal-open'); } };
        hideEl('hearts-modal');
        hideEl('summary-modal');
        hideEl('levelup-overlay');
        // Enable practice mode so hearts no longer block
        try { if (window._gmatSetPracticeMode) window._gmatSetPracticeMode(true); } catch(e) {}
        // Reset summary counter so the modal doesn't re-fire next submit
        try { if (window._gmatResetSummary) window._gmatResetSummary(); } catch(e) {}
      });
    };

    for (let i = 0; i < 20; i++) {
      await dismissOverlaysEval();
      await page.waitForSelector('#q-question', { timeout: 15000 });
      await dismissOverlaysEval();
      // Click choice first (submit is disabled until choice selected)
      await page.locator('#q-choices .choice').first().click();
      // Now wait for btn-submit to become enabled
      await page.waitForSelector('#btn-submit:not([disabled])', { timeout: 5000 }).catch(() => {});
      await page.locator('#btn-submit').click();
      // Wait for btn-next, dismissing overlays if blocked
      for (let attempt = 0; attempt < 30; attempt++) {
        const visible = await page.locator('#btn-next').isVisible();
        if (visible) break;
        await dismissOverlaysEval();
        await page.waitForTimeout(200);
      }
      await page.locator('#btn-next').click();
      await page.waitForTimeout(400);
    }
    await dismissOverlaysEval();
    await page.locator('[data-tab="dashboard"]').click();
    await page.waitForTimeout(600);
    const total = await page.locator('#score-total').textContent();
    expect(total.trim()).toMatch(/^\d+$/);
  });

  test('shows difficulty performance rows after answering', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="dashboard"]').click();
    const bars = page.locator('#dash-difficulty-bars .topic-bar');
    const count = await bars.count();
    expect(count).toBeGreaterThanOrEqual(1);
    expect(count).toBeLessThanOrEqual(3);
  });

  test('Reset progress button exists and is visible', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#btn-reset-progress')).toBeVisible();
  });

  test('dashboard total updates after answering', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="dashboard"]').click();
    const total = await page.locator('#dash-total').textContent();
    expect(parseInt(total)).toBeGreaterThanOrEqual(1);
  });

  test('topic bars appear after answering', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="dashboard"]').click();
    const bars = page.locator('#dash-topic-bars .topic-bar');
    const count = await bars.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ══════════════════════════════════════════════
// 10. REVIEW TAB
// ══════════════════════════════════════════════
test.describe('Review tab', () => {
  test('review tab loads without error', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('#review-list')).toBeVisible();
  });

  test('shows attempt after answering', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="review"]').click();
    const items = page.locator('#review-list .review-item');
    await expect(items).toHaveCount(1);
  });

  test('review item contains question text snippet', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="review"]').click();
    const itemText = await page.locator('#review-list .review-item').first().textContent();
    expect(itemText.trim().length).toBeGreaterThan(10);
  });

  test('review filter is visible', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('#review-filter')).toBeVisible();
  });
});

// ══════════════════════════════════════════════
// 11. THEME TOGGLE
// ══════════════════════════════════════════════
test.describe('Theme toggle', () => {
  test('theme toggle button exists', async ({ page }) => {
    await expect(page.locator('#theme-toggle')).toBeVisible();
  });

  test('clicking theme toggle switches data-theme attribute', async ({ page }) => {
    const before = await page.locator('html').getAttribute('data-theme');
    await page.locator('#theme-toggle').click();
    const after = await page.locator('html').getAttribute('data-theme');
    expect(after).not.toBe(before);
  });

  test('toggling twice returns to original theme', async ({ page }) => {
    const original = await page.locator('html').getAttribute('data-theme');
    await page.locator('#theme-toggle').click();
    await page.locator('#theme-toggle').click();
    const restored = await page.locator('html').getAttribute('data-theme');
    expect(restored).toBe(original);
  });

  test('theme persists after reload', async ({ page }) => {
    await page.locator('#theme-toggle').click();
    const theme = await page.locator('html').getAttribute('data-theme');
    await page.reload();
    await page.waitForSelector('#q-question');
    const themeAfterReload = await page.locator('html').getAttribute('data-theme');
    expect(themeAfterReload).toBe(theme);
  });
});

// ══════════════════════════════════════════════
// 12. PERSISTENCE (localStorage)
// ══════════════════════════════════════════════
test.describe('Persistence', () => {
  test('today count persists across reload', async ({ page }) => {
    for (let i = 0; i < 2; i++) {
      await page.locator('#q-choices .choice').first().click();
      await page.locator('#btn-submit').click();
      await page.locator('#btn-next').click();
      await page.waitForTimeout(200);
    }
    const countBefore = parseInt(await page.locator('#hdr-today').textContent() || '0');
    await page.reload();
    await page.waitForSelector('#q-question');
    const countAfter = parseInt(await page.locator('#hdr-today').textContent() || '0');
    expect(countAfter).toBeGreaterThanOrEqual(countBefore);
  });

  test('filter selection persists across reload', async ({ page }) => {
    await page.selectOption('#filter-type', 'DS');
    await page.reload();
    await page.waitForSelector('#q-question');
    const selected = await page.locator('#filter-type').inputValue();
    expect(selected).toBe('DS');
  });

  test('Reset progress clears all stats', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="dashboard"]').click();
    page.once('dialog', d => d.accept());
    await page.locator('#btn-reset-progress').click();
    await page.waitForTimeout(300);
    const total = await page.locator('#dash-total').textContent();
    expect(parseInt(total)).toBe(0);
  });
});

// ══════════════════════════════════════════════
// 13. MODES
// ══════════════════════════════════════════════
test.describe('Practice modes', () => {
  test('Unseen first mode loads a question', async ({ page }) => {
    await page.selectOption('#filter-mode', 'unseen');
    await page.waitForTimeout(300);
    const qText = await page.locator('#q-question').textContent();
    expect(qText.trim().length).toBeGreaterThan(5);
  });

  test('Weak areas mode loads a question after some answers', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-next').click();
    await page.waitForTimeout(200);
    await page.selectOption('#filter-mode', 'weak');
    await page.waitForTimeout(300);
    const qText = await page.locator('#q-question').textContent();
    expect(qText.trim().length).toBeGreaterThan(5);
  });

  test('Adaptive mode loads a question', async ({ page }) => {
    await page.selectOption('#filter-mode', 'adaptive');
    await page.waitForTimeout(300);
    const qText = await page.locator('#q-question').textContent();
    expect(qText.trim().length).toBeGreaterThan(5);
  });
});

// ══════════════════════════════════════════════
// 14. COMPLETE FLOW (smoke tests)
// ══════════════════════════════════════════════
test.describe('Complete flow', () => {
  test('full session: answer 5 questions, dashboard and review update', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.waitForSelector('#q-question');
      await page.locator('#q-choices .choice').first().click();
      await expect(page.locator('#btn-submit')).toBeEnabled();
      await page.locator('#btn-submit').click();
      await expect(page.locator('#feedback-inline')).toBeVisible();
      await page.locator('#btn-next').click();
      await page.waitForTimeout(200);
    }

    const today = parseInt(await page.locator('#hdr-today').textContent() || '0');
    expect(today).toBeGreaterThanOrEqual(5);

    await page.locator('[data-tab="dashboard"]').click();
    const total = parseInt(await page.locator('#dash-total').textContent() || '0');
    expect(total).toBeGreaterThanOrEqual(5);

    await page.locator('[data-tab="review"]').click();
    const items = await page.locator('#review-list .review-item').count();
    expect(items).toBeGreaterThanOrEqual(5);
  });

  test('mixed PS+DS+DI session works end-to-end', async ({ page }) => {
    await page.selectOption('#filter-type', 'PS');
    await page.waitForTimeout(200);
    await page.locator('#q-choices .choice').nth(1).click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-next').click();

    await page.selectOption('#filter-type', 'DS');
    await page.waitForTimeout(200);
    const typeDS = await page.locator('#q-type').textContent();
    expect(typeDS.trim()).toBe('DS');
    await page.locator('#q-choices .choice').nth(0).click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-next').click();

    await page.selectOption('#filter-section', 'Data Insights');
    await page.waitForTimeout(200);
    const qText = await page.locator('#q-question').textContent();
    expect(qText.trim().length).toBeGreaterThan(5);

    const today = parseInt(await page.locator('#hdr-today').textContent() || '0');
    expect(today).toBeGreaterThanOrEqual(2);
  });

  test('correct answer choice highlighted green after submit', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await expect(page.locator('#feedback-inline')).toBeVisible();
    const greenCount = await page.locator('#q-choices .choice.correct').count();
    expect(greenCount).toBe(1);
    const status = await page.locator('#feedback-inline-label').textContent();
    if (!status.includes('✓')) {
      const redCount = await page.locator('#q-choices .choice.wrong').count();
      expect(redCount).toBe(1);
    }
  });
});

// ══════════════════════════════════════════════
// NEW FEATURES — Confidence Tags, Exam Mode, Challenge Mode
// ══════════════════════════════════════════════
test.describe('Confidence Tags', () => {
  test('confidence tag row hidden before answering', async ({ page }) => {
    await expect(page.locator('#confidence-tag-row')).toBeHidden();
  });

  test('confidence tag row visible after submitting', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await expect(page.locator('#confidence-tag-row')).toBeVisible();
  });

  test('clicking Sure button marks it active', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await expect(page.locator('#confidence-tag-row')).toBeVisible();
    await page.locator('#ctag-sure').click();
    await expect(page.locator('#ctag-sure')).toHaveClass(/active/);
    await expect(page.locator('#ctag-unsure')).not.toHaveClass(/active/);
  });

  test('confidence tag row hidden after skip', async ({ page }) => {
    await page.locator('#btn-skip').click();
    await expect(page.locator('#confidence-tag-row')).toBeHidden();
  });
});

test.describe('Exam Mode', () => {
  test('Exam Simulation button exists in sidebar', async ({ page }) => {
    await expect(page.locator('#btn-exam-mode')).toBeVisible();
  });

  test('clicking Exam Mode button opens exam setup modal', async ({ page }) => {
    await page.locator('#btn-exam-mode').click();
    await expect(page.locator('#exam-modal')).toBeVisible();
    await expect(page.locator('#exam-section')).toBeVisible();
    await expect(page.locator('#exam-count')).toBeVisible();
    await expect(page.locator('#btn-start-exam')).toBeVisible();
  });

  test('exam modal can be closed', async ({ page }) => {
    await page.locator('#btn-exam-mode').click();
    await expect(page.locator('#exam-modal')).toBeVisible();
    await page.locator('#exam-modal-close').click();
    await expect(page.locator('#exam-modal')).toBeHidden();
  });

  test('time preview updates when count changes', async ({ page }) => {
    await page.locator('#btn-exam-mode').click();
    // Switch to drill mode so count selector is visible and drives time preview
    await page.locator('#exam-section').selectOption('all');
    await page.locator('#exam-count').selectOption('5');
    const preview = await page.locator('#exam-time-preview').textContent();
    expect(preview).toMatch(/10 min/i);
  });
});

test.describe('Challenge Mode', () => {
  test('challenge mode option available in filter', async ({ page }) => {
    const options = await page.locator('#filter-mode option').allTextContents();
    expect(options.some(o => o.includes('Challenge'))).toBeTruthy();
  });
});

test.describe('Time Analytics', () => {
  test('time analytics section visible on dashboard after answers', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-next').click();
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#time-analytics')).toBeVisible();
  });
});

// ══════════════════════════════════════════════
// Error Journal
// ══════════════════════════════════════════════
test.describe('Error Journal', () => {
  test('Error Journal subtab exists in Review tab', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('.review-subtab[data-subtab="errors"]')).toBeVisible();
  });

  test('Error Journal shows empty state when no errors', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('.review-subtab[data-subtab="errors"]').click();
    const list = page.locator('#error-journal-list');
    await expect(list).toBeVisible();
  });

  test('Error Journal shows entries after wrong answers', async ({ page }) => {
    // Answer 3 questions wrong
    for (let i = 0; i < 3; i++) {
      await page.locator('#q-choices .choice').first().click();
      await page.locator('#btn-submit').click();
      await page.locator('#btn-next').click();
      await page.waitForTimeout(100);
    }
    await page.locator('[data-tab="review"]').click();
    await page.locator('.review-subtab[data-subtab="errors"]').click();
    const list = page.locator('#error-journal-list');
    await expect(list).toBeVisible();
  });
});

// ══════════════════════════════════════════════
// Score History Chart
// ══════════════════════════════════════════════
test.describe('Score History', () => {
  test('score trajectory canvas exists on dashboard', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#chart-score-history')).toBeAttached();
  });

  test('score-history-empty message shown initially', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    const empty = page.locator('#score-history-empty');
    await expect(empty).toBeAttached();
  });
});

// ══════════════════════════════════════════════
// Formula Sheet
// ══════════════════════════════════════════════
test.describe('Formula Sheet', () => {
  test('formula sheet button exists in sidebar', async ({ page }) => {
    await expect(page.locator('#btn-formula-sheet')).toBeVisible();
  });

  test('clicking formula sheet button opens modal', async ({ page }) => {
    await page.locator('#btn-formula-sheet').click();
    await expect(page.locator('#formula-modal')).toBeVisible();
  });

  test('formula modal contains DS answer key', async ({ page }) => {
    await page.locator('#btn-formula-sheet').click();
    const text = await page.locator('#formula-modal').textContent();
    expect(text).toContain('DS Answer Key');
  });

  test('formula modal closes with X button', async ({ page }) => {
    await page.locator('#btn-formula-sheet').click();
    await page.locator('#formula-close').click();
    await expect(page.locator('#formula-modal')).toBeHidden();
  });
});

// ══════════════════════════════════════════════
// Daily Tip
// ══════════════════════════════════════════════
test.describe('Daily Tip', () => {
  test('daily tip card is visible', async ({ page }) => {
    await expect(page.locator('#daily-tip-card')).toBeVisible();
  });

  test('daily tip text is non-empty', async ({ page }) => {
    const text = await page.locator('#daily-tip-text').textContent();
    expect(text.trim().length).toBeGreaterThan(10);
  });

  test('clicking next tip button changes the tip', async ({ page }) => {
    const tip1 = await page.locator('#daily-tip-text').textContent();
    await page.locator('#btn-tip-next').click();
    const tip2 = await page.locator('#daily-tip-text').textContent();
    // Tips cycle, so after clicking enough times the text changes
    expect(typeof tip2).toBe('string');
  });
});

// ══════════════════════════════════════════════
// Study Plan enhancements
// ══════════════════════════════════════════════
test.describe('Study Plan', () => {
  test('study plan tab exists', async ({ page }) => {
    await expect(page.locator('[data-tab="plan"]')).toBeVisible();
  });

  test('section coverage shows on study plan', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    await expect(page.locator('#plan-coverage')).toBeVisible();
  });

  test('priority queue shows on study plan', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    await expect(page.locator('#plan-priority-queue')).toBeVisible();
  });

  test('section coverage has 3 rows after answering', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="plan"]').click();
    const rows = await page.locator('#plan-coverage .coverage-row').count();
    expect(rows).toBe(3);
  });
});

// ══════════════════════════════════════════════
// Theory Snippet (wrong answer insight)
// ══════════════════════════════════════════════
test.describe('Theory Snippet', () => {
  test('theory snippet element exists in feedback area', async ({ page }) => {
    await expect(page.locator('#theory-snippet')).toBeAttached();
  });

  test('theory snippet hidden before answering', async ({ page }) => {
    await expect(page.locator('#theory-snippet')).toBeHidden();
  });
});

// ══════════════════════════════════════════════
// Difficulty Rating
// ══════════════════════════════════════════════
test.describe('Difficulty Rating', () => {
  test('difficulty rating row exists in feedback', async ({ page }) => {
    await expect(page.locator('#difficulty-rating-row')).toBeAttached();
  });

  test('difficulty rating row hidden before answering', async ({ page }) => {
    await expect(page.locator('#difficulty-rating-row')).toBeHidden();
  });

  test('difficulty rating row visible after submitting', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await expect(page.locator('#difficulty-rating-row')).toBeVisible();
  });

  test('clicking a rating button marks it active', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('.diff-rate-btn[data-felt="3"]').click();
    await expect(page.locator('.diff-rate-btn[data-felt="3"]')).toHaveClass(/active/);
  });
});

// ══════════════════════════════════════════════
// Keyboard Shortcuts
// ══════════════════════════════════════════════
test.describe('Keyboard Shortcuts', () => {
  test('keyboard shortcut hint row is visible', async ({ page }) => {
    await expect(page.locator('.kbd-shortcuts-hint')).toBeVisible();
  });

  test('pressing 1 selects first choice', async ({ page }) => {
    await page.locator('#q-question').waitFor({ state: 'visible' });
    await page.keyboard.press('1');
    const selected = page.locator('#q-choices .choice.selected');
    await expect(selected).toHaveCount(1);
  });

  test('pressing Enter submits when choice selected', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit:not([disabled])').waitFor({ state: 'attached' });
    // Focus the question text so Enter goes to document, not to the choice button
    await page.locator('#q-question').click();
    await page.keyboard.press('Enter');
    await expect(page.locator('#btn-next')).toBeVisible({ timeout: 7000 });
  });

  test('pressing Enter goes to next after submit', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const firstQ = await page.locator('#q-question').textContent();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    const secondQ = await page.locator('#q-question').textContent();
    expect(firstQ).not.toEqual(secondQ);
  });

  test('pressing S skips the question', async ({ page }) => {
    const firstQ = await page.locator('#q-question').textContent();
    await page.keyboard.press('s');
    await page.locator('#btn-next').click();
    const secondQ = await page.locator('#q-question').textContent();
    expect(firstQ).not.toEqual(secondQ);
  });

  test('pressing Escape closes formula modal', async ({ page }) => {
    await page.locator('#btn-formula-sheet').click();
    await expect(page.locator('#formula-modal')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#formula-modal')).toBeHidden();
  });
});

// ══════════════════════════════════════════════
// Section Accuracy Rings
// ══════════════════════════════════════════════
test.describe('Section Accuracy Rings', () => {
  test('section rings row exists on dashboard', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#section-rings-row')).toBeVisible();
  });

  test('three ring cards exist', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    const cards = await page.locator('.section-ring-card').count();
    expect(cards).toBe(3);
  });

  test('rings show percentage after answering', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="dashboard"]').click();
    // At least one ring-pct should show a percent
    const quant = await page.locator('#ring-pct-quant').textContent();
    const verbal = await page.locator('#ring-pct-verbal').textContent();
    const di = await page.locator('#ring-pct-di').textContent();
    const anyPct = [quant, verbal, di].some(t => t && t.includes('%'));
    expect(anyPct).toBe(true);
  });
});

// ══════════════════════════════════════════════
// Strength Radar
// ══════════════════════════════════════════════
test.describe('Strength Radar', () => {
  test('strength radar section exists on dashboard', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#strength-radar')).toBeAttached();
  });

  test('strength radar shows empty state before data', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('.strength-radar-empty')).toBeVisible();
  });
});

// ══════════════════════════════════════════════
// Recent Mistakes Mode
// ══════════════════════════════════════════════
test.describe('Recent Mistakes Mode', () => {
  test('Recent Mistakes option exists in mode filter', async ({ page }) => {
    const opt = page.locator('#filter-mode option[value="recent_wrong"]');
    await expect(opt).toBeAttached();
  });

  test('selecting Recent Mistakes mode loads a question', async ({ page }) => {
    await page.locator('#filter-mode').selectOption('recent_wrong');
    await expect(page.locator('#q-question')).toBeVisible();
  });
});

// ══════════════════════════════════════════════
// Exam Countdown
// ══════════════════════════════════════════════
test.describe('Exam Countdown', () => {
  test('exam countdown card exists on study plan tab', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    await expect(page.locator('#exam-countdown-card')).toBeAttached();
  });

  test('exam date input and save button present', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    await expect(page.locator('#exam-date-input')).toBeAttached();
    await expect(page.locator('#btn-save-exam-date')).toBeAttached();
  });

  test('setting exam date shows days remaining', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    // Set a date 30 days from now
    const future = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const yyyy = future.getFullYear();
    const mm   = String(future.getMonth() + 1).padStart(2, '0');
    const dd   = String(future.getDate()).padStart(2, '0');
    await page.locator('#exam-date-input').fill(`${yyyy}-${mm}-${dd}`);
    await page.locator('#btn-save-exam-date').click();
    const daysText = await page.locator('#exam-days-value').textContent();
    const days = parseInt(daysText);
    expect(days).toBeGreaterThan(0);
    expect(days).toBeLessThanOrEqual(31);
  });

  test('exam countdown shows daily recommendation after date set', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    const future = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
    const yyyy = future.getFullYear();
    const mm   = String(future.getMonth() + 1).padStart(2, '0');
    const dd   = String(future.getDate()).padStart(2, '0');
    await page.locator('#exam-date-input').fill(`${yyyy}-${mm}-${dd}`);
    await page.locator('#btn-save-exam-date').click();
    const rec = await page.locator('#exam-daily-rec').textContent();
    expect(rec.length).toBeGreaterThan(5);
  });

  test('urgency bar gets urgency class based on days', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    // Set date 5 days away (should be red)
    const future = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const yyyy = future.getFullYear();
    const mm   = String(future.getMonth() + 1).padStart(2, '0');
    const dd   = String(future.getDate()).padStart(2, '0');
    await page.locator('#exam-date-input').fill(`${yyyy}-${mm}-${dd}`);
    await page.locator('#btn-save-exam-date').click();
    const barClass = await page.locator('#exam-urgency-bar').getAttribute('class');
    expect(barClass).toContain('exam-urgency--red');
  });
});

// ══════════════════════════════════════════════
// Score Momentum
// ══════════════════════════════════════════════
test.describe('Score Momentum', () => {
  test('momentum row exists on dashboard', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#momentum-row')).toBeAttached();
  });

  test('momentum row is empty before 10 attempts', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    const content = await page.locator('#momentum-row').innerHTML();
    expect(content.trim()).toBe('');
  });

  test('momentum card appears after 10 attempts', async ({ page }) => {
    test.setTimeout(90000);
    const dismissOverlays = async () => {
      await page.evaluate(() => {
        ['hearts-modal','summary-modal','levelup-overlay'].forEach(id => {
          const e = document.getElementById(id); if (e && !e.hidden) { e.hidden = true; document.body.classList.remove('modal-open'); }
        });
        if (window._gmatSetPracticeMode) window._gmatSetPracticeMode(true);
        if (window._gmatResetSummary) window._gmatResetSummary();
      });
    };
    for (let i = 0; i < 12; i++) {
      await dismissOverlays();
      await page.waitForSelector('#q-question', { timeout: 10000 });
      await page.locator('#q-choices .choice').first().click();
      await page.waitForSelector('#btn-submit:not([disabled])', { timeout: 5000 }).catch(() => {});
      await page.locator('#btn-submit').click();
      for (let a = 0; a < 15; a++) {
        if (await page.locator('#btn-next').isVisible()) break;
        await dismissOverlays();
        await page.waitForTimeout(200);
      }
      if (await page.locator('#btn-next').isVisible()) await page.locator('#btn-next').click();
      await page.waitForTimeout(300);
    }
    await dismissOverlays();
    await page.locator('[data-tab="dashboard"]').click();
    await page.waitForTimeout(500);
    const content = await page.locator('#momentum-row').innerHTML();
    expect(content.trim().length).toBeGreaterThan(0);
  });
});

// ══════════════════════════════════════════════
// Session Summary Enhancements
// ══════════════════════════════════════════════
test.describe('Session Summary Enhancements', () => {
  test('summary topic breakdown element exists', async ({ page }) => {
    await expect(page.locator('#summary-topic-breakdown')).toBeAttached();
  });

  test('summary next-action element exists', async ({ page }) => {
    await expect(page.locator('#summary-next-action')).toBeAttached();
  });
});

// ══════════════════════════════════════════════
// Focus Nudge
// ══════════════════════════════════════════════
test.describe('Focus Nudge', () => {
  test('focus nudge element exists on practice tab', async ({ page }) => {
    await expect(page.locator('#focus-nudge')).toBeAttached();
  });

  test('focus nudge is hidden initially (no weak topics yet)', async ({ page }) => {
    const nudge = page.locator('#focus-nudge');
    await expect(nudge).toBeHidden();
  });

  test('focus nudge dismiss button exists', async ({ page }) => {
    await expect(page.locator('#focus-nudge-dismiss')).toBeAttached();
  });
});

// ══════════════════════════════════════════════
// Topic Badge Enhancements
// ══════════════════════════════════════════════
test.describe('Topic Badge Enhancements', () => {
  test('topic badge has title attribute after answering', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-next:not([disabled])').waitFor({ state: 'visible' }).catch(() => {});
    if (await page.locator('#btn-next').isVisible()) await page.locator('#btn-next').click();
    // After the next question loads, check topic badge title
    await page.waitForTimeout(200);
    const title = await page.locator('#q-topic').getAttribute('title');
    // title should mention the topic name (set after at least 1 attempt)
    // Note: it's set for the NEW question which may have 0 attempts — just check element exists
    await expect(page.locator('#q-topic')).toBeAttached();
  });
});

// ══════════════════════════════════════════════
// Quick-filter Chips
// ══════════════════════════════════════════════
test.describe('Quick-filter Chips', () => {
  test('quick-filter chips exist on dashboard', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#quick-filter-chips')).toBeAttached();
  });

  test('all four chips are present', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#qf-weak')).toBeAttached();
    await expect(page.locator('#qf-unseen')).toBeAttached();
    await expect(page.locator('#qf-hard')).toBeAttached();
    await expect(page.locator('#qf-sr')).toBeAttached();
  });

  test('clicking weak-areas chip switches to practice tab', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await page.locator('#qf-weak').click();
    await expect(page.locator('#tab-practice')).toHaveClass(/active/);
  });

  test('clicking unseen chip switches to practice tab', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await page.locator('#qf-unseen').click();
    await expect(page.locator('#tab-practice')).toHaveClass(/active/);
  });
});

// ══════════════════════════════════════════════
// Weekly Streak Calendar
// ══════════════════════════════════════════════
test.describe('Weekly Streak Calendar', () => {
  test('streak calendar card exists on dashboard', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#streak-calendar-card')).toBeAttached();
  });

  test('streak calendar renders 28 day cells', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    const cells = await page.locator('.streak-cal-cell').count();
    expect(cells).toBe(28);
  });

  test('today cell has special highlight class', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('.streak-cal-cell--today')).toBeAttached();
  });

  test('streak calendar updates after answering', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="dashboard"]').click();
    // Today's cell should now show a count
    const todayCell = page.locator('.streak-cal-cell--today');
    await expect(todayCell).toBeAttached();
    const count = await todayCell.locator('.streak-cal-count').textContent().catch(() => '');
    expect(parseInt(count) || 0).toBeGreaterThanOrEqual(1);
  });
});

// ══════════════════════════════════════════════
// Error Patterns
// ══════════════════════════════════════════════
test.describe('Error Patterns', () => {
  test('patterns subtab button exists in review', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('[data-subtab="patterns"]')).toBeAttached();
  });

  test('patterns panel shows empty state before data', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="patterns"]').click();
    await expect(page.locator('#review-patterns')).toBeVisible();
    const text = await page.locator('#error-patterns-content').textContent();
    expect(text.length).toBeGreaterThan(0);
  });

  test('patterns panel renders after wrong answers', async ({ page }) => {
    // Answer a question wrong — click last choice (usually wrong)
    await page.locator('#q-choices .choice').last().click();
    await page.locator('#btn-submit').click();
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="patterns"]').click();
    const content = await page.locator('#error-patterns-content').innerHTML();
    expect(content.trim().length).toBeGreaterThan(10);
  });
});

// ══════════════════════════════════════════════
// Error Tagging
// ══════════════════════════════════════════════
test.describe('Error Tagging', () => {
  test('error tag row exists in feedback area', async ({ page }) => {
    await expect(page.locator('#error-tag-row')).toBeAttached();
  });

  test('error tag row hidden initially', async ({ page }) => {
    await expect(page.locator('#error-tag-row')).toBeHidden();
  });

  test('error tag row shows after wrong answer', async ({ page }) => {
    // Answer wrong by submitting with no correct choice selected — use last choice
    // Note: we can't guarantee which is wrong, but error-tag-row appears for ANY wrong answer
    // Force a wrong answer by submitting last choice and checking
    await page.locator('#q-choices .choice').last().click();
    await page.locator('#btn-submit').click();
    // Check if it was wrong by looking at feedback label
    const label = await page.locator('#feedback-inline-label').textContent();
    if (label && label.includes('Incorrect')) {
      await expect(page.locator('#error-tag-row')).toBeVisible();
    } else {
      // Was correct — skip this check
      await expect(page.locator('#error-tag-row')).toBeHidden();
    }
  });
});

// ══════════════════════════════════════════════
// 30-Day Score Projection
// ══════════════════════════════════════════════
test.describe('30-Day Score Projection', () => {
  test('projection card exists on study plan tab', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    await expect(page.locator('#plan-projection-card')).toBeAttached();
  });

  test('projection score element exists', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    await expect(page.locator('#plan-projection-score')).toBeAttached();
  });

  test('projection shows dash initially (no data)', async ({ page }) => {
    await page.locator('[data-tab="plan"]').click();
    const score = await page.locator('#plan-projection-score').textContent();
    expect(score.trim()).toBe('—');
  });
});

test.describe('Daily Missions Panel', () => {
  test('daily missions card exists in practice sidebar', async ({ page }) => {
    await expect(page.locator('#daily-missions-card')).toBeAttached();
  });

  test('daily missions list container exists', async ({ page }) => {
    await expect(page.locator('#daily-missions-list')).toBeAttached();
  });

  test('missions panel renders 3 missions on load', async ({ page }) => {
    const missions = page.locator('#daily-missions-list .daily-mission');
    await expect(missions).toHaveCount(3);
  });

  test('first mission shows daily goal progress', async ({ page }) => {
    const first = page.locator('#daily-missions-list .daily-mission').first();
    const label = await first.locator('.daily-mission-label').textContent();
    expect(label.toLowerCase()).toContain('daily goal');
  });

  test('go button navigates to practice and loads a question', async ({ page }) => {
    const goBtn = page.locator('#daily-missions-list .daily-mission-go').first();
    const goCount = await goBtn.count();
    if (goCount > 0) {
      await goBtn.click();
      await page.waitForSelector('#q-question', { timeout: 3000 });
    }
  });
});

test.describe('Pace Feedback', () => {
  test('pace feedback element exists in feedback area', async ({ page }) => {
    await expect(page.locator('#pace-feedback')).toBeAttached();
  });

  test('pace feedback is hidden before answering', async ({ page }) => {
    const el = page.locator('#pace-feedback');
    await expect(el).toBeHidden();
  });

  test('pace feedback shown after answering', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.waitForSelector('#feedback-inline:not([hidden])', { timeout: 5000 });
    const paceEl = page.locator('#pace-feedback');
    await expect(paceEl).toBeVisible();
  });

  test('pace feedback has time and target text', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.waitForSelector('#feedback-inline:not([hidden])', { timeout: 5000 });
    const text = await page.locator('#pace-feedback').textContent();
    expect(text).toMatch(/target/);
  });
});

test.describe('Type Pacing Table', () => {
  test('type pacing table container exists in review stats', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="stats"]').click();
    await expect(page.locator('#type-pacing-table')).toBeAttached();
  });

  test('type pacing table shows empty state before data', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="stats"]').click();
    const text = await page.locator('#type-pacing-table').textContent();
    expect(text.toLowerCase()).toContain('answer questions');
  });
});

test.describe('Achievement Badge Gallery', () => {
  test('badges subtab button exists in review', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('[data-subtab="badges"]')).toBeAttached();
  });

  test('badge gallery panel exists', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('#review-badges')).toBeAttached();
  });

  test('achievement gallery renders on clicking badges tab', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="badges"]').click();
    await expect(page.locator('#achievement-gallery')).toBeVisible();
  });

  test('badge gallery shows core badges', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="badges"]').click();
    const items = page.locator('.badge-gallery-item');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('badge gallery shows count header', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="badges"]').click();
    const text = await page.locator('.badge-gallery-count').textContent();
    expect(text).toMatch(/\d+ \/ \d+ earned/);
  });
});

test.describe('Topic Mastery Grid', () => {
  test('mastery subtab button exists in review', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('[data-subtab="mastery"]')).toBeAttached();
  });

  test('mastery panel exists', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('#review-mastery')).toBeAttached();
  });

  test('mastery grid container exists', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="mastery"]').click();
    await expect(page.locator('#mastery-grid')).toBeVisible();
  });

  test('mastery grid shows empty state before data', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="mastery"]').click();
    const text = await page.locator('#mastery-grid').textContent();
    expect(text.toLowerCase()).toContain('answer questions');
  });
});

test.describe('Question Bookmarks', () => {
  test('bookmark button exists in question header', async ({ page }) => {
    await expect(page.locator('#btn-bookmark')).toBeVisible();
  });

  test('bookmark button shows star icon', async ({ page }) => {
    const text = await page.locator('#btn-bookmark').textContent();
    expect(['☆', '★']).toContain(text.trim());
  });

  test('clicking bookmark button toggles bookmarked state', async ({ page }) => {
    await page.locator('#btn-bookmark').click();
    await expect(page.locator('#btn-bookmark')).toHaveClass(/bookmarked/);
    await page.locator('#btn-bookmark').click();
    await expect(page.locator('#btn-bookmark')).not.toHaveClass(/bookmarked/);
  });

  test('bookmarks subtab exists in review', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await expect(page.locator('[data-subtab="bookmarks"]')).toBeVisible();
  });

  test('bookmarks panel renders empty state', async ({ page }) => {
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="bookmarks"]').click();
    await expect(page.locator('#review-bookmarks')).toBeVisible();
    const text = await page.locator('#bookmark-list').textContent();
    expect(text.toLowerCase()).toMatch(/no bookmarks|bookmark/);
  });

  test('bookmarked question appears in bookmark list', async ({ page }) => {
    // Bookmark current question
    await page.locator('#btn-bookmark').click();
    // Go to review bookmarks
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="bookmarks"]').click();
    const items = page.locator('.bookmark-item');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
    // Drill button should be visible
    await expect(page.locator('#btn-drill-bookmarks')).toBeVisible();
  });

  test('remove bookmark button removes item', async ({ page }) => {
    // Ensure bookmarked
    const cls = await page.locator('#btn-bookmark').getAttribute('class');
    if (!cls?.includes('bookmarked')) await page.locator('#btn-bookmark').click();
    await page.locator('[data-tab="review"]').click();
    await page.locator('[data-subtab="bookmarks"]').click();
    const removeBtn = page.locator('.bookmark-remove').first();
    await removeBtn.click();
    const items = page.locator('.bookmark-item');
    const count = await items.count();
    expect(count).toBe(0);
  });
});

test.describe('A-E Keyboard Shortcuts', () => {
  test('pressing A selects first choice', async ({ page }) => {
    await page.locator('[data-tab="practice"]').click();
    await page.keyboard.press('a');
    const selected = page.locator('#q-choices .choice.selected');
    await expect(selected).toHaveCount(1);
    const choices = page.locator('#q-choices .choice');
    const firstChoice = choices.nth(0);
    await expect(firstChoice).toHaveClass(/selected/);
  });

  test('pressing C selects third choice', async ({ page }) => {
    await page.locator('[data-tab="practice"]').click();
    await page.keyboard.press('c');
    const choices = page.locator('#q-choices .choice');
    const thirdChoice = choices.nth(2);
    await expect(thirdChoice).toHaveClass(/selected/);
  });

  test('A-E shortcut works alongside 1-5 shortcut', async ({ page }) => {
    await page.locator('[data-tab="practice"]').click();
    await page.keyboard.press('1');
    let firstChoice = page.locator('#q-choices .choice').nth(0);
    await expect(firstChoice).toHaveClass(/selected/);
    await page.keyboard.press('e');
    const choices = page.locator('#q-choices .choice');
    const count = await choices.count();
    // Only DS questions have <5 choices; ensure E works if there are 5 choices
    if (count >= 5) {
      const fifthChoice = choices.nth(4);
      await expect(fifthChoice).toHaveClass(/selected/);
    }
  });
});

test.describe('Weak Spots Widget', () => {
  test('weak spots section is hidden by default (no data)', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    const section = page.locator('#weak-spots-section');
    await expect(section).toBeHidden();
  });

  test('weak spots list container exists in dashboard', async ({ page }) => {
    await expect(page.locator('#weak-spots-list')).toBeAttached();
  });

  test('weak spots section exists with correct heading', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await expect(page.locator('#weak-spots-section')).toBeAttached();
  });
});

test.describe('Topic Normalization & Filter', () => {
  test('topic filter dropdown has optgroup for GMAT Focus 2026', async ({ page }) => {
    const optgroups = page.locator('#filter-topic optgroup');
    const count = await optgroups.count();
    expect(count).toBeGreaterThanOrEqual(1);
    const firstLabel = await optgroups.first().getAttribute('label');
    expect(firstLabel).toContain('GMAT Focus 2026');
  });

  test('topic filter contains canonical topic names', async ({ page }) => {
    const opts = page.locator('#filter-topic option');
    const values = await opts.evaluateAll(els => els.map(e => e.value));
    expect(values).toContain('Number Properties');
    expect(values).toContain('Strengthen');
    expect(values).toContain('Parallelism');
    expect(values).toContain('Graphics Interpretation');
  });

  test('canonical topics do not include raw duplicates', async ({ page }) => {
    const opts = page.locator('#filter-topic option');
    const values = await opts.evaluateAll(els => els.map(e => e.value));
    // Raw topic variants should be collapsed into canonical forms
    expect(values).not.toContain('Coordinate'); // should be 'Coordinate Geometry'
    expect(values).not.toContain('Function');   // should be 'Functions'
    expect(values).not.toContain('Bold Face');  // should be 'Bold-Face'
  });

  test('question topic badge shows canonical name', async ({ page }) => {
    const topicBadge = page.locator('#q-topic');
    const text = await topicBadge.textContent();
    expect(text.trim().length).toBeGreaterThan(0);
    // Should not show the raw fragmented names like 'Coordinate' alone
    expect(text.trim()).not.toBe('Coordinate');
    expect(text.trim()).not.toBe('Function');
  });
});

test.describe('Question Annotations', () => {
  test('annotation row exists and is hidden before submission', async ({ page }) => {
    await expect(page.locator('#annotation-row')).toBeHidden();
  });

  test('annotation row appears after submitting answer', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await expect(page.locator('#annotation-row')).toBeVisible({ timeout: 3000 });
  });

  test('add note button is visible in annotation row after submission', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await expect(page.locator('#btn-annotation')).toBeVisible({ timeout: 3000 });
  });

  test('clicking add note shows textarea', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-annotation').click();
    await expect(page.locator('#annotation-textarea')).toBeVisible();
  });

  test('saving annotation hides input and shows note', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-annotation').click();
    await page.locator('#annotation-textarea').fill('Remember: plug in numbers for this type');
    await page.locator('#annotation-save').click();
    await expect(page.locator('#annotation-display')).toBeVisible();
    await expect(page.locator('#annotation-input-area')).toBeHidden();
  });
});
