<script lang="ts">
  import {
    Sidebar,
    SidebarCollapsibleRoot,
    SidebarCollapsibleContent,
    SidebarCollapsibleTrigger,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuChevron,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarProvider,
    SidebarTrigger
  } from '$lib/components/sidebar';
  import Scenario from '$lib/vrt/Scenario.svelte';
  import { Code, Globe, House } from 'phosphor-svelte';
</script>

{#snippet sidebarNav()}
  <Sidebar.Header>
    <span class="truncate text-sm font-medium">Design Engineering</span>
  </Sidebar.Header>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Overview</Sidebar.GroupLabel>
      <Sidebar.Menu>
        <Sidebar.MenuButton icon={House} active tooltip="Account home">Account home</Sidebar.MenuButton>
        <Sidebar.MenuButton icon={Globe} tooltip="Domains">Domains</Sidebar.MenuButton>
      </Sidebar.Menu>
    </Sidebar.Group>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Build</Sidebar.GroupLabel>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <SidebarCollapsibleRoot>
            <SidebarCollapsibleTrigger>
              <Sidebar.MenuButton icon={Code}>
                Compute
                <Sidebar.MenuChevron />
              </Sidebar.MenuButton>
            </SidebarCollapsibleTrigger>
            <SidebarCollapsibleContent>
              <Sidebar.MenuSub>
                <Sidebar.MenuSubButton active>Workers & Pages</Sidebar.MenuSubButton>
                <Sidebar.MenuSubButton>
                  Durable Objects
                  <Sidebar.MenuBadge>Beta</Sidebar.MenuBadge>
                </Sidebar.MenuSubButton>
              </Sidebar.MenuSub>
            </SidebarCollapsibleContent>
          </SidebarCollapsibleRoot>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer>
    <Sidebar.Trigger />
  </Sidebar.Footer>
{/snippet}

<Scenario id="expanded" label="expanded">
  <div class="sidebar-vrt-host">
    <SidebarProvider contained defaultOpen>
      <Sidebar>{@render sidebarNav()}</Sidebar>
    </SidebarProvider>
  </div>
</Scenario>

<Scenario id="collapsed" label="collapsed icon">
  <div class="sidebar-vrt-host">
    <SidebarProvider contained defaultOpen={false}>
      <Sidebar>{@render sidebarNav()}</Sidebar>
    </SidebarProvider>
  </div>
</Scenario>

<!-- The `expanded` scenario already renders the menu + expanded submenu. Hover
     and submenu-toggle interactions on the full-height sidebar are redundant and
     slow to capture, so they are intentionally omitted from VRT. -->

<style>
  .sidebar-vrt-host {
    position: relative;
    width: 16.25rem;
    height: 28rem;
    overflow: hidden;
    border: 1px solid var(--border-color-kumo-line, #e5e5e5);
  }

  .sidebar-vrt-host :global([data-sidebar-wrapper]) {
    min-height: 100%;
    height: 100%;
  }

  .sidebar-vrt-host :global([data-sidebar='sidebar']) {
    height: 100%;
  }
</style>
