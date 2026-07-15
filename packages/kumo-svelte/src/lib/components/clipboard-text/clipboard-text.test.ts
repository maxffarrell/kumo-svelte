import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import { mockClipboard } from '../../../../tests/clipboard';
import ClipboardText from './ClipboardText.svelte';
import { clipboardTextVariants, KUMO_CLIPBOARD_TEXT_VARIANTS } from './ClipboardText.svelte';

describe('ClipboardText', () => {
  it('renders the display text', () => {
    render(ClipboardText, { text: 'abc123' });
    expect(screen.getByText('abc123')).toBeTruthy();
  });

  describe('variant fidelity', () => {
    it('applies lg size classes by default', () => {
      render(ClipboardText, { text: 'token' });
      const root = screen.getByText('token').closest('[data-kumo-component="ClipboardText"]');
      expect(root?.className).toContain('font-mono');
      expect(root?.className).toContain('bg-kumo-base');
      expect(root?.className).toContain('text-sm');
    });

    it('applies sm size classes', () => {
      render(ClipboardText, { text: 'token', size: 'sm' });
      const root = screen.getByText('token').closest('[data-kumo-component="ClipboardText"]');
      expect(root?.className).toContain('text-xs');
    });

    it('applies copy button animation classes', () => {
      render(ClipboardText, { text: 'token' });
      const button = screen.getByRole('button', { name: 'Copy to clipboard' });
      expect(button.className).toContain('rounded-l-none');
      expect(button.className).toContain('border-l!');
      expect(button.className).toContain('border-kumo-line!');
      expect(button.className).toContain('focus-visible:ring-kumo-brand');
    });

    it('generates clipboardTextVariants from KUMO_CLIPBOARD_TEXT_VARIANTS', () => {
      expect(clipboardTextVariants({ size: 'base' })).toContain('text-sm');
      expect(KUMO_CLIPBOARD_TEXT_VARIANTS.size.lg.buttonSize).toBe('lg');
    });
  });

  describe('interaction', () => {
    it('copies text to clipboard on click', async () => {
      const writeText = mockClipboard();
      render(ClipboardText, { text: 'copy-me', textToCopy: 'secret-value' });
      await userEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));
      expect(writeText).toHaveBeenCalledWith('secret-value');
    });

    it('fires onCopy callback', async () => {
      mockClipboard();
      const onCopy = vi.fn();
      render(ClipboardText, { text: 'copy-me', onCopy });
      await userEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));
      expect(onCopy).toHaveBeenCalledTimes(1);
    });

    it('announces copied state via aria-live region', async () => {
      mockClipboard();
      render(ClipboardText, { text: 'copy-me' });
      await userEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));
      expect(screen.getByText('Copied')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(ClipboardText, { text: 'abc123' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (custom copy label)', async () => {
      const { container } = render(ClipboardText, {
        text: 'abc123',
        labels: { copyAction: 'Copy token' }
      });
      await expectNoA11yViolations(container);
    });
  });
});
