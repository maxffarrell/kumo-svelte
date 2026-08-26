<script lang="ts">
  import { Empty } from '$lib/components/empty';
  import { Button } from '$lib/components/button';
  import { Package } from 'phosphor-svelte';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

{#snippet packageIcon()}
  <Package size={48} class="text-kumo-subtle" />
{/snippet}

<Scenario id="default" label="default">
  <Empty title="No results found" description="Try adjusting your search filters." />
</Scenario>

<Scenario id="with-icon" label="with icon">
  <Empty
    title="No packages found"
    description="Get started by installing your first package."
    icon={packageIcon}
  />
</Scenario>

<Scenario id="with-action" label="with action">
  <Empty title="No workers deployed" description="Deploy your first worker to get started.">
    {#snippet contents()}
      <Button variant="primary">Deploy worker</Button>
    {/snippet}
  </Empty>
</Scenario>

<Scenario id="with-command" label="with command line">
  <Empty
    title="Install Kumo"
    description="Run the command below to add Kumo to your project."
    commandLine="npm install @cloudflare/kumo"
  />
</Scenario>

<Scenario id="size-sm" label="size sm">
  <Empty size="sm" title="No items" description="Add your first item." />
</Scenario>

<Scenario id="size-lg" label="size lg">
  <Empty size="lg" title="Nothing here yet" description="This page is empty." />
</Scenario>

<Scenario id="full" label="icon action command">
  <Empty
    size="lg"
    title="No packages found"
    description="Get started by installing your first package."
    commandLine="npm install @cloudflare/kumo"
    icon={packageIcon}
  >
    {#snippet contents()}
      <Button variant="primary">Browse packages</Button>
    {/snippet}
  </Empty>
</Scenario>
