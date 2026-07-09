<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { ChartPalette, TimeseriesChart } from 'kumo-svelte/components/chart';
  import { buildSeriesData, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const data = $derived([
    {
      name: 'Requests',
      data: buildSeriesData(0, 50, 60_000, 1000),
      color: ChartPalette.semantic('Neutral', isDarkMode)
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
  {isDarkMode}
  {data}
  xAxisName="Time (UTC)"
  yAxisName="Requests"
  xAxisTickFormat={(timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }}
  yAxisTickFormat={(value) => {
    if (value >= 1000) return `${value / 1000}k`;
    return value.toString();
  }}
  tooltipValueFormat={(value) => `${(value / 1000).toFixed(1)}k requests`}
/>
