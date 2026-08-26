<script lang="ts">
  import { LayerCard } from '$lib/components/layer-card';
  import Scenario from '$lib/vrt/Scenario.svelte';
</script>

<Scenario id="simple" label="simple surface">
  <LayerCard class="p-4">Get started with Kumo</LayerCard>
</Scenario>

<Scenario id="layered" label="layered sections">
  <LayerCard class="max-w-sm">
    <LayerCard.Secondary>Next Steps</LayerCard.Secondary>
    <LayerCard.Primary>Get started with Kumo</LayerCard.Primary>
  </LayerCard>
</Scenario>

<Scenario id="layered-content" label="layered with content">
  <LayerCard class="max-w-sm">
    <LayerCard.Secondary>Getting Started</LayerCard.Secondary>
    <LayerCard.Primary>
      <p class="font-medium text-kumo-default">Quick start guide</p>
      <p class="text-sm text-kumo-subtle">Follow the steps to deploy your first worker.</p>
    </LayerCard.Primary>
  </LayerCard>
</Scenario>

<Scenario id="multiple" label="multiple cards">
  <div class="flex flex-col gap-4">
    <LayerCard class="p-4">Simple card one</LayerCard>
    <LayerCard class="max-w-sm">
      <LayerCard.Secondary>Section</LayerCard.Secondary>
      <LayerCard.Primary>Layered card two</LayerCard.Primary>
    </LayerCard>
  </div>
</Scenario>
