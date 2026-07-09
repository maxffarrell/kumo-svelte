<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { Chart } from 'kumo-svelte/components/chart';
  import { type KumoChartOption } from 'kumo-svelte/components/chart';
  import { getIsDarkMode } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const options: KumoChartOption = {
    tooltip: {
      trigger: 'item',
      dangerousHtmlFormatter: (params: any) => {
        const safeName = echarts.format.encodeHTML(params.name);
        const safeValue = echarts.format.encodeHTML(String(params.value));
        const safePercent = echarts.format.encodeHTML(String(Math.round(params.percent)));

        return `
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${safeName}</div>
            <div>Value: <strong>${safeValue}</strong></div>
            <div style="font-size: 12px; opacity: 0.7; margin-top: 4px;">
              ${safePercent}% of total
            </div>
          </div>
        `;
      }
    },
    series: [
      {
        type: 'pie',
        data: [
          { value: 101, name: 'Series A' },
          { value: 202, name: 'Series B' },
          { value: 150, name: "<img src=x onerror=alert('XSS')>" },
          { value: 303, name: 'Series C' },
          { value: 404, name: 'Series D' }
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
