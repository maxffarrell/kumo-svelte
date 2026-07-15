<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { DateRangePicker } from '$lib/components/date-range-picker';
  import Scenario from '$lib/vrt/Scenario.svelte';

  /** Fixed dates for deterministic VRT — do not use `new Date()` or today. */
  const fixedPlaceholder = new CalendarDate(2024, 1, 1);
  const fixedRange = {
    start: new CalendarDate(2024, 1, 10),
    end: new CalendarDate(2024, 1, 20)
  };
</script>

{#snippet pickerShell()}
  <div class="flex h-[800px] w-[1280px] items-start justify-start pt-4 pl-4">
    <DateRangePicker value={fixedRange} placeholder={fixedPlaceholder} />
  </div>
{/snippet}

<Scenario id="closed-trigger" label="closed trigger">
  {@render pickerShell()}
</Scenario>

<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  {@render pickerShell()}
</Scenario>
