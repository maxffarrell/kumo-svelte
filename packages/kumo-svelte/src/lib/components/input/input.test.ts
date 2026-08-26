import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Input from './Input.svelte';
import { inputVariants } from './input-variants';

describe('Input', () => {
  it('renders an input with default type', () => {
    render(Input, { 'aria-label': 'Email' });
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input.tagName).toBe('INPUT');
  });

  it('binds value and fires onValueChange', async () => {
    const onValueChange = vi.fn();
    render(Input, { 'aria-label': 'Email', onValueChange });
    const input = screen.getByRole('textbox', { name: 'Email' });
    await userEvent.type(input, 'a');
    expect(onValueChange).toHaveBeenCalled();
  });

  it('does not accept input when disabled', async () => {
    render(Input, { 'aria-label': 'Email', disabled: true, value: 'locked' });
    const input = screen.getByRole('textbox', { name: 'Email' }) as HTMLInputElement;
    expect(input.disabled).toBe(true);
    await userEvent.type(input, 'x');
    expect(input.value).toBe('locked');
  });

  describe('variant fidelity', () => {
    it('applies kumo-input-placeholder and focus ring classes', () => {
      render(Input, { 'aria-label': 'Email' });
      const cls = screen.getByRole('textbox', { name: 'Email' }).className;
      expect(cls).toContain('kumo-input-placeholder');
      expect(cls).toContain('focus:ring-kumo-focus/50');
      expect(cls).toContain('focus:ring-[1.5px]');
      expect(cls).not.toContain('placeholder:text-kumo-muted');
    });

    it('applies error ring classes when error is set', () => {
      render(Input, { 'aria-label': 'Email', error: 'Invalid email' });
      const cls = screen.getByRole('textbox', { name: 'Email' }).className;
      expect(cls).toContain('!ring-kumo-danger');
      expect(cls).toContain('focus:ring-kumo-danger/50');
    });

    it('exports parentFocusIndicator classes from inputVariants', () => {
      const classes = inputVariants({ parentFocusIndicator: true });
      expect(classes).toContain('focus-within:ring-kumo-focus/50');
      expect(classes).toContain('focus-within:ring-[1.5px]');
    });
  });

  describe('size', () => {
    it('applies size classes', () => {
      render(Input, { 'aria-label': 'Email', size: 'lg' });
      expect(screen.getByRole('textbox', { name: 'Email' }).className).toContain('h-10');
    });
  });

  describe('field wrapper', () => {
    it('renders label when provided', () => {
      render(Input, { label: 'Email', placeholder: 'you@example.com' });
      expect(screen.getByText('Email')).toBeTruthy();
    });
  });

  describe('password manager ignore', () => {
    it('sets password manager suppression attributes', () => {
      render(Input, { 'aria-label': 'Search', passwordManagerIgnore: true });
      const input = screen.getByRole('textbox', { name: 'Search' });
      expect(input.getAttribute('data-1p-ignore')).toBe('true');
      expect(input.getAttribute('data-lpignore')).toBe('true');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(Input, { 'aria-label': 'Email' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations with label', async () => {
      const { container } = render(Input, { label: 'Email', placeholder: 'you@example.com' });
      await expectNoA11yViolations(container);
    });
  });
});
