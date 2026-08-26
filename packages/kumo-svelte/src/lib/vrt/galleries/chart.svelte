<script lang="ts">
  import * as echarts from 'echarts';
  import { Chart, ChartLegend, TimeseriesChart } from '$lib/components/chart';
  import Scenario from '$lib/vrt/Scenario.svelte';

  /** Fixed epoch — avoids Date.now() so VRT data stays deterministic. */
  const BASE_TS = 1_700_000_000_000;

  const timeseriesData = [
    {
      name: 'Requests',
      color: '#086FFF',
      data: [
        [BASE_TS, 42],
        [BASE_TS + 60_000, 58],
        [BASE_TS + 120_000, 51]
      ] as [number, number][]
    },
    {
      name: 'Errors',
      color: '#E02F44',
      data: [
        [BASE_TS, 2],
        [BASE_TS + 60_000, 4],
        [BASE_TS + 120_000, 3]
      ] as [number, number][]
    }
  ];

  const barOptions = {
    xAxis: { type: 'category' as const, data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' as const },
    series: [{ type: 'bar' as const, data: [12, 28, 19] }],
    animation: false
  };
</script>

<Scenario id="timeseries-default" label="timeseries">
  <div class="w-[320px]">
    <TimeseriesChart {echarts} data={timeseriesData} height={160} yAxisTickCount={2} animation={false} />
  </div>
</Scenario>

<Scenario id="chart-wrapper" label="chart wrapper">
  <div class="w-[280px]">
    <Chart {echarts} options={barOptions} height={120} />
  </div>
</Scenario>

<Scenario id="loading" label="loading">
  <div class="w-[320px]">
    <TimeseriesChart {echarts} data={[]} height={120} loading />
  </div>
</Scenario>

<Scenario id="legend-small" label="legend small">
  <ChartLegend name="Requests" color="#086FFF" value="1,234" />
</Scenario>

<Scenario id="legend-large" label="legend large">
  <ChartLegend variant="large" name="Latency" color="#CF7EE9" value="42" unit="ms" />
</Scenario>

<Scenario id="legend-inactive" label="legend inactive">
  <ChartLegend name="Errors" color="#E02F44" value="3" inactive />
</Scenario>
