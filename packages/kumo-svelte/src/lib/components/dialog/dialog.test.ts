import { describe, expect, it } from 'vitest';
import { KUMO_DIALOG_VARIANTS } from './Dialog.variants';

describe('Dialog variants', () => {
  it('uses fixed width classes for size variants', () => {
    for (const [size, expectedClass] of [
      ['sm', 'sm:w-72'],
      ['base', 'sm:w-96'],
      ['lg', 'sm:w-[32rem]'],
      ['xl', 'sm:w-[48rem]']
    ] as const) {
      const className = KUMO_DIALOG_VARIANTS.size[size].classes;
      expect(className).toContain(expectedClass);
      expect(className).not.toContain('min-w');
    }
  });
});
