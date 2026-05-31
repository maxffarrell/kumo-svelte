<script lang="ts">
  import {
    Bell,
    CaretRight,
    CaretUpDown,
    ChartBar,
    Check,
    Cloud,
    Code,
    Database,
    Flask,
    Gear,
    Globe,
    House,
    Lock,
    MagnifyingGlass,
    Rocket,
    ShieldCheck,
    SidebarSimple
  } from 'phosphor-svelte';
  import { cn } from '$lib/utils/cn';
  import DemoBadge from './sidebar-demo-parts/DemoBadge.svelte';
  import DemoMenuButton from './sidebar-demo-parts/DemoMenuButton.svelte';
  import DemoMenuSub from './sidebar-demo-parts/DemoMenuSub.svelte';
  import DemoMenuSubButton from './sidebar-demo-parts/DemoMenuSubButton.svelte';
  import DemoSidebarGroup from './sidebar-demo-parts/DemoSidebarGroup.svelte';

  type Demo = 'basic' | 'collapsible' | 'toggle' | 'full' | 'resizable' | 'right';

  interface Props {
    demo?: Demo;
  }

  let { demo = 'basic' }: Props = $props();
  let collapsed = $state(false);
  let overviewOpen = $state(true);
  let buildOpen = $state(true);
  let protectOpen = $state(true);
  let width = $state(240);
  let accountMenuOpen = $state(false);
  let activeAccount = $state({ id: '1', name: 'Acme Inc', icon: Cloud });

  const accounts = [
    { id: '1', name: 'Acme Inc', icon: Cloud },
    { id: '2', name: 'Personal', icon: Rocket },
    { id: '3', name: 'Staging', icon: Flask }
  ];

  const sidebarStyle = $derived(demo === 'resizable' && !collapsed ? `width: ${width}px` : undefined);
  const isCollapsed = $derived(collapsed && demo !== 'right');
  const ActiveAccountIcon = $derived(activeAccount.icon);

  const toggle = () => {
    collapsed = !collapsed;
  };

  const resize = () => {
    width = width === 240 ? 320 : 240;
  };
</script>

