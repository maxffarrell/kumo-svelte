---
title: "Maps"
description: "GeoJSON map components for plotting regional values and proportional bubbles with ECharts."
sourceFile: "components/chart"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection>

<ComponentExample demo="BubbleMapDemo" />

<ComponentExample demo="ChoroplethMapDemo" />

</ComponentSection>

<ComponentSection>

## Installation

Map charts require <code class="text-kumo-default">echarts</code> as a peer dependency.

```bash
npm install echarts
```

```svelte
import { BubbleMap, ChoroplethMap } from "kumo-svelte";
```

</ComponentSection>

<ComponentSection>

## Usage

Use <code class="text-kumo-default">geoJson</code> to register the map base and accessors to read coordinates, labels, region names, and values from each row.

<ComponentExample demo="BubbleMapDemo" />

</ComponentSection>

<ComponentSection>

## API Reference

<PropsTable component="BubbleMap" />

<PropsTable component="ChoroplethMap" />

</ComponentSection>
