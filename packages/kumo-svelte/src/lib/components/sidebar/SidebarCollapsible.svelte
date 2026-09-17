<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getSidebarContext } from './context';
  interface Props {
    children?: Snippet;
    class?: string;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onOpenChangeComplete?: (open: boolean) => void;
    autoScrollOnOpen?: boolean;
    [key: string]: unknown;
  }
  let {
    children,
    class: className,
    defaultOpen = false,
    open = $bindable(defaultOpen),
    onOpenChange,
    onOpenChangeComplete,
    autoScrollOnOpen = false,
    ...rest
  }: Props = $props();
  const componentId = $props.id();
  const contentId = `kumo-sidebar-collapsible-${componentId}`;
  const sidebar = getSidebarContext('Sidebar.Collapsible');
  let previousOpen: boolean | undefined;
  let pendingOpen: boolean | undefined;
  let completionTimer: ReturnType<typeof setTimeout> | undefined;

  function completeOpenChange() {
    if (pendingOpen === undefined) return;
    const completedOpen = pendingOpen;
    pendingOpen = undefined;
    clearTimeout(completionTimer);
    onOpenChangeComplete?.(completedOpen);
  }

  $effect(() => {
    if (previousOpen === undefined) {
      previousOpen = open;
      return;
    }
    if (open === previousOpen) return;
    previousOpen = open;
    clearTimeout(completionTimer);
    if (!onOpenChangeComplete) {
      pendingOpen = undefined;
      return;
    }
    pendingOpen = open;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      completeOpenChange();
      return;
    }
    completionTimer = setTimeout(completeOpenChange, sidebar.animationDuration + 50);
    return () => clearTimeout(completionTimer);
  });
  const context = {
    get open() {
      return open;
    },
    get contentId() {
      return contentId;
    },
    get autoScrollOnOpen() {
      return autoScrollOnOpen;
    },
    completeOpenChange,
    toggle() {
      open = !open;
      onOpenChange?.(open);
    }
  };
  setContext('kumo-sidebar-collapsible', context);
</script>

<div data-sidebar="collapsible" data-open={open ? '' : undefined} class={cn('min-w-0', className)} {...rest}>
  {@render children?.()}
</div>
