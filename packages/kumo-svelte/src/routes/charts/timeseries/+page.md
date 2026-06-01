---
title: "Timeseries Chart"
description: "A specialized chart for displaying time-based data."
sourceFile: "components/chart"
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>


The timeseries chart is a specialized chart for displaying time-based data.
  Each data point is a tuple of <code>[timestamp_in_ms, value]</code>.

<ComponentSection>

## Basic Line Chart

A simple line chart displaying multiple data series over time.

<ComponentExample demo="BasicLineChartDemo" />

</ComponentSection>

<ComponentSection>

## Custom X-Axis Label Format

  Use the <code>xAxisTickLabelFormat</code> prop to control how x-axis tick
  labels are rendered. The formatter receives the raw timestamp in milliseconds
  and returns a display string, overriding ECharts' built-in time formatting.

<ComponentExample demo="CustomAxisLabelFormatDemo" />

</ComponentSection>

<ComponentSection>

## Gradient Fill

  Set <code>gradient</code> to <code>true</code> to render a vertical gradient
  fill beneath each line series. The fill fades from the series color at the top
  to transparent at the bottom, giving the chart a polished area-chart look
  without losing the clarity of individual lines.

<ComponentExample demo="GradientLineChartDemo" />

</ComponentSection>

<ComponentSection>

## Incomplete Data

  Use the <code>incomplete</code> prop to indicate regions where data may be
  incomplete or still being collected.

<ComponentExample demo="IncompleteDataChartDemo" />

</ComponentSection>

<ComponentSection>

## Time Range Selection

  Enable time range selection by providing the <code>onTimeRangeChange</code>
  callback. Users can click and drag on the chart to select a time range.

<ComponentExample demo="TimeRangeSelectionChartDemo" />

</ComponentSection>

<ComponentSection>

## Tooltip Cursor Tracking

  Use <code>tooltipFollowCursor</code> to choose whether the tooltip follows both cursor axes or only tracks the x position.
  Set <code>tooltipMode="single"</code> when dense charts should show only the series nearest to the pointer.

<ComponentExample demo="TooltipFollowCursorDemo" />

</ComponentSection>

<ComponentSection>

## Tooltip Boundary

  Set <code>tooltipBoundary</code> to keep the native tooltip within the chart container instead of letting it overflow the visual frame.

<ComponentExample demo="TooltipBoundaryDemo" />

</ComponentSection>

<ComponentSection>

## Bar Chart

  Set <code>type="bar"</code> to render series as stacked bars instead of lines.
  All other props — axes, tooltips, colors — work identically.

<ComponentExample demo="BarChartDemo" />

</ComponentSection>

<ComponentSection>

## Loading State

  Set <code>loading</code> to <code>true</code> to display an animated sine-wave
  skeleton while data is being fetched. The chart canvas is hidden until loading
  completes; swap back to <code>loading=false</code> to reveal the chart.

<ComponentExample demo="LoadingChartDemo" />

</ComponentSection>
