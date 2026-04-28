const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:4173';

// Clear localStorage before each test for isolation
test.beforeEach(async ({ page }) => {
  await page.goto(BASE);
  await page.evaluate(() => localStorage.removeItem('gmat-trainer-v2'));
  await page.reload();
  await page.waitForSelector('#q-question');
});

// ══════════════════════════════════════════════
// 1. PAGE LOAD & INITIAL STATE
// ══════════════════════════════════════════════
test.describe('Page load & initial state', () => {
  test('loads without errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(BASE);
    await page.waitForSelector('#q-question');
    expect(errors).toHaveLength(0);
  });

  test('shows brand title', async ({ page }) => {
    await expect(page.locator('.brand-title')).toContainText('GMAT Math Trainer');
  });

  test('bank summary shows question count ≥150', async ({ page }) => {
    const summary = await page.locator('#bank-summary').textContent();
    const count = parseInt(summary.match(/(\d+)/)?.[1] ?? '0');
    expect(count).toBeGreaterThanOrEqual(150);
  });

  test('Practice tab is active by default', async ({ page }) => {
    await expect(page.locator('.tab-btn.active')).toHaveAttribute('data-tab', 'practice');
    await expect(page.locator('#tab-practice')).toHaveClass(/active/);
  });

  test('header stats are visible', async ({ page }) => {
    await expect(page.locator('#hdr-today')).toBeVisible();
    await expect(page.locator('#hdr-streak')).toBeVisible();
  });

  test('Submit button disabled before choosing answer', async ({ page }) => {
    await expect(page.locator('#btn-submit')).toBeDisabled();
  });

  test('Skip button enabled', async ({ page }) => {
    await expect(page.locator('#btn-skip')).toBeEnabled();
  });

  test('Next button hidden initially', async ({ page }) => {
    // hidden attribute + [hidden]{display:none!important} in CSS
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
    // choices use class="choice" (not choice-btn)
    const choices = page.locator('#q-choices .choice');
    await expect(choices).toHaveCount(5);
  });

  test('choice labels A–E visible', async ({ page }) => {
    const labels = await page.locator('#q-choices .choice-letter').allTextContents();
    expect(labels).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  test('shows type badge (PS or DS)', async ({ page }) => {
    const type = await page.locator('#q-type').textContent();
    expect(['PS', 'DS']).toContain(type.trim());
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
    // Timer counts up — values should differ after 1.2s
    expect(t1).not.toBe(t2);
  });

  test('timer starts near 0:00', async ({ page }) => {
    const timerText = await page.locator('#q-timer-value').textContent();
    // Timer counts up from 0 — should show 0:0x at load time
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
  test('submitting shows feedback panel', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await expect(page.locator('#q-feedback')).toBeVisible();
  });

  test('feedback shows correct answer letter', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const answer = await page.locator('#feedback-answer').textContent();
    expect(answer.trim()).toMatch(/^[A-E]/);
  });

  test('feedback shows explanation', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const explanation = await page.locator('#feedback-explanation').textContent();
    expect(explanation.trim().length).toBeGreaterThan(5);
  });

  test('feedback shows Correct or Wrong status', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const status = await page.locator('#feedback-status').textContent();
    expect(status.trim()).toMatch(/Correct|Incorrect/i);
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
    await expect(page.locator('#q-feedback')).toBeVisible();
  });

  test('choices are disabled after submit', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    // After submit all choices should be non-interactive (pointer-events:none or disabled class)
    const choices = page.locator('#q-choices .choice');
    const count = await choices.count();
    for (let i = 0; i < count; i++) {
      // Choices get correct/wrong/selected classes — clicking them should not change selection
      const classBefore = await choices.nth(i).getAttribute('class');
      await choices.nth(i).click({ force: true });
      const classAfter = await choices.nth(i).getAttribute('class');
      expect(classBefore).toBe(classAfter);
    }
  });

  test('correct answer choice highlighted green', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    // At least one choice should have 'correct' class
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
    const feedbackVisible = await page.locator('#q-feedback').isVisible();
    expect(!nextHidden || feedbackVisible).toBeTruthy();
  });

  test('keyboard S key skips', async ({ page }) => {
    await page.keyboard.press('s');
    await page.waitForTimeout(300);
    const nextHidden = await page.locator('#btn-next').evaluate(el => el.hidden);
    const feedbackVisible = await page.locator('#q-feedback').isVisible();
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
    const feedbackVisible = await page.locator('#q-feedback').isVisible();
    expect(feedbackVisible).toBe(false);
  });

  test('keyboard N advances after submit', async ({ page }) => {
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await page.keyboard.press('n');
    await page.waitForTimeout(300);
    const feedbackVisible = await page.locator('#q-feedback').isVisible();
    expect(feedbackVisible).toBe(false);
  });

  test('session today count increments after each question', async ({ page }) => {
    const before = parseInt(await page.locator('#hdr-today').textContent() || '0');
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    const after = parseInt(await page.locator('#hdr-today').textContent() || '0');
    expect(after).toBe(before + 1);
  });

  test('correct count increments only on correct answer', async ({ page }) => {
    const correctBefore = parseInt(await page.locator('#ss-correct').textContent() || '0');
    const wrongBefore = parseInt(await page.locator('#ss-wrong').textContent() || '0');
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    // Wait for feedback to fully render including session counters
    await expect(page.locator('#q-feedback')).toBeVisible();
    await page.waitForTimeout(100);
    const status = await page.locator('#feedback-status').textContent();
    const correctAfter = parseInt(await page.locator('#ss-correct').textContent() || '0');
    const wrongAfter = parseInt(await page.locator('#ss-wrong').textContent() || '0');
    // status is '✓ Correct!' or '✗ Incorrect' — use ✓/✗ not 'correct' (substring of 'incorrect')
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
// 7. FILTERS
// ══════════════════════════════════════════════
test.describe('Filters', () => {
  test('filtering by PS shows only PS questions', async ({ page }) => {
    await page.selectOption('#filter-type', 'PS');
    await page.waitForTimeout(300);
    for (let i = 0; i < 4; i++) {
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

  test('DS questions have sufficiency choices', async ({ page }) => {
    await page.selectOption('#filter-type', 'DS');
    await page.waitForTimeout(300);
    const choiceTexts = await page.locator('#q-choices .choice-text').allTextContents();
    const mentionsStatement = choiceTexts.some(t => /statement/i.test(t));
    expect(mentionsStatement).toBeTruthy();
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
    expect(options.length).toBeGreaterThan(3);
    expect(options[0]).toMatch(/all/i);
  });

  test('filtering by specific topic shows that topic', async ({ page }) => {
    const topicOptions = await page.locator('#filter-topic option').allTextContents();
    const firstRealTopic = topicOptions.find(o => !o.toLowerCase().includes('all'))?.trim();
    if (!firstRealTopic) return;
    await page.selectOption('#filter-topic', { label: firstRealTopic });
    await page.waitForTimeout(300);
    const shownTopic = (await page.locator('#q-topic').textContent()).trim();
    // badge may show "Algebra · Exponents" (topic + subtopic) — check starts with filter value
    expect(shownTopic.startsWith(firstRealTopic)).toBeTruthy();
  });

  test('Restart button resets question state', async ({ page }) => {
    await page.locator('#btn-restart').click();
    await page.waitForTimeout(300);
    const feedbackVisible = await page.locator('#q-feedback').isVisible();
    expect(feedbackVisible).toBe(false);
    const nextHidden = await page.locator('#btn-next').evaluate(el => el.hidden);
    expect(nextHidden).toBe(true);
  });
});

// ══════════════════════════════════════════════
// 8. TABS
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

  test('Practice tab returns to practice', async ({ page }) => {
    await page.locator('[data-tab="dashboard"]').click();
    await page.locator('[data-tab="practice"]').click();
    await expect(page.locator('#tab-practice')).toHaveClass(/active/);
  });
});

// ══════════════════════════════════════════════
// 9. DASHBOARD
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

  test('shows difficulty performance rows after answering', async ({ page }) => {
    // Bars only render for attempted difficulty levels (1 answer = 1 bar max)
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

  test('Missed SR mode loads a question or shows message', async ({ page }) => {
    await page.selectOption('#filter-mode', 'missed');
    await page.waitForTimeout(300);
    const qText = await page.locator('#q-question').textContent();
    expect(qText).toBeDefined();
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
      await expect(page.locator('#q-feedback')).toBeVisible();
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

  test('mixed PS+DS session works end-to-end', async ({ page }) => {
    await page.selectOption('#filter-type', 'PS');
    await page.waitForTimeout(200);
    await page.locator('#q-choices .choice').nth(1).click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-next').click();

    await page.selectOption('#filter-type', 'DS');
    await page.waitForTimeout(200);
    const type = await page.locator('#q-type').textContent();
    expect(type.trim()).toBe('DS');
    await page.locator('#q-choices .choice').nth(0).click();
    await page.locator('#btn-submit').click();
    await page.locator('#btn-next').click();

    const today = parseInt(await page.locator('#hdr-today').textContent() || '0');
    expect(today).toBeGreaterThanOrEqual(2);
  });

  test('correct answer choice highlighted green after submit', async ({ page }) => {
    // Submit any answer — correct choice always gets .correct class regardless of what was picked
    await page.locator('#q-choices .choice').first().click();
    await page.locator('#btn-submit').click();
    await expect(page.locator('#q-feedback')).toBeVisible();
    // Exactly one choice should have .correct class (the right answer)
    const greenCount = await page.locator('#q-choices .choice.correct').count();
    expect(greenCount).toBe(1);
    // If we picked wrong, our choice should have .wrong class
    const status = await page.locator('#feedback-status').textContent();
    if (!status.includes('✓')) {
      const redCount = await page.locator('#q-choices .choice.wrong').count();
      expect(redCount).toBe(1);
    }
  });
});
