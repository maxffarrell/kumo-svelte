---
title: "Custom Chart"
description: "Example charts using the Chart component."
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

## Custom Chart

<ComponentExample demo="PieChartDemo" />

</ComponentSection>

<ComponentSection>

## Custom Tooltip with HTML

For tooltips that require custom HTML formatting, use the `dangerousHtmlFormatter` property instead of the standard `formatter`. This makes the security implications more explicit.

When using `dangerousHtmlFormatter`, it is **strongly recommended** to sanitize any user-provided content using `echarts.format.encodeHTML` to prevent XSS vulnerabilities.

<ComponentExample demo="CustomTooltipChartDemo" />

</ComponentSection>
