import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { tick } from 'svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Tabs from './Tabs.svelte';

const resizeObservers: TestTabsResizeObserver[] = [];

class TestTabsResizeObserver implements ResizeObserver {
  readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    resizeObservers.push(this);
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

beforeEach(() => {
  resizeObservers.length = 0;
  vi.stubGlobal('ResizeObserver', TestTabsResizeObserver);
});

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
  // White-box contract test: happy-dom does no layout, so this only asserts the
  // component reads layout-space offset* values and positions the indicator via
  // inline left/top (not getBoundingClientRect/transform). It does not verify
  // real rendering; that requires a browser (e.g. the docs demo).
  it('sizes and positions the indicator from layout values so ancestor transforms (e.g. Dialog open scale) do not shrink it', async () => {
    render(Tabs, {
      variant: 'segmented',
      value: 'settings',
      items: [
        { value: 'overview', label: 'Overview' },
        { value: 'settings', label: 'Settings' }
      ]
    });

    const list = screen.getByRole('tablist');
    const activeTab = list.querySelector<HTMLElement>('[data-state="active"]');
    expect(activeTab).not.toBeNull();
    if (!activeTab) return;

    // Full layout geometry, as offset* reports (immune to CSS transforms).
    Object.defineProperty(activeTab, 'offsetWidth', { configurable: true, value: 156.3 });
    Object.defineProperty(activeTab, 'offsetHeight', { configurable: true, value: 32 });
    Object.defineProperty(activeTab, 'offsetLeft', { configurable: true, value: 47 });
    Object.defineProperty(activeTab, 'offsetTop', { configurable: true, value: 1 });

    // What getBoundingClientRect() would report while the dialog open
    // animation applies scale(0.9): exactly 90% of the layout sizes. If the
    // component measured this viewport-space rect, the indicator would be
    // stuck at 140.7 x 28.8 because ResizeObserver does not fire when only an
    // ancestor transform changes.
    const scaledRect = {
      x: 42.3,
      y: 0.9,
      top: 0.9,
      left: 42.3,
      right: 183,
      bottom: 29.7,
      width: 140.7,
      height: 28.8
    } as DOMRect;
    vi.spyOn(activeTab, 'getBoundingClientRect').mockReturnValue(scaledRect);

    for (const observer of resizeObservers) observer.callback([], observer);
    await tick();

    const indicator = list.querySelector<HTMLElement>('[aria-hidden="true"]');
    expect(indicator).not.toBeNull();
    if (!indicator) return;
    expect(indicator.style.width).toBe('156.3px');
    expect(indicator.style.height).toBe('32px');
    expect(indicator.style.left).toBe('47px');
    expect(indicator.style.top).toBe('1px');
    // Indicator must be positioned with left/top, not transform: a translate-
    // based pop-in drifts for non-first tabs.
    expect(indicator.style.transform).toBe('');
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
