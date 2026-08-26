<script lang="ts">
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarProvider,
    SidebarTrigger
  } from './index';

  interface Props {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    peekable?: boolean;
  }

  let { defaultOpen = true, open = $bindable(), onOpenChange, peekable = false }: Props = $props();
</script>

{#if open === undefined}
  <SidebarProvider {defaultOpen} {onOpenChange} {peekable}>
    <Sidebar>
      <SidebarContent>
        <div data-testid="state-reader"></div>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
    <div data-testid="main">Main</div>
  </SidebarProvider>
{:else}
  <SidebarProvider {defaultOpen} bind:open {onOpenChange} {peekable}>
    <Sidebar>
      <SidebarContent>
        <div data-testid="state-reader"></div>
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
    <div data-testid="main">Main</div>
  </SidebarProvider>
{/if}
