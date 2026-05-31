import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Collapsible } from '$lib/components/collapsible';
import CollapsibleFixture from './CollapsibleFixture.svelte';

afterEach(() => cleanup());

describe('Collapsible exports', () => {
  it('exports the consolidated compound API surface', () => {
    expect(Collapsible).toBeDefined();
    expect(Collapsible.Root).toBeDefined();
    expect(Collapsible.Trigger).toBeDefined();
    expect(Collapsible.Panel).toBeDefined();
    expect(Collapsible.DefaultTrigger).toBeDefined();
    expect(Collapsible.DefaultPanel).toBeDefined();
  });
});

describe('Collapsible state', () => {
  it('supports uncontrolled open state through defaultOpen and trigger clicks', async () => {
    const onOpenChange = vi.fn();
    render(CollapsibleFixture, { defaultOpen: true, onOpenChange });

    const trigger = screen.getByRole('button', { name: 'Hide details' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('collapsible-panel')).toBeInTheDocument();

    await fireEvent.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('supports controlled open state through bind:open', async () => {
    const onOpenChange = vi.fn();
    render(CollapsibleFixture, { open: false, onOpenChange });

    await fireEvent.click(screen.getByRole('button', { name: 'Show details' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Show details' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
    });
    expect(screen.getByTestId('collapsible-panel')).toBeInTheDocument();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });
});

describe('Collapsible rendering and attributes', () => {
  it('renders trigger and panel with linked ARIA attributes and bits-ui data state', () => {
    render(CollapsibleFixture, { defaultOpen: true });

    const trigger = screen.getByTestId('collapsible-trigger');
    const panel = screen.getByTestId('collapsible-panel');

    expect(trigger).toHaveAttribute('data-kumo-component', 'Collapsible');
    expect(trigger).toHaveAttribute('data-kumo-part', 'trigger');
    expect(trigger).toHaveAttribute('data-state', 'open');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('data-state', 'open');
  });

  it('renders default trigger and panel with Kumo styling hooks', () => {
    render(CollapsibleFixture, {
      variant: 'default',
      defaultOpen: true,
      triggerClass: 'custom-trigger',
      panelClass: 'custom-panel'
    });

    const trigger = screen.getByTestId('collapsible-trigger');
    const panel = screen.getByTestId('collapsible-panel');

    expect(trigger).toHaveClass('custom-trigger');
    expect(trigger).toHaveClass('text-kumo-link');
    expect(trigger).toHaveAttribute('data-kumo-component', 'Collapsible');
    expect(trigger).toHaveAttribute('data-kumo-part', 'trigger');
    expect(panel).toHaveClass('custom-panel');
    expect(panel).toHaveClass('border-kumo-fill');
  });

  it('renders shorthand trigger and default panel content', () => {
    render(CollapsibleFixture, {
      variant: 'shorthand',
      open: true,
      title: 'What is Kumo?',
      rootClass: 'custom-root'
    });

    const root = screen.getByTestId('collapsible-root');
    const trigger = screen.getByRole('button', { name: /What is Kumo?/ });

    expect(root).toHaveClass('custom-root');
    expect(trigger).toHaveAttribute('data-kumo-component', 'Collapsible');
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('keeps the panel mounted when keepMounted is set', async () => {
    render(CollapsibleFixture, { keepMounted: true });

    const panel = screen.getByTestId('collapsible-panel');
    expect(panel).toHaveAttribute('data-state', 'closed');
    expect(panel).toBeInTheDocument();

    await fireEvent.click(screen.getByRole('button', { name: 'Show details' }));

    await waitFor(() => {
      expect(panel).toHaveAttribute('data-state', 'open');
    });
  });
});

describe('Collapsible disabled behavior', () => {
  it('does not toggle or call onOpenChange when disabled', async () => {
    const onOpenChange = vi.fn();
    render(CollapsibleFixture, { disabled: true, keepMounted: true, onOpenChange });

    const trigger = screen.getByRole('button', { name: 'Show details' });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('collapsible-panel')).toHaveAttribute('data-state', 'closed');
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
