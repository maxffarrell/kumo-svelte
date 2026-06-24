<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { Snippet } from 'svelte';
  import { Portal } from 'bits-ui';
  import { cn } from '$lib/utils/cn';
  import KumoToastContent from './KumoToastContent.svelte';
  import {
    createKumoToastManager,
    setKumoToastManager,
    toastRootClass,
    type KumoToastManager,
    type KumoToastVariant
  } from './manager.svelte';

  export const KUMO_TOAST_VARIANTS = {
    close: {
      classes: 'absolute top-2 right-2 size-5 rounded text-kumo-subtle hover:bg-current/15',
      description: 'Button-based close control with variant-aware hover tint'
    },
    variant: {
      default: {
        classes: 'border-kumo-fill bg-kumo-base',
        description: 'Default toast style'
      },
      success: {
        classes:
          'ring-[0.3px] ring-kumo-success bg-kumo-base [&_[data-toast-icon]]:text-kumo-success [&_[data-toast-title]]:text-kumo-success',
        description: 'Success toast for confirmations and positive outcomes'
      },
      error: {
        classes:
          'ring-[0.3px] ring-kumo-danger bg-kumo-base [&_[data-toast-icon]]:text-kumo-danger [&_[data-toast-title]]:text-kumo-danger',
        description: 'Error toast for critical issues'
      },
      warning: {
        classes:
          'ring-[0.3px] ring-kumo-warning bg-kumo-base [&_[data-toast-icon]]:text-kumo-warning [&_[data-toast-title]]:text-kumo-warning',
        description: 'Warning toast for cautionary messages'
      },
      info: {
        classes:
          'ring-[0.3px] ring-kumo-info bg-kumo-control [&_[data-toast-icon]]:text-kumo-info [&_[data-toast-title]]:text-kumo-info',
        description: 'Info toast for neutral informational messages'
      }
    }
  } as const;

  export const KUMO_TOAST_DEFAULT_VARIANTS = {
    variant: 'default'
  } as const;

  export function toastVariants({
    variant = KUMO_TOAST_DEFAULT_VARIANTS.variant
  }: {
    variant?: KumoToastVariant;
  } = {}) {
    return cn(
      'rounded-xl ring ring-kumo-line bg-clip-padding p-4 shadow-lg',
      KUMO_TOAST_VARIANTS.variant[variant].classes
    );
  }

  interface Props {
    children?: Snippet<[KumoToastManager]>;
    class?: string;
    toastManager?: KumoToastManager;
    visibleToasts?: number;
    container?: HTMLElement | string;
    [key: string]: unknown;
  }

  const fallbackToastManager = createKumoToastManager();
  const {
    children,
    class: className,
    toastManager = fallbackToastManager,
    visibleToasts = 3,
    container
  }: Props = $props();

  let expanded = $state(false);
  let toastHeights = $state<Record<string, number>>({});
  let viewportNode = $state<HTMLDivElement>();

  const toastItems = $derived(toastManager.toasts);

  function setToastHeight(id: string, node: HTMLElement | undefined) {
    if (!node) return;
    const height = node.offsetHeight;
    if (height && toastHeights[id] !== height) {
      toastHeights = { ...toastHeights, [id]: height };
    }
  }

  function measureToast(node: HTMLElement, id: string) {
    setToastHeight(id, node);

    const resizeObserver = new ResizeObserver(() => setToastHeight(id, node));
    resizeObserver.observe(node);

    return {
      update(nextId: string) {
        setToastHeight(nextId, node);
      },
      destroy() {
        resizeObserver.disconnect();
      }
    };
  }

  function toastOffset(index: number) {
    return toastItems.slice(0, index).reduce((offset, toast) => {
      return offset + (toastHeights[toast.id] ?? toastHeights[toastItems[0]?.id] ?? 80);
    }, 0);
  }

  function toastHeight(id: string) {
    return toastHeights[id] ?? toastHeights[toastItems[0]?.id] ?? 80;
  }

  const frontmostHeight = $derived(toastItems[0] ? toastHeight(toastItems[0].id) : 80);
  const stackHeight = $derived(
    toastItems
      .slice(0, visibleToasts)
      .reduce((height, toast, index) => height + toastHeight(toast.id) + (index > 0 ? 12 : 0), 0)
  );

  const viewportStyle = $derived(
    [
      `--toast-frontmost-height:${frontmostHeight}px`,
      `--toast-stack-height:${stackHeight}px`
    ].join(';')
  );

  function toastStyle(id: string, index: number) {
    const height = toastHeights[id] ?? frontmostHeight;

    return [
      `--toast-index:${index}`,
      `--toast-height:${height}px`,
      `--toast-frontmost-height:${frontmostHeight}px`,
      `--toast-offset-y:${toastOffset(index)}px`,
      '--toast-swipe-movement-x:0px',
      '--toast-swipe-movement-y:0px'
    ].join(';');
  }

  function isInsideExpandedStack(event: Pick<PointerEvent, 'clientX' | 'clientY'>) {
    if (!viewportNode) return false;

    const rect = viewportNode.getBoundingClientRect();
    const top = rect.bottom - stackHeight;

    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= top &&
      event.clientY <= rect.bottom
    );
  }

  function stopTrackingPointer() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('pointermove', trackPointer);
  }

  function trackPointer(event: PointerEvent) {
    if (isInsideExpandedStack(event)) return;
    expanded = false;
    stopTrackingPointer();
  }

  function expandStack() {
    expanded = true;

    if (typeof window === 'undefined') return;
    window.removeEventListener('pointermove', trackPointer);
    window.addEventListener('pointermove', trackPointer);
  }

  function collapseStack(event: MouseEvent) {
    if (isInsideExpandedStack(event)) return;
    expanded = false;
    stopTrackingPointer();
  }

  onDestroy(stopTrackingPointer);

  setKumoToastManager(() => toastManager);
