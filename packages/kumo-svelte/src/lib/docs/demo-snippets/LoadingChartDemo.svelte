<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { TimeseriesChart } from 'kumo-svelte/components/chart';
  import { getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

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

<div class="flex w-full flex-1 flex-col">
  <TimeseriesChart {echarts} {isDarkMode} xAxisName="Time (UTC)" yAxisName="Count" data={[]} loading />
</div>
