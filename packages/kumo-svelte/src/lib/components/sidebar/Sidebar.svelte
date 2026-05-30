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
  const isAlwaysExpanded = $derived(sidebar.collapsible === 'none');
  const isVisible = $derived(sidebar.open || sidebar.isPeeking || isAlwaysExpanded);
  const railWidth = $derived(isAlwaysExpanded || sidebar.open ? 'var(--sidebar-width)' : sidebar.collapsible === 'icon' ? 'var(--sidebar-width-icon)' : '0px');
  const contentWidth = $derived(isVisible ? 'var(--sidebar-width)' : sidebar.collapsible === 'icon' ? 'var(--sidebar-width-icon)' : '0px');
</script>

{#if sidebar.isMobile && sidebar.open}
  <button
    type="button"
    aria-label="Close sidebar"
    class="fixed inset-0 z-40 bg-black/40 md:hidden"
    data-sidebar="mobile-backdrop"
    data-kumo-component="Sidebar"
    data-kumo-part="mobile-backdrop"
    onclick={() => sidebar.setOpen(false)}
  ></button>
{/if}

<aside
  data-state={sidebar.state}
  data-side={sidebar.side}
  data-variant={sidebar.variant}
  data-collapsible={sidebar.collapsible}
  data-mobile={sidebar.isMobile ? '' : undefined}
  data-sidebar="sidebar"
  style:width={railWidth}
  class={cn(
    'group/sidebar relative h-full shrink-0 grow-0 overflow-visible transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none',
    sidebar.isMobile && 'fixed inset-y-0 z-50 w-0 md:relative md:z-auto',
    sidebar.isMobile && sidebar.side === 'left' && 'left-0',
    sidebar.isMobile && sidebar.side === 'right' && 'right-0',
    sidebar.variant === 'floating' && 'm-2 rounded-lg shadow-lg',
    className
  )}
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
      !sidebar.open && sidebar.side === 'right' && 'right-0',
      sidebar.isMobile && 'fixed inset-y-0 max-w-[85vw] shadow-xl md:static md:max-w-none md:shadow-none',
      sidebar.isMobile && !sidebar.open && 'hidden md:flex',
      sidebar.isMobile && sidebar.side === 'left' && 'left-0',
      sidebar.isMobile && sidebar.side === 'right' && 'right-0'
    )}
  >
    {@render children?.()}
  </div>
</aside>
