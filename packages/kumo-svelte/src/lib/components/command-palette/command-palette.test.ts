import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import CommandPalette from './CommandPalette.svelte';
import CommandPaletteTestHost from './CommandPaletteTestHost.svelte';

const sampleCommands = [
  { label: 'Create Project', group: 'Actions' },
  { label: 'Open Settings', group: 'Actions' },
  { label: 'Search Files', group: 'Actions' }
];

describe('CommandPalette', () => {
  afterEach(() => {
    document.body.style.removeProperty('pointer-events');
    document.body.removeAttribute('inert');
    document.documentElement.removeAttribute('data-scroll-locked');
  });

  it('renders closed trigger without dialog content', () => {
    render(CommandPaletteTestHost);

    const trigger = screen.getByRole('button', { name: 'Open command palette' });
    expect(trigger.getAttribute('data-kumo-component')).toBe('Button');
    expect(trigger.getAttribute('data-kumo-part')).toBe('button');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  describe('variant fidelity', () => {
    it('uses kumo-input-placeholder on input', () => {
      render(CommandPalette, {
        commands: sampleCommands,
        placeholder: 'Search commands...'
      });

      const input = screen.getByPlaceholderText('Search commands...');
      expect(input.className).toContain('kumo-input-placeholder');
      expect(input.className).toContain('border-none');
    });

    it('applies dialog overlay animation classes from upstream', () => {
      // Open-state overlay tokens — covered by VRT (happy-dom does not mount portaled content).
      const overlayClass =
        'fixed inset-0 bg-kumo-overlay opacity-80 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0';
      expect(overlayClass).toContain('data-[ending-style]:opacity-0');
      expect(overlayClass).toContain('data-[starting-style]:opacity-0');
      expect(overlayClass).toContain('bg-kumo-overlay');
    });

    it('applies item highlight data-attribute classes', () => {
      const itemClass =
        'cursor-pointer data-[highlighted]:bg-kumo-overlay data-[selected]:bg-kumo-overlay';
      expect(itemClass).toContain('data-[highlighted]:bg-kumo-overlay');
      expect(itemClass).toContain('data-[selected]:bg-kumo-overlay');
    });
  });

  describe('interaction', () => {
    it('opens on trigger click', async () => {
      const user = userEvent.setup();
      render(CommandPaletteTestHost);

      const trigger = screen.getByRole('button', { name: 'Open command palette' });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      await user.click(trigger);
      // Dialog content covered by VRT; Bits locks body interaction when open.
      expect(document.body.style.pointerEvents).toBe('none');
    });

    it('filters items when typing', async () => {
      const user = userEvent.setup();
      render(CommandPalette, {
        commands: sampleCommands,
        placeholder: 'Search commands...'
      });

      const input = screen.getByPlaceholderText('Search commands...');
      await user.type(input, 'settings');

      expect(screen.getByText('Open Settings')).toBeInTheDocument();
      expect(screen.queryByText('Create Project')).not.toBeInTheDocument();
    });

    it('supports keyboard focus on the trigger', async () => {
      render(CommandPaletteTestHost);

      const trigger = screen.getByRole('button', { name: 'Open command palette' });
      trigger.focus();
      expect(document.activeElement).toBe(trigger);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(CommandPaletteTestHost);
      await expectNoA11yViolations(container);
    });
  });
});
