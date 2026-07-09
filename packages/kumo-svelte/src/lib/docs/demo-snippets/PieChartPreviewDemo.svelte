<script lang="ts">
  import * as echarts from 'echarts';
  import { Chart } from 'kumo-svelte/components/chart';
  import { type KumoChartOption } from 'kumo-svelte/components/chart';

  const options: KumoChartOption = {
    toolbox: {
      show: false
    },
    series: [
      {
        type: 'pie',
        data: [
          { value: 101, name: 'Series A' },
          { value: 202, name: 'Series B' },
          { value: 303, name: 'Series C' }
        ]
      }
    ]
  };
</script>

<Chart {echarts} {options} height={160} />
