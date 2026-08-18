<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  const LAYER_CARD_SECONDARY_CLASSES =
    '-my-2 flex items-center gap-2 bg-kumo-elevated p-4 text-base font-medium text-kumo-subtle';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<div {...rest} data-kumo-layer-section class={cn(LAYER_CARD_SECONDARY_CLASSES, className)}>
  {@render children?.()}
</div>
