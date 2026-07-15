import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Select from './Select.svelte';

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' }
];

describe('Select', () => {
  it('renders trigger with Kumo data attributes', () => {
    render(Select, {
      'aria-label': 'Favorite fruit',
      options: fruits
    });

    const trigger = screen.getByRole('button', { name: 'Favorite fruit' });
    expect(trigger.getAttribute('data-kumo-component')).toBe('Select');
    expect(trigger.getAttribute('data-kumo-part')).toBe('trigger');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('displays labels for non-string option values', () => {
    render(Select, {
      'aria-label': 'Rows per page',
      value: 50,
      options: [
        { label: '25 rows', value: 25 },
        { label: '50 rows', value: 50 },
        { label: '100 rows', value: 100 }
      ]
    });

    expect(screen.getByRole('button', { name: 'Rows per page' }).textContent).toContain('50 rows');
  });

  describe('variant fidelity', () => {
    it('applies selectVariants with button secondary base classes', () => {
      render(Select, { 'aria-label': 'Fruit', options: fruits });
      const cls = screen.getByRole('button', { name: 'Fruit' }).className;
      expect(cls).toContain('justify-between');
      expect(cls).toContain('font-normal');
      expect(cls).toContain('ring-kumo-line');
      expect(cls).not.toContain('ring-kumo-hairline');
    });

    it('applies error ring classes on trigger', () => {
      render(Select, {
        'aria-label': 'Fruit',
        options: fruits,
        error: 'Required'
      });
      const cls = screen.getByRole('button', { name: 'Fruit' }).className;
      expect(cls).toContain('!ring-kumo-danger');
      expect(cls).toContain('focus:ring-kumo-danger/50');
      expect(cls).toContain('focus:ring-[1.5px]');
    });

    it('applies disabled opacity classes on trigger', () => {
      render(Select, {
        'aria-label': 'Fruit',
        options: fruits,
        disabled: true
      });
      const cls = screen.getByRole('button', { name: 'Fruit' }).className;
      expect(cls).toContain('cursor-not-allowed');
      expect(cls).toContain('opacity-50');
    });

    it('applies size classes via selectVariants', () => {
      render(Select, { 'aria-label': 'Fruit', options: fruits, size: 'lg' });
      expect(screen.getByRole('button', { name: 'Fruit' }).className).toContain('h-10');
    });
  });

  describe('interaction', () => {
    it('opens on trigger click and updates aria-expanded', async () => {
      const user = userEvent.setup();
      render(Select, { 'aria-label': 'Favorite fruit', options: fruits });

      const trigger = screen.getByRole('button', { name: 'Favorite fruit' });
      expect(trigger.getAttribute('aria-expanded')).toBe('false');

      await user.click(trigger);

      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      // Open listbox content is covered by VRT (happy-dom does not mount portaled content).
    });

    it('selects an option via keyboard and updates displayed value', async () => {
      const user = userEvent.setup();
      let current = 'apple';
      const onValueChange = vi.fn((next: unknown) => {
        current = next as string;
      });

      const { rerender } = render(Select, {
        'aria-label': 'Favorite fruit',
        options: fruits,
        value: current,
        onValueChange
      });

      const trigger = screen.getByRole('button', { name: 'Favorite fruit' });
      trigger.focus();
      await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

      expect(onValueChange).toHaveBeenCalledWith('banana');
      await rerender({
        value: 'banana',
        onValueChange,
        options: fruits,
        'aria-label': 'Favorite fruit'
      });
      expect(screen.getByRole('button', { name: 'Favorite fruit' }).textContent).toContain('Banana');
    });

    it('supports keyboard navigation with ArrowDown and Enter', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(Select, {
        'aria-label': 'Favorite fruit',
        options: fruits,
        onValueChange
      });

      const trigger = screen.getByRole('button', { name: 'Favorite fruit' });
      trigger.focus();
      await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

      expect(onValueChange).toHaveBeenCalled();
    });

    it('stays closed when disabled', () => {
      render(Select, {
        'aria-label': 'Favorite fruit',
        options: fruits,
        disabled: true
      });

      const trigger = screen.getByRole('button', { name: 'Favorite fruit' });
      expect(trigger).toBeDisabled();
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('activates via keyboard on trigger', async () => {
      const user = userEvent.setup();
      render(Select, { 'aria-label': 'Favorite fruit', options: fruits });

      const trigger = screen.getByRole('button', { name: 'Favorite fruit' });
      trigger.focus();
      expect(document.activeElement).toBe(trigger);

      await user.keyboard('{Enter}');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(Select, {
        'aria-label': 'Favorite fruit',
        options: fruits
      });
      await expectNoA11yViolations(container);
    });
  });
});
