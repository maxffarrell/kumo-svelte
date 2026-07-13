<script lang="ts">
  import { DatePicker, type DateRange } from 'kumo-svelte/components/date-picker';

  let range = $state<DateRange | undefined>();
</script>

<div class="flex flex-col gap-4">
  <DatePicker
    mode="range"
    selected={range}
    onChange={(d) => (range = d as DateRange | undefined)}
    numberOfMonths={2}
  />
  <p class="text-sm text-kumo-subtle">
    Range: {range?.from
      ? `${range.from.toLocaleDateString()} - ${range.to?.toLocaleDateString() ?? '...'}`
      : 'None'}
  </p>
</div>