</script>

{@render children?.(toastManager)}

{#if toastItems.length}
  <Portal to={container}>
    <div
      bind:this={viewportNode}
      class={cn(
        'fixed top-auto right-4 bottom-4 z-[1000] mx-auto flex h-[var(--toast-frontmost-height,var(--toast-height,80px))] w-[calc(100%-2rem)] overflow-visible data-[expanded]:h-[var(--toast-stack-height)] sm:right-8 sm:bottom-8 sm:w-[340px]',
        className
      )}
      style={viewportStyle}
      aria-label="Notifications"
      aria-live="polite"
      aria-relevant="additions text"
      aria-atomic="false"
      role="status"
      data-expanded={expanded ? '' : undefined}
      onmouseenter={expandStack}
      onmouseleave={collapseStack}
    >
      {#each toastItems as toast, toastIndex (toast.id)}
        <div
          use:measureToast={toast.id}
          class={cn(
            'absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 h-[var(--height)] w-full origin-bottom select-none',
            toastRootClass(toast.variant),
            '[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
            '[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]',
            "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
            'data-[ending-style]:opacity-0 data-[expanded]:h-[var(--toast-height)] data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))] data-[limited]:opacity-0 data-[starting-style]:[transform:translateY(150%)]',
            'data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
            'data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
            'data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
            'data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
            '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]',
            toast.bump && 'animate-toast-bump'
          )}
          style={toastStyle(toast.id, toastIndex)}
          data-starting-style={toast.transitionStatus === 'starting' ? '' : undefined}
          data-ending-style={toast.transitionStatus === 'ending' ? '' : undefined}
          data-expanded={expanded ? '' : undefined}
          data-limited={toastIndex >= visibleToasts ? '' : undefined}
        >
          <KumoToastContent
            {toast}
            behind={!expanded && toastIndex > 0}
            {expanded}
            onClose={() => toastManager.remove(toast.id)}
          />
        </div>
      {/each}
    </div>
  </Portal>
{/if}
