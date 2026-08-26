import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { createRawSnippet, mount, type ComponentProps } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '$lib/components/button';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import { textSnippet } from '../../../../tests/snippet';
import DropdownMenu from './DropdownMenu.svelte';
import DropdownMenuTrigger from './DropdownMenuTrigger.svelte';
import { dropdownVariants, KUMO_DROPDOWN_VARIANTS } from './index';

function renderTriggerOnlyDropdown(
  props: Pick<ComponentProps<typeof DropdownMenu>, 'open' | 'onOpenChange'> = {}
) {
  const children = createRawSnippet(() => ({
    render: () => '<div data-dropdown-host=""></div>',
    setup: (element) => {
      const host = element as HTMLElement;
      const triggerHost = document.createElement('div');
      host.appendChild(triggerHost);

      mount(DropdownMenuTrigger, {
        target: triggerHost,
        props: {
          children: createRawSnippet(() => ({
            render: () => '<span data-button-host=""></span>',
            setup: (buttonHost) => {
              mount(Button, {
                target: buttonHost as HTMLElement,
                props: {
                  variant: 'secondary',
                  'aria-label': 'Open menu',
                  children: textSnippet('Actions')
                }
              });
            }
          }))
        }
      });
    }
  }));

  return render(DropdownMenu, { ...props, children });
}

describe('DropdownMenu', () => {
  it('renders closed trigger without menu content', () => {
    renderTriggerOnlyDropdown();

    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  describe('variant fidelity', () => {
    it('uses data-highlighted tokens on items via dropdownVariants (not bracketed data-[highlighted])', () => {
      expect(KUMO_DROPDOWN_VARIANTS.variant.default.classes).toBe('');
      expect(dropdownVariants()).toBe('');

      const danger = dropdownVariants({ variant: 'danger' });
      expect(danger).toContain('data-highlighted:bg-kumo-danger/5');
      expect(danger).toContain('data-highlighted:text-kumo-danger');
      expect(danger).not.toContain('data-[highlighted]:bg-kumo-danger/5');
    });

    it('applies danger variant classes', () => {
      const danger = dropdownVariants({ variant: 'danger' });
      expect(danger).toContain('text-kumo-danger');
      expect(danger).toContain('data-highlighted:bg-kumo-danger/5');
      expect(danger).toContain('data-highlighted:text-kumo-danger');
    });

    // Content animation and separator classes are covered by VRT (portaled menu does not mount in happy-dom).
  });

  describe('interaction', () => {
    it('opens on trigger click (aria-expanded on Bits trigger)', async () => {
      const user = userEvent.setup();
      renderTriggerOnlyDropdown();

      const button = screen.getByRole('button', { name: 'Open menu' });
      await user.click(button);

      const trigger = button.closest('[aria-expanded]');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      // Portaled menu content is covered by VRT; happy-dom does not mount it here.
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('fires onOpenChange when the trigger is clicked', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderTriggerOnlyDropdown({ onOpenChange });

      await user.click(screen.getByRole('button', { name: 'Open menu' }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('opens via keyboard on trigger (Enter)', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderTriggerOnlyDropdown({ onOpenChange });

      const trigger = screen.getByRole('button', { name: 'Open menu' });
      trigger.focus();
      expect(document.activeElement).toBe(trigger);

      await user.keyboard('{Enter}');
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('supports focus on the trigger', () => {
      renderTriggerOnlyDropdown();

      const trigger = screen.getByRole('button', { name: 'Open menu' });
      trigger.focus();
      expect(document.activeElement).toBe(trigger);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = renderTriggerOnlyDropdown();
      // Bits UI sets aria-controls on the trigger before portaled content exists in happy-dom.
      await expectNoA11yViolations(container, ['aria-allowed-attr']);
    });
  });
});
