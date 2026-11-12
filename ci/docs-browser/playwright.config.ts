import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.DOCS_TEST_PORT ?? 4180);
const baseURL = process.env.DOCS_TEST_URL ?? `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: ".",
  testMatch: "*.spec.ts",
  fullyParallel: true,
  use: { baseURL, reducedMotion: "reduce" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: process.env.DOCS_TEST_URL
    ? undefined
    : {
        command: `pnpm build && pnpm preview --host 127.0.0.1 --port ${port} --strictPort`,
        url: baseURL,
        timeout: 120_000,
      },
});
