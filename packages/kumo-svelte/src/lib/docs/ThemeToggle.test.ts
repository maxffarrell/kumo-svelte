import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ThemeToggle from './ThemeToggle.svelte';

describe('ThemeToggle', () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    const storage = {
      clear: () => values.clear(),
      getItem: (key: string) => values.get(key) ?? null,
      key: (index: number) => Array.from(values.keys())[index] ?? null,
      get length() {
        return values.size;
      },
      removeItem: (key: string) => values.delete(key),
      setItem: (key: string, value: string) => values.set(key, value)
    } satisfies Storage;
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: storage
    });
    document.documentElement.removeAttribute('data-mode');
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: false })
    });
  });

  it('opens from the composed button and applies the selected theme', async () => {
    const user = userEvent.setup();
    const themeChange = vi.fn();
    window.addEventListener('kumo:theme-change', themeChange);
    render(ThemeToggle);

    const trigger = await screen.findByRole('button', {
      name: 'Select theme, current theme is system'
    });
    await user.click(trigger);

    expect(screen.getByRole('menuitemradio', { name: 'System' }).getAttribute('aria-checked')).toBe(
      'true'
    );
    expect(screen.getByRole('menuitemradio', { name: 'Dark' }).getAttribute('aria-checked')).toBe(
      'false'
    );

    await user.click(screen.getByRole('menuitemradio', { name: 'Dark' }));

    await waitFor(() => {
      expect(trigger.getAttribute('aria-label')).toBe('Select theme, current theme is dark');
    });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-mode')).toBe('dark');
    expect(themeChange).toHaveBeenCalledTimes(1);
    expect((themeChange.mock.calls[0][0] as CustomEvent).detail).toEqual({
      theme: 'dark',
      resolvedTheme: 'dark'
    });

    window.removeEventListener('kumo:theme-change', themeChange);
  });
});
