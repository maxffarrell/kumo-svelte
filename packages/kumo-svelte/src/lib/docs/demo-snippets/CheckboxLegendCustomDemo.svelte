<script lang="ts">
  import { ChartLegend, ChartPalette } from 'kumo-svelte/components/chart';
</script>

<div class="flex flex-wrap gap-4">
  <ChartLegend
    variant="large"
    name="Requests"
    color={ChartPalette.semantic('Neutral')}
    value="1,234"
    unit="req/s"
  />
  <ChartLegend
    variant="large"
    name="Storage"
    color={ChartPalette.semantic('Attention')}
    value="56"
    unit="GB"
  />
</div>
