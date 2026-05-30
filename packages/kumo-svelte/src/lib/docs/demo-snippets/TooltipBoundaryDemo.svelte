<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { TimeseriesChart, ChartPalette } from 'kumo-svelte';
  import { buildSeriesData, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);
  let boundary: HTMLDivElement | undefined = $state();

  const data: { name: string; color: string; data: [number, number][] }[] = $derived([
    {
      name: 'Origin requests',
      data: buildSeriesData(0, 64, 60_000, 0.8),
      color: ChartPalette.semantic('Neutral', isDarkMode)
    },
    {
      name: 'Blocked requests',
      data: buildSeriesData(1, 64, 60_000, 0.25),
      color: ChartPalette.semantic('Attention', isDarkMode)
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

<div bind:this={boundary} class="w-full overflow-hidden rounded-md border border-kumo-line p-3">
  <TimeseriesChart
    {echarts}
    {data}
    {isDarkMode}
    tooltipBoundary={boundary}
    tooltipMaxItems={4}
    xAxisName="Time (UTC)"
    yAxisName="Requests"
  />
</div>
