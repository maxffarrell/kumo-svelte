<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import {
    setSidebarContext,
    type SidebarCollapsible,
    type SidebarSide,
    type SidebarState,
    type SidebarVariant
  } from './context';

  interface Props {
    children: Snippet;
    class?: string;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    variant?: SidebarVariant;
    side?: SidebarSide;
    collapsible?: SidebarCollapsible;
    resizable?: boolean;
    defaultWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    onWidthChange?: (width: number) => void;
    contained?: boolean;
    peekable?: boolean;
    animationDuration?: number;
  }

  let {
    children,
    class: className,
    defaultOpen = true,
    open = $bindable(defaultOpen),
    onOpenChange,
    variant = 'sidebar',
    side = 'left',
    collapsible = 'icon',
    resizable = false,
    defaultWidth = 256,
    minWidth = 200,
    maxWidth = 480,
    onWidthChange,
    contained = false,
    peekable = false,
    animationDuration = 250
  }: Props = $props();

  let width: number = $state(256);
  let isPeeking: boolean = $state(false);
  let isMobile: boolean = $state(false);
  let openMobile: boolean = $state(false);
  let isResizing: boolean = $state(false);

  const visibleOpen = $derived(isMobile ? openMobile : open);
  const sidebarState: SidebarState = $derived(isPeeking ? 'peeking' : visibleOpen ? 'expanded' : 'collapsed');
  const sidebarWidth = $derived(resizable ? `${width}px` : '16.25rem');

  onMount(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => {
      isMobile = media.matches;
      if (!media.matches) openMobile = false;
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  });

  $effect(() => {
    width = Math.min(maxWidth, Math.max(minWidth, defaultWidth));
  });

  function setOpen(nextOpen: boolean) {
    if (isMobile) openMobile = nextOpen;
    else open = nextOpen;
    if (nextOpen) isPeeking = false;
    onOpenChange?.(nextOpen);
  }

  function setOpenMobile(nextOpen: boolean) {
    openMobile = nextOpen;
    if (nextOpen) isPeeking = false;
  }

  function setWidth(nextWidth: number) {
    width = Math.min(maxWidth, Math.max(minWidth, nextWidth));
    onWidthChange?.(width);
  }

  function toggleSidebar() {
    setOpen(!visibleOpen);
  }

  function startPeek() {
    if (peekable && !open) isPeeking = true;
  }

  function stopPeek() {
    isPeeking = false;
  }

  setSidebarContext({
    get state() {
      return sidebarState;
    },
    get open() {
      return visibleOpen;
    },
    setOpen,
    get isMobile() {
      return isMobile;
    },
    get openMobile() {
      return openMobile;
    },
    setOpenMobile,
    get side() {
      return side;
    },
    get variant() {
      return variant;
    },
    get collapsible() {
      return collapsible;
    },
    get contained() {
      return contained;
    },
    get animationDuration() {
      return animationDuration;
    },
    get width() {
      return width;
    },
    get resizable() {
      return resizable;
    },
    get isResizing() {
      return isResizing;
    },
    setIsResizing(nextIsResizing: boolean) {
      isResizing = nextIsResizing;
    },
    get minWidth() {
      return minWidth;
    },
    get maxWidth() {
      return maxWidth;
    },
    setWidth,
    get peekable() {
      return peekable;
    },
    get isPeeking() {
      return isPeeking;
    },
    startPeek,
    stopPeek,
    toggleSidebar
  });
</script>

<div
  data-sidebar-wrapper
  data-state={sidebarState}
  data-side={side}
  data-mobile={isMobile ? '' : undefined}
  data-resizing={isResizing ? '' : undefined}
  data-contained={contained ? '' : undefined}
  style:--sidebar-width={sidebarWidth}
  style:--sidebar-width-icon="57px"
  style:--sidebar-animation-duration={`${animationDuration}ms`}
  style:--sidebar-easing="cubic-bezier(0.77, 0, 0.175, 1)"
  style:--sidebar-bg="var(--color-kumo-base)"
  class={cn(
    'group/sidebar-wrapper isolate flex w-full',
    !contained && 'min-h-svh',
    variant === 'inset' && 'bg-kumo-recessed',
    isResizing && 'select-none',
    className
  )}
>
  {@render children()}
</div>
