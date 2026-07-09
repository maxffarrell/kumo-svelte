<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { BubbleMap, type MapGeoJson } from 'kumo-svelte/components/chart';
  import { colos, fmtRequests, loadWorldGeoJson } from './map-demo-data';

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
  <BubbleMap
    {echarts}
    {geoJson}
    data={colos}
    lng="lon"
    lat="lat"
    name="city"
    value="requests"
    valueFormat={fmtRequests}
    minRadius={8}
  />
{:else if error}
  <p class="text-sm text-kumo-danger">{error}</p>
{:else}
  <p class="text-sm text-kumo-subtle">Loading map...</p>
{/if}
