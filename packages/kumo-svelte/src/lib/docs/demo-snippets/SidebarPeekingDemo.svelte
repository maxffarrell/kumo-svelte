<script lang="ts">
  import { ChartBar, Gear, House } from 'phosphor-svelte';
</script>

<div class="h-[320px] overflow-hidden rounded-md border border-kumo-line">
  <div class="group/demo flex h-full w-full bg-kumo-base">
    <aside
      class="group/sidebar relative h-full w-14 shrink-0 overflow-hidden border-r border-kumo-line bg-kumo-base text-kumo-default transition-[width] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] hover:w-64 focus-within:w-64"
      data-state="collapsed"
    >
      <div class="flex h-[58px] items-center gap-2 overflow-hidden border-b border-kumo-line px-3.5">
        <div class="size-5 shrink-0 rounded bg-kumo-brand"></div>
        <div class="truncate text-sm font-semibold text-kumo-strong opacity-0 transition-opacity group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100">
          Account
        </div>
      </div>
      <div class="px-3.5 py-[13px]">
        <div class="my-3 border-b border-kumo-line group-hover/sidebar:hidden group-focus-within/sidebar:hidden"></div>
        <div class="truncate px-3 pt-4 pb-2 text-sm font-medium text-kumo-subtle opacity-0 transition-opacity group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100">
          Overview
        </div>
        <nav class="flex flex-col gap-y-px">
          <button class="flex min-h-8.5 w-full items-center gap-2.5 rounded-lg bg-kumo-tint px-3 text-sm font-medium text-kumo-default">
            <House class="size-4 shrink-0 opacity-50" />
            <span class="truncate opacity-0 transition-opacity group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100">Home</span>
          </button>
          <button class="flex min-h-8.5 w-full items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-kumo-default hover:bg-kumo-tint">
            <ChartBar class="size-4 shrink-0 opacity-50" />
            <span class="truncate opacity-0 transition-opacity group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100">Analytics</span>
          </button>
          <button class="flex min-h-8.5 w-full items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-kumo-default hover:bg-kumo-tint">
            <Gear class="size-4 shrink-0 opacity-50" />
            <span class="truncate opacity-0 transition-opacity group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100">Settings</span>
          </button>
        </nav>
      </div>
    </aside>
    <main class="flex-1 bg-kumo-base p-4 text-sm text-kumo-subtle">Hover or focus the collapsed sidebar.</main>
  </div>
</div>
