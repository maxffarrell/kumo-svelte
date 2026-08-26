<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getSidebarContext, setSidebarMenuItemContext } from './context';
  interface Props { children?: Snippet; class?: string; itemId?: string; [key: string]: unknown; }
  let { children, class: className, itemId, ...rest }: Props = $props();
  const sidebar = getSidebarContext('Sidebar.MenuItem');
  let node: HTMLLIElement;

  $effect(() => {
    if (!itemId || !node) return;
    sidebar.registerItem(itemId, node);
    return () => sidebar.registerItem(itemId, null);
  });
  setSidebarMenuItemContext({
    get insideMenuItem() {
      return true;
    }
  });
</script>

<li bind:this={node} data-sidebar="menu-item" data-sidebar-item-id={itemId} class={cn('relative group-data-[state=collapsed]/sidebar:overflow-hidden', className)} {...rest}>
  {@render children?.()}
</li>
