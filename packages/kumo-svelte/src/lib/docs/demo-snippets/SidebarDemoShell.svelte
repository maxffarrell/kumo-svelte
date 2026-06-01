<script lang="ts">
  import type { Snippet } from 'svelte';
  import { DropdownMenu, Sidebar } from 'kumo-svelte';
  import {
    ArrowLeft,
    ArrowsLeftRight,
    Bell,
    CaretUpDown,
    ChartBar,
    Check,
    Code,
    Cube,
    Database,
    Flask,
    Gear,
    Globe,
    House,
    Lock,
    MagnifyingGlass,
    ShieldCheck,
    Stack,
    User
  } from 'phosphor-svelte';

  type Demo = 'basic' | 'collapsible' | 'toggle' | 'full' | 'resizable' | 'right' | 'peeking' | 'sliding';

  interface Props {
    demo?: Demo;
  }

  let { demo = 'basic' }: Props = $props();
  let open = $state(true);
  let surface = $state<'account' | 'zone' | 'domain'>('account');
  let selectedAccount = $state({ id: '1', name: 'Company', icon: Cube });

  const accounts = [
    { id: '1', name: 'Company', icon: Cube },
    { id: '2', name: 'Personal', icon: Stack },
    { id: '3', name: 'Staging', icon: Flask }
  ];

  const providerProps = $derived({
    contained: true,
    defaultOpen: true,
    side: demo === 'right' ? 'right' as const : 'left' as const,
    resizable: demo === 'resizable',
    defaultWidth: 240,
    minWidth: 180,
    maxWidth: 400,
    peekable: demo === 'full' || demo === 'peeking'
  });

  const ActiveAccountIcon = $derived(selectedAccount.icon);
</script>

