import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test, type Locator, type Page } from '@playwright/test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const galleriesDir = join(__dirname, '../../packages/kumo-svelte/src/lib/vrt/galleries');

type VrtMode = 'light' | 'dark';
const ALL_MODES: VrtMode[] = ['light', 'dark'];

interface VrtAction {
  type: 'hover' | 'focus' | 'click' | 'press';
  key?: string;
  selector?: string;
}

function discoverGallerySlugs(): string[] {
  if (!existsSync(galleriesDir)) return [];
  return readdirSync(galleriesDir)
    .filter((f) => f.endsWith('.svelte'))
    .map((f) => f.replace('.svelte', ''))
    .sort();
}

// Soft-gated: canvas-rendered components (echarts/graph) are inherently
// non-deterministic and are excluded from the strict pixel gate.
const SOFT_GATE = new Set(['chart', 'flow']);

const COMPONENT_FILTER = process.env.VRT_COMPONENT;
const slugs = discoverGallerySlugs().filter(
  (s) => (!COMPONENT_FILTER || s === COMPONENT_FILTER) && !SOFT_GATE.has(s),
);

// Freeze the clock so date/time components (date-picker, etc.) render the same
// "today" every run, keeping baselines stable.
const FIXED_TIME = new Date('2024-01-15T12:00:00Z');

// SVG SMIL animations (e.g. the Loader spinner) are not affected by CSS
// `animation: none` or Playwright's animation disabling; freeze them via the DOM
// API and pin to t=0 for deterministic frames.
async function freezeSvgAnimations(page: Page): Promise<void> {
  await page.evaluate(() => {
    document.querySelectorAll('svg').forEach((svg) => {
      const el = svg as SVGSVGElement;
      if (typeof el.setCurrentTime === 'function') el.setCurrentTime(0);
      if (typeof el.pauseAnimations === 'function') el.pauseAnimations();
    });
  });
}

async function openGallery(page: Page, slug: string, mode: VrtMode): Promise<void> {
  await page.goto(`/vrt/${slug}?mode=${mode}`, { waitUntil: 'domcontentloaded' });
  // Cold Vite compilation of a route can take a while on first hit.
  await page.waitForSelector(`[data-vr-page="${slug}"][data-vr-ready="true"]`, { timeout: 90_000 });
  await page.evaluate(() => document.fonts.ready);
  await freezeSvgAnimations(page);
}

function primaryInteractive(target: Locator): Locator {
  return target
    .locator('button, a[href], [role="button"], input, [tabindex]:not([tabindex="-1"])')
    .first();
}

async function applyActions(target: Locator, page: Page, actions: VrtAction[]): Promise<void> {
  for (const action of actions) {
    const el = action.selector ? target.locator(action.selector).first() : primaryInteractive(target);
    const resolved = (await el.count()) > 0 ? el : target;
    await resolved.scrollIntoViewIfNeeded().catch(() => {});
    // Fail fast (don't retry-click for minutes) if a scenario target is unreachable.
    const opts = { timeout: 5000 } as const;
    switch (action.type) {
      case 'hover':
        await resolved.hover(opts);
        break;
      case 'focus':
        await resolved.focus(opts);
        break;
      case 'click':
        await resolved.click(opts);
        break;
      case 'press':
        await resolved.press(action.key ?? 'Enter', opts);
        break;
      default: {
        const _exhaustive: never = action.type;
        throw new Error(`Unknown VRT action: ${String(_exhaustive)}`);
      }
    }
    await page.waitForTimeout(60);
  }
}

interface ScenarioMeta {
  id: string;
  interact: VrtAction[] | null;
  capture: 'target' | 'page';
}

async function readScenarios(page: Page): Promise<ScenarioMeta[]> {
  return page.$$eval('[data-vr-scenario]', (nodes) =>
    nodes.map((n) => {
      const raw = n.getAttribute('data-vr-interact');
      return {
        id: n.getAttribute('data-vr-scenario') as string,
        interact: raw ? (JSON.parse(raw) as VrtAction[]) : null,
        capture: (n.getAttribute('data-vr-capture') as 'target' | 'page') ?? 'target',
      };
    }),
  );
}

test.beforeEach(async ({ page }) => {
  // Must run before navigation so the page's Date/timers are frozen.
  await page.clock.install({ time: FIXED_TIME });
});

for (const slug of slugs) {
  test.describe(slug, () => {
    for (const mode of ALL_MODES) {
      // Static scenarios (no interactions): one page load, screenshot each target.
      test(`statics (${mode})`, async ({ page }) => {
        await openGallery(page, slug, mode);
        const scenarios = await readScenarios(page);
        const statics = scenarios.filter((s) => !s.interact);
        expect(statics.length, `gallery ${slug} has no static scenarios`).toBeGreaterThan(0);

        for (const s of statics) {
          const target = page.locator(`[data-vr-scenario="${s.id}"]`);
          if (s.capture === 'page') {
            await expect(page).toHaveScreenshot(`${slug}/${s.id}-${mode}.png`);
          } else {
            await expect(target).toHaveScreenshot(`${slug}/${s.id}-${mode}.png`);
          }
        }
      });
    }

    // Interaction scenarios: discovered once, each gets an isolated page load.
    let interactiveScenarios: ScenarioMeta[] = [];
    test.beforeAll(async ({ browser }) => {
      const page = await browser.newPage();
      await openGallery(page, slug, 'light');
      interactiveScenarios = (await readScenarios(page)).filter((s) => s.interact);
      await page.close();
    });

    for (const mode of ALL_MODES) {
      test(`interactions (${mode})`, async ({ page }) => {
        test.skip(interactiveScenarios.length === 0, 'no interaction scenarios');
        await openGallery(page, slug, mode);
        for (const s of interactiveScenarios) {
          // Re-open per scenario so interactions never leak across captures.
          await openGallery(page, slug, mode);
          const target = page.locator(`[data-vr-scenario="${s.id}"]`);
          await applyActions(target, page, s.interact ?? []);
          await freezeSvgAnimations(page);
          if (s.capture === 'page') {
            await expect(page).toHaveScreenshot(`${slug}/${s.id}-${mode}.png`);
          } else {
            await expect(target).toHaveScreenshot(`${slug}/${s.id}-${mode}.png`);
          }
        }
      });
    }
  });
}
