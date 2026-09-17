// @vitest-environment happy-dom
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import ButtonGroupTestHost from './ButtonGroupTestHost.svelte';

describe('ButtonGroup', () => {
  it('renders a named group with joined-control selectors', () => {
    render(ButtonGroupTestHost);
    const group = screen.getByRole('group', { name: 'Deploy' });
    expect(group.textContent).toContain('Deploy');
    expect(group.className).toContain('rounded-s-none');
    expect(group.className).toContain('rounded-e-none');
    expect(group.className).toContain('-ms-px');
    expect(group.className).toContain('flex-row');
  });
});
