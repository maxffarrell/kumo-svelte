import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import { Breadcrumbs } from './index';

describe('Breadcrumbs', () => {
  it('renders navigation with breadcrumb aria-label', () => {
    render(Breadcrumbs, {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Dashboard' }
      ]
    });

    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeTruthy();
  });

  it('marks the current page with aria-current', () => {
    const { container } = render(Breadcrumbs, {
      items: [
        { label: 'Home', href: '/' },
        { label: 'Dashboard' }
      ]
    });

    const current = container.querySelector('[aria-current="page"]');
    expect(current).toBeTruthy();
    expect(current?.textContent?.trim()).toBe('Dashboard');
  });

  describe('variant fidelity', () => {
    it('applies base size classes', () => {
      const { container } = render(Breadcrumbs, {
        items: [{ label: 'Home' }]
      });

      const nav = container.querySelector('nav');
      expect(nav?.className).toContain('text-base');
      expect(nav?.className).toContain('h-12');
      expect(nav?.className).toContain('gap-1');
    });

    it('applies sm size classes', () => {
      const { container } = render(Breadcrumbs, {
        size: 'sm',
        items: [{ label: 'Home' }]
      });

      const nav = container.querySelector('nav');
      expect(nav?.className).toContain('text-sm');
      expect(nav?.className).toContain('h-10');
      expect(nav?.className).toContain('gap-0.5');
    });

    it('applies link styling on breadcrumb links', () => {
      render(Breadcrumbs, {
        items: [
          { label: 'Home', href: '/' },
          { label: 'Docs' }
        ]
      });

      const link = screen.getAllByRole('link', { name: 'Home' })[0];
      expect(link.className).toContain('text-kumo-subtle');
      expect(link.className).toContain('no-underline');
      expect(link.getAttribute('data-kumo-part')).toBe('link');
    });

    it('renders separator with inactive color', () => {
      const { container } = render(Breadcrumbs, {
        items: [
          { label: 'Home', href: '/' },
          { label: 'Docs' }
        ]
      });

      const separator = container.querySelector('[aria-hidden="true"] svg');
      expect(separator?.closest('span')?.className).toContain('text-kumo-inactive');
    });

    it('includes mobile breadcrumb key classes for collapsed trails', () => {
      const { container } = render(Breadcrumbs, {
        items: [
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Analytics', href: '/analytics' },
          { label: 'Reports' }
        ]
      });

      expect(container.querySelector('.kumo-breadcrumb-mobile-ellipsis')).toBeTruthy();
      expect(container.querySelector('.kumo-breadcrumb-mobile-separator-leading')).toBeTruthy();
      expect(container.querySelector('.kumo-breadcrumb-mobile-parent')).toBeTruthy();
      expect(container.querySelector('.kumo-breadcrumb-mobile-current')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(Breadcrumbs, {
        items: [
          { label: 'Home', href: '/' },
          { label: 'Settings', href: '/settings' },
          { label: 'Profile' }
        ]
      });
      await expectNoA11yViolations(container);
    });
  });
});
