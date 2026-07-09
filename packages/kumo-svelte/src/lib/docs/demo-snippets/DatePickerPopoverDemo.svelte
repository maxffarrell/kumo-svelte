<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { DatePicker } from 'kumo-svelte/components/date-picker';
  import { Popover } from 'kumo-svelte/components/popover';
  import CalendarDotsIcon from 'phosphor-svelte/lib/CalendarDotsIcon';

  let date = $state<Date | undefined>();
</script>

<Popover class="p-3">
  {#snippet trigger(props)}
    <Button variant="outline" icon={CalendarDotsIcon} {...props}>
      {date ? date.toLocaleDateString() : 'Pick a date'}
    </Button>
  {/snippet}

  <DatePicker mode="single" selected={date} onChange={(d) => (date = d as Date | undefined)} />
</Popover>
