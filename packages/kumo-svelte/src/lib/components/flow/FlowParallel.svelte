<script lang="ts">
  import { onMount, tick, type Snippet } from 'svelte';
  import { get } from 'svelte/store';
  import { cn } from '#lib/utils/cn.js';
  import Connectors from './Connectors.svelte';
  import type { Connector } from './connectors';
  import {
    createDescendantGroup,
    getFlowContext,
    getNodeGroupContext,
    setNodeGroupContext,
    type DescendantInfo,
    type FlowNodeData,
    type RectLike
  } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    align?: 'start' | 'end';
    [key: string]: unknown;
  }

  type LinksResult = {
    connectors: Connector[];
    junctions: {
      start?: { x: number; y: number };
      end?: { x: number; y: number };
    };
  };

  let { children, class: className, align = 'start', ...rest }: Props = $props();

  const flowContext = getFlowContext();
  const orientation = $derived(flowContext?.orientation ?? 'horizontal');
  const parentGroup = getNodeGroupContext<FlowNodeData>();
  const parentDescendantsStore = parentGroup.descendants;
  const parentEpochStore = parentGroup.epoch;
  const parentDescendants = $derived($parentDescendantsStore);
  const group = createDescendantGroup<FlowNodeData>();
  setNodeGroupContext(group);

  const descendantsStore = group.descendants;
  const epochStore = group.epoch;
  const descendants = $derived($descendantsStore);
  let nodeId = $state('');
  const index = $derived(parentDescendants.findIndex((node) => node.id === nodeId));

  let containerElement: HTMLDivElement;
  let contentElement: HTMLUListElement;
  let measurements = $state<RectLike | null>(null);
  let links = $state<LinksResult | null>(null);

  function getNodeRect(node: DescendantInfo<FlowNodeData> | undefined, type: 'start' | 'end') {
    return node?.props[type] ?? null;
  }

  function getPrevious() {
    if (!nodeId) return undefined;
    const currentIndex = get(parentDescendantsStore).findIndex((node) => node.id === nodeId);
    if (currentIndex <= 0) return undefined;
    return get(parentDescendantsStore)[currentIndex - 1];
  }

  function getNext() {
    if (!nodeId) return undefined;
    const nodes = get(parentDescendantsStore);
    const currentIndex = nodes.findIndex((node) => node.id === nodeId);
    if (currentIndex < 0 || currentIndex >= nodes.length - 1) return undefined;
    return nodes[currentIndex + 1];
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

  function remeasure() {
    if (!contentElement) return;
    const rect = toRectLike(contentElement.getBoundingClientRect());
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
    if (orientation === 'vertical') {
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

  function computeLinks() {
    if (!containerElement) return;

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
    const childNodes = get(descendantsStore);
    const incomingBranchPoints: { y: number }[] = [];
    const outgoingBranchPoints: { y: number }[] = [];

    for (const descendant of childNodes) {
      const [endAnchorRect, startAnchorRect] = [descendant.props.end, descendant.props.start];

      if (previousNodeRect && endAnchorRect) {
        const anchorCenter =
          orientation === 'horizontal'
            ? endAnchorRect.top - containerRect.top + endAnchorRect.height / 2
            : endAnchorRect.left - containerRect.left + endAnchorRect.width / 2;
        incomingBranchPoints.push({ y: anchorCenter });
      }

      if (nextNodeRect && startAnchorRect) {
        const anchorCenter =
          orientation === 'horizontal'
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
      const connectors: Connector[] = [];
      const [endAnchorRect, startAnchorRect] = [descendant.props.end, descendant.props.start];
      const isDescendantDisabled = descendant.props.disabled;

      if (previousNodeRect && endAnchorRect) {
        let branchStart: { x: number; y: number };
        if (orientation === 'vertical') {
          const anchorCenter = endAnchorRect.left - containerRect.left + endAnchorRect.width / 2;
          branchStart = {
            x: anchorCenter,
            y: endAnchorRect.top - containerRect.top
          };
        } else {
          const anchorCenter = endAnchorRect.top - containerRect.top + endAnchorRect.height / 2;
          branchStart = {
            x: endAnchorRect.left - containerRect.left,
            y: anchorCenter
          };
        }

        connectors.push({
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
        let branchEnd: { x: number; y: number };
        if (orientation === 'vertical') {
          const anchorCenter = startAnchorRect.left - containerRect.left + startAnchorRect.width / 2;
          branchEnd = {
            x: anchorCenter,
            y: startAnchorRect.bottom - containerRect.top
          };
        } else {
          const anchorCenter = startAnchorRect.top - containerRect.top + startAnchorRect.height / 2;
          branchEnd = {
            x: startAnchorRect.right - containerRect.left,
            y: anchorCenter
          };
        }

        connectors.push({
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

      return connectors;
    });

    links = {
      connectors: newConnectors,
      junctions: {
        start:
          previousNodeRect && hasIncomingJunction
            ? {
                x: orientation === 'vertical' ? start.x : start.x + 32,
                y: orientation === 'vertical' ? start.y + 32 : start.y
              }
            : undefined,
        end:
          nextNodeRect && hasOutgoingJunction
            ? {
                x: orientation === 'vertical' ? end.x : end.x - 32,
                y: orientation === 'vertical' ? end.y - 32 : end.y
              }
            : undefined
      }
    };
  }

  function updateParentRegistration() {
    if (!nodeId) return;
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
    nodeId = `kumo-flow-parallel-${crypto.randomUUID()}`;
    const unregister = parentGroup.register(nodeId, {
      parallel: true,
      start: null,
      end: null
    });

    const observer = new ResizeObserver(() => {
      remeasure();
      parentGroup.notifySizeChange();
    });
    observer.observe(contentElement);

    const onLayoutShift = () => {
      remeasure();
      computeLinks();
      updateParentRegistration();
      parentGroup.notifySizeChange();
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
  });

  $effect(() => {
    descendants;
    parentDescendants;
    measurements;
    orientation;
    $epochStore;
    $parentEpochStore;
    tick().then(() => {
      remeasure();
      updateParentRegistration();
      computeLinks();
    });
  });
</script>

<div
  bind:this={containerElement}
  class={cn(
    'relative isolate',
    orientation === 'horizontal' ? 'px-16 -mr-16' : 'py-16 -mb-16',
    orientation === 'horizontal'
      ? getPrevious()?.props?.parallel === true
        ? '-ml-3'
        : '-ml-16'
      : getPrevious()?.props?.parallel === true
        ? '-mt-3'
        : '-mt-16',
    className
  )}
  data-node-index={index}
  {...rest}
>
  <div class="absolute inset-0 pointer-events-none z-1">
    {#if links}
      <Connectors connectors={links.connectors} {orientation}>
        {#if links.junctions.start}
          <g transform={`translate(${links.junctions.start.x} ${links.junctions.start.y})`}>
            <rect x="-3" y="-3" width="6" height="6" fill="currentColor" rx="1" />
          </g>
        {/if}
        {#if links.junctions.end}
          <g transform={`translate(${links.junctions.end.x} ${links.junctions.end.y})`}>
            <rect x="-3" y="-3" width="6" height="6" fill="currentColor" rx="1" />
          </g>
        {/if}
      </Connectors>
    {/if}
  </div>
  <ul
    bind:this={contentElement}
    class={cn(
      'gap-5 list-none flex',
      align === 'start' ? 'items-start' : 'items-end',
      orientation === 'horizontal' ? 'flex-col ml-0' : 'gap-5 w-fit mx-auto'
    )}
  >
    {@render children?.()}
  </ul>
</div>
