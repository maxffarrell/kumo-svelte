<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    variant?: 'default' | 'compact';
    sticky?: boolean;
    [key: string]: unknown;
  }

  let { children, class: className, variant = 'default', sticky = false, ...rest }: Props = $props();
  const isCompact = $derived(variant === 'compact');
</script>

<thead
  class={cn(
    'group/header',
    isCompact && '[&_th]:bg-kumo-elevated [&_th]:py-2 text-xs text-kumo-strong',
    sticky && '[&_th]:sticky [&_th]:top-0 [&_th]:z-1',
    className
  )}
  data-compact={isCompact ? '' : undefined}
  {...rest}
>
  {@render children?.()}
</thead>
