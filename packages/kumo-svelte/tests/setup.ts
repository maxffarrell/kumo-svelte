import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/svelte";
import { afterAll, afterEach } from "vitest";
import { setTimeout as waitForTimer } from "node:timers/promises";

afterEach(() => {
  cleanup();
});

// Bits UI releases its final body lock on a deferred timer.
afterAll(async () => {
  await waitForTimer(50);
});
