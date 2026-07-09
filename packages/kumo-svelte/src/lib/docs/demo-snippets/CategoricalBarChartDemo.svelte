<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { Chart, ChartPalette } from 'kumo-svelte/components/chart';
  import { type KumoChartOption } from 'kumo-svelte/components/chart';
  import { barLabels, cacheData, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const seriesData = $derived([
    {
      name: 'Hit',
      data: cacheData.Hit,
      color: ChartPalette.semantic('Success', isDarkMode),
      type: 'bar' as const,
      stack: 'total',
      barWidth: 28
    },
    {
      name: 'Miss',
      data: cacheData.Miss,
      color: ChartPalette.semantic('Attention', isDarkMode),
      type: 'bar' as const,
      stack: 'total',
      barWidth: 28
    },
    {
      name: 'Revalidated',
      data: cacheData.Revalidated,
      color: ChartPalette.semantic('Neutral', isDarkMode),
      type: 'bar' as const,
      stack: 'total',
      barWidth: 28
    },
    {
      name: 'Expired',
      data: cacheData.Expired,
      color: ChartPalette.semantic('Warning', isDarkMode),
      type: 'bar' as const,
      stack: 'total',
      barWidth: 28
    },
    {
      name: 'Unknown',
      data: cacheData.Unknown,
      color: ChartPalette.semantic('Disabled', isDarkMode),
      type: 'bar' as const,
      stack: 'total',
      barWidth: 28
    }
  ]);

  const options: KumoChartOption = $derived({
    backgroundColor: 'transparent',
    grid: { left: 56, right: 16, top: 40, bottom: 40 },
    legend: {
      top: 4,
      left: 0,
      itemWidth: 10,
      itemHeight: 10,
      icon: 'circle',
      textStyle: { fontSize: 11 }
    },
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      confine: false
    },
    xAxis: {
      type: 'category',
      data: barLabels,
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { type: 'dashed', opacity: 0.5 } }
    },
    series: seriesData
  });

  onMount(() => {
    const update = () => {
      isDarkMode = getIsDarkMode();
    };
    const observer = new MutationObserver(update);

    update();
    [document.documentElement, document.body].forEach((node) => {
      observer.observe(node, { attributes: true, attributeFilter: ['data-mode', 'class'] });
    });

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    mediaQuery?.addEventListener('change', update);

    return () => {
      observer.disconnect();
      mediaQuery?.removeEventListener('change', update);
    };
  });
</script>

<div class="overflow-hidden rounded-lg bg-kumo-elevated text-base ring ring-kumo-hairline">
  <div class="border-b border-kumo-fill bg-kumo-elevated p-3 font-medium text-kumo-strong">
    Bar chart — cache status by day (semantic tokens)
  </div>
  <div class="overflow-visible bg-kumo-base p-3">
    <Chart {echarts} {options} height={260} {isDarkMode} />
  </div>
</div>
