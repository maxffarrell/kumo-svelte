<script lang="ts">
  import { onMount, tick, type Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';
  import {
    getNodeGroupContext,
    setFlowAnchorContext,
    type FlowNodeData,
    type RectLike
  } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    id?: string;
    disabled?: boolean;
    bare?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, id, disabled = false, bare = false, ...rest }: Props = $props();

  const group = getNodeGroupContext<FlowNodeData>();
  const descendantsStore = group.descendants;
  const epochStore = group.epoch;
  let generatedId = $state('');
  const nodeId = $derived(id ?? generatedId);
  const descendants = $derived($descendantsStore);
  const index = $derived(descendants.findIndex((node) => node.id === nodeId));

  let nodeElement: HTMLElement;
  let startAnchorElement: HTMLElement | null = null;
  let endAnchorElement: HTMLElement | null = null;
  let startRect = $state<RectLike | null>(null);
  let endRect = $state<RectLike | null>(null);

  function rectsEqual(a: RectLike | null, b: RectLike | null) {
    if (a === b) return true;
    if (!a || !b) return false;
    return (
      a.top === b.top &&
      a.left === b.left &&
      a.right === b.right &&
      a.bottom === b.bottom &&
      a.width === b.width &&
      a.height === b.height
    );
  }

  function toRectLike(rect: DOMRect): RectLike {
    return {
      x: rect.x,
      y: rect.y,
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height
    };
  }

  function remeasure() {
    if (!nodeElement) return;

    const nodeRect = toRectLike(nodeElement.getBoundingClientRect());
    const nextStartRect = startAnchorElement
      ? toRectLike(startAnchorElement.getBoundingClientRect())
      : nodeRect;
    const nextEndRect = endAnchorElement ? toRectLike(endAnchorElement.getBoundingClientRect()) : nodeRect;

    if (!rectsEqual(startRect, nextStartRect)) startRect = nextStartRect;
    if (!rectsEqual(endRect, nextEndRect)) endRect = nextEndRect;
  }

  setFlowAnchorContext({
    registerStartAnchor(node) {
      startAnchorElement = node;
      tick().then(remeasure);
    },
    registerEndAnchor(node) {
      endAnchorElement = node;
      tick().then(remeasure);
    }
  });

  onMount(() => {
    generatedId = generatedId || `kumo-flow-node-${crypto.randomUUID()}`;
    const registrationId = id ?? generatedId;
    const unregister = group.register(registrationId, {
      parallel: false,
      disabled,
      start: startRect,
      end: endRect
    });

    const observer = new ResizeObserver(() => {
      remeasure();
      group.notifySizeChange();
    });
    observer.observe(nodeElement);

    const onLayoutShift = () => {
      remeasure();
      group.notifySizeChange();
    };

    window.addEventListener('scroll', onLayoutShift, { capture: true, passive: true });
    window.addEventListener('resize', onLayoutShift, { passive: true });
    tick().then(remeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onLayoutShift, { capture: true });
      window.removeEventListener('resize', onLayoutShift);
      unregister();
    };
  });

  $effect(() => {
    if (!nodeId) return;
    disabled;
    startRect;
    endRect;
    group.update(nodeId, {
      parallel: false,
      disabled,
      start: startRect,
      end: endRect
    });
  });

  $effect(() => {
    $epochStore;
    tick().then(remeasure);
  });
</script>

<li
  bind:this={nodeElement}
  class={cn(!bare && 'py-2 px-3 rounded-md shadow bg-kumo-base ring ring-kumo-line', className)}
  style="cursor: default"
  data-node-index={index}
  data-node-id={nodeId || undefined}
  data-testid={nodeId || undefined}
  data-disabled={disabled ? '' : undefined}
  {...rest}
>
  {@render children?.()}
</li>
