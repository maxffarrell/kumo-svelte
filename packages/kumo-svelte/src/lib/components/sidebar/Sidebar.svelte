<script module lang="ts">
  import { getContext, onMount, setContext } from 'svelte';
  import type { Component, Snippet } from 'svelte';
  import { CaretRight } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';
  import {
    getSidebarContext,
    getSidebarMenuItemContext,
    getSidebarMenuSubItemContext,
    setSidebarContext,
    setSidebarMenuItemContext,
    setSidebarMenuSubItemContext,
    type SidebarCollapsible,
    type SidebarSide,
    type SidebarState,
    type SidebarVariant
  } from './context';

  export {
    SidebarProvider,
    SidebarRoot,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarSeparator,
    SidebarTrigger,
    SidebarRail,
    SidebarResizeHandle,
    SidebarMenuChevron,
    SidebarCollapsibleRoot,
    SidebarCollapsibleTrigger,
    SidebarCollapsibleContent,
    SidebarSlidingViews,
    SidebarSlidingView
  };

  export const KUMO_SIDEBAR_VARIANTS = {
    variant: {
      sidebar: { classes: '', description: 'Standard sidebar with border separator' },
      floating: { classes: '', description: 'Floating sidebar with shadow and rounded corners' },
      inset: { classes: '', description: 'Inset sidebar within the content area' }
    },
    collapsible: {
      icon: { classes: '', description: 'Collapses to show icons only' },
      offcanvas: { classes: '', description: 'Slides off screen when collapsed' },
      none: { classes: '', description: 'Cannot be collapsed' }
    },
    side: {
      left: { classes: '', description: 'Left-aligned sidebar' },
      right: { classes: '', description: 'Right-aligned sidebar' }
    }
  } as const;

  export const KUMO_SIDEBAR_DEFAULT_VARIANTS = {
    variant: 'sidebar',
    collapsible: 'icon',
    side: 'left'
  } as const;

  export const KUMO_SIDEBAR_STYLING = {
    width: { expanded: '16.25rem', icon: '57px' },
    mobile: { breakpoint: 768 }
  } as const;

  export type KumoSidebarPart =
    | 'root'
    | 'provider'
    | 'header'
    | 'content'
    | 'footer'
    | 'group'
    | 'group-label'
    | 'menu'
    | 'menu-item'
    | 'menu-button'
    | 'menu-badge'
    | 'menu-sub'
    | 'menu-sub-item'
    | 'menu-sub-button'
    | 'separator'
    | 'trigger'
    | 'rail'
    | 'resize-handle'
    | 'menu-chevron'
    | 'collapsible'
    | 'collapsible-trigger'
    | 'collapsible-content'
    | 'sliding-views'
    | 'sliding-view';

  export interface BaseProps {
    __part?: KumoSidebarPart;
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  interface SidebarProviderProps extends BaseProps {
    children: Snippet;
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

  interface SidebarMenuButtonProps extends BaseProps {
    icon?: Component;
    active?: boolean;
    size?: 'base' | 'sm';
    href?: string;
    tooltip?: string;
  }

  interface SidebarMenuSubButtonProps extends BaseProps {
    active?: boolean;
    href?: string;
  }

  interface SidebarCollapsibleProps extends BaseProps {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }

  interface CollapsibleContext {
    get open(): boolean;
    get contentId(): string;
    toggle(): void;
  }

  interface SlidingContext {
    get activeKey(): string;
    get direction(): 'left' | 'right';
  }

  let sidebarCollapsibleId = 0;

  function createSidebarProviderState({
    defaultOpen,
    open: openProp,
    onOpenChange,
    resizable,
    defaultWidth,
    minWidth,
    maxWidth,
    onWidthChange,
    peekable
  }: Pick<SidebarProviderProps, 'defaultOpen' | 'open' | 'onOpenChange' | 'resizable' | 'defaultWidth' | 'minWidth' | 'maxWidth' | 'onWidthChange' | 'peekable'>) {
    const clampWidth = (nextWidth: number) => Math.min(maxWidth ?? 480, Math.max(minWidth ?? 200, nextWidth));
    let width = $state(clampWidth(defaultWidth ?? 256));
    let open = $state(defaultOpen ?? true);
    let isPeeking = $state(false);
    let isMobile = $state(false);
    let openMobile = $state(false);
    let isResizing = $state(false);
    const controlledOpen = $derived(openProp ?? open);
    const visibleOpen = $derived(isMobile ? openMobile : controlledOpen);
    const sidebarState: SidebarState = $derived(isPeeking ? 'peeking' : visibleOpen ? 'expanded' : 'collapsed');
    const sidebarWidth = $derived(resizable ? `${width}px` : KUMO_SIDEBAR_STYLING.width.expanded);

    const setOpen = (nextOpen: boolean) => {
      if (isMobile) openMobile = nextOpen;
      else open = nextOpen;
      if (nextOpen) isPeeking = false;
      onOpenChange?.(nextOpen);
    };

    const setOpenMobile = (nextOpen: boolean) => {
      openMobile = nextOpen;
      if (nextOpen) isPeeking = false;
    };

    const setWidth = (nextWidth: number) => {
      width = clampWidth(nextWidth);
      onWidthChange?.(width);
    };

    const toggleSidebar = () => setOpen(!visibleOpen);
    const startPeek = () => {
      if (peekable && !controlledOpen && !isMobile) isPeeking = true;
    };
    const stopPeek = () => {
      isPeeking = false;
    };

    onMount(() => {
      const media = window.matchMedia(`(max-width: ${KUMO_SIDEBAR_STYLING.mobile.breakpoint - 1}px)`);
      const update = () => {
        isMobile = media.matches;
        if (!media.matches) openMobile = false;
      };
      update();
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    });

    return {
      get width() {
        return width;
      },
      get isMobile() {
        return isMobile;
      },
      get openMobile() {
        return openMobile;
      },
      get isResizing() {
        return isResizing;
      },
      setIsResizing(nextIsResizing: boolean) {
        isResizing = nextIsResizing;
      },
      get visibleOpen() {
        return visibleOpen;
      },
      get sidebarState() {
        return sidebarState;
      },
      get sidebarWidth() {
        return sidebarWidth;
      },
      setOpen,
      setOpenMobile,
      setWidth,
      toggleSidebar,
      startPeek,
      stopPeek
    };
  }

  function createSidebarResizeHandleState(sidebar: ReturnType<typeof getSidebarContext>) {
    let startX = $state(0);
    let startWidth = $state(0);

    const onPointerDown = (event: PointerEvent) => {
      if (!sidebar.resizable) return;
      event.preventDefault();
      sidebar.setIsResizing(true);
      startX = event.clientX;
      startWidth = sidebar.open ? sidebar.width : sidebar.minWidth;

      const onMove = (moveEvent: PointerEvent) => {
        const delta = sidebar.side === 'left' ? moveEvent.clientX - startX : startX - moveEvent.clientX;
        const nextWidth = startWidth + delta;
        if (nextWidth < sidebar.minWidth) {
          sidebar.setOpen(false);
          return;
        }
        sidebar.setOpen(true);
        sidebar.setWidth(nextWidth);
      };
      const onUp = () => {
        sidebar.setIsResizing(false);
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onUp);
      };
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const grow = sidebar.side === 'left' ? 'ArrowRight' : 'ArrowLeft';
      const shrink = sidebar.side === 'left' ? 'ArrowLeft' : 'ArrowRight';
      if (event.key === grow) {
        event.preventDefault();
        sidebar.setOpen(true);
        sidebar.setWidth(sidebar.open ? sidebar.width + 10 : sidebar.minWidth);
      } else if (event.key === shrink) {
        event.preventDefault();
        const next = sidebar.width - 10;
        if (next < sidebar.minWidth) sidebar.setOpen(false);
        else sidebar.setWidth(next);
      } else if (event.key === 'Home') {
        event.preventDefault();
        sidebar.setOpen(false);
      } else if (event.key === 'End') {
        event.preventDefault();
        sidebar.setOpen(true);
        sidebar.setWidth(sidebar.maxWidth);
      }
    };

    return { onPointerDown, onKeyDown };
  }

  function createSidebarCollapsibleState({ defaultOpen, open: openProp, onOpenChange, ...rest }: SidebarCollapsibleProps) {
    let open = $state(defaultOpen ?? false);
    const controlledOpen = $derived(openProp ?? open);
    const contentId = typeof rest.id === 'string' ? rest.id : `kumo-sidebar-collapsible-${++sidebarCollapsibleId}`;

    const context = setContext<CollapsibleContext>('kumo-sidebar-collapsible', {
      get open() {
        return controlledOpen;
      },
      get contentId() {
        return contentId;
      },
      toggle() {
        const nextOpen = !controlledOpen;
        open = nextOpen;
        onOpenChange?.(nextOpen);
      }
    });

    return {
      context,
      get controlledOpen() {
        return controlledOpen;
      }
    };
  }

  function getSidebarRailWidth(sidebar: ReturnType<typeof getSidebarContext>) {
    return sidebar.collapsible === 'none' || sidebar.open ? 'var(--sidebar-width)' : sidebar.collapsible === 'icon' ? 'var(--sidebar-width-icon)' : '0px';
  }

  function getSidebarContentWidth(sidebar: ReturnType<typeof getSidebarContext>) {
    const isVisible = sidebar.open || sidebar.isPeeking || sidebar.collapsible === 'none';
    return isVisible ? 'var(--sidebar-width)' : sidebar.collapsible === 'icon' ? 'var(--sidebar-width-icon)' : '0px';
  }

  function getSidebarMenuButtonClasses(size: SidebarMenuButtonProps['size'], active: boolean, className: string | undefined) {
    return cn(
      'group/menu-button relative flex w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg text-kumo-default outline-none transition-[color,background-color,box-shadow,outline] duration-(--sidebar-animation-duration)',
      size === 'base' && 'min-h-8.5 px-3 py-0 text-sm font-medium',
      size === 'sm' && 'min-h-7 px-2 py-0 text-sm',
      !active && 'hover:bg-kumo-tint',
      active && 'bg-kumo-tint',
      'focus:outline-none focus-visible:bg-kumo-tint focus-visible:text-kumo-strong',
      className
    );
  }

  function getSidebarMenuSubButtonClasses(active: boolean, className: string | undefined) {
    return cn('relative flex min-h-8.5 w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-0 text-sm font-medium text-kumo-default outline-none transition-colors duration-150 hover:bg-kumo-tint focus:outline-none focus-visible:bg-kumo-tint focus-visible:text-kumo-strong', active && 'bg-kumo-tint', className);
  }
</script>

<script lang="ts">
  let { __part = 'root', ...rootProps }: BaseProps = $props();
  const partProps = $derived(rootProps as never);
</script>

{#snippet SidebarProvider({
  children,
  class: className,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  variant = KUMO_SIDEBAR_DEFAULT_VARIANTS.variant,
  side = KUMO_SIDEBAR_DEFAULT_VARIANTS.side,
  collapsible = KUMO_SIDEBAR_DEFAULT_VARIANTS.collapsible,
  resizable = false,
  defaultWidth = 256,
  minWidth = 200,
  maxWidth = 480,
  onWidthChange,
  contained = false,
  peekable = false,
  animationDuration = 250,
  ...rest
}: SidebarProviderProps, state = createSidebarProviderState({ defaultOpen, open: openProp, onOpenChange, resizable, defaultWidth, minWidth, maxWidth, onWidthChange, peekable }), context = setSidebarContext({
    get state() {
      return state.sidebarState;
    },
    get open() {
      return state.visibleOpen;
    },
    setOpen: state.setOpen,
    get isMobile() {
      return state.isMobile;
    },
    get openMobile() {
      return state.openMobile;
    },
    setOpenMobile: state.setOpenMobile,
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
      return state.width;
    },
    get resizable() {
      return resizable;
    },
    get isResizing() {
      return state.isResizing;
    },
    setIsResizing: state.setIsResizing,
    get minWidth() {
      return minWidth;
    },
    get maxWidth() {
      return maxWidth;
    },
    setWidth: state.setWidth,
    get peekable() {
      return peekable;
    },
    get isPeeking() {
      return state.sidebarState === 'peeking';
    },
    startPeek: state.startPeek,
    stopPeek: state.stopPeek,
    toggleSidebar: state.toggleSidebar
  }))}
  <div
    data-sidebar-wrapper
    data-state={state.sidebarState}
    data-side={side}
    data-mobile={state.isMobile ? '' : undefined}
    data-resizing={state.isResizing ? '' : undefined}
    data-contained={contained ? '' : undefined}
    style:--sidebar-width={state.sidebarWidth}
    style:--sidebar-width-icon={KUMO_SIDEBAR_STYLING.width.icon}
    style:--sidebar-animation-duration={`${animationDuration}ms`}
    style:--sidebar-easing="cubic-bezier(0.77, 0, 0.175, 1)"
    style:--sidebar-bg="var(--color-kumo-base)"
    class={cn('group/sidebar-wrapper isolate flex w-full', !contained && 'min-h-svh', variant === 'inset' && 'bg-kumo-recessed', state.isResizing && 'select-none', className)}
    {...rest}
  >
    {@render children()}
  </div>
{/snippet}

