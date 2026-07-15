import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Tabs from './Tabs.svelte';
import TabsTestHost from './TabsTestHost.svelte';

describe('Tabs', () => {
  it('renders tabs with Kumo data attributes', () => {
    render(TabsTestHost);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]?.getAttribute('data-kumo-component')).toBe('Tabs');
    expect(tabs[0]?.getAttribute('data-kumo-part')).toBe('tab');
  });

  describe('variant fidelity', () => {
    it('applies segmented active state classes', () => {
      render(TabsTestHost, { variant: 'segmented', value: 'tab1' });
      const activeTab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(activeTab.className).toContain('aria-selected:text-kumo-default');
    });

    it('applies underline active and hover classes', () => {
      render(TabsTestHost, { variant: 'underline', value: 'tab2' });
      const activeTab = screen.getByRole('tab', { name: 'Tab 2' });
      expect(activeTab.className).toContain('aria-selected:font-medium');
      expect(activeTab.className).toContain('aria-selected:hover:bg-kumo-tint');
      expect(activeTab.className).toContain('aria-selected:text-kumo-default');
    });

    it('applies indicator positioning classes for segmented variant', () => {
      const { container } = render(TabsTestHost, { variant: 'segmented', value: 'tab1' });
      const indicator = container.querySelector('[aria-hidden="true"]');
      expect(indicator?.className).toContain('top-(--active-tab-top)');
      expect(indicator?.className).toContain('h-(--active-tab-height)');
    });

    it('applies sm size classes', () => {
      render(TabsTestHost, { size: 'sm', value: 'tab1' });
      const tab = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab.className).toContain('text-xs');
    });
  });

  describe('interaction', () => {
    it('switches tabs via click', async () => {
      let value = 'tab1';
      const onValueChange = vi.fn((next: string) => {
        value = next;
      });

      render(Tabs, {
        tabs: [
          { value: 'tab1', label: 'Tab 1' },
          { value: 'tab2', label: 'Tab 2' }
        ],
        value,
        onValueChange
      });

      await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
      expect(onValueChange).toHaveBeenCalledWith('tab2');
    });

    it('navigates tabs via ArrowRight keyboard', async () => {
      render(TabsTestHost, { value: 'tab1' });

      const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
      firstTab.focus();
      expect(document.activeElement).toBe(firstTab);

      await userEvent.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Tab 2' }));
    });

    it('sets aria-selected on the active tab', () => {
      render(TabsTestHost, { value: 'tab2' });

      expect(screen.getByRole('tab', { name: 'Tab 1' }).getAttribute('aria-selected')).toBe('false');
      expect(screen.getByRole('tab', { name: 'Tab 2' }).getAttribute('aria-selected')).toBe('true');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (segmented)', async () => {
      const { container } = render(TabsTestHost, { variant: 'segmented', value: 'tab1' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (underline)', async () => {
      const { container } = render(TabsTestHost, { variant: 'underline', value: 'tab2' });
      await expectNoA11yViolations(container);
    });
  });
});
