<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    inset?: boolean;
    icon?: Component;
    value: string;
    [key: string]: unknown;
  }

  let { children, class: className, inset = false, icon: Icon, value, ...rest }: Props = $props();
</script>

<DropdownMenuPrimitive.RadioItem
  {value}
  data-kumo-component="DropdownMenu"
  data-kumo-part="radio-item"
  class={cn(
    'relative flex cursor-default items-center rounded-md px-2 py-1.5 text-base outline-hidden select-none',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-kumo-tint',
    inset && 'pl-8',
    className
  )}
  {...rest}
>
  {#if Icon}<Icon class="mr-2 h-4 w-4" />{/if}
  {@render children?.()}
</DropdownMenuPrimitive.RadioItem>
