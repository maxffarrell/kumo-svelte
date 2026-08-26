import { fireEvent, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Radio from './Radio.svelte';
import RadioTypedValueTestHost from './RadioTypedValueTestHost.svelte';

const defaultOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' }
];

describe('Radio', () => {
  it('round-trips non-string values through the radio group', async () => {
    render(RadioTypedValueTestHost);

    await fireEvent.click(screen.getByLabelText('25'));

    expect(screen.getByLabelText('Selected page size').textContent).toBe('25');
  });

  it('renders items with Kumo data attributes', () => {
    const { container } = render(Radio, {
      legend: 'Options',
      value: 'a',
      options: defaultOptions
    });

    const item = container.querySelector('[data-kumo-part="item"]');
    expect(item?.getAttribute('data-kumo-component')).toBe('Radio');
    expect(screen.getByText('Option A')).toBeTruthy();
  });

  describe('variant fidelity', () => {
    it('applies checked state classes on the control', () => {
      const { container } = render(Radio, {
        legend: 'Options',
        value: 'a',
        options: defaultOptions
      });
      const item = container.querySelector('[data-kumo-part="item"]');
      expect(item?.className).toContain('data-[checked]:bg-kumo-contrast');
      expect(item?.className).toContain('ring-kumo-line');
    });

    it('applies error ring classes', () => {
      const { container } = render(Radio, {
        legend: 'Options',
        value: 'a',
        variant: 'error',
        options: defaultOptions
      });
      const item = container.querySelector('[data-kumo-part="item"]');
      expect(item?.className).toContain('ring-kumo-danger');
    });

    it('restores card has-checked affordances', () => {
      const { container } = render(Radio, {
        legend: 'Plans',
        appearance: 'card',
        value: 'a',
        options: [
          { label: 'Free', value: 'a', description: 'Personal' },
          { label: 'Pro', value: 'b', description: 'Business' }
        ]
      });

      const label = container.querySelector('[data-kumo-part="item-label"]');
      expect(label?.className).toContain('has-[[data-checked]]:border-kumo-interact');
      expect(label?.className).toContain('has-[[data-checked]]:bg-kumo-tint');
    });

    it('restores default hover ring affordances', () => {
      const { container } = render(Radio, {
        legend: 'Options',
        value: 'a',
        options: defaultOptions
      });
      const item = container.querySelector('[data-kumo-part="item"]');
      expect(item?.className).toContain('group-hover:ring-kumo-hairline');
      expect(item?.className).toContain('focus-visible:ring-kumo-brand');
    });
  });

  describe('interaction', () => {
    it('selects a different option on click', async () => {
      const onValueChange = vi.fn();
      const { container } = render(Radio, {
        legend: 'Options',
        value: 'a',
        options: defaultOptions,
        onValueChange
      });

      const radios = container.querySelectorAll('[data-kumo-part="item"]');
      await userEvent.click(radios[1]!);
      expect(onValueChange).toHaveBeenCalled();
    });

    it('does not change when disabled', async () => {
      const onValueChange = vi.fn();
      const { container } = render(Radio, {
        legend: 'Options',
        value: 'a',
        disabled: true,
        options: defaultOptions,
        onValueChange
      });

      const radios = container.querySelectorAll('[data-kumo-part="item"]');
      await userEvent.click(radios[1]!);
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it('navigates via arrow keys within the group', async () => {
      const onValueChange = vi.fn();
      const { container } = render(Radio, {
        legend: 'Options',
        value: 'a',
        options: defaultOptions,
        onValueChange
      });

      const first = container.querySelector('[data-kumo-part="item"]') as HTMLElement;
      first.focus();
      expect(document.activeElement).toBe(first);

      await userEvent.keyboard('{ArrowDown}');
      expect(onValueChange).toHaveBeenCalled();
    });

    it('activates via Space on focused item', async () => {
      const onValueChange = vi.fn();
      const { container } = render(Radio, {
        legend: 'Options',
        value: 'a',
        options: defaultOptions,
        onValueChange
      });

      const second = container.querySelectorAll('[data-kumo-part="item"]')[1] as HTMLElement;
      second.focus();
      await userEvent.keyboard(' ');
      expect(onValueChange).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default group)', async () => {
      const { container } = render(Radio, {
        legend: 'Options',
        value: 'a',
        options: defaultOptions
      });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (card appearance)', async () => {
      const { container } = render(Radio, {
        legend: 'Plans',
        appearance: 'card',
        value: 'a',
        options: [
          { label: 'Free', value: 'a', description: 'Personal' },
          { label: 'Pro', value: 'b', description: 'Business' }
        ]
      });
      await expectNoA11yViolations(container);
    });

    it('exposes aria-checked on radio controls', () => {
      const { container } = render(Radio, {
        legend: 'Options',
        value: 'b',
        options: defaultOptions
      });
      const radios = container.querySelectorAll('[role="radio"]');
      expect(radios[0]?.getAttribute('aria-checked')).toBe('false');
      expect(radios[1]?.getAttribute('aria-checked')).toBe('true');
    });
  });
});
