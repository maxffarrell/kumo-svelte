<script lang="ts">
  import { Button } from 'kumo-svelte/components/button';
  import { DatePicker, type DateRange } from 'kumo-svelte/components/date-picker';
  import { Popover } from 'kumo-svelte/components/popover';
  import CalendarDotsIcon from 'phosphor-svelte/lib/CalendarDotsIcon';

  let range = $state<DateRange | undefined>();
  let month = $state(new Date());
  const today = new Date();

  const presets = [
    { label: 'Today', range: { from: today, to: today } },
    {
      label: 'Last 7 days',
      range: { from: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000), to: today }
    },
    {
      label: 'Last 30 days',
      range: { from: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000), to: today }
    },
    {
      label: 'Last 90 days',
      range: { from: new Date(today.getTime() - 89 * 24 * 60 * 60 * 1000), to: today }
    },
    {
      label: 'This month',
      range: { from: new Date(today.getFullYear(), today.getMonth(), 1), to: new Date(today.getFullYear(), today.getMonth() + 1, 0) }
    },
    {
      label: 'Last month',
      range: { from: new Date(today.getFullYear(), today.getMonth() - 1, 1), to: new Date(today.getFullYear(), today.getMonth(), 0) }
    }
  ];

  function formatRange() {
    if (!range?.from) return 'Select dates';
    if (!range.to) return range.from.toLocaleDateString();
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`;
  }

  function handlePresetClick(preset: { range: DateRange }) {
    range = preset.range;
    if (preset.range.from) month = preset.range.from;
  }

  function isPresetActive(preset: { range: DateRange }) {
    if (!range?.from || !range?.to || !preset.range.from || !preset.range.to) return false;
    return range.from.toDateString() === preset.range.from.toDateString()
      && range.to.toDateString() === preset.range.to.toDateString();
  }
</script>

<Popover class="p-0">
  {#snippet trigger(props)}
    <Button variant="outline" icon={CalendarDotsIcon} {...props}>{formatRange()}</Button>
  {/snippet}

  <div class="flex">
    <div class="flex flex-col gap-1 border-r border-kumo-hairline p-2 text-sm">
      {#each presets as preset (preset.label)}
        <button
          type="button"
          onclick={() => handlePresetClick(preset)}
          class={isPresetActive(preset)
            ? 'rounded-md bg-kumo-bg-inverse px-3 py-1.5 text-left whitespace-nowrap text-kumo-text-inverse'
            : 'rounded-md px-3 py-1.5 text-left whitespace-nowrap text-kumo-subtle hover:bg-kumo-control'}
        >
          {preset.label}
        </button>
      {/each}
    </div>
    <div class="p-3">
      <DatePicker
        mode="range"
        selected={range}
        onChange={(d) => (range = d as DateRange | undefined)}
        bind:month
        numberOfMonths={2}
      />
    </div>
  </div>
</Popover>
