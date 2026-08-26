import { CalendarDate } from '@internationalized/date';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import DateRangePicker, {
  DATE_RANGE_CELL_BACKGROUNDS,
  dateRangePickerDayCellClasses,
  dateRangePickerVariants
} from './DateRangePicker.svelte';

const fixedPlaceholder = new CalendarDate(2024, 1, 1);
const fixedStart = new CalendarDate(2024, 1, 10);
const fixedEnd = new CalendarDate(2024, 1, 20);

function getDateRangeTrigger() {
  return document.querySelector('[data-segment="trigger"]') as HTMLButtonElement;
}

describe('DateRangePicker', () => {
  it('renders with Kumo data attributes', () => {
    const { container } = render(DateRangePicker, {
      placeholder: fixedPlaceholder
    });

    expect(container.querySelector('[data-kumo-component="DateRangePicker"]')).toBeTruthy();
    expect(container.querySelector('[data-kumo-part="date-range-picker"]')).toBeTruthy();
  });

  describe('variant fidelity', () => {
    it('applies upstream trigger classes', () => {
      render(DateRangePicker, { placeholder: fixedPlaceholder });

      expect(getDateRangeTrigger().className).toContain('ring-kumo-line');
    });

    it('exports Kumo variant tokens on day cells', () => {
      const dayCellClass = dateRangePickerDayCellClasses('base');
      expect(dayCellClass).toContain('data-[selection-start]:!bg-kumo-contrast');
      expect(dayCellClass).toContain('data-[selection-start]:rounded-tl-[5px]');
      expect(dayCellClass).toContain('data-[selection-end]:!bg-kumo-contrast');
      expect(DATE_RANGE_CELL_BACKGROUNDS.selectedStart).toContain('!bg-kumo-contrast');
    });

    it('applies upstream calendar panel classes', () => {
      const panelClass = dateRangePickerVariants({ size: 'base', variant: 'default' });
      expect(panelClass).toContain('bg-kumo-overlay');
      expect(panelClass).toContain('rounded-xl');
      expect(panelClass).toContain('p-4');
    });
  });

  describe('interaction', () => {
    it('opens on trigger click', async () => {
      render(DateRangePicker, { placeholder: fixedPlaceholder });

      const trigger = getDateRangeTrigger();
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(screen.queryByRole('button', { name: 'Previous month' })).toBeNull();

      await userEvent.click(trigger);

      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      // Calendar popover content covered by VRT (happy-dom does not mount portaled content).
    });

    it('reflects a preset range in the trigger', () => {
      render(DateRangePicker, {
        placeholder: fixedPlaceholder,
        value: { start: fixedStart, end: fixedEnd }
      });

      const daySpinbuttons = screen.getAllByRole('spinbutton', { name: /^day,/i });
      expect(daySpinbuttons[0]?.getAttribute('aria-valuenow')).toBe('10');
      expect(daySpinbuttons[1]?.getAttribute('aria-valuenow')).toBe('20');
    });

    it('supports keyboard focus on the trigger', async () => {
      render(DateRangePicker, { placeholder: fixedPlaceholder });

      const trigger = getDateRangeTrigger();
      trigger.focus();
      expect(document.activeElement).toBe(trigger);

      await userEvent.keyboard('{Enter}');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(DateRangePicker, {
        placeholder: fixedPlaceholder,
        value: { start: fixedStart, end: fixedEnd }
      });
      // Upstream: date segments nest inside the trigger button (nested-interactive).
      await expectNoA11yViolations(container, ['nested-interactive']);
    });
  });
});
