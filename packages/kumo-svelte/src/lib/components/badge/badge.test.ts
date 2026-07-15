import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import BadgeTestHost from './BadgeTestHost.svelte';

describe('Badge', () => {
  it('renders children as text content', () => {
    render(BadgeTestHost, { label: 'Active' });
    expect(screen.getByText('Active')).toBeTruthy();
  });

  it('renders as a span element', () => {
    render(BadgeTestHost, { label: 'Status' });
    expect(screen.getByText('Status').tagName).toBe('SPAN');
  });

  describe('filled appearance (default)', () => {
    it('applies variant classes for filled badges', () => {
      render(BadgeTestHost, { variant: 'error', label: 'Error' });
      expect(screen.getByText('Error').className).toContain('bg-kumo-danger-tint/60');
    });

    it('does not render a dot indicator', () => {
      const { container } = render(BadgeTestHost, { variant: 'success', label: 'OK' });
      expect(container.querySelector("[aria-hidden='true']")).toBeNull();
    });
  });

  describe('dot appearance', () => {
    it('renders a dot indicator for supported variants', () => {
      const { container } = render(BadgeTestHost, {
        variant: 'success',
        appearance: 'dot',
        label: 'Healthy'
      });
      const dot = container.querySelector("[aria-hidden='true']");
      expect(dot).toBeTruthy();
      expect(dot!.className).toContain('bg-kumo-success');
    });

    it('applies dot appearance classes instead of variant classes', () => {
      render(BadgeTestHost, { variant: 'error', appearance: 'dot', label: 'Down' });
      const badge = screen.getByText('Down');
      expect(badge.className).toContain('bg-transparent');
      expect(badge.className).toContain('text-kumo-default');
      expect(badge.className).toContain('ring-kumo-hairline');
      expect(badge.className).not.toContain('bg-kumo-danger-tint/60');
    });

    it('renders correct dot color per variant', () => {
      const cases = [
        { variant: 'success' as const, expected: 'bg-kumo-success' },
        { variant: 'warning' as const, expected: 'bg-kumo-badge-orange' },
        { variant: 'error' as const, expected: 'bg-kumo-badge-red' },
        { variant: 'neutral' as const, expected: 'bg-kumo-badge-neutral' }
      ];

      for (const { variant, expected } of cases) {
        const { container, unmount } = render(BadgeTestHost, {
          variant,
          appearance: 'dot',
          label: variant
        });
        const dot = container.querySelector("[aria-hidden='true']");
        expect(dot, `dot should exist for variant="${variant}"`).toBeTruthy();
        expect(dot!.className, `dot class for variant="${variant}"`).toContain(expected);
        unmount();
      }
    });

    it('does not render a dot for unsupported variants', () => {
      const { container } = render(BadgeTestHost, {
        variant: 'primary',
        appearance: 'dot',
        label: 'No dot'
      });
      expect(container.querySelector("[aria-hidden='true']")).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (filled)', async () => {
      const { container } = render(BadgeTestHost, { variant: 'success', label: 'Active' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (dot)', async () => {
      const { container } = render(BadgeTestHost, {
        variant: 'success',
        appearance: 'dot',
        label: 'Healthy'
      });
      await expectNoA11yViolations(container);
    });
  });
});
