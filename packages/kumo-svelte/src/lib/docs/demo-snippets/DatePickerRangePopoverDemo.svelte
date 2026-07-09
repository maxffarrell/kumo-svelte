<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { DatePicker, type DateRange } from 'kumo-svelte/components/date-picker';
  import { Popover } from 'kumo-svelte/components/popover';
  import CalendarDotsIcon from 'phosphor-svelte/lib/CalendarDotsIcon';

  let range = $state<DateRange | undefined>();

  function formatRange() {
    if (!range?.from) return 'Select dates';
    if (!range.to) return range.from.toLocaleDateString();
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
  }
</script>

<Popover class="p-3">
  {#snippet trigger(props)}
    <Button variant="outline" icon={CalendarDotsIcon} {...props}>
      {formatRange()}
    </Button>
  {/snippet}

  <DatePicker
    mode="range"
    selected={range}
    onChange={(d) => (range = d as DateRange | undefined)}
    numberOfMonths={2}
  />
</Popover>
