import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Checkbox from './Checkbox.svelte';

describe('Checkbox', () => {
  it('renders with Kumo data attributes', () => {
    render(Checkbox, { 'aria-label': 'Accept terms' });

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox.getAttribute('data-kumo-component')).toBe('Checkbox');
  });

  it('renders a labeled field wrapper when label is provided', () => {
    render(Checkbox, { label: 'Email notifications' });

    expect(screen.getByText('Email notifications')).toBeTruthy();
    expect(screen.getByRole('checkbox', { name: 'Email notifications' })).toBeTruthy();
  });

  describe('variant fidelity', () => {
    it('applies default ring and hover affordances', () => {
      render(Checkbox, { 'aria-label': 'Default' });
      const cls = screen.getByRole('checkbox', { name: 'Default' }).className;
      expect(cls).toContain('ring-kumo-hairline');
      expect(cls).toContain('hover:ring-kumo-hairline');
      expect(cls).toContain('shrink-0');
    });

    it('applies error ring classes', () => {
      render(Checkbox, { variant: 'error', 'aria-label': 'Error' });
      const cls = screen.getByRole('checkbox', { name: 'Error' }).className;
      expect(cls).toContain('ring-kumo-danger');
    });

    it('restores checked and indeterminate state classes', () => {
      render(Checkbox, { checked: true, 'aria-label': 'Checked' });
      const cls = screen.getByRole('checkbox', { name: 'Checked' }).className;
      expect(cls).toContain('data-[checked]:bg-kumo-contrast');
      expect(cls).toContain('data-[indeterminate]:bg-kumo-contrast');
    });

  });

  describe('interaction', () => {
    it('toggles checked state on click', async () => {
      const onCheckedChange = vi.fn();
      render(Checkbox, {
        checked: false,
        onCheckedChange,
        'aria-label': 'Toggle'
      });

      const checkbox = screen.getByRole('checkbox', { name: 'Toggle' });
      expect(checkbox.getAttribute('aria-checked')).toBe('false');

      await userEvent.click(checkbox);
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('does not toggle when disabled', async () => {
      const onCheckedChange = vi.fn();
      render(Checkbox, {
        disabled: true,
        onCheckedChange,
        'aria-label': 'Disabled'
      });

      await userEvent.click(screen.getByRole('checkbox', { name: 'Disabled' }));
      expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it('toggles via keyboard (Space)', async () => {
      const onCheckedChange = vi.fn();
      render(Checkbox, { onCheckedChange, 'aria-label': 'Keyboard' });

      const checkbox = screen.getByRole('checkbox', { name: 'Keyboard' });
      checkbox.focus();
      expect(document.activeElement).toBe(checkbox);

      await userEvent.keyboard(' ');
      expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (unchecked)', async () => {
      const { container } = render(Checkbox, { 'aria-label': 'Accessible' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (with label)', async () => {
      const { container } = render(Checkbox, { label: 'Subscribe to newsletter' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (checked)', async () => {
      const { container } = render(Checkbox, {
        checked: true,
        label: 'Checked option'
      });
      await expectNoA11yViolations(container);
    });
  });
});
