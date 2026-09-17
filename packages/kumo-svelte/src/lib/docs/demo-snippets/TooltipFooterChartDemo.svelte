<script lang="ts">
  import * as echarts from 'echarts';
  import { TimeseriesChart } from 'kumo-svelte/components/chart';

  const now = Date.now();
  const data = [
    {
      name: 'Requests',
      color: '#4290f0',
      data: Array.from({ length: 20 }, (_, index) => [now + index * 60_000, 20 + index] as [number, number])
    }
  ];
</script>

<TimeseriesChart {echarts} {data} tooltipFooter="Five-minute rolling window" />
