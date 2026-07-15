import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Loader from './Loader.svelte';
import SkeletonLine from './SkeletonLine.svelte';
import { KUMO_LOADER_VARIANTS, loaderVariants } from './Loader.svelte';

describe('Loader', () => {
  it('renders status role with default aria-label', () => {
    render(Loader);

    const loader = screen.getByRole('status', { name: 'Loading' });
    expect(loader.tagName).toBe('svg');
    expect(loader.getAttribute('stroke')).toBe('currentColor');
  });

  it('accepts custom aria-label', () => {
    render(Loader, { 'aria-label': 'Saving changes' });
    expect(screen.getByRole('status', { name: 'Saving changes' })).toBeTruthy();
  });

  describe('size fidelity', () => {
    it('loaderVariants resolves preset sizes', () => {
      expect(loaderVariants('sm')).toBe(KUMO_LOADER_VARIANTS.size.sm.value);
      expect(loaderVariants('base')).toBe(24);
      expect(loaderVariants('lg')).toBe(32);
    });

    it('loaderVariants passes through custom numbers', () => {
      expect(loaderVariants(20)).toBe(20);
    });

    it('applies inline dimensions from size prop', () => {
      render(Loader, { size: 'sm' });
      const loader = screen.getByRole('status', { name: 'Loading' });
      expect(loader.style.height).toBe('16px');
      expect(loader.style.width).toBe('16px');
    });

    it('applies large size dimensions', () => {
      render(Loader, { size: 'lg' });
      const loader = screen.getByRole('status', { name: 'Loading' });
      expect(loader.style.height).toBe('32px');
      expect(loader.style.width).toBe('32px');
    });
  });

  describe('SkeletonLine', () => {
    it('renders skeleton-line class', () => {
      const { container } = render(SkeletonLine, { class: 'w-48' });
      const line = container.querySelector('.skeleton-line') as HTMLElement;
      expect(line).toBeTruthy();
      expect(line.className).toContain('w-48');
    });

    it('wraps in flex container when blockHeight is set', () => {
      const { container } = render(SkeletonLine, { blockHeight: 32 });
      expect(container.querySelector('.flex.items-center')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (loader)', async () => {
      const { container } = render(Loader);
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (skeleton line)', async () => {
      const { container } = render(SkeletonLine);
      await expectNoA11yViolations(container);
    });
  });
});
