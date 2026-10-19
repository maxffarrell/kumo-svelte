<script lang="ts">
  import { menuRowClasses, autoInsetClasses } from './styles';
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    inset?: boolean;
    icon?: Component;
    iconSnippet?: Snippet<[{ class: string }]>;
    value: string;
    [key: string]: unknown;
  }

  let { children, class: className, inset = false, icon: Icon, iconSnippet, value, ...rest }: Props = $props();
</script>

<DropdownMenuPrimitive.RadioItem
  {value}
  data-kumo-component="DropdownMenu"
  data-kumo-part="radio-item"
  class={cn(
    menuRowClasses, 'group/radio-item',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-kumo-tint',
    inset && 'pl-8',
    className
  )}
  {...rest}
>
  {#if iconSnippet || Icon}<span data-kumo-part="icon" class="inline-flex shrink-0 items-center">{#if iconSnippet}{@render iconSnippet({ class: "h-4 w-4" })}{:else if Icon}<Icon class="h-4 w-4" />{/if}</span>{/if}
  {@render children?.()}
</DropdownMenuPrimitive.RadioItem>
