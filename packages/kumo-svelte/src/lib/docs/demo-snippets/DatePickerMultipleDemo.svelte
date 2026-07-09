<script lang="ts">
  import { DatePicker } from 'kumo-svelte/components/date-picker';

  let dates = $state<Date[] | undefined>();
</script>

<div class="flex flex-col gap-4">
  <DatePicker
    mode="multiple"
    selected={dates}
    onChange={(d) => (dates = d as Date[] | undefined)}
    max={5}
  />
  <p class="text-sm text-kumo-subtle">
    Selected: {dates?.length ?? 0} date(s)
  </p>
</div>
