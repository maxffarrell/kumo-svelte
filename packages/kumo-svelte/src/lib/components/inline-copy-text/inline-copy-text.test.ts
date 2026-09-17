import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { createRawSnippet } from 'svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockClipboard } from '../../../../tests/clipboard';
import InlineCopyText from './InlineCopyText.svelte';

const content = (text: string) => createRawSnippet(() => ({ render: () => text }));

describe('InlineCopyText', () => {
  let writeText: ReturnType<typeof vi.fn>;
  beforeEach(() => { writeText = mockClipboard(); });

  it('renders an accessible compact copy button', () => {
    render(InlineCopyText, { value: 'namespace-id', children: content('namespace-id') });
    expect(screen.getByRole('button', { name: 'Copy to clipboard' })).toBeTruthy();
    expect(screen.getByText('namespace-id')).toBeTruthy();
  });

  it('copies a value and announces localized success', async () => {
    const onCopy = vi.fn();
    render(InlineCopyText, {
      value: 'complete-resource-id',
      children: content('visible-id'),
      labels: { copyAction: 'Copy database ID', copied: 'Database ID copied' },
      onCopy
    });
    await userEvent.click(screen.getByRole('button', { name: 'Copy database ID' }));
    expect(writeText).toHaveBeenCalledWith('complete-resource-id');
    expect(screen.getByRole('button', { name: 'Database ID copied' })).toBeTruthy();
    expect(screen.getByText('Database ID copied')).toBeTruthy();
    expect(onCopy).toHaveBeenCalledOnce();
  });

  it('does not copy when a consumer prevents the click', async () => {
    render(InlineCopyText, {
      value: 'namespace-id',
      children: content('namespace-id'),
      onclick: (event: MouseEvent) => event.preventDefault()
    });
    await userEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));
    expect(writeText).not.toHaveBeenCalled();
  });
});
