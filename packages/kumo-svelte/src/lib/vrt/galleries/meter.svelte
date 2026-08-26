<script lang="ts">
  import { Meter } from '$lib/components/meter';
  import Scenario from '$lib/vrt/Scenario.svelte';

  const values = [0, 25, 50, 75, 100] as const;
</script>

{#each values as value (value)}
  <Scenario id={`value-${value}`} label={`${value}%`}>
    <Meter label="Storage used" {value} class="w-64" />
  </Scenario>
{/each}

<Scenario id="custom-value" label="custom value">
  <Meter label="API requests" value={75} customValue="750 / 1,000" class="w-64" />
</Scenario>

<Scenario id="no-value" label="hide value">
  <Meter label="Background sync" value={40} showValue={false} class="w-64" />
</Scenario>

<Scenario id="low" label="low usage">
  <Meter label="Bandwidth" value={10} class="w-64" />
</Scenario>

<Scenario id="high" label="high usage">
  <Meter label="Workers CPU" value={92} class="w-64" />
</Scenario>
