<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface SlidingContext { get activeKey(): string; }
  interface Props { children?: Snippet; class?: string; value: string; [key: string]: unknown; }
  let { children, class: className, value, ...rest }: Props = $props();
  const sliding = getContext<SlidingContext>('kumo-sidebar-sliding-view');
</script>

<div
  data-sidebar="sliding-view"
  data-active={sliding?.activeKey === value ? '' : undefined}
  class={cn('absolute inset-0 min-h-0 transition-transform duration-(--sidebar-animation-duration) data-[active]:relative data-[active]:translate-x-0 not-data-[active]:translate-x-full', className)}
  {...rest}
>
  {#if sliding?.activeKey === value}
    {@render children?.()}
  {/if}
</div>
