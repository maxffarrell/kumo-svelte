import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import TextTestHost from './TextTestHost.svelte';

describe('Text', () => {
  it('renders heading variant with the required as element', () => {
    const { container } = render(TextTestHost, {
      variant: 'heading1',
      as: 'h1',
      label: 'Page Title'
    });
    expect(container.querySelector('h1')).toBeTruthy();
  });

  it('renders body variant as p by default', () => {
    const { container } = render(TextTestHost, { label: 'Body copy' });
    expect(container.querySelector('p')).toBeTruthy();
  });

  it('body variant supports optional as override', () => {
    const { container } = render(TextTestHost, {
      variant: 'body',
      as: 'span',
      label: 'Inline body'
    });
    expect(container.querySelector('span')).toBeTruthy();
    expect(container.querySelector('p')).toBeNull();
  });

  it('allows heading variants to opt out of semantic heading via as span', () => {
    const { container } = render(TextTestHost, {
      variant: 'heading2',
      as: 'span',
      label: 'Decorative big text'
    });
    expect(container.querySelector('span')).toBeTruthy();
    expect(container.querySelector('h2')).toBeNull();
  });

  describe('variant fidelity', () => {
    it('applies heading1 classes', () => {
      const { container } = render(TextTestHost, {
        variant: 'heading1',
        as: 'h1',
        label: 'Title'
      });
      const cls = container.querySelector('h1')!.className;
      expect(cls).toContain('text-3xl');
      expect(cls).toContain('font-semibold');
    });

    it('applies secondary subtle color', () => {
      const { container } = render(TextTestHost, { variant: 'secondary', label: 'Muted' });
      expect(container.querySelector('p')!.className).toContain('text-kumo-subtle');
    });

    it('applies error danger color', () => {
      const { container } = render(TextTestHost, { variant: 'error', label: 'Broken' });
      expect(container.querySelector('p')!.className).toContain('text-kumo-danger');
    });

    it('applies size classes for copy variants', () => {
      const { container } = render(TextTestHost, { variant: 'body', size: 'sm', label: 'Small' });
      expect(container.querySelector('p')!.className).toContain('text-sm');
    });

    it('applies bold font-medium for body', () => {
      const { container } = render(TextTestHost, { variant: 'body', bold: true, label: 'Bold' });
      expect(container.querySelector('p')!.className).toContain('font-medium');
    });

    it('applies truncate classes', () => {
      const { container } = render(TextTestHost, { variant: 'body', truncate: true, label: 'Long' });
      const cls = container.querySelector('p')!.className;
      expect(cls).toContain('truncate');
      expect(cls).toContain('min-w-0');
    });

    it('uses smaller mono sizing by default', () => {
      const { container } = render(TextTestHost, { variant: 'mono', label: 'code' });
      const cls = container.querySelector('span')!.className;
      expect(cls).toContain('font-mono');
      expect(cls).toContain('text-sm');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (body)', async () => {
      const { container } = render(TextTestHost, { label: 'Accessible body text' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (heading)', async () => {
      const { container } = render(TextTestHost, {
        variant: 'heading2',
        as: 'h2',
        label: 'Section title'
      });
      await expectNoA11yViolations(container);
    });
  });
});
