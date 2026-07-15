// @vitest-environment happy-dom
import { fireEvent, render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { House } from 'phosphor-svelte';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import {
  Sidebar,
  SidebarCollapsibleContent,
  SidebarCollapsibleRoot,
  SidebarCollapsibleTrigger,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuChevron,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarRoot,
  SidebarSeparator,
  SidebarSlidingView,
  SidebarSlidingViews,
  SidebarTrigger
} from './index';
import SidebarTestHost from './SidebarTestHost.svelte';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  });
});

describe('Sidebar exports', () => {
  it('should export compound component with all sub-components', () => {
    expect(Sidebar).toBeDefined();
    expect(Sidebar.Provider).toBe(SidebarProvider);
    expect(Sidebar.Root).toBe(SidebarRoot);
    expect(Sidebar.Header).toBe(SidebarHeader);
    expect(Sidebar.Content).toBe(SidebarContent);
    expect(Sidebar.Footer).toBe(SidebarFooter);
    expect(Sidebar.Group).toBe(SidebarGroup);
    expect(Sidebar.GroupLabel).toBe(SidebarGroupLabel);
    expect(Sidebar.Menu).toBe(SidebarMenu);
    expect(Sidebar.MenuItem).toBe(SidebarMenuItem);
    expect(Sidebar.MenuButton).toBe(SidebarMenuButton);
    expect(Sidebar.MenuBadge).toBe(SidebarMenuBadge);
    expect(Sidebar.MenuSub).toBe(SidebarMenuSub);
    expect(Sidebar.MenuSubItem).toBe(SidebarMenuSubItem);
    expect(Sidebar.MenuSubButton).toBe(SidebarMenuSubButton);
    expect(Sidebar.Separator).toBe(SidebarSeparator);
    expect(Sidebar.Trigger).toBe(SidebarTrigger);
    expect(Sidebar.Rail).toBe(SidebarRail);
    expect(Sidebar.MenuChevron).toBe(SidebarMenuChevron);
    expect(Sidebar.Collapsible).toBe(SidebarCollapsibleRoot);
    expect(Sidebar.CollapsibleTrigger).toBe(SidebarCollapsibleTrigger);
    expect(Sidebar.CollapsibleContent).toBe(SidebarCollapsibleContent);
    expect(Sidebar.SlidingViews).toBe(SidebarSlidingViews);
    expect(Sidebar.SlidingView).toBe(SidebarSlidingView);
  });

  it('should not export removed components', () => {
    expect(Sidebar).not.toHaveProperty('Input');
    expect(Sidebar).not.toHaveProperty('MenuAction');
    expect(Sidebar).not.toHaveProperty('GroupContent');
  });
});

describe('Sidebar toggle', () => {
  it('should start expanded with defaultOpen=true', () => {
    const { container } = render(SidebarTestHost, { props: { defaultOpen: true } });

    expect(container.querySelector('[data-sidebar-wrapper]')?.getAttribute('data-state')).toBe('expanded');
    expect(screen.getByRole('button', { name: 'Collapse sidebar' }).getAttribute('aria-expanded')).toBe(
      'true'
    );
  });

  it('should start collapsed with defaultOpen=false', () => {
    const { container } = render(SidebarTestHost, { props: { defaultOpen: false } });

    expect(container.querySelector('[data-sidebar-wrapper]')?.getAttribute('data-state')).toBe('collapsed');
    expect(screen.getByRole('button', { name: 'Expand sidebar' }).getAttribute('aria-expanded')).toBe(
      'false'
    );
  });

  it('should toggle on Trigger click', async () => {
    const { container } = render(SidebarTestHost, { props: { defaultOpen: true } });

    const trigger = screen.getByRole('button', { name: 'Collapse sidebar' });
    await fireEvent.click(trigger);

    expect(screen.getByRole('button', { name: 'Expand sidebar' }).getAttribute('aria-expanded')).toBe(
      'false'
    );
    expect(container.querySelector('[data-sidebar-wrapper]')?.getAttribute('data-state')).toBe('collapsed');
  });

  it('should call onOpenChange when controlled', async () => {
    const onOpenChange = vi.fn();
    render(SidebarTestHost, { props: { open: true, onOpenChange } });

    await fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('menu button fidelity', () => {
  it('applies active background classes', () => {
    render(SidebarMenuButton, { active: true, tooltip: 'Home' });
    const button = screen.getByRole('button', { name: 'Home' });
    expect(button.className).toContain('bg-(--sidebar-active-bg)');
    expect(button.getAttribute('data-active')).toBe('true');
  });

  it('applies hover affordance when inactive', () => {
    render(SidebarMenuButton, { tooltip: 'Domains' });
    const button = screen.getByRole('button', { name: 'Domains' });
    expect(button.className).toContain('hover:bg-(--sidebar-active-bg)');
  });

  it('renders icon menu buttons with Kumo data attributes', () => {
    render(SidebarMenuButton, { icon: House, tooltip: 'Dashboard' });
    const button = screen.getByRole('button', { name: 'Dashboard' });
    expect(button.getAttribute('data-kumo-component')).toBe('Sidebar');
    expect(button.getAttribute('data-kumo-part')).toBe('menu-button');
    expect(button.getAttribute('data-size')).toBe('base');
  });
});

describe('accessibility', () => {
  it('has no axe violations for expanded sidebar', async () => {
    const { container } = render(SidebarTestHost, { props: { defaultOpen: true } });
    await expectNoA11yViolations(container);
  });

  it('has no axe violations for collapsed sidebar', async () => {
    const { container } = render(SidebarTestHost, { props: { defaultOpen: false } });
    await expectNoA11yViolations(container);
  });
});

describe('interaction', () => {
  it('activates trigger via keyboard', async () => {
    const { container } = render(SidebarTestHost, { props: { defaultOpen: true } });
    const trigger = screen.getByRole('button', { name: 'Collapse sidebar' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    expect(container.querySelector('[data-sidebar-wrapper]')?.getAttribute('data-state')).toBe('collapsed');
  });
});
