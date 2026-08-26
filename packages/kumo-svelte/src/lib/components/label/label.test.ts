import { createRawSnippet, mount, unmount, type Snippet } from 'svelte';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import { TooltipProvider } from '../tooltip';
import LabelTestHost from './LabelTestHost.svelte';
import { labelContentVariants, labelVariants } from './Label.svelte';

function labelHostSnippet(props: Record<string, unknown>): Snippet {
  return createRawSnippet(() => ({
    render: () => '<div data-testid="label-host"></div>',
    setup: (anchor: Element) => {
      const instance = mount(LabelTestHost, { target: anchor, props });
      return () => unmount(instance);
    }
  }));
}

function renderLabel(props: Record<string, unknown> = {}, withTooltipProvider = false) {
  if (!withTooltipProvider) {
    return render(LabelTestHost, { props });
  }

  return render(TooltipProvider, {
    props: {
      children: labelHostSnippet(props)
    }
  });
}

describe('Label', () => {
  it('renders as a label element by default', () => {
    renderLabel({ label: 'Email' });
    const label = screen.getByText('Email');
    expect(label.tagName).toBe('LABEL');
  });

  it('applies base label classes', () => {
    renderLabel({ label: 'Email' });
    const label = screen.getByText('Email');
    expect(label.className).toContain('text-base');
    expect(label.className).toContain('font-medium');
    expect(label.className).toContain('text-kumo-default');
  });

  it('shows optional indicator', () => {
    renderLabel({ showOptional: true, label: 'Middle name' });
    expect(screen.getByText('(optional)')).toBeTruthy();
    expect(screen.getByText('(optional)').className).toContain('text-kumo-subtle');
  });

  it('associates with a form control via htmlFor', () => {
    renderLabel({ htmlFor: 'email', label: 'Email' });
    expect(screen.getByText('Email').getAttribute('for')).toBe('email');
  });

  it('renders tooltip trigger when tooltip is provided', () => {
    renderLabel({ tooltip: 'Extra info', label: 'Email' }, true);
    // Open-state tooltip content is covered by VRT; happy-dom does not mount portaled overlays.
    expect(screen.getByRole('button', { name: 'More information' })).toBeTruthy();
  });

  it('renders as content span when asContent is true', () => {
    renderLabel({ asContent: true, label: 'Field name' });
    const el = screen.getByText('Field name');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('inline-flex');
  });

  describe('variant helpers', () => {
    it('labelVariants returns base styles', () => {
      expect(labelVariants()).toContain('m-0');
      expect(labelVariants()).toContain('text-kumo-default');
    });

    it('labelContentVariants returns inline flex layout', () => {
      expect(labelContentVariants()).toContain('inline-flex');
      expect(labelContentVariants()).toContain('gap-1');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = renderLabel({ label: 'Email' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (optional + tooltip)', async () => {
      const { container } = renderLabel(
        {
          showOptional: true,
          tooltip: 'We use this for notifications',
          label: 'Email'
        },
        true
      );
      await expectNoA11yViolations(container);
    });
  });
});
