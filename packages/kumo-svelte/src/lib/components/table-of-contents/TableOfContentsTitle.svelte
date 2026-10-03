<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<p class={cn('mb-3 text-xs font-semibold tracking-wide text-kumo-subtle uppercase', className)} {...rest}>
  {@render children?.()}
</p>
