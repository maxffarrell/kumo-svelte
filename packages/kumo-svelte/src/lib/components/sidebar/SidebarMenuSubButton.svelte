<script lang="ts">
  import type { Snippet } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { getSidebarMenuSubItemContext } from './context';
  interface Props { children?: Snippet; class?: string; active?: boolean; href?: string; [key: string]: unknown; }
  let { children, class: className, active = false, href, ...rest }: Props = $props();
  const menuSubItem = getSidebarMenuSubItemContext();
  const classes = $derived(
    cn(
      'group/menu-button relative flex min-h-8.5 w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-0 text-sm font-medium text-kumo-default outline-none transition-[color] duration-150',
      !active && 'hover:bg-(--sidebar-active-bg)',
      active && 'bg-(--sidebar-active-bg)',
      'focus:outline-none focus-visible:bg-(--sidebar-active-bg) focus-visible:text-kumo-strong',
      className
    )
  );
</script>

{#snippet control()}
  {#if href}
    <a class={cn(classes, 'no-underline!')} {href} data-active={active || undefined} data-sidebar="menu-sub-button" data-kumo-component="Sidebar" data-kumo-part="menu-sub-button-link" {...rest}>
      <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">{@render children?.()}</span>
    </a>
  {:else}
    <button type="button" class={classes} data-active={active || undefined} data-sidebar="menu-sub-button" data-kumo-component="Sidebar" data-kumo-part="menu-sub-button" {...rest}>
      <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">{@render children?.()}</span>
    </button>
  {/if}
{/snippet}

{#if menuSubItem?.insideMenuSubItem}
  {@render control()}
{:else}
  <li data-sidebar="menu-sub-item" class="relative">
    {@render control()}
  </li>
{/if}
