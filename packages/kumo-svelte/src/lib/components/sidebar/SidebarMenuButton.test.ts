import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import SidebarMenuButton from './SidebarMenuButton.svelte';

describe('SidebarMenuButton', () => {
  it('wraps itself in a menu item when rendered standalone', () => {
    const { container } = render(SidebarMenuButton, {
      tooltip: 'Dashboard'
    });

    const button = screen.getByRole('button', { name: 'Dashboard' });
    expect(container.querySelector('li[data-sidebar="menu-item"]')).toBeTruthy();
    expect(button.getAttribute('data-kumo-component')).toBe('Sidebar');
    expect(button.getAttribute('data-kumo-part')).toBe('menu-button');
    expect(button.hasAttribute('title')).toBe(false);
  });

  it('renders link menu buttons with active and size state', () => {
    render(SidebarMenuButton, {
      href: '/analytics',
      tooltip: 'Analytics',
      active: true,
      size: 'sm'
    });

    const link = screen.getByRole('link', { name: 'Analytics' });
    expect(link.getAttribute('href')).toBe('/analytics');
    expect(link.getAttribute('data-active')).toBe('true');
    expect(link.getAttribute('data-size')).toBe('sm');
    expect(link.getAttribute('data-kumo-part')).toBe('menu-button-link');
  });
});
