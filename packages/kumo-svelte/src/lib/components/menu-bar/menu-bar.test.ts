import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { createRawSnippet, mount, type ComponentProps } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import { List, SquaresFour } from 'phosphor-svelte';
import { TooltipProvider } from '$lib/components/tooltip';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import MenuBar from './MenuBar.svelte';

function renderMenuBar(props: ComponentProps<typeof MenuBar>) {
  const children = createRawSnippet(() => ({
    render: () => '<div data-menubar-host=""></div>',
    setup: (element) => {
      mount(MenuBar, {
        target: element as HTMLElement,
        props
      });
    }
  }));

  return render(TooltipProvider, { children });
}

describe('MenuBar', () => {
  const makeOptions = () => [
    { icon: List, id: 'list', tooltip: 'List view', onClick: vi.fn() },
    { icon: SquaresFour, id: 'grid', tooltip: 'Grid view', onClick: vi.fn() }
  ];

  it('renders options with Kumo data attributes', () => {
    renderMenuBar({ isActive: 'list', options: makeOptions(), optionIds: true });

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0].getAttribute('data-kumo-component')).toBe('MenuBar');
    expect(buttons[0].getAttribute('data-kumo-part')).toBe('option');
    expect(buttons[0].getAttribute('aria-label')).toBe('List view');
  });

  describe('variant fidelity', () => {
    it('applies upstream nav container classes', () => {
      renderMenuBar({ isActive: undefined, options: makeOptions(), optionIds: true });

      const nav = screen.getByRole('navigation');
      expect(nav.className).toContain('ring-kumo-line');
      expect(nav.className).toContain('bg-kumo-recessed');
      expect(nav.className).toContain('shadow-xs');
    });

    it('applies active option elevation classes', () => {
      renderMenuBar({ isActive: 'list', options: makeOptions(), optionIds: true });

      const listButton = screen.getByRole('button', { name: 'List view' });
      expect(listButton.className).toContain('bg-kumo-base');
      expect(listButton.className).toContain('shadow-xs');
    });

    it('does not apply active classes to inactive options', () => {
      renderMenuBar({ isActive: 'list', options: makeOptions(), optionIds: true });

      const gridButton = screen.getByRole('button', { name: 'Grid view' });
      expect(gridButton.className).not.toContain('bg-kumo-base');
    });
  });

  describe('interaction', () => {
    it('fires option click handlers', async () => {
      const options = makeOptions();
      renderMenuBar({ isActive: undefined, options, optionIds: true });

      await userEvent.click(screen.getByRole('button', { name: 'Grid view' }));
      expect(options[1].onClick).toHaveBeenCalledTimes(1);
    });

    it('navigates between options with arrow keys', async () => {
      renderMenuBar({ isActive: undefined, options: makeOptions(), optionIds: true });

      const listButton = screen.getByRole('button', { name: 'List view' });
      listButton.focus();
      expect(document.activeElement).toBe(listButton);

      await userEvent.keyboard('{ArrowRight}');
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Grid view' }));

      await userEvent.keyboard('{ArrowLeft}');
      expect(document.activeElement).toBe(listButton);
    });

    it('activates focused option with Enter', async () => {
      const options = makeOptions();
      renderMenuBar({ isActive: undefined, options, optionIds: true });

      screen.getByRole('button', { name: 'List view' }).focus();
      await userEvent.keyboard('{Enter}');
      expect(options[0].onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = renderMenuBar({
        isActive: 'list',
        options: makeOptions(),
        optionIds: true
      });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations with no active option', async () => {
      const { container } = renderMenuBar({
        isActive: undefined,
        options: makeOptions(),
        optionIds: true
      });
      await expectNoA11yViolations(container);
    });
  });
});
