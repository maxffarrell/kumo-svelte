---
title: "DatePicker"
description: "A date selection calendar supporting single, multiple, and range selection modes."
sourceFile: "components/date-picker"
---

<script>
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
</script>

<!-- Hero Demo -->

<ComponentSection>
  <ComponentExample demo="DatePickerSingleDemo" />
</ComponentSection>

<!-- Installation -->

<ComponentSection>

## Installation

### Barrel

```typescript
import { DatePicker } from 'kumo-svelte';
```

### Granular

```typescript
import { DatePicker } from 'kumo-svelte/components/date-picker';
```

</ComponentSection>

<!-- Usage -->

<ComponentSection>

## Usage

<p>DatePicker supports three selection modes: `single`, `multiple`, and `range`.</p>

```svelte
<script lang="ts">
  import { DatePicker } from 'kumo-svelte';

  let date = $state<Date | undefined>();
</script>

<DatePicker mode="single" selected={date} onChange={(d) => (date = d as Date | undefined)} />
```

</ComponentSection>

<!-- Examples -->

<ComponentSection>

## Examples

### Single Date Selection

<p>Select a single date. The most common use case for date pickers.</p>
<ComponentExample demo="DatePickerSingleDemo" />

### Multiple Date Selection

<p>Select multiple individual dates. Use `max` to limit the number of selections.</p>
<ComponentExample demo="DatePickerMultipleDemo" />

### Date Range Selection

<p>Select a continuous range of dates. Works well with `numberOfMonths={2}` for a side-by-side view.</p>
<ComponentExample demo="DatePickerRangeDemo" />

### Range with Min/Max Constraints

<p>Constrain the range length using `min` and `max` props (in days/nights).</p>
<ComponentExample demo="DatePickerRangeMinMaxDemo" />

### With Popover

<p>Compose with the [Popover](/components/popover) component to create a dropdown date picker.</p>
<ComponentExample demo="DatePickerPopoverDemo" />

### Date Range with Popover

<p>A date range picker in a popover with two months displayed.</p>
<ComponentExample demo="DatePickerRangePopoverDemo" />

### Date Range with Presets

<p>Combine the date picker with preset options for quick selection.</p>
<ComponentExample demo="DatePickerRangeWithPresetsDemo" />

### Disabled Dates with Usage Limits

<p>Use the `disabled` prop to make certain dates unselectable, and `footer` to display usage information.</p>
<ComponentExample demo="DatePickerDisabledWithFooterDemo" />

</ComponentSection>

<!-- Full Popover Example -->

<ComponentSection>

## Full Popover Example

<p>Here's a complete example showing how to compose DatePicker with Popover:</p>

```svelte
<script lang="ts">
  import { Button, DatePicker, Popover } from 'kumo-svelte';
  import { CalendarDotsIcon } from 'phosphor-svelte';

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
```

</ComponentSection>

<!-- API Reference -->

<ComponentSection>

## API Reference

<p>DatePicker mirrors the original Kumo calendar API. Key props include:</p>

<ul class="mt-4 list-disc list-inside space-y-2">
  <li>`mode` — <code class="text-xs">"single" | "multiple" | "range"</code> — Selection mode (required)</li>
  <li>`selected` — Currently selected date(s)</li>
  <li>`onChange` — Callback when selection changes</li>
  <li>`numberOfMonths` — Number of months to display</li>
  <li>`disabled` — Dates that cannot be selected</li>
  <li>`min` / `max` — Min/max selection constraints</li>
  <li>`footer` — Content rendered below the calendar</li>
  <li>`locale` — Locale string for internationalization</li>
  <li>`className` — Additional CSS classes</li>
</ul>

<p class="mt-4 text-kumo-subtle text-sm">
  See the <a href="https://daypicker.dev/docs" target="_blank" rel="noopener noreferrer">react-day-picker documentation</a> for the full upstream API.
</p>

### Differences from react-day-picker

<p>
  For consistency with other Kumo form components, DatePicker uses `onChange` instead of react-day-picker's `onSelect`.
</p>

</ComponentSection>
