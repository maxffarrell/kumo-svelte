import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import DatePicker from './DatePicker.svelte';

describe('DatePicker', () => {
  it('supports hidden and object disabled matchers', () => {
    render(DatePicker, {
      month: new Date(2026, 0, 1),
      hidden: new Date(2026, 0, 10),
      disabled: [{ dayOfWeek: [0, 6] }, { before: new Date(2026, 0, 5) }]
    });

    expect(screen.queryByRole('button', { name: 'Saturday, January 10, 2026' })).toBeNull();
    expect((screen.getByRole('button', { name: 'Sunday, January 11, 2026' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Friday, January 2, 2026' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Monday, January 5, 2026' }) as HTMLButtonElement).disabled).toBe(false);
  });

  it('prevents ranges that include disabled dates when excludeDisabled is set', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(DatePicker, {
      mode: 'range',
      month: new Date(2026, 0, 1),
      disabled: new Date(2026, 0, 7),
      excludeDisabled: true,
      onChange
    });

    await user.click(screen.getByRole('button', { name: 'Monday, January 5, 2026' }));
    await user.click(screen.getByRole('button', { name: 'Friday, January 9, 2026' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith({ from: new Date(2026, 0, 5), to: undefined });
  });

  it('renders caption dropdowns and clamps disabled navigation', () => {
    render(DatePicker, {
      month: new Date(2026, 0, 1),
      startMonth: new Date(2026, 0, 1),
      endMonth: new Date(2026, 1, 1),
      captionLayout: 'dropdown'
    });

    expect((screen.getByRole('combobox', { name: 'Choose the month' }) as HTMLSelectElement).value).toBe('0');
    expect((screen.getByRole('combobox', { name: 'Choose the year' }) as HTMLSelectElement).value).toBe('2026');
    expect((screen.getByRole('button', { name: 'Previous month' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Next month' }) as HTMLButtonElement).disabled).toBe(false);
  });
});
