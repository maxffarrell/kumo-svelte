<script lang="ts">
  import {
    SidebarContent,
    SidebarFooter,
    SidebarProvider,
    SidebarResizeHandle,
    SidebarTrigger
  } from '$lib/components/sidebar';
  import StateReader from './StateReader.svelte';

  interface Props {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    peekable?: boolean;
    contained?: boolean;
    resizable?: boolean;
    defaultWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    showTrigger?: boolean;
    showResizeHandle?: boolean;
  }

  let {
    defaultOpen = true,
    open = $bindable(defaultOpen),
    onOpenChange,
    peekable = false,
    contained = false,
    resizable = false,
    defaultWidth = 240,
    minWidth = 180,
    maxWidth = 400,
    showTrigger = false,
    showResizeHandle = false
  }: Props = $props();
</script>

{#snippet contentChildren()}
  <StateReader />
{/snippet}

{#snippet footerChildren()}
  {@render SidebarTrigger({})}
{/snippet}

{#snippet providerChildren()}
  {@render SidebarContent({ children: contentChildren })}
  {#if showTrigger}
    {@render SidebarFooter({ children: footerChildren })}
  {/if}
  {#if showResizeHandle}
    {@render SidebarResizeHandle({ 'data-testid': 'handle' })}
  {/if}
  <div data-testid="main">Main</div>
{/snippet}

{@render SidebarProvider({
  defaultOpen,
  open,
  onOpenChange,
  peekable,
  contained,
  resizable,
  defaultWidth,
  minWidth,
  maxWidth,
  children: providerChildren
})}
