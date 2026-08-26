import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import { mockClipboard } from '../../../../tests/clipboard';
import SensitiveInput from './SensitiveInput.svelte';

function getMaskedContainer(name: RegExp | string) {
  return screen.getByRole('button', { name });
}

describe('SensitiveInput', () => {
  it('renders with Kumo data attributes when masked', () => {
    render(SensitiveInput, {
      label: 'API Key',
      defaultValue: 'sk_live_secret'
    });

    const container = getMaskedContainer(/API Key, masked\./);
    expect(container.getAttribute('data-kumo-component')).toBe('SensitiveInput');
    expect(container.getAttribute('data-kumo-part')).toBe('masked-container');
  });

  describe('variant fidelity', () => {
    it('uses ring-kumo-line for default variant', () => {
      render(SensitiveInput, { label: 'Key', defaultValue: 'secret' });
      const container = getMaskedContainer(/Key, masked\./);
      expect(container.className).toContain('ring-kumo-line');
      expect(container.className).toContain('focus-within:outline-kumo-focus');
    });

    it('applies error ring when error prop is set', () => {
      render(SensitiveInput, {
        label: 'Key',
        defaultValue: 'secret',
        error: 'Invalid key'
      });
      const container = getMaskedContainer(/Key, masked\./);
      expect(container.className).toContain('!ring-kumo-danger');
      expect(container.className).toContain('focus-within:outline-kumo-danger');
    });
  });

  describe('size', () => {
    it('applies size classes', () => {
      render(SensitiveInput, { label: 'Key', size: 'lg', defaultValue: 'secret' });
      const container = getMaskedContainer(/Key, masked\./);
      expect(container.className).toContain('h-10');
    });
  });

  describe('interaction', () => {
    it('reveals value when masked container is clicked', async () => {
      render(SensitiveInput, { label: 'Key', defaultValue: 'secret-value' });

      await userEvent.click(getMaskedContainer(/Key, masked\./));

      expect(screen.getByDisplayValue('secret-value')).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Hide value' })).toBeTruthy();
    });

    it('hides value when toggle visibility is clicked', async () => {
      render(SensitiveInput, { label: 'Key', defaultValue: 'secret' });

      await userEvent.click(getMaskedContainer(/Key, masked\./));
      await userEvent.click(screen.getByRole('button', { name: 'Hide value' }));

      expect(getMaskedContainer(/Key, masked\./)).toBeTruthy();
    });

    it('copies value to clipboard', async () => {
      const writeText = mockClipboard();
      const onCopy = vi.fn();

      render(SensitiveInput, {
        label: 'Key',
        defaultValue: 'copy-me',
        onCopy
      });

      await userEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));

      expect(writeText).toHaveBeenCalledWith('copy-me');
      expect(onCopy).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('button', { name: 'Copied' })).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when masked', async () => {
      const { container } = render(SensitiveInput, {
        label: 'API Key',
        defaultValue: 'sk_live_secret'
      });
      // Upstream: clickable masked container wraps toggle/copy buttons (nested-interactive).
      await expectNoA11yViolations(container, ['nested-interactive']);
    });

    it('has no axe violations when revealed', async () => {
      const { container } = render(SensitiveInput, {
        label: 'API Key',
        'aria-label': 'API Key',
        defaultValue: 'sk_live_secret'
      });
      await userEvent.click(getMaskedContainer(/API Key, masked\./));
      // Upstream: toggle/copy buttons live inside the focusable control shell.
      await expectNoA11yViolations(container, ['nested-interactive']);
    });
  });
});