{#snippet demoMain(children?: Snippet)}
  <main class="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-base text-kumo-subtle">
    {#if children}
      {@render children()}
    {:else}
      Main content area
    {/if}
  </main>
{/snippet}

{#snippet brandLogo()}
  <div class="flex w-full min-w-0 items-center gap-2 px-3 transition-[padding] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) group-data-[state=collapsed]/sidebar:px-2">
    <Cube class="size-4 shrink-0 text-kumo-brand" weight="duotone" />
    <span class="flex-1 truncate text-sm font-semibold text-kumo-strong">Company</span>
  </div>
{/snippet}

{#snippet accountSwitcher()}
  <DropdownMenu>
    <DropdownMenu.Trigger class="flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-kumo-default outline-none transition-[padding] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) hover:bg-kumo-tint focus-visible:ring-1 focus-visible:ring-kumo-line group-data-[state=collapsed]/sidebar:px-1.5">
      <ActiveAccountIcon class="size-4 shrink-0 text-kumo-brand" weight="duotone" />
      <span class="flex min-w-0 flex-1 items-center overflow-hidden text-left">{selectedAccount.name}</span>
      <span class="w-4 shrink-0 overflow-hidden transition-[width] duration-(--sidebar-animation-duration) ease-(--sidebar-easing) group-data-[state=collapsed]/sidebar:w-0">
        <CaretUpDown class="size-4 text-kumo-subtle" />
      </span>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-(--anchor-width)">
      {#each accounts as account (account.id)}
        {@const AccountIcon = account.icon}
        <DropdownMenu.Item class="gap-2 cursor-pointer" onclick={() => (selectedAccount = account)}>
          <AccountIcon class="mr-2 size-4 text-kumo-brand" weight="duotone" />
          {account.name}
          {#if account.id === selectedAccount.id}
            <Check class="ml-auto size-4" />
          {/if}
        </DropdownMenu.Item>
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu>
{/snippet}

{#snippet computeMenu(includeBadge = false)}
  <Sidebar.MenuItem>
    <Sidebar.Collapsible defaultOpen>
      <Sidebar.CollapsibleTrigger
        class="group/menu-button relative flex min-h-8.5 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg px-3 py-0 text-sm font-medium text-kumo-default outline-none transition-[color,background-color,box-shadow,outline] duration-(--sidebar-animation-duration) hover:bg-kumo-tint focus:outline-none focus-visible:bg-kumo-tint focus-visible:text-kumo-strong"
      >
        <span class="flex min-w-0 flex-1 items-center gap-3 translate-x-[-3px] transition-transform duration-(--sidebar-animation-duration) group-not-data-[state=collapsed]/sidebar:translate-x-0">
          <Code class="size-4 shrink-0 opacity-50" />
          <span class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">
            Compute
            <Sidebar.MenuChevron />
          </span>
        </span>
      </Sidebar.CollapsibleTrigger>
      <Sidebar.CollapsibleContent>
        <Sidebar.MenuSub>
          <Sidebar.MenuSubItem>
            <Sidebar.Collapsible defaultOpen={false}>
              <Sidebar.CollapsibleTrigger
                class="relative flex min-h-8.5 w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-0 text-sm font-medium text-kumo-default outline-none transition-colors duration-150 hover:bg-kumo-tint focus:outline-none focus-visible:bg-kumo-tint focus-visible:text-kumo-strong"
              >
                <span class="flex min-w-0 flex-1 items-center gap-2 truncate text-left">
                  Workers & Pages
                  <Sidebar.MenuChevron />
                </span>
              </Sidebar.CollapsibleTrigger>
              <Sidebar.CollapsibleContent>
                <Sidebar.MenuSub>
                  <Sidebar.MenuSubButton>Overview</Sidebar.MenuSubButton>
                  <Sidebar.MenuSubButton>Workers</Sidebar.MenuSubButton>
                  <Sidebar.MenuSubButton>Pages</Sidebar.MenuSubButton>
                </Sidebar.MenuSub>
              </Sidebar.CollapsibleContent>
            </Sidebar.Collapsible>
          </Sidebar.MenuSubItem>
          <Sidebar.MenuSubButton>Durable Objects</Sidebar.MenuSubButton>
          {#if includeBadge}
            <Sidebar.MenuSubButton>
              Containers
              <Sidebar.MenuBadge>Beta</Sidebar.MenuBadge>
            </Sidebar.MenuSubButton>
          {/if}
        </Sidebar.MenuSub>
      </Sidebar.CollapsibleContent>
    </Sidebar.Collapsible>
  </Sidebar.MenuItem>
{/snippet}

{#snippet accountSurface()}
  <Sidebar.Content>
    {#if demo === 'full'}
      <Sidebar.Group>
        <Sidebar.Menu>
          <Sidebar.MenuButton icon={MagnifyingGlass} tooltip="Search" class="ring ring-kumo-line group-data-[state=collapsed]/sidebar:ring-transparent">
            Quick search...
          </Sidebar.MenuButton>
        </Sidebar.Menu>
      </Sidebar.Group>
    {/if}

    <Sidebar.Group>
      {#if demo !== 'toggle' && demo !== 'full' && demo !== 'peeking'}<Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>{/if}
      <Sidebar.Menu>
        <Sidebar.MenuButton icon={House} tooltip="Home" active>Home</Sidebar.MenuButton>
        <Sidebar.MenuButton icon={ChartBar} tooltip="Analytics">{demo === 'full' ? 'Analytics & Logs' : 'Analytics'}</Sidebar.MenuButton>
        {#if demo === 'toggle' || demo === 'resizable' || demo === 'peeking'}
          {#if demo === 'toggle' || demo === 'peeking'}<Sidebar.MenuButton icon={Code} tooltip="Compute">Compute</Sidebar.MenuButton>{/if}
          <Sidebar.MenuButton icon={Database} tooltip="Storage">Storage</Sidebar.MenuButton>
        {:else}
          <Sidebar.MenuButton icon={Globe} tooltip="Domains" onclick={() => demo === 'full' && (surface = 'domain')}>Domains</Sidebar.MenuButton>
        {/if}
      </Sidebar.Menu>
    </Sidebar.Group>

    {#if demo === 'basic' || demo === 'full'}
      <Sidebar.Group>
        <Sidebar.GroupLabel>Build</Sidebar.GroupLabel>
        <Sidebar.Menu>
          {@render computeMenu(demo === 'full')}
          <Sidebar.MenuButton icon={Database}>Storage</Sidebar.MenuButton>
        </Sidebar.Menu>
      </Sidebar.Group>
    {/if}

    {#if demo === 'full'}
      <Sidebar.Group>
        <Sidebar.GroupLabel>Protect & Connect</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuButton icon={ShieldCheck}>Security</Sidebar.MenuButton>
          <Sidebar.MenuButton icon={Lock}>
            Zero Trust
            <Sidebar.MenuBadge>Beta</Sidebar.MenuBadge>
          </Sidebar.MenuButton>
        </Sidebar.Menu>
      </Sidebar.Group>
    {/if}
  </Sidebar.Content>
{/snippet}

{#snippet domainSurface()}
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.Menu>
        <Sidebar.MenuButton icon={ArrowLeft} onclick={() => (surface = 'account')}>Back</Sidebar.MenuButton>
      </Sidebar.Menu>
    </Sidebar.Group>
    <Sidebar.Group>
      <Sidebar.GroupLabel>example.com</Sidebar.GroupLabel>
      <Sidebar.Menu>
        <Sidebar.MenuButton icon={Globe} active>Overview</Sidebar.MenuButton>
        <Sidebar.MenuButton icon={ShieldCheck}>Security</Sidebar.MenuButton>
        <Sidebar.MenuButton icon={Lock}>SSL/TLS</Sidebar.MenuButton>
        <Sidebar.MenuButton icon={ChartBar}>Analytics</Sidebar.MenuButton>
        <Sidebar.MenuButton icon={Database}>Caching</Sidebar.MenuButton>
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
{/snippet}

<div class="relative h-[540px] w-full overflow-hidden rounded-lg border border-kumo-line bg-kumo-base">
  <Sidebar.Provider
    class="min-h-0! h-full"
    contained={providerProps.contained}
    bind:open
    defaultOpen={providerProps.defaultOpen}
    side={providerProps.side}
    resizable={providerProps.resizable}
    defaultWidth={providerProps.defaultWidth}
    minWidth={providerProps.minWidth}
    maxWidth={providerProps.maxWidth}
    peekable={providerProps.peekable}
  >
    {#if demo === 'right'}
      {@render demoMain()}
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Details</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuButton icon={Gear} active>Properties</Sidebar.MenuButton>
              <Sidebar.MenuButton icon={ChartBar}>Metrics</Sidebar.MenuButton>
              <Sidebar.MenuButton icon={Bell}>Alerts</Sidebar.MenuButton>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar>
    {:else}
      <Sidebar>
        {#if demo === 'toggle' || demo === 'resizable' || demo === 'peeking'}
          <Sidebar.Header>{@render brandLogo()}</Sidebar.Header>
        {:else if demo === 'full'}
          <Sidebar.Header>{@render accountSwitcher()}</Sidebar.Header>
        {:else if demo === 'sliding'}
          <Sidebar.Header>
            <button
              type="button"
              onclick={() => (surface = surface === 'account' ? 'zone' : 'account')}
              class="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-kumo-default transition-colors hover:bg-kumo-tint"
            >
              <ArrowsLeftRight class="size-4 shrink-0 text-kumo-brand" />
              <span class="flex-1 text-left font-semibold text-kumo-strong">{surface === 'account' ? 'Account Nav' : 'Zone Nav'}</span>
            </button>
          </Sidebar.Header>
        {/if}

        {#if demo === 'sliding'}
          <Sidebar.SlidingViews activeKey={surface} direction={surface === 'zone' ? 'left' : 'right'}>
            <Sidebar.SlidingView value="account">
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Account</Sidebar.GroupLabel>
                  <Sidebar.Menu>
                    <Sidebar.MenuButton icon={House} active>Home</Sidebar.MenuButton>
                    <Sidebar.MenuButton icon={User}>Members</Sidebar.MenuButton>
                    <Sidebar.MenuButton icon={ChartBar}>Analytics</Sidebar.MenuButton>
                    <Sidebar.MenuButton icon={Gear}>Settings</Sidebar.MenuButton>
                  </Sidebar.Menu>
                </Sidebar.Group>
              </Sidebar.Content>
            </Sidebar.SlidingView>
            <Sidebar.SlidingView value="zone">
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Zone</Sidebar.GroupLabel>
                  <Sidebar.Menu>
                    <Sidebar.MenuButton icon={Globe} active>Overview</Sidebar.MenuButton>
                    <Sidebar.MenuButton icon={ShieldCheck}>Security</Sidebar.MenuButton>
                    <Sidebar.MenuButton icon={Lock}>SSL/TLS</Sidebar.MenuButton>
                    <Sidebar.MenuButton icon={Database}>Caching</Sidebar.MenuButton>
                  </Sidebar.Menu>
                </Sidebar.Group>
              </Sidebar.Content>
            </Sidebar.SlidingView>
          </Sidebar.SlidingViews>
        {:else if demo === 'full'}
          <Sidebar.SlidingViews activeKey={surface} direction={surface === 'domain' ? 'left' : 'right'}>
            <Sidebar.SlidingView value="account">{@render accountSurface()}</Sidebar.SlidingView>
            <Sidebar.SlidingView value="domain">{@render domainSurface()}</Sidebar.SlidingView>
          </Sidebar.SlidingViews>
        {:else}
          {@render accountSurface()}
        {/if}

        {#if demo === 'toggle' || demo === 'resizable' || demo === 'full' || demo === 'peeking'}
          <Sidebar.Footer><Sidebar.Trigger /></Sidebar.Footer>
        {/if}

        {#if demo === 'resizable'}
          <Sidebar.ResizeHandle />
        {/if}
      </Sidebar>

      {#if demo === 'toggle'}
        {@render demoMain(toggleContent)}
      {:else if demo === 'resizable'}
        {@render demoMain(resizableContent)}
      {:else if demo === 'peeking'}
        {@render demoMain(peekingContent)}
      {:else if demo === 'sliding'}
        {@render demoMain(slidingContent)}
      {:else}
        {@render demoMain()}
      {/if}
    {/if}
  </Sidebar.Provider>
</div>

{#snippet toggleContent()}
  <button
    type="button"
    class="cursor-pointer rounded-lg border border-kumo-line bg-kumo-base px-3 py-1.5 text-base text-kumo-default transition-colors hover:bg-kumo-tint"
    onclick={() => (open = !open)}
  >
    {open ? 'Collapse' : 'Expand'}
  </button>
  <p>Click the button or the sidebar trigger to toggle</p>
{/snippet}

{#snippet resizableContent()}
  <p>Drag the sidebar edge to resize</p>
{/snippet}

{#snippet peekingContent()}
  <div class="flex flex-col items-center gap-2">
    <span class="font-medium text-kumo-default">State: {open ? 'Expanded' : 'Collapsed'}</span>
    <p>Collapse, then hover the sidebar to peek</p>
  </div>
{/snippet}

{#snippet slidingContent()}
  <div class="flex flex-col items-center gap-2">
    <p class="font-medium text-kumo-default">Active: {surface === 'account' ? 'Account' : 'Zone'} surface</p>
    <p>Click the header button to slide between views</p>
  </div>
{/snippet}
