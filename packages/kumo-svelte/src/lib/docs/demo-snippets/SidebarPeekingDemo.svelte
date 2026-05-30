<script lang="ts">
  import { Sidebar } from 'kumo-svelte';
  import { ChartBar, Gear, House } from 'phosphor-svelte';
</script>

<div class="h-[320px] overflow-hidden rounded-md border border-kumo-line">
  <Sidebar.Provider defaultOpen={false} peekable contained>
    <Sidebar>
      <Sidebar.Header>
        <div class="px-3 py-2 text-sm font-semibold text-kumo-strong">Account</div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuButton icon={House} active tooltip="Home">Home</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={ChartBar} tooltip="Analytics">Analytics</Sidebar.MenuButton>
            <Sidebar.MenuButton icon={Gear} tooltip="Settings">Settings</Sidebar.MenuButton>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar>
    <main class="flex-1 bg-kumo-base p-4 text-sm text-kumo-subtle">Hover or focus the collapsed sidebar.</main>
  </Sidebar.Provider>
</div>
