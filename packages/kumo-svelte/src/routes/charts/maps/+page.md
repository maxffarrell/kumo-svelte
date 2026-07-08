---
title: "Maps"
description: "Map chart components for visualizing geographic data with GeoJSON."
sourceFile: "components/chart"
---

<script>
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';

  const cloudflareLocationsCode = `const cloudflareLocations = [
  { city: "San Francisco", iata: "SFO", lat: 37.77, lon: -122.42 },
  { city: "London", iata: "LHR", lat: 51.51, lon: -0.13 },
  { city: "Singapore", iata: "SIN", lat: 1.35, lon: 103.82 },
  // ...more locations
];

<BubbleMap
  echarts={echarts}
  geoJson={geoJson}
  data={cloudflareLocations}
  lng="lon"
  lat="lat"
  name="city"
  value={() => 1}
  bubbleColor="#F6821F"
  minRadius={8}
  maxRadius={8}
  tooltipFormatter={(row) =>
    "<strong>" + row.city + "</strong> " + row.iata
  }
/>`;

  const usageCode = `import { BubbleMap, ChoroplethMap, type MapGeoJson } from "kumo-svelte";
import * as echarts from "echarts/core";
import { MapChart, ScatterChart } from "echarts/charts";
import { TooltipComponent, VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  MapChart,
  ScatterChart,
  TooltipComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

// Load GeoJSON in your app and pass it to map components.
const geoJson = world as MapGeoJson;

const colos = [
  { iata: "SFO", city: "San Francisco", lat: 37.77, lon: -122.42, requests: 1200 },
  { iata: "LHR", city: "London", lat: 51.5, lon: -0.12, requests: 1500 },
];

const countries = [
  { country: "United States of America", requests: 4200 },
  { country: "Germany", requests: 3100 },
];

<BubbleMap
  echarts={echarts}
  geoJson={geoJson}
  data={colos}
  lng="lon"
  lat="lat"
  name="city"
  value="requests"
/>

<ChoroplethMap
  echarts={echarts}
  geoJson={geoJson}
  data={countries}
  name="country"
  value="requests"
/>`;

  const bubbleMapCode = `<BubbleMap
  echarts={echarts}
  geoJson={geoJson}
  data={colos}
  lng="lon"
  lat="lat"
  name="city"
  value="requests"
  minRadius={8}
/>`;

  const choroplethMapCode = `<ChoroplethMap
  echarts={echarts}
  geoJson={geoJson}
  data={countries}
  name="country"
  value="requests"
/>`;

  const tooltipCode = `<BubbleMap
  echarts={echarts}
  geoJson={geoJson}
  data={colos}
  lng="lon"
  lat="lat"
  name="city"
  value="requests"
  tooltipFormatter={(row) =>
    "<strong>" + row.city + "</strong><br />" + row.requests.toLocaleString()
  }
/>`;
</script>

<ComponentSection>

<ComponentExample demo="BubbleMapCloudflareLocationsDemo" code={cloudflareLocationsCode} />

</ComponentSection>

<ComponentSection>

## Installation

<code class="text-kumo-default">BubbleMap</code> and <code class="text-kumo-default">ChoroplethMap</code> require <code class="text-kumo-default">echarts</code> as a peer dependency. Consumers provide the GeoJSON feature collection; map components do not fetch map data or use map tiles.

```bash
npm install echarts
```

### Barrel

```svelte
import { BubbleMap, ChoroplethMap } from "kumo-svelte";
```

### Granular

```svelte
import { BubbleMap, ChoroplethMap } from "kumo-svelte/components/chart";
```

</ComponentSection>

<ComponentSection>

## Usage

<CodeBlock code={usageCode} lang="svelte" />

</ComponentSection>

<ComponentSection>

## Examples

### Bubble Map

Plot raw rows by longitude and latitude. The <code class="text-kumo-default">value</code> accessor controls proportional bubble size.

<ComponentExample demo="BubbleMapDemo" code={bubbleMapCode} />

### Choropleth Map

Shade regions by value. Data rows are joined to GeoJSON features by <code class="text-kumo-default">name</code>, matched against the feature's <code class="text-kumo-default">nameProperty</code>, which defaults to <code class="text-kumo-default">"name"</code>.

<ComponentExample demo="ChoroplethMapDemo" code={choroplethMapCode} />

### Custom Tooltips

Provide <code class="text-kumo-default">tooltipFormatter</code> when the default name/value tooltip is not enough. The formatter returns HTML rendered by ECharts, so escape user-provided values.

<CodeBlock code={tooltipCode} lang="svelte" />

</ComponentSection>

<ComponentSection>

## API Reference

### BubbleMap

<PropsTable component="BubbleMap" />

### ChoroplethMap

<PropsTable component="ChoroplethMap" />

</ComponentSection>
