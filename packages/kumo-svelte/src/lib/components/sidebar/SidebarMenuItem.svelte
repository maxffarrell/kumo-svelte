<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { setSidebarMenuItemContext } from './context';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
  setSidebarMenuItemContext({
    get insideMenuItem() {
      return true;
    }
  });
</script>

<li data-sidebar="menu-item" class={cn('relative group-data-[state=collapsed]/sidebar:overflow-hidden', className)} {...rest}>
  {@render children?.()}
</li>
