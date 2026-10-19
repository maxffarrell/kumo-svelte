<script lang="ts">
  import { menuRowClasses, autoInsetClasses } from './styles';
  import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
  import type { Component, Snippet } from 'svelte';
  import CaretRight from 'phosphor-svelte/lib/CaretRight';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    children?: Snippet;
    class?: string;
    inset?: boolean;
    icon?: Component;
    iconSnippet?: Snippet<[{ class: string }]>;
    [key: string]: unknown;
  }

  let { children, class: className, inset = false, icon: Icon, iconSnippet, ...rest }: Props = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
  data-kumo-component="DropdownMenu"
  data-kumo-part="submenu-trigger"
  class={cn(
    menuRowClasses,
    'px-2 py-1.5',
    'focus:bg-kumo-tint focus:ring-kumo-focus/50 focus-visible:ring-2 focus-visible:ring-kumo-brand',
    'data-[state=open]:bg-kumo-tint',
    inset && 'pl-8',
    className
  )}
  {...rest}
>
  {#if iconSnippet || Icon}<span data-kumo-part="icon" class="inline-flex shrink-0 items-center">{#if iconSnippet}{@render iconSnippet({ class: "h-4 w-4" })}{:else if Icon}<Icon class="h-4 w-4" />{/if}</span>{/if}
  {@render children?.()}
  <CaretRight class="ml-auto h-4 w-4" />
</DropdownMenuPrimitive.SubTrigger>
