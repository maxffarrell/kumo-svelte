import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Tabs from './Tabs.svelte';

describe('Tabs', () => {
  it('keeps underline tabs horizontally scrollable without overflow controls', () => {
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
    expect(document.querySelectorAll('[data-kumo-part="overflow-control"]')).toHaveLength(0);
  });

  it('renders overflow controls for segmented tabs', () => {
    render(Tabs, {
      variant: 'segmented',
      value: 'overview',
      items: [{ value: 'overview', label: 'Overview' }]
    });

    expect(document.querySelectorAll('[data-kumo-part="overflow-control"]')).toHaveLength(2);
  });
});
