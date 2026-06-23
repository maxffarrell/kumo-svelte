// @vitest-environment happy-dom
import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import {
  Toolbar,
  ToolbarButton,
  ToolbarInput,
  ToolbarInputGroup,
  ToolbarRoot
} from './index';
import ToolbarTestHost from './ToolbarTestHost.svelte';

describe('Toolbar exports', () => {
  it('exports the compound component parts', () => {
    expect(Toolbar).toBeDefined();
    expect(Toolbar.Root).toBe(ToolbarRoot);
    expect(Toolbar.Button).toBe(ToolbarButton);
    expect(Toolbar.Input).toBe(ToolbarInput);
    expect(Toolbar.InputGroup).toBe(ToolbarInputGroup);
  });
});

describe('Toolbar', () => {
  it('applies toolbar size and item styles through Toolbar.Input', () => {
    render(ToolbarTestHost);

    const toolbarInput = screen.getByRole('textbox', { name: 'Toolbar input' });
    const directInput = screen.getByRole('textbox', { name: 'Direct input' });

    expect(toolbarInput.className).toContain('h-6.5');
    expect(toolbarInput.className).toContain('rounded-none');
    expect(directInput.className).toContain('h-10');
    expect(directInput.className).not.toContain('rounded-none');
  });

  it('passes toolbar size and item styles directly to Toolbar.InputGroup', () => {
    const { container } = render(ToolbarTestHost);

    const groups = container.querySelectorAll('[data-slot="input-group"]');
    const toolbarGroup = groups[0] as HTMLElement;
    const plainGroup = groups[1] as HTMLElement;

    expect(toolbarGroup.className).toContain('h-7');
    expect(toolbarGroup.className).toContain('rounded-none');
    expect(toolbarGroup.className).toContain('first:rounded-l-lg');
    expect(toolbarGroup.className).toContain('last:rounded-r-lg');
    expect(toolbarGroup.className).toContain('focus-within:ring-kumo-brand');
    expect(toolbarGroup.parentElement?.getAttribute('role')).toBe('toolbar');
    expect(plainGroup.className).not.toContain('rounded-none');
  });

  it('moves focus from Toolbar.InputGroup input to the next toolbar button', async () => {
    render(ToolbarTestHost);

    const input = screen.getByRole('textbox', { name: 'Search DNS records' });
    const filter = screen.getByRole('button', { name: 'Filter' });
    const settings = screen.getByRole('button', { name: 'Settings' });

    input.focus();
    expect(document.activeElement).toBe(input);

    await fireEvent.keyDown(input, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(filter);

    await fireEvent.keyDown(filter, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(settings);
  });

  it('moves focus from Toolbar.InputGroup input with suffix to the next toolbar button', async () => {
    render(ToolbarTestHost);

    const input = screen.getByRole('textbox', { name: 'Worker subdomain' });
    const visit = screen.getByRole('button', { name: 'Visit' });

    input.focus();
    expect(document.activeElement).toBe(input);

    await fireEvent.keyDown(input, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(visit);
  });
});
