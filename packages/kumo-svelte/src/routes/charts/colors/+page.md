---
title: "Chart Colors"
description: "Semantic and categorical color tokens for Cloudflare dashboard charts."
sourceFile: "components/chart/Color.ts"
contentLayout: "wide"
---

<script>
  import ChartColorSystemsDemo from '#lib/docs/demo-snippets/ChartColorSystemsDemo.svelte';
  import SemanticColorsDemo from '#lib/docs/demo-snippets/SemanticColorsDemo.svelte';
  import CategoricalBarChartDemo from '#lib/docs/demo-snippets/CategoricalBarChartDemo.svelte';
  import CategoricalColorsDemo from '#lib/docs/demo-snippets/CategoricalColorsDemo.svelte';
  import CategoricalCvdDemo from '#lib/docs/demo-snippets/CategoricalCvdDemo.svelte';
  import CategoricalDonutChartDemo from '#lib/docs/demo-snippets/CategoricalDonutChartDemo.svelte';
  import CategoricalLineChartDemo from '#lib/docs/demo-snippets/CategoricalLineChartDemo.svelte';
  import SequentialColorsDemo from '#lib/docs/demo-snippets/SequentialColorsDemo.svelte';
  import SequentialHeatmapDemo from '#lib/docs/demo-snippets/SequentialHeatmapDemo.svelte';
</script>


Chart colors in Kumo are split into three systems — **semantic** tokens for data with inherent
polarity, a **categorical** palette for nominal series and a **sequential** scale for density encoding. Using the right system for the data type is the most important color decision in a chart.

## Color systems

<div class="mb-6">
<p>
Charts in the dashboard serve different jobs, so color is not “one-size-fits-all.”
To avoid misreading data, we use different color systems based on the data task.
</p>
</div>

<ChartColorSystemsDemo />

## Semantic tokens

<div class="mb-6">
<p>
Semantic chart colors should be used when the data has inherent polarity, i.e. status, severity and health data. Semantic colors communicate to the user that this data needs their attention and an action might be required.
</p>
<p>
Semantic chart colors are derived from our existing badge/status semantic tokens so meaning stays consistent across components and contexts. We intentionally adjust hue/chroma for charts to be less visually aggressive than badges to reduce visual fatigue and false urgency.
</p>
</div>

<div class="mb-6 flex flex-col gap-6">
<SemanticColorsDemo />
<CategoricalBarChartDemo />
</div>

## Categorical palette

<div class="mb-6">
<p>
Use the categorical palette when the data has no inherent polarity. The palette is ordered for maximum perceptual distance between adjacent slots to ensure it's CVD friendly and the data is easily distinguishable.
</p>
</div>

<div class="mb-6">
<CategoricalColorsDemo />
</div>

<div class="text-kumo-info bg-kumo-info-tint/50 rounded-lg py-1 px-4 ring ring-kumo-info mb-12">
  We reduced categorical tokens from 16 (8 hues × 2 lightness variants) to 5 because most charts intentionally surface only top categories at once (commonly 5). When a chart needs more than 5 series it should cycle those tokens with modulo (color = tokens[i % 5]) for consistent, predictable styling.
</div>

<div class="my-4">
<p>
  Categorical colors are tested using a CVD simulator to ensure they remain distinguishable for users with color vision deficiency. Here's an example of what the categorical colors might look like to someone with deuteranopia.
</p>
</div>

<div class="mb-6 flex flex-col gap-8">
<CategoricalCvdDemo />
<CategoricalDonutChartDemo />
<CategoricalLineChartDemo />

<div class="text-kumo-info bg-kumo-info-tint/50 rounded-lg py-1 px-4 ring ring-kumo-info mb-6">
  <span class="font-semibold">Color alone should not be used to convey information.</span> When implementing line charts, ensure that you're using patterns (e.g. dashes/dots) on top of the color palette to differentiate between data points. Since dots and dashes appear lighter, we avoid pairing them with light colors since those lines can fade out.
</div>
</div>

## Sequential scale

<div class="mb-6">
<p>
A 5-step single-hue scale for encoding <strong>density</strong> — use when a single metric varies in
magnitude across a set of values and color intensity should reinforce that magnitude.
Common uses: choropleth maps (traffic volume by country), heatmaps, and histogram fills.
The sequential scale is not appropriate for categorical series differentiation — use the
categorical palette for that.
</p>
<p>
Darker steps encode higher values in light mode; lighter steps encode higher values in
dark mode so the most prominent color always corresponds to the highest magnitude.
</p>
</div>

<div class="mb-6 flex flex-col gap-6">
<SequentialColorsDemo />
<SequentialHeatmapDemo />
</div>
