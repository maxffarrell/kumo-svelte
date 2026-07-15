import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import InputArea from './InputArea.svelte';

describe('InputArea', () => {
  it('renders a textarea', () => {
    render(InputArea, { 'aria-label': 'Message' });
    expect(screen.getByRole('textbox', { name: 'Message' }).tagName).toBe('TEXTAREA');
  });

  it('binds value and fires onValueChange', async () => {
    const onValueChange = vi.fn();
    render(InputArea, { 'aria-label': 'Message', onValueChange });
    const textarea = screen.getByRole('textbox', { name: 'Message' });
    await userEvent.type(textarea, 'hi');
    expect(onValueChange).toHaveBeenCalled();
  });

  it('does not accept input when disabled', async () => {
    render(InputArea, { 'aria-label': 'Message', disabled: true, value: 'locked' });
    const textarea = screen.getByRole('textbox', { name: 'Message' }) as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
    await userEvent.type(textarea, 'x');
    expect(textarea.value).toBe('locked');
  });

  describe('variant fidelity', () => {
    it('applies kumo-input-placeholder and textarea height classes', () => {
      render(InputArea, { 'aria-label': 'Message' });
      const cls = screen.getByRole('textbox', { name: 'Message' }).className;
      expect(cls).toContain('kumo-input-placeholder');
      expect(cls).toContain('h-auto');
      expect(cls).toContain('py-2');
      expect(cls).toContain('focus:ring-kumo-focus/50');
    });

    it('applies error ring classes when error is set', () => {
      render(InputArea, { 'aria-label': 'Message', error: 'Required' });
      const cls = screen.getByRole('textbox', { name: 'Message' }).className;
      expect(cls).toContain('!ring-kumo-danger');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(InputArea, { 'aria-label': 'Message' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations with label', async () => {
      const { container } = render(InputArea, { label: 'Message', placeholder: 'Write here...' });
      await expectNoA11yViolations(container);
    });
  });
});
