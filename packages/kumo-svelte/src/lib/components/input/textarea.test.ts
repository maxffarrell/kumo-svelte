import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Textarea from './Textarea.svelte';

describe('Textarea', () => {
  it('renders a textarea', () => {
    render(Textarea, { 'aria-label': 'Notes' });
    expect(screen.getByRole('textbox', { name: 'Notes' }).tagName).toBe('TEXTAREA');
  });

  it('binds value and fires onValueChange', async () => {
    const onValueChange = vi.fn();
    render(Textarea, { 'aria-label': 'Notes', onValueChange });
    await userEvent.type(screen.getByRole('textbox', { name: 'Notes' }), 'a');
    expect(onValueChange).toHaveBeenCalled();
  });

  it('does not accept input when disabled', async () => {
    render(Textarea, { 'aria-label': 'Notes', disabled: true, value: 'locked' });
    const textarea = screen.getByRole('textbox', { name: 'Notes' }) as HTMLTextAreaElement;
    expect(textarea.disabled).toBe(true);
  });

  describe('variant fidelity', () => {
    it('applies kumo-input-placeholder and py-2 classes', () => {
      render(Textarea, { 'aria-label': 'Notes' });
      const cls = screen.getByRole('textbox', { name: 'Notes' }).className;
      expect(cls).toContain('kumo-input-placeholder');
      expect(cls).toContain('py-2');
      expect(cls).not.toContain('placeholder:text-kumo-muted');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(Textarea, { 'aria-label': 'Notes' });
      await expectNoA11yViolations(container);
    });
  });
});
