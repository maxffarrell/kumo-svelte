import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Dialog from './Dialog.svelte';

describe('Dialog variants', () => {
  it('uses fixed width classes for size variants', () => {
    for (const [size, expectedClass] of [
      ['sm', 'sm:w-72'],
      ['base', 'sm:w-96'],
      ['lg', 'sm:w-[32rem]'],
      ['xl', 'sm:w-[48rem]']
    ] as const) {
      render(Dialog, {
        open: true,
        size,
        title: `${size} dialog`
      });

      const className = screen.getByRole('dialog', {
        name: `${size} dialog`
      }).className;
      expect(className).toContain(expectedClass);
      expect(className).not.toContain('min-w');
    }
  });
});
