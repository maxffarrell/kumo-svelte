<script lang="ts">
  import { onMount, tick } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { setFlowContext, type FlowAlign, type FlowOrientation } from './context';
  import FlowList from './FlowList.svelte';

  const MIN_SCROLLBAR_THUMB_SIZE = 10;

  interface Props {
    children?: Snippet;
    class?: string;
    orientation?: FlowOrientation;
    align?: FlowAlign;
    canvas?: boolean;
    padding?: { x?: number; y?: number };
    onOverflowChange?: (overflow: { x: boolean; y: boolean }) => void;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    orientation = 'horizontal',
    align = 'start',
    canvas = true,
    padding,
    onOverflowChange,
    ...rest
  }: Props = $props();

  let wrapperElement = $state<HTMLDivElement>();
  let contentElement = $state<HTMLDivElement>();
  let resizeObserver: ResizeObserver | undefined;
  let previousOverflow: { x: boolean; y: boolean } | undefined;
  let bounds = $state<{ x: number; y: number }>({ x: 0, y: 0 });
  let dimensions = $state({
    viewportWidth: 0,
    viewportHeight: 0,
    contentWidth: 0,
    contentHeight: 0
  });
  let panX = $state(0);
  let panY = $state(0);
  let isPanning = $state(false);
  let lastPointer = $state<{ x: number; y: number } | null>(null);

  const paddingX = $derived(padding?.x ?? 16);
  const paddingY = $derived(padding?.y ?? 64);
  const canScrollX = $derived(bounds.x < 0);
  const canScrollY = $derived(bounds.y < 0);
  const canPan = $derived(canScrollX || canScrollY);
  const scrollThumbWidth = $derived(
    dimensions.contentWidth > 0 && dimensions.viewportWidth > 0
      ? Math.max(MIN_SCROLLBAR_THUMB_SIZE, (dimensions.viewportWidth / dimensions.contentWidth) * 100)
      : 0
  );
  const scrollThumbHeight = $derived(
    dimensions.contentHeight > 0 && dimensions.viewportHeight > 0
      ? Math.max(MIN_SCROLLBAR_THUMB_SIZE, (dimensions.viewportHeight / dimensions.contentHeight) * 100)
      : 0
  );
  const scrollbarXPercent = $derived(
    bounds.x < 0 ? (panX / bounds.x) * (100 - scrollThumbWidth) : 0
  );
  const scrollbarYPercent = $derived(
    bounds.y < 0 ? (panY / bounds.y) * (100 - scrollThumbHeight) : 0
  );

  setFlowContext({
    get orientation() {
      return orientation;
    },
    get align() {
      return align;
    }
  });

  function isEventFromNode(target: EventTarget | null) {
    return target instanceof Element && target.closest('[data-node-id]') !== null;
  }

  function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
  }

  function updateBodyPanState(active: boolean) {
    document.body.style.cursor = active ? 'grabbing' : '';
    document.body.style.userSelect = active ? 'none' : '';
  }

  function endPan() {
    if (!isPanning) return;
    isPanning = false;
    lastPointer = null;
    updateBodyPanState(false);
  }

  function measureOverflow() {
    if (!canvas || !wrapperElement || !contentElement) return;

    const wrapper = wrapperElement.getBoundingClientRect();
    const content = contentElement.getBoundingClientRect();
    const availableWidth = wrapper.width - paddingX * 2;
    const availableHeight = wrapper.height - paddingY * 2;
    const nextBounds = {
      x: Math.min(0, availableWidth - content.width),
      y: Math.min(0, availableHeight - content.height)
    };
    const overflow = {
      x: content.width > availableWidth,
      y: content.height > availableHeight
    };

    bounds = nextBounds;
    dimensions = {
      viewportWidth: availableWidth,
      viewportHeight: availableHeight,
      contentWidth: content.width,
      contentHeight: content.height
    };
    panX = clamp(panX, nextBounds.x, 0);
    panY = clamp(panY, nextBounds.y, 0);

    if (previousOverflow?.x === overflow.x && previousOverflow?.y === overflow.y) return;
    previousOverflow = overflow;
    onOverflowChange?.(overflow);
  }

  function handlePointerDown(event: PointerEvent) {
    if (!canvas || !canPan || event.button !== 0 || isEventFromNode(event.target)) return;

    isPanning = true;
    lastPointer = { x: event.clientX, y: event.clientY };
    updateBodyPanState(true);
    wrapperElement?.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent) {
    if (!isPanning || !lastPointer) return;

    const deltaX = event.clientX - lastPointer.x;
    const deltaY = event.clientY - lastPointer.y;
    lastPointer = { x: event.clientX, y: event.clientY };

    panX = clamp(panX + deltaX, bounds.x, 0);
    panY = clamp(panY + deltaY, bounds.y, 0);
  }

  function handlePointerUp(event: PointerEvent) {
    wrapperElement?.releasePointerCapture?.(event.pointerId);
    endPan();
  }

  function handleWheel(event: WheelEvent) {
    if (!canvas || !canPan) return;

    event.preventDefault();

    if (canScrollX) {
      panX = clamp(panX - event.deltaX, bounds.x, 0);
    }

    if (canScrollY) {
      panY = clamp(panY - event.deltaY, bounds.y, 0);
    }
  }

  onMount(() => {
    tick().then(measureOverflow);

    resizeObserver = new ResizeObserver(measureOverflow);
    if (wrapperElement) resizeObserver.observe(wrapperElement);
    if (contentElement) resizeObserver.observe(contentElement);

    return () => {
      resizeObserver?.disconnect();
      updateBodyPanState(false);
    };
  });

  $effect(() => {
    canvas;
    paddingX;
    paddingY;
    children;
    tick().then(measureOverflow);
  });
</script>

{#snippet contents()}
  <div
    bind:this={contentElement}
    class="w-max mx-auto"
    style:transform={`translate(${panX}px, ${panY}px)`}
    data-testid="flow-contents"
  >
    <FlowList>
      {@render children?.()}
    </FlowList>
  </div>
{/snippet}

{#if canvas}
  <div
    bind:this={wrapperElement}
    class={cn('group relative isolate grow overflow-hidden', className)}
    style:padding-top={`${paddingY}px`}
    style:padding-bottom={`${paddingY}px`}
    style:padding-left={`${paddingX}px`}
    style:padding-right={`${paddingX}px`}
    style:cursor={canPan && !isPanning ? 'grab' : undefined}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerUp}
    onwheel={handleWheel}
    {...rest}
  >
    {@render contents()}

    {#if canScrollY}
      <div
        class="absolute bottom-1 right-1 top-1 w-1.5 rounded-full bg-kumo-hairline/50 opacity-0 group-hover:opacity-100"
      >
        <div
          class="absolute w-full rounded-full bg-kumo-fill"
          style:height={`${scrollThumbHeight}%`}
          style:top={`${scrollbarYPercent}%`}
        ></div>
      </div>
    {/if}

    {#if canScrollX}
      <div
        class="absolute bottom-1 left-1 right-1 h-1.5 rounded-full bg-kumo-hairline/50 opacity-0 group-hover:opacity-100"
      >
        <div
          class="absolute h-full rounded-full bg-kumo-fill"
          style:width={`${scrollThumbWidth}%`}
          style:left={`${scrollbarXPercent}%`}
        ></div>
      </div>
    {/if}
  </div>
{:else}
  <div bind:this={wrapperElement} class={cn('relative isolate grow', className)} {...rest}>
    {@render contents()}
  </div>
{/if}