<div class="relative h-[540px] w-full overflow-hidden rounded-lg border border-kumo-hairline bg-kumo-base">
  <div class={cn('flex h-full w-full', demo === 'right' && 'flex-row-reverse')} data-state={isCollapsed ? 'collapsed' : 'expanded'}>
    <aside
      class={cn(
        'group/sidebar relative flex h-full shrink-0 grow-0 flex-col overflow-hidden whitespace-nowrap bg-kumo-base text-kumo-default transition-[width] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]',
        demo === 'right' ? 'border-l border-kumo-hairline' : 'border-r border-kumo-hairline',
        isCollapsed ? 'w-12' : 'w-64'
      )}
      style={sidebarStyle}
      data-state={isCollapsed ? 'collapsed' : 'expanded'}
    >
      {#if demo === 'toggle' || demo === 'resizable'}
        <div class="flex items-center gap-2 overflow-hidden border-b border-kumo-hairline px-2 py-3 group-data-[state=collapsed]/sidebar:border-b-0">
          <div class="flex w-full min-w-0 items-center gap-2 px-3 transition-[padding] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] group-data-[state=collapsed]/sidebar:px-2">
            <div class="size-4 shrink-0 rounded bg-kumo-brand"></div>
            <span class="truncate text-sm font-semibold text-kumo-strong group-data-[state=collapsed]/sidebar:hidden">Acme Inc</span>
          </div>
        </div>
      {:else if demo === 'full'}
        <div class="relative flex items-center gap-2 overflow-visible border-b border-kumo-hairline px-2 py-3">
          <button
            class="flex w-full min-w-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-kumo-default outline-none transition-[color,background-color,padding] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] hover:bg-kumo-tint focus-visible:ring-1 focus-visible:ring-kumo-hairline"
            aria-haspopup="menu"
            aria-expanded={accountMenuOpen}
            onclick={() => (accountMenuOpen = !accountMenuOpen)}
          >
            <ActiveAccountIcon class="size-4 shrink-0 text-kumo-brand" weight="fill" />
            <span class="flex-1 truncate text-left font-semibold text-kumo-strong">{activeAccount.name}</span>
            <CaretUpDown class="size-4 shrink-0 text-kumo-subtle" />
          </button>
          {#if accountMenuOpen}
            <div class="absolute left-2 right-2 top-[calc(100%-0.5rem)] z-20 rounded-lg border border-kumo-hairline bg-kumo-base p-1 text-sm text-kumo-default shadow-lg">
              {#each accounts as account (account.id)}
                <button
                  class="flex min-h-[34px] w-full items-center gap-2 rounded-md px-2 py-1 text-left hover:bg-kumo-tint"
                  role="menuitem"
                  onclick={() => {
                    activeAccount = account;
                    accountMenuOpen = false;
                  }}
                >
                  <account.icon class="size-4 text-kumo-brand" weight="fill" />
                  <span>{account.name}</span>
                  {#if account.id === activeAccount.id}
                    <Check class="ml-auto size-4" />
                  {/if}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <div class="flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden px-2 py-2 group-data-[state=collapsed]/sidebar:gap-0 group-data-[state=collapsed]/sidebar:py-0">
        {#if demo === 'full'}
          <div class="px-1 pb-2">
            <button class="flex w-full items-center gap-2 rounded-lg bg-kumo-base px-3 py-2 text-sm text-kumo-subtle ring ring-kumo-hairline hover:bg-kumo-overlay">
              <MagnifyingGlass class="size-4 shrink-0" />
              <span class="flex-1 truncate text-left">Quick search...</span>
              <kbd class="ml-auto font-sans text-xs">⌘K</kbd>
            </button>
          </div>
        {/if}

        {#if demo === 'right'}
          <DemoSidebarGroup label="Details" open={overviewOpen}>
            <DemoMenuButton icon={Gear} active>Properties</DemoMenuButton>
            <DemoMenuButton icon={ChartBar}>Metrics</DemoMenuButton>
            <DemoMenuButton icon={Bell}>Alerts</DemoMenuButton>
          </DemoSidebarGroup>
        {:else if demo === 'toggle'}
          <DemoSidebarGroup label="" open>
            <DemoMenuButton icon={House} tooltip="Home" collapsed={isCollapsed} active>Home</DemoMenuButton>
            <DemoMenuButton icon={ChartBar} tooltip="Analytics" collapsed={isCollapsed}>Analytics</DemoMenuButton>
            <DemoMenuButton icon={Code} tooltip="Compute" collapsed={isCollapsed}>Compute</DemoMenuButton>
            <DemoMenuButton icon={Database} tooltip="Storage" collapsed={isCollapsed}>Storage</DemoMenuButton>
          </DemoSidebarGroup>
        {:else if demo === 'resizable'}
          <DemoSidebarGroup label="Overview" open>
            <DemoMenuButton icon={House} active>Home</DemoMenuButton>
            <DemoMenuButton icon={ChartBar}>Analytics</DemoMenuButton>
            <DemoMenuButton icon={Database}>Storage</DemoMenuButton>
          </DemoSidebarGroup>
        {:else}
          <DemoSidebarGroup label="Overview" collapsible={demo === 'collapsible'} open={overviewOpen} onToggle={() => (overviewOpen = !overviewOpen)}>
            <DemoMenuButton icon={House} active tooltip="Home" collapsed={isCollapsed}>Home</DemoMenuButton>
            <DemoMenuButton icon={ChartBar} tooltip="Analytics" collapsed={isCollapsed}>Analytics{demo === 'full' ? ' & Logs' : ''}</DemoMenuButton>
            <DemoMenuButton icon={Globe} tooltip="Domains" collapsed={isCollapsed}>Domains</DemoMenuButton>
          </DemoSidebarGroup>

          {#if demo === 'full'}
            <hr class="mx-2 h-px min-h-px border-0 bg-kumo-hairline" />
          {/if}

          {#if demo === 'basic'}
            <DemoSidebarGroup label="Build">
              <DemoMenuButton icon={Code}>Compute <CaretRight class="ml-auto size-4 shrink-0 rotate-90 text-kumo-subtle group-data-[state=collapsed]/sidebar:hidden" /></DemoMenuButton>
              <DemoMenuSub>
                <DemoMenuSubButton>Workers & Pages</DemoMenuSubButton>
                <DemoMenuSubButton>Durable Objects</DemoMenuSubButton>
              </DemoMenuSub>
              <DemoMenuButton icon={Database}>Storage</DemoMenuButton>
            </DemoSidebarGroup>
          {:else}
            <DemoSidebarGroup label="Build" collapsible={demo === 'collapsible'} open={buildOpen} onToggle={() => (buildOpen = !buildOpen)}>
              <DemoMenuButton icon={Code} tooltip="Compute" collapsed={isCollapsed}>Compute {#if demo === 'full'}<CaretRight class="ml-auto size-4 shrink-0 rotate-90 text-kumo-subtle transition-transform duration-200" />{/if}</DemoMenuButton>
              {#if demo === 'full'}
                <DemoMenuSub>
                  <DemoMenuSubButton>Workers & Pages</DemoMenuSubButton>
                  <DemoMenuSubButton>Durable Objects</DemoMenuSubButton>
                  <DemoMenuSubButton>Containers <DemoBadge>Beta</DemoBadge></DemoMenuSubButton>
                </DemoMenuSub>
              {/if}
              <DemoMenuButton icon={Database} tooltip="Storage" collapsed={isCollapsed}>Storage</DemoMenuButton>
            </DemoSidebarGroup>
          {/if}

          {#if demo === 'collapsible' || demo === 'full'}
            <DemoSidebarGroup label="Protect & Connect" collapsible={demo === 'collapsible'} open={protectOpen} onToggle={() => (protectOpen = !protectOpen)}>
              <DemoMenuButton icon={ShieldCheck}>Security</DemoMenuButton>
              <DemoMenuButton icon={Lock}>Zero Trust {#if demo === 'full'}<DemoBadge>Beta</DemoBadge>{/if}</DemoMenuButton>
            </DemoSidebarGroup>
          {/if}
        {/if}
      </div>

      {#if demo === 'toggle' || demo === 'resizable' || demo === 'full'}
        <div class="flex min-w-0 flex-col gap-2 border-t border-kumo-hairline px-2 py-2 group-data-[state=collapsed]/sidebar:border-t-0 group-data-[state=collapsed]/sidebar:py-1">
          {#if demo === 'full'}
            <DemoMenuButton icon={Gear}>Manage account</DemoMenuButton>
          {:else}
            <button class="flex items-center rounded-md p-1.5 text-kumo-subtle transition-colors hover:bg-kumo-overlay hover:text-kumo-default" aria-label="Toggle sidebar" onclick={toggle}>
              <SidebarSimple class="size-5" />
            </button>
          {/if}
        </div>
      {/if}

      {#if demo === 'resizable'}
        <button class="absolute inset-y-0 right-0 z-20 hidden w-1 cursor-col-resize transition-colors hover:bg-kumo-brand/30 sm:block" aria-label="Resize sidebar" onclick={resize}></button>
      {/if}
    </aside>

    <main class="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-kumo-subtle">
      {#if demo === 'toggle'}
        <button class="rounded-lg border border-kumo-hairline bg-kumo-base px-3 py-1.5 text-sm text-kumo-default transition-colors hover:bg-kumo-tint" onclick={toggle}>
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
        <p class="text-sm">Click the button or the sidebar trigger to toggle</p>
      {:else if demo === 'resizable'}
        <p class="text-sm">Click the sidebar edge to resize</p>
      {:else}
        Main content area
      {/if}
    </main>
  </div>
</div>
