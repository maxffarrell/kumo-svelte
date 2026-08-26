<script lang="ts">
  import { Button } from '$lib/components/button';
  import { DatePicker } from '$lib/components/date-picker';
  import { Popover } from '$lib/components/popover';
  import { CalendarDotsIcon } from 'phosphor-svelte';
  import Scenario from '$lib/vrt/Scenario.svelte';

  /** Fixed dates for deterministic VRT — do not use `new Date()` for display month/selection. */
  const fixedDate = new Date(2024, 0, 15);
  const fixedMonth = new Date(2024, 0, 1);
  const formatted = fixedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
</script>

{#snippet dateTrigger(props: Record<string, unknown>)}
  <Button variant="outline" icon={CalendarDotsIcon} {...props}>{formatted}</Button>
{/snippet}

{#snippet popoverShell(open = false)}
  <div class="flex h-[760px] w-[1260px] items-start justify-start pt-4 pl-4">
    <Popover class="p-3" {open}>
      {#snippet trigger(props)}
        {@render dateTrigger(props)}
      {/snippet}
      <DatePicker
        mode="single"
        month={fixedMonth}
        selected={fixedDate}
        onChange={() => {}}
      />
    </Popover>
  </div>
{/snippet}

<Scenario id="closed-trigger" label="closed trigger">
  {@render popoverShell(false)}
</Scenario>

<Scenario id="open" label="open" interact={[{ type: 'click' }]} capture="page">
  {@render popoverShell(false)}
</Scenario>

<Scenario id="inline-selected" label="inline selected">
  <DatePicker mode="single" month={fixedMonth} selected={fixedDate} onChange={() => {}} />
</Scenario>

<Scenario id="inline-month" label="inline month">
  <DatePicker mode="single" month={fixedMonth} onChange={() => {}} />
</Scenario>
