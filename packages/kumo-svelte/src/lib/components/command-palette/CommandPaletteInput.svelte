<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    class?: string;
    value?: string;
    placeholder?: string;
    leading?: Snippet;
    trailing?: Snippet;
    [key: string]: unknown;
  }

  let {
    class: className,
    value = $bindable(''),
    placeholder = 'Type a command...',
    leading,
    trailing,
    ...rest
  }: Props = $props();
</script>

<div class="flex items-center gap-3 bg-kumo-base px-4 py-3 focus-within:ring-2 focus-within:ring-kumo-brand">
  {#if leading}
    {@render leading()}
  {:else}
    <svg class="h-4 w-4 text-kumo-subtle" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72 72.08 72.08 0 0 1-72-72Z" />
    </svg>
  {/if}
    <CommandPrimitive.Input
      bind:value
      {placeholder}
    class={cn('h-7 min-w-0 flex-1 border-none bg-transparent text-base kumo-input-placeholder outline-none', className)}
      {...rest}
    />
    {@render trailing?.()}
</div>
