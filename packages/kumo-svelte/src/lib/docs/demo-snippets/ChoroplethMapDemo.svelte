<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { ChoroplethMap, type MapGeoJson } from 'kumo-svelte/components/chart';
  import { countries, fmtRequests, loadWorldGeoJson } from './map-demo-data';

  let geoJson = $state<MapGeoJson | null>(null);
  let error = $state<string | null>(null);

  onMount(() => {
    loadWorldGeoJson()
      .then((data) => {
        geoJson = data;
      })
      .catch((cause: unknown) => {
        error = cause instanceof Error ? cause.message : 'Failed to load GeoJSON';
      });
  });
</script>

{#if geoJson}
  <ChoroplethMap
    {echarts}
    {geoJson}
    data={countries}
    name="country"
    value="requests"
    valueFormat={fmtRequests}
  />
{:else if error}
  <p class="text-sm text-kumo-danger">{error}</p>
{:else}
  <p class="text-sm text-kumo-subtle">Loading map...</p>
{/if}
