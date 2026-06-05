<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getSidebarContext } from './context';
  interface CollapsibleContext { get open(): boolean; get contentId(): string; get autoScrollOnOpen(): boolean; toggle(): void; }
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
  const collapsible = getContext<CollapsibleContext>('kumo-sidebar-collapsible');
  const sidebar = getSidebarContext('Sidebar.CollapsibleContent');
  let contentEl: HTMLDivElement | null = $state(null);
  const isOpen = $derived(Boolean(collapsible?.open && sidebar.state !== 'collapsed'));

  $effect(() => {
    if (!isOpen || !collapsible?.autoScrollOnOpen || !contentEl) return;

    const timeout = window.setTimeout(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      contentEl?.scrollIntoView({
        block: 'nearest',
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }, sidebar.animationDuration);

    return () => window.clearTimeout(timeout);
  });
</script>

<div
  bind:this={contentEl}
  id={collapsible?.contentId}
  data-sidebar="collapsible-content"
  data-open={isOpen ? '' : undefined}
  role="region"
  aria-hidden={isOpen ? undefined : 'true'}
  inert={isOpen ? undefined : true}
  class={cn(
    'grid overflow-hidden transition-[grid-template-rows,opacity] duration-(--sidebar-animation-duration) motion-reduce:transition-none',
    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
    className
  )}
  {...rest}
>
  <div class="min-h-0 overflow-hidden">
    {@render children?.()}
  </div>
</div>
