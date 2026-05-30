<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getSidebarContext } from './context';
  interface Props { children?: Snippet; class?: string; onclick?: (event: MouseEvent) => void; [key: string]: unknown; }
  let { children, class: className, onclick, ...rest }: Props = $props();
  const sidebar = getSidebarContext('Sidebar.Trigger');
</script>

<button
  type="button"
  data-sidebar="trigger"
  data-kumo-component="Sidebar"
  data-kumo-part="trigger"
  aria-expanded={sidebar.open}
  aria-label={sidebar.open ? 'Collapse sidebar' : 'Expand sidebar'}
  class={cn('flex size-8.5 cursor-pointer items-center justify-center rounded-lg text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand', className)}
  onclick={(event) => {
    onclick?.(event);
    sidebar.toggleSidebar();
  }}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="shrink-0">
      <path d="M21.25 6.72v10.56a2.97 2.97 0 0 1-2.97 2.97H5.72a2.97 2.97 0 0 1-2.97-2.97V6.72a2.97 2.97 0 0 1 2.97-2.97h12.56a2.97 2.97 0 0 1 2.97 2.97" />
      <path d="M6.25 7.25v9.5" class={cn('transition-transform duration-(--sidebar-animation-duration) ease-(--sidebar-easing)', sidebar.open ? 'translate-x-px' : 'translate-x-[10.5px]')} />
    </svg>
  {/if}
</button>
