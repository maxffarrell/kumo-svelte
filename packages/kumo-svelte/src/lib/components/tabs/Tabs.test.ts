import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
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

  it('hides overflow controls when removed tabs leave the remaining tabs fitting', async () => {
    const baseItems = [
      { value: 'overview', label: 'Overview' },
      { value: 'metrics', label: 'Metrics' },
      { value: 'deployments', label: 'Deployments' },
      { value: 'observability', label: 'Observability' },
      { value: 'domains', label: 'Domains' },
      { value: 'access', label: 'Access' },
      { value: 'settings', label: 'Settings' }
    ];
    const extraItems = [
      { value: 'analytics', label: 'Analytics' },
      { value: 'logs', label: 'Logs' },
      { value: 'security', label: 'Security' }
    ];
    const { container, rerender } = render(Tabs, {
      value: 'settings',
      items: [...baseItems, ...extraItems]
    });
    const list = screen.getByRole('tablist');

    setTabListSize(list, { clientWidth: 600, scrollWidth: 800 });
    await fireEvent.scroll(list);

    const endControl = container.querySelector<HTMLElement>(
      '[data-kumo-part="overflow-control"][data-side="end"]'
    );
    await waitFor(() => expect(endControl?.getAttribute('aria-hidden')).toBe('false'));

    setTabListSize(list, { clientWidth: 588, scrollWidth: 588 });
    await rerender({ value: 'settings', items: baseItems });

    await waitFor(() => expect(endControl?.getAttribute('aria-hidden')).toBe('true'));
  });
});

function setTabListSize(
  list: HTMLElement,
  { clientWidth, scrollWidth }: { clientWidth: number; scrollWidth: number }
) {
  defineReadonlyNumber(list, 'clientWidth', clientWidth);
  defineReadonlyNumber(list, 'scrollWidth', scrollWidth);
}

function defineReadonlyNumber(
  element: HTMLElement,
  property: 'clientWidth' | 'scrollWidth',
  value: number
) {
  Object.defineProperty(element, property, { configurable: true, value });
}
