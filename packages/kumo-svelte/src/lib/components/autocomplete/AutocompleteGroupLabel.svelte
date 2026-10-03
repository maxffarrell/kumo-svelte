<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  export interface Props {
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<div class={cn('mx-1.5 px-2 py-1.5 text-sm text-kumo-strong', className)} {...rest}>
  {@render children?.()}
</div>
