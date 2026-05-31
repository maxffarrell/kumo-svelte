import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Sidebar } from '$lib/components/sidebar';
import CollapsibleFixture from './CollapsibleFixture.svelte';
import MenuButtonFixture from './MenuButtonFixture.svelte';
import SidebarStateFixture from './SidebarStateFixture.svelte';
import SlidingFixture from './SlidingFixture.svelte';

afterEach(() => cleanup());

describe('Sidebar exports', () => {
  it('exports the local compound API surface', () => {
    expect(Sidebar.Provider).toBeDefined();
    expect(Sidebar.Root).toBeDefined();
    expect(Sidebar.Header).toBeDefined();
    expect(Sidebar.Content).toBeDefined();
    expect(Sidebar.Footer).toBeDefined();
    expect(Sidebar.Group).toBeDefined();
    expect(Sidebar.GroupLabel).toBeDefined();
    expect(Sidebar.Menu).toBeDefined();
    expect(Sidebar.MenuItem).toBeDefined();
    expect(Sidebar.MenuButton).toBeDefined();
    expect(Sidebar.MenuBadge).toBeDefined();
    expect(Sidebar.MenuSub).toBeDefined();
    expect(Sidebar.MenuSubItem).toBeDefined();
    expect(Sidebar.MenuSubButton).toBeDefined();
    expect(Sidebar.Separator).toBeDefined();
    expect(Sidebar.Trigger).toBeDefined();
    expect(Sidebar.Rail).toBeDefined();
    expect(Sidebar.ResizeHandle).toBeDefined();
    expect(Sidebar.MenuChevron).toBeDefined();
    expect(Sidebar.Collapsible).toBeDefined();
    expect(Sidebar.CollapsibleTrigger).toBeDefined();
    expect(Sidebar.CollapsibleContent).toBeDefined();
    expect(Sidebar.SlidingViews).toBeDefined();
    expect(Sidebar.SlidingView).toBeDefined();
  });

  it('does not expose removed React sidebar members', () => {
    expect(Sidebar).not.toHaveProperty('Input');
    expect(Sidebar).not.toHaveProperty('MenuAction');
    expect(Sidebar).not.toHaveProperty('GroupContent');
  });

  it.skip('exports variant and styling metadata', () => {});
});

