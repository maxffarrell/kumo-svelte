<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import type { EChartsType } from 'echarts/core';
  import { ChartLegend, ChartPalette, LayerCard, TimeseriesChart } from 'kumo-svelte';
  import { buildSeriesData, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);
  let chartRef: EChartsType | null = $state(null);
  let hiddenSeries: Record<string, boolean> = $state({});

  const series = $derived([
    {
      name: 'P99',
      color: ChartPalette.semantic('Attention', isDarkMode),
      value: '124',
      unit: 'ms'
    },
    {
      name: 'P95',
      color: ChartPalette.semantic('Warning', isDarkMode),
      value: '76',
      unit: 'ms'
    },
    {
      name: 'P75',
      color: ChartPalette.semantic('Neutral', isDarkMode),
      value: '32',
      unit: 'ms'
    },
    {
      name: 'P50',
      color: ChartPalette.semantic('Neutral', isDarkMode),
      value: '10',
      unit: 'ms'
    }
  ]);

  const data = $derived(
    series.map((item, index) => ({
      name: item.name,
      data: buildSeriesData(3 - index, 30, 60_000, 1 - index * 0.2),
      color: item.color
    }))
  );

  $effect(() => {
    isDarkMode;
    hiddenSeries = {};
  });

  function handleClick(name: string) {
    if (!chartRef) return;

    const isIsolated = series.every((item) => (item.name === name ? !hiddenSeries[item.name] : hiddenSeries[item.name]));
    const nextHidden: Record<string, boolean> = {};

    for (const item of series) {
      const shouldHide = isIsolated ? false : item.name !== name;
      nextHidden[item.name] = shouldHide;
      chartRef.dispatchAction({
        type: shouldHide ? 'legendUnSelect' : 'legendSelect',
        name: item.name
      });
    }

    hiddenSeries = nextHidden;
  }

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

<LayerCard>
  <LayerCard.Secondary>Read latency</LayerCard.Secondary>
  <LayerCard.Primary>
    <div class="mb-2 flex divide-x divide-kumo-line px-2">
      {#each series as item (item.name)}
        <ChartLegend
          variant="large"
          name={item.name}
          color={item.color}
          value={item.value}
          unit={item.unit}
          inactive={hiddenSeries[item.name] ?? false}
          onclick={() => handleClick(item.name)}
          class="not-first:pl-4"
        />
      {/each}
    </div>
    <TimeseriesChart
      bind:chartRef
      {echarts}
      xAxisName="Time (UTC)"
      {isDarkMode}
      {data}
      height={300}
      enableLegendSelection
    />
  </LayerCard.Primary>
</LayerCard>
