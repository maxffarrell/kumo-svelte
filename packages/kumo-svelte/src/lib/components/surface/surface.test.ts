import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import SurfaceTestHost from './SurfaceTestHost.svelte';

describe('Surface', () => {
  it('renders children inside a LayerCard wrapper', () => {
    render(SurfaceTestHost, { label: 'Card content' });
    expect(screen.getByText('Card content')).toBeTruthy();
  });

  it('applies deprecated surface data attributes', () => {
    render(SurfaceTestHost, { color: 'secondary', label: 'Content' });
    const el = screen.getByText('Content').closest('[data-deprecated="surface"]');
    expect(el).toBeTruthy();
    expect(el!.getAttribute('data-surface-color')).toBe('secondary');
  });

  it('applies overflow-visible and rounded-none base classes', () => {
    render(SurfaceTestHost, { label: 'Content' });
    const el = screen.getByText('Content').closest('[data-deprecated="surface"]')!;
    expect(el.className).toContain('overflow-visible');
    expect(el.className).toContain('rounded-none');
  });

  it('merges custom class names', () => {
    render(SurfaceTestHost, { class: 'rounded-lg p-4', label: 'Content' });
    const el = screen.getByText('Content').closest('[data-deprecated="surface"]')!;
    expect(el.className).toContain('rounded-lg');
    expect(el.className).toContain('p-4');
  });

  it('renders as a custom element via as prop', () => {
    const { container } = render(SurfaceTestHost, { as: 'section', label: 'Section' });
    expect(container.querySelector('section')).toBeTruthy();
  });

  describe('accessibility', () => {
    it('has no axe violations (primary)', async () => {
      const { container } = render(SurfaceTestHost, { label: 'Surface content' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (secondary)', async () => {
      const { container } = render(SurfaceTestHost, {
        color: 'secondary',
        class: 'rounded-lg p-4',
        label: 'Secondary surface'
      });
      await expectNoA11yViolations(container);
    });
  });
});
