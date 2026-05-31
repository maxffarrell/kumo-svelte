<script lang="ts">
  import {
    SidebarContent,
    SidebarProvider,
    SidebarSlidingView,
    SidebarSlidingViews
  } from '$lib/components/sidebar';

  interface Props {
    activeKey?: string;
  }

  let { activeKey = 'a' }: Props = $props();
</script>

{#snippet viewAContent()}
  <div data-testid="view-a">View A</div>
{/snippet}

{#snippet viewBContent()}
  <div data-testid="view-b">View B</div>
{/snippet}

{#snippet viewAChildren()}
  {@render SidebarContent({ children: viewAContent })}
{/snippet}

{#snippet viewBChildren()}
  {@render SidebarContent({ children: viewBContent })}
{/snippet}

{#snippet slidingChildren()}
  {@render SidebarSlidingView({ value: 'a', children: viewAChildren })}
  {@render SidebarSlidingView({ value: 'b', children: viewBChildren })}
{/snippet}

{#snippet providerChildren()}
  {@render SidebarSlidingViews({ activeKey, children: slidingChildren })}
{/snippet}

{@render SidebarProvider({ defaultOpen: true, children: providerChildren })}
