<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
</script>

<div
  data-sidebar="content"
  class={cn(
    'relative min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-[11px] py-[13px] transition-[padding] duration-(--sidebar-animation-duration) group-not-data-[state=collapsed]/sidebar:px-3.5 group-data-[state=collapsed]/sidebar:overflow-x-hidden!',
    className
  )}
  role="presentation"
  {...rest}
>
  <div class="flex min-w-0 flex-col gap-2 group-data-[state=collapsed]/sidebar:min-w-0!">
    {@render children?.()}
  </div>
</div>
