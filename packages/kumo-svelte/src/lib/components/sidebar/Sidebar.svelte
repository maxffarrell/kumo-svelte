<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { TooltipProvider } from '$lib/components/tooltip';
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
  const contentClasses = $derived(
    cn(
      'flex h-full min-w-0 flex-col overflow-hidden whitespace-nowrap bg-(--sidebar-bg) text-kumo-default transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none',
      sidebar.variant === 'sidebar' && (sidebar.side === 'left' ? 'border-r border-kumo-line' : 'border-l border-kumo-line'),
      sidebar.variant === 'floating' && 'rounded-lg border border-kumo-line',
      sidebar.isResizing && 'transition-none!',
      !sidebar.open && (sidebar.contained ? 'absolute' : 'fixed'),
      !sidebar.open && 'inset-y-0 z-40',
      !sidebar.open && sidebar.side === 'left' && 'left-0',
      !sidebar.open && sidebar.side === 'right' && 'right-0',
      sidebar.open && 'relative',
      sidebar.isMobile && 'fixed inset-y-0 max-w-[85vw] shadow-xl md:static md:max-w-none md:shadow-none',
      sidebar.isMobile && !sidebar.open && 'hidden md:flex',
      sidebar.isMobile && sidebar.side === 'left' && 'left-0',
      sidebar.isMobile && sidebar.side === 'right' && 'right-0'
    )
  );
</script>

{#snippet sidebarContent()}
  <TooltipProvider>
    {@render children?.()}
  </TooltipProvider>
{/snippet}

{#if sidebar.isMobile}
  <DialogPrimitive.Root open={sidebar.openMobile} onOpenChange={(open) => sidebar.setOpenMobile(open)}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-sidebar-backdrop
        data-kumo-component="Sidebar"
        data-kumo-part="mobile-backdrop"
        class="fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <DialogPrimitive.Content
        data-sidebar-popup
        aria-label="Sidebar"
        class={cn(
          'fixed inset-y-0 z-50 flex w-(--sidebar-width) flex-col bg-kumo-base p-0 duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0',
          sidebar.side === 'left' && 'left-0 data-ending-style:-translate-x-full data-starting-style:-translate-x-full',
          sidebar.side === 'right' && 'right-0 data-ending-style:translate-x-full data-starting-style:translate-x-full'
        )}
        style="transition-property: transform, opacity; transition-timing-function: var(--default-transition-timing-function);"
      >
        <div
          data-state="expanded"
          data-side={sidebar.side}
          data-variant={sidebar.variant}
          data-collapsible={sidebar.collapsible}
          data-mobile="true"
          data-sidebar="sidebar"
          class={cn('group/sidebar flex h-full w-full flex-col bg-kumo-base text-kumo-default', className)}
          {...rest}
        >
          {@render sidebarContent()}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
{:else}
  <aside
    data-state={sidebar.state}
    data-side={sidebar.side}
    data-variant={sidebar.variant}
    data-collapsible={sidebar.collapsible}
    data-sidebar="sidebar"
    style:width={railWidth}
    class={cn(
      'group/sidebar relative h-full shrink-0 grow-0 overflow-visible transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) motion-reduce:transition-none',
      sidebar.variant === 'floating' && 'm-2 rounded-lg shadow-lg',
      className
    )}
    {...rest}
  >
    <div
      data-sidebar="content-container"
      role="presentation"
      style:width={contentWidth}
      class={contentClasses}
      onmouseenter={sidebar.startPeek}
      onmouseleave={sidebar.stopPeek}
      onfocus={sidebar.startPeek}
      onblur={sidebar.stopPeek}
    >
      {@render sidebarContent()}
    </div>
  </aside>
{/if}
