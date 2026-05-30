<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props { children?: Snippet; class?: string; defaultOpen?: boolean; open?: boolean; onOpenChange?: (open: boolean) => void; [key: string]: unknown; }
  let { children, class: className, defaultOpen = false, open = $bindable(defaultOpen), onOpenChange, ...rest }: Props = $props();
  const contentId = `kumo-sidebar-collapsible-${Math.random().toString(36).slice(2)}`;
  const context = {
    get open() {
      return open;
    },
    get contentId() {
      return contentId;
    },
    toggle() {
      open = !open;
      onOpenChange?.(open);
    }
  };
  setContext('kumo-sidebar-collapsible', context);
</script>

<div data-sidebar="collapsible" data-open={open ? '' : undefined} class={cn('min-w-0', className)} {...rest}>
  {@render children?.()}
</div>
