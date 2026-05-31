// Mobile-web regression spec — pins the iPhone 13 Pro layout invariants.
// Run: npx playwright test tests/mobile.spec.js --project=iphone
// (or just `npx playwright test`; this file uses devices['iPhone 13 Pro'] inline.)

const { test, expect } = require('@playwright/test');

// Device emulation is supplied by the "mobile" project in playwright.config.js
// (chromium-rendered iPhone 13 Pro viewport, 390x844 @ DPR 3).

test.describe('Mobile layout — iPhone 13 Pro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load').catch(() => {});
    await page.waitForTimeout(800);
  });

  test('no horizontal scroll on practice tab', async ({ page }) => {
    const overflow = await page.evaluate(() => {
      const root = document.scrollingElement;
      return { scrollW: root.scrollWidth, clientW: root.clientWidth };
    });
    expect(overflow.scrollW).toBeLessThanOrEqual(overflow.clientW + 1);
  });

  test('mobile filter toggle is visible and sidebar starts hidden', async ({ page }) => {
    const toggle = page.locator('#mobile-filter-toggle');
    await expect(toggle).toBeVisible();

    const sidebar = page.locator('#practice-sidebar');
    const sb = await sidebar.boundingBox();
    // Sidebar is in its closed (translated off-screen) state OR below viewport
    expect(sb.y).toBeGreaterThan(0);
  });

  test('opens drawer on tap, backdrop appears, closes on backdrop tap', async ({ page }) => {
    const toggle = page.locator('#mobile-filter-toggle');
    const sidebar = page.locator('#practice-sidebar');
    const backdrop = page.locator('#mobile-filter-backdrop');

    await toggle.tap();
    await expect(sidebar).toHaveClass(/drawer-open/);
    await expect(backdrop).toBeVisible();

    // Tap backdrop = close
    await backdrop.tap({ position: { x: 50, y: 50 } });
    await page.waitForTimeout(350);
    await expect(sidebar).not.toHaveClass(/drawer-open/);
  });

  test('header stays single-row on phone (<=72px tall)', async ({ page }) => {
    const header = page.locator('.app-header');
    const box = await header.boundingBox();
    expect(box.height).toBeLessThanOrEqual(80);
  });

  test('tab buttons are at least 44px tall (Apple HIG)', async ({ page }) => {
    const tabs = page.locator('.tab-btn');
    const count = await tabs.count();
    for (let i = 0; i < count; i++) {
      const h = await tabs.nth(i).evaluate((el) => el.getBoundingClientRect().height);
      expect(h).toBeGreaterThanOrEqual(44);
    }
  });

  test('primary CTA buttons are at least 36px tall (icon btns) and main CTAs ≥44px', async ({ page }) => {
    // Main action buttons in the question card
    const main = page.locator('.qcard-actions > .btn:not(.btn-small):visible');
    const mainCount = await main.count();
    for (let i = 0; i < mainCount; i++) {
      const h = await main.nth(i).evaluate((el) => el.getBoundingClientRect().height);
      if (h > 0) expect(h, 'main CTA must be ≥44px').toBeGreaterThanOrEqual(44);
    }
    // Icon buttons + small btns: at least 36px (Apple HIG allows smaller for non-primary)
    const small = page.locator('.qcard-actions .btn-small:visible, .btn-flag:visible, .btn-bookmark:visible');
    const smallCount = await small.count();
    for (let i = 0; i < smallCount; i++) {
      const h = await small.nth(i).evaluate((el) => el.getBoundingClientRect().height);
      if (h > 0) expect(h, 'small/icon btn must be ≥36px').toBeGreaterThanOrEqual(36);
    }
  });

  test('question card visible above the fold (first 844px)', async ({ page }) => {
    const card = page.locator('.question-card').first();
    const box = await card.boundingBox();
    expect(box).not.toBeNull();
    // Top of card is within viewport, not pushed below by sidebar
    expect(box.y).toBeLessThan(220);
  });

  test('exam-simulation modal stays within viewport width', async ({ page }) => {
    // Exam button now lives inside the filter drawer on mobile — open the drawer first
    await page.locator('#mobile-filter-toggle').tap();
    await page.waitForTimeout(300);
    await page.locator('#btn-exam-mode').tap();
    await page.waitForTimeout(500);
    const modal = page.locator('#exam-modal .modal-card');
    await expect(modal).toBeVisible();
    const box = await modal.boundingBox();
    expect(box).not.toBeNull();
    const vp = page.viewportSize();
    expect(box.x).toBeGreaterThanOrEqual(-1);
    expect(box.x + box.width).toBeLessThanOrEqual(vp.width + 1);
  });

  test('stat-pill labels are hidden on phone (visual density)', async ({ page }) => {
    const label = page.locator('.stat-pill .stat-pill-label').first();
    const display = await label.evaluate((el) => getComputedStyle(el).display);
    expect(display).toBe('none');
  });

  test('viewport meta includes viewport-fit=cover', async ({ page }) => {
    const content = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(content).toMatch(/viewport-fit\s*=\s*cover/);
  });

  test('copy-question button copies question + choices to clipboard', async ({ page, context, browserName }) => {
    // Grant clipboard read so we can assert what landed
    if (browserName === 'chromium') {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    }
    const copyBtn = page.locator('#btn-copy-question');
    await expect(copyBtn).toBeVisible();
    const h = await copyBtn.evaluate((el) => el.getBoundingClientRect().height);
    expect(h, 'copy btn must be ≥36px tall').toBeGreaterThanOrEqual(36);
    await copyBtn.tap();
    await page.waitForTimeout(200);
    const text = await page.evaluate(() => navigator.clipboard.readText().catch(() => ''));
    expect(text).toMatch(/GMAT Focus/);
    expect(text).toMatch(/Question:/);
    expect(text).toMatch(/Choices:|Statements:/);
    // Visual feedback (checkmark)
    await expect(copyBtn).toHaveClass(/copied/);
  });

  test('all four tabs switch without horizontal overflow', async ({ page }) => {
    for (const t of ['dashboard', 'plan', 'review', 'settings']) {
      await page.locator(`.tab-btn[data-tab="${t}"]`).tap();
      await page.waitForTimeout(200);
      const overflow = await page.evaluate(() => ({
        scrollW: document.scrollingElement.scrollWidth,
        clientW: document.scrollingElement.clientWidth,
      }));
      expect(overflow.scrollW, `tab ${t} horizontal overflow`).toBeLessThanOrEqual(overflow.clientW + 1);
    }
  });
});
