<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    type?: 'info' | 'warning' | 'error' | 'success';
  }

  let { children, type = 'info' }: Props = $props();

  const variants = {
    info: 'text-sm leading-normal text-kumo-info bg-kumo-info-tint/50 rounded-lg py-1 px-4 ring ring-kumo-info mb-12',
    warning: 'border-kumo-warning/50 bg-kumo-warning-tint/15 text-kumo-warning',
    error: 'border-kumo-danger/50 bg-kumo-danger-tint/15 text-kumo-danger',
    success: 'border-kumo-success/50 bg-kumo-success-tint/30 text-kumo-success'
  };
</script>

<div
  data-type={type}
  class={cn(
    'not-prose kumo-callout',
    type === 'info' ? '' : 'my-4 rounded-lg border px-4 py-3 text-base',
    variants[type]
  )}
>
  {@render children?.()}
</div>
