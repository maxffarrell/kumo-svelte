import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import PaginationDropdownTest from './PaginationDropdownTest.svelte';
import PaginationSimpleTest from './PaginationSimpleTest.svelte';
import Pagination from './Pagination.svelte';

describe('Pagination', () => {
  it('renders range text and disables boundary controls', () => {
    render(Pagination, {
      page: 1,
      perPage: 10,
      totalCount: 95
    });

    expect(screen.getByText((_content, element) => element?.textContent === 'Showing 1-10 of 95')).toBeTruthy();
    expect((screen.getByRole('button', { name: 'First page' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Previous page' }) as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByRole('button', { name: 'Next page' }) as HTMLButtonElement).disabled).toBe(false);
    expect((screen.getByRole('button', { name: 'Last page' }) as HTMLButtonElement).disabled).toBe(false);
  });

  it('emits clamped page updates from the input selector', async () => {
    const user = userEvent.setup();
    const setPage = vi.fn();

    render(Pagination, {
      page: 2,
      setPage,
      perPage: 10,
      totalCount: 25
    });

    const input = screen.getByRole('textbox', { name: 'Page number' });
    await user.clear(input);
    await user.type(input, '99{Enter}');

    expect(setPage).toHaveBeenCalledWith(3);
  });

  it('supports simple previous and next controls', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(PaginationSimpleTest, {
      onPageChange
    });

    expect(screen.queryByRole('button', { name: 'First page' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Next page' }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('updates the page from the dropdown selector', async () => {
    const user = userEvent.setup();
    const setPage = vi.fn();

    render(PaginationDropdownTest, {
      page: 1,
      setPage
    });

    await user.click(screen.getByRole('button', { name: 'Page number' }));
    await user.click(screen.getByRole('option', { name: '3' }));

    expect(setPage).toHaveBeenCalledWith(3);
  });
});
