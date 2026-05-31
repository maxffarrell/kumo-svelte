<script lang="ts">
  import { ArrowLeft, ChartBar, Gear, House } from 'phosphor-svelte';

  let view = $state<'overview' | 'settings'>('overview');
</script>

<div class="h-[340px] overflow-hidden rounded-md border border-kumo-line">
  <div class="flex h-full w-full bg-kumo-base">
    <aside class="relative h-full w-64 shrink-0 overflow-hidden border-r border-kumo-line bg-kumo-base text-kumo-default">
      <div
        class="absolute inset-0 flex flex-col transition-transform duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]"
        class:translate-x-full={view !== 'overview'}
      >
        <div class="flex h-[58px] items-center border-b border-kumo-line px-3.5">
          <div class="text-sm font-semibold text-kumo-strong">Dashboard</div>
        </div>
        <div class="flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto px-3.5 py-[13px]">
          <div class="truncate px-3 pt-4 pb-2 text-sm font-medium text-kumo-subtle">Overview</div>
          <nav class="flex flex-col gap-y-px">
            <button class="flex min-h-8.5 w-full items-center gap-2.5 rounded-lg bg-kumo-tint px-3 text-sm font-medium text-kumo-default">
              <House class="size-4 shrink-0 opacity-50" />
              <span>Home</span>
            </button>
            <button class="flex min-h-8.5 w-full items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-kumo-default hover:bg-kumo-tint">
              <ChartBar class="size-4 shrink-0 opacity-50" />
              <span>Analytics</span>
            </button>
            <button
              class="flex min-h-8.5 w-full items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-kumo-default hover:bg-kumo-tint"
              onclick={() => (view = 'settings')}
            >
              <Gear class="size-4 shrink-0 opacity-50" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>
      <div
        class="absolute inset-0 flex flex-col transition-transform duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]"
        class:translate-x-full={view !== 'settings'}
      >
        <div class="flex h-[58px] items-center border-b border-kumo-line px-3.5">
          <button
            class="flex min-h-8.5 w-full items-center gap-2.5 rounded-lg px-3 text-sm font-medium text-kumo-default hover:bg-kumo-tint"
            onclick={() => (view = 'overview')}
          >
            <ArrowLeft class="size-4 shrink-0 opacity-50" />
            <span>Back</span>
          </button>
        </div>
        <div class="flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto px-3.5 py-[13px]">
          <div class="truncate px-3 pt-4 pb-2 text-sm font-medium text-kumo-subtle">Settings</div>
          <nav class="flex flex-col gap-y-px">
            <button class="flex min-h-8.5 w-full items-center rounded-lg bg-kumo-tint px-3 text-sm font-medium text-kumo-default">Profile</button>
            <button class="flex min-h-8.5 w-full items-center rounded-lg px-3 text-sm font-medium text-kumo-default hover:bg-kumo-tint">Billing</button>
          </nav>
        </div>
      </div>
    </aside>
    <main class="flex-1 bg-kumo-base p-4 text-sm text-kumo-subtle">Select Settings to slide to a nested panel.</main>
  </div>
</div>
