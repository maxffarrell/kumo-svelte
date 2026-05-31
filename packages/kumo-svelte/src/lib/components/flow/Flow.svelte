<script lang="ts" module>
  export type KumoFlowPart = 'root' | 'list' | 'node' | 'parallel' | 'anchor';
</script>

<script lang="ts">
  import { onMount, tick, type Snippet } from 'svelte';
  import { get } from 'svelte/store';
  import { cn } from '$lib/utils/cn';
  import FlowPart from './Flow.svelte';
  import { createRoundedPath, type Connector, type PathProps } from './connectors';
  import {
    createDescendantGroup,
    getFlowAnchorContext,
    getFlowContext,
    getNodeGroupContext,
    getOptionalNodeGroupContext,
    setFlowAnchorContext,
    setFlowContext,
    setNodeGroupContext,
    type DescendantInfo,
    type FlowAlign,
    type FlowNodeData,
    type FlowOrientation,
    type RectLike
  } from './context';

  export interface Props extends PathProps {
    __part?: KumoFlowPart;
    children?: Snippet;
    class?: string;
    orientation?: FlowOrientation;
    align?: FlowAlign | 'end';
    canvas?: boolean;
    padding?: { x?: number; y?: number };
    onOverflowChange?: (overflow: { x: boolean; y: boolean }) => void;
    id?: string;
    disabled?: boolean;
    bare?: boolean;
    type?: 'start' | 'end';
    connectors?: Connector[];
    [key: string]: unknown;
  }

  type LinksResult = {
    connectors: Connector[];
    junctions: {
      start?: { x: number; y: number };
      end?: { x: number; y: number };
    };
  };

  let {
    __part = 'root',
    children,
    class: className,
    orientation = 'horizontal',
    align = 'start',
    canvas = true,
    padding,
    onOverflowChange,
    id,
    disabled = false,
    bare = false,
    type,
    connectors = [],
    ...rest
  }: Props = $props();

  const paddingX = $derived(padding?.x ?? 16);
  const paddingY = $derived(padding?.y ?? 64);

  let wrapperElement = $state<HTMLDivElement>();
  let rootContentElement = $state<HTMLDivElement>();
  let resizeObserver: ResizeObserver | undefined;
  let previousOverflow: { x: boolean; y: boolean } | undefined;

  const flowContext = __part === 'list' || __part === 'parallel' ? getFlowContext() : undefined;
  const effectiveOrientation = $derived(flowContext?.orientation ?? orientation);
  const effectiveAlign = $derived(flowContext?.align ?? align);

  const parentGroup =
    __part === 'list'
      ? getOptionalNodeGroupContext<FlowNodeData>()
      : __part === 'parallel' || __part === 'node'
        ? getNodeGroupContext<FlowNodeData>()
        : undefined;
  const parentDescendantsStore = __part === 'parallel' ? parentGroup?.descendants : undefined;
  const parentEpochStore = __part === 'parallel' ? parentGroup?.epoch : undefined;
  const parentDescendants = $derived((parentDescendantsStore ? $parentDescendantsStore : []) ?? []);

  const group = __part === 'list' || __part === 'parallel' ? createDescendantGroup<FlowNodeData>() : undefined;
  if (group) setNodeGroupContext(group);

  const descendantsStore = __part === 'node' ? parentGroup?.descendants : group?.descendants;
  const epochStore = __part === 'node' ? parentGroup?.epoch : group?.epoch;
  const descendants = $derived((descendantsStore ? $descendantsStore : []) ?? []);

  let containerElement = $state<HTMLDivElement>();
  let listConnectors = $state<Connector[]>([]);
  let nodeId = $state('');
  const nodeIndex = $derived(
    __part === 'parallel'
      ? parentDescendants.findIndex((node) => node.id === nodeId)
      : descendants.findIndex((node) => node.id === nodeId)
  );

  let nodeElement = $state<HTMLElement>();
  let startAnchorElement: HTMLElement | null = null;
  let endAnchorElement: HTMLElement | null = null;
  let startRect = $state<RectLike | null>(null);
  let endRect = $state<RectLike | null>(null);

  let parallelContentElement = $state<HTMLUListElement>();
  let measurements = $state<RectLike | null>(null);
  let links = $state<LinksResult | null>(null);

  const anchorContext = __part === 'anchor' ? getFlowAnchorContext() : undefined;
  let anchorElement = $state<HTMLElement>();

  let markerId = $state('');
  const sortedConnectors = $derived(
    [...connectors].sort((a, b) => {
      if (a.disabled && !b.disabled) return -1;
      if (!a.disabled && b.disabled) return 1;
      return 0;
    })
  );

  if (__part === 'root') {
    setFlowContext({
      get orientation() {
        return orientation;
      },
      get align() {
        return align === 'end' ? 'start' : align;
      }
    });
  }

  if (__part === 'node') {
    setFlowAnchorContext({
      registerStartAnchor(node) {
        startAnchorElement = node;
        tick().then(remeasureNode);
      },
      registerEndAnchor(node) {
        endAnchorElement = node;
        tick().then(remeasureNode);
      }
    });
  }

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

  function measureOverflow() {
    if (__part !== 'root' || !canvas || !wrapperElement || !rootContentElement) return;

    const availableWidth = wrapperElement.clientWidth - paddingX * 2;
    const availableHeight = wrapperElement.clientHeight - paddingY * 2;
    const overflow = {
      x: rootContentElement.scrollWidth > availableWidth,
      y: rootContentElement.scrollHeight > availableHeight
    };

    if (previousOverflow?.x === overflow.x && previousOverflow?.y === overflow.y) return;
    previousOverflow = overflow;
    onOverflowChange?.(overflow);
  }

  function getNodeRect(node: DescendantInfo<FlowNodeData> | { props: FlowNodeData } | undefined, anchor: 'start' | 'end') {
    return node?.props[anchor] ?? null;
  }

  function computeListConnectors() {
    if (__part !== 'list') return;

    const edges: Connector[] = [];
    const nodes = get(descendantsStore!);
    const containerRect = containerElement?.getBoundingClientRect();
    const offsetX = containerRect?.left ?? 0;
    const offsetY = containerRect?.top ?? 0;

    for (let i = 0; i < nodes.length - 1; i += 1) {
      const currentNode = nodes[i];
      const nextNode = nodes[i + 1];

      if (currentNode.props?.parallel || nextNode.props?.parallel) continue;

      const currentRect = getNodeRect(currentNode, 'start');
      const nextRect = getNodeRect(nextNode, 'end');

      if (currentRect && nextRect) {
        edges.push({
          x1: currentRect.left - offsetX + currentRect.width,
          y1: currentRect.top - offsetY + currentRect.height / 2,
          x2: nextRect.left - offsetX,
          y2: nextRect.top - offsetY + nextRect.height / 2,
          disabled: currentNode.props.disabled || nextNode.props.disabled,
          single: true,
          fromId: currentNode.id,
          toId: nextNode.id
        });
      }
    }

    listConnectors = edges;
  }

  function updateListParentRegistration() {
    if (__part !== 'list' || !parentGroup || !nodeId) return;

    const firstNode = descendants[0];
    const lastNode = descendants[descendants.length - 1];
    parentGroup.update(nodeId, {
      parallel: false,
      disabled: false,
      start: lastNode?.props?.start ?? null,
      end: firstNode?.props?.end ?? null
    });
  }

  function remeasureNode() {
    if (__part !== 'node' || !nodeElement) return;

    const nodeRect = toRectLike(nodeElement.getBoundingClientRect());
    const nextStartRect = startAnchorElement ? toRectLike(startAnchorElement.getBoundingClientRect()) : nodeRect;
    const nextEndRect = endAnchorElement ? toRectLike(endAnchorElement.getBoundingClientRect()) : nodeRect;

    if (!rectsEqual(startRect, nextStartRect)) startRect = nextStartRect;
    if (!rectsEqual(endRect, nextEndRect)) endRect = nextEndRect;
  }

  function getPrevious() {
    if (__part !== 'parallel' || !nodeId || !parentDescendantsStore) return undefined;
    const nodes = get(parentDescendantsStore);
    const currentIndex = nodes.findIndex((node) => node.id === nodeId);
    if (currentIndex <= 0) return undefined;
    return nodes[currentIndex - 1];
  }

  function getNext() {
    if (__part !== 'parallel' || !nodeId || !parentDescendantsStore) return undefined;
    const nodes = get(parentDescendantsStore);
    const currentIndex = nodes.findIndex((node) => node.id === nodeId);
    if (currentIndex < 0 || currentIndex >= nodes.length - 1) return undefined;
    return nodes[currentIndex + 1];
  }

  function remeasureParallel() {
    if (__part !== 'parallel' || !parallelContentElement) return;
    const rect = toRectLike(parallelContentElement.getBoundingClientRect());
    if (!rectsEqual(measurements, rect)) measurements = rect;
  }

  function getStartAndEndPoints({
    container,
    previous,
    next
  }: {
    container: RectLike;
    previous: RectLike | null;
    next: RectLike | null;
  }) {
    if (effectiveOrientation === 'vertical') {
      return {
        start: { x: container.width / 2, y: 0 },
        end: { x: container.width / 2, y: container.height }
      };
    }

    const start = { x: 0, y: container.height / 2 };
    const end = { x: container.width, y: container.height / 2 };

    if (previous) start.y = previous.top - container.top + previous.height / 2;
    if (next) end.y = next.top - container.top + next.height / 2;

    return { start, end };
  }

  function computeParallelLinks() {
    if (__part !== 'parallel' || !containerElement) return;

    const containerRect = containerElement.getBoundingClientRect();
    const prevNode = getPrevious();
    const nextNode = getNext();
    const previousNodeRect = getNodeRect(prevNode, 'start');
    const nextNodeRect = getNodeRect(nextNode, 'end');
    const { start, end } = getStartAndEndPoints({
      container: containerRect,
      previous: previousNodeRect,
      next: nextNodeRect
    });
    const childNodes = get(descendantsStore!);
    const incomingBranchPoints: { y: number }[] = [];
    const outgoingBranchPoints: { y: number }[] = [];

    for (const descendant of childNodes) {
      const [endAnchorRect, startAnchorRect] = [descendant.props.end, descendant.props.start];

      if (previousNodeRect && endAnchorRect) {
        const anchorCenter =
          effectiveOrientation === 'horizontal'
            ? endAnchorRect.top - containerRect.top + endAnchorRect.height / 2
            : endAnchorRect.left - containerRect.left + endAnchorRect.width / 2;
        incomingBranchPoints.push({ y: anchorCenter });
      }

      if (nextNodeRect && startAnchorRect) {
        const anchorCenter =
          effectiveOrientation === 'horizontal'
            ? startAnchorRect.top - containerRect.top + startAnchorRect.height / 2
            : startAnchorRect.left - containerRect.left + startAnchorRect.width / 2;
        outgoingBranchPoints.push({ y: anchorCenter });
      }
    }

    const flatThreshold = 2;
    const hasIncomingJunction =
      incomingBranchPoints.length > 1 &&
      [
        incomingBranchPoints.some((point) => point.y < start.y - flatThreshold),
        incomingBranchPoints.some((point) => point.y > start.y + flatThreshold),
        incomingBranchPoints.some((point) => Math.abs(point.y - start.y) <= flatThreshold)
      ].filter(Boolean).length > 1;
    const hasOutgoingJunction =
      outgoingBranchPoints.length > 1 &&
      [
        outgoingBranchPoints.some((point) => point.y < end.y - flatThreshold),
        outgoingBranchPoints.some((point) => point.y > end.y + flatThreshold),
        outgoingBranchPoints.some((point) => Math.abs(point.y - end.y) <= flatThreshold)
      ].filter(Boolean).length > 1;

    const newConnectors = childNodes.flatMap((descendant) => {
      const edges: Connector[] = [];
      const [endAnchorRect, startAnchorRect] = [descendant.props.end, descendant.props.start];
      const isDescendantDisabled = descendant.props.disabled;

      if (previousNodeRect && endAnchorRect) {
        const anchorCenter =
          effectiveOrientation === 'horizontal'
            ? endAnchorRect.top - containerRect.top + endAnchorRect.height / 2
            : endAnchorRect.left - containerRect.left + endAnchorRect.width / 2;
        const branchStart =
          effectiveOrientation === 'vertical'
            ? { x: anchorCenter, y: endAnchorRect.top - containerRect.top }
            : { x: endAnchorRect.left - containerRect.left, y: anchorCenter };

        edges.push({
          x1: start.x,
          y1: start.y,
          x2: branchStart.x,
          y2: branchStart.y,
          isBottom: false,
          disabled: prevNode?.props.disabled || isDescendantDisabled,
          single: !hasIncomingJunction,
          fromId: prevNode?.id,
          toId: descendant.id
        });
      }

      if (nextNodeRect && startAnchorRect) {
        const anchorCenter =
          effectiveOrientation === 'horizontal'
            ? startAnchorRect.top - containerRect.top + startAnchorRect.height / 2
            : startAnchorRect.left - containerRect.left + startAnchorRect.width / 2;
        const branchEnd =
          effectiveOrientation === 'vertical'
            ? { x: anchorCenter, y: startAnchorRect.bottom - containerRect.top }
            : { x: startAnchorRect.right - containerRect.left, y: anchorCenter };

        edges.push({
          x1: branchEnd.x,
          y1: branchEnd.y,
          x2: end.x,
          y2: end.y,
          isBottom: true,
          disabled: isDescendantDisabled || nextNode?.props.disabled,
          single: !hasOutgoingJunction,
          fromId: descendant.id,
          toId: nextNode?.id
        });
      }

      return edges;
    });

    links = {
      connectors: newConnectors,
      junctions: {
        start:
          previousNodeRect && hasIncomingJunction
            ? {
                x: effectiveOrientation === 'vertical' ? start.x : start.x + 32,
                y: effectiveOrientation === 'vertical' ? start.y + 32 : start.y
              }
            : undefined,
        end:
          nextNodeRect && hasOutgoingJunction
            ? {
                x: effectiveOrientation === 'vertical' ? end.x : end.x - 32,
                y: effectiveOrientation === 'vertical' ? end.y - 32 : end.y
              }
            : undefined
      }
    };
  }

  function updateParallelParentRegistration() {
    if (__part !== 'parallel' || !parentGroup || !nodeId) return;
    const firstBranch = descendants[0];
    const endAnchor = firstBranch?.props?.end ?? measurements;
    const startAnchor = firstBranch?.props?.start ?? measurements;
    parentGroup.update(nodeId, {
      parallel: true,
      start: startAnchor,
      end: endAnchor
    });
  }

  onMount(() => {
    if (__part === 'root') {
      tick().then(measureOverflow);
      resizeObserver = new ResizeObserver(measureOverflow);
      if (wrapperElement) resizeObserver.observe(wrapperElement);
      if (rootContentElement) resizeObserver.observe(rootContentElement);

      return () => {
        resizeObserver?.disconnect();
      };
    }

    if (__part === 'list') {
      markerId = `kumo-flow-marker-${crypto.randomUUID()}`;
      nodeId = `kumo-flow-list-${crypto.randomUUID()}`;
      const unregister = parentGroup?.register(nodeId, {
        parallel: false,
        disabled: false,
        start: null,
        end: null
      });
      const onLayoutShift = () => {
        computeListConnectors();
        updateListParentRegistration();
      };
      window.addEventListener('scroll', onLayoutShift, { capture: true, passive: true });
      window.addEventListener('resize', onLayoutShift, { passive: true });

      return () => {
        window.removeEventListener('scroll', onLayoutShift, { capture: true });
        window.removeEventListener('resize', onLayoutShift);
        unregister?.();
      };
    }

    if (__part === 'node') {
      nodeId = id || `kumo-flow-node-${crypto.randomUUID()}`;
      const unregister = parentGroup!.register(nodeId, {
        parallel: false,
        disabled,
        start: startRect,
        end: endRect
      });
      const observer = new ResizeObserver(() => {
        remeasureNode();
        parentGroup!.notifySizeChange();
      });
      if (nodeElement) observer.observe(nodeElement);
      const onLayoutShift = () => {
        remeasureNode();
        parentGroup!.notifySizeChange();
      };
      window.addEventListener('scroll', onLayoutShift, { capture: true, passive: true });
      window.addEventListener('resize', onLayoutShift, { passive: true });
      tick().then(remeasureNode);

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', onLayoutShift, { capture: true });
        window.removeEventListener('resize', onLayoutShift);
        unregister();
      };
    }

    if (__part === 'parallel') {
      markerId = `kumo-flow-marker-${crypto.randomUUID()}`;
      nodeId = `kumo-flow-parallel-${crypto.randomUUID()}`;
      const unregister = parentGroup!.register(nodeId, {
        parallel: true,
        start: null,
        end: null
      });
      const observer = new ResizeObserver(() => {
        remeasureParallel();
        parentGroup!.notifySizeChange();
      });
      if (parallelContentElement) observer.observe(parallelContentElement);
      const onLayoutShift = () => {
        remeasureParallel();
        computeParallelLinks();
        updateParallelParentRegistration();
        parentGroup!.notifySizeChange();
      };
      window.addEventListener('scroll', onLayoutShift, { capture: true, passive: true });
      window.addEventListener('resize', onLayoutShift, { passive: true });
      tick().then(onLayoutShift);

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', onLayoutShift, { capture: true });
        window.removeEventListener('resize', onLayoutShift);
        unregister();
      };
    }

    if (__part === 'anchor') {
      const register = () => {
        if (!anchorElement) return;
        if (type === 'start' || type === undefined) anchorContext?.registerStartAnchor(anchorElement);
        if (type === 'end' || type === undefined) anchorContext?.registerEndAnchor(anchorElement);
      };

      tick().then(register);

      return () => {
        if (type === 'start' || type === undefined) anchorContext?.registerStartAnchor(null);
        if (type === 'end' || type === undefined) anchorContext?.registerEndAnchor(null);
      };
    }

  });

  $effect(() => {
    if (__part === 'root') {
      canvas;
      paddingX;
      paddingY;
      children;
      tick().then(measureOverflow);
    }
  });

  $effect(() => {
    if (__part === 'list') {
      descendants;
      effectiveOrientation;
      if (epochStore) $epochStore;
      tick().then(() => {
        computeListConnectors();
        updateListParentRegistration();
      });
    }
  });

  $effect(() => {
    if (__part === 'node' && nodeId && parentGroup) {
      disabled;
      startRect;
      endRect;
      parentGroup.update(nodeId, {
        parallel: false,
        disabled,
        start: startRect,
        end: endRect
      });
    }
  });

  $effect(() => {
    if (__part === 'node') {
      if (epochStore) $epochStore;
      tick().then(remeasureNode);
    }
  });

  $effect(() => {
    if (__part === 'parallel') {
      descendants;
      parentDescendants;
      measurements;
      effectiveOrientation;
      if (epochStore) $epochStore;
      if (parentEpochStore) $parentEpochStore;
      tick().then(() => {
        remeasureParallel();
        updateParallelParentRegistration();
        computeParallelLinks();
      });
    }
  });
