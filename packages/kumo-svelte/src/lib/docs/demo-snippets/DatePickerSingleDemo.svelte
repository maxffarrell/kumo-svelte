<script lang="ts">
  import { DatePicker } from 'kumo-svelte/components/date-picker';

  let date = $state<Date | undefined>();
</script>

<div class="flex flex-col gap-4">
  <DatePicker
    mode="single"
    selected={date}
    onChange={(d) => {
      if (d instanceof Date) {
        date = d;
      }
    }}
  />
  <p class="text-sm text-kumo-subtle">
    Selected: {date ? date.toLocaleDateString() : 'None'}
  </p>
</div>
