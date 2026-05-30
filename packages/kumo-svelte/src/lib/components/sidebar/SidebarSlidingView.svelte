<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface SlidingContext { get activeKey(): string; get direction(): 'left' | 'right'; }
  interface Props { children?: Snippet; class?: string; value: string; [key: string]: unknown; }
  let { children, class: className, value, ...rest }: Props = $props();
  const sliding = getContext<SlidingContext>('kumo-sidebar-sliding-view');
  const active = $derived(sliding?.activeKey === value);
</script>

<div
  data-sidebar="sliding-view"
  data-active={active ? '' : undefined}
  aria-hidden={active ? undefined : 'true'}
  inert={active ? undefined : true}
  class={cn(
    'absolute inset-0 min-h-0 transition-transform duration-(--sidebar-animation-duration) motion-reduce:transition-none',
    active && 'relative translate-x-0',
    !active && sliding?.direction === 'right' && '-translate-x-full',
    !active && sliding?.direction !== 'right' && 'translate-x-full',
    className
  )}
  {...rest}
>
  {@render children?.()}
</div>
