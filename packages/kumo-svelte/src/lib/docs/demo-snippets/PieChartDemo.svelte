<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { Chart } from 'kumo-svelte/components/chart';
  import { type KumoChartOption } from 'kumo-svelte/components/chart';
  import { getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const options: KumoChartOption = {
    animation: true,
    animationDuration: 2000,
    tooltip: { show: true },
    series: [
      {
        type: 'pie',
        data: [
          { value: 101, name: 'Series A' },
          { value: 202, name: 'Series B' },
          { value: 303, name: 'Series C' },
          { value: 404, name: 'Series D' },
          { value: 505, name: 'Series E' }
        ]
      }
    ]
  };

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

<Chart {echarts} {options} height={400} {isDarkMode} />
