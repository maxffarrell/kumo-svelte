<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div data-sidebar="header" class={cn('flex h-[58px] items-center gap-1 overflow-hidden border-b border-kumo-line px-3.5', className)} {...rest}>
  {@render children?.()}
</div>
