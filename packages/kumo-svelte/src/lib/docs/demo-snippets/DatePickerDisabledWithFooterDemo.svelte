<script lang="ts">
  import { DatePicker } from 'kumo-svelte/components/date-picker';

  let dates = $state<Date[] | undefined>();
  const today = new Date();
  const maxDays = 5;
  const unavailableDates = [
    new Date(today.getFullYear(), today.getMonth(), 5),
    new Date(today.getFullYear(), today.getMonth(), 12),
    new Date(today.getFullYear(), today.getMonth(), 18),
    new Date(today.getFullYear(), today.getMonth(), 25)
  ];
</script>

{#snippet footer()}
  <p class="w-full pt-2 text-xs text-kumo-subtle">
    {dates?.length ?? 0}/{maxDays} days selected. Grayed dates are unavailable.
  </p>
{/snippet}

<DatePicker
  mode="multiple"
  selected={dates}
  onChange={(d) => (dates = d as Date[] | undefined)}
  max={maxDays}
  disabled={unavailableDates}
  fixedWeeks
  {footer}
/>
