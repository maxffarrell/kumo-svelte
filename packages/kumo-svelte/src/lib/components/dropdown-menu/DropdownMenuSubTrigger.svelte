<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import { CaretRight } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    inset?: boolean;
    icon?: Component;
    [key: string]: unknown;
  }

  let { children, class: className, inset = false, icon: Icon, ...rest }: Props = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
  data-kumo-component="DropdownMenu"
  data-kumo-part="submenu-trigger"
  class={cn(
    'flex cursor-default items-center rounded-sm text-base outline-hidden select-none',
    'px-2 py-1.5',
    'focus:bg-kumo-tint focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand',
    'data-[state=open]:bg-kumo-tint',
    inset && 'pl-8',
    className
  )}
  {...rest}
>
  {#if Icon}<Icon class="mr-2 h-4 w-4" />{/if}
  {@render children?.()}
  <CaretRight class="ml-auto h-4 w-4" />
</DropdownMenuPrimitive.SubTrigger>
