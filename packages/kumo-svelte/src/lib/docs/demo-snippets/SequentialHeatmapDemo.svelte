<script lang="ts">
  import { onMount } from 'svelte';
  import * as echarts from 'echarts';
  import { Chart, ChartPalette } from 'kumo-svelte/components/chart';
  import { type KumoChartOption } from 'kumo-svelte/components/chart';
  import { getIsDarkMode, heatmapDays, heatmapHours, heatmapValues } from './chart-color-demo-data';

  let isDarkMode = $state(false);

  const scale = $derived(ChartPalette.sequential('blues', isDarkMode));
  const maxValue = Math.max(...heatmapValues.flatMap((row) => row));
  const data = heatmapDays.flatMap((_, dayIndex) =>
    heatmapHours.map((_, hourIndex) => [hourIndex, dayIndex, heatmapValues[dayIndex][hourIndex]])
  );
  const visualPieces = $derived.by(() => {
    const stepSize = Math.max(1, Math.ceil((maxValue + 1) / scale.length));
    return scale.map((color, index) => {
      const min = index * stepSize;
      const max = index === scale.length - 1 ? maxValue : (index + 1) * stepSize - 1;
      return {
        min,
        max,
        color,
        label: `${min}–${max}`
      };
    });
  });

  const options: KumoChartOption = $derived({
    backgroundColor: 'transparent',
    grid: { left: 72, right: 24, top: 20, bottom: 70 },
    tooltip: {
      appendToBody: true,
      confine: false,
      position: 'top',
      formatter: (params: unknown) => {
        const parameter = Array.isArray(params) ? params[0] : params;
        const point = (parameter as { data?: [number, number, number] } | undefined)?.data;
        if (!point) return '';
        const [hourIndex, dayIndex, value] = point;
        const day = heatmapDays[dayIndex] ?? '';
        const hour = heatmapHours[hourIndex] ?? '';
        return `${day} ${hour}<br/>Request density: ${value}`;
      }
    },
    xAxis: {
      type: 'category',
      data: heatmapHours,
      splitArea: { show: true },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'category',
      data: heatmapDays,
      splitArea: { show: true },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    visualMap: {
      type: 'piecewise',
      show: true,
      dimension: 2,
      orient: 'horizontal',
      left: 'center',
      bottom: 16,
      itemWidth: 16,
      itemHeight: 10,
      textStyle: { fontSize: 11 },
      pieces: visualPieces
    },
    series: [
      {
        type: 'heatmap',
        data,
        label: { show: false },
        itemStyle: {
          borderColor: isDarkMode ? '#1F2937' : '#bcd8fa',
          borderWidth: 0.5
        }
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
  <div class="border-b border-kumo-fill bg-kumo-elevated p-3 font-medium text-kumo-strong">
    Heatmap — request density by day and hour (sequential scale)
  </div>
  <div class="overflow-visible bg-kumo-base p-3">
    <Chart {echarts} {options} height={300} {isDarkMode} />
  </div>
</div>
