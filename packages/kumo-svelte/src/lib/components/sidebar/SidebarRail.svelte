<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getSidebarContext } from './context';
  interface Props { class?: string; [key: string]: unknown; }
  let { class: className, ...rest }: Props = $props();
  const sidebar = getSidebarContext('Sidebar.Rail');
</script>

<button
  type="button"
  data-sidebar="rail"
  data-kumo-component="Sidebar"
  data-kumo-part="rail"
  aria-label="Toggle sidebar"
  tabindex="-1"
  class={cn('absolute inset-y-0 z-1 hidden w-4 -translate-x-1/2 cursor-pointer transition-all after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-kumo-brand/20 sm:flex', sidebar.side === 'left' ? 'right-0' : 'left-0', className)}
  onclick={sidebar.toggleSidebar}
  {...rest}
></button>
