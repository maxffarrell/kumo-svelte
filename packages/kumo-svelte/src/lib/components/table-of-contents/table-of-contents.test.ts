import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import TableOfContentsTestHost from './TableOfContentsTestHost.svelte';

describe('TableOfContents', () => {
  it('renders nav root with default aria-label', () => {
    render(TableOfContentsTestHost);
    const nav = screen.getByTestId('toc-root');
    expect(nav.tagName).toBe('NAV');
    expect(nav.getAttribute('aria-label')).toBe('Table of contents');
  });

  it('renders list with border-kumo-hairline', () => {
    render(TableOfContentsTestHost);
    const list = screen.getByTestId('toc-list');
    expect(list.tagName).toBe('UL');
    expect(list.className).toContain('border-kumo-hairline');
  });

  it('applies inactive item hover affordances', () => {
    render(TableOfContentsTestHost);
    const link = screen.getByTestId('toc-item');
    expect(link.className).toContain('text-kumo-subtle');
    expect(link.className).toContain('hover:border-kumo-line');
    expect(link.className).toContain('hover:text-kumo-default');
    expect(link.className).toContain('hover:font-medium');
  });

  it('applies active item state classes', () => {
    render(TableOfContentsTestHost, { active: true });
    const link = screen.getByTestId('toc-item');
    expect(link.className).toContain('border-kumo-brand');
    expect(link.className).toContain('font-medium');
    expect(link.className).toContain('text-kumo-default');
    expect(link.getAttribute('aria-current')).toBe('true');
    expect(link.getAttribute('data-kumo-part')).toBe('item');
  });

  it('renders grouped items with nested list padding', () => {
    render(TableOfContentsTestHost, { grouped: true });
    const group = screen.getByTestId('toc-group');
    expect(group.tagName).toBe('LI');
    const nestedList = group.querySelector('ul');
    expect(nestedList).toBeTruthy();
    expect(nestedList!.className).toContain('[&>li>a]:pl-7');
  });

  it('renders group label as paragraph when href is absent', () => {
    render(TableOfContentsTestHost, { grouped: true });
    const label = screen.getByText('Getting Started');
    expect(label.tagName).toBe('P');
    expect(label.className).toContain('text-kumo-subtle');
  });

  it('renders group label as link when href is provided', () => {
    render(TableOfContentsTestHost, { grouped: true, groupHref: true, active: true });
    const link = screen.getByText('Getting Started').closest('a');
    expect(link).toBeTruthy();
    expect(link!.getAttribute('href')).toBe('#guides');
    expect(link!.getAttribute('aria-current')).toBe('true');
    expect(link!.getAttribute('data-kumo-part')).toBe('group-link');
  });

  it('renders title with uppercase tracking classes', () => {
    render(TableOfContentsTestHost, { withTitle: true });
    const title = screen.getByText('On this page');
    expect(title.tagName).toBe('P');
    expect(title.className).toContain('uppercase');
    expect(title.className).toContain('tracking-wide');
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(TableOfContentsTestHost);
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (active item)', async () => {
      const { container } = render(TableOfContentsTestHost, { active: true, withTitle: true });
      await expectNoA11yViolations(container);
    });
  });
});
