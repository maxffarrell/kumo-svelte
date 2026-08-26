import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import { mockClipboard } from '../../../../tests/clipboard';
import { KUMO_EMPTY_VARIANTS } from './Empty.svelte';
import Empty from './Empty.svelte';

describe('Empty', () => {
  it('renders title and description', () => {
    render(Empty, {
      title: 'No results found',
      description: 'Try adjusting your search.'
    });

    expect(screen.getByRole('heading', { name: 'No results found' })).toBeTruthy();
    expect(screen.getByText('Try adjusting your search.')).toBeTruthy();
  });

  describe('variant fidelity', () => {
    it('applies base size classes by default', () => {
      const { container } = render(Empty, { title: 'Empty' });
      const root = container.firstElementChild as HTMLElement;
      expect(root.className).toContain('px-10');
      expect(root.className).toContain('py-16');
      expect(root.className).toContain('gap-6');
    });

    it('applies sm size classes', () => {
      const { container } = render(Empty, { title: 'Empty', size: 'sm' });
      const root = container.firstElementChild as HTMLElement;
      expect(root.className).toContain(KUMO_EMPTY_VARIANTS.size.sm.classes);
    });

    it('applies lg size classes', () => {
      const { container } = render(Empty, { title: 'Empty', size: 'lg' });
      const root = container.firstElementChild as HTMLElement;
      expect(root.className).toContain(KUMO_EMPTY_VARIANTS.size.lg.classes);
    });

    it('uses kumo-control surface classes', () => {
      const { container } = render(Empty, { title: 'Empty' });
      const root = container.firstElementChild as HTMLElement;
      expect(root.className).toContain('border-kumo-fill');
      expect(root.className).toContain('bg-kumo-control');
      expect(root.className).toContain('text-kumo-default');
    });

    it('restores command line overflow-scroll (not split overflow)', () => {
      render(Empty, {
        title: 'Install',
        commandLine: 'npm install @cloudflare/kumo'
      });

      const command = screen.getByText('npm install @cloudflare/kumo');
      expect(command.className).toContain('overflow-scroll');
      expect(command.className).not.toContain('overflow-x-auto');
    });

    it('restores command block hover affordances', () => {
      render(Empty, {
        title: 'Install',
        commandLine: 'npm install @cloudflare/kumo'
      });

      const block = screen.getByText('npm install @cloudflare/kumo').closest('div');
      expect(block).toBeTruthy();
      expect(block!.className).toContain('hover:border-kumo-interact/80');
      expect(block!.className).toContain('hover:shadow-md');
      expect(block!.className).toContain('border-kumo-fill/60');
    });
  });

  describe('interaction', () => {
    it('copies command line on button click', async () => {
      const writeText = mockClipboard();

      render(Empty, {
        title: 'Install',
        commandLine: 'npm install @cloudflare/kumo'
      });

      await userEvent.click(screen.getByRole('button', { name: 'Copy command' }));
      expect(writeText).toHaveBeenCalledWith('npm install @cloudflare/kumo');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations (default)', async () => {
      const { container } = render(Empty, {
        title: 'No results found',
        description: 'Try adjusting your search.'
      });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (with command line)', async () => {
      const { container } = render(Empty, {
        title: 'Install',
        commandLine: 'npm install @cloudflare/kumo'
      });
      await expectNoA11yViolations(container);
    });
  });
});
