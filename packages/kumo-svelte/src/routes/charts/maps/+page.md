---
title: 'Bubble Map'
description: 'A proportional bubble map component for plotting values over GeoJSON maps using ECharts.'
sourceFile: 'components/chart'
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<ComponentSection>

<ComponentExample demo="BubbleMapDemo" />

</ComponentSection>

<ComponentSection>

## Installation

BubbleMap requires <code class="text-kumo-default">echarts</code> as a peer dependency.

```bash
npm install echarts
```

```svelte
import { BubbleMap } from "kumo-svelte";
```

</ComponentSection>

<ComponentSection>

## Usage

Use <code class="text-kumo-default">geoJson</code> to register the map base and accessors to read longitude, latitude, label, and value from each row.

<ComponentExample demo="BubbleMapDemo" />

</ComponentSection>

<ComponentSection>

## API Reference

<PropsTable component="BubbleMap" />

</ComponentSection>
