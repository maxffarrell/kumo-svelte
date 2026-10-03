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

<p class={cn('m-0 text-base leading-6 text-kumo-subtle', className)} {...rest}>
  {@render children?.()}
</p>
