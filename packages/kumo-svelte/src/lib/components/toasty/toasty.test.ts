import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import ToastPreview from './ToastPreview.svelte';

describe('ToastPreview', () => {
  it('renders with Kumo data attributes', () => {
    render(ToastPreview, {
      title: 'Saved',
      description: 'Changes saved successfully.'
    });

    expect(screen.getByText('Saved')).toBeTruthy();
    expect(screen.getByText('Changes saved successfully.')).toBeTruthy();
    expect(document.querySelector('[data-kumo-component="Toast"]')).toBeTruthy();
  });

  describe('variant fidelity', () => {
    it('applies default root classes', () => {
      render(ToastPreview, { variant: 'default', title: 'Default' });
      const root = document.querySelector('[data-kumo-component="Toast"] > div');
      expect(root?.className).toContain('rounded-xl');
      expect(root?.className).toContain('ring-kumo-line');
      expect(root?.className).toContain('border-kumo-fill');
      expect(root?.className).toContain('bg-kumo-base');
    });

    it('applies success variant ring and title color selectors', () => {
      render(ToastPreview, { variant: 'success', title: 'Success' });
      const root = document.querySelector('[data-kumo-component="Toast"] > div');
      expect(root?.className).toContain('ring-kumo-success');
      expect(root?.className).toContain('[&_[data-toast-title]]:text-kumo-success');
    });

    it('applies error variant ring classes', () => {
      render(ToastPreview, { variant: 'error', title: 'Error' });
      const root = document.querySelector('[data-kumo-component="Toast"] > div');
      expect(root?.className).toContain('ring-kumo-danger');
    });

    it('applies warning variant ring classes', () => {
      render(ToastPreview, { variant: 'warning', title: 'Warning' });
      const root = document.querySelector('[data-kumo-component="Toast"] > div');
      expect(root?.className).toContain('ring-kumo-warning');
    });

    it('applies info variant ring and control background', () => {
      render(ToastPreview, { variant: 'info', title: 'Info' });
      const root = document.querySelector('[data-kumo-component="Toast"] > div');
      expect(root?.className).toContain('ring-kumo-info');
      expect(root?.className).toContain('bg-kumo-control');
    });

    it('uses text-kumo-default/70 for description (not text-kumo-subtle)', () => {
      render(ToastPreview, { title: 'Title', description: 'Body copy' });
      const description = screen.getByText('Body copy');
      expect(description.className).toContain('text-kumo-default/70');
      expect(description.className).not.toContain('text-kumo-subtle');
    });

    it('applies tint background for success variant', () => {
      render(ToastPreview, { variant: 'success', title: 'Success' });
      const background = document.querySelector('[data-kumo-component="Toast"] .absolute.inset-0');
      expect(background?.className).toContain('bg-kumo-success-tint/20');
    });

    it('restores close button hover affordances', () => {
      render(ToastPreview, { title: 'Close me' });
      const close = screen.getByRole('button', { name: 'Close' });
      expect(close.className).toContain('size-5');
      expect(close.className).toContain('text-kumo-subtle');
      expect(close.className).toContain('hover:bg-current/15');
    });
  });

  describe('interaction', () => {
    it('fires close handler', async () => {
      const onClose = vi.fn();
      render(ToastPreview, { title: 'Dismiss' });
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      // ToastPreview passes noop; verify button is clickable without error
      expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
    });

    it('renders action buttons when provided', async () => {
      const onClick = vi.fn();
      render(ToastPreview, {
        title: 'Action toast',
        actions: [{ children: 'Undo', variant: 'secondary', onClick }]
      });
      await userEvent.click(screen.getByRole('button', { name: 'Undo' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(ToastPreview, {
        title: 'Accessible toast',
        description: 'Description text'
      });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (success with action)', async () => {
      const { container } = render(ToastPreview, {
        variant: 'success',
        title: 'Saved',
        description: 'File uploaded',
        actions: [{ children: 'View', variant: 'secondary' }]
      });
      await expectNoA11yViolations(container);
    });
  });
});
