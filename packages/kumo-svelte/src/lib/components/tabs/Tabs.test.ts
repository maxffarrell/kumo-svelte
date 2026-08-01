import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Tabs from './Tabs.svelte';

describe('Tabs', () => {
  it('keeps underline tabs horizontally scrollable for overflow controls', () => {
    render(Tabs, {
      variant: 'underline',
      value: 'overview',
      items: [
        { value: 'overview', label: 'Overview' },
        { value: 'settings', label: 'Settings' }
      ]
    });

    const list = screen.getByRole('tablist');
    expect(list.className).toContain('overflow-x-auto');
    expect(list.className).toContain('overflow-y-hidden');
  });
});
