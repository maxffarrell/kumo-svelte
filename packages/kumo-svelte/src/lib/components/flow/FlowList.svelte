<script lang="ts">
  import { onMount, tick, type Snippet } from 'svelte';
  import { get } from 'svelte/store';
  import { cn } from '#lib/utils/cn.js';
  import Connectors from './Connectors.svelte';
  import {
    createDescendantGroup,
    getFlowContext,
    getOptionalNodeGroupContext,
    setNodeGroupContext,
    type FlowNodeData
  } from './context';
  import type { Connector } from './connectors';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();

  const context = getFlowContext();
  const orientation = $derived(context?.orientation ?? 'horizontal');
  const align = $derived(context?.align ?? 'start');
  const parentGroup = getOptionalNodeGroupContext<FlowNodeData>();
  const group = createDescendantGroup<FlowNodeData>();
  setNodeGroupContext(group);

  const descendantsStore = group.descendants;
  const epochStore = group.epoch;
  const descendants = $derived($descendantsStore);

  let containerElement: HTMLDivElement;
  let connectors = $state<Connector[]>([]);
  let nodeId = $state('');

  function getNodeRect(node: { props: FlowNodeData } | undefined, type: 'start' | 'end') {
    return node?.props[type] ?? null;
  }

  function computeConnectors() {
    const edges: Connector[] = [];
    const nodes = get(descendantsStore);
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

    connectors = edges;
  }

  function updateParentRegistration() {
    if (!parentGroup || !nodeId) return;

    const firstNode = descendants[0];
    const lastNode = descendants[descendants.length - 1];
    parentGroup.update(nodeId, {
      parallel: false,
      disabled: false,
      start: lastNode?.props?.start ?? null,
      end: firstNode?.props?.end ?? null
    });
  }

  onMount(() => {
    nodeId = `kumo-flow-list-${crypto.randomUUID()}`;
    const unregister = parentGroup?.register(nodeId, {
      parallel: false,
      disabled: false,
      start: null,
      end: null
    });

    const onLayoutShift = () => {
      computeConnectors();
      updateParentRegistration();
    };

    window.addEventListener('scroll', onLayoutShift, { capture: true, passive: true });
    window.addEventListener('resize', onLayoutShift, { passive: true });

    return () => {
      window.removeEventListener('scroll', onLayoutShift, { capture: true });
      window.removeEventListener('resize', onLayoutShift);
      unregister?.();
    };
  });

  $effect(() => {
    descendants;
    orientation;
    $epochStore;
    tick().then(() => {
      computeConnectors();
      updateParentRegistration();
    });
  });
</script>

<div class="relative" bind:this={containerElement}>
  <ul
    class={cn(
      'ml-0 list-none',
      orientation === 'vertical' ? 'grid auto-rows-min gap-16' : 'flex gap-16',
      orientation === 'horizontal' && (align === 'center' ? 'items-center' : 'items-start'),
      className
    )}
    {...rest}
  >
    {@render children?.()}
  </ul>
  <div class="absolute inset-0 pointer-events-none">
    <Connectors {connectors} {orientation} />
  </div>
</div>
