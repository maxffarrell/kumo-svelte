<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<li data-sidebar="menu-item" class={cn('relative group-data-[state=collapsed]/sidebar:overflow-hidden', className)} {...rest}>
  {@render children?.()}
</li>
