---
title: "Sankey Chart"
description: "A Sankey diagram component for visualizing flow data between nodes using ECharts."
sourceFile: "components/chart"
---

<script>
  import Callout from '#lib/docs/Callout.svelte';
  import ComponentExample from '#lib/docs/ComponentExample.svelte';
  import ComponentSection from '#lib/docs/ComponentSection.svelte';
  import CodeBlock from '#lib/docs/CodeBlock.svelte';
  import PropsTable from '#lib/docs/PropsTable.svelte';
</script>

<ComponentSection>

<ComponentExample demo="SankeyChartBasicDemo" />

</ComponentSection>

<ComponentSection>

## Installation

SankeyChart requires <code class="text-kumo-default">echarts</code> as a peer dependency.

```bash
npm install echarts
```

```svelte
import { SankeyChart } from "kumo-svelte";
```

</ComponentSection>

<ComponentSection>

## Examples

### Basic Sankey

A simple Sankey diagram showing flow between source and target nodes.

<ComponentExample demo="SankeyChartBasicDemo" />

### Multi-level Flow

Sankey diagrams can show multiple levels of flow through intermediate nodes.

<ComponentExample demo="SankeyChartMultiLevelDemo" />

### Full Width

Use <code class="text-kumo-default">left</code> and <code class="text-kumo-default">right</code> to control horizontal padding of the Sankey layout within its container.

<ComponentExample demo="SankeyChartFullWidthDemo" />

### Custom Tooltip

<ComponentExample demo="SankeyChartTooltipDemo" />

### Rich Tooltip

<ComponentExample demo="SankeyChartRichTooltipDemo" />

### Interactive

<ComponentExample demo="SankeyChartInteractiveDemo" />

### Drill Down

<ComponentExample demo="SankeyChartDrillDownDemo" />

</ComponentSection>