{#snippet SidebarRoot({ children, class: className, ...rest }: BaseProps, sidebar = getSidebarContext('Sidebar'))}
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
    style:width={getSidebarRailWidth(sidebar)}
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
      style:width={getSidebarContentWidth(sidebar)}
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
{/snippet}

{#snippet SidebarHeader({ children, class: className, ...rest }: BaseProps)}
  <div data-sidebar="header" class={cn('flex h-[58px] items-center gap-1 overflow-hidden border-b border-kumo-line px-3.5', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet SidebarContent({ children, class: className, ...rest }: BaseProps, sidebar = getSidebarContext('Sidebar.Content'))}
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
{/snippet}

{#snippet SidebarFooter({ children, class: className, ...rest }: BaseProps)}
  <div data-sidebar="footer" class={cn('sticky bottom-0 flex h-12 shrink-0 items-center gap-4 overflow-hidden whitespace-nowrap border-t border-kumo-line bg-(--sidebar-bg) px-4', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet SidebarGroup({ children, class: className, ...rest }: BaseProps)}
  <div data-sidebar="group" class={cn('flex min-w-0 flex-col gap-y-px', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet SidebarGroupLabel({ children, class: className, ...rest }: BaseProps)}
  <div data-sidebar="group-label" class={cn('truncate px-3 pt-4 pb-2 text-sm font-medium text-kumo-subtle group-data-[state=collapsed]/sidebar:my-3 group-data-[state=collapsed]/sidebar:border-b group-data-[state=collapsed]/sidebar:border-kumo-line group-data-[state=collapsed]/sidebar:p-0 group-data-[state=collapsed]/sidebar:text-transparent', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet SidebarMenu({ children, class: className, ...rest }: BaseProps)}
  <ul data-sidebar="menu" class={cn('m-0 flex min-w-0 list-none flex-col items-stretch gap-y-px p-0', className)} {...rest}>
    {@render children?.()}
  </ul>
{/snippet}

{#snippet SidebarMenuItem({ children, class: className, ...rest }: BaseProps, context = setSidebarMenuItemContext({
    get insideMenuItem() {
      return true;
    }
  }))}
  <li data-sidebar="menu-item" class={cn('relative group-data-[state=collapsed]/sidebar:overflow-hidden', className)} {...rest}>
    {@render children?.()}
  </li>
{/snippet}

{#snippet SidebarMenuButton({ children, class: className, icon: Icon, active = false, size = 'base', href, tooltip, ...rest }: SidebarMenuButtonProps, menuItem = getSidebarMenuItemContext())}
  {#snippet control()}
    {#if href}
      <a
        class={cn(getSidebarMenuButtonClasses(size, active, className), 'no-underline!')}
        {href}
        title={tooltip}
        data-active={active || undefined}
        data-sidebar="menu-button"
        data-kumo-component="Sidebar"
        data-kumo-part="menu-button-link"
        data-size={size}
        aria-label={tooltip}
        {...rest}
      >
        <span class="flex min-w-0 flex-1 items-center gap-3">
          {#if Icon}<Icon class={cn('shrink-0 opacity-50', size === 'base' ? 'size-4' : 'size-3.5')} />{/if}
          <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">{@render children?.()}</span>
        </span>
      </a>
    {:else}
      <button
        type="button"
        class={getSidebarMenuButtonClasses(size, active, className)}
        title={tooltip}
        data-active={active || undefined}
        data-sidebar="menu-button"
        data-kumo-component="Sidebar"
        data-kumo-part="menu-button"
        data-size={size}
        aria-label={tooltip}
        {...rest}
      >
        <span class="flex min-w-0 flex-1 items-center gap-3">
          {#if Icon}<Icon class={cn('shrink-0 opacity-50', size === 'base' ? 'size-4' : 'size-3.5')} />{/if}
          <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">{@render children?.()}</span>
        </span>
      </button>
    {/if}
  {/snippet}

  {#if menuItem?.insideMenuItem}
    {@render control()}
  {:else}
    <li data-sidebar="menu-item" class="relative group-data-[state=collapsed]/sidebar:overflow-hidden">
      {@render control()}
    </li>
  {/if}
{/snippet}

{#snippet SidebarMenuBadge({ children, class: className, ...rest }: BaseProps)}
  <span data-sidebar="menu-badge" class={cn('inline-flex shrink-0 select-none items-center rounded-full border border-dashed border-kumo-line px-1.5 py-0.5 text-[11px]/none font-medium text-kumo-strong group-data-[state=collapsed]/sidebar:hidden', className)} {...rest}>
    {@render children?.()}
  </span>
{/snippet}

{#snippet SidebarMenuSub({ children, class: className, ...rest }: BaseProps)}
  <ul data-sidebar="menu-sub" class={cn('relative m-0 flex min-w-0 list-none flex-col gap-y-px overflow-hidden p-0 pl-7 pr-0 group-data-[state=collapsed]/sidebar:hidden', className)} {...rest}>
    <li aria-hidden="true" role="presentation" class="absolute inset-y-px left-[19px] z-10 w-px bg-kumo-line"></li>
    {@render children?.()}
  </ul>
{/snippet}

{#snippet SidebarMenuSubItem({ children, class: className, ...rest }: BaseProps, context = setSidebarMenuSubItemContext({
    get insideMenuSubItem() {
      return true;
    }
  }))}
  <li data-sidebar="menu-sub-item" class={cn('relative', className)} {...rest}>
    {@render children?.()}
  </li>
{/snippet}

{#snippet SidebarMenuSubButton({ children, class: className, active = false, href, ...rest }: SidebarMenuSubButtonProps, menuSubItem = getSidebarMenuSubItemContext())}
  {#snippet control()}
    {#if href}
      <a class={cn(getSidebarMenuSubButtonClasses(active, className), 'no-underline!')} {href} data-active={active || undefined} data-sidebar="menu-sub-button" data-kumo-component="Sidebar" data-kumo-part="menu-sub-button-link" {...rest}>
        <span class="flex min-w-0 flex-1 items-center gap-2 truncate text-left">{@render children?.()}</span>
      </a>
    {:else}
      <button type="button" class={getSidebarMenuSubButtonClasses(active, className)} data-active={active || undefined} data-sidebar="menu-sub-button" data-kumo-component="Sidebar" data-kumo-part="menu-sub-button" {...rest}>
        <span class="flex min-w-0 flex-1 items-center gap-2 truncate text-left">{@render children?.()}</span>
      </button>
    {/if}
  {/snippet}

  {#if menuSubItem?.insideMenuSubItem}
    {@render control()}
  {:else}
    <li data-sidebar="menu-sub-item" class="relative">
      {@render control()}
    </li>
  {/if}
{/snippet}

{#snippet SidebarSeparator({ children, class: className, ...rest }: BaseProps)}
  <div data-sidebar="separator" class={cn('my-3 px-2', className)} {...rest}>
    <div class="border-b border-kumo-line"></div>
    {@render children?.()}
  </div>
{/snippet}

{#snippet SidebarTrigger({ children, class: className, onclick, ...rest }: BaseProps & { onclick?: (event: MouseEvent) => void }, sidebar = getSidebarContext('Sidebar.Trigger'))}
  <button
    type="button"
    data-sidebar="trigger"
    data-kumo-component="Sidebar"
    data-kumo-part="trigger"
    aria-expanded={sidebar.open}
    aria-label={sidebar.open ? 'Collapse sidebar' : 'Expand sidebar'}
    class={cn('flex size-8.5 cursor-pointer items-center justify-center rounded-lg text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand', className)}
    onclick={(event) => {
      onclick?.(event);
      sidebar.toggleSidebar();
    }}
    {...rest}
  >
    {#if children}
      {@render children()}
    {:else}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="shrink-0">
        <path d="M21.25 6.72v10.56a2.97 2.97 0 0 1-2.97 2.97H5.72a2.97 2.97 0 0 1-2.97-2.97V6.72a2.97 2.97 0 0 1 2.97-2.97h12.56a2.97 2.97 0 0 1 2.97 2.97" />
        <path d="M6.25 7.25v9.5" class={cn('transition-transform duration-(--sidebar-animation-duration) ease-(--sidebar-easing)', sidebar.open ? 'translate-x-px' : 'translate-x-[10.5px]')} />
      </svg>
    {/if}
  </button>
{/snippet}

{#snippet SidebarRail({ class: className, ...rest }: BaseProps, sidebar = getSidebarContext('Sidebar.Rail'))}
  <button
    type="button"
    data-sidebar="rail"
    data-kumo-component="Sidebar"
    data-kumo-part="rail"
    aria-label="Toggle sidebar"
    tabindex="-1"
    class={cn('absolute inset-y-0 z-1 hidden w-4 -translate-x-1/2 cursor-pointer transition-all after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-kumo-brand/20 sm:flex', sidebar.side === 'left' ? 'right-0' : 'left-0', className)}
    onclick={sidebar.toggleSidebar}
    {...rest}
  ></button>
{/snippet}

{#snippet SidebarResizeHandle({ class: className, ...rest }: BaseProps, sidebar = getSidebarContext('Sidebar.ResizeHandle'), state = createSidebarResizeHandleState(sidebar))}
  {#if sidebar.resizable}
    <button
      type="button"
      aria-label="Resize sidebar"
      data-sidebar="resize-handle"
      class={cn('absolute inset-y-0 z-2 hidden w-3 cursor-col-resize after:absolute after:inset-y-0 after:w-0.5 after:bg-transparent hover:after:bg-kumo-hairline focus:outline-none focus-visible:after:bg-kumo-hairline sm:block', sidebar.side === 'left' ? 'right-0 after:right-0' : 'left-0 after:left-0', className)}
      onpointerdown={state.onPointerDown}
      onkeydown={state.onKeyDown}
      {...rest}
    ></button>
  {/if}
{/snippet}

{#snippet SidebarCollapsibleRoot({ children, class: className, defaultOpen = false, open: openProp, onOpenChange, ...rest }: SidebarCollapsibleProps, state = createSidebarCollapsibleState({ children, class: className, defaultOpen, open: openProp, onOpenChange, ...rest }))}
  <div data-sidebar="collapsible" data-open={state.controlledOpen ? '' : undefined} class={cn('min-w-0', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet SidebarCollapsibleTrigger({ children, class: className, ...rest }: BaseProps, collapsible = getContext<CollapsibleContext>('kumo-sidebar-collapsible'))}
  <button
    type="button"
    class={cn('contents', className)}
    aria-expanded={collapsible?.open}
    aria-controls={collapsible?.contentId}
    onclick={() => collapsible?.toggle()}
    {...rest}
  >
    {@render children?.()}
  </button>
{/snippet}

{#snippet SidebarCollapsibleContent({ children, class: className, ...rest }: BaseProps, collapsible = getContext<CollapsibleContext>('kumo-sidebar-collapsible'))}
  <div
    id={collapsible?.contentId}
    data-sidebar="collapsible-content"
    data-open={collapsible?.open ? '' : undefined}
    role="region"
    aria-hidden={collapsible?.open ? undefined : 'true'}
    inert={collapsible?.open ? undefined : true}
    class={cn(
      'grid overflow-hidden transition-[grid-template-rows,opacity] duration-(--sidebar-animation-duration) motion-reduce:transition-none',
      collapsible?.open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      className
    )}
    {...rest}
  >
    <div class="min-h-0 overflow-hidden">
      {@render children?.()}
    </div>
  </div>
{/snippet}

{#snippet SidebarMenuChevron({ class: className, open = false, ...rest }: BaseProps & { open?: boolean })}
  <CaretRight data-sidebar="menu-chevron" class={cn('ml-auto size-4 shrink-0 text-kumo-subtle transition-transform duration-200 group-data-[state=collapsed]/sidebar:hidden', open && 'rotate-90', className)} {...rest} />
{/snippet}

{#snippet SidebarSlidingViews({ children, class: className, activeKey, direction = 'left', ...rest }: BaseProps & { activeKey: string; direction?: 'left' | 'right' }, context = setContext<SlidingContext>('kumo-sidebar-sliding-view', {
    get activeKey() {
      return activeKey;
    },
    get direction() {
      return direction;
    }
  }))}
  <div data-sidebar="sliding-views" data-direction={direction} class={cn('relative min-h-0 flex-1 overflow-hidden', className)} {...rest}>
    {@render children?.()}
  </div>
{/snippet}

{#snippet SidebarSlidingView({ children, class: className, value, ...rest }: BaseProps & { value: string }, sliding = getContext<SlidingContext>('kumo-sidebar-sliding-view'))}
  <div
    data-sidebar="sliding-view"
    data-active={sliding?.activeKey === value ? '' : undefined}
    aria-hidden={sliding?.activeKey === value ? undefined : 'true'}
    inert={sliding?.activeKey === value ? undefined : true}
    class={cn(
      'absolute inset-0 min-h-0 transition-transform duration-(--sidebar-animation-duration) motion-reduce:transition-none',
      sliding?.activeKey === value && 'relative translate-x-0',
      sliding?.activeKey !== value && sliding?.direction === 'right' && '-translate-x-full',
      sliding?.activeKey !== value && sliding?.direction !== 'right' && 'translate-x-full',
      className
    )}
    {...rest}
  >
    {@render children?.()}
  </div>
{/snippet}

{#if __part === 'provider'}
  {@render SidebarProvider(partProps)}
{:else if __part === 'header'}
  {@render SidebarHeader(partProps)}
{:else if __part === 'content'}
  {@render SidebarContent(partProps)}
{:else if __part === 'footer'}
  {@render SidebarFooter(partProps)}
{:else if __part === 'group'}
  {@render SidebarGroup(partProps)}
{:else if __part === 'group-label'}
  {@render SidebarGroupLabel(partProps)}
{:else if __part === 'menu'}
  {@render SidebarMenu(partProps)}
{:else if __part === 'menu-item'}
  {@render SidebarMenuItem(partProps)}
{:else if __part === 'menu-button'}
  {@render SidebarMenuButton(partProps)}
{:else if __part === 'menu-badge'}
  {@render SidebarMenuBadge(partProps)}
{:else if __part === 'menu-sub'}
  {@render SidebarMenuSub(partProps)}
{:else if __part === 'menu-sub-item'}
  {@render SidebarMenuSubItem(partProps)}
{:else if __part === 'menu-sub-button'}
  {@render SidebarMenuSubButton(partProps)}
{:else if __part === 'separator'}
  {@render SidebarSeparator(partProps)}
{:else if __part === 'trigger'}
  {@render SidebarTrigger(partProps)}
{:else if __part === 'rail'}
  {@render SidebarRail(partProps)}
{:else if __part === 'resize-handle'}
  {@render SidebarResizeHandle(partProps)}
{:else if __part === 'menu-chevron'}
  {@render SidebarMenuChevron(partProps)}
{:else if __part === 'collapsible'}
  {@render SidebarCollapsibleRoot(partProps)}
{:else if __part === 'collapsible-trigger'}
  {@render SidebarCollapsibleTrigger(partProps)}
{:else if __part === 'collapsible-content'}
  {@render SidebarCollapsibleContent(partProps)}
{:else if __part === 'sliding-views'}
  {@render SidebarSlidingViews(partProps)}
{:else if __part === 'sliding-view'}
  {@render SidebarSlidingView(partProps)}
{:else}
  {@render SidebarRoot(partProps)}
{/if}
