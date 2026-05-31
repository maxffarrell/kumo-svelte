<script lang="ts">
  import {
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarProvider
  } from '$lib/components/sidebar';

  interface Props {
    active?: boolean;
    href?: string;
  }

  let { active = false, href }: Props = $props();
</script>

{#snippet buttonChildren()}
  Home
{/snippet}

{#snippet menuChildren()}
  {@render SidebarMenuButton({ active, href, children: buttonChildren })}
{/snippet}

{#snippet contentChildren()}
  {@render SidebarMenu({ children: menuChildren })}
{/snippet}

{#snippet providerChildren()}
  {@render SidebarContent({ children: contentChildren })}
{/snippet}

{@render SidebarProvider({ defaultOpen: true, children: providerChildren })}
