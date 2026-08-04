<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import CollapsiblePanel from './CollapsiblePanel.svelte';

  interface Props {
    children?: Snippet;
    class?: string;
    keepMounted?: boolean;
    forceMount?: boolean;
    hiddenUntilFound?: boolean;
    [key: string]: unknown;
  }

  let {
    children,
    class: className,
    keepMounted = false,
    forceMount = false,
    hiddenUntilFound = true,
    ...rest
  }: Props = $props();
</script>

<CollapsiblePanel
  class={cn(
    'h-[var(--bits-collapsible-content-height)] overflow-hidden transition-[height,opacity] duration-100 ease-out data-[state=closed]:h-0 data-[state=closed]:opacity-0',
    className
  )}
  {keepMounted}
  {forceMount}
  {hiddenUntilFound}
  {...rest}
>
  <div class="my-2 space-y-4 border-l-2 border-kumo-fill py-1 pr-1 pl-4">
    {@render children?.()}
  </div>
</CollapsiblePanel>
