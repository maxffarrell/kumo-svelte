---
title: "Charts"
description: "Charts built on ECharts."
sourceFile: "components/chart"
headings:
  - depth: 2
    slug: "available-charts"
    text: "Available Charts"
  - depth: 2
    slug: "color-system"
    text: "Color System"
  - depth: 2
    slug: "legend"
    text: "Legend"
  - depth: 3
    slug: "largeitem"
    text: "LargeItem"
  - depth: 3
    slug: "smallitem"
    text: "SmallItem"
---

<script>
  import ChartCard from '$lib/docs/ChartCard.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
</script>

<ComponentSection>

<p class="mb-4">
  Chart components are built on ECharts. Install it as a dependency:
</p>

```bash
npm install echarts
```

<p class="my-4">
For optimal bundle size, import only the ECharts components you need. The
examples below show the minimum required imports for our use cases.
</p>

```ts
import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  MapChart,
  PieChart,
  ScatterChart
} from 'echarts/charts';
import {
  AriaComponent,
  AxisPointerComponent,
  BrushComponent,
  GeoComponent,
  GridComponent,
  TooltipComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  ScatterChart,
  AxisPointerComponent,
  BrushComponent,
  GeoComponent,
  GridComponent,
  TooltipComponent,
  CanvasRenderer,
  AriaComponent
]);
```

</ComponentSection>

<ComponentSection>

## Available Charts

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <ChartCard
    title="Timeseries Chart"
    description="A specialized chart for displaying time-based data."
    href="/charts/timeseries"
    demo="TimeseriesChartPreviewDemo"
  />

  <ChartCard
    title="Bubble Map"
    description="Plot proportional bubbles over a GeoJSON map."
    href="/charts/maps"
    demo="BubbleMapDemo"
  />

  <ChartCard
    title="Custom Chart"
    description="Examples like pie charts."
    href="/charts/custom"
    demo="PieChartPreviewDemo"
  />

</div>

</ComponentSection>

<ComponentSection>

## Color System

<ChartCard
  title="Color Palette"
  description="Information about our color system."
  href="/charts/colors"
/>

</ComponentSection>

<ComponentSection>

## Legend

<p class="mb-6">
  Use <code>LegendItem</code> to display chart series information with color
  indicators.
</p>

### LargeItem

<ComponentExample demo="LegendDefaultDemo" />

### SmallItem

<ComponentExample demo="LegendCompactDemo" />

</ComponentSection>

<ComponentExample demo="ChartExampleDemo" code="" />
