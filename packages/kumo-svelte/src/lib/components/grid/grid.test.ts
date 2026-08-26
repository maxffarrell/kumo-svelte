import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import GridTestHost from './GridTestHost.svelte';
import { gridItemVariants, gridVariants } from './Grid.svelte';

describe('Grid', () => {
  it('renders grid container with variant classes', () => {
    const { container } = render(GridTestHost, { variant: '3up', gap: 'sm' });
    const grid = container.querySelector('.grid') as HTMLElement;
    expect(grid.className).toContain('grid-cols-1');
    expect(grid.className).toContain('md:grid-cols-2');
    expect(grid.className).toContain('lg:grid-cols-3');
    expect(grid.className).toContain('gap-3');
  });

  describe('variant fidelity', () => {
    it('gridVariants applies 2up layout', () => {
      expect(gridVariants({ variant: '2up' })).toContain('grid-cols-1 md:grid-cols-2');
    });

    it('gridVariants applies side-by-side layout', () => {
      expect(gridVariants({ variant: 'side-by-side' })).toContain('grid-cols-2');
    });

    it('gridVariants applies responsive gap base', () => {
      expect(gridVariants({ gap: 'base' })).toContain('gap-2 md:gap-6 lg:gap-8');
    });

    it('gridItemVariants applies mobile divider for 4up', () => {
      expect(gridItemVariants({ variant: '4up', mobileDivider: true })).toContain(
        'border-b border-kumo-hairline pb-8 md:border-b-0 md:pb-0'
      );
    });
  });

  describe('layout variants', () => {
    it('applies 2-1 column split', () => {
      const { container } = render(GridTestHost, { variant: '2-1' });
      expect((container.querySelector('.grid') as HTMLElement).className).toContain(
        'md:grid-cols-[2fr_1fr]'
      );
    });

    it('applies 6up progressive columns', () => {
      const { container } = render(GridTestHost, { variant: '6up' });
      const cls = (container.querySelector('.grid') as HTMLElement).className;
      expect(cls).toContain('grid-cols-2');
      expect(cls).toContain('xl:grid-cols-6');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(GridTestHost, { variant: '2up', gap: 'base' });
      await expectNoA11yViolations(container);
    });
  });
});
