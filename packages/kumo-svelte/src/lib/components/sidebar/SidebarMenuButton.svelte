<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { Tooltip } from '$lib/components/tooltip';
  import { getSidebarContext, getSidebarMenuItemContext } from './context';

  interface Props {
    children?: Snippet;
    class?: string;
    icon?: Component;
    active?: boolean;
    size?: 'base' | 'sm';
    href?: string;
    target?: string;
    tooltip?: string;
    [key: string]: unknown;
  }

  let { children, class: className, icon: Icon, active = false, size = 'base', href, target, tooltip, ...rest }: Props = $props();
  const menuItem = getSidebarMenuItemContext();
  let sidebar = $state<ReturnType<typeof getSidebarContext> | undefined>();

  try {
    sidebar = getSidebarContext('Sidebar.MenuButton');
  } catch {
    sidebar = undefined;
  }

  const classes = $derived(
    cn(
      'group/menu-button relative flex w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg text-kumo-default outline-none transition-[color,box-shadow,outline] duration-(--sidebar-animation-duration)',
      'before:absolute before:inset-x-0 before:-inset-y-px',
      size === 'base' && 'min-h-8.5 px-3 py-0 text-sm font-medium',
      size === 'sm' && 'min-h-7 px-2 py-0 text-sm',
      !active && 'hover:bg-(--sidebar-active-bg)',
      active && 'bg-(--sidebar-active-bg)',
      'has-[[data-active]]:bg-transparent has-[[data-active]]:hover:bg-(--sidebar-active-bg)',
      'focus:outline-none focus-visible:bg-(--sidebar-active-bg) focus-visible:text-kumo-strong',
      className
    )
  );
  const showTooltip = $derived(Boolean(tooltip && sidebar?.state === 'collapsed' && !sidebar.peekable));
</script>

{#snippet control()}
  {#if href}
    <a
      class={cn(classes, 'no-underline!')}
      {href}
      {target}
      data-active={active || undefined}
      data-sidebar="menu-button"
      data-kumo-component="Sidebar"
      data-kumo-part="menu-button-link"
      data-size={size}
      aria-label={tooltip}
      {...rest}
    >
      <span class="flex min-w-0 flex-1 items-center gap-3 translate-x-[-3px] transition-transform duration-(--sidebar-animation-duration) group-not-data-[state=collapsed]/sidebar:translate-x-0">
        {#if Icon}<Icon class={cn('shrink-0 opacity-40', size === 'base' ? 'size-4' : 'size-3.5')} />{/if}
        <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">
          {@render children?.()}
        </span>
      </span>
    </a>
  {:else}
    <button
      type="button"
      class={classes}
      data-active={active || undefined}
      data-sidebar="menu-button"
      data-kumo-component="Sidebar"
      data-kumo-part="menu-button"
      data-size={size}
      aria-label={tooltip}
      {...rest}
    >
      <span class="flex min-w-0 flex-1 items-center gap-3 translate-x-[-3px] transition-transform duration-(--sidebar-animation-duration) group-not-data-[state=collapsed]/sidebar:translate-x-0">
        {#if Icon}<Icon class={cn('shrink-0 opacity-40', size === 'base' ? 'size-4' : 'size-3.5')} />{/if}
        <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">
          {@render children?.()}
        </span>
      </span>
    </button>
  {/if}
{/snippet}

{#snippet controlWithTooltip()}
  {#if tooltip && sidebar}
    <Tooltip content={showTooltip ? tooltip : undefined} side="right" trigger={control} />
  {:else}
    {@render control()}
  {/if}
{/snippet}

{#if menuItem?.insideMenuItem}
  {@render controlWithTooltip()}
{:else}
  <li data-sidebar="menu-item" class="relative group-data-[state=collapsed]/sidebar:overflow-hidden">
    {@render controlWithTooltip()}
  </li>
{/if}
