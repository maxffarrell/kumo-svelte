<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';
  import { tableStickyColumnClasses, type KumoTableStickyColumn } from './Table.svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    sticky?: KumoTableStickyColumn;
    [key: string]: unknown;
  }

  let { children, class: className, sticky, ...rest }: Props = $props();
</script>

<th class={cn('group relative', sticky && tableStickyColumnClasses(sticky, 'head'), className)} {...rest}>
  {@render children?.()}
</th>
