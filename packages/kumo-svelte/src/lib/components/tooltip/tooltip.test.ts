import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import TooltipTestHost from './TooltipTestHost.svelte';

describe('Tooltip', () => {
  it('renders the trigger when closed', () => {
    render(TooltipTestHost);

    const trigger = screen.getByRole('button', { name: 'Hover for help' });
    expect(trigger.getAttribute('data-kumo-component')).toBe('Button');
    expect(trigger.getAttribute('data-kumo-part')).toBe('button');
    expect(trigger.getAttribute('data-tooltip-trigger')).toBe('');
    expect(trigger.getAttribute('data-state')).toBe('closed');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens on hover and updates trigger state', async () => {
    const user = userEvent.setup();

    render(TooltipTestHost);

    const trigger = screen.getByRole('button', { name: 'Hover for help' });
    await user.hover(trigger);

    expect(trigger.getAttribute('data-state')).toMatch(/open/);
    // Tooltip content is covered by VRT (happy-dom does not mount portaled content).
  });

  it('opens on focus', async () => {
    const user = userEvent.setup();

    render(TooltipTestHost);

    await user.tab();
    const trigger = screen.getByRole('button', { name: 'Hover for help' });
    expect(trigger).toHaveFocus();
    expect(trigger.getAttribute('data-state')).toMatch(/open/);
  });

  describe('variant fidelity', () => {
    it('applies cursor-default on the custom trigger button', () => {
      render(TooltipTestHost);

      const trigger = screen.getByRole('button', { name: 'Hover for help' });
      expect(trigger.className).toContain('cursor-default');
      // Tooltip popup classes are covered by VRT.
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(TooltipTestHost);
      await expectNoA11yViolations(container);
    });
  });
});
