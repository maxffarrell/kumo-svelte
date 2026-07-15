import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import CollapsibleTestHost from './CollapsibleTestHost.svelte';

describe('Collapsible', () => {
  it('renders default trigger with Kumo data attributes', () => {
    render(CollapsibleTestHost);

    const trigger = screen.getByRole('button', { name: 'Show details' });
    expect(trigger.getAttribute('data-kumo-component')).toBe('Collapsible');
    expect(trigger.getAttribute('data-kumo-part')).toBe('default-trigger');
  });

  describe('variant fidelity', () => {
    it('applies default trigger link styling', () => {
      render(CollapsibleTestHost);

      const cls = screen.getByRole('button', { name: 'Show details' }).className;
      expect(cls).toContain('text-kumo-link');
      expect(cls).toContain('bg-transparent');
      expect(cls).toContain('border-none');
    });

    it('applies default panel border accent', () => {
      const { container } = render(CollapsibleTestHost, { open: true });

      const panel = container.querySelector('.border-l-2.border-kumo-fill');
      expect(panel?.className).toContain('border-l-2');
      expect(panel?.className).toContain('border-kumo-fill');
      expect(panel?.textContent).toContain('Hidden content revealed when expanded.');
    });

    it('restores caret rotation class for open state', () => {
      const { container } = render(CollapsibleTestHost);

      const caret = container.querySelector('button svg');
      expect(caret?.getAttribute('class')).toContain('[[data-panel-open]_&]:rotate-180');
    });
  });

  describe('interaction', () => {
    it('toggles expanded state on click', async () => {
      const onOpenChange = vi.fn();
      render(CollapsibleTestHost, { open: false, onOpenChange });

      const trigger = screen.getByRole('button', { name: 'Show details' });
      expect(trigger.getAttribute('aria-expanded')).toBe('false');

      await userEvent.click(trigger);
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('toggles via keyboard (Enter and Space)', async () => {
      const onOpenChange = vi.fn();
      render(CollapsibleTestHost, { open: false, onOpenChange });

      const trigger = screen.getByRole('button', { name: 'Show details' });
      trigger.focus();
      expect(document.activeElement).toBe(trigger);

      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      expect(onOpenChange).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when collapsed', async () => {
      const { container } = render(CollapsibleTestHost, { open: false });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations when expanded', async () => {
      const { container } = render(CollapsibleTestHost, { open: true });
      await expectNoA11yViolations(container);
    });
  });
});
