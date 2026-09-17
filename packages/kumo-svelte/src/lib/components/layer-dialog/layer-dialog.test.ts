// @vitest-environment happy-dom
import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { LayerDialog, LayerDialogActions, LayerDialogAlert, LayerDialogRoot } from './index';
import LayerDialogTestHost from './LayerDialogTestHost.svelte';

describe('LayerDialog', () => {
  it('exports the complete compound component API', () => {
    expect(LayerDialog.Root).toBe(LayerDialogRoot);
    expect(LayerDialog.Alert).toBe(LayerDialogAlert);
    expect(LayerDialog.Actions).toBe(LayerDialogActions);
    expect(LayerDialog.Actions.Primary).toBeTruthy();
    expect(LayerDialog.Body).toBeTruthy();
    expect(LayerDialog.Content).toBeTruthy();
  });

  it('opens a responsive dialog from its trigger', async () => {
    render(LayerDialogTestHost);
    await fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
    expect(await screen.findByRole('dialog')).toBeTruthy();
    expect(screen.getByText('Edit profile')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
  });

  it('uses alertdialog semantics and explicit actions', async () => {
    render(LayerDialogTestHost, { props: { alert: true } });
    await fireEvent.click(screen.getByRole('button', { name: 'Open alert' }));
    expect(await screen.findByRole('alertdialog')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeTruthy();
  });
});
