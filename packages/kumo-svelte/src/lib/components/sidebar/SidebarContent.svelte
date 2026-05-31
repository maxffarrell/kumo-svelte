<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getSidebarContext } from './context';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
  const sidebar = getSidebarContext('Sidebar.Content');
</script>

<div
  data-sidebar="content"
  class={cn('relative min-w-0 flex-1 overflow-y-auto overflow-x-hidden px-3.5 py-[13px]', className)}
  role="presentation"
  onmouseenter={sidebar.startPeek}
  onmouseleave={sidebar.stopPeek}
  onfocusin={sidebar.startPeek}
  onfocusout={sidebar.stopPeek}
  {...rest}
>
  <div class="flex min-w-0 flex-col gap-2">
    {@render children?.()}
  </div>
</div>
