<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { TimeseriesChart, ChartPalette, type TimeseriesMarker } from 'kumo-svelte';
  import { buildSeriesData, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const data: { name: string; color: string; data: [number, number][] }[] = $derived([
    {
      name: 'Requests',
      data: buildSeriesData(0, 50, 60_000, 1),
      color: ChartPalette.semantic('Neutral', isDarkMode)
    },
    {
      name: 'Errors',
      data: buildSeriesData(1, 50, 60_000, 0.3),
      color: ChartPalette.semantic('Attention', isDarkMode)
    }
  ]);

  const markers: TimeseriesMarker[] = $derived([
    {
      timestamp: data[0].data[15][0],
      label: 'change a1b2c3d4',
      description: 'Configuration change applied'
    },
    {
      timestamp: data[0].data[16][0],
      label: 'change b2c3d4e5',
      description: 'Routing rule updated'
    },
    {
      timestamp: data[0].data[17][0],
      label: 'change c3d4e5f6',
      description: 'Limit adjusted'
    },
    {
      timestamp: data[0].data[34][0],
      label: 'change e5f6g7h8',
      description: 'New version released',
      lineStyle: 'dotted'
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

<TimeseriesChart {echarts} {data} {markers} {isDarkMode} xAxisName="Time (UTC)" yAxisName="Count" />
