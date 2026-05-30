<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface CollapsibleContext { get open(): boolean; get contentId(): string; toggle(): void; }
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
  const collapsible = getContext<CollapsibleContext>('kumo-sidebar-collapsible');
</script>

<div
  id={collapsible?.contentId}
  data-sidebar="collapsible-content"
  data-open={collapsible?.open ? '' : undefined}
  role="region"
  aria-hidden={collapsible?.open ? undefined : 'true'}
  inert={collapsible?.open ? undefined : true}
  class={cn(
    'grid overflow-hidden transition-[grid-template-rows,opacity] duration-(--sidebar-animation-duration) motion-reduce:transition-none',
    collapsible?.open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
    className
  )}
  {...rest}
>
  <div class="min-h-0 overflow-hidden">
    {@render children?.()}
  </div>
</div>
