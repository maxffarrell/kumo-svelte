<script lang="ts">
  import { Command as CommandPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    progress?: number;
    [key: string]: unknown;
  }

  let { children, class: className, progress, ...rest }: Props = $props();
</script>

<CommandPrimitive.Loading {progress} class={cn('flex items-center justify-center p-8 text-kumo-subtle', className)} {...rest}>
  {#if children}
    {@render children()}
  {:else}
    <svg class="size-6 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-label="Loading">
      <circle cx="12" cy="12" r="9.5" opacity="0.1" stroke-width="2" />
      <path d="M21.5 12a9.5 9.5 0 0 0-9.5-9.5" stroke-width="2" stroke-linecap="round" />
    </svg>
  {/if}
</CommandPrimitive.Loading>
