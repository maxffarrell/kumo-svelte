import { type Snippet } from 'svelte';
/**
 * Wraps a plain string in a Svelte Snippet for use as `children` in component
 * tests. `() => 'text'` is NOT a valid Snippet, so use this helper instead.
 */
export declare function textSnippet(text: string): Snippet;
