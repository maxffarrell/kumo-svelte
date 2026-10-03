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

<h2 class={cn('m-0 text-base leading-6 font-medium', className)} {...rest}>
  {@render children?.()}
</h2>
