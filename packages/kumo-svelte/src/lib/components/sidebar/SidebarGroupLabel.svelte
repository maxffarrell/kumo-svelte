<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div data-sidebar="group-label" class={cn('truncate px-3 pt-4 pb-2 text-sm font-medium text-kumo-subtle group-data-[state=collapsed]/sidebar:my-3 group-data-[state=collapsed]/sidebar:border-b group-data-[state=collapsed]/sidebar:border-kumo-line group-data-[state=collapsed]/sidebar:p-0 group-data-[state=collapsed]/sidebar:text-transparent', className)} {...rest}>
  {@render children?.()}
</div>
