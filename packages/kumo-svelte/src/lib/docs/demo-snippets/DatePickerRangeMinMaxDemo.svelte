<script lang="ts">
  import { DatePicker, type DateRange } from 'kumo-svelte/components/date-picker';

  let range = $state<DateRange | undefined>();
</script>

{#snippet footer()}
  <span class="text-xs text-kumo-subtle">Select 3-7 nights</span>
{/snippet}

<div class="flex flex-col gap-4">
  <DatePicker
    mode="range"
    selected={range}
    onChange={(d) => (range = d as DateRange | undefined)}
    min={3}
    max={7}
    {footer}
  />
</div>
