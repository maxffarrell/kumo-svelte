<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    children?: Snippet;
    class?: string;
    icon?: Component;
    active?: boolean;
    size?: 'base' | 'sm';
    href?: string;
    tooltip?: string;
    [key: string]: unknown;
  }

  let { children, class: className, icon: Icon, active = false, size = 'base', href, tooltip, ...rest }: Props = $props();

  const classes = $derived(
    cn(
      'group/menu-button relative flex w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg text-kumo-default outline-none transition-[color,background-color,box-shadow,outline] duration-(--sidebar-animation-duration)',
      size === 'base' && 'min-h-8.5 px-3 py-0 text-sm font-medium',
      size === 'sm' && 'min-h-7 px-2 py-0 text-sm',
      !active && 'hover:bg-kumo-tint',
      active && 'bg-kumo-tint',
      'focus:outline-none focus-visible:bg-kumo-tint focus-visible:text-kumo-strong',
      className
    )
  );
</script>

<li data-sidebar="menu-item" class="relative group-data-[state=collapsed]/sidebar:overflow-hidden">
  {#if href}
    <a
      class={cn(classes, 'no-underline!')}
      {href}
      title={tooltip}
      data-active={active || undefined}
      data-sidebar="menu-button"
      data-kumo-component="Sidebar"
      data-kumo-part="menu-button-link"
      data-size={size}
      {...rest}
    >
      <span class="flex min-w-0 flex-1 items-center gap-3">
        {#if Icon}<Icon class={cn('shrink-0 opacity-50', size === 'base' ? 'size-4' : 'size-3.5')} />{/if}
        <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">{@render children?.()}</span>
      </span>
    </a>
  {:else}
    <button
      type="button"
      class={classes}
      title={tooltip}
      data-active={active || undefined}
      data-sidebar="menu-button"
      data-kumo-component="Sidebar"
      data-kumo-part="menu-button"
      data-size={size}
      {...rest}
    >
      <span class="flex min-w-0 flex-1 items-center gap-3">
        {#if Icon}<Icon class={cn('shrink-0 opacity-50', size === 'base' ? 'size-4' : 'size-3.5')} />{/if}
        <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">{@render children?.()}</span>
      </span>
    </button>
  {/if}
</li>
