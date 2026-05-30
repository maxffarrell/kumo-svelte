<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { setSidebarMenuSubItemContext } from './context';
  interface Props { children?: Snippet; class?: string; [key: string]: unknown; }
  let { children, class: className, ...rest }: Props = $props();
  setSidebarMenuSubItemContext({
    get insideMenuSubItem() {
      return true;
    }
  });
</script>

<li data-sidebar="menu-sub-item" class={cn('relative', className)} {...rest}>
  {@render children?.()}
</li>
