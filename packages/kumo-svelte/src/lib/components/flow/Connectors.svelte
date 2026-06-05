<script lang="ts">
  import { onMount } from 'svelte';
  import { createRoundedPath, type Connector, type PathProps } from './connectors';

  interface Props extends PathProps {
    connectors: Connector[];
    children?: import('svelte').Snippet;
  }

  let { connectors, children, ...pathProps }: Props = $props();
  let markerId = $state('');
  const sortedConnectors = $derived(
    [...connectors].sort((a, b) => {
      if (a.disabled && !b.disabled) return -1;
      if (!a.disabled && b.disabled) return 1;
      return 0;
    })
  );

  onMount(() => {
    markerId = `kumo-flow-marker-${crypto.randomUUID()}`;
  });
</script>

<svg width="100%" height="100%" overflow="visible" aria-hidden="true" class="text-kumo-inactive overflow-visible">
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
  {#each sortedConnectors as connector, index (`${connector.fromId ?? 'path'}-${connector.toId ?? index}`)}
    {@const path = createRoundedPath(connector, {
      ...pathProps,
      isBottom: connector.isBottom,
      single: connector.single
    })}
    <g class={connector.disabled ? 'opacity-40' : undefined}>
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        marker-end={markerId ? `url(#${markerId})` : undefined}
        data-index={index}
        data-testid={connector.fromId && connector.toId ? `${connector.fromId}-${connector.toId}` : `path-${index}`}
      />
    </g>
  {/each}
  {@render children?.()}
</svg>
