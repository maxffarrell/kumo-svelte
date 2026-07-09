<script lang="ts">
  import type { DateValue } from '@internationalized/date';
  import type { DateRange } from 'bits-ui';
  import type { Snippet } from 'svelte';
  import CalendarIcon from 'phosphor-svelte/lib/Calendar';
  import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
  import CaretRight from 'phosphor-svelte/lib/CaretRight';
  import { DateRangePicker as DateRangePickerPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils/cn';

  interface Props {
    value?: DateRange;
    placeholder?: DateValue;
    open?: boolean;
    onValueChange?: (value: DateRange) => void;
    class?: string;
    calendarClass?: string;
    triggerClass?: string;
    contentClass?: string;
    startName?: string;
    endName?: string;
    disabled?: boolean;
    readonly?: boolean;
    locale?: string;
    weekdayFormat?: Intl.DateTimeFormatOptions['weekday'];
    numberOfMonths?: number;
    fixedWeeks?: boolean;
    calendarLabel?: string;
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    value = $bindable({ start: undefined, end: undefined }),
    placeholder = $bindable(),
    open = $bindable(false),
    onValueChange,
    class: className,
    calendarClass,
    triggerClass,
    contentClass,
    startName,
    endName,
    disabled = false,
    readonly = false,
    locale = 'en-US',
    weekdayFormat = 'short',
    numberOfMonths = 2,
    fixedWeeks = true,
    calendarLabel = 'Choose date range',
    children,
    ...rest
  }: Props = $props();

  function handleValueChange(nextValue: DateRange) {
    value = nextValue;
    onValueChange?.(nextValue);
  }

  const rootClass = $derived(cn('inline-flex flex-col gap-2', className));
</script>

{#snippet dateInput(type: 'start' | 'end', name: string | undefined)}
  <DateRangePickerPrimitive.Input {type} {name} class="flex min-w-0 items-center gap-0.5 text-left">
    {#snippet children({ segments })}
      {#each segments as segment, index (`${type}-${segment.part}-${index}`)}
        <DateRangePickerPrimitive.Segment
          part={segment.part}
          class={cn(
            'rounded-sm px-0.5 outline-none focus:bg-kumo-tint focus:text-kumo-default',
            segment.part !== 'literal' && segment.value === segment.part ? 'text-kumo-placeholder' : undefined
          )}
        >
          {segment.value}
        </DateRangePickerPrimitive.Segment>
      {/each}
    {/snippet}
  </DateRangePickerPrimitive.Input>
{/snippet}

<DateRangePickerPrimitive.Root
  bind:value
  bind:placeholder
  bind:open
  onValueChange={handleValueChange}
  {disabled}
  {readonly}
  {locale}
  {weekdayFormat}
  {numberOfMonths}
  {fixedWeeks}
  {calendarLabel}
  {...rest}
>
  <div class={rootClass}>
    <DateRangePickerPrimitive.Trigger
      class={cn(
        'inline-flex h-9 w-full min-w-80 items-center justify-between gap-2 rounded-lg bg-kumo-base px-3 text-base text-kumo-default shadow-xs outline-none ring ring-kumo-line transition focus:ring-2 focus:ring-kumo-focus/50 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-kumo-placeholder',
        triggerClass
      )}
    >
      <span class="flex min-w-0 flex-1 items-center gap-1">
        {@render dateInput('start', startName)}
        <span class="shrink-0 text-kumo-subtle">-</span>
        {@render dateInput('end', endName)}
      </span>
      <CalendarIcon class="size-4 shrink-0 text-kumo-subtle" aria-hidden="true" />
    </DateRangePickerPrimitive.Trigger>

    <DateRangePickerPrimitive.Content
      class={cn('z-50 rounded-lg bg-kumo-base p-3 text-kumo-default shadow-lg ring ring-kumo-line outline-none', contentClass)}
      sideOffset={6}
    >
      <DateRangePickerPrimitive.Calendar class={cn('space-y-3', calendarClass)}>
        {#snippet children({ months, weekdays })}
          <DateRangePickerPrimitive.Header class="flex items-center justify-between gap-2">
            <DateRangePickerPrimitive.PrevButton
              class="inline-flex size-8 items-center justify-center rounded-md text-kumo-muted outline-none transition hover:bg-kumo-tint hover:text-kumo-default focus-visible:ring-2 focus-visible:ring-kumo-brand disabled:pointer-events-none disabled:opacity-40"
              aria-label="Previous month"
            >
              <CaretLeft class="size-4" aria-hidden="true" />
            </DateRangePickerPrimitive.PrevButton>
            <DateRangePickerPrimitive.Heading class="text-sm font-medium text-kumo-default" />
            <DateRangePickerPrimitive.NextButton
              class="inline-flex size-8 items-center justify-center rounded-md text-kumo-muted outline-none transition hover:bg-kumo-tint hover:text-kumo-default focus-visible:ring-2 focus-visible:ring-kumo-brand disabled:pointer-events-none disabled:opacity-40"
              aria-label="Next month"
            >
              <CaretRight class="size-4" aria-hidden="true" />
            </DateRangePickerPrimitive.NextButton>
          </DateRangePickerPrimitive.Header>

          <div class="grid gap-4" style={`grid-template-columns: repeat(${months.length}, minmax(0, 1fr));`}>
            {#each months as month (month.value.toString())}
              <DateRangePickerPrimitive.Grid class="w-full border-separate border-spacing-1">
                <DateRangePickerPrimitive.GridHead>
                  <DateRangePickerPrimitive.GridRow>
                    {#each weekdays as day (day)}
                      <DateRangePickerPrimitive.HeadCell class="size-8 text-center text-xs font-medium text-kumo-subtle">
                        {day}
                      </DateRangePickerPrimitive.HeadCell>
                    {/each}
                  </DateRangePickerPrimitive.GridRow>
                </DateRangePickerPrimitive.GridHead>
                <DateRangePickerPrimitive.GridBody>
                  {#each month.weeks as week, weekIndex (weekIndex)}
                    <DateRangePickerPrimitive.GridRow>
                      {#each week as date (date.toString())}
                        <DateRangePickerPrimitive.Cell {date} month={month.value} class="p-0">
                          <DateRangePickerPrimitive.Day
                            class={cn(
                              'inline-flex size-8 items-center justify-center rounded-md text-sm outline-none transition',
                              'hover:bg-kumo-tint focus-visible:ring-2 focus-visible:ring-kumo-brand',
                              'data-[selected]:bg-kumo-brand data-[selected]:text-white',
                              'data-[highlighted]:bg-kumo-tint data-[highlighted]:text-kumo-default',
                              'data-[selection-start]:rounded-l-md data-[selection-end]:rounded-r-md',
                              'data-[disabled]:pointer-events-none data-[disabled]:text-kumo-subtle/50',
                              'data-[unavailable]:line-through data-[unavailable]:opacity-60',
                              'data-[outside-month]:text-kumo-subtle/50'
                            )}
                          />
                        </DateRangePickerPrimitive.Cell>
                      {/each}
                    </DateRangePickerPrimitive.GridRow>
                  {/each}
                </DateRangePickerPrimitive.GridBody>
              </DateRangePickerPrimitive.Grid>
            {/each}
          </div>
        {/snippet}
      </DateRangePickerPrimitive.Calendar>

      {@render children?.()}
    </DateRangePickerPrimitive.Content>
  </div>
</DateRangePickerPrimitive.Root>
