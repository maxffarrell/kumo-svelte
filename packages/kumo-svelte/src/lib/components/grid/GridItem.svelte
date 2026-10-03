<script lang="ts">
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';
  import { gridItemVariants, type KumoGridGap, type KumoGridVariant } from './Grid.svelte';

  interface GridContextValue {
    variant?: KumoGridVariant;
    gap: KumoGridGap;
    mobileDivider?: boolean;
  }

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  const getGridContext = getContext<() => GridContextValue>('kumo-grid');
  let { children, class: className, ...rest }: Props = $props();
  const context = $derived(getGridContext?.());
  const classes = $derived(
    cn(
      gridItemVariants({
        variant: context?.variant,
        mobileDivider: context?.mobileDivider
      }),
      className
    )
  );
</script>

<div class={classes} {...rest}>
  {@render children?.()}
</div>
