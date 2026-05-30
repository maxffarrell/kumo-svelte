<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div data-sidebar="footer" class={cn('sticky bottom-0 flex h-12 shrink-0 items-center gap-4 overflow-hidden whitespace-nowrap border-t border-kumo-line bg-(--sidebar-bg) px-4', className)} {...rest}>
  {@render children?.()}
</div>
