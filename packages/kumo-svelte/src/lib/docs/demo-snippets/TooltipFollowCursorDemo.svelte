<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { TimeseriesChart, ChartPalette } from 'kumo-svelte';
  import { buildSeriesData, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const data: { name: string; color: string; data: [number, number][] }[] = $derived([
    {
      name: 'Requests',
      data: buildSeriesData(0, 72, 60_000, 1),
      color: ChartPalette.semantic('Neutral', isDarkMode)
    },
    {
      name: 'Edge errors',
      data: buildSeriesData(1, 72, 60_000, 0.35),
      color: ChartPalette.semantic('Attention', isDarkMode)
    },
    {
      name: 'Cache hits',
      data: buildSeriesData(2, 72, 60_000, 0.7),
      color: ChartPalette.semantic('Success', isDarkMode)
    }
  ]);

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

<TimeseriesChart
  {echarts}
  {data}
  {isDarkMode}
  tooltipMode="single"
  tooltipFollowCursor="x"
  xAxisName="Time (UTC)"
  yAxisName="Events"
/>
