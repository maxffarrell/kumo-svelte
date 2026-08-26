import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Switch from './Switch.svelte';

describe('Switch', () => {
  it('renders with Kumo data attributes', () => {
    render(Switch, { 'aria-label': 'Notifications' });

    const control = screen.getByRole('switch', { name: 'Notifications' });
    expect(control.getAttribute('data-kumo-component')).toBe('Switch');
  });

  it('renders a labeled control when label is provided', () => {
    render(Switch, { label: 'Enable notifications', checked: true });

    expect(screen.getByText('Enable notifications')).toBeTruthy();
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeTruthy();
  });

  describe('variant fidelity', () => {
    it('applies default track colors when checked', () => {
      render(Switch, { 'aria-label': 'On', checked: true });
      const cls = screen.getByRole('switch', { name: 'On' }).className;
      expect(cls).toContain('bg-blue-500');
      expect(cls).toContain('ring-blue-600');
    });

    it('applies default track colors when off', () => {
      render(Switch, { 'aria-label': 'Off', checked: false });
      const cls = screen.getByRole('switch', { name: 'Off' }).className;
      expect(cls).toContain('bg-neutral-200');
      expect(cls).toContain('ring-neutral-300');
    });

    it('applies neutral variant track colors', () => {
      render(Switch, { 'aria-label': 'Neutral', variant: 'neutral', checked: true });
      const cls = screen.getByRole('switch', { name: 'Neutral' }).className;
      expect(cls).toContain('bg-neutral-500');
      expect(cls).toContain('ring-neutral-600');
    });

    it('exports upstream size variant classes', async () => {
      const mod = await import('./Switch.svelte');
      expect(mod.KUMO_SWITCH_VARIANTS.size.sm.classes).toContain('h-5.5');
      expect(mod.KUMO_SWITCH_VARIANTS.size.sm.classes).toContain('w-8.5');
      expect(mod.KUMO_SWITCH_VARIANTS.size.base.classes).toContain('h-6.5');
      expect(mod.KUMO_SWITCH_VARIANTS.size.lg.classes).toContain('h-7.5');
    });

    it('restores focus ring affordances', () => {
      render(Switch, { 'aria-label': 'Focus', checked: true });
      const cls = screen.getByRole('switch', { name: 'Focus' }).className;
      expect(cls).toContain('focus-visible:ring-kumo-brand');
      expect(cls).toContain('focus:outline-none');
    });
  });

  describe('interaction', () => {
    it('toggles checked state on click', async () => {
      const onCheckedChange = vi.fn();
      render(Switch, {
        checked: false,
        onCheckedChange,
        'aria-label': 'Toggle'
      });

      const control = screen.getByRole('switch', { name: 'Toggle' });
      expect(control.getAttribute('aria-checked')).toBe('false');

      await userEvent.click(control);
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('does not toggle when disabled', async () => {
      const onCheckedChange = vi.fn();
      render(Switch, {
        disabled: true,
        onCheckedChange,
        'aria-label': 'Disabled'
      });

      await userEvent.click(screen.getByRole('switch', { name: 'Disabled' }));
      expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it('toggles via keyboard (Space)', async () => {
      const onCheckedChange = vi.fn();
      render(Switch, { onCheckedChange, 'aria-label': 'Keyboard' });

      const control = screen.getByRole('switch', { name: 'Keyboard' });
      control.focus();
      expect(document.activeElement).toBe(control);

      await userEvent.keyboard(' ');
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (off)', async () => {
      const { container } = render(Switch, { 'aria-label': 'Accessible' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (with label, on)', async () => {
      const { container } = render(Switch, {
        checked: true,
        label: 'Dark mode'
      });
      await expectNoA11yViolations(container);
    });

    it('exposes aria-checked reflecting state', () => {
      render(Switch, { checked: true, 'aria-label': 'On' });
      expect(screen.getByRole('switch', { name: 'On' }).getAttribute('aria-checked')).toBe('true');

      render(Switch, { checked: false, 'aria-label': 'Off' });
      expect(screen.getByRole('switch', { name: 'Off' }).getAttribute('aria-checked')).toBe('false');
    });
  });
});
