import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import { KUMO_TABLE_VARIANTS } from './Table.svelte';
import TableTestHost from './TableTestHost.svelte';
import TableResizeHandle from './TableResizeHandle.svelte';

describe('Table', () => {
  it('renders table root with isolate and kumo typography classes', () => {
    render(TableTestHost);
    const table = screen.getByTestId('table-root');
    expect(table.tagName).toBe('TABLE');
    expect(table.className).toContain('isolate');
    expect(table.className).toContain('w-full');
    expect(table.className).toContain('text-kumo-default');
  });

  it('applies fixed layout classes', () => {
    render(TableTestHost, { variant: 'fixed' });
    expect(screen.getByTestId('table-root').className).toContain('table-fixed');
  });

  it('applies compact header styles', () => {
    render(TableTestHost, { variant: 'compact' });
    const header = screen.getByTestId('compact-header');
    expect(header.className).toContain('group/header');
    expect(header.className).toContain('text-kumo-strong');
    expect(header.getAttribute('data-compact')).toBe('');
  });

  it('applies selected row variant classes', () => {
    render(TableTestHost, { variant: 'selected' });
    expect(screen.getByTestId('selected-row').className).toContain(
      KUMO_TABLE_VARIANTS.variant.selected.classes
    );
  });

  it('applies sticky column classes on head and cell', () => {
    render(TableTestHost, { variant: 'sticky' });
    const head = screen.getByTestId('sticky-head');
    const cell = screen.getByTestId('sticky-cell');
    expect(head.className).toContain('sticky');
    expect(head.className).toContain('left-0');
    expect(head.className).toContain('z-2');
    expect(cell.className).toContain('sticky');
    expect(cell.className).toContain('bg-kumo-base');
    expect(cell.className).toContain('z-1');
  });

  it('calls onCheckedChange from CheckCell', async () => {
    const onCheckedChange = vi.fn();
    render(TableTestHost, { onCheckedChange });
    await userEvent.click(screen.getByRole('checkbox', { name: 'Select row' }));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('renders resize handle with kumo focus ring classes', () => {
    const { container } = render(TableResizeHandle);
    const handle = container.querySelector('button');
    expect(handle).toBeTruthy();
    expect(handle!.className).toContain('focus-visible:ring-2');
    expect(handle!.className).toContain('focus-visible:ring-kumo-brand');
    expect(handle!.className).toContain('group-hover:visible');
  });

  describe('accessibility', () => {
    it('has no axe violations (default table)', async () => {
      const { container } = render(TableTestHost);
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (selected row)', async () => {
      const { container } = render(TableTestHost, { variant: 'selected' });
      await expectNoA11yViolations(container);
    });
  });
});
