import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.VRT_PORT ?? 4173);
const BASE_URL = process.env.VRT_BASE_URL ?? `http://localhost:${PORT}`;

/**
 * Self-baseline visual-regression config for the Svelte gallery.
 *
 * Baselines are committed under `baseline/<project>/...` and act as the CI gate.
 * Use `pnpm vrt:update` to (re)generate them after intentional visual changes.
 */
export default defineConfig({
  testDir: '.',
  testMatch: /vrt\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Generous so the first test per route absorbs cold Vite compilation.
  timeout: 120_000,
  workers: process.env.CI ? 2 : undefined,
  globalSetup: './global-setup.ts',
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  // Pixel output is OS-specific, so scope baselines by platform (darwin/linux).
  snapshotPathTemplate: '{testDir}/baseline/{projectName}-{platform}/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      // Per-pixel tolerance for sub-pixel AA noise; whole-image ratio guards
      // against real regressions. Tightened during the button pilot.
      threshold: 0.15,
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
      scale: 'device',
    },
  },
  use: {
    baseURL: BASE_URL,
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
    locale: 'en-US',
    timezoneId: 'UTC',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], deviceScaleFactor: 2 },
    },
  ],
  webServer: {
    command: `pnpm --filter @axelrock/kumo-svelte exec vite dev --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
