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

<div class={cn('flex max-h-[60vh] flex-col overflow-hidden rounded-lg bg-kumo-elevated', className)} {...rest}>
  {@render children?.()}
</div>
