<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    sideOffset?: number;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    container?: HTMLElement | string;
    [key: string]: unknown;
  }

  let { children, class: className, sideOffset = 8, side, align, container, ...rest }: Props = $props();
</script>

<DropdownMenuPrimitive.Portal to={container}>
  <DropdownMenuPrimitive.Content
    class={cn(
      'z-50 overflow-hidden bg-kumo-control text-kumo-default',
      'max-h-[var(--bits-floating-available-height)] overflow-y-auto',
      'rounded-lg shadow-lg ring ring-kumo-line',
      'min-w-36 p-1.5',
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2',
      'data-[side=left]:slide-in-from-right-2',
      'data-[side=right]:slide-in-from-left-2',
      'data-[side=top]:slide-in-from-bottom-2',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
      className
    )}
    {sideOffset}
    {side}
    {align}
    {...rest}
  >
    {@render children?.()}
  </DropdownMenuPrimitive.Content>
</DropdownMenuPrimitive.Portal>
