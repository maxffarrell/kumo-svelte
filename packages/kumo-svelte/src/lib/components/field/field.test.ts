import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import FieldTestHost from './FieldTestHost.svelte';
import { fieldVariants, normalizeFieldError } from './Field.svelte';

describe('Field', () => {
  it('renders label and input', () => {
    render(FieldTestHost, { label: 'Email', inputPlaceholder: 'you@example.com' });
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('you@example.com')).toBeTruthy();
  });

  it('shows optional indicator when required is false', () => {
    render(FieldTestHost, { label: 'Middle name', required: false });
    expect(screen.getByText('(optional)')).toBeTruthy();
  });

  it('shows description when no error', () => {
    render(FieldTestHost, {
      label: 'Phone',
      description: "We'll only use this for account recovery."
    });
    expect(screen.getByText("We'll only use this for account recovery.")).toBeTruthy();
  });

  it('shows error message instead of description', () => {
    render(FieldTestHost, {
      label: 'Username',
      description: 'Choose wisely',
      error: 'Username is already taken'
    });
    expect(screen.getByText('Username is already taken')).toBeTruthy();
    expect(screen.queryByText('Choose wisely')).toBeNull();
  });

  describe('variant fidelity', () => {
    it('fieldVariants returns base grid layout', () => {
      expect(fieldVariants()).toContain('grid gap-2');
    });

    it('fieldVariants applies checkbox horizontal layout', () => {
      expect(fieldVariants()).toContain('has-[input[type=checkbox]]:grid-cols-[auto_1fr]');
    });

    it('fieldVariants applies controlFirst flex reversal', () => {
      const cls = fieldVariants({ controlFirst: true });
      expect(cls).toContain('has-[input[type=checkbox]]:flex-row-reverse');
      expect(cls).toContain('[&>label]:flex-1');
    });

    it('normalizeFieldError coerces string errors', () => {
      expect(normalizeFieldError('Invalid')).toEqual({ message: 'Invalid', match: true });
    });

    it('applies label typography classes', () => {
      render(FieldTestHost, { label: 'Email' });
      const label = screen.getByText('Email').closest('label') as HTMLElement;
      expect(label.className).toContain('text-base');
      expect(label.className).toContain('font-medium');
      expect(label.className).toContain('text-kumo-default');
    });

    it('applies error text classes', () => {
      render(FieldTestHost, { error: 'Required field' });
      const error = screen.getByText('Required field');
      expect(error.className).toContain('text-kumo-danger');
      expect(error.className).toContain('col-span-full');
    });

    it('applies description text classes', () => {
      render(FieldTestHost, { description: 'Helper text' });
      const description = screen.getByText('Helper text');
      expect(description.className).toContain('text-kumo-subtle');
      expect(description.className).toContain('col-span-full');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(FieldTestHost, { label: 'Email' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (with error)', async () => {
      const { container } = render(FieldTestHost, {
        label: 'Email',
        error: 'Invalid email address'
      });
      await expectNoA11yViolations(container);
    });
  });
});
