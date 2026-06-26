<script lang="ts">
  import * as echarts from 'echarts';
  import { BubbleMap, ChartPalette, type MapGeoJson } from 'kumo-svelte';

  const world: MapGeoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'world',
        properties: { name: 'World' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-170, -55],
              [170, -55],
              [170, 75],
              [-170, 75],
              [-170, -55]
            ]
          ]
        }
      }
    ]
  };

  const data = [
    { city: 'San Francisco', lat: 37.77, lon: -122.42, requests: 128000 },
    { city: 'London', lat: 51.5, lon: -0.12, requests: 96000 },
    { city: 'Singapore', lat: 1.35, lon: 103.82, requests: 72000 },
    { city: 'Sydney', lat: -33.86, lon: 151.21, requests: 48000 }
  ];
</script>

<div class="w-full min-w-[280px] max-w-2xl">
  <BubbleMap
    {echarts}
    geoJson={world}
    mapName="demo-world"
    {data}
    lng="lon"
    lat="lat"
    name="city"
    value="requests"
    bubbleColor={ChartPalette.categorical(0)}
    valueFormat={(value) => `${value.toLocaleString()} requests`}
    height={320}
  />
</div>
