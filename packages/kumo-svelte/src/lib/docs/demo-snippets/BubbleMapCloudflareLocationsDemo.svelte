<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { BubbleMap, type MapGeoJson } from 'kumo-svelte';
  import { cloudflareLocations, loadWorldGeoJson } from './map-demo-data';

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
    data={cloudflareLocations}
    lng="lon"
    lat="lat"
    name="city"
    value={() => 1}
    bubbleColor="#F6821F"
    minRadius={8}
    maxRadius={8}
    tooltipFormatter={(row) =>
      `<span style="font-size:12px"><strong>${row.city}</strong><span style="color:var(--text-color-kumo-subtle);margin-left:8px">${row.iata}</span></span>`}
  />
{:else if error}
  <p class="text-sm text-kumo-danger">{error}</p>
{:else}
  <p class="text-sm text-kumo-subtle">Loading map...</p>
{/if}
