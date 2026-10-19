<script lang="ts">
 import type { Snippet } from 'svelte';
 import { cn } from '#lib/utils/cn.js';
 let { children, class: className, ...rest }: { children?: Snippet; class?: string; [key: string]: unknown } = $props();
</script>
<div data-kumo-component="Popover" data-kumo-part="popup" class={cn('flex flex-col rounded-lg bg-kumo-base px-4 py-3 text-sm text-kumo-default shadow-md outline outline-kumo-line kumo-popover-popup', 'origin-(--transform-origin) transition-[transform,scale,opacity] duration-150 data-starting-style:scale-90 data-starting-style:opacity-0 data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:duration-0', className)} {...rest}>{@render children?.()}</div>
