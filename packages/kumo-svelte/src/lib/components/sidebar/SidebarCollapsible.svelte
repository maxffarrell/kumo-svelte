<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  interface Props {
    children?: Snippet;
    class?: string;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    autoScrollOnOpen?: boolean;
    [key: string]: unknown;
  }
  let {
    children,
    class: className,
    defaultOpen = false,
    open = $bindable(defaultOpen),
    onOpenChange,
    autoScrollOnOpen = false,
    ...rest
  }: Props = $props();
  const contentId = `kumo-sidebar-collapsible-${Math.random().toString(36).slice(2)}`;
  const context = {
    get open() {
      return open;
    },
    get contentId() {
      return contentId;
    },
    get autoScrollOnOpen() {
      return autoScrollOnOpen;
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
