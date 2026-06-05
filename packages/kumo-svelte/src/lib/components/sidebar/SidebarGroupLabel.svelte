<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div
  data-sidebar="group-label"
  class={cn(
    'grid grid-rows-[0fr] overflow-hidden border-b border-kumo-line my-3 transition-[grid-template-rows,margin,border-color] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) [[data-sidebar=group]:first-child_&]:my-0 [[data-sidebar=group]:first-child_&]:border-transparent group-not-data-[state=collapsed]/sidebar:grid-rows-[1fr] group-not-data-[state=collapsed]/sidebar:my-0 group-not-data-[state=collapsed]/sidebar:border-transparent',
    'group-data-[mobile=true]/sidebar:my-0 group-data-[mobile=true]/sidebar:grid-rows-[1fr] group-data-[mobile=true]/sidebar:border-transparent group-data-[mobile=true]/sidebar:transition-none',
    className
  )}
  {...rest}
>
  <div class="min-h-0 min-w-0">
    <div class="truncate px-3 mt-6 mb-2 text-sm font-medium text-kumo-subtle [[data-sidebar=group]:first-child_&]:mt-2">
      {@render children?.()}
    </div>
  </div>
</div>
