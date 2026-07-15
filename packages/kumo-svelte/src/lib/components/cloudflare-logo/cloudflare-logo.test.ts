import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import CloudflareLogo from './CloudflareLogo.svelte';
import PoweredByCloudflare from './PoweredByCloudflare.svelte';

describe('CloudflareLogo', () => {
  it('renders glyph variant with accessible label', () => {
    render(CloudflareLogo, { variant: 'glyph', class: 'w-12' });

    const logo = screen.getByRole('img', { name: 'Cloudflare logo' });
    expect(logo.tagName).toBe('svg');
    expect(logo.getAttribute('viewBox')).toBe('0 0 49 22');
  });

  it('renders full variant with wordmark text color class', () => {
    render(CloudflareLogo, { variant: 'full', color: 'color', class: 'w-40' });

    const logo = screen.getByRole('img', { name: 'Cloudflare logo' });
    expect(logo.className).toContain('text-kumo-default');
    expect(logo.getAttribute('viewBox')).toBe('0 0 425.6 143.63');
  });

  describe('color fidelity', () => {
    it('applies white text class for white glyph', () => {
      render(CloudflareLogo, { variant: 'glyph', color: 'white', class: 'w-12' });
      expect(screen.getByRole('img', { name: 'Cloudflare logo' }).className).toContain('text-white');
    });

    it('applies black text class for black full logo', () => {
      render(CloudflareLogo, { variant: 'full', color: 'black', class: 'w-40' });
      expect(screen.getByRole('img', { name: 'Cloudflare logo' }).className).toContain('text-black');
    });
  });

  describe('PoweredByCloudflare', () => {
    it('renders external link with badge classes', () => {
      render(PoweredByCloudflare);

      const link = screen.getByRole('link', { name: /Powered by Cloudflare/i });
      expect(link.getAttribute('href')).toBe('https://www.cloudflare.com');
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      expect(link.className).toContain('inline-flex');
      expect(link.className).toContain('bg-kumo-base');
      expect(link.className).toContain('ring-kumo-hairline');
      expect(link.className).toContain('hover:shadow-sm');
    });

    it('applies white variant classes', () => {
      render(PoweredByCloudflare, { color: 'white' });
      const link = screen.getByRole('link', { name: /Powered by Cloudflare/i });
      expect(link.className).toContain('bg-black');
      expect(link.className).toContain('text-white');
      expect(link.className).toContain('ring-white/20');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (glyph)', async () => {
      const { container } = render(CloudflareLogo, { variant: 'glyph', class: 'w-12' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (powered by badge)', async () => {
      const { container } = render(PoweredByCloudflare);
      await expectNoA11yViolations(container);
    });
  });
});
