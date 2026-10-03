<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { cn } from '#lib/utils/cn.js';

  interface Props {
    icon: Component;
    active?: boolean;
    tooltip?: string;
    collapsed?: boolean;
    children?: Snippet;
  }

  let { icon: Icon, active = false, tooltip, collapsed = false, children }: Props = $props();
</script>

<li class="relative">
  <button
    class={cn(
      'group/menu-button flex min-h-[34px] w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-kumo-default transition-[color,background-color,padding] duration-0 ease-[cubic-bezier(0.77,0,0.175,1)] group-data-[state=collapsed]/sidebar:px-2',
      !active && 'hover:bg-kumo-tint',
      active && 'bg-kumo-tint'
    )}
    title={collapsed ? tooltip : undefined}
  >
    <Icon class="size-4 shrink-0 text-kumo-subtle" />
    <span class="flex min-w-0 flex-1 items-center overflow-hidden text-left group-data-[state=collapsed]/sidebar:hidden">
      {@render children?.()}
    </span>
  </button>
</li>
