<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getSidebarContext } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
  const sidebar = getSidebarContext('Sidebar');
  const railWidth = $derived(sidebar.open ? 'var(--sidebar-width)' : sidebar.collapsible === 'icon' ? 'var(--sidebar-width-icon)' : '0px');
  const contentWidth = $derived(sidebar.open || sidebar.isPeeking ? 'var(--sidebar-width)' : sidebar.collapsible === 'icon' ? 'var(--sidebar-width-icon)' : '0px');
</script>

<aside
  data-state={sidebar.state}
  data-side={sidebar.side}
  data-variant={sidebar.variant}
  data-collapsible={sidebar.collapsible}
  data-sidebar="sidebar"
  style:width={railWidth}
  class={cn('group/sidebar relative h-full shrink-0 grow-0 overflow-visible transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none', sidebar.variant === 'floating' && 'm-2 rounded-lg shadow-lg', className)}
  {...rest}
>
  <div
    data-sidebar="content-container"
    style:width={contentWidth}
    class={cn(
      'flex h-full min-w-0 flex-col overflow-hidden whitespace-nowrap bg-(--sidebar-bg) text-kumo-default transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none',
      sidebar.variant === 'sidebar' && (sidebar.side === 'left' ? 'border-r border-kumo-line' : 'border-l border-kumo-line'),
      sidebar.variant === 'floating' && 'rounded-lg border border-kumo-line',
      !sidebar.open && 'absolute inset-y-0 z-40',
      !sidebar.open && sidebar.side === 'left' && 'left-0',
      !sidebar.open && sidebar.side === 'right' && 'right-0'
    )}
  >
    <div
      data-sidebar="peek-zone"
      class="flex min-h-0 flex-1 flex-col"
      role="presentation"
      onmouseenter={sidebar.startPeek}
      onmouseleave={sidebar.stopPeek}
      onfocus={sidebar.startPeek}
      onblur={sidebar.stopPeek}
    >
      {@render children?.()}
    </div>
  </div>
</aside>