</script>

{#snippet flowContents()}
  <div bind:this={rootContentElement} class="w-max mx-auto" data-testid="flow-contents">
    <FlowPart __part="list">{@render children?.()}</FlowPart>
  </div>
{/snippet}

{#snippet connectorsSvg(svgConnectors: Connector[])}
  <svg width="100%" height="100%" aria-hidden="true" class="text-kumo-inactive overflow-visible">
    <defs>
      {#if markerId}
        <marker
          id={markerId}
          markerWidth="8"
          markerHeight="8"
          refX="0"
          refY="4"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 0,1.5 Q 0,0 1.5,0 Q 3.5,1 5.8,3.2 Q 6.5,4 5.8,4.8 Q 3.5,7 1.5,8 Q 0,8 0,6.5 Z"
            fill="currentColor"
            stroke="none"
          />
        </marker>
      {/if}
    </defs>
    {#each svgConnectors as connector, index (`${connector.fromId ?? 'path'}-${connector.toId ?? index}`)}
      <g class={connector.disabled ? 'opacity-40' : undefined}>
        <path
          d={createRoundedPath(connector, {
            ...rest,
            isBottom: connector.isBottom,
            single: connector.single
          })}
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          marker-end={markerId ? `url(#${markerId})` : undefined}
          data-index={index}
          data-testid={connector.fromId && connector.toId ? `${connector.fromId}-${connector.toId}` : `path-${index}`}
        />
      </g>
    {/each}
  </svg>
{/snippet}

{#if __part === 'root'}
  {#if canvas}
    <div
      bind:this={wrapperElement}
      class={cn('relative isolate grow overflow-auto', className)}
      style:padding-top={`${paddingY}px`}
      style:padding-bottom={`${paddingY}px`}
      style:padding-left={`${paddingX}px`}
      style:padding-right={`${paddingX}px`}
      {...rest}
    >
      {@render flowContents()}
    </div>
  {:else}
    <div bind:this={wrapperElement} class={cn('relative isolate grow', className)} {...rest}>
      {@render flowContents()}
    </div>
  {/if}
{:else if __part === 'list'}
  <div class="relative" bind:this={containerElement}>
    <ul
      class={cn(
        'ml-0 list-none',
        effectiveOrientation === 'vertical' ? 'grid auto-rows-min gap-16' : 'flex gap-16',
        effectiveOrientation === 'horizontal' && (effectiveAlign === 'center' ? 'items-center' : 'items-start'),
        className
      )}
      {...rest}
    >
      {@render children?.()}
    </ul>
    <div class="absolute inset-0 pointer-events-none">
      {@render connectorsSvg(listConnectors)}
    </div>
  </div>
{:else if __part === 'node'}
  <li
    bind:this={nodeElement}
    class={cn(!bare && 'py-2 px-3 rounded-md shadow bg-kumo-base ring ring-kumo-line', className)}
    style="cursor: default"
    data-node-index={nodeIndex}
    data-node-id={nodeId || undefined}
    data-testid={nodeId || undefined}
    data-disabled={disabled ? '' : undefined}
    {...rest}
  >
    {@render children?.()}
  </li>
{:else if __part === 'parallel'}
  <div
    bind:this={containerElement}
    class={cn(
      'relative isolate',
      effectiveOrientation === 'horizontal' ? 'px-16 -mr-16' : 'py-16 -mb-16',
      effectiveOrientation === 'horizontal'
        ? getPrevious()?.props?.parallel === true
          ? '-ml-3'
          : '-ml-16'
        : getPrevious()?.props?.parallel === true
          ? '-mt-3'
          : '-mt-16',
      className
    )}
    data-node-index={nodeIndex}
    {...rest}
  >
    <div class="absolute inset-0 pointer-events-none z-1">
      {#if links}
        {@render connectorsSvg(links.connectors)}
        {#if links.junctions.start}
          <svg width="100%" height="100%" aria-hidden="true" class="absolute inset-0 text-kumo-inactive overflow-visible">
            <g transform={`translate(${links.junctions.start.x} ${links.junctions.start.y})`}>
              <rect x="-3" y="-3" width="6" height="6" fill="currentColor" rx="1" />
            </g>
          </svg>
        {/if}
        {#if links.junctions.end}
          <svg width="100%" height="100%" aria-hidden="true" class="absolute inset-0 text-kumo-inactive overflow-visible">
            <g transform={`translate(${links.junctions.end.x} ${links.junctions.end.y})`}>
              <rect x="-3" y="-3" width="6" height="6" fill="currentColor" rx="1" />
            </g>
          </svg>
        {/if}
      {/if}
    </div>
    <ul
      bind:this={parallelContentElement}
      class={cn(
        'gap-5 list-none flex',
        align === 'end' ? 'items-end' : 'items-start',
        effectiveOrientation === 'horizontal' ? 'flex-col ml-0' : 'gap-5 w-fit mx-auto'
      )}
    >
      {@render children?.()}
    </ul>
  </div>
{:else if __part === 'anchor'}
  <div bind:this={anchorElement} data-flow-anchor={type} {...rest}>
    {@render children?.()}
  </div>
{/if}
