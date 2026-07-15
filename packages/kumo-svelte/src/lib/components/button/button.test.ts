import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Button from './Button.svelte';
import ButtonTitleTestHost from './ButtonTitleTestHost.svelte';

describe('Button', () => {
  it('renders a button with Kumo data attributes by default', () => {
    render(Button, {
      'aria-label': 'Save'
    });

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('data-kumo-component')).toBe('Button');
    expect(button.getAttribute('data-kumo-part')).toBe('button');
  });

  it('renders as a link when href is provided', () => {
    render(Button, {
      href: '/settings',
      'aria-label': 'Settings'
    });

    const link = screen.getByRole('link', { name: 'Settings' });
    expect(link.getAttribute('href')).toBe('/settings');
    expect(link.getAttribute('data-kumo-part')).toBe('link-button');
  });

  it('marks loading buttons busy and disabled', () => {
    render(Button, {
      loading: true,
      'aria-label': 'Deploy'
    });

    const button = screen.getByRole('button', { name: 'Deploy' });
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  describe('variant fidelity', () => {
    it('applies primary emphasis classes', () => {
      render(Button, { variant: 'primary', 'aria-label': 'Primary' });
      const cls = screen.getByRole('button', { name: 'Primary' }).className;
      expect(cls).toContain('bg-(--kumo-button-emphasis-bg)');
      expect(cls).toContain('ring-(--kumo-button-emphasis-ring)');
      expect(cls).toContain('!text-white');
    });

    it('uses ring-kumo-line (not the drifted hairline) for secondary', () => {
      render(Button, { variant: 'secondary', 'aria-label': 'Secondary' });
      const cls = screen.getByRole('button', { name: 'Secondary' }).className;
      expect(cls).toContain('ring-kumo-line');
      expect(cls).not.toContain('ring-kumo-hairline');
    });

    it('restores outline hover affordances', () => {
      render(Button, { variant: 'outline', 'aria-label': 'Outline' });
      const cls = screen.getByRole('button', { name: 'Outline' }).className;
      expect(cls).toContain('transition-colors');
      expect(cls).toContain('not-disabled:hover:text-kumo-strong');
      expect(cls).toContain('not-disabled:hover:ring-kumo-focus/25');
    });

    it('restores secondary-destructive hover affordances', () => {
      render(Button, { variant: 'secondary-destructive', 'aria-label': 'Danger' });
      const cls = screen.getByRole('button', { name: 'Danger' }).className;
      expect(cls).toContain('not-disabled:hover:!text-kumo-danger');
      expect(cls).toContain('not-disabled:hover:ring-kumo-danger/30');
    });

    it('keeps emphasized variant rings color-matched when pressed or focused', () => {
      for (const variant of ['primary', 'destructive'] as const) {
        render(Button, {
          variant,
          'aria-label': variant
        });

        const className = screen.getByRole('button', { name: variant }).className;

        expect(className).toContain('ring-(--kumo-button-emphasis-ring)');
        expect(className).toContain('focus:ring-(--kumo-button-emphasis-ring)');
        expect(className).toContain(
          'focus-visible:ring-(--kumo-button-emphasis-ring)'
        );
        expect(className).toContain('active:ring-(--kumo-button-emphasis-ring)');
      }
    });
  });

  describe('size and shape', () => {
    it('applies size classes', () => {
      render(Button, { size: 'lg', 'aria-label': 'Large' });
      expect(screen.getByRole('button', { name: 'Large' }).className).toContain('h-10');
    });

    it('applies compact sizing for square shape', () => {
      render(Button, { shape: 'square', 'aria-label': 'Square' });
      const cls = screen.getByRole('button', { name: 'Square' }).className;
      expect(cls).toContain('justify-center');
      expect(cls).toContain('size-9');
    });
  });

  describe('interaction', () => {
    it('fires click handlers', async () => {
      const onclick = vi.fn();
      render(Button, { onclick, 'aria-label': 'Click' });
      await userEvent.click(screen.getByRole('button', { name: 'Click' }));
      expect(onclick).toHaveBeenCalledTimes(1);
    });

    it('does not fire click when disabled', async () => {
      const onclick = vi.fn();
      render(Button, { onclick, disabled: true, 'aria-label': 'Nope' });
      await userEvent.click(screen.getByRole('button', { name: 'Nope' }));
      expect(onclick).not.toHaveBeenCalled();
    });

    it('activates via keyboard (Enter and Space)', async () => {
      const onclick = vi.fn();
      render(Button, { onclick, 'aria-label': 'Key' });
      const button = screen.getByRole('button', { name: 'Key' });
      button.focus();
      expect(document.activeElement).toBe(button);
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
      expect(onclick).toHaveBeenCalledTimes(2);
    });

    it('shows a tooltip when title is set', async () => {
      render(ButtonTitleTestHost);

      const button = screen.getByRole('button', { name: 'Create Worker' });
      await userEvent.hover(button);

      await waitFor(() => {
        expect(screen.getByText('Create a new Worker')).toBeInTheDocument();
      });
    });

    it('still fires click handlers when title is set (tooltip must not swallow onclick)', async () => {
      const onclick = vi.fn();
      render(ButtonTitleTestHost, { onclick });
      await userEvent.click(screen.getByRole('button', { name: 'Create Worker' }));
      expect(onclick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(Button, { 'aria-label': 'Accessible' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations as a link', async () => {
      const { container } = render(Button, { href: '/x', 'aria-label': 'Link' });
      await expectNoA11yViolations(container);
    });
  });
});
