<script lang="ts">
  import type { Snippet } from 'svelte';
  import { LayerCard } from '#lib/components/layer-card/index.js';
  import { cn } from '#lib/utils/cn.js';

  type SurfaceColor = 'primary' | 'secondary';

  interface Props {
    children?: Snippet;
    class?: string;
    as?: string;
    color?: SurfaceColor;
    [key: string]: unknown;
  }

  let { children, class: className, as = 'div', color = 'primary', ...rest }: Props = $props();
</script>

<LayerCard
  {as}
  class={cn('overflow-visible rounded-none', className)}
  data-surface-color={color}
  data-deprecated="surface"
  {...rest}
>
  {@render children?.()}
</LayerCard>
