import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, type FullConfig } from '@playwright/test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const galleriesDir = join(__dirname, '../../packages/kumo-svelte/src/lib/vrt/galleries');

/**
 * Warms every gallery route once (serially) so the parallel test workers don't
 * all collide on the same cold Vite compilation and time out.
 */
async function globalSetup(config: FullConfig): Promise<void> {
  const baseURL =
    config.projects[0]?.use?.baseURL ?? process.env.VRT_BASE_URL ?? 'http://localhost:4173';

  // Wait for the dev server to accept connections.
  const start = Date.now();
  while (Date.now() - start < 180_000) {
    try {
      const res = await fetch(`${baseURL}/`);
      if (res.ok || res.status === 404) break;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  const slugs = existsSync(galleriesDir)
    ? readdirSync(galleriesDir)
        .filter((f) => f.endsWith('.svelte'))
        .map((f) => f.replace('.svelte', ''))
        .filter((s) => !process.env.VRT_COMPONENT || s === process.env.VRT_COMPONENT)
        .sort()
    : [];

  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const slug of slugs) {
    try {
      await page.goto(`${baseURL}/vrt/${slug}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
      await page.waitForSelector(`[data-vr-page="${slug}"][data-vr-ready="true"]`, { timeout: 120_000 });
    } catch {
      // Warmup is best-effort; the tests themselves will surface real failures.
    }
  }
  await browser.close();
}

export default globalSetup;