describe('Sidebar toggle', () => {
  it('starts expanded with defaultOpen=true', () => {
    render(SidebarStateFixture, { defaultOpen: true });

    const reader = screen.getByTestId('state-reader');
    expect(reader).toHaveAttribute('data-state', 'expanded');
    expect(reader).toHaveAttribute('data-open', 'true');
  });

  it('starts collapsed with defaultOpen=false', () => {
    render(SidebarStateFixture, { defaultOpen: false });

    const reader = screen.getByTestId('state-reader');
    expect(reader).toHaveAttribute('data-state', 'collapsed');
    expect(reader).toHaveAttribute('data-open', 'false');
  });

  it.skip('toggles rendered state on Trigger click', async () => {
    render(SidebarStateFixture, { defaultOpen: true, showTrigger: true });

    const trigger = screen.getByRole('button', { name: 'Collapse sidebar' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await fireEvent.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-label', 'Expand sidebar');
      expect(screen.getByTestId('state-reader')).toHaveAttribute('data-state', 'collapsed');
    });
  });

  it('calls onOpenChange when controlled', async () => {
    const onOpenChange = vi.fn();
    render(SidebarStateFixture, { open: true, onOpenChange, showTrigger: true });

    await fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('Sidebar.Collapsible', () => {
  it('is closed by default', () => {
    render(CollapsibleFixture);

    expect(screen.getByTestId('collapsible-content')).toHaveAttribute('aria-hidden', 'true');
  });

  it('is open when defaultOpen=true', () => {
    render(CollapsibleFixture, { defaultOpen: true });

    expect(screen.getByTestId('collapsible-content')).not.toHaveAttribute('aria-hidden');
  });

  it('toggles on trigger click', async () => {
    render(CollapsibleFixture);

    const trigger = document.querySelector<HTMLButtonElement>('[aria-controls]')!;
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('collapsible-content')).not.toHaveAttribute('aria-hidden');
  });

  it('links trigger and content with aria-controls', () => {
    render(CollapsibleFixture);

    const trigger = document.querySelector<HTMLButtonElement>('[aria-controls]')!;
    const content = screen.getByTestId('collapsible-content');
    expect(trigger).toHaveAttribute('aria-controls', content.id);
  });

  it('marks content as a region and makes closed content inert', () => {
    render(CollapsibleFixture);

    const content = screen.getByTestId('collapsible-content');
    expect(content).toHaveAttribute('role', 'region');
    expect(content).toHaveAttribute('inert');
  });
});

describe('Sidebar peeking', () => {
  it('does not peek when peekable is false', async () => {
    render(SidebarStateFixture, { defaultOpen: false, peekable: false });

    await fireEvent.mouseEnter(screen.getByTestId('state-reader').closest('[data-sidebar="content"]')!);

    expect(screen.getByTestId('state-reader')).toHaveAttribute('data-state', 'collapsed');
    expect(screen.getByTestId('state-reader')).toHaveAttribute('data-peeking', 'false');
  });

  it('peeks on mouse enter when collapsed and peekable', async () => {
    render(SidebarStateFixture, { defaultOpen: false, peekable: true });

    await fireEvent.mouseEnter(screen.getByTestId('state-reader').closest('[data-sidebar="content"]')!);

    expect(screen.getByTestId('state-reader')).toHaveAttribute('data-state', 'peeking');
    expect(screen.getByTestId('state-reader')).toHaveAttribute('data-peeking', 'true');
  });

  it('stops peeking on mouse leave', async () => {
    render(SidebarStateFixture, { defaultOpen: false, peekable: true });
    const content = screen.getByTestId('state-reader').closest('[data-sidebar="content"]')!;

    await fireEvent.mouseEnter(content);
    expect(screen.getByTestId('state-reader')).toHaveAttribute('data-state', 'peeking');

    await fireEvent.mouseLeave(content);
    expect(screen.getByTestId('state-reader')).toHaveAttribute('data-state', 'collapsed');
  });

  it('does not peek when already expanded', async () => {
    render(SidebarStateFixture, { defaultOpen: true, peekable: true });

    await fireEvent.mouseEnter(screen.getByTestId('state-reader').closest('[data-sidebar="content"]')!);

    expect(screen.getByTestId('state-reader')).toHaveAttribute('data-state', 'expanded');
    expect(screen.getByTestId('state-reader')).toHaveAttribute('data-peeking', 'false');
  });
});

describe('Sidebar.SlidingViews', () => {
  it('shows the active view', () => {
    render(SlidingFixture, { activeKey: 'a' });

    const viewA = screen.getByTestId('view-a').closest('[data-sidebar="sliding-view"]');
    expect(viewA).not.toHaveAttribute('aria-hidden');
  });

  it('hides inactive views with aria-hidden and inert', () => {
    render(SlidingFixture, { activeKey: 'a' });

    const viewB = screen.getByTestId('view-b').closest('[data-sidebar="sliding-view"]');
    expect(viewB).toHaveAttribute('aria-hidden', 'true');
    expect(viewB).toHaveAttribute('inert');
  });

  it('switches active view when activeKey changes', async () => {
    const { rerender } = render(SlidingFixture, { activeKey: 'a' });

    await rerender({ activeKey: 'b' });

    const viewA = screen.getByTestId('view-a').closest('[data-sidebar="sliding-view"]');
    const viewB = screen.getByTestId('view-b').closest('[data-sidebar="sliding-view"]');
    expect(viewA).toHaveAttribute('aria-hidden', 'true');
    expect(viewB).not.toHaveAttribute('aria-hidden');
  });
});

describe('Sidebar.ResizeHandle', () => {
  it('has correct ARIA attributes', () => {
    render(SidebarStateFixture, { resizable: true, showResizeHandle: true });

    const handle = screen.getByTestId('handle');
    expect(handle.tagName).toBe('BUTTON');
    expect(handle).toHaveAttribute('aria-label', 'Resize sidebar');
  });
});

describe('Sidebar.MenuButton', () => {
  it('auto-wraps in li when not inside MenuItem', () => {
    render(MenuButtonFixture);

    const button = screen.getByRole('button', { name: 'Home' });
    expect(button.closest('li')).toHaveAttribute('data-sidebar', 'menu-item');
  });

  it('sets data-active when active', () => {
    render(MenuButtonFixture, { active: true });

    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute('data-active', 'true');
  });

  it('renders as a link when href is provided', () => {
    render(MenuButtonFixture, { href: '/home' });

    const link = screen.getByText('Home').closest('a');
    expect(link).toHaveAttribute('href', '/home');
  });
});

describe('Sidebar contained mode', () => {
  it('does not apply min-h-svh when contained', () => {
    render(SidebarStateFixture, { contained: true });

    expect(document.querySelector('[data-sidebar-wrapper]')).not.toHaveClass('min-h-svh');
  });

  it('applies min-h-svh when not contained', () => {
    render(SidebarStateFixture);

    expect(document.querySelector('[data-sidebar-wrapper]')).toHaveClass('min-h-svh');
  });
});
