<script lang="ts">
  import {
    SidebarCollapsibleRoot,
    SidebarCollapsibleContent,
    SidebarCollapsibleTrigger,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuChevron,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarProvider
  } from '$lib/components/sidebar';

  interface Props {
    defaultOpen?: boolean;
  }

  let { defaultOpen = false }: Props = $props();
</script>

{#snippet buttonChildren()}
  Compute
  {@render SidebarMenuChevron({})}
{/snippet}

{#snippet triggerChildren()}
  {@render SidebarMenuButton({ children: buttonChildren })}
{/snippet}

{#snippet subButtonChildren()}
  Workers
{/snippet}

{#snippet subChildren()}
  {@render SidebarMenuSubButton({ children: subButtonChildren })}
{/snippet}

{#snippet contentChildren()}
  {@render SidebarMenuSub({ children: subChildren })}
{/snippet}

{#snippet collapsibleChildren()}
  {@render SidebarCollapsibleTrigger({ children: triggerChildren })}
  {@render SidebarCollapsibleContent({ 'data-testid': 'collapsible-content', children: contentChildren })}
{/snippet}

{#snippet itemChildren()}
  {@render SidebarCollapsibleRoot({ defaultOpen, children: collapsibleChildren })}
{/snippet}

{#snippet menuChildren()}
  {@render SidebarMenuItem({ children: itemChildren })}
{/snippet}

{#snippet sidebarContentChildren()}
  {@render SidebarMenu({ children: menuChildren })}
{/snippet}

{#snippet providerChildren()}
  {@render SidebarContent({ children: sidebarContentChildren })}
{/snippet}

{@render SidebarProvider({ defaultOpen: true, children: providerChildren })}
