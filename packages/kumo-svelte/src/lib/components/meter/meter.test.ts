import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Meter from './Meter.svelte';
import { meterVariants } from './Meter.svelte';

describe('Meter', () => {
  it('renders meter with label and percentage', () => {
    render(Meter, { label: 'Storage used', value: 65 });

    const meter = screen.getByRole('meter');
    expect(meter.getAttribute('aria-valuenow')).toBe('65');
    expect(screen.getByText('Storage used')).toBeTruthy();
    expect(screen.getByText('65%')).toBeTruthy();
  });

  it('renders custom value text instead of percentage', () => {
    render(Meter, { label: 'API requests', value: 75, customValue: '750 / 1,000' });
    expect(screen.getByText('750 / 1,000')).toBeTruthy();
    expect(screen.queryByText('75%')).toBeNull();
  });

  it('hides value when showValue is false', () => {
    render(Meter, { label: 'Background sync', value: 40, showValue: false });
    expect(screen.getByText('Background sync')).toBeTruthy();
    expect(screen.queryByText('40%')).toBeNull();
  });

  describe('variant fidelity', () => {
    it('meterVariants returns root layout classes', () => {
      expect(meterVariants()).toContain('flex w-full flex-col gap-2');
    });

    it('applies label subtle text class', () => {
      render(Meter, { label: 'Bandwidth', value: 10 });
      expect(screen.getByText('Bandwidth').className).toContain('text-kumo-subtle');
    });

    it('applies value typography classes', () => {
      render(Meter, { label: 'CPU', value: 50 });
      const value = screen.getByText('50%');
      expect(value.className).toContain('text-kumo-default');
      expect(value.className).toContain('tabular-nums');
    });

    it('applies track and indicator classes', () => {
      const { container } = render(Meter, { label: 'Workers', value: 80 });
      const track = container.querySelector('.bg-kumo-fill') as HTMLElement;
      const indicator = container.querySelector('.from-kumo-brand') as HTMLElement;
      expect(track.className).toContain('rounded-full');
      expect(indicator.className).toContain('transition-[width]');
      expect(indicator.style.width).toBe('80%');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(Meter, { label: 'Storage', value: 45 });
      // Visual label is adjacent text; upstream meter has no aria-labelledby API.
      await expectNoA11yViolations(container, ['aria-meter-name']);
    });

    it('has no axe violations (custom value)', async () => {
      const { container } = render(Meter, {
        label: 'Requests',
        value: 75,
        customValue: '750 / 1,000'
      });
      await expectNoA11yViolations(container, ['aria-meter-name']);
    });
  });
});
