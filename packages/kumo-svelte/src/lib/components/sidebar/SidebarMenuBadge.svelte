<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<span data-sidebar="menu-badge" class={cn('inline-flex shrink-0 select-none items-center rounded-full border border-dashed border-kumo-line px-1.5 py-0.5 text-[11px]/none font-medium text-kumo-strong group-data-[state=collapsed]/sidebar:hidden', className)} {...rest}>
  {@render children?.()}
</span>
