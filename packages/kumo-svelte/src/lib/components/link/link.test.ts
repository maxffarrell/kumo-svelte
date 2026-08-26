import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import { textSnippet } from '../../../../tests/snippet';
import Link from './Link.svelte';
import LinkExternalIcon from './LinkExternalIcon.svelte';
import { KUMO_LINK_VARIANTS, linkVariants } from './Link.svelte';

describe('Link', () => {
  it('renders an anchor with Kumo data attributes', () => {
    render(Link, { href: '/docs', children: textSnippet('Documentation') });

    const link = screen.getByRole('link', { name: 'Documentation' });
    expect(link.getAttribute('href')).toBe('/docs');
    expect(link.getAttribute('data-kumo-component')).toBe('Link');
    expect(link.getAttribute('data-kumo-part')).toBe('link');
  });

  describe('variant fidelity', () => {
    it('applies inline variant classes', () => {
      render(Link, { href: '#', variant: 'inline', children: textSnippet('Inline') });
      const cls = screen.getByRole('link', { name: 'Inline' }).className;
      expect(cls).toContain('text-kumo-link');
      expect(cls).toContain('underline');
      expect(cls).toContain('link-current');
      expect(cls).toContain('transition-colors');
    });

    it('applies current variant classes', () => {
      render(Link, { href: '#', variant: 'current', children: textSnippet('Current') });
      const cls = screen.getByRole('link', { name: 'Current' }).className;
      expect(cls).toContain('text-current');
      expect(cls).toContain('underline');
      expect(cls).toContain('link-current');
    });

    it('applies plain variant classes without underline', () => {
      render(Link, { href: '#', variant: 'plain', children: textSnippet('Plain') });
      const cls = screen.getByRole('link', { name: 'Plain' }).className;
      expect(cls).toContain('text-kumo-link');
      expect(cls).toContain('hover:text-kumo-link/70');
      expect(cls).not.toContain('underline');
    });

    it('generates variant classes via linkVariants helper', () => {
      expect(linkVariants({ variant: 'inline' })).toContain('text-kumo-link');
      expect(linkVariants({ variant: 'current' })).toContain('text-current');
      expect(linkVariants({ variant: 'plain' })).toContain('hover:text-kumo-link/70');
    });

    it('matches exported KUMO_LINK_VARIANTS', () => {
      expect(KUMO_LINK_VARIANTS.variant.inline.classes).toContain('link-current');
      expect(KUMO_LINK_VARIANTS.variant.plain.classes).toContain('transition-colors');
    });
  });

  describe('external link', () => {
    it('renders external icon with link-external-icon class', () => {
      render(LinkExternalIcon);
      const icon = document.querySelector('.link-external-icon');
      expect(icon).toBeTruthy();
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('supports target blank on external links', () => {
      render(Link, {
        props: {
          href: 'https://example.com',
          target: '_blank',
          rel: 'noopener noreferrer',
          children: textSnippet('External')
        }
      });

      const link = screen.getByRole('link', { name: 'External' });
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('interaction', () => {
    it('fires click handlers', async () => {
      const onclick = vi.fn();
      render(Link, { href: '#', onclick, children: textSnippet('Click') });
      await userEvent.click(screen.getByRole('link', { name: 'Click' }));
      expect(onclick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (inline)', async () => {
      const { container } = render(Link, {
        href: '/docs',
        variant: 'inline',
        children: textSnippet('Docs')
      });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (external)', async () => {
      const { container } = render(Link, {
        props: {
          href: 'https://example.com',
          target: '_blank',
          rel: 'noopener noreferrer',
          children: textSnippet('External')
        }
      });
      await expectNoA11yViolations(container);
    });
  });
});
