<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  const LAYER_CARD_PRIMARY_CLASSES =
    'relative flex flex-col gap-2 overflow-hidden rounded-lg bg-kumo-base p-4 pr-3 text-inherit no-underline ring ring-kumo-fill';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<div {...rest} data-kumo-layer-section class={cn(LAYER_CARD_PRIMARY_CLASSES, className)}>
  {@render children?.()}
</div>
