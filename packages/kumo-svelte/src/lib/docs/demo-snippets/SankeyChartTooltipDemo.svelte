<script lang="ts">
  import * as echarts from 'echarts';
  import { SankeyChart, ChartPalette } from 'kumo-svelte/components/chart';

  const nodes = [
    { name: 'Users', value: 103600, color: ChartPalette.categorical(0) },
    { name: 'Networks', value: 84100, color: ChartPalette.categorical(1) },
    { name: 'Apps', value: 122600, color: ChartPalette.categorical(2) },
    { name: 'Tunnels', value: 87800, color: ChartPalette.categorical(3) }
  ];

  const links = [
    { source: 0, target: 2, value: 80000 },
    { source: 0, target: 3, value: 20000 },
    { source: 1, target: 2, value: 30000 },
    { source: 1, target: 3, value: 50000 }
  ];
</script>

<SankeyChart {echarts} {nodes} {links} height={350} />
