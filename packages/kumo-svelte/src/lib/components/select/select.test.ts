import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Select from './Select.svelte';

describe('Select', () => {
  it('displays labels for non-string option values', () => {
    render(Select, {
      'aria-label': 'Rows per page',
      value: 50,
      options: [
        { label: '25 rows', value: 25 },
        { label: '50 rows', value: 50 },
        { label: '100 rows', value: 100 }
      ]
    });

    expect(screen.getByRole('button', { name: 'Rows per page' }).textContent).toContain('50 rows');
  });
});
