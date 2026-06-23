// @vitest-environment happy-dom
import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import RadioTypedValueTestHost from './RadioTypedValueTestHost.svelte';

describe('Radio', () => {
  it('round-trips non-string values through the radio group', async () => {
    render(RadioTypedValueTestHost);

    await fireEvent.click(screen.getByLabelText('25'));

    expect(screen.getByLabelText('Selected page size').textContent).toBe('25');
  });
});
