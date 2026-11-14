<script lang="ts">
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();
  const legendId = getContext<string | undefined>('kumo-radio-legend');
</script>

<legend id={legendId} class={cn('text-base font-medium text-kumo-default', className)}>
  {@render children?.()}
</legend>
