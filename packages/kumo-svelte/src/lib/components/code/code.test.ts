import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import Code from './Code.svelte';
import CodeBlock from './CodeBlock.svelte';
import CodeHighlighted from './CodeHighlighted.svelte';

describe('Code', () => {
  it('renders inline code with Kumo typography classes', () => {
    render(Code, { code: 'const x = 1;', lang: 'ts' });

    const pre = screen.getByText('const x = 1;');
    const cls = pre.className;
    expect(cls).toContain('font-mono');
    expect(cls).toContain('text-sm');
    expect(cls).toContain('leading-[20px]');
    expect(cls).toContain('text-kumo-subtle');
    expect(cls).toContain('bg-transparent');
    expect(cls).toContain('rounded-none');
  });

  it('uses border-kumo-fill (not hairline) on code blocks', () => {
    const { container } = render(CodeBlock, { code: 'npm run build', lang: 'bash' });

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('border-kumo-fill');
    expect(wrapper.className).toContain('bg-kumo-base');
    expect(wrapper.className).toContain('rounded-md');
    expect(wrapper.className).not.toContain('border-kumo-hairline');
  });

  describe('accessibility', () => {
    it('has no axe violations (inline)', async () => {
      const { container } = render(Code, { code: 'const x = 1;' });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations (block)', async () => {
      const { container } = render(CodeBlock, { code: 'const x = 1;' });
      await expectNoA11yViolations(container);
    });
  });
});

describe('CodeHighlighted', () => {
  it('applies Kumo container classes', async () => {
    const { container } = render(CodeHighlighted, {
      code: 'const x = 1;',
      lang: 'typescript'
    });

    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('border-kumo-fill');
    expect(root.className).toContain('bg-kumo-base');
    expect(root.className).toContain('rounded-md');
    expect(root.className).toContain('min-w-0');
  });

  it('renders copy button with accessible label', () => {
    render(CodeHighlighted, {
      code: 'npm install pkg',
      lang: 'bash',
      showCopyButton: true
    });

    expect(screen.getByRole('button', { name: 'Copy code to clipboard' })).toBeTruthy();
  });

  it('copies code to clipboard', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    render(CodeHighlighted, {
      code: 'npm install pkg',
      lang: 'bash',
      showCopyButton: true
    });

    await user.click(screen.getByRole('button', { name: 'Copy code to clipboard' }));
    expect(writeText).toHaveBeenCalledWith('npm install pkg');

    vi.unstubAllGlobals();
  });

  it('wraps highlighted output in kumo-shiki', async () => {
    const { container } = render(CodeHighlighted, {
      code: 'const x = 1;',
      lang: 'typescript'
    });

    await waitFor(() => {
      expect(container.querySelector('.kumo-shiki')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(CodeHighlighted, {
        code: 'const x = 1;',
        lang: 'typescript'
      });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations with copy button', async () => {
      const { container } = render(CodeHighlighted, {
        code: 'npm install pkg',
        lang: 'bash',
        showCopyButton: true
      });
      await expectNoA11yViolations(container);
    });
  });
});
