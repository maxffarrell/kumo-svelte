<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { ChartLegend, ChartPalette, TimeseriesChart } from 'kumo-svelte/components/chart';
  import { LayerCard } from 'kumo-svelte/components/layer-card';
  import { buildSeriesData, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const data: { name: string; color: string; data: [number, number][] }[] = $derived([
    {
      name: 'P99',
      data: buildSeriesData(3, 30, 60_000, 1),
      color: ChartPalette.semantic('Attention', isDarkMode)
    },
    {
      name: 'P95',
      data: buildSeriesData(2, 30, 60_000, 0.6),
      color: ChartPalette.semantic('Warning', isDarkMode)
    },
    {
      name: 'P75',
      data: buildSeriesData(1, 30, 60_000, 0.4),
      color: ChartPalette.semantic('Neutral', isDarkMode)
    },
    {
      name: 'P50',
      data: buildSeriesData(0, 30, 60_000, 0.2),
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

<LayerCard>
  <LayerCard.Secondary>Read latency</LayerCard.Secondary>
  <LayerCard.Primary>
    <div class="mb-2 flex gap-4 divide-x divide-kumo-hairline px-2">
      <ChartLegend
        variant="large"
        name="P99"
        color={ChartPalette.semantic('Attention', isDarkMode)}
        value="124"
        unit="ms"
      />
      <ChartLegend
        variant="large"
        name="P95"
        color={ChartPalette.semantic('Warning', isDarkMode)}
        value="76"
        unit="ms"
      />
      <ChartLegend
        variant="large"
        name="P75"
        color={ChartPalette.semantic('Neutral', isDarkMode)}
        value="32"
        unit="ms"
      />
      <ChartLegend
        variant="large"
        name="P50"
        color={ChartPalette.semantic('Neutral', isDarkMode)}
        value="10"
        unit="ms"
      />
    </div>
    <TimeseriesChart {echarts} {isDarkMode} {data} height={300} xAxisName="Time (UTC)" />
  </LayerCard.Primary>
</LayerCard>
