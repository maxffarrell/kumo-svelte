import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import PaginationDropdownTest from './PaginationDropdownTest.svelte';
import PaginationPageSizeTest from './PaginationPageSizeTest.svelte';
import PaginationSeparatorTest from './PaginationSeparatorTest.svelte';
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

  describe('variant fidelity', () => {
    it('applies root layout classes', () => {
      const { container } = render(Pagination, {
        page: 1,
        perPage: 10,
        totalCount: 50
      });

      const root = container.querySelector('[data-slot="pagination"]') as HTMLElement;
      expect(root.className).toContain('flex');
      expect(root.className).toContain('w-full');
      expect(root.className).toContain('items-center');
      expect(root.className).toContain('gap-2');
    });

    it('applies info text classes with tabular-nums', () => {
      render(Pagination, {
        page: 1,
        perPage: 10,
        totalCount: 95
      });

      const info = document.querySelector('[data-slot="pagination-info"]') as HTMLElement;
      expect(info.className).toContain('text-sm');
      expect(info.className).toContain('text-kumo-subtle');
      expect(info.querySelector('.tabular-nums')).toBeTruthy();
    });

    it('applies controls layout classes', () => {
      render(Pagination, {
        page: 1,
        perPage: 10,
        totalCount: 50
      });

      const controls = document.querySelector('[data-slot="pagination-controls"]') as HTMLElement;
      expect(controls.className).toContain('grow');
      expect(controls.className).toContain('flex');
      expect(controls.className).toContain('items-end');
    });

    it('uses ring-kumo-hairline on page-size select', () => {
      render(PaginationPageSizeTest);

      const trigger = screen.getByRole('button', { name: 'Page size' });
      expect(trigger.className).toContain('ring-kumo-hairline');
    });

    it('applies separator hairline border', () => {
      render(PaginationSeparatorTest);

      const separator = document.querySelector('[data-slot="pagination-separator"]') as HTMLElement;
      expect(separator.className).toContain('border-kumo-hairline');
      expect(separator.className).toContain('h-6');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(Pagination, {
        page: 1,
        perPage: 10,
        totalCount: 95
      });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (compound)', async () => {
      const { container } = render(PaginationPageSizeTest);
      await expectNoA11yViolations(container);
    });
  });
});
