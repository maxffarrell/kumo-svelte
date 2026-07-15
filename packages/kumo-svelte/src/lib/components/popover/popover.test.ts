import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import PopoverTestHost from './PopoverTestHost.svelte';

describe('Popover', () => {
  it('renders the trigger with Kumo data attributes', () => {
    render(PopoverTestHost);

    const trigger = screen.getByRole('button', { name: 'Open popover' });
    expect(trigger.getAttribute('data-kumo-component')).toBe('Button');
    expect(trigger.getAttribute('data-kumo-part')).toBe('button');
    expect(trigger.getAttribute('data-popover-trigger')).toBe('');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('data-state')).toBe('closed');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on trigger click and updates trigger state', async () => {
    const user = userEvent.setup();

    render(PopoverTestHost);

    const trigger = screen.getByRole('button', { name: 'Open popover' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    await user.click(trigger);

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('data-state')).toBe('open');
    // Open popover content is covered by VRT (happy-dom does not mount portaled content).
  });

  it('activates via keyboard on trigger', async () => {
    const user = userEvent.setup();

    render(PopoverTestHost);

    const trigger = screen.getByRole('button', { name: 'Open popover' });
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    await user.keyboard('{Enter}');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });

  describe('variant fidelity', () => {
    it('applies open-state classes on the trigger button', () => {
      render(PopoverTestHost);

      const trigger = screen.getByRole('button', { name: 'Open popover' });
      expect(trigger.className).toContain('data-[state=open]:bg-kumo-base');
      expect(trigger.className).toContain('ring-kumo-line');
      // Popover content panel classes are covered by VRT.
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(PopoverTestHost);
      await expectNoA11yViolations(container);
    });
  });
});
