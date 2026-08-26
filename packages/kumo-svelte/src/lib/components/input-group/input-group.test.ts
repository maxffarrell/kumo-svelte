import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import InputGroupTestHost from './InputGroupTestHost.svelte';

describe('InputGroup', () => {
  it('renders input inside group', () => {
    render(InputGroupTestHost);
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeTruthy();
  });

  it('binds input value via typing', async () => {
    render(InputGroupTestHost);
    const input = screen.getByRole('textbox', { name: 'Search' }) as HTMLInputElement;
    await userEvent.type(input, 'hello');
    expect(input.value).toBe('hello');
  });

  it('disables input when group is disabled', () => {
    render(InputGroupTestHost, { disabled: true });
    expect((screen.getByRole('textbox', { name: 'Search' }) as HTMLInputElement).disabled).toBe(true);
  });

  describe('container mode fidelity', () => {
    it('applies shared focus-within ring on container', () => {
      const { container } = render(InputGroupTestHost, { focusMode: 'container' });
      const group = container.querySelector('[data-slot="input-group"]') as HTMLElement;
      expect(group.className).toContain('focus-within:ring-kumo-focus/50');
      expect(group.className).toContain('focus-within:ring-[1.5px]');
    });

    it('strips input focus ring in container mode', () => {
      render(InputGroupTestHost, { focusMode: 'container' });
      const cls = screen.getByRole('textbox', { name: 'Search' }).className;
      expect(cls).toContain('ring-0!');
      expect(cls).toContain('focus:ring-0!');
      expect(cls).toContain('z-1');
    });
  });

  describe('individual mode fidelity', () => {
    it('applies per-element borders on input', () => {
      render(InputGroupTestHost, { focusMode: 'individual', variant: 'button' });
      const cls = screen.getByRole('textbox', { name: 'Search' }).className;
      expect(cls).toContain('focus:ring-0');
      expect(cls).toContain('border');
      expect(cls).toContain('focus:border-kumo-focus/50');
    });
  });

  describe('hybrid mode fidelity', () => {
    it('renders container zone data-slot', () => {
      const { container } = render(InputGroupTestHost, { focusMode: 'hybrid', variant: 'addon' });
      const zone = container.querySelector('[data-slot="input-group-container-zone"]') as HTMLElement;
      expect(zone).toBeTruthy();
      expect(zone.className).toContain('flex-1');
      expect(zone.className).toContain('focus-within:border-kumo-focus/50');
      expect(zone.className).toContain('focus-within:z-2');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(InputGroupTestHost);
      await expectNoA11yViolations(container);
    });

    it('has no axe violations with label', async () => {
      const { container } = render(InputGroupTestHost, { label: 'Email', variant: 'addon' });
      await expectNoA11yViolations(container);
    });
  });
});
