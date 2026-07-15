import { vi } from 'vitest';
/**
 * Installs a writable `navigator.clipboard` mock. happy-dom exposes
 * `navigator.clipboard` as a getter-only property, so plain assignment throws;
 * this defines it instead. Returns the `writeText` spy.
 */
export declare function mockClipboard(): ReturnType<typeof vi.fn>;
