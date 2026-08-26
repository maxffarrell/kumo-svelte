import { createRawSnippet, type Snippet } from 'svelte';

/**
 * Wraps a plain string in a Svelte Snippet for use as `children` in component
 * tests. `() => 'text'` is NOT a valid Snippet, so use this helper instead.
 */
export function textSnippet(text: string): Snippet {
  return createRawSnippet(() => ({
    render: () => `<span>${text}</span>`,
  })) as unknown as Snippet;
}
