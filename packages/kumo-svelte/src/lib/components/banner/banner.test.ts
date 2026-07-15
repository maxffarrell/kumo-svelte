import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Banner, { bannerVariants } from './Banner.svelte';

describe('Banner', () => {
  it('supports secondary variant classes', () => {
    const className = bannerVariants({ variant: 'secondary' });
    expect(className).toContain('bg-kumo-contrast/5');
    expect(className).toContain('text-kumo-subtle');
  });

  it('forwards root div props', () => {
    render(Banner, {
      role: 'status',
      'data-testid': 'banner',
      'aria-live': 'polite',
      title: 'System status'
    });

    const banner = screen.getByTestId('banner');
    expect(banner.getAttribute('role')).toBe('status');
    expect(banner.getAttribute('aria-live')).toBe('polite');
    expect(banner.textContent?.trim()).toBe('System status');
  });

  describe('variant fidelity', () => {
    it('applies default info classes', () => {
      const { container } = render(Banner, { title: 'Info', variant: 'default' });
      expect(container.firstElementChild?.className).toContain('bg-kumo-banner-info');
    });

    it('applies alert warning classes', () => {
      const { container } = render(Banner, { title: 'Alert', variant: 'alert' });
      expect(container.firstElementChild?.className).toContain('bg-kumo-banner-warning');
    });

    it('applies error danger classes', () => {
      const { container } = render(Banner, { title: 'Error', variant: 'error' });
      const cls = container.firstElementChild?.className ?? '';
      expect(cls).toContain('bg-kumo-danger-tint/60');
      expect(cls).toContain('text-kumo-danger');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (structured)', async () => {
      const { container } = render(Banner, {
        title: 'Update available',
        description: 'A new version is ready.'
      });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (legacy text)', async () => {
      const { container } = render(Banner, { text: 'Simple banner message.' });
      await expectNoA11yViolations(container);
    });
  });
});
