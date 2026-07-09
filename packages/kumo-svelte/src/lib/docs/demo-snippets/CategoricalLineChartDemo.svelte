<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { Chart, ChartPalette } from 'kumo-svelte/components/chart';
  import { type KumoChartOption } from 'kumo-svelte/components/chart';
  import {
    getIsDarkMode,
    lineStyleBySeries,
    lineTimestamps,
    regionBaselines,
    sixSeries
  } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const seriesData = $derived(
    sixSeries.map((name, index) => ({
      name,
      data: lineTimestamps.map((timestamp, pointIndex) => [
        timestamp,
        Math.max(
          0,
          Math.round(
            regionBaselines[index] * (0.8 + 0.4 * Math.sin(pointIndex * 0.4 + index)) +
              (Math.random() - 0.5) * regionBaselines[index] * 0.15
          )
        )
      ]),
      color: ChartPalette.categorical(index, isDarkMode)
    }))
  );

  const options: KumoChartOption = $derived({
    backgroundColor: 'transparent',
    grid: { left: 56, right: 16, top: 20, bottom: 40 },
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      confine: false
    },
    xAxis: {
      type: 'time',
      name: 'Time (UTC)',
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'Requests',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { type: 'dashed', opacity: 0.5 } }
    },
    series: seriesData.map((series) => ({
      name: series.name,
      type: 'line',
      data: series.data,
      color: series.color,
      showSymbol: false,
      lineStyle: {
        width: 2,
        type: lineStyleBySeries[series.name] ?? 'solid'
      }
    }))
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
  <div class="border-b border-kumo-fill bg-kumo-elevated p-3 font-medium text-kumo-strong">Line chart — requests by region</div>
  <div class="overflow-visible bg-kumo-base p-3">
    <Chart {echarts} {options} height={260} {isDarkMode} />
  </div>
</div>
