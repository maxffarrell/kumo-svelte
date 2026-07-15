import { vi } from 'vitest';

/**
 * Installs a writable `navigator.clipboard` mock. happy-dom exposes
 * `navigator.clipboard` as a getter-only property, so plain assignment throws;
 * this defines it instead. Returns the `writeText` spy.
 */
export function mockClipboard(): ReturnType<typeof vi.fn> {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText, readText: vi.fn().mockResolvedValue('') },
    configurable: true,
    writable: true,
  });
  return writeText;
}
