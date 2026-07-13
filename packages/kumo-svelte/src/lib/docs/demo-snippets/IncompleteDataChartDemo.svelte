<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { TimeseriesChart, ChartPalette } from 'kumo-svelte/components/chart';
  import { buildSeriesData, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const data: { name: string; color: string; data: [number, number][] }[] = $derived([
    {
      name: 'Bandwidth',
      data: buildSeriesData(0, 50, 60_000, 1),
      color: ChartPalette.categorical(0, isDarkMode)
    }
  ]);
  const incompleteTimestamp = $derived(data[0].data[data[0].data.length - 5][0]);

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
  yAxisName="Mbps"
  incomplete={{ after: incompleteTimestamp }}
/>
