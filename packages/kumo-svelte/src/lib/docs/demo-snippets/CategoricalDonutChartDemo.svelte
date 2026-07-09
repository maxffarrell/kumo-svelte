<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { Chart, ChartPalette } from 'kumo-svelte/components/chart';
  import { type KumoChartOption } from 'kumo-svelte/components/chart';
  import { countrySlices, getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const options: KumoChartOption = $derived({
    color: countrySlices.map((_, index) => ChartPalette.categorical(index, isDarkMode)),
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} req ({d}%)',
      appendToBody: true,
      confine: false
    },
    series: [
      {
        type: 'pie',
        radius: ['42%', '70%'],
        data: countrySlices,
        label: { show: true, formatter: '{b}' }
      }
    ]
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
  <div class="border-b border-kumo-fill bg-kumo-elevated p-3 font-medium text-kumo-strong">Donut chart — traffic by country</div>
  <div class="overflow-visible bg-kumo-base p-3">
    <Chart {echarts} {options} height={300} {isDarkMode} />
  </div>
</div>
