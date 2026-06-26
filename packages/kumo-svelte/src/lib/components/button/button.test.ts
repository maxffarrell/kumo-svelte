import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Button from './Button.svelte';

describe('Button', () => {
  it('renders a button with Kumo data attributes by default', () => {
    render(Button, {
      'aria-label': 'Save'
    });

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('data-kumo-component')).toBe('Button');
    expect(button.getAttribute('data-kumo-part')).toBe('button');
  });

  it('renders as a link when href is provided', () => {
    render(Button, {
      href: '/settings',
      'aria-label': 'Settings'
    });

    const link = screen.getByRole('link', { name: 'Settings' });
    expect(link.getAttribute('href')).toBe('/settings');
    expect(link.getAttribute('data-kumo-part')).toBe('link-button');
  });

  it('marks loading buttons busy and disabled', () => {
    render(Button, {
      loading: true,
      'aria-label': 'Deploy'
    });

    const button = screen.getByRole('button', { name: 'Deploy' });
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('keeps emphasized variant rings color-matched when pressed or focused', () => {
    for (const variant of ['primary', 'destructive'] as const) {
      render(Button, {
        variant,
        'aria-label': variant
      });

      const className = screen.getByRole('button', { name: variant }).className;

      expect(className).toContain('ring-(--kumo-button-emphasis-ring)');
      expect(className).toContain('focus:ring-(--kumo-button-emphasis-ring)');
      expect(className).toContain(
        'focus-visible:ring-(--kumo-button-emphasis-ring)'
      );
      expect(className).toContain('active:ring-(--kumo-button-emphasis-ring)');
    }
  });
});
