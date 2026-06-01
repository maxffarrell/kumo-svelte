<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div
  data-sidebar="footer"
  class={cn(
    'sticky bottom-0 flex h-12 w-(--sidebar-width) shrink-0 items-center gap-4 overflow-hidden whitespace-nowrap border-t border-kumo-line bg-(--sidebar-bg) bg-clip-padding px-[11px] transition-[width,padding] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none group-not-data-[state=collapsed]/sidebar:px-4 group-data-[state=collapsed]/sidebar:w-(--sidebar-width-icon) group-data-[state=collapsed]/sidebar:border-r group-data-[state=collapsed]/sidebar:border-kumo-line',
    className
  )}
  {...rest}
>
  {@render children?.()}
</div>
