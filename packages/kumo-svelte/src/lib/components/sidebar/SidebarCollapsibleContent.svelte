<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface CollapsibleContext { get open(): boolean; toggle(): void; }
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
  const collapsible = getContext<CollapsibleContext>('kumo-sidebar-collapsible');
</script>

{#if collapsible?.open}
  <div data-sidebar="collapsible-content" class={cn('grid', className)} {...rest}>
    {@render children?.()}
  </div>
{/if}
