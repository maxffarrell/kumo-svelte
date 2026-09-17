<script module lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { KumoTextSize, KumoTextVariant, TextElement } from '$lib/components/text';

  export const KUMO_INLINE_COPY_TEXT_VARIANTS = {} as const;
  export const KUMO_INLINE_COPY_TEXT_DEFAULT_VARIANTS = {} as const;
  export const KUMO_INLINE_COPY_TEXT_STYLING = {
    baseClasses: 'group/inline-copy flex min-w-0 max-w-full cursor-pointer items-center gap-1 rounded-xs border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kumo-brand'
  } as const;

  export interface InlineCopyTextLabels { copyAction?: string; copied?: string; }
  export type InlineCopyTextVariant = Exclude<KumoTextVariant, `heading${string}` | 'heading'>;
  export interface InlineCopyTextProps {
    children: import('svelte').Snippet;
    value?: string;
    variant?: InlineCopyTextVariant;
    size?: KumoTextSize;
    bold?: boolean;
    truncate?: boolean;
    as?: TextElement;
    onCopy?: () => void;
    labels?: InlineCopyTextLabels;
    class?: string;
    onclick?: (event: MouseEvent) => void;
    [key: string]: unknown;
  }

  export function inlineCopyTextClasses(className?: string) {
    return cn(KUMO_INLINE_COPY_TEXT_STYLING.baseClasses, className);
  }
</script>

<script lang="ts">
  import { onDestroy } from 'svelte';
  import Check from 'phosphor-svelte/lib/Check';
  import CopySimple from 'phosphor-svelte/lib/CopySimple';
  import { Text } from '$lib/components/text';

  let { children, value, variant = 'mono-secondary', size, bold, truncate = true, as = 'span', onCopy, labels = {}, class: className, onclick, ...rest }: InlineCopyTextProps = $props();
  let content: HTMLSpanElement;
  let copied = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;
  const copyAction = $derived(labels.copyAction ?? 'Copy to clipboard');
  const copiedLabel = $derived(labels.copied ?? 'Copied');
  const textHoverClasses = $derived(variant === 'mono-secondary' ? 'group-hover/inline-copy:text-kumo-default group-focus-visible/inline-copy:text-kumo-default' : undefined);
  const textProps = $derived({
    as,
    variant,
    size,
    bold,
    truncate,
    DANGEROUS_className: textHoverClasses
  } as import('$lib/components/text').TextProps);

  onDestroy(() => { if (resetTimer) clearTimeout(resetTimer); });

  async function handleClick(event: MouseEvent) {
    onclick?.(event);
    if (event.defaultPrevented) return;
    if (resetTimer) clearTimeout(resetTimer);
    try {
      await navigator.clipboard.writeText(value ?? content.textContent ?? '');
      copied = true;
      resetTimer = setTimeout(() => { copied = false; resetTimer = undefined; }, 1500);
      onCopy?.();
    } catch (error) {
      copied = false;
      console.warn('Clipboard copy failed', error);
    }
  }
</script>

<button type="button" data-kumo-component="InlineCopyText" class={inlineCopyTextClasses(className)} aria-label={copied ? copiedLabel : copyAction} onclick={handleClick} {...rest}>
  <span bind:this={content} class="contents">
    <Text {...textProps}>{@render children()}</Text>
  </span>
  {#if copied}
    <Check aria-hidden="true" class="size-3.5 shrink-0" />
  {:else}
    <CopySimple aria-hidden="true" class={cn('size-3.5 shrink-0 opacity-0 transition-opacity motion-reduce:transition-none', 'group-hover/inline-copy:opacity-100 group-focus-visible/inline-copy:opacity-100', 'group-focus-within:opacity-100 group-hover:opacity-100')} />
  {/if}
  <span class="sr-only" aria-live="polite">{copied ? copiedLabel : ''}</span>
</button>
