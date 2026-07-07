<script lang="ts">
  import * as echarts from 'echarts';
  import { ChoroplethMap, type MapGeoJson } from 'kumo-svelte';

  const regions: MapGeoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'North' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-130, 20],
              [-40, 20],
              [-40, 72],
              [-130, 72],
              [-130, 20]
            ]
          ]
        }
      },
      {
        type: 'Feature',
        properties: { name: 'South' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-80, -55],
              [-35, -55],
              [-35, 10],
              [-80, 10],
              [-80, -55]
            ]
          ]
        }
      },
      {
        type: 'Feature',
        properties: { name: 'East' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [20, -35],
              [150, -35],
              [150, 55],
              [20, 55],
              [20, -35]
            ]
          ]
        }
      }
    ]
  };

  const data = [
    { region: 'North', requests: 128000 },
    { region: 'South', requests: 42000 },
    { region: 'East', requests: 92000 }
  ];
</script>

<div class="w-full min-w-[280px] max-w-2xl">
  <ChoroplethMap
    {echarts}
    geoJson={regions}
    mapName="demo-regions"
    {data}
    name="region"
    value="requests"
    showLegend
    valueFormat={(value) => `${value.toLocaleString()} requests`}
  />
</div>
