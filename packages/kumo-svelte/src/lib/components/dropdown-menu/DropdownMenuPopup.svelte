<script lang="ts">
 import type { Snippet } from 'svelte';
 import { cn } from '#lib/utils/cn.js';
 import { popupClasses } from './styles';
 let { children, class: className, ...rest }: { children?: Snippet; class?: string; [key: string]: unknown } = $props();
</script>
<div data-kumo-component="DropdownMenu" data-kumo-part="popup" class={cn(popupClasses, className)} {...rest}>{@render children?.()}</div>
