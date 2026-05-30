<script lang="ts">
  import { Sidebar } from 'kumo-svelte';
  import { ArrowLeft, ChartBar, Gear, House } from 'phosphor-svelte';

  let view = $state<'overview' | 'settings'>('overview');
</script>

<div class="h-[340px] overflow-hidden rounded-md border border-kumo-line">
  <Sidebar.Provider contained>
    <Sidebar>
      <Sidebar.SlidingViews activeKey={view}>
        <Sidebar.SlidingView value="overview">
          <Sidebar.Header>
            <div class="px-3 py-2 text-sm font-semibold text-kumo-strong">Dashboard</div>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
              <Sidebar.Menu>
                <Sidebar.MenuButton icon={House} active>Home</Sidebar.MenuButton>
                <Sidebar.MenuButton icon={ChartBar}>Analytics</Sidebar.MenuButton>
                <Sidebar.MenuButton icon={Gear} onclick={() => (view = 'settings')}>Settings</Sidebar.MenuButton>
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar.SlidingView>
        <Sidebar.SlidingView value="settings">
          <Sidebar.Header>
            <Sidebar.Menu>
              <Sidebar.MenuButton icon={ArrowLeft} onclick={() => (view = 'overview')}>Back</Sidebar.MenuButton>
            </Sidebar.Menu>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
              <Sidebar.Menu>
                <Sidebar.MenuButton active>Profile</Sidebar.MenuButton>
                <Sidebar.MenuButton>Billing</Sidebar.MenuButton>
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Content>
        </Sidebar.SlidingView>
      </Sidebar.SlidingViews>
    </Sidebar>
    <main class="flex-1 bg-kumo-base p-4 text-sm text-kumo-subtle">Select Settings to slide to a nested panel.</main>
  </Sidebar.Provider>
</div>
