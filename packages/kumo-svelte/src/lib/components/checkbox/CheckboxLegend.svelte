<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props();
</script>

<legend class={cn('text-base font-medium text-kumo-default', className)}>
  {@render children?.()}
</legend>
